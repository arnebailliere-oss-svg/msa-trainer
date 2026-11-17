// P_MATH_GEO_BEGRIFFE to the standard: boards and all figures stay; chapters, tap tasks and hints are added.
// New: one practice board (perimeter or area?) and a summary board.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_09_geometrie.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_EINHEITEN"];
  p.hook = "In der Geometrie geht es um Formen. Die Prüfung fragt aber nach Zahlen: Wie lang ist der Rand? Wie groß ist das Innere? Wie weit ist eine Ecke geöffnet? Diese drei Fragen verwechselt man leicht. Deshalb sortieren wir sie einmal in Ruhe.";
  p.outro = "Der Umfang ist der Zaun, die Fläche ist das Gras, und ein Winkel ist eine Drehung. Im Dreieck liegt die Seite a gegenüber von der Ecke A. Damit kannst du jede Figur in der Lektion lesen.";

  // --- chapter 1 ---
  h.body("Umfang: einmal außen rum", "Rechteck 5 cm mal 3 cm.", "Der **Umfang** ist der Weg einmal außen herum.", "$U = 5 + 3 + 5 + 3 = 16$ cm", "Der Buchstabe $U$ steht für den Umfang.", "Der **Zaun** um die Wiese.");
  h.say("Umfang: einmal außen rum", "Stell dir vor, du läufst einmal außen um die Wiese herum. Die Strecke, die du dabei gehst, ist der Umfang. Du zählst dafür alle vier Seiten zusammen. Weil es eine Länge ist, steht dahinter Zentimeter.");
  h.tasks("Umfang: einmal außen rum", k("Rechteck 4 cm mal 1 cm. Der Umfang ist ___.", "10 cm", ["5 cm"], "Alle vier Seiten zusammen: 4 plus 1 plus 4 plus 1.", "Wie viele Seiten hat ein Rechteck? Zähl alle zusammen."));
  h.body("Fläche: was drin ist", "$A = 5 \\cdot 3 = 15\\ \\text{cm}^2$", "Der Buchstabe $A$ steht für die Fläche.", "Das **Gras** auf der Wiese.", "Die Größe der Fläche heißt **Flächeninhalt**.", "Gemessen in **Quadrat**-Zentimetern.");
  h.say("Fläche: was drin ist", "Die Fläche ist das, was innerhalb des Randes liegt. Beim Rechteck rechnest du Länge mal Breite. Weil du dabei Zentimeter mal Zentimeter rechnest, bekommt die Einheit eine kleine 2. Man liest das Quadratzentimeter.");
  h.tasks("Fläche: was drin ist", k("Rechteck 4 cm mal 2 cm. Die Fläche ist ___.", "$8\\ \\text{cm}^2$", ["$12\\ \\text{cm}^2$"], "Länge mal Breite: 4 mal 2 ergibt 8.", "Rechnest du bei der Fläche plus oder mal?"));
  h.say("Die kleine 2", "Die 15 Quadratzentimeter kannst du dir als 15 kleine Kästchen vorstellen, jedes einen Zentimeter lang und breit. Die kleine 2 ist ein gutes Erkennungszeichen. Siehst du sie in der Prüfung, geht es um eine Fläche. Steht nur Zentimeter da, geht es um eine Länge oder einen Umfang.");
  h.tasks("Die kleine 2", k("In einer Aufgabe steht $24\\ \\text{m}^2$. Gemeint ist ___.", "eine Fläche", ["ein Umfang"], "Die kleine 2 an der Einheit zeigt, dass es um eine Fläche geht.", "Was verrät die kleine 2 an der Einheit?"));
  h.after(
    "Die kleine 2",
    b("Jetzt du: Zaun oder Gras?", "Tipp an, ob nach dem Umfang oder nach der Fläche gefragt ist.", "In Textaufgaben steht selten das Wort Umfang oder Fläche. Du musst es aus der Geschichte herauslesen. Frag dich jedes Mal: Geht es um den Rand, also um den Zaun? Oder geht es um das Innere, also um das Gras?", {
      tasks: [
        k("Ein Beet bekommt ringsherum eine Kante aus Holz. Gesucht ist ___.", "der Umfang", ["die Fläche"], "Die Kante läuft einmal außen um das Beet herum.", "Liegt das Holz am Rand oder bedeckt es das ganze Beet?"),
        k("Ein Zimmer bekommt einen neuen Teppich. Gesucht ist ___.", "die Fläche", ["der Umfang"], "Der Teppich bedeckt den ganzen Boden, also das Innere.", "Liegt der Teppich nur am Rand oder auf dem ganzen Boden?"),
        k("Ein Bild bekommt einen Rahmen. Gesucht ist ___.", "der Umfang", ["die Fläche"], "Der Rahmen läuft einmal außen um das Bild herum.", "Wo sitzt ein Rahmen: am Rand oder in der Mitte?"),
      ],
    }),
  );

  // --- chapter 2 ---
  h.say("Das Dreieck beschriften", "Für Dreiecke gibt es eine feste Ordnung. Die Ecken bekommen große Buchstaben und die Seiten kleine. Die Seite a liegt immer gegenüber von der Ecke A. Die Winkel bekommen griechische Buchstaben: Alpha, Beta und Gamma.");
  h.tasks("Das Dreieck beschriften", k("Gegenüber von der Ecke C liegt die Seite ___.", "c", ["a"], "Jede Seite liegt gegenüber der Ecke mit demselben Buchstaben.", "Welcher kleine Buchstabe gehört zum großen C?"));
  h.say("Was ist ein Winkel?", "Ein Winkel misst, wie weit sich etwas dreht. Die Einheit heißt Grad, und ihr Zeichen ist der kleine Kreis. Eine ganze Drehung hat 360 Grad. Ein Viertel davon sind 90 Grad, das ist die Ecke von jedem Blatt Papier.");
  h.tasks("Was ist ein Winkel?", k("Eine halbe Drehung hat ___.", "180°", ["90°"], "Eine ganze Drehung hat 360 Grad. Die Hälfte davon sind 180 Grad.", "Wie viel Grad hat eine ganze Drehung? Nimm davon die Hälfte."));
  h.say("Winkel-Sorten", "Die Namen kannst du dir mit Bildern merken. Ein spitzer Winkel sieht aus wie die Spitze von einem Stück Pizza. Ein stumpfer Winkel sieht aus wie ein weit aufgeklappter Laptop. Die Grenze zwischen beiden ist der rechte Winkel mit genau 90 Grad.");
  h.tasks("Winkel-Sorten", k("Ein Winkel von 40° ist ___.", "spitz", ["stumpf"], "40 Grad sind weniger als 90 Grad.", "Ist der Winkel kleiner oder größer als die Ecke von einem Blatt Papier?"));
  h.body("Winkelsumme im Dreieck", "$\\alpha + \\beta + \\gamma = 180°$", "Das ist die **Winkelsumme**.", "Beispiel: $\\alpha = 70°$ und $\\beta = 60°$", "$\\gamma = 180° - 70° - 60° = 50°$");
  h.say("Winkelsumme im Dreieck", "Das gilt in jedem Dreieck, egal wie es aussieht: Die drei Winkel ergeben zusammen immer 180 Grad. Wenn du zwei Winkel kennst, ziehst du beide von 180 ab. Was übrig bleibt, ist der dritte Winkel.");
  h.tasks("Winkelsumme im Dreieck", k("$\\alpha = 100°$ und $\\beta = 30°$. Dann ist $\\gamma = $ ___", "50°", ["230°"], "100 plus 30 sind 130. Bis 180 fehlen noch 50.", "Wie viel fehlt von 130 bis 180?"));
  h.say("Die Höhe", "Die Höhe geht von einer Ecke gerade hinunter auf die Seite gegenüber, wie ein Lot. Senkrecht bedeutet, dass dort ein rechter Winkel entsteht. Und warum wird durch 2 geteilt? Ein Dreieck ist ein halbes Rechteck. Zeichne die andere Hälfte dazu, dann siehst du es.");
  h.tasks("Die Höhe", k("Dreieck mit $g = 6$ cm und $h = 4$ cm. Die Fläche ist ___.", "$12\\ \\text{cm}^2$", ["$24\\ \\text{cm}^2$"], "6 mal 4 ist 24, und die Hälfte davon ist 12.", "Du hast 6 mal 4 gerechnet. Was fehlt noch, weil es ein Dreieck ist?"));
  h.say("Gleichschenklig und gleichseitig", "Bei einem gleichschenkligen Dreieck sind zwei Seiten gleich lang. Die beiden Winkel an der dritten Seite sind dann auch gleich groß. Das wird in der Prüfung fast jedes Jahr gebraucht. Beim gleichseitigen Dreieck ist alles gleich, und jeder Winkel hat 60 Grad.");
  h.tasks("Gleichschenklig und gleichseitig", k("In einem gleichseitigen Dreieck hat jeder Winkel ___.", "60°", ["90°"], "Drei gleiche Winkel teilen sich 180 Grad. Das sind 60 Grad für jeden.", "Wie viel ist 180 geteilt durch 3?"));
  h.after(
    "Gleichschenklig und gleichseitig",
    b("Das nimmst du mit", ["(1) Umfang: der Rand, in cm.", "(2) Fläche: das Innere, in $\\text{cm}^2$.", "(3) Seite a liegt gegenüber von Ecke A.", "(4) Die Winkel im Dreieck ergeben zusammen 180°.", "(5) Dreieck: Grundseite mal Höhe, geteilt durch 2."], "Das sind die fünf Dinge, die du aus dieser Lektion brauchst. Wenn du bei einer Aufgabe unsicher bist, denk an die Wiese mit dem Zaun und dem Gras. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("Das Ergebnis einer Aufgabe ist $30\\ \\text{cm}^2$. Berechnet wurde ___.", "eine Fläche", ["ein Umfang"], "Die kleine 2 an der Einheit zeigt, dass es eine Fläche ist.", "Was verrät die kleine 2 an der Einheit?")],
    }),
  );

  // Every board that talks about a shape shows it (drawings and try-it-out elements the app already has).
  h.board("Fläche: was drin ist").figure = h.board("Umfang: einmal außen rum").figure;
  h.board("Was ist ein Winkel?").figures = [
    { caption: "einmal ganz herum: 360°", figure: { type: "angle", deg: 360, label: "360°" } },
    { caption: "ein Viertel davon: 90°", figure: { type: "angle", deg: 90, label: "90°" } },
  ];
  h.board("Winkel-Sorten").figures = [
    { caption: "spitz", figure: { type: "angle", deg: 45, label: "45°" } },
    { caption: "rechter Winkel", figure: { type: "angle", deg: 90, label: "90°" } },
    { caption: "stumpf", figure: { type: "angle", deg: 130, label: "130°" } },
    { caption: "gestreckt", figure: { type: "angle", deg: 180, label: "180°" } },
  ];
  h.board("Winkelsumme im Dreieck").figure = { type: "triangle", alpha: 70, beta: 60, labels: { alpha: "70°", beta: "60°", gamma: "γ" } };
  h.board("Gleichschenklig und gleichseitig").figures = [
    { caption: "gleichschenklig", figure: { type: "triangle", alpha: 70, beta: 70, labels: { alpha: "70°", beta: "70°" } } },
    { caption: "gleichseitig", figure: { type: "triangle", alpha: 60, beta: 60, labels: { alpha: "60°", beta: "60°", gamma: "60°" } } },
  ];

  // Read-through: the triangle area gets a worked example.
  h.body("Die Höhe", "Die **Höhe** $h$ steht **senkrecht** auf der Grundseite $g$.", "Dreieck: $A = \\frac{g \\cdot h}{2}$", "Beispiel: $g = 8$ cm und $h = 5$ cm", "$8 \\cdot 5 = 40$, die Hälfte ist $20\\ \\text{cm}^2$");

  // New topics: Parallelogramm, Trapez and Kreis are on the Spickzettel, so they are taught here from zero.
  h.before(
    "Das nimmst du mit",
    b("Das Parallelogramm", ["Ein **Parallelogramm** ist ein schief gedrücktes Rechteck.", "Gegenüberliegende Seiten sind gleich lang.", "Fläche: Grundseite mal Höhe", "$A = g \\cdot h$", "Die Höhe steht senkrecht auf der Grundseite. Die schräge Seite zählt nicht."], "Schneide in Gedanken links das schräge Dreieck ab und setz es rechts wieder an. Dann hast du ein Rechteck mit derselben Grundseite und derselben Höhe. Deshalb rechnest du wie beim Rechteck. Die schräge Seite brauchst du nur für den Umfang.", {
      figure: { type: "parallelogram", a: 5, h: 2.5, offset: 1.5, labels: { a: "g", h: "h" } },
      tasks: [k("Ein Parallelogramm hat die Grundseite 6 cm, die Höhe 3 cm und die schräge Seite 4 cm. Seine Fläche ist ___.", "$18\\ \\text{cm}^2$", ["$24\\ \\text{cm}^2$"], "Grundseite mal Höhe: 6 mal 3 ergibt 18. Die schräge Seite zählt nicht.", "Welche der beiden Längen steht senkrecht auf der Grundseite?")],
    }),
    b("Das Trapez", ["Ein **Trapez** hat zwei Seiten, die parallel liegen: $a$ und $c$.", "Parallel heißt: Sie laufen nebeneinander her wie Schienen.", "Die beiden Seiten sind verschieden lang.", "Die Höhe $h$ ist der Abstand zwischen ihnen."], "Ein Trapez sieht aus wie ein Rechteck, bei dem eine Seite kürzer geraten ist. Denk an einen Blumentopf von der Seite oder an ein Dach. Wichtig sind drei Längen: die lange parallele Seite, die kurze parallele Seite und der Abstand dazwischen.", {
      figure: { type: "trapezoid", a: 6, c: 3, h: 2.5, labels: { a: "a", c: "c", h: "h" } },
      tasks: [k("Die parallelen Seiten sind 8 cm und 4 cm lang. Eine Linie genau in der Mitte dazwischen wäre ___ lang.", "6 cm", ["12 cm"], "Die Mitte zwischen 8 und 4 ist 6. Du zählst beide zusammen und halbierst.", "Zähl beide Längen zusammen und nimm davon die Hälfte.")],
    }),
    b("Fläche vom Trapez", ["Beispiel: $a = 8$ cm, $c = 4$ cm, $h = 5$ cm", "Mitte der parallelen Seiten: $(8 + 4) : 2 = 6$", "Mal die Höhe: $6 \\cdot 5 = 30\\ \\text{cm}^2$", "Auf dem Formelblatt steht dasselbe so:", "$A = \\frac{1}{2} \\cdot (a + c) \\cdot h$"], "Ein Trapez hat so viel Fläche wie ein Rechteck mit der mittleren Breite. Du zählst die beiden parallelen Seiten zusammen und halbierst. Das Ergebnis nimmst du mal die Höhe. Ein halb mal bedeutet in der Formel nichts anderes als die Hälfte.", {
      figure: { type: "trapezoid", a: 8, c: 4, h: 5, labels: { a: "a = 8", c: "c = 4", h: "h = 5" } },
      tasks: [k("Trapez mit $a = 10$ cm, $c = 6$ cm und $h = 2$ cm. Die Fläche ist ___.", "$16\\ \\text{cm}^2$", ["$32\\ \\text{cm}^2$"], "10 plus 6 ist 16, die Hälfte ist 8. 8 mal 2 ergibt 16.", "Hast du die beiden Seiten zusammengezählt und halbiert, bevor du mal die Höhe rechnest?")],
    }),
    b("Der Kreis", ["Alle Punkte auf dem Rand sind gleich weit von der Mitte entfernt.", "Der **Radius** $r$ reicht von der Mitte bis zum Rand.", "Der **Durchmesser** $d$ geht einmal quer durch die Mitte.", "$d = 2 \\cdot r$"], "Einen Kreis zeichnest du mit dem Zirkel. Die Spitze steht in der Mitte, und der Stift bleibt immer gleich weit von ihr weg. Dieser Abstand ist der Radius. Der Durchmesser geht von Rand zu Rand durch die Mitte und ist doppelt so lang.", {
      figure: { type: "circle", labels: { r: "r", d: "d" } },
      tasks: [k("Ein Fahrradreifen hat den Radius 30 cm. Sein Durchmesser ist ___.", "60 cm", ["15 cm"], "Der Durchmesser ist zweimal der Radius: 2 mal 30.", "Ist der Durchmesser länger oder kürzer als der Radius?")],
    }),
    b("Umfang vom Kreis", ["Der Rand ist etwa 3,14-mal so lang wie der Durchmesser.", "Die Zahl 3,14 heißt **Pi**. Ihr Zeichen ist $\\pi$.", "$U = \\pi \\cdot d$", "Beispiel: $d = 60$ cm", "$U \\approx 3{,}14 \\cdot 60 = 188{,}4$ cm"], "Leg ein Maßband einmal um einen Reifen. Die Länge ist immer etwas mehr als dreimal der Durchmesser, genauer 3,14-mal. Diese Zahl ist bei jedem Kreis dieselbe und heißt Pi. Dein Taschenrechner hat eine eigene Taste dafür. Kennst du nur den Radius, verdoppelst du ihn zuerst.", {
      figure: { type: "circle", labels: { d: "d = 60 cm", u: "U ≈ 188,4 cm" } },
      tasks: [k("Ein runder Tisch hat den Durchmesser 100 cm. Sein Rand ist etwa ___ lang.", "314 cm", ["103,14 cm"], "Durchmesser mal Pi: 100 mal 3,14 ergibt 314.", "Rechnest du den Durchmesser mal Pi oder plus Pi?")],
    }),
    b("Fläche vom Kreis", ["$A = \\pi \\cdot r \\cdot r$", "Kürzer geschrieben: $A = \\pi \\cdot r^2$", "Beispiel: $r = 10$ cm", "$10 \\cdot 10 = 100$", "$A \\approx 3{,}14 \\cdot 100 = 314\\ \\text{cm}^2$"], "Für die Fläche nimmst du den Radius mit sich selbst mal und dann mal Pi. Achte darauf, dass du wirklich den Radius nimmst. Steht in der Aufgabe der Durchmesser, halbierst du ihn zuerst. Das ist der häufigste Fehler bei Kreisaufgaben.", {
      figure: { type: "circle", labels: { r: "r = 10 cm" } },
      tasks: [k("Ein Kreis hat den Durchmesser 4 cm. Für die Fläche rechnest du mit $r = $ ___", "2 cm", ["4 cm"], "Die Formel braucht den Radius. Das ist die Hälfte vom Durchmesser.", "Steht in der Formel für die Fläche der Radius oder der Durchmesser?")],
    }),
  );

  h.chapters([
    ["Umfang: einmal außen rum", "Umfang und Fläche"],
    ["Das Dreieck beschriften", "Dreiecke und Winkel"],
    ["Das Parallelogramm", "Parallelogramm, Trapez und Kreis"],
  ]);
  h.renameVocab({ "Umfang U": "Umfang", "Flächeninhalt A": "Flächeninhalt", "Höhe h": "Höhe", "Grundseite g": "Grundseite" });
  h.explain([
    "Du zählst alle vier Seiten zusammen: 4 plus 2 plus 4 plus 2 ergibt 12 cm.",
    "Länge mal Breite: 4 mal 2 ergibt 8. Die Einheit ist Quadratzentimeter.",
    "Jede Seite liegt gegenüber der Ecke mit demselben Buchstaben.",
    "Die drei Winkel ergeben zusammen 180 Grad. 180 minus 90 minus 35 ergibt 55 Grad.",
    "Ein Winkel über 90 Grad und unter 180 Grad heißt stumpf.",
  ]);
  h.quiz(q("Dreieck mit Grundseite 10 cm und Höhe 3 cm. Wie groß ist die Fläche?", "15 cm²", ["30 cm²", "13 cm²", "26 cm²"], "Grundseite mal Höhe ergibt 30. Weil es ein Dreieck ist, nimmst du davon die Hälfte, also 15."));
  // New topics, words and quiz: added after the old quiz explanations.
  p.vocab.push(
    { term: "Parallelogramm", plain: "Ein schief gedrücktes Rechteck. Gegenüberliegende Seiten sind gleich lang.", example: "$A = g \\cdot h$" },
    { term: "Trapez", plain: "Ein Viereck mit zwei parallelen Seiten, die verschieden lang sind.", example: "$A = \\frac{1}{2} \\cdot (a + c) \\cdot h$" },
    { term: "Radius", plain: "Der Abstand von der Mitte eines Kreises bis zum Rand.", example: "$r$" },
    { term: "Durchmesser", plain: "Einmal quer durch die Mitte des Kreises. Doppelt so lang wie der Radius.", example: "$d = 2 \\cdot r$" },
    { term: "Pi", plain: "Die Zahl 3,14. So oft passt der Durchmesser in den Rand eines Kreises.", example: "$\\pi \\approx 3{,}14$" },
  );
  h.quiz(
    q("Ein Trapez hat die parallelen Seiten 6 cm und 4 cm und die Höhe 3 cm. Wie groß ist die Fläche?", "15 cm²", ["30 cm²", "13 cm²", "72 cm²"], "6 plus 4 ist 10, die Hälfte ist 5. 5 mal 3 ergibt 15 Quadratzentimeter."),
    q("Ein Kreis hat den Radius 5 cm. Wie lang ist sein Umfang ungefähr?", "31,4 cm", ["15,7 cm", "78,5 cm", "10 cm"], "Der Durchmesser ist 10 cm. 10 mal 3,14 ergibt 31,4 cm."),
  );
});
