# Baseline audit — acceptance checklist (PRD §11)

**Parent:** [Issue #1 — PRD source of truth](https://github.com/samasastudio/asa-shaders/issues/1)  
**PRD reference:** [PRD.md §11 Acceptance Criteria](./PRD.md) (lines 175–183)

This document maps **AC1–AC4** to **executable checks** and records **current baseline** behavior before migration/playground work.

---

## AC1 — Toolchain is Vite-based; README matches

| Aspect | Baseline (audit date) | Pass when |
|--------|------------------------|-----------|
| Dev/build | `package.json` uses `react-scripts` (CRA 4.x), scripts `start` / `build` / `test` | `package.json` scripts use Vite (`vite`, `vite build`, `vite preview` or equivalent); no `react-scripts` required for daily dev |
| README commands | Documents `yarn start`, `yarn build` (CRA-style) | README documents Vite commands (e.g. `yarn dev`, `yarn build`, `yarn preview`) consistently with `package.json` |

**Executable checks**

1. `grep -E "react-scripts|vite"` `package.json` — expect Vite after work; baseline shows `react-scripts`.
2. README first-run path: clone → install → dev server — matches actual scripts.

---

## AC2 — Production deployment uses the new host; Firebase is not the documented primary path

| Aspect | Baseline (audit date) | Pass when |
|--------|------------------------|-----------|
| Hosting config | `firebase.json` serves `build/` with SPA rewrite to `index.html` | Primary deploy path documented as Vercel (or chosen host); `vercel.json` or platform docs present as needed |
| README deploy | `firebase deploy`, URL `asa-shaders.web.app` | Deploy section describes non-Firebase default; Firebase optional/archived if retained |

**Executable checks**

1. README “Deployment” does **not** present Firebase as the only path.
2. `firebase.json` / `.firebaserc` either removed, archived in docs, or explicitly secondary.

---

## AC3 — At least two fragment demos reachable from the UI without editing `App` per switch

| Aspect | Baseline (audit date) | Pass when |
|--------|------------------------|-----------|
| Entry UI | `App.tsx` mounts one `ShaderCanvas` with `luridDreamFrag` + image uniform; Kaleidoscope/SlowBreaths/FBM/ASA imported **unused** | ≥2 fragments selectable in-app (or via routes) without changing `App` imports for each demo |
| Fragments | Corpus under `src/fragments/` | Registry or routes wired to multiple modules |

**Executable checks**

1. Manual: run app, switch between ≥2 demos without editing source.
2. Optional: shallow test or smoke script that selected id loads (per [PRD §7](./PRD.md)).

---

## AC4 — Stated purpose in README is playground / concepts, not portfolio

| Aspect | Baseline (audit date) | Pass when |
|--------|------------------------|-----------|
| Positioning | README “About” describes installations / sandbox narrative | README frames repo as GLSL playground / concepts (aligned with PRD §2) |

**Executable checks**

1. README “About” / intro matches PRD one-liner intent (“local + hosted GLSL fragment playground” or equivalent).
2. No portfolio-only story as the primary description.

---

## Baseline shader render path (CRA)

Documented so post-migration parity can be verified against the same conceptual pipeline.

1. **`src/index.tsx`** — `ReactDOM.render` mounts `<App />` (CRA entry).
2. **`src/App.tsx`** — Full-viewport black `div`; renders **`ShaderCanvas`** from `src/Dev.to Article/ShaderCanvas.tsx` with `frag` from `src/fragments/luridDreamFrag.ts` and `setUniforms` `{ u_image: image }`.
3. **`ShaderCanvas`** — `useEffect`: `GlslCanvas` from **`glslCanvas`** on canvas ref; applies uniforms; `resizer` sets canvas backing store and CSS size from container; `sandbox.load(frag)`; window `resize` listener calls `resizer` when container dimensions change.

**Libraries:** `glslCanvas` npm package; fragment source as imported string modules.

---

## Child issue mapping (#2–#5)

Aligned with [GitHub issue list](https://github.com/samasastudio/asa-shaders/issues) (2026-04-11):

| Issue | Title | Primary AC / scope |
|-------|--------|---------------------|
| [#2](https://github.com/samasastudio/asa-shaders/issues/2) | feat: migrate CRA to Vite with dev/build/preview parity | **AC1** (toolchain) |
| [#3](https://github.com/samasastudio/asa-shaders/issues/3) | chore: Vercel SPA hosting + README deploy path (deprecate Firebase primary) | **AC2** |
| [#4](https://github.com/samasastudio/asa-shaders/issues/4) | feat: shader registry + in-app picker (≥2 demos) + App cleanup | **AC3** |
| [#5](https://github.com/samasastudio/asa-shaders/issues/5) | docs: README playground positioning + shader index + collaborator pointers | **AC4** (+ README index per PRD §2) |

---

## Residual risks (baseline)

- **Production build on current toolchain:** `npm run build` may fail on newer Node (e.g. Node 24) with `ERR_PACKAGE_PATH_NOT_EXPORTED` from Postcss/CRA dependency chain — track under migration (#2); CI should pin Node or upgrade stack.
- **ShaderCanvas location:** Path `Dev.to Article/ShaderCanvas.tsx` is non-idiomatic; acceptable for baseline; may normalize during Vite migration.
