/**
 * One-off migration: content_packs/berlin_msa_v1 (legacy) → content_packs/berlin_msa (v2).
 * Idempotent: rewrites the legacy_* files only. New hand-authored v2 files are untouched.
 *
 *   npx tsx scripts/migrate-legacy.ts
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Question, ShortPayload, Topic } from "../src/core/types";
import { parseExplanation } from "../src/core/variants";

const ROOT = resolve(import.meta.dirname, "../..");
const SRC = join(ROOT, "content_packs", "berlin_msa_v1");
const DST = join(ROOT, "content_packs", "berlin_msa");

interface LegacyTopic {
  id: string;
  subject: "MATH" | "DE" | "EN";
  code: string;
  name: string;
  parent_id: string | null;
}
interface LegacyQuestion {
  id: string;
  subject: "MATH" | "DE" | "EN";
  topic_id: string;
  difficulty: number;
  qtype: "MCQ" | "CLOZE" | "MATCH" | "SHORT";
  prompt: string;
  payload: Record<string, unknown>;
  solution: Record<string, unknown>;
  explanation: string;
  tags: string[];
  image?: string;
  image_region?: unknown;
}

const read = <T>(f: string): T => JSON.parse(readFileSync(join(SRC, f), "utf-8")) as T;
const unwrap = <T>(d: T | { topics?: T; questions?: T }): T => (Array.isArray(d) ? d : ((d as { topics?: T; questions?: T }).topics ?? (d as { questions?: T }).questions!) as T);

/** Legacy names were ASCII-fied ("Brueche"). Restore umlauts, protecting real "ue"/"ae" words. */
function umlauts(s: string): string {
  // Words that legitimately contain "ue"/"ae"/"oe" are shielded with private-use markers first.
  const keep = ["Zuordnungen", "aktuell", "Questions", "Values", "Queue"];
  let out = s;
  keep.forEach((w, i) => (out = out.replaceAll(w, `\u{E000}${i}\u{E001}`)));
  out = out
    .replace(/Ae/g, "Ä").replace(/Oe/g, "Ö").replace(/Ue/g, "Ü")
    .replace(/ae/g, "ä").replace(/oe/g, "ö").replace(/ue/g, "ü")
    .replace(/\bGross/g, "Groß").replace(/gross/g, "groß");
  keep.forEach((w, i) => (out = out.replaceAll(`\u{E000}${i}\u{E001}`, w)));
  return out;
}

const topics: Topic[] = unwrap<LegacyTopic[]>(read("topics.json")).map((t) => ({
  id: t.id,
  subject: t.subject,
  code: t.code,
  name: umlauts(t.name).replace("ss und ss (ss/ss) und sZ (ss/ß)", "ss und ß"),
  parentId: t.parent_id,
}));

const SOURCE_RE = /^\[(?:vgl\.\s*)?(MSA[^\]]*)\]\s*/;

/** Content fixes found during migration review (id → corrected MCQ). */
const PATCHES: Record<string, { choices: string[]; correct: string }> = {
  // 3 choices → 4 (per-mille confusion is a typical mistake)
  MATH_MSA_PCT_2020_001: {
    choices: [
      "8 von 10 Schülern haben einen Migrationshintergrund",
      "Jeder 8. Schüler hat einen Migrationshintergrund",
      "8 von 100 Schülern haben einen Migrationshintergrund",
      "8 von 1000 Schülern haben einen Migrationshintergrund",
    ],
    correct: "8 von 100 Schülern haben einen Migrationshintergrund",
  },
  // WRONG legacy answer: f(-4) = -7·(-4)+3 = 31 lies ON the line; f(3) = -18 ≠ -24 does not.
  MATH_FUNC_LINEAR_FORM_MSA2023_001: {
    choices: ["(-4|31)", "(-1|10)", "(3|-24)", "(2|-11)"],
    correct: "(3|-24)",
  },
};

