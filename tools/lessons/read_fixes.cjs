// Corrections from the board-by-board read of 2026-11-17/18 (wrong statements, answer keys, tasks that only
// repeat the board, hints, missing explanations). They live as data in tools/lessons/read_fixes/*.json and are
// applied on top of a lesson, so they survive when a lesson source is run again:
//   - lib.cjs and migrate.cjs call apply(lesson) right before they write a lesson;
//   - `node tools/lessons/read_fixes.cjs` applies everything to the lesson files as they are;
//   - `node tools/lessons/read_fixes.cjs <name>` applies only read_fixes/<name>.json.
// Applying twice changes nothing: every operation sets a whole value.
//
// A fix file is a list of { lesson, why, ops }. Operations (board = the board's title; if an op renames the
// board, both the old and the new title are found):
//   { op: "title",    board, title }
//   { op: "body",     board, lines: [...] }          chalk text, one entry per line
//   { op: "say",      board, text }                  what Ferdinand says
//   { op: "tasks",    board, tasks: [{ text, correct, wrong: [...], why, hint }] }   the board's whole task list
//   { op: "figure",   board, figure }                a drawing spec, or null to remove it
//   { op: "figures",  board, figures: [{ caption, figure }] }   several drawings side by side
//   { op: "quiz",     index, prompt?, correct?, wrong?, explain? }   index counts from 0
//   { op: "requires", add: [...] }
//   { op: "vocab",    term, plain?, example? }       changes an entry of the word list
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "read_fixes");
const PACK = path.join(__dirname, "..", "..", "content_packs", "berlin_msa", "primers");

function load(only) {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json") && (!only || f === only + ".json"))
    .sort()
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")).map((x) => ({ ...x, file: f })));
}

function applyOne(p, fix) {
  // titles this fix gives to boards, so a board can be found before and after the rename
  const renamed = new Map(fix.ops.filter((o) => o.op === "title").map((o) => [o.board, o.title]));
  const board = (title) => {
    const s = p.steps.find((x) => x.title === title) ?? p.steps.find((x) => x.title === renamed.get(title)) ?? p.steps.find((x) => renamed.get(x.title) === title);
    if (!s) throw new Error(`${p.id} (${fix.file}): board not found: "${title}"`);
    return s;
  };
  for (const o of fix.ops) {
    if (o.op === "title") board(o.board).title = o.title;
    else if (o.op === "body") board(o.board).body = o.lines.join("\n\n");
    else if (o.op === "say") board(o.board).say = o.text;
    else if (o.op === "tasks") {
      const s = board(o.board);
      if (o.tasks.length === 0) delete s.tasks;
      else s.tasks = o.tasks.map((t) => ({ text: t.text, choices: [t.correct, ...t.wrong], correct: t.correct, why: t.why, hint: t.hint }));
    } else if (o.op === "figure") {
      const s = board(o.board);
      if (o.figure) s.figure = o.figure;
      else delete s.figure;
    } else if (o.op === "figures") {
      const b = board(o.board);
      if (o.figures?.length) b.figures = o.figures;
      else delete b.figures;
    } else if (o.op === "quiz") {
      const q = p.quiz[o.index];
      if (!q) throw new Error(`${p.id} (${fix.file}): no quiz question ${o.index}`);
      if (o.prompt !== undefined) q.prompt = o.prompt;
      const correct = o.correct ?? q.correct;
      const wrong = o.wrong ?? q.choices.filter((c) => c !== q.correct);
      q.correct = correct;
      q.choices = [correct, ...wrong];
      if (o.explain !== undefined) q.explain = o.explain;
    } else if (o.op === "requires") {
      p.requires = [...new Set([...(p.requires ?? []), ...o.add])];
    } else if (o.op === "vocab") {
      const v = p.vocab.find((x) => x.term === o.term);
      if (!v) throw new Error(`${p.id} (${fix.file}): word not found: ${o.term}`);
      if (o.plain !== undefined) v.plain = o.plain;
      if (o.example !== undefined) v.example = o.example;
    } else throw new Error(`${p.id} (${fix.file}): unknown op ${o.op}`);
  }
}

/** Apply all corrections for this lesson. Called by lib.cjs and migrate.cjs before a lesson is written. */
function apply(p, only) {
  let n = 0;
  for (const fix of load(only)) {
    if (fix.lesson !== p.id) continue;
    applyOne(p, fix);
    n += fix.ops.length;
  }
  return n;
}

if (require.main === module) {
  const only = process.argv[2];
  const wanted = new Set(load(only).map((x) => x.lesson));
  let ops = 0;
  let lessons = 0;
  for (const f of fs.readdirSync(PACK).filter((x) => x.endsWith(".json"))) {
    const file = path.join(PACK, f);
    const all = JSON.parse(fs.readFileSync(file, "utf8"));
    let n = 0;
    for (const p of all) {
      if (!wanted.has(p.id)) continue;
      n += apply(p, only);
      wanted.delete(p.id);
      lessons++;
    }
    if (n) fs.writeFileSync(file, JSON.stringify(all, null, 2) + "\n");
    ops += n;
  }
  if (wanted.size) throw new Error("lessons not found: " + [...wanted].join(", "));
  console.log(`${ops} corrections applied to ${lessons} lessons`);
}

module.exports = { apply };
