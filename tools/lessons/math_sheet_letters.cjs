// Every letter in a formula is explained on the maths Spickzettel, in the section where the learner meets it.
// Formulas are also taken apart: next to each one stands what it says in words.
// Runs after math_sheets.cjs. Repeatable: whole bodies are set, additions are skipped if already there.
// Figures and widgets stay as they are; the Körper formulas are spread over three sections with their own drawings.
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "..", "content_packs", "berlin_msa", "lessons");
const R = String.raw;

const table = (h1, h2, rows) => [`| ${h1} | ${h2} |`, "|---|---|", ...rows.map(([a, b]) => `| ${a} | ${b} |`)].join("\n");
const legend = (...rows) => table("Zeichen", "Bedeutung", rows);
const forms = (...rows) => table("Formel", "In Worten", rows);
const P = (...parts) => parts.join("\n\n");

const files = {};
const lessons = {};
for (const f of fs.readdirSync(dir).filter((x) => x.startsWith("math_"))) {
  files[f] = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  for (const l of files[f]) lessons[l.id] = l;
}
const sec = (id, title) => {
  const s = lessons[id].sections.find((x) => x.title === title);
  if (!s) throw new Error(`${id}: no section "${title}"`);
  return s;
};
const body = (id, title, text) => (sec(id, title).body = text);
/** Put `text` after (or before) the exact piece `anchor`, once. */
const add = (id, title, anchor, text, before = false) => {
  const s = sec(id, title);
  if (s.body.includes(text.trim())) return;
  if (!s.body.includes(anchor)) throw new Error(`${id} "${title}": anchor not found: ${anchor.slice(0, 50)}`);
  s.body = s.body.replace(anchor, before ? text + anchor : anchor + text);
};
const append = (id, title, text) => {
  const s = sec(id, title);
  if (!s.body.includes(text.trim())) s.body = s.body + "\n\n" + text;
};
const prepend = (id, title, text) => {
  const s = sec(id, title);
  if (!s.body.includes(text.trim())) s.body = text + "\n\n" + s.body;
};
const swap = (id, title, from, to) => {
  const s = sec(id, title);
  if (s.body.includes(to)) return;
  if (!s.body.includes(from)) throw new Error(`${id} "${title}": text not found: ${from.slice(0, 50)}`);
  s.body = s.body.replace(from, to);
};

const PI = [R`$\pi$`, "die Kreiszahl Pi, ungefähr 3,14. Der Taschenrechner hat dafür eine Taste."];
const SIDE_BY_SIDE = R`Stehen Buchstaben direkt nebeneinander, wird malgenommen: $2ab$ bedeutet $2 \cdot a \cdot b$.`;

