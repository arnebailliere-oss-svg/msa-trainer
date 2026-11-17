// The 12 maths lesson pages become Spickzettel ("sheet": true, linked to their owl lessons).
// Formulas, examples, figures and widgets stay as they are. Changed are only:
// "Merke" boxes (now a short list of full sentences), arrow chains, and one card that was too long.
// Repeatable: every change sets a whole value or replaces an exact text that is checked.
// math_sheet_letters.cjs runs after this file and adds the explanation of every letter.
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "..", "content_packs", "berlin_msa", "lessons");

const list = (...items) => items.map((x) => "- " + x).join("\n");

const guided = {
  L_MATH_FORMELBLATT: ["P_MATH_PROZENT", "P_MATH_POTENZ", "P_MATH_FUNKTION", "P_MATH_QUADRAT", "P_MATH_STOCHASTIK", "P_MATH_GEO_BEGRIFFE", "P_MATH_PYTH_TRIG", "P_MATH_KOERPER"],
  L_MATH_NUM_FRAC: ["P_MATH_BRUCH"],
  L_MATH_NUM_PCT: ["P_MATH_PROZENT"],
  L_MATH_ALG_EQU: ["P_MATH_TERME", "P_MATH_GLEICHUNG", "P_MATH_QUADRAT"],
  L_MATH_ALG_POW: ["P_MATH_POTENZ"],
  L_MATH_ALG_LGS: ["P_MATH_LGS"],
  L_MATH_DATA: ["P_MATH_STOCHASTIK"],
  L_MATH_FUNC: ["P_MATH_FUNKTION", "P_MATH_QUADRAT"],
  L_MATH_GEO_UNITS: ["P_MATH_EINHEITEN"],
  L_MATH_GEO_FLAECHE: ["P_MATH_GEO_BEGRIFFE"],
  L_MATH_GEO_PYTH_TRIG: ["P_MATH_PYTH_TRIG"],
  L_MATH_GEO_KOERPER: ["P_MATH_KOERPER"],
};

// "Merke" sections: whole body replaced.
const merke = {
  L_MATH_NUM_FRAC: list(
    "Erweitern und Kürzen ändern nur die Schreibweise, nicht den Wert.",
    "Plus und Minus brauchen den **gleichen Nenner**.",
    "Mal: Du rechnest oben mal oben und unten mal unten.",
    "Geteilt: Du nimmst mit dem **Kehrwert** mal.",
    "Am Ende kürzt du das Ergebnis.",
  ),
  L_MATH_NUM_PCT: list(
    "Prozent bedeutet **Hundertstel**.",
    "Eine Formel reicht für alle Aufgaben: $\\frac{W}{G} = \\frac{p}{100}$",
    "Änderungen rechnest du mit dem **Faktor** $1 \\pm \\frac{p}{100}$.",
    "Bei Zinseszins steht der Faktor **hoch n**.",
  ),
  L_MATH_ALG_EQU: list(
    "Eine Gleichung ist wie eine **Waage**: Du tust auf beiden Seiten dasselbe.",
    "Die Reihenfolge ist: Klammern auflösen, zusammenfassen, $x$ isolieren, Probe machen.",
    "Steht ein $x^2$ da, bringst du die Gleichung in die Normalform und nimmst die **pq-Formel**.",
  ),
  L_MATH_ALG_POW: list(
    "Bei Mal werden die Exponenten **zusammengezählt**.",
    "Bei Geteilt werden die Exponenten **abgezogen**.",
    "Bei Potenz hoch Potenz werden die Exponenten **malgenommen**.",
    "Ein negativer Exponent bedeutet den **Kehrwert**.",
    "Eine Wurzel ist eine Potenz mit einem **Bruch** im Exponenten.",
  ),
  L_MATH_ALG_LGS: list(
    "Steht in einer Gleichung schon $y = \\ldots$, dann nimmst du das **Einsetzen** oder das **Gleichsetzen**.",
    "Stehen in beiden Gleichungen $x$ und $y$ links und eine Zahl rechts, dann nimmst du das **Additionsverfahren**.",
    "Die Lösung gibst du immer als Paar $(x \\,|\\, y)$ an.",
  ),
  L_MATH_DATA: list(
    "Die Wahrscheinlichkeit ist **günstig durch möglich**.",
    "Entlang eines Pfades nimmst du **mal**, mehrere Pfade zählst du **zusammen**.",
    "Der Median ist die Mitte der **sortierten** Reihe.",
    "Im Kreisdiagramm ist der Winkel der Anteil **mal 360°**.",
  ),
  L_MATH_FUNC: list(
    "Eine Gerade hat die Form $y = mx + n$. Dabei ist $m$ die Steigung und $n$ der Schnitt mit der $y$-Achse.",
    "Eine Parabel hat die Form $a(x - d)^2 + e$. Ihr Scheitelpunkt ist $S(d \\,|\\, e)$.",
    "Für die Nullstelle setzt du $y$ gleich **0**.",
  ),
  L_MATH_GEO_UNITS: list(
    "Länge: Jede Stufe hat den Faktor **10**.",
    "Fläche: Jede Stufe hat den Faktor **100**.",
    "Volumen: Jede Stufe hat den Faktor **1000**.",
    "Zeit: Du rechnest mit **60**.",
    "In die größere Einheit **teilst** du, in die kleinere nimmst du **mal**.",
  ),
  L_MATH_GEO_FLAECHE: list(
    "Rechteck: Die Fläche ist $a \\cdot b$.",
    "Dreieck: Die Fläche ist $\\frac{1}{2} a h$.",
    "Kreis: Die Fläche ist $\\pi r^2$, und der Umfang ist $2 \\pi r$.",
    "Die Winkel im Dreieck ergeben zusammen **180°**.",
    "Bei einem Punkt steht **erst $x$, dann $y$**.",
  ),
  L_MATH_GEO_PYTH_TRIG: list(
    "Im rechtwinkligen Dreieck gilt **$a^2 + b^2 = c^2$**. Dabei liegt $c$ gegenüber vom rechten Winkel.",
    "Für sin, cos und tan hilft das Merkwort **GAGA HühnerHof AG**.",
    "Ist ein Winkel gesucht, nimmst du $\\sin^{-1}$, $\\cos^{-1}$ oder $\\tan^{-1}$.",
    "Ohne rechten Winkel nimmst du den Sinussatz oder den Kosinussatz vom Formelblatt.",
  ),
  L_MATH_GEO_KOERPER: list(
    "Gerade Körper: Das Volumen ist **Grundfläche mal Höhe**.",
    "Spitze Körper: Das Volumen ist **ein Drittel** davon.",
    "Die Oberfläche ist der Mantel **plus** die Grundflächen.",
    "Ein Liter ist ein Kubikdezimeter: $1\\,\\text{l} = 1\\,\\text{dm}^3$",
  ),
};

