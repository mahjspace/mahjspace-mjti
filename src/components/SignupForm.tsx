import { useState } from "react";
import { content } from "../content";
import { PasswordInput } from "./PasswordInput";

// Visual-only for now. Submit handler is wired up in the next phase
// (signup -> Firebase Auth -> users doc -> counter increment -> redirect).
export function SignupForm() {
  const c = content.signupForm;
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stub, setStub] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStub(true);
  };

  if (stub) {
    return (
      <div className="status-banner">
        <h3>Signup wiring coming next.</h3>
        <p>
          The form is visual-only on this preview build. Real signup ships in
          the next phase.
        </p>
      </div>
    );
  }

  return (
    <form className="signup__form" onSubmit={onSubmit}>
      <div className="field">
        <label className="field__label" htmlFor="firstName">
          {c.firstNameLabel}
        </label>
        <input
          id="firstName"
          className="field__input"
          type="text"
          placeholder={c.firstNamePlaceholder}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="email">
          {c.emailLabel}
        </label>
        <input
          id="email"
          className="field__input"
          type="email"
          placeholder={c.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <PasswordInput
        id="password"
        label={c.passwordLabel}
        placeholder={c.passwordPlaceholder}
        value={password}
        onChange={setPassword}
        required
      />

      <button type="submit" className="btn-primary">
        {c.submit}
      </button>

      <p className="signup__legal">
        Operated by JL Horn Apparel LLC. By signing up you agree to the{" "}
        <a href={c.termsUrl} target="_blank" rel="noreferrer">
          Terms
        </a>{" "}
        and{" "}
        <a href={c.privacyUrl} target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
