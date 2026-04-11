# Draft: GitHub comment to close Issue #1

**Do not post** unless the maintainers explicitly ask to publish this on the issue.

---

## Suggested closeout comment (copy below the line)

---

### Closure recommendation — Issue #1 (PRD baseline / AC1–AC4)

All acceptance criteria for this parent issue are **met** on `main` as of the validation sweep documented in [`docs/ISSUE_1_FINAL_VALIDATION.md`](./ISSUE_1_FINAL_VALIDATION.md).

| AC | Status |
|----|--------|
| AC1 — Vite toolchain + README alignment | Verified |
| AC2 — Vercel deploy path; Firebase not primary | Verified |
| AC3 — In-app picker; ≥2 demos without editing `App` per switch | Verified |
| AC4 — Playground positioning + shader index / collaborator pointers | Verified |

**Checks run:** `npm run build` (pass), `npm run test` / Vitest (pass; no test files yet).

**Minor follow-up (non-blocking):** consider adding `yarn preview` to the README Dev Scripts for full parity with `package.json`.

Recommend **closing Issue #1**; child issues #2–#5 track the underlying workstreams and can be closed per their own trackers.

---
