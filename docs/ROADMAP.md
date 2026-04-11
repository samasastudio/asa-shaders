# ASA Shaders — Product & Engineering Roadmap

Status: Draft  
Owner: @asa  
Last Updated: 2026-03-21

---

## 1) Vision

Transform `asa-shaders` from a legacy portfolio app into a modern, production-minded GLSL sandbox for rapid concept prototyping and shareable demos.

### Primary Outcome
Enable fast experimentation for future implementation work.

### Secondary Outcome
Provide frictionless demo sharing for collaboration and stakeholder review.

---

## 2) Product Principles

1. **Prototype speed over completeness** (especially in v1).
2. **Shareability by default** (URL-first state transport).
3. **Deterministic reproducibility** (curated assets, stable shader IDs).
4. **Phased complexity** (do not front-load backend/features not needed for first value).
5. **Migration first** (stabilize platform before adding major UX capabilities).

---

## 3) Scope Decisions (Locked)

- Migrate stack: **CRA/Firebase → Vite/Vercel** first.
- Rendering stack in v1: **keep `glslCanvas`**.
- Shader source model: **auto-scan fragment files**.
- Shader module model: **GLSL + optional metadata export**.
- Uniform controls in v1: **numeric only** (`float`, `vec2`, `vec3`, `vec4`).
- Sharing model in v1: **debounced auto-sync URL state**.
- Invalid share payload handling: **hard error screen**.
- Overlay scope in phase 1: **text + image only**.
- Position/size system: **normalized units (0–1)**.
- Layer ordering: **array order** (top/bottom by list position).
- Text styling in v1: extended controls (`fontFamily`, `fontWeight`, `letterSpacing`, `lineHeight`, `textAlign`, etc.).
- Image sizing: **single scale control with preserved aspect ratio**.
- Image source policy in v1: **curated public/repo assets only**.
- Future: backend-driven persistence/export as a planned later phase.

---

## 4) Milestone Plan

---

### Milestone 0 — Foundation Migration (Platform Reset)

**Goal**  
Establish a modern, maintainable baseline before feature expansion.

**Target Outcome**  
App runs on Vite locally and deploys to Vercel as SPA without Firebase dependency.

**Deliverables**
- Vite + React + TypeScript setup replacing CRA runtime tooling.
- Updated scripts (`dev`, `build`, `preview`).
- SPA rewrite config for Vercel.
- Firebase deployment config removed from active workflow docs.
- Build + deploy verification.

**Acceptance Criteria**
- Local dev server boots with no CRA tooling.
- Production build succeeds.
- Vercel deployment serves app and supports client-side route refresh.
- Existing shader page functionality still renders correctly.

**Risks**
- Asset path regressions (`public` vs module imports).
- Font loading differences.
- Environment variable migration (`process.env` compatibility issues).

**Mitigations**
- Validate all asset imports after migration.
- Smoke test each existing shader route/component.
- Add migration checklist and rollback branch.

**Exit Gate**
- “No-regression” baseline and deployment parity confirmed.

---

### Milestone 1 — Sandbox Core (First Shippable)

**Goal**  
Deliver first usable shader sandbox for internal concepting + shareable demos.

**Target Outcome**  
User can pick shader, tweak numeric uniforms, compose text/image overlays, and share full scene state via URL.

**Deliverables**
- Scene state model (`shaderId`, `uniforms`, `layers`, `meta`).
- Runtime validation for shared payload.
- Shader auto-discovery from fragment modules.
- Shader metadata support (optional module export).
- Numeric uniform control panel.
- Layer panel for text/image overlays.
- Curated image picker.
- Debounced URL serialization + hydration flow.
- Hard error UI for invalid state.
- “Copy Share URL” and “Reset Scene” actions.

**Acceptance Criteria**
- Scene state round-trips URL encode/decode reliably.
- Changing controls updates stage predictably.
- Shared URL reproduces scene across sessions/devices (assuming same assets).
- Invalid URL payload shows deterministic hard-error view.
- App remains responsive during slider and layer interactions.

**Risks**
- URL payload size growth.
- Shader compile/runtime errors creating poor UX.
- Inconsistent output due to viewport/font variance.

**Mitigations**
- Compression + max-payload guard.
- Shader error boundary with explicit diagnostics.
- Normalize rendering defaults and define supported viewport assumptions.

**Exit Gate**
- End-to-end demo flow proven by internal test script.

---

### Milestone 2 — Reliability & Creative Throughput

**Goal**  
Increase stability and make repeated usage frictionless.

**Target Outcome**  
Faster iteration loops, better recoverability, and practical export options.

**Deliverables**
- Local preset save/load management.
- Improved error boundaries + fallback shader behavior.
- Scene import/export JSON (manual file flow).
- Screenshot export.
- Basic performance tuning (memoization, controlled rerenders).

**Acceptance Criteria**
- Presets persist across browser restarts.
- App recovers from invalid edits without requiring page reload.
- Exported JSON can be re-imported to reproduce scene.
- Screenshot exports are deterministic and usable in docs/presentations.

