# ASA Shaders — Implementation Checklist
**Project:** `asa-shaders`  
**Purpose:** Convert strategy docs into execution-ready, GitHub-issue-ready tasks  
**Source Docs:** `docs/PRD.md`, `docs/MIGRATION.md`, `docs/ROADMAP.md`  
**Status:** Active

---

## 0) Canonical Terminology (single source of truth)

Use these terms consistently in code, issues, and docs.

| Term | Definition | Notes |
|---|---|---|
| **Scene** | Full reproducible composition state | Includes shader selection, uniforms, overlays, metadata/version |
| **Layer** | One visual overlay element in scene stack | v1 supports `text` and `image` |
| **Layer Stack** | Ordered array of layers defining z-order | Array order is stacking order |
| **Shader Module** | Repo file exporting fragment shader and optional metadata | Auto-discovered from shader directory |
| **Shader Metadata** | Optional module export for display defaults | e.g., name, tags, default uniforms |
| **Uniform Schema** | Declarative control definition for uniforms | v1 numeric only: float/vec2/vec3/vec4 |
| **Share State** | URL-encoded scene payload | Auto-sync, debounced |
| **Preset** | Saved scene snapshot (local or backend) | Local first; backend later |
| **Scene Version** | Schema version for migration compatibility | Required in serialized payload |
| **Hard Error Screen** | Non-recoverable invalid share-state UI | Must provide reset action |

---

## 1) Phase Handoff Criteria (between docs)

A phase can only start when prior phase **exit criteria** are met.

### M0 → M1 Handoff
- Vite build/dev/preview operational.
- Vercel deployment works with SPA rewrites.
- Legacy Firebase deployment removed from active workflow.
- No critical shader rendering regression from migration.

### M1 → M2 Handoff
- End-to-end core loop works: select shader → tweak uniforms → add text/image layers → share URL → reopen identical scene.
- Invalid URL payload triggers deterministic hard error screen.
- URL sync is debounced and stable.

### M2 → M3 Handoff
- Local presets stable.
- Error boundaries and fallback flows proven.
- Basic export workflow validated (JSON and/or screenshot).

### M3 → M4 Handoff
- Extended layer model (shape/gradient + basic blend/filter) stable.
- Serialization and sharing remain backward compatible.

### M4 → M5 Handoff
- Backend scene persistence operational.
- Asset reference model and security controls defined.
- Short-link or ID-based loading works reliably.

---

## 2) GitHub Label + Issue Template Suggestions

## Suggested Labels
- `phase:M0` `phase:M1` `phase:M2` `phase:M3` `phase:M4` `phase:M5`
- `type:feature` `type:chore` `type:bug` `type:docs` `type:spike`
- `area:platform` `area:rendering` `area:scene-model` `area:sharing` `area:layers` `area:deploy`
- `priority:P0` `priority:P1` `priority:P2`
- `risk:high` `risk:medium` `risk:low`

## Issue Title Format
`[Phase][Area] Short actionable title`

Example:  
`[M1][sharing] Implement debounced URL scene sync with deterministic serializer`

## Issue Body Template
- **Context**
- **Goal**
- **Scope**
- **Out of Scope**
- **Implementation Notes**
- **Acceptance Criteria**
- **Test Plan**
- **Risks/Dependencies**

---

## 3) Milestone 0 — Platform Reset (CRA/Firebase → Vite/Vercel)

## M0-01 `[M0][platform] Create migration branch and baseline snapshots`
- [ ] Create migration branch
- [ ] Capture pre-migration screenshots/video of key shader path
- [ ] Capture baseline commands and outputs
- **Acceptance Criteria**
  - [ ] Branch created and baseline artifacts committed (or attached in issue)

## M0-02 `[M0][platform] Replace CRA scripts with Vite scripts`
- [ ] Add Vite dependencies and config
- [ ] Update `package.json` scripts to `dev/build/preview`
- [ ] Remove `eject` and CRA-specific script usage
- **Acceptance Criteria**
  - [ ] `yarn dev` runs
  - [ ] `yarn build` succeeds
  - [ ] `yarn preview` serves production bundle

