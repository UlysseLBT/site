"use client";

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

export default function WhoPage() {
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
        }

        /* ── HERO ── */
        .page-hero {
          padding-top: 70px;
          min-height: 65vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }

        .hero-left {
          background: ${COLORS.greenDark};
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          position: relative;
        }

        .hero-left::after {
          content: '';
          position: absolute;
          top: 0; right: -1px;
          width: 60px; height: 100%;
          background: ${COLORS.greenDark};
          clip-path: polygon(0 0, 0% 100%, 100% 50%);
        }

        .page-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          margin-bottom: 24px;
        }

        .page-tag::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: ${COLORS.gold};
        }

        .hero-left h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5vw, 66px);
          font-weight: 300;
          line-height: 1.15;
          color: ${COLORS.cream};
          margin-bottom: 12px;
        }

        .hero-left h1 em {
          font-style: italic;
          color: ${COLORS.gold};
        }

        .hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: ${COLORS.gold};
          letter-spacing: 0.06em;
          margin-bottom: 24px;
        }

        .hero-left p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(240,235,204,0.7);
          max-width: 380px;
        }

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
          background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(74,92,42,0.1) 0%, transparent 70%);
        }

        .hero-photo-frame {
          position: relative;
          z-index: 1;
          width: 320px;
          height: 380px;
          border-radius: 180px 180px 140px 140px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(30,45,18,0.2);
        }

        .hero-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        /* Placeholder si pas de photo */
        .hero-photo-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(160deg, ${COLORS.greenPrimary}, ${COLORS.greenDark});
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          opacity: 0.5;
        }

        /* ── PARCOURS SECTION ── */
        .parcours-section {
          background: ${COLORS.cream};
          padding: 100px 64px;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .parcours-aside {
          position: sticky;
          top: 100px;
          align-self: start;
        }

        .aside-tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.orangeLight};
          display: block;
          margin-bottom: 16px;
        }

        .parcours-aside h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: ${COLORS.greenDark};
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .parcours-aside h2 em {
          font-style: italic;
          color: ${COLORS.greenMid};
        }

        .aside-line {
          width: 40px;
          height: 2px;
          background: ${COLORS.orange};
          border-radius: 1px;
        }

        .parcours-content {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .parcours-block p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.9;
          color: ${COLORS.greenPrimary};
          opacity: 0.9;
        }

        .parcours-block p + p {
          margin-top: 20px;
        }

        /* ── CAARUD SECTION ── */
        .caarud-section {
          background: ${COLORS.greenDark};
          padding: 80px 64px;
        }

        .caarud-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .caarud-tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          display: block;
          margin-bottom: 20px;
        }

        .caarud-inner h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: ${COLORS.cream};
          line-height: 1.2;
          margin-bottom: 32px;
        }

        .caarud-inner h2 em {
          font-style: italic;
          color: ${COLORS.gold};
        }

        .caarud-inner p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(240,235,204,0.72);
          margin-bottom: 20px;
        }

        /* ── APPROCHE SECTION ── */
        .approche-section {
          background: ${COLORS.greenPrimary};
          padding: 80px 64px;
          text-align: center;
        }

        .approche-section blockquote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 2.8vw, 34px);
          font-weight: 300;
          font-style: italic;
          color: ${COLORS.cream};
          max-width: 800px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .approche-section cite {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${COLORS.gold};
          font-style: normal;
        }

        /* ── CTA ── */
        .cta-section {
          background: ${COLORS.creamDark};
          padding: 80px 64px;
          text-align: center;
        }

        .cta-section .tag {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.orangeLight};
          display: block;
          margin-bottom: 20px;
        }

        .cta-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 300;
          color: ${COLORS.greenDark};
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .cta-section h2 em { font-style: italic; color: ${COLORS.greenMid}; }

        .cta-section p {
          font-size: 16px;
          font-weight: 300;
          color: ${COLORS.greenPrimary};
          max-width: 460px;
          margin: 0 auto 40px;
          line-height: 1.8;
          opacity: 0.85;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 15px 36px;
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
          transform: translateY(-2px);
        }

        .btn-outline {
          padding: 14px 34px;
          background: transparent;
          border: 1px solid rgba(74,92,42,0.3);
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: ${COLORS.greenPrimary};
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-block;
        }

        .btn-outline:hover {
          border-color: ${COLORS.greenDark};
          color: ${COLORS.greenDark};
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
          .hamburger { display: flex; }

          .page-hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 60px 28px; }
          .hero-left::after { display: none; }
          .hero-right { min-height: 360px; }
          .hero-photo-frame { width: 260px; height: 300px; }

          .parcours-section {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 64px 28px;
          }
          .parcours-aside { position: static; }

          .caarud-section { padding: 64px 28px; }
          .approche-section { padding: 64px 28px; }
          .cta-section { padding: 64px 28px; }
          footer { flex-direction: column; gap: 12px; text-align: center; padding: 32px 28px; }
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
        <div className="hero-left">
          <span className="page-tag">Qui je suis</span>
          <h1>Stéphanie <em>Morel</em></h1>
          <p className="hero-name">Infirmière D.E. · Méditation Pleine Conscience</p>
          <p>
            Infirmière et praticienne de la méditation, j'accompagne aujourd'hui les personnes en difficulté avec leurs consommations vers une meilleure connaissance d'elles-mêmes.
          </p>
        </div>

        <div className="hero-right">
          {/* Place ta photo dans public/images/stephanie.jpg */}
          <div className="hero-photo-frame">
            <img src="/images/stephanie.jpg" alt="Stéphanie Morel" />
          </div>
        </div>
      </section>

      {/* ── PARCOURS ── */}
      <section className="parcours-section">
        <div className="parcours-aside">
          <span className="aside-tag">Mon parcours</span>
          <h2>La source de <em>ma réflexion</em></h2>
          <div className="aside-line" />
        </div>

        <div className="parcours-content">
          <div className="parcours-block">
            <p>
              Je m'appelle Stéphanie Morel, j'ai soixante ans et je pratique la méditation à titre personnel depuis plus de trente ans. Infirmière Diplômée d'État, j'ai exercé mon métier auprès de publics variés : soins palliatifs, domicile, médecine, personnes âgées, rééducation…
            </p>
            <p>
              Toutefois, j'ai vécu une expérience singulière durant mon parcours d'infirmière en travaillant pendant près de cinq ans au sein d'un CAARUD — une association qui, sous l'égide de l'ARS, a pour mission d'accueillir et d'accompagner à la réduction des risques des usagers de drogues.
            </p>
          </div>
        </div>
      </section>

      {/* ── CAARUD ── */}
      <section className="caarud-section">
        <div className="caarud-inner">
          <span className="caarud-tag">Expérience terrain</span>
          <h2>Cinq ans au sein <em>d'un CAARUD</em></h2>
          <p>
            Les personnes accueillies y sont reçues sans rendez-vous avec une garantie d'anonymat. Elles peuvent s'y reposer, accéder à des installations pour pourvoir à leur hygiène, prendre une collation, et échanger avec des éducateurs pour être soutenues dans l'accès à leurs droits sociaux.
          </p>
          <p>
            En tant qu'infirmière, je proposais des entretiens pour faire un point sur la santé physique, sexuelle et mentale des personnes accueillies. Je mettais en œuvre les soins de premiers recours et j'orientais les usagers nécessitant des soins plus spécifiques vers les structures adaptées : urgences, CSAPA, consultations psychiatriques, centres de cure de désintoxication…
          </p>
          <p>
            C'est dans ce contexte qu'il m'est apparu intéressant d'investiguer l'impact de techniques non médicamenteuses éprouvées comme alternative efficace pour réduire le stress chronique chez des personnes usagères de drogues.
          </p>
        </div>
      </section>

      {/* ── APPROCHE CITATION ── */}
      <section className="approche-section">
        <blockquote>
          "À partir d'un protocole inspiré du modèle MBSR et des méditations enseignées par le professeur Tu-Ahn Tran, j'initie des usagers de drogues actifs à la pratique méditative."
        </blockquote>
        <cite>— Stéphanie Morel</cite>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <span className="tag">Envie d'en savoir plus ?</span>
        <h2>Commençons <em>ensemble</em></h2>
        <p>
          Que vous souhaitiez réduire vos consommations ou simplement découvrir la Pleine Conscience, je suis là pour vous accompagner à votre rythme.
        </p>
        <div className="cta-buttons">
          <a href="/rdv" className="btn-primary">Réserver une séance →</a>
          <a href="/about" className="btn-outline">En savoir plus</a>
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