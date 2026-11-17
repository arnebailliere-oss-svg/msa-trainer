// P_MATH_POTENZ to the standard: boards stay; chapters, tap tasks and hints are added.
// New: the pattern that shows why "hoch 0" is 1 and why a negative exponent gives a fraction.
const { migrate, k, b, q } = require("./migrate.cjs");

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

  // Read-through: the rule is shown written out before it is named.
  h.body("Mal bei gleicher Basis", "$2^3 \\cdot 2^2$", "Ausgeschrieben: $2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$", "Das sind fünf Zweier: $2^5$", "Hochzahlen **addieren**: $3 + 2 = 5$");
  h.body("Geteilt bei gleicher Basis", "$\\frac{2^5}{2^2}$", "Ausgeschrieben: $\\frac{2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2}{2 \\cdot 2}$", "Zwei Zweier kürzen sich weg, drei bleiben: $2^3$", "Hochzahlen **subtrahieren**: $5 - 2 = 3$");

  // New topics: power of a power, same exponent, and the root laws from the Spickzettel.
  h.after(
    "Nur bei gleicher Basis",
    b("Potenz hoch Potenz", ["$(2^3)^2$", "Das heißt: $2^3 \\cdot 2^3$", "Ausgeschrieben sind das sechs Zweier: $2^6$", "Hochzahlen **malnehmen**: $3 \\cdot 2 = 6$"], "Hier steht eine Potenz in einer Klammer und bekommt noch eine Hochzahl. Die äußere Hochzahl sagt, wie oft die ganze Klammer dasteht. Zweimal drei Zweier sind sechs Zweier. Deshalb nimmst du die beiden Hochzahlen miteinander mal.", {
      tasks: [k("$(5^2)^4 = $ ___", "$5^8$", ["$5^6$"], "Die Klammer steht viermal da, jedes Mal mit zwei Fünfern. Das sind acht Fünfer.", "Wie oft steht die Klammer da, und wie viele Fünfer stecken in jeder?")],
    }),
    b("Gleiche Hochzahl", ["$2^2 \\cdot 5^2$", "Ausgeschrieben: $2 \\cdot 2 \\cdot 5 \\cdot 5$", "Umsortiert: $(2 \\cdot 5) \\cdot (2 \\cdot 5)$", "Das ist $10^2 = 100$.", "Bei gleicher Hochzahl darfst du die Basen malnehmen."], "Hier sind die Basen verschieden, aber die Hochzahlen gleich. Dann kannst du die Zahlen paarweise zusammenlegen: immer eine 2 mit einer 5. Aus jedem Paar wird eine 10. Das spart oft viel Rechnerei, zum Beispiel bei 2 hoch 3 mal 5 hoch 3.", {
      tasks: [k("$2^3 \\cdot 5^3 = $ ___", "$10^3$", ["$10^6$"], "Die Basen werden malgenommen: 2 mal 5 ist 10. Die Hochzahl 3 bleibt.", "Was passiert mit der Hochzahl, wenn sie bei beiden gleich ist?")],
    }),
  );
  h.after(
    "Wurzel aus Minus?",
    b("Wurzeln malnehmen", ["$\\sqrt{4} \\cdot \\sqrt{9}$", "Einzeln: $2 \\cdot 3 = 6$", "Unter einem Dach: $\\sqrt{4 \\cdot 9} = \\sqrt{36}$, und das ist auch 6.", "Beim Malnehmen darfst du zwei Wurzeln unter ein Wurzelzeichen schreiben."], "Probier es mit Zahlen aus, bei denen du die Wurzel kennst. Ob du erst die Wurzeln ziehst und dann malnimmst oder erst malnimmst und dann die Wurzel ziehst, das Ergebnis ist gleich. Das hilft bei krummen Wurzeln: Wurzel 5 mal Wurzel 20 ist Wurzel 100, also 10.", {
      tasks: [k("$\\sqrt{2} \\cdot \\sqrt{8} = $ ___", "4", ["16"], "Unter einem Dach steht 2 mal 8, also 16. Die Wurzel aus 16 ist 4.", "Was steht unter dem gemeinsamen Wurzelzeichen, und was ist davon die Wurzel?")],
    }),
    b("Wurzeln teilen", ["$\\frac{\\sqrt{50}}{\\sqrt{2}}$", "Unter einem Dach: $\\sqrt{50 : 2}$", "$\\sqrt{25} = 5$", "Beim Teilen gilt dasselbe wie beim Malnehmen."], "Auch beim Teilen darfst du beide Zahlen unter ein gemeinsames Wurzelzeichen schreiben. Erst teilst du die Zahlen, dann ziehst du die Wurzel. Bei Plus und Minus geht das nicht. Wurzel 9 plus Wurzel 16 ist 3 plus 4, also 7, und nicht Wurzel 25.", {
      tasks: [k("$\\frac{\\sqrt{18}}{\\sqrt{2}} = $ ___", "3", ["9"], "18 geteilt durch 2 ist 9. Die Wurzel aus 9 ist 3.", "Du hast geteilt. Welcher Schritt fehlt danach noch?")],
    }),
    b("Die dritte Wurzel", ["$\\sqrt[3]{8} = 2$, weil $2 \\cdot 2 \\cdot 2 = 8$", "Die kleine 3 am Wurzelzeichen fragt: Welche Zahl **dreimal** mit sich selbst mal ergibt das?", "$\\sqrt[3]{27} = 3$, weil $3 \\cdot 3 \\cdot 3 = 27$"], "Die normale Wurzel gehört zu hoch 2. Es gibt auch eine Wurzel zu hoch 3, die dritte Wurzel. Du erkennst sie an der kleinen 3 im Wurzelzeichen. Sie macht hoch 3 rückgängig, so wie die normale Wurzel hoch 2 rückgängig macht.", {
      tasks: [k("$\\sqrt[3]{1000} = $ ___", "10", ["100"], "10 mal 10 mal 10 ergibt 1000. Also ist die dritte Wurzel 10.", "Welche Zahl ergibt dreimal mit sich selbst malgenommen 1000?")],
    }),
    b("Wurzel als Hochzahl", ["$9^{\\frac{1}{2}}$ ist dasselbe wie $\\sqrt{9}$, also 3.", "Hoch ein Halb ist nur eine andere Schreibweise für die Wurzel.", "$8^{\\frac{1}{3}}$ ist dasselbe wie $\\sqrt[3]{8}$, also 2.", "Hoch ein Drittel ist die dritte Wurzel."], "Auf dem Formelblatt steht die Wurzel manchmal als Bruch in der Hochzahl. Das sieht ungewohnt aus, bedeutet aber nichts Neues. Ein Halb in der Hochzahl heißt Wurzel, ein Drittel heißt dritte Wurzel. Der Nenner des Bruchs sagt dir, welche Wurzel gemeint ist.", {
      tasks: [k("$16^{\\frac{1}{2}} = $ ___", "4", ["8"], "Hoch ein Halb bedeutet Wurzel. Die Wurzel aus 16 ist 4.", "Bedeutet hoch ein Halb die Hälfte oder die Wurzel?")],
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
  // New topics, words and quiz: added after the old quiz explanations.
  h.quiz(q("Was ist $(3^2)^3$?", "$3^6$", ["$3^5$", "$3^8$", "$9^6$"], "Die Klammer steht dreimal da, jedes Mal mit zwei Dreien. Das sind sechs Dreien, also 3 hoch 6."));
});
