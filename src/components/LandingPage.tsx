import { content } from "../content";
import { Footer } from "./Footer";
import { SignupForm } from "./SignupForm";

export function LandingPage() {
  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <div className="hero__eyebrow">{content.hero.eyebrow}</div>
          <h1 className="hero__headline">{content.hero.headline}</h1>
          {content.hero.body.map((para, i) => (
            <p key={i} className="hero__body">
              {para}
            </p>
          ))}
          <p className="hero__note">{content.hero.note}</p>
        </section>
      </div>

      <section className="screenshots-section" aria-label="Inside MahjSpace">
        <div className="screenshots-inner">
          {content.screenshots.map((s, i) => (
            <figure key={i} className="screenshot">
              <div className="screenshot__frame">
                {s.src ? (
                  <img src={s.src} alt={s.alt} />
                ) : (
                  <span>Screenshot {i + 1} placeholder</span>
                )}
              </div>
              <figcaption className="screenshot__caption">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="container">
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
      </div>

      <Footer />
    </div>
  );
}
