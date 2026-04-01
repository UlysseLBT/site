"use client";
import { useState } from "react";
import Link from "next/link";

const COLORS = {
  cream: "#F0EBCC",
  creamDark: "#E8E0B8",
  greenDark: "#1E2D12",
  greenPrimary: "#4A5C2A",
  greenMid: "#6B7A40",
  gold: "#D4C88A",
  orange: "#B8611A",
  orangeLight: "#C8832A",
};

// Convert "Lundi" + "10h00" → next occurrence as ISO string
function nextOccurrenceISO(dayName: string, timeStr: string): string {
  const dayMap: Record<string, number> = { Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4, Vendredi: 5, Samedi: 6 };
  const targetDay = dayMap[dayName];
  const [hStr, mStr] = timeStr.replace("h", ":").split(":");
  const hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr || "0", 10);

  const now = new Date();
  const candidate = new Date();
  candidate.setHours(hours, minutes, 0, 0);

  const currentDay = now.getDay();
  let daysUntil = (targetDay - currentDay + 7) % 7;
  if (daysUntil === 0 && candidate <= now) daysUntil = 7;
  candidate.setDate(candidate.getDate() + daysUntil);
  return candidate.toISOString();
}

const zoomSlots = [
  { day: "Lundi",    slots: ["10h00", "14h00", "17h00"] },
  { day: "Mercredi", slots: ["9h00", "11h30", "15h00", "18h00"] },
  { day: "Vendredi", slots: ["10h00", "13h00", "16h30"] },
  { day: "Samedi",   slots: ["9h30", "11h00"] },
];

type Step = "select" | "form" | "loading" | "confirm" | "error";

