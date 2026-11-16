// Spickzettel: style (replaces the old page L_DE_STIL).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/de_04_stil.json",
  {
    id: "L_DE_STIL",
    subject: "DE",
    topicId: "DE_STIL_MITTEL",
    alsoFor: ["DE_STIL_REGISTER", "DE_STIL_FEHLER", "DE_STIL"],
    title: "Sprache und Stil",
    guided: ["P_DE_STILMITTEL", "P_DE_STILMITTEL2", "P_DE_REGISTER", "P_DE_FEHLERARTEN"],
    intro: "Das hier ist dein Spickzettel zu Sprache und Stil. Hier schaust du nach, wie ein Stilmittel heißt, welches sachliche Wort zu einem lockeren passt oder welche Fehlerart gemeint ist. Gelernt wird oben in den Lektionen mit Ferdinand. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Deutsch",
  },
  [
    card("what", "Was die Prüfung von dir will", ["Zu diesem Bereich gibt es drei Arten von Aufgaben:", L("- Du nennst zwei Stilmittel, die in einem Satz vorkommen.", "- Du schreibst einen umgangssprachlichen Satz in Standardsprache um.", "- Du benennst die Fehler in einem Text: Rechtschreibung, Zeichensetzung, Grammatik oder Ausdruck.")]),
    card("terms", "Sprachbilder", [TH(["Stilmittel", "Daran erkennst du es", "Beispiel"], ["Vergleich", "das Wort wie", "*stark wie ein Bär*"], ["Metapher", "ein Bild ohne wie", "*Er ist ein Bär.*"], ["Personifikation", "Ein Ding tut etwas Menschliches.", "*Die Sonne lacht.*"], ["Symbol", "ein festes Zeichen für etwas anderes", "*weiße Taube: Frieden*"])]),
    card("terms", "Wiederholungen", [TH(["Stilmittel", "Was sich wiederholt", "Beispiel"], ["Alliteration", "der Anfangslaut", "*Milch macht müde Männer munter.*"], ["Anapher", "ein Wort am Satzanfang", "*Wer war das? Wer hat das getan?*"], ["Parallelismus", "der Bau des Satzes", "*Der Mensch läuft, der Fisch schwimmt.*"])]),
    card("terms", "Kunstgriffe und Satzbau", [
      TH(
        ["Stilmittel", "Was es tut", "Beispiel"],
        ["Hyperbel", "übertreibt stark", "*Ich habe es tausendmal gesagt.*"],
        ["Euphemismus", "beschönigt", "*Seniorenresidenz*"],
        ["rhetorische Frage", "fragt, ohne eine Antwort zu erwarten", "*Wollen wir das wirklich?*"],
        ["Ironie", "sagt das Gegenteil des Gemeinten", "*Na toll, es regnet.*"],
        ["Antithese", "stellt Gegensätze nebeneinander", "*Jung und Alt*"],
        ["Klimax", "steigert in Stufen", "*Tage, Wochen, Monate*"],
        ["Ellipse", "lässt einen Teil des Satzes weg", "*Erst die Arbeit, dann das Vergnügen.*"],
      ),
    ]),
    card("terms", "Vier seltenere Stilmittel", [
      TH(["Stilmittel", "Was es tut", "Beispiel"], ["Oxymoron", "verbindet zwei Wörter, die sich widersprechen", "*bittersüß, alter Knabe*"], ["Pleonasmus", "sagt dasselbe doppelt", "*weißer Schimmel, runde Kugel*"], ["Asyndeton", "reiht ohne Bindewort", "*Wasser, Luft, Erde, Feuer*"], ["Chiasmus", "stellt zwei Satzteile über Kreuz", "*Er ist jung, alt bist du.*"]),
      "Diese vier kommen seltener vor. Es reicht, wenn du sie wiedererkennst.",
    ]),
    card("steps", "Drei Fragen, mit denen du jedes Stilmittel findest", ["(1) Wiederholt sich etwas? Ein Laut, ein Wort oder der Bau des Satzes?", "(2) Ist es ein Bild? Steht ein wie da, fehlt es, oder handelt ein Ding wie ein Mensch?", "(3) Ist es übertrieben, beschönigt, eine Scheinfrage oder ein Gegensatz?", "In einem Satz stecken oft zwei Stilmittel. Hör deshalb nach dem ersten Fund nicht auf."]),
    card("terms", "Von der Umgangssprache zur Standardsprache", [
      "Du streichst die Füllwörter, ersetzt die lockeren Wörter und schreibst verkürzte Formen aus. Der Inhalt bleibt gleich.",
      TH(["Umgangssprache", "Standardsprache"], ["voll, mega, total", "sehr"], ["krass", "beeindruckend, heftig"], ["Bock", "Lust"], ["kapieren, checken", "verstehen"], ["Klamotten", "Kleidung"], ["kaputt machen", "beschädigen, zerstören"], ["hab, is, nix", "habe, ist, nichts"], ["halt, eben, irgendwie", "(streichen)"]),
    ]),
    card("terms", "Die vier Fehlerarten", [
      TH(["Zeichen", "Fehlerart", "Die Frage dazu", "Beispiel"], ["R", "Rechtschreibung", "Ist ein Wort falsch geschrieben?", "*warscheinlich, Strasse*"], ["Z", "Zeichensetzung", "Fehlt ein Satzzeichen, oder ist eins zu viel?", "*Ich glaube dass …*"], ["G", "Grammatik", "Hat ein Wort die falsche Form?", "*ein Film sehen, gefangt*"], ["A", "Ausdruck", "Passt ein Wort nicht in einen sachlichen Text?", "*voll gut, halt*"]),
      "Die Verwechslung von das und dass zählt als Rechtschreibfehler. *Größer wie* statt *größer als* zählt als Grammatikfehler.",
    ]),
    card("mistake", "Typische Fehler", [
      TH(
        ["Fehler", "Besser so"],
        ["Metapher und Vergleich verwechseln", "Steht das Wort wie da, ist es ein Vergleich."],
        ["Nur ein Stilmittel nennen, wenn zwei verlangt sind", "Alle drei Fragen durchgehen"],
        ["Beim Umformen den Inhalt verändern", "Nur die Sprache ändern"],
        ["das und dass als Grammatikfehler einordnen", "Es ist ein Rechtschreibfehler."],
      ),
    ]),
    card("remember", "Merke", L("- Ein Vergleich hat das Wort wie, eine Metapher hat es nicht.", "- Frag bei jedem Satz: Wiederholung, Bild oder Kunstgriff?", "- Beim Umformen in Standardsprache bleibt der Inhalt derselbe.", "- Jede Fehlerart hat ihre Frage: Schreibung, Zeichen, Form oder Wortwahl.")),
  ],
);
