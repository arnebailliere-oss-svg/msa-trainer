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

  h.chapters([
    ["Eine Kiste namens x", "Was ein x ist"],
    ["Äpfel zu Äpfeln", "Zusammenfassen"],
    ["Vertauschen ist erlaubt", "Die drei Rechengesetze"],
    ["Der klassische Fehler", "Klammern auflösen"],
  ]);
  h.explain([
    "Gleiche Buchstaben darfst du zusammenzählen: 3 a und 4 a sind 7 a. Der Buchstabe selbst ändert sich dabei nicht.",
    "Die 2 wird auf jeden Teil in der Klammer verteilt: 2 mal x und 2 mal 5. Die 5 darf nicht leer ausgehen.",
    "Kommutativ bedeutet vertauschbar. Bei Plus kommt dasselbe heraus, egal welche Zahl vorn steht.",
    "In 6x und in 9 steckt beide Male die 3. Sie kommt vor die Klammer, und in der Klammer bleibt 2x plus 3.",
    "Das Minus vor der Klammer dreht jedes Vorzeichen um. Aus a wird minus a, und aus minus 4 wird plus 4.",
  ]);
  h.quiz(q("Was ist $2a + 3b + a$?", "$3a + 3b$", ["$6ab$", "$5a + b$", "$3a + 3$"], "Zuerst sortierst du: 2 a und 1 a sind 3 a. Die 3 b sind eine andere Sorte und bleiben für sich."));
});