// ---------------------------------------------------------------- Körper
{
  const id = "L_MATH_GEO_KOERPER";
  const l = lessons[id];
  body(
    id,
    "Begriffe",
    [
      R`- **Volumen** $V$: was in den Körper hineinpasst. Einheiten: cm³, dm³ (das ist ein Liter), m³.`,
      R`- **Grundfläche** $A_G$: die Fläche, auf der der Körper steht, also der Boden.`,
      R`- **Mantelfläche** $A_M$: alle **Seitenflächen** zusammen, ohne Boden und Deckel.`,
      R`- **Oberfläche** $A_O$: **alle** Flächen zusammen, also Mantel plus Boden und Deckel.`,
      R`- **Höhe** $h$: der Abstand vom Boden bis ganz oben, senkrecht gemessen.`,
      R`- **Kanten** $a$, $b$, $c$: die Seitenlängen eines Quaders.`,
      R`- **Radius** $r$: der Abstand von der Mitte eines Kreises bis zum Rand.`,
      "",
      R`$A$ steht für eine Fläche. Der kleine Buchstabe daneben sagt, welche: G wie Grund, M wie Mantel, O wie Ober.`,
    ].join("\n"),
  );
  sec(id, "Begriffe").figures[0].caption = R`Quader: Grundfläche $A_G = a \cdot b$, Höhe $c$`;

  // One long formula section becomes three short ones, each with its letters and its drawings.
  const old = l.sections.find((x) => x.title === "Die Formeln (Formelblatt)");
  if (old) {
    const figs = Object.fromEntries(old.figures.map((g) => [g.figure.type, g]));
    const at = l.sections.indexOf(old);
    l.sections.splice(
      at,
      1,
      { kind: "formula", title: "Formeln: Würfel und Quader", body: "", figures: [figs.box] },
      { kind: "formula", title: "Formeln: Prisma und Zylinder", body: "", figures: [figs.cylinder] },
      { kind: "formula", title: "Formeln: Pyramide, Kegel, Kugel", body: "", primer: old.primer, figures: [figs.pyramid, figs.cone, figs.sphere] },
    );
  }
  body(
    id,
    "Formeln: Würfel und Quader",
    P(
      "Ein Würfel hat lauter gleich lange Kanten. Ein Quader sieht aus wie ein Schuhkarton.",
      legend(
        [R`$a$, $b$, $c$`, "die Kantenlängen: Länge, Breite und Höhe. Beim Würfel sind alle gleich, deshalb steht dort nur $a$."],
        [R`$V$`, "das Volumen: was hineinpasst"],
        [R`$A_O$`, "die Oberfläche: alle sechs Seitenflächen zusammen"],
        [R`$d$`, "die Raumdiagonale: die Strecke quer durch den Körper, von einer Ecke zur Ecke gegenüber"],
      ),
      "**Würfel**",
      forms(
        [R`$V = a^3$`, "Kante mal Kante mal Kante"],
        [R`$A_O = 6a^2$`, R`Eine Seite ist ein Quadrat mit der Fläche $a^2$. Davon gibt es sechs.`],
        [R`$d = a\sqrt{3}$`, "Kante mal Wurzel aus 3"],
      ),
      "**Quader**",
      forms(
        [R`$V = a \cdot b \cdot c$`, "Länge mal Breite mal Höhe"],
        [R`$A_O = 2ab + 2bc + 2ac$`, "Es gibt drei verschiedene Rechtecke. Jedes kommt zweimal vor."],
        [R`$d = \sqrt{a^2 + b^2 + c^2}$`, "alle drei Kanten quadrieren, zusammenzählen, dann die Wurzel ziehen"],
      ),
      SIDE_BY_SIDE,
    ),
  );
  sec(id, "Formeln: Würfel und Quader").figures[0].caption = R`Quader: $V = a \cdot b \cdot c$, $A_O = 2ab + 2bc + 2ac$`;

  body(
    id,
    "Formeln: Prisma und Zylinder",
    P(
      "Beide haben gerade Wände. Boden und Deckel sind gleich groß. Ein Prisma hat einen eckigen Boden, ein Zylinder ist eine Dose.",
      legend(
        [R`$A_G$`, "die Grundfläche: der Boden"],
        [R`$h$`, "die Höhe des Körpers"],
        [R`$u_G$`, "der Umfang der Grundfläche: einmal um den Boden herum"],
        [R`$A_M$`, "die Mantelfläche: die Wand ohne Boden und Deckel"],
        [R`$A_O$`, "die Oberfläche: Wand, Boden und Deckel zusammen"],
        [R`$V$`, "das Volumen: was hineinpasst"],
        [R`$r$`, "der Radius des Kreises am Boden"],
        PI,
      ),
      "**Prisma**",
      forms(
        [R`$V = A_G \cdot h$`, "Boden mal Höhe"],
        [R`$A_M = u_G \cdot h$`, "Umfang des Bodens mal Höhe"],
        [R`$A_O = 2A_G + A_M$`, "Boden und Deckel (zweimal die Grundfläche) plus die Wand"],
      ),
      "**Zylinder** (der Boden ist ein Kreis)",
      forms(
        [R`$V = \pi r^2 \cdot h$`, R`Kreisfläche mal Höhe. Die Kreisfläche ist $\pi r^2$.`],
        [R`$A_M = 2\pi r \cdot h$`, R`Kreisumfang mal Höhe. Der Kreisumfang ist $2\pi r$.`],
        [R`$A_O = 2\pi r^2 + 2\pi r h$`, "zwei Kreise (Boden und Deckel) plus die Wand"],
      ),
    ),
  );
  sec(id, "Formeln: Prisma und Zylinder").figures[0].caption = R`Zylinder: $V = \pi r^2 \cdot h$, $A_M = 2\pi r \cdot h$`;

  body(
    id,
    "Formeln: Pyramide, Kegel, Kugel",
    P(
      "Pyramide und Kegel laufen oben spitz zu. Deshalb steht in ihrer Formel ein Drittel.",
      legend(
        [R`$a$`, "bei der Pyramide: die Seitenlänge des quadratischen Bodens"],
        [R`$A_G$`, "die Grundfläche: der Boden"],
        [R`$h$`, "die Höhe: von der Mitte des Bodens senkrecht hoch bis zur Spitze"],
        [R`$h_s$`, "die Seitenhöhe: die Höhe eines Dreiecks an der Seite, schräg vom Rand des Bodens bis zur Spitze"],
        [R`$r$`, "der Radius: beim Kegel vom Kreis am Boden, bei der Kugel von der Mitte bis nach außen"],
        PI,
        [R`$V$`, "das Volumen: was hineinpasst"],
        [R`$A_M$`, "die Mantelfläche: die schrägen Seiten ohne den Boden"],
        [R`$A_O$`, "die Oberfläche: alles, was außen ist"],
      ),
      "**Pyramide** (mit quadratischem Boden)",
      forms(
        [R`$V = \frac{1}{3} a^2 \cdot h$`, R`ein Drittel von Boden mal Höhe. Der Boden ist das Quadrat $a^2$.`],
        [R`$A_M = 2a \cdot h_s$`, R`vier Dreiecke. Jedes hat die Fläche $\frac{1}{2} \cdot a \cdot h_s$.`],
      ),
      "**Kegel** und **Kugel**",
      forms(
        [R`$V = \frac{1}{3} \pi r^2 \cdot h$`, "Kegel: ein Drittel von Kreisfläche mal Höhe"],
        [R`$V = \frac{4}{3} \pi r^3$`, "Kugel: vier Drittel mal Pi mal Radius hoch 3"],
        [R`$A_O = 4 \pi r^2$`, "Kugel: viermal die Fläche eines Kreises mit demselben Radius"],
      ),
    ),
  );
  {
    const f = sec(id, "Formeln: Pyramide, Kegel, Kugel").figures;
    f[0].caption = R`Pyramide: $V = \frac{1}{3} \cdot A_G \cdot h$`;
    f[2].caption = R`Kugel: $V = \frac{4}{3} \pi r^3$, $A_O = 4 \pi r^2$`;
  }
  // "d" is the space diagonal on this sheet, so the barrel example names its diameter in words.
  swap(id, "Beispiele", R`Regentonne $d = 60$ cm, $h = 90$ cm:`, R`Regentonne mit 60 cm Durchmesser, also $r = 30$ cm, und $h = 90$ cm:`);
}

