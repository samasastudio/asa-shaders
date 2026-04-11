# PRD — ASA Shaders: From Legacy Portfolio to Simple Shader Playground

**Project:** `asa-shaders`  
**Version:** 2.0 (consolidated)  
**Status:** Draft  
**Companion docs:** [MIGRATION.md](./MIGRATION.md) (platform move), [ROADMAP.md](./ROADMAP.md) (milestones and optional expansion), [AI-COLLAB.md](./AI-COLLAB.md) (AI-assisted shader workflow and workshop resources)

---

## Problem Statement

This repository began as a portfolio-oriented React + GLSL demo surface. That purpose has run its course: the live site and README still describe a “sandbox heading toward installations,” while day-to-day value is now **learning, comparing, and tweaking shader concepts**—not selling a portfolio narrative.

The problem is twofold: **(1)** mental and technical debt from unused routes/components and outdated hosting docs, and **(2)** no single, honest product definition that says “this is a small shader playground first,” with everything else explicitly deferred.

---

## Solution (Product)

Reposition the project as a **focused GLSL playground**: run fragment shaders from the repo in a full-viewport canvas, switch between examples without a portfolio frame, and keep the stack boring and fast to work on. Optional depth (shareable URL state, rich overlays, presets) stays on the roadmap—not in the first “simple” phase.

**Guiding sentence:** *Fast local iteration and clear examples beat polish and feature breadth.*

---

## 1. Current State (As-Is)

### 1.1 Stack and tooling

| Area | State |
|------|--------|
| Build | Create React App (`react-scripts` 4.x) |
| Runtime | React 17, TypeScript ~4.2 |
| Shader runtime | `glslCanvas` via a small `ShaderCanvas` wrapper |
| Tests | CRA/Jest defaults present; not central to current usage |
| Hosting | Firebase Hosting serving CRA `build/` output (`firebase.json`) |
| Public docs | README still references Firebase URL and `yarn start` / `firebase deploy` |

### 1.2 Application shape

- **Entry:** `App` mounts a full-viewport black stage and drives one `ShaderCanvas` with a fragment imported from `src/fragments/` (e.g. `luridDreamFrag`) and optional image uniforms.
- **Legacy surface area:** Multiple components (`Kaleidoscope`, `SlowBreaths`, `FBM`, `ASA`, etc.) and many fragment files remain in the tree; the main `App` path does not expose a selector—imports suggest prior multi-demo navigation that is no longer wired.
- **Assets:** Images under `src/assets/`; `public/` for static files.
- **Articles / experiments:** A `Dev.to Article` folder contains shared canvas code—useful as reference, not as production IA.

### 1.3 Documentation already in repo

- **Migration guide** — CRA/Firebase → Vite/Vercel, parity checks, rollback.
- **Roadmap** — Milestones from platform reset through optional backend and render-stack evaluation.

**Assessment:** The codebase is a **thin runtime around `glslCanvas` plus a shader corpus**; the gap is product clarity and platform modernization, not a missing engine.

---

## 2. Vision — Next Phase (Simple Playground)

### 2.1 What “simple playground” means

| In scope (near term) | Out of scope (until explicitly pulled in) |
|----------------------|---------------------------------------------|
| One obvious way to run the app locally and on the web | Portfolio storytelling, “about me,” case-study chrome |
| Picking which shader example to view (in-app or route-based list) | In-browser GLSL editor |
| Stable full-viewport rendering and resize behavior | Auth, accounts, databases |
| Repo-organized fragment modules as the source of truth | Arbitrary user file uploads |
| Readable README: dev, build, deploy | Heavy compositing tool (layers, timelines) unless ROADMAP phase starts |

### 2.2 Primary user

**You (and anyone you share the repo or URL with)** — using the app to **preview concepts**, not to maintain a marketing site.

### 2.3 Secondary use: “shader concepts resource”

The repo can remain a **reference library**: named fragments, optional short comments in code or a minimal index (e.g. table in README listing shaders and what they demonstrate). That does not require a CMS or backend—only discipline in naming and, optionally, a tiny in-app index.

### 2.4 Stretch direction (not required for “simple” success)

Deeper product behavior—numeric uniforms, text/image overlays, debounced URL share state, hard errors on bad links—is **specified in prior roadmap work** and remains valid as **Phase B** when you want shareable mockups and richer scenes. See [ROADMAP.md](./ROADMAP.md) Milestones 1–2.

---

## 3. Migration (Platform)

### 3.1 Intent

Move to **Vite + Vercel** (or equivalent static host with SPA fallback) so development is fast, dependencies are modernizable, and deployment matches current expectations for small frontends. **Behavior-first:** same canvas + fragment loading behavior after migration.

### 3.2 Migration summary

1. Replace CRA with Vite (`dev` / `build` / `preview`), root `index.html`, `import.meta.env` where needed.
2. Add SPA rewrite for the host (e.g. `vercel.json`).
3. Retire Firebase from the **active** path; archive or remove `firebase.json` / `.firebaserc` once Vercel is verified.
4. Update README: commands, URLs, and “what this repo is for.”
5. Smoke-test: build, preview, production—shader draws, resize works, assets resolve.

