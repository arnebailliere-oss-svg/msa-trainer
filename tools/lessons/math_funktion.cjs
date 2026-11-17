// P_MATH_FUNKTION to the standard: boards and all three figures stay; chapters, tap tasks and hints are added.
// New: one practice board (reading m and n from an equation) and a summary board.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_07_funktionen.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_TERME", "P_MATH_GLEICHUNG"];
  p.hook = "Stell dir eine Maschine vor: Vorne kommt eine Zahl hinein, hinten kommt eine Zahl heraus. Die Maschine arbeitet immer nach derselben Regel. Mehr steckt hinter diesem Thema nicht. Wir sehen uns an, wie man so eine Maschine aufschreibt, als Tabelle zeigt und als Bild zeichnet.";
  p.outro = "Du kennst jetzt die Maschine, die Tabelle und das Bild dazu. Du weißt, was die Steigung und der Startwert bedeuten. Damit kannst du jede Gerade in der Lektion lesen.";

  // --- chapter 1 ---
  h.body("Die Maschine", "Regel: **verdopple und plus 1**", "$x = 2$ rein → $5$ raus", "$x = 3$ rein → $7$ raus", "$y = 2x + 1$", "So eine Regel heißt **Funktion**.");
  h.say("Die Maschine", "Das x ist die Zahl, die in die Maschine hineinkommt. Das y ist die Zahl, die herauskommt. Die Regel dazwischen ist das, was die Maschine tut. Hier verdoppelt sie die Zahl und zählt dann 1 dazu.");
  h.tasks("Die Maschine", k("Regel: verdopple und plus 1. $x = 4$ rein, ___ raus.", "9", ["6"], "Das Doppelte von 4 ist 8, und plus 1 ergibt 9.", "Verdopple zuerst die 4. Was kommt danach noch dazu?"));
  h.say("Schreibweisen", "Für dieselbe Maschine gibt es zwei Schreibweisen. Die zweite liest man f von x. Wenn in der Klammer eine 3 steht, bedeutet das nicht mal 3. Es bedeutet: Steck die 3 in die Maschine mit dem Namen f.");
  h.tasks("Schreibweisen", k("$f(x) = 2x + 1$. Dann ist $f(5) = $ ___", "11", ["10"], "Die 5 kommt für das x hinein: 2 mal 5 plus 1 ergibt 11.", "Setz die 5 für das x ein. Vergiss das plus 1 am Ende nicht."));
  h.body("Die Wertetabelle", "$x$: 0, 1, 2, 3", "$y$: 1, 3, 5, 7", "Jedes $x$ bekommt **genau ein** $y$.", "So eine Liste heißt **Wertetabelle**.");
  h.say("Die Wertetabelle", "So sieht die Maschine auf dem Papier aus. In der oberen Zeile stehen die Zahlen, die hineinkommen. Darunter steht jeweils die Zahl, die herauskommt. Jede Zahl oben hat genau einen Partner unten.");
  h.tasks("Die Wertetabelle", k("$y = 2x + 1$. In der Tabelle gehört zu $x = 4$ der Wert ___.", "9", ["8"], "2 mal 4 ist 8, und plus 1 ergibt 9.", "Rechne mit der Regel: erst mal 2, dann plus 1."));
  h.body("Das Koordinatensystem", "Waagerecht: **x-Achse** (rechts ist plus)", "Senkrecht: **y-Achse** (oben ist plus)", "Punkt $(2\\,|\\,5)$: 2 nach rechts, 5 nach oben", "Dieses Gitter heißt **Koordinatensystem**.");
  h.say("Das Koordinatensystem", "In diesem Gitter hat jeder Punkt zwei Zahlen. Die erste sagt, wie weit du nach rechts gehst. Die zweite sagt, wie weit du nach oben gehst. Merk dir: erst laufen, dann klettern. So verwechselst du die Reihenfolge nicht.");
  h.tasks("Das Koordinatensystem", k("Der Punkt $(4\\,|\\,1)$ liegt ___.", "4 nach rechts und 1 nach oben", ["1 nach rechts und 4 nach oben"], "Die erste Zahl ist das x. Sie sagt, wie weit es nach rechts geht.", "Erst laufen, dann klettern. Welche Zahl steht vorn?"));
  h.say("Punkte werden ein Bild", "Jedes Paar aus der Tabelle ist ein Punkt im Gitter. Wenn du alle Punkte einträgst und verbindest, entsteht eine gerade Linie. Dieses Bild zeigt die ganze Maschine auf einmal, auch für alle Zahlen dazwischen.");
  h.tasks("Punkte werden ein Bild", k("Zu $x = 3$ gehört in der Tabelle $y = 7$. Welcher Punkt liegt also auf dem Graphen? ___", "$(3\\,|\\,7)$", ["$(7\\,|\\,3)$"], "Jedes Paar aus der Tabelle ist ein Punkt. Die erste Zahl ist das x, die zweite das y.", "Welche Zahl steht im Punkt vorn: das x oder das y?"));

  // --- chapter 2 ---
  h.body("Was ist die Steigung?", "$y = 2x + 1$: Die **2** ist die **Steigung** $m$.", "Ein Schritt nach rechts → **2** Schritte nach oben.");
  h.say("Was ist die Steigung?", "Die Steigung sagt, wie viel die Gerade klettert, wenn du einen Schritt nach rechts gehst. Bei einer 2 geht es zwei Schritte nach oben, das ist ziemlich steil. Die Steigung ist immer die Zahl, die vor dem x steht.");
  h.tasks("Was ist die Steigung?", k("$y = 3x + 2$. Ein Schritt nach rechts bedeutet ___ nach oben.", "3 Schritte", ["2 Schritte"], "Die Zahl vor dem x ist die Steigung, also die 3.", "Welche Zahl steht direkt vor dem x?"));
  h.say("Negative Steigung", "Steht ein Minus vor dem x, geht es bergab. Die Gerade fällt dann, und zwar immer von links nach rechts gelesen. Bei minus 1 geht es mit jedem Schritt nach rechts einen Schritt nach unten.");
  h.tasks("Negative Steigung", k("Die Gerade $y = -2x + 5$ ___.", "fällt", ["steigt"], "Vor dem x steht ein Minus. Von links nach rechts geht es bergab.", "Welches Vorzeichen hat die Zahl vor dem x?"));
  h.body("Der Startwert n", "$y = 2x + 1$: Die **1** ist der **y-Achsenabschnitt** $n$.", "Bei $x = 0$ ist $y = 1$. Dort schneidet die Gerade die y-Achse.");
  h.say("Der Startwert n", "Das lange Wort bedeutet nur: die Stelle, an der die Gerade die senkrechte Achse schneidet. Du kannst dir diese Zahl als Startwert vorstellen. Von dort aus geht es mit der Steigung los, nach rechts hinauf oder hinunter.");
  h.tasks("Der Startwert n", k("$y = 4x + 3$ schneidet die y-Achse bei ___.", "$y = 3$", ["$y = 4$"], "Bei x gleich 0 bleibt nur die 3 übrig. Das ist der Startwert.", "Was bleibt von der Regel übrig, wenn du für x eine Null einsetzt?"));
  h.say("Die allgemeine Form", "Diese Zeile steht auf dem Formelblatt. Die Buchstaben m und n sind Platzhalter für die zwei Zahlen, die eine Gerade festlegen. Du weißt jetzt, was beide tun: m ist die Steigung, und n ist der Startwert.");
  h.tasks("Die allgemeine Form", k("$y = 5x + 2$. Hier ist $m = $ ___", "5", ["2"], "Das m ist die Zahl vor dem x. Hier ist das die 5.", "Welche Zahl steht in der Gleichung direkt vor dem x?"));

  // --- chapter 3 ---
  h.after(
    "Die allgemeine Form",
    b("Jetzt du: eine Gerade lesen", ["$y = -3x + 6$", "Lies die Steigung und den Startwert ab."], "Jetzt liest du selbst eine Gerade. Du musst dafür nichts rechnen. Schau nur, welche Zahl vor dem x steht und welche Zahl allein am Ende steht. Achte auch auf das Vorzeichen.", {
      tasks: [
        k("Die Steigung ist ___.", "$-3$", ["$6$"], "Vor dem x steht minus 3. Das Vorzeichen gehört dazu.", "Welche Zahl steht vor dem x, und welches Vorzeichen hat sie?"),
        k("Die Gerade schneidet die y-Achse bei ___.", "$y = 6$", ["$y = -3$"], "Die Zahl ohne x ist der Startwert, also die 6.", "Welche Zahl steht allein, ohne ein x dahinter?"),
        k("Von links nach rechts gelesen: Die Gerade ___.", "fällt", ["steigt"], "Die Steigung ist negativ. Deshalb geht es bergab.", "Ist die Zahl vor dem x positiv oder negativ?"),
      ],
    }),
  );
  h.body("Punktprobe", "Liegt $(3\\,|\\,7)$ auf $y = 2x + 1$?", "$2 \\cdot 3 + 1 = 7$ ✓ Ja.", "$(3\\,|\\,8)$? $7 \\neq 8$ ✗ Nein.", "Diese Prüfung heißt **Punktprobe**.");
  h.say("Punktprobe", "So prüfst du, ob ein Punkt auf einer Geraden liegt. Du setzt die erste Zahl des Punktes für x ein und rechnest aus. Kommt die zweite Zahl des Punktes heraus, liegt er auf der Geraden. Diese Aufgabe kommt in fast jeder Prüfung vor.");
  h.tasks("Punktprobe", k("Liegt $(2\\,|\\,5)$ auf $y = 2x + 1$? ___", "Ja", ["Nein"], "2 mal 2 plus 1 ergibt 5. Das ist genau die zweite Zahl des Punktes.", "Setz die 2 für x ein. Kommt die zweite Zahl des Punktes heraus?"));
  h.body("Nullstelle", "Wo ist $y = 0$?", "$2x + 1 = 0 \\quad | -1 \\quad | :2$", "$x = -0{,}5$", "Dort schneidet die Gerade die x-Achse. Diese Stelle heißt **Nullstelle**.");
  h.say("Nullstelle", "An der Nullstelle gibt die Maschine eine Null heraus. Um sie zu finden, schreibst du für y eine 0 und löst die Gleichung nach x auf. Das kannst du schon: erst die Zahl ohne x wegräumen, dann teilen.");
  h.tasks("Nullstelle", k("Nullstelle von $y = x - 4$: Aus $x - 4 = 0$ folgt $x = $ ___", "4", ["$-4$"], "Auf beiden Seiten plus 4 ergibt x gleich 4. Dort schneidet die Gerade die x-Achse.", "Welche Rechnung macht aus minus 4 eine Null?"));
  h.after(
    "Nullstelle",
    b("Das nimmst du mit", ["(1) Eine Funktion gibt jedem $x$ genau ein $y$.", "(2) Punkt lesen: erst nach rechts, dann nach oben.", "(3) Die Zahl vor dem $x$ ist die Steigung.", "(4) Die Zahl ohne $x$ ist der Startwert auf der y-Achse.", "(5) Punktprobe: $x$ einsetzen, mit $y$ vergleichen."], "Das sind die fünf Dinge, die du über Geraden wissen musst. Wenn du unsicher bist, mach dir eine kleine Tabelle mit zwei oder drei Zahlen. Dann siehst du sofort, wie die Gerade verläuft. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("$y = x + 2$. Bei $x = 0$ ist $y = $ ___", "2", ["0"], "Für x gleich 0 bleibt nur die 2 übrig. Das ist der Startwert.", "Was bleibt übrig, wenn du für x eine Null einsetzt?")],
    }),
  );

  // Every board that talks about a shape shows it (drawings and try-it-out elements the app already has).
  const grid = { type: "coordinateSystem", xmin: -3, xmax: 5, ymin: -2, ymax: 8, width: 300, height: 300 };
  h.board("Was ist die Steigung?").figure = { ...grid, lines: [{ m: 2, n: 1, label: "y = 2x + 1" }], points: [{ x: 1, y: 3 }, { x: 2, y: 5 }] };
  h.board("Der Startwert n").figure = { ...grid, lines: [{ m: 2, n: 1, label: "y = 2x + 1" }], points: [{ x: 0, y: 1, label: "(0|1)" }] };
  h.board("Die allgemeine Form").widget = "line-explorer";
  h.board("Nullstelle").figure = { ...grid, lines: [{ m: 2, n: 1, label: "y = 2x + 1" }], points: [{ x: -0.5, y: 0, label: "Nullstelle" }] };

  // Read-through: no arrows on the board; reading the slope from two points gets its own board (the Spickzettel
  // uses it); the zero is found one step per line.
  h.body("Die Maschine", "Regel: **verdopple und plus 1**", "$x = 2$ rein, $5$ raus", "$x = 3$ rein, $7$ raus", "$y = 2x + 1$", "So eine Regel heißt **Funktion**.");
  h.body("Was ist die Steigung?", "$y = 2x + 1$: Die **2** ist die **Steigung** $m$.", "Ein Schritt nach rechts bedeutet **2** Schritte nach oben.");
  h.body("Negative Steigung", "$y = -x + 4$: Steigung $-1$", "Ein Schritt nach rechts bedeutet 1 Schritt nach **unten**.", "Die Gerade **fällt**.");
  h.after(
    "Negative Steigung",
    b("Die Steigung ablesen", ["Such dir zwei Punkte auf der Geraden.", "Von $(0\\,|\\,1)$ zu $(2\\,|\\,5)$: 2 nach rechts, 4 nach oben", "Steigung: nach oben geteilt durch nach rechts", "$m = 4 : 2 = 2$"], "Manchmal siehst du nur das Bild und sollst die Steigung herausfinden. Nimm zwei Punkte, die genau auf Gitterlinien liegen. Zähl, wie weit es von einem zum anderen nach rechts geht und wie weit nach oben. Dann teilst du: nach oben durch nach rechts.", {
      figure: { ...grid, lines: [{ m: 2, n: 1, label: "y = 2x + 1" }], points: [{ x: 0, y: 1, label: "(0|1)" }, { x: 2, y: 5, label: "(2|5)" }] },
      tasks: [k("Von einem Punkt zum nächsten: 3 nach rechts und 6 nach oben. Die Steigung ist ___.", "2", ["3"], "Nach oben geteilt durch nach rechts: 6 geteilt durch 3.", "Welche der beiden Zahlen wird durch die andere geteilt?")],
    }),
  );
  h.body("Nullstelle", "Wo ist $y = 0$?", "$2x + 1 = 0 \\quad | -1$", "$2x = -1 \\quad | :2$", "$x = -0{,}5$", "Dort schneidet die Gerade die x-Achse. Diese Stelle heißt **Nullstelle**.");

  // One idea per board: f as a name, how f(x) is read, putting a number in, and only then the two ways of writing.
  h.before(
    "Schreibweisen",
    b("Die Maschine bekommt einen Namen", ["Unsere Maschine: **verdopple und plus 1**.", "Damit man über sie sprechen kann, bekommt sie einen Namen.", "Sie heißt **f**.", "f ist nur ein Name, so wie Max oder Lena."], "Wenn es mehrere Maschinen gibt, muss man sie auseinanderhalten können. Deshalb gibt man jeder einen kurzen Namen. Meistens nimmt man den Buchstaben f, weil das Wort Funktion mit f beginnt. Eine zweite Maschine würde man g nennen. Mehr steckt hinter dem Buchstaben nicht.", {
      tasks: [k("Eine zweite Maschine macht: mal 3. Ein passender Name für sie ist ___.", "g", ["3"], "Maschinen bekommen einen Buchstaben als Namen. Nach f nimmt man oft g.", "Ist der Name einer Maschine eine Zahl oder ein Buchstabe?")],
    }),
    b("So liest man f(x)", ["$f(x)$", "Man liest: **f von x**.", "Es bedeutet: das, was die Maschine f aus der Zahl $x$ macht.", "Die Klammer heißt hier **nicht** mal."], "Jetzt kommt eine neue Schreibweise. Hinter dem Namen der Maschine steht eine Klammer, und in der Klammer steht die Zahl, die hineinkommt. Das Ganze liest du f von x. Vorsicht: Sonst bedeutet eine Klammer oft mal. Hier nicht. Hier zeigt sie nur, was in die Maschine hineinkommt.", {
      tasks: [k("Eine Maschine heißt g. $g(x)$ liest man ___.", "g von x", ["g mal x"], "Die Klammer zeigt, was in die Maschine g hineinkommt. Sie bedeutet nicht mal.", "Ist g hier eine Zahl, mit der man malnimmt, oder der Name einer Maschine?")],
    }),
    b("Eine Zahl in die Maschine stecken", ["$f(x) = 2x + 1$", "$f(3)$ heißt: Steck die 3 in die Maschine f.", "Überall, wo $x$ steht, schreibst du 3:", "$2 \\cdot 3 + 1$", "Das ergibt $6 + 1$, also 7.", "Man schreibt: $f(3) = 7$. Man liest: f von 3 ist 7."], "Die erste Zeile ist die Regel der Maschine. Steht in der Klammer statt x eine Zahl, dann setzt du diese Zahl überall ein, wo in der Regel ein x steht. Danach rechnest du Schritt für Schritt aus. Erst mal, dann plus. Das Ergebnis ist die Zahl, die aus der Maschine herauskommt.", {
      tasks: [k("$f(x) = 2x + 1$. Dann ist $f(5) = $ ___", "11", ["10"], "Du setzt 5 für x ein: 2 mal 5 ist 10, und 10 plus 1 ergibt 11.", "Du hast 2 mal 5 gerechnet. Was steht in der Regel noch dahinter?")],
    }),
  );
  h.rename("Schreibweisen", "Zwei Schreibweisen, dieselbe Maschine");
  h.body("Zwei Schreibweisen, dieselbe Maschine", "$y = 2x + 1$", "$f(x) = 2x + 1$", "Beide Zeilen beschreiben dieselbe Maschine.", "$y$ ist die Zahl, die herauskommt.", "$f(x)$ ist auch die Zahl, die herauskommt.");
  h.say("Zwei Schreibweisen, dieselbe Maschine", "In Aufgaben siehst du mal die eine und mal die andere Schreibweise. Beide meinen dasselbe. Links steht jeweils die Zahl, die herauskommt, einmal mit dem Namen y und einmal mit dem Namen f von x. Rechts steht die Regel. Du darfst die eine Schreibweise jederzeit durch die andere ersetzen.");
  h.tasks("Zwei Schreibweisen, dieselbe Maschine", k("$f(x) = 3x$. Dieselbe Maschine, mit $y$ geschrieben: ___", "$y = 3x$", ["$y = f \\cdot 3x$"], "Statt f von x schreibst du einfach y. Die Regel rechts bleibt gleich.", "Welcher Teil ändert sich: der Name links oder die Regel rechts?"));

  // New topics: linear and exponential growth (on the Spickzettel, taught nowhere before).
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH", "P_MATH_TERME", "P_MATH_GLEICHUNG", "P_MATH_PROZENT"];
  h.before(
    "Das nimmst du mit",
    b("Zwei Arten zu wachsen", ["Sparschwein: jeden Monat **plus** 50 €", "100 €, 150 €, 200 €, 250 €", "Immer die gleiche Zahl dazu: Das heißt **lineares Wachstum**.", "Der Graph ist eine Gerade."], "Bis jetzt ging es um Geraden. Bei einer Geraden kommt mit jedem Schritt gleich viel dazu. Das nennt man lineares Wachstum. Beim Sparschwein sind es jeden Monat 50 Euro, egal wie voll es schon ist. Gleich siehst du eine zweite Art zu wachsen, die ganz anders verläuft.", {
      figure: { type: "barChart", categories: ["Start", "1", "2", "3"], values: [100, 150, 200, 250] },
      tasks: [k("Ein Baum ist 200 cm hoch und wächst jedes Jahr 30 cm. Nach 2 Jahren ist er ___ hoch.", "260 cm", ["230 cm"], "Zweimal kommen 30 cm dazu: 200 plus 30 plus 30.", "Wie oft kommen die 30 cm in zwei Jahren dazu?")],
    }),
    b("Mal statt plus", ["Bakterien: jede Stunde **mal** 2", "100, 200, 400, 800", "Immer mal die gleiche Zahl: Das heißt **exponentielles Wachstum**.", "Es wird mit jedem Schritt schneller."], "Hier kommt nicht jedes Mal gleich viel dazu. Stattdessen wird jedes Mal mit derselben Zahl malgenommen. Am Anfang sieht das harmlos aus, aber die Sprünge werden immer größer. Von 400 auf 800 kommt mehr dazu als in allen Schritten davor zusammen.", {
      figure: { type: "barChart", categories: ["Start", "1", "2", "3"], values: [100, 200, 400, 800] },
      tasks: [k("3, 6, 12, 24: Hier wird in jedem Schritt ___.", "mal 2 gerechnet", ["plus 3 gerechnet"], "Von 3 auf 6 passt beides. Aber von 6 auf 12 passt nur mal 2.", "Prüf deine Idee auch am zweiten und am dritten Schritt.")],
    }),
    b("Der Wachstumsfaktor", ["Die Zahl, mit der malgenommen wird, heißt **Wachstumsfaktor** $q$.", "Verdoppeln: $q = 2$", "5 % mehr: $q = 1{,}05$", "20 % weniger: $q = 0{,}8$"], "Den Faktor kennst du aus der Prozentrechnung. Bei 5 Prozent mehr werden aus 100 Prozent 105 Prozent, also 1,05. Bei 20 Prozent weniger bleiben 80 Prozent, also 0,8. Ist der Faktor kleiner als 1, wird der Wert mit jedem Schritt kleiner. Das nennt man Abnahme.", {
      tasks: [k("Ein Wert steigt jedes Jahr um 3 %. Der Faktor ist $q = $ ___", "1,03", ["0,03"], "Aus 100 Prozent werden 103 Prozent. Als Dezimalzahl ist das 1,03.", "Wie viel Prozent sind nach einem Jahr insgesamt da?")],
    }),
    b("Nach mehreren Schritten", ["Start: 100 Bakterien, $q = 2$", "Nach 1 Stunde: $100 \\cdot 2$", "Nach 2 Stunden: $100 \\cdot 2 \\cdot 2$", "Nach 3 Stunden: $100 \\cdot 2^3 = 800$", "Die Hochzahl zählt die Schritte."], "Für jeden Schritt nimmst du einmal mit dem Faktor mal. Nach drei Schritten steht der Faktor dreimal da. Das schreibst du kurz mit einer Hochzahl. Achte darauf: Der Faktor steht hoch 3 und nicht mal 3.", {
      tasks: [k("Start 50, $q = 2$. Nach 2 Schritten sind es $50 \\cdot 2^2 = $ ___", "200", ["100"], "2 hoch 2 ist 4, und 50 mal 4 ergibt 200.", "Rechne zuerst die Zahl mit der Hochzahl aus. Erst danach kommt die 50.")],
    }),
    b("Die Formel für Wachstum", ["$B(n) = B_0 \\cdot q^n$", "$B_0$: der Startwert", "$q$: der Wachstumsfaktor", "$n$: die Anzahl der Schritte", "$B(n)$: der Wert nach $n$ Schritten"], "So steht es auf dem Spickzettel. Die Zeile sagt dasselbe wie die Rechnung mit den Bakterien: Startwert mal Faktor hoch Anzahl der Schritte. Die Schreibweise B von n kennst du von f von x. Sie bedeutet: der Wert, der zu n gehört.", {
      tasks: [k("Ein Auto kostet 10 000 € und verliert jedes Jahr 20 % an Wert. Nach $n$ Jahren ist es noch ___ wert.", "$10\\,000 \\cdot 0{,}8^n$", ["$10\\,000 \\cdot 1{,}2^n$"], "20 Prozent weniger heißt: 80 Prozent bleiben. Der Faktor ist deshalb 0,8.", "Wird der Wert größer oder kleiner? Was heißt das für den Faktor?")],
    }),
  );

  h.chapters([
    ["Die Maschine", "Maschine, Tabelle und Bild"],
    ["Was ist die Steigung?", "Steigung und Startwert"],
    ["Die allgemeine Form", "Geraden lesen und prüfen"],
    ["Zwei Arten zu wachsen", "Wachstum: plus oder mal"],
  ]);
  h.renameVocab({ "y oder f(x)": "y", "Steigung m": "Steigung", "y-Achsenabschnitt n": "y-Achsenabschnitt" });
  h.explain([
    "Du setzt die 2 für x ein: 3 mal 2 ist 6, und 6 minus 2 ergibt 4.",
    "Die Zahl vor dem x ist die Steigung. Hier ist das die 5.",
    "Bei x gleich 0 bleibt nur die 3 übrig. Das ist der Startwert auf der y-Achse.",
    "Die erste Zahl ist das x, die zweite das y. Erst laufen, dann klettern.",
    "Ein Minus vor dem x bedeutet bergab, von links nach rechts gelesen.",
  ]);
  h.quiz(q("Liegt der Punkt $(2\\,|\\,7)$ auf der Geraden $y = 3x + 1$?", "Ja, denn $3 \\cdot 2 + 1 = 7$", ["Nein, denn $3 \\cdot 2 + 1 = 6$", "Ja, denn $2 + 7 = 9$", "Das kann man nicht prüfen"], "Bei der Punktprobe setzt du die 2 für x ein. Es kommt 7 heraus, also liegt der Punkt auf der Geraden."));
  // New topics, words and quiz: added after the old quiz explanations.
  p.vocab.push(
    { term: "lineares Wachstum", plain: "In jedem Schritt kommt die gleiche Zahl dazu.", example: "100, 150, 200, 250" },
    { term: "exponentielles Wachstum", plain: "In jedem Schritt wird mit der gleichen Zahl malgenommen.", example: "100, 200, 400, 800" },
    { term: "Wachstumsfaktor", plain: "Die Zahl, mit der in jedem Schritt malgenommen wird.", example: "5 % mehr: $q = 1{,}05$" },
  );
  h.quiz(q("Ein Wert verdoppelt sich in jedem Schritt. Der Start ist 5. Wie groß ist er nach 3 Schritten?", "40", ["30", "15", "11"], "5 mal 2 ist 10, mal 2 ist 20, mal 2 ist 40. Der Faktor 2 steht dreimal da."));
});
