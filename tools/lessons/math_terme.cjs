// P_MATH_TERME to the standard: boards stay; chapters, tap tasks and hints are added,
// plus two missing steps: sorting before combining, and why a minus in front of a bracket flips the signs.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_03_terme.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN"];

  // --- chapter 1 ---
  h.body("Eine Kiste namens x", "$x$ ist ein **Platzhalter**. Ein Ticket kostet $x$ Euro.", "3 Tickets kosten $3 \\cdot x = 3x$ Euro.", "Die Zahl vor dem $x$ heißt **Koeffizient**.");
  h.tasks("Eine Kiste namens x", k("5 Tickets kosten ___ Euro.", "$5x$", ["$x + 5$"], "Fünf Tickets kosten fünfmal den Preis eines Tickets.", "Rechnest du bei mehreren gleichen Tickets plus oder mal?"));
  h.body("Variable heißt veränderlich", "Für $x$ darfst du **jede Zahl** einsetzen. Deshalb heißt $x$ eine **Variable**.", "$x = 5$: $3x = 15$", "$x = 10$: $3x = 30$");
  h.tasks("Variable heißt veränderlich", k("$3x$ mit $x = 2$ ergibt ___.", "6", ["32"], "3x bedeutet 3 mal x, also 3 mal 2.", "Welches Zeichen steht unsichtbar zwischen der 3 und dem x?"));
  h.tasks("Was ist ein Term?", k("Welcher Ausdruck ist ein Term? ___", "$4x + 1$", ["$4x + 1 = 9$"], "Ein Term hat kein Gleichheitszeichen. Er ist nur ein Rechenausdruck.", "In welchem der beiden Ausdrücke steht ein Gleichheitszeichen?"));
  h.tasks("Einsetzen", k("$2x + 3$ mit $x = 5$ ergibt ___.", "13", ["28"], "2 mal 5 ist 10, und dazu kommt 3.", "Rechne zuerst 2 mal 5. Was kommt danach dazu?"));

  // --- chapter 2 ---
  h.tasks("Äpfel zu Äpfeln", k("$4b + 3b = $ ___", "$7b$", ["$12b$"], "Vier b und drei b sind zusammen sieben b.", "Wie viele Äpfel hast du, wenn du vier und drei zusammenlegst?"));
  h.tasks("Äpfel und Birnen", k("$2a + 5b$ ___", "lässt sich nicht zusammenfassen", ["ergibt $7ab$"], "Die Buchstaben sind verschieden. Äpfel und Birnen bleiben getrennt.", "Sind die beiden Buchstaben gleich oder verschieden?"));
  h.after(
    "Äpfel und Birnen",
    b("Erst sortieren, dann zusammenfassen", ["$3a + 2b + 4a$", "Erst alle $a$: $3a + 4a = 7a$", "Dann alle $b$: $2b$", "Ergebnis: $7a + 2b$"], "Wenn in einem Term mehrere Buchstaben durcheinanderstehen, sortierst du zuerst. Du suchst alle Teile mit a und zählst sie zusammen. Dann machst du dasselbe mit b. Am Ende stehen die Sorten nebeneinander, jede nur noch einmal.", {
      tasks: [k("$5x + 2y + x = $ ___", "$6x + 2y$", ["$8xy$"], "Fünf x und ein x sind sechs x. Die zwei y bleiben für sich.", "Welche Teile haben denselben Buchstaben? Zähl nur die zusammen.")],
    }),
    b("Jetzt du: zusammenfassen", "Tipp bei jedem Term auf das richtige Ergebnis.", "Schau bei jedem Term, welche Teile zur selben Sorte gehören. Nur die darfst du zusammenzählen oder voneinander abziehen. Eine Zahl ohne Buchstaben ist eine eigene Sorte.", {
      tasks: [
        k("$6a - 2a = $ ___", "$4a$", ["$4$"], "Sechs a minus zwei a sind vier a. Der Buchstabe bleibt.", "Was bleibt von sechs Äpfeln, wenn du zwei wegnimmst?"),
        k("$x^2 + x^2 = $ ___", "$2x^2$", ["$x^4$"], "Zweimal dieselbe Sorte ergibt zwei davon. Die Hochzahl ändert sich nicht.", "Wie viele Kisten derselben Sorte liegen da?"),
        k("$3x + 4 + 2x = $ ___", "$5x + 4$", ["$9x$"], "Drei x und zwei x sind fünf x. Die 4 hat keinen Buchstaben und bleibt für sich.", "Welche Teile haben ein x und welcher hat keins?"),
      ],
    }),
  );

  // --- chapter 3 ---
  h.tasks("Vertauschen ist erlaubt", k("$7 \\cdot 4$ ist dasselbe wie ___.", "$4 \\cdot 7$", ["$7 + 4$"], "Bei Mal darfst du die Reihenfolge tauschen. Beide Male kommt 28 heraus.", "Rechne beide Möglichkeiten aus. Welche ergibt auch 28?"));
  h.tasks("Aber nicht bei Minus!", k("$10 - 4$ ist dasselbe wie $4 - 10$. Das ist ___.", "falsch", ["richtig"], "10 minus 4 ist 6, aber 4 minus 10 ist minus 6.", "Rechne beide Aufgaben aus. Kommt dasselbe heraus?"));
  h.tasks("Der Trick damit", k("$5 \\cdot 13 \\cdot 2$: Was rechnest du am besten zuerst? ___", "$5 \\cdot 2$", ["$13 \\cdot 2$"], "5 mal 2 ist 10, und mit 10 rechnet es sich leicht weiter.", "Welche zwei Zahlen ergeben zusammen eine glatte Zahl?"));
  h.tasks("Verteilen", k("$3 \\cdot (x + 4) = $ ___", "$3x + 12$", ["$3x + 4$"], "Die 3 wird auf beide verteilt: 3 mal x und 3 mal 4.", "Bekommt auch die 4 in der Klammer die 3 davor?"));

  // --- chapter 4 ---
  h.tasks("Ausklammern = rückwärts", k("$5x + 10 = $ ___", "$5 \\cdot (x + 2)$", ["$5 \\cdot (x + 10)$"], "In 5x und in 10 steckt die 5. In der Klammer bleiben x und 2.", "Was bleibt von der 10 übrig, wenn du die 5 herausziehst?"));
  h.before(
    "Minus vor der Klammer",
    b("Warum dreht ein Minus alles um?", ["$10 - (4 + 1)$", "Mit Klammer: $10 - 5 = 5$", "Ohne Klammer: $10 - 4 - 1 = 5$", "Du nimmst die 4 weg **und** die 1 weg."], "Schau dir das an einem Beispiel mit Zahlen an. Wenn du 4 plus 1 abziehen sollst, ziehst du beides ab. Aus dem Plus vor der 1 wird also ein Minus. Deshalb dreht ein Minus vor der Klammer alles um, was darin steht.", {
      tasks: [k("$8 - (3 + 2) = $ ___", "3", ["7"], "3 plus 2 ist 5, und 8 minus 5 ist 3.", "Rechne zuerst die Klammer aus. Was ziehst du dann von 8 ab?")],
    }),
  );
  h.say("Minus vor der Klammer", "Das Vorzeichen ist das Plus oder Minus, das vor einer Zahl oder einem Buchstaben steht. Ein Minus vor der Klammer dreht jedes Vorzeichen in der Klammer um. Aus x wird minus x, und aus minus 3 wird plus 3. Das brauchst du später beim Rechnen ständig.");
  h.tasks("Minus vor der Klammer", k("$-(x + 5) = $ ___", "$-x - 5$", ["$-x + 5$"], "Beide Vorzeichen drehen sich um: aus plus x wird minus x, aus plus 5 wird minus 5.", "Drehen sich alle Vorzeichen in der Klammer um, oder nur das erste?"));
  h.after(
    "Minus vor der Klammer",
    b("Das nimmst du mit", ["(1) Gleiche Sorten zusammenfassen.", "(2) Bei Plus und Mal darfst du tauschen.", "(3) Die Zahl vor der Klammer geht an **jeden** in der Klammer.", "(4) Ein Minus vor der Klammer dreht alles um."], "Das sind die vier Regeln, mit denen du jeden Term vereinfachen kannst. Wenn du unsicher bist, setz für den Buchstaben eine einfache Zahl ein und prüf, ob vorher und nachher dasselbe herauskommt. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("$2 \\cdot (x + 6) = $ ___", "$2x + 12$", ["$2x + 6$"], "Die 2 wird auf beide verteilt: 2 mal x und 2 mal 6.", "Bekommt auch die 6 in der Klammer die 2 davor?")],
    }),
  );

  // Read-through: one line per step when a bracket is opened or closed.
  h.body("Verteilen", "$2 \\cdot (x + 3)$", "Die 2 wird auf **jeden** in der Klammer verteilt:", "$2 \\cdot x + 2 \\cdot 3$", "Ausgerechnet: $2x + 6$", "Das heißt **Distributivgesetz**.");
  h.body("Ausklammern = rückwärts", "$4x + 8$", "In beiden steckt die 4: $4 \\cdot x$ und $4 \\cdot 2$", "Die 4 kommt **vor die Klammer**:", "$4 \\cdot (x + 2)$");

  // New topics: bracket times bracket and the three binomial formulas (on the Spickzettel, taught nowhere before).
  h.before(
    "Das nimmst du mit",
    b("Klammer mal Klammer", ["$(x + 2) \\cdot (x + 3)$", "Jeder aus der ersten Klammer mal jeden aus der zweiten:", "$x \\cdot x + x \\cdot 3 + 2 \\cdot x + 2 \\cdot 3$", "$x^2 + 3x + 2x + 6$", "Zusammengefasst: $x^2 + 5x + 6$"], "Hier treffen zwei Klammern aufeinander. Jeder Teil der ersten Klammer wird mit jedem Teil der zweiten malgenommen. Das ergibt vier kleine Rechnungen. Danach fasst du gleiche Sorten zusammen, so wie du es schon kannst.", {
      tasks: [k("$(x + 1) \\cdot (x + 2) = $ ___", "$x^2 + 3x + 2$", ["$x^2 + 2$"], "Die vier Teile sind x hoch 2, 2 x, 1 x und 2. Die beiden mittleren ergeben zusammen 3 x.", "Hast du alle vier Rechnungen gemacht, auch die beiden in der Mitte?")],
    }),
    b("Dieselbe Klammer zweimal", ["$(x + 3)^2$ heißt $(x + 3) \\cdot (x + 3)$.", "$x^2 + 3x + 3x + 9$", "Zusammengefasst: $x^2 + 6x + 9$", "Der berühmte Fehler: nur $x^2 + 9$. Dann fehlt die Mitte."], "Die Hochzahl 2 an einer Klammer bedeutet, dass die ganze Klammer zweimal dasteht. Du rechnest wieder jeden mit jedem. In der Mitte entsteht zweimal derselbe Teil, hier zweimal 3 x. Wer nur vorn und hinten quadriert, vergisst genau diese Mitte.", {
      tasks: [k("$(x + 2)^2 = $ ___", "$x^2 + 4x + 4$", ["$x^2 + 4$"], "In der Mitte steht zweimal 2 x, also 4 x. Vorn steht x hoch 2, hinten 4.", "Was entsteht in der Mitte, wenn du jeden mit jedem malnimmst?")],
    }),
    b("Die erste binomische Formel", ["$(a + b)^2 = a^2 + 2ab + b^2$", "Dieses Muster heißt **binomische Formel**.", "Vorn das Quadrat vom ersten Teil, hinten das Quadrat vom zweiten.", "In der Mitte: zweimal das Produkt aus beiden."], "Weil dieses Muster so oft vorkommt, hat es einen Namen bekommen. Die Buchstaben a und b sind Platzhalter für die zwei Teile der Klammer. Die Formel sagt nur, was du eben ausgerechnet hast. Wenn du unsicher bist, rechne lieber jeden mit jedem. Das Ergebnis ist dasselbe.", {
      tasks: [k("$(x + 5)^2$: In der Mitte steht ___.", "$10x$", ["$5x$"], "Zweimal das Produkt aus x und 5: 2 mal 5 mal x.", "Wie oft kommt das Produkt aus beiden Teilen in der Mitte vor?")],
    }),
    b("Die zweite und die dritte", ["Mit Minus: $(a - b)^2 = a^2 - 2ab + b^2$", "Plus mal Minus: $(a + b) \\cdot (a - b) = a^2 - b^2$", "Bei der dritten fällt die Mitte weg: $+ab$ und $-ab$ heben sich auf."], "Es gibt drei binomische Formeln, und alle stehen auf dem Spickzettel. Bei der zweiten wird die Mitte abgezogen. Das Ende bleibt trotzdem plus, denn minus mal minus ergibt plus. Bei der dritten heben sich die beiden mittleren Teile gegenseitig auf.", {
      tasks: [k("$(x + 3) \\cdot (x - 3) = $ ___", "$x^2 - 9$", ["$x^2 - 6x + 9$"], "Die mittleren Teile sind plus 3 x und minus 3 x. Sie heben sich auf.", "Was passiert mit den beiden mittleren Teilen, wenn einer plus und einer minus ist?")],
    }),
  );

  // Gentle start: the unknown price first, then several tickets, then the name of the number in front.
  h.body("Eine Kiste namens x", "Ein Ticket fürs Kino. Den Preis kennst du noch nicht.", "Für den Preis schreibst du einen Buchstaben: $x$", "$x$ ist ein **Platzhalter** für eine Zahl.");
  h.tasks("Eine Kiste namens x", k("Eine Kugel Eis kostet einen Preis, den du noch nicht kennst. Dafür schreibst du ___.", "einen Buchstaben", ["eine Null"], "Ein Buchstabe hält den Platz frei, bis du die Zahl kennst.", "Was schreibt man für eine Zahl, die man noch nicht kennt?"));
  h.after(
    "Eine Kiste namens x",
    b("Mehrere Tickets", ["Ein Ticket kostet $x$ Euro.", "3 Tickets kosten 3 mal $x$ Euro: $3 \\cdot x$", "Kurz schreibt man: $3x$"], "Jetzt kaufst du drei Tickets. Jedes kostet x Euro, also zahlst du drei mal x. Den Malpunkt zwischen Zahl und Buchstabe lässt man weg. So wird aus 3 mal x einfach 3x.", {
      tasks: [k("5 Tickets kosten ___ Euro.", "$5x$", ["$x + 5$"], "Fünf Tickets kosten fünfmal den Preis von einem Ticket.", "Rechnest du bei mehreren gleichen Tickets plus oder mal?")],
    }),
    b("Die Zahl vor dem x", ["In $3x$ steht die 3 vor dem $x$.", "Diese Zahl heißt **Koeffizient**.", "Sie sagt, wie oft das $x$ genommen wird."], "Die Zahl, die vor dem Buchstaben steht, hat einen eigenen Namen. Sie heißt Koeffizient. Das Wort klingt schwer, bedeutet aber nur: so oft wird das x genommen. In 3x ist das die 3.", {
      tasks: [k("In $7x$ ist der Koeffizient ___.", "7", ["$x$"], "Die 7 steht vor dem Buchstaben. Sie ist der Koeffizient.", "Welche Zahl steht direkt vor dem Buchstaben?")],
    }),
  );

  // First board without a letter: the unknown price as a closed box; the name x comes on the next board.
  h.body("Eine Kiste namens x", "Ein Ticket fürs Kino. Den Preis kennst du noch nicht.", "Stell dir eine geschlossene **Kiste** vor.", "In der Kiste liegt der Preis.", "Du weißt nur: Es ist eine Zahl.");
  h.rename("Eine Kiste namens x", "Eine Kiste für eine Zahl");
  h.tasks("Eine Kiste für eine Zahl", k("Du weißt noch nicht, wie viele Gäste zur Party kommen. Die Anzahl ist noch ___.", "unbekannt", ["null"], "Du kennst die Zahl noch nicht. Das heißt aber nicht, dass niemand kommt.", "Bedeutet nicht kennen dasselbe wie nichts?"));
  h.after(
    "Eine Kiste für eine Zahl",
    b("Die Kiste heißt x", ["Die Kiste bekommt einen Namen: $x$", "$x$ ist ein **Platzhalter** für eine Zahl.", "Ein Ticket kostet also $x$ Euro."], "Damit man über die Kiste sprechen kann, gibt man ihr einen Namen. Meistens nimmt man den Buchstaben x. Er hält den Platz frei, bis du die Zahl kennst. Später setzt du die richtige Zahl ein.", {
      tasks: [k("Eine Kugel Eis kostet einen Preis, den du noch nicht kennst. Dafür schreibst du ___.", "einen Buchstaben", ["eine Null"], "Ein Buchstabe hält den Platz frei, bis du die Zahl kennst.", "Was schreibt man für eine Zahl, die man noch nicht kennt?")],
    }),
  );

  // One new thing per board: letters and powers apart, the word Vorzeichen on the board,
  // the second and the third binomial formula apart.
  h.body("Äpfel zu Äpfeln", "$3a + 2a = 5a$", "3 Äpfel + 2 Äpfel = 5 Äpfel", "Das nennt man **zusammenfassen**.");
  h.body("Äpfel und Birnen", "$3a + 2b$ bleibt $3a + 2b$.", "Die Buchstaben sind **verschieden**.", "Verschiedene Buchstaben kannst du nicht zusammenzählen.");
  h.after(
    "Äpfel und Birnen",
    b("Auch die Hochzahl macht eine eigene Sorte", ["$x^2$ heißt $x \\cdot x$. Das ist etwas anderes als $x$.", "Mit $x = 3$: $x^2 = 9$, aber $x = 3$.", "$x^2 + x$ bleibt deshalb so stehen."], "Auch derselbe Buchstabe kann zu zwei Sorten gehören. Ein x mit der Hochzahl 2 ist etwas anderes als ein x ohne Hochzahl. Du siehst es, wenn du eine Zahl einsetzt. Darum darfst du die beiden nicht zusammenzählen.", {
      tasks: [k("$x^2 + 2x$ ___", "lässt sich nicht zusammenfassen", ["ergibt $3x^2$"], "Ein x mit Hochzahl 2 und ein x ohne Hochzahl sind verschiedene Sorten. Sie bleiben getrennt.", "Haben beide Teile dieselbe Hochzahl am x?")],
    }),
  );
  h.body("Minus vor der Klammer", "Das Plus oder Minus vor einer Zahl heißt **Vorzeichen**.", "$-(x - 3) = -x + 3$", "Das Minus vor der Klammer dreht jedes Vorzeichen in der Klammer um.");

  h.rename("Die zweite und die dritte", "Die zweite binomische Formel");
  h.body("Die zweite binomische Formel", "$(a - b)^2 = a^2 - 2ab + b^2$", "Wie die erste, nur wird die Mitte abgezogen.", "Das Ende bleibt plus, denn minus mal minus ergibt plus.");
  h.say("Die zweite binomische Formel", "Es gibt drei binomische Formeln, und alle stehen auf dem Spickzettel. Die zweite gilt, wenn in der Klammer ein Minus steht. Dann wird die Mitte abgezogen. Das Ende bleibt trotzdem plus, denn minus mal minus ergibt plus.");
  h.tasks("Die zweite binomische Formel", k("$(x - 4)^2 = $ ___", "$x^2 - 8x + 16$", ["$x^2 - 8x - 16$"], "Die Mitte ist zweimal 4 mal x und wird abgezogen. Hinten steht 4 mal 4, und das bleibt plus.", "Minus mal minus: Welches Zeichen steht dann vor der letzten Zahl?"));
  h.after(
    "Die zweite binomische Formel",
    b("Die dritte binomische Formel", ["$(a + b) \\cdot (a - b) = a^2 - b^2$", "In der Mitte entstehen $-ab$ und $+ab$.", "Die beiden heben sich auf. Die Mitte fällt weg."], "Bei der dritten Formel steht in einer Klammer ein Plus und in der anderen ein Minus. Wenn du jeden mit jedem malnimmst, entstehen in der Mitte zwei Teile, die sich gegenseitig aufheben. Übrig bleiben nur vorn und hinten die beiden Quadrate.", {
      tasks: [k("$(x + 3) \\cdot (x - 3) = $ ___", "$x^2 - 9$", ["$x^2 - 6x + 9$"], "Die mittleren Teile sind plus 3 x und minus 3 x. Sie heben sich auf.", "Was passiert mit den beiden mittleren Teilen, wenn einer plus und einer minus ist?")],
    }),
  );

  h.chapters([
    ["Eine Kiste für eine Zahl", "Was ein x ist"],
    ["Äpfel zu Äpfeln", "Zusammenfassen"],
    ["Vertauschen ist erlaubt", "Die drei Rechengesetze"],
    ["Der klassische Fehler", "Klammern auflösen"],
    ["Klammer mal Klammer", "Klammer mal Klammer und binomische Formeln"],
  ]);
  h.explain([
    "Gleiche Buchstaben darfst du zusammenzählen: 3 a und 4 a sind 7 a. Der Buchstabe selbst ändert sich dabei nicht.",
    "Die 2 wird auf jeden Teil in der Klammer verteilt: 2 mal x und 2 mal 5. Die 5 darf nicht leer ausgehen.",
    "Kommutativ bedeutet vertauschbar. Bei Plus kommt dasselbe heraus, egal welche Zahl vorn steht.",
    "In 6x und in 9 steckt beide Male die 3. Sie kommt vor die Klammer, und in der Klammer bleibt 2x plus 3.",
    "Das Minus vor der Klammer dreht jedes Vorzeichen um. Aus a wird minus a, und aus minus 4 wird plus 4.",
  ]);
  h.quiz(q("Was ist $2a + 3b + a$?", "$3a + 3b$", ["$6ab$", "$5a + b$", "$3a + 3$"], "Zuerst sortierst du: 2 a und 1 a sind 3 a. Die 3 b sind eine andere Sorte und bleiben für sich."));
  // New topics, words and quiz: added after the old quiz explanations.
  p.vocab.push({ term: "binomische Formel", plain: "Ein festes Muster für eine Klammer hoch 2: vorn ein Quadrat, hinten ein Quadrat, in der Mitte zweimal das Produkt.", example: "$(a + b)^2 = a^2 + 2ab + b^2$" });
  h.quiz(q("Was ist $(x + 4)^2$?", "$x^2 + 8x + 16$", ["$x^2 + 16$", "$x^2 + 4x + 16$", "$2x + 8$"], "Vorn steht x hoch 2, hinten 4 mal 4, also 16. In der Mitte steht zweimal 4 x, also 8 x."));

  // Word card: every word and letter of this lesson.
  h.vocab(
    { term: "x", plain: "Ein Buchstabe als Kiste für eine Zahl, die du noch nicht kennst.", example: "Ein Ticket kostet $x$ Euro." },
    { term: "Platzhalter", plain: "Etwas, das den Platz für eine Zahl frei hält.", example: "$x$" },
    { term: "Variable", plain: "Ein Buchstabe, für den du jede Zahl einsetzen darfst.", example: "$x$, $a$, $y$" },
    { term: "Koeffizient", plain: "Die Zahl vor dem Buchstaben. Sie sagt, wie oft er genommen wird.", example: "Bei $7x$ ist 7 der Koeffizient." },
    { term: "Term", plain: "Ein Rechenausdruck ohne Gleichheitszeichen.", example: "$3x + 5$" },
    { term: "Einsetzen", plain: "Für den Buchstaben eine Zahl schreiben und ausrechnen.", example: "$3x + 5$ mit $x = 4$: $3 \\cdot 4 + 5 = 17$" },
    { term: "Zusammenfassen", plain: "Gleiche Sorten zusammenzählen.", example: "$3a + 2a = 5a$" },
    { term: "Sorte", plain: "Teile mit demselben Buchstaben und derselben Hochzahl.", example: "$3a$ und $2a$ sind eine Sorte, $a$ und $b$ nicht." },
    { term: "Kommutativgesetz", plain: "Bei Plus und Mal darfst du die Reihenfolge tauschen.", example: "$3 + 5 = 5 + 3$" },
    { term: "Assoziativgesetz", plain: "Bei Plus und Mal darfst du die Klammern versetzen.", example: "$(2 + 3) + 7 = 2 + (3 + 7)$" },
    { term: "Distributivgesetz", plain: "Die Zahl vor der Klammer wird auf jeden in der Klammer verteilt.", example: "$2 \\cdot (x + 3) = 2x + 6$" },
    { term: "Ausmultiplizieren", plain: "Eine Klammer auflösen, indem du die Zahl davor verteilst.", example: "$4 \\cdot (x + 2) = 4x + 8$" },
    { term: "Ausklammern", plain: "Das Gemeinsame vor die Klammer ziehen. Das ist Ausmultiplizieren rückwärts.", example: "$4x + 8 = 4 \\cdot (x + 2)$" },
    { term: "Vorzeichen", plain: "Das Plus oder Minus vor einer Zahl oder einem Buchstaben.", example: "Bei $-3$ ist das Vorzeichen minus." },
    { term: "binomische Formel", plain: "Ein festes Muster für eine Klammer hoch 2: vorn ein Quadrat, hinten ein Quadrat, in der Mitte zweimal das Produkt.", example: "$(a + b)^2 = a^2 + 2ab + b^2$" },
  );
});
