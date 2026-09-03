/**
 * Content pipeline: load content_packs/berlin_msa (v2), validate schema + semantics,
 * exercise every template, check KaTeX, then emit web/public/content/*.json.
 *
 *   npx tsx scripts/build-content.ts            # build (fails on errors)
 *   npx tsx scripts/build-content.ts --check    # validate only
 */

import Ajv from "ajv";
import katex from "katex";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { evaluate } from "../src/core/evaluators";
import { parseFraction, reduceFraction } from "../src/core/normalizers";
import type { ClozePayload, ContentPack, ContentSection, Lesson, MatchPayload, McqPayload, Primer, Question, ShortPayload, Topic } from "../src/core/types";
import { hasPlaceholder, parseExplanation, renderFigureSpec, renderPreview } from "../src/core/variants";

const ROOT = resolve(import.meta.dirname, "../..");
const PACK_DIR = join(ROOT, "content_packs", "berlin_msa");
const SCHEMA_PATH = join(ROOT, "content_packs", "schema.v2.json");
const OUT_DIR = join(ROOT, "web", "public", "content");
const CHECK_ONLY = process.argv.includes("--check");
const PREVIEWS = 60;
const MIN_QUESTIONS_PER_TOPIC = 6;

interface Issue {
  level: "error" | "warn";
  where: string;
  message: string;
}
const issues: Issue[] = [];
const error = (where: string, message: string) => issues.push({ level: "error", where, message });
const warn = (where: string, message: string) => issues.push({ level: "warn", where, message });

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf-8")) as T;
}

function listJson(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => join(dir, f));
}

// --- load ---------------------------------------------------------------------

const manifest = readJson<{ packId: string; version: string; title: string }>(join(PACK_DIR, "manifest.json"));
const topics = readJson<Topic[]>(join(PACK_DIR, "topics.json"));
const questions: Question[] = [];
const questionFile = new Map<string, string>();
for (const file of listJson(join(PACK_DIR, "questions"))) {
  for (const q of readJson<Question[]>(file)) {
    questions.push(q);
    questionFile.set(q.id, file.replace(ROOT, "").replace(/\\/g, "/"));
  }
}
const lessons: Lesson[] = [];
for (const file of listJson(join(PACK_DIR, "lessons"))) lessons.push(...readJson<Lesson[]>(file));
const primers: Primer[] = [];
for (const file of listJson(join(PACK_DIR, "primers"))) primers.push(...readJson<Primer[]>(file));

// --- schema -------------------------------------------------------------------

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const schema = readJson<Record<string, unknown>>(SCHEMA_PATH);
const validate = ajv.compile(schema);
if (!validate({ topics, questions, lessons, primers })) {
  for (const e of validate.errors ?? []) {
    const m = e.instancePath.match(/^\/(topics|questions|lessons|primers)\/(\d+)/);
    let where = e.instancePath;
    if (m) {
      const list = m[1] === "topics" ? topics : m[1] === "questions" ? questions : m[1] === "lessons" ? lessons : primers;
      where = `${m[1]}[${m[2]}] ${(list[Number(m[2])] as { id?: string })?.id ?? ""}${e.instancePath.slice(m[0].length)}`;
    }
    error(where, `${e.message ?? "schema violation"} ${e.params ? JSON.stringify(e.params) : ""}`);
  }
}

// --- semantic checks ----------------------------------------------------------

const topicById = new Map(topics.map((t) => [t.id, t]));
const dup = <T extends { id: string }>(items: T[], what: string) => {
  const seen = new Set<string>();
  for (const it of items) {
    if (seen.has(it.id)) error(`${what} ${it.id}`, "duplicate id");
    seen.add(it.id);
  }
};
dup(topics, "topic");
dup(questions, "question");
dup(lessons, "lesson");
dup(primers, "primer");
for (const t of topics) if (t.parentId && !topicById.has(t.parentId)) error(`topic ${t.id}`, `unknown parentId ${t.parentId}`);

const MATH_INLINE = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
function checkTex(where: string, text: string) {
  for (const m of text.matchAll(MATH_INLINE)) {
    const tex = (m[1] ?? m[2] ?? "").replace(/(\d),(\d)/g, "$1{,}$2");
    // KaTeX reports missing glyphs (€, ‰ …) via console.warn — surface them per item instead.
    const warnings: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
    try {
      katex.renderToString(tex, { throwOnError: true, strict: "ignore" });
    } catch (e) {
      error(where, `invalid KaTeX "${tex}": ${(e as Error).message.split("\n")[0]}`);
    } finally {
      console.warn = origWarn;
    }
    for (const w of warnings) warn(where, `KaTeX: ${w} in "${tex}" — move the symbol outside $…$`);
  }
}

