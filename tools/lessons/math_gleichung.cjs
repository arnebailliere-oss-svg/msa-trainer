// P_MATH_GLEICHUNG to the standard: boards stay; chapters, tap tasks and hints are added.
// The "Rüberbringen" board now leads back to "the same on both sides" instead of teaching a sign-flip slogan.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_03b_gleichung.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_TERME"];
  p.hook = "Ich denke mir eine Zahl. Das Doppelte plus 3 ergibt 11. Welche Zahl ist es? So ein Rätsel kann man ganz kurz aufschreiben: $2x + 3 = 11$. Lösen heißt nur, das Rätsel zu knacken. Und dafür gibt es einen sicheren Weg, den wir uns Schritt für Schritt ansehen.";

  // --- chapter 1 ---
  h.body("Ein Rätsel", "Ich denke mir eine Zahl. Das Doppelte plus 3 ergibt 11.", "$2x + 3 = 11$", "So ein Zahlenrätsel heißt **Gleichung**.");
  h.tasks("Ein Rätsel", k("Ich denke mir eine Zahl. Plus 4 ergibt 10. Als Gleichung: ___", "$x + 4 = 10$", ["$x \\cdot 4 = 10$"], "Das x steht für die gedachte Zahl, und plus 4 wird genau so hingeschrieben.", "Welches Rechenzeichen steht im Rätsel: plus oder mal?"));
  h.tasks("Das Gleichheitszeichen", k("$7 + 3 = $ ___ $+ 4$. Welche Zahl gehört in die Lücke?", "6", ["10"], "Links steht 10. Rechts muss auch 10 herauskommen, und 6 plus 4 ergibt 10.", "Rechne die linke Seite aus. Was fehlt rechts bis zu diesem Wert?"));
  h.tasks("Was heißt „lösen“?", k("Ist $x = 3$ eine Lösung von $x + 5 = 8$? ___", "Ja", ["Nein"], "3 plus 5 ergibt 8. Die Gleichung stimmt mit dieser Zahl.", "Setz die 3 für das x ein und rechne die linke Seite aus."));
  h.after(
    "Was heißt „lösen“?",
    b("Jetzt du: Ist das die Lösung?", "Setz die Zahl ein und tipp an, ob die Gleichung dann stimmt.", "Du musst hier noch nichts umformen. Setz die Zahl für das x ein und rechne die linke Seite aus. Kommt dasselbe heraus wie rechts, ist die Zahl eine Lösung.", {
      tasks: [
        k("$2x = 10$ mit $x = 5$: Das ___.", "stimmt", ["stimmt nicht"], "2 mal 5 ergibt 10, genau wie auf der rechten Seite.", "Was ergibt 2 mal 5? Steht das auch rechts?"),
        k("$x - 4 = 3$ mit $x = 6$: Das ___.", "stimmt nicht", ["stimmt"], "6 minus 4 ergibt 2 und nicht 3.", "Was ergibt 6 minus 4? Steht das auch rechts?"),
      ],
    }),
  );

  // --- chapter 2 ---
  h.say("Auf beiden Seiten das Gleiche", "Stell dir wieder die Waage vor. Wenn du nur links etwas wegnimmst, kippt sie. Deshalb machst du auf beiden Seiten immer dasselbe. Der senkrechte Strich bedeutet: Das, was dahinter steht, geschieht auf beiden Seiten. Fachleute nennen so einen Schritt Äquivalenzumformung.");
  h.tasks("Auf beiden Seiten das Gleiche", k("$x + 7 = 12 \\quad | -7$ ergibt ___.", "$x = 5$", ["$x = 19$"], "Auf beiden Seiten werden 7 abgezogen: 12 minus 7 ist 5.", "Was passiert mit der 12, wenn du auf beiden Seiten 7 abziehst?"));
  h.say("Dann teilen", "Jetzt steht nur noch 2 mal x auf der linken Seite. Um das Mal loszuwerden, teilst du auf beiden Seiten durch 2. Das Ziel ist immer, dass das x am Ende ganz allein steht. Man sagt dazu auch: das x isolieren.");
  h.tasks("Dann teilen", k("$3x = 12 \\quad | :3$ ergibt ___.", "$x = 4$", ["$x = 9$"], "Auf beiden Seiten wird durch 3 geteilt: 12 geteilt durch 3 ist 4.", "Was passiert mit der 12, wenn du auf beiden Seiten durch 3 teilst?"));
  h.tasks("Die Probe", k("Probe für $x = 2$ in $4x + 1 = 9$: $4 \\cdot 2 + 1 = $ ___", "9", ["7"], "4 mal 2 ist 8, und plus 1 ergibt 9. Die Lösung stimmt.", "Rechne zuerst 4 mal 2. Was kommt danach dazu?"));
  h.body("„Rüberbringen“", "Manche sagen: „Die 3 auf die andere Seite bringen.“", "Gemeint ist **dasselbe** wie $| -3$ auf beiden Seiten.");
  h.say("„Rüberbringen“", "Diesen Spruch hörst du im Unterricht oft. Er ist nur eine Abkürzung für das, was du schon kannst: auf beiden Seiten dasselbe tun. Wenn du unsicher bist, schreib lieber den Strich und die Rechnung dahinter. Dann siehst du immer genau, was auf beiden Seiten passiert.");
  h.after(
    "„Rüberbringen“",
    b("Jetzt du: zwei Schritte", ["$2x + 1 = 9$", "Löse die Gleichung in zwei Schritten."], "Jetzt löst du selbst eine Gleichung. Räum zuerst die Zahl ohne x weg. Danach teilst du durch die Zahl vor dem x. Tipp unten bei jedem Schritt auf das Richtige.", {
      tasks: [
        k("Erster Schritt: ___", "$| -1$", ["$| :2$"], "Zuerst wird die Zahl ohne x weggeräumt.", "Was räumst du zuerst weg: die Zahl ohne x oder die Zahl vor dem x?"),
        k("Danach steht da: ___", "$2x = 8$", ["$x = 8$"], "9 minus 1 ist 8. Links bleibt 2x stehen.", "Was bleibt links übrig, wenn die 1 weg ist?"),
        k("Der letzte Schritt ergibt ___.", "$x = 4$", ["$x = 16$"], "8 geteilt durch 2 ist 4.", "Du teilst auf beiden Seiten durch 2. Was wird aus der 8?"),
      ],
    }),
  );

  // --- chapter 3 ---
  h.tasks("x auf beiden Seiten", k("$4x = x + 9$. Der erste Schritt ist ___.", "$| -x$", ["$| +9$"], "Zuerst kommen alle x auf eine Seite.", "Auf welcher Seite stört das x noch? Wie bekommst du es dort weg?"));
  h.after(
    "x auf beiden Seiten",
    b("Erst die Klammer auflösen", ["$2 \\cdot (x + 1) = 10$", "Klammer auflösen: $2x + 2 = 10$", "$| -2$: $2x = 8$", "$| :2$: $x = 4$"], "Wenn in einer Gleichung eine Klammer steht, löst du sie zuerst auf. Das kennst du aus der Lektion über Terme: Die 2 wird auf jeden in der Klammer verteilt. Danach sieht die Gleichung aus wie alle anderen, und du gehst den gewohnten Weg.", {
      tasks: [k("$3 \\cdot (x + 2) = 15$. Nach dem Auflösen der Klammer: ___", "$3x + 6 = 15$", ["$3x + 2 = 15$"], "Die 3 wird auf beide verteilt: 3 mal x und 3 mal 2.", "Bekommt auch die 2 in der Klammer die 3 davor?")],
    }),
  );
  h.body("Wie viele Lösungen?", "$x + 1 = x + 1$: **immer** wahr", "$x = x + 1$: **nie** wahr", "$x^2 = 9$: $x = 3$ oder $x = -3$", "Alle Lösungen zusammen heißen **Lösungsmenge**.");
  h.tasks("Wie viele Lösungen?", k("$x^2 = 16$ hat ___.", "zwei Lösungen", ["eine Lösung"], "4 mal 4 ist 16, und minus 4 mal minus 4 ist auch 16.", "Was ergibt minus 4 mal minus 4?"));
  h.after(
    "Wie viele Lösungen?",
    b("Das nimmst du mit", ["(1) Auf beiden Seiten immer dasselbe tun.", "(2) Erst die Zahl ohne $x$ wegräumen, dann teilen.", "(3) Klammern zuerst auflösen.", "(4) Am Ende die Probe machen."], "Mit diesen vier Schritten löst du jede Gleichung, die im MSA vorkommt. Die Probe kostet dich nur ein paar Sekunden und zeigt dir jeden Fehler. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.", {
      tasks: [k("$5x - 2 = 13$. Der erste Schritt ist ___.", "$| +2$", ["$| :5$"], "Zuerst wird die Zahl ohne x weggeräumt. Minus 2 verschwindet durch plus 2.", "Welche Rechnung macht aus minus 2 eine Null?")],
    }),
  );

  // Read-through: what stays on each side is said, and why x² = 9 has two solutions.
  h.body("x auf beiden Seiten", "$5x + 3 = 3x + 11$", "Nimm auf beiden Seiten $3x$ weg: $| -3x$", "Links bleibt $2x + 3$. Rechts bleibt $11$.", "$2x + 3 = 11$", "Ab hier wie gewohnt: $| -3$, dann $| :2$", "$x = 4$");
  h.say("Wie viele Lösungen?", "Meistens gibt es genau eine Lösung, aber nicht immer. Bei x hoch 2 gleich 9 passen zwei Zahlen: 3 mal 3 ist 9, und minus 3 mal minus 3 ist auch 9. Genau solche Fälle werden in der Prüfung gern gefragt.");

  // Gentle start: the riddle in words first; the letter x and the equation on the next board.
  h.body("Ein Rätsel", "Ich denke mir eine Zahl.", "Ich verdopple sie und zähle 3 dazu.", "Es kommt 11 heraus.", "Welche Zahl war es?");
  h.say("Ein Rätsel", "So ein Rätsel kennst du vielleicht aus der Grundschule. Du kannst probieren: Mit 3 kommt 9 heraus, das ist zu wenig. Mit 4 kommt 11 heraus, das passt. In dieser Lektion lernst du einen Weg, bei dem du nicht mehr probieren musst.");
  h.tasks("Ein Rätsel", k("Ich denke mir eine Zahl. Ich verdopple sie, und es kommt 10 heraus. Die Zahl war ___.", "5", ["20"], "Das Doppelte von 5 ist 10. Also war es die 5.", "Welche Zahl ergibt 10, wenn man sie verdoppelt?"));
  h.after(
    "Ein Rätsel",
    b("Das Rätsel kurz aufschreiben", ["Für die gedachte Zahl schreibst du $x$.", "Das Doppelte davon: $2x$", "Dazu 3: $2x + 3$", "Es kommt 11 heraus: $2x + 3 = 11$", "So ein Zahlenrätsel heißt **Gleichung**."], "Das ist alles, was eine Gleichung ist: ein Zahlenrätsel in kurzer Schreibweise. Das x ist die gesuchte Zahl. Du baust die Zeile Stück für Stück auf, genau so, wie das Rätsel erzählt wird.", {
      tasks: [k("Ich denke mir eine Zahl. Plus 4 ergibt 10. Als Gleichung: ___", "$x + 4 = 10$", ["$x \\cdot 4 = 10$"], "Das x steht für die gedachte Zahl, und plus 4 wird genau so hingeschrieben.", "Welches Rechenzeichen steht im Rätsel: plus oder mal?")],
    }),
  );

  // One new thing per board: the idea of doing the same on both sides before the stroke notation,
  // x on both sides in two boards, the special cases apart.
  h.body("Auf beiden Seiten das Gleiche", "$2x + 3 = 11$", "Die 3 stört. Du nimmst sie links weg.", "Dann musst du rechts auch 3 wegnehmen. Sonst kippt die Waage.", "Übrig bleibt: $2x = 8$");
  h.say("Auf beiden Seiten das Gleiche", "Stell dir wieder die Waage vor. Wenn du nur links etwas wegnimmst, kippt sie. Deshalb machst du auf beiden Seiten immer dasselbe. Links verschwindet die 3, und rechts werden aus 11 nur noch 8.");
  h.tasks("Auf beiden Seiten das Gleiche", k("$x + 5 = 9$. Du nimmst links 5 weg. Rechts steht dann ___.", "4", ["9"], "Auf beiden Seiten werden 5 weggenommen. 9 minus 5 ist 4.", "Was musst du rechts tun, wenn du links 5 wegnimmst?"));
  h.after(
    "Auf beiden Seiten das Gleiche",
    b("Der Strich hinter der Gleichung", ["$2x + 3 = 11 \\quad | -3$", "Der senkrechte Strich heißt: Das mache ich auf **beiden** Seiten.", "Darunter schreibst du, was übrig bleibt: $2x = 8$"], "Damit du nicht jedes Mal einen ganzen Satz schreiben musst, gibt es eine Abkürzung. Hinter die Gleichung kommt ein senkrechter Strich und dahinter die Rechnung. Das bedeutet: Das geschieht auf beiden Seiten. Fachleute nennen so einen Schritt Äquivalenzumformung.", {
      tasks: [k("$x + 7 = 12 \\quad | -7$ ergibt ___.", "$x = 5$", ["$x = 19$"], "Auf beiden Seiten werden 7 abgezogen: 12 minus 7 ist 5.", "Was passiert mit der 12, wenn du auf beiden Seiten 7 abziehst?")],
    }),
  );

  h.body("x auf beiden Seiten", "$5x + 3 = 3x + 11$", "Das $x$ steht links und rechts.", "Nimm auf beiden Seiten $3x$ weg: $| -3x$", "Links bleibt $2x + 3$. Rechts bleibt $11$.");
  h.say("x auf beiden Seiten", "Manchmal steht das x auf beiden Seiten. Dann holst du zuerst alle x auf eine Seite. Dafür nimmst du auf beiden Seiten gleich viele x weg. Rechts bleibt dann kein x mehr übrig.");
  h.after(
    "x auf beiden Seiten",
    b("Dann wie gewohnt", ["$2x + 3 = 11$", "$| -3$: $2x = 8$", "$| :2$: $x = 4$"], "Jetzt steht das x nur noch auf einer Seite. Diese Gleichung kennst du schon. Du räumst die Zahl ohne x weg und teilst dann. Das Ziel ist immer dasselbe: Das x steht am Ende allein.", {
      tasks: [k("$4x = x + 9 \\quad | -x$ ergibt ___.", "$3x = 9$", ["$4x = 9$"], "Links bleiben von vier x noch drei x. Rechts bleibt die 9.", "Wie viele x bleiben links, wenn du von vier x eines wegnimmst?")],
    }),
  );

  h.rename("Wie viele Lösungen?", "Mehr als eine Lösung");
  h.before(
    "Mehr als eine Lösung",
    b("Immer wahr oder nie wahr", ["$x + 1 = x + 1$ stimmt für **jede** Zahl.", "$x = x + 1$ stimmt für **keine** Zahl.", "Keine Zahl ist um 1 größer als sie selbst."], "Meistens hat eine Gleichung genau eine Lösung, aber nicht immer. Steht links und rechts genau dasselbe, passt jede Zahl. Und manche Gleichungen können gar nicht stimmen, egal welche Zahl du einsetzt.", {
      tasks: [k("$x + 2 = x + 2$ stimmt für ___.", "jede Zahl", ["keine Zahl"], "Links und rechts steht genau dasselbe. Das ist immer gleich.", "Vergleich die linke und die rechte Seite. Unterscheiden sie sich?")],
    }),
  );
  h.body("Mehr als eine Lösung", "$x^2 = 9$", "$3 \\cdot 3 = 9$. Also passt $x = 3$.", "$(-3) \\cdot (-3) = 9$. Also passt auch $x = -3$.", "Alle Lösungen zusammen heißen **Lösungsmenge**.");
  h.say("Mehr als eine Lösung", "Bei x hoch 2 gleich 9 passen zwei Zahlen. 3 mal 3 ist 9, und minus 3 mal minus 3 ist auch 9, denn minus mal minus ergibt plus. Genau solche Fälle werden in der Prüfung gern gefragt.");

  h.chapters([
    ["Ein Rätsel", "Was eine Gleichung ist"],
    ["Auf beiden Seiten das Gleiche", "Der sichere Weg zur Lösung"],
    ["x auf beiden Seiten", "Schwierigere Gleichungen"],
  ]);
  h.renameVocab({ "Lösungsmenge L": "Lösungsmenge" });
  h.explain([
    "Welche Zahl plus 5 ergibt 12? Du ziehst auf beiden Seiten 5 ab und bekommst 7.",
    "Zuerst räumst du die Zahl ohne x weg, also auf beiden Seiten minus 3. Erst danach teilst du durch 2.",
    "Der senkrechte Strich bedeutet, dass die Rechnung dahinter auf beiden Seiten gemacht wird. Hier werden auf beiden Seiten 4 abgezogen.",
    "Bei der Probe setzt du die Lösung für x ein und rechnest die linke Seite aus. Kommt 10 heraus, stimmt die Lösung.",
    "4 mal 4 ist 16, und minus 4 mal minus 4 ist ebenfalls 16. Deshalb gibt es zwei Lösungen.",
  ]);
  h.quiz(q("Löse $3x - 4 = 11$.", "$x = 5$", ["$x = 7$", "$x = 15$", "$x = \\frac{7}{3}$"], "Zuerst auf beiden Seiten plus 4, dann steht 3x gleich 15 da. Geteilt durch 3 ergibt das 5."));

  // Word card: every word and sign of this lesson.
  h.vocab(
    { term: "x", plain: "Die gesuchte Zahl. Man nennt sie auch die Unbekannte.", example: "$2x + 3 = 11$" },
    { term: "Gleichung", plain: "Ein Zahlenrätsel in kurzer Schreibweise. Links und rechts vom Gleichheitszeichen steht derselbe Wert.", example: "$2x + 3 = 11$" },
    { term: "Gleichheitszeichen", plain: "Das Zeichen =. Links und rechts davon steht derselbe Wert.", example: "$7 + 3 = 6 + 4$" },
    { term: "Lösung", plain: "Die Zahl, die die Gleichung wahr macht.", example: "$x = 4$" },
    { term: "$|$", plain: "Der Strich hinter der Gleichung. Was dahinter steht, machst du auf beiden Seiten.", example: "$2x + 3 = 11 \\quad | -3$" },
    { term: "Äquivalenzumformung", plain: "Ein Schritt, der auf beiden Seiten dasselbe tut. Die Lösung bleibt dabei gleich.", example: "$| -3$ oder $| :2$" },
    { term: "Isolieren", plain: "Das x allein auf eine Seite stellen.", example: "$x = 4$" },
    { term: "Probe", plain: "Die Lösung einsetzen und nachrechnen.", example: "$2 \\cdot 4 + 3 = 11$ ✓" },
    { term: "Rüberbringen", plain: "Ein Spruch für: auf beiden Seiten dasselbe abziehen oder dazuzählen.", example: "Die 3 rüberbringen heißt $| -3$." },
    { term: "Lösungsmenge", plain: "Alle Lösungen zusammen, in geschweiften Klammern.", example: "$L = \\{-3; 3\\}$" },
  );
});
