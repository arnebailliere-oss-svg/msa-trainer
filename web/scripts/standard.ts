/**
 * Comprehensibility standard (docs/COMPREHENSIBILITY_AUDIT.md), as rules a machine can check.
 *
 * Guided lessons (Eulen-Lektionen with `standard: 2`) and Spickzettel (lessons with `sheet: true`)
 * must pass; a violation fails the content build. Lessons not yet migrated are only counted.
 *
 * What a machine cannot judge (example before rule, visible reasoning, tone) stays on the
 * human checklist in the audit file.
 */
import type { Lesson, Primer } from "../src/core/types";

export const LIMITS = {
  /** A lesson longer than this needs chapters. */
  boardsWithoutChapters: 12,
  chapterMin: 4,
  chapterMax: 12,
  /** At most this many boards in a row where the student only reads. */
  passiveRun: 3,
  bodyWords: 60,
  bodyWordsWithTasks: 45,
  sayWordsMin: 8,
  sayWordsMax: 70,
  whyWordsMin: 6,
  hintWordsMin: 6,
  quizMin: 6,
  explainWordsMin: 8,
  sheetSectionWords: 110,
  sheetSections: 10,
  sheetTableRows: 14,
} as const;

const LETTER = "A-Za-zÄÖÜäöüß";
const words = (s: string) => (s.replace(/\$[^$]*\$/g, " x ").match(new RegExp(`[${LETTER}0-9'’-]+`, "g")) ?? []).length;
const strip = (s: string) => s.replace(/\*\*/g, "").replace(/(?<![*\w])\*(?!\*)/g, "");

/** Lines that carry two or more arrows are shorthand chains ("Signalwort → Zeitstrahl → Ergebnis"). */
function arrowChains(text: string): string[] {
  return text.split("\n").filter((l) => (l.match(/→|->|=>|⇒/g) ?? []).length >= 2);
}

/** Spoken text: sentences of one or two words are telegram style ("Nie allein."). One is allowed (e.g. "Genau!"). */
function clippedSentences(text: string): string[] {
  return strip(text)
    .split(/(?<=[.!?…])(?<!\d\.)\s+/) // "die 3. Form" is not a sentence end
    .map((s) => s.trim())
    .filter((s) => s && words(s) <= 2 && !/^\(?\d+\)?[.)]?$/.test(s));
}

export interface TermList {
  [subject: string]: string[];
}