**Risks**
- Divergence between URL schema and local preset schema.
- Feature creep from low-priority UI polish.

**Mitigations**
- Single canonical scene schema and semantic versioning.
- Strict milestone scope lock and deferred backlog tagging.

**Exit Gate**
- Stable weekly usage without blocking defects.

---

### Milestone 3 — Visual Layer Expansion (Toward “C”)

**Goal**  
Evolve from static overlays into richer compositing.

**Target Outcome**  
Add shape/gradient layers and initial blend/filter controls.

**Deliverables**
- Gradient/shape layer types.
- Blend mode support (phase-limited set).
- Basic visual filters (opacity/blur/contrast scope-defined).
- Layer editor extensibility refactor (plugin-like layer form mapping).

**Acceptance Criteria**
- New layer types serialize and share via existing URL/preset systems.
- Blend/filter controls produce consistent visible effects.
- No regressions to text/image flows.

**Risks**
- Cross-browser rendering differences.
- Performance degradation in complex layer stacks.

**Mitigations**
- Browser support matrix tests.
- Complexity budget (max layers/effects) with UI warning thresholds.

**Exit Gate**
- Target mockups reproducible in-tool without ad hoc hacks.

---

### Milestone 4 — Backend Persistence & Export Pipeline

**Goal**  
Support durable sharing, file writing/export workflows, and multi-user readiness.

**Target Outcome**  
Share links can reference backend-stored scenes/assets and support long-form project continuity.

**Deliverables**
- Backend preset persistence (scene IDs).
- Optional auth model (deferred until needed).
- File upload/storage strategy and policy.
- Export pipeline definitions (JSON packages and/or rendered media jobs).
- URL token mode (short links to backend scene IDs).

**Acceptance Criteria**
- Scene can be saved and loaded by ID.
- Asset references remain valid and permission-safe.
- Backend + URL mode interoperate cleanly.
- Export job lifecycle is observable and debuggable.

**Risks**
- Security and access control complexity.
- Storage cost/perf management.
- Migration burden from URL-only scenes.

**Mitigations**
- Start with private/internal usage policy.
- Signed URLs and strict content validation.
- Backward-compatible translator from URL payload to stored scene format.

**Exit Gate**
- Backend model supports implementation handoff workflows reliably.

---

### Milestone 5 — Rendering Stack Evaluation (Future Option Path)

**Goal**  
Decide whether to remain on `glslCanvas` or migrate to a more extensible rendering stack.

**Candidate Paths**
- `three.js` / `react-three-fiber` for richer pipelines and 3D extensibility.
- Lightweight abstraction (`ogl`/`regl` style) for middle-ground control.
- Custom WebGL2 wrapper only if justified by hard constraints.

**Decision Inputs**
- Feature pressure (post-processing, multi-pass, 3D camera needs).
- Performance profile under target scenes.
- Maintenance complexity and developer ergonomics.

**Acceptance Criteria**
- Comparative spike documented.
- Clear recommendation with migration cost estimate.
- No forced migration unless benefits are material.

---

## 5) Cross-Cutting Risks & Controls

### A. Scope Creep
- **Control:** Strict phase goals + defer list with explicit non-goals.

### B. Scene Schema Drift
- **Control:** Versioned schema and migration functions.

### C. Shareability Fragility
- **Control:** URL payload guardrails + deterministic error states + backend fallback roadmap.

### D. Creative Tooling vs Productization Tension
- **Control:** Keep v1 internal-utility optimized; product polish only when it directly improves iteration speed or sharing clarity.

---

## 6) Inter-Phase Handoff Criteria & Dependency Mapping

This section defines explicit gates for moving between milestones and maps hard/soft dependencies to reduce sequencing risk.

### 6.1 Dependency Types
- **Hard dependency:** downstream work should not start until prerequisite is complete.
- **Soft dependency:** downstream work can start in parallel but cannot exit without prerequisite alignment.
- **Validation dependency:** prerequisite proof artifact required (demo, test checklist, or doc signoff).

### 6.2 Milestone Dependency Map

| From | To | Dependency Type | Required Inputs | Rationale |
|---|---|---|---|---|
| M0 Platform Reset | M1 Sandbox Core | Hard | Stable Vite build/deploy baseline, routing parity, asset parity checks | Feature work should not be built atop unstable tooling/hosting |
| M1 Sandbox Core | M2 Reliability | Hard | Canonical scene schema v1, URL round-trip passing, hard error handling baseline | Reliability work depends on stable core behavior and schema |
| M2 Reliability | M3 Layer Expansion | Soft | Layer editor extensibility direction, baseline perf profile | New layer classes can begin in spike mode while hardening completes |
| M2 Reliability | M4 Backend & Export | Soft + Validation | JSON import/export spec, schema versioning policy, migration notes | Backend model should align to canonical schema and export semantics |
| M3 Layer Expansion | M4 Backend & Export | Validation | Confirmed serialization behavior for new layer types | Backend persistence must support full layer model, not partial |
| M4 Backend & Export | M5 Render Evaluation | Soft | Measured bottlenecks, feature-pressure evidence | Render migration decision should be evidence-driven, not speculative |

