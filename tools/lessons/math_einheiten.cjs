// P_MATH_EINHEITEN to the standard: boards and the figure stay; chapters, tap tasks and hints are added.
// Fixed: "1 m² = 10 000 cm²" next to "jede Stufe mal 100" was confusing. The boards now say that m to cm is two steps.
// The ladder is written as a list instead of an arrow chain; "dezi" is introduced on the first board.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_08_einheiten.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH", "P_MATH_POTENZ"];
  p.outro = "Du kennst jetzt die Vorsilben kilo, dezi, zenti und milli. Bei Längen rechnest du von Stufe zu Stufe mal 10, bei Flächen mal 100 und bei Volumen mal 1000. Nur die Zeit läuft in Sechzigern. Das reicht für jede Umrechnung.";

  // --- chapter 1 ---
  h.body("Die Vorsilben", "**kilo** = tausend: 1 km = 1000 m", "**dezi** = zehntel: 1 dm = $\\frac{1}{10}$ m", "**zenti** = hundertstel: 1 cm = $\\frac{1}{100}$ m", "**milli** = tausendstel: 1 mm = $\\frac{1}{1000}$ m");
  h.say("Die Vorsilben", "Diese vier kleinen Wörter kommen aus dem Griechischen und Lateinischen. Sie stehen vor der Einheit und sagen, wie groß sie ist. Ein Kilometer sind tausend Meter. Ein Zentimeter ist ein Hundertstel von einem Meter. Mehr musst du dir nicht merken.");
  h.tasks("Die Vorsilben", k("$3\\ \\text{km} = $ ___", "3000 m", ["300 m"], "Kilo heißt tausend. 3 mal 1000 ergibt 3000.", "Schau in die erste Zeile der Tafel. Was bedeutet die Vorsilbe?"));
  h.body("Die Längen-Leiter", "Von groß nach klein: km, m, dm, cm, mm", "Von m bis mm ist jede Stufe **mal 10**.", "Nur von km zu m: **mal 1000**");
  h.say("Die Längen-Leiter", "Stell dir die Einheiten wie eine Leiter vor. Gehst du eine Stufe hinunter zur kleineren Einheit, rechnest du mal. Gehst du hinauf zur größeren, teilst du. So werden aus 2,5 Metern erst 25 Dezimeter und dann 250 Zentimeter.");
  h.tasks("Die Längen-Leiter", k("Von m zu dm rechnest du ___.", "mal 10", ["mal 100"], "Der Dezimeter ist die nächste Stufe unter dem Meter. Jede Stufe ist mal 10.", "Wie viele Dezimeter passen in einen Meter?"));
  h.say("Beispiel", "Mit einer einfachen Frage kannst du jedes Ergebnis prüfen. Wird die Einheit größer, muss die Zahl kleiner werden. Wird die Einheit kleiner, muss die Zahl größer werden. Von kleinen Schritten brauchst du schließlich mehr als von großen.");
  h.tasks("Beispiel", k("Du rechnest von m in km um. Die Zahl wird ___.", "kleiner", ["größer"], "Der Kilometer ist die größere Einheit. Davon brauchst du weniger.", "Brauchst du von großen Schritten mehr oder weniger als von kurzen?"));
  h.after(
    "Beispiel",
    b("Jetzt du: Längen umrechnen", "Tipp bei jeder Aufgabe auf das richtige Ergebnis.", "Überleg bei jeder Aufgabe zuerst, ob die neue Einheit größer oder kleiner ist. Dann weißt du schon, ob die Zahl wachsen oder schrumpfen muss. Danach zählst du die Stufen auf der Leiter.", {
      tasks: [
        k("$7\\ \\text{cm} = $ ___", "70 mm", ["700 mm"], "Von cm zu mm ist es eine Stufe nach unten, also mal 10.", "Wie viele Stufen liegen auf der Leiter zwischen cm und mm?"),
        k("$5000\\ \\text{m} = $ ___", "5 km", ["50 km"], "Kilo heißt tausend. 5000 geteilt durch 1000 ergibt 5.", "Durch welche Zahl teilst du, wenn du von Metern zu Kilometern gehst?"),
        k("$1{,}2\\ \\text{m} = $ ___", "120 cm", ["12 cm"], "Von m zu cm sind es zwei Stufen, also mal 100.", "Wie viele Zentimeter hat ein ganzer Meter?"),
      ],
    }),
  );

  // --- chapter 2 ---
  h.body("Fläche: alles mal 100", "1 m = 100 cm", "$1\\ \\text{m}^2 = 100 \\cdot 100 = 10\\,000\\ \\text{cm}^2$", "Von einer Stufe zur nächsten, etwa von $\\text{dm}^2$ zu $\\text{cm}^2$: **mal 100**.", "Von $\\text{m}^2$ zu $\\text{cm}^2$ sind es zwei Stufen.");
  h.say("Fläche: alles mal 100", "Ein Quadratmeter ist ein Quadrat, das einen Meter lang und einen Meter breit ist. In Zentimetern sind das 100 mal 100. Bei Flächen zählt jede Stufe der Leiter also doppelt: einmal für die Länge und einmal für die Breite. Deshalb ist jede Stufe mal 100.");
  h.tasks("Fläche: alles mal 100", k("$1\\ \\text{dm}^2 = $ ___", "$100\\ \\text{cm}^2$", ["$10\\ \\text{cm}^2$"], "Ein Dezimeter sind 10 cm. Das Quadrat hat 10 mal 10 kleine Quadrate.", "Das Quadrat ist 10 cm lang und 10 cm breit. Rechne mal."));
  h.body("Volumen: alles mal 1000", "Das **Volumen** sagt, wie viel in etwas hineinpasst.", "$1\\ \\text{m}^3 = 100 \\cdot 100 \\cdot 100 = 1\\,000\\,000\\ \\text{cm}^3$", "Von einer Stufe zur nächsten: **mal 1000**.");
  h.say("Volumen: alles mal 1000", "Die kleine Hochzahl an der Einheit verrät dir die Regel. Bei Längen steht keine Hochzahl, dort ist jede Stufe mal 10. Bei Flächen steht eine 2, dort ist es mal 100. Beim Volumen steht eine 3, und jede Stufe ist mal 1000.");
  h.tasks("Volumen: alles mal 1000", k("$1\\ \\text{dm}^3 = $ ___", "$1000\\ \\text{cm}^3$", ["$100\\ \\text{cm}^3$"], "Es ist eine Stufe nach unten, und beim Volumen ist jede Stufe mal 1000.", "Rechne 10 mal 10 mal 10 aus."));
  h.say("Liter", "Ein Liter ist genau so viel, wie in einen Würfel mit 10 Zentimetern Kantenlänge passt. Denk an einen Milchkarton. Ein Milliliter ist ein winziger Würfel mit einem Zentimeter Kantenlänge.");
  h.tasks("Liter", k("2 Liter sind ___.", "$2\\ \\text{dm}^3$", ["$2\\ \\text{cm}^3$"], "Ein Liter ist ein Würfel mit 10 cm Kantenlänge, also ein Kubikdezimeter.", "Wie lang ist die Kante des Würfels, in den ein Liter passt?"));
  h.say("Gewicht", "Beim Gewicht gibt es nur Schritte von tausend. Eine Tonne sind tausend Kilogramm, und ein Kilogramm sind tausend Gramm. Das ist einfacher als bei den Längen, weil keine Zwischenstufen vorkommen.");
  h.tasks("Gewicht", k("$3\\ \\text{kg} = $ ___", "3000 g", ["300 g"], "Kilo heißt tausend. 3 mal 1000 ergibt 3000.", "Was bedeutet die Vorsilbe kilo noch einmal?"));
  h.say("Zeit ist die Ausnahme", "Die Zeit läuft in Sechzigern und nicht in Zehnern. Eine halbe Stunde sind deshalb 30 Minuten und nicht 50. Das Komma bei Stunden führt leicht in die Irre. Rechne die Stunden immer mal 60, dann bist du sicher.");
  h.tasks("Zeit ist die Ausnahme", k("2,5 h sind ___.", "150 min", ["250 min"], "Zwei Stunden sind 120 Minuten, und die halbe Stunde bringt noch 30 dazu.", "Wie viele Minuten hat eine halbe Stunde?"));
  h.after(
    "Zeit ist die Ausnahme",
    b("Das nimmst du mit", ["(1) kilo heißt tausend, zenti hundertstel, milli tausendstel.", "(2) Länge: jede Stufe mal 10.", "(3) Fläche: jede Stufe mal 100.", "(4) Volumen: jede Stufe mal 1000.", "(5) Zeit: mal 60."], "Das sind die fünf Dinge, die du zum Umrechnen brauchst. Prüf dein Ergebnis am Ende immer mit der einfachen Frage: Ist die neue Einheit kleiner, dann muss die Zahl größer sein. Gleich kommen die Wörter und ein kleines Quiz.", {
      tasks: [k("$3\\ \\text{m}^2$ in $\\text{dm}^2$: Du rechnest ___.", "mal 100", ["mal 10"], "Es geht um eine Fläche. Dort ist jede Stufe mal 100.", "Geht es hier um eine Länge oder um eine Fläche?")],
    }),
  );

  h.chapters([
    ["Die Vorsilben", "Vorsilben und Längen"],
    ["Fläche: alles mal 100", "Flächen, Volumen, Gewicht und Zeit"],
  ]);
  h.renameVocab({ "Quadrat-Einheit (m²)": "Quadratmeter", "Kubik-Einheit (m³)": "Volumen" });
  h.explain([
    "Kilo heißt tausend. 2,5 mal 1000 ergibt 2500 Meter.",
    "Ein Meter sind 100 cm. Das Quadrat hat also 100 mal 100 kleine Quadrate, das sind 10 000.",
    "Ein Liter passt genau in einen Würfel mit 10 cm Kantenlänge. Das ist ein Kubikdezimeter.",
    "Eine Stunde hat 60 Minuten, eine halbe Stunde 30. Zusammen sind das 90 Minuten.",
    "Bei Flächen bedeutet eine Stufe nach oben geteilt durch 100. 42 000 geteilt durch 100 ergibt 420.",
  ]);
  h.quiz(q("0,25 Stunden sind wie viele Minuten?", "15 Minuten", ["25 Minuten", "2,5 Minuten", "40 Minuten"], "Die Zeit läuft in Sechzigern. Ein Viertel von 60 Minuten sind 15 Minuten."));
});
