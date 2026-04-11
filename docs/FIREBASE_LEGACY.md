# Legacy Firebase Hosting

Firebase Hosting is **not** the primary deployment path for this project.

- **Default production deploy:** connect the repo (or run `vercel`) with [Vercel](https://vercel.com/docs); use `vercel.json` at the repo root for SPA routing and deep-link refresh.
- **`firebase.json` / `.firebaserc`:** kept only for historical continuity or rare legacy use. Do not add new Firebase-centric workflow to the main runbook.

The previous public demo was at `https://asa-shaders.web.app/`; new deployments should use the URL from your Vercel project dashboard.
