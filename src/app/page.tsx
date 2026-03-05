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
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const startISO = new Date(dtLocal).toISOString();
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, startISO, duration, name, email }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Une erreur est survenue");
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setError(e?.message ?? "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setName("");
    setEmail("");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0f0f0f;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #0f0f0f;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(147, 197, 153, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 80%, rgba(147, 197, 153, 0.06) 0%, transparent 50%);
        }

        .card {
          width: 100%;
          max-width: 480px;
          background: #181818;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 48px 40px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .header {
          margin-bottom: 36px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #93c599;
          background: rgba(147, 197, 153, 0.1);
          border: 1px solid rgba(147, 197, 153, 0.2);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
        }

        .field {
          margin-bottom: 18px;
        }

        label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }

        input, select {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          color: #f5f0e8;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }

        input:focus, select:focus {
          border-color: rgba(147, 197, 153, 0.4);
          background: rgba(147, 197, 153, 0.04);
        }

        input::placeholder { color: rgba(255,255,255,0.2); }

        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4);
          cursor: pointer;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 24px 0;
        }

        .btn {
          width: 100%;
          padding: 14px;
          background: #93c599;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #0f0f0f;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .btn:active:not(:disabled) { transform: translateY(0); }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .btn-outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          margin-top: 12px;
        }

        .btn-outline:hover:not(:disabled) {
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          background: transparent;
        }

        /* Error */
        .error-box {
          background: rgba(255, 100, 100, 0.08);
          border: 1px solid rgba(255, 100, 100, 0.2);
          border-radius: 10px;
          padding: 14px 16px;
          margin-top: 16px;
          font-size: 13px;
          color: #ff8080;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Success */
        .success {
          text-align: center;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .success-icon {
          width: 56px;
          height: 56px;
          background: rgba(147, 197, 153, 0.12);
          border: 1px solid rgba(147, 197, 153, 0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 22px;
        }

        .success h2 {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: #f5f0e8;
          margin-bottom: 8px;
        }

        .success p {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .zoom-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          background: #2D8CFF;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 8px 24px rgba(45, 140, 255, 0.25);
        }

        .zoom-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        .zoom-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .meeting-info {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 20px;
          text-align: left;
        }

        .meeting-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }

        .meeting-info-row + .meeting-info-row {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .info-label { color: rgba(255,255,255,0.3); }
        .info-value { color: rgba(255,255,255,0.7); font-weight: 500; }

        .loading-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .loading-dots span {
          width: 5px;
          height: 5px;
          background: #0f0f0f;
          border-radius: 50%;
          animation: bounce 0.8s infinite;
        }

        .loading-dots span:nth-child(2) { animation-delay: 0.15s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="page">
        <div className="card">

          {/* ── SUCCESS STATE ── */}
          {result ? (
            <div className="success">
              <div className="success-icon">🎋</div>
              <h2>RDV confirmé !</h2>
              <p>
                Votre séance de méditation avec <strong style={{ color: "#93c599" }}>{result.host}</strong> est réservée.<br />
                Rejoignez la réunion sans compte Zoom.
              </p>

              <div className="meeting-info">
                <div className="meeting-info-row">
                  <span className="info-label">Meeting ID</span>
                  <span className="info-value">{result.meeting_id}</span>
                </div>
                <div className="meeting-info-row">
                  <span className="info-label">Host</span>
                  <span className="info-value">{result.host}</span>
                </div>
              </div>

              <a href={result.join_url} target="_blank" rel="noopener noreferrer" className="zoom-btn">
                <svg className="zoom-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 8.5v7l4.5 2.5V6L15.5 8.5zM4 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4z"/>
                </svg>
                Rejoindre sur Zoom
              </a>

              <button className="btn btn-outline" onClick={reset}>
                Prendre un autre RDV
              </button>
            </div>

          ) : (
            /* ── FORM STATE ── */
            <>
              <div className="header">
                <div className="badge">Réservation</div>
                <h1>Séance de Méditation</h1>
                <p className="subtitle">Choisissez votre créneau et rejoignez sans compte Zoom</p>
              </div>

              <div className="field">
                <label>Praticien</label>
                <select value={host} onChange={(e) => setHost(e.target.value as any)}>
                  <option value="hostA">Compte test A</option>
                  <option value="hostB">Compte test B</option>
                </select>
              </div>

              <div className="row">
                <div className="field">
                  <label>Date &amp; heure</label>
                  <input
                    type="datetime-local"
                    value={dtLocal}
                    onChange={(e) => setDtLocal(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Durée (min)</label>
                  <input
                    type="number"
                    value={duration}
                    min={15}
                    step={15}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="divider" />

              <div className="field">
                <label>Nom complet</label>
                <input
                  value={name}
                  placeholder="Jean Dupont"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="jean@exemple.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="btn" onClick={submit} disabled={loading || !name || !email}>
                {loading ? (
                  <div className="loading-dots">
                    <span /><span /><span />
                  </div>
                ) : "Créer le RDV →"}
              </button>

              {error && (
                <div className="error-box">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}