// P_MATH_LGS to the standard: boards and the figure stay; chapters, tap tasks and hints are added.
// The two methods are now written line by line instead of as arrow chains.
// New: checking a pair, a practice board for substitution, and what to do when nothing cancels.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_05_lgs.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_TERME", "P_MATH_GLEICHUNG"];
  p.hook = "Manche Rätsel fragen nach zwei Zahlen auf einmal. Dann reicht ein einzelner Hinweis nicht aus, denn es gäbe viel zu viele Möglichkeiten. Mit zwei Hinweisen klappt es. Wie du so ein Rätsel aufschreibst und sicher löst, sehen wir uns jetzt in Ruhe an.";

  // --- chapter 1 ---
  h.body("Ein Rätsel mit zwei Zahlen", "Zwei Zahlen ergeben zusammen 10.", "Zieht man die zweite von der ersten ab, bleibt 2.", "$x + y = 10$", "$x - y = 2$", "Die gesuchten Zahlen $x$ und $y$ heißen **Unbekannte**.");
  h.say("Ein Rätsel mit zwei Zahlen", "Hier gibt es zwei gesuchte Zahlen, nämlich x und y. Eine Zeile allein reicht nicht, denn 5 und 5 passen zur ersten Zeile, 7 und 3 aber auch. Erst beide Zeilen zusammen legen fest, welche zwei Zahlen gemeint sind.");
  h.tasks("Ein Rätsel mit zwei Zahlen", k("Passen $x = 7$ und $y = 3$ zur ersten Zeile $x + y = 10$? ___", "Ja", ["Nein"], "7 plus 3 ergibt 10. Zur ersten Zeile passen diese Zahlen, zur zweiten aber nicht.", "Setz beide Zahlen ein und rechne 7 plus 3 aus."));
  h.body("Die Lösung ist ein Paar", "$x = 6$ und $y = 4$", "Probe: $6 + 4 = 10$ ✓ und $6 - 4 = 2$ ✓", "Die zwei Zahlen zusammen heißen **Lösungspaar**.", "Man schreibt: $L = \\{(6\\,|\\,4)\\}$");
  h.say("Die Lösung ist ein Paar", "Die Lösung besteht hier aus zwei Zahlen, die in beiden Zeilen gleichzeitig passen. In der Klammer steht immer zuerst das x und danach das y. Die Probe machst du deshalb zweimal, einmal für jede Zeile.");
  h.tasks("Die Lösung ist ein Paar", k("Im Paar $(6\\,|\\,4)$ steht die 4 für ___.", "$y$", ["$x$"], "In der Klammer steht zuerst das x und danach das y.", "Welcher Buchstabe kommt in der Klammer an zweiter Stelle?"));
  h.body("Was heißt „System“?", "System heißt nur: **mehrere Gleichungen, die zusammengehören**.", "Zusammen nennt man sie **Gleichungssystem**, kurz LGS.", "Man nummeriert sie: (I) und (II).");
  h.say("Was heißt „System“?", "Das Wort klingt groß, aber es bedeutet nur, dass die Zeilen zusammengehören. Die römischen Zahlen I und II sind einfach Namen für die erste und die zweite Zeile. So kannst du später kurz sagen, mit welcher Zeile du gerade rechnest.");
  h.tasks("Was heißt „System“?", k("Mit (II) ist ___ gemeint.", "die zweite Zeile", ["die Zahl 2"], "Die römische Zwei ist nur der Name der zweiten Zeile.", "Wofür stehen die römischen Zahlen vor den Zeilen?"));
  h.after(
    "Was heißt „System“?",
    b("Jetzt du: Passt das Paar?", ["(I) $x + y = 8$", "(II) $x - y = 2$", "Ein Paar ist nur dann die Lösung, wenn es in **beide** Zeilen passt."], "Du musst hier noch nichts ausrechnen. Setz die zwei Zahlen in die erste Zeile ein und dann in die zweite. Nur wenn beide Male das Richtige herauskommt, ist das Paar die Lösung.", {
      tasks: [
        k("$x = 6$ und $y = 2$: Das Paar ___.", "passt in keine Zeile ganz", ["ist die Lösung"], "6 plus 2 ergibt 8, aber 6 minus 2 ergibt 4 und nicht 2. Ein Paar muss in beide Zeilen passen.", "Rechne 6 minus 2 aus. Steht das in der zweiten Zeile rechts?"),
        k("$x = 5$ und $y = 3$: Das Paar ___.", "ist die Lösung", ["passt nur zu (I)"], "5 plus 3 ergibt 8, und 5 minus 3 ergibt 2. Beide Zeilen stimmen.", "Rechne 5 plus 3 und danach 5 minus 3 aus."),
      ],
    }),
  );

  // --- chapter 2 ---
  h.body("Idee 1: Einsetzen", "(I) $y = 2x$", "(II) $x + y = 9$", "Setze $2x$ für $y$ in (II) ein: $x + 2x = 9$", "Zusammenfassen: $3x = 9$", "Teilen durch 3: $x = 3$", "In (I) einsetzen: $y = 2 \\cdot 3 = 6$", "Dieser Weg heißt **Einsetzungsverfahren**.");
  h.say("Idee 1: Einsetzen", "Die erste Zeile sagt dir schon, was y ist, nämlich 2 mal x. Das steckst du in die zweite Zeile, genau an die Stelle vom y. Dann bleibt eine Zeile mit nur noch einem Buchstaben, und die kannst du lösen. Zum Schluss rechnest du mit dem x das y aus.");
  h.tasks("Idee 1: Einsetzen", k("(I) $y = 3x$, (II) $x + y = 8$. Nach dem Einsetzen steht da: ___", "$x + 3x = 8$", ["$3x + y = 8$"], "Das y in der zweiten Zeile wird durch 3x ersetzt.", "Welcher Buchstabe verschwindet aus der zweiten Zeile, und was kommt an seine Stelle?"));
  h.after(
    "Idee 1: Einsetzen",
    b("Jetzt du: einsetzen", ["(I) $y = x + 1$", "(II) $x + y = 7$", "Löse das System Schritt für Schritt."], "Jetzt gehst du den Weg selbst. Die erste Zeile sagt wieder, was y ist. Weil es zwei Teile sind, denk dir eine Klammer darum, wenn du es einsetzt. Tipp unten bei jedem Schritt auf das Richtige.", {
      tasks: [
        k("Einsetzen in (II) ergibt ___.", "$x + x + 1 = 7$", ["$x + 1 = 7$"], "Für das y steht jetzt x plus 1. Das x davor bleibt stehen.", "Bleibt das erste x der zweiten Zeile stehen, oder fällt es weg?"),
        k("Zusammengefasst und minus 1: ___", "$2x = 6$", ["$2x = 8$"], "Zwei x plus 1 sind 7. Auf beiden Seiten minus 1 ergibt 6.", "Was wird aus der 7, wenn du auf beiden Seiten 1 abziehst?"),
        k("Also ist $x = 3$ und $y = $ ___", "4", ["7"], "In der ersten Zeile steht y gleich x plus 1, also 3 plus 1.", "Setz die 3 in die erste Zeile ein und rechne plus 1."),
      ],
    }),
  );
  h.body("Idee 2: Addieren", "(I) $x + y = 10$", "(II) $x - y = 2$", "Beide Zeilen zusammenzählen: $2x = 12$", "Teilen durch 2: $x = 6$", "In (I) einsetzen: $6 + y = 10$, also $y = 4$", "Dieser Weg heißt **Additionsverfahren**.");
  h.say("Idee 2: Addieren", "Du zählst die linken Seiten zusammen und die rechten Seiten zusammen. Dabei treffen plus y und minus y aufeinander und heben sich auf. Übrig bleibt eine Zeile nur mit x. Wenn du das x kennst, setzt du es in eine der beiden Zeilen ein und findest das y.");
  h.tasks("Idee 2: Addieren", k("(I) $x + y = 9$, (II) $x - y = 3$. Zusammengezählt ergibt das ___.", "$2x = 12$", ["$2y = 12$"], "Plus y und minus y heben sich auf. Links bleiben zwei x, rechts 9 plus 3.", "Welcher Buchstabe hebt sich auf, wenn plus und minus zusammentreffen?"));
  h.after(
    "Idee 2: Addieren",
    b("Wenn nichts wegfällt", ["(I) $x + 2y = 8$", "(II) $x + y = 5$", "Nimm (II) mal $-1$: $-x - y = -5$", "Jetzt zusammenzählen: $y = 3$", "In (II) einsetzen: $x + 3 = 5$, also $x = 2$"], "Manchmal hebt sich beim Zusammenzählen nichts auf. Dann hilfst du nach und nimmst eine ganze Zeile mit einer Zahl mal, auf beiden Seiten. Hier wird aus x ein minus x. Danach treffen x und minus x aufeinander und fallen weg.", {
      tasks: [k("(I) $x + 3y = 9$, (II) $x + y = 5$. Damit das $x$ wegfällt, nimmst du (II) mal ___.", "$-1$", ["$3$"], "Aus x wird dann minus x. Zusammen mit dem x aus der ersten Zeile hebt sich das auf.", "Was muss in der zweiten Zeile stehen, damit es sich mit plus x aufhebt?")],
    }),
  );
  h.say("Das Bild dazu", "Jede der beiden Zeilen kannst du als gerade Linie zeichnen. Alle Punkte auf einer Linie passen zu ihrer Zeile. Die beiden Linien schneiden sich in genau einem Punkt, und nur dieser Punkt passt zu beiden Zeilen. Deshalb ist er die Lösung.");
  h.tasks("Das Bild dazu", k("Die Lösung im Bild ist ___.", "der Schnittpunkt", ["die längere Linie"], "Nur dort, wo sich beide Linien treffen, passen beide Zeilen gleichzeitig.", "An welcher Stelle im Bild liegen beide Linien übereinander?"));
  h.body("Keine oder unendlich viele", "Die Geraden laufen nebeneinander her und treffen sich nie: **keine** Lösung.", "Dieselbe Gerade zweimal: **unendlich viele** Lösungen.");
  h.say("Keine oder unendlich viele", "In der Prüfung wird gern gefragt, wie viele Lösungen ein System hat. Denk dann an die zwei Linien. Treffen sie sich nie, gibt es keine Lösung. Liegen sie genau aufeinander, passt jeder Punkt, und es gibt unendlich viele Lösungen.");
  h.tasks("Keine oder unendlich viele", k("Zwei Geraden schneiden sich in einem Punkt. Das System hat ___.", "eine Lösung", ["keine Lösung"], "Der eine Punkt, in dem sich die Linien treffen, ist die Lösung.", "Wie viele gemeinsame Punkte haben die beiden Linien dann?"));
  h.after(
    "Keine oder unendlich viele",
    b("Das nimmst du mit", ["(1) Zwei Unbekannte brauchen zwei Gleichungen.", "(2) Die Lösung ist ein Paar, das in beide Zeilen passt.", "(3) Einsetzen: wenn eine Zeile schon mit $y =$ beginnt.", "(4) Addieren: wenn sich ein Buchstabe aufhebt.", "(5) Im Bild ist die Lösung der Schnittpunkt."], "Das sind die fünf Dinge, die du über Gleichungssysteme wissen musst. Welchen der beiden Wege du nimmst, darfst du selbst entscheiden, denn beide führen zum selben Paar. Mach am Ende immer die Probe in beiden Zeilen. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("(I) $y = 4x$, (II) $x + y = 10$. Welcher Weg bietet sich an? ___", "Einsetzen", ["Addieren"], "Die erste Zeile sagt schon, was y ist. Das lässt sich direkt in die zweite stecken.", "Beginnt eine der beiden Zeilen schon mit y gleich?")],
    }),
  );

  h.chapters([
    ["Ein Rätsel mit zwei Zahlen", "Zwei Gleichungen, ein Paar"],
    ["Idee 1: Einsetzen", "Zwei Wege zur Lösung"],
  ]);
  h.renameVocab({ "Gleichungssystem (LGS)": "Gleichungssystem" });
  h.explain([
    "4 plus 3 ergibt 7, und 4 minus 3 ergibt 1. Das Paar passt also in beide Zeilen.",
    "Nur im Schnittpunkt passen beide Gleichungen gleichzeitig. Deshalb ist er die Lösung.",
    "Geraden, die nebeneinander herlaufen, treffen sich nie. Es gibt dann keinen gemeinsamen Punkt und keine Lösung.",
    "Die erste Zeile sagt, dass y gleich 3x ist. Dann steht da x plus 3x gleich 8, also ist x gleich 2 und y gleich 6.",
  ]);
  h.quiz(
    q("(I) $x + y = 12$, (II) $x - y = 4$. Was ergibt das Zusammenzählen beider Zeilen?", "$2x = 16$", ["$2y = 16$", "$2x = 8$", "$x = 16$"], "Plus y und minus y heben sich auf. Links bleiben zwei x stehen, rechts 12 plus 4, also 16."),
    q("Wann ist ein Zahlenpaar die Lösung eines Gleichungssystems?", "Wenn es in beide Gleichungen passt", ["Wenn es in eine Gleichung passt", "Wenn beide Zahlen gleich sind", "Wenn beide Zahlen positiv sind"], "Ein Paar ist nur dann die Lösung, wenn die Probe in der ersten und in der zweiten Zeile stimmt."),
  );
});
