// P_MATH_PYTH_TRIG to the standard: boards and both figures stay; chapters, tap tasks and hints are added.
// The worked examples are written line by line; new are one practice board and a summary board.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_09b_pythagoras.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH", "P_MATH_GLEICHUNG", "P_MATH_POTENZ", "P_MATH_GEO_BEGRIFFE"];
  p.outro = "Du kennst jetzt die rechte Ecke, die Katheten und die Hypotenuse. Für den Satz des Pythagoras brauchst du Quadrate, für sin, cos und tan brauchst du Brüche. Damit kannst du die Formeln in der Lektion lesen.";

  // --- chapter 1 ---
  h.body("Das rechtwinklige Dreieck", "Eine Ecke hat **genau 90°** (das kleine Quadrat).", "Das ist ein **rechter Winkel**.", "Die längste Seite liegt **gegenüber** vom rechten Winkel.");
  h.say("Das rechtwinklige Dreieck", "Alles in dieser Lektion braucht diese eine rechte Ecke. Du erkennst sie im Bild an dem kleinen Quadrat. Hat ein Dreieck keinen rechten Winkel, gilt nichts von dem, was jetzt kommt. Schau deshalb bei jeder Aufgabe zuerst nach dieser Ecke.");
  h.tasks("Das rechtwinklige Dreieck", k("Ein Dreieck hat die Seiten 6 cm, 8 cm und 10 cm und einen rechten Winkel. Gegenüber vom rechten Winkel liegt die Seite mit ___.", "10 cm", ["6 cm"], "Gegenüber vom rechten Winkel liegt immer die längste Seite.", "Welche der drei Seiten ist die längste?"));
  h.say("Katheten und Hypotenuse", "Die Seiten haben eigene Namen, die aus dem Griechischen kommen. Die zwei Seiten, die den rechten Winkel bilden, heißen Katheten. Die dritte Seite liegt gegenüber und heißt Hypotenuse. Sie ist immer die längste der drei.");
  h.tasks("Katheten und Hypotenuse", k("Ein rechtwinkliges Dreieck hat die Seiten 3 cm, 4 cm und 5 cm. Die Hypotenuse ist ___ lang.", "5 cm", ["3 cm"], "Die Hypotenuse ist immer die längste Seite. Die beiden kürzeren sind die Katheten.", "Welche der drei Seiten ist die längste?"));
  h.body("Der Satz des Pythagoras", "$a^2 + b^2 = c^2$", "Beispiel: $a = 3$ und $b = 4$", "$9 + 16 = 25$, also $c^2 = 25$", "$c = 5$, denn $5 \\cdot 5 = 25$");
  h.say("Der Satz des Pythagoras", "Der Satz sagt: Wenn du beide Katheten mit sich selbst malnimmst und die Ergebnisse zusammenzählst, bekommst du das Quadrat der Hypotenuse. Mit den Zahlen 3, 4 und 5 geht das ohne Rest auf. Deshalb kommen sie in Aufgaben so oft vor.");
  h.tasks("Der Satz des Pythagoras", k("$a = 6$ und $b = 8$. Dann ist $a^2 + b^2 = $ ___", "100", ["14"], "6 mal 6 ist 36, und 8 mal 8 ist 64. Zusammen sind das 100.", "Rechne erst 6 mal 6 und 8 mal 8. Zähl dann zusammen."));
  h.say("Was heißt das als Bild?", "Stell dir auf jeder Seite des Dreiecks ein Quadrat vor. Die beiden kleinen Quadrate haben zusammen genau so viel Fläche wie das große. Mehr sagt der Satz nicht. Er vergleicht also Flächen und nicht die Seiten selbst.");
  h.tasks("Was heißt das als Bild?", k("Die kleinen Quadrate haben die Flächen 9 und 16. Das große hat ___.", "25", ["7"], "Die beiden kleinen Flächen zusammen ergeben die große: 9 plus 16.", "Zähl die beiden kleinen Flächen zusammen."));
  h.say("Hypotenuse berechnen", "Du gehst immer in drei Schritten vor. Zuerst nimmst du beide Katheten hoch 2. Dann zählst du die beiden Ergebnisse zusammen. Zum Schluss ziehst du die Wurzel, denn du suchst die Seite und nicht ihr Quadrat.");
  h.tasks("Hypotenuse berechnen", k("$c^2 = 49$. Dann ist $c = $ ___", "7", ["24,5"], "7 mal 7 ergibt 49. Die Wurzel halbiert nicht.", "Welche Zahl ergibt 49, wenn du sie mit sich selbst malnimmst?"));
  h.say("Kathete berechnen", "Manchmal kennst du die Hypotenuse und suchst eine Kathete. Dann rechnest du rückwärts und ziehst ab. Vom Quadrat der Hypotenuse nimmst du das Quadrat der bekannten Kathete weg. Die Hypotenuse steht dabei immer vorn, weil sie die größte ist.");
  h.tasks("Kathete berechnen", k("$c = 10$ und $a = 6$, gesucht ist $b$. Unter der Wurzel steht ___.", "$100 - 36$", ["$100 + 36$"], "Gesucht ist eine Kathete. Dann wird das Quadrat der bekannten Kathete abgezogen.", "Ist die gesuchte Seite kürzer als die Hypotenuse? Was folgt daraus?"));
  h.after(
    "Kathete berechnen",
    b("Jetzt du: Pythagoras", "Tipp bei jeder Aufgabe auf das richtige Ergebnis.", "Frag dich zuerst, welche Seite gesucht ist. Suchst du die längste Seite, zählst du die Quadrate zusammen. Suchst du eine der kurzen Seiten, ziehst du ab. Am Ende kommt immer die Wurzel.", {
      tasks: [
        k("Gesucht ist $c$: $25 + 144 = 169$. Also ist $c = $ ___", "13", ["84,5"], "13 mal 13 ergibt 169. Das ist die Wurzel.", "Welche Zahl ergibt 169, wenn du sie mit sich selbst malnimmst?"),
        k("Gesucht ist $b$: $25 - 16 = 9$. Also ist $b = $ ___", "3", ["4,5"], "3 mal 3 ergibt 9. Das ist die Wurzel.", "Welche Zahl ergibt 9, wenn du sie mit sich selbst malnimmst?"),
        k("Gilt der Satz auch in einem Dreieck ohne rechten Winkel? ___", "Nein", ["Ja"], "Der Satz braucht die rechte Ecke. Ohne sie stimmt er nicht.", "Was braucht alles in dieser Lektion, damit es gilt?"),
      ],
    }),
  );

  // --- chapter 2 ---
  h.say("Gegenkathete und Ankathete", "Jetzt kommt ein Winkel dazu, und die Katheten bekommen genauere Namen. Die Kathete, die den Winkel berührt, liegt an ihm an. Die andere liegt ihm gegenüber. Wechselst du zum anderen Winkel, tauschen die beiden Katheten ihre Namen.");
  h.tasks("Gegenkathete und Ankathete", k("Die Kathete, die den Winkel $\\alpha$ berührt, heißt ___.", "Ankathete", ["Gegenkathete"], "Sie liegt am Winkel an. Daher kommt der Name.", "Liegt diese Seite am Winkel oder ihm gegenüber?"));
  h.body("sin, cos, tan sind Brüche", "$\\sin\\alpha = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$", "$\\cos\\alpha = \\frac{\\text{Ankathete}}{\\text{Hypotenuse}}$", "$\\tan\\alpha = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}}$", "Man liest: **Sinus**, **Kosinus**, **Tangens**.");
  h.say("sin, cos, tan sind Brüche", "Hinter den drei Wörtern steckt jedes Mal ein Bruch aus zwei Seiten des Dreiecks. Der Winkel legt fest, wie groß dieser Bruch ist. Du musst die drei Zeilen nicht auswendig lernen, denn genau so stehen sie auf dem Formelblatt.");
  h.tasks("sin, cos, tan sind Brüche", k("Die Ankathete ist 3 cm lang, die Hypotenuse 5 cm. Dann ist $\\cos\\alpha = $ ___", "$\\frac{3}{5}$", ["$\\frac{5}{3}$"], "Beim Kosinus steht die Ankathete oben und die Hypotenuse unten.", "Welche der beiden Seiten steht beim Kosinus oben im Bruch?"));
  h.say("Was der Taschenrechner tut", "Der Taschenrechner kennt für jeden Winkel den passenden Bruch. Bei 30 Grad zeigt er für den Sinus 0,5 an. Das bedeutet, die Gegenkathete ist halb so lang wie die Hypotenuse. Achte darauf, dass im Display DEG steht und nicht RAD.");
  h.tasks("Was der Taschenrechner tut", k("$\\sin 30° = 0{,}5$. Die Hypotenuse ist 8 cm lang. Die Gegenkathete ist ___.", "4 cm", ["16 cm"], "Die Gegenkathete ist hier halb so lang wie die Hypotenuse.", "Was ist die Hälfte von 8 cm?"));
  h.body("Seite berechnen", "$c = 10$ und $\\alpha = 30°$, gesucht ist $a$.", "$\\sin 30° = \\frac{a}{10}$", "Beide Seiten mal 10: $a = 10 \\cdot \\sin 30°$", "$a = 10 \\cdot 0{,}5 = 5$");
  h.say("Seite berechnen", "Du schreibst zuerst die passende Zeile vom Formelblatt hin. Dann setzt du die Zahlen ein, die du kennst. Übrig bleibt eine Gleichung mit einer Unbekannten. Die löst du wie gewohnt, hier indem du beide Seiten mal 10 nimmst.");
  h.tasks("Seite berechnen", k("$c = 20$ und $\\alpha = 30°$. Dann ist $a = 20 \\cdot 0{,}5 = $ ___", "10", ["40"], "Mal 0,5 ist dasselbe wie die Hälfte. Die Hälfte von 20 ist 10.", "Mal 0,5 bedeutet: Nimm die Hälfte."));
  h.body("Winkel berechnen", "$a = 5$ und $c = 10$, gesucht ist $\\alpha$.", "$\\sin\\alpha = \\frac{5}{10} = 0{,}5$", "$\\alpha = \\sin^{-1}(0{,}5) = 30°$");
  h.say("Winkel berechnen", "Hier geht es rückwärts. Du kennst zwei Seiten und rechnest daraus den Bruch aus. Dann brauchst du die Taste sin hoch minus eins. Auf vielen Taschenrechnern drückst du dafür zuerst SHIFT und dann sin. Sie macht aus dem Bruch wieder den Winkel.");
  h.tasks("Winkel berechnen", k("$\\sin\\alpha = 0{,}5$. Du tippst $\\sin^{-1}(0{,}5)$ ein. Der Taschenrechner zeigt ___.", "30°", ["0,5°"], "Die Taste macht aus dem Bruch den Winkel. Zum Wert 0,5 gehört beim Sinus der Winkel 30 Grad.", "Schau auf die letzte Zeile der Tafel. Welcher Winkel steht dort?"));
  h.say("Merkwort", "Dieser Merkspruch klingt albern, aber er funktioniert seit Generationen. Die großen Buchstaben stehen für Gegenkathete, Ankathete und Hypotenuse. Das erste Wort liefert, was oben im Bruch steht. Das zweite Wort liefert, was unten steht. Die Reihenfolge ist immer sin, cos, tan.");
  h.tasks("Merkwort", k("Die Gegenkathete ist 4 cm lang, die Ankathete 8 cm. Dann ist $\\tan\\alpha = $ ___", "$\\frac{4}{8}$", ["$\\frac{8}{4}$"], "Beim Tangens steht G oben und A unten, also Gegenkathete durch Ankathete.", "Schau ins Merkwort. Welcher Buchstabe steht bei tan zuerst?"));
  h.after(
    "Merkwort",
    b("Das nimmst du mit", ["(1) Alles gilt nur mit rechtem Winkel.", "(2) Die Hypotenuse ist die längste Seite.", "(3) $a^2 + b^2 = c^2$", "(4) Zwei Seiten bekannt, dritte gesucht: Pythagoras.", "(5) Ein Winkel ist im Spiel: sin, cos oder tan."], "Das sind die fünf Dinge, die du aus dieser Lektion brauchst. Die wichtigste Frage bei jeder Aufgabe lautet: Kommt ein Winkel vor oder nur Seiten? Danach weißt du, welches Werkzeug du nimmst. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("Du kennst zwei Seiten und suchst die dritte. Du nimmst ___.", "den Satz des Pythagoras", ["den Sinus"], "Wenn nur Seiten vorkommen und kein Winkel, hilft der Satz mit den Quadraten.", "Kommt in der Aufgabe ein Winkel vor oder nur Seiten?")],
    }),
  );

  // Small steps: one line per step instead of one long calculation.
  h.body("Hypotenuse berechnen", "$c = \\sqrt{a^2 + b^2}$", "Beispiel: $a = 6$ und $b = 8$", "Quadrieren: $36$ und $64$", "Zusammenzählen: $36 + 64 = 100$", "Wurzel ziehen: $c = \\sqrt{100} = 10$");
  h.body("Kathete berechnen", "$b = \\sqrt{c^2 - a^2}$", "Beispiel: $c = 13$ und $a = 5$", "Quadrieren: $169$ und $25$", "Abziehen: $169 - 25 = 144$", "Wurzel ziehen: $b = \\sqrt{144} = 12$");

  // Every board that talks about a shape shows it (drawings and try-it-out elements the app already has).
  h.board("Katheten und Hypotenuse").figure = { type: "rightTriangle", a: 4, b: 3, labels: { a: "Kathete a", b: "Kathete b", c: "Hypotenuse c" } };
  h.board("Der Satz des Pythagoras").figure = { type: "rightTriangle", a: 3, b: 4, labels: { a: "a = 3", b: "b = 4", c: "c = 5" } };
  h.board("Was heißt das als Bild?").figure = { type: "rightTriangle", a: 3, b: 4, labels: { a: "3", b: "4", c: "5" } };
  h.board("Das nimmst du mit").widget = "triangle-explorer";
  h.board("Hypotenuse berechnen").figure = { type: "rightTriangle", a: 6, b: 8, labels: { a: "a = 6", b: "b = 8", c: "c = ?" } };
  h.board("Kathete berechnen").figure = { type: "rightTriangle", a: 5, b: 12, labels: { a: "a = 5", b: "b = ?", c: "c = 13" } };
  h.board("Seite berechnen").figure = { type: "rightTriangle", a: 5, b: 8.66, labels: { a: "a = ?", c: "c = 10", alpha: "30°" } };
  h.board("Winkel berechnen").figure = { type: "rightTriangle", a: 5, b: 8.66, labels: { a: "a = 5", c: "c = 10", alpha: "α = ?" } };

  // Read-through: the board says why the sine is the right choice.
  h.body("Seite berechnen", "$c = 10$ und $\\alpha = 30°$, gesucht ist $a$.", "$a$ liegt gegenüber vom Winkel, $c$ ist die Hypotenuse: Das ist der Sinus.", "$\\sin 30° = \\frac{a}{10}$", "Beide Seiten mal 10: $a = 10 \\cdot \\sin 30°$", "$a = 10 \\cdot 0{,}5 = 5$");

  // New topics: Sinussatz and Kosinussatz for triangles without a right angle (on the Spickzettel and the Formelblatt).
  h.before(
    "Das nimmst du mit",
    b("Kein rechter Winkel?", ["Pythagoras und sin, cos, tan brauchen einen rechten Winkel.", "Für alle anderen Dreiecke stehen zwei Sätze auf dem Formelblatt: der **Sinussatz** und der **Kosinussatz**.", "Seite $a$ liegt gegenüber vom Winkel $\\alpha$, $b$ gegenüber von $\\beta$, $c$ gegenüber von $\\gamma$."], "Viele Dreiecke haben keinen rechten Winkel. Dann darfst du nichts von dem benutzen, was du bisher in dieser Lektion gelernt hast. Dafür gibt es zwei andere Werkzeuge. Für beide musst du wissen, welche Seite welchem Winkel gegenüberliegt. Das sagen dir die Buchstaben.", {
      figure: { type: "triangle", alpha: 60, beta: 50, labels: { a: "a", b: "b", c: "c", alpha: "α", beta: "β", gamma: "γ" } },
      tasks: [k("Gegenüber vom Winkel $\\beta$ liegt die Seite ___.", "$b$", ["$a$"], "Zum Winkel Beta gehört die Seite mit dem Buchstaben b.", "Welcher lateinische Buchstabe passt zum griechischen Beta?")],
    }),
    b("Der Sinussatz", ["$\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta}$", "In Worten: Seite geteilt durch den Sinus des Winkels gegenüber. Das ist bei jedem Paar gleich.", "Du brauchst ein vollständiges Paar: eine Seite **und** den Winkel gegenüber."], "Der Sinussatz vergleicht zwei Paare. Jedes Paar besteht aus einer Seite und dem Winkel, der ihr gegenüberliegt. Kennst du ein Paar ganz und vom zweiten Paar einen Teil, kannst du den fehlenden Teil ausrechnen. Auf dem Formelblatt steht auch noch das dritte Paar mit c und Gamma.", {
      figure: { type: "triangle", alpha: 30, beta: 50, labels: { a: "a", b: "b", alpha: "α", beta: "β" } },
      tasks: [k("Du kennst $b$, $\\beta$ und $\\alpha$. Gesucht ist $a$. Du nimmst ___.", "den Sinussatz", ["den Satz des Pythagoras"], "Du hast ein ganzes Paar, nämlich b und Beta, und vom zweiten Paar den Winkel.", "Hat das Dreieck einen rechten Winkel? Und kennst du ein Paar aus Seite und Winkel gegenüber?")],
    }),
    b("Sinussatz: eine Seite berechnen", ["$\\beta = 50°$, $b = 8$, $\\alpha = 30°$, gesucht ist $a$.", "$\\frac{a}{\\sin 30°} = \\frac{8}{\\sin 50°}$", "Rechte Seite: $8 : 0{,}766 \\approx 10{,}44$", "Beide Seiten mal $\\sin 30°$, also mal 0,5:", "$a \\approx 10{,}44 \\cdot 0{,}5 = 5{,}22$"], "Du setzt zuerst alles ein, was du kennst. Die rechte Seite kannst du dann ganz ausrechnen. Links steht a geteilt durch den Sinus von 30 Grad. Um a allein zu bekommen, nimmst du beide Seiten mit diesem Sinus mal. Das ist dieselbe Idee wie bei jeder Gleichung.", {
      figure: { type: "triangle", alpha: 30, beta: 50, labels: { a: "a = ?", b: "b = 8", alpha: "30°", beta: "50°" } },
      tasks: [k("$\\frac{a}{0{,}5} = 10$. Dann ist $a = $ ___", "5", ["20"], "Du nimmst beide Seiten mal 0,5. 10 mal 0,5 ergibt 5.", "Wie wirst du das Geteilt durch 0,5 auf der linken Seite los?")],
    }),
    b("Der Kosinussatz", ["$a^2 = b^2 + c^2 - 2 \\cdot b \\cdot c \\cdot \\cos\\alpha$", "Vorn steht der Pythagoras: $b^2 + c^2$", "Dahinter wird etwas abgezogen, weil der Winkel nicht 90° hat.", "Du brauchst zwei Seiten und den Winkel **zwischen** ihnen."], "Der Kosinussatz ist ein Pythagoras mit einer Korrektur. Bei einem rechten Winkel wäre der hintere Teil null, und es bliebe der normale Satz übrig. Du nimmst ihn, wenn du zwei Seiten kennst und den Winkel, den diese beiden Seiten einschließen.", {
      figure: { type: "triangle", alpha: 60, beta: 85.3, labels: { a: "a", b: "b", c: "c", alpha: "α" } },
      tasks: [k("Du kennst $b$, $c$ und den Winkel $\\alpha$ zwischen ihnen. Für $a$ nimmst du ___.", "den Kosinussatz", ["den Sinussatz"], "Zwei Seiten und der Winkel dazwischen: Dafür ist der Kosinussatz da.", "Kennst du ein ganzes Paar aus Seite und Winkel gegenüber, oder zwei Seiten mit dem Winkel dazwischen?")],
    }),
    b("Kosinussatz: Schritt für Schritt", ["$b = 7$, $c = 4$, $\\alpha = 60°$", "Vorn: $49 + 16 = 65$", "Hinten zuerst: $2 \\cdot 7 \\cdot 4 = 56$", "Der Kosinus: $\\cos 60° = 0{,}5$", "Zusammen: $56 \\cdot 0{,}5 = 28$","$a^2 = 65 - 28 = 37$", "$a = \\sqrt{37} \\approx 6{,}08$"], "Rechne die Formel in kleinen Stücken. Zuerst die beiden Quadrate vorn. Dann den hinteren Teil: zwei mal die eine Seite mal die andere, und das Ergebnis mal den Kosinus. Danach ziehst du ab. Ganz am Ende kommt die Wurzel, denn bis dahin hast du erst a hoch 2.", {
      figure: { type: "triangle", alpha: 60, beta: 85.3, labels: { a: "a = ?", b: "b = 7", c: "c = 4", alpha: "60°" } },
      tasks: [k("$a^2 = 100 - 36 = 64$. Dann ist $a = $ ___", "8", ["32"], "Du ziehst die Wurzel aus 64. 8 mal 8 ergibt 64.", "Du hast erst a hoch 2. Welcher Schritt fehlt noch?")],
    }),
  );

  h.chapters([
    ["Das rechtwinklige Dreieck", "Der Satz des Pythagoras"],
    ["Gegenkathete und Ankathete", "Sinus, Kosinus und Tangens"],
    ["Kein rechter Winkel?", "Dreiecke ohne rechten Winkel"],
  ]);
  h.renameVocab({ "Rechter Winkel": "rechter Winkel" });
  h.explain([
    "Sie spannt sich gegenüber der rechten Ecke und ist immer die längste.",
    "9 plus 16 ergibt 25. Die Wurzel aus 25 ist 5.",
    "100 minus 36 ergibt 64. Die Wurzel aus 64 ist 8.",
    "Beim Sinus steht oben die Gegenkathete und unten die Hypotenuse. Im Merkwort ist das G durch H.",
    "DEG bedeutet Grad. Steht der Taschenrechner auf RAD, kommen falsche Werte heraus.",
  ]);
  h.quiz(q("$c = 10$, $\\alpha = 30°$ und $\\sin 30° = 0{,}5$. Wie lang ist die Gegenkathete $a$?", "5", ["20", "0,05", "15"], "Der Sinus ist Gegenkathete durch Hypotenuse. Die Gegenkathete ist also 10 mal 0,5, und das ergibt 5."));
  // New topics, words and quiz: added after the old quiz explanations.
  p.vocab.push(
    { term: "Sinussatz", plain: "Für Dreiecke ohne rechten Winkel: Seite geteilt durch den Sinus des Winkels gegenüber ist bei jedem Paar gleich.", example: "$\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta}$" },
    { term: "Kosinussatz", plain: "Für Dreiecke ohne rechten Winkel: ein Pythagoras mit Korrektur. Du brauchst zwei Seiten und den Winkel dazwischen.", example: "$a^2 = b^2 + c^2 - 2 \\cdot b \\cdot c \\cdot \\cos\\alpha$" },
  );
  h.quiz(q("Ein Dreieck hat keinen rechten Winkel. Du kennst zwei Seiten und den Winkel zwischen ihnen. Welchen Satz nimmst du für die dritte Seite?", "den Kosinussatz", ["den Sinussatz", "den Satz des Pythagoras", "den Tangens"], "Zwei Seiten und der Winkel dazwischen: Das ist der Fall für den Kosinussatz. Der Pythagoras gilt nur mit rechtem Winkel."));
});