// Exact text replacements inside one section: [lessonId, sectionTitle, from, to].
const swaps = [
  [
    "L_MATH_NUM_FRAC",
    "Bruch, Dezimalzahl und Prozent umwandeln",
    "**Merke:** Bruch → Dezimalzahl: **teilen**. Dezimalzahl → Bruch: **Nachkommastellen zählen** (1 Stelle → Zehntel, 2 Stellen → Hundertstel). Prozent = **Hundertstel**. Auswendig: $\\frac{1}{2} = 0{,}5$, $\\frac{1}{4} = 0{,}25$, $\\frac{3}{4} = 0{,}75$, $\\frac{1}{5} = 0{,}2$, $\\frac{1}{8} = 0{,}125$, $\\frac{1}{3} = 0{,}\\overline{3}$.",
    "Diese Werte solltest du auswendig kennen:\n\n| Bruch | Dezimalzahl |\n|---|---|\n| $\\frac{1}{2}$ | $0{,}5$ |\n| $\\frac{1}{4}$ | $0{,}25$ |\n| $\\frac{3}{4}$ | $0{,}75$ |\n| $\\frac{1}{5}$ | $0{,}2$ |\n| $\\frac{1}{8}$ | $0{,}125$ |\n| $\\frac{1}{3}$ | $0{,}\\overline{3}$ |",
  ],
  [
    "L_MATH_NUM_PCT",
    "Typische Fehler",
    "*um 20 % erhöht* → Faktor 1,2. *auf 20 % gesenkt* → Faktor 0,2!",
    "*Um 20 % erhöht* bedeutet Faktor 1,2. *Auf 20 % gesenkt* bedeutet Faktor 0,2.",
  ],
  [
    "L_MATH_ALG_EQU",
    "Quadratische Gleichungen: die pq-Formel",
    "Unter der Wurzel negativ → **keine** Lösung. Null → **eine** Lösung. Positiv → **zwei** Lösungen.",
    "Die Zahl unter der Wurzel zeigt, wie viele Lösungen es gibt:\n\n- Sie ist negativ: **keine** Lösung.\n- Sie ist null: **eine** Lösung.\n- Sie ist positiv: **zwei** Lösungen.",
  ],
  ["L_MATH_ALG_EQU", "Quadratische Gleichungen: die pq-Formel", "= -7 \\pm 8 \\Rightarrow x_1 = 1,\\; x_2 = -15$", "= -7 \\pm 8$, also $x_1 = 1$ und $x_2 = -15$"],
  [
    "L_MATH_FUNC",
    "Exponentielles Wachstum und Abnahme",
    "Beispiel: 800 € werden zu 3 % Zinseszins angelegt. $q = 1{,}03$, nach 5 Jahren: $800 \\cdot 1{,}03^5 \\approx 927{,}42$ €. Eine Bakterienkultur verdoppelt sich jede Stunde: $N(t) = 80 \\cdot 2^t$. Ein Auto verliert jährlich 20 % an Wert: $W(t) = 15\\,000 \\cdot 0{,}8^t$.",
    "| Beispiel | Rechnung |\n|---|---|\n| 800 € zu 3 % Zinseszins, nach 5 Jahren | $800 \\cdot 1{,}03^5 \\approx 927{,}42$ € |\n| Bakterien verdoppeln sich jede Stunde | $N(t) = 80 \\cdot 2^t$ |\n| Ein Auto verliert jährlich 20 % an Wert | $W(t) = 15\\,000 \\cdot 0{,}8^t$ |",
  ],
  [
    "L_MATH_GEO_UNITS",
    "Längen, Flächen, Volumen — die Potenzen zählen mit",
    "Von einer Längeneinheit zur nächsten ist der Faktor **10** (mm → cm → dm → m), zu km **1000**.",
    "Von einer Längeneinheit zur nächsten ist der Faktor **10** (mm, cm, dm, m). Nur von m zu km ist er **1000**.",
  ],
  // Formelblatt: the lesson says both laws are on the sheet, but the cosine law was missing here.
  [
    "L_MATH_FORMELBLATT",
    "Beliebiges Dreieck",
    "\\frac{c}{\\sin\\gamma}$\n\n**Umfang**",
    "\\frac{c}{\\sin\\gamma}$\n\n**Kosinussatz**: $a^2 = b^2 + c^2 - 2bc \\cdot \\cos\\alpha$\n\n**Umfang**",
  ],
  // Formelblatt writes (x + d)² with S(−d|e), the lessons write (x − d)² with S(d|e). Say that both mean the same.
  [
    "L_MATH_FORMELBLATT",
    "Quadratische Funktionen und Gleichungen",
    "mit Scheitelpunkt $S(-d \\,|\\, e)$\n\n",
    "mit Scheitelpunkt $S(-d \\,|\\, e)$\n\nIn den Lektionen steht dieselbe Form als $(x - d)^2 + e$ mit $S(d \\,|\\, e)$. Beides sagt dasselbe: Die Zahl in der Klammer wechselt ihr Vorzeichen.\n\n",
  ],
  // Formelblatt writes W/p = G/100, the percent lesson writes W/G = p/100. Say that both mean the same.
  [
    "L_MATH_FORMELBLATT",
    "Prozent- und Zinsrechnung",
    "$p\\,\\%$ Prozentsatz\n\n**Kapital",
    "$p\\,\\%$ Prozentsatz\n\nIn der Lektion steht dieselbe Formel als $\\frac{W}{G} = \\frac{p}{100}$. Beide Schreibweisen führen zum selben Ergebnis.\n\n**Kapital",
  ],
  // Trig examples: say which angle is the right angle and which side is the hypotenuse, one step per line.
  [
    "L_MATH_GEO_PYTH_TRIG",
    "So rechnest du",
    "welche Seite ist gegeben, welche gesucht? → passende Funktion wählen.",
    "Welche Seite ist gegeben, welche ist gesucht? Danach wählst du sin, cos oder tan.",
  ],
  [
    "L_MATH_GEO_PYTH_TRIG",
    "So rechnest du",
    "$\\alpha = 90°$, $\\beta = 55°$, $a = 8$ (Hypotenuse), $c$ gesucht (Ankathete von $\\beta$): $\\cos\\beta = \\frac{c}{a} \\Rightarrow c = a \\cdot \\cos 55° \\approx 4{,}59$\n\nWinkel gesucht: $\\tan\\alpha = \\frac{4}{8} \\Rightarrow \\alpha = \\tan^{-1}(0{,}5) \\approx 26{,}6°$",
    "**Beispiel 1, Seite gesucht:** Der rechte Winkel liegt hier bei $\\alpha$. Deshalb ist $a = 8$ die Hypotenuse. Gegeben ist $\\beta = 55°$, gesucht ist $c$, die Ankathete von $\\beta$.\n\n$\\cos 55° = \\frac{c}{8}$, also $c = 8 \\cdot \\cos 55° \\approx 4{,}59$\n\n**Beispiel 2, Winkel gesucht:** Die Gegenkathete ist 4, die Ankathete ist 8.\n\n$\\tan\\alpha = \\frac{4}{8} = 0{,}5$, also $\\alpha = \\tan^{-1}(0{,}5) \\approx 26{,}6°$",
  ],
];

let changed = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.startsWith("math_"))) {
  const file = path.join(dir, f);
  const arr = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const l of arr) {
    if (!guided[l.id]) throw new Error("no guided list for " + l.id);
    l.sheet = true;
    l.guided = guided[l.id];
    for (const s of l.sections) {
      if (s.title === "Merke" && merke[l.id]) s.body = merke[l.id];
      for (const [id, title, from, to] of swaps) {
        if (id !== l.id || title !== s.title) continue;
        // `to` is checked first: some replacements contain their own `from`, and a second run must not repeat them.
        // A section that math_sheet_letters.cjs has rewritten since no longer holds either text; it is left alone.
        if (s.body.includes(to)) continue;
        if (s.body.includes(from)) s.body = s.body.replace(from, to);
      }
    }
    changed++;
  }
  fs.writeFileSync(file, JSON.stringify(arr, null, 2) + "\n");
}
console.log(`${changed} maths lesson pages marked as Spickzettel`);
