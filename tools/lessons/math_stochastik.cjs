// P_MATH_STOCHASTIK to the standard: boards and the tree figure stay; chapters, tap tasks and hints are added.
// New: "without putting back" gets its own board (it was squeezed into one spoken line), plus a summary board.
const { migrate, k, b } = require("./migrate.cjs");

migrate("primers/math_06_stochastik.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH", "P_MATH_PROZENT"];
  p.hook = "Würfel, Glücksrad, Lostrommel: Bei allen geht es um dieselbe Frage, nämlich „Wie viele von allen?“. Im zweiten Teil geht es um Listen von Zahlen und die Frage „Was ist typisch?“. Beides sehen wir uns in Ruhe an, eine Tafel nach der anderen.";
  p.outro = "Du teilst die günstigen Fälle durch alle möglichen. Entlang eines Weges im Baum nimmst du mal, und mehrere passende Wege zählst du zusammen. Für die Statistik sortierst du zuerst und suchst dann die Mitte. Damit kannst du jetzt die Lektion lesen.";

  // --- chapter 1 ---
  h.body("Wie viele von allen?", "Würfel: 6 Seiten, eine davon ist die 6.", "$P(6) = \\frac{1}{6}$", "Das ist die **Wahrscheinlichkeit** für eine 6: **günstig** durch **möglich**.", "Das, worauf du hoffst, heißt **Ereignis**.");
  h.say("Wie viele von allen?", "Der Buchstabe P kommt vom englischen Wort probability. Oben im Bruch steht, wie viele Fälle du dir wünschst. Unten steht, wie viele Fälle es überhaupt gibt. Beim Würfel gibt es sechs Seiten, und nur eine davon zeigt die 6.");
  h.tasks("Wie viele von allen?", k("Ein Würfel. $P(3) = $ ___", "$\\frac{1}{6}$", ["$\\frac{3}{6}$"], "Nur eine der sechs Seiten zeigt die 3.", "Wie viele Seiten des Würfels zeigen eine Drei?"));
  h.say("Als Bruch, Dezimalzahl, Prozent", "Du kannst das Ergebnis auf drei Arten schreiben, und alle drei bedeuten dasselbe. Der Wert liegt immer zwischen 0 und 1. Bei 0 passiert etwas nie, bei 1 passiert es sicher. Ein Wert von 1,5 kann nicht stimmen, denn mehr als sicher geht nicht.");
  h.tasks("Als Bruch, Dezimalzahl, Prozent", k("Du rechnest $P = 1{,}2$ aus. Das ist ___.", "sicher ein Fehler", ["sehr wahrscheinlich"], "Der Wert kann nie größer als 1 sein. Bei 1 ist etwas schon sicher.", "Welches ist der größte Wert, den es hier geben kann?"));
  h.say("Beispiel Beutel", "Im Beutel liegen zehn Kugeln, und drei davon sind rot. Günstig sind also drei, möglich sind zehn. Drei Zehntel sind dasselbe wie 30 Prozent.");
  h.tasks("Beispiel Beutel", k("2 rote und 8 blaue Kugeln. $P(\\text{rot}) = $ ___", "$\\frac{2}{10}$", ["$\\frac{2}{8}$"], "Unten stehen alle Kugeln zusammen, also 2 plus 8.", "Wie viele Kugeln liegen insgesamt im Beutel?"));
  h.body("Das Gegenereignis", "$P(\\text{nicht rot}) = 1 - \\frac{3}{10} = \\frac{7}{10}$", "Alle Wahrscheinlichkeiten zusammen sind **1**.", "Das Gegenteil eines Ereignisses heißt **Gegenereignis**.");
  h.say("Das Gegenereignis", "Im Beutel ist jede Kugel entweder rot oder blau. Was nicht rot ist, muss also blau sein. Das Gegenteil bekommt immer den Rest bis 1. Das ist praktisch, wenn sich das Gegenteil leichter ausrechnen lässt.");
  h.tasks("Das Gegenereignis", k("$P(\\text{Regen}) = 0{,}3$. Dann ist $P(\\text{kein Regen}) = $ ___", "$0{,}7$", ["$0{,}3$"], "Das Gegenteil bekommt den Rest bis 1, und 1 minus 0,3 ist 0,7.", "Wie viel fehlt von 0,3 bis zur 1?"));

  // --- chapter 2 ---
  h.body("Zweimal ziehen: der Baum", "Zweimal ziehen **mit Zurücklegen**.", "So ein Bild heißt **Baumdiagramm**. Jeder Ast hat seine Wahrscheinlichkeit.");
  h.say("Zweimal ziehen: der Baum", "Mit Zurücklegen bedeutet: Du legst die Kugel nach dem ersten Ziehen wieder in den Beutel. Beim zweiten Ziehen ist also alles wie am Anfang. Der Baum zeigt alle Wege, die es gibt. Jeder Weg von links nach rechts ist ein möglicher Ausgang.");
  h.tasks("Zweimal ziehen: der Baum", k("Wie viele Wege von links nach rechts zeigt der Baum? ___", "4", ["2"], "Rot-rot, rot-blau, blau-rot und blau-blau: Das sind vier Wege.", "Zähl die Enden ganz rechts im Bild."));
  h.say("Pfadregel: mal", "Ein Weg durch den Baum heißt auch Pfad. Für zweimal rot gehst du zweimal den roten Ast entlang. Die beiden Brüche auf diesem Weg nimmst du miteinander mal. Das Ergebnis ist kleiner als jeder einzelne Bruch, und das passt: Zweimal Glück ist seltener als einmal.");
  h.tasks("Pfadregel: mal", k("Zweimal blau: $\\frac{7}{10} \\cdot \\frac{7}{10} = $ ___", "$\\frac{49}{100}$", ["$\\frac{14}{10}$"], "Entlang eines Weges wird malgenommen: 7 mal 7 oben, 10 mal 10 unten.", "Rechnest du entlang eines Weges mal oder plus?"));
  h.after(
    "Pfadregel: mal",
    b("Ohne Zurücklegen", ["Die erste Kugel bleibt draußen.", "Erste Kugel rot: $\\frac{3}{10}$", "Jetzt sind noch 9 Kugeln da, 2 davon rot: $\\frac{2}{9}$", "Zweimal rot: $\\frac{3}{10} \\cdot \\frac{2}{9} = \\frac{6}{90}$"], "Manchmal wird die Kugel nicht zurückgelegt. Dann fehlt beim zweiten Ziehen eine Kugel im Beutel. Unten steht deshalb eine 9 statt einer 10. Und weil eine rote Kugel fehlt, steht oben eine 2 statt einer 3. Lies in der Aufgabe immer genau, ob zurückgelegt wird.", {
      tasks: [k("5 Kugeln, 2 davon rot. Eine rote wird gezogen und bleibt draußen. Für die nächste rote gilt: ___", "$\\frac{1}{4}$", ["$\\frac{2}{5}$"], "Es sind noch vier Kugeln im Beutel, und nur noch eine davon ist rot.", "Wie viele Kugeln sind noch da, und wie viele davon sind rot?")],
    }),
  );
  h.say("Summenregel: plus", "Genau einmal rot kann auf zwei Wegen passieren: erst rot und dann blau, oder erst blau und dann rot. Du rechnest jeden Weg für sich aus, so wie eben. Danach zählst du die beiden Ergebnisse zusammen, weil beide Wege zu deinem Ereignis passen.");
  h.tasks("Summenregel: plus", k("Zwei verschiedene Wege passen zu deinem Ereignis. Ihre Ergebnisse werden ___.", "zusammengezählt", ["malgenommen"], "Mehrere passende Wege werden zusammengezählt. Mal nimmst du nur entlang eines Weges.", "Wird das Ereignis wahrscheinlicher oder seltener, wenn mehr Wege dazu passen?"));

  // --- chapter 3 ---
  h.body("Statistik: der Mittelwert", "Noten: 2, 3, 3, 4", "$\\frac{2 + 3 + 3 + 4}{4} = \\frac{12}{4} = 3$", "Alles zusammen, geteilt durch die Anzahl: Das ist der **Mittelwert**.");
  h.say("Statistik: der Mittelwert", "Jetzt geht es um Listen von Zahlen. Der Mittelwert ist das, was du im Alltag Durchschnitt nennst. Du kennst ihn vom Zeugnis. Du zählst alle Werte zusammen und teilst durch die Anzahl der Werte.");
  h.tasks("Statistik: der Mittelwert", k("Der Mittelwert von 2, 4 und 9 ist ___.", "5", ["15"], "Zusammen sind es 15. Geteilt durch drei Werte ergibt das 5.", "Du hast die Summe. Durch wie viele Werte teilst du noch?"));
  h.body("Der Median", "Sortieren: 1, 3, **5**, 8, 20", "Der **Median** ist der Wert in der **Mitte**: 5");
  h.say("Der Median", "Für den Median sortierst du die Werte zuerst der Größe nach. Dann nimmst du den Wert, der genau in der Mitte steht. Die 20 ist hier ein Ausreißer, also ein Wert, der weit weg von den anderen liegt. Den Median stört das nicht, den Mittelwert würde es stark nach oben ziehen.");
  h.tasks("Der Median", k("Der Median von 7, 2, 9 ist ___.", "7", ["2"], "Sortiert heißt die Liste 2, 7, 9. In der Mitte steht die 7.", "Hast du die Zahlen zuerst der Größe nach sortiert?"));
  h.say("Median bei gerader Anzahl", "Bei sechs Werten steht keiner genau in der Mitte, sondern zwei teilen sich den Platz. Dann nimmst du die Mitte zwischen diesen beiden. Du zählst sie zusammen und teilst durch 2.");
  h.tasks("Median bei gerader Anzahl", k("Der Median von 2, 4, 6, 8 ist ___.", "5", ["4"], "In der Mitte stehen 4 und 6. Die Mitte zwischen beiden ist 5.", "Welche zwei Werte stehen in der Mitte? Was liegt genau dazwischen?"));
  h.body("Modus und Spannweite", "3, 5, 5, 7, 9", "**Modus**: der häufigste Wert, hier 5", "**Spannweite**: größter minus kleinster Wert, hier $9 - 3 = 6$");
  h.say("Modus und Spannweite", "Modus erinnert an das Wort Mode: Es ist der Wert, der am häufigsten vorkommt. Die Spannweite sagt dir, wie weit die Werte auseinanderliegen. Dafür ziehst du den kleinsten Wert vom größten ab.");
  h.tasks("Modus und Spannweite", k("Die Spannweite von 4, 6, 10 ist ___.", "6", ["10"], "Der größte Wert ist 10, der kleinste 4. 10 minus 4 ergibt 6.", "Welcher Wert ist der größte und welcher der kleinste? Zieh sie voneinander ab."));
  h.after(
    "Modus und Spannweite",
    b("Das nimmst du mit", ["(1) Wahrscheinlichkeit: günstig durch möglich.", "(2) Das Gegenteil hat den Rest bis 1.", "(3) Entlang eines Weges: mal. Mehrere Wege: plus.", "(4) Mittelwert: alles zusammen, geteilt durch die Anzahl.", "(5) Median: erst sortieren, dann die Mitte."], "Das sind die fünf Dinge, die du aus dieser Lektion brauchst. Bei jeder Aufgabe mit Kugeln oder Losen schaust du zuerst, ob zurückgelegt wird. Bei jeder Liste von Zahlen sortierst du zuerst. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("Für den Median musst du die Werte zuerst ___.", "sortieren", ["zusammenzählen"], "Erst wenn die Werte der Größe nach stehen, findest du den in der Mitte.", "Was machst du mit der Liste, bevor du die Mitte suchst?")],
    }),
  );

  h.chapters([
    ["Wie viele von allen?", "Was Wahrscheinlichkeit bedeutet"],
    ["Zweimal ziehen: der Baum", "Zweimal ziehen"],
    ["Statistik: der Mittelwert", "Listen von Zahlen"],
  ]);
  h.renameVocab({ "Wahrscheinlichkeit P": "Wahrscheinlichkeit" });
  h.explain([
    "Die Zahlen 2, 4 und 6 sind gerade. Das sind 3 günstige von 6 möglichen Seiten, also die Hälfte.",
    "6 von 10 Kugeln sind blau. Sechs Zehntel sind dasselbe wie 60 Prozent.",
    "Entlang eines Weges wird malgenommen. Ein Halb mal ein Halb ergibt ein Viertel.",
    "Sortiert heißt die Liste 1, 3, 4, 7, 9. In der Mitte steht die 4.",
    "Zusammen ergeben die drei Werte 12. Geteilt durch 3 ist das 4.",
    "Du ziehst den kleinsten Wert vom größten ab: 15 minus 3 ergibt 12.",
  ]);
});
