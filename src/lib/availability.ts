export type HostKey = "hostA" | "hostB";

type Window = { start: string; end: string }; // "HH:MM"
type Rules = { days: number[]; windows: Window[] }; // days: 0=dim..6=sam

const RULES: Record<HostKey, Rules> = {
  hostA: {
    days: [1, 3, 5], // lun, mer, ven
    windows: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "17:00" },
    ],
  },
  hostB: {
    days: [2, 4], // mar, jeu
    windows: [
      { start: "10:00", end: "13:00" },
      { start: "15:00", end: "19:00" },
    ],
  },
};

// Stockage “test” en mémoire (reset si tu relances le serveur)
const BOOKINGS: Record<HostKey, { startMs: number; endMs: number }[]> = {
  hostA: [],
  hostB: [],
};

function hhmmToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minutesOfDay(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

export function isSlotAllowed(host: HostKey, start: Date, durationMin: number) {
  const rules = RULES[host];
  const day = start.getDay();
  if (!rules.days.includes(day)) return false;

  const startMin = minutesOfDay(start);
  const endMin = startMin + durationMin;

  return rules.windows.some((w) => {
    const ws = hhmmToMinutes(w.start);
    const we = hhmmToMinutes(w.end);
    return startMin >= ws && endMin <= we;
  });
}

export function isSlotFree(host: HostKey, start: Date, durationMin: number) {
  const startMs = start.getTime();
  const endMs = startMs + durationMin * 60_000;

  return !BOOKINGS[host].some((b) => overlaps(startMs, endMs, b.startMs, b.endMs));
}

export function bookSlot(host: HostKey, start: Date, durationMin: number) {
  const startMs = start.getTime();
  const endMs = startMs + durationMin * 60_000;
  BOOKINGS[host].push({ startMs, endMs });
}