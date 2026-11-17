// P_MATH_PROZENT to the standard: boards stay; chapters, tap tasks and hints are added,
// plus the missing steps: which of the three numbers is asked for, increase, "um" vs "auf", interest on interest.
const { migrate, k, b, q } = require("./migrate.cjs");

migrate("primers/math_02_prozent.json", (p, h) => {
  p.requires = ["P_MATH_ZEICHEN", "P_MATH_BRUCH"];

  // --- chapter 1 ---
  h.say("Von hundert", "Prozent kommt aus dem Lateinischen, pro centum, und bedeutet von hundert. Das Zeichen dafür ist nur eine Abkürzung. Es gibt auch Promille, das bedeutet von tausend. Fünfzig Prozent sind fünfzig von hundert, also genau die Hälfte.");
  h.tasks("Von hundert", k("$50\\,\\%$ von etwas ist ___.", "die Hälfte", ["ein Viertel"], "50 von 100 ist genau die Hälfte.", "Wie viel von 100 sind 50? Die Hälfte oder weniger?"));
  h.tasks("Prozent als Bruch und Dezimalzahl", k("$30\\,\\% = $ ___", "$0{,}3$", ["$3$"], "30 geteilt durch 100 ist 0,3. Das Komma rückt zwei Stellen nach links.", "Prozent heißt von hundert. Was ist 30 geteilt durch 100?"));
  h.tasks("Drei Zahlen, immer", k("Von 80 Kindern haben 20 ein Haustier. Das Ganze ist ___.", "80", ["20"], "Alle Kinder zusammen sind das Ganze. Die 20 sind nur ein Teil davon.", "Welche Zahl steht für alle Kinder zusammen?"));
  h.say("Die Namen", "Für die drei Zahlen gibt es Fachwörter, die in Aufgaben oft vorkommen. Der Grundwert ist das Ganze, also der ganze Preis, alle Schüler oder das ganze Geld. Er entspricht immer 100 Prozent. Der Prozentwert ist der Teil, und der Prozentsatz ist die Zahl mit dem Prozentzeichen.");
  h.tasks("Die Namen", k("Von 30 Schülern kommen 12 mit dem Bus. Die 12 ist der ___.", "Prozentwert", ["Grundwert"], "Die 12 Schüler sind ein Teil von allen. Der Teil hat diesen Namen.", "Ist die 12 das Ganze oder nur ein Teil davon?"));

  // --- chapter 2 ---
  h.tasks("Der Teil vom Ganzen", k("10 % von 200 sind ___.", "20", ["2"], "200 mal 0,1 ergibt 20.", "Wie schreibst du 10 Prozent als Zahl mit Komma? Rechne dann mal."));
  h.tasks("Der Trick mit 1 %", k("1 % von 300 ist ___.", "3", ["30"], "300 geteilt durch 100 ergibt 3.", "Für ein Prozent teilst du das Ganze durch welche Zahl?"));
  h.tasks("Wie viel Prozent sind das?", k("20 von 80 sind ___.", "25 %", ["4 %"], "20 geteilt durch 80 ist 0,25. Das sind 25 von hundert.", "Rechne Teil geteilt durch Ganzes. Welche Zahl ist hier das Ganze?"));
  h.tasks("Das Ganze finden", k("10 % sind 7. Das Ganze ist ___.", "70", ["0,7"], "Wenn 10 Prozent 7 sind, dann sind 100 Prozent zehnmal so viel.", "Wie oft passen 10 Prozent in 100 Prozent?"));
  h.after(
    "Das Ganze finden",
    b("Welche Zahl wird gesucht?", ["Frag dich bei jeder Aufgabe:", "Was ist **das Ganze**?", "Was ist **der Teil**?", "Wie groß ist **der Anteil in Prozent**?", "Zwei davon kennst du. Die dritte suchst du."], "Das ist der wichtigste Schritt bei jeder Prozentaufgabe, und er kommt vor dem Rechnen. Lies den Text und ordne die Zahlen den drei Fragen zu. Erst wenn du weißt, welche der drei fehlt, wählst du den Rechenweg. Probier es unten an zwei Aufgaben aus.", {
      tasks: [
        k("Ein Fahrrad kostet 400 €. Die Anzahlung beträgt 15 %. Gesucht ist ___.", "der Teil", ["das Ganze"], "Der ganze Preis und der Anteil sind bekannt. Es fehlt, wie viel Euro die Anzahlung ist.", "Welche beiden Zahlen stehen schon im Text? Was fehlt dann?"),
        k("12 von 60 Schülern fehlen. Gesucht ist ___.", "der Anteil in Prozent", ["das Ganze"], "Das Ganze und der Teil sind bekannt. Es fehlt, wie viel Prozent das sind.", "Steht im Text schon eine Zahl mit Prozentzeichen?"),
      ],
    }),
  );

  // --- chapter 3 ---
  h.tasks("Rabatt", k("50 € mit 20 % Rabatt kosten noch ___.", "40 €", ["30 €"], "20 Prozent von 50 Euro sind 10 Euro. Die gehen vom Preis weg.", "Wie viel Euro sind 20 Prozent von 50 Euro? Zieh sie dann ab."));
  h.after(
    "Rabatt",
    b("Wenn etwas teurer wird", ["Miete 500 €, sie steigt um 10 %.", "Erhöhung: $500 \\cdot 0{,}1 = 50$ €", "Neue Miete: $500 + 50 = 550$ €", "Oder direkt: $500 \\cdot 1{,}1 = 550$ €"], "Bei einer Erhöhung rechnest du genauso wie beim Rabatt, nur kommt der Betrag dazu. Zehn Prozent mehr bedeutet: Aus 100 Prozent werden 110 Prozent. Als Dezimalzahl ist das 1,1. Deshalb führt mal 1,1 direkt zum neuen Preis.", {
      tasks: [k("200 € steigen um 5 %. Der neue Betrag ist ___.", "210 €", ["205 €"], "5 Prozent von 200 Euro sind 10 Euro. Die kommen dazu.", "Wie viel Euro sind 5 Prozent von 200 Euro? Zähl sie dann dazu.")],
    }),
    b("um oder auf?", ["Der Preis sinkt **um** 20 %:", "20 % gehen weg, 80 % bleiben.", "Der Preis sinkt **auf** 20 %:", "Nur noch 20 % bleiben."], "Diese zwei kleinen Wörter entscheiden über die ganze Aufgabe. Um sagt, wie viel wegfällt oder dazukommt. Auf sagt, wie viel am Ende noch da ist. Lies deshalb in Textaufgaben immer genau, welches der beiden Wörter dasteht.", {
      tasks: [k("100 € sinken auf 30 %. Der neue Preis ist ___.", "30 €", ["70 €"], "Auf 30 Prozent bedeutet: Es bleiben 30 von 100.", "Sagt das Wort auf, wie viel wegfällt, oder wie viel übrig bleibt?")],
    }),
  );
  h.body("Zinsen sind Prozent vom Geld", "500 € auf dem Konto, 2 % Zinsen im Jahr:", "$500 \\cdot 0{,}02 = 10$ € Zinsen", "Nach einem Jahr: 510 €", "Das Geld auf dem Konto heißt **Kapital**, der Prozentsatz heißt **Zinssatz**.");
  h.tasks("Zinsen sind Prozent vom Geld", k("1000 € bei 3 % Zinsen bringen in einem Jahr ___.", "30 €", ["300 €"], "1000 mal 0,03 ergibt 30.", "Wie schreibst du 3 Prozent als Zahl mit Komma? Rechne dann mal."));
  h.after(
    "Zinsen sind Prozent vom Geld",
    b("Zinsen im zweiten Jahr", ["Nach einem Jahr: 510 €", "Im zweiten Jahr gibt es Zinsen auf **510 €**:", "$510 \\cdot 0{,}02 = 10{,}20$ €", "Die Zinsen bekommen selbst Zinsen. Das nennt man **Zinseszins**."], "Wenn du die Zinsen auf dem Konto lässt, wächst das Geld im nächsten Jahr etwas schneller. Die Bank rechnet dann mit dem neuen, größeren Betrag. Für mehrere Jahre nimmst du das Geld einfach mehrmals mit 1,02 mal. Zweimal für zwei Jahre, dreimal für drei."),
    b("Das nimmst du mit", ["(1) Erst klären: Ganzes, Teil oder Anteil?", "(2) 1 % ist das Ganze geteilt durch 100.", "(3) Rabatt: weg. Erhöhung: dazu.", "(4) **um** ist die Änderung, **auf** ist der Rest."], "Das sind die vier Dinge, die dich durch jede Prozentaufgabe bringen. Der erste Schritt ist immer derselbe: herausfinden, welche der drei Zahlen fehlt. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.", {
      tasks: [k("80 € sinken um 25 %. Es bleiben ___ vom alten Preis.", "75 %", ["25 %"], "25 Prozent fallen weg. Von 100 bleiben dann 75.", "Wie viel bleibt von 100, wenn 25 wegfallen?")],
    }),
  );

  // Read-through: where a decimal comes from is written on the board; the whole is found via 1 %.
  h.body("Der Teil vom Ganzen", "20 % von 150:", "20 % als Dezimalzahl: $0{,}2$", "$150 \\cdot 0{,}2 = 30$", "Ganzes mal Prozentsatz als Dezimalzahl.");
  h.body("Wie viel Prozent sind das?", "30 von 150:", "Teil geteilt durch Ganzes: $30 : 150 = 0{,}2$", "Als Prozent: $0{,}2 = 20\\,\\%$");
  h.body("Das Ganze finden", "20 % sind 30. Wie viel ist alles?", "1 % ist dann $30 : 20 = 1{,}5$", "100 % sind $1{,}5 \\cdot 100 = 150$", "Kürzer mit dem Taschenrechner: $30 : 0{,}2 = 150$");
  h.say("Das Ganze finden", "Du gehst über 1 Prozent. Wenn 20 Prozent 30 sind, teilst du durch 20 und hast 1 Prozent. Mal 100 ergibt das Ganze. Mit dem Taschenrechner geht es in einem Schritt: Teil geteilt durch den Prozentsatz als Dezimalzahl.");
  h.body("Zinsen im zweiten Jahr", "Nach einem Jahr: 510 €", "Im zweiten Jahr gibt es Zinsen auf **510 €**:", "$510 \\cdot 0{,}02 = 10{,}20$ €", "Neuer Stand: $510 + 10{,}20 = 520{,}20$ €", "Die Zinsen bekommen selbst Zinsen. Das nennt man **Zinseszins**.");

  h.chapters([
    ["Von hundert", "Was Prozent bedeutet"],
    ["Der Teil vom Ganzen", "Die drei Grundaufgaben"],
    ["Rabatt", "Rabatt, Erhöhung und Zinsen"],
  ]);
  h.renameVocab({ "Grundwert G": "Grundwert", "Prozentwert W": "Prozentwert", "Prozentsatz p": "Prozentsatz", "Promille (‰)": "Promille" });
  h.explain([
    "50 Prozent sind die Hälfte. Die Hälfte von 80 ist 40.",
    "Prozent bedeutet von hundert. 30 Prozent sind also 30 von 100.",
    "Der Grundwert ist das Ganze, also alle 200 Schüler. Die 50 kranken Schüler sind der Teil.",
    "Du teilst den Teil durch das Ganze: 10 geteilt durch 40 ist 0,25. Das sind 25 Prozent.",
    "10 Prozent von 40 Euro sind 4 Euro. Die gehen vom Preis weg, also bleiben 36 Euro.",
  ]);
  h.quiz(
    q("Ein Preis von 60 € steigt um 10 %. Wie hoch ist der neue Preis?", "66 €", ["70 €", "54 €", "60,10 €"], "10 Prozent von 60 Euro sind 6 Euro. Bei einer Erhöhung kommen sie dazu, also 66 Euro."),
    q("10 % sind 12 €. Wie viel sind 100 %?", "120 €", ["1,20 €", "22 €", "1200 €"], "100 Prozent sind zehnmal so viel wie 10 Prozent. Zehn mal 12 Euro sind 120 Euro."),
  );
  p.teaser = "Was Prozent bedeutet, welche drei Zahlen es immer gibt und wie du herausfindest, welche davon gesucht ist. Dazu Rabatt, Erhöhung und Zinsen.";
});
