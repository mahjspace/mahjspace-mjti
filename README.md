# mahjspace-mjti

Hidden landing page for the MJTI (Mah Jongg That I Teach) early-access cohort.
Lives at **mahjspace.com/mjti** in production, served via a Vercel rewrite from the main app project.

This repo is **independent** from `mahjspace/mahjspace-app`. Same Firebase backend (`mahjspace-5e540`), separate Vercel project, separate deploys.

---

## Status

**Phase A.1–A.3 scaffolding only.** The page renders with placeholder copy and design tokens. Signup, waitlist, and admin logic ship in the next phase. The submit button currently shows a "wiring coming next" message.

---

## Local development

```
npm install
cp .env.example .env.local
# fill in Firebase values from the main mahjspace-app Vercel project
npm run dev
```

Page runs on `http://localhost:5173`.

```
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

---

## Setup steps (one-time, for Jennie)

Follow these in order. Each step is independent — you can pause between them.

### 1. Create the GitHub repo

In your browser, go to https://github.com/new and create:
- Owner: `mahjspace`
- Name: `mahjspace-mjti`
- Visibility: **Private**
- Do NOT initialize with README, .gitignore, or license (this repo already has them)

After clicking Create, GitHub will show a "push existing repository" command. Ignore that — Claude will do the push for you, but he needs the repo to exist first.

### 2. Create the Vercel project

1. Go to https://vercel.com/dashboard
2. Make sure you're on the **MahjSpace Pro** team (top-left dropdown)
3. Click **Add New → Project**
4. Import `mahjspace/mahjspace-mjti`
5. Framework Preset: **Vite** (should auto-detect)
6. Production branch: **`main`**
7. Click **Deploy**

The first deploy will fail because env vars aren't set yet — that's expected. Continue to step 3.

### 3. Add environment variables to Vercel

1. In the new Vercel project, go to **Settings → Environment Variables**
2. Open the existing `mahjspace-app` project in another tab → **Settings → Environment Variables**
3. Copy each `REACT_APP_FIREBASE_*` value over to this project, but **rename them with the `VITE_` prefix**:

   | mahjspace-app (CRA prefix)              | mahjspace-mjti (Vite prefix)        |
   |-----------------------------------------|-------------------------------------|
   | `REACT_APP_FIREBASE_API_KEY`            | `VITE_FIREBASE_API_KEY`             |
   | `REACT_APP_FIREBASE_AUTH_DOMAIN`        | `VITE_FIREBASE_AUTH_DOMAIN`         |
   | `REACT_APP_FIREBASE_PROJECT_ID`         | `VITE_FIREBASE_PROJECT_ID`          |
   | `REACT_APP_FIREBASE_STORAGE_BUCKET`     | `VITE_FIREBASE_STORAGE_BUCKET`      |
   | `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`| `VITE_FIREBASE_MESSAGING_SENDER_ID` |
   | `REACT_APP_FIREBASE_APP_ID`             | `VITE_FIREBASE_APP_ID`              |

4. For each variable, leave the **Production**, **Preview**, and **Development** checkboxes all checked.
5. After saving all six, click **Deployments** → the latest failed deploy → **Redeploy**. The build should now succeed.

### 4. Authorize the new domains in Firebase

1. Go to https://console.firebase.google.com/project/mahjspace-5e540/authentication/settings
2. Click **Authorized domains**
3. Add (if not already there):
   - The Vercel preview domain (e.g. `mahjspace-mjti-dev-mahjspace-pro.vercel.app` — Vercel will tell you the exact URL)
   - The Vercel production domain (e.g. `mahjspace-mjti.vercel.app`)
   - `mahjspace.com` (probably already there from the main app)
   - The custom subdomain if you set one up (see step 5)

Without this, signup will silently fail once we wire it up.

### 5. Set up the custom subdomain

The page is reachable two ways once everything is wired up:
- `mahjspace.com/mjti` (the canonical public URL — served via Vercel rewrite from the main app)
- `mjti.mahjspace.com` (direct subdomain — also works, and is a cleaner URL to share)

Both serve the same content. Steps:

1. In GoDaddy → mahjspace.com DNS settings, add a CNAME record:
   - Type: `CNAME`
   - Name: `mjti`
   - Value: `cname.vercel-dns.com`
   - TTL: default
2. In Vercel → mahjspace-mjti project → **Settings → Domains** → add `mjti.mahjspace.com`
3. Vercel verifies the DNS automatically (1–5 minutes)
4. Add `mjti.mahjspace.com` to the Firebase authorized domains list (step 4)

The subdomain is the rewrite target — it stays put even if the Vercel project URL changes.

---

## Architecture notes

- **Two-project rewrite.** Production traffic to `mahjspace.com/mjti` is rewritten in `mahjspace-app`'s `vercel.json` to this project's domain. The rewrite ships in Phase B, after this project is fully ready.
- **Same Firebase backend.** Reads/writes to the same `mahjspace-5e540` project. New collections this project introduces: `mjtiWaitlist`, `counters/mjtiSignups`, `feedback`. New `users` field: `signupSource`.
- **Welcome email is server-side.** Sent by the main app's `onNewUserCreated` Cloud Function (extended to look at `signupSource: "mjti"`). This project does not write to the `mail` collection on signup — prevents double-sends.
- **Counter is server-side.** `counters/mjtiSignups` is incremented by the same Cloud Function. The page reads it on load to decide State A vs State B. Client cannot write to it.

---

## File structure

```
src/
  components/
    LandingPage.tsx     # the main page
    SignupForm.tsx      # visual-only signup form (logic in next phase)
    PasswordInput.tsx   # show/hide password field
    Footer.tsx
  firebase.ts           # Firebase init (auth + db exports)
  content.ts            # all landing-page copy in one place
  index.css             # design tokens + page styles
  App.tsx               # routes (just LandingPage for now)
  main.tsx              # React root
.env.example            # template — copy to .env.local with real values
```

Edit `src/content.ts` to update copy. Edit `src/index.css` to tweak design tokens.

---

## What's NOT here yet

The next coding phase adds:

- Firebase Auth signup wiring on `SignupForm`
- State A → State B switch based on `counters/mjtiSignups`
- Waitlist submit → write to `mjtiWaitlist` collection
- `/mjti/admin` route — gated to `mahjspace@gmail.com`, releases waves
- `?wave=<token>` flow — bypasses cap for invited waitlist members
- Real iPhone-framed screenshots in `public/screenshots/`
- Final copy from Jennie

Plus changes to the main app:
- Extend `functions/index.js` `onNewUserCreated` to handle `signupSource: "mjti"` (welcome email + counter increment)
- Add `vercel.json` rewrite for `/mjti` → this project (Phase B)
- Add "Send feedback" item to Settings page
