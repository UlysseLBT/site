"use client";
import { useState } from "react";

export default function Page() {
  const [host, setHost] = useState<"hostA" | "hostB">("hostA");
  const [dtLocal, setDtLocal] = useState("2026-03-10T14:00");
  const [duration, setDuration] = useState(60);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setResult(null);
    try {
      // datetime-local -> Date local -> ISO UTC (Z)
      const startISO = new Date(dtLocal).toISOString();

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, startISO, duration, name, email }),
      });

      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Prendre un RDV (test)</h1>

      <label>Compte (host)</label>
      <select value={host} onChange={(e) => setHost(e.target.value as any)} style={{ display: "block", width: "100%" }}>
        <option value="hostA">Compte test A (lun/mer/ven)</option>
        <option value="hostB">Compte test B (mar/jeu)</option>
      </select>

      <label style={{ display: "block", marginTop: 12 }}>Date/heure</label>
      <input
        type="datetime-local"
        value={dtLocal}
        onChange={(e) => setDtLocal(e.target.value)}
        style={{ display: "block", width: "100%" }}
      />

      <label style={{ display: "block", marginTop: 12 }}>Durée (min)</label>
      <input
        type="number"
        value={duration}
        min={15}
        step={15}
        onChange={(e) => setDuration(Number(e.target.value))}
        style={{ display: "block", width: "100%" }}
      />

      <label style={{ display: "block", marginTop: 12 }}>Nom</label>
      <input value={name} onChange={(e) => setName(e.target.value)} style={{ display: "block", width: "100%" }} />

      <label style={{ display: "block", marginTop: 12 }}>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", width: "100%" }} />

      <button onClick={submit} disabled={loading} style={{ marginTop: 16 }}>
        {loading ? "Création..." : "Créer le RDV"}
      </button>

      {result && (
        <pre style={{ marginTop: 16, padding: 12, background: "#f5f5f5", overflowX: "auto" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}