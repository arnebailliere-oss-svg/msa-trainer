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

  // Gentle start: the machine in words and numbers first; the letters x and y and the short rule on the next board.
  h.body("Die Maschine", "Stell dir eine Maschine vor.", "Vorne kommt eine Zahl hinein, hinten kommt eine Zahl heraus.", "Ihre Regel: **verdopple und plus 1**", "2 hinein, 5 heraus", "3 hinein, 7 heraus");
  h.say("Die Maschine", "So eine Maschine ist ganz einfach. Du steckst eine Zahl hinein, und sie macht immer dasselbe damit. Hier verdoppelt sie die Zahl und zählt dann 1 dazu. Aus 2 wird 4 und dann 5. Probier es unten mit einer anderen Zahl aus.");
  h.tasks("Die Maschine", k("Regel: verdopple und plus 1. 4 hinein, ___ heraus.", "9", ["6"], "4 verdoppelt ist 8, und 8 plus 1 ergibt 9.", "Verdopple zuerst die 4. Was kommt dann noch dazu?"));
  h.after(
    "Die Maschine",
    b("Die Regel kurz aufschreiben", ["Die Zahl, die hineinkommt, nennt man $x$.", "Die Zahl, die herauskommt, nennt man $y$.", "Verdopple und plus 1 heißt dann: $y = 2x + 1$", "So eine Regel heißt **Funktion**."], "Das x ist die Zahl, die in die Maschine hineinkommt. Das y ist die Zahl, die herauskommt. Die Regel dazwischen ist das, was die Maschine tut. Verdoppeln schreibt man als 2x, und plus 1 kommt dahinter. So steht die ganze Maschine in einer kurzen Zeile.", {
      tasks: [k("Regel: nimm die Zahl mal 3. Kurz geschrieben: ___", "$y = 3x$", ["$y = x + 3$"], "Mal 3 schreibt man als 3x. Das Ergebnis heißt y.", "Wird in der Regel malgenommen oder dazugezählt?")],
    }),
  );

  // One new thing per board: names for the numbers, the short rule, the word Funktion, the grid, a point,
  // the slope as a picture before the letter m, the start value as a picture before the letter n.
  h.before(
    "Die Regel kurz aufschreiben",
    b("Die Zahlen bekommen Namen", ["Die Zahl, die hineinkommt, nennt man $x$.", "Die Zahl, die herauskommt, nennt man $y$.", "2 hinein, 5 heraus heißt dann: $x = 2$ und $y = 5$."], "Damit man nicht immer hinein und heraus sagen muss, bekommen die beiden Zahlen kurze Namen. Die Zahl, die in die Maschine hineinkommt, heißt x. Die Zahl, die herauskommt, heißt y. Mehr bedeuten diese zwei Buchstaben in dieser Lektion nicht.", {
      tasks: [k("3 hinein, 7 heraus. Dann ist $y = $ ___", "7", ["3"], "Das y ist die Zahl, die aus der Maschine herauskommt.", "Welche der beiden Zahlen kommt heraus, und wie heißt sie?")],
    }),
  );
  h.body("Die Regel kurz aufschreiben", "Die Regel heißt: verdopple und plus 1.", "Verdoppeln heißt 2 mal $x$. Kurz: $2x$", "Plus 1 kommt dahinter: $2x + 1$", "Das ist die Zahl, die herauskommt: $y = 2x + 1$");
  h.say("Die Regel kurz aufschreiben", "Jetzt schreiben wir die Regel in kurzer Form auf. Verdoppeln bedeutet zwei mal x, und den Malpunkt lässt man weg. Dahinter kommt plus 1. Das Ergebnis ist die Zahl, die herauskommt, also y. So steht die ganze Maschine in einer einzigen Zeile.");
  h.after(
    "Die Regel kurz aufschreiben",
    b("Das Wort Funktion", ["So eine Regel heißt **Funktion**.", "Eine Funktion macht aus jeder Zahl $x$ genau eine Zahl $y$.", "Dieselbe Zahl hinein ergibt immer dieselbe Zahl heraus."], "Funktion ist nur das Fachwort für so eine Maschine. Wichtig ist eine einzige Eigenschaft: Die Maschine ist zuverlässig. Wenn du heute eine 4 hineinsteckst und morgen wieder, kommt beide Male dasselbe heraus.", {
      tasks: [k("Eine Funktion bekommt zweimal die 4. Heraus kommt ___.", "beide Male dieselbe Zahl", ["jedes Mal eine andere Zahl"], "Eine Funktion ist zuverlässig. Dieselbe Zahl hinein ergibt dieselbe Zahl heraus.", "Kann eine zuverlässige Maschine bei derselben Zahl verschiedene Ergebnisse liefern?")],
    }),
  );
  h.body("Die Wertetabelle", "Steck nacheinander 0, 1, 2 und 3 in die Maschine.", "Schreib auf, was herauskommt:", "$x$: 0, 1, 2, 3", "$y$: 1, 3, 5, 7", "So eine Liste heißt **Wertetabelle**.");

  // The grid first, a point in it afterwards.
  {
    const grid0 = { type: "coordinateSystem", xmin: -1, xmax: 6, ymin: -1, ymax: 8, width: 300, height: 300 };
    const point = h.board("Das Koordinatensystem").figure;
    h.before(
      "Das Koordinatensystem",
      b("Ein Gitter mit zwei Achsen", ["Das Gitter hat zwei Achsen.", "Die waagerechte heißt **x-Achse**. Nach rechts wird $x$ größer.", "Die senkrechte heißt **y-Achse**. Nach oben wird $y$ größer.", "Das ganze Gitter heißt **Koordinatensystem**."], "Um die Maschine zu zeichnen, brauchst du ein Gitter. Es hat zwei Linien mit Pfeilen, die Achsen. Auf der waagerechten Achse liest du x ab, auf der senkrechten y. Wo sich die beiden Achsen kreuzen, sind beide Zahlen null.", {
        figure: grid0,
        tasks: [k("Du gehst im Gitter nach oben. Dabei wird ___ größer.", "$y$", ["$x$"], "Nach oben liest du an der senkrechten Achse ab, und das ist die y-Achse.", "Welche Achse steht senkrecht, also von unten nach oben?")],
      }),
    );
    h.rename("Das Koordinatensystem", "Ein Punkt im Gitter");
    h.body("Ein Punkt im Gitter", "Ein Punkt hat zwei Zahlen: $(2\\,|\\,5)$", "Die erste Zahl ist $x$: 2 nach rechts.", "Die zweite Zahl ist $y$: 5 nach oben.", "Merk dir: erst laufen, dann klettern.");
    h.board("Ein Punkt im Gitter").figure = point;
  }
  h.body("Punkte werden ein Bild", "Jedes Paar aus der Tabelle ist ein Punkt, zum Beispiel $(0\\,|\\,1)$ und $(1\\,|\\,3)$.", "Trägst du alle ein, liegen sie auf einer geraden Linie.", "Diese Linie heißt **Gerade**.", "Sie ist das Bild der Funktion. Dafür sagt man **Graph**.");

  // Slope: the picture first, the letter m on the next board.
  h.body("Was ist die Steigung?", "Geh auf der Geraden einen Schritt nach rechts.", "Dann geht es 2 Schritte nach oben.", "Diese Zahl heißt **Steigung**.", "Die Steigung dieser Geraden ist 2.");
  h.say("Was ist die Steigung?", "Die Steigung sagt, wie steil eine Gerade ist. Du gehst immer genau einen Schritt nach rechts und schaust, wie weit es dabei nach oben geht. Bei dieser Geraden sind es zwei Schritte. Je größer die Zahl, desto steiler der Berg.");
  h.tasks("Was ist die Steigung?", k("Bei einer anderen Geraden geht es pro Schritt nach rechts 3 Schritte nach oben. Ihre Steigung ist ___.", "3", ["1"], "Die Steigung ist die Zahl der Schritte nach oben bei einem Schritt nach rechts.", "Wie weit geht es nach oben, wenn du einen Schritt nach rechts gehst?"));
  h.after(
    "Was ist die Steigung?",
    b("Die Steigung steht in der Regel", ["$y = 2x + 1$", "Die Zahl vor dem $x$ ist die Steigung: die **2**.", "Für die Steigung schreibt man kurz $m$.", "Hier ist $m = 2$."], "Du musst die Steigung nicht jedes Mal im Bild abzählen. Sie steht schon in der Regel, nämlich direkt vor dem x. Weil man oft über die Steigung spricht, hat sie einen kurzen Namen bekommen, den Buchstaben m.", {
      tasks: [k("$y = 3x + 2$. Ein Schritt nach rechts bedeutet ___ nach oben.", "3 Schritte", ["2 Schritte"], "Die Zahl vor dem x ist die Steigung. Hier ist das die 3.", "Welche der beiden Zahlen steht direkt vor dem x?")],
    }),
  );
  h.body("Negative Steigung", "$y = -x + 4$", "Vor dem $x$ steht nur ein Minus. Das heißt: Steigung $-1$.", "Ein Schritt nach rechts bedeutet 1 Schritt nach **unten**.", "Die Gerade **fällt**.");

  // Start value: the picture first, the technical word and the letter n on the next board.
  {
    const fig = h.board("Der Startwert n").figure;
    h.before(
      "Der Startwert n",
      b("Wo die Gerade startet", ["Schau auf das Bild.", "Die Gerade kreuzt die senkrechte Achse bei der Höhe 1.", "Diese Höhe ist der **Startwert** der Geraden."], "Jede Gerade kreuzt irgendwo die senkrechte Achse. Diese Stelle kannst du dir als Start vorstellen. Von dort aus geht es mit der Steigung weiter, nach rechts hinauf oder hinunter. Bei dieser Geraden liegt der Start bei der Höhe 1.", {
        figure: fig,
        tasks: [k("Eine andere Gerade kreuzt die senkrechte Achse bei der Höhe 3. Ihr Startwert ist ___.", "3", ["0"], "Der Startwert ist die Höhe, bei der die Gerade die senkrechte Achse kreuzt.", "Bei welcher Höhe kreuzt diese Gerade die senkrechte Achse?")],
      }),
    );
    h.rename("Der Startwert n", "Der Startwert steht in der Regel");
    delete h.board("Der Startwert steht in der Regel").figure;
    h.body("Der Startwert steht in der Regel", "$y = 2x + 1$", "Die Zahl ohne $x$ ist der Startwert: die **1**.", "Das Fachwort dafür ist **y-Achsenabschnitt**.", "Kurz schreibt man dafür $n$. Hier ist $n = 1$.");
    h.say("Der Startwert steht in der Regel", "Auch den Startwert musst du nicht im Bild suchen. Er steht in der Regel, und zwar als die Zahl ohne x. Sein Fachwort ist lang: y-Achsenabschnitt. Es bedeutet nur: die Stelle, an der die Gerade die y-Achse schneidet. Der kurze Name dafür ist der Buchstabe n.");
  }
  h.body("Die allgemeine Form", "$y = m \\cdot x + n$", "$m$ ist die Steigung: die Zahl vor dem $x$.", "$n$ ist der Startwert: die Zahl ohne $x$.", "Jede Gerade lässt sich so aufschreiben.");

  // Punktprobe: the case that fits and the case that does not fit on two boards.
  h.body("Punktprobe", "Liegt der Punkt $(3\\,|\\,7)$ auf $y = 2x + 1$?", "Setz die erste Zahl für $x$ ein: $2 \\cdot 3 + 1 = 7$", "Heraus kommt 7. Das ist die zweite Zahl des Punktes.", "Also liegt der Punkt auf der Geraden.", "Diese Prüfung heißt **Punktprobe**.");
  h.after(
    "Punktprobe",
    b("Wenn es nicht passt", ["Liegt der Punkt $(3\\,|\\,8)$ auf $y = 2x + 1$?", "Einsetzen: $2 \\cdot 3 + 1 = 7$", "Der Punkt sagt aber 8.", "7 ist nicht 8. Der Punkt liegt **nicht** auf der Geraden."], "Jetzt dieselbe Prüfung mit einem anderen Punkt. Du setzt wieder die erste Zahl ein und rechnest. Kommt etwas anderes heraus als die zweite Zahl des Punktes, dann liegt der Punkt neben der Geraden.", {
      tasks: [k("Liegt $(1\\,|\\,5)$ auf $y = 2x + 1$? ___", "Nein", ["Ja"], "Eingesetzt kommt 3 heraus. Der Punkt sagt aber 5.", "Setz 1 für x ein. Kommt die zweite Zahl des Punktes heraus?")],
    }),
  );

  // Nullstelle: the picture first, the calculation on the next board.
  {
    const s = h.board("Nullstelle");
    const oldTasks = s.tasks;
    h.body("Nullstelle", "Schau auf das Bild.", "Die Gerade kreuzt die waagerechte Achse.", "An dieser Stelle ist die Höhe null, also $y = 0$.", "Diese Stelle heißt **Nullstelle**.");
    h.say("Nullstelle", "An der Nullstelle gibt die Maschine eine Null heraus. Im Bild erkennst du sie sofort: Es ist die Stelle, an der die Gerade die waagerechte Achse kreuzt. Dort ist die Höhe null. Wie du sie ausrechnest, zeigt die nächste Tafel.");
    h.tasks("Nullstelle", k("Eine Gerade kreuzt die waagerechte Achse bei $x = 3$. Ihre Nullstelle ist ___.", "$x = 3$", ["$y = 3$"], "Die Nullstelle ist die Stelle auf der x-Achse. Dort ist y gleich null.", "Auf welcher Achse liegt die Nullstelle: auf der waagerechten oder der senkrechten?"));
    h.after("Nullstelle", {
      title: "Die Nullstelle ausrechnen",
      body: ["Schreib für $y$ eine 0: $2x + 1 = 0$", "Auf beiden Seiten minus 1: $2x = -1$", "Auf beiden Seiten geteilt durch 2: $x = -0{,}5$", "Die Nullstelle liegt bei $x = -0{,}5$."].join("\n\n"),
      tasks: oldTasks,
      say: "Um die Nullstelle auszurechnen, schreibst du für y eine 0. Dann hast du eine Gleichung mit x, und die löst du wie gewohnt. Erst räumst du die Zahl ohne x weg, dann teilst du durch die Zahl vor dem x.",
    });
  }

  // Round 2: putting a number in and working it out apart; the growth letters before the growth formula.
  h.body("Eine Zahl in die Maschine stecken", "$f(x) = 2x + 1$", "$f(3)$ heißt: Steck die 3 in die Maschine f.", "Überall, wo $x$ steht, schreibst du 3: $2 \\cdot 3 + 1$");
  h.say("Eine Zahl in die Maschine stecken", "Die erste Zeile ist die Regel der Maschine. Steht in der Klammer statt x eine Zahl, dann setzt du diese Zahl überall ein, wo in der Regel ein x steht. Mehr passiert auf dieser Tafel nicht. Ausgerechnet wird auf der nächsten.");
  {
    const work = h.board("Eine Zahl in die Maschine stecken").tasks;
    h.tasks("Eine Zahl in die Maschine stecken", k("$f(x) = 2x + 1$. Für $f(4)$ schreibst du ___.", "$2 \\cdot 4 + 1$", ["$2 \\cdot x + 4$"], "Die 4 kommt genau an die Stelle, an der in der Regel das x steht.", "An welcher Stelle der Regel steht das x? Dort kommt die 4 hin."));
    h.after(
      "Eine Zahl in die Maschine stecken",
      b("Dann ausrechnen", ["$2 \\cdot 3 + 1$", "Erst mal: $6 + 1$", "Dann plus: 7", "Man schreibt: $f(3) = 7$. Man liest: f von 3 ist 7."], "Jetzt rechnest du Schritt für Schritt aus. Erst mal, dann plus. Das Ergebnis ist die Zahl, die aus der Maschine herauskommt. Die letzte Zeile sagt in kurzer Form: Steckst du 3 hinein, kommt 7 heraus.", { tasks: work }),
    );
    const growth = h.board("Die Formel für Wachstum").tasks;
    h.before(
      "Die Formel für Wachstum",
      b("Buchstaben für das Wachstum", ["Du hast gerechnet: $100 \\cdot 2^3 = 800$", "Den Wert am Anfang nennt man $B_0$. Hier: 100", "Die Anzahl der Schritte nennt man $n$. Hier: 3", "Den Wert nach $n$ Schritten nennt man $B(n)$. Hier: $B(3) = 800$"], "Für die Formel bekommen die Zahlen wieder Namen. B steht für Bestand, also für das, was gerade da ist. Die kleine 0 bedeutet: nach null Schritten, also am Anfang. Achtung: Der Buchstabe n zählt hier die Schritte. Bei den Geraden stand er für etwas anderes.", {
        tasks: [k("Start 50, $q = 2$, nach 4 Schritten. Dann ist $n = $ ___", "4", ["50"], "Das n ist die Anzahl der Schritte. Hier sind es 4.", "Welche der Zahlen zählt die Schritte?")],
      }),
    );
    h.body("Die Formel für Wachstum", "$B(n) = B_0 \\cdot q^n$", "In Worten: Wert am Anfang mal Wachstumsfaktor hoch Anzahl der Schritte.", "Mit den Bakterien: $B(3) = 100 \\cdot 2^3$");
    h.board("Die Formel für Wachstum").tasks = growth;
  }

  h.chapters([
    ["Die Maschine", "Die Maschine und ihre Regel"],
    ["Die Wertetabelle", "Tabelle und Bild"],
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
  // Word card: every word and sign of this lesson in the learner's words.
  h.vocab(
    { term: "x", plain: "Die Zahl, die in die Maschine hineinkommt.", example: "$x = 2$" },
    { term: "y", plain: "Die Zahl, die aus der Maschine herauskommt.", example: "$y = 5$" },
    { term: "Funktion", plain: "Eine Regel, die aus jeder Zahl x genau eine Zahl y macht. Wie eine Maschine.", example: "$y = 2x + 1$" },
    { term: "f(x)", plain: "Gelesen: f von x. Das, was die Maschine f aus der Zahl x macht. Es ist dasselbe wie y.", example: "$f(3) = 7$" },
    { term: "Wertetabelle", plain: "Eine Liste. Oben stehen die Zahlen, die hineinkommen. Darunter steht, was herauskommt." },
    { term: "Koordinatensystem", plain: "Ein Gitter mit zwei Achsen, in das man Punkte einträgt." },
    { term: "x-Achse", plain: "Die waagerechte Achse. Nach rechts wird x größer." },
    { term: "y-Achse", plain: "Die senkrechte Achse. Nach oben wird y größer." },
    { term: "Punkt", plain: "Eine Stelle im Gitter mit zwei Zahlen: erst nach rechts, dann nach oben.", example: "$(2\\,|\\,5)$" },
    { term: "Gerade", plain: "Eine gerade Linie ohne Knick." },
    { term: "Graph", plain: "Das Bild einer Funktion im Koordinatensystem." },
    { term: "Steigung", plain: "Wie viel es nach oben geht, wenn du einen Schritt nach rechts gehst. Bei einem Minus geht es nach unten." },
    { term: "m", plain: "Der Buchstabe für die Steigung. Es ist die Zahl vor dem x.", example: "In $y = 2x + 1$ ist $m = 2$." },
    { term: "Startwert", plain: "Die Höhe, bei der die Gerade die senkrechte Achse kreuzt." },
    { term: "y-Achsenabschnitt", plain: "Das Fachwort für den Startwert." },
    { term: "n", plain: "Der Buchstabe für den Startwert. Es ist die Zahl ohne x. Beim Wachstum zählt n dagegen die Schritte.", example: "In $y = 2x + 1$ ist $n = 1$." },
    { term: "Punktprobe", plain: "Prüfen, ob ein Punkt auf der Geraden liegt: erste Zahl einsetzen und mit der zweiten vergleichen." },
    { term: "Nullstelle", plain: "Die Stelle, an der die Gerade die waagerechte Achse kreuzt. Dort ist y gleich null." },
    { term: "lineares Wachstum", plain: "In jedem Schritt kommt die gleiche Zahl dazu.", example: "100, 150, 200, 250" },
    { term: "exponentielles Wachstum", plain: "In jedem Schritt wird mit der gleichen Zahl malgenommen.", example: "100, 200, 400, 800" },
    { term: "Wachstumsfaktor", plain: "Die Zahl, mit der in jedem Schritt malgenommen wird.", example: "5 % mehr: $q = 1{,}05$" },
    { term: "q", plain: "Der Buchstabe für den Wachstumsfaktor." },
  );

  // Round 2: the letters of the growth formula and the machine's name are on the card too.
  p.vocab.push(
    { term: "f", plain: "Der Name der Maschine. Eine zweite Maschine heißt oft g.", example: "$f(x) = 2x + 1$" },
    { term: "$B_0$", plain: "Der Wert am Anfang, also nach null Schritten.", example: "$B_0 = 100$" },
    { term: "B(n)", plain: "Der Wert nach n Schritten.", example: "$B(3) = 800$" },
  );
});
