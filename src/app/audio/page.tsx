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

const categories = ["Tout", "Pleine conscience", "Respiration", "Sommeil", "Stress", "Éveil matinal"];

const audios = [
  {
    id: 1,
    title: "Respiration apaisante",
    category: "Respiration",
    duration: "12 min",
    level: "Débutant",
    desc: "Un exercice de cohérence cardiaque pour calmer le système nerveux en quelques minutes.",
    icon: "💧",
  },
  {
    id: 2,
    title: "Scan corporel du soir",
    category: "Sommeil",
    duration: "18 min",
    level: "Tous niveaux",
    desc: "Relâchez chaque partie de votre corps et préparez votre esprit au repos profond.",
    icon: "🌙",
  },
  {
    id: 3,
    title: "Éveil en douceur",
    category: "Éveil matinal",
    duration: "10 min",
    level: "Tous niveaux",
    desc: "Démarrez votre journée avec clarté et intention, en douceur et sans précipitation.",
    icon: "☀️",
  },
  {
    id: 4,
    title: "Pleine conscience — 5 sens",
    category: "Pleine conscience",
    duration: "15 min",
    level: "Intermédiaire",
    desc: "Ancrez-vous dans l'instant présent en explorant vos cinq sens un à un.",
    icon: "🌿",
  },
  {
    id: 5,
    title: "Lâcher-prise",
    category: "Stress",
    duration: "20 min",
    level: "Tous niveaux",
    desc: "Visualisation guidée pour relâcher les tensions accumulées et retrouver l'équilibre.",
    icon: "🍃",
  },
  {
    id: 6,
    title: "Respiration 4-7-8",
    category: "Respiration",
    duration: "8 min",
    level: "Débutant",
    desc: "Une technique de respiration puissante pour réduire l'anxiété rapidement.",
    icon: "💧",
  },
  {
    id: 7,
    title: "Méditation de l'espace ouvert",
    category: "Pleine conscience",
    duration: "25 min",
    level: "Avancé",
    desc: "Élargissez votre conscience au-delà des pensées et des émotions, vers un espace de pure présence.",
    icon: "✦",
  },
  {
    id: 8,
    title: "Sons de la forêt — sommeil",
    category: "Sommeil",
    duration: "45 min",
    level: "Tous niveaux",
    desc: "Ambiance sonore immersive en forêt pour accompagner un endormissement naturel.",
    icon: "🌙",
  },
  {
    id: 9,
    title: "Gratitude du matin",
    category: "Éveil matinal",
    duration: "12 min",
    level: "Débutant",
    desc: "Cultivez la gratitude dès le réveil pour ancrer une énergie positive dans votre journée.",
    icon: "☀️",
  },
  {
    id: 10,
    title: "Gestion du stress au travail",
    category: "Stress",
    duration: "10 min",
    level: "Tous niveaux",
    desc: "Une pause de 10 minutes pour décompresser entre deux réunions ou tâches intenses.",
    icon: "🌿",
  },
  {
    id: 11,
    title: "Respiration carrée",
    category: "Respiration",
    duration: "6 min",
    level: "Débutant",
    desc: "La méthode box breathing utilisée par les forces spéciales pour retrouver le calme sous pression.",
    icon: "💧",
  },
  {
    id: 12,
    title: "Nidra — yoga du sommeil",
    category: "Sommeil",
    duration: "35 min",
    level: "Intermédiaire",
    desc: "Une pratique ancestrale entre veille et sommeil pour une récupération profonde du corps et de l'esprit.",
    icon: "🌙",
  },
];

const zoomSlots = [
  { day: "Lundi", slots: ["10h00", "14h00", "17h00"] },
  { day: "Mercredi", slots: ["9h00", "11h30", "15h00", "18h00"] },
  { day: "Vendredi", slots: ["10h00", "13h00", "16h30"] },
  { day: "Samedi", slots: ["9h30", "11h00"] },
];