function checkSections(where: string, sections: ContentSection[]) {
  if (sections.length === 0) error(where, "empty explanation");
  for (const s of sections) {
    if (!s.body.trim() && !s.title) error(where, `empty ${s.kind} section`);
    checkTex(where, s.body);
  }
}

const counts = new Map<string, number>();

for (const q of questions) {
  const where = `question ${q.id} (${questionFile.get(q.id)})`;
  const topic = topicById.get(q.topicId);
  if (!topic) error(where, `unknown topicId ${q.topicId}`);
  else if (topic.subject !== q.subject) error(where, `subject ${q.subject} ≠ topic subject ${topic.subject}`);
  counts.set(q.topicId, (counts.get(q.topicId) ?? 0) + 1);
  if (q.tags.length === 0) warn(where, "no tags");
  checkTex(where, q.prompt);
  checkSections(where, parseExplanation(q.explanation));

  const templated = q.variants?.enabled === true;
  const strings: string[] = [q.prompt, JSON.stringify(q.payload), JSON.stringify(q.solution), JSON.stringify(q.explanation)];
  if (!templated && strings.some(hasPlaceholder)) error(where, "contains {{placeholders}} but variants are not enabled");
  if (templated && !strings.some(hasPlaceholder)) warn(where, "variants enabled but nothing is templated");

  // Static shape checks
  if (q.qtype === "MCQ") {
    const p = q.payload as McqPayload;
    if (!Array.isArray(p.choices) || p.choices.length < 3 || p.choices.length > 5) error(where, `MCQ needs 3–5 choices, has ${p.choices?.length}`);
    else if (p.choices.length !== 4) warn(where, `MCQ has ${p.choices.length} choices (4 preferred)`);
    if (!("correct_choice" in q.solution)) error(where, "MCQ solution needs correct_choice");
  } else if (q.qtype === "SHORT") {
    const p = q.payload as ShortPayload;
    if (!["number", "text", "fraction", "term"].includes(p.answer_type)) error(where, `SHORT answer_type invalid: ${p.answer_type}`);
    const sol = q.solution as { value?: unknown; kind?: string; expr?: string };
    if (sol.kind === "computed") {
      if (!templated) error(where, "computed solution without variants");
      if (p.answer_type !== "number") error(where, "computed solutions must be answer_type number");
    } else if (!("value" in sol)) error(where, "SHORT solution needs value");
    else if (p.answer_type === "number" && !templated && typeof sol.value !== "number") error(where, `number answer must be numeric, got ${JSON.stringify(sol.value)}`);
    else if (p.answer_type === "fraction" && !templated && !parseFraction(String(sol.value))) error(where, `fraction answer unparsable: ${sol.value}`);
  } else if (q.qtype === "CLOZE") {
    const p = q.payload as ClozePayload;
    const sol = q.solution as { answers?: Record<string, string> };
    if (!sol.answers) error(where, "CLOZE solution needs answers");
    const blanksInText = (p.text_with_blanks.match(/___+/g) ?? []).length;
    if (blanksInText !== p.blanks.length) error(where, `text has ${blanksInText} blanks but ${p.blanks.length} defined`);
    for (const b of p.blanks) {
      const a = sol.answers?.[String(b.id)];
      if (a === undefined) error(where, `no answer for blank ${b.id}`);
      else if (b.choices && !templated && !b.choices.includes(a)) error(where, `answer "${a}" not among choices of blank ${b.id}`);
      if (b.choices && new Set(b.choices).size !== b.choices.length) error(where, `duplicate choices in blank ${b.id}`);
    }
  } else if (q.qtype === "MATCH") {
    const p = q.payload as MatchPayload;
    const sol = q.solution as { pairs?: [string, string][] };
    if (!sol.pairs) error(where, "MATCH solution needs pairs");
    else {
      if (p.left.length !== p.right.length) error(where, "MATCH left/right length differ");
      if (sol.pairs.length !== p.left.length) error(where, "MATCH pairs must cover every left item");
      for (const [l, r] of sol.pairs) {
        if (!p.left.includes(l)) error(where, `pair left "${l}" not in left list`);
        if (!p.right.includes(r)) error(where, `pair right "${r}" not in right list`);
      }
      if (new Set(sol.pairs.map((x) => x[0])).size !== sol.pairs.length) error(where, "MATCH left item used twice");
      if (new Set(sol.pairs.map((x) => x[1])).size !== sol.pairs.length) error(where, "MATCH right item used twice");
    }
  }

  // Dynamic checks: render previews and make sure the evaluator accepts the solution.
  const n = templated ? PREVIEWS : 1;
  const prompts = new Set<string>();
  for (let i = 0; i < n; i++) {
    let r;
    try {
      r = renderPreview(q, i);
    } catch (e) {
      error(where, `render #${i} failed: ${(e as Error).message}`);
      break;
    }
    prompts.add(r.prompt);
    const all = [r.prompt, JSON.stringify(r.payload), JSON.stringify(r.solution), ...r.explanation.map((s) => s.body)];
    if (all.some(hasPlaceholder)) error(where, `render #${i} left a {{placeholder}} (${JSON.stringify(r.vars)})`);
    if (r.qtype === "MCQ") {
      const p = r.payload as McqPayload;
      const correct = (r.solution as { correct_choice: string }).correct_choice;
      if (!p.choices.includes(correct)) error(where, `render #${i}: correct "${correct}" not among choices ${JSON.stringify(p.choices)}`);
      if (new Set(p.choices).size !== p.choices.length) error(where, `render #${i}: duplicate choices ${JSON.stringify(p.choices)} vars=${JSON.stringify(r.vars)}`);
    }
    if (r.qtype === "SHORT") {
      const v = (r.solution as { value: unknown }).value;
      if (typeof v === "number" && !Number.isFinite(v)) error(where, `render #${i}: non-finite solution`);
      // The rendered correct answer must be accepted by the evaluator (fractions in reduced form).
      const shortPayload = r.payload as ShortPayload;
      let answerText = typeof v === "number" ? String(v).replace(".", ",") : String(v);
      if (shortPayload.answer_type === "fraction" && !shortPayload.exact) {
        const f = parseFraction(String(v));
        if (f) {
          const red = reduceFraction(f);
          answerText = red.den === 1 ? String(red.num) : `${red.num}/${red.den}`;
        }
      }
      const ev = evaluate(r, answerText);
      if (!ev.isCorrect) error(where, `render #${i}: evaluator rejects its own solution "${answerText}" (${ev.hint ?? ""}) vars=${JSON.stringify(r.vars)}`);
    }
    if (r.qtype === "CLOZE") {
      const sol = (r.solution as { answers: Record<string, string> }).answers;
      if (!evaluate(r, sol).isCorrect) error(where, `render #${i}: evaluator rejects its own answers`);
    }
    if (r.qtype === "MATCH") {
      const sol = (r.solution as { pairs: [string, string][] }).pairs;
      if (!evaluate(r, sol).isCorrect) error(where, `render #${i}: evaluator rejects its own pairs`);
    }
    if (i === 0) for (const s of r.explanation) checkTex(where, s.body);
  }
  if (templated && prompts.size < 5) warn(where, `template only produced ${prompts.size} distinct prompts in ${n} renders`);
}

