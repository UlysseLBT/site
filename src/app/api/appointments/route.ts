import { NextResponse } from "next/server";
import { bookSlot, cancelSlot, HostKey, isSlotAllowed, isSlotFree } from "@/lib/availability";

export const runtime = "nodejs";

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID!;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID!;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET!;

const HOSTS: Record<HostKey, { userId: string; label: string }> = {
  hostA: { userId: "lskyreco@gmail.com", label: "Compte test A" },
  hostB: { userId: "lebouteiller.ulysse@gmail.com", label: "Compte test B" },
};

// ─── Zoom helpers ────────────────────────────────────────────────────────────

async function getZoomAccessToken(): Promise<string> {
  const basic = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  const url = new URL("https://zoom.us/oauth/token");
  url.searchParams.set("grant_type", "account_credentials");
  url.searchParams.set("account_id", ZOOM_ACCOUNT_ID);

  console.log("[zoom] Récupération du token OAuth…");

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Zoom token error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  console.log("[zoom] Token obtenu ✓");
  return data.access_token as string;
}

async function createZoomMeeting(opts: {
  userId: string;
  topic: string;
  start_time: string;
  duration: number;
}) {
  const token = await getZoomAccessToken();

  console.log(`[zoom] Création meeting pour userId=${opts.userId} à ${opts.start_time}`);

  const res = await fetch(
    `https://api.zoom.us/v2/users/${encodeURIComponent(opts.userId)}/meetings`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        topic: opts.topic,
        type: 2, // meeting planifié
        start_time: opts.start_time, // ISO 8601 UTC accepté par Zoom
        duration: opts.duration,
        timezone: "Europe/Paris",
        settings: {
          waiting_room: true,
          join_before_host: false,
          meeting_authentication: false, // invités sans compte Zoom autorisés
        },
      }),
    }
  );

  if (!res.ok) {
    // On parse la réponse Zoom pour exposer le vrai message d'erreur
    let zoomError = `Zoom API ${res.status}`;
    try {
      const json = await res.json();
      zoomError = `Zoom API ${res.status} — code ${json.code}: ${json.message}`;
    } catch {
      const txt = await res.text().catch(() => "");
      zoomError = `Zoom API ${res.status}: ${txt}`;
    }
    throw new Error(zoomError);
  }

  const meeting = await res.json();
  console.log(`[zoom] Meeting créé ✓ id=${meeting.id} url=${meeting.join_url}`);
  return meeting;
}

// ─── Route POST ──────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let slotBooked = false;
  let host: HostKey | null = null;
  let start: Date | null = null;
  let duration = 60;

  try {
    const body = await req.json();

    host = body.host as HostKey;
    const startISO = String(body.startISO ?? "");
    duration = Number(body.duration ?? 60);
    const name = String(body.name ?? "");
    const email = String(body.email ?? "");

    console.log(`[booking] Nouvelle demande — host=${host} start=${startISO} duration=${duration} name=${name}`);

    // ── Validations ──────────────────────────────────────────────────────────
    if (!HOSTS[host])
      return NextResponse.json({ error: "Host invalide" }, { status: 400 });

    if (!startISO)
      return NextResponse.json({ error: "Date/heure requise" }, { status: 400 });

    if (!name || !email)
      return NextResponse.json({ error: "Nom + email requis" }, { status: 400 });

    start = new Date(startISO);

    if (Number.isNaN(start.getTime()))
      return NextResponse.json({ error: "Date invalide" }, { status: 400 });

    if (start.getTime() < Date.now())
      return NextResponse.json({ error: "Créneau dans le passé" }, { status: 400 });

    if (!isSlotAllowed(host, start, duration)) {
      console.warn(`[booking] Créneau hors horaires — host=${host} start=${startISO}`);
      return NextResponse.json({ error: "Créneau hors horaires du host" }, { status: 400 });
    }

    if (!isSlotFree(host, start, duration)) {
      console.warn(`[booking] Créneau déjà pris — host=${host} start=${startISO}`);
      return NextResponse.json({ error: "Créneau déjà pris" }, { status: 409 });
    }

    // ── Réservation en mémoire ────────────────────────────────────────────────
    bookSlot(host, start, duration);
    slotBooked = true;
    console.log(`[booking] Slot réservé en mémoire ✓`);

    // ── Création Zoom (peut échouer → rollback ci-dessous) ───────────────────
    const meeting = await createZoomMeeting({
      userId: HOSTS[host].userId,
      topic: `RDV Méditation - ${name}`,
      start_time: start.toISOString(),
      duration,
    });

    console.log(`[booking] Réservation complète ✓ meeting_id=${meeting.id}`);

    return NextResponse.json({
      ok: true,
      host: HOSTS[host].label,
      join_url: meeting.join_url,
      meeting_id: meeting.id,
    });

  } catch (e: any) {
    // ── Rollback si le slot a été réservé mais Zoom a planté ─────────────────
    if (slotBooked && host && start) {
      cancelSlot(host, start, duration);
      console.error(`[booking] Rollback du slot effectué suite à l'erreur Zoom`);
    }

    console.error(`[booking] Erreur : ${e?.message}`);
    return NextResponse.json({ error: e?.message ?? "Erreur serveur" }, { status: 500 });
  }
}