// ---------------------------------------------------------------- Formelblatt
{
  const id = "L_MATH_FORMELBLATT";
  body(
    id,
    "Prozent- und Zinsrechnung",
    P(
      R`**Grundformel**: $\frac{W}{p} = \frac{G}{100}$`,
      R`In der Lektion steht dieselbe Formel als $\frac{W}{G} = \frac{p}{100}$. Beide Schreibweisen führen zum selben Ergebnis.`,
      R`**Kapital nach $n$ Jahren**: $K_n = K_0 \cdot \left(1 + \frac{p}{100}\right)^n$`,
      R`**Zinssatz**: $\frac{p}{100} = \sqrt[n]{\frac{K_n}{K_0}} - 1$`,
      legend(
        [R`$G$`, "der Grundwert: das Ganze, also 100 %"],
        [R`$W$`, "der Prozentwert: der Teil, um den es geht"],
        [R`$p$`, "der Prozentsatz: die Zahl vor dem Prozentzeichen"],
        [R`$K_0$`, "das Kapital am Anfang, also das Geld im Jahr 0"],
        [R`$K_n$`, R`das Kapital nach $n$ Jahren`],
        [R`$n$`, "die Anzahl der Jahre"],
      ),
    ),
  );
  body(
    id,
    "Dichte und Geschwindigkeit",
    P(
      R`**Dichte**: $\rho = \frac{m}{V}$ — Masse durch Volumen`,
      R`**Geschwindigkeit** (gleichförmig): $v = \frac{s}{t}$ — Weg durch Zeit`,
      legend(
        [R`$\rho$`, "die Dichte (der griechische Buchstabe Rho): wie schwer ein Stoff für seine Größe ist"],
        [R`$m$`, "die Masse, also das Gewicht, zum Beispiel in Gramm"],
        [R`$V$`, "das Volumen: wie viel Platz der Stoff braucht"],
        [R`$v$`, "die Geschwindigkeit, zum Beispiel in Kilometern pro Stunde"],
        [R`$s$`, "der Weg, also die Strecke"],
        [R`$t$`, "die Zeit, die dafür gebraucht wird"],
      ),
    ),
  );
  body(
    id,
    "Potenzen und Wurzeln",
    P(
      R`$a^n = a \cdot a \cdot \ldots \cdot a$ ($n$-mal) · $a^0 = 1$ · $a^{-n} = \frac{1}{a^n}$`,
      R`$\sqrt[n]{a} = a^{\frac{1}{n}}$, speziell $\sqrt{a} = a^{\frac{1}{2}}$`,
      legend(
        [R`$a$`, "die Basis: die Zahl, die mit sich selbst malgenommen wird"],
        [R`$n$`, "der Exponent, also die Hochzahl: so oft steht die Basis da"],
      ),
    ),
  );
  body(
    id,
    "Quadratische Funktionen und Gleichungen",
    P(
      R`**Scheitelpunktform**: $f(x) = (x + d)^2 + e$ mit Scheitelpunkt $S(-d \,|\, e)$`,
      R`In den Lektionen steht dieselbe Form als $(x - d)^2 + e$ mit $S(d \,|\, e)$. Beides sagt dasselbe: Die Zahl in der Klammer wechselt ihr Vorzeichen.`,
      R`**Normalform**: $0 = x^2 + px + q$`,
      R`**Lösungsformel (pq-Formel)**: $x_{1,2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$`,
      legend(
        [R`$S$`, "der Scheitelpunkt: der tiefste oder der höchste Punkt der Parabel"],
        [R`$d$, $e$`, "die beiden Zahlen, an denen du den Scheitelpunkt abliest"],
        [R`$p$`, R`die Zahl vor dem $x$, mit ihrem Vorzeichen`],
        [R`$q$`, R`die Zahl ohne $x$, mit ihrem Vorzeichen`],
        [R`$x_{1,2}$`, "die beiden Lösungen: einmal mit Plus gerechnet, einmal mit Minus"],
      ),
    ),
  );
  const TRI = [
    [R`$u$`, "der Umfang: einmal außen herum"],
    [R`$A$`, "der Flächeninhalt: wie viel Platz das Dreieck bedeckt"],
    [R`$h_c$`, R`die Höhe auf der Seite $c$: der senkrechte Abstand von $c$ bis zur Ecke gegenüber`],
  ];
  body(
    id,
    "Rechtwinkliges Dreieck",
    P(
      R`**Satz des Pythagoras**: $c^2 = a^2 + b^2$`,
      R`**Umfang**: $u = a + b + c$ · **Fläche**: $A = \frac{1}{2} a \cdot b = \frac{1}{2} c \cdot h_c$`,
      R`$\sin\alpha = \frac{\text{Gegenkathete}}{\text{Hypotenuse}} = \frac{a}{c}$ · $\cos\alpha = \frac{\text{Ankathete}}{\text{Hypotenuse}} = \frac{b}{c}$ · $\tan\alpha = \frac{\text{Gegenkathete}}{\text{Ankathete}} = \frac{a}{b}$`,
      legend(
        [R`$a$, $b$`, "die Katheten: die beiden Seiten am rechten Winkel"],
        [R`$c$`, "die Hypotenuse: die längste Seite, gegenüber vom rechten Winkel"],
        [R`$\alpha$`, R`der Winkel Alpha. Er liegt gegenüber von der Seite $a$.`],
        ...TRI,
      ),
    ),
  );
  body(
    id,
    "Beliebiges Dreieck",
    P(
      R`**Sinussatz**: $\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma}$`,
      R`**Kosinussatz**: $a^2 = b^2 + c^2 - 2bc \cdot \cos\alpha$`,
      R`**Umfang**: $u = a + b + c$ · **Fläche**: $A = \frac{1}{2} c \cdot h_c = \frac{1}{2} a \cdot b \cdot \sin\gamma$`,
      legend(
        [R`$a$, $b$, $c$`, "die drei Seiten des Dreiecks"],
        [R`$\alpha$, $\beta$, $\gamma$`, R`die drei Winkel Alpha, Beta und Gamma. $\alpha$ liegt gegenüber von $a$, $\beta$ gegenüber von $b$, $\gamma$ gegenüber von $c$.`],
        ...TRI,
      ),
    ),
  );
  body(
    id,
    "Rechteck, Trapez, Kreis",
    P(
      R`**Rechteck**: $u = 2a + 2b$ · $A = a \cdot b$ · Diagonale $e = \sqrt{a^2 + b^2}$`,
      R`**Trapez**: Mittellinie $m = \frac{1}{2}(a + c)$ · $A = m \cdot h = \frac{1}{2}(a + c) \cdot h$`,
      R`**Kreis**: $d = 2r$ · $u = 2 \cdot \pi \cdot r$ · $A = \pi \cdot r^2$`,
      legend(
        [R`$u$`, "der Umfang: einmal außen herum"],
        [R`$A$`, "der Flächeninhalt: wie viel Platz die Figur bedeckt"],
        [R`$a$, $b$`, "beim Rechteck: die Länge und die Breite"],
        [R`$e$`, "die Diagonale: die Strecke von einer Ecke zur Ecke gegenüber"],
        [R`$a$, $c$`, "beim Trapez: die beiden Seiten, die parallel liegen"],
        [R`$m$`, "die Mittellinie: der Durchschnitt der beiden parallelen Seiten"],
        [R`$h$`, "die Höhe: der senkrechte Abstand zwischen den parallelen Seiten"],
        [R`$r$`, "der Radius: von der Mitte des Kreises bis zum Rand"],
        [R`$d$`, "der Durchmesser: einmal quer durch die Mitte des Kreises"],
        PI,
      ),
    ),
  );
  body(
    id,
    "Würfel und Quader",
    P(
      R`**Würfel**: $A_G = a^2$ · $A_O = 6a^2$ · $V = a^3$ · Raumdiagonale $d = a\sqrt{3}$`,
      R`**Quader**: $A_G = a \cdot b$ · $A_O = 2ab + 2bc + 2ac$ · $V = a \cdot b \cdot c$ · $d = \sqrt{a^2 + b^2 + c^2}$`,
      legend(
        [R`$a$, $b$, $c$`, "die Kantenlängen: Länge, Breite und Höhe. Beim Würfel sind alle gleich."],
        [R`$A_G$`, "die Grundfläche: der Boden"],
        [R`$A_O$`, "die Oberfläche: alle sechs Seitenflächen zusammen"],
        [R`$V$`, "das Volumen: was hineinpasst"],
        [R`$d$`, "die Raumdiagonale: die Strecke quer durch den Körper, von einer Ecke zur Ecke gegenüber"],
      ),
      SIDE_BY_SIDE,
    ),
  );
  body(
    id,
    "Prisma, Pyramide, Zylinder, Kegel",
    P(
      R`**Prisma** (gerade): $A_M = u_G \cdot h$ · $A_O = 2A_G + A_M$ · $V = A_G \cdot h$`,
      R`**Pyramide** (quadratisch): $A_G = a^2$ · $A_M = 2a \cdot h_s$ · $A_O = A_G + A_M$ · $V = \frac{1}{3} A_G \cdot h$`,
      R`**Zylinder**: $A_G = \pi r^2$ · $A_M = 2\pi r \cdot h$ · $A_O = 2A_G + A_M$ · $V = \pi r^2 \cdot h$`,
      R`**Kegel**: $V = \frac{1}{3} \pi r^2 \cdot h$`,
      legend(
        [R`$A_G$`, "die Grundfläche: der Boden"],
        [R`$A_M$`, "die Mantelfläche: die Seiten ohne Boden und Deckel"],
        [R`$A_O$`, "die Oberfläche: alle Flächen außen zusammen"],
        [R`$V$`, "das Volumen: was hineinpasst"],
        [R`$u_G$`, "der Umfang der Grundfläche: einmal um den Boden herum"],
        [R`$h$`, "die Höhe des Körpers, senkrecht gemessen"],
        [R`$h_s$`, "die Seitenhöhe der Pyramide: schräg vom Rand des Bodens bis zur Spitze"],
        [R`$a$`, "die Seitenlänge des quadratischen Bodens"],
        [R`$r$`, "der Radius des Kreises am Boden"],
        PI,
      ),
    ),
  );
}

