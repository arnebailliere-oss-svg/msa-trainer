# MSA Trainer — Project Board

> Source of truth for progress. Updated by Claude as work moves. Last update: 2026-09-04 01:30
>
> Columns: **Backlog** → **In Progress** → **Review** (built, needs verification) → **Done** (verified).

## Goal
Rebuild MSA Trainer as a fast, modern, youth-friendly **static web app / PWA** on GitHub Pages:
teach → drill (fresh variants) → repeat (mastery + repair), Math first from the 2027 e-book, with automated content checks.

**Content now:** 607 questions (180 templated: 142 number templates + 38 sentence banks; 82 original-exam items 2023–2025; 307 legacy math, 51 with generated figures). DE 100, EN 94, 22 lessons (12 Mathe incl. Formelblatt, 6 Deutsch, 4 Englisch) with explorers and figure galleries, 19 Eulen-Lektionen (14 Mathe, 3 Deutsch, 2 Englisch), 33 generated figures, 75 topics, 0 validation errors.

**Milestones:** `d71e336` baseline · `b282d2f` web app end-to-end · `da469aa` modules 1–5 · `50d2610` all 16 Training sections · `01d0756` figures + widgets + exams 2023–2025 · `c9ea264` Formelblatt + audit · (next) exam mode + legacy figures

---

## In Progress
- E6-1 · README + CLAUDE.md for the web app · S

## Review
- E4-12 · PWA install/offline on a real phone · S

## Done
- E0 · Repo, scaffold, board
- E1 · Core port to TS (115 unit tests), persistence
- E2-1 … E2-3 · Schema v2, validator (schema + semantics + 60-render template exercise + KaTeX + figure rendering), legacy migration with 3 fixes
- E3-1 … E3-15 · All 16 Training sections of the 2027 e-book: 11 lessons, 139 templated drills, per-question sources
- E3-18 · **Deutsch and Englisch built from the 2026 e-books**: engine gets `pick` variables (sentence banks → fresh variants, constraints, validator checks); 18 new topics; DE 6 lessons (Kommasetzung, Rechtschreibung, Sprachwissen, Stil/Fehler, Textverständnis, Erörterung) + 3 primers (Hauptsatz/Nebensatz, das/dass, Wortarten) + 22 bank drills + reading texts; EN 4 lessons (Tenses, Modals/if/questions/comparison, Listening/Reading, Writing/Mediation/Vocab) + 2 primers (Verbformen, Zeitformen) + 16 bank drills + matching/signs/article/vocab items; cloze parts render inline; e2e `deutsch.spec.ts`, `english.spec.ts`
- E7-2 · **All 14 Eulen-Lektionen** (Zeichen, Brüche, Prozent, Terme/Rechengesetze, Gleichungen, Potenzen, LGS, Stochastik, Funktionen, Parabel/pq, Einheiten, Fläche/Umfang/Winkel, Pythagoras/Trig, Körper): 150 boards with Ferdinand lines, 100 vocab cards, 73 quiz questions; every lesson has the owl card and 26 dense sections carry badges
- E7-3 · **Figure galleries in lessons**: sections may carry `figures: [{caption, figure}]`; 19 sections now draw every shape they mention (Rechteck, Quadrat, Parallelogramm, Dreieck mit Höhe, Trapez, Kreis, 5 Winkelarten, Konstruktionsdreieck, Quader, Zylinder, Pyramide, Kegel, Kugel, Baumdiagramm, Säulen/Kreisdiagramm, Geraden/Punkte); new generators `angle`, `pyramid`, `cone`, `sphere`; lesson figures now render in TopicView too; e2e `lessons.spec.ts`
- E7-1 · **Frag Ferdinand (Eulen-Lektionen)**: new content type `primers/*.json` (boards + `say` + vocab + quiz), schema + validator (quiz correctness, KaTeX, figures, references), progress flag per primer, chalkboard view `#/eule/:id` (Patrick Hand chalk font bundled, wipe animation, keyboard 1–5/Enter/arrows), ladder index `#/eule`, owl card at lesson top + inline badges on dense sections, dashboard entry; 3 primers live (Zeichen 15 Tafeln, Terme/Rechengesetze 14, Gleichungen 9); e2e `owl.spec.ts` desktop + mobile
- E5-3/E5-5/E5-6 · **Live on GitHub Pages**: repo `arnebailliere-oss-svg/msa-trainer` (public), Actions workflow runs tests + content check + build on every push to `main`, Pages source = workflow (enabled via API; the workflow token may not create the Pages site itself). URL: https://arnebailliere-oss-svg.github.io/msa-trainer/
- E4-10 · **Exam mode** like the real Prüfung: first 40 % Basisaufgaben (hilfsmittelfrei, calculator disabled), then Sternchen-/Sachaufgaben; stopwatch in the header; result page lists every task with time, source and correct answer; pool = 2023–2025 originals only (older exam items retagged `altpruefung`) — e2e `exam.spec.ts`
- E4-18 · **Figures for legacy items**: 51 generated figures (right/general triangles incl. relabelled vertices and height line, rectangles, parallelogram, trapezoids, circles, Quader, Zylinder, coordinate systems with lines/parabolas, tree diagram, pie chart) — screenshots in `e2e/screenshots/legacy-*.png`
- E2-5b · 12 exact duplicates removed (same prompt twice), 9 misfiled items moved to the right topic (powers → MATH_ALG_POW, Mantelfläche → Volumen, …)
- E2-5 · **Legacy math audit** (192 items read line by line): 3 wrong answers fixed (Rührholz MSA2022 ×2 used radius instead of diameter → 11,2 cm; Zylinder d=55 → 142 478), 1 ambiguous MCQ (three choices = ½), 2 items with 0 tolerance on rounded π-values; evaluator now accepts answers that round to the stored precision when no tolerance is given (116 tests)
- E3-17 · **Formelblatt** as lesson `L_MATH_FORMELBLATT`, page `#/formeln`, dashboard link and 📐 drawer inside every math session; exam mode picks exam-tagged items first (10 per run)
- E3-16 · Original exams **2025, 2024, 2023** → 65 exam-mode items (difficulty 3–5) with Musterlösung steps; templated twins for 1a/1d/4a (2025). 2022 deliberately skipped — three years show the recurring task families.
- E4-1 … E4-9, E4-11 · Web UI (design system, dashboard, topic/lesson, session with 4 renderers, feedback, calculator, result, overview)
- E4-14 · Contrast pass
- E4-15 · Preview route `#/preview/<question-id>` (variants, answer check, internal solution)
- E4-16 · **Generated SVG figures** (`core/figures.ts`): right/general triangle with angle marks, rectangle (+diagonal), parallelogram, trapezoid, circle, coordinate system with lines/parabolas/points, bar/pie chart, tree diagram, Quader, Zylinder — drawn from the question's own variables; validated for every variant
- E4-17 · **Lesson explorers** (`ui/widgets.tsx`): line (m, n), parabola (a, d, e), right triangle (a, b → c, α)
- E5-2 · Playwright smoke desktop + mobile, dark-mode + figure preview captures
- Evaluator upgrades · term equivalence by numeric sampling, exact-form fractions, `require_simplified`, `alsoFor` lessons, bold/italic with inline math

## Backlog

### Content
- E3-20 · DE: Ferdinand primers for Stilmittel and Erörterung; EN: primer for e-mail writing · M
- E3-21 · DE/EN exam-tagged originals for the Prüfungs-Modus (currently math only) · M
- E3-19 · Optional: exam 2022 (text already extracted in scratch) · S

### UI
- E4-13 · Accessibility pass: focus states, contrast, keyboard for MATCH · S

### Release
- E5-6b · PWA install + offline check on a real phone against the live URL · S
- E5-4 · Lighthouse pass · S

### Docs
- E6-2 · STATUS.md replaces stale content plans; ALGORITHM.md aligned with TS · S

---

## Decisions
- 2026-09-03 · **Frag Ferdinand**: every dense lesson section gets an owl badge to a pre-lesson that assumes nothing. Format is a chalkboard: one idea per board in plain language, click → wipe → next board, then the words, then a mini quiz on the board (pass ≥ 80 %). Ferdinand speaks in a bubble below the board. Goal: let students who missed lessons catch up from zero.
- 2026-09-02 · Architecture: static PWA (Vite + React + TS + Tailwind + KaTeX), Python core ported to TS, progress in browser. Hosting: GitHub Pages via Actions.
- 2026-09-02 · PySide6 app is **legacy** (kept in `src/msa_trainer/`, not developed further).
- 2026-09-02 · Commercial e-books are never committed or shipped as scans; content is transcribed/adapted with `source` references. iMINT PDFs (CC BY-SA) stay local.
- 2026-09-02 · Content source of truth is `content_packs/berlin_msa/` (v2). `berlin_msa_v1/` is frozen legacy input.
- 2026-09-02 · Content build validates and exercises every template (60 renders), every KaTeX snippet and every figure; errors fail the build.
- 2026-09-02 · Trig uses degrees. Routing uses `HashRouter`. Term answers judged by numeric equivalence.
- 2026-09-02 · Figures are **generated SVG from template variables**, never scans; interactive explorers live in lessons as `widget` sections.
- 2026-09-02 · Exam pool = 2023–2025 originals; older years not added (user decision: one exam to pass, three years show the pattern).
- 2026-09-02 · Prüfungs-Modus draws only from `exam`-tagged items (2023–2025). Older originals (2009–2020) carry `altpruefung` and stay in the training pools.
- 2026-09-02 · Never write JSON/TS with backslashes through Bash heredocs (the tool collapses `\\`); use Write/Edit or Node with `String.fromCharCode(92)`.

## Risks / Blockers
- `gh` CLI is a portable install at `%LOCALAPPDATA%Programsghingh.exe` (not on PATH), logged in as arnebailliere-oss-svg.
- Legacy math audited (E2-5). Legacy DE/EN (118 items) checked only by schema/render — see E3-18.
- DE/EN: listening needs audio (only the publisher has it) and free writing cannot be auto-checked; the app teaches strategies and drills the recurring task types.