**Detailed steps, gates, and rollback:** [MIGRATION.md](./MIGRATION.md).

### 3.3 Definition of Done (migration phase)

- No reliance on `react-scripts` for daily dev.
- Production deploy documents a non-Firebase default path.
- Shader view matches pre-migration baseline for the chosen demo(s).

---

## 4. Phased Delivery (Aligned With Simplicity)

| Phase | Name | Goal |
|-------|------|------|
| **A** | Platform | Vite + hosting switch; docs updated; dead obvious wiring fixed where trivial |
| **B** | Playground core | In-app **shader picker** (or minimal routes), cleanup of unused imports/entry, README index of shaders |
| **C** | Optional depth | URL state, uniforms UI, overlays—per [ROADMAP.md](./ROADMAP.md) M1+ when you need them |

Phases A–B satisfy this PRD’s “simple playground.” Phase C is **explicitly optional** and should not block calling the reboot successful.

---

## 5. User Stories

1. As a developer, I want to run `yarn dev` (or equivalent) and see a shader full screen, so that I can iterate without touching hosting config.
2. As a developer, I want the project to build with a modern bundler, so that upgrades and dependencies are tractable.
3. As a visitor, I want a deployed URL that loads quickly and shows a shader, so that the repo doubles as a live demo.
4. As the owner, I want to switch between shader examples in the app, so that the repo is a playground—not a single hard-coded demo.
5. As the owner, I want README and docs to describe a shader playground, so that I am not maintaining a false portfolio story.
6. As a future collaborator, I want clear “out of scope” boundaries, so that we do not rebuild Figma in WebGL by accident.

*(Additional stories for URL sharing, layers, and presets appear in [ROADMAP.md](./ROADMAP.md) when Phase C is active.)*

---

## 6. Implementation Decisions

- **Rendering:** Keep `glslCanvas` for Phase A–B unless a spike proves otherwise (see ROADMAP M5).
- **Shader organization:** Fragments stay as modules under `src/fragments/`; selection can be a static registry or lazy imports—avoid magic glob assumptions until Vite migration is stable.
- **UI complexity:** Prefer a **list or tabs** over a bespoke design system for the picker.
- **Cleanup:** Remove or rewire dead `App` imports when the picker lands; avoid large unrelated refactors during migration.

---

## 7. Testing Decisions

- **Migration:** Manual smoke tests (local dev, `preview`, deployed URL) are the bar; automated visual regression is optional.
- **Playground:** If adding a picker, a shallow test that “selected id loads without throw” is enough initially; avoid testing `glslCanvas` internals.

---

## 8. Out of Scope (This PRD)

- Repositioning the app as a marketing or portfolio site.
- In-app shader editing, node graphs, or timeline animation (unless a future PRD says otherwise).
- Backend persistence, auth, or social features for Phase A–B.
- Replacing `glslCanvas` solely for novelty (any change needs a ROADMAP spike).

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Time to first shader on a fresh clone | Minutes, following README |
| Deploy path | Documented single host; no Firebase in the default runbook |
| Cognitive load | One sentence describes the app: “local + hosted GLSL fragment playground” |

---

## 10. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Scope creep into “full sandbox” | Tie Phase C to ROADMAP; ship A–B first |
| Old components confuse contributors | Picker + README index; delete or quarantine unused demos after verification |
| URL-length / sharing complexity later | Deferred; [ROADMAP.md](./ROADMAP.md) already notes compression and errors |

---

## 11. Acceptance Criteria (Playground + Migration)

This initiative is **done for Phase A–B** when:

1. Toolchain is Vite-based; README matches.
2. Production deployment uses the new host; Firebase is not the documented primary path.
3. At least two fragment demos are reachable from the UI (or separate routes) without editing `App` for each switch.
4. Stated purpose in README is **playground / concepts**, not portfolio.

---

## 12. Further Notes

- **Historical detail:** An earlier draft of this reboot listed extensive FRs (uniform panels, layers, URL share state). That work remains valuable as **Phase C**; this document deliberately prioritizes clarity and a **simple** first outcome.
- **AI collaboration:** Using the playground with an assistant to generate and test shaders for other apps—constraint card, export handoff, workshops, and UX mock-up—is documented in [AI-COLLAB.md](./AI-COLLAB.md).
- **Cross-reference:** Implementation tickets should cite this PRD for intent and [MIGRATION.md](./MIGRATION.md) / [ROADMAP.md](./ROADMAP.md) for execution detail.

---

## Appendix A — Optional Phase C Summary (From Prior Planning)

When you need shareable scenes and richer controls, reintroduce requirements in work tickets from the roadmap: scene schema, numeric uniforms, text/image layers, debounced URL sync, hard failure on invalid share payloads. Full milestone breakdown: [ROADMAP.md](./ROADMAP.md).