// ---------------------------------------------------------------- Bruchrechnung
prepend("L_MATH_NUM_FRAC", "Die Rechenregeln", R`Die Buchstaben stehen hier, damit die Regel für alle Brüche gilt.

- $a$, $b$, $c$ und $d$: Platzhalter für beliebige Zahlen. Unten darf keine 0 stehen.`);

// ---------------------------------------------------------------- Prozent
append(
  "L_MATH_NUM_PCT",
  "Die Grundformel — und ihre drei Gesichter",
  legend(
    [R`$G$`, "der Grundwert: das Ganze, also 100 %"],
    [R`$W$`, "der Prozentwert: der Teil, um den es geht"],
    [R`$p$`, "der Prozentsatz: die Zahl vor dem Prozentzeichen"],
  ),
);
add(
  "L_MATH_NUM_PCT",
  "Prozentuale Änderung (Rabatt, Erhöhung, Zinsen)",
  R`$$K_n = K_0 \cdot \left(1 + \frac{p}{100}\right)^n$$`,
  R`

- $K_0$: das Kapital am Anfang, also das Geld im Jahr 0
- $K_n$: das Kapital nach $n$ Jahren
- $n$: die Anzahl der Jahre`,
);

// ---------------------------------------------------------------- Terme und Gleichungen
append("L_MATH_ALG_EQU", "Term, Gleichung, Lösungsmenge", R`Ein Buchstabe wie $a$ steht für eine Zahl, die noch offen ist. Solche Buchstaben heißen **Variablen**.`);
append("L_MATH_ALG_EQU", "Die Rechengesetze", R`$a$, $b$ und $c$ sind Platzhalter für beliebige Zahlen.`);
add(
  "L_MATH_ALG_EQU",
  "Quadratische Gleichungen: die pq-Formel",
  R`$$x_{1,2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$$`,
  R`

- $p$: die Zahl vor dem $x$, mit ihrem Vorzeichen
- $q$: die Zahl ohne $x$, mit ihrem Vorzeichen
- $x_{1,2}$: die beiden Lösungen. Einmal rechnest du mit Plus, einmal mit Minus.`,
);
swap(
  "L_MATH_ALG_EQU",
  "Quadratische Gleichungen: die pq-Formel",
  R`Beispiel: $x^2 + 14x - 15 = 0$: $x_{1,2}`,
  R`Beispiel: $x^2 + 14x - 15 = 0$. Hier ist $p = 14$ und $q = -15$.

$x_{1,2}`,
);

