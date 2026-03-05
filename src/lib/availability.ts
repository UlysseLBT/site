export type HostKey = "hostA" | "hostB";

type Window = { start: string; end: string }; // "HH:MM"
type Rules = { days: number[]; windows: Window[] }; // days: 0=dim..6=sam

const RULES: Record<HostKey, Rules> = {
  hostA: {
    days: [0, 1, 2, 3, 4, 5, 6], // tous les jours
    windows: [{ start: "00:00", end: "23:59" }], // 24h/24
  },
  hostB: {
    days: [0, 1, 2, 3, 4, 5, 6], // tous les jours
    windows: [{ start: "00:00", end: "23:59" }], // 24h/24
  },
};

// Stockage "test" en mémoire (reset si tu relances le serveur)
const BOOKINGS: Record<HostKey, { startMs: number; endMs: number }[]> = {
  hostA: [],
  hostB: [],
};

function hhmmToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// FIX : on lit l'heure dans le fuseau Europe/Paris pour coller
// au timezone déclaré dans Zoom (et aux règles métier définies en heure locale).
function parisMinutesOfDay(d: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  // weekday court FR : "lun.", "mar.", etc. → on mappe sur 0-6
  const weekdayMap: Record<string, number> = {
    "dim.": 0,
    "lun.": 1,
    "mar.": 2,
    "mer.": 3,
    "jeu.": 4,
    "ven.": 5,
    "sam.": 6,
  };

  const day = weekdayMap[get("weekday")] ?? -1;
  const hour = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);

  return { day, minutes: hour * 60 + minute };
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

export function isSlotAllowed(host: HostKey, start: Date, durationMin: number) {
  const rules = RULES[host];
  const { day, minutes: startMin } = parisMinutesOfDay(start);

  if (!rules.days.includes(day)) return false;

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

// Rollback : retire le slot réservé si Zoom échoue après bookSlot
export function cancelSlot(host: HostKey, start: Date, durationMin: number) {
  const startMs = start.getTime();
  const endMs = startMs + durationMin * 60_000;
  BOOKINGS[host] = BOOKINGS[host].filter(
    (b) => !(b.startMs === startMs && b.endMs === endMs)
  );
}