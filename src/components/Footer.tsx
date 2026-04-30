import { content } from "../content";

export function Footer() {
  const { tagline, instagramUrl, facebookUrl, contactEmail } = content.footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__tagline">{tagline}</div>
        <div className="footer__links">
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={facebookUrl} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://mahjspace.com/?page=terms">Terms</a>
          <a href="https://mahjspace.com/?page=privacy">Privacy</a>
        </div>
        <div className="footer__contact">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </div>
    </footer>
  );
}