// ---------------------------------------------------------------- Potenzen
append("L_MATH_ALG_POW", "Was ist eine Potenz?", R`In den Regeln stehen Buchstaben als Platzhalter. $a$ und $b$ sind beliebige Zahlen als Basis. $m$ und $n$ sind beliebige Exponenten.`);
prepend("L_MATH_ALG_POW", "Potenzgesetze", R`- $a$ und $b$: beliebige Zahlen als Basis
- $m$ und $n$: beliebige Exponenten, also Hochzahlen`);

// ---------------------------------------------------------------- LGS
append("L_MATH_ALG_LGS", "Was ist ein LGS?", R`Am Ende schreibst du die Lösung als **Lösungsmenge** $L$ auf.`);
swap(
  "L_MATH_ALG_LGS",
  "Grafisch lösen",
  R`schneiden sich in $S(2 \,|\, 4)$, also`,
  R`schneiden sich im **Schnittpunkt** $S$. Er liegt bei $S(2 \,|\, 4)$, also`,
);
swap(
  "L_MATH_ALG_LGS",
  "Merke",
  R`Haben beide Gleichungen die Form $ax + by = c$, dann nimmst du das **Additionsverfahren**.`,
  R`Stehen in beiden Gleichungen $x$ und $y$ links und eine Zahl rechts, dann nimmst du das **Additionsverfahren**.`,
);

