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

  h.chapters([
    ["Umfang: einmal außen rum", "Umfang und Fläche"],
    ["Das Dreieck beschriften", "Dreiecke und Winkel"],
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
});
