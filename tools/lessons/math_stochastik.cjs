// P_MATH_STOCHASTIK to the standard: boards and the tree figure stay; chapters, tap tasks and hints are added.
// New: "without putting back" gets its own board (it was squeezed into one spoken line), plus a summary board.
const { migrate, k, b, q } = require("./migrate.cjs");

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
  h.tasks("Summenregel: plus", k("Weg 1 hat $\\frac{2}{10}$, Weg 2 hat $\\frac{3}{10}$. Beide passen zu deinem Ereignis. Zusammen sind das ___.", "$\\frac{5}{10}$", ["$\\frac{6}{100}$"], "Mehrere passende Wege werden zusammengezählt: 2 Zehntel plus 3 Zehntel.", "Wird das Ereignis wahrscheinlicher oder seltener, wenn zwei Wege dazu passen?"));

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
      tasks: [k("Der Median von 9, 1, 5 ist ___.", "5", ["1"], "Sortiert heißt die Liste 1, 5, 9. In der Mitte steht die 5.", "Sortier die drei Zahlen zuerst der Größe nach.")],
    }),
  );

  // Small steps: one line per way of writing the result.
  h.body("Als Bruch, Dezimalzahl, Prozent", "Als Bruch: $P = \\frac{1}{4}$", "Als Dezimalzahl: $0{,}25$", "In Prozent: $25\\,\\%$", "Immer zwischen 0 (nie) und 1 (sicher).");

  // Read-through: one line per step.
  h.body("Das Gegenereignis", "$P(\\text{nicht rot}) = 1 - \\frac{3}{10}$", "Die 1 ist dasselbe wie $\\frac{10}{10}$.", "$\\frac{10}{10} - \\frac{3}{10} = \\frac{7}{10}$", "Alle Wahrscheinlichkeiten zusammen sind **1**.", "Das Gegenteil eines Ereignisses heißt **Gegenereignis**.");
  h.body("Summenregel: plus", "Genau einmal rot: rot-blau **oder** blau-rot", "Weg rot-blau: $\\frac{3}{10} \\cdot \\frac{7}{10} = \\frac{21}{100}$", "Weg blau-rot: $\\frac{7}{10} \\cdot \\frac{3}{10} = \\frac{21}{100}$", "Zusammen: $\\frac{21}{100} + \\frac{21}{100} = \\frac{42}{100}$");
  h.body("Statistik: der Mittelwert", "Noten: 2, 3, 3, 4", "Zusammenzählen: $2 + 3 + 3 + 4 = 12$", "Durch die Anzahl teilen: $12 : 4 = 3$", "Alles zusammen, geteilt durch die Anzahl: Das ist der **Mittelwert**.");

  // New topics: absolute and relative frequency, bar chart and pie chart (on the Spickzettel, taught nowhere before).
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH", "P_MATH_PROZENT", "P_MATH_GEO_BEGRIFFE"];
  h.before(
    "Das nimmst du mit",
    b("Absolute und relative Häufigkeit", ["10 Würfe, 2-mal kam die 6.", "Die **absolute Häufigkeit** ist 2. Das ist gezählt.", "Die **relative Häufigkeit** ist $\\frac{2}{10}$. Das ist der Anteil.", "In Prozent: 20 %"], "Wenn du etwas zählst, bekommst du die absolute Häufigkeit. Das ist einfach die Anzahl. Die relative Häufigkeit sagt, welcher Anteil von allen Versuchen das ist. Sie ist ein Bruch oder eine Prozentzahl. Nur mit ihr kannst du Gruppen vergleichen, die verschieden groß sind.", {
      tasks: [k("In einer Klasse mit 20 Kindern tragen 5 eine Brille. Der Anteil der Kinder mit Brille ist ___.", "$\\frac{5}{20}$", ["5"], "Die 5 allein ist nur gezählt. Der Anteil ist 5 von 20.", "Gesucht ist der Anteil an allen Kindern, nicht nur die Anzahl.")],
    }),
    b("Das Säulendiagramm", ["Jede Säule steht für eine Gruppe.", "Die Höhe der Säule zeigt die Anzahl.", "Den Wert liest du links an der Achse ab.", "Im Bild: Am Dienstag waren es 18."], "Ein Säulendiagramm zeigt gezählte Werte nebeneinander. Du siehst auf einen Blick, welche Gruppe am größten und welche am kleinsten ist. Zum genauen Ablesen gehst du von der Oberkante der Säule waagerecht nach links bis zur Achse.", {
      figure: { type: "barChart", categories: ["Mo", "Di", "Mi", "Do"], values: [12, 18, 9, 15] },
      tasks: [k("Im Bild: Der kleinste Wert gehört zum ___.", "Mittwoch", ["Montag"], "Die Säule über Mi ist die niedrigste. Sie zeigt 9.", "Such die Säule, die am wenigsten hoch ist.")],
    }),
    b("Das Kreisdiagramm", ["Der ganze Kreis ist alles zusammen: 100 %.", "Jedes Stück zeigt einen Anteil.", "Ein ganzer Kreis hat 360°.", "Die Hälfte hat 180°, ein Viertel hat 90°."], "Ein Kreisdiagramm zeigt, wie sich ein Ganzes aufteilt. Es sieht aus wie eine Pizza mit verschieden großen Stücken. Je größer der Anteil, desto breiter das Stück. Wie breit ein Stück ist, misst man als Winkel in Grad.", {
      figure: { type: "pieChart", categories: ["Bus", "Rad", "zu Fuß"], values: [2, 1, 1] },
      tasks: [k("Ein Stück im Kreisdiagramm zeigt 25 %. Sein Winkel ist ___.", "90°", ["25°"], "25 Prozent sind ein Viertel. Ein Viertel von 360 Grad sind 90 Grad.", "Welcher Bruchteil vom ganzen Kreis sind 25 Prozent?")],
    }),
    b("Vom Anteil zum Winkel", ["12 von 36 Kindern kommen mit dem Bus.", "Anteil: $\\frac{12}{36}$, gekürzt $\\frac{1}{3}$", "Ein Drittel vom Kreis: $360° : 3 = 120°$", "Das Stück für den Bus bekommt 120°."], "So zeichnest du selbst ein Kreisdiagramm. Zuerst rechnest du den Anteil als Bruch aus und kürzt ihn. Dann nimmst du diesen Bruchteil von 360 Grad. Das Ergebnis ist der Winkel, den du mit dem Geodreieck abträgst.", {
      tasks: [k("10 von 40 Kindern kommen mit dem Rad. Das Stück im Kreisdiagramm hat ___.", "90°", ["10°"], "10 von 40 ist ein Viertel. Ein Viertel von 360 Grad sind 90 Grad.", "Kürze zuerst den Bruch. Welcher Teil von 360 Grad ist das?")],
    }),
  );

  // Gentle start: "1 von 6" in words, then the fraction, and the letter P only on the third board.
  h.body("Wie viele von allen?", "Ein Würfel hat 6 Seiten.", "Nur eine davon zeigt die 6.", "Deine Chance auf eine 6 ist also: 1 von 6.", "Diese Chance heißt **Wahrscheinlichkeit**.");
  h.say("Wie viele von allen?", "Bei einem Würfel ist jede Seite gleich wahrscheinlich. Es gibt sechs Seiten, und nur eine davon zeigt die 6. Deine Chance ist also eins von sechs. Für das Wort Chance sagt man in Mathe Wahrscheinlichkeit.");
  h.tasks("Wie viele von allen?", k("Ein Würfel. Die Chance auf eine 3 ist ___.", "1 von 6", ["3 von 6"], "Nur eine der sechs Seiten zeigt die 3.", "Wie viele Seiten des Würfels zeigen eine 3?"));
  h.after(
    "Wie viele von allen?",
    b("Günstig durch möglich", ["1 von 6 schreibt man als Bruch: $\\frac{1}{6}$", "Oben stehen die **günstigen** Fälle.", "Unten stehen alle **möglichen** Fälle.", "Das, worauf du hoffst, heißt **Ereignis**."], "Eins von sechs kannst du als Bruch schreiben. Oben steht, wie viele Fälle du dir wünschst. Unten steht, wie viele Fälle es überhaupt gibt. Deshalb merkt man sich: günstig durch möglich.", {
      tasks: [k("Ein Glücksrad hat 8 Felder, 3 davon gewinnen. Die Wahrscheinlichkeit für einen Gewinn ist ___.", "$\\frac{3}{8}$", ["$\\frac{8}{3}$"], "3 Felder gewinnen, 8 gibt es insgesamt. Günstig steht oben.", "Welche Zahl steht oben: die gewünschten Fälle oder alle Fälle?")],
    }),
    b("Der Buchstabe P", ["Für Wahrscheinlichkeit schreibt man kurz $P$.", "$P(6)$ liest man: P von 6.", "Es bedeutet: die Wahrscheinlichkeit für eine 6.", "$P(6) = \\frac{1}{6}$"], "Der Buchstabe P kommt vom englischen Wort probability. In der Klammer steht das Ereignis, um das es geht. Die Klammer bedeutet hier nicht mal. Du liest die ganze Zeile so: Die Wahrscheinlichkeit für eine 6 ist ein Sechstel.", {
      tasks: [k("Ein Würfel. $P(3) = $ ___", "$\\frac{1}{6}$", ["$\\frac{3}{6}$"], "Nur eine der sechs Seiten zeigt die 3. Günstig ist also 1, möglich sind 6.", "Wie viele Seiten zeigen die 3, und wie viele Seiten gibt es?")],
    }),
  );

  // One new thing per board: Ereignis apart, the opposite event before its calculation, putting back
  // before the tree, Modus and Spannweite apart, the two frequencies apart, the 360 degrees apart.
  h.body("Günstig durch möglich", "1 von 6 schreibt man als Bruch: $\\frac{1}{6}$", "Oben stehen die **günstigen** Fälle.", "Unten stehen alle **möglichen** Fälle.");
  h.after(
    "Günstig durch möglich",
    b("Das Wort Ereignis", ["Das, worauf du hoffst, heißt **Ereignis**.", "Beim Würfel kann das Ereignis heißen: eine 6.", "Oder: eine gerade Zahl. Dann sind 2, 4 und 6 günstig."], "In Aufgaben steht oft das Wort Ereignis. Gemeint ist das, was eintreten soll. Ein Ereignis kann eine einzige Zahl sein, es kann aber auch mehrere Fälle zusammenfassen. Gerade Zahl bedeutet zum Beispiel drei günstige Seiten.", {
      tasks: [k("Ein Würfel. Das Ereignis heißt: eine gerade Zahl. Günstig sind ___ Seiten.", "3", ["1"], "Die geraden Zahlen sind 2, 4 und 6. Das sind drei Seiten.", "Welche Zahlen auf dem Würfel sind gerade? Zähl sie.")],
    }),
  );

  h.body("Das Gegenereignis", "Im Beutel: 3 rote und 7 blaue Kugeln.", "Nicht rot heißt hier blau: $\\frac{7}{10}$", "Rot und nicht rot zusammen: $\\frac{3}{10} + \\frac{7}{10} = 1$", "Das Gegenteil eines Ereignisses heißt **Gegenereignis**.");
  h.say("Das Gegenereignis", "Im Beutel ist jede Kugel entweder rot oder blau. Was nicht rot ist, muss also blau sein. Zählst du ein Ereignis und sein Gegenteil zusammen, kommt immer 1 heraus. Denn eines von beiden passiert sicher.");
  h.tasks("Das Gegenereignis", k("Ein Würfel. Das Gegenereignis zu „eine 6“ ist ___.", "keine 6", ["eine 1"], "Zum Gegenereignis gehört alles, was nicht zum Ereignis gehört, also jede andere Zahl.", "Was kann alles passieren, wenn die 6 nicht kommt?"));
  h.after(
    "Das Gegenereignis",
    b("Der Rest bis 1", ["$P(\\text{nicht rot}) = 1 - \\frac{3}{10}$", "Die 1 ist dasselbe wie $\\frac{10}{10}$.", "$\\frac{10}{10} - \\frac{3}{10} = \\frac{7}{10}$"], "Weil beide zusammen 1 ergeben, bekommt das Gegenteil immer den Rest bis 1. Du musst die blauen Kugeln also gar nicht zählen. Das ist praktisch, wenn sich das Gegenteil leichter ausrechnen lässt.", {
      tasks: [k("$P(\\text{Regen}) = 0{,}3$. Dann ist $P(\\text{kein Regen}) = $ ___", "$0{,}7$", ["$0{,}3$"], "Das Gegenteil bekommt den Rest bis 1, und 1 minus 0,3 ist 0,7.", "Wie viel fehlt von 0,3 bis zur 1?")],
    }),
  );

  h.before(
    "Zweimal ziehen: der Baum",
    b("Mit Zurücklegen", ["Du ziehst eine Kugel und schaust sie an.", "Dann legst du sie **zurück** in den Beutel.", "Beim zweiten Ziehen ist alles wie am Anfang.", "Das heißt: Ziehen **mit Zurücklegen**."], "Jetzt ziehst du zweimal hintereinander. Dabei ist wichtig, was mit der ersten Kugel passiert. Legst du sie zurück, liegen beim zweiten Mal wieder alle Kugeln im Beutel. Die Chancen sind dann dieselben wie beim ersten Mal.", {
      tasks: [k("3 rote und 7 blaue Kugeln, mit Zurücklegen. Beim zweiten Ziehen liegen ___ Kugeln im Beutel.", "10", ["9"], "Die erste Kugel wurde zurückgelegt. Es sind wieder alle 10 da.", "Was passiert mit der ersten Kugel, bevor du zum zweiten Mal ziehst?")],
    }),
  );
  h.body("Zweimal ziehen: der Baum", "Zweimal ziehen mit Zurücklegen.", "So ein Bild heißt **Baumdiagramm**.", "Jeder Ast hat seine Wahrscheinlichkeit.");
  h.say("Zweimal ziehen: der Baum", "Der Baum zeigt alle Wege, die es gibt. Zuerst teilt er sich in rot und blau für das erste Ziehen. Dann teilt sich jeder Ast noch einmal für das zweite Ziehen. Jeder Weg von links nach rechts ist ein möglicher Ausgang.");
  h.body("Pfadregel: mal", "Ein Weg durch den Baum heißt **Pfad**.", "Zweimal rot: $\\frac{3}{10} \\cdot \\frac{3}{10} = \\frac{9}{100}$", "Entlang eines Pfades wird **malgenommen**.", "Das ist die Pfadregel.");

  h.rename("Modus und Spannweite", "Der Modus");
  h.body("Der Modus", "3, 5, 5, 7, 9", "Die 5 kommt zweimal vor, alle anderen nur einmal.", "Der häufigste Wert heißt **Modus**. Hier: 5.");
  h.say("Der Modus", "Modus erinnert an das Wort Mode: Es ist der Wert, der am häufigsten vorkommt. Du musst dafür nichts rechnen. Du zählst nur, welche Zahl am öftesten in der Liste steht.");
  h.tasks("Der Modus", k("Der Modus von 2, 4, 4, 4, 8 ist ___.", "4", ["8"], "Die 4 kommt dreimal vor, öfter als jede andere Zahl.", "Welche Zahl kommt in der Liste am häufigsten vor?"));
  h.after(
    "Der Modus",
    b("Die Spannweite", ["3, 5, 5, 7, 9", "Größter Wert minus kleinster Wert: $9 - 3 = 6$", "Diese Zahl heißt **Spannweite**.", "Sie sagt, wie weit die Werte auseinanderliegen."], "Die Spannweite sagt dir, wie weit die Werte auseinanderliegen. Dafür suchst du den größten und den kleinsten Wert und ziehst den kleinsten vom größten ab. Eine kleine Spannweite heißt: Die Werte liegen dicht beieinander.", {
      tasks: [k("Die Spannweite von 4, 6, 10 ist ___.", "6", ["10"], "Der größte Wert ist 10, der kleinste 4. 10 minus 4 ergibt 6.", "Welcher Wert ist der größte und welcher der kleinste? Zieh sie voneinander ab.")],
    }),
  );

  h.rename("Absolute und relative Häufigkeit", "Die absolute Häufigkeit");
  h.body("Die absolute Häufigkeit", "10 Würfe, 2-mal kam die 6.", "Du hast gezählt: 2.", "Diese gezählte Zahl heißt **absolute Häufigkeit**.");
  h.say("Die absolute Häufigkeit", "Wenn du etwas zählst, bekommst du die absolute Häufigkeit. Das ist einfach die Anzahl. Wie oft kam die 6? Zweimal. Mehr steckt hinter dem langen Wort nicht.");
  h.tasks("Die absolute Häufigkeit", k("In einer Klasse tragen 5 von 20 Kindern eine Brille. Die absolute Häufigkeit ist ___.", "5", ["$\\frac{5}{20}$"], "Die absolute Häufigkeit ist nur gezählt: 5 Kinder.", "Gesucht ist die gezählte Anzahl, nicht der Anteil."));
  h.after(
    "Die absolute Häufigkeit",
    b("Die relative Häufigkeit", ["2 von 10 Würfen: $\\frac{2}{10}$", "Dieser Anteil heißt **relative Häufigkeit**.", "In Prozent: 20 %"], "Die relative Häufigkeit sagt, welcher Anteil von allen Versuchen das ist. Sie ist ein Bruch oder eine Prozentzahl. Nur mit ihr kannst du Gruppen vergleichen, die verschieden groß sind.", {
      tasks: [k("In einer Klasse mit 20 Kindern tragen 5 eine Brille. Der Anteil der Kinder mit Brille ist ___.", "$\\frac{5}{20}$", ["5"], "Die 5 allein ist nur gezählt. Der Anteil ist 5 von 20.", "Gesucht ist der Anteil an allen Kindern, nicht nur die Anzahl.")],
    }),
  );

  h.body("Das Kreisdiagramm", "Der ganze Kreis ist alles zusammen: 100 %.", "Jedes Stück zeigt einen Anteil.", "Je größer der Anteil, desto breiter das Stück.");
  h.say("Das Kreisdiagramm", "Ein Kreisdiagramm zeigt, wie sich ein Ganzes aufteilt. Es sieht aus wie eine Pizza mit verschieden großen Stücken. Je größer der Anteil, desto breiter das Stück.");
  h.tasks("Das Kreisdiagramm", k("Ein Stück ist genau der halbe Kreis. Es zeigt ___.", "50 %", ["25 %"], "Der ganze Kreis sind 100 Prozent. Die Hälfte davon sind 50 Prozent.", "Wie viel Prozent ist der ganze Kreis? Nimm davon die Hälfte."));
  h.after(
    "Das Kreisdiagramm",
    b("Der Kreis hat 360 Grad", ["Wie breit ein Stück ist, misst man als Winkel.", "Ein ganzer Kreis hat 360°.", "Die Hälfte hat 180°.", "Ein Viertel hat 90°."], "Wenn du ein Kreisdiagramm zeichnen sollst, brauchst du für jedes Stück einen Winkel. Einmal ganz herum sind 360 Grad. Ein halber Kreis hat also 180 Grad und ein Viertelkreis 90 Grad.", {
      tasks: [k("Ein Stück im Kreisdiagramm zeigt 25 %. Sein Winkel ist ___.", "90°", ["25°"], "25 Prozent sind ein Viertel. Ein Viertel von 360 Grad sind 90 Grad.", "Welcher Bruchteil vom ganzen Kreis sind 25 Prozent?")],
    }),
  );

  h.chapters([
    ["Wie viele von allen?", "Was Wahrscheinlichkeit bedeutet"],
    ["Mit Zurücklegen", "Zweimal ziehen"],
    ["Statistik: der Mittelwert", "Listen von Zahlen"],
    ["Die absolute Häufigkeit", "Häufigkeit und Diagramme"],
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
  // New topics, words and quiz: added after the old quiz explanations.
  p.vocab.push(
    { term: "absolute Häufigkeit", plain: "Wie oft etwas vorkommt. Einfach gezählt.", example: "2-mal die 6" },
    { term: "relative Häufigkeit", plain: "Der Anteil an allen Versuchen, als Bruch oder in Prozent.", example: "$\\frac{2}{10}$ oder 20 %" },
    { term: "Kreisdiagramm", plain: "Ein Kreis, der in Stücke geteilt ist. Jedes Stück zeigt einen Anteil am Ganzen.", example: "25 % sind 90°" },
  );
  h.quiz(q("Von 60 Befragten mögen 20 am liebsten Pizza. Wie groß ist der Winkel für Pizza im Kreisdiagramm?", "120°", ["20°", "60°", "180°"], "20 von 60 ist ein Drittel. Ein Drittel von 360 Grad sind 120 Grad."));

  // Word card: every word and letter of this lesson.
  h.vocab(
    { term: "Wahrscheinlichkeit", plain: "Die Chance, dass etwas passiert. Günstig durch möglich. Sie liegt zwischen 0 und 1.", example: "Eine 6 würfeln: $\\frac{1}{6}$" },
    { term: "günstig", plain: "Die Fälle, auf die du hoffst. Sie stehen oben im Bruch.", example: "Eine 6: 1 günstiger Fall" },
    { term: "möglich", plain: "Alle Fälle, die es gibt. Sie stehen unten im Bruch.", example: "Ein Würfel: 6 mögliche Fälle" },
    { term: "Ereignis", plain: "Das, was eintreten soll.", example: "eine gerade Zahl würfeln" },
    { term: "P", plain: "Der Buchstabe für Wahrscheinlichkeit. In der Klammer steht das Ereignis.", example: "$P(6) = \\frac{1}{6}$" },
    { term: "Gegenereignis", plain: "Das Gegenteil eines Ereignisses. Es bekommt den Rest bis 1.", example: "Nicht rot: $1 - \\frac{3}{10} = \\frac{7}{10}$" },
    { term: "Mit Zurücklegen", plain: "Die gezogene Kugel kommt wieder in den Beutel. Beim nächsten Ziehen ist alles wie am Anfang.", example: "Zweimal $\\frac{3}{10}$" },
    { term: "Ohne Zurücklegen", plain: "Die gezogene Kugel bleibt draußen. Beim nächsten Ziehen fehlt sie.", example: "Erst $\\frac{3}{10}$, dann $\\frac{2}{9}$" },
    { term: "Baumdiagramm", plain: "Ein Bild mit Ästen. Es zeigt alle Wege bei mehreren Zügen.", example: "erst rot, dann blau" },
    { term: "Pfad", plain: "Ein Weg durch den Baum, von links nach rechts.", example: "rot, dann rot" },
    { term: "Pfadregel", plain: "Entlang eines Pfades wird malgenommen.", example: "$\\frac{3}{10} \\cdot \\frac{3}{10} = \\frac{9}{100}$" },
    { term: "Summenregel", plain: "Passen mehrere Pfade zum Ereignis, zählst du ihre Ergebnisse zusammen.", example: "rot-blau plus blau-rot" },
    { term: "Mittelwert", plain: "Der Durchschnitt. Alles zusammenzählen, dann durch die Anzahl teilen.", example: "2, 3, 3, 4: $12 : 4 = 3$" },
    { term: "Median", plain: "Erst sortieren. Dann der Wert in der Mitte.", example: "1, 3, 5, 8, 20: Der Median ist 5." },
    { term: "Ausreißer", plain: "Ein Wert, der weit weg von den anderen liegt.", example: "1, 3, 5, 8, 20: Die 20 ist ein Ausreißer." },
    { term: "Modus", plain: "Der Wert, der am häufigsten vorkommt.", example: "3, 5, 5, 7: Der Modus ist 5." },
    { term: "Spannweite", plain: "Größter Wert minus kleinster Wert.", example: "$9 - 3 = 6$" },
    { term: "absolute Häufigkeit", plain: "Wie oft etwas vorkommt. Einfach gezählt.", example: "2-mal die 6" },
    { term: "relative Häufigkeit", plain: "Der Anteil an allen Versuchen, als Bruch oder in Prozent.", example: "$\\frac{2}{10}$ oder 20 %" },
    { term: "Säulendiagramm", plain: "Ein Bild mit Säulen. Die Höhe jeder Säule zeigt eine Anzahl.", example: "Am Dienstag: 18" },
    { term: "Kreisdiagramm", plain: "Ein Kreis, der in Stücke geteilt ist. Jedes Stück zeigt einen Anteil am Ganzen.", example: "25 % sind 90°." },
  );
});
