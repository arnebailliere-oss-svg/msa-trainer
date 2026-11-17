// P_MATH_ZEICHEN to the standard: boards and figure stay; chapters, tap tasks, hints and fuller quiz explanations are added.
const { migrate, k, b } = require("./migrate.cjs");

migrate("primers/math_00_zeichen.json", (p, h) => {
  // --- chapter 1: the operation signs ---
  h.body("Plus und Minus", "$+$ heißt **dazu**. $-$ heißt **weg**.", "$12 + 5 = 17$", "$12 - 5 = 7$", "Das Ergebnis von Plus heißt **Summe**, das Ergebnis von Minus heißt **Differenz**.");
  h.say("Plus und Minus", "Plus und Minus kennst du seit der ersten Klasse. Neu sind vielleicht nur die beiden Fachwörter für das Ergebnis. Sie tauchen in Aufgaben oft auf, deshalb lohnt es sich, sie zu kennen. Probier es unten gleich aus.");
  h.tasks("Plus und Minus", k("$12 - 5 = 7$. Die 7 ist die ___.", "Differenz", ["Summe"], "Das Ergebnis einer Minus-Aufgabe heißt Differenz.", "Ist das eine Plus-Aufgabe oder eine Minus-Aufgabe?"));
  h.tasks("Minus vor einer Zahl", k("$3 - 8 = $ ___", "$-5$", ["$5$"], "Du nimmst mehr weg, als da ist. Das Ergebnis liegt 5 unter null.", "Du hast 3 Euro und gibst 8 aus. Bist du danach im Plus oder im Minus?"));
  h.body("Mal ist ein Punkt", "$3 \\cdot 4$ heißt **3 mal 4**.", "$4 + 4 + 4 = 12$", "Mal ist nur eine **Abkürzung** für Plus. Das Ergebnis heißt **Produkt**.");
  h.tasks("Mal ist ein Punkt", k("$4 \\cdot 5$ ist dasselbe wie ___.", "$5 + 5 + 5 + 5$", ["$4 + 5$"], "Viermal die 5 zusammengezählt ergibt 20.", "Wie oft steht die 5 da, wenn du vier mal fünf rechnest?"));
  h.tasks("Der Punkt darf verschwinden", k("$5b$ heißt ___.", "$5 \\cdot b$", ["$5 + b$"], "Zwischen Zahl und Buchstabe steht ein unsichtbarer Malpunkt.", "Welches Zeichen lässt man zwischen Zahl und Buchstabe weg?"));
  h.body("Geteilt: drei Schreibweisen", "$12 : 4 \\qquad 12 / 4 \\qquad \\frac{12}{4}$", "Alle drei heißen: **12 in 4 gleiche Teile.**", "Das Ergebnis ist 3. Es heißt **Quotient**.");
  h.tasks("Geteilt: drei Schreibweisen", k("$\\frac{20}{5} = $ ___", "4", ["15"], "Der Bruchstrich bedeutet geteilt. 20 geteilt durch 5 ist 4.", "Was bedeutet der waagerechte Strich zwischen den beiden Zahlen?"));

  // --- chapter 2: powers and roots ---
  h.tasks("Hochzahlen", k("$2^3 = $ ___", "8", ["6"], "Die 2 steht dreimal da: 2 mal 2 mal 2.", "Wie oft steht die 2 da? Rechne mal, nicht plus."));
  h.body("Die Wurzel", "Das Zeichen $\\sqrt{\\;}$ heißt **Wurzel**.", "$\\sqrt{25} = 5$, weil $5 \\cdot 5 = 25$", "Die Wurzel fragt: **Welche Zahl mal sich selbst ergibt das?**");
  h.tasks("Die Wurzel", k("$\\sqrt{49} = $ ___", "7", ["24,5"], "7 mal 7 ergibt 49. Also ist die Wurzel 7.", "Welche Zahl ergibt 49, wenn du sie mit sich selbst malnimmst?"));
  h.after(
    "Die Wurzel",
    b("Jetzt du: Hochzahl und Wurzel", "Tipp bei jeder Aufgabe auf das richtige Ergebnis.", "Hier kommen drei kurze Aufgaben zu den letzten Tafeln. Denk bei der Hochzahl daran, dass sie sagt, wie oft die Zahl dasteht. Bei der Wurzel suchst du die Zahl, die mit sich selbst malgenommen das Ergebnis liefert.", {
      tasks: [
        k("$3^2 = $ ___", "9", ["6"], "Die 3 steht zweimal da: 3 mal 3.", "Die kleine Zahl oben sagt, wie oft die 3 dasteht."),
        k("$10^3 = $ ___", "1000", ["30"], "10 mal 10 mal 10 ergibt 1000.", "Wie oft steht die 10 da? Rechne mal, nicht plus."),
        k("$\\sqrt{100} = $ ___", "10", ["50"], "10 mal 10 ergibt 100. Also ist die Wurzel 10.", "Welche Zahl ergibt 100, wenn du sie mit sich selbst malnimmst?"),
      ],
    }),
  );

  // --- chapter 3: comparing, brackets, order of operations ---
  h.body("Gleich, ungefähr, ungleich", "$=$ **genau gleich**: $3 + 4 = 7$", "$\\approx$ **ungefähr**, nach dem Runden: $10 : 3 \\approx 3{,}33$", "$\\neq$ **nicht gleich**: $3 \\neq 4$");
  h.tasks("Gleich, ungefähr, ungleich", k("Du hast ein Ergebnis gerundet. Du schreibst davor ___.", "$\\approx$", ["$=$"], "Das Wellenzeichen sagt ehrlich: Das ist nur ungefähr so viel.", "Ist ein gerundetes Ergebnis genau oder nur ungefähr richtig?"));
  h.tasks("Kleiner und größer", k("$9$ ___ $4$", "$>$", ["$<$"], "9 ist größer als 4. Die Spitze zeigt zur kleineren Zahl.", "Auf welche der beiden Zahlen muss die Spitze zeigen?"));
  h.tasks("Klammern zuerst", k("$3 \\cdot (2 + 4) = $ ___", "18", ["10"], "Zuerst die Klammer: 2 plus 4 ist 6. Dann 3 mal 6.", "Was steht in der Klammer? Das rechnest du zuerst aus."));
  h.after(
    "Klammern zuerst",
    b("Punkt vor Strich", ["$2 + 3 \\cdot 4$", "Zuerst mal: $3 \\cdot 4 = 12$", "Dann plus: $2 + 12 = 14$", "Mal und Geteilt kommen **vor** Plus und Minus."], "Wenn keine Klammer da ist, gibt es eine feste Reihenfolge. Mal und Geteilt werden mit Punkten geschrieben, Plus und Minus mit Strichen. Deshalb heißt die Regel Punkt vor Strich. Wer einfach von links nach rechts rechnet, bekommt hier 20 heraus, und das ist falsch.", {
      tasks: [k("$10 - 2 \\cdot 3 = $ ___", "4", ["24"], "Zuerst 2 mal 3, das ist 6. Dann 10 minus 6.", "Welche der beiden Rechnungen ist eine Punktrechnung und kommt zuerst?")],
    }),
  );

  // --- chapter 4: letters, Greek letters, percent ---
  h.body("Buchstaben sind Kisten", "$x$ ist eine **Kiste**. Darin liegt eine Zahl, die du noch nicht kennst.", "So ein Buchstabe heißt **Variable**.", "$3x + 2$ mit $x = 4$: $3 \\cdot 4 + 2 = 14$");
  h.tasks("Buchstaben sind Kisten", k("$2x + 1$ mit $x = 5$ ergibt ___.", "11", ["8"], "2 mal 5 ist 10, und dazu kommt 1.", "Setz die 5 für das x ein. Was bedeutet 2x?"));
  h.body("Griechische Buchstaben", "$\\alpha$ alpha, $\\beta$ beta, $\\gamma$ gamma: So heißen **Winkel**.", "$\\pi$ pi $\\approx 3{,}14$: Das ist die **Kreiszahl**.");
  h.say("Griechische Buchstaben", "Diese Buchstaben stehen auf dem Formelblatt. Du musst kein Griechisch können. Es reicht, wenn du sie aussprechen kannst und weißt, wofür sie stehen. Alpha, Beta und Gamma sind Namen für Winkel, und Pi ist eine feste Zahl, die du beim Kreis brauchst.");
  h.tasks("Prozent heißt „von hundert“", k("$7\\,\\%$ bedeutet 7 von ___.", "100", ["10"], "Das Wort Prozent bedeutet von hundert.", "Was bedeutet das Wort Prozent auf Deutsch?"));
  h.say("Prozent heißt „von hundert“", "Prozent kommt aus dem Lateinischen und bedeutet von hundert. Es gibt auch Promille, das bedeutet von tausend. Probier unten noch eine Aufgabe. Danach kommt eine letzte Tafel, die alles zusammenfasst.");
  h.after(
    "Prozent heißt „von hundert“",
    b("Das nimmst du mit", ["Jedes Zeichen ist ein Wort.", "$3a$ heißt $3 \\cdot a$.", "$5^2$ heißt $5 \\cdot 5$.", "Klammern zuerst, dann Punkt vor Strich."], "Das waren alle Zeichen, die du für die Prüfung brauchst. Wenn dir später in einer Formel ein Zeichen begegnet, das dir fremd vorkommt, kannst du hierher zurückkommen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.", {
      tasks: [k("$4^2$ heißt ___.", "$4 \\cdot 4$", ["$4 \\cdot 2$"], "Die Hochzahl sagt, wie oft die 4 dasteht.", "Was sagt die kleine Zahl oben: mal wie viel, oder wie oft?")],
    }),
  );

  h.chapters([
    ["Mathe ist eine Sprache", "Die Rechenzeichen"],
    ["Hochzahlen", "Hochzahl und Wurzel"],
    ["Gleich, ungefähr, ungleich", "Vergleichen und die Reihenfolge beim Rechnen"],
    ["Buchstaben sind Kisten", "Buchstaben und Prozent"],
  ]);

  h.explain([
    "Die Hochzahl 2 sagt, dass die 4 zweimal dasteht. Also rechnest du 4 mal 4 und nicht 4 mal 2.",
    "Was in der Klammer steht, wird zuerst ausgerechnet. Hier ist das 2 plus 3, also 5. Danach kommt 5 mal 5.",
    "Zwischen einer Zahl und einem Buchstaben steht ein unsichtbarer Malpunkt. 3a bedeutet also 3 mal a.",
    "Das Zeichen mit den zwei Wellen bedeutet ungefähr gleich. Man benutzt es nach dem Runden.",
    "Die Wurzel fragt, welche Zahl mit sich selbst malgenommen 36 ergibt. Das ist 6, denn 6 mal 6 ist 36.",
    "Prozent bedeutet von hundert. 40 Prozent sind also 40 von 100.",
  ]);
  p.teaser = "Was Plus, Mal, Geteilt, Hochzahl, Wurzel, Klammern und Prozent wirklich bedeuten. In vier kurzen Kapiteln, mit einer kleinen Aufgabe auf fast jeder Tafel.";
});