// ---------------------------------------------------------------- Stochastik
swap(
  "L_MATH_DATA",
  "Häufigkeit und Wahrscheinlichkeit",
  R`- **Wahrscheinlichkeit** $P(E)$: die relative Häufigkeit, die man auf lange Sicht erwartet.`,
  R`- **Ereignis** $E$: das, worauf du achtest, zum Beispiel „eine 6 würfeln“.
- **Wahrscheinlichkeit** $P$: die relative Häufigkeit, die man auf lange Sicht erwartet. Man schreibt $P(E)$ und liest „P von E“.`,
);
add(
  "L_MATH_DATA",
  "Die Laplace-Formel",
  R`$$P(E) = \frac{\text{Anzahl günstiger Ergebnisse}}{\text{Anzahl aller Ergebnisse}}$$`,
  R`

- $P$: die Wahrscheinlichkeit
- $E$: das Ereignis, um das es geht, zum Beispiel „eine 5 würfeln“`,
);
swap("L_MATH_DATA", "Mehrstufige Experimente: Baumdiagramm und Pfadregeln", R`$P(R,B) + P(B,R) = `, R`$P(\text{rot, blau}) + P(\text{blau, rot}) = `);

// ---------------------------------------------------------------- Funktionen
swap(
  "L_MATH_FUNC",
  "Lineare Funktionen: y = mx + n",
  R`- **Punktprobe**: liegt $P(x_P \,|\, y_P)$ auf der Geraden? $x_P$ einsetzen — kommt $y_P$ heraus?`,
  R`- $P$: ein Punkt mit den Koordinaten $(x_P \,|\, y_P)$
- **Punktprobe**: Liegt $P$ auf der Geraden? Setze $x_P$ ein. Kommt $y_P$ heraus, dann liegt er darauf.`,
);
append(
  "L_MATH_FUNC",
  "Quadratische Funktionen: die Parabel",
  legend(
    [R`$a$`, R`die Zahl vor $x^2$: Sie bestimmt, wohin die Parabel offen ist und wie breit sie ist.`],
    [R`$b$, $c$`, R`die Zahl vor $x$ und die Zahl ohne $x$`],
    [R`$S$`, "der Scheitelpunkt: der tiefste oder der höchste Punkt der Parabel"],
    [R`$d$, $e$`, R`die Koordinaten des Scheitelpunkts: $d$ nach rechts, $e$ nach oben`],
  ),
);
add(
  "L_MATH_FUNC",
  "Exponentielles Wachstum und Abnahme",
  R`dass **Wert : Vorgängerwert** immer gleich ist.`,
  "\n\n" +
    legend(
      [R`$B_0$`, "der Startwert: der Wert ganz am Anfang"],
      [R`$B$`, R`der Bestand. $B(n)$ ist der Wert nach $n$ Schritten.`],
      [R`$q$`, "der Wachstumsfaktor: Damit wird in jedem Schritt malgenommen."],
      [R`$p$`, "der Prozentsatz, um den der Wert in jedem Schritt wächst oder fällt"],
      [R`$n$`, "die Anzahl der Schritte, zum Beispiel Jahre"],
    ),
);
swap("L_MATH_FUNC", "Exponentielles Wachstum und Abnahme", R`| Bakterien verdoppeln sich jede Stunde | $N(t) = 80 \cdot 2^t$ |`, R`| 80 Bakterien verdoppeln sich jede Stunde | nach $n$ Stunden: $80 \cdot 2^n$ |`);
swap("L_MATH_FUNC", "Exponentielles Wachstum und Abnahme", R`| Ein Auto verliert jährlich 20 % an Wert | $W(t) = 15\,000 \cdot 0{,}8^t$ |`, R`| Ein Auto für 15 000 € verliert jährlich 20 % an Wert | nach $n$ Jahren: $15\,000 \cdot 0{,}8^n$ |`);

