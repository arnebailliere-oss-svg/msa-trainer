# MSA Trainer — Project Board

> Source of truth for progress. Updated by Claude as work moves. Last update: 2026-09-04
>
> Columns: **Backlog** → **In Progress** → **Review** (built, needs verification) → **Done** (verified).

## Goal
Rebuild MSA Trainer as a fast, modern, youth-friendly **static web app / PWA** on GitHub Pages:
teach → drill (fresh variants) → repeat (mastery + repair), Math first from the 2027 e-book, with automated content checks.

**Content now (2026-09-04, after the sprint):** 953 questions — MATH 440, DE 293, EN 220 (294 templated: 162 number templates + 132 sentence banks with 1 385 sentences → fresh variants; 202 original-exam items 2022–2025 incl. 15 rule-checked writing tasks), 22 lessons (incl. Formelblatt), 24 Eulen-Lektionen (247 boards, 126 quiz items), 21 shared passages, 93 topics (74 leaf), 0 validation errors, 2 warnings (two math templates with few distinct prompts).

**Bis fertig (definition of done):** every leaf topic ≥ 6 drills ✅ · every subject with an exam pool ≥ 25 items ✅ (MATH 82, DE 65, EN 55) · every lesson with its owl ✅ · Lighthouse/accessibility pass ☐ · one real student run-through ☐. Next: the **Nachweis-Modell** (E8) so that mastery is reached in a bounded number of tasks — see In Progress.

**Milestones:** `d71e336` baseline · `b282d2f` web app end-to-end · `da469aa` modules 1–5 · `50d2610` all 16 Training sections · `01d0756` figures + widgets + exams 2023–2025 · `c9ea264` Formelblatt + audit · (next) exam mode + legacy figures

---

## In Progress
- E8 · **Nachweis-Modell, Tagesplan, Prüfungsreife** (decision 2026-09-04): mastery by recent evidence instead of accumulated points — topic levels Neu → Angefangen → Geübt (4 of last 6) → Sicher (5 of last 6, ≥ 2 at exam difficulty, 2 days) → Prüfungsfest (spaced check ≥ 3 days later); idle > 14 days drops to Geübt. Daily plan "Heute: 12 Aufgaben" = due checks → repairs → next ladder topics by priority (2–3 tasks per topic). Topic `priority` 1–3 from the curriculum map; Prüfungsreife % = priority-weighted share of topics ≥ Sicher, "prüfungsreif" at ≥ 85 % + all priority-3 topics Sicher + one passed Prüfungs-Modus run; estimate of remaining tasks/days. Budget: ≈ 9 tasks per topic → ≈ 660 tasks for all three subjects (≈ 8 weeks at 12/day). Engine first (`core/mastery.ts`, new `core/levels.ts`, `core/plan.ts`, `core/readiness.ts`, tests, ALGORITHM.md), UI after the other session's onboarding/WRITE work is committed · L
- E6-1 · README + CLAUDE.md for the web app · S

## Review
- E4-12 · PWA install/offline on a real phone · S

