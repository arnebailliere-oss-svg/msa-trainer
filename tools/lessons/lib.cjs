/**
 * Authoring helper for guided lessons (Eulen-Lektionen) and Spickzettel.
 * A lesson is written as a small script in this folder and emitted as JSON into the content pack:
 *
 *   node tools/lessons/<file>.cjs        (then: cd web && npm run content -- --check)
 *
 * The JSON in content_packs/ stays the source the app reads; these scripts only make long
 * lessons easier to write and review (one board per call, no JSON escaping).
 */
const fs = require("fs");
const path = require("path");
const PACK = path.resolve(__dirname, "../../content_packs/berlin_msa");
const NL = "\n";

/** Paragraphs of a board or card. */
const P = (...paras) => paras.join(NL + NL);
/** Lines inside one paragraph. */
const L = (...lines) => lines.join(NL);
/** A table: rows are arrays of cells; pass `head` as first row to get a header line. */
const T = (...rows) => rows.map((r) => "| " + r.join(" | ") + " |").join(NL);
const TH = (head, ...rows) => T(head, head.map(() => "---"), ...rows);

/** One tap task: sentence with one ___ gap, the right answer, the wrong ones, why, and a hint for a wrong tap. */
const k = (text, correct, wrong, why, hint) => ({ text, choices: [correct, ...wrong], correct, why, hint });
/** A board. `extra` may carry { tasks: [...], figure: {...} }. */
const b = (title, body, say, extra = {}) => ({ title, body: Array.isArray(body) ? P(...body) : body, ...(extra.figure ? { figure: extra.figure } : {}), ...(extra.tasks ? { tasks: extra.tasks } : {}), say });
/** A chapter: title and its boards. */
const ch = (title, ...boards) => boards.map((x, i) => (i === 0 ? { chapter: title, ...x } : x));
const v = (term, plain, example) => ({ term, plain, ...(example ? { example } : {}) });
const q = (prompt, correct, wrong, explain) => ({ prompt, choices: [correct, ...wrong], correct, explain });

function writeArray(file, item) {
  const full = path.join(PACK, file);
  let all = [];
  if (fs.existsSync(full)) all = JSON.parse(fs.readFileSync(full, "utf8"));
  const i = all.findIndex((x) => x.id === item.id);
  if (i >= 0) all[i] = item;
  else all.push(item);
  fs.writeFileSync(full, JSON.stringify(all, null, 2) + NL);
}

/** Emit a guided lesson. `chapters` is a list of ch(...) results. */
function primer(file, meta, chapters, vocab, quiz) {
  const steps = chapters.flat();
  const item = { id: meta.id, subject: meta.subject, title: meta.title, teaser: meta.teaser, hook: meta.hook, outro: meta.outro, standard: 2, ...(meta.requires ? { requires: meta.requires } : {}), steps, vocab, quiz, ...(meta.source ? { source: meta.source } : {}) };
  require("./read_fixes.cjs").apply(item); // corrections from the board-by-board read stay on top
  writeArray(file, item);
  console.log(`${meta.id}: ${steps.length} boards, ${chapters.length} chapters, ${steps.filter((s) => s.tasks).length} with tasks, ${quiz.length} quiz`);
}

/** Emit a Spickzettel (lesson page with sheet: true). */
function sheet(file, meta, sections) {
  writeArray(file, { id: meta.id, subject: meta.subject, topicId: meta.topicId, ...(meta.alsoFor ? { alsoFor: meta.alsoFor } : {}), title: meta.title, sheet: true, guided: meta.guided, intro: meta.intro, ...(meta.source ? { source: meta.source } : {}), sections });
  console.log(`${meta.id}: Spickzettel with ${sections.length} cards`);
}
const card = (kind, title, body, extra = {}) => ({ kind, title, ...extra, body: Array.isArray(body) ? P(...body) : body });

module.exports = { P, L, T, TH, k, b, ch, v, q, primer, sheet, card };
