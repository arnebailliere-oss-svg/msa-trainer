// P_MATH_QUADRAT to the standard: boards and all three figures stay; chapters, tap tasks and hints are added.
// The pq formula is no longer shown and solved on one board: "plus-minus" now comes first,
// then the formula, then the worked example line by line, then how many solutions there are.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_07b_parabel.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_TERME", "P_MATH_GLEICHUNG", "P_MATH_POTENZ", "P_MATH_FUNKTION"];
  p.hook = "Sobald in einer Funktion ein $x^2$ auftaucht, ist die Gerade weg und eine Kurve da. Sie sieht aus wie eine Schüssel. Alles, was man in der Prüfung über sie fragt, hat mit dieser Schüssel zu tun. Wir sehen sie uns zuerst an und lösen danach die passenden Gleichungen.";
  p.outro = "Du kennst jetzt die Schüssel, ihren Scheitelpunkt und ihre Nullstellen. Und du weißt, dass die pq-Formel nur aus Einsetzen besteht. Damit kannst du die Lektion lesen.";

  // --- chapter 1 ---
  h.body("x² macht eine Schüssel", "$y = x^2$", "$x = 2$ → $4$", "$x = -2$ → auch $4$", "Links und rechts gleich: **symmetrisch**.", "Diese Kurve heißt **Parabel**.");
  h.say("x² macht eine Schüssel", "Minus mal minus ergibt plus. Deshalb landen minus 2 und 2 auf derselben Höhe, nämlich bei 4. Das gilt für jedes Zahlenpaar links und rechts. So entsteht die Form einer Schüssel, bei der beide Seiten gleich aussehen.");
  h.tasks("x² macht eine Schüssel", k("$y = x^2$. Für $x = -3$ ist $y = $ ___", "9", ["$-9$"], "Minus 3 mal minus 3 ergibt plus 9.", "Was ergibt minus 3 mal minus 3?"));
  h.say("Der Scheitelpunkt", "Das Wort Scheitel kennst du vom Haar: Es ist die Stelle, an der es sich teilt. Bei der Schüssel ist das der tiefste Punkt. Links davon geht es hinunter, rechts davon wieder hinauf.");
  h.tasks("Der Scheitelpunkt", k("Der tiefste Punkt von $y = x^2$ liegt bei ___.", "$(0\\,|\\,0)$", ["$(1\\,|\\,1)$"], "Für x gleich 0 kommt 0 heraus. Kleiner kann x hoch 2 nicht werden.", "Für welche Zahl wird x hoch 2 am kleinsten?"));
  h.say("Nach oben oder nach unten", "Ein Minus vor dem x hoch 2 dreht die Schüssel um. Dann zeigt die Öffnung nach unten, und der Scheitelpunkt ist nicht mehr der tiefste, sondern der höchste Punkt.");
  h.tasks("Nach oben oder nach unten", k("$y = -x^2$ ist offen nach ___.", "unten", ["oben"], "Das Minus vor dem x hoch 2 dreht die Schüssel um.", "Was macht ein Minus vor dem x hoch 2 mit der Schüssel?"));
  h.body("Die Parabel verschieben", "$y = (x - 1)^2 - 2$", "Scheitelpunkt: $S(1\\,|\\,-2)$", "In der Klammer steht das Gegenteil: Aus $-1$ wird $x = 1$.");
  h.say("Die Parabel verschieben", "Diese Schreibweise heißt Scheitelpunktform, weil du den Scheitelpunkt direkt ablesen kannst. Die Klammer wird genau dann null, wenn x gleich 1 ist. Dort liegt der tiefste Punkt. Deshalb liest du die Zahl in der Klammer mit umgekehrtem Vorzeichen. Die Zahl dahinter übernimmst du so, wie sie dasteht.");
  h.tasks("Die Parabel verschieben", k("$y = (x - 2)^2 + 3$ hat den Scheitelpunkt ___.", "$S(2\\,|\\,3)$", ["$S(-2\\,|\\,3)$"], "In der Klammer steht minus 2, also ist x gleich 2. Die 3 dahinter bleibt.", "In der Klammer steht das Gegenteil. Was wird aus minus 2?"));
  h.say("Nullstellen", "Denk an die Schüssel und an die waagerechte Achse. Schwebt die Schüssel ganz über der Achse, gibt es keine Nullstelle. Berührt sie die Achse gerade so, gibt es eine. Taucht sie durch die Achse hindurch, gibt es zwei.");
  h.tasks("Nullstellen", k("Die Schüssel schwebt ganz über der x-Achse. Sie hat ___.", "keine Nullstelle", ["zwei Nullstellen"], "Eine Nullstelle gibt es nur dort, wo die Kurve die x-Achse trifft.", "Trifft die Kurve die waagerechte Achse überhaupt irgendwo?"));

  // --- chapter 2 ---
  h.say("Die einfachste quadratische Gleichung", "Hier ziehst du auf beiden Seiten die Wurzel. Vergiss dabei die zweite Lösung nicht, denn auch minus 3 mal minus 3 ergibt 9. Das passt zum Bild: Die Schüssel hat links und rechts dieselbe Höhe.");
  h.tasks("Die einfachste quadratische Gleichung", k("$x^2 = 49$ hat die Lösungen ___.", "7 und $-7$", ["nur 7"], "7 mal 7 ist 49, und minus 7 mal minus 7 ist auch 49.", "Gibt es noch eine zweite Zahl, die mit sich selbst malgenommen 49 ergibt?"));
  h.say("Die Normalform", "Bevor du die Formel auf der übernächsten Tafel benutzen darfst, muss die Gleichung genau so aussehen. Das p ist die Zahl vor dem x, und das q ist die Zahl ohne x. Bei beiden gehört das Vorzeichen dazu.");
  h.tasks(
    "Die Normalform",
    k("$x^2 + 4x - 12 = 0$: Hier ist $p = $ ___", "4", ["$-12$"], "Das p ist die Zahl, die vor dem x steht.", "Welche Zahl steht direkt vor dem einfachen x?"),
    k("$x^2 + 4x - 12 = 0$: Hier ist $q = $ ___", "$-12$", ["$12$"], "Das q ist die Zahl ohne x, und ihr Vorzeichen gehört dazu.", "Welches Vorzeichen steht vor der Zahl ohne x?"),
  );
  h.remove("Plus-minus");
  h.before(
    "Die pq-Formel",
    b("Plus-minus", ["Das Zeichen $\\pm$ liest man **Plus-minus**.", "Es heißt: einmal mit Plus, einmal mit Minus rechnen.", "$3 \\pm 2$: einmal $3 + 2 = 5$, einmal $3 - 2 = 1$", "Darum kommen zwei Lösungen heraus."], "Dieses Zeichen brauchst du gleich in der Formel. Es ist nur eine Abkürzung für zwei Rechnungen. Du rechnest zuerst mit Plus und schreibst das Ergebnis auf. Dann rechnest du dasselbe noch einmal mit Minus.", {
      tasks: [k("$5 \\pm 1$ ergibt ___.", "6 und 4", ["nur 6"], "Einmal 5 plus 1 und einmal 5 minus 1.", "Rechne einmal mit Plus und danach einmal mit Minus.")],
    }),
  );
  h.body("Die pq-Formel", "$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$", "Vorn steht die Hälfte von $p$ mit einem Minus davor.", "Unter der Wurzel steht: die Hälfte von $p$ zum Quadrat, minus $q$.");
  h.say("Die pq-Formel", "Die Formel sieht wild aus, aber sie besteht nur aus zwei Teilen. Vorn steht die Hälfte von p mit einem Minus. Dahinter kommt plus-minus eine Wurzel. Du musst die Formel nicht auswendig können, denn sie steht auf dem Formelblatt. Wie man sie benutzt, zeigt die nächste Tafel.");
  h.tasks("Die pq-Formel", k("$p = 10$. Die Formel beginnt mit $-\\frac{p}{2} = $ ___", "$-5$", ["$5$"], "Die Hälfte von 10 ist 5, und davor steht ein Minus.", "Die Hälfte von 10 stimmt bei beiden. Schau auf das Vorzeichen: Was steht in der Formel ganz vorn?"));
  h.after(
    "Die pq-Formel",
    b("Die pq-Formel Schritt für Schritt", ["$x^2 + 6x + 5 = 0$", "Ablesen: $p = 6$ und $q = 5$", "Hälfte von $p$: 3", "Unter der Wurzel: $3^2 - 5 = 4$", "$x_{1,2} = -3 \\pm \\sqrt{4} = -3 \\pm 2$", "$x_1 = -1$ und $x_2 = -5$"], "Geh immer in dieser Reihenfolge vor. Zuerst liest du p und q ab. Dann halbierst du p. Danach rechnest du aus, was unter der Wurzel steht. Erst zum Schluss rechnest du einmal mit Plus und einmal mit Minus.", {
      tasks: [
        k("$x^2 + 4x + 3 = 0$. Unter der Wurzel steht $2^2 - 3 = $ ___", "1", ["7"], "2 hoch 2 ist 4, und 4 minus 3 ergibt 1.", "Rechne zuerst 2 hoch 2. Was ziehst du dann ab?"),
        k("Also ist $x_{1,2} = -2 \\pm 1$. Die Lösungen sind ___.", "$-1$ und $-3$", ["$1$ und $3$"], "Minus 2 plus 1 ergibt minus 1, und minus 2 minus 1 ergibt minus 3.", "Rechne von minus 2 aus einmal 1 dazu und einmal 1 weg."),
      ],
    }),
    b("Wie viele Lösungen?", ["Schau auf die Zahl unter der Wurzel.", "Sie ist positiv: **zwei** Lösungen.", "Sie ist 0: **eine** Lösung.", "Sie ist negativ: **keine** Lösung."], "Aus einer negativen Zahl kannst du keine Wurzel ziehen. Dann hat die Gleichung keine Lösung. Das ist genau das Bild von vorhin: Die Schüssel schwebt über der Achse. Bei einer Null berührt sie die Achse, und bei einer positiven Zahl taucht sie hindurch.", {
      tasks: [k("Unter der Wurzel steht $-4$. Die Gleichung hat ___.", "keine Lösung", ["zwei Lösungen"], "Aus einer negativen Zahl lässt sich keine Wurzel ziehen.", "Kannst du aus einer negativen Zahl die Wurzel ziehen?")],
    }),
    b("Das nimmst du mit", ["(1) $x^2$ ergibt eine Schüssel, die Parabel.", "(2) Der Scheitelpunkt ist ihr tiefster oder höchster Punkt.", "(3) Nullstellen: Dort ist $y = 0$.", "(4) Erst $p$ und $q$ ablesen, dann einsetzen.", "(5) Die Zahl unter der Wurzel zeigt, wie viele Lösungen es gibt."], "Das sind die fünf Dinge, die du über Parabeln und quadratische Gleichungen wissen musst. Bei der Formel hilft dir die feste Reihenfolge. Wenn du sie Zeile für Zeile aufschreibst, kann wenig schiefgehen. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("$x^2 + 2x - 8 = 0$. Was tust du zuerst? ___", "$p$ und $q$ ablesen", ["die Wurzel ziehen"], "Erst wenn du p und q kennst, kannst du in die Formel einsetzen.", "Welche zwei Buchstaben brauchst du für die Formel?")],
    }),
  );

  // Every board that talks about a shape shows it (drawings and try-it-out elements the app already has).
  h.board("Die Parabel verschieben").widget = "parabola-explorer";
  h.board("Nullstellen").figure = { type: "coordinateSystem", xmin: -3, xmax: 5, ymin: -5, ymax: 6, width: 300, height: 320, parabolas: [{ a: 1, d: 1, e: -4, label: "2 Nullstellen" }], points: [{ x: -1, y: 0 }, { x: 3, y: 0 }] };

  // Read-through: moving the parabola is taught in two boards (up/down, right/left) before both are combined;
  // no arrows on the board; the pq formula names x1 and x2 and is worked one line per step.
  h.body("x² macht eine Schüssel", "$y = x^2$", "$x = 2$: $y = 2 \\cdot 2 = 4$", "$x = -2$: $y = (-2) \\cdot (-2) = 4$", "Links und rechts gleich: **symmetrisch**.", "Diese Kurve heißt **Parabel**.");
  h.before(
    "Die Parabel verschieben",
    b("Nach oben und nach unten schieben", ["$y = x^2 + 3$: Die Parabel rutscht 3 nach **oben**.", "$y = x^2 - 2$: Sie rutscht 2 nach **unten**.", "Der Scheitelpunkt wandert mit: $S(0\\,|\\,-2)$"], "Eine Zahl hinter dem x hoch 2 hebt oder senkt die ganze Schüssel. Bei plus 3 liegt jeder Punkt 3 höher als vorher. Bei minus 2 liegt jeder Punkt 2 tiefer. Die Form bleibt dieselbe, nur die Höhe ändert sich.", {
      figure: { type: "coordinateSystem", xmin: -4, xmax: 4, ymin: -4, ymax: 8, width: 300, height: 320, parabolas: [{ a: 1, d: 0, e: -2, label: "y = x² − 2" }], points: [{ x: 0, y: -2, label: "S" }] },
      tasks: [k("$y = x^2 + 4$ hat den Scheitelpunkt ___.", "$S(0\\,|\\,4)$", ["$S(4\\,|\\,0)$"], "Die Zahl hinter dem x hoch 2 schiebt nach oben. Zur Seite bewegt sich nichts.", "Schiebt die Zahl am Ende nach oben oder zur Seite?")],
    }),
    b("Nach rechts und nach links schieben", ["$y = (x - 1)^2$: Die Parabel rutscht 1 nach **rechts**.", "$y = (x + 1)^2$: Sie rutscht 1 nach **links**.", "Achtung, es ist umgekehrt: Minus in der Klammer heißt nach rechts.", "Bei $y = (x - 1)^2$ liegt der Scheitelpunkt bei $S(1\\,|\\,0)$."], "Steht die Zahl in der Klammer beim x, rutscht die Schüssel zur Seite. Der tiefste Punkt liegt dort, wo die Klammer null wird. Bei x minus 1 ist das bei x gleich 1, also rechts. Deshalb wirkt das Vorzeichen in der Klammer umgekehrt.", {
      figure: { type: "coordinateSystem", xmin: -3, xmax: 5, ymin: -2, ymax: 8, width: 300, height: 320, parabolas: [{ a: 1, d: 1, e: 0, label: "(x − 1)²" }], points: [{ x: 1, y: 0, label: "S" }] },
      tasks: [k("$y = (x - 3)^2$ hat den Scheitelpunkt ___.", "$S(3\\,|\\,0)$", ["$S(-3\\,|\\,0)$"], "Die Klammer wird null, wenn x gleich 3 ist. Dort liegt der tiefste Punkt.", "Für welche Zahl wird die Klammer genau null?")],
    }),
  );
  h.body("Die Parabel verschieben", "Beides zusammen: $y = (x - 1)^2 - 2$", "1 nach rechts und 2 nach unten", "Scheitelpunkt: $S(1\\,|\\,-2)$", "Diese Schreibweise heißt **Scheitelpunktform**.");
  h.body("Die pq-Formel", "$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$", "$x_{1,2}$ heißt: die beiden Lösungen $x_1$ und $x_2$.", "Vorn steht die Hälfte von $p$ mit einem Minus davor.", "Unter der Wurzel steht: die Hälfte von $p$ zum Quadrat, minus $q$.");
  h.body("Die pq-Formel Schritt für Schritt", "$x^2 + 6x + 5 = 0$", "Ablesen: $p = 6$ und $q = 5$", "Hälfte von $p$: 3", "Unter der Wurzel: $3^2 - 5 = 4$", "Wurzel: $\\sqrt{4} = 2$", "$x_{1,2} = -3 \\pm 2$", "Mit Plus: $x_1 = -1$. Mit Minus: $x_2 = -5$.");

  // Gentle start: the new rule as a machine with numbers first; y = x² on the next board.
  h.before(
    "x² macht eine Schüssel",
    b("Eine neue Maschine", ["Du kennst die Maschine: verdopple und plus 1.", "Jetzt eine neue Regel: **nimm die Zahl mal sich selbst**.", "2 hinein, 4 heraus", "3 hinein, 9 heraus", "Minus 2 hinein, auch 4 heraus"], "Du kennst die Maschine, die verdoppelt und 1 dazuzählt. Jetzt bekommt die Maschine eine neue Regel: Sie nimmt die Zahl mit sich selbst mal. Aus 3 wird 9. Auch aus minus 2 wird 4, denn minus mal minus ergibt plus.", {
      tasks: [k("Regel: nimm die Zahl mal sich selbst. 5 hinein, ___ heraus.", "25", ["10"], "Die Zahl mal sich selbst: 5 mal 5 ergibt 25.", "Du nimmst die 5 mit sich selbst mal, nicht mit 2.")],
    }),
  );
  h.body("x² macht eine Schüssel", "Die Regel kurz geschrieben: $y = x^2$", "$x = 2$: $y = 2 \\cdot 2 = 4$", "$x = -2$: $y = (-2) \\cdot (-2) = 4$", "Links und rechts gleich: **symmetrisch**.", "Diese Kurve heißt **Parabel**.");

  // One new thing per board: the short rule before the curve, the Normalform before p and q,
  // x1 and x2 before the formula, the worked example in three boards.
  h.before(
    "x² macht eine Schüssel",
    b("Die Regel kurz geschrieben", ["Die Regel heißt: nimm die Zahl mal sich selbst.", "Die Zahl, die hineinkommt, heißt $x$.", "$x$ mal $x$ schreibt man kurz: $x^2$", "Heraus kommt $y$. Also: $y = x^2$"], "Wie bei der ersten Maschine schreiben wir die Regel kurz auf. Die Zahl, die hineinkommt, heißt wieder x. Mal sich selbst bedeutet x mal x, und dafür schreibt man x hoch 2. Was herauskommt, heißt wieder y.", {
      tasks: [k("$y = x^2$. Für $x = -3$ ist $y = $ ___", "9", ["$-9$"], "Minus 3 mal minus 3 ergibt plus 9.", "Was ergibt minus 3 mal minus 3?")],
    }),
  );
  h.body("x² macht eine Schüssel", "Trag die Punkte ins Gitter ein.", "Es entsteht eine Kurve wie eine Schüssel.", "Diese Kurve heißt **Parabel**.", "Links und rechts sieht sie gleich aus. Das nennt man **symmetrisch**.");
  h.tasks("x² macht eine Schüssel", k("Die Parabel $y = x^2$ ist bei $x = 3$ genauso hoch wie bei ___.", "$x = -3$", ["$x = 0$"], "Links und rechts ist die Schüssel gleich hoch. 3 und minus 3 ergeben beide 9.", "Welche Zahl liegt auf der anderen Seite genauso weit von der Mitte weg?"));
  h.body("Der Scheitelpunkt", "Der tiefste Punkt der Schüssel heißt **Scheitelpunkt**.", "Man schreibt dafür kurz $S$.", "Bei $y = x^2$ liegt er bei $S(0\\,|\\,0)$.");
  h.body("Nach oben oder nach unten", "$y = x^2$: offen nach **oben**", "$y = -x^2$: offen nach **unten**", "Dann ist der Scheitelpunkt der höchste Punkt.");
  h.body("Die einfachste quadratische Gleichung", "Eine Gleichung mit $x^2$ heißt **quadratische Gleichung**.", "$x^2 = 9$", "$x = 3$ oder $x = -3$", "Zwei Lösungen, weil $(-3)^2$ auch 9 ist.");

  h.body("Die Normalform", "$x^2 + 6x + 5 = 0$", "Vor $x^2$ steht nichts. Rechts steht 0.", "So eine Gleichung steht in der **Normalform**.");
  h.say("Die Normalform", "Bevor du die Formel benutzen darfst, muss die Gleichung aufgeräumt sein. Vor dem x hoch 2 darf keine Zahl stehen, und auf der rechten Seite muss eine Null stehen. Diese aufgeräumte Form heißt Normalform.");
  h.tasks("Die Normalform", k("Welche Gleichung steht in der Normalform? ___", "$x^2 + 2x - 3 = 0$", ["$2x^2 + 2x = 3$"], "Vor dem x hoch 2 steht nichts, und rechts steht die 0.", "Bei welcher Gleichung steht rechts vom Gleichheitszeichen eine 0?"));
  h.after(
    "Die Normalform",
    b("Die Buchstaben p und q", ["$x^2 + 6x + 5 = 0$", "Die Zahl vor dem $x$ nennt man $p$. Hier: $p = 6$", "Die Zahl ohne $x$ nennt man $q$. Hier: $q = 5$", "Allgemein schreibt man: $x^2 + px + q = 0$"], "In der Normalform gibt es zwei Zahlen, die du für die Formel brauchst. Die Zahl vor dem x heißt p, und die Zahl ohne x heißt q. Bei beiden gehört das Vorzeichen dazu.", {
      tasks: [
        k("$x^2 + 4x - 12 = 0$: Hier ist $p = $ ___", "4", ["$-12$"], "Das p ist die Zahl, die vor dem x steht.", "Welche Zahl steht direkt vor dem einfachen x?"),
        k("$x^2 + 4x - 12 = 0$: Hier ist $q = $ ___", "$-12$", ["$12$"], "Das q ist die Zahl ohne x, und ihr Vorzeichen gehört dazu.", "Welches Vorzeichen steht vor der Zahl ohne x?"),
      ],
    }),
  );
  h.before(
    "Die pq-Formel",
    b("Zwei Lösungen, zwei Namen", ["Eine quadratische Gleichung hat oft zwei Lösungen.", "Die erste nennt man $x_1$, die zweite $x_2$.", "Beide zusammen schreibt man kurz: $x_{1,2}$"], "Weil es oft zwei Lösungen gibt, brauchen sie Namen. Die kleine Zahl unten am x ist nur eine Nummer, wie bei Hausnummern. Sie hat nichts mit Rechnen zu tun. x eins Komma zwei bedeutet: Hier stehen beide Lösungen in einer Zeile.", {
      tasks: [k("$x_{1,2} = 4 \\pm 1$. Dann ist $x_1 = 5$ und $x_2 = $ ___", "3", ["4"], "Die zweite Lösung rechnest du mit Minus: 4 minus 1 ergibt 3.", "Die erste Lösung war mit Plus gerechnet. Welches Zeichen fehlt noch?")],
    }),
  );
  h.body("Die pq-Formel", "$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$", "Vorn steht die Hälfte von $p$ mit einem Minus davor.", "Unter der Wurzel steht: die Hälfte von $p$ zum Quadrat, minus $q$.");

  h.body("Die pq-Formel Schritt für Schritt", "$x^2 + 6x + 5 = 0$", "Schritt 1, ablesen: $p = 6$ und $q = 5$", "Schritt 2: Die Hälfte von $p$ ist 3.", "Schritt 3, unter der Wurzel: $3^2 - 5 = 4$");
  h.say("Die pq-Formel Schritt für Schritt", "Geh immer in dieser Reihenfolge vor. Zuerst liest du p und q ab. Dann halbierst du p. Danach rechnest du aus, was unter der Wurzel steht. Die letzten beiden Schritte kommen auf der nächsten Tafel.");
  {
    const [first, second] = h.board("Die pq-Formel Schritt für Schritt").tasks;
    h.board("Die pq-Formel Schritt für Schritt").tasks = [first];
    h.after(
      "Die pq-Formel Schritt für Schritt",
      b("Die letzten zwei Schritte", ["Schritt 4, die Wurzel ziehen: $\\sqrt{4} = 2$", "Schritt 5: $x_{1,2} = -3 \\pm 2$", "Mit Plus: $x_1 = -1$", "Mit Minus: $x_2 = -5$"], "Jetzt ziehst du die Wurzel aus der Zahl von eben. Dann setzt du alles zusammen: vorn die Hälfte von p mit Minus, dahinter plus-minus die Wurzel. Zum Schluss rechnest du einmal mit Plus und einmal mit Minus.", { tasks: [second] }),
      b("Wenn q negativ ist", ["$x^2 + 2x - 3 = 0$: $p = 2$ und $q = -3$", "Unter der Wurzel: $1^2 - (-3)$", "Minus minus 3 wird plus 3: $1 + 3 = 4$"], "Hier lauert ein häufiger Fehler. Wenn q selbst negativ ist, stehen unter der Wurzel zwei Minus hintereinander. Daraus wird ein Plus. Schreib dir die Klammer um das negative q immer hin, dann übersiehst du es nicht.", {
        tasks: [k("$p = 4$ und $q = -5$. Unter der Wurzel steht $2^2 - (-5) = $ ___", "9", ["$-1$"], "2 hoch 2 ist 4. Minus minus 5 wird plus 5, und 4 plus 5 ergibt 9.", "Was wird aus einem Minus vor einer negativen Zahl?")],
      }),
    );
  }

  h.chapters([
    ["Eine neue Maschine", "Die Parabel"],
    ["Die einfachste quadratische Gleichung", "Quadratische Gleichungen lösen"],
  ]);
  h.renameVocab({ "Scheitelpunkt S": "Scheitelpunkt", "±": "Plus-minus" });
  h.explain([
    "In der Klammer steht minus 3, also ist x gleich 3. Dahinter steht plus 1, also ist y gleich 1.",
    "Das Minus vor dem x hoch 2 dreht die Schüssel um. Sie ist dann nach unten offen.",
    "5 mal 5 ist 25, und minus 5 mal minus 5 ist ebenfalls 25. Deshalb gibt es zwei Lösungen.",
    "Das p ist die Zahl vor dem x, also die 8. Das q wäre hier minus 9.",
    "An einer Nullstelle gibt die Funktion 0 aus. Der Graph schneidet dort die x-Achse.",
  ]);
  h.quiz(q("Löse $x^2 + 2x - 3 = 0$ mit der pq-Formel.", "$x_1 = 1$ und $x_2 = -3$", ["$x_1 = -1$ und $x_2 = 3$", "$x_1 = 2$ und $x_2 = -3$", "Es gibt keine Lösung"], "Die Hälfte von p ist 1. Unter der Wurzel steht 1 plus 3, also 4. Minus 1 plus 2 ergibt 1, und minus 1 minus 2 ergibt minus 3."));

  // Word card: every word, sign and letter of this lesson.
  h.vocab(
    { term: "Parabel", plain: "Die Kurve von x hoch 2. Sie sieht aus wie eine Schüssel.", example: "$y = x^2$" },
    { term: "symmetrisch", plain: "Links und rechts sieht es gleich aus.", example: "Bei $x = 2$ und $x = -2$ ist die Parabel gleich hoch." },
    { term: "Scheitelpunkt", plain: "Der tiefste Punkt der Schüssel. Ist sie nach unten offen, ist es der höchste Punkt.", example: "$S(1\\,|\\,-2)$" },
    { term: "S", plain: "Der Buchstabe für den Scheitelpunkt.", example: "$S(0\\,|\\,0)$" },
    { term: "Scheitelpunktform", plain: "Eine Schreibweise, aus der du den Scheitelpunkt ablesen kannst.", example: "$y = (x - 1)^2 - 2$ hat $S(1\\,|\\,-2)$." },
    { term: "Nullstelle", plain: "Die Stelle, an der die Kurve die x-Achse trifft. Dort ist y gleich 0.", example: "Eine Parabel hat 0, 1 oder 2 Nullstellen." },
    { term: "quadratische Gleichung", plain: "Eine Gleichung, in der x hoch 2 vorkommt.", example: "$x^2 = 9$" },
    { term: "Normalform", plain: "Vor x hoch 2 steht nichts, und rechts steht 0.", example: "$x^2 + 6x + 5 = 0$" },
    { term: "p", plain: "In der Normalform die Zahl vor dem x, mit ihrem Vorzeichen.", example: "$x^2 + 6x + 5 = 0$: $p = 6$" },
    { term: "q", plain: "In der Normalform die Zahl ohne x, mit ihrem Vorzeichen.", example: "$x^2 + 6x + 5 = 0$: $q = 5$" },
    { term: "$\\pm$", plain: "Plus-minus. Einmal mit Plus rechnen, einmal mit Minus.", example: "$3 \\pm 2$ ergibt 5 und 1." },
    { term: "$x_1$", plain: "Die erste Lösung. Die zweite heißt $x_2$. Die kleine Zahl ist nur eine Nummer.", example: "$x_1 = -1$ und $x_2 = -5$" },
    { term: "$x_{1,2}$", plain: "Beide Lösungen in einer Zeile.", example: "$x_{1,2} = -3 \\pm 2$" },
    { term: "pq-Formel", plain: "Die Formel für die Lösungen einer Gleichung in der Normalform. Sie steht auf dem Formelblatt.", example: "$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$" },
  );
});
