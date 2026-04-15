"use client";
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

const bienfaits = [
  {
    icon: "🌿",
    title: "Comprendre la dépendance",
    desc: "L'usage devient problématique dès que nous n'arrivons plus à « fonctionner » sans le produit. Nervosité, angoisse, sentiment d'infériorité — ce sont les signes d'un manque qui nous pousse à consommer de nouveau.",
  },
  {
    icon: "🧠",
    title: "Le circuit de la récompense",
    desc: "Le bien-être conditionné à la prise de produit est induit par une réaction hormonale qui stimule notre circuit de la récompense. Le corps s'habitue et il faut parfois augmenter les doses pour retrouver la sensation initiale.",
  },
  {
    icon: "💚",
    title: "La Pleine Conscience comme soutien",
    desc: "Être à l'écoute de ses ressentis, de ses émotions et de son mental permet d'introduire davantage de lucidité dans nos actes en comprenant l'origine de nos comportements et de nos pensées automatiques.",
  },
  {
    icon: "🌱",
    title: "Gestion du stress & des émotions",
    desc: "Ces techniques, lorsqu'elles s'inscrivent dans une pratique régulière, ont un impact positif sur la gestion du stress et des émotions. Elles permettent aussi d'aborder la douleur chronique avec moins d'angoisse.",
  },
  {
    icon: "✨",
    title: "S'accepter avec bienveillance",
    desc: "Lorsque nous nous acceptons pour qui nous sommes et accordons moins d'importance au jugement d'autrui, nous réduisons la sensation de stress chronique — et avons moins besoin d'activer notre système de la récompense.",
  },
  {
    icon: "⚖️",
    title: "Vers des choix plus conscients",
    desc: "Une meilleure estime de soi et une meilleure stabilité émotionnelle nous conduisent à faire des choix plus conscients. Le recours aux consommations impérieuses devient moins nécessaire et donc moins fréquent.",
  },
];