// ---------------------------------------------------------------- Ebene Figuren
body(
  "L_MATH_GEO_FLAECHE",
  "Begriffe",
  [
    R`- Ein **Vieleck** hat mehrere Ecken. $n$ ist die Anzahl der Ecken. Ein **regelmäßiges** Vieleck hat lauter gleiche Seiten und Winkel (regelmäßiges Viereck = Quadrat).`,
    R`- **Punkte** heißen $A, B, C$ (Großbuchstaben), **Seiten** heißen $a, b, c$ (Kleinbuchstaben). Im Dreieck liegt Seite $a$ **gegenüber** von Punkt $A$.`,
    R`- **Winkel** heißen $\alpha$, $\beta$, $\gamma$ (Alpha, Beta, Gamma). Der Winkel $\alpha$ liegt an der Ecke $A$.`,
    R`- **Kreis**: Alle Punkte sind gleich weit vom Mittelpunkt entfernt. Dieser Abstand ist der **Radius** $r$. Der **Durchmesser** $d$ geht einmal quer durch die Mitte: $d = 2r$.`,
    R`- **Punkt** $P$ im Koordinatensystem: $P(x \,|\, y)$ — **erst $x$** (waagerecht), **dann $y$** (senkrecht).`,
  ].join("\n"),
);
body(
  "L_MATH_GEO_FLAECHE",
  "Flächen, die du auswendig können musst",
  P(
    legend(
      [R`$A$`, "der Flächeninhalt: wie viel Platz die Figur bedeckt"],
      [R`$u$`, "der Umfang: einmal außen herum"],
      [R`$a$, $b$`, R`die Seitenlängen. $a$ ist meist die Grundseite, also die Seite unten.`],
      [R`$c$`, R`beim Trapez: die Seite, die parallel zu $a$ liegt`],
      [R`$h$`, "die Höhe: der senkrechte Abstand von der Grundseite nach oben"],
      [R`$r$`, "der Radius: von der Mitte des Kreises bis zum Rand"],
      [R`$d$`, "der Durchmesser: einmal quer durch die Mitte, also zweimal der Radius"],
      PI,
    ),
    forms(
      [R`**Rechteck**: $A = a \cdot b$`, "Länge mal Breite"],
      [R`$u = 2a + 2b$`, "zweimal die Länge plus zweimal die Breite"],
      [R`**Quadrat**: $A = a^2$`, "Seite mal Seite"],
      [R`$u = 4a$`, "vier gleich lange Seiten"],
      [R`**Parallelogramm**: $A = a \cdot h$`, "Grundseite mal **Höhe**, nicht mal die schräge Seite"],
      [R`**Dreieck**: $A = \frac{1}{2} \cdot a \cdot h$`, "die Hälfte von Grundseite mal Höhe"],
      [R`**Trapez**: $A = \frac{1}{2}(a + c) \cdot h$`, "die beiden parallelen Seiten zusammenzählen, halbieren, mal die Höhe"],
      [R`**Kreis**: $A = \pi \cdot r^2$`, "Pi mal Radius mal Radius"],
      [R`$u = 2 \cdot \pi \cdot r = \pi \cdot d$`, "zweimal Pi mal Radius. Das ist dasselbe wie Pi mal Durchmesser."],
    ),
  ),
);