function termRegex(term: string): RegExp {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![${LETTER}-])${esc}(?:e|en|n|s|es|er|ern)?(?![${LETTER}])`);
}

/** Terms a primer explains: bold on a board, or listed in its word list. */
export function termsIntroduced(p: Primer, terms: string[]): Set<string> {
  const out = new Set<string>();
  const bold = [...p.steps.flatMap((s) => [s.body, s.say ?? ""]), ...p.vocab.map((v) => `**${v.term}**`)]
    .flatMap((t) => [...t.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1]!))
    .join(" | ");
  for (const t of terms) if (termRegex(t).test(bold)) out.add(t);
  return out;
}

export function checkPrimerStandard(p: Primer, terms: string[], primerById: Map<string, Primer>): string[] {
  const v: string[] = [];
  const steps = p.steps;

  // Chapters
  const starts = steps.map((s, i) => (s.chapter ? i : -1)).filter((i) => i >= 0);
  if (steps.length > LIMITS.boardsWithoutChapters && starts.length < 2) v.push(`${steps.length} boards without chapters (more than ${LIMITS.boardsWithoutChapters} boards need chapters)`);
  if (starts.length > 0) {
    if (starts[0] !== 0) v.push("the first board must start chapter 1");
    starts.forEach((st, ci) => {
      const len = (starts[ci + 1] ?? steps.length) - st;
      if (len < LIMITS.chapterMin || len > LIMITS.chapterMax) v.push(`chapter ${ci + 1} "${steps[st]!.chapter}" has ${len} boards (allowed ${LIMITS.chapterMin}–${LIMITS.chapterMax})`);
      const taskBoards = steps.slice(st, st + len).filter((s) => s.tasks?.length).length;
      if (taskBoards === 0) v.push(`chapter ${ci + 1} "${steps[st]!.chapter}" has no board where the student does something`);
    });
  }

  // Activity: never more than a few boards of reading in a row
  let run = 0;
  steps.forEach((s, i) => {
    run = s.tasks?.length ? 0 : run + 1;
    if (run === LIMITS.passiveRun + 1) v.push(`boards ${i - LIMITS.passiveRun + 1}–${i + 1}: more than ${LIMITS.passiveRun} boards in a row without a task`);
  });
  if (!steps.some((s) => s.tasks?.length)) v.push("no board has a task");

  // Per board: amount, full sentences, no shorthand
  steps.forEach((s, i) => {
    const b = `board ${i + 1} "${s.title}"`;
    const limit = s.tasks?.length ? LIMITS.bodyWordsWithTasks : LIMITS.bodyWords;
    const n = words(s.body);
    if (n > limit) v.push(`${b}: ${n} words on the board (limit ${limit}${s.tasks?.length ? " with tasks" : ""})`);
    if (!s.say) v.push(`${b}: Ferdinand says nothing`);
    else {
      const sn = words(s.say);
      if (sn < LIMITS.sayWordsMin) v.push(`${b}: Ferdinand's line has ${sn} words (at least ${LIMITS.sayWordsMin}; full, calm sentences)`);
      if (sn > LIMITS.sayWordsMax) v.push(`${b}: Ferdinand's line has ${sn} words (limit ${LIMITS.sayWordsMax})`);
      if (/→|->|=>|⇒/.test(s.say)) v.push(`${b}: arrow in Ferdinand's spoken line`);
      const clipped = clippedSentences(s.say);
      if (clipped.length > 1) v.push(`${b}: clipped sentences in Ferdinand's line (${clipped.slice(0, 3).join(" / ")})`);
    }
    for (const l of arrowChains(s.body)) v.push(`${b}: arrow chain "${l.trim().slice(0, 60)}"`);
    (s.tasks ?? []).forEach((t, ti) => {
      const w = `${b} task ${ti + 1}`;
      if (!t.why || words(t.why) < LIMITS.whyWordsMin) v.push(`${w}: "why" missing or shorter than ${LIMITS.whyWordsMin} words`);
      if (!t.hint || words(t.hint) < LIMITS.hintWordsMin) v.push(`${w}: "hint" (help after a wrong tap) missing or shorter than ${LIMITS.hintWordsMin} words`);
      if (t.hint && t.hint.includes(t.correct) && t.correct.length > 2) v.push(`${w}: the hint gives the answer away`);
      for (const l of arrowChains(`${t.why ?? ""}\n${t.hint ?? ""}`)) v.push(`${w}: arrow chain "${l.trim().slice(0, 60)}"`);
      // A task must make the student use the idea, not repeat a sentence that is already in front of them.
      const flat = (x: string) => x.toLowerCase().replace(/[*$_\\{}.,:;!?„“”"()]/g, " ").replace(/\s+/g, " ").trim();
      const answer = flat(t.correct);
      // A title that names both choices ("since oder for?") is fine; a title that names only the answer gives it away.
      const others = t.choices.filter((c) => c !== t.correct).map(flat);
      if (answer.length >= 4 && flat(s.title).includes(answer) && !others.some((o) => flat(s.title).includes(o)))
        v.push(`${w}: the board title already gives the answer "${t.correct}" (ask for a new example instead of a repetition)`);
    });
  });

  // Quiz
  const quizMin = Math.max(LIMITS.quizMin, starts.length + 2);
  if (p.quiz.length < quizMin) v.push(`quiz has ${p.quiz.length} questions (at least ${quizMin})`);
  p.quiz.forEach((q, i) => {
    if (words(q.explain) < LIMITS.explainWordsMin) v.push(`quiz ${i + 1}: explanation shorter than ${LIMITS.explainWordsMin} words`);
    for (const l of arrowChains(q.explain)) v.push(`quiz ${i + 1}: arrow chain "${l.trim().slice(0, 60)}"`);
  });

  // Hook and outro are spoken too
  for (const [name, t] of [["hook", p.hook], ["outro", p.outro ?? ""]] as const) {
    if (/→|->|=>|⇒/.test(t)) v.push(`${name}: arrow in a spoken line`);
    if (clippedSentences(t).length > 1) v.push(`${name}: clipped sentences`);
  }
  if (!p.outro) v.push("no outro");

  // Terms: explained (bold) on the board where they first appear, or known from a required lesson
  const known = new Set<string>();
  for (const rid of p.requires ?? []) {
    const r = primerById.get(rid);
    if (!r) v.push(`requires unknown lesson ${rid}`);
    else for (const t of termsIntroduced(r, terms)) known.add(t);
  }
  const hookText = strip(p.hook);
  for (const t of terms) if (!known.has(t) && termRegex(t).test(hookText)) v.push(`hook uses the term "${t}" before any board explains it`);
  steps.forEach((s, i) => {
    const text = strip([s.title, s.body, ...(s.tasks ?? []).flatMap((t) => [t.text, t.why ?? "", t.hint ?? ""]), s.say ?? ""].join("\n"));
    const bold = [...`${s.body}\n${s.say ?? ""}`.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1]!).join(" | ");
    for (const t of terms) {
      if (known.has(t)) continue;
      const re = termRegex(t);
      if (!re.test(text)) continue;
      if (re.test(bold)) known.add(t);
      else {
        v.push(`board ${i + 1} "${s.title}": term "${t}" is used before it is explained (explain it in bold on this board, or add the lesson that explains it to "requires")`);
        known.add(t);
      }
    }
  });
  const allText = strip(steps.map((s) => `${s.title}\n${s.body}\n${s.say ?? ""}`).join("\n")).toLowerCase();
  for (const voc of p.vocab) {
    const head = strip(voc.term).split(/[,(/]/)[0]!.replace(/[…?.! ]+$/, "").trim().toLowerCase();
    if (head && !allText.includes(head)) v.push(`word list: "${voc.term}" never appears on a board`);
  }
  return v;
}