export default function AboutPage() {
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

        .logo-leaf { color: ${COLORS.greenMid}; font-size: 18px; }

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

        /* ── HERO BANNER ── */
        .page-hero {
          padding-top: 70px;
          background: ${COLORS.creamDark};
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 60vh;
          overflow: hidden;
        }

        .page-hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
        }

        .page-tag {
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

        .page-tag::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: ${COLORS.orangeLight};
        }

        .page-hero-left h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 300;
          line-height: 1.15;
          color: ${COLORS.greenDark};
          margin-bottom: 20px;
        }

        .page-hero-left h1 em {
          font-style: italic;
          color: ${COLORS.greenMid};
        }

        .page-hero-left p {
          font-size: 17px;
          font-weight: 300;
          line-height: 1.8;
          color: ${COLORS.greenPrimary};
          max-width: 400px;
          opacity: 0.85;
        }

        .page-hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: ${COLORS.greenMid}18;
        }

        .page-hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(74,92,42,0.1) 0%, transparent 70%);
        }

        .hero-img-wrapper {
          position: relative;
          z-index: 1;
          width: 520px;
          height: 380px;
          border-radius: 260px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(30,45,18,0.18);
        }

        .hero-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }

        /* Fallback si pas de photo */
        .hero-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(160deg, ${COLORS.greenPrimary}, ${COLORS.greenDark});
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          opacity: 0.6;
        }

        /* ── INTRO QUOTE ── */
        .quote-section {
          background: ${COLORS.greenPrimary};
          padding: 72px 64px;
          text-align: center;
        }

        .quote-section blockquote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 300;
          font-style: italic;
          color: ${COLORS.cream};
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .quote-section cite {
          display: block;
          margin-top: 20px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          font-style: normal;
        }

        /* ── BIENFAITS GRID ── */
        .bienfaits-section {
          padding: 100px 64px;
          background: ${COLORS.cream};
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-header .tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.orangeLight};
          display: block;
          margin-bottom: 16px;
        }

        .section-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px;
          font-weight: 300;
          color: ${COLORS.greenDark};
          line-height: 1.2;
        }

        .bienfaits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .bienfait-card {
          background: ${COLORS.creamDark};
          border-radius: 20px;
          padding: 36px 28px;
          border: 1px solid rgba(74,92,42,0.08);
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .bienfait-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(30,45,18,0.08);
        }

        .bienfait-icon {
          font-size: 32px;
          margin-bottom: 18px;
          display: block;
        }

        .bienfait-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 400;
          color: ${COLORS.greenDark};
          margin-bottom: 12px;
        }

        .bienfait-card p {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: ${COLORS.greenPrimary};
          opacity: 0.85;
        }

        /* ── CTA SECTION ── */
        .cta-section {
          background: ${COLORS.greenDark};
          padding: 100px 64px;
          text-align: center;
        }

        .cta-section .tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          display: block;
          margin-bottom: 20px;
        }

        .cta-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 300;
          color: ${COLORS.cream};
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .cta-section h2 em { font-style: italic; color: ${COLORS.gold}; }

        .cta-section p {
          font-size: 16px;
          font-weight: 300;
          color: rgba(240,235,204,0.65);
          max-width: 460px;
          margin: 0 auto 40px;
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .btn-light {
          padding: 15px 36px;
          background: ${COLORS.cream};
          border: none;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: ${COLORS.greenDark};
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }

        .btn-light:hover {
          background: ${COLORS.gold};
          transform: translateY(-2px);
        }

        .btn-outline {
          padding: 14px 34px;
          background: transparent;
          border: 1px solid rgba(240,235,204,0.3);
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: ${COLORS.cream};
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-block;
        }

        .btn-outline:hover {
          border-color: ${COLORS.gold};
          color: ${COLORS.gold};
        }

        /* ── FOOTER ── */
        footer {
          background: ${COLORS.greenDark};
          border-top: 1px solid rgba(240,235,204,0.06);
          padding: 40px 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: ${COLORS.cream};
          opacity: 0.8;
          text-decoration: none;
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

          .page-hero { grid-template-columns: 1fr; min-height: auto; }
          .page-hero-left { padding: 60px 28px 40px; }
          .page-hero-right { min-height: 320px; padding: 40px 28px; }
          .hero-img-wrapper { width: 340px; height: 260px; border-radius: 180px; }

          .quote-section { padding: 56px 28px; }

          .bienfaits-section { padding: 64px 28px; }
          .bienfaits-grid { grid-template-columns: 1fr; }

          .cta-section { padding: 72px 28px; }
          footer { flex-direction: column; gap: 12px; text-align: center; padding: 32px 28px; }
        }

        @media (min-width: 901px) and (max-width: 1100px) {
          .bienfaits-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="/" className="logo">
          <span className="logo-leaf">✦</span>
          Sérénité
        </a>
        <ul className="nav-links">
          <li><a href="/meditation">Méditation</a></li>
          <li><a href="/audio">Audio</a></li>
          <li><a href="/rdv">Rendez-vous</a></li>
          <li><a href="/about">En savoir plus</a></li>
          <li><a href="/who">Qui je suis</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-left">
          <span className="page-tag">En savoir plus</span>
          <h1>
            Pleine Conscience & <em>Bien-être</em>
          </h1>
          <p>
            Ce site est ouvert à toutes les personnes qui souhaitent réduire leurs consommations, dans un contexte de recours problématique à une ou plusieurs substances, en s'initiant aux pratiques de la Pleine Conscience.
          </p>
        </div>

        <div className="page-hero-right">
          {/* Remplace /images/about.jpg par ta photo */}
          <div className="hero-img-wrapper">
            <img src="/images/about.jpg" alt="Méditation & bien-être" />
          </div>
        </div>
      </section>

      {/* ── CITATION ── */}
      <section className="quote-section">
        <blockquote>
          "Être à l'écoute de ses ressentis, de ses émotions et de son mental, permet d'introduire davantage de lucidité dans nos actes en comprenant l'origine de nos comportements."
        </blockquote>
        <cite>— Approche de la Pleine Conscience</cite>
      </section>

      {/* ── BIENFAITS ── */}
      <section className="bienfaits-section">
        <div className="section-header">
          <span className="tag">Comprendre & agir</span>
          <h2>Comment la Pleine Conscience peut aider</h2>
        </div>

        <div className="bienfaits-grid">
          {bienfaits.map((b) => (
            <div className="bienfait-card" key={b.title}>
              <span className="bienfait-icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <span className="tag">Prêt·e à commencer ?</span>
        <h2>Commencez votre <em>pratique aujourd'hui</em></h2>
        <p>
          Que vous soyez débutant·e ou pratiquant·e confirmé·e, nos séances s'adaptent à votre rythme.
        </p>
        <div className="cta-buttons">
          <a href="/rdv" className="btn-light">Réserver une séance →</a>
          <a href="/meditation" className="btn-outline">Explorer les méditations</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <a href="/" className="footer-logo">✦ Sérénité</a>
        <p>© {new Date().getFullYear()} — Méditation & Bien-être</p>
      </footer>
    </>
  );
}