// ---------------------------------------------------------------- Pythagoras und Trigonometrie
swap("L_MATH_GEO_PYTH_TRIG", "Trigonometrie: die Seiten vom Winkel aus gesehen", R`vom Winkel $\alpha$ aus:`, R`vom **Winkel** $\alpha$ (Alpha) aus:`);
add("L_MATH_GEO_PYTH_TRIG", "So rechnest du", R`**Beispiel 1, Seite gesucht:**`, R`$\alpha$ und $\beta$ sind die Namen der Winkel (Alpha und Beta).

`, true);
append(
  "L_MATH_GEO_PYTH_TRIG",
  "Beliebige Dreiecke: Sinussatz und Kosinussatz (Formelblatt)",
  legend(
    [R`$a$, $b$, $c$`, "die drei Seiten des Dreiecks"],
    [R`$\alpha$, $\beta$, $\gamma$`, R`die drei Winkel Alpha, Beta und Gamma. $\alpha$ liegt gegenüber von $a$, $\beta$ gegenüber von $b$, $\gamma$ gegenüber von $c$.`],
  ),
);

for (const f of Object.keys(files)) fs.writeFileSync(path.join(dir, f), JSON.stringify(files[f], null, 2) + "\n");
console.log("letters explained on the maths Spickzettel");
