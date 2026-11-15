# Comprehensibility audit and fix checklist

Baseline: 2026-11-15. Three independent read-throughs (one per subject) of all 22 lessons, all 24 owl lessons and 207 of 655 sampled question explanations, scored against 12 criteria. This file is the single checklist for "is it comprehensible"; an item is done only when its row is ticked with evidence.

## Criteria (0 fails, 1 partly, 2 meets; total /24)

A prior knowledge and terms explained before use · B one new idea per step · C example before rule · D worked example with visible reasoning, then fading help · E student does something after each idea · F feedback says why · G earlier ideas return · H full calm sentences, no shorthand or symbol chains · I tables, timelines, figures where the content needs them · J digestible amount per screen · K quiz and drills test what was taught · L encouraging tone

## Result in one view

| Subject | Lessons (avg /24) | Owl lessons (avg /24) | Keep | Revise | Rebuild |
|---|---|---|---|---|---|
| Maths | 12 (10.3) | 14 (16.1) | 0 | 22 | 4 |
| German | 6 (8.3) | 6 (17.3) | 0 | 8 | 4 |
| English | 4 (6.5) | 4 (17.3) | 1 | 4 | 3 |

Findings that hold in all three subjects:
1. Lesson pages are reference sheets, not teaching: rule first, one page for up to 6 topics, nothing for the student to do (E = 0 for all 22).
2. Owl lessons are written in the right voice but are passive and too short: before 2026-11-15 no board in any subject had a task; one board and one example per concept.
3. Symbol chains stand in for explanation (arrows: 78 in German lessons, 66 in Maths lessons, 33 in Maths owl lessons); every "Merke" is a keyword chain.
4. Terms and symbols are used before they are explained.
5. Drills exist for topics that no lesson or owl lesson teaches.
6. Question explanations are good in the newer drill files and thin in the oldest template files and the exam files.

## Decisions (Arne, 2026-11-15)

One topic = guided lessons in the owl format plus a Spickzettel · missing basics are written in the same run · order: English, German, Maths · worked through in one session, one item after another · one pattern per type is approved before roll-out · long lessons get chapters of about 8 to 10 boards with a remembered position · weak question files are rewritten completely · commits stay local, push only on Arne's go.

## The standard, as enforced by the content check

Code: `web/scripts/standard.ts`, word list `content_packs/berlin_msa/terms.json`. A guided lesson is marked `"standard": 2`, a Spickzettel `"sheet": true`; from then on any violation fails `npm run content`. `npm run content -- --check --standard` lists what every not-yet-migrated item is missing.

Guided lesson: chapters of 4–12 boards once it has more than 12 boards · never more than 3 boards in a row without a task · every chapter has a task · at most 60 words on a board (45 with tasks) · Ferdinand speaks on every board, 8–70 words, no arrows, at most one clipped sentence · no line with two or more arrows · every task has a "why" and a "hint" for a wrong tap, and the hint does not give the answer away · quiz of at least 6 questions and at least chapters + 2 · every listed technical term is explained in bold on the board where it first appears, or comes from a lesson named in `requires` · every word in the word list appears on a board.

Spickzettel: names its guided lessons, all of them at the standard · at most 10 cards · at most 110 words outside tables per card · tables of at most 14 rows · no arrow chains · "Merke" in full sentences.

Checked by a person, not by the machine: example before rule, visible reasoning, tone, factual correctness.

App support added: chapters with a pause board and remembered position, hint after a wrong tap, answer choices shuffled on every visit (this also settles "correct answer always first"), tables and tap-to-open cards for the Spickzettel, topic page shows guided lessons first. Browser test: `web/e2e/standard.spec.ts` (desktop and phone).

## Checklist: lessons

