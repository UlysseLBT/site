import { NextResponse } from "next/server";
import { bookSlot, HostKey, isSlotAllowed, isSlotFree } from "@/lib/availability";

export const runtime = "nodejs";

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID!;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID!;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET!;

// Mets ici tes 2 comptes Zoom test (email ou userId)
const HOSTS: Record<HostKey, { userId: string; label: string }> = {
  hostA: { userId: "hostA@example.com", label: "Compte test A" },
  hostB: { userId: "hostB@example.com", label: "Compte test B" },
};

async function getZoomAccessToken() {
  const basic = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  const url = new URL("https://zoom.us/oauth/token");
  url.searchParams.set("grant_type", "account_credentials");
  url.searchParams.set("account_id", ZOOM_ACCOUNT_ID);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
  });

  if (!res.ok) throw new Error(`Zoom token error: ${res.status}`);
  const data = await res.json();
  return data.access_token as string;
}

async function createZoomMeeting(opts: { userId: string; topic: string; start_time: string; duration: number }) {
  const token = await getZoomAccessToken();

  // start_time en UTC ISO avec "Z" est accepté (format ISO 8601). :contentReference[oaicite:0]{index=0}
  const res = await fetch(`https://api.zoom.us/v2/users/${encodeURIComponent(opts.userId)}/meetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      topic: opts.topic,
      type: 2,
      start_time: opts.start_time,
      duration: opts.duration,
      timezone: "Europe/Paris",
      settings: {
        waiting_room: true,
        join_before_host: false,
        meeting_authentication: false, // pour tester “invité sans compte”
      },
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Zoom create meeting error: ${res.status} ${txt}`);
  }
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const host = body.host as HostKey;
    const startISO = String(body.startISO ?? ""); // ISO (ex: 2026-03-10T13:00:00.000Z)
    const duration = Number(body.duration ?? 60);
    const name = String(body.name ?? "");
    const email = String(body.email ?? "");

    if (!HOSTS[host]) return NextResponse.json({ error: "Host invalide" }, { status: 400 });
    if (!startISO) return NextResponse.json({ error: "Date/heure requise" }, { status: 400 });
    if (!name || !email) return NextResponse.json({ error: "Nom + email requis" }, { status: 400 });

    const start = new Date(startISO);
    if (Number.isNaN(start.getTime())) return NextResponse.json({ error: "Date invalide" }, { status: 400 });
    if (start.getTime() < Date.now()) return NextResponse.json({ error: "Créneau dans le passé" }, { status: 400 });

    if (!isSlotAllowed(host, start, duration))
      return NextResponse.json({ error: "Créneau hors horaires du host" }, { status: 400 });

    if (!isSlotFree(host, start, duration))
      return NextResponse.json({ error: "Créneau déjà pris" }, { status: 409 });

    // On réserve côté appli (test)
    bookSlot(host, start, duration);

    // Création meeting Zoom
    const meeting = await createZoomMeeting({
      userId: HOSTS[host].userId,
      topic: `RDV Méditation - ${name}`,
      start_time: start.toISOString(),
      duration,
    });

    return NextResponse.json({
      ok: true,
      host: HOSTS[host].label,
      join_url: meeting.join_url,
      meeting_id: meeting.id,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Erreur serveur" }, { status: 500 });
  }
}