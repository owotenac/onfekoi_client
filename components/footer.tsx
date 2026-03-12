import React from "react";
import { Platform } from "react-native";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

  .onfekoi-footer {
    font-family: 'Lato', sans-serif;
    background: linear-gradient(160deg, #1f1d1c 0%, #141414 40%, #000000 100%);
    color: #f0e6d3;
    padding: 0;
    margin-top: auto;
    position: relative;
    overflow: hidden;
  }
  .footer-inner {
    max-width: 960px;
    margin: 0 auto;
    padding: 28px 24px 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .footer-logo-circle {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e07b39, #f5c842);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #1a0a00;
    flex-shrink: 0;
  }

  .footer-brand-name {
    font-size: 15px;
    font-weight: 700;
    color: #f0e6d3;
    letter-spacing: 0.05em;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 18px;
    align-items: center;
  }

  .footer-links a {
    color: #bdbcbc;
    text-decoration: none;
    font-size: 13px;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: #f5c842; }

  .footer-sep {
    color: rgba(240, 230, 211, 0.2);
    font-size: 11px;
  }

  .footer-copy {
    font-size: 12px;
    color: rgba(240, 230, 211, 0.35);
    font-weight: 300;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    .footer-inner { flex-direction: column; align-items: flex-start; padding: 20px 16px; }
  }
`;

export default function FooterWeb() {
  if (Platform.OS !== "web") return null;

  const year = new Date().getFullYear();

  return (
    <>
      <style>{styles}</style>
      <footer className="onfekoi-footer" role="contentinfo">
        <div className="footer-inner">

          <a className="footer-brand" href="/">
            <div className="footer-logo-circle">@</div>
            <span className="footer-brand-name">ONFEKOI</span>
          </a>

          <nav className="footer-links" aria-label="Liens légaux">
            <a href="/legalpage#mentions">Mentions légales</a>
            <span className="footer-sep">•</span>
            <a href="/legalpage#confidentialite">Politique de confidentialité</a>
            <span className="footer-sep">•</span>
            <a href="/legalpage#cgu">CGU</a>
            <span className="footer-sep">•</span>
            <a href="mailto:contact@e2digitalstudio.com">Contact</a>
          </nav>

          <span className="footer-copy">© {year} ONFEKOI</span>

        </div>
      </footer>
    </>
  );
}