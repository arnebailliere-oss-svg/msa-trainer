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

  // Every board that talks about a shape shows it (drawings and try-it-out elements the app already has).
  h.board("Volumen: alles mal 1000").figure = { type: "box", a: 3, b: 3, c: 3, labels: { a: "100 cm", b: "100 cm", c: "100 cm" } };

  // Read-through: the example says how many steps and in which direction.
  h.body("Beispiel", "$3{,}5$ m in cm: zwei Stufen hinunter, also mal 100", "$3{,}5 \\cdot 100 = 350$ cm", "$4200$ m in km: eine Stufe hinauf, also geteilt durch 1000", "$4200 : 1000 = 4{,}2$ km");

  // Gentle start: lengths the learner knows from everyday life come before the prefixes; no fractions on the prefix board.
  h.before(
    "Die Vorsilben",
    b("Was du schon kennst", ["Ein Lineal ist 30 **Zentimeter** lang.", "Eine Tür ist 2 **Meter** hoch.", "Der Schulweg ist 2 **Kilometer** weit.", "Alle drei messen eine Länge. Nur die Einheit ist verschieden groß."], "Mit Längen misst du jeden Tag, ohne darüber nachzudenken. Kleine Dinge misst du in Zentimetern, Zimmer in Metern und Wege in Kilometern. Es ist immer dieselbe Sache, nämlich eine Länge. Nur die Einheit ist verschieden groß.", {
      tasks: [k("Die Länge eines Stifts misst du am besten in ___.", "Zentimetern", ["Kilometern"], "Ein Stift ist klein. Dafür passt die kleine Einheit.", "Ist ein Stift eher so lang wie ein Finger oder wie ein Schulweg?")],
    }),
  );
  h.body("Die Vorsilben", "**kilo** heißt tausend: 1 km = 1000 m", "**dezi** heißt Zehntel: 10 dm = 1 m", "**zenti** heißt Hundertstel: 100 cm = 1 m", "**milli** heißt Tausendstel: 1000 mm = 1 m");

  // One new thing per board: the short forms, one prefix per board, one example per board,
  // square metre and cubic metre before their rules, litre and millilitre apart, the comma trap apart.
  h.after(
    "Was du schon kennst",
    b("Einheiten kurz geschrieben", ["Das Maß, in dem du misst, heißt **Einheit**.", "Meter schreibt man kurz: m", "Zentimeter schreibt man kurz: cm", "Kilometer schreibt man kurz: km"], "Meter, Zentimeter und Kilometer sind Einheiten. Weil man sie ständig braucht, schreibt man sie abgekürzt. Die Abkürzung steht immer hinter der Zahl. 30 cm liest du also dreißig Zentimeter.", {
      tasks: [k("Der Schulweg ist 2 km weit. Das liest man: 2 ___.", "Kilometer", ["Zentimeter"], "Die Abkürzung km steht für Kilometer.", "Für welches Wort steht das k am Anfang der Abkürzung?")],
    }),
  );
  h.rename("Die Vorsilben", "Kilo heißt tausend");
  h.body("Kilo heißt tausend", "Ein **Kilo**meter sind 1000 Meter.", "1 km = 1000 m", "**kilo** heißt immer: tausend.", "Darum hat auch ein Kilogramm 1000 Gramm.");
  h.say("Kilo heißt tausend", "Vor dem Wort Meter steht oft ein kleines Wort, eine Vorsilbe. Sie sagt, wie groß die Einheit ist. Die erste Vorsilbe ist kilo. Kilo bedeutet tausend, und zwar bei jeder Einheit.");
  h.tasks("Kilo heißt tausend", k("$3\\ \\text{km} = $ ___", "3000 m", ["300 m"], "Kilo heißt tausend. 3 mal 1000 ergibt 3000.", "Was bedeutet die Vorsilbe kilo? Rechne 3 mal diese Zahl."));
  h.after(
    "Kilo heißt tausend",
    b("Zenti heißt Hundertstel", ["Ein Meter hat 100 Zentimeter.", "100 cm = 1 m", "**zenti** heißt: ein Hundertstel."], "Die zweite Vorsilbe ist zenti. Ein Zentimeter ist ein Hundertstel von einem Meter. Das bedeutet: Du brauchst hundert Zentimeter, bis ein Meter voll ist. Denk an Cent und Euro, dort ist es genauso.", {
      tasks: [k("$2\\ \\text{m} = $ ___", "200 cm", ["20 cm"], "Ein Meter hat 100 Zentimeter. Zwei Meter haben 200.", "Wie viele Zentimeter hat ein Meter? Nimm das mal 2.")],
    }),
    b("Milli heißt Tausendstel", ["Ein Meter hat 1000 Millimeter.", "1000 mm = 1 m", "**milli** heißt: ein Tausendstel.", "Ein Millimeter ist der kleinste Strich auf dem Lineal."], "Die dritte Vorsilbe ist milli. Ein Millimeter ist ein Tausendstel von einem Meter. Das ist sehr klein: der Abstand zwischen zwei kleinen Strichen auf deinem Lineal.", {
      tasks: [k("$3\\ \\text{m} = $ ___", "3000 mm", ["300 mm"], "Ein Meter hat 1000 Millimeter. Drei Meter haben 3000.", "Wie viele Millimeter hat ein Meter? Nimm das mal 3.")],
    }),
    b("Dezi heißt Zehntel", ["Ein Meter hat 10 Dezimeter.", "10 dm = 1 m", "**dezi** heißt: ein Zehntel.", "Ein Dezimeter ist etwa so breit wie deine Hand."], "Die vierte Vorsilbe ist dezi. Ein Dezimeter ist ein Zehntel von einem Meter, also 10 Zentimeter. Im Alltag sagt das kaum jemand. In Matheaufgaben kommt der Dezimeter aber oft vor, vor allem beim Liter.", {
      tasks: [k("$5\\ \\text{m} = $ ___", "50 dm", ["500 dm"], "Ein Meter hat 10 Dezimeter. Fünf Meter haben 50.", "Wie viele Dezimeter hat ein Meter? Nimm das mal 5.")],
    }),
  );

  h.rename("Beispiel", "Ein Beispiel nach unten");
  h.body("Ein Beispiel nach unten", "$3{,}5$ m in cm", "Von m zu cm sind es zwei Stufen hinunter.", "Zweimal mal 10 ist mal 100.", "$3{,}5 \\cdot 100 = 350$ cm");
  h.say("Ein Beispiel nach unten", "Du gehst die Leiter hinunter, von Meter über Dezimeter zu Zentimeter. Das sind zwei Stufen, und jede Stufe ist mal 10. Zusammen rechnest du also mal 100. Die Einheit wird kleiner, deshalb wird die Zahl größer.");
  h.tasks("Ein Beispiel nach unten", k("2 m in mm: drei Stufen hinunter. Du rechnest ___.", "mal 1000", ["mal 30"], "Jede Stufe ist mal 10. Dreimal mal 10 ist mal 1000.", "Was ergibt 10 mal 10 mal 10?"));
  h.after(
    "Ein Beispiel nach unten",
    b("Ein Beispiel nach oben", ["$4200$ m in km", "Von m zu km geht es hinauf.", "Hinauf heißt teilen, hier durch 1000.", "$4200 : 1000 = 4{,}2$ km"], "Jetzt geht es in die andere Richtung, zur größeren Einheit. Dann teilst du. Mit einer einfachen Frage kannst du jedes Ergebnis prüfen: Wird die Einheit größer, muss die Zahl kleiner werden. Von großen Schritten brauchst du schließlich weniger als von kleinen.", {
      tasks: [k("Du rechnest von m in km um. Die Zahl wird ___.", "kleiner", ["größer"], "Der Kilometer ist die größere Einheit. Davon brauchst du weniger.", "Brauchst du von großen Schritten mehr oder weniger als von kurzen?")],
    }),
  );

  {
    const square = h.board("Fläche: alles mal 100").figure;
    h.before(
      "Fläche: alles mal 100",
      b("Der Quadratmeter", ["Eine Fläche misst man in Quadraten.", "Ein Quadrat mit 1 m Länge und 1 m Breite heißt **Quadratmeter**.", "Kurz: $1\\ \\text{m}^2$", "Die kleine 2 sagt: Länge mal Breite."], "Für Flächen reicht ein Meterstab nicht. Du legst die Fläche mit Quadraten aus und zählst sie. Ein Quadrat, das einen Meter lang und einen Meter breit ist, heißt Quadratmeter. Die kleine 2 an der Einheit erinnert an die zwei Richtungen.", {
        figure: square,
        tasks: [k("Ein Quadrat ist 1 cm lang und 1 cm breit. Es heißt ___.", "Quadratzentimeter", ["Zentimeter"], "Ein Quadrat mit 1 cm Seitenlänge ist ein Quadratzentimeter. Damit misst man kleine Flächen.", "Ist das Quadrat eine Länge oder eine Fläche?")],
      }),
    );
    h.body("Fläche: alles mal 100", "1 m = 10 dm", "$1\\ \\text{m}^2 = 10 \\cdot 10 = 100\\ \\text{dm}^2$", "Bei Flächen ist jede Stufe **mal 100**.");
    h.say("Fläche: alles mal 100", "Ein Quadratmeter ist 10 Dezimeter lang und 10 Dezimeter breit. Es passen also 10 mal 10 kleine Quadrate hinein. Bei Flächen zählt jede Stufe der Leiter doppelt: einmal für die Länge und einmal für die Breite. Deshalb ist jede Stufe mal 100.");
    h.after(
      "Fläche: alles mal 100",
      b("Zwei Stufen bei Flächen", ["Von $\\text{m}^2$ zu $\\text{cm}^2$ sind es zwei Stufen.", "Zweimal mal 100: $100 \\cdot 100 = 10\\,000$", "$1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$"], "Bei zwei Stufen rechnest du zweimal mal 100. Das ergibt mal zehntausend. In einen Quadratmeter passen also zehntausend Quadratzentimeter. Das überrascht viele, weil ein Meter nur hundert Zentimeter hat.", {
        tasks: [k("$2\\ \\text{m}^2 = $ ___", "$200\\ \\text{dm}^2$", ["$20\\ \\text{dm}^2$"], "Es ist eine Stufe nach unten, und bei Flächen ist jede Stufe mal 100.", "Geht es hier um eine Länge oder um eine Fläche? Welche Zahl gehört zu einer Stufe?")],
      }),
    );
    const cube = h.board("Volumen: alles mal 1000").figure;
    h.before(
      "Volumen: alles mal 1000",
      b("Der Kubikmeter", ["Das **Volumen** sagt, wie viel in etwas hineinpasst.", "Man misst es in Würfeln.", "Ein Würfel mit 1 m Kantenlänge heißt **Kubikmeter**: $1\\ \\text{m}^3$", "Die kleine 3 sagt: Länge mal Breite mal Höhe."], "Wie viel in eine Kiste passt, misst du mit Würfeln. Ein Würfel, der einen Meter lang, breit und hoch ist, heißt Kubikmeter. Kubik kennst du schon als Wort für hoch 3. Die kleine 3 erinnert an die drei Richtungen.", {
        figure: cube,
        tasks: [k("Ein Würfel mit 1 cm Kantenlänge heißt ___.", "Kubikzentimeter", ["Quadratzentimeter"], "Ein Würfel hat drei Richtungen. Dazu gehört das Wort Kubik.", "Ist ein Würfel flach wie ein Blatt, oder passt etwas hinein?")],
      }),
    );
    h.body("Volumen: alles mal 1000", "1 m = 10 dm", "$1\\ \\text{m}^3 = 10 \\cdot 10 \\cdot 10 = 1000\\ \\text{dm}^3$", "Beim Volumen ist jede Stufe **mal 1000**.");
  }

  h.body("Liter", "Flüssigkeiten misst man in **Litern**. Kurz: l", "$1\\ \\text{l} = 1\\ \\text{dm}^3$", "Das ist ein Würfel mit 10 cm Kantenlänge, so groß wie ein Milchkarton.");
  h.say("Liter", "Ein Liter ist genau so viel, wie in einen Würfel mit 10 Zentimetern Kantenlänge passt. Denk an einen Milchkarton. Liter und Kubikdezimeter sind also zwei Namen für dieselbe Menge.");
  h.after(
    "Liter",
    b("Milliliter", ["Ein **Milliliter** ist ein Tausendstel Liter. Kurz: ml", "1 l = 1000 ml", "$1\\ \\text{ml} = 1\\ \\text{cm}^3$"], "Die Vorsilbe milli kennst du schon. Ein Milliliter ist ein Tausendstel von einem Liter. Das ist ein winziger Würfel mit einem Zentimeter Kantenlänge. Auf Trinkflaschen und Medizin steht die Menge oft in Millilitern.", {
      tasks: [k("Eine Flasche fasst 0,5 l. Das sind ___.", "500 ml", ["50 ml"], "Ein Liter hat 1000 Milliliter. Die Hälfte davon sind 500.", "Wie viele Milliliter hat ein ganzer Liter? Nimm davon die Hälfte.")],
    }),
    b("Kubikmeter und Liter", ["$1\\ \\text{m}^3 = 1000\\ \\text{dm}^3$", "Jeder Kubikdezimeter ist ein Liter.", "Also: $1\\ \\text{m}^3 = 1000\\ \\text{l}$"], "In Aufgaben mit Schwimmbecken oder Regentonnen wird oft nach Litern gefragt. Dann hilft dir diese Zeile. In einen Kubikmeter passen tausend Liter, denn er besteht aus tausend Kubikdezimetern.", {
      tasks: [k("$2\\ \\text{m}^3 = $ ___", "2000 l", ["200 l"], "Ein Kubikmeter sind 1000 Liter. Zwei Kubikmeter sind 2000 Liter.", "Wie viele Liter passen in einen Kubikmeter? Nimm das mal 2.")],
    }),
  );

  h.body("Gewicht", "Gewicht misst man in Gramm (g), Kilogramm (kg) und Tonnen (t).", "1 kg = 1000 g", "1 t = 1000 kg", "Jeder Schritt ist **mal 1000**.");
  h.say("Gewicht", "Beim Gewicht gibt es nur Schritte von tausend. Ein Kilogramm sind tausend Gramm, und eine Tonne sind tausend Kilogramm. Für sehr leichte Dinge gibt es noch das Milligramm, ein Tausendstel Gramm. Zwischenstufen wie bei den Längen kommen nicht vor.");
  h.body("Zeit ist die Ausnahme", "Stunde schreibt man kurz h, Minute min, Sekunde s.", "1 h = **60** min", "1 min = **60** s");
  h.say("Zeit ist die Ausnahme", "Die Zeit läuft in Sechzigern und nicht in Zehnern. Eine Stunde hat 60 Minuten, und eine Minute hat 60 Sekunden. Das h kommt vom englischen Wort hour.");
  h.tasks("Zeit ist die Ausnahme", k("2 h sind ___.", "120 min", ["200 min"], "Eine Stunde hat 60 Minuten. Zwei Stunden haben 120.", "Wie viele Minuten hat eine Stunde? Nimm das mal 2."));
  h.after(
    "Zeit ist die Ausnahme",
    b("Vorsicht mit dem Komma", ["1,5 h heißt: eine Stunde und eine halbe.", "Eine halbe Stunde sind 30 min.", "1,5 h sind also **90** min, nicht 150."], "Das Komma bei Stunden führt leicht in die Irre. Die 5 hinter dem Komma bedeutet eine halbe Stunde und nicht 50 Minuten. Rechne die Stunden immer mal 60, dann bist du sicher.", {
      tasks: [k("2,5 h sind ___.", "150 min", ["250 min"], "Zwei Stunden sind 120 Minuten, und die halbe Stunde bringt noch 30 dazu.", "Wie viele Minuten hat eine halbe Stunde?")],
    }),
  );

  h.chapters([
    ["Was du schon kennst", "Vorsilben und Längen"],
    ["Der Quadratmeter", "Flächen und Volumen"],
    ["Gewicht", "Gewicht und Zeit"],
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

  // Word card: every word and short form of this lesson.
  h.vocab(
    { term: "Einheit", plain: "Das Maß, in dem du misst.", example: "Meter, Liter, Kilogramm, Stunde" },
    { term: "m", plain: "Meter.", example: "Eine Tür ist 2 m hoch." },
    { term: "cm", plain: "Zentimeter. Ein Hundertstel Meter.", example: "100 cm = 1 m" },
    { term: "km", plain: "Kilometer. Tausend Meter.", example: "1 km = 1000 m" },
    { term: "mm", plain: "Millimeter. Ein Tausendstel Meter.", example: "1000 mm = 1 m" },
    { term: "dm", plain: "Dezimeter. Ein Zehntel Meter.", example: "10 dm = 1 m" },
    { term: "Vorsilbe", plain: "Ein kleines Wort vor der Einheit. Es sagt, wie groß sie ist.", example: "kilo, zenti, milli, dezi" },
    { term: "kilo", plain: "Tausend.", example: "1 km = 1000 m, 1 kg = 1000 g" },
    { term: "zenti", plain: "Ein Hundertstel.", example: "100 cm = 1 m" },
    { term: "milli", plain: "Ein Tausendstel.", example: "1000 mm = 1 m, 1000 ml = 1 l" },
    { term: "dezi", plain: "Ein Zehntel.", example: "10 dm = 1 m" },
    { term: "Quadratmeter", plain: "Ein Quadrat mit 1 m Länge und 1 m Breite. Damit misst man Flächen. Kurz: m². Jede Stufe ist mal 100.", example: "$1\\ \\text{m}^2 = 100\\ \\text{dm}^2$" },
    { term: "Volumen", plain: "Wie viel in etwas hineinpasst.", example: "Ein Milchkarton hat 1 Liter Volumen." },
    { term: "Kubikmeter", plain: "Ein Würfel mit 1 m Kantenlänge. Damit misst man das Volumen. Kurz: m³. Jede Stufe ist mal 1000.", example: "$1\\ \\text{m}^3 = 1000\\ \\text{dm}^3$" },
    { term: "Liter", plain: "Das Maß für Flüssigkeiten. Kurz: l. Ein Liter ist ein Kubikdezimeter.", example: "$1\\ \\text{l} = 1\\ \\text{dm}^3$" },
    { term: "ml", plain: "Milliliter. Ein Tausendstel Liter.", example: "1 l = 1000 ml" },
    { term: "Gramm", plain: "Ein Maß für Gewicht. Kurz: g.", example: "1 kg = 1000 g" },
    { term: "kg", plain: "Kilogramm. Tausend Gramm.", example: "1 kg = 1000 g" },
    { term: "Tonne", plain: "Tausend Kilogramm. Kurz: t.", example: "1 t = 1000 kg" },
    { term: "Stunde", plain: "60 Minuten. Kurz: h.", example: "1 h = 60 min = 3600 s" },
    { term: "min", plain: "Minute. 60 Sekunden.", example: "1 min = 60 s" },
    { term: "Sekunde", plain: "Kurz: s. 60 Sekunden sind eine Minute.", example: "1 min = 60 s" },
  );
});