/** Table rows in a rich-text body: lines that start with "|". */
const isTableLine = (l: string) => /^\s*\|/.test(l);

/**
 * The letters a formula uses: "a", "A_G", "h_s", "K_0", "π", "α". Units and words in \text{} do not count,
 * and neither do x, y and f, which the lessons introduce as "the unknown" and "the function".
 */
const GREEK: Record<string, string> = { alpha: "α", beta: "β", gamma: "γ", pi: "π", rho: "ρ", Omega: "Ω" };
export function symbolsIn(math: string): string[] {
  const out = new Set<string>();
  let m = math.replace(/\\(text|mathbb|mathrm|operatorname)\{[^}]*\}/g, " ");
  m = m.replace(/\\(alpha|beta|gamma|pi|rho|Omega)(?![a-zA-Z])/g, (_, g: string) => {
    out.add(GREEK[g]!);
    return " ";
  });
  m = m.replace(/\\[a-zA-Z]+/g, " ");
  for (const t of m.matchAll(/([A-Za-z])(?:_(\{[^}]*\}|[A-Za-z0-9]))?/g)) {
    if ("xyf".includes(t[1]!)) continue;
    out.add(t[1]! + (t[2] ? "_" + t[2].replace(/[{}\s]/g, "") : ""));
  }
  return [...out];
}
const mathIn = (text: string) => [...text.matchAll(/\$\$?([^$]+)\$\$?/g)].map((x) => x[1]!);
/** A math piece that is just one letter (with index, or as "p %"), as it stands in a legend. */
const ONE = /^[\s\\,%]*(\\[a-zA-Z]+|[A-Za-z])(_(\{[^}]*\}|[A-Za-z0-9]))?[\s\\,%]*$/;
/** Also a plain row of letters: "A, B, C". An index like x_{1,2} keeps its comma. */
const bare = (math: string) => (ONE.test(math) || math.split(/,(?![^{]*\})/).every((p) => ONE.test(p)) ? symbolsIn(math) : []);
const LETTERS = String.raw`((?:\$[^$]+\$(?:,\s*|\s+und\s+)?)+)`;

/**
 * Letters that a text explains. Counted are only the plain forms a learner can find again:
 * a legend row "| $a$, $b$ | die Seiten |", a list line "- $a$: die Seite", a named term "**Radius** $r$",
 * or a sentence "$a$ und $b$ sind die Katheten" / "$m$ = **Steigung**".
 */
