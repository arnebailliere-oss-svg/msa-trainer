// Spickzettel: grammar (replaces the old page L_DE_GRAMMATIK).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/de_03_grammatik.json",
  {
    id: "L_DE_GRAMMATIK",
    subject: "DE",
    topicId: "DE_GRAM_MODUS",
    alsoFor: ["DE_GRAM_AKTIV_PASSIV", "DE_GRAM_INDIRECT", "DE_GRAM_PARTIZIP", "DE_GRAM_WORD_CLASSES", "DE_GRAM_TENSES", "DE_GRAM_SENTENCE_PARTS"],
    title: "Grammatik",
    guided: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2", "P_DE_SATZGLIEDER", "P_DE_ZEITFORMEN", "P_DE_MODUS", "P_DE_PARTIZIP", "P_DE_PASSIV", "P_DE_INDIREKT"],
    intro: "Das hier ist dein Spickzettel zur Grammatik. Hier schaust du nach, wie eine Wortart heißt, welche Frage zu welchem Satzglied gehört oder wie eine Zeitform gebaut ist. Gelernt wird oben in den Lektionen mit Ferdinand, jedes Thema in einer eigenen Lektion. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Deutsch",
  },
  [
    card("terms", "Die acht Wortarten", [
      TH(
        ["Wortart", "Daran erkennst du sie", "Beispiel"],
        ["Nomen", "der, die oder das passt davor; großgeschrieben", "*der Hund, die Freude*"],
        ["Verb", "verändert sich mit Person und Zeit", "*ich gehe, er ging*"],
        ["Adjektiv", "lässt sich steigern", "*schnell, schneller*"],
        ["Artikel", "begleitet ein Nomen", "*der, die, das, ein*"],
        ["Pronomen", "steht für ein Nomen oder zeigt, wem etwas gehört", "*er, sie, mein*"],
        ["Präposition", "steht vor einem Nomen", "*auf dem Tisch*"],
        ["Konjunktion", "verbindet Wörter und Sätze", "*und, weil, dass*"],
        ["Adverb", "sagt wann, wo, wie und bleibt immer gleich", "*heute, dort, gern*"],
      ),
    ]),
    card("terms", "Satzglieder und ihre Fragen", [
      TH(["Satzglied", "Frage", "Beispiel"], ["Prädikat", "Was geschieht?", "Der Hund ***jagt*** die Katze."], ["Subjekt", "Wer oder was?", "***Der Hund*** jagt die Katze."], ["Akkusativobjekt", "Wen oder was?", "Der Hund jagt ***die Katze***."], ["Dativobjekt", "Wem?", "Ich helfe ***meinem Bruder***."], ["adverbiale Bestimmung", "Wo? Wann? Wie? Warum?", "Wir fahren ***morgen*** ***nach Berlin***."]),
      "Mit der Umstellprobe findest du heraus, welche Wörter ein Satzglied bilden: Was beim Umstellen zusammen wandert, gehört zusammen.",
    ]),
    card("terms", "Die vier Fälle", [TH(["Fall", "Frage", "Beispiel"], ["Nominativ", "Wer oder was?", "*der Hund*"], ["Genitiv", "Wessen?", "*des Hundes*"], ["Dativ", "Wem?", "*dem Hund*"], ["Akkusativ", "Wen oder was?", "*den Hund*"])]),
    card("formula", "Die Zeitformen", [
      TH(["Zeitform", "So ist sie gebaut", "Beispiel"], ["Präsens", "ein Verbteil", "*ich gehe*"], ["Präteritum", "ein Verbteil", "*ich ging*"], ["Perfekt", "habe oder bin und Partizip II", "*ich bin gegangen*"], ["Plusquamperfekt", "hatte oder war und Partizip II", "*ich war gegangen*"], ["Futur", "werde und Infinitiv", "*ich werde gehen*"]),
      "Bei zwei Verbteilen verrät dir der erste Teil die Zeitform.",
    ]),
    card("formula", "Der Modus", [
      TH(["Modus", "Bedeutung", "Erkennungszeichen", "Beispiel"], ["Indikativ", "So ist es.", "die normale Form", "*Er geht.*"], ["Imperativ", "Tu das!", "das Verb steht vorn", "*Geh!*"], ["Konjunktiv I", "Jemand hat es gesagt.", "sei, habe, gehe", "*Er sagt, er gehe.*"], ["Konjunktiv II", "nur vorgestellt, Wunsch, höfliche Bitte", "wäre, hätte, würde", "*Er würde gehen.*"]),
      "Klingt der Konjunktiv I wie die normale Form, nimmt man den Konjunktiv II: *Sie sagen, sie hätten Zeit.*",
    ]),
    card("terms", "Partizip I und II", [TH(["", "So wird es gebildet", "Bedeutung", "Beispiel"], ["Partizip I", "Infinitiv und d", "Es geschieht gerade.", "*das kochende Wasser*"], ["Partizip II", "meistens ge und -t oder -en", "Es ist fertig.", "*das gekochte Ei*"]), "Verben auf -ieren und Verben mit be, ver, er, ent, zer bilden das Partizip II ohne ge: *telefoniert, besucht, verstanden*."]),
    card("formula", "Aktiv und Passiv", [
      TH(["", "Wer steht im Mittelpunkt?", "Beispiel"], ["Aktiv", "der, der etwas tut", "*Der Hund jagt die Katze.*"], ["Passiv", "das, womit etwas geschieht", "*Die Katze wird vom Hund gejagt.*"]),
      "So formst du um: Das Objekt wird zum Subjekt. Das Verb wird zu werden und Partizip II. Der Handelnde kommt mit von dazu oder fällt weg. Die Zeitform bleibt dieselbe.",
      "Fehlt im Passivsatz der Handelnde, nimmst du im Aktivsatz *jemand* oder *man*.",
    ]),
    card("steps", "Von der direkten zur indirekten Rede", [
      "(1) Doppelpunkt und Anführungszeichen entfernen. Nach dem Begleitsatz steht ein Komma.",
      "(2) Die Person anpassen: Aus ich wird er oder sie, aus mein wird sein oder ihr.",
      "(3) Das Verb in den Konjunktiv I setzen.",
      TH(["Direkte Rede", "Indirekte Rede"], ["Lena sagt: „Ich bin krank.“", "Lena sagt, sie sei krank."], ["Er fragt: „Kommst du mit?“", "Er fragt, ob ich mitkomme."], ["Sie fragt: „Wo wohnst du?“", "Sie fragt, wo ich wohne."], ["Er sagt: „Komm her!“", "Er sagt, ich solle herkommen."]),
    ]),
    card("mistake", "Typische Fehler", [
      TH(
        ["Fehler", "Richtig", "Warum?"],
        ["Beim Passiv die Zeit wechseln: *jagte* wird zu *wird gejagt*", "*wurde gejagt*", "Die Zeitform bleibt gleich."],
        ["*Er sagte, ich gehe.*", "*Er sagte, er gehe.*", "Die Person wird angepasst."],
        ["*wird regnen* als Passiv benennen", "Futur", "Nach werden steht ein Infinitiv."],
        ["Das Subjekt immer vorn suchen", "Mit Wer oder was? fragen", "Die Frage entscheidet, nicht der Platz."],
      ),
    ]),
    card("remember", "Merke", L("- Jede Wortart hat eine Probe: Artikel davor, Vergangenheit bilden, steigern.", "- Satzglieder findest du mit Fragen, und du fängst beim Prädikat an.", "- Bei zwei Verbteilen zeigt der erste Teil die Zeitform.", "- Passiv erkennst du an werden und einem Partizip II.", "- In der indirekten Rede steht das Verb im Konjunktiv I.")),
  ],
);
