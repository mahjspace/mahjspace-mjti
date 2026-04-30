import { content } from "../content";
import { Footer } from "./Footer";
import { SignupForm } from "./SignupForm";

export function LandingPage() {
  return (
    <div className="page">
      <main className="container">
        <section className="hero">
          <div className="hero__eyebrow">{content.hero.eyebrow}</div>
          <h1 className="hero__headline">{content.hero.headline}</h1>
          <p className="hero__body">{content.hero.body}</p>
          <a href="#signup" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
            {content.hero.primaryCta}
          </a>
          <p className="hero__note">{content.hero.note}</p>
        </section>

        <section className="screenshots" aria-label="Inside MahjSpace">
          {content.screenshots.map((s, i) => (
            <figure key={i} className="screenshot">
              <div className="screenshot__frame">
                {s.src ? <img src={s.src} alt={s.alt} /> : <span>Screenshot {i + 1} placeholder</span>}
              </div>
              <figcaption className="screenshot__caption">{s.caption}</figcaption>
            </figure>
          ))}
        </section>

        <section className="benefits">
          <h2 className="benefits__heading">{content.benefits.heading}</h2>
          <ul className="benefits__list">
            {content.benefits.items.map((item, i) => (
              <li key={i} className="benefits__item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="signup" className="signup">
          <h2 className="signup__heading">{content.signupForm.heading}</h2>
          <SignupForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
