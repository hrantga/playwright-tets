# Mini Blog Admin (React 18 + Vite + Playwright)

A tiny admin app using the public API `https://jsonplaceholder.typicode.com`.

## Quickstart
1. Install deps
```bash
npm i
```
2. Install browsers
```bash
npx playwright install
```
3. Run tests (headless by default)
```bash
npm run test
```

Or, run the dev server and test headed:
```bash
npm run dev
# in another terminal
npx playwright test --headed --project=chromium
```

## Tech
- React 18 + Vite (JavaScript)
- Routing via `react-router-dom`
- Playwright Test with `webServer` (dev) and `trace: on-first-retry`
- Node 18+ compatible

## App pages
- `/login` — Fake login: username="demo", password="pass123" => success; else error. On success, store a token in `localStorage` and redirect to `/dashboard`. Shows a transient toast.
- `/dashboard` — Header, links to `/posts` and `/users`, and a Logout button (clears token and returns to `/login`).
- `/posts` — Fetch `/posts`, filter by title (client-side), view details in a drawer, and Export CSV of currently visible rows. Shows a transient toast on export.
- `/users` — Fetch `/users`, simple sort by name A→Z, clicking a user shows their email & company in a side panel.

Access control: `/dashboard`, `/posts`, `/users` redirect to `/login` if there is no token in `localStorage`.

Accessibility: Toast uses `role="status"` and auto-hides after ~1200ms.

## Scripts
- `npm run dev` — start Vite dev server (used by Playwright webServer)
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run test` — run Playwright tests
- `npm run test:ui` — open Playwright Test UI

## Candidate tasks
- Add a 2FA step after login (UI + test via route interception to force requires2FA)
- Fix failing/intentional failure and Add coverage 
- Write a Page Object Model for Login and Posts
- Stabilize `flaky-example.spec.ts` using better locators/waits (no arbitrary sleeps)
- Add an accessibility assertion (e.g., ensure toast has `role="status"`)

## Project structure
- `src/`
  - `main.jsx`, `App.jsx`
  - `pages/` — `Login.jsx`, `Dashboard.jsx`, `Posts.jsx`, `Users.jsx`
  - `components/` — `Toast.jsx`, `Drawer.jsx`
  - `lib/` — `api.js`, `csv.js`
- `tests/` — Playwright specs
- `playwright.config.ts`, `vite.config.js`

## Notes
- Uses `fetch` directly, no env vars needed
- Minimal inline styles; no CSS frameworks
- CSV export includes only currently visible (filtered) posts
