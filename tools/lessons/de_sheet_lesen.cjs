// Spickzettel: reading (replaces the old page L_DE_LESEN).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/de_05_lesen.json",
  {
    id: "L_DE_LESEN",
    subject: "DE",
    topicId: "DE_READ_CORE",
    alsoFor: ["DE_READ_ARGUMENT", "DE_READ_EVIDENCE", "DE_READ"],
    title: "Lesen und Verstehen",
    guided: ["P_DE_LESEN", "P_DE_ARGUMENT"],
    intro: "Das hier ist dein Spickzettel zum Lesen. Hier schaust du nach, wie du an eine Leseaufgabe herangehst, was die drei Kästchen bedeuten oder wie ein Zitat aussehen muss. Gelernt wird oben in den Lektionen mit Ferdinand. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Deutsch",
  },
  [
    card("terms", "Die drei Arten von Texten", [
      TH(["Textart", "Was sie tut", "Darauf achtest du"], ["Sachtext", "informiert oder will überzeugen", "Tatsachen, Zahlen, Meinungen von Fachleuten"], ["literarischer Text", "erzählt eine Geschichte", "Gefühle stehen oft zwischen den Zeilen"], ["Grafik oder Tabelle", "zeigt Zahlen", "Überschrift, Einheit, größter und kleinster Wert"]),
    ]),
    card("steps", "Drei Schritte für jede Frage", ["(1) Lies zuerst die Frage und unterstreiche die wichtigen Wörter.", "(2) Such diese Wörter im Text. Du musst dafür nicht alles lesen.", "(3) Lies die gefundene Stelle genau und vergleiche sie mit der Frage.", "Die Fragen folgen meistens der Reihenfolge des Textes."]),
    card("terms", "Kernaussage und Absicht", [
      "Die Kernaussage gilt für den ganzen Text. Eine Zahl, ein Name oder ein Beispiel ist nur eine Einzelheit. Die Kernaussage steht oft in der Überschrift, am Anfang oder am Ende.",
      TH(["Der Text will", "Daran erkennst du es"], ["informieren", "Tatsachen, Zahlen, neutraler Ton"], ["überzeugen", "Meinung, Forderung, direkte Ansprache"], ["unterhalten", "Spannung, Humor"]),
    ]),
    card("formula", "Richtig, falsch, steht nicht im Text", [
      TH(["Du kreuzt an", "Wenn …", "Beispiel zum Text: 62 Prozent finden die Regel gut."], ["richtig", "der Text dasselbe sagt, auch mit anderen Wörtern", "*Die Mehrheit ist für die Regel.*"], ["falsch", "der Text etwas anderes sagt", "*Fast alle sind für die Regel.*"], ["steht nicht im Text", "der Text dazu gar nichts sagt", "*Die Lehrkräfte sind dagegen.*"]),
      "Prüf Wörter wie immer, nie, alle und nur besonders genau. Schon eine Ausnahme macht eine solche Aussage falsch.",
    ]),
    card("terms", "These, Argument, Beispiel", [
      TH(["Baustein", "Was er tut", "Signale", "Beispiel"], ["These", "nennt den Standpunkt", "gut, schlecht, sollte", "*Schulkleidung ist eine gute Idee.*"], ["Argument", "sagt, warum", "weil, denn, da", "*… weil der Druck durch Markenkleidung wegfällt.*"], ["Beispiel", "zeigt es an einem Fall", "zum Beispiel, eine Studie, eine Zahl", "*In Hamburg fühlten sich weniger Kinder ausgegrenzt.*"]),
      "Wörter wie allerdings, jedoch und andererseits kündigen an, dass der Text zur Gegenseite wechselt.",
    ]),
    card("steps", "Belegen und zitieren", ["(1) Schreib die Stelle wörtlich ab und verändere kein Wort.", "(2) Setz sie in Anführungszeichen.", "(3) Gib die Zeile an, zum Beispiel (Z. 5).", "(4) Kennzeichne eine Auslassung mit drei Punkten in Klammern.", "So sieht es aus: *„62 Prozent finden die Regel gut“ (Z. 5)*. Der Beleg muss genau das beweisen, was du behauptest."]),
    card("steps", "Eine Grafik oder Tabelle lesen", ["(1) Lies die Überschrift: Worum geht es?", "(2) Lies die Beschriftungen: Was steht an den Achsen oder in den Spalten, und in welcher Einheit?", "(3) Such den größten und den kleinsten Wert.", "(4) Rechne, wenn die Frage es verlangt: Für mehr als die Hälfte brauchst du die Summe aller Werte."]),
    card("mistake", "Typische Fehler", [TH(["Fehler", "Besser so"], ["Erst den ganzen Text lesen und dann aus dem Gedächtnis antworten", "Erst die Frage lesen, dann die Stelle suchen"], ["Eine Aussage ankreuzen, weil sie vernünftig klingt", "Nur ankreuzen, was im Text steht"], ["Ein Zitat ohne Zeile oder ohne Anführungszeichen", "Immer beides angeben"], ["Ein Beispiel für ein Argument halten", "Fragen: Antwortet der Satz auf warum?"])]),
    card("remember", "Merke", L("- Lies immer zuerst die Frage und dann den Text.", "- Die Kernaussage gilt für den ganzen Text, eine Einzelheit nur für eine Stelle.", "- Falsch bedeutet, dass der Text widerspricht, und steht nicht im Text bedeutet, dass er schweigt.", "- Ein Zitat braucht Anführungszeichen und eine Zeilenangabe.")),
  ],
);
