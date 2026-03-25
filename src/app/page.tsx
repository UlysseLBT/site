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
    subtitle: "Des séances guidées pour apaiser votre esprit et votre corps",
    cta: "Réserver une séance",
    href: "/rdv",
  },
  {
    title: "Méditation & Bien-être",
    subtitle: "Découvrez différentes pratiques adaptées à votre rythme de vie",
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
  { icon: "🌿", title: "Pleine conscience", desc: "Ancrez-vous dans le moment présent grâce à des exercices de respiration et d'observation." },
  { icon: "🌙", title: "Méditation du soir", desc: "Préparez votre esprit au repos avec des visualisations douces et apaisantes." },
  { icon: "☀️", title: "Éveil matinal", desc: "Démarrez chaque journée avec clarté, énergie et intention positive." },
  { icon: "💧", title: "Gestion du stress", desc: "Techniques éprouvées pour relâcher les tensions et retrouver l'équilibre." },
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
          font-size: 13px;
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

        .btn-login {
          padding: 9px 22px;
          border: 1.5px solid ${COLORS.greenPrimary};
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${COLORS.greenPrimary};
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }

        .btn-login:hover {
          background: ${COLORS.greenPrimary};
          color: ${COLORS.cream};
        }

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
          font-size: 11px;
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
          font-size: clamp(42px, 5vw, 64px);
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
          font-size: 15px;
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
          padding: 14px 32px;
          background: ${COLORS.greenPrimary};
          border: none;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
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
          font-size: 13px;
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

        /* Hero right – botanical illustration area */
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

        /* SVG silhouettes */
        .silhouette-group {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-svg {
          width: 80%;
          max-width: 420px;
          opacity: 0.9;
        }

        /* Floating botanical elements */
        .leaf-1, .leaf-2, .leaf-3 {
          position: absolute;
          opacity: 0.18;
          pointer-events: none;
        }

        .leaf-1 { top: 8%; right: 8%; font-size: 80px; transform: rotate(-15deg); }
        .leaf-2 { bottom: 12%; left: 6%; font-size: 60px; transform: rotate(20deg); }
        .leaf-3 { top: 55%; right: 4%; font-size: 40px; transform: rotate(-30deg); }

        /* ── SECTION INTRO ── */
        .section-intro {
          padding: 100px 64px;
          background: ${COLORS.cream};
          display: grid;
          grid-template-columns: 1fr 2px 1fr;
          gap: 64px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .intro-divider {
          background: rgba(74,92,42,0.15);
          height: 120px;
          align-self: center;
        }

        .intro-block h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: ${COLORS.greenDark};
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .intro-block p {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: ${COLORS.greenPrimary};
          opacity: 0.85;
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
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          display: block;
          margin-bottom: 16px;
        }

        .section-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
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
          font-size: 20px;
          font-weight: 400;
          color: ${COLORS.cream};
          margin-bottom: 10px;
        }

        .card-med p {
          font-size: 13px;
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
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.orangeLight};
          display: block;
          margin-bottom: 16px;
        }

        .audio-text h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: ${COLORS.greenDark};
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .audio-text p {
          font-size: 14px;
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
          font-size: 13px;
          font-weight: 400;
          color: ${COLORS.cream};
          display: block;
          margin-bottom: 3px;
        }

        .track-info .duration {
          font-size: 11px;
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

        /* ── RDV BANNER ── */
        .rdv-banner {
          background: ${COLORS.greenPrimary};
          padding: 80px 64px;
          text-align: center;
        }

        .rdv-banner h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px;
          font-weight: 300;
          color: ${COLORS.cream};
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .rdv-banner p {
          font-size: 15px;
          font-weight: 300;
          color: rgba(240,235,204,0.7);
          margin-bottom: 36px;
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
          font-size: 12px;
          color: rgba(240,235,204,0.3);
          letter-spacing: 0.05em;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .navbar { padding: 0 24px; }
          .nav-links { display: none; }
          .btn-login { display: none; }
          .hamburger { display: flex; }

          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 60px 28px; }
          .hero-right { min-height: 40vh; }

          .section-intro {
            grid-template-columns: 1fr;
            padding: 64px 28px;
          }
          .intro-divider { display: none; }

          .section-meditation { padding: 64px 28px; }
          .section-audio { flex-direction: column; padding: 64px 28px; }
          .rdv-banner { padding: 64px 28px; }
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
          <li><a href="#rdv">Praticiens</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/login" className="btn-login">Connexion</a>
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </div>
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
          {["Méditation#meditation", "Audio#audio", "Praticiens#rdv", "Contact#contact"].map((item) => {
            const [label, hash] = item.split("#");
            return (
              <a key={label} href={`#${hash}`}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 15, color: COLORS.greenPrimary, textDecoration: "none" }}
              >
                {label}
              </a>
            );
          })}
          <a href="/login" style={{ fontSize: 15, color: COLORS.orange, textDecoration: "none" }}>
            Connexion
          </a>
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

        {/* Right: botanical / silhouette illustration */}
        <div className="hero-right">
          <span className="leaf-1">🌿</span>
          <span className="leaf-2">🍃</span>
          <span className="leaf-3">✦</span>

          <svg
            className="hero-svg"
            viewBox="0 0 400 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle cx="200" cy="250" r="160" fill={`${COLORS.greenMid}18`} />

            {/* Lotus / mandala decorative */}
            <circle cx="200" cy="250" r="100" stroke={`${COLORS.greenMid}30`} strokeWidth="1" />
            <circle cx="200" cy="250" r="70" stroke={`${COLORS.gold}40`} strokeWidth="0.8" />

            {/* Sitting silhouette - left figure */}
            <g transform="translate(100, 160)">
              {/* Head */}
              <circle cx="42" cy="20" r="18" fill={COLORS.greenPrimary} />
              {/* Body */}
              <path
                d="M20 45 Q42 38 64 45 Q72 80 64 110 Q42 118 20 110 Q12 80 20 45Z"
                fill={COLORS.greenPrimary}
              />
              {/* Left arm in lap */}
              <path
                d="M20 70 Q8 85 14 105 Q22 110 30 100 Q26 88 28 72Z"
                fill={COLORS.greenMid}
              />
              {/* Right arm in lap */}
              <path
                d="M64 70 Q76 85 70 105 Q62 110 54 100 Q58 88 56 72Z"
                fill={COLORS.greenMid}
              />
              {/* Crossed legs */}
              <path
                d="M18 110 Q10 130 20 148 Q35 155 50 148 Q42 130 42 118Z"
                fill={COLORS.greenPrimary}
              />
              <path
                d="M66 110 Q74 130 64 148 Q49 155 34 148 Q42 130 42 118Z"
                fill={COLORS.greenMid}
              />
            </g>

            {/* Sitting silhouette - right figure (slightly larger, offset) */}
            <g transform="translate(220, 180)">
              {/* Head */}
              <circle cx="42" cy="18" r="15" fill={COLORS.greenDark} />
              {/* Body */}
              <path
                d="M24 40 Q42 34 60 40 Q67 70 60 96 Q42 103 24 96 Q17 70 24 40Z"
                fill={COLORS.greenDark}
              />
              {/* Arms */}
              <path
                d="M24 62 Q13 74 18 92 Q25 97 31 88 Q28 78 29 64Z"
                fill={COLORS.greenPrimary}
              />
              <path
                d="M60 62 Q71 74 66 92 Q59 97 53 88 Q56 78 55 64Z"
                fill={COLORS.greenPrimary}
              />
              {/* Legs */}
              <path
                d="M22 96 Q14 114 22 130 Q35 136 48 130 Q42 114 42 103Z"
                fill={COLORS.greenDark}
              />
              <path
                d="M62 96 Q70 114 62 130 Q49 136 36 130 Q42 114 42 103Z"
                fill={COLORS.greenPrimary}
              />
            </g>

            {/* Decorative botanical lines */}
            <path
              d="M40 400 Q80 350 120 380 Q160 410 200 360 Q240 310 280 340 Q320 370 360 320"
              stroke={`${COLORS.greenMid}50`}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M30 420 Q90 380 150 400 Q200 420 260 380 Q310 345 370 360"
              stroke={`${COLORS.gold}60`}
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Small floating dots */}
            {[
              [80, 80], [320, 100], [60, 300], [340, 280], [190, 60],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill={COLORS.gold} opacity="0.4" />
            ))}
          </svg>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="about">
        <div className="section-intro">
          <div className="intro-block">
            <h2>Un espace de calme, rien que pour vous</h2>
            <p>
              Nous croyons que chacun mérite un moment de pause. Notre approche douce et
              bienveillante vous accompagne, à votre rythme, vers plus de sérénité au quotidien.
            </p>
          </div>
          <div className="intro-divider" />
          <div className="intro-block">
            <h2>Des praticiens à votre écoute</h2>
            <p>
              Nos guides certifiés vous proposent des séances personnalisées en présentiel ou
              en ligne, adaptées à vos besoins et à votre disponibilité.
            </p>
          </div>
        </div>
      </section>

      {/* ── MEDITATION TYPES ── */}
      <section id="meditation" className="section-meditation">
        <div className="section-header">
          <span className="tag">Nos pratiques</span>
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
            <span className="tag">Ressources audio</span>
            <h2>
              Des guidances
              <br />
              <em style={{ fontStyle: "italic", color: COLORS.greenMid }}>à portée d'oreille</em>
            </h2>
            <p>
              Notre bibliothèque audio propose des méditations guidées, des exercices de
              respiration et des ambiances sonores pour chaque moment de votre journée.
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

      {/* ── RDV BANNER ── */}
      <section id="rdv" className="rdv-banner">
        <h2>Réservez votre séance</h2>
        <p>Un accompagnement doux, à votre rythme, en ligne ou en présentiel.</p>
        <a href="/coaches" className="btn-primary" style={{ display: "inline-block" }}>
          Voir les praticiens disponibles
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <span className="footer-logo">✦ Sérénité</span>
        <p>© {new Date().getFullYear()} — Méditation & Bien-être</p>
      </footer>
    </>
  );
}
