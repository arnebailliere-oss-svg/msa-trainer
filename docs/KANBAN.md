# MSA Trainer — Project Board

> Source of truth for progress. Updated by Claude as work moves. Last update: 2026-09-02 17:30
>
> Columns: **Backlog** → **In Progress** → **Review** (built, needs verification) → **Done** (verified).
> Ticket format: `ID · title · [size S/M/L] · notes`. Blockers and decisions at the bottom.

## Goal
Rebuild MSA Trainer as a fast, modern, youth-friendly **static web app / PWA** on GitHub Pages:
teach → drill (fresh variants) → repeat (mastery + repair), Math first from the 2027 e-book, with automated content checks.

**Milestones:** `d71e336` baseline · `b282d2f` web app end-to-end (core, content pipeline, UI, e2e)

---

## In Progress
- E3-1 · 1.1 Bruchrechnung — lesson + drill templates (from e-book pp 9–10, solutions p 40) · M
- E5-4 · Performance: KaTeX/React manual chunks added — verify bundle sizes · S

## Review
- E4-12 · PWA: manifest + SVG/PNG icons generated; offline behaviour not yet verified on a device · S
- E5-3 · GitHub Actions workflow `.github/workflows/deploy.yml` — untested until the repo has a remote (E5-5) · S

## Done
- E0-1 · Git repo, `.gitignore` (PDFs/e-books never committed), baseline commit · S
- E0-2 · Web scaffold: Vite 7 + React 19 + TS + Tailwind 4 + KaTeX + vite-plugin-pwa + Vitest · S
- E0-3 · Kanban board · S
- E1-1 … E1-9 · Core port to TS with 112 unit tests (types, normalizers/evaluators incl. `fraction`/`term`, mastery, selection, repair with sibling transfer, variants with `derived`/`constraints`/filters, session controller, calculator in degrees) · L
- E1-10 · Persistence (idb-keyval, debounced write-through, export/import) — verified by e2e reload · M
- E2-1 · Schema v2 `content_packs/schema.v2.json` · M
- E2-2 · `scripts/build-content.ts` validator (ajv + semantic + 60-render template exercise + KaTeX) → `web/public/content/` · M
- E2-3 · Legacy 310 questions migrated; fixed malformed CLOZE `EN_USE_TENSES_023`, 3-choice `MATH_MSA_PCT_2020_001`, **wrong answer** `MATH_FUNC_LINEAR_FORM_MSA2023_001` · M
- E4-1 · Design system (dark-first tokens, light mode, subject accents, motion) · M
- E4-2 · App shell, HashRouter, header, theme toggle · S
- E4-3 · Profiles (emoji avatar, local) · S
- E4-4 · Dashboard (Ampel per topic grouped by area, streak, today count, three modes) · M
- E4-5 · `MathText` (KaTeX inline/display, bullets, bold, `{,}` decimal fix) + `ExplanationBlocks` · S
- E4-6 · Session view with MCQ / SHORT / CLOZE / MATCH renderers, keyboard 1–4 + Enter, repair banner, difficulty dots · L
- E4-7 · Feedback panel (correct answer, hint, mastery delta, structured explanation, link to lesson) · M
- E4-8 · Calculator drawer · S
- E4-9 · Result view with confetti ≥ 80 % · S
- E4-11 · Overview page (per-topic table, export/import JSON) · S
- E5-2 · Playwright smoke (desktop + mobile) with screenshots · M

## Backlog

### E2 · Content pipeline (remaining)
- E2-4 · Content check in CI (wired in workflow; verify on first push) · S
- E2-5 · **Audit legacy math answers** — migration caught one wrong MSA answer; review all 192 legacy math items topic by topic while doing E3 · M

### E3 · Content — Mathe from the 2027 e-book (lesson + drill templates + exam items per section)
- E3-2 · 1.2 Prozent- & Zinsrechnung · M
- E3-3 · 2.1 Terme & Gleichungen · M
- E3-4 · 2.2 Potenzen · S
- E3-5 · 2.3 Lineare Gleichungssysteme · M
- E3-6 · 3.1 Wahrscheinlichkeit & Statistik · M
- E3-7 · 3.2 Diagramme (SVG figures, no scans) · M
- E3-8 · 4 Zuordnungen & Funktionen · M
- E3-9 · 5.1 Einheiten umrechnen · S
- E3-10 · 5.2 Koordinatensysteme · S
- E3-11 · 5.3 Ebene Figuren (Fläche/Umfang) · M
- E3-12 · 5.5 Sätze (Pythagoras, Thales) · M
- E3-13 · 5.6 Trigonometrie · M
- E3-14 · 5.7 Körper · M
- E3-15 · 6 Funktionale Zusammenhänge · S
- E3-16 · Original-Prüfungen 2022–2025 → exam-mode items (difficulty 4–5) with step solutions · L
- E3-17 · Formelblatt as in-app reference · S
- E3-18 · DE/EN: carry over, fix, add CLOZE/MATCH where cheap · M

### E4 · Web UI (remaining)
- E4-10 · Exam mode polish (timer, no calculator in part 1, summary) — basic MSA mode exists · M
- E4-13 · Accessibility pass: focus states, contrast, keyboard for MATCH · S
- E4-14 · Screenshot settle wait in e2e (entry animation caught mid-fade) · S

### E5 · QA & release (remaining)
- E5-5 · **User:** create GitHub repo, `git remote add origin …`, push `main`, Settings → Pages → Source: GitHub Actions · S
- E5-6 · First deploy verification (base path, PWA install, offline) · S

### E6 · Docs
- E6-1 · README (web), CLAUDE.md update (new structure, commands), legacy note for PySide6 app · S
- E6-2 · STATUS.md replaces stale content plans; ALGORITHM.md aligned with TS · S

---

## Decisions
- 2026-09-02 · Architecture: static PWA (Vite + React + TS + Tailwind + KaTeX), Python core ported to TS, progress in browser. Hosting: GitHub Pages via Actions.
- 2026-09-02 · PySide6 app is **legacy** (kept in `src/msa_trainer/`, not developed further).
- 2026-09-02 · Commercial e-books are never committed or shipped as scans; content is transcribed/adapted. iMINT PDFs (CC BY-SA) stay local (size), attribution kept in content `source`.
- 2026-09-02 · Content source of truth is `content_packs/berlin_msa/` (v2). `berlin_msa_v1/` is frozen legacy input; `scripts/migrate-legacy.ts` regenerates only the `legacy_*.json` files and must not be re-run after hand edits to those files.
- 2026-09-02 · Content build validates and exercises every template (60 renders) and every KaTeX snippet; errors fail the build.
- 2026-09-02 · Trig in the calculator and in template expressions uses degrees (MSA convention; the legacy Python calculator used radians).
- 2026-09-02 · Routing uses `HashRouter` so deep links survive refresh on GitHub Pages without a 404 workaround.

## Risks / Blockers
- Content volume for E3 is the long pole; correctness enforced by generated-variant checks, not by hand alone.
- No `gh` CLI on this machine — GitHub remote/Pages settings must be done by the user (E5-5).
- Legacy content quality unknown beyond schema — see E2-5.