### 6.3 Inter-Phase Handoff Gates

#### Gate: M0 → M1 (Toolchain-to-Feature Gate)
**Must pass all:**
1. `dev/build/preview` workflow documented and reproducible.
2. Production deploy on Vercel verified with SPA deep-link behavior.
3. Legacy Firebase deployment removed or explicitly archived as legacy path.
4. No blocker regressions in shader rendering, fonts, or static assets.

**Handoff artifacts:**
- migration completion checklist,
- smoke-test evidence,
- updated README commands.

#### Gate: M1 → M2 (Core-to-Reliability Gate)
**Must pass all:**
1. Scene model is typed, versioned, and used as canonical state.
2. URL encode/decode round-trip passes for representative scenes.
3. Invalid shared state deterministically triggers hard-error UX.
4. Core editing loop (shader/uniform/layers/share) demonstrated end-to-end.

**Handoff artifacts:**
- scene schema reference,
- URL codec constraints,
- defect list prioritized by reliability impact.

#### Gate: M2 → M3 (Reliability-to-Expansion Gate)
**Must pass all:**
1. Preset/import/export behavior is stable against schema v1.
2. Error boundaries and recovery flows are proven in routine use.
3. Performance baseline captured (interaction latency + render stability).
4. Layer editor internals are extension-ready for new layer types.

**Handoff artifacts:**
- perf baseline report,
- extension design notes for layer forms/renderers,
- known limitations list for effect-heavy scenes.

#### Gate: M2/M3 → M4 (Feature-to-Backend Gate)
**Must pass all:**
1. Canonical schema and migration strategy documented.
2. All layer types intended for persistence are serializable/re-hydratable.
3. Asset reference policy defined (IDs/URLs/path conventions).
4. Security and storage boundaries drafted (even if auth is deferred).

**Handoff artifacts:**
- persistence contract draft,
- asset policy,
- migration translator plan (URL payload ↔ stored scene).

#### Gate: M4 → M5 (Backend-to-Render-Decision Gate)
**Must pass all:**
1. Real usage data identifies render constraints or opportunity ceiling.
2. Candidate render stacks compared against actual roadmap needs.
3. Migration cost, risk, and rollback strategy documented.
4. Recommendation approved with explicit “stay” or “migrate” decision.

**Handoff artifacts:**
- evaluation matrix,
- proof-of-concept notes,
- recommended path memo.

### 6.4 Cross-Milestone Dependency Rules

1. **Schema-first rule:** no milestone may introduce persistent state features without updating schema/version policy.
2. **Shareability rule:** any feature that changes visual output must define URL/preset serialization behavior before milestone exit.
3. **Error-contract rule:** new parsing/loading pathways must specify explicit user-facing failure behavior.
4. **Asset-contract rule:** asset-backed features must declare deterministic reference strategy (no implicit local-only dependencies).
5. **Performance-budget rule:** any added layer/effect capability must be checked against the latest baseline before milestone close.

### 6.5 Escalation Triggers (Block Handoff)

Handoff is blocked if any of the below are true:
- unresolved P0/P1 defects in current milestone scope,
- no reproducible demo path for milestone success criteria,
- schema changes without migration notes,
- deployment instability that impacts share-link reliability.

---
## 7) Definition of Done (Program-Level)

Program considered “on track” when:
1. Migration is complete and stable on Vercel.
2. Core sandbox loop (select shader → tweak → layer → share) is reliable.
3. Team can recreate implementation-intent mockups quickly from repeatable scene definitions.
4. A path to backend export/persistence is technically validated and scoped.

---

## 7) Immediate Next Actions (Next 1–2 Weeks)

1. Finalize PRD and migration technical design.
2. Execute Milestone 0 migration branch.
3. Establish scene schema contract + URL codec spec.
4. Build Milestone 1 vertical slice:
   - one shader selector
   - one numeric uniform control
   - one text layer
   - one image layer
   - one share URL round-trip test.
5. Run internal demo and freeze Milestone 1 backlog.

---

## 8) Non-Goals (For Now)

- Public marketplace/community features.
- Full animation timeline editor.
- Multi-user real-time collaboration.
- Uncurated local file uploads in v1 URL-only mode.
- Premature rendering stack rewrite during migration.

---

## 9) Milestone Summary Table

| Milestone | Name | Value Delivered | Exit Signal |
|---|---|---|---|
| M0 | Platform Reset | Modern toolchain + deploy baseline | Vite/Vercel stable, no regressions |
| M1 | Sandbox Core | Shareable shader+overlay prototype loop | URL round-trip + stable editing |
| M2 | Reliability | Daily usability + export basics | Presets/export/recovery proven |
| M3 | Layer Expansion | Toward richer compositing | Shape/gradient/blend/filter stable |
| M4 | Backend & Export | Durable persistence + file workflows | Save/load by ID + storage path |
| M5 | Render Evaluation | Future-proof technical path | Recommendation + migration estimate |

---