export default function AudioPage() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [playing, setPlaying] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; slot: string } | null>(null);
  const [bookingStep, setBookingStep] = useState<"idle" | "form" | "confirm">("idle");
  const [form, setForm] = useState({ name: "", email: "", note: "" });

  const filtered = activeCategory === "Tout"
    ? audios
    : audios.filter((a) => a.category === activeCategory);

  function handleBook() {
    if (!selectedSlot) return;
    setBookingStep("form");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingStep("confirm");
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
          font-size: 13px; font-weight: 400; letter-spacing: 0.08em;
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
        .btn-login {
          padding: 9px 22px; border: 1.5px solid ${COLORS.greenPrimary};
          border-radius: 100px; font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: ${COLORS.greenPrimary};
          background: transparent; cursor: pointer; text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .btn-login:hover { background: ${COLORS.greenPrimary}; color: ${COLORS.cream}; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: ${COLORS.greenDark}; }

        /* ── PAGE HERO ── */
        .page-hero {
          padding-top: 70px;
          background: ${COLORS.greenDark};
          padding-bottom: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .page-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 60%, rgba(74,92,42,0.3) 0%, transparent 70%);
        }
        .page-hero-inner {
          position: relative; z-index: 1;
          padding: 80px 48px 60px;
        }
        .page-hero .tag {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${COLORS.gold}; display: block; margin-bottom: 20px;
        }
        .page-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6vw, 70px); font-weight: 300;
          color: ${COLORS.cream}; line-height: 1.15; margin-bottom: 20px;
        }
        .page-hero h1 em { font-style: italic; color: ${COLORS.gold}; }
        .page-hero p {
          font-size: 15px; font-weight: 300; line-height: 1.7;
          color: rgba(240,235,204,0.65); max-width: 520px; margin: 0 auto;
        }

        /* ── FILTER BAR ── */
        .filter-bar {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 10px;
          padding: 40px 48px;
          background: ${COLORS.creamDark};
          border-bottom: 1px solid rgba(74,92,42,0.1);
        }
        .filter-btn {
          padding: 8px 20px; border-radius: 100px;
          font-family: 'Jost', sans-serif; font-size: 12px;
          font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase;
          border: 1.5px solid rgba(74,92,42,0.25);
          color: ${COLORS.greenPrimary}; background: transparent;
          cursor: pointer; transition: all 0.2s;
        }
        .filter-btn:hover { border-color: ${COLORS.greenPrimary}; }
        .filter-btn.active {
          background: ${COLORS.greenPrimary}; color: ${COLORS.cream};
          border-color: ${COLORS.greenPrimary};
        }

        /* ── AUDIO GRID ── */
        .audio-section {
          padding: 64px 48px;
          max-width: 1200px; margin: 0 auto;
        }
        .audio-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 400; letter-spacing: 0.15em;
          text-transform: uppercase; color: ${COLORS.greenMid};
          margin-bottom: 32px;
        }
        .audio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .audio-card {
          background: ${COLORS.creamDark};
          border-radius: 16px; padding: 28px;
          border: 1px solid transparent;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .audio-card:hover {
          border-color: rgba(74,92,42,0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(30,45,18,0.08);
        }
        .audio-card.playing {
          border-color: ${COLORS.orange};
          background: ${COLORS.cream};
        }
        .card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 16px;
        }
        .card-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(74,92,42,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .card-meta {
          display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
        }
        .badge {
          font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px;
          background: rgba(74,92,42,0.12); color: ${COLORS.greenMid};
        }
        .badge-cat {
          font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px;
          background: rgba(200,131,42,0.12); color: ${COLORS.orangeLight};
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 400; color: ${COLORS.greenDark};
          margin-bottom: 8px; line-height: 1.3;
        }
        .card-desc {
          font-size: 13px; font-weight: 300; line-height: 1.7;
          color: ${COLORS.greenPrimary}; opacity: 0.8;
          margin-bottom: 20px;
        }
        .card-footer {
          display: flex; align-items: center; gap: 12px;
        }
        .play-circle {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 13px;
          transition: background 0.2s, transform 0.15s;
          border: none; cursor: pointer;
        }
        .play-circle.idle {
          background: ${COLORS.greenPrimary}; color: ${COLORS.cream};
        }
        .play-circle.active {
          background: ${COLORS.orange}; color: #fff;
        }
        .play-circle:hover { transform: scale(1.08); }
        .duration-tag {
          font-size: 12px; color: ${COLORS.greenMid}; letter-spacing: 0.04em;
        }

        /* ── WAVEFORM ANIMATION ── */
        .waveform {
          display: flex; align-items: center; gap: 3px; flex: 1;
          height: 24px;
        }
        .wave-bar {
          width: 3px; border-radius: 2px;
          background: ${COLORS.orange}; opacity: 0.6;
          animation: wave 1.2s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }

        /* ── RDV ZOOM SECTION ── */
        .rdv-section {
          background: ${COLORS.greenDark};
          padding: 100px 48px;
        }
        .rdv-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: start;
        }
        .rdv-text .tag {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${COLORS.gold}; display: block; margin-bottom: 20px;
        }
        .rdv-text h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 48px); font-weight: 300;
          color: ${COLORS.cream}; line-height: 1.2; margin-bottom: 20px;
        }
        .rdv-text h2 em { font-style: italic; color: ${COLORS.gold}; }
        .rdv-text p {
          font-size: 14px; font-weight: 300; line-height: 1.8;
          color: rgba(240,235,204,0.6); margin-bottom: 32px;
        }
        .rdv-features {
          display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px;
        }
        .rdv-feature {
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: rgba(240,235,204,0.75);
        }
        .rdv-feature-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${COLORS.gold}; flex-shrink: 0;
        }

        /* Booking panel */
        .booking-panel {
          background: rgba(240,235,204,0.05);
          border: 1px solid rgba(212,200,138,0.12);
          border-radius: 20px; padding: 36px;
        }
        .booking-panel h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 400;
          color: ${COLORS.cream}; margin-bottom: 28px;
        }
        .slots-group { margin-bottom: 24px; }
        .slots-group-label {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${COLORS.gold}; margin-bottom: 10px; display: block;
        }
        .slots-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .slot-btn {
          padding: 7px 16px; border-radius: 100px;
          font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 400;
          border: 1px solid rgba(212,200,138,0.2);
          color: rgba(240,235,204,0.7); background: transparent;
          cursor: pointer; transition: all 0.2s;
        }
        .slot-btn:hover { border-color: ${COLORS.gold}; color: ${COLORS.gold}; }
        .slot-btn.selected {
          background: ${COLORS.orangeLight}; border-color: ${COLORS.orangeLight};
          color: #fff;
        }
        .btn-book {
          width: 100%; padding: 14px;
          background: ${COLORS.greenPrimary}; border: none; border-radius: 100px;
          font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; color: ${COLORS.cream};
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          margin-top: 8px;
        }
        .btn-book:hover { background: #5a7033; transform: translateY(-1px); }
        .btn-book:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        /* ── BOOKING FORM MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(30,45,18,0.7);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .modal {
          background: ${COLORS.cream}; border-radius: 20px;
          padding: 48px; max-width: 480px; width: 100%;
          position: relative;
        }
        .modal-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none; font-size: 20px;
          cursor: pointer; color: ${COLORS.greenMid};
          line-height: 1;
        }
        .modal h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 300;
          color: ${COLORS.greenDark}; margin-bottom: 8px;
        }
        .modal .selected-info {
          font-size: 13px; color: ${COLORS.orangeLight};
          margin-bottom: 28px; font-weight: 400;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .form-group label {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${COLORS.greenMid};
        }
        .form-group input, .form-group textarea {
          padding: 12px 16px; border-radius: 10px;
          border: 1.5px solid rgba(74,92,42,0.2);
          font-family: 'Jost', sans-serif; font-size: 14px;
          color: ${COLORS.greenDark}; background: ${COLORS.creamDark};
          outline: none; transition: border-color 0.2s; resize: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: ${COLORS.greenPrimary};
        }
        .btn-submit {
          width: 100%; padding: 14px; border: none; border-radius: 100px;
          background: ${COLORS.greenPrimary}; color: ${COLORS.cream};
          font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; cursor: pointer;
          transition: background 0.2s, transform 0.15s; margin-top: 8px;
        }
        .btn-submit:hover { background: ${COLORS.greenDark}; transform: translateY(-1px); }

        /* ── CONFIRM ── */
        .confirm-box {
          text-align: center;
        }
        .confirm-icon {
          font-size: 48px; margin-bottom: 20px; display: block;
        }
        .confirm-box h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 300;
          color: ${COLORS.greenDark}; margin-bottom: 12px;
        }
        .confirm-box p {
          font-size: 14px; font-weight: 300; line-height: 1.7;
          color: ${COLORS.greenPrimary}; margin-bottom: 8px;
        }
        .confirm-zoom {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 20px; padding: 12px 24px; border-radius: 100px;
          background: #2D8CFF; color: #fff;
          font-family: 'Jost', sans-serif; font-size: 13px;
          text-decoration: none; font-weight: 500;
          transition: opacity 0.2s;
        }
        .confirm-zoom:hover { opacity: 0.88; }

        /* ── FOOTER ── */
        footer {
          background: ${COLORS.greenDark}; padding: 48px 64px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; color: ${COLORS.cream}; opacity: 0.8;
        }
        footer p { font-size: 12px; color: rgba(240,235,204,0.3); letter-spacing: 0.05em; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .navbar { padding: 0 24px; }
          .nav-links { display: none; }
          .btn-login { display: none; }
          .hamburger { display: flex; }
          .page-hero-inner { padding: 60px 24px 48px; }
          .filter-bar { padding: 28px 24px; }
          .audio-section { padding: 48px 24px; }
          .audio-grid { grid-template-columns: 1fr; }
          .rdv-section { padding: 64px 24px; }
          .rdv-inner { grid-template-columns: 1fr; gap: 48px; }
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
          <li><Link href="/audio" className="active">Audio</Link></li>
          <li><Link href="/#rdv">Praticiens</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/login" className="btn-login">Connexion</Link>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
          background: COLORS.cream, borderBottom: `1px solid rgba(74,92,42,0.12)`,
          padding: "20px 28px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {[["Méditation", "/#meditation"], ["Audio", "/audio"], ["Praticiens", "/#rdv"], ["Contact", "/#contact"]].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, color: COLORS.greenPrimary, textDecoration: "none" }}>
              {label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)}
            style={{ fontSize: 15, color: COLORS.orange, textDecoration: "none" }}>
            Connexion
          </Link>
        </div>
      )}

      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="tag">Ressources audio</span>
          <h1>Guidances <em>à portée d'oreille</em></h1>
          <p>
            Méditations guidées, exercices de respiration et ambiances sonores — disponibles à tout moment,
            pour accompagner chaque moment de votre journée.
          </p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── AUDIO GRID ── */}
      <section className="audio-section">
        <p className="audio-section-title">
          {filtered.length} ressource{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
        </p>
        <div className="audio-grid">
          {filtered.map((audio) => {
            const isPlaying = playing === audio.id;
            return (
              <div
                key={audio.id}
                className={`audio-card${isPlaying ? " playing" : ""}`}
                onClick={() => setPlaying(isPlaying ? null : audio.id)}
              >
                <div className="card-top">
                  <div className="card-icon">{audio.icon}</div>
                  <div className="card-meta">
                    <span className="badge">{audio.level}</span>
                    <span className="badge-cat">{audio.category}</span>
                  </div>
                </div>
                <h3 className="card-title">{audio.title}</h3>
                <p className="card-desc">{audio.desc}</p>
                <div className="card-footer">
                  <button
                    className={`play-circle${isPlaying ? " active" : " idle"}`}
                    onClick={(e) => { e.stopPropagation(); setPlaying(isPlaying ? null : audio.id); }}
                    aria-label={isPlaying ? "Pause" : "Lecture"}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  {isPlaying ? (
                    <div className="waveform">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="wave-bar"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="duration-tag">{audio.duration}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── RDV ZOOM ── */}
      <section id="rdv" className="rdv-section">
        <div className="rdv-inner">
          {/* Left text */}
          <div className="rdv-text">
            <span className="tag">Séance personnalisée</span>
            <h2>
              Réservez une séance
              <br />
              <em>Zoom avec un praticien</em>
            </h2>
            <p>
              Vous souhaitez aller plus loin ? Nos praticiens certifiés vous accompagnent en
              séance individuelle sur Zoom, à votre rythme et selon vos besoins.
            </p>
            <div className="rdv-features">
              {[
                "Séance individuelle de 45 à 60 minutes",
                "Lien Zoom envoyé par e-mail après réservation",
                "Première séance découverte offerte",
                "Annulation gratuite jusqu'à 24h avant",
              ].map((f) => (
                <div className="rdv-feature" key={f}>
                  <div className="rdv-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right: booking panel */}
          <div className="booking-panel">
            <h3>Choisissez un créneau</h3>
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
            <button className="btn-book" disabled={!selectedSlot} onClick={handleBook}>
              {selectedSlot
                ? `Réserver — ${selectedSlot.day} ${selectedSlot.slot}`
                : "Sélectionnez un créneau"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <span className="footer-logo">✦ Sérénité</span>
        <p>© {new Date().getFullYear()} — Méditation & Bien-être</p>
      </footer>

      {/* ── BOOKING MODAL ── */}
      {bookingStep !== "idle" && (
        <div className="modal-overlay" onClick={() => { setBookingStep("idle"); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setBookingStep("idle")}>✕</button>

            {bookingStep === "form" && (
              <>
                <h3>Votre réservation</h3>
                <p className="selected-info">
                  📅 {selectedSlot?.day} à {selectedSlot?.slot} — Séance Zoom
                </p>
                <form onSubmit={handleSubmit}>
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
                      rows={3} placeholder="Stress au travail, troubles du sommeil, anxiété..."
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn-submit">
                    Confirmer la réservation
                  </button>
                </form>
              </>
            )}

            {bookingStep === "confirm" && (
              <div className="confirm-box">
                <span className="confirm-icon">🌿</span>
                <h3>Séance confirmée !</h3>
                <p>
                  <strong>{form.name}</strong>, votre séance est réservée pour le{" "}
                  <strong>{selectedSlot?.day} à {selectedSlot?.slot}</strong>.
                </p>
                <p>
                  Un e-mail de confirmation avec le lien Zoom a été envoyé à{" "}
                  <strong>{form.email}</strong>.
                </p>
                <a href="#" className="confirm-zoom">
                  📹 Rejoindre la séance Zoom
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
