// Corrections to the practice questions from the correctness read of 2026-11-18 (answer keys, second correct
// choices, ambiguous prompts, wrong statements in explanations, explanations in English or in capitals, typos).
// They live as data in tools/lessons/question_fixes/*.json and are applied to the question files:
//   node tools/lessons/question_fixes.cjs            applies every fix file
//   node tools/lessons/question_fixes.cjs <name>     applies only question_fixes/<name>.json
// Applying twice changes nothing. Run it again after any script that rewrites explanations
// (de_explanations.cjs, en_explanations.cjs, math_exam_explanations.cjs, de_exam_explanations.cjs).
//
// A fix file is a list of { id, why, ops }. Operations:
//   { op: "prompt", text }                               the whole new prompt
//   { op: "choices", choices: [...], correct }           MCQ: all choices and the right one (must be among them)
//   { op: "payload", set: { ... } }                      merges keys into the answer field (shuffle, unit, tolerance,
//                                                        text_with_blanks, blanks, left, right ...)
//   { op: "key", set: { ... } }                          merges keys into the solution (value, answers, pairs ...)
//   { op: "explanation", sections: [{ kind, title?, body }] }   the whole new explanation
//   { op: "section", index, kind?, title?, body? }       changes one explanation section (index counts from 0);
//                                                        title: null removes the title
//   { op: "removeSection", match }                       removes the section whose body starts with `match`
//   { op: "replace", in: "prompt" | "payload" | "solution" | "explanation" | "variants" | "all", from, to }
//                                                        exact text replacement inside every string of that part
//   { op: "set", path: ["payload", "blanks", 0, "choices"], value }   sets any value by path (for templates)
// Section kinds: what, terms, formula, steps, example, mistake, remember, answer, text.
// Templates: {{x}} and {{= expr | filter}} must stay intact; filters are listed in web/src/core/variants.ts.
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "question_fixes");
const PACK = path.join(__dirname, "..", "..", "content_packs", "berlin_msa", "questions");

function load(only) {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json") && (!only || f === only + ".json"))
    .sort()
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")).map((x) => ({ ...x, file: f })));
}

/** Replace `from` by `to` in every string below `node`. Returns [new node, hits, already]. */
function replaceDeep(node, from, to) {
  let hits = 0;
  let already = 0;
  const walk = (x) => {
    if (typeof x === "string") {
      if (x.includes(to) && (!to.includes(from) || !x.replace(to, "").includes(from))) already++;
      else if (x.includes(from)) {
        hits++;
        return x.split(from).join(to);
      }
      return x;
    }
    if (Array.isArray(x)) return x.map(walk);
    if (x && typeof x === "object") return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, walk(v)]));
    return x;
  };
  return [walk(node), hits, already];
}

function applyOne(q, fix) {
  const fail = (msg) => {
    throw new Error(`${q.id} (${fix.file}): ${msg}`);
  };
  if (typeof q.explanation === "string" && fix.ops.some((o) => ["section", "removeSection"].includes(o.op))) fail("explanation is plain text; use op explanation");
  for (const o of fix.ops) {
    if (o.op === "prompt") q.prompt = o.text;
    else if (o.op === "choices") {
      if (!o.choices.includes(o.correct)) fail("correct choice is not among the choices");
      if (new Set(o.choices).size !== o.choices.length) fail("duplicate choices");
      q.payload = { ...q.payload, choices: o.choices };
      q.solution = { ...q.solution, correct_choice: o.correct };
    } else if (o.op === "payload") q.payload = { ...q.payload, ...o.set };
    else if (o.op === "key") q.solution = { ...q.solution, ...o.set };
    else if (o.op === "explanation") q.explanation = o.sections.map((s) => ({ kind: s.kind, ...(s.title ? { title: s.title } : {}), body: s.body }));
    else if (o.op === "section") {
      const s = q.explanation[o.index];
      if (!s) fail(`no explanation section ${o.index}`);
      if (o.kind !== undefined) s.kind = o.kind;
      if (o.title === null) delete s.title;
      else if (o.title !== undefined) s.title = o.title;
      if (o.body !== undefined) s.body = o.body;
    } else if (o.op === "removeSection") {
      // The section is named by the start of its body, so a second run finds nothing left to remove.
      if (!o.match) fail("removeSection needs match");
      const i = q.explanation.findIndex((s) => s.body.startsWith(o.match));
      if (i >= 0) q.explanation.splice(i, 1);
    } else if (o.op === "replace") {
      const parts = o.in === "all" ? ["prompt", "payload", "solution", "explanation", "variants", "figure"] : [o.in];
      let hits = 0;
      let already = 0;
      for (const part of parts) {
        if (q[part] === undefined) continue;
        const [next, h, a] = replaceDeep(q[part], o.from, o.to);
        q[part] = next;
        hits += h;
        already += a;
      }
      if (hits + already === 0) fail(`text not found in ${o.in}: ${o.from.slice(0, 60)}`);
    } else if (o.op === "set") {
      let node = q;
      for (const key of o.path.slice(0, -1)) {
        node = node[key];
        if (node === undefined) fail(`path not found: ${o.path.join(".")}`);
      }
      node[o.path[o.path.length - 1]] = o.value;
    } else fail(`unknown op ${o.op}`);
  }
}

if (require.main === module) {
  const only = process.argv[2];
  const fixes = load(only);
  const byId = new Map();
  for (const f of fixes) byId.set(f.id, [...(byId.get(f.id) ?? []), f]);
  let ops = 0;
  const seen = new Set();
  for (const f of fs.readdirSync(PACK).filter((x) => x.endsWith(".json"))) {
    const file = path.join(PACK, f);
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const qs = Array.isArray(data) ? data : data.questions;
    let n = 0;
    for (const q of qs) {
      for (const fix of byId.get(q.id) ?? []) {
        applyOne(q, fix);
        n += fix.ops.length;
        seen.add(q.id);
      }
    }
    if (n) fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    ops += n;
  }
  const missing = [...byId.keys()].filter((id) => !seen.has(id));
  if (missing.length) throw new Error("questions not found: " + missing.join(", "));
  console.log(`${ops} corrections applied to ${seen.size} questions`);
}
