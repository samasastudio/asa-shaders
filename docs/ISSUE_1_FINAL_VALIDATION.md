# Issue #1 — Final validation (AC1–AC4)

**Parent:** [Issue #1](https://github.com/samasastudio/asa-shaders/issues/1)  
**PRD:** [PRD.md §11](./PRD.md)  
**Sweep date:** 2026-04-11  
**Scope:** Verification only; no product changes.

| AC | Requirement (summary) | Result | Evidence |
|----|-------------------------|--------|----------|
| **AC1** | Vite-based toolchain; README aligned with scripts | **Pass** | `package.json`: `dev`/`start` → `vite`, `build` → `tsc --noEmit && vite build`, `preview` → `vite preview`; no `react-scripts`. README Dev Scripts: `yarn dev`, `yarn start`, `yarn build`, `yarn test`. |
| **AC2** | Primary deploy = new host; Firebase not the documented primary path | **Pass** | README **Deployment** names Vercel first, `dist/` + `vercel.json` SPA rewrites; Firebase deferred to [`FIREBASE_LEGACY.md`](./FIREBASE_LEGACY.md). Root [`vercel.json`](../vercel.json) has catch-all rewrite to `index.html`. |
| **AC3** | ≥2 fragment demos reachable from UI without editing `App` per switch | **Pass** | [`App.tsx`](../src/App.tsx) uses `DemoPicker` + `getDemoById`; [`registry.ts`](../src/demos/registry.ts) registers **five** demos; [`DemoPicker.tsx`](../src/components/DemoPicker.tsx) maps `DEMOS` to `<select>` options. |
| **AC4** | README positions repo as playground / concepts, not portfolio | **Pass** | README title line and **About** explicitly frame **shader playground** first and “without a portfolio frame”; shader index + collaborator docs present. |

## Commands run (2026-04-11)

- `npm run build` — succeeded (`vite build` to `dist/`).
- `npm test` — exited 0 (`vitest run`; no `*.test`/`*.spec` files in repo).

## Residual risks / gaps

1. **README vs AC1 script list:** `package.json` includes `preview`; README Dev Scripts section does not mention `yarn preview` / production preview. Low severity; script exists and matches Vite convention.
2. **AC3 manual smoke:** Automated UI tests for picker switching are not present; structural verification (registry + picker wiring) is complete. Full visual/regression check remains a manual step when convenient.
3. **Firebase artifacts:** `firebase.json` remains for legacy continuity per [`FIREBASE_LEGACY.md`](./FIREBASE_LEGACY.md); not promoted as primary path in README.