const primerById = new Map(primers.map((p) => [p.id, p]));
const primerUsed = new Set<string>();
const lessonTopics = new Set(lessons.map((l) => l.topicId));
for (const l of lessons) {
  const where = `lesson ${l.id}`;
  const topic = topicById.get(l.topicId);
  if (!topic) error(where, `unknown topicId ${l.topicId}`);
  else if (topic.subject !== l.subject) error(where, `subject mismatch`);
  for (const tid of l.alsoFor ?? []) if (!topicById.has(tid)) error(where, `unknown alsoFor topic ${tid}`);
  for (const tid of l.alsoFor ?? []) lessonTopics.add(tid);
  if (l.intro) checkTex(where, l.intro);
  checkSections(where, l.sections);
  l.sections.forEach((s, i) => {
    const specs = [...(s.figure ? [s.figure] : []), ...(s.figures ?? []).map((g) => g.figure)];
    for (const spec of specs) {
      try {
        renderFigureSpec(spec, {});
      } catch (e) {
        error(`${where} section ${i + 1}`, `figure failed: ${(e as Error).message}`);
      }
    }
    for (const g of s.figures ?? []) if (g.caption) checkTex(`${where} section ${i + 1}`, g.caption);
  });
  for (const pid of [l.primer, ...l.sections.map((s) => s.primer)]) {
    if (!pid) continue;
    if (!primerById.has(pid)) error(where, `unknown primer ${pid}`);
    primerUsed.add(pid);
  }
}

