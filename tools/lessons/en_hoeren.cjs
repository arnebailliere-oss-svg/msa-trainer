// Guided lesson: Listening, with times, numbers and dates.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_04d_hoeren.json",
  {
    id: "P_EN_LISTENING",
    subject: "EN",
    title: "Hören: Uhrzeiten, Zahlen und Daten",
    teaser: "Wie die Höraufgaben ablaufen und worauf du beim ersten und zweiten Hören achtest. Dazu die Stellen, an denen die meisten Punkte verloren gehen: half past, thirteen und thirty, Telefonnummern, Preise und Daten.",
    hook: "Listening heißt hören. Beim Hören kannst du nicht zurückblättern, und das macht viele nervös. Dabei geht es in der Prüfung fast immer um dieselben Dinge: eine Uhrzeit, eine Zahl, ein Datum oder einen Namen. Wenn du weißt, wie die Engländer das sagen, hörst du es auch.",
    outro: "Du weißt jetzt, wie du an eine Höraufgabe herangehst: erst lesen, dann zweimal hören. Du kennst die Falle mit half past und kannst thirteen von thirty unterscheiden. Auch Telefonnummern, Preise und Daten klingen für dich nicht mehr fremd.",
  },
  [
    ch(
      "So läuft das Hören ab",
      b(
        "Was beim Hören anders ist",
        ["Du hörst jeden Text **zweimal**.", "Vorher bekommst du Zeit, die Aufgaben zu **lesen**.", "Zurückblättern kannst du nicht."],
        "Beim Lesen kannst du eine Stelle so oft ansehen, wie du willst. Beim Hören ist das Wort vorbei, sobald es gesprochen ist. Dafür hilft dir die Prüfung an zwei Stellen. Du darfst die Aufgaben vorher lesen, und du hörst alles ein zweites Mal.",
      ),
      b(
        "Erst lesen, dann hören",
        ["Aufgabe: *The train leaves at ___.*", "Jetzt weißt du schon vor dem Hören: Gesucht ist eine **Uhrzeit**."],
        "Nutze die Lesezeit vor dem Hören. In der Aufgabe steht, was du suchen sollst. Wer weiß, dass eine Uhrzeit kommt, hört sie auch. Wer nicht weiß, wonach er hört, hört am Ende nur ein Rauschen aus vielen Wörtern.",
        { tasks: [k("Die Aufgabe fragt nach einer phone number. Beim Hören achtest du auf ___.", "Zahlen", ["Namen", "Farben"], "Eine Telefonnummer besteht aus Ziffern. Darauf richtest du dein Ohr.", "Woraus besteht eine Telefonnummer? Genau darauf hörst du.")] },
      ),
      b(
        "Zweimal hören, zwei Aufgaben",
        [L("**Erstes Hören**: verstehen, worum es geht,", "und die ersten Antworten notieren."), L("**Zweites Hören**: die Lücken füllen", "und die Antworten prüfen.")],
        "Du musst beim ersten Mal nicht alles schaffen. Schreib auf, was du sicher gehört hast, und lass den Rest offen. Beim zweiten Hören weißt du schon, an welcher Stelle die fehlende Antwort kommt. Dann kannst du genau dort aufpassen.",
      ),
      b(
        "Wenn du ein Wort nicht kennst",
        ["Bleib nicht daran hängen.", "Hör weiter, sonst verpasst du die nächste Antwort.", "Beim zweiten Hören kommt die Stelle noch einmal."],
        "Das passiert jedem, auch guten Schülern. Ein unbekanntes Wort ist kein Grund zur Sorge. Meistens brauchst du es für die Aufgabe gar nicht. Gefährlich wird es nur, wenn du darüber nachdenkst und dabei die nächsten zwei Sätze verpasst.",
        { tasks: [k("Du hörst: The express train to Leeds leaves at ten. Die Frage lautet: When does the train leave? Musst du express verstehen? ___", "Nein, gefragt ist nur die Uhrzeit.", ["Ja, sonst fehlt die Antwort."], "Die Frage will wissen, wann der Zug fährt. Das sagt at ten, und dafür brauchst du das andere Wort nicht.", "Wonach fragt die Frage? Welche Stelle im Satz antwortet darauf?")] },
      ),
    ),
    ch(
      "Uhrzeiten",
      b(
        "am und pm",
        [L("**7 am** = 7 Uhr morgens", "**7 pm** = 19 Uhr"), "am ist die Zeit **vor** dem Mittag, pm ist die Zeit **nach** dem Mittag."],
        "Im Englischen zählt man die Stunden meistens nur bis zwölf. Damit man weiß, ob der Morgen oder der Abend gemeint ist, kommt am oder pm dazu. Für die Zeit nach dem Mittag rechnest du einfach zwölf dazu. Aus 7 pm wird so 19 Uhr.",
        { tasks: [k("3 pm = ___ Uhr", "15", ["3"], "Pm ist nach dem Mittag. Drei plus zwölf ergibt fünfzehn.", "Ist pm vor oder nach dem Mittag? Was rechnest du dann dazu?")] },
      ),
      b(
        "half past",
        ["**half past ten** = 10:30", "Wörtlich heißt das: eine halbe Stunde **nach** zehn."],
        "Past bedeutet nach. Half past ten ist also eine halbe Stunde nach zehn Uhr. Das klingt einfach. Trotzdem ist das die Stelle, an der in jeder Prüfung die meisten Fehler passieren. Warum das so ist, siehst du auf der nächsten Tafel.",
      ),
      b(
        "Die Falle mit halb",
        [L("Englisch: *half past ten* = 10:30", "Deutsch: *halb elf* = 10:30"), "Das Englische nennt die Stunde, die **schon vorbei** ist."],
        "Im Deutschen sagst du halb elf und nennst damit die Stunde, die noch kommt. Im Englischen nennt man die Stunde, die schon angefangen hat. Wenn du half past ten hörst, darfst du also nicht halb zehn denken. Es ist halb elf.",
        { tasks: [k("half past nine = ___", "9:30", ["8:30", "10:30"], "Eine halbe Stunde nach neun. Auf Deutsch ist das halb zehn.", "Past heißt nach. Eine halbe Stunde nach welcher Stunde?")] },
      ),
      b(
        "quarter past und quarter to",
        [L("**quarter past nine** = 9:15", "**quarter to nine** = 8:45"), "past bedeutet **nach**, to bedeutet **vor**."],
        "A quarter ist ein Viertel, also eine Viertelstunde. Quarter past nine ist eine Viertelstunde nach neun. Quarter to nine ist eine Viertelstunde vor neun, also noch in der achten Stunde. Achte deshalb genau auf das kleine Wort in der Mitte.",
        { tasks: [k("quarter to six = ___", "5:45", ["6:15", "6:45"], "To heißt vor. Eine Viertelstunde vor sechs ist Viertel vor sechs.", "Bedeutet to nach oder vor? Liegt die Zeit dann vor oder nach sechs Uhr?")] },
      ),
      b(
        "Minuten mit past und to",
        [L("**ten past four** = 4:10", "**twenty to five** = 4:40"), "Bis zur halben Stunde sagt man **past**, danach **to**."],
        "Dieselben beiden Wörter benutzt man auch für einzelne Minuten. Ten past four sind zehn Minuten nach vier. Twenty to five sind zwanzig Minuten vor fünf. In der ersten halben Stunde zählt man von der Stunde weg, in der zweiten zählt man auf die nächste Stunde zu.",
      ),
      b(
        "Die kurze Art",
        [L("**ten thirty** = 10:30", "**six fifteen** = 6:15", "**five oh-nine** = 5:09"), "Die Null spricht man **oh**."],
        "Oft sagen Engländer die Uhrzeit auch einfach als zwei Zahlen hintereinander, so wie sie auf einer Digitaluhr steht. Das ist für dich die leichtere Form. Nur bei der Null musst du aufpassen. Man sagt meistens oh, wie den Buchstaben.",
        { tasks: [k("seven forty-five = ___", "7:45", ["7:54"], "Zuerst kommt die Stunde, dann kommen die Minuten: sieben und fünfundvierzig.", "Im Englischen sagt man die Zehner zuerst. Forty kommt vor five.")] },
      ),
      b(
        "Jetzt du: Uhrzeiten",
        "Tipp bei jedem Satz auf die richtige Uhrzeit.",
        "Drei Sätze, wie sie in einer Höraufgabe vorkommen. Lies sie dir am besten leise vor, damit du den Klang im Ohr hast. Achte auf half, quarter, past und to.",
        {
          tasks: [
            k("The film starts at half past seven. = ___", "7:30", ["6:30"], "Eine halbe Stunde nach sieben. Auf Deutsch ist das halb acht.", "Welche Stunde nennt das Englische: die vergangene oder die kommende?"),
            k("We meet at quarter past three. = ___", "3:15", ["2:45"], "Past heißt nach. Eine Viertelstunde nach drei.", "Steht in der Mitte past oder to? Was bedeutet das Wort?"),
            k("The shop opens at 8 am. = ___ Uhr", "8", ["20"], "Am ist vor dem Mittag, also morgens. Da rechnest du nichts dazu.", "Ist am die Zeit vor dem Mittag oder danach?"),
          ],
        },
      ),
    ),
    ch(
      "Zahlen, die ähnlich klingen",
      b(
        "thirteen oder thirty?",
        [L("thir**teen** = 13", "**thir**ty = 30"), "Bei -teen ist das **Ende** betont und lang."],
        "Diese beiden Zahlen klingen fast gleich, und das gilt für alle Paare von 13 und 30 bis 19 und 90. Der Unterschied liegt in der Betonung. Bei thirteen ist das Ende lang und kräftig. Bei thirty ist der Anfang kräftig, und das Ende ist ganz kurz.",
      ),
      b(
        "So hörst du den Unterschied",
        [L("four**TEEN** = 14", "**FOR**ty = 40"), L("six**TEEN** = 16", "**SIX**ty = 60")],
        "Sprich die Paare einmal laut und übertreibe dabei ruhig. FourTEEN mit einem langen Ende. FORty mit einem kurzen Ende. Wenn du den Unterschied selbst sprechen kannst, hörst du ihn auch. Beim zweiten Hören achtest du dann genau auf diese Stelle.",
        { tasks: [k("Du hörst SEVENty, mit Betonung am Anfang. Das ist ___.", "70", ["17"], "Ist der Anfang betont und das Ende kurz, dann ist es die Zehnerzahl.", "Welcher Teil des Wortes ist kräftig gesprochen: der Anfang oder das Ende?")] },
      ),
      b(
        "Telefonnummern",
        ["Jede Ziffer wird einzeln gesprochen.", "Die **0** heißt **oh**.", "Zwei gleiche Ziffern: **double five** = 55.", "*oh-seven-double four* = 0744"],
        "Telefonnummern liest man im Englischen Ziffer für Ziffer vor. Niemand sagt siebenhundertvierundvierzig. Die Null ist meistens oh. Und wenn dieselbe Ziffer zweimal hintereinander kommt, sagt man double davor. Double bedeutet doppelt.",
        { tasks: [k("double three = ___", "33", ["23"], "Double heißt doppelt. Die Drei kommt also zweimal.", "Was bedeutet double auf Deutsch? Wie oft kommt die Ziffer dann?")] },
      ),
      b(
        "Preise",
        [L("**£4.50** = *four pounds fifty*", "**£15** = *fifteen pounds*", "**50p** = *fifty pence*")],
        "In Großbritannien bezahlt man mit Pfund und Pence. Das Zeichen für Pfund sieht aus wie ein geschwungenes L. Bei einem Preis sagt man zuerst die Pfund und dann einfach die Zahl für die Pence. Achte auch hier auf fifteen und fifty.",
      ),
      b(
        "Jetzt du: Zahlen",
        "Tipp bei jedem Satz auf die richtige Zahl.",
        "Jetzt kommen Zahlen, wie du sie in einer Durchsage oder am Telefon hörst. Die großen Buchstaben zeigen dir, welcher Teil betont ist. Lies dir jede Zeile leise vor.",
        {
          tasks: [
            k("Platform fourTEEN = Gleis ___", "14", ["40"], "Das Ende ist betont und lang. Dann ist es die Zahl mit -teen.", "Welcher Teil ist groß geschrieben, also betont?"),
            k("It costs three pounds twenty. = ___", "£3.20", ["£320", "£3.02"], "Erst kommen die Pfund, dann die Pence: drei Pfund und zwanzig Pence.", "Was kommt nach dem Wort pounds: wieder Pfund oder die Pence?"),
            k("oh-two-nine = ___", "029", ["209"], "Oh ist die Null. Die Ziffern kommen in der Reihenfolge, in der du sie hörst.", "Welche Ziffer ist mit oh gemeint, und an welcher Stelle steht sie?"),
          ],
        },
      ),
    ),
    ch(
      "Daten und Jahre",
      b(
        "Der Tag im Monat",
        [L("**1st** = first", "**2nd** = second", "**3rd** = third"), "Ab der 4 hängt man **-th** an: fourth, fifth, sixth.", "*the fifth of May* = 5. Mai"],
        "Für ein Datum braucht man die Zahlen, mit denen man eine Reihenfolge angibt: der erste, der zweite, der dritte. Die ersten drei haben eigene Wörter. Alle anderen bekommen ein th ans Ende, das wie ein weiches s mit der Zunge zwischen den Zähnen klingt.",
      ),
      b(
        "Zwei Arten, ein Datum zu sagen",
        [L("*the first of May*", "*May the first*"), "Beides bedeutet: **1. Mai**."],
        "Im Englischen kann der Tag vor dem Monat stehen oder dahinter. Beides ist richtig, und beides kommt in Hörtexten vor. Du musst also auf zwei Wörter achten: auf den Monat und auf die Zahl mit dem th am Ende.",
        { tasks: [k("the third of June = ___", "3. Juni", ["30. Juni", "13. Juni"], "Third heißt der dritte. Thirtieth wäre der dreißigste.", "Schau auf die Tafel davor. Welche Zahl gehört zu third?")] },
      ),
      b(
        "Jahreszahlen",
        [L("**1998** = *nineteen ninety-eight*", "**2015** = *twenty fifteen*", "**2009** = *two thousand and nine*"), "Meistens teilt man die Zahl in der Mitte."],
        "Eine Jahreszahl spricht man fast immer als zwei Zahlen. Aus 1998 wird neunzehn und achtundneunzig. Nur die Jahre von 2000 bis 2009 sagt man mit thousand, weil twenty nine sonst wie neunundzwanzig klingen würde.",
        { tasks: [k("nineteen eighty-four = ___", "1984", ["1948"], "Neunzehn und vierundachtzig. Im Englischen kommen die Zehner zuerst: eighty, dann four.", "Welches Wort kommt zuerst: eighty oder four?")] },
      ),
      b(
        "Jetzt du: die Durchsage",
        ["Du hörst am Bahnhof:", "*The train to Leeds leaves at half past nine from platform fourteen.*"],
        "Das ist eine typische Höraufgabe. Gefragt sind zwei Dinge: die Abfahrtszeit und das Gleis. In diesem einen Satz stecken gleich zwei der Fallen, die du jetzt kennst. Lass dir Zeit.",
        {
          tasks: [
            k("Time: ___", "9:30", ["8:30", "10:30"], "Half past nine ist eine halbe Stunde nach neun, also halb zehn.", "Welche Stunde nennt das Englische bei half past: die vergangene oder die kommende?"),
            k("Platform: ___", "14", ["40"], "Fourteen endet auf -teen. Das Ende ist lang und betont.", "Endet das Wort auf -teen oder auf -ty?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Aufgabe lesen: Was wird gesucht?", "(2) **half past ten** ist halb elf.", "(3) **-teen** ist hinten betont, **-ty** vorn.", "(4) Die Null heißt **oh**."],
        "Mit diesen vier Punkten vermeidest du die häufigsten Fehler beim Hören. Und wie beim Lesen gilt: Wenn du unsicher bist, schreib trotzdem etwas hin. Eine leere Lücke bringt sicher keinen Punkt. Gleich kommen die Wörter und das Quiz.",
        { tasks: [k("quarter to eight = ___", "7:45", ["8:15"], "To heißt vor. Eine Viertelstunde vor acht.", "Bedeutet das Wort in der Mitte vor oder nach?")] },
      ),
    ),
  ],
  [
    v("am / pm", "Am ist die Zeit vor dem Mittag, pm die Zeit nach dem Mittag.", "7 pm = 19 Uhr"),
    v("half past", "Eine halbe Stunde nach der genannten Stunde.", "half past ten = 10:30"),
    v("quarter past / quarter to", "Eine Viertelstunde nach oder vor der genannten Stunde.", "quarter to nine = 8:45"),
    v("oh", "So spricht man die Null in Uhrzeiten und Telefonnummern.", "five oh-nine = 5:09"),
    v("double", "Doppelt: dieselbe Ziffer zweimal hintereinander.", "double five = 55"),
    v("pounds / pence", "Das britische Geld. Ein Pfund hat hundert Pence.", "four pounds fifty = £4.50"),
    v("first, second, third", "Der erste, der zweite, der dritte. Ab dem vierten mit th am Ende."),
  ],
  [
    q("Du hörst half past ten. Welche Uhrzeit ist das?", "10:30", ["9:30", "10:15", "11:30"], "Half past bedeutet eine halbe Stunde nach der genannten Stunde. Im Deutschen sagst du dazu halb elf."),
    q("Du hörst quarter to seven. Welche Uhrzeit ist das?", "6:45", ["7:15", "7:45", "6:15"], "To heißt vor. Eine Viertelstunde vor sieben liegt noch in der sechsten Stunde."),
    q("6 pm ist auf Deutsch", "18 Uhr", ["6 Uhr morgens", "16 Uhr", "12 Uhr"], "Pm ist die Zeit nach dem Mittag. Du rechnest zwölf Stunden dazu."),
    q("Du hörst fifTEEN, mit einem langen, betonten Ende. Welche Zahl ist das?", "15", ["50", "5", "55"], "Bei den Zahlen auf -teen ist das Ende betont. Bei fifty wäre der Anfang betont und das Ende kurz."),
    q("Du hörst oh-seven-double two. Welche Nummer ist das?", "0722", ["0702", "722", "0727"], "Oh ist die Null, und double two bedeutet, dass die Zwei zweimal kommt."),
    q("Du hörst the second of March. Welches Datum ist das?", "2. März", ["22. März", "12. März", "2. Mai"], "Second heißt der zweite. March ist der März, May wäre der Mai."),
    q("Du hörst twenty twelve. Welches Jahr ist das?", "2012", ["2020", "1212", "2112"], "Jahreszahlen teilt man in der Mitte. Twenty ist die erste Hälfte, twelve die zweite."),
    q("Was machst du in der Lesezeit vor dem Hören?", "Die Aufgaben lesen und schauen, was gesucht wird", ["Die Augen schließen und warten", "Schon einmal raten", "Den Aufgabenzettel umdrehen"], "Wer weiß, ob eine Uhrzeit, eine Zahl oder ein Name gesucht wird, hört diese Stelle viel leichter heraus."),
  ],
);
