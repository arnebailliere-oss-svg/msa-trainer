// Spickzettel: spelling (replaces the old page L_DE_RECHTSCHREIBUNG).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/de_02_rechtschreibung.json",
  {
    id: "L_DE_RECHTSCHREIBUNG",
    subject: "DE",
    topicId: "DE_ORTHO_STRATEGIES",
    alsoFor: ["DE_ORTHO_DAS_DASS", "DE_ORTHO_CASE", "DE_ORTHO_SEP_JOIN", "DE_ORTHO_SS_SZ", "DE_ORTHO_DOUBLE"],
    title: "Rechtschreibung",
    guided: ["P_DE_STRATEGIEN", "P_DE_DAS_DASS", "P_DE_GROSS_KLEIN", "P_DE_GETRENNT"],
    intro: "Das hier ist dein Spickzettel zur Rechtschreibung. Hier schaust du nach, welche Strategie bei welchem Zweifel hilft oder was großgeschrieben wird. Gelernt wird oben in den Lektionen mit Ferdinand, jedes Thema in einer eigenen Lektion. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Deutsch",
  },
  [
    card("what", "Was die Prüfung von dir will", ["Du sollst ein Wort nicht nur richtig schreiben. Du sollst auch sagen können, wie du auf die richtige Schreibung kommst.", "Eine typische Aufgabe lautet: Welche Strategie wenden Sie an, um das Wort an der markierten Stelle richtig zu schreiben? Dafür gibt es vier Strategien und drei Themen, die jedes Jahr vorkommen."]),
    card("terms", "Die vier Strategien", [
      TH(["Strategie", "Sie hilft bei", "Beispiel"], ["verlängern", "d oder t, b oder p, g oder k am Wortende", "*Hund*, denn es heißt *Hunde*"], ["ableiten", "ä oder e, äu oder eu", "*Häuser*, denn es kommt von *Haus*"], ["in Silben sprechen", "doppelten Konsonanten", "*Bet-ten*, *Was-ser*"], ["das h prüfen", "h vor l, m, n, r und zwischen zwei Vokalen", "*fahren*, *Zahl*, *se-hen*"]),
      L("So verlängerst du: Ein Nomen setzt du in den Plural, ein Adjektiv steigerst du, bei einem Verb bildest du den Infinitiv."),
    ]),
    card("formula", "Kurzer oder langer Vokal", [
      TH(["Der Vokal davor ist", "Dann schreibst du", "Beispiele"], ["kurz", "einen doppelten Konsonanten", "*offen, Mitte, kennen*"], ["lang", "einen einzelnen Konsonanten", "*Ofen, beten, raten*"], ["kurz", "ss", "*Klasse, Fluss, essen*"], ["lang", "ß", "*Straße, Fuß, groß*"], ["ei, au, eu, äu", "ß", "*heiß, draußen, Sträuße*"]),
      "Sprich das Wort laut und hör, ob du den Vokal in die Länge ziehen kannst.",
    ]),
    card("formula", "das oder dass", [
      "Mach die Ersatzprobe: Setz *dieses* oder *welches* an die Stelle.",
      TH(["Die Probe", "Du schreibst", "Beispiel"], ["*dieses* passt", "das", "*Das gefällt mir.*"], ["*welches* passt", "das", "*das Buch, das ich lese*"], ["keins von beiden passt", "dass", "*Ich glaube, dass es klappt.*"]),
      "Vor dem Wort mit zwei s steht immer ein Komma. In der Prüfung begründest du mit der Wortart und der Probe.",
    ]),
    card("terms", "Groß oder klein", [
      TH(
        ["", "Regel", "Beispiel"],
        ["**Groß**", "Nomen mit einem Begleiter davor", "*der Hund, mein Buch, viel Spaß*"],
        ["**Groß**", "Nomen mit den Endungen -ung, -heit, -keit, -schaft, -nis", "*die Hoffnung, die Freiheit*"],
        ["**Groß**", "Verb oder Adjektiv mit Artikel, auch nach beim, zum, etwas, nichts, alles", "*das Laufen, beim Essen, etwas Neues*"],
        ["**Groß**", "die höfliche Anrede", "*Können Sie mir helfen?*"],
        ["**Klein**", "Verben und Adjektive ohne Artikel davor", "*Ich will laufen. Das Auto ist schnell.*"],
        ["**Klein**", "die höchste Stufe mit am", "*am schnellsten*"],
        ["**Klein**", "Zeitangaben auf -s und heute, morgen, gestern", "*montags, abends, bis morgen*"],
      ),
    ]),
    card("terms", "Getrennt oder zusammen", [
      "Die Grundregel: Wörter stehen getrennt. Zusammen schreibt man nur, wenn ein neues Wort entsteht.",
      TH(["Was zusammenkommt", "Schreibung", "Beispiel"], ["Nomen und Nomen", "zusammen", "*Autobahn, Haustür*"], ["kurzes Wort und Verb", "zusammen", "*aufstehen, anmachen, mitkommen*"], ["Nomen und Verb", "getrennt", "*Rad fahren, Klavier spielen*"], ["Verb und Verb", "getrennt", "*spazieren gehen, schwimmen gehen*"], ["Adjektiv und Verb", "meistens getrennt", "*laut singen, schnell laufen*"], ["Verbindung mit Artikel", "zusammen und groß", "*das Radfahren, beim Spazierengehen*"]),
      "Hörst du nur eine Betonung, ist es ein Wort: *wiedersehen*. Hörst du zwei, sind es zwei Wörter: *wieder sehen*.",
    ]),
    card("terms", "Wörter zum Merken", [TH(["Getrennt", "Zusammen"], ["gar nicht", "irgendwo"], ["auf einmal", "irgendwie"], ["ein bisschen", "überhaupt"], ["vor allem", "vielleicht"], ["noch einmal", "zusammen"])]),
    card("mistake", "Typische Fehler", [
      TH(
        ["Falsch", "Richtig", "Warum?"],
        ["*Das Buch, dass ich lese*", "*Das Buch, das ich lese*", "Hier passt welches. Also ein s."],
        ["*beim essen*", "*beim Essen*", "In beim steckt ein Artikel."],
        ["*am Schnellsten*", "*am schnellsten*", "Die höchste Stufe mit am bleibt klein."],
        ["*Montags*", "*montags*", "Mit s am Ende ist es ein Adverb."],
        ["*Strasse*", "*Straße*", "Das a ist lang."],
        ["*garnicht*", "*gar nicht*", "Es sind immer zwei Wörter."],
      ),
    ]),
    card("remember", "Merke", L("- Sprich das Wort laut: Nach einem kurzen Vokal steht ein doppelter Konsonant oder ss.", "- Verlängere ein Wort, wenn du sein Ende nicht sicher hörst.", "- Passt dieses oder welches, schreibst du das mit einem s.", "- Steht ein Begleiter davor, ist es ein Nomen und wird großgeschrieben.", "- Wörter stehen getrennt, außer es entsteht ein neues Wort.")),
  ],
);