// Eulen-Lektionen ("Frag Ferdinand"): plain-language primers with a mini quiz.
for (const p of primers) {
  const where = `primer ${p.id}`;
  for (const t of [p.title, p.teaser, p.hook, p.outro ?? ""]) checkTex(where, t);
  p.steps.forEach((s, i) => {
    checkTex(`${where} step ${i + 1}`, s.title);
    checkTex(`${where} step ${i + 1}`, s.body);
    if (s.figure) {
      try {
        renderFigureSpec(s.figure, {});
      } catch (e) {
        error(`${where} step ${i + 1}`, `figure failed: ${(e as Error).message}`);
      }
    }
  });
  for (const v of p.vocab) for (const t of [v.term, v.plain, v.example ?? ""]) checkTex(where, t);
  p.quiz.forEach((q, i) => {
    const w = `${where} quiz ${i + 1}`;
    for (const t of [q.prompt, q.explain, ...q.choices]) checkTex(w, t);
    if (!q.choices.includes(q.correct)) error(w, `correct "${q.correct}" not among choices`);
    if (new Set(q.choices).size !== q.choices.length) error(w, "duplicate choices");
  });
  if (!primerUsed.has(p.id)) warn(where, "not referenced by any lesson or section");
}

// Coverage warnings
const parents = new Set(topics.map((t) => t.parentId).filter(Boolean));
for (const t of topics) {
  if (parents.has(t.id)) continue;
  const n = counts.get(t.id) ?? 0;
  if (n === 0) warn(`topic ${t.id}`, "leaf topic has no questions");
  else if (n < MIN_QUESTIONS_PER_TOPIC) warn(`topic ${t.id}`, `only ${n} questions (< ${MIN_QUESTIONS_PER_TOPIC})`);
  if (t.subject === "MATH" && n > 0 && !lessonTopics.has(t.id) && !lessonTopics.has(t.parentId ?? "")) warn(`topic ${t.id}`, "no lesson for this math topic");
}

// --- report -------------------------------------------------------------------

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");
for (const i of warnings) console.log(`  warn  ${i.where}: ${i.message}`);
for (const i of errors) console.log(`  ERROR ${i.where}: ${i.message}`);
const bySubject = (s: string) => questions.filter((q) => q.subject === s).length;
console.log(
  `\ncontent: ${topics.length} topics, ${questions.length} questions (MATH ${bySubject("MATH")}, DE ${bySubject("DE")}, EN ${bySubject("EN")}), ` +
    `${questions.filter((q) => q.variants?.enabled).length} templated, ${lessons.length} lessons, ${primers.length} Eulen-Lektionen — ${errors.length} errors, ${warnings.length} warnings`,
);
if (errors.length > 0) {
  console.log("content: FAILED");
  process.exit(1);
}
if (CHECK_ONLY) process.exit(0);

// --- emit ---------------------------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true });
const normalized: ContentPack = {
  packId: manifest.packId,
  version: manifest.version,
  title: manifest.title,
  topics,
  questions: questions.map((q) => ({ ...q, explanation: parseExplanation(q.explanation) })),
  lessons,
  primers,
};
const subjects = ["MATH", "DE", "EN"] as const;
const out: Record<string, unknown> = {
  packId: normalized.packId,
  version: normalized.version,
  title: normalized.title,
  builtAt: new Date().toISOString(),
  subjects: {} as Record<string, { questions: number; lessons: number; primers: number; file: string }>,
};
for (const s of subjects) {
  const qs = normalized.questions.filter((q) => q.subject === s);
  const ls = normalized.lessons.filter((l) => l.subject === s);
  const ps = primers.filter((p) => p.subject === s);
  const file = `${s}.json`;
  writeFileSync(join(OUT_DIR, file), JSON.stringify({ questions: qs, lessons: ls, primers: ps }));
  (out.subjects as Record<string, unknown>)[s] = { questions: qs.length, lessons: ls.length, primers: ps.length, file };
}
writeFileSync(join(OUT_DIR, "topics.json"), JSON.stringify(topics));
writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(out, null, 2));
console.log(`content: written to ${OUT_DIR.replace(ROOT, "")}`);
