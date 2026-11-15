// Spickzettel: Listening and Reading (replaces the old lesson page L_EN_LISTENING_READING).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/en_03_listening_reading.json",
  {
    id: "L_EN_LISTENING_READING",
    subject: "EN",
    topicId: "EN_READ_CORE",
    alsoFor: ["EN_READ_SIGNS", "EN_READ_MATCHING", "EN_READ_EMAILS", "EN_READ", "EN_LISTEN_NUMBERS", "EN_LISTEN"],
    title: "Listening und Reading",
    guided: ["P_EN_LISTENING", "P_EN_READ_MATCH", "P_EN_READ_SIGNS", "P_EN_READING"],
    intro: "Das hier ist dein Spickzettel zum Hören und Lesen. Hier schaust du nach, wie eine Aufgabe aufgebaut ist oder wie man eine Uhrzeit sagt. Gelernt wird oben in den Lektionen mit Ferdinand. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach dem Aufbau des MSA Englisch",
  },
  [
    card("what", "So ist die Prüfung aufgebaut", [
      TH(
        ["Teil", "Was du bekommst", "Was du tust"],
        ["Listening", "4 bis 5 Hörtexte, jeder zweimal", "ankreuzen, Lücken füllen, zuordnen"],
        ["Reading 1", "5 Personen, 7 Angebote", "zuordnen"],
        ["Reading 2", "Schilder und kurze Texte", "den Satz finden, der dasselbe sagt"],
        ["Reading 3", "ein langer Artikel", "Fragen dazu ankreuzen"],
        ["Writing", "kurze Schreibaufgaben", "zum Beispiel eine E-Mail schreiben"],
      ),
      "Für falsche Antworten wird nichts abgezogen. Kreuz deshalb immer etwas an, auch wenn du unsicher bist.",
    ]),
    card("steps", "Hören: in dieser Reihenfolge", ["(1) Lies vor dem Hören die Aufgabe. Wird eine Uhrzeit, eine Zahl, ein Name oder ein Ort gesucht?", "(2) Beim ersten Hören verstehst du, worum es geht, und notierst die ersten Antworten.", "(3) Beim zweiten Hören füllst du die Lücken und prüfst deine Antworten.", "Wenn du ein Wort nicht kennst, hör einfach weiter. Die Stelle kommt beim zweiten Hören noch einmal."]),
    card(
      "terms",
      "Uhrzeiten",
      [
        TH(
          ["Du hörst", "Es ist"],
          ["half past ten", "10:30 (auf Deutsch: halb elf)"],
          ["quarter past nine", "9:15"],
          ["quarter to nine", "8:45"],
          ["ten past four", "4:10"],
          ["twenty to five", "4:40"],
          ["six fifteen", "6:15"],
          ["five oh-nine", "5:09"],
          ["7 am", "7 Uhr morgens"],
          ["7 pm", "19 Uhr"],
          ["12 pm", "12 Uhr mittags"],
          ["12 am", "Mitternacht"],
        ),
        "Das Wort past bedeutet nach, das Wort to bedeutet vor.",
      ],
    ),
    card("terms", "Zahlen, Preise und Daten", [
      TH(
        ["Du hörst", "Es ist", "Darauf achtest du"],
        ["thirTEEN", "13", "Das Ende ist betont und lang."],
        ["THIRty", "30", "Der Anfang ist betont, das Ende ist kurz."],
        ["oh-seven-double four", "0744", "Die Null heißt oh, double heißt doppelt."],
        ["four pounds fifty", "£4.50", "Erst die Pfund, dann die Pence."],
        ["the first of May", "1. Mai", "Auch möglich: May the first."],
        ["the third of June", "3. Juni", "first, second, third, danach mit -th."],
        ["nineteen ninety-eight", "1998", "Man teilt die Jahreszahl in der Mitte."],
        ["two thousand and nine", "2009", "Die Jahre 2000 bis 2009 sagt man mit thousand."],
      ),
    ]),
    card("steps", "Lesen 1: Personen und Angebote zuordnen", ["(1) Lies die Sätze über die Person und unterstreiche jeden Wunsch.", "(2) Geh mit jedem Wunsch durch die Angebote und streich, was dagegen spricht.", "(3) Prüf beim letzten Angebot jeden Wunsch noch einmal.", "Ein Angebot passt nur, wenn kein einziger Wunsch dagegen spricht. Das Angebot benutzt oft andere Wörter als die Person: Bei der Person steht *animals*, im Angebot steht *goats* oder *wildlife*."]),
    card("terms", "Lesen 2: Schilder und kurze Texte", [
      "Frag zuerst: Was will das Schild?",
      TH(["Das Schild will", "Daran erkennst du es"], ["verbieten", "no, do not, not allowed"], ["warnen", "danger, beware, caution"], ["informieren", "open, closed, last entry"], ["eine Bedingung nennen", "only, unless, must"]),
      "Der richtige Satz sagt dasselbe mit anderen Wörtern. Ein Satz ist falsch, wenn er nur ein Wort vom Schild übernimmt oder wenn er etwas behauptet, das nicht auf dem Schild steht.",
    ]),
    card("steps", "Lesen 3: der lange Artikel", [
      "(1) Lies zuerst die Frage und markiere ein Schlüsselwort, am besten einen Namen oder ein Ding.",
      "(2) Such dieses Wort im Artikel, ohne alles zu lesen.",
      "(3) Lies die Stelle genau und vergleiche sie mit jeder Antwort.",
      TH(["Kleines Wort", "Bedeutung"], ["not", "nicht: dreht die Aussage um"], ["all / some", "alle / einige"], ["only", "nur"], ["more / fewer", "mehr / weniger"]),
      "Bei den drei Kästchen bedeutet *false*, dass der Text etwas anderes sagt. *Not in the text* bedeutet, dass der Text dazu gar nichts sagt.",
    ]),
    card("mistake", "Typische Fehler", [
      TH(
        ["Fehler", "Besser so"],
        ["Die Aufgabe erst nach dem Hören lesen", "Die Aufgabe vor dem Hören lesen"],
        ["*half past ten* als halb zehn verstehen", "Es ist 10:30, also halb elf"],
        ["Nach Gefühl zuordnen", "Jeden Wunsch mit einem Wort belegen"],
        ["Eine Antwort wählen, weil ein Wort aus dem Text darin vorkommt", "Die ganze Aussage vergleichen"],
        ["Eine Aufgabe leer lassen", "Immer etwas ankreuzen"],
      ),
    ]),
    card("remember", "Merke", L("- Lies immer zuerst die Aufgabe und erst danach den Text.", "- Die richtige Antwort benutzt meistens andere Wörter als der Text.", "- Was nicht im Text steht, ist keine richtige Antwort.", "- Die Uhrzeit half past ten ist halb elf und nicht halb zehn.", "- Kreuz immer etwas an, denn für falsche Antworten wird nichts abgezogen.")),
  ],
);
