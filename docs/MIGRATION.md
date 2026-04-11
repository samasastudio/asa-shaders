# ASA Shaders Migration Guide
## CRA/Firebase → Vite/Vercel

**Project:** `asa-shaders`  
**Scope:** Migrate build tooling and hosting platform without changing core shader behavior  
**Outcome:** Faster local development, modern bundling, simpler deployment, and a clean foundation for the shader sandbox roadmap

### T-002 — CRA → Vite (this repo)

- **Entry:** root `index.html` loads `/src/index.tsx` (Vite convention). `public/index.html` was removed; static assets remain under `public/` (`manifest.json`, `robots.txt`).
- **Scripts:** `npm run dev` / `npm start` → Vite dev server (default port **3000**). `npm run build` → `tsc --noEmit` then `vite build` → output **`dist/`**. `npm run preview` → production preview. `react-scripts` removed.
- **Tests:** `npm test` runs **Vitest** (`vitest run`); `passWithNoTests` is enabled until component tests are added.
- **Firebase:** `firebase.json` still points at `build/`; for Firebase deploys, point hosting `public` at `dist` or run a copy step—see hosting tasks (#3/#5).

---

## 1) Goals and Non-Goals

### Goals
- Replace Create React App (`react-scripts`) with Vite.
- Replace Firebase Hosting deployment with Vercel deployment.
- Preserve existing app behavior during migration.
- Keep TypeScript support.
- Keep shader rendering flow intact (`glslCanvas`-based runtime for v1).
- Ensure SPA routing works in production.
- Establish migration-safe baseline for future sandbox features.

### Non-Goals (for this migration phase)
- No feature redesign of UI/UX.
- No rendering stack replacement (e.g., no Three.js migration yet).
- No backend/API/persistence redesign.
- No large refactors beyond what migration requires.

---

## 2) Current State Summary

From the current repo shape:

- Tooling: CRA (`react-scripts`), React 17, TypeScript.
- Hosting: Firebase (`firebase.json`, `.firebaserc`).
- Entry app includes shader canvas usage.
- Build output expected in `build/` (CRA default).
- Firebase configured to serve `build/` with SPA rewrites.

This migration changes:
- Build output to Vite default (`dist/`).
- Dev server from CRA to Vite.
- Hosting from Firebase to Vercel.
- App HTML entry strategy from CRA conventions to Vite conventions.

---

## 3) Migration Strategy

Use a **safe, incremental** strategy:

1. **Create migration branch**
2. **Install Vite and React plugin**
3. **Replace scripts and config**
4. **Adopt Vite HTML entry**
5. **Update environment variable usage**
6. **Build and smoke test locally**
7. **Add Vercel configuration**
8. **Remove Firebase deployment dependency**
9. **Update docs + deployment steps**
10. **Verify production deployment**

---

## 4) Step-by-Step Changes

## 4.1 Create a migration branch

```/dev/null/commands.sh#L1-2
git checkout -b chore/migrate-cra-to-vite-vercel
git status
```

---

## 4.2 Install Vite dependencies

Add Vite and React plugin:

```/dev/null/commands.sh#L1-2
yarn add -D vite @vitejs/plugin-react
yarn add -D typescript
```

> Note: TypeScript is already present in this repo; keep/upgrade as needed based on compatibility.

---

## 4.3 Update `package.json` scripts

Replace CRA scripts with Vite scripts.

- Remove:
  - `start`
  - `build` (CRA)
  - `test` (if tied to CRA tooling and not yet migrated)
  - `eject`

- Add:
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`

If you still need tests immediately, keep test tooling as-is if independent; otherwise track as follow-up migration task.

---

## 4.4 Create `vite.config.ts`

Minimal config:

```/dev/null/vite.config.ts#L1-11
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
```

Port `3000` is optional but useful for continuity with old dev habits.

---

## 4.5 Move to Vite `index.html` conventions

CRA uses placeholders and public injection conventions; Vite uses a root `index.html` with direct module entry.

Create/update root `index.html`:

```/dev/null/index.html#L1-15
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ASA Shaders</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Expected code entry file
Vite expects a `src/main.tsx` entry. If you currently use CRA-style bootstrap, ensure `src/main.tsx` exists and mounts the app.

---

## 4.6 Ensure React entrypoint is valid for Vite

Typical `src/main.tsx`:

```/dev/null/src/main.tsx#L1-10
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

> You can keep React 17 mount style as shown above.  
> If upgrading to React 18 later, switch to `createRoot`.

---

## 4.7 Environment variable migration (`process.env` → `import.meta.env`)

If the app reads env vars, update references:

- Old: `process.env.REACT_APP_FOO`
- New: `import.meta.env.VITE_FOO`

And rename `.env` keys:
- `REACT_APP_*` → `VITE_*`

Example:

```/dev/null/example.ts#L1-2
const apiBase = import.meta.env.VITE_API_BASE_URL;
const isProd = import.meta.env.PROD;
```

---

## 4.8 Static assets handling

Vite behavior:
- Files in `public/` are served at root (`/`).
- Imported assets from `src/assets` are bundled.

Review:
- image imports inside TS/TSX should continue to work.
- references like `/logo.png` should point to `public/logo.png`.

---

## 4.9 TypeScript config sanity check

Keep `tsconfig.json`, but verify:
- JSX setting supports React (`react-jsx` or legacy based on React version/tooling).
- Include paths cover `src`.
- No CRA-specific assumptions remain.

If needed, add `tsconfig.node.json` for Vite tooling types.

---

## 4.10 Remove CRA/Firebase deployment coupling

Once Vite build works:

- Deprecate/remove Firebase deployment config from active workflow:
  - `firebase.json`
  - `.firebaserc`
  - `.firebase/` cache dir

You may keep files temporarily during transition, but mark as legacy.

---

## 4.11 Add Vercel SPA routing config

Create `vercel.json`:

```/dev/null/vercel.json#L1-8
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures client-side routes resolve correctly.

---

## 4.12 Update ignore rules and housekeeping

In `.gitignore`, verify:
- `dist/` is ignored (Vite build output)
- `.vercel/` is ignored
- old CRA/Firebase build/cache outputs are not accidentally tracked

---

## 5) Validation Checklist

## 5.1 Local development checks
- `yarn dev` starts without config/runtime errors.
- App loads and shader canvas renders.
- Hot Module Replacement works.
- Imported images/fonts resolve.
- No unresolved env var usage remains.

## 5.2 Production build checks
- `yarn build` succeeds.
- `yarn preview` serves the build correctly.
- Shader demo path works in preview mode.
- No blank screen due to asset path/base issues.

## 5.3 Hosting checks (Vercel)
- Deployment succeeds.
- Root route renders.
- Deep links render (SPA rewrite confirmed).
- Static assets and fonts load with correct MIME types/caching.

---

## 6) Known Risks and Mitigations

### Risk: hidden CRA-only assumptions
- **Mitigation:** Search for `process.env`, `%PUBLIC_URL%`, CRA test setup assumptions.

### Risk: dependency compatibility (older React/tooling)
- **Mitigation:** keep migration minimal first; upgrade React/testing stack in a separate PR.

### Risk: shader runtime regressions
- **Mitigation:** smoke test known shader(s) before and after migration with visual checks.

### Risk: route reload 404 in production
- **Mitigation:** ensure `vercel.json` rewrite is present and deployed.

---

## 7) Rollback Plan

If migration has blocking regressions:

1. Keep migration isolated in branch.
2. Revert deployment target to last Firebase-backed release.
3. Land migration in smaller commits:
   - Vite tooling only
   - then Vercel deployment
4. Re-run smoke tests after each commit.

---

## 8) Suggested Commit Plan

1. `chore: add vite config and scripts`
2. `chore: migrate html entry and main bootstrap`
3. `chore: update env variable usage for vite`
4. `chore: add vercel spa rewrite config`
5. `chore: deprecate firebase hosting config`
6. `docs: update readme with vite/vercel workflow`

---

## 9) Post-Migration Next Steps (handoff to roadmap)

Once migration is stable:
1. Introduce sandbox scene model/types.
2. Add shader auto-discovery from fragment modules.
3. Add v1 overlay layer editor (text + image).
4. Add debounced URL sync and hard error state for invalid payloads.

---

## 10) Definition of Done (Migration Phase)

Migration is complete when all are true:

- Tooling switched to Vite (`dev/build/preview`).
- Production hosting switched to Vercel with SPA rewrites.
- Legacy Firebase deployment is removed or clearly deprecated.
- Current shader demo works in local dev and deployed production.
- README/developer docs reflect new commands and hosting flow.

## 10.1 Completion Gates (Go/No-Go Checklist)

All gates below must pass before declaring migration complete:

### Gate A — Build and Runtime Parity
- `yarn dev` runs without CRA runtime/tooling.
- `yarn build` and `yarn preview` succeed.
- Existing shader render path is visually functional in dev and preview.
- No blocking console/runtime errors on first load.

### Gate B — Hosting and Routing
- Vercel deployment succeeds from default branch.
- Root route loads correctly.
- Deep-link refresh resolves via SPA rewrite (no 404 on direct load).
- Static assets (fonts/images) resolve with correct paths in production.

### Gate C — Configuration and Environment
- No remaining required `process.env.REACT_APP_*` usage.
- Required runtime env keys are documented as `VITE_*`.
- Build output assumptions updated from `build/` to `dist/` where applicable.

### Gate D — Legacy Decommissioning
- Firebase deploy path removed from active runbooks.
- Legacy Firebase config files either removed or clearly labeled deprecated.
- Team-facing docs no longer instruct `firebase deploy`.

### Gate E — Documentation Readiness
- README local-dev and deploy sections match actual commands.
- Migration notes include rollback guidance and known caveats.
- Next-phase handoff criteria are documented and accepted.

## 10.2 Handoff Criteria to Roadmap Milestone 1 (Sandbox Core)

Migration phase may hand off to roadmap implementation only when:

1. Platform baseline is stable for at least one full local+prod verification cycle.
2. Shader rendering behavior is confirmed equivalent to pre-migration baseline.
3. No unresolved P0/P1 migration defects remain open.
4. Route rewrite behavior is validated for share-link-style URLs.
5. The following implementation contracts are explicitly ready:
   - Scene schema owner identified.
   - URL codec strategy owner identified.
   - Shader discovery approach confirmed against final directory conventions.

## 10.3 Milestone Mapping (Migration → Roadmap)

- This document’s completion corresponds to **ROADMAP M0 (Platform Reset)** exit.
- Work for **ROADMAP M1 (Sandbox Core)** must not begin until Sections `10.1` and `10.2` are satisfied.
- Any exceptions require explicit risk acceptance and documented rollback plan.

---

## 11) Quick Command Reference (target state)

```/dev/null/commands.sh#L1-4
yarn install
yarn dev
yarn build
yarn preview
```

---

## 12) README Delta (what to update)

Replace old sections like:
- `yarn start`
- `firebase deploy`
- Firebase URL references

With:
- `yarn dev`
- `yarn build`
- `yarn preview`
- Vercel deployment notes and production URL placeholder.

## 12.1 Required Terminology Alignment (Cross-Doc Consistency)

Before handoff, ensure wording in README/docs is aligned with PRD/ROADMAP terms:

- **Scene**: full reproducible composition state.
- **Layer**: ordered visual element over shader output.
- **Preset**: saved scene state representation (local now, backend later).
- **Share State**: URL-encoded scene payload used for reproducible sharing.

This reduces ambiguity when implementing M1 tasks and issue tickets.

---

This migration intentionally prioritizes **stability and forward momentum**: modern toolchain now, feature evolution next.