## Done
- E7-6 · **Primer pedagogy audit + EN rewrite** — user review 2026-09-04: Eulen-Lektionen must build knowledge from zero, not condense the lesson. All 24 primers audited board by board: Mathe 14/14 and Deutsch 6/6 already built the right way (image first, one idea per board, example before rule); Englisch: `P_EN_VERBFORMEN` fine, `P_EN_READING`, `P_EN_EMAIL`, `P_EN_ZEITFORMEN` rewritten (26/19/20 boards) with worked examples from the real 2024 exam (Quebec matching, Hull Trains sign, Voluntourism article), „Jetzt du“ → „Auflösung“ pairs, vocabulary explained before use, quizzes testing what the boards built. Rule recorded in memory; e2e `primers-en.spec.ts` runs all three to the done board.
- E3-24/25/26 · **Content sprint "in one go"** (six parallel jobs, one validation, reviewed by sample and screenshots): **Deutsch** +126 drills in `de_07_ortho_zeichen_drills` (48: ss/ß, Doppelkonsonanten, getrennt/zusammen, das/dass, Strategien, Komma bei Aufzählung/Infinitiv, direkte Rede), `de_08_grammatik_stil_drills` (52: Satzarten, Satzglieder, Modus, Aktiv/Passiv, indirekte Rede, Partizip, Register), `de_09_lesen_schreiben_drills` (26: Argument/Beispiel, Textbeleg, Mini-Zusammenfassung) + 3 original texts (`de_training_2`) + primer **P_DE_LESEN** on the Lesen lesson. **Englisch** +71 drills in `en_04_drills` (vocab sets, e-mails/notices with passages, signs banks, matching, listening numbers as "You hear" transcripts, if-clauses, modals, comparison, guided writing, e-mail writing, mediation, error-fix) + 5 passages (`en_training_2`) + primer **P_EN_READING** on the Listening/Reading lesson. **Mathe** +27 templated items in `math_12_graphen_tabellen_sach` (9 figure-based "Graph ablesen", 9 Wertetabelle, 9 Sachaufgaben with equations) and `alsoFor` + two new sections (Umwandlungen, exponentielles Wachstum) so no math topic lacks a lesson. Every leaf topic now has ≥ 6 drills; e2e `sprint-preview.spec.ts` screenshots any item/primer by id (`PREVIEW_IDS`, `PRIMER_IDS`)
- E3-27 · **Schreibaufgaben mit Regel-Bewertung (qtype WRITE)** — free writing is now practised and checked the way the exam scores it. `core/evaluators.ts::evaluateWrite`: word count, content points (keyword sets from the Musterlösung), required elements (greeting, closing, subject, paragraphs, sentences), Erörterung rules (both_sides, belege, transitions, opinion_last, standard_language), register; pass at ≥ 70 % of weighted checks *and* word count met. Sprache is deliberately **not** scored: Germanisms (*I have 15 years*, *since two years*, *at Monday* …) and Umgangssprache show as weight-0 hints, and every task shows the Musterlösung for self-comparison. Schreibplan = 19-cell grid, 1 point per real Stichpunkt. Renderer with live word counter (`ui/renderers.tsx`), checklist feedback in Session and Preview, validator makes every Musterlösung earn all its own points. Content: 15 tasks from the real exams 2022–2024 — EN Part 1 photo ×3, Part 2 blog reply ×3, Part 3 mediation ×3 (blog posts and German articles as passages), DE Schreibplan ×3 + Erörterung ×3 (Soziale Medien, Veggie-Day 2023, E-Scooter 2024). Unit tests (127) + e2e `writing.spec.ts` desktop/mobile; guide chapter updated.
- E3-22 · **Englisch exam 2023**: 30 items tagged exam/msa2023 — Reading Part 1 Boston (MATCH + 5 MCQ), Part 2 six signs (transcribed from the page images), Part 3 "Britain's problem with pets" (9 MCQ on a passage), Writing Parts 1–3 as requirement checks (photo, blog reply, ChatGPT mediation). All 20 reading answers verified against the Musterlösung; Nr. 17 options reconstructed because the Prüfungsheft misprints them (tag `reconstructed`). Listening skipped (no audio). EN exam pool now 46 items
- E4-19 · **Onboarding: Willkommens-Tour + Hilfeseite** — the app now explains itself. One source of truth (`web/src/ui/guide.tsx`, 11 chapters with non-interactive replicas of the real controls) rendered twice: as a 7-step modal tour Ferdinand shows every new profile once (`ui/WelcomeTour.tsx`, keyboard-driven, „seen“ per profile in localStorage, replayable) and as the permanent page `#/hilfe` (`views/HelpView.tsx`) with a chapter jump bar. Covers: Fach wechseln, Frag Ferdinand, Eule→Lektion→Aufgaben, die vier Trainings, Ampel/Können-%, Taschenrechner (mit Syntax-Tabelle) + Formelblatt, Reparatur-Modus, Tastatur, Sicherung, PWA-Installation. Entry points: ❓ Hilfe im Header (auch ohne Profil), „So funktioniert's“ auf der Startseite und im Dashboard. Dazu: Label „Fach wählen“ über den Fach-Tabs, Textlabels „Rechner“/„Formeln“ an den Session-Werkzeugen; e2e `help.spec.ts`.
- E0 · Repo, scaffold, board
- E1 · Core port to TS (115 unit tests), persistence
- E2-1 … E2-3 · Schema v2, validator (schema + semantics + 60-render template exercise + KaTeX + figure rendering), legacy migration with 3 fixes
- E3-1 … E3-15 · All 16 Training sections of the 2027 e-book: 11 lessons, 139 templated drills, per-question sources
- E3-23 · **Passages**: shared reading texts (`passages/*.json`, ids `X_…`) rendered once in a collapsible panel above the question, validated (refs, subject, TeX), and kept together in a session: after a passage question the controller continues with its unanswered siblings (unit test `passage.test.ts`). Used by the Voluntourism article (9 static exam questions), the Quebec tours (MATCH + 5 second-tour items) and the training texts (Handys, Der letzte Bus, Screen time)
- E3-21b · **Deutsch exam 2023**: 26 original items (Sprachwissen 151–156 and 251–256, Richtig schreiben 401–404, Überarbeiten 501–508, 510) with Musterlösung, tagged exam/msa2023
- E3-22a · **Englisch Prüfungs-Modus**: MSA 2024 Reading Part 1 (Quebec tours: MATCH + 5 second-tour items), Part 2 (6 short texts reconstructed around the key sentences, statements original), Part 3 (Voluntourism article with all 9 questions) tagged exam/msa2024
- E3-20 · **Primers** Stilmittel, Erörterung (DE) and E-Mail (EN) with badges on their lessons: 22 Eulen-Lektionen in total
- E3-21 · **Deutsch Prüfungs-Modus**: 31 original items from MSA Deutsch 2024 (Sprachwissen 151–160 and 251–257, Richtig schreiben 401–404, Überarbeiten 501–510) transcribed with Musterlösung, tagged exam/msa2024; free-text tasks turned into MCQ/CLOZE/MATCH with the original wording kept
- E7-4 · **Proactive Ferdinand**: after two wrong answers in a row on a topic, the feedback shows the owl card for the primer of that topic (not in exam mode)
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