| ☐ | id | /24 | verdict | worst problem |
|---|---|---|---|---|
| ◐ | L_EN_TENSES | 5 | rebuild | Pattern Spickzettel built 2026-11-15, passes the check, awaiting Arne's approval. Open: guided list names only P_EN_VERBFORMEN until the tense lessons are rebuilt |
| ☐ | L_EN_GRAMMAR | 4 | rebuild | Four topics, each one rule block, no example first, no practice |
| ☐ | L_EN_LISTENING_READING | 10 | revise | Strategies asserted, not shown; true/false/not-in-text format missing |
| ☐ | L_EN_WRITING | 7 | rebuild | Ten topics on one page as phrase lists |
| ☐ | L_DE_KOMMA | 9 | revise | Eight rules rule-first; the 6-step checklist is never applied to a sentence |
| ☐ | L_DE_RECHTSCHREIBUNG | 6 | rebuild | Six topics in one cheat sheet; a 114-word, 10-item list |
| ☐ | L_DE_GRAMMATIK | 8 | rebuild | Seven topics in 573 words of definition fragments |
| ☐ | L_DE_STIL | 7 | rebuild | 17 devices in one list, each glossed in 2–4 words |
| ☐ | L_DE_LESEN | 10 | revise | A reading lesson with no text; examples are fragments of unseen passages |
| ☐ | L_DE_EROERTERUNG | 10 | revise | Serves rephrase and summary topics but teaches neither; no model paragraph |
| ☐ | L_MATH_FORMELBLATT | 8 | revise | Bare formulas; vertex-form sign contradicts the lessons |
| ☐ | L_MATH_NUM_FRAC | 11 | revise | Rules as letter formulas without reasons |
| ☐ | L_MATH_NUM_PCT | 11 | revise | Three rearranged formulas stated, none derived |
| ☐ | L_MATH_ALG_EQU | 5 | rebuild | Five topics on one page; word problems not taught |
| ☐ | L_MATH_ALG_POW | 9 | revise | Laws listed without any why |
| ☐ | L_MATH_ALG_LGS | 12 | revise | Starts abstract; examples are arrow chains |
| ☐ | L_MATH_DATA | 12 | revise | Reading diagrams not taught |
| ☐ | L_MATH_FUNC | 8 | rebuild | Six topics; table and graph reading barely taught |
| ☐ | L_MATH_GEO_UNITS | 13 | revise | No unit staircase or table |
| ☐ | L_MATH_GEO_FLAECHE | 10 | revise | Five topics on one page, formulas first |
| ☐ | L_MATH_GEO_PYTH_TRIG | 13 | revise | Trig example relabels the triangle against what was just taught |
| ☐ | L_MATH_GEO_KOERPER | 12 | revise | About 17 formulas in one section |

## Checklist: owl lessons

| ☐ | id | /24 | verdict | worst problem |
|---|---|---|---|---|
| ◐ | P_EN_VERBFORMEN | 20 | keep, small fixes | Pattern guided lesson 2026-11-15: 43 boards in 7 chapters, 18 boards with tasks, all six audit points fixed, passes the check, awaiting Arne's approval |
| ☐ | P_EN_ZEITFORMEN | 14 | revise | One board per tense in the second half; four tenses never practised; pressure wording |
| ☐ | P_EN_EMAIL | 16 | revise | Formal phrases without German help; student never writes |
| ☐ | P_EN_READING | 19 | revise | Long English passages without glosses; "half past nine" explanation contradicts itself |
| ☐ | P_DE_SATZ | 16 | revise | Signal-word board teaches a rule that produces wrong commas |
| ☐ | P_DE_DAS_DASS | 21 | revise, light | No practice between boards |
| ☐ | P_DE_WORTARTEN | 15 | rebuild, split in two | 8 word classes and 4 sentence parts in 10 boards |
| ☐ | P_DE_STILMITTEL | 16 | revise | 14 devices in 9 boards; quiz checks 4 |
| ☐ | P_DE_EROERTERUNG | 17 | revise | Quiz is recall; drills demand a plan and a 200-word text |
| ☐ | P_DE_LESEN | 19 | revise, light | No tasks; richtig/falsch/steht nicht im Text missing |
| ☐ | P_MATH_ZEICHEN | 18 | revise | Nothing to do on 15 boards |
| ☐ | P_MATH_BRUCH | 18 | revise | Finding the common denominator never explained |
| ☐ | P_MATH_PROZENT | 16 | revise | No figure; percentage change and compound interest missing |
| ☐ | P_MATH_TERME | 16 | revise | Minus-bracket rule asserted, not shown |
| ☐ | P_MATH_GLEICHUNG | 17 | revise | Balance never drawn; "Plus wird Minus" shortcut undoes the idea |
| ☐ | P_MATH_POTENZ | 15 | revise | Power 0 and negative exponents are "just remember it" |
| ☐ | P_MATH_LGS | 13 | rebuild | 7 boards; each method is one arrow chain |
| ☐ | P_MATH_STOCHASTIK | 16 | revise, split | Two subjects in 11 boards |
| ☐ | P_MATH_FUNKTION | 18 | revise | Proportionality and exponential growth have no boards |
| ☐ | P_MATH_QUADRAT | 14 | rebuild boards 7–9 | pq formula shown and solved on one board |
| ☐ | P_MATH_EINHEITEN | 16 | revise | Area and volume boards contradict their own rule |
| ☐ | P_MATH_GEO_BEGRIFFE | 17 | revise | Circle, π, parallelogram, trapezium absent |
| ☐ | P_MATH_PYTH_TRIG | 14 | revise, split | Trig rearranging skipped; "picture" board has no figure |
| ☐ | P_MATH_KOERPER | 17 | revise | Notation differs from the lesson |