function migrateQuestion(q: LegacyQuestion): Question {
  let prompt = q.prompt.trim();
  let source: string | undefined;
  const m = prompt.match(SOURCE_RE);
  if (m) {
    source = m[1]!.trim();
    prompt = prompt.replace(SOURCE_RE, "").trim();
  }
  let payload = { ...q.payload } as Record<string, unknown>;
  let solution = { ...q.solution } as Record<string, unknown>;

  if (q.qtype === "SHORT") {
    const p = payload as unknown as ShortPayload & { normalization?: string[] };
    const value = solution.value;
    if (p.answer_type === "number" && typeof value === "string") {
      solution.value = Number(value.replace(",", "."));
    }
    if (p.answer_type === "text" && typeof value === "string") {
      if (/^-?\d+\/\d+$/.test(value.trim())) {
        payload = { answer_type: "fraction", require_reduced: true };
      } else if (/^-?\d+(,\d+)?$/.test(value.trim())) {
        payload = { answer_type: "number", tolerance: 0 };
        solution.value = Number(value.replace(",", "."));
      } else if (/[a-z]/i.test(value) && /[\d+\-*^]/.test(value)) {
        payload = { answer_type: "term" };
      }
    }
    if ("tolerance" in payload && payload.tolerance === 0) delete payload.tolerance;
    delete (payload as { normalization?: unknown }).normalization;
  }
  if (q.qtype === "MATCH") {
    delete (payload as { pairs?: unknown }).pairs; // solution holds the pairs
  }
  if (q.qtype === "CLOZE") {
    // legacy used either text_with_blanks or text, blank ids or positions, answers as map or list
    const p = payload as { text?: string; text_with_blanks?: string; blanks?: { id?: number | string; position?: number; choices?: string[] }[] };
    if (!p.text_with_blanks && p.text) {
      p.text_with_blanks = p.text;
      delete p.text;
    }
    if (p.text_with_blanks && !/___+/.test(p.text_with_blanks)) p.text_with_blanks = p.text_with_blanks.replace(/\[\s*\]|_+|\.{3,}/, "___");
    p.blanks = (p.blanks ?? []).map((b, i) => ({ id: b.id ?? b.position ?? i + 1, choices: b.choices }));
    if (Array.isArray(solution.answers)) {
      solution.answers = Object.fromEntries((solution.answers as string[]).map((a, i) => [String(p.blanks![i]!.id), a]));
    }
  }
  if (q.qtype === "MCQ" && PATCHES[q.id]) {
    const patch = PATCHES[q.id]!;
    payload = { ...payload, choices: patch.choices };
    solution = { correct_choice: patch.correct };
  }

  const out: Question = {
    id: q.id,
    subject: q.subject,
    topicId: q.topic_id,
    difficulty: q.difficulty,
    qtype: q.qtype,
    prompt,
    payload: payload as unknown as Question["payload"],
    solution: solution as unknown as Question["solution"],
    explanation: parseExplanation(q.explanation),
    tags: q.tags,
  };
  if (source) out.source = source;
  return out;
}

mkdirSync(join(DST, "questions"), { recursive: true });
mkdirSync(join(DST, "lessons"), { recursive: true });
writeFileSync(join(DST, "topics.json"), JSON.stringify(topics, null, 2) + "\n");
const files: [string, string][] = [
  ["questions_math.json", "legacy_math.json"],
  ["questions_german.json", "legacy_german.json"],
  ["questions_english.json", "legacy_english.json"],
];
let total = 0;
for (const [src, dst] of files) {
  const qs = unwrap<LegacyQuestion[]>(read(src)).map(migrateQuestion);
  writeFileSync(join(DST, "questions", dst), JSON.stringify(qs, null, 2) + "\n");
  total += qs.length;
  console.log(`${src} → questions/${dst}: ${qs.length} questions`);
}
writeFileSync(
  join(DST, "manifest.json"),
  JSON.stringify({ packId: "berlin_msa", version: "2.0.0", title: "Berlin MSA Klasse 9/10", subjects: ["MATH", "DE", "EN"] }, null, 2) + "\n",
);
console.log(`migrated ${topics.length} topics, ${total} questions → ${DST.replace(ROOT, "")}`);
console.log("topic names:\n  " + topics.map((t) => t.name).join("\n  "));
