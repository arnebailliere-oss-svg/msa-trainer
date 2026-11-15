// Guided lesson: Partizip I and II.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_07c_partizip.json",
  {
    id: "P_DE_PARTIZIP",
    subject: "DE",
    title: "Partizip I und Partizip II",
    teaser: "Zwei besondere Formen des Verbs: lachend und gelacht. Du lernst, wie sie gebildet werden, was sie bedeuten und wie du sie in einem Satz unterscheidest.",
    hook: "Das Wort Partizip klingt nach schwieriger Grammatik. Dabei benutzt du beide Formen ständig. Wenn du sagst, das kochende Wasser oder das gekochte Ei, dann sind das die zwei Partizipien. Der Unterschied zwischen ihnen ist klein und sehr logisch. Du wirst ihn in wenigen Minuten verstanden haben.",
    outro: "Du kennst jetzt beide Partizipien. Das Partizip I endet auf end und bedeutet, dass etwas gerade geschieht. Das Partizip II beginnt meistens mit ge und bedeutet, dass etwas fertig ist. Beide können wie ein Adjektiv vor einem Nomen stehen und bekommen dann eine Endung.",
    requires: ["P_DE_WORTARTEN", "P_DE_ZEITFORMEN"],
  },
  [
    ch(
      "Das Partizip II",
      b(
        "Du kennst es schon",
        ["ich habe **gelacht**", "ich bin **gegangen**", "Diese Form heißt genauer **Partizip** II."],
        "In der Lektion über die Zeitformen ist dir diese Form schon begegnet. Sie steht im Perfekt hinter haben oder sein. Weil es zwei Partizipien gibt, bekommt dieses die Nummer zwei. Wir fangen mit ihm an, weil du es am besten kennst.",
      ),
      b(
        "So wird es gebildet",
        [L("lachen: **ge**lach**t**", "Schwache Verben enden auf -t."), L("gehen: **ge**gang**en**", "Starke Verben enden auf -en.")],
        "Das Partizip II hat fast immer die zwei Buchstaben ge am Anfang. Am Ende steht bei schwachen Verben ein t und bei starken Verben ein en. Bei den starken Verben ändert sich oft auch der Laut in der Mitte: gehen, gegangen. Singen, gesungen.",
        { tasks: [k("Das Partizip II von kaufen heißt ___.", "gekauft", ["gekaufen"], "Kaufen ist ein schwaches Verb. Sein Partizip II endet auf t.", "Wie sagst du es im Perfekt: Ich habe etwas …?")] },
      ),
      b(
        "Manchmal ohne ge",
        [L("telefonieren: **telefoniert**", "besuchen: **besucht**", "verstehen: **verstanden**", "erzählen: **erzählt**")],
        "Zwei Gruppen von Verben bekommen kein ge. Die erste Gruppe sind Verben, die auf ieren enden. Die zweite Gruppe sind Verben, die mit be, ver, er, ent oder zer beginnen. Niemand sagt gebesucht. Dein Sprachgefühl hilft dir hier zuverlässig.",
        { tasks: [k("Das Partizip II von besuchen heißt ___.", "besucht", ["gebesucht"], "Verben, die mit be beginnen, bekommen kein ge.", "Sprich beide Formen laut. Welche klingt richtig?")] },
      ),
      b(
        "Es bedeutet: Das ist fertig",
        ["das **gebackene** Brot", "das **gekochte** Ei", "Das Backen und das Kochen sind abgeschlossen."],
        "Das Partizip II kann auch vor einem Nomen stehen, so wie ein Adjektiv. Dann bekommt es eine Endung. Es sagt dir, dass etwas schon geschehen ist. Das Brot ist fertig gebacken. Das Ei ist fertig gekocht. Niemand ist mehr dabei, es zu tun.",
      ),
      b(
        "Jetzt du: Partizip II bilden",
        "Tipp bei jedem Verb auf das richtige Partizip II.",
        "Überleg bei jedem Verb, wie du im Perfekt sagen würdest. Ich habe etwas getan. Die Form am Ende ist das Partizip II.",
        {
          tasks: [
            k("schreiben: Ich habe einen Brief ___.", "geschrieben", ["geschreibt"], "Schreiben ist ein starkes Verb. Sein Partizip II endet auf en.", "Wie sagst du es ganz natürlich im Perfekt?"),
            k("spielen: Wir haben Fußball ___.", "gespielt", ["gespielen"], "Spielen ist ein schwaches Verb. Sein Partizip II endet auf t.", "Wie sagst du es ganz natürlich im Perfekt?"),
            k("vergessen: Ich habe es ___.", "vergessen", ["gevergessen"], "Verben, die mit ver beginnen, bekommen kein ge.", "Beginnt das Verb mit be, ver oder er? Was gilt dann?"),
          ],
        },
      ),
    ),
    ch(
      "Das Partizip I",
      b(
        "Die lachenden Kinder",
        ["Die Kinder **lachen**.", "die **lachenden** Kinder", "Die Form mit -end heißt Partizip I."],
        "Jetzt kommt das zweite Partizip. Es entsteht, wenn du aus einem Verb ein Wort machst, das ein Nomen beschreibt. Was für Kinder sind es? Lachende Kinder. Sie lachen in diesem Moment. Das Partizip I zeigt immer, dass jemand gerade dabei ist.",
      ),
      b(
        "So wird es gebildet",
        [L("lachen: lachen**d**", "schlafen: schlafen**d**", "laufen: laufen**d**"), "Du hängst an den Infinitiv ein **d**."],
        "Das Partizip I ist ganz leicht zu bilden. Du nimmst die Grundform des Verbs und hängst ein d an. Das funktioniert bei jedem Verb gleich. Es gibt hier keine starken und schwachen Verben und keine Ausnahmen.",
        { tasks: [k("Das Partizip I von schlafen heißt ___.", "schlafend", ["geschlafen"], "An den Infinitiv wird ein d gehängt.", "Welche der beiden Formen endet auf end?")] },
      ),
      b(
        "Es bedeutet: Das geschieht gerade",
        [L("das **kochende** Wasser", "Es kocht in diesem Moment."), L("das **gekochte** Ei", "Es ist fertig gekocht.")],
        "Hier siehst du beide Partizipien nebeneinander. Das kochende Wasser sprudelt gerade im Topf. Das gekochte Ei liegt fertig auf dem Teller. Der Unterschied ist also die Zeit: gerade dabei oder schon fertig.",
        { tasks: [k("Das Wasser kocht gerade. Es ist ___ Wasser.", "kochendes", ["gekochtes"], "Es geschieht in diesem Moment. Dafür steht das Partizip I.", "Kocht das Wasser noch, oder ist es schon fertig?")] },
      ),
      b(
        "Es verhält sich wie ein Adjektiv",
        [L("ein lachend**es** Kind", "die lachend**en** Kinder", "der bellend**e** Hund")],
        "Vor einem Nomen bekommt das Partizip dieselben Endungen wie ein Adjektiv. Es wird auch kleingeschrieben wie ein Adjektiv. Das gilt für beide Partizipien. Die Endung richtet sich nach dem Nomen, das danach kommt.",
      ),
      b(
        "Jetzt du: Partizip I oder II?",
        "Tipp bei jedem Ausdruck auf das richtige Partizip.",
        "Frag dich bei jedem Ausdruck: Geschieht es gerade, oder ist es schon fertig? Schau auch auf die Form. Endet das Wort auf end, oder beginnt es mit ge?",
        {
          tasks: [
            k("der schlafende Hund: Das ist Partizip ___.", "I", ["II"], "Der Hund schläft gerade, und die Form endet auf end.", "Schläft der Hund noch? Wie endet der Kern des Wortes?"),
            k("die geöffnete Tür: Das ist Partizip ___.", "II", ["I"], "Das Öffnen ist abgeschlossen, und die Form beginnt mit ge.", "Ist das Öffnen schon vorbei? Womit beginnt das Wort?"),
            k("ein weinendes Kind: Das ist Partizip ___.", "I", ["II"], "Das Kind weint in diesem Moment, und die Form endet auf end.", "Weint das Kind gerade, oder hat es schon aufgehört?"),
          ],
        },
      ),
    ),
    ch(
      "Beide unterscheiden",
      b(
        "Der Unterschied auf einen Blick",
        [L("**Partizip I**: Infinitiv und d", "Es geschieht gerade: *lachend*"), L("**Partizip II**: meistens ge und -t oder -en", "Es ist fertig: *gelacht*")],
        "Hier siehst du beide noch einmal nebeneinander. Du hast zwei Erkennungszeichen. Das erste ist die Form: end am Ende oder ge am Anfang. Das zweite ist die Bedeutung: gerade dabei oder schon fertig. Meistens zeigen beide Zeichen in dieselbe Richtung.",
      ),
      b(
        "Beide in einem Satz",
        ["*Der **bellende** Hund jagte die **erschrockene** Katze.*", L("bellend: Der Hund bellt dabei.", "erschrocken: Der Schreck ist schon geschehen.")],
        "In diesem Satz stehen beide Partizipien. Der Hund bellt, während er jagt, also Partizip I. Die Katze ist bereits erschrocken, also Partizip II. Erschrocken hat kein ge, weil das Verb mit er beginnt. Das hast du in dieser Lektion schon gelernt.",
        { tasks: [k("die erschrockene Katze: Das ist Partizip ___.", "II", ["I"], "Der Schreck ist schon geschehen. Das Verb erschrecken bekommt kein ge.", "Ist der Schreck schon geschehen? Endet das Wort auf end?")] },
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Überleg bei jedem Satz, ob etwas gerade geschieht oder schon abgeschlossen ist. Danach wählst du die passende Form.",
        {
          tasks: [
            k("Das ___ Baby wurde in den Arm genommen.", "schreiende", ["geschriene"], "Das Baby schreit in diesem Moment.", "Schreit das Baby noch, während man es nimmt?"),
            k("Der ___ Kuchen stand auf dem Tisch.", "gebackene", ["backende"], "Der Kuchen ist fertig. Niemand backt ihn mehr.", "Ist der Kuchen schon fertig, oder wird er gerade gebacken?"),
            k("Sie sah den ___ Zug nur noch von hinten.", "abfahrenden", ["abgefahrenen und stehenden"], "Der Zug fährt in diesem Moment ab.", "Fährt der Zug gerade los, während sie ihn sieht?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) **Partizip I**: Infinitiv und d. Es geschieht gerade.", "(2) **Partizip II**: ge und -t oder -en. Es ist fertig.", "(3) Vor einem Nomen bekommen beide eine Endung wie ein Adjektiv."],
        "Das ist alles, was du über die Partizipien wissen musst. In der Prüfung sollst du sie meistens nur erkennen und benennen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Woran erkennst du das Partizip I? ___", "Es endet auf end.", ["Es beginnt mit ge."], "An den Infinitiv wird ein d gehängt, zum Beispiel lachend.", "Welche Form hast du bei lachend und schlafend gesehen?")] },
      ),
    ),
  ],
  [
    v("Partizip I", "Infinitiv und d. Es zeigt, dass etwas gerade geschieht.", "lachend, schlafend"),
    v("Partizip II", "Meistens ge am Anfang und -t oder -en am Ende. Es zeigt, dass etwas fertig ist.", "gelacht, gegangen"),
    v("ohne ge", "Verben auf ieren und Verben mit be, ver, er, ent, zer bilden das Partizip II ohne ge.", "telefoniert, besucht, verstanden"),
  ],
  [
    q("Welche Form ist das Partizip I von singen?", "singend", ["gesungen", "sang", "singt"], "Das Partizip I bildest du aus dem Infinitiv und einem d: singen, singend."),
    q("Welche Form ist das Partizip II von singen?", "gesungen", ["singend", "gesingt", "sang"], "Singen ist ein starkes Verb. Sein Partizip II beginnt mit ge und endet auf en."),
    q("die untergehende Sonne: Welches Partizip ist das?", "Partizip I", ["Partizip II", "kein Partizip", "ein Infinitiv"], "Die Sonne geht in diesem Moment unter, und die Form endet auf end."),
    q("das gestohlene Fahrrad: Welches Partizip ist das?", "Partizip II", ["Partizip I", "kein Partizip", "ein Nomen"], "Der Diebstahl ist schon geschehen, und die Form beginnt mit ge."),
    q("Welches Partizip II ist richtig?", "verloren", ["geverloren", "verlorend", "verlierend"], "Verlieren beginnt mit ver. Solche Verben bilden das Partizip II ohne ge."),
    q("Was bedeutet das Partizip I?", "Etwas geschieht gerade.", ["Etwas ist schon fertig.", "Etwas wird befohlen.", "Etwas ist nur vorgestellt."], "Lachend, laufend, kochend: Jemand ist in diesem Moment dabei."),
    q("Wie wird ein Partizip vor einem Nomen geschrieben?", "klein und mit Endung, wie ein Adjektiv", ["groß, wie ein Nomen", "immer ohne Endung", "zusammen mit dem Nomen"], "Vor einem Nomen verhält sich das Partizip wie ein Adjektiv: die lachenden Kinder."),
  ],
);
