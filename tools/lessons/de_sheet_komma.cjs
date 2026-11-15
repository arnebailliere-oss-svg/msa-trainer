// Spickzettel: commas and clause types (replaces the old page L_DE_KOMMA).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/de_01_kommas.json",
  {
    id: "L_DE_KOMMA",
    subject: "DE",
    topicId: "DE_PUNCT_COMMA_MAIN_SUB",
    alsoFor: ["DE_PUNCT_COMMA_LIST", "DE_PUNCT_INFINITIVE", "DE_PUNCT_SPEECH", "DE_GRAM_SENTENCE_TYPES"],
    title: "Kommas und Satzarten",
    guided: ["P_DE_SATZ", "P_DE_KOMMA1", "P_DE_KOMMA2"],
    intro: "Das hier ist dein Spickzettel zu den Kommas. Hier schaust du nach, wie eine Regel heißt oder wo das Komma bei der wörtlichen Rede steht. Gelernt wird oben in den Lektionen mit Ferdinand. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Deutsch",
  },
  [
    card("what", "Was die Prüfung von dir will", ["Es gibt drei Arten von Aufgaben:", L("- Du setzt die fehlenden Kommas in einen Text.", "- Du ordnest einem Satz die passende Kommaregel zu.", "- Du begründest ein Komma, indem du den Namen der Regel nennst."), "Du musst also beides können: das Komma setzen und die Regel benennen."]),
    card("terms", "Die Teile eines Satzes", [
      TH(["Teil", "Daran erkennst du ihn", "Beispiel"], ["Hauptsatz", "Er kann allein stehen. Das Verb steht an zweiter Stelle.", "*Ich bleibe zu Hause.*"], ["Nebensatz", "Er kann nicht allein stehen. Das Verb steht am Ende.", "*weil ich krank bin*"], ["Relativsatz", "Er erklärt ein Nomen und beginnt mit der, die oder das.", "*das Buch, das ich lese*"], ["Infinitivgruppe", "zu und ein Verb, ohne eigenes Subjekt", "*um ein Fahrrad zu kaufen*"]),
      "So viele Verben ein Satz hat, so viele Teilsätze hat er.",
    ]),
    card("terms", "Die sechs Kommaregeln", [
      TH(
        ["Name der Regel", "Wann?", "Beispiel"],
        ["Aufzählung", "gleichartige Teile, kein Komma vor und", "*Affen, Elefanten und Zebras*"],
        ["Satzreihe", "zwei Hauptsätze", "*Tim malt, Lea liest.*"],
        ["Satzgefüge", "Hauptsatz und Nebensatz", "*Sie bleibt zu Hause, weil sie krank ist.*"],
        ["Einschub", "Nebensatz mitten im Hauptsatz: zwei Kommas", "*Das Haus, das alt war, wurde verkauft.*"],
        ["Infinitivgruppe", "Gruppe mit zu und einem Signal", "*Er spart, um ein Fahrrad zu kaufen.*"],
        ["Entgegenstellung", "vor aber, sondern, doch, jedoch", "*Er ist nicht dumm, sondern faul.*"],
      ),
      "Verbindet und oder oder zwei Hauptsätze, ist das Komma freiwillig.",
    ]),
    card("formula", "Infinitivgruppe: die drei Signale", [
      TH(["Signal", "Wörter", "Beispiel"], ["einleitendes Wort", "um, ohne, statt, anstatt, außer, als", "*Sie ging, ohne sich zu verabschieden.*"], ["ein Nomen davor", "Plan, Wunsch, Idee …", "*Ihr Plan, im Ausland zu studieren, ist mutig.*"], ["ein Hinweiswort", "es, das, daran, darauf, davon", "*Er liebt es, früh aufzustehen.*"]),
      "Ohne eines dieser Signale ist das Komma freiwillig: *Er hofft zu gewinnen.*",
    ]),
    card("formula", "Wörtliche Rede", [
      TH(["Der Begleitsatz steht", "Zeichen", "Beispiel"], ["vorn", "Doppelpunkt", "*Lena sagt: „Ich komme morgen.“*"], ["hinten", "Komma nach dem Anführungszeichen, der Punkt fällt weg", "*„Ich komme morgen“, sagt Lena.*"], ["hinten, nach einer Frage", "Fragezeichen bleibt, Komma kommt dazu", "*„Kommst du mit?“, fragt er.*"]),
      "Das Komma steht immer außen, also nach dem schließenden Anführungszeichen.",
    ]),
    card("steps", "So findest du jedes Komma", ["(1) Such alle Verben. So viele Teilsätze hat der Satz.", "(2) Beginnt ein Nebensatz mit weil, dass, wenn, obwohl oder mit einem Relativpronomen? Dann steht an der Grenze ein Komma. Steht er in der Mitte, sind es zwei.", "(3) Ist es eine Aufzählung? Dann stehen Kommas zwischen den Teilen, aber keins vor und.", "(4) Gibt es eine Gruppe mit zu und einem der drei Signale? Dann steht ein Komma.", "(5) Steht aber, sondern, doch oder jedoch da? Dann steht ein Komma davor."]),
    card("mistake", "Typische Fehler", [
      TH(
        ["Falsch", "Richtig", "Warum?"],
        ["*Äpfel, Birnen, und Trauben*", "*Äpfel, Birnen und Trauben*", "Vor und steht in der Aufzählung kein Komma."],
        ["*Der Hund, der bellt gehört mir.*", "*Der Hund, der bellt, gehört mir.*", "Ein Einschub braucht zwei Kommas."],
        ["*Das, Buch ist gut.*", "*Das Buch ist gut.*", "Vor dem Artikel steht kein Komma, nur vor dem Relativpronomen."],
        ["*„Ich komme,“ sagte sie.*", "*„Ich komme“, sagte sie.*", "Das Komma steht außen."],
      ),
    ]),
    card("remember", "Merke", L("- Zähl zuerst die Verben, dann kennst du die Zahl der Teilsätze.", "- Zwischen Hauptsatz und Nebensatz steht immer ein Komma.", "- Vor und steht in einer Aufzählung kein Komma.", "- Ein eingeschobener Nebensatz bekommt zwei Kommas.", "- Bei der wörtlichen Rede steht das Komma nach dem Anführungszeichen.")),
  ],
);
