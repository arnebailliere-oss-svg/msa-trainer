# MSA Trainer — Project Board

> Source of truth for progress. Updated by Claude as work moves. Last update: 2026-09-02 16:40
>
> Columns: **Backlog** → **In Progress** → **Review** (built, needs verification) → **Done** (verified).
> Ticket format: `ID · title · [size S/M/L] · notes`. Blockers and decisions at the bottom.

## Goal
Rebuild MSA Trainer as a fast, modern, youth-friendly **static web app / PWA** on GitHub Pages:
teach → drill (fresh variants) → repeat (mastery + repair), Math first from the 2027 e-book, with automated content checks.

---

## In Progress
- E4-1 · Design system: tokens (vibrant, dark-first, subject accents), typography, motion, primitives · M
- E4-2 · App shell + routing (HashRouter for Pages) + responsive layout · S
- E4-5 · Rich text + KaTeX renderer (`MathText`) for explanations and lessons · S
- E5-2 · Playwright smoke + screenshots (installing) · M

## Review
- E1-10 · Persistence: `web/src/app/db.ts` (idb-keyval, debounced write-through, export/import) — needs UI integration test · M
- E2-2 · `scripts/build-content.ts`: schema (ajv) + semantic checks + template exercise + KaTeX check → `web/public/content/` — passes on migrated pack (0 errors / 61 coverage warnings) · M
- E2-3 · Legacy 310 questions migrated to v2 (`content_packs/berlin_msa/questions/legacy_*.json`); fixed: malformed CLOZE `EN_USE_TENSES_023`, 3-choice MCQ `MATH_MSA_PCT_2020_001`, **wrong answer** `MATH_FUNC_LINEAR_FORM_MSA2023_001` · M
- E5-3 · GitHub Actions workflow `.github/workflows/deploy.yml` (test → content check → build → Pages) — untested until the repo has a remote · S

## Done
- E0-1 · Git repo, `.gitignore` (PDFs/e-books never committed), baseline commit `d71e336` · S
- E0-2 · Web scaffold: Vite 7 + React 19 + TS + Tailwind 4 + KaTeX + vite-plugin-pwa + Vitest · S
- E0-3 · Kanban board · S
- E1-1 · Types/enums/constants (`web/src/core/types.ts`, `constants.ts`) · S
- E1-2 · Normalizers + evaluators; new answer types `fraction` (reduced-check with hint) and `term` · S
- E1-3 · MasteryEngine + Ampel · S
- E1-4 · SelectionEngine · M
- E1-5 · RepairMode — transfer now draws from sibling topics (parent subtree), not the empty parent · S
- E1-6 · VariantGenerator: sync SHA-256, sfc32 RNG, `derived` + `constraints`, template filters (`fixed`, `frac`, `fractex`, `euro`, `sign`…), legacy emoji-explanation parser · M
- E1-7 · SessionController (repair overrides selection, attempt persisted before mastery, no back-to-back repeats, hard cap) · M
- E1-8 · Calculator (degrees, German comma, `:`/`×`/`−` accepted) · S
- E1-9 · Vitest: 10 suites / 112 tests green, `tsc -b` clean · M
- E2-1 · Schema v2 `content_packs/schema.v2.json` (lessons, structured sections, templates, `source`, `figure`) · M

## Backlog

### E2 · Content pipeline (remaining)
- E2-4 · Content check in CI (wired in workflow; verify on first push) · S
- E2-5 · **Audit legacy math answers** — migration already caught one wrong MSA answer; review all 192 legacy math items topic by topic while doing E3 · M

### E3 · Content — Mathe from the 2027 e-book (lesson + drill templates + exam items per section)
- E3-1 · 1.1 Bruchrechnung · M
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
- E4-3 · Profiles (create/select, emoji avatar, local only) · S
- E4-4 · Dashboard: Ampel per topic, streak, "next up", subject tabs · M
- E4-6 · Session view: renderers MCQ / SHORT / CLOZE / MATCH, timer, progress, repair-mode banner · L
- E4-7 · Feedback panel: structured explanation, correct answer, mastery delta, Hilfe → lesson · M
- E4-8 · Calculator drawer (math only) · S
- E4-9 · Result view + streak/celebration · S
- E4-10 · Exam mode (timed block, summary) · M
- E4-11 · Parent/overview page (per-topic table, export/import) · S
- E4-12 · PWA: icons, offline content caching check · S
- E4-13 · Accessibility pass: focus states, contrast, keyboard for MCQ/MATCH · S

### E5 · QA & release (remaining)
- E5-1 · Vitest in CI (in workflow) · S
- E5-4 · Performance: code-split KaTeX, content lazy-load per subject, Lighthouse ≥ 90 · S
- E5-5 · User: create GitHub repo, push, enable Pages (Settings → Pages → Source: GitHub Actions) · S

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

## Risks / Blockers
- Content volume for E3 is the long pole; correctness enforced by generated-variant checks, not by hand alone.
- No `gh` CLI on this machine — GitHub remote/Pages settings must be done by the user (instructions will be provided).
- Legacy content quality unknown beyond schema — see E2-5.
