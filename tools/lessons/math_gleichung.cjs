// P_MATH_GLEICHUNG to the standard: boards stay; chapters, tap tasks and hints are added.
// The "Rüberbringen" board now leads back to "the same on both sides" instead of teaching a sign-flip slogan.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_03b_gleichung.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_TERME"];
  p.hook = "Ich denke mir eine Zahl. Das Doppelte plus 3 ergibt 11. Welche Zahl ist es? So ein Rätsel kann man ganz kurz aufschreiben: $2x + 3 = 11$. Lösen heißt nur, das Rätsel zu knacken. Und dafür gibt es einen sicheren Weg, den wir uns Schritt für Schritt ansehen.";

  // --- chapter 1 ---
  h.body("Ein Rätsel", "Ich denke mir eine Zahl. Das Doppelte plus 3 ergibt 11.", "$2x + 3 = 11$", "So ein Zahlenrätsel heißt **Gleichung**.");
  h.tasks("Ein Rätsel", k("Ich denke mir eine Zahl. Plus 4 ergibt 10. Als Gleichung: ___", "$x + 4 = 10$", ["$x \\cdot 4 = 10$"], "Das x steht für die gedachte Zahl, und plus 4 wird genau so hingeschrieben.", "Welches Rechenzeichen steht im Rätsel: plus oder mal?"));
  h.tasks("Das Gleichheitszeichen", k("Das Gleichheitszeichen sagt: Links und rechts steht ___.", "derselbe Wert", ["etwas Verschiedenes"], "Wie bei einer Waage im Gleichgewicht ist auf beiden Seiten gleich viel.", "Was zeigt eine Waage an, wenn sie gerade steht?"));
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
});
