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
  h.body("Die Lösung ist ein Paar", "$x = 6$ und $y = 4$", "Probe: $6 + 4 = 10$ ✓ und $6 - 4 = 2$ ✓", "Die zwei Zahlen zusammen heißen **Lösungspaar**.", "Man schreibt: $L = \\{(6\\,|\\,4)\\}$", "Der Buchstabe $L$ steht für Lösung.");
  h.say("Die Lösung ist ein Paar", "Die Lösung besteht hier aus zwei Zahlen, die in beiden Zeilen gleichzeitig passen. In der Klammer steht immer zuerst das x und danach das y. Die Probe machst du deshalb zweimal, einmal für jede Zeile.");
  h.tasks("Die Lösung ist ein Paar", k("Im Paar $(6\\,|\\,4)$ steht die 4 für ___.", "$y$", ["$x$"], "In der Klammer steht zuerst das x und danach das y.", "Welcher Buchstabe kommt in der Klammer an zweiter Stelle?"));
  h.body("Was heißt „System“?", "System heißt nur: **mehrere Gleichungen, die zusammengehören**.", "Zusammen nennt man sie **Gleichungssystem**, kurz LGS.", "Man nummeriert sie: (I) und (II).");
  h.say("Was heißt „System“?", "Das Wort klingt groß, aber es bedeutet nur, dass die Zeilen zusammengehören. Die römischen Zahlen I und II sind einfach Namen für die erste und die zweite Zeile. So kannst du später kurz sagen, mit welcher Zeile du gerade rechnest.");
  h.tasks("Was heißt „System“?", k("(I) $x + y = 7$ und (II) $x - y = 1$. In welcher Zeile wird abgezogen? ___", "in (II)", ["in (I)"], "In der zweiten Zeile steht ein Minus zwischen x und y.", "In welcher der beiden Zeilen steht ein Minuszeichen?"));
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
  h.tasks("Das Bild dazu", k("Im Bild schneiden sich die beiden Geraden im Punkt $(6\\,|\\,4)$. Die Lösung des Systems ist ___.", "$x = 6$ und $y = 4$", ["$x = 4$ und $y = 6$"], "Der Schnittpunkt ist die Lösung. Die erste Zahl ist das x, die zweite das y.", "Welche Zahl steht im Punkt vorn: das x oder das y?"));
  h.body("Keine oder unendlich viele", "Die Geraden laufen nebeneinander her und treffen sich nie: **keine** Lösung.", "Dieselbe Gerade zweimal: **unendlich viele** Lösungen.");
  h.say("Keine oder unendlich viele", "In der Prüfung wird gern gefragt, wie viele Lösungen ein System hat. Denk dann an die zwei Linien. Treffen sie sich nie, gibt es keine Lösung. Liegen sie genau aufeinander, passt jeder Punkt, und es gibt unendlich viele Lösungen.");
  h.tasks("Keine oder unendlich viele", k("Zwei Geraden schneiden sich in einem Punkt. Das System hat ___.", "eine Lösung", ["keine Lösung"], "Der eine Punkt, in dem sich die Linien treffen, ist die Lösung.", "Wie viele gemeinsame Punkte haben die beiden Linien dann?"));
  h.after(
    "Keine oder unendlich viele",
    b("Das nimmst du mit", ["(1) Zwei Unbekannte brauchen zwei Gleichungen.", "(2) Die Lösung ist ein Paar, das in beide Zeilen passt.", "(3) Einsetzen: wenn eine Zeile schon mit $y =$ beginnt.", "(4) Addieren: wenn sich ein Buchstabe aufhebt.", "(5) Im Bild ist die Lösung der Schnittpunkt."], "Das sind die fünf Dinge, die du über Gleichungssysteme wissen musst. Welchen der beiden Wege du nimmst, darfst du selbst entscheiden, denn beide führen zum selben Paar. Mach am Ende immer die Probe in beiden Zeilen. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("(I) $y = 4x$, (II) $x + y = 10$. Welcher Weg bietet sich an? ___", "Einsetzen", ["Addieren"], "Die erste Zeile sagt schon, was y ist. Das lässt sich direkt in die zweite stecken.", "Beginnt eine der beiden Zeilen schon mit y gleich?")],
    }),
  );

  // Read-through: what happens on each side when two lines are added is written out. The picture boards need the
  // coordinate system, so the lesson on functions comes first.
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_TERME", "P_MATH_GLEICHUNG", "P_MATH_FUNKTION"];
  h.body("Idee 2: Addieren", "(I) $x + y = 10$", "(II) $x - y = 2$", "Zähle die beiden Zeilen zusammen.", "Links: $x + x = 2x$. Aus $y - y$ wird nichts.", "Rechts: $10 + 2 = 12$", "Also $2x = 12$ und damit $x = 6$.", "In (I): $6 + y = 10$, also $y = 4$", "Dieser Weg heißt **Additionsverfahren**.");
  h.body("Wenn nichts wegfällt", "(I) $x + 2y = 8$", "(II) $x + y = 5$", "Nimm (II) mal $-1$: $-x - y = -5$", "Zähle (I) und die neue Zeile zusammen.", "$x - x$ fällt weg. $2y - y = y$. Rechts: $8 - 5 = 3$", "Also $y = 3$.", "In (II): $x + 3 = 5$, also $x = 2$");

  // Gentle start: the riddle with two numbers in words first; x and y on the next board.
  h.body("Ein Rätsel mit zwei Zahlen", "Ich denke mir zwei Zahlen.", "Zusammen ergeben sie 10.", "Zieht man die zweite von der ersten ab, bleibt 2.", "Welche zwei Zahlen sind es?");
  h.say("Ein Rätsel mit zwei Zahlen", "Hier werden zwei Zahlen gesucht. Der erste Hinweis allein reicht nicht, denn 5 und 5 ergeben 10, 7 und 3 aber auch. Erst der zweite Hinweis entscheidet. Deshalb braucht man bei zwei gesuchten Zahlen immer zwei Hinweise.");
  h.tasks("Ein Rätsel mit zwei Zahlen", k("Zusammen 10, und die erste minus die zweite ergibt 2. Welches Paar passt zu beiden Hinweisen? ___", "6 und 4", ["7 und 3"], "6 plus 4 ist 10, und 6 minus 4 ist 2. Beide Hinweise stimmen.", "Prüf bei jedem Paar auch den zweiten Hinweis mit dem Abziehen."));
  h.after(
    "Ein Rätsel mit zwei Zahlen",
    b("Die Hinweise kurz aufschreiben", ["Die erste Zahl nennst du $x$, die zweite $y$.", "Zusammen 10: $x + y = 10$", "Erste minus zweite ist 2: $x - y = 2$", "Die gesuchten Zahlen $x$ und $y$ heißen **Unbekannte**."], "Jeder Hinweis wird zu einer eigenen Zeile. Für die beiden gesuchten Zahlen nimmst du zwei verschiedene Buchstaben, damit du sie nicht verwechselst. Mehr ist nicht passiert: Die zwei Sätze aus dem Rätsel stehen jetzt in kurzer Schreibweise da.", {
      tasks: [k("Passen $x = 7$ und $y = 3$ zur ersten Zeile $x + y = 10$? ___", "Ja", ["Nein"], "7 plus 3 ergibt 10. Zur ersten Zeile passen diese Zahlen, zur zweiten aber nicht.", "Setz beide Zahlen ein und rechne 7 plus 3 aus.")],
    }),
  );

  // One new thing per board: the pair before its notation, System before linear, each way in three
  // short boards, the two special cases apart and each with its picture.
  h.body("Die Lösung ist ein Paar", "$x = 6$ und $y = 4$", "Probe in der ersten Zeile: $6 + 4 = 10$ ✓", "Probe in der zweiten Zeile: $6 - 4 = 2$ ✓", "Die zwei Zahlen zusammen heißen **Lösungspaar**.");
  h.say("Die Lösung ist ein Paar", "Die Lösung besteht hier aus zwei Zahlen, die in beiden Zeilen gleichzeitig passen. Die Probe machst du deshalb zweimal, einmal für jede Zeile. Erst wenn beide stimmen, hast du die Lösung.");
  h.tasks("Die Lösung ist ein Paar", k("Zu $x + y = 7$ und $x - y = 1$ passt das Paar ___.", "$x = 4$ und $y = 3$", ["$x = 5$ und $y = 2$"], "4 plus 3 ist 7, und 4 minus 3 ist 1. Beide Zeilen stimmen.", "Prüf bei jedem Paar auch die zweite Zeile mit dem Abziehen."));
  h.after(
    "Die Lösung ist ein Paar",
    b("So schreibt man das Paar auf", ["Kurz schreibt man das Paar so: $(6\\,|\\,4)$", "Vorn steht immer $x$, hinten $y$.", "Ganz genau: $L = \\{(6\\,|\\,4)\\}$", "$L$ steht für **Lösungsmenge**: alle Lösungen zusammen."], "Für das Paar gibt es eine kurze Schreibweise, die du schon von Punkten kennst. In der runden Klammer steht zuerst das x und danach das y. Manchmal steht davor noch ein L mit geschweiften Klammern. Das bedeutet nur: Das sind alle Lösungen, und hier gibt es genau eine.", {
      tasks: [k("Im Paar $(6\\,|\\,4)$ steht die 4 für ___.", "$y$", ["$x$"], "In der Klammer steht zuerst das x und danach das y.", "Welcher Buchstabe kommt in der Klammer an zweiter Stelle?")],
    }),
  );
  h.body("Was heißt „System“?", "System heißt nur: mehrere Gleichungen, die **zusammengehören**.", "Zusammen nennt man sie ein **Gleichungssystem**.", "Man nummeriert die Zeilen: (I) und (II).");
  h.after(
    "Was heißt „System“?",
    b("Was heißt „linear“?", ["**Linear** heißt: $x$ und $y$ haben keine Hochzahl.", "$x + y = 10$ ist linear.", "$x^2 + y = 10$ ist nicht linear.", "Lineares Gleichungssystem kürzt man ab: **LGS**."], "In Aufgaben steht oft lineares Gleichungssystem. Linear bedeutet nur, dass die Buchstaben ohne Hochzahl vorkommen. Andere Systeme kommen in deiner Prüfung nicht vor. Weil das Wort so lang ist, sagt man kurz LGS.", {
      tasks: [k("Welche Gleichung ist linear? ___", "$2x + y = 5$", ["$x^2 + y = 5$"], "In dieser Gleichung hat kein Buchstabe eine Hochzahl.", "In welcher der beiden Gleichungen steht eine Hochzahl?")],
    }),
  );

  h.body("Idee 1: Einsetzen", "(I) $y = 2x$", "(II) $x + y = 9$", "Zeile (I) sagt schon, was $y$ ist: $2x$", "Setz das in (II) für $y$ ein: $x + 2x = 9$");
  h.say("Idee 1: Einsetzen", "Die erste Zeile sagt dir schon, was y ist, nämlich 2 mal x. Das steckst du in die zweite Zeile, genau an die Stelle vom y. Dann bleibt eine Zeile mit nur noch einem Buchstaben.");
  h.after(
    "Idee 1: Einsetzen",
    b("Dann das x ausrechnen", ["$x + 2x = 9$", "Zusammenfassen: $3x = 9$", "Teilen durch 3: $x = 3$"], "Jetzt steht da eine Gleichung, wie du sie kennst. Es gibt nur noch das x. Du fasst zusammen und teilst dann durch die Zahl vor dem x. Damit kennst du die erste der beiden Zahlen.", {
      tasks: [k("$x + 3x = 8$ zusammengefasst: ___", "$4x = 8$", ["$3x = 8$"], "Ein x und drei x sind zusammen vier x.", "Wie viele x sind es zusammen? Auch das einzelne x zählt.")],
    }),
    b("Zum Schluss das y", ["Du kennst jetzt $x = 3$.", "Setz es in (I) ein: $y = 2 \\cdot 3 = 6$", "Die Lösung ist das Paar $(3\\,|\\,6)$.", "Dieser Weg heißt **Einsetzungsverfahren**."], "Die zweite Zahl fehlt noch. Dafür nimmst du die Zeile, die mit y gleich beginnt, und setzt dein x ein. Dann hast du beide Zahlen, also das Lösungspaar. Dieser Weg hat einen langen Namen, aber du hast nur zweimal eingesetzt.", {
      tasks: [k("(I) $y = 3x$ und $x = 2$. Dann ist $y = $ ___", "6", ["5"], "Zwischen 3 und x steht ein Malpunkt. 3 mal 2 ergibt 6.", "Setz die 2 für das x ein. Welches Zeichen steht unsichtbar zwischen 3 und x?")],
    }),
  );

  h.body("Idee 2: Addieren", "(I) $x + y = 10$", "(II) $x - y = 2$", "Zähl die beiden Zeilen zusammen: links mit links, rechts mit rechts.", "Dabei soll ein Buchstabe verschwinden.");
  h.say("Idee 2: Addieren", "Der zweite Weg benutzt einen Trick. Du zählst die beiden Zeilen zusammen, die linken Seiten für sich und die rechten Seiten für sich. Das darfst du, weil in jeder Zeile links und rechts gleich viel steht.");
  h.tasks("Idee 2: Addieren", k("(I) $x + y = 9$, (II) $x - y = 3$. Die rechten Seiten ergeben zusammen ___.", "12", ["6"], "Rechts stehen 9 und 3. Zusammen sind das 12.", "Welche zwei Zahlen stehen rechts vom Gleichheitszeichen? Zähl sie zusammen."));
  h.after(
    "Idee 2: Addieren",
    b("Das y hebt sich auf", ["Links: $x + x = 2x$", "$+y$ und $-y$ heben sich auf.", "Rechts: $10 + 2 = 12$", "Es bleibt: $2x = 12$"], "Schau, was links passiert. Aus x und x werden zwei x. Plus y und minus y treffen aufeinander und heben sich auf. Übrig bleibt eine Zeile nur mit x.", {
      tasks: [k("(I) $x + y = 9$, (II) $x - y = 3$. Zusammengezählt ergibt das ___.", "$2x = 12$", ["$2y = 12$"], "Plus y und minus y heben sich auf. Links bleiben zwei x, rechts 9 plus 3.", "Welcher Buchstabe hebt sich auf, wenn plus und minus zusammentreffen?")],
    }),
    b("Dann x und y ausrechnen", ["$2x = 12$, also $x = 6$", "In (I) einsetzen: $6 + y = 10$", "Also $y = 4$.", "Dieser Weg heißt **Additionsverfahren**."], "Der Rest ist wie beim ersten Weg. Du teilst durch 2 und kennst das x. Dann setzt du es in eine der beiden Zeilen ein und findest das y. Addieren ist das Fachwort für zusammenzählen, daher der Name.", {
      tasks: [k("Du weißt $x = 6$. In $x + y = 9$ eingesetzt ist $y = $ ___", "3", ["15"], "6 plus y ergibt 9. Dann muss y gleich 3 sein.", "Welche Zahl fehlt von 6 bis 9?")],
    }),
  );

  h.body("Wenn nichts wegfällt", "(I) $x + 2y = 8$", "(II) $x + y = 5$", "Beim Zusammenzählen fällt hier nichts weg.", "Nimm darum die ganze Zeile (II) mal $-1$: $-x - y = -5$");
  h.after(
    "Wenn nichts wegfällt",
    b("Jetzt fällt das x weg", ["(I) $x + 2y = 8$", "Neue Zeile: $-x - y = -5$", "Zusammengezählt: $y = 3$", "In (II): $x + 3 = 5$, also $x = 2$"], "Jetzt zählst du die erste Zeile und die neue Zeile zusammen. Das x und das minus x heben sich auf. Von zwei y wird ein y abgezogen, es bleibt ein y. Rechts steht 8 minus 5, also 3.", {
      tasks: [k("$2y$ und $-y$ ergeben zusammen ___.", "$y$", ["$3y$"], "Von zwei y wird ein y abgezogen. Es bleibt ein y.", "Was bleibt von zwei Äpfeln, wenn du einen wegnimmst?")],
    }),
  );

  h.rename("Keine oder unendlich viele", "Geraden, die sich nie treffen");
  h.body("Geraden, die sich nie treffen", "Diese zwei Geraden laufen nebeneinander her.", "Sie treffen sich nie.", "Dann hat das System **keine** Lösung.");
  h.say("Geraden, die sich nie treffen", "In der Prüfung wird gern gefragt, wie viele Lösungen ein System hat. Denk dann an die zwei Linien. Laufen sie nebeneinander her wie zwei Schienen, treffen sie sich nie. Dann gibt es keinen Punkt, der zu beiden Zeilen passt.");
  h.board("Geraden, die sich nie treffen").figure = { type: "coordinateSystem", xmin: -1, xmax: 7, ymin: -3, ymax: 9, width: 300, height: 300, lines: [{ m: 1, n: 2, label: "y = x + 2" }, { m: 1, n: -2, label: "y = x − 2" }] };
  h.after(
    "Geraden, die sich nie treffen",
    b("Dieselbe Gerade zweimal", ["(I) $x + y = 4$", "(II) $2x + 2y = 8$", "Zeile (II) ist nur Zeile (I) mal 2. Es ist dieselbe Gerade.", "Jeder Punkt darauf passt: **unendlich viele** Lösungen."], "Manchmal sehen zwei Zeilen verschieden aus und sagen doch dasselbe. Dann liegen die beiden Linien genau aufeinander. Jeder Punkt der Geraden passt zu beiden Zeilen, und davon gibt es unendlich viele.", {
      figure: { type: "coordinateSystem", xmin: -1, xmax: 6, ymin: -1, ymax: 6, width: 300, height: 300, lines: [{ m: -1, n: 4, label: "x + y = 4" }] },
      tasks: [k("Zwei Zeilen ergeben genau dieselbe Gerade. Das System hat ___.", "unendlich viele Lösungen", ["keine Lösung"], "Jeder Punkt der Geraden passt zu beiden Zeilen. Davon gibt es unendlich viele.", "Wie viele gemeinsame Punkte haben zwei Linien, die genau aufeinanderliegen?")],
    }),
  );

  h.chapters([
    ["Ein Rätsel mit zwei Zahlen", "Zwei Gleichungen, ein Paar"],
    ["Idee 1: Einsetzen", "Zwei Wege zur Lösung"],
    ["Das Bild dazu", "Das Bild und besondere Fälle"],
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

  // Word card: every word, sign and letter of this lesson.
  h.vocab(
    { term: "x", plain: "Die erste gesuchte Zahl.", example: "$x = 6$" },
    { term: "y", plain: "Die zweite gesuchte Zahl.", example: "$y = 4$" },
    { term: "Unbekannte", plain: "Eine Zahl, die gesucht wird.", example: "$x$ und $y$" },
    { term: "Lösungspaar", plain: "Zwei Zahlen, die in beide Gleichungen passen. Vorn steht x, hinten y.", example: "$(6\\,|\\,4)$" },
    { term: "Lösungsmenge", plain: "Alle Lösungen zusammen, in geschweiften Klammern.", example: "$L = \\{(6\\,|\\,4)\\}$" },
    { term: "L", plain: "Der Buchstabe für die Lösungsmenge.", example: "$L = \\{(6\\,|\\,4)\\}$" },
    { term: "Gleichungssystem", plain: "Mehrere Gleichungen, die zusammengehören.", example: "(I) $x + y = 10$ und (II) $x - y = 2$" },
    { term: "(I)", plain: "Der Name der ersten Zeile. (II) ist der Name der zweiten Zeile.", example: "(I) $x + y = 10$" },
    { term: "Linear", plain: "Die Buchstaben haben keine Hochzahl.", example: "$x + y = 10$" },
    { term: "LGS", plain: "Die Abkürzung für lineares Gleichungssystem.", example: "(I) und (II) zusammen" },
    { term: "Einsetzungsverfahren", plain: "Eine Zeile sagt, was y ist. Das steckst du in die andere Zeile.", example: "$y = 2x$ in $x + y = 9$ ergibt $x + 2x = 9$." },
    { term: "Additionsverfahren", plain: "Beide Zeilen zusammenzählen, sodass ein Buchstabe verschwindet.", example: "$+y$ und $-y$ heben sich auf." },
    { term: "Gerade", plain: "Eine gerade Linie. Jede Gleichung lässt sich als Gerade zeichnen.", example: "$x + y = 10$" },
    { term: "Schnittpunkt", plain: "Der Punkt, in dem sich die beiden Geraden treffen. Er ist die Lösung.", example: "$(6\\,|\\,4)$" },
  );
});