export default function RdvPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; slot: string } | null>(null);
  const [step, setStep] = useState<Step>("select");
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;

    setStep("loading");
    setApiError(null);

    try {
      const startISO = nextOccurrenceISO(selectedSlot.day, selectedSlot.slot);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: "hostA",
          startISO,
          duration: 60,
          name: form.name,
          email: form.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? "Erreur serveur");
        setStep("error");
        return;
      }

      setJoinUrl(data.join_url ?? null);
      setStep("confirm");
    } catch {
      setApiError("Impossible de contacter le serveur. Veuillez réessayer.");
      setStep("error");
    }
  }

  function reset() {
    setStep("select");
    setSelectedSlot(null);
    setForm({ name: "", email: "", note: "" });
    setJoinUrl(null);
    setApiError(null);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: ${COLORS.cream};
          font-family: 'Jost', sans-serif;
          font-size: 16px;
          color: ${COLORS.greenDark};
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 70px;
          background: rgba(240,235,204,0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(74,92,42,0.12);
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 500;
          color: ${COLORS.greenDark}; letter-spacing: 0.04em;
          text-decoration: none; display: flex; align-items: center; gap: 8px;
        }
        .logo-leaf { color: ${COLORS.greenMid}; font-size: 18px; }
        .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .nav-links a {
          font-size: 14px; font-weight: 400; letter-spacing: 0.08em;
          text-transform: uppercase; color: ${COLORS.greenPrimary};
          text-decoration: none; position: relative; transition: color 0.2s;
        }
        .nav-links a.active { color: ${COLORS.orange}; }
        .nav-links a::after {
          content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
          height: 1px; background: ${COLORS.orange};
          transform: scaleX(0); transition: transform 0.25s; transform-origin: left;
        }
        .nav-links a:hover { color: ${COLORS.orange}; }
        .nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: ${COLORS.greenDark}; }

        /* ── PAGE HERO ── */
        .page-hero {
          padding-top: 70px;
          background: ${COLORS.greenDark};
          text-align: center;
          position: relative; overflow: hidden;
        }
        .page-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 60%, rgba(74,92,42,0.35) 0%, transparent 70%);
        }
        .page-hero-inner {
          position: relative; z-index: 1;
          padding: 80px 48px 72px;
        }
        .page-hero .tag {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${COLORS.gold}; display: block; margin-bottom: 20px;
        }
        .page-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 70px); font-weight: 300;
          color: ${COLORS.cream}; line-height: 1.15; margin-bottom: 20px;
        }
        .page-hero h1 em { font-style: italic; color: ${COLORS.gold}; }
        .page-hero p {
          font-size: 17px; font-weight: 300; line-height: 1.7;
          color: rgba(240,235,204,0.65); max-width: 480px; margin: 0 auto;
        }

        /* ── MAIN LAYOUT ── */
        .rdv-main {
          max-width: 1100px; margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ── LEFT — infos ── */
        .info-panel {}
        .info-panel .section-tag {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${COLORS.orangeLight}; display: block; margin-bottom: 18px;
        }
        .info-panel h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 40px); font-weight: 300;
          color: ${COLORS.greenDark}; line-height: 1.2; margin-bottom: 16px;
        }
        .info-panel h2 em { font-style: italic; color: ${COLORS.greenMid}; }
        .info-panel > p {
          font-size: 16px; font-weight: 300; line-height: 1.8;
          color: ${COLORS.greenPrimary}; opacity: 0.8; margin-bottom: 32px;
        }
        .features { display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; }
        .feature {
          display: flex; align-items: flex-start; gap: 14px;
        }
        .feature-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${COLORS.orangeLight}; flex-shrink: 0; margin-top: 8px;
        }
        .feature-text { font-size: 15px; line-height: 1.6; color: ${COLORS.greenPrimary}; }
        .feature-text strong { font-weight: 500; color: ${COLORS.greenDark}; }

        .zoom-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 20px; border-radius: 12px;
          background: ${COLORS.creamDark};
          border: 1px solid rgba(74,92,42,0.12);
          font-size: 14px; color: ${COLORS.greenPrimary};
        }
        .zoom-logo {
          background: #2D8CFF; color: #fff;
          border-radius: 6px; padding: 3px 8px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
        }

        /* ── RIGHT — booking panel ── */
        .booking-panel {
          background: ${COLORS.greenDark};
          border-radius: 24px; padding: 40px;
          position: sticky; top: 90px;
          border-top: 4px solid ${COLORS.orangeLight};
        }
        .booking-panel-label {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${COLORS.orangeLight}; margin-bottom: 12px; display: block;
        }
        .booking-panel h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 400;
          color: ${COLORS.cream}; margin-bottom: 28px;
        }

        /* Steps indicator */
        .steps {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 32px;
        }
        .step-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .step-num {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 500;
          border: 1px solid rgba(212,200,138,0.3);
          color: rgba(240,235,204,0.4);
          flex-shrink: 0;
        }
        .step-num.done { background: ${COLORS.greenMid}; border-color: ${COLORS.greenMid}; color: #fff; }
        .step-num.active { background: ${COLORS.orangeLight}; border-color: ${COLORS.orangeLight}; color: #fff; }
        .step-label { color: rgba(240,235,204,0.4); }
        .step-label.active { color: ${COLORS.cream}; }
        .step-sep { flex: 1; height: 1px; background: rgba(212,200,138,0.15); margin: 0 10px; }

        /* Slots */
        .slots-group { margin-bottom: 22px; }
        .slots-group-label {
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${COLORS.gold}; margin-bottom: 10px; display: block;
        }
        .slots-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .slot-btn {
          padding: 8px 18px; border-radius: 100px;
          font-family: 'Jost', sans-serif; font-size: 13px;
          border: 1px solid rgba(212,200,138,0.2);
          color: rgba(240,235,204,0.65); background: transparent;
          cursor: pointer; transition: all 0.2s;
        }
        .slot-btn:hover { border-color: ${COLORS.gold}; color: ${COLORS.gold}; }
        .slot-btn.selected {
          background: ${COLORS.orangeLight}; border-color: ${COLORS.orangeLight}; color: #fff;
        }

        .btn-next {
          width: 100%; padding: 15px; border: none; border-radius: 100px;
          background: ${COLORS.greenPrimary}; color: ${COLORS.cream};
          font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 500;
          letter-spacing: 0.06em; cursor: pointer;
          transition: background 0.2s, transform 0.15s; margin-top: 12px;
        }
        .btn-next:hover { background: #5a7033; transform: translateY(-1px); }
        .btn-next:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

        /* Form */
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-group label {
          font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(212,200,138,0.7);
        }
        .form-group input, .form-group textarea {
          padding: 12px 16px; border-radius: 10px;
          border: 1.5px solid rgba(212,200,138,0.15);
          font-family: 'Jost', sans-serif; font-size: 15px;
          color: ${COLORS.cream}; background: rgba(240,235,204,0.06);
          outline: none; transition: border-color 0.2s; resize: none;
        }
        .form-group input::placeholder, .form-group textarea::placeholder {
          color: rgba(240,235,204,0.25);
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: rgba(212,200,138,0.4);
        }
        .selected-recap {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-radius: 10px;
          background: rgba(200,131,42,0.12);
          border: 1px solid rgba(200,131,42,0.2);
          margin-bottom: 20px;
          font-size: 14px; color: ${COLORS.gold};
        }
        .btn-back {
          background: none; border: none; cursor: pointer;
          font-size: 13px; color: rgba(240,235,204,0.4);
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-top: 10px; width: 100%; text-align: center;
          transition: color 0.2s;
        }
        .btn-back:hover { color: rgba(240,235,204,0.7); }

        /* Loading */
        .loading-box { text-align: center; padding: 20px 0; }
        .spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid rgba(212,200,138,0.2);
          border-top-color: ${COLORS.gold};
          animation: spin 0.9s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-box p { font-size: 15px; color: rgba(240,235,204,0.5); line-height: 1.6; }

        /* Confirm */
        .confirm-box { text-align: center; padding: 10px 0; }
        .confirm-icon { font-size: 44px; display: block; margin-bottom: 16px; }
        .confirm-box h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 300;
          color: ${COLORS.cream}; margin-bottom: 12px;
        }
        .confirm-box p {
          font-size: 15px; font-weight: 300; line-height: 1.7;
          color: rgba(240,235,204,0.55); margin-bottom: 6px;
        }
        .btn-zoom {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 24px; padding: 15px 30px; border-radius: 100px;
          background: #2D8CFF; color: #fff;
          font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 500;
          text-decoration: none; letter-spacing: 0.04em;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-zoom:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-new {
          display: block; margin-top: 16px;
          background: none; border: none; cursor: pointer;
          font-size: 13px; color: rgba(240,235,204,0.35);
          letter-spacing: 0.06em; text-transform: uppercase;
          transition: color 0.2s; width: 100%; text-align: center;
        }
        .btn-new:hover { color: rgba(240,235,204,0.6); }

        /* Error */
        .error-box { text-align: center; padding: 10px 0; }
        .error-box h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 300;
          color: ${COLORS.cream}; margin-bottom: 12px;
        }
        .error-msg {
          font-size: 14px; color: ${COLORS.orangeLight};
          padding: 12px 16px; border-radius: 10px;
          background: rgba(200,131,42,0.12); margin-bottom: 20px;
          line-height: 1.6;
        }

        /* ── FOOTER ── */
        footer {
          background: ${COLORS.greenDark}; padding: 48px 64px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; color: ${COLORS.cream}; opacity: 0.8;
        }
        footer p { font-size: 13px; color: rgba(240,235,204,0.3); letter-spacing: 0.05em; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .navbar { padding: 0 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .page-hero-inner { padding: 60px 24px 56px; }
          .rdv-main { grid-template-columns: 1fr; padding: 48px 24px; gap: 40px; }
          .booking-panel { position: static; order: -1; }
          footer { flex-direction: column; gap: 16px; text-align: center; padding: 40px 24px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <Link href="/" className="logo">
          <span className="logo-leaf">✦</span>
          Sérénité
        </Link>
        <ul className="nav-links">
          <li><Link href="/#meditation">Méditation</Link></li>
          <li><Link href="/audio">Audio</Link></li>
          <li><Link href="/rdv" className="active">Rendez-vous</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
          background: COLORS.cream, borderBottom: `1px solid rgba(74,92,42,0.12)`,
          padding: "20px 28px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {([["Méditation", "/#meditation"], ["Audio", "/audio"], ["Rendez-vous", "/rdv"], ["Contact", "/#contact"]] as const).map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, color: COLORS.greenPrimary, textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="tag">Séance individuelle</span>
          <h1>Réservez votre <em>séance Zoom</em></h1>
          <p>
            Un accompagnement personnalisé avec un praticien certifié — depuis chez vous, à votre rythme.
          </p>
        </div>
      </section>

      {/* ── MAIN ── */}
      <main className="rdv-main">

        {/* Left — infos */}
        <div className="info-panel">
          <span className="section-tag">Comment ça marche</span>
          <h2>Un accompagnement <em>sur mesure</em></h2>
          <p>
            Choisissez un créneau, renseignez vos informations, et recevez votre lien Zoom. La première séance est offerte.
          </p>

          <div className="features">
            {[
              ["Choisissez votre créneau", "Disponibilités du lundi au samedi."],
              ["Renseignez vos informations", "Nom et e-mail suffisent."],
              ["Recevez votre lien Zoom", "Automatiquement généré et envoyé par e-mail."],
              ["Rejoignez la séance", "Sans application requise."],
            ].map(([title, desc]) => (
              <div className="feature" key={title as string}>
                <div className="feature-dot" />
                <div className="feature-text">
                  <strong>{title}</strong><br />{desc}
                </div>
              </div>
            ))}
          </div>

          <div className="zoom-badge">
            <span className="zoom-logo">Zoom</span>
            60 minutes · Sans compte requis
          </div>
        </div>

        {/* Right — booking panel */}
        <div className="booking-panel">

          {/* Steps */}
          {(step === "select" || step === "form") && (
            <>
              <span className="booking-panel-label">Réservation</span>
              <h3>Votre séance</h3>
              <div className="steps">
                <div className="step-item">
                  <div className={`step-num${step === "form" ? " done" : " active"}`}>
                    {step === "form" ? "✓" : "1"}
                  </div>
                  <span className={`step-label${step === "select" ? " active" : ""}`}>Créneau</span>
                </div>
                <div className="step-sep" />
                <div className="step-item">
                  <div className={`step-num${step === "form" ? " active" : ""}`}>2</div>
                  <span className={`step-label${step === "form" ? " active" : ""}`}>Informations</span>
                </div>
                <div className="step-sep" />
                <div className="step-item">
                  <div className="step-num">3</div>
                  <span className="step-label">Confirmation</span>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 1 : select slot ── */}
          {step === "select" && (
            <>
              {zoomSlots.map((group) => (
                <div className="slots-group" key={group.day}>
                  <span className="slots-group-label">{group.day}</span>
                  <div className="slots-row">
                    {group.slots.map((slot) => {
                      const isSelected = selectedSlot?.day === group.day && selectedSlot?.slot === slot;
                      return (
                        <button
                          key={slot}
                          className={`slot-btn${isSelected ? " selected" : ""}`}
                          onClick={() => setSelectedSlot({ day: group.day, slot })}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button
                className="btn-next"
                disabled={!selectedSlot}
                onClick={() => setStep("form")}
              >
                {selectedSlot
                  ? `Continuer — ${selectedSlot.day} ${selectedSlot.slot}`
                  : "Sélectionnez un créneau"}
              </button>
            </>
          )}

          {/* ── STEP 2 : form ── */}
          {step === "form" && (
            <form onSubmit={handleSubmit}>
              <div className="selected-recap">
                📅 {selectedSlot?.day} à {selectedSlot?.slot} — 60 min
              </div>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text" required placeholder="Marie Dupont"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input
                  type="email" required placeholder="marie@exemple.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Ce que vous souhaitez travailler (optionnel)</label>
                <textarea
                  rows={3} placeholder="Stress, sommeil, anxiété..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-next">
                Confirmer & obtenir le lien Zoom
              </button>
              <button type="button" className="btn-back" onClick={() => setStep("select")}>
                ← Changer de créneau
              </button>
            </form>
          )}

          {/* ── LOADING ── */}
          {step === "loading" && (
            <div className="loading-box">
              <div className="spinner" />
              <p>Création de votre meeting Zoom…<br />Cela prend quelques secondes.</p>
            </div>
          )}

          {/* ── CONFIRM ── */}
          {step === "confirm" && (
            <div className="confirm-box">
              <span className="confirm-icon">🌿</span>
              <h3>Séance confirmée !</h3>
              <p>
                <strong style={{ color: COLORS.cream }}>{form.name}</strong>, votre séance est réservée pour le{" "}
                <strong style={{ color: COLORS.gold }}>{selectedSlot?.day} à {selectedSlot?.slot}</strong>.
              </p>
              <p>Un e-mail de confirmation a été envoyé à <strong style={{ color: COLORS.cream }}>{form.email}</strong>.</p>
              {joinUrl && (
                <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="btn-zoom">
                  📹 Rejoindre la séance Zoom
                </a>
              )}
              <button className="btn-new" onClick={reset}>
                Réserver une autre séance
              </button>
            </div>
          )}

          {/* ── ERROR ── */}
          {step === "error" && (
            <div className="error-box">
              <h3>Une erreur est survenue</h3>
              <p className="error-msg">{apiError}</p>
              <button className="btn-next" onClick={() => setStep("form")}>
                Réessayer
              </button>
              <button className="btn-back" onClick={reset}>
                Changer de créneau
              </button>
            </div>
          )}

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <span className="footer-logo">✦ Sérénité</span>
        <p>© {new Date().getFullYear()} — Méditation & Bien-être</p>
      </footer>
    </>
  );
}