## M0-03 `[M0][platform] Migrate app entry and root HTML to Vite conventions`
- [ ] Ensure root `index.html` points to `src/main.tsx`
- [ ] Validate app mount and strict mode behavior
- [ ] Verify asset links and favicon paths
- **Acceptance Criteria**
  - [ ] App renders correctly in dev and preview
  - [ ] No blank screen from entry mismatch

## M0-04 `[M0][platform] Migrate env usage to Vite-compatible pattern`
- [ ] Search and replace legacy env references
- [ ] Rename `.env` keys to Vite prefix conventions
- [ ] Add fallback guards where needed
- **Acceptance Criteria**
  - [ ] No runtime env reference errors
  - [ ] Env behavior documented in README

## M0-05 `[M0][deploy] Add Vercel SPA rewrite and validate deep links`
- [ ] Add Vercel config rewrite
- [ ] Deploy preview and test direct route refresh
- [ ] Validate static assets on deployed host
- **Acceptance Criteria**
  - [ ] Deep links load correctly in production
  - [ ] Asset/font paths resolved on Vercel

## M0-06 `[M0][cleanup] Deprecate Firebase hosting workflow`
- [ ] Remove or archive Firebase deployment files from active path
- [ ] Update README deployment section
- [ ] Remove stale docs references to Firebase URL
- **Acceptance Criteria**
  - [ ] No active docs/scripts mention Firebase deploy path
  - [ ] New deployment path is Vercel-only

## M0 Exit Gate
- [ ] Migration checklist complete
- [ ] No P0 regression in shader rendering
- [ ] Team confirms baseline parity

---

## 4) Milestone 1 — Sandbox Core (First Shippable)

## M1-01 `[M1][scene-model] Define scene schema + versioning`
- [ ] Create TypeScript types for scene, layer union, uniform values
- [ ] Add `version` field and semantic policy
- [ ] Document schema in docs
- **Acceptance Criteria**
  - [ ] Scene type is canonical and used across app
  - [ ] Version present in all serialized scenes

## M1-02 `[M1][scene-model] Implement runtime validation for imported/shared state`
- [ ] Add parser/validator for URL payload
- [ ] Return structured validation errors
- [ ] Wire to hard error screen
- **Acceptance Criteria**
  - [ ] Invalid payload never silently falls back
  - [ ] Hard error shows reason + reset action

## M1-03 `[M1][rendering] Implement shader auto-discovery`
- [ ] Auto-scan shader modules in repo directory
- [ ] Generate stable `shaderId` mapping
- [ ] Sort/display list deterministically
- **Acceptance Criteria**
  - [ ] New shader file appears without manual registry edits
  - [ ] IDs stable across rebuilds

## M1-04 `[M1][rendering] Support optional shader metadata export`
- [ ] Define metadata interface (name/tags/default uniforms)
- [ ] Merge metadata defaults with app defaults
- [ ] Add fallback for modules without metadata
- **Acceptance Criteria**
  - [ ] Metadata is optional and non-breaking
  - [ ] Default uniform initialization deterministic

## M1-05 `[M1][uniforms] Build numeric uniform controls`
- [ ] Implement control components for float/vec2/vec3/vec4
- [ ] Bind controls to render updates
- [ ] Add min/max/step defaults and override support
- **Acceptance Criteria**
  - [ ] Controls update shader output in near real-time
  - [ ] Unsupported uniform types handled gracefully

## M1-06 `[M1][layers] Implement text layer model + editor`
- [ ] Add text layer create/edit/remove/reorder
- [ ] Support style controls: family/weight/size/color/opacity/letterSpacing/lineHeight/align
- [ ] Use normalized x/y coordinates
- **Acceptance Criteria**
  - [ ] Text layer renders correctly and persists through share URL

## M1-07 `[M1][layers] Implement image layer model + editor`
- [ ] Add image layer create/edit/remove/reorder
- [ ] Curated image source selector only
- [ ] Single scale control with preserved aspect ratio
- **Acceptance Criteria**
  - [ ] Image layer remains proportional across viewport changes
  - [ ] Only curated assets are selectable in v1

## M1-08 `[M1][sharing] Implement debounced URL auto-sync`
- [ ] Deterministic serializer
- [ ] Compression/encoding strategy
- [ ] Debounced write to URL
- **Acceptance Criteria**
  - [ ] URL updates after debounce window
  - [ ] Back/forward behavior remains usable

## M1-09 `[M1][sharing] Implement URL hydration + round-trip tests`
- [ ] Hydrate scene from URL on app load
- [ ] Add round-trip tests for representative scenes
- [ ] Add overflow detection and user-facing guidance
- **Acceptance Criteria**
  - [ ] Shared links reproduce scenes reliably
  - [ ] Oversize payload path is explicit and documented

## M1-10 `[M1][ux] Add reset + copy link actions`
- [ ] Reset scene to defaults
- [ ] Copy share URL action with confirmation
- [ ] Ensure actions work from both default and loaded share state
- **Acceptance Criteria**
  - [ ] Reset always restores valid default scene
  - [ ] Copy action outputs usable link

## M1 Exit Gate
- [ ] Core loop works end-to-end
- [ ] Invalid state hard-fails deterministically
- [ ] Internal demo accepted for rollout to regular usage

---

## 5) Milestone 2 — Reliability & Throughput

## M2-01 `[M2][presets] Add local preset save/load/delete`
- [ ] Implement local preset storage
- [ ] List and restore presets
- [ ] Handle schema-version mismatch warning path
- **Acceptance Criteria**
  - [ ] Presets survive browser restart
  - [ ] Incompatible presets handled gracefully

## M2-02 `[M2][errors] Improve shader/runtime error boundaries`
- [ ] Add stage-level error boundaries
- [ ] Add fallback shader/display mode on failure
- [ ] Improve diagnostics visibility
- **Acceptance Criteria**
  - [ ] App shell remains interactive after shader errors

## M2-03 `[M2][export] Add JSON scene import/export`
- [ ] Export current scene as JSON
- [ ] Import JSON with validation
- [ ] Reuse same validator/version policy as URL hydration
- **Acceptance Criteria**
  - [ ] Exported JSON re-import reproduces same scene

## M2-04 `[M2][export] Add screenshot export`
- [ ] Capture stage with overlays
- [ ] Export PNG (or chosen format)
- [ ] Validate output dimensions and quality defaults
- **Acceptance Criteria**
  - [ ] Screenshot usable in docs/presentations

## M2-05 `[M2][performance] Optimize rerender hot paths`
- [ ] Profile panel interaction and stage updates
- [ ] Memoize heavy components/selectors
- [ ] Eliminate avoidable rerenders
- **Acceptance Criteria**
  - [ ] Noticeably smoother control interactions

## M2 Exit Gate
- [ ] Weekly use without blocking defects
- [ ] Preset/export workflows stable

---

## 6) Milestone 3 — Layer Expansion (Toward C)

## M3-01 `[M3][layers] Add shape/gradient layer types`
- [ ] Extend layer union and editors
- [ ] Implement renderers for new types
- [ ] Ensure serialization compatibility
- **Acceptance Criteria**
  - [ ] New layer types share/load via existing mechanisms

## M3-02 `[M3][layers] Add basic blend mode controls`
- [ ] Define supported blend mode set
- [ ] Implement cross-browser-compatible approach
- [ ] Add docs caveats for unsupported cases
- **Acceptance Criteria**
  - [ ] Blend mode behavior validated on target browsers

## M3-03 `[M3][layers] Add basic filters (opacity/blur/contrast scope-defined)`
- [ ] Add filter controls to applicable layer types
- [ ] Validate performance with layered scenes
- [ ] Add safeguards for extreme values
- **Acceptance Criteria**
  - [ ] Filter settings stable and serializable

## M3 Exit Gate
- [ ] Target concept mockups reproducible without hacks

---

## 7) Milestone 4 — Backend Persistence & Export Pipeline

## M4-01 `[M4][backend] Define backend scene storage contract`
- [ ] API contract for save/load by scene ID
- [ ] Auth strategy decision (if required)
- [ ] Version migration policy server-side
- **Acceptance Criteria**
  - [ ] Contract approved and documented

## M4-02 `[M4][backend] Implement save/load by ID`
- [ ] Persist scene snapshots
- [ ] Load by short ID URL path/query
- [ ] Add clear not-found/error UX
- **Acceptance Criteria**
  - [ ] Scene round-trip with backend ID is reliable

## M4-03 `[M4][assets] Define upload/storage policy`
- [ ] Asset validation rules
- [ ] Storage location and retention policy
- [ ] Security/access constraints
- **Acceptance Criteria**
  - [ ] Policy documented and enforced in implementation

## M4-04 `[M4][sharing] Add URL token mode`
- [ ] URL contains compact token/ID
- [ ] Resolve to stored scene
- [ ] Keep backward compatibility with URL-encoded mode where feasible
- **Acceptance Criteria**
  - [ ] Short links resolve correctly and predictably

## M4 Exit Gate
- [ ] Durable persistence supports implementation handoff workflows

---

## 8) Milestone 5 — Rendering Stack Evaluation (Future Path)

## M5-01 `[M5][spike] Benchmark current stack under target complexity`
- [ ] Define stress scenes and metrics
- [ ] Record performance limits and bottlenecks
- **Acceptance Criteria**
  - [ ] Evidence-based baseline report complete

## M5-02 `[M5][spike] Compare candidate stacks`
- [ ] Build minimal spikes for shortlisted options
- [ ] Score by complexity, performance, maintainability
- **Acceptance Criteria**
  - [ ] Comparative matrix documented

## M5-03 `[M5][decision] Produce recommendation and migration estimate`
- [ ] Decision memo with rationale
- [ ] Cost/risk estimate for migration if recommended
- **Acceptance Criteria**
  - [ ] Go/no-go decision approved

---

## 9) Program-Level Backlog Hygiene Checklist

- [ ] Every issue mapped to exactly one milestone
- [ ] Every issue has acceptance criteria and test plan
- [ ] P0/P1/P2 priorities assigned
- [ ] Dependencies linked explicitly
- [ ] Out-of-scope notes included to prevent creep
- [ ] PRD/Migration/Roadmap references included in issue bodies

---

## 10) Testing Matrix (minimum per milestone)

## M0
- [ ] Dev build boots
- [ ] Prod build and preview work
- [ ] Deployed deep-link test passes

## M1
- [ ] URL round-trip test scenes pass
- [ ] Invalid payload hard error test passes
- [ ] Layer create/edit/reorder/delete tests pass

## M2
- [ ] Local preset persistence tests pass
- [ ] JSON import/export round-trip passes
- [ ] Screenshot export sanity checks pass

## M3
- [ ] New layer serialization tests pass
- [ ] Blend/filter browser compatibility checks pass

## M4
- [ ] Save/load by ID integration tests pass
- [ ] Asset policy enforcement tests pass

## M5
- [ ] Benchmark repeatability documented
- [ ] Decision memo reviewed and accepted

---

## 11) “Ready to Start This Week” Sprint Slice

If you want an immediate execution slice, start with these issues in order:

1. `[M0][platform] Replace CRA scripts with Vite scripts`
2. `[M0][deploy] Add Vercel SPA rewrite and validate deep links`
3. `[M1][scene-model] Define scene schema + versioning`
4. `[M1][sharing] Implement debounced URL auto-sync`
5. `[M1][layers] Implement text layer model + editor`
6. `[M1][layers] Implement image layer model + editor`

This sequence gives fast visible value while staying aligned with the phased plan.