// English owl lessons: no arrows in the chalk text or in tasks (P_EN_VERBFORMEN has no generator, so its JSON is
// patched here), and the two boards that talk about a point and a stretch on the timeline now show them.
// Repeatable: every replacement is exact and is skipped when it is already in place.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const PACK = path.join(__dirname, "..", "..", "content_packs", "berlin_msa", "primers");

// --- P_EN_VERBFORMEN: arrows become words -------------------------------------------------
{
  const file = path.join(PACK, "en_01_verbformen.json");
  const all = JSON.parse(fs.readFileSync(file, "utf8"));
  const p = all.find((x) => x.id === "P_EN_VERBFORMEN");
  const board = (title) => {
    const s = p.steps.find((x) => x.title === title);
    if (!s) throw new Error("board not found: " + title);
    return s;
  };
  const body = (title, pairs) => {
    const s = board(title);
    for (const [from, to] of pairs) {
      if (s.body.includes(to)) continue;
      if (!s.body.includes(from)) throw new Error(`${title}: text not found: ${from}`);
      s.body = s.body.replace(from, to);
    }
  };
  const task = (title, pairs) => {
    const s = board(title);
    for (const [from, to] of pairs) {
      const t = s.tasks.find((x) => x.text.includes(from) || x.text.includes(to));
      if (!t) throw new Error(`${title}: task not found: ${from}`);
      t.text = t.text.replace(from, to);
    }
  };
  body("Die -s-Form", [
    ["I play. → **Tom** play**s**.", "I play. Aber: **Tom** play**s**."],
    ["I like pizza. → **She** like**s** pizza.", "I like pizza. Aber: **She** like**s** pizza."],
  ]);
  body("Auflösung: mit s oder ohne?", [
    ["music. → *my sister* = she", "music. Denn *my sister* = she."],
    ["music. → *my friends* = they, mehrere", "music. Denn *my friends* = they, also mehrere."],
    ["here. → *the bus* = it", "here. Denn *the bus* = it."],
  ]);
  body("Zwei kleine Schreibregeln für -ing", [
    ["writ**e** → writ**ing**:", "Aus writ**e** wird writ**ing**:"],
    ["ru**n** → ru**nn**ing:", "Aus ru**n** wird ru**nn**ing:"],
  ]);
  body("Manche Verben machen nicht mit", [
    ["go → nicht", "go: nicht"],
    ["see → nicht", "see: nicht"],
    ["write → nicht", "write: nicht"],
  ]);
  body("Auflösung: Was war gestern?", [
    ["cards. → regelmäßig, mit *ed*", "cards. Regelmäßig, mit *ed*."],
    ["Hamburg. → *go* ist unregelmäßig", "Hamburg. *go* ist unregelmäßig."],
    ["Sunday. → *see* ist unregelmäßig", "Sunday. *see* ist unregelmäßig."],
  ]);
  body("Auflösung: 2. oder 3. Form?", [
    ["film. → nach *have*: 3. Form", "film. Nach *have*: 3. Form."],
    ["yesterday. → allein: 2. Form", "yesterday. Allein: 2. Form."],
    ["home. → nach *has*: 3. Form", "home. Nach *has*: 3. Form."],
  ]);
  body("Nein sagen mit not", [
    ["I like it. → I **do not** like it.", "I like it. Verneint: I **do not** like it."],
    ["She likes it. → She **does not** like it.", "She likes it. Verneint: She **does not** like it."],
    ["He came. → He **did not** come.", "He came. Verneint: He **did not** come."],
  ]);
  body("Auflösung: Sag nein", [
    ["fish. → kein -s an *like*", "fish. Kein -s an *like*."],
    ["sleeping. → *is* ist schon da", "sleeping. *is* ist schon da."],
  ]);
  task("Jetzt du: Mach eine Frage daraus", [
    ["They play tennis. → ___", "They play tennis. Als Frage: ___"],
    ["He plays tennis. → ___", "He plays tennis. Als Frage: ___"],
    ["He played tennis. → ___", "He played tennis. Als Frage: ___"],
  ]);
  task("Jetzt du: Sag nein", [
    ["We play cards. → We", "We play cards. Verneint: We"],
    ["Tom likes fish. → Tom", "Tom likes fish. Verneint: Tom"],
    ["She is sleeping. → She", "She is sleeping. Verneint: She"],
  ]);
  const left = JSON.stringify(p.steps).match(/→|⇒/g);
  if (left) throw new Error(`P_EN_VERBFORMEN: ${left.length} arrows left on the boards`);
  fs.writeFileSync(file, JSON.stringify(all, null, 2) + "\n");
  console.log("P_EN_VERBFORMEN: arrows replaced by words");
}

// --- P_EN_ZEIT_VORBEI: the timeline is on the two boards that talk about it ----------------
{
  const file = path.join(__dirname, "en_zeiten2.cjs");
  let s = fs.readFileSync(file, "utf8");
  const crlf = s.includes("\r\n"); // the source may have Windows line ends; match on plain ones
  if (crlf) s = s.replace(/\r\n/g, "\n");
  const pairs = [
    [
      `Ein Jahr, ein Wochentag oder ein Geburtstag sind solche Punkte. Vor ihnen steht since.",\n      ),`,
      `Ein Jahr, ein Wochentag oder ein Geburtstag sind solche Punkte. Vor ihnen steht since.",\n        { figure: { type: "timeline", spans: [{ from: -0.6, to: 0, label: "bis jetzt" }], points: [{ at: -0.6, label: "since 2019" }] } },\n      ),`,
    ],
    [
      `        { tasks: [k("Two hours ist ___.",`,
      `        { figure: { type: "timeline", spans: [{ from: -0.6, to: 0, label: "for five years" }] }, tasks: [k("Two hours ist ___.",`,
    ],
  ];
  for (const [from, to] of pairs) {
    if (s.includes(to)) continue;
    if (s.split(from).length !== 2) throw new Error("en_zeiten2.cjs: piece not found once: " + from.slice(0, 50));
    s = s.replace(from, () => to);
  }
  fs.writeFileSync(file, crlf ? s.replace(/\n/g, "\r\n") : s);
  console.log(execFileSync("node", [file], { encoding: "utf8" }).trim());
}