## Content errors to verify and fix

- ☐ P_EN_READING, board "Auflösung: die Durchsage": Ferdinand's line on "half past nine" contradicts itself.
- ☐ L_EN_LISTENING_READING: "quarter past nine (21:15 abends)" conflates 9:15 and 21:15.
- ☐ EN_FORMAL_INFORMAL_MCQ_T1 accepts "wanna" as informal; lesson and P_EN_EMAIL forbid it.
- ☐ P_DE_SATZ, board "Die Signalwörter": "Davor kommt ein Komma" with der/die/das and als in the list.
- ☐ DE_MSA2023_404: "Eines SONNTAGS" explained as an adverb; check against the original paper.
- ☐ P_DE_WORTARTEN: "mein, dein, sein" listed as standing in place of a noun; Präposition and Adverb share one description.
- ☐ P_DE_STILMITTEL: teaser says seven tricks, outro says six families.
- ☐ L_DE_RECHTSCHREIBUNG: worked example applies Ableiten to i/ü though the rule limits it to e/ä and eu/äu.
- ☐ L_MATH_FORMELBLATT: vertex form written as (x + d)² + e with S(−d|e); lessons use (x − d)² + e with S(d|e). Kosinussatz referenced but absent.
- ☐ L_MATH_GEO_PYTH_TRIG: worked example names a as hypotenuse after c was taught.
- ☐ P_MATH_EINHEITEN board 4: 1 m² = 10 000 cm² next to "jede Stufe mal 100".
- ☐ Maths notation drift: G/O/M/U vs A_G/A_O/A_M/u; W/p = G/100 vs W/G = p/100.
- ☑ Maths owl quizzes: correct answer is listed first in all 73 items. The app did not shuffle; it now shuffles quiz and task choices on every visit (PrimerView, 2026-11-15).

## Taught nowhere (drills exist or the material assumes it)

English: be as a main verb and was/were · -es and -ies endings · question words · prepositions of time · linking words · -ed vs -ing adjectives · syllables for comparison · Present Perfect Progressive and future uses that the tense drill asks for · past forms of modals · true/false/not-in-text format · paraphrasing for mediation. No owl lesson for modals, if-clauses, comparison, mediation, picture description, blog reply, vocabulary, error-fixing, reading e-mails; listening has 4 boards.

German: the four cases · Subjekt before the comma material uses it · short and long vowels, syllables · Infinitiv, Suffix, Nominalisierung · what Konjunktiv is and how it is built · strong and weak verbs · Begleitsatz, Apposition · reading diagrams and tables · literary texts · turning a plan line into a paragraph. Topics with drills but no teaching: DE_WRITE_REPHRASE (13), DE_WRITE_SUMMARY (9), DE_READ_ARGUMENT (9). No owl lesson for spelling, capitalisation, ss/ß, separate/joined, list and infinitive commas, direct speech, tenses, mood, passive, indirect speech, participles, register, error types.

Maths: calculating with negative numbers · rounding (40 questions say "Runde") · multiplying and dividing decimals · finding the kgV · turning a text into an equation (27 questions) · reading a value off a diagram · slope triangle · what π is · kite and symmetry · circle sector · mixed numbers. No owl boards for rule of three, exponential growth, circle, charts, word problems, percentage change and compound interest, binomial formulas, Gleichsetzungsverfahren, Sinus-/Kosinussatz.

## Question explanations

| Subject | Sampled | Explain the reasoning | Weak files |
|---|---|---|---|
| English | 62 of 159 | 44 | en_01_grammar, en_03_writing_vocab (one-line reason plus a generic block) |
| German | 77 of 236 | 67 | de_01–de_04 templates; de_exam_2023/2024 (one sentence, no wrong option discussed) |
| Maths | 68 of 260 | 57 | exam files (median 34–41 words) |

Models to copy: en_04_drills, de_07/08/09 drill files, math_12_graphen_tabellen_sach.

## Worth preserving

Ferdinand's voice and tone (no shaming found in German or Maths) · German-first bridges ("ich ging, nicht ich gehte") · "das -s wandert zum Helfer" · P_DE_DAS_DASS (one probe repeated) · P_DE_LESEN's chain and "Die Routine in Aktion" · P_MATH_GLEICHUNG boards 1–6 · maths hooks (pizza, box for x, the riddle) · naming the wrong intuition · word origins · the "Probe ✓" habit in maths drills.