### Content (what "fertig" still needs)
- E3-28 · Writing tier 2: optional language feedback via a user-supplied API key (never shipped in the static app) — product decision pending (data leaves the device) · M
- E3-29 · Two math templates with few distinct prompts (`MATH_POW_ZEHNER_NEG_T1`, `MATH_CHARTS_SAEULEN_LESEN_T1`): widen the variable ranges · S
- E3-30 · Direct-speech CLOZE: closing quotation mark wraps onto its own line after the last dropdown (`DE_O7_REDE_ZEICHEN_CLOZE_T1`); keep the mark attached to the select · S
- E3-19 · Optional: exam 2022 (text already extracted in scratch) · S

### UI
- E4-13 · Accessibility pass: focus states, contrast, keyboard for MATCH · S
- E4-20 · **Mobile layout viewport**: on an emulated phone the dashboard forces `innerWidth` 593 px (start page: 412), i.e. Chromium zooms the page out — some element's min-content is too wide. Costs readability on phones and breaks Playwright hit-testing for overlays (the mobile half of `help.spec.ts` skips one test because of it). Pre-existing, found 2026-09-04. · S

### Release
- E5-6b · PWA install + offline check on a real phone against the live URL · S
- E5-4 · Lighthouse pass · S

### Docs
- E6-2 · STATUS.md replaces stale content plans; ALGORITHM.md aligned with TS · S

---

## Decisions
- 2026-09-04 · **Writing is graded by rules, not by a model.** The official grids are half checklist (EN Inhalt/Sprache 50:50 with content points; DE Schreibplan 1 P per cell; Erörterung rubric starts with Gliederung/Schreibfunktion). The app scores exactly that half and never pretends to grade Sprache; language feedback is hints + Musterlösung. A WRITE attempt counts as correct at ≥ 70 % so mastery/repair keep working unchanged.
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
