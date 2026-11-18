// P_MATH_KOERPER to the standard: boards and both figures stay; chapters, tap tasks and hints are added.
// Terms (Oberfläche, Grundfläche, Prisma, Zylinder, Radius, Durchmesser, Pyramide, Kegel) are now explained
// on the board where they first appear. New: one practice board (which formula?) and a summary board.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_09c_koerper.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH", "P_MATH_POTENZ", "P_MATH_EINHEITEN", "P_MATH_GEO_BEGRIFFE"];
  p.outro = "Das Volumen ist die Füllmenge, und die Oberfläche ist die Verpackung. Bei Körpern mit geraden Wänden rechnest du Boden mal Höhe. Bei spitzen Körpern nimmst du davon ein Drittel. Damit kannst du jetzt das Formelblatt lesen.";

  // --- chapter 1 ---
  h.body("Volumen: wie viel passt rein", "Quader 4 · 3 · 2:", "$V = 4 \\cdot 3 \\cdot 2 = 24\\ \\text{cm}^3$", "Der Buchstabe $V$ steht für das Volumen.", "24 Würfel von 1 cm Kante.");
  h.say("Volumen: wie viel passt rein", "Das Volumen ist die Füllmenge, also das, was in einen Körper hineinpasst. Beim Quader nimmst du Länge, Breite und Höhe miteinander mal. Die Einheit hat eine kleine 3, weil drei Längen malgenommen werden.");
  h.tasks("Volumen: wie viel passt rein", k("Quader mit 2 cm, 2 cm und 5 cm. $V = $ ___", "$20\\ \\text{cm}^3$", ["$9\\ \\text{cm}^3$"], "2 mal 2 ist 4, und 4 mal 5 ergibt 20.", "Nimm die drei Längen miteinander mal."));
  h.body("Oberfläche: die Verpackung", "Die **Oberfläche** sind alle Flächen außen zusammen.", "Quader: 6 Rechtecke, je zwei gleich", "$O = 2 \\cdot (4 \\cdot 3 + 4 \\cdot 2 + 3 \\cdot 2) = 52\\ \\text{cm}^2$", "Der Buchstabe $O$ steht für die Oberfläche.");
  h.say("Oberfläche: die Verpackung", "Stell dir vor, du packst den Körper in Geschenkpapier ein. Die Menge Papier, die du brauchst, ist die Oberfläche. Ein Quader hat sechs Seiten, und gegenüberliegende Seiten sind gleich groß. Weil es eine Fläche ist, steht dahinter Quadratzentimeter.");
  h.tasks("Oberfläche: die Verpackung", k("Ein Würfel hat 6 gleiche Seiten. Jede ist $4\\ \\text{cm}^2$ groß. Seine Oberfläche ist ___.", "$24\\ \\text{cm}^2$", ["$24\\ \\text{cm}^3$"], "Sechs Flächen mit je 4 Quadratzentimetern ergeben 24. Es bleibt eine Fläche, also Quadratzentimeter.", "Die Zahl 24 stimmt bei beiden. Schau auf die Einheit: Welche kleine Hochzahl gehört zu einer Fläche?"));
  h.say("Liter", "Sobald es in einer Aufgabe um Wasser, Saft oder Farbe geht, taucht das Wort Liter auf. Das ist nur ein anderer Name für dieselbe Sache. Ein Milliliter ist ein Kubikzentimeter, und tausend davon ergeben einen Liter.");
  h.tasks("Liter", k("$2000\\ \\text{cm}^3$ sind ___.", "2 Liter", ["20 Liter"], "Tausend Kubikzentimeter sind ein Liter. Zweitausend sind dann zwei.", "Wie viele Kubikzentimeter ergeben zusammen einen ganzen Liter?"));
  h.body("Grundfläche mal Höhe", "Quader, **Zylinder** (eine Dose) und **Prisma** (eine Säule mit eckigem Boden):", "$V = G \\cdot h$", "$G$ ist die **Grundfläche**, also der Boden. $h$ ist die Höhe.");
  h.say("Grundfläche mal Höhe", "Alle Körper mit geraden Wänden haben dieselbe Formel. Du rechnest zuerst aus, wie groß der Boden ist. Dann nimmst du diese Fläche mal die Höhe. Nur der Boden sieht je nach Körper anders aus: mal ein Rechteck, mal ein Kreis, mal ein Dreieck. Auf dem Formelblatt heißt die Grundfläche A mit einem kleinen G und die Oberfläche A mit einem kleinen O.");
  h.tasks("Grundfläche mal Höhe", k("Die Grundfläche ist $12\\ \\text{cm}^2$, die Höhe 5 cm. $V = $ ___", "$60\\ \\text{cm}^3$", ["$17\\ \\text{cm}^3$"], "Boden mal Höhe: 12 mal 5 ergibt 60.", "Die Formel heißt Boden mal Höhe. Rechnest du plus oder mal?"));

  // --- chapter 2 ---
  h.body("Der Zylinder", "Der Boden ist ein Kreis: $G = \\pi \\cdot r^2$", "Der **Radius** $r$ reicht von der Mitte zum Rand. Der **Durchmesser** ist doppelt so lang.", "$V = \\pi \\cdot 3^2 \\cdot 10 \\approx 283\\ \\text{cm}^3$");
  h.say("Der Zylinder", "Ein Zylinder ist eine Dose. Du rechnest die Fläche des Kreises aus und nimmst sie mal die Höhe. Das Zeichen in der Formel heißt Pi und steht für die Zahl 3,14. Dein Taschenrechner hat dafür eine eigene Taste. Achte darauf, ob in der Aufgabe der Radius oder der Durchmesser steht.");
  h.tasks("Der Zylinder", k("Der Durchmesser einer Dose ist 10 cm. Der Radius ist ___.", "5 cm", ["20 cm"], "Der Radius ist die Hälfte vom Durchmesser.", "Der Radius reicht nur von der Mitte bis zum Rand."));
  h.body("Der Mantel", "Der **Mantel** ist die Wand außen herum, ohne Deckel und Boden.", "Abgerollt ein Rechteck: $M = U \\cdot h = 2\\pi r \\cdot h$", "$M$ steht für den Mantel, $U$ für den Umfang des Kreises.");
  h.say("Der Mantel", "Schneide in Gedanken das Etikett einer Dose auf und leg es flach auf den Tisch. Du siehst ein Rechteck. Seine Breite ist der Umfang des Kreises, und seine Höhe ist die Höhe der Dose. Deshalb rechnest du für den Mantel Umfang mal Höhe.");
  h.tasks("Der Mantel", k("Eine Dose hat den Umfang 20 cm und die Höhe 10 cm. Ihr Mantel ist ___ groß.", "$200\\ \\text{cm}^2$", ["$30\\ \\text{cm}^2$"], "Abgerollt ist der Mantel ein Rechteck. Du rechnest Umfang mal Höhe, also 20 mal 10.", "Das abgerollte Etikett ist ein Rechteck. Wie berechnest du dessen Fläche?"));
  h.body("Spitze Körper: ein Drittel", "Eine **Pyramide** hat einen eckigen Boden und eine Spitze.", "Ein **Kegel** hat einen runden Boden und eine Spitze.", "$V = \\frac{1}{3} \\cdot G \\cdot h$");
  h.say("Spitze Körper: ein Drittel", "Ein Kegel sieht aus wie eine Eistüte. In einen Quader passen genau drei Pyramiden mit demselben Boden und derselben Höhe. Deshalb steht in der Formel ein Drittel. Du rechnest also Boden mal Höhe und teilst das Ergebnis durch 3.");
  h.tasks("Spitze Körper: ein Drittel", k("Ein Kegel hat $G = 30\\ \\text{cm}^2$ und $h = 10$ cm. $V = $ ___", "$100\\ \\text{cm}^3$", ["$300\\ \\text{cm}^3$"], "Boden mal Höhe ergibt 300. Ein Drittel davon ist 100.", "Boden mal Höhe ergibt 300. Was fehlt noch bei spitzen Körpern?"));
  h.say("Die Kugel", "Diese beiden Formeln musst du nicht herleiten können. Es reicht, wenn du sie auf dem Formelblatt findest und richtig abliest. Achte auf die Hochzahl: Beim Volumen steht r hoch 3, bei der Oberfläche steht r hoch 2. Das passt zu den Einheiten.");
  h.tasks("Die Kugel", k("Du suchst das Volumen einer Kugel. Welche Zeile vom Formelblatt nimmst du? ___", "$V = \\frac{4}{3} \\cdot \\pi \\cdot r^3$", ["$O = 4 \\cdot \\pi \\cdot r^2$"], "Das Volumen hat den Buchstaben V, und in seiner Formel steht r hoch 3.", "Mit welchem Buchstaben wird das Volumen abgekürzt?"));
  h.after(
    "Die Kugel",
    b("Jetzt du: Was wird gesucht?", "Tipp bei jeder Aufgabe auf das Richtige.", "In Textaufgaben musst du zuerst herausfinden, was gesucht ist. Geht es darum, was hineinpasst, dann brauchst du das Volumen. Geht es um die Hülle, dann brauchst du die Oberfläche. Danach schaust du, ob der Körper gerade Wände oder eine Spitze hat.", {
      tasks: [
        k("Wie viel Papier braucht man, um einen Karton einzupacken? Gesucht ist ___.", "die Oberfläche", ["das Volumen"], "Das Papier bedeckt den Karton von außen. Das ist die Verpackung.", "Geht es um die Hülle oder um das, was hineinpasst?"),
        k("Wie viel Suppe passt in eine Dose? Du rechnest ___.", "$V = G \\cdot h$", ["$V = \\frac{1}{3} \\cdot G \\cdot h$"], "Eine Dose hat gerade Wände. Dafür gilt Boden mal Höhe.", "Hat eine Dose gerade Wände oder eine Spitze?"),
        k("Wie viel Luft ist in einem Zelt in Form einer Pyramide? Du rechnest ___.", "$V = \\frac{1}{3} \\cdot G \\cdot h$", ["$V = G \\cdot h$"], "Eine Pyramide läuft spitz zu. Deshalb kommt das Drittel dazu.", "Hat das Zelt gerade Wände oder läuft es oben zusammen?"),
      ],
    }),
    b("Das nimmst du mit", ["(1) Volumen: was hineinpasst, in $\\text{cm}^3$.", "(2) Oberfläche: die Verpackung, in $\\text{cm}^2$.", "(3) Gerade Wände: Boden mal Höhe.", "(4) Spitze Körper: ein Drittel davon.", "(5) 1000 $\\text{cm}^3$ sind ein Liter."], "Das sind die fünf Dinge, die du aus dieser Lektion brauchst. Die Formeln selbst stehen auf dem Formelblatt. Deine Aufgabe ist es, die richtige auszuwählen und die Zahlen einzusetzen. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("In einen Eimer passen 10 Liter. Das ist sein ___.", "Volumen", ["Mantel"], "Was in einen Körper hineinpasst, ist sein Volumen.", "Geht es um das, was hineinpasst, oder um die Wand außen?")],
    }),
  );

  // Small steps: the circle is taught before the can needs it, and the Mantel formula is built in two boards.
  h.before(
    "Der Zylinder",
    b("Der Kreis", ["Der Boden einer Dose ist ein Kreis.", "Der **Radius** $r$ reicht von der Mitte bis zum Rand.", "Der **Durchmesser** $d$ geht einmal quer durch die Mitte.", "$d = 2 \\cdot r$"], "Bevor wir zur Dose kommen, schauen wir uns den Kreis an, denn der Boden einer Dose ist ein Kreis. Zwei Längen sind wichtig. Der Radius geht von der Mitte bis zum Rand. Der Durchmesser geht von Rand zu Rand durch die Mitte und ist deshalb doppelt so lang.", {
      figure: { type: "circle", labels: { r: "r", d: "d" } },
      tasks: [k("Der Durchmesser einer Dose ist 10 cm. Der Radius ist ___.", "5 cm", ["20 cm"], "Der Radius ist die Hälfte vom Durchmesser.", "Der Radius reicht nur von der Mitte bis zum Rand.")],
    }),
    b("Umfang des Kreises", ["Wie lang ist der Rand eines Kreises?", "Nimm den Durchmesser mal 3,14.", "Die Zahl 3,14 heißt **Pi**. Ihr Zeichen ist $\\pi$.", "$U = \\pi \\cdot d$", "Beispiel: $d = 10$ cm", "$U \\approx 3{,}14 \\cdot 10 = 31{,}4$ cm"], "Leg einen Faden einmal um einen Teller und miss ihn. Er ist immer etwas mehr als dreimal so lang, wie der Teller breit ist. Genauer gesagt 3,14-mal. Diese Zahl ist bei jedem Kreis gleich. Sie heißt Pi, und dein Taschenrechner hat dafür eine eigene Taste.", {
      figure: { type: "circle", labels: { d: "d = 10 cm", u: "U ≈ 31,4 cm" } },
      tasks: [k("Ein Teller hat den Durchmesser 20 cm. Sein Rand ist etwa ___ lang.", "62,8 cm", ["23,14 cm"], "Durchmesser mal Pi: 20 mal 3,14 ergibt 62,8.", "Rechnest du den Durchmesser mal Pi oder plus Pi?")],
    }),
    b("Umfang mit dem Radius", ["Oft kennst du nur den Radius.", "Zwei Radien sind ein Durchmesser: $d = 2 \\cdot r$", "Also: $U = \\pi \\cdot 2 \\cdot r$", "Auf dem Formelblatt steht die 2 vorn:", "$U = 2 \\cdot \\pi \\cdot r$"], "In vielen Aufgaben steht nur der Radius. Das macht nichts, denn zwei Radien ergeben den Durchmesser. Du verdoppelst also den Radius und nimmst das Ergebnis mal Pi. Auf dem Formelblatt steht die Zwei ganz vorn. Das ist dieselbe Rechnung, nur in anderer Reihenfolge.", {
      figure: { type: "circle", labels: { r: "r", u: "U = 2 · π · r" } },
      tasks: [k("$r = 5$ cm. Der Umfang ist etwa ___.", "31,4 cm", ["15,7 cm"], "Zweimal 5 ist 10, und 10 mal 3,14 ergibt 31,4.", "Verdopple zuerst den Radius. Was kommt danach?")],
    }),
    b("Fläche des Kreises", ["$A = \\pi \\cdot r \\cdot r$", "Kürzer geschrieben: $A = \\pi \\cdot r^2$", "Beispiel: $r = 3$ cm", "$3 \\cdot 3 = 9$", "$A \\approx 3{,}14 \\cdot 9 = 28{,}3\\ \\text{cm}^2$"], "Für die Fläche brauchst du den Radius zweimal. Du nimmst ihn mit sich selbst mal und danach mal Pi. Die kleine 2 ist nur die kurze Schreibweise für Radius mal Radius. Weil es eine Fläche ist, steht am Ende Quadratzentimeter.", {
      figure: { type: "circle", labels: { r: "r = 3 cm" } },
      tasks: [k("$r = 2$ cm. Die Kreisfläche ist etwa ___.", "$12{,}6\\ \\text{cm}^2$", ["$6{,}3\\ \\text{cm}^2$"], "2 mal 2 ist 4, und 4 mal 3,14 ergibt etwa 12,6.", "Rechne zuerst Radius mal Radius. Erst danach kommt Pi.")],
    }),
  );
  h.body("Der Zylinder", "Eine Dose: Der Boden ist ein Kreis.", "Boden: $G = \\pi \\cdot r^2$", "Volumen: Boden mal Höhe", "Beispiel: $r = 3$ cm und $h = 10$ cm", "Boden: $G \\approx 28{,}3\\ \\text{cm}^2$", "Volumen: $V \\approx 28{,}3 \\cdot 10 = 283\\ \\text{cm}^3$");
  h.say("Der Zylinder", "Ein Zylinder ist eine Dose. Ihr Boden ist ein Kreis, und dessen Fläche kannst du jetzt ausrechnen. Danach gilt dieselbe Regel wie beim Quader: Boden mal Höhe. Du rechnest also in zwei Schritten, erst den Boden und dann das Volumen.");
  h.tasks("Der Zylinder", k("Eine Dose hat den Boden $G = 50\\ \\text{cm}^2$ und die Höhe 8 cm. $V = $ ___", "$400\\ \\text{cm}^3$", ["$58\\ \\text{cm}^3$"], "Boden mal Höhe: 50 mal 8 ergibt 400.", "Gilt bei der Dose Boden mal Höhe oder Boden plus Höhe?"));
  h.body("Der Mantel", "Der **Mantel** ist die Wand außen herum, ohne Deckel und Boden.", "Rolle das Etikett ab: Es ist ein Rechteck.", "Breite: der Umfang $U$ des Kreises", "Höhe: $h$", "$M = U \\cdot h$", "$M$ steht für den Mantel.");
  h.after(
    "Der Mantel",
    b("Der Mantel mit dem Radius", ["Kennst du nur den Radius? Rechne zuerst den Umfang aus.", "Beispiel: $r = 5$ cm und $h = 10$ cm", "Umfang: $U \\approx 31{,}4$ cm", "Mantel: $M \\approx 31{,}4 \\cdot 10 = 314\\ \\text{cm}^2$", "Das Formelblatt schreibt beides in eine Zeile:", "$M = 2 \\cdot \\pi \\cdot r \\cdot h$"], "Hier steckst du zwei Schritte zusammen, die du schon kannst. Zuerst rechnest du aus dem Radius den Umfang aus. Dann nimmst du den Umfang mal die Höhe. Das Formelblatt schreibt beide Schritte in eine einzige Zeile. Lies sie so: Zwei mal Pi mal Radius ist der Umfang, und dahinter steht mal Höhe.", {
      figure: { type: "cylinder", r: 5, h: 10, labels: { r: "r = 5 cm", h: "h = 10 cm" } },
      tasks: [k("$r = 1$ cm, also $U \\approx 6{,}28$ cm. Die Dose ist 10 cm hoch. $M \\approx$ ___", "$62{,}8\\ \\text{cm}^2$", ["$16{,}28\\ \\text{cm}^2$"], "Umfang mal Höhe: 6,28 mal 10 ergibt 62,8.", "Der Umfang steht schon da. Womit nimmst du ihn mal?")],
    }),
  );

  // Every board that talks about a shape shows it (drawings and try-it-out elements the app already has).
  h.board("Oberfläche: die Verpackung").figure = h.board("Volumen: wie viel passt rein").figure;
  h.board("Grundfläche mal Höhe").figures = [
    { caption: "Quader", figure: { type: "box", a: 4, b: 3, c: 3, labels: { c: "h" } } },
    { caption: "Zylinder", figure: { type: "cylinder", r: 2, h: 4, labels: { h: "h" } } },
    { caption: "Prisma", figure: { type: "prism", a: 4, h: 5, labels: { h: "h" } } },
  ];
  h.board("Der Mantel").figure = { type: "cylinder", r: 3, h: 10, labels: { r: "r", h: "h" } };
  h.board("Spitze Körper: ein Drittel").figures = [
    { caption: "Pyramide", figure: { type: "pyramid", a: 4, h: 5, labels: { h: "h" } } },
    { caption: "Kegel", figure: { type: "cone", r: 2, h: 5, labels: { h: "h" } } },
  ];
  h.board("Die Kugel").figure = { type: "sphere", labels: { r: "r" } };

  // Read-through: the surface is added up face by face.
  h.body("Oberfläche: die Verpackung", "Die **Oberfläche** sind alle Flächen außen zusammen.", "Boden und Deckel: $4 \\cdot 3 = 12$", "Vorn und hinten: $4 \\cdot 2 = 8$", "Links und rechts: $3 \\cdot 2 = 6$", "Jede Fläche gibt es zweimal:", "$O = 2 \\cdot (12 + 8 + 6) = 52\\ \\text{cm}^2$", "$O$ steht für die Oberfläche.");

  // Gentle start: count the small cubes in a box first; multiplying, the unit and the letter V come on the next board.
  h.before(
    "Volumen: wie viel passt rein",
    b("Wie viel passt hinein?", ["Ein Karton: 4 cm lang, 3 cm breit, 2 cm hoch.", "Wie viele Würfel mit 1 cm Kante passen hinein?", "Unten liegen 4 mal 3, also 12 Würfel.", "Darüber liegt eine zweite Schicht: zusammen 24.", "Diese Menge heißt **Volumen**."], "Stell dir kleine Würfel vor, jeder einen Zentimeter lang, breit und hoch. Du legst den Boden des Kartons damit aus und stapelst dann Schicht auf Schicht. Wenn der Karton voll ist, zählst du die Würfel. Diese Zahl sagt, wie viel hineinpasst.", {
      figure: { type: "box", a: 4, b: 3, c: 2, labels: { a: "4 cm", b: "3 cm", c: "2 cm" } },
      tasks: [k("In einem Karton liegen unten 6 Würfel, und es gibt 3 Schichten. Hinein passen ___ Würfel.", "18", ["9"], "Jede Schicht hat 6 Würfel. Drei Schichten sind 3 mal 6.", "Wie viele Würfel liegen in einer Schicht, und wie viele Schichten gibt es?")],
    }),
  );
  h.body("Volumen: wie viel passt rein", "Schneller geht es mit Rechnen: Länge mal Breite mal Höhe.", "$4 \\cdot 3 \\cdot 2 = 24$", "Die Einheit heißt Kubikzentimeter: $\\text{cm}^3$", "Für Volumen schreibt man kurz $V$: $V = 24\\ \\text{cm}^3$");

  h.chapters([
    ["Wie viel passt hinein?", "Volumen und Oberfläche"],
    ["Der Kreis", "Der Kreis und die Dose"],
    ["Spitze Körper: ein Drittel", "Spitze Körper und die Kugel"],
  ]);
  h.renameVocab({ "Volumen V": "Volumen", "Oberfläche O": "Oberfläche", "Grundfläche G": "Grundfläche", "Höhe h": "Höhe", "Mantel M": "Mantel", "Pyramide / Kegel": "Pyramide" });
  p.vocab.push({ term: "Kegel", plain: "Ein spitzer Körper mit einem Kreis als Boden, wie eine Eistüte.", example: "$V = \\frac{1}{3} G h$" });
  h.explain([
    "Du nimmst die drei Längen miteinander mal: 5 mal 2 mal 3 ergibt 30 Kubikzentimeter.",
    "Die Oberfläche ist eine Fläche. Flächen werden in Quadratzentimetern gemessen.",
    "1000 cm³ sind 1 Liter, also sind 500 cm³ ein halber.",
    "Der Mantel ist die Wand ohne Deckel und Boden. Abgerollt ist er ein Rechteck.",
    "Spitze Körper: ein Drittel von Boden mal Höhe.",
  ]);
  h.quiz(q("Ein Zylinder hat die Grundfläche 20 cm² und die Höhe 6 cm. Wie groß ist sein Volumen?", "120 cm³", ["40 cm³", "26 cm³", "120 cm²"], "Bei geraden Wänden rechnest du Boden mal Höhe. 20 mal 6 ergibt 120 Kubikzentimeter."));
});
