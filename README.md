# ASA Shaders

**GLSL playground:** run full-viewport fragment shader demos from this repo, switch examples with the in-app picker, and iterate locally with Vite and React.

## About

This project is a **shader playground** first—use it to learn, compare, and tweak GLSL concepts without a portfolio frame. Available demos are listed in the shader index below; IDs match [`src/demos/registry.ts`](src/demos/registry.ts) and the picker UI.

## Shader index

IDs are stable for the in-app demo picker (`DemoPicker` + `DEMOS` registry).

| ID | Label | Notes |
| --- | --- | --- |
| `lurid-dream` | Lurid Dream | Default demo; image-driven fragment shader |
| `slow-breaths` | Slow Breaths | Animated fragment shader |
| `kaleidoscope` | Kaleidoscope | Kaleidoscope pattern |
| `fbm` | FBM | Fractional Brownian motion |
| `asa` | ASA | Original ASA cycling shader |

## Deployment

**Primary host:** [Vercel](https://vercel.com/) (static Vite build from `dist/`, SPA rewrites in `vercel.json`).

Typical flow:

1. `yarn build`
2. Deploy via the Vercel Git integration, or install the [Vercel CLI](https://vercel.com/docs/cli) and run `vercel` / `vercel --prod` from the repo root.

Deep links and hard refreshes on client routes are handled by the rewrite rule in `vercel.json` (all non-file paths fall through to `index.html`).

Legacy Firebase Hosting is documented in [`docs/FIREBASE_LEGACY.md`](docs/FIREBASE_LEGACY.md); it is not the default deploy path.

## Documentation

- **[ROADMAP](docs/ROADMAP.md)** — Milestones and product plan. Optional **Phase C** depth (shareable scene state, uniform/layer controls, presets—see Milestones 1–3 and the PRD) is tracked here so the simple playground can ship first.
- **[AI-COLLAB](docs/AI-COLLAB.md)** — AI-assisted shader workflow, constraint cards, and workshop-oriented resources for collaborators.

## Screenshots

### Dev Scripts

`yarn dev` (or `yarn start`)

Open [http://localhost:3000](http://localhost:3000)

`yarn test`

`yarn build`
