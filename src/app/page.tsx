"use client";
import { useState, useEffect } from "react";
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

const slides = [
  {
    title: "Retrouvez la paix intérieure",
    subtitle: "Séances guidées pour apaiser votre esprit et votre corps",
    cta: "Réserver une séance",
    href: "/rdv",
  },
  {
    title: "Méditation & Bien-être",
    subtitle: "Différentes pratiques adaptées à votre rythme de vie",
    cta: "Explorer les méditations",
    href: "/meditation",
  },
  {
    title: "Guidances audio apaisantes",
    subtitle: "Écoutez nos séances audio à tout moment, où que vous soyez",
    cta: "Écouter maintenant",
    href: "/audio",
  },
];

const meditationTypes = [
  { icon: "🌿", title: "Pleine conscience", desc: "Ancrez-vous dans le présent par la respiration et l'observation." },
  { icon: "🌙", title: "Méditation du soir", desc: "Visualisations douces pour préparer votre esprit au repos." },
  { icon: "☀️", title: "Éveil matinal", desc: "Démarrez chaque journée avec clarté et intention positive." },
  { icon: "💧", title: "Gestion du stress", desc: "Techniques pour relâcher les tensions et retrouver l'équilibre." },
];

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

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
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 70px;
          background: rgba(240,235,204,0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(74,92,42,0.12);
        }

        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          color: ${COLORS.greenDark};
          letter-spacing: 0.04em;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-leaf {
          color: ${COLORS.greenMid};
          font-size: 18px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }

        .nav-links a {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${COLORS.greenPrimary};
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 1px;
          background: ${COLORS.orange};
          transform: scaleX(0);
          transition: transform 0.25s;
          transform-origin: left;
        }

        .nav-links a:hover { color: ${COLORS.orange}; }
        .nav-links a:hover::after { transform: scaleX(1); }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: ${COLORS.greenDark};
          transition: all 0.3s;
        }

        /* ── HERO ── */
        .hero {
          padding-top: 70px;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px 80px 64px;
          position: relative;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.orangeLight};
          margin-bottom: 24px;
        }

        .hero-tag::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: ${COLORS.orangeLight};
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 5vw, 66px);
          font-weight: 300;
          line-height: 1.15;
          color: ${COLORS.greenDark};
          margin-bottom: 20px;
          transition: opacity 0.5s, transform 0.5s;
        }

        .hero-title em {
          font-style: italic;
          color: ${COLORS.greenMid};
        }

        .hero-subtitle {
          font-size: 17px;
          font-weight: 300;
          line-height: 1.7;
          color: ${COLORS.greenPrimary};
          max-width: 380px;
          margin-bottom: 40px;
          opacity: 0.85;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-primary {
          padding: 15px 34px;
          background: ${COLORS.greenPrimary};
          border: none;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: ${COLORS.cream};
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }

        .btn-primary:hover {
          background: ${COLORS.greenDark};
          transform: translateY(-1px);
        }

        .btn-secondary {
          font-size: 14px;
          font-weight: 400;
          color: ${COLORS.orange};
          text-decoration: none;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s;
        }

        .btn-secondary:hover { gap: 10px; }

        /* Slide dots */
        .slide-dots {
          display: flex;
          gap: 8px;
          margin-top: 48px;
        }

        .dot {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          background: rgba(74,92,42,0.2);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }

        .dot.active {
          background: ${COLORS.orange};
          width: 40px;
        }

        /* Hero right – photo area */
        .hero-right {
          background: ${COLORS.creamDark};
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 60% 40%, rgba(74,92,42,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 30% 80%, rgba(184,97,26,0.06) 0%, transparent 55%);
        }

        /* Photo container */
        .hero-photo-wrapper {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Cercle flou décoratif derrière la photo */
        .hero-photo-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: rgba(107,122,64,0.15);
          filter: blur(24px);
        }

        /* Anneau décoratif autour de la photo */
        .hero-photo-ring {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(107,122,64,0.25);
        }

        .hero-photo-ring-2 {
          position: absolute;
          width: 370px;
          height: 370px;
          border-radius: 50%;
          border: 0.8px solid rgba(212,200,138,0.3);
        }

        /* La photo elle-même */
        .hero-photo {
          position: relative;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          z-index: 2;
          box-shadow: 0 20px 60px rgba(30,45,18,0.2);
        }

        .leaf-1, .leaf-2, .leaf-3 {
          position: absolute;
          opacity: 0.18;
          pointer-events: none;
        }

        .leaf-1 { top: 8%; right: 8%; font-size: 80px; transform: rotate(-15deg); }
        .leaf-2 { bottom: 12%; left: 6%; font-size: 60px; transform: rotate(20deg); }
        .leaf-3 { top: 55%; right: 4%; font-size: 40px; transform: rotate(-30deg); }

        /* ── RDV SECTION (prominent, second on page) ── */
        .rdv-section {
          background: ${COLORS.greenPrimary};
          padding: 110px 64px;
          text-align: center;
        }

        .rdv-section .section-tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          display: block;
          margin-bottom: 20px;
        }

        .rdv-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(46px, 5.5vw, 70px);
          font-weight: 300;
          color: ${COLORS.cream};
          margin-bottom: 20px;
          line-height: 1.15;
        }

        .rdv-section h2 em { font-style: italic; color: ${COLORS.gold}; }

        .rdv-section > p {
          font-size: 17px;
          font-weight: 300;
          color: rgba(240,235,204,0.72);
          margin-bottom: 44px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .btn-rdv {
          padding: 18px 48px;
          background: ${COLORS.cream};
          border: none;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: ${COLORS.greenDark};
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }

        .btn-rdv:hover {
          background: ${COLORS.gold};
          transform: translateY(-2px);
        }

        /* ── MEDITATION TYPES ── */
        .section-meditation {
          background: ${COLORS.greenDark};
          padding: 100px 64px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-header .tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          display: block;
          margin-bottom: 16px;
        }

        .section-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px;
          font-weight: 300;
          color: ${COLORS.cream};
          line-height: 1.2;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .card-med {
          background: rgba(240,235,204,0.06);
          border: 1px solid rgba(212,200,138,0.15);
          border-radius: 16px;
          padding: 32px 28px;
          transition: background 0.25s, transform 0.25s;
        }

        .card-med:hover {
          background: rgba(240,235,204,0.1);
          transform: translateY(-4px);
        }

        .card-med .icon {
          font-size: 28px;
          margin-bottom: 16px;
          display: block;
        }

        .card-med h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: ${COLORS.cream};
          margin-bottom: 10px;
        }

        .card-med p {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(240,235,204,0.6);
        }

        /* ── AUDIO SECTION ── */
        .section-audio {
          padding: 100px 64px;
          background: ${COLORS.creamDark};
          display: flex;
          gap: 80px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .audio-text { flex: 1; }

        .audio-text .tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.orangeLight};
          display: block;
          margin-bottom: 16px;
        }

        .audio-text h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 300;
          color: ${COLORS.greenDark};
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .audio-text p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: ${COLORS.greenPrimary};
          opacity: 0.85;
          margin-bottom: 32px;
        }

        .audio-player-mock {
          flex: 1;
          background: ${COLORS.greenDark};
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .audio-track {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(240,235,204,0.06);
          cursor: pointer;
          transition: background 0.2s;
        }

        .audio-track:hover { background: rgba(240,235,204,0.1); }

        .play-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: ${COLORS.orangeLight};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
          color: #fff;
        }

        .track-info { flex: 1; }

        .track-info .name {
          font-size: 14px;
          font-weight: 400;
          color: ${COLORS.cream};
          display: block;
          margin-bottom: 3px;
        }

        .track-info .duration {
          font-size: 12px;
          color: rgba(240,235,204,0.4);
        }

        .track-bar {
          height: 2px;
          background: rgba(240,235,204,0.15);
          border-radius: 1px;
          overflow: hidden;
        }

        .track-bar-fill {
          height: 100%;
          background: ${COLORS.orangeLight};
          border-radius: 1px;
        }

        /* ── FOOTER ── */
        footer {
          background: ${COLORS.greenDark};
          padding: 48px 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: ${COLORS.cream};
          opacity: 0.8;
        }

        footer p {
          font-size: 13px;
          color: rgba(240,235,204,0.3);
          letter-spacing: 0.05em;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .navbar { padding: 0 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }

          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 60px 28px; }
          .hero-right { min-height: 40vh; }

          .hero-photo { width: 220px; height: 220px; }
          .hero-photo-glow { width: 280px; height: 280px; }
          .hero-photo-ring { width: 280px; height: 280px; }
          .hero-photo-ring-2 { width: 250px; height: 250px; }

          .rdv-section { padding: 72px 28px; }

          .section-meditation { padding: 64px 28px; }
          .section-audio { flex-direction: column; padding: 64px 28px; }
          footer { flex-direction: column; gap: 16px; text-align: center; padding: 40px 28px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-leaf">✦</span>
          Sérénité
        </a>

        <ul className="nav-links">
          <li><a href="#meditation">Méditation</a></li>
          <li><a href="#audio">Audio</a></li>
          <li><a href="#rdv">Rendez-vous</a></li>
          <li><a href="/about">En savoir plus</a></li>
          <li><a href="/who">Qui je suis</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
          background: COLORS.cream,
          borderBottom: `1px solid rgba(74,92,42,0.12)`,
          padding: "20px 28px",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {["Méditation#meditation", "Audio#audio", "Rendez-vous#rdv", "En savoir plus#about", "Qui je suis#who", "Contact#contact"].map((item) => {
            const [label, hash] = item.split("#");
            const href = label === "En savoir plus" ? "/about" : label === "Qui je suis" ? "/who" : `#${hash}`;
            return (
              <a key={label} href={href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 16, color: COLORS.greenPrimary, textDecoration: "none" }}
              >
                {label}
              </a>
            );
          })}
        </div>
      )}

      {/* ── HERO / CAROUSEL ── */}
      <section className="hero">
        {/* Left: text */}
        <div className="hero-left">
          <span className="hero-tag">Bien-être & Méditation</span>

          <h1 className="hero-title">
            {slides[current].title.split(" ").slice(0, 2).join(" ")}{" "}
            <em>{slides[current].title.split(" ").slice(2).join(" ")}</em>
          </h1>

          <p className="hero-subtitle">{slides[current].subtitle}</p>

          <div className="hero-actions">
            <a href={slides[current].href} className="btn-primary">
              {slides[current].cta}
            </a>
            <a href="#meditation" className="btn-secondary">
              En savoir plus →
            </a>
          </div>

          <div className="slide-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`dot${current === i ? " active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="hero-right">
          <span className="leaf-1">🌿</span>
          <span className="leaf-2">🍃</span>
          <span className="leaf-3">✦</span>

          <div className="hero-photo-wrapper">
            {/* Cercles décoratifs */}
            <div className="hero-photo-glow" />
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring-2" />

            {/* Ta photo ici — place ton image dans public/images/hero.jpg */}
            <img
              src="/images/hero.jpg"
              alt="Méditation & Bien-être"
              className="hero-photo"
            />
          </div>
        </div>
      </section>

      {/* ── RDV SECTION — priorité 1 ── */}
      <section id="rdv" className="rdv-section">
        <span className="section-tag">Séance individuelle</span>
        <h2>Réservez votre <em>séance Zoom</em></h2>
        <p>Un accompagnement personnalisé avec un praticien certifié — en ligne, à votre rythme. La première séance est offerte.</p>
        <a href="/rdv" className="btn-rdv">
          Choisir un créneau →
        </a>
      </section>

      {/* ── MEDITATION TYPES — ressources solo ── */}
      <section id="meditation" className="section-meditation">
        <div className="section-header">
          <span className="tag">Ressources solo</span>
          <h2>Les types de méditation</h2>
        </div>
        <div className="cards-grid">
          {meditationTypes.map((m) => (
            <div className="card-med" key={m.title}>
              <span className="icon">{m.icon}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AUDIO ── */}
      <section id="audio" style={{ background: COLORS.creamDark }}>
        <div className="section-audio">
          <div className="audio-text">
            <span className="tag">Guidances audio</span>
            <h2>
              Des séances
              <br />
              <em style={{ fontStyle: "italic", color: COLORS.greenMid }}>à portée d'oreille</em>
            </h2>
            <p>
              Méditations guidées, exercices de respiration et ambiances sonores — disponibles à tout moment.
            </p>
            <a href="/audio" className="btn-primary">
              Accéder à la bibliothèque
            </a>
          </div>

          <div className="audio-player-mock">
            {[
              { name: "Respiration apaisante", duration: "12 min", fill: "65%" },
              { name: "Scan corporel du soir", duration: "18 min", fill: "30%" },
              { name: "Éveil en douceur", duration: "10 min", fill: "0%" },
            ].map((track) => (
              <div className="audio-track" key={track.name}>
                <div className="play-btn">▶</div>
                <div className="track-info">
                  <span className="name">{track.name}</span>
                  <span className="duration">{track.duration}</span>
                  <div className="track-bar" style={{ marginTop: 6 }}>
                    <div className="track-bar-fill" style={{ width: track.fill }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <span className="footer-logo">✦ Sérénité</span>
        <p>© {new Date().getFullYear()} — Méditation & Bien-être</p>
      </footer>
    </>
  );
}