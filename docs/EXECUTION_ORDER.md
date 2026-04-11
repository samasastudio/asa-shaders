# Suggested execution order — Issues #2–#5

**Context:** [Issue #1](https://github.com/samasastudio/asa-shaders/issues/1) PRD; acceptance checks in [BASELINE_CHECKLIST.md](./BASELINE_CHECKLIST.md).

This is a **recommended** order for child issues. Adjust if a ticket explicitly blocks or depends on another.

## Order

1. **[#2 — Vite migration](https://github.com/samasastudio/asa-shaders/issues/2)**  
   Establishes dev/build/preview and removes CRA as the daily toolchain (**AC1**). Other work assumes a stable Vite pipeline.

2. **[#3 — Vercel + README deploy](https://github.com/samasastudio/asa-shaders/issues/3)**  
   After builds are reliable, document and wire the non-Firebase primary deploy path (**AC2**). Can overlap late-stage verification with #2’s “preview” smoke tests.

3. **[#4 — Shader registry + picker](https://github.com/samasastudio/asa-shaders/issues/4)**  
   In-app selection and cleanup of dead imports (**AC3**). Best after Vite so imports and env patterns match the final bundler (per [PRD §6](./PRD.md)).

4. **[#5 — README playground + index](https://github.com/samasastudio/asa-shaders/issues/5)**  
   Final README positioning, shader index, collaborator pointers (**AC4**). Often last so it reflects shipped commands and URLs.

## Parallelism

- **#5** copy can be drafted early but should be **reconciled** after #2–#3 so commands and URLs are final.
- **#4** should not depend on #5; #5 may reference the picker UX once #4 lands.

## Definition of “done” for Phase A–B

All four issues closed with [BASELINE_CHECKLIST.md](./BASELINE_CHECKLIST.md) AC1–AC4 checks passing.
