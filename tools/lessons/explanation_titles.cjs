// Headings in the explanations of the older practice questions had their nouns in lowercase
// ("Die begriffe", "Schritt für schritt"). This writes them the way German spells them.
// The list was built from how each word is written elsewhere in the content and then checked by eye.
// Repeatable: a heading that is already correct is left alone.
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "..", "content_packs", "berlin_msa", "questions");
const MAP = {
  ...require("./explanation_titles.json"),
  "Die begriffe": "Die Begriffe",
  "Mehr beispiele": "Mehr Beispiele",
  "Achtung - verwechslungsgefahr": "Achtung: Verwechslungsgefahr",
  "Typische präteritum-endungen": "Typische Präteritum-Endungen",
  "Umformulieren heisst": "Umformulieren heißt",
  "Weitere beispiele": "Weitere Beispiele",
  "Die vier modi": "Die vier Modi",
  "Imperativ - befehlsform": "Imperativ - Befehlsform",
  "Unterschied zum oxymoron": "Unterschied zum Oxymoron",
  "Bekannte symbole": "Bekannte Symbole",
  "Die formel": "Die Formel",
  "Schnellere methode": "Schnellere Methode",
  "In der formel": "In der Formel",
  "Die methode": "Die Methode",
  "Wichtige umrechnungen": "Wichtige Umrechnungen",
  "Diese formel gilt für": "Diese Formel gilt für",
  "Bei 7 werten": "Bei 7 Werten",
  "Was ist eine symmetrieachse": "Was ist eine Symmetrieachse",
  "Der drachen": "Der Drachen",
  "Zwei methoden": "Zwei Methoden",
  "Wichtige kubikzahlen": "Wichtige Kubikzahlen",
  "Schneller weg": "Schneller Weg",
  "Regeln für trapeze": "Regeln für Trapeze",
  "Alternative formel": "Alternative Formel",
  "Beim abwickeln": "Beim Abwickeln",
};
let changed = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
  const file = path.join(dir, f);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;
  let n = 0;
  for (const q of qs) {
    if (!Array.isArray(q.explanation)) continue;
    for (const s of q.explanation) {
      if (s.title && MAP[s.title]) {
        s.title = MAP[s.title];
        n++;
      }
    }
  }
  if (n) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    changed += n;
  }
}
console.log(`${changed} headings corrected`);
