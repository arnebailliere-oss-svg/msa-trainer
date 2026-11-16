// Spickzettel: writing (replaces the old page L_DE_EROERTERUNG).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/de_06_eroerterung.json",
  {
    id: "L_DE_EROERTERUNG",
    subject: "DE",
    topicId: "DE_WRITE_EROERTERUNG",
    alsoFor: ["DE_WRITE_REPHRASE", "DE_WRITE_SUMMARY", "DE_WRITE"],
    title: "Schreiben: Erörterung, Zusammenfassung, Umformulieren",
    guided: ["P_DE_EROERTERUNG", "P_DE_ZUSAMMENFASSEN", "P_DE_UMFORMULIEREN"],
    intro: "Das hier ist dein Spickzettel zum Schreiben. Hier schaust du nach, wie eine Erörterung aufgebaut ist, was in eine Zusammenfassung gehört und wie du einen Satz umformulierst. Gelernt wird oben in den Lektionen mit Ferdinand. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Deutsch",
  },
  [
    card("what", "Was die Prüfung von dir will", ["Die große Schreibaufgabe hat zwei Teile, und beide werden bewertet:", L("- Du füllst einen Schreibplan aus, also eine Tabelle mit Stichpunkten.", "- Du schreibst auf dieser Grundlage eine Erörterung."), "Dazu kommen kleine Aufgaben, in denen du Wörter ersetzt, Sätze umformulierst oder einen Text zusammenfasst."]),
    card("terms", "Der Aufbau der Erörterung", [
      TH(["Teil", "Was hineingehört"], ["Einleitung", "ein Aufhänger und die Frage, noch keine eigene Meinung"], ["Hauptteil, erste Seite", "die These mit drei Argumenten"], ["Hauptteil, zweite Seite", "die Gegenthese mit drei Argumenten"], ["Schluss", "die eigene Meinung, der wichtigste Grund, ein Vorschlag"]),
      "Die Seite, für die du dich am Ende entscheidest, behandelst du als zweite. Das stärkste Argument steht jeweils zuletzt.",
    ]),
    card("formula", "Ein Argument hat drei Teile", [
      TH(["Teil", "Frage", "Beispiel"], ["Behauptung", "Was gilt?", "*Soziale Medien können einsam machen.*"], ["Begründung", "Warum?", "*Viele schreiben lieber, als sich zu treffen.*"], ["Beispiel", "Woran sieht man das?", "*Wer sehr viel online ist, trifft seine Freunde seltener.*"]),
      "Jedes Argument bekommt einen eigenen Absatz. Aus einer Zeile im Schreibplan werden so drei Sätze im Text.",
    ]),
    card("terms", "Wörter, die Absätze verbinden", [TH(["Wozu?", "Wendungen"], ["ein weiteres Argument", "Außerdem, Hinzu kommt, Ein weiterer Punkt ist"], ["die Gegenseite", "Allerdings, Andererseits, Dagegen spricht"], ["das stärkste Argument", "Vor allem, Am wichtigsten ist"], ["der Schluss", "Insgesamt, Meiner Ansicht nach, Deshalb"])]),
    card("example", "Ein Schreibplan als Muster", [
      "Die Frage lautet: Wie wirken sich soziale Medien auf uns aus?",
      TH(
        ["Feld", "Stichpunkte"],
        ["Einleitung", "fast alle Jugendlichen nutzen sie täglich; Frage: gut oder schlecht?"],
        ["These: Bereicherung", "(1) neue Kontakte weltweit (2) Wissen und Aufklärung (3) eigene Ideen zeigen"],
        ["Gegenthese: Gefahr", "(1) verzerrtes Selbstbild (2) nur noch passende Meinungen (3) Vereinsamung"],
        ["Schluss", "Nachteile wiegen schwerer; kein Verbot, aber Umgang in der Schule üben"],
      ),
    ]),
    card("steps", "Die Kontrolle am Ende", ["(1) Sind Einleitung, Hauptteil und Schluss klar erkennbar?", "(2) Hat jedes Argument Behauptung, Begründung und Beispiel?", "(3) Steht die eigene Meinung nur im Schluss?", "(4) Steht der Text in der Gegenwart und in Standardsprache?", "(5) Stimmen die Kommas, die Großschreibung und das und dass?"]),
    card("terms", "Eine Zusammenfassung in zwei Sätzen", [
      TH(["Satz", "Was hineingehört", "Beispiel"], ["Satz 1", "Textart, Titel, Kernaussage", "*Der Kommentar „Ein Pullover für alle?“ spricht sich für Schulkleidung aus.*"], ["Satz 2", "die wichtigsten Punkte", "*Als Gründe nennt die Autorin den Markendruck und das Gemeinschaftsgefühl.*"]),
      "Vier Regeln: Du schreibst in der Gegenwart. Du sagst nicht deine Meinung. Du benutzt eigene Worte und keine Zitate. Du lässt Zahlen, Namen und Beispiele weg.",
    ]),
    card("terms", "Umformulieren", [
      TH(
        ["Die Aufgabe verlangt", "So gehst du vor", "Beispiel"],
        ["ein Synonym", "ein Wort suchen, das in den Satz passt", "*kühler Kopf*: ruhiger Kopf"],
        ["ein deutsches Wort für ein Fremdwort", "die Bedeutung nennen", "*Kooperation*: Zusammenarbeit"],
        ["keine Redewendung", "sagen, was gemeint ist", "*die Hand ins Feuer legen*: garantieren"],
        ["keine Einschränkung", "eigentlich, fast, meistens streichen", "*Ich habe keine Zeit.*"],
        ["eine Tatsache statt einer Vermutung", "scheinen, vielleicht, wohl streichen", "*Sie sind Filmfans.*"],
        ["Ungleichheit statt Gleichheit", "steigern und als setzen", "*größer als ich*"],
      ),
      "Ändere immer nur das eine Wort, das die Aufgabe verlangt.",
    ]),
    card("mistake", "Typische Fehler", [TH(["Fehler", "Besser so"], ["Die eigene Meinung schon in der Einleitung sagen", "Erst im Schluss urteilen"], ["Nur eine Seite behandeln", "Gleich viele Argumente auf beiden Seiten"], ["Eine Behauptung ohne Begründung", "Immer fragen: Warum? Woran sieht man das?"], ["Im Schluss ein neues Argument bringen", "Es im Hauptteil nachtragen"], ["In der Zusammenfassung nacherzählen", "Nur sagen, was für den ganzen Text gilt"])]),
    card("remember", "Merke", L("- Füll zuerst den Schreibplan aus und schreib erst danach den Text.", "- Jedes Argument braucht eine Behauptung, eine Begründung und ein Beispiel.", "- Deine eigene Meinung steht erst im Schluss.", "- Eine Zusammenfassung steht in der Gegenwart und enthält keine eigene Meinung.", "- Beim Umformulieren fragst du immer: Was ist eigentlich gemeint?")),
  ],
);
