// Guided lesson: commas 2 (infinitive groups, direct speech, naming the rule).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_01c_komma2.json",
  {
    id: "P_DE_KOMMA2",
    subject: "DE",
    title: "Kommas 2: Gruppen mit zu und die wörtliche Rede",
    teaser: "Wann eine Gruppe mit zu und einem Verb ein Komma bekommt, wie die Zeichen bei der wörtlichen Rede stehen und wie die Kommaregeln heißen, damit du sie in der Prüfung benennen kannst.",
    hook: "Die häufigsten Kommas kennst du schon. Jetzt kommen zwei Fälle dazu, die in der Prüfung besonders gern gefragt werden. Der erste sind kleine Gruppen mit dem Wort zu. Der zweite ist die wörtliche Rede mit ihren Anführungszeichen. Beide folgen klaren Regeln, die wir uns in Ruhe ansehen.",
    outro: "Du kennst jetzt alle Kommaregeln, die im MSA vorkommen. Bei einer Gruppe mit zu achtest du auf die drei Signale. Bei der wörtlichen Rede steht vorn ein Doppelpunkt und hinten ein Komma nach dem Anführungszeichen. Und du kannst jede Regel beim Namen nennen.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2", "P_DE_SATZGLIEDER", "P_DE_SATZ", "P_DE_KOMMA1"],
  },
  [
    ch(
      "Gruppen mit zu und einem Verb",
      b(
        "zu und ein Verb",
        ["*Er hofft, den Zug **zu erreichen**.*", "Eine Gruppe mit zu und einem Verb im Infinitiv heißt **Infinitivgruppe**."],
        "Schau auf das Ende des Satzes. Dort steht zu und dahinter ein Verb in der Grundform. Alles, was dazugehört, bildet zusammen eine Gruppe: den Zug zu erreichen. Diese Gruppe hat einen eigenen Namen, weil sie eigene Kommaregeln hat.",
      ),
      b(
        "Sie hat kein eigenes Subjekt",
        ["*… den Zug zu erreichen*", "Wer den Zug erreichen will, steht in dieser Gruppe nicht.", "Deshalb ist sie kein Nebensatz."],
        "Das unterscheidet die Infinitivgruppe von einem Nebensatz. In einem Nebensatz steht, wer etwas tut: weil er den Zug erreicht. In der Infinitivgruppe fehlt diese Person. Das Verb gehört zu niemandem und steht deshalb im Infinitiv.",
      ),
      b(
        "Signal 1: um, ohne, anstatt",
        ["*Er spart, **um** ein Fahrrad zu kaufen.*", "*Sie ging, **ohne** sich zu verabschieden.*", "Beginnt die Gruppe mit um, ohne, statt, anstatt, außer oder als, steht ein Komma."],
        "Es gibt drei Signale, die ein Komma verlangen. Das erste ist ein einleitendes Wort am Anfang der Gruppe. Am häufigsten ist um. Wenn du um und weiter hinten zu siehst, gehört vor um ein Komma. Bei ohne und anstatt ist es genauso.",
        { tasks: [k("Welche Schreibung ist richtig? Er rannte ___ den Bus zu erreichen.", ", um", ["um"], "Die Gruppe beginnt mit einem einleitenden Wort. Davor steht ein Komma.", "Mit welchem Wort beginnt die Gruppe? Ist das eines der Signale?")] },
      ),
      b(
        "Signal 2: ein Nomen davor",
        ["*Ihr **Plan**, im Ausland zu studieren, ist mutig.*", "Die Gruppe erklärt das Nomen Plan.", "Dann steht ein Komma, hier sogar zwei."],
        "Das zweite Signal ist ein Nomen direkt vor der Gruppe. Die Gruppe sagt genauer, was mit dem Nomen gemeint ist. Welcher Plan? Der Plan, im Ausland zu studieren. Weil die Gruppe hier mitten im Satz steht, bekommt sie vorn und hinten ein Komma.",
      ),
      b(
        "Signal 3: ein Hinweiswort",
        ["*Er liebt **es**, früh aufzustehen.*", "*Ich freue mich **darauf**, dich zu sehen.*", "Die Wörter es, das, daran, darauf und davon weisen auf die Gruppe hin."],
        "Das dritte Signal ist ein kleines Wort im Hauptsatz, das auf die Gruppe vorausweist. Im ersten Beispiel liebt er es, und dieses es steht für das frühe Aufstehen. Wenn so ein Hinweiswort dasteht, gehört vor die Infinitivgruppe ein Komma.",
        { tasks: [k("Ich denke daran das Fenster zu schließen. Das Komma fehlt nach dem Wort ___.", "daran", ["Fenster"], "Das Hinweiswort weist auf die Gruppe voraus. Danach steht ein Komma.", "Welches Wort im Hauptsatz weist auf die Gruppe mit zu voraus?")] },
      ),
      b(
        "Ohne Signal ist das Komma freiwillig",
        ["*Er hofft zu gewinnen.*", "*Er hofft, zu gewinnen.*", "Beides ist richtig."],
        "Wenn keines der drei Signale da ist, darfst du das Komma setzen oder weglassen. In der Prüfung wird dann kein Komma verlangt. Du musst dir also nur die drei Signale merken: ein einleitendes Wort, ein Nomen davor oder ein Hinweiswort.",
      ),
      b(
        "Jetzt du: Welches Signal ist es?",
        "Tipp bei jedem Satz auf das Signal, das ein Komma verlangt.",
        "In jedem Satz steht eine Gruppe mit zu, und das Komma ist schon gesetzt. Deine Aufgabe ist es zu sagen, warum es dort steht. Such nach einem der drei Signale.",
        {
          tasks: [
            k("Sie kam, um uns zu helfen. Das Signal ist ___.", "das einleitende Wort um", ["das Wort uns"], "Die Gruppe beginnt mit um. Das ist das erste Signal.", "Mit welchem Wort beginnt die Gruppe nach dem Komma?"),
            k("Sein Wunsch, Pilot zu werden, ist alt. Das Signal ist ___.", "das Nomen Wunsch", ["das Wort zu"], "Die Gruppe erklärt genauer, welcher Wunsch gemeint ist.", "Welches Wort steht direkt vor dem ersten Komma?"),
            k("Vergiss es nicht, die Tür abzuschließen. Das Signal ist ___.", "das Hinweiswort es", ["das Wort nicht"], "Das kleine Wort weist auf die Gruppe voraus.", "Welches kleine Wort im ersten Teil steht für die ganze Gruppe danach?"),
          ],
        },
      ),
    ),
    ch(
      "Die wörtliche Rede",
      b(
        "Was jemand genau sagt",
        ["*Lena sagt: „Ich komme morgen.“*", "In den **Anführungszeichen** steht genau das, was Lena sagt.", "Das nennt man **wörtliche Rede**."],
        "Wenn du aufschreibst, was jemand wörtlich gesagt hat, setzt du es in Anführungszeichen. Am Anfang stehen sie unten, am Ende stehen sie oben. Alles dazwischen sind die Worte der Person, genau so, wie sie gesprochen wurden.",
      ),
      b(
        "Der Begleitsatz",
        ["***Lena sagt:** „Ich komme morgen.“*", "Der Teil, der verrät, wer spricht, heißt **Begleitsatz**."],
        "Zur wörtlichen Rede gehört fast immer ein kleiner Satz, der sagt, wer spricht. Er begleitet die Rede, daher sein Name. Der Begleitsatz kann vor der Rede stehen oder danach. Davon hängt ab, welche Zeichen du setzt.",
      ),
      b(
        "Begleitsatz vorn: Doppelpunkt",
        ["*Lena sagt**:** „Ich komme morgen.“*", "Nach dem Begleitsatz steht ein Doppelpunkt.", "Die Rede beginnt mit einem großen Buchstaben."],
        "Steht der Begleitsatz vorn, kündigt er die Rede an. Dafür nimmst du einen Doppelpunkt. Danach kommen die Anführungszeichen, und das erste Wort der Rede schreibst du groß. Der Punkt am Ende gehört zur Rede und steht vor dem Anführungszeichen.",
        { tasks: [k("Tom fragt „Wo bist du?“ Nach dem Wort fragt fehlt ___.", "ein Doppelpunkt", ["ein Komma"], "Der Begleitsatz steht vorn und kündigt die Rede an.", "Steht der Begleitsatz vor oder nach der Rede? Welches Zeichen kündigt etwas an?")] },
      ),
      b(
        "Begleitsatz hinten: Komma",
        ["*„Ich komme morgen“**,** sagt Lena.*", "Der Punkt der Rede fällt weg.", "Nach dem Anführungszeichen steht ein Komma."],
        "Steht der Begleitsatz hinten, ändert sich zweierlei. Der Punkt am Ende der Rede verschwindet. Dafür kommt nach dem schließenden Anführungszeichen ein Komma. Der Begleitsatz beginnt dann mit einem kleinen Buchstaben, weil der ganze Satz noch weitergeht.",
      ),
      b(
        "Fragezeichen und Ausrufezeichen bleiben",
        ["*„Kommst du mit?“**,** fragt er.*", "*„Pass auf!“**,** ruft sie.*", "Das Komma kommt trotzdem dazu."],
        "Ein Punkt fällt weg, aber ein Fragezeichen oder ein Ausrufezeichen bleibt stehen. Sonst wüsste man ja nicht mehr, dass es eine Frage oder ein Ruf war. Das Komma nach dem Anführungszeichen setzt du trotzdem. Es stehen dann drei Zeichen hintereinander.",
        { tasks: [k("„Wo bist du?“ fragt Tom. Nach dem Anführungszeichen fehlt ___.", "ein Komma", ["nichts"], "Der Begleitsatz steht hinten. Das Komma kommt auch nach einem Fragezeichen.", "Wo steht der Begleitsatz? Welches Zeichen trennt ihn dann von der Rede?")] },
      ),
      b(
        "Das Komma steht außen",
        ["Falsch: *„Ich komme,“ sagte sie.*", "Richtig: *„Ich komme“**,** sagte sie.*"],
        "Dieser Fehler kommt oft aus englischen Büchern, denn dort steht das Komma innen. Im Deutschen steht es außen, also nach dem schließenden Anführungszeichen. Das Komma gehört nicht zu dem, was die Person gesagt hat. Es trennt die Rede vom Begleitsatz.",
      ),
      b(
        "Jetzt du: wörtliche Rede",
        "Tipp bei jeder Aufgabe auf den richtig geschriebenen Satz.",
        "Schau bei jedem Satz zuerst, ob der Begleitsatz vorn oder hinten steht. Vorn kommt ein Doppelpunkt. Hinten kommt ein Komma, und zwar nach dem Anführungszeichen.",
        {
          tasks: [
            k("Welcher Satz ist richtig? ___", "Mia ruft: „Warte auf mich!“", ["Mia ruft, „Warte auf mich!“"], "Der Begleitsatz steht vorn. Dann folgt ein Doppelpunkt.", "Wo steht der Begleitsatz in diesem Satz?"),
            k("Welcher Satz ist richtig? ___", "„Ich bin müde“, sagt Ben.", ["„Ich bin müde.“ sagt Ben."], "Der Punkt fällt weg, und das Komma steht nach dem Anführungszeichen.", "Was passiert mit dem Punkt der Rede, wenn der Begleitsatz hinten steht?"),
            k("Welcher Satz ist richtig? ___", "„Hast du Zeit?“, fragt sie.", ["„Hast du Zeit“, fragt sie."], "Das Fragezeichen bleibt stehen, und das Komma kommt dazu.", "Darf das Fragezeichen wegfallen, wenn der Begleitsatz hinten steht?"),
          ],
        },
      ),
    ),
    ch(
      "Die Regeln beim Namen nennen",
      b(
        "Die Namen der Regeln",
        [L("**Aufzählung**: *Äpfel, Birnen und Trauben*", "**Satzreihe**: zwei Hauptsätze", "**Satzgefüge**: Hauptsatz und Nebensatz", "**Einschub**: ein Nebensatz in der Mitte", "**Infinitivgruppe**: Gruppe mit zu", "**Entgegenstellung**: aber, sondern")],
        "In der Prüfung sollst du manchmal nicht nur das Komma setzen, sondern auch die Regel nennen. Dafür brauchst du diese sechs Namen. Zwei davon sind neu: Eine Satzreihe sind zwei Hauptsätze nebeneinander. Ein Satzgefüge ist ein Hauptsatz mit einem Nebensatz.",
      ),
      b(
        "Jetzt du: die Regel benennen",
        "Tipp bei jedem Satz auf den Namen der Regel.",
        "Das Komma steht schon da. Überleg bei jedem Satz, welcher der sechs Gründe dahintersteckt. Die Tafel davor hilft dir, wenn du unsicher bist.",
        {
          tasks: [
            k("Ich lese, weil es regnet. Die Regel heißt ___.", "Satzgefüge", ["Aufzählung"], "Ein Hauptsatz und ein Nebensatz stehen zusammen.", "Welche zwei Arten von Teilsätzen stehen hier nebeneinander?"),
            k("Wir kaufen Brot, Milch und Käse. Die Regel heißt ___.", "Aufzählung", ["Satzreihe"], "Drei gleichartige Dinge werden hintereinander genannt.", "Werden hier Dinge hintereinander genannt, oder stehen zwei Sätze da?"),
            k("Er ist nicht müde, sondern hungrig. Die Regel heißt ___.", "Entgegenstellung", ["Einschub"], "Das Wort sondern zeigt einen Gegensatz an.", "Welches Wort steht direkt nach dem Komma?"),
          ],
        },
      ),
      b(
        "Ein ganzer Satz, Schritt für Schritt",
        ["*Als es klingelte, lief Mia, die gerade kochte, zur Tür.*", L("Erstes Komma: Satzgefüge.", "Zweites und drittes Komma: Einschub.")],
        "Ich gehe den Satz einmal für dich durch. Ich finde drei Verben: klingelte, lief und kochte. Als es klingelte ist ein Nebensatz, der vorn steht. Danach kommt ein Komma. Die gerade kochte ist ein Relativsatz mitten im Hauptsatz. Er bekommt zwei Kommas.",
      ),
      b(
        "Das nimmst du mit",
        ["(1) Gruppe mit zu: Komma bei **um, ohne, anstatt**, bei einem **Nomen** davor oder bei einem **Hinweiswort**.", "(2) Begleitsatz vorn: **Doppelpunkt**.", "(3) Begleitsatz hinten: **Komma** nach dem Anführungszeichen."],
        "Das waren die letzten beiden Kommaregeln. Zusammen mit der ersten Lektion hast du jetzt alles, was die Prüfung zu den Kommas verlangt. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Sie ging, ohne ein Wort zu sagen. Das Komma steht wegen des Wortes ___.", "ohne", ["Wort"], "Das ist eines der einleitenden Wörter, die ein Komma verlangen.", "Mit welchem Wort beginnt die Gruppe nach dem Komma?")] },
      ),
    ),
  ],
  [
    v("Infinitivgruppe", "Eine Gruppe mit zu und einem Verb im Infinitiv. Sie hat kein eigenes Subjekt.", "den Zug zu erreichen"),
    v("um, ohne, anstatt", "Einleitende Wörter. Beginnt eine Infinitivgruppe mit einem von ihnen, steht ein Komma."),
    v("Hinweiswort", "Ein kleines Wort wie es, das, daran oder darauf, das auf die Infinitivgruppe vorausweist."),
    v("wörtliche Rede", "Genau das, was jemand sagt. Sie steht in Anführungszeichen."),
    v("Begleitsatz", "Der Teil, der verrät, wer spricht.", "Lena sagt:"),
    v("Satzreihe", "Zwei Hauptsätze nebeneinander."),
    v("Satzgefüge", "Ein Hauptsatz zusammen mit einem Nebensatz."),
    v("Entgegenstellung", "Ein Gegensatz mit aber, sondern, doch oder jedoch."),
  ],
  [
    q("Er übt jeden Tag um besser zu werden. Wo fehlt das Komma?", "vor um", ["nach um", "vor besser", "nirgends"], "Die Infinitivgruppe beginnt mit dem einleitenden Wort um. Davor steht ein Komma."),
    q("Ihr Traum, Ärztin zu werden, wurde wahr. Warum stehen hier Kommas?", "Die Gruppe erklärt das Nomen Traum.", ["Wegen des Wortes um.", "Weil es eine Aufzählung ist.", "Wegen der wörtlichen Rede."], "Vor der Infinitivgruppe steht ein Nomen, das sie genauer erklärt. Weil sie mitten im Satz steht, bekommt sie zwei Kommas."),
    q("Er hofft zu gewinnen. Muss hier ein Komma stehen?", "Nein, es ist freiwillig.", ["Ja, vor zu.", "Ja, nach hofft und nach zu.", "Nein, es wäre falsch."], "Es gibt kein Signal: kein einleitendes Wort, kein Nomen davor und kein Hinweiswort. Dann ist das Komma freiwillig."),
    q("Welcher Satz ist richtig?", "Paul sagt: „Ich habe Hunger.“", ["Paul sagt, „Ich habe Hunger.“", "Paul sagt „Ich habe Hunger.“", "Paul sagt: „ich habe Hunger.“"], "Steht der Begleitsatz vorn, folgt ein Doppelpunkt. Die Rede beginnt mit einem großen Buchstaben."),
    q("Welcher Satz ist richtig?", "„Ich habe Hunger“, sagt Paul.", ["„Ich habe Hunger,“ sagt Paul.", "„Ich habe Hunger.“ sagt Paul.", "„Ich habe Hunger“ sagt Paul."], "Steht der Begleitsatz hinten, fällt der Punkt weg. Das Komma steht nach dem schließenden Anführungszeichen."),
    q("„Kommst du mit?“ fragt Lea. Was fehlt?", "ein Komma nach dem Anführungszeichen", ["ein Doppelpunkt", "ein Punkt", "nichts"], "Das Fragezeichen bleibt stehen, aber das Komma zwischen Rede und Begleitsatz kommt trotzdem dazu."),
    q("Wie heißt die Kommaregel in: Ich weiß, dass du recht hast?", "Satzgefüge", ["Satzreihe", "Aufzählung", "Entgegenstellung"], "Ein Hauptsatz und ein Nebensatz bilden zusammen ein Satzgefüge."),
    q("Wie heißt die Kommaregel in: Tim malt, Lea liest?", "Satzreihe", ["Satzgefüge", "Einschub", "Infinitivgruppe"], "Zwei Hauptsätze stehen nebeneinander. Das nennt man Satzreihe."),
  ],
);
