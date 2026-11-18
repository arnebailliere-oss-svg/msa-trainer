// P_MATH_BRUCH to the standard: boards and figure stay; chapters, tap tasks and hints are added,
// plus the steps the review found missing (fully reducing, mixed numbers, finding the common denominator).
const { migrate, k, b } = require("./migrate.cjs");
const F = (a, c) => `$\\frac{${a}}{${c}}$`;

migrate("primers/math_01_bruch.json", (p, h) => {
  p.hook = "Zahlen mit einem Strich in der Mitte machen vielen Angst. Dabei steckt dahinter nur eine Pizza, die man teilt. Wenn du dieses Bild im Kopf hast, ist der Rest Handwerk. Wir gehen es in Ruhe durch, ein Stück nach dem anderen.";

  // --- chapter 1 ---
  h.body("Eine Pizza in Stücken", "Eine Pizza wird in 4 gleiche Stücke geteilt.", `Du isst 3 davon: ${F(3, 4)}`, "Das heißt: drei **von** vier. So eine Zahl heißt **Bruch**.");
  h.tasks("Zähler und Nenner", k(`Bei ${F(2, 5)} ist die 5 der ___.`, "Nenner", ["Zähler"], "Die Zahl unten nennt, in wie viele Stücke geteilt wurde.", "Steht die 5 oben oder unten? Welcher Name gehört zu dieser Stelle?"));
  h.body("Der Bruchstrich ist Geteilt", "$\\frac{3}{4} = 3 : 4 = 0{,}75$", "$\\frac{1}{2} = 1 : 2 = 0{,}5$", "Eine Zahl mit Komma heißt **Dezimalzahl**.");
  h.tasks("Der Bruchstrich ist Geteilt", k(`${F(1, 4)} $= 1 : 4 = $ ___`, "$0{,}25$", ["$0{,}4$"], "Eins geteilt durch vier ergibt 0,25. Das ist ein Viertel.", "Rechne oben geteilt durch unten. Wie viel ist ein Viertel von einem Euro?"));
  h.tasks("Großer Nenner, kleines Stück", k("Welches Stück ist größer? ___", F(1, 3), [F(1, 6)], "Bei drei Leuten bekommt jeder mehr Pizza als bei sechs Leuten.", "Bei welcher Zahl teilen sich weniger Leute die Pizza?"));

  // --- chapter 2 ---
  h.tasks("Erweitern: mehr Stücke, gleiche Pizza", k(`${F(1, 3)} erweitert mit 2 ergibt ___.`, F(2, 6), [F(2, 3)], "Oben und unten wird mit 2 malgenommen.", "Was musst du beim Erweitern mit der Zahl unten tun?"));
  h.tasks("Kürzen: rückwärts", k(`${F(4, 10)} gekürzt mit 2 ergibt ___.`, F(2, 5), [F(2, 10)], "Oben und unten wird durch 2 geteilt.", "Was musst du beim Kürzen mit der Zahl unten tun?"));
  h.after(
    "Kürzen: rückwärts",
    b("Wann ist ein Bruch fertig gekürzt?", [F(12, 18), `Geteilt durch 2: ${F(6, 9)}`, `Geteilt durch 3: ${F(2, 3)}`, "Jetzt gibt es keine Zahl mehr, durch die sich beide teilen lassen."], "Manchmal musst du mehrmals kürzen. Du suchst immer wieder eine Zahl, durch die sich Zähler und Nenner beide teilen lassen. Wenn du keine mehr findest, ist der Bruch so weit wie möglich gekürzt. Das wird in der Prüfung oft verlangt.", {
      tasks: [k(`${F(6, 8)} so weit wie möglich gekürzt ist ___.`, F(3, 4), [F(6, 8)], "Beide Zahlen lassen sich durch 2 teilen. Danach geht es nicht weiter.", "Gibt es eine Zahl, durch die sich 6 und 8 beide teilen lassen?")],
    }),
    b("Mehr als ein Ganzes", [`${F(5, 4)} ist mehr als eine ganze Pizza.`, `${F(5, 4)} $= 1\\frac{1}{4}$`, "Eine ganze Zahl mit einem Bruch daneben heißt **gemischte Zahl**."], "Fünf Viertel sind eine ganze Pizza und noch ein Viertel dazu. Vier Viertel ergeben nämlich ein Ganzes. Das schreibt man als gemischte Zahl: eins und ein Viertel. Beide Schreibweisen bedeuten genau dieselbe Menge.", {
      tasks: [k(`${F(7, 4)} $= $ ___`, "$1\\frac{3}{4}$", ["$7\\frac{1}{4}$"], "Vier Viertel sind ein Ganzes. Drei Viertel bleiben übrig.", "Wie viele Viertel ergeben eine ganze Pizza? Wie viele bleiben dann übrig?")],
    }),
  );

  // --- chapter 3 ---
  h.tasks("Gleichnamig: gleicher Nenner", k(`${F(2, 7)} $+$ ${F(3, 7)} $= $ ___`, F(5, 7), [F(5, 14)], "Die Stücke sind gleich groß. Du zählst nur die Zähler zusammen.", "Ändert sich die Größe der Stücke, wenn du sie zusammenzählst?"));
  h.after(
    "Ungleiche Nenner: erst gleich machen",
    b("So findest du den gemeinsamen Nenner", [`${F(1, 4)} $+$ ${F(1, 6)}`, "Vielfache von 4: 4, 8, **12**", "Vielfache von 6: 6, **12**", "Die erste gemeinsame Zahl ist 12. Sie wird der neue Nenner."], "Du brauchst eine Stückgröße, in die sich beide Brüche umschneiden lassen. Schreib dafür die Reihe von jedem Nenner auf, wie beim Einmaleins. Die erste Zahl, die in beiden Reihen vorkommt, ist dein gemeinsamer Nenner. Man nennt sie das kleinste gemeinsame Vielfache, kurz **kgV**.", {
      tasks: [k(`Der gemeinsame Nenner von ${F(1, 2)} und ${F(1, 5)} ist ___.`, "10", ["7"], "Die Zehn steht in der Reihe der Zwei und in der Reihe der Fünf.", "Welche Zahl kommt in der Zweierreihe und in der Fünferreihe zuerst gemeinsam vor?")],
    }),
    b("Dann erweitern und zusammenzählen", [`${F(1, 4)} $=$ ${F(3, 12)}, denn oben und unten mal 3`, `${F(1, 6)} $=$ ${F(2, 12)}, denn oben und unten mal 2`, `${F(3, 12)} $+$ ${F(2, 12)} $=$ ${F(5, 12)}`], "Jetzt bringst du beide Brüche auf den neuen Nenner. Du überlegst jedes Mal, mit welcher Zahl du malnehmen musst, damit unten 12 steht. Mit derselben Zahl nimmst du auch oben mal. Danach sind die Stücke gleich groß, und du zählst sie zusammen.", {
      tasks: [k(`${F(1, 2)} $+$ ${F(1, 5)} $=$ ${F(5, 10)} $+$ ${F(2, 10)} $= $ ___`, F(7, 10), [F(2, 7)], "Fünf Zehntel und zwei Zehntel sind sieben Zehntel.", "Die Stücke sind jetzt gleich groß. Was zählst du zusammen?")],
    }),
  );

  // --- chapter 4 ---
  h.tasks("Mal: einfach durch", k(`${F(1, 2)} $\\cdot$ ${F(3, 5)} $= $ ___`, F(3, 10), [F(4, 7)], "Zähler mal Zähler und Nenner mal Nenner.", "Was rechnest du beim Malnehmen mit den beiden Zahlen unten?"));
  h.body("Geteilt: umdrehen und mal", "$\\frac{1}{2} : \\frac{1}{4} = \\frac{1}{2} \\cdot \\frac{4}{1} = \\frac{4}{2} = 2$", "Den zweiten Bruch **umdrehen**, dann mal.", "Der umgedrehte Bruch heißt **Kehrwert**.");
  h.tasks("Geteilt: umdrehen und mal", k(`Der Kehrwert von ${F(2, 3)} ist ___.`, F(3, 2), [F(1, 3)], "Beim Kehrwert tauschen Zähler und Nenner die Plätze.", "Was passiert mit oben und unten, wenn du einen Bruch umdrehst?"));
  h.tasks("Bruch, Dezimalzahl, Prozent", k(`${F(1, 4)} $= $ ___`, "25 %", ["4 %"], "Ein Viertel von hundert sind 25.", "Wie viel ist ein Viertel von 100?"));
  h.after(
    "Bruch, Dezimalzahl, Prozent",
    b("Das nimmst du mit", ["Oben steht der Zähler, unten der Nenner.", "Erweitern und Kürzen ändern den Wert nicht.", "Plus und Minus: erst gleiche Nenner.", "Mal: oben mal oben, unten mal unten.", "Geteilt: mal den Kehrwert."], "Das sind die fünf Dinge, die du über Brüche wissen musst. Wenn du unsicher wirst, denk an die Pizza. Stücke kann man nur zusammenzählen, wenn sie gleich groß sind. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.", {
      tasks: [k(`${F(1, 2)} $+$ ${F(1, 3)}: Was machst du zuerst? ___`, "Ich bringe beide auf denselben Nenner.", ["Ich zähle oben und unten zusammen."], "Halbe und Drittel sind verschieden groß. Erst gleich große Stücke kann man zählen.", "Sind die Stücke gleich groß? Was muss vorher geschehen?")],
    }),
  );

  // Small steps: one line per step instead of one long calculation.
  h.body("Mal: einfach durch", "$\\frac{2}{3} \\cdot \\frac{3}{4}$", "Oben: $2 \\cdot 3 = 6$", "Unten: $3 \\cdot 4 = 12$", "Ergebnis: $\\frac{6}{12}$", "Gekürzt: $\\frac{1}{2}$", "Zähler mal Zähler, Nenner mal Nenner.");
  h.body("Geteilt: umdrehen und mal", "$\\frac{1}{2} : \\frac{1}{4}$", "Den zweiten Bruch **umdrehen**: Aus $\\frac{1}{4}$ wird $\\frac{4}{1}$.", "Dann mal: $\\frac{1}{2} \\cdot \\frac{4}{1} = \\frac{4}{2}$", "$\\frac{4}{2} = 2$", "Der umgedrehte Bruch heißt **Kehrwert**.");

  // Read-through: each step of expanding is shown, and the board that only poses the problem no longer skips ahead.
  p.requires = ["P_MATH_ZEICHEN"];
  h.body("Erweitern: mehr Stücke, gleiche Pizza", "$\\frac{1}{2}$", "Oben mal 2 und unten mal 2: $\\frac{2}{4}$", "Noch einmal oben und unten mal 2: $\\frac{4}{8}$", "Der Wert bleibt gleich: Es ist immer die halbe Pizza.");
  h.body("Ungleiche Nenner: erst gleich machen", "$\\frac{1}{2} + \\frac{1}{3}$", "Die Stücke sind verschieden groß. So kannst du sie nicht zählen.", "Erst müssen beide Brüche denselben Nenner bekommen.", "Wie das geht, zeigen die nächsten zwei Tafeln.");
  h.body("Der berühmte Fehler", "$\\frac{1}{2} + \\frac{1}{3}$ ist **nicht** $\\frac{2}{5}$.", "Oben plus oben, unten plus unten: **verboten**.", "Richtig: erst beide auf Sechstel bringen.", "$\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$");

  // One new thing per board: Nenner and Zähler apart, Vielfache before the common denominator,
  // multiplying and shortening apart, the Kehrwert before dividing.
  {
    const pizza = h.board("Eine Pizza in Stücken").figure;
    h.rename("Zähler und Nenner", "Die Zahl unten");
    h.body("Die Zahl unten", "$\\frac{3}{4}$", "Die Zahl unten heißt **Nenner**.", "Sie nennt, in wie viele Stücke geteilt wurde: in 4.");
    h.say("Die Zahl unten", "Fang unten an. Dort steht, in wie viele gleiche Stücke das Ganze geteilt wurde. Diese Zahl heißt Nenner. Merkhilfe: Der Nenner steht unten wie der Boden.");
    h.tasks("Die Zahl unten", k("Eine Torte wird in 8 gleiche Stücke geteilt. Der Nenner ist ___.", "8", ["1"], "Der Nenner sagt, in wie viele Stücke geteilt wurde. Das sind hier 8.", "In wie viele Stücke wurde die Torte geteilt?"));
    h.board("Die Zahl unten").figure = pizza;
    h.after(
      "Die Zahl unten",
      b("Die Zahl oben", ["$\\frac{3}{4}$", "Die Zahl oben heißt **Zähler**.", "Sie zählt, wie viele Stücke du nimmst: 3."], "Oben steht, wie viele von den Stücken gemeint sind. Diese Zahl heißt Zähler, weil sie die Stücke zählt. Drei Viertel heißt also: Von vier Stücken nimmst du drei.", {
        figure: pizza,
        tasks: [k("Bei $\\frac{2}{5}$ ist die 5 der ___.", "Nenner", ["Zähler"], "Die Zahl unten nennt, in wie viele Stücke geteilt wurde.", "Steht die 5 oben oder unten? Welcher Name gehört zu dieser Stelle?")],
      }),
    );
  }
  h.body("Der Bruchstrich ist Geteilt", "$\\frac{3}{4}$ heißt auch: 3 geteilt durch 4.", "Mit dem Taschenrechner: $3 : 4 = 0{,}75$", "Eine Zahl mit Komma heißt **Dezimalzahl**.");
  h.body("Gleichnamig: gleicher Nenner", "$\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}$", "Die Stücke sind gleich groß: einfach zählen.", "Der Nenner bleibt 4.", "Brüche mit gleichem Nenner heißen **gleichnamig**.");
  h.before(
    "So findest du den gemeinsamen Nenner",
    b("Was ist ein Vielfaches?", ["Die Viererreihe: 4, 8, 12, 16", "Diese Zahlen heißen **Vielfache** von 4.", "Die Sechserreihe: 6, 12, 18", "Das sind die Vielfachen von 6."], "Bevor wir den gemeinsamen Nenner suchen, brauchst du ein Wort. Die Zahlen einer Reihe aus dem Einmaleins heißen Vielfache. Die Vielfachen von 4 sind also 4, 8, 12 und so weiter. Du bekommst sie, wenn du immer wieder 4 dazuzählst.", {
      tasks: [k("Ein Vielfaches von 5 ist ___.", "15", ["12"], "Die 15 steht in der Fünferreihe: 5, 10, 15.", "Zähl die Fünferreihe auf. Welche der beiden Zahlen kommt darin vor?")],
    }),
  );

  h.body("Mal: einfach durch", "$\\frac{2}{3} \\cdot \\frac{3}{4}$", "Oben mal oben: $2 \\cdot 3 = 6$", "Unten mal unten: $3 \\cdot 4 = 12$", "Ergebnis: $\\frac{6}{12}$");
  h.say("Mal: einfach durch", "Malnehmen ist bei Brüchen das Leichteste. Du rechnest Zähler mal Zähler und Nenner mal Nenner. Mehr ist es nicht.");
  h.after(
    "Mal: einfach durch",
    b("Am Ende kürzen", ["$\\frac{6}{12}$ lässt sich noch kürzen.", "Oben und unten durch 6: $\\frac{1}{2}$", "Schau nach dem Malnehmen immer, ob du kürzen kannst."], "Das Ergebnis von eben war sechs Zwölftel. Sechs und zwölf lassen sich beide durch sechs teilen. Dann bleibt ein Halb übrig. In der Prüfung wird das gekürzte Ergebnis erwartet.", {
      tasks: [k("$\\frac{2}{3}$ $\\cdot$ $\\frac{1}{2}$ $=$ $\\frac{2}{6}$ $= $ ___", "$\\frac{1}{3}$", ["$\\frac{2}{3}$"], "Oben und unten durch 2 geteilt ergibt ein Drittel.", "Durch welche Zahl lassen sich 2 und 6 beide teilen?")],
    }),
  );
  h.before(
    "Geteilt: umdrehen und mal",
    b("Einen Bruch umdrehen", ["Dreh einen Bruch um: Oben und unten tauschen die Plätze.", "Aus $\\frac{1}{4}$ wird $\\frac{4}{1}$.", "Der umgedrehte Bruch heißt **Kehrwert**."], "Für das Teilen brauchst du einen kleinen Handgriff. Du stellst einen Bruch auf den Kopf. Was oben stand, steht dann unten, und umgekehrt. Dieser umgedrehte Bruch hat einen Namen, den Kehrwert.", {
      tasks: [k("Der Kehrwert von $\\frac{2}{3}$ ist ___.", "$\\frac{3}{2}$", ["$\\frac{1}{3}$"], "Beim Kehrwert tauschen Zähler und Nenner die Plätze.", "Was passiert mit oben und unten, wenn du einen Bruch umdrehst?")],
    }),
  );
  h.body("Geteilt: umdrehen und mal", "$\\frac{1}{2} : \\frac{1}{4}$", "Nimm vom zweiten Bruch den Kehrwert: $\\frac{4}{1}$", "Dann rechnest du mal: $\\frac{1}{2} \\cdot \\frac{4}{1} = \\frac{4}{2}$", "$\\frac{4}{2} = 2$");
  h.tasks("Geteilt: umdrehen und mal", k("$\\frac{1}{3}$ $:$ $\\frac{1}{2}$ $=$ $\\frac{1}{3}$ $\\cdot$ ___", "$\\frac{2}{1}$", ["$\\frac{1}{2}$"], "Beim Teilen nimmst du mit dem Kehrwert des zweiten Bruchs mal.", "Welchen Bruch drehst du um, bevor du malnimmst?"));

  h.chapters([
    ["Eine Pizza in Stücken", "Was ein Bruch ist"],
    ["Erweitern: mehr Stücke, gleiche Pizza", "Erweitern und Kürzen"],
    ["Gleichnamig: gleicher Nenner", "Plus und Minus"],
    ["Mal: einfach durch", "Mal, Geteilt und Umwandeln"],
  ]);

  h.explain([
    "Der Nenner steht unten. Er nennt, in wie viele Stücke geteilt wurde. Hier ist das die 5.",
    "Wenn du bei einem Halben oben und unten mit 4 malnimmst, bekommst du vier Achtel. Der Wert bleibt dabei gleich.",
    "Die Stücke sind gleich groß, also zählst du nur die Zähler zusammen. Der Nenner bleibt 4.",
    "Zähler und Nenner lassen sich beide durch 3 teilen. Danach gibt es keine gemeinsame Zahl mehr, durch die du kürzen könntest.",
    "Je weniger Leute sich eine Pizza teilen, desto größer ist jedes Stück. Ein Drittel ist deshalb größer als ein Fünftel.",
    "Drei geteilt durch vier ist 0,75. Das sind 75 von 100, also 75 Prozent.",
  ]);
  p.teaser = "Was Zähler und Nenner sind, was Kürzen und Erweitern wirklich heißen, wie du einen gemeinsamen Nenner findest und warum ein Halbes plus ein Drittel nicht zwei Fünftel ist.";

  // Word card: every word of this lesson.
  h.vocab(
    { term: "Bruch", plain: "So viele von so vielen gleichen Stücken.", example: "$\\frac{3}{4}$ sind 3 von 4 Stücken." },
    { term: "Nenner", plain: "Die Zahl unten. Sie nennt, in wie viele Stücke geteilt wurde.", example: "Bei $\\frac{3}{4}$ ist 4 der Nenner." },
    { term: "Zähler", plain: "Die Zahl oben. Sie zählt die Stücke, die gemeint sind.", example: "Bei $\\frac{3}{4}$ ist 3 der Zähler." },
    { term: "Bruchstrich", plain: "Der Strich zwischen oben und unten. Er bedeutet geteilt.", example: "$\\frac{3}{4} = 3 : 4$" },
    { term: "Dezimalzahl", plain: "Eine Zahl mit Komma.", example: "$0{,}75$" },
    { term: "Erweitern", plain: "Oben und unten mal dieselbe Zahl. Der Wert bleibt gleich.", example: "$\\frac{1}{2} = \\frac{3}{6}$" },
    { term: "Kürzen", plain: "Oben und unten durch dieselbe Zahl. Der Wert bleibt gleich.", example: "$\\frac{6}{8} = \\frac{3}{4}$" },
    { term: "Gemischte Zahl", plain: "Eine ganze Zahl mit einem Bruch daneben.", example: "$1\\frac{1}{4} = \\frac{5}{4}$" },
    { term: "Gleichnamig", plain: "Mit gleichem Nenner. Erst dann kannst du Brüche zusammenzählen oder abziehen.", example: "$\\frac{1}{6} + \\frac{2}{6} = \\frac{3}{6}$" },
    { term: "Vielfaches", plain: "Eine Zahl aus der Reihe im Einmaleins.", example: "Vielfache von 4: 4, 8, 12, 16" },
    { term: "kgV", plain: "Kleinstes gemeinsames Vielfaches. Die erste Zahl, die in beiden Reihen vorkommt. Sie wird der gemeinsame Nenner.", example: "4 und 6: Das kgV ist 12." },
    { term: "Kehrwert", plain: "Der Bruch auf den Kopf gestellt.", example: "Der Kehrwert von $\\frac{2}{3}$ ist $\\frac{3}{2}$." },
  );
});
