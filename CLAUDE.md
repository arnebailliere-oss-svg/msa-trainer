# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Environment

Windows, shell is Git Bash. Use forward slashes. Node 24 + npm for the web app, Python 3.11 venv (`.venv/`) only for the legacy desktop app and PDF tooling (`PySide6.QtPdf`).

**Do not write JSON/TS containing backslashes through Bash heredocs** — the tool collapses `\\` (e.g. `\\alpha` arrives as a BEL byte). Use the Write/Edit tools, or Node with `String.fromCharCode(92)`.

## Project

MSA Trainer Berlin — a static web app / PWA (Vite + React 19 + TypeScript + Tailwind 4 + KaTeX) for Berlin's MSA exam (Klasse 9/10). Teach → drill (templated questions with fresh numbers) → repeat (mastery score, Ampel, repair mode). Hosted on GitHub Pages via `.github/workflows/deploy.yml`. Progress lives in the browser (IndexedDB), no backend.

The PySide6 desktop app in `src/msa_trainer/` is **legacy** and not developed further.

Project board with status and decisions: [docs/KANBAN.md](docs/KANBAN.md) — keep it updated when work moves.

## Commands (run in `web/`)

```bash
npm run dev                       # dev server http://127.0.0.1:5173/
npm test                          # vitest (core engine)
npm run typecheck                 # tsc -b
npm run content -- --check        # validate content only
npm run content                   # validate + write web/public/content
npm run build                     # content + tsc + vite build → dist/
npm run e2e:desktop               # playwright smoke (needs a build; screenshots in e2e/screenshots)
```

Preview any question with its variants: `#/preview/<question-id>`.

## Layout

```
web/src/core/        engine, no React: types, constants, mastery, selection, repair, session,
                     variants (SHA-256 seed, sfc32 RNG, templates), expr (safe evaluator),
                     evaluators, normalizers, format, figures (SVG generators), calculator
web/src/app/         content loader, db (idb-keyval), state (AppProvider)
web/src/ui/          MathText (KaTeX + bold/italic/lists), Explanation, renderers, widgets, Calculator, primitives
web/src/views/       Start, Dashboard, Topic, Session, Result, Overview, Preview
web/scripts/         build-content.ts (validator + bundle), migrate-legacy.ts (one-off, do not re-run)
content_packs/berlin_msa/   source of truth: topics.json, questions/*.json, lessons/*.json
content_packs/schema.v2.json
```

## Content rules

- Every question: `id`, `subject`, `topicId`, `difficulty` 1–5, `qtype` MCQ/SHORT/CLOZE/MATCH, `prompt`, `payload`, `solution`, structured `explanation` sections, `tags`, `source`.
- Templates: `variants.variables` (int/float/choice), `derived` expressions, `constraints`; placeholders `{{x}}`, `{{= expr | filter}}`. Computed SHORT solutions: `{ kind: "computed", expr, round?, tolerance? }`. Fraction answers via `answer_type: "fraction"` (`require_reduced`, `exact`), terms via `"term"` (numeric equivalence, `require_simplified`).
- Math in text: `$…$` / `$$…$$` (KaTeX). Keep `€`, `‰` outside math. Decimal commas are auto-fixed (`3,5` → `3{,}5`).
- Figures: `figure: { type, … }` generated from variables (types in `core/figures.ts`) — never scans. Lessons may embed `{"kind":"widget","body":"line-explorer"}`.
- `npm run content -- --check` must pass (0 errors) before committing content. It renders 60 variants per template and checks the evaluator accepts its own solution.
- Sources: the 2027 Prüfungshefte e-book and exam PDFs are commercial — transcribe/adapt, cite in `source`, never commit or ship PDFs/scans.

## Engine rules (docs/ALGORITHM.md)

- Nachweis-Modell (`core/levels.ts`): a topic's level is recomputed from its last 6 attempts, never accumulated — Neu → Angefangen → Geübt (4 of 6) → Sicher (5 of 6, ≥ 2 at difficulty ≥ 3, on 2 days) → Prüfungsfest (correct exam-level answer ≥ 3 days after Sicher); idle > 14 days shows as Geübt with a check due. `masteryScore` is the projection [0, 0.2, 0.6, 0.85, 1] so the Ampel (red < 0.45, green > 0.75 with stability > 0.55) keeps working.
- Tagesplan (`core/plan.ts`, mode PLAN, 12 tasks): due checks → repairs → next ladder topics in topics.json order (priority ≥ 2 first) → keep-warm. Prüfungsreife (`core/readiness.ts`) = priority-weighted share of topics ≥ Sicher; ready at ≥ 85 % + all priority-3 topics Sicher + one passed Prüfungs-Modus day (≥ 8 tasks, ≥ 60 %).
- Schnelltraining selection priority = 0.45·weakness + 0.25·error rate + 0.20·recency + 0.10·(1 − stability).
- Repair mode after a wrong answer: 2 same-topic questions (difficulty ≤ current), then 1 transfer question from sibling topics; correct transfer exits, wrong transfer restarts one level easier. Repair overrides selection. Attempt is persisted before mastery is updated.
- Variants: seed = SHA-256(user|subject|topic|question|date|mode|counter); local RNG only; trig in degrees.
