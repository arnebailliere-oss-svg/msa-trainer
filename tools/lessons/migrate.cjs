/**
 * Helper for bringing an existing Eulen-Lektion to the comprehensibility standard WITHOUT rebuilding it:
 * the boards, examples and figures stay; chapters, tap tasks, hints, fuller Ferdinand lines and
 * missing steps are added on top. Figures are never touched here.
 *
 *   node tools/lessons/<file>.cjs   (then: cd web && npm run content -- --check)
 */
const fs = require("fs");
const path = require("path");
const PACK = path.resolve(__dirname, "../../content_packs/berlin_msa");
const { k, b, v, q } = require("./lib.cjs");

function migrate(file, fn) {
  const full = path.join(PACK, file);
  // Always start from the lesson as it was before the upgrade, so the script can be run again safely.
  const orig = path.join(__dirname, "orig", path.basename(file));
  if (!fs.existsSync(orig)) {
    fs.mkdirSync(path.dirname(orig), { recursive: true });
    fs.copyFileSync(full, orig);
  }
  const all = JSON.parse(fs.readFileSync(orig, "utf8"));
  const p = all[0];
  const find = (title) => {
    const s = p.steps.find((x) => x.title === title);
    if (!s) throw new Error(`${p.id}: board not found: ${title}`);
    return s;
  };
  const h = {
    board: find,
    /** Replace Ferdinand's line on a board. */
    say(title, text) {
      find(title).say = text;
    },
    /** Replace the chalk text of a board (the figure stays). */
    body(title, ...paras) {
      find(title).body = paras.join("\n\n");
    },
    rename(title, neu) {
      find(title).title = neu;
    },
    /** Add tap tasks to an existing board. */
    tasks(title, ...list) {
      find(title).tasks = list;
    },
    /** Insert new boards after an existing one. */
    after(title, ...boards) {
      const i = p.steps.indexOf(find(title));
      p.steps.splice(i + 1, 0, ...boards);
    },
    before(title, ...boards) {
      const i = p.steps.indexOf(find(title));
      p.steps.splice(i, 0, ...boards);
    },
    remove(title) {
      p.steps.splice(p.steps.indexOf(find(title)), 1);
    },
    /** [[first board title, chapter title], …] */
    chapters(list) {
      for (const s of p.steps) delete s.chapter;
      for (const [title, chapter] of list) {
        const s = find(title);
        p.steps[p.steps.indexOf(s)] = { chapter, ...s };
      }
    },
    /** New explanations for the quiz, by position. `null` keeps the old one. */
    explain(list) {
      if (list.length !== p.quiz.length) throw new Error(`${p.id}: quiz has ${p.quiz.length}, got ${list.length}`);
      list.forEach((t, i) => t && (p.quiz[i].explain = t));
    },
    quiz(...items) {
      p.quiz.push(...items);
    },
    /** Rename entries of the word list: { old: new }. */
    renameVocab(map) {
      for (const [old, neu] of Object.entries(map)) {
        const e = p.vocab.find((x) => x.term === old);
        if (!e) throw new Error(`${p.id}: word not found: ${old}`);
        e.term = neu;
      }
    },
    dropVocab(...terms) {
      for (const t of terms) {
        const i = p.vocab.findIndex((x) => x.term === t);
        if (i < 0) throw new Error(`${p.id}: word not found: ${t}`);
        p.vocab.splice(i, 1);
      }
    },
    /** Replace the word list. */
    vocab(...items) {
      p.vocab = items;
    },
  };
  fn(p, h);
  p.standard = 2;
  // keep a stable, readable key order
  const { id, subject, title, teaser, hook, outro, standard, requires, steps, vocab, quiz, source } = p;
  all[0] = { id, subject, title, teaser, hook, outro, standard, ...(requires ? { requires } : {}), steps, vocab, quiz, ...(source ? { source } : {}) };
  fs.writeFileSync(full, JSON.stringify(all, null, 2) + "\n");
  console.log(`${p.id}: ${steps.length} boards, ${steps.filter((s) => s.chapter).length} chapters, ${steps.filter((s) => s.tasks).length} with tasks, ${quiz.length} quiz`);
}

module.exports = { migrate, k, b, v, q };