export function symbolsExplained(body: string): Set<string> {
  const got = new Set<string>();
  const add = (math: string[]) => math.flatMap(bare).forEach((x) => got.add(x));
  for (const line of body.split("\n")) {
    const cells = line.split("|").map((c) => c.trim());
    if (isTableLine(line) && cells.length >= 4 && words(cells[2]!) >= 2 && cells[1]!.replace(/\$[^$]+\$/g, "").replace(/und|,|\s/g, "") === "") add(mathIn(cells[1]!));
    const item = line.match(new RegExp(String.raw`^\s*-\s+` + LETTERS + String.raw`\s*(?::|=|ist|sind|heißt)\s+\S+`));
    if (item) add(mathIn(item[1]!));
    for (const x of line.matchAll(new RegExp(String.raw`\*\*[^*$]+\*\*:?\s*(?:heißen|heißt)?\s*\(?` + LETTERS, "g"))) add(mathIn(x[1]!));
    for (const x of line.matchAll(/\*\*[^*$]+\$([^$]+)\$\*\*/g)) add([x[1]!]);
    for (const x of line.matchAll(new RegExp(LETTERS + String.raw`\s+(?:ist|sind|heißt|steht für|bedeutet|=\s*\*\*)`, "g"))) add(mathIn(x[1]!));
  }
  return got;
}

export function checkSheetStandard(l: Lesson, primerById: Map<string, Primer>): string[] {
  const v: string[] = [];
  if (!l.guided?.length) v.push("a Spickzettel needs `guided`: the lessons that teach the topic");
  for (const pid of l.guided ?? []) {
    const p = primerById.get(pid);
    if (!p) v.push(`guided: unknown lesson ${pid}`);
    else if (p.standard !== 2) v.push(`guided: ${pid} is not yet at the standard`);
  }
  if (l.sections.length > LIMITS.sheetSections) v.push(`${l.sections.length} sections (limit ${LIMITS.sheetSections})`);
  l.sections.forEach((s, i) => {
    const w = `section ${i + 1} "${s.title ?? s.kind}"`;
    const lines = s.body.split("\n");
    const prose = lines.filter((x) => !isTableLine(x)).join("\n");
    // Rows are counted per table (tables are separated by a blank line), so a long list must be chunked.
    const rows = Math.max(0, ...s.body.split(/\n{2,}/).map((blk) => blk.split("\n").filter(isTableLine).filter((x) => !/^\s*\|[\s|:-]+\|?\s*$/.test(x)).length));
    const n = words(prose);
    if (n > LIMITS.sheetSectionWords) v.push(`${w}: ${n} words outside tables (limit ${LIMITS.sheetSectionWords})`);
    if (rows > LIMITS.sheetTableRows + 1) v.push(`${w}: table with ${rows - 1} rows (limit ${LIMITS.sheetTableRows})`);
    for (const c of arrowChains(s.body)) v.push(`${w}: arrow chain "${c.trim().slice(0, 60)}"`);
    // Every letter in a formula is explained where the learner meets it: a formula section explains its own
    // letters, every other section may rely on the sections above it.
    const own = symbolsExplained(s.body);
    const known = s.kind === "formula" ? own : new Set([...own, ...l.sections.slice(0, i).flatMap((e) => [...symbolsExplained(e.body)])]);
    const shown = [s.body, ...(s.figures ?? []).map((g) => g.caption ?? "")].join("\n");
    const missing = [...new Set(mathIn(shown).flatMap(symbolsIn))].filter((x) => !known.has(x));
    if (missing.length > 0) v.push(`${w}: letters without an explanation: ${missing.join(", ")}`);
    if (s.kind === "remember") {
      // "Merke" is an overview, not a paragraph: a short list or a table, one rule per line.
      const filled = lines.filter((x) => x.trim());
      const items = filled.filter((x) => /^\s*-\s+/.test(x));
      if (filled.some((x) => !/^\s*-\s+/.test(x) && !isTableLine(x))) v.push(`${w}: "Merke" must be a list or a table, one rule per line, not running text`);
      if (items.length > 5) v.push(`${w}: "Merke" has ${items.length} points (at most 5)`);
      for (const it of items) if (words(it) > 22) v.push(`${w}: a "Merke" point has ${words(it)} words (at most 22): "${it.trim().slice(0, 50)}"`);
      const clipped = clippedSentences(prose.replace(/^\s*-\s+/gm, ""));
      if (clipped.length > 0) v.push(`${w}: "Merke" must be full sentences (${clipped.slice(0, 3).join(" / ")})`);
      if (/→|->|=>|⇒/.test(prose)) v.push(`${w}: arrow in "Merke"`);
    }
  });
  return v;
}
