// P_MATH_POTENZ to the standard: boards stay; chapters, tap tasks and hints are added.
// New: the pattern that shows why "hoch 0" is 1 and why a negative exponent gives a fraction.
const { migrate, k, b } = require("./migrate.cjs");

migrate("primers/math_04_potenzen.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH"];
  p.hook = "Manche Rechnungen sind lang und langweilig, zum Beispiel $2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$. Dafür gibt es eine Abkürzung, nämlich 2 hoch 5. Das ist schon die ganze Idee. Der Rest sind ein paar Regeln, die sich daraus ganz von selbst ergeben.";

  // --- chapter 1 ---
  h.body("Die Abkürzung", "$2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 2^5 = 32$", "Statt fünfmal 2 schreibt man **2 hoch 5**.", "So ein Ausdruck heißt **Potenz**.");
  h.tasks("Die Abkürzung", k("$3 \\cdot 3 \\cdot 3 \\cdot 3 = $ ___", "$3^4$", ["$4^3$"], "Die 3 steht viermal da. Die Anzahl kommt nach oben.", "Welche Zahl wird malgenommen, und wie oft steht sie da?"));
  h.body("Basis und Hochzahl", "$2^5$", "Die 2 unten heißt **Basis**. Sie wird malgenommen.", "Die 5 oben heißt Hochzahl oder **Exponent**. Sie sagt, wie oft.");
  h.tasks("Basis und Hochzahl", k("Bei $7^2$ ist die 7 die ___.", "Basis", ["Hochzahl"], "Die große Zahl unten ist die Basis. Sie wird malgenommen.", "Steht die 7 unten oder oben? Welcher Name gehört zu dieser Stelle?"));
  h.tasks("Nicht verwechseln", k("$2^4 = $ ___", "16", ["8"], "Die 2 steht viermal da: 2 mal 2 mal 2 mal 2.", "Wie oft steht die 2 da? Rechne mal, nicht plus."));
  h.body("Hoch 2 und hoch 3", "$4^2 = 16$: das Quadrat von 4", "$4^3 = 64$: 4 Kubik", "Zahlen wie 16, 25 und 36 heißen **Quadratzahlen**.");
  h.tasks("Hoch 2 und hoch 3", k("$5^2 = $ ___", "25", ["10"], "Die 5 steht zweimal da: 5 mal 5.", "Hoch 2 bedeutet: die Zahl mit sich selbst malnehmen."));

  // --- chapter 2 ---
  h.say("Hoch 1 und hoch 0", "Hoch 1 ist leicht: Die Zahl steht einmal da. Hoch 0 überrascht die meisten, denn es kommt immer 1 heraus und nicht 0. Das ist keine Regel, die jemand einfach festgelegt hat. Warum es so sein muss, siehst du auf der nächsten Tafel.");
  h.tasks("Hoch 1 und hoch 0", k("$9^0 = $ ___", "1", ["0"], "Jede Zahl hoch 0 ergibt 1.", "Was steht auf der Tafel in der letzten Zeile?"));
  h.after(
    "Hoch 1 und hoch 0",
    b("Warum ist hoch 0 gleich 1?", ["$2^3 = 8$", "$2^2 = 4$", "$2^1 = 2$", "$2^0 = 1$", "Jede Stufe nach unten wird **durch 2 geteilt**."], "Lies die Reihe von oben nach unten. Die Hochzahl wird jedes Mal um 1 kleiner. Das Ergebnis halbiert sich dabei jedes Mal: 8, 4, 2. Wenn du noch einmal durch 2 teilst, kommst du bei 1 an. Deshalb ist 2 hoch 0 gleich 1.", {
      tasks: [k("$3^1 = 3$. Eine Stufe tiefer: $3^0 = 3 : 3 = $ ___", "1", ["0"], "3 geteilt durch 3 ergibt 1. So geht die Reihe weiter.", "Was ergibt eine Zahl, die du durch sich selbst teilst?")],
    }),
  );
  h.body("Zehnerpotenzen", "$10^2 = 100$", "$10^3 = 1000$", "$10^6 = 1\\,000\\,000$", "Solche Zahlen heißen **Zehnerpotenzen**. Die Hochzahl zählt die Nullen.");
  h.tasks("Zehnerpotenzen", k("$10^4 = $ ___", "10 000", ["40"], "Die Hochzahl 4 sagt: eine 1 mit vier Nullen.", "Wie viele Nullen hat die Zahl? Schau auf die Hochzahl."));
  h.say("Negative Hochzahl = Bruch", "Die Reihe von eben geht einfach weiter. Nach der 1 kommt ein Halbes, dann ein Viertel, dann ein Achtel. Ein Minus in der Hochzahl bedeutet also eins geteilt durch die Potenz. Die Zahl wird dadurch nicht negativ. Sie wird nur sehr klein.");
  h.tasks("Negative Hochzahl = Bruch", k("$2^{-2} = $ ___", "$\\frac{1}{4}$", ["$-4$"], "Eins geteilt durch 2 hoch 2, also eins geteilt durch 4.", "Macht das Minus in der Hochzahl die Zahl negativ oder klein?"));

  // --- chapter 3 ---
  h.tasks("Mal bei gleicher Basis", k("$5^2 \\cdot 5^3 = $ ___", "$5^5$", ["$5^6$"], "Zwei Fünfer mal drei Fünfer sind fünf Fünfer. Die Hochzahlen werden zusammengezählt.", "Wie viele Fünfer stehen insgesamt da? Zähl sie zusammen."));
  h.tasks("Geteilt bei gleicher Basis", k("$\\frac{3^6}{3^2} = $ ___", "$3^4$", ["$3^3$"], "Von sechs Dreien kürzen sich zwei weg. Vier bleiben übrig.", "Wie viele Dreien bleiben, wenn sich zwei wegkürzen?"));
  h.after(
    "Geteilt bei gleicher Basis",
    b("Nur bei gleicher Basis", ["$2^3 \\cdot 3^2$", "Die Basen sind **verschieden**. Hier gilt die Regel nicht.", "Du rechnest einzeln: $8 \\cdot 9 = 72$"], "Die beiden Regeln funktionieren nur, wenn unten dieselbe Zahl steht. Bei 2 hoch 3 mal 3 hoch 2 gibt es Zweier und Dreier, also zwei verschiedene Sorten. Die kannst du nicht zusammenzählen. Du rechnest jede Potenz für sich aus und nimmst dann mal.", {
      tasks: [k("$2^2 \\cdot 5^2$: Darfst du hier die Hochzahlen zusammenzählen? ___", "Nein", ["Ja"], "Die Basen 2 und 5 sind verschieden. Die Regel gilt nur bei gleicher Basis.", "Steht unten beide Male dieselbe Zahl?")],
    }),
    b("Jetzt du: rechnen mit Potenzen", "Tipp bei jeder Aufgabe auf das richtige Ergebnis.", "Schau bei jeder Aufgabe zuerst, ob die Basis gleich ist. Bei Mal zählst du die Hochzahlen zusammen. Bei Geteilt ziehst du sie voneinander ab.", {
      tasks: [
        k("$2^3 \\cdot 2^4 = $ ___", "$2^7$", ["$2^{12}$"], "Bei Mal werden die Hochzahlen zusammengezählt: 3 plus 4.", "Zählst du die Hochzahlen zusammen, oder nimmst du sie mal?"),
        k("$\\frac{10^5}{10^3} = $ ___", "$10^2$", ["$10^8$"], "Bei Geteilt werden die Hochzahlen abgezogen: 5 minus 3.", "Was machst du mit den Hochzahlen, wenn geteilt wird?"),
        k("$7^1 \\cdot 7^2 = $ ___", "$7^3$", ["$7^2$"], "1 plus 2 ergibt 3. Auch die Hochzahl 1 zählt mit.", "Vergiss die Hochzahl 1 nicht. Was ergibt 1 plus 2?"),
      ],
    }),
  );

  // --- chapter 4 ---
  h.say("Die Wurzel", "Wurzel ziehen ist die Rückfrage zum Quadrieren: Welche Zahl hoch 2 ergibt das? Bei 16 ist die Antwort 4, denn 4 mal 4 ist 16. Die Zahl, die unter dem Wurzelzeichen steht, heißt Radikand.");
  h.tasks("Die Wurzel", k("$\\sqrt{36} = $ ___", "6", ["18"], "6 mal 6 ergibt 36. Die Wurzel halbiert nicht.", "Welche Zahl ergibt 36, wenn du sie mit sich selbst malnimmst?"));
  h.tasks("Wurzel aus keiner Quadratzahl", k("Du hast $\\sqrt{10}$ gerundet. Du schreibst ___.", "$\\approx 3{,}16$", ["$= 3{,}16$"], "Das Ergebnis ist gerundet, also nur ungefähr richtig.", "Ist ein gerundetes Ergebnis genau oder nur ungefähr richtig?"));
  h.after(
    "Wurzel aus Minus?",
    b("Das nimmst du mit", ["(1) $2^5$ heißt: fünfmal die 2 malnehmen.", "(2) Hoch 0 ergibt 1.", "(3) Minus in der Hochzahl: eins geteilt durch.", "(4) Gleiche Basis: bei Mal plus, bei Geteilt minus.", "(5) Die Wurzel ist die Rückfrage zum Quadrat."], "Das sind die fünf Dinge, die du über Potenzen und Wurzeln wissen musst. Wenn du eine Regel vergisst, schreib die Potenz einfach aus, so wie am Anfang. Dann siehst du, was passiert. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("$4^0 = $ ___", "1", ["4"], "Jede Zahl hoch 0 ergibt 1.", "Denk an die Reihe, in der jedes Mal geteilt wird. Wo endet sie?")],
    }),
  );

  h.chapters([
    ["Die Abkürzung", "Was eine Potenz ist"],
    ["Hoch 1 und hoch 0", "Besondere Hochzahlen"],
    ["Mal bei gleicher Basis", "Rechnen mit Potenzen"],
    ["Die Wurzel", "Wurzeln"],
  ]);
  h.explain([
    "Die 3 steht dreimal da: 3 mal 3 mal 3. Das ergibt 27.",
    "Die Basis ist die große Zahl unten, also die 5. Die 4 ist die Hochzahl.",
    "Jede Zahl hoch 0 ergibt 1. Das folgt aus der Reihe, in der mit jeder Stufe durch die Basis geteilt wird.",
    "Ein Minus in der Hochzahl bedeutet eins geteilt durch die Potenz. 2 hoch 2 ist 4, also ist das Ergebnis ein Viertel.",
    "Die Wurzel fragt, welche Zahl mit sich selbst malgenommen 64 ergibt. Das ist 8.",
    "Bei gleicher Basis werden die Hochzahlen zusammengezählt: 2 plus 4 ist 6. Die Basis bleibt 3.",
  ]);
});
