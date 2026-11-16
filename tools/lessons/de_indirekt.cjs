// Guided lesson: direct and indirect speech.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_07e_indirekt.json",
  {
    id: "P_DE_INDIREKT",
    subject: "DE",
    title: "Direkte und indirekte Rede",
    teaser: "Wie du wiedergibst, was jemand gesagt hat, ohne seine Worte in Anführungszeichen zu setzen. In vier Schritten vom wörtlichen Satz zur indirekten Rede, dazu Fragen und Aufforderungen.",
    hook: "Stell dir vor, deine Freundin erzählt dir etwas, und du sagst es später jemand anderem weiter. Du wiederholst nicht ihre genauen Worte, sondern berichtest, was sie gesagt hat. Das machst du jeden Tag. In der Prüfung sollst du genau das schriftlich tun, und dafür gibt es vier feste Schritte.",
    outro: "Du kannst jetzt einen wörtlichen Satz in einen berichteten Satz verwandeln. Die Zeichen fallen weg, die Person wird angepasst, und das Verb steht im Konjunktiv I. Wenn man den Konjunktiv I nicht hört, nimmst du den Konjunktiv II. Fragen bekommen ob oder ihr Fragewort, Aufforderungen bekommen sollen.",
    requires: ["P_DE_WORTARTEN", "P_DE_SATZ", "P_DE_KOMMA2", "P_DE_MODUS"],
  },
  [
    ch(
      "Zwei Arten, etwas wiederzugeben",
      b(
        "Wörtlich oder berichtet",
        [L("Lena sagt: „Ich bin krank.“", "Das ist die wörtliche Rede. Man nennt sie auch **direkte Rede**."), L("Lena sagt, sie sei krank.", "Das ist die indirekte Rede.")],
        "Beide Sätze geben wieder, was Lena gesagt hat. Im ersten Satz hörst du Lena selbst sprechen. Ihre Worte stehen in Anführungszeichen. Im zweiten Satz berichtet jemand anders darüber. Lenas Worte sind in den Satz des Berichtenden eingebaut.",
      ),
      b(
        "Was sich ändert",
        ["(1) Doppelpunkt und Anführungszeichen fallen weg.", "(2) Aus **ich** wird **sie**.", "(3) Aus **bin** wird **sei**."],
        "Halte die beiden Sätze von eben nebeneinander. Drei Dinge haben sich verändert. Die Zeichen sind verschwunden, und an ihrer Stelle steht ein Komma. Lena sagt ich, aber wer über sie berichtet, muss sie sagen. Und das Verb steht im Konjunktiv I, weil der Berichtende nur weitergibt.",
      ),
      b(
        "Wozu du das brauchst",
        ["In Zeitungsberichten und Protokollen.", "In jeder Zusammenfassung eines Textes.", "In der Prüfung: *Formulieren Sie den Satz so um, dass er keine direkte Rede enthält.*"],
        "Die indirekte Rede brauchst du immer dann, wenn du über etwas berichtest, das jemand gesagt hat. In einer Zusammenfassung darfst du zum Beispiel keine wörtlichen Zitate aneinanderreihen. Und in der Prüfung gibt es dazu eine eigene Aufgabe.",
        { tasks: [k("Welcher Satz enthält keine direkte Rede? ___", "Lea sagt, sie komme später.", ["Lea sagt: „Ich komme später.“"], "In diesem Satz fehlen Doppelpunkt und Anführungszeichen. Leas Worte werden nur wiedergegeben.", "In welchem Satz stehen Anführungszeichen? Der andere ist gesucht.")] },
      ),
      b(
        "Jetzt du: direkt oder indirekt?",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Schau bei jedem Satz, ob Anführungszeichen dastehen und ob das Verb im Konjunktiv I steht. Daran erkennst du die beiden Arten.",
        {
          tasks: [
            k("Tom ruft: „Ich habe gewonnen!“ Das ist ___.", "direkte Rede", ["indirekte Rede"], "Toms genaue Worte stehen in Anführungszeichen.", "Schau genau hin: Stehen im Satz Anführungszeichen oder nicht?"),
            k("Tom sagt, er habe gewonnen. Das ist ___.", "indirekte Rede", ["direkte Rede"], "Es gibt keine Anführungszeichen, und das Verb steht im Konjunktiv I.", "Spricht Tom hier selbst, oder berichtet jemand über ihn?"),
          ],
        },
      ),
    ),
    ch(
      "Umformen in vier Schritten",
      b(
        "Schritt 1: die Zeichen entfernen",
        ["Tom sagt**:** **„**Ich habe Hunger.**“**", "Tom sagt**,** …", "Aus dem Doppelpunkt wird ein Komma."],
        "Du fängst mit dem Einfachsten an. Der Begleitsatz bleibt, wie er ist. Der Doppelpunkt wird zu einem Komma, und die Anführungszeichen streichst du. Jetzt hast du den Anfang deines neuen Satzes: Tom sagt, und dann geht es weiter.",
      ),
      b(
        "Schritt 2: die Person anpassen",
        [L("ich wird zu **er** oder **sie**", "mein wird zu **sein** oder **ihr**", "wir wird zu **sie**")],
        "Tom sagt ich, aber du bist nicht Tom. Du musst also er sagen. Dasselbe gilt für alle Wörter, die auf den Sprecher zeigen. Aus mein Bruder wird sein Bruder. Aus wir wird sie. Frag dich immer: Wer ist mit dem Wort gemeint?",
        { tasks: [k("Mia sagt: „Ich bin müde.“ In der indirekten Rede wird aus ich das Wort ___.", "sie", ["ich"], "Jemand anders spricht über Mia, und Mia ist ein Mädchen.", "Wer berichtet hier, und über wen wird berichtet?")] },
      ),
      b(
        "Schritt 3: das Verb in den Konjunktiv I setzen",
        [L("ich bin: er **sei**", "ich habe: er **habe**", "ich komme: er **komme**")],
        "Jetzt kommt das Verb. Du setzt es in den Konjunktiv I, den du aus der Lektion über den Modus kennst. Meistens nimmst du den Infinitiv und lässt das n weg. Nur sein ist anders und heißt sei. Damit zeigst du, dass du nur weitergibst.",
        { tasks: [k("Tom sagt, er ___ Hunger.", "habe", ["hat"], "In der indirekten Rede steht das Verb im Konjunktiv I.", "Welche der beiden Formen zeigt, dass du nur weitergibst, was Tom gesagt hat?")] },
      ),
      b(
        "Schritt 4: Du darfst dass benutzen",
        ["*Tom sagt, er habe Hunger.*", "*Tom sagt, **dass** er Hunger habe.*", "Beides ist richtig. Mit dass rückt das Verb ans Ende."],
        "Du kannst den berichteten Teil mit dass beginnen. Dann wird er zu einem Nebensatz, und das Verb wandert ans Ende. Ohne dass bleibt das Verb an zweiter Stelle. Beide Formen sind in der Prüfung richtig. Such dir die aus, die dir leichter fällt.",
      ),
      b(
        "Ein Beispiel, Schritt für Schritt",
        ["Lena sagt: „Ich gehe mit meinem Bruder ins Kino.“", "Lena sagt, **sie gehe** mit **ihrem** Bruder ins Kino."],
        "Ich gehe den Satz für dich durch. Zuerst nehme ich Doppelpunkt und Anführungszeichen weg und setze ein Komma. Dann mache ich aus ich sie und aus meinem ihrem. Zum Schluss setze ich das Verb in den Konjunktiv I: aus gehe wird gehe, die Form bleibt hier gleich.",
      ),
      b(
        "Wenn man den Konjunktiv I nicht hört",
        ["Die Kinder sagen: „Wir haben Hunger.“", "Die Kinder sagen, sie **hätten** Hunger.", "Hier nimmt man den Konjunktiv II als Ersatz."],
        "Bei sie in der Mehrzahl sieht der Konjunktiv I aus wie die normale Form: sie haben. Niemand würde merken, dass du nur berichtest. Deshalb nimmst du dann den Konjunktiv II. Aus haben wird hätten, aus müssen wird müssten, aus kommen wird kämen oder würden kommen.",
        { tasks: [k("Die Eltern sagen: „Wir müssen los.“ Indirekt: Die Eltern sagen, sie ___ los.", "müssten", ["müssen"], "Bei sie in der Mehrzahl nimmt man den Konjunktiv II als Ersatz.", "Bei welcher Form hört man, dass etwas nur weitergegeben wird?")] },
      ),
      b(
        "Jetzt du: umformen",
        "Tipp bei jedem Satz auf die richtige Umformung.",
        "Geh bei jedem Satz die vier Schritte durch. Zeichen weg, Person anpassen, Verb in den Konjunktiv. Achte darauf, wer spricht und über wen berichtet wird.",
        {
          tasks: [
            k("Ben sagt: „Ich bin fertig.“ Indirekt: Ben sagt, er ___ fertig.", "sei", ["bin"], "Aus bin wird im Konjunktiv I diese Form.", "Dieses Verb ist unregelmäßig. Schau in die erste Zeile der Tafel zu Schritt 3."),
            k("Sara sagt: „Mein Hund ist krank.“ Indirekt: Sara sagt, ___ Hund sei krank.", "ihr", ["mein"], "Der Hund gehört Sara. Wer über sie berichtet, muss das Wort anpassen.", "Wem gehört der Hund? Wie sagt das jemand, der über Sara berichtet?"),
            k("Paul sagt: „Ich komme später.“ Indirekt: Paul sagt, er ___ später.", "komme", ["kommt"], "Im Konjunktiv I endet die Form auf e.", "Nimm den Infinitiv und lass das n weg. Was bleibt übrig?"),
          ],
        },
      ),
    ),
    ch(
      "Fragen und Aufforderungen",
      b(
        "Fragen ohne Fragewort bekommen ob",
        ["Er fragt: „Kommst du mit?“", "Er fragt, **ob** ich mitkomme."],
        "Auch Fragen kann man berichten. Wenn die Frage mit dem Verb beginnt und man mit ja oder nein antworten kann, brauchst du das Wort ob. Das Fragezeichen fällt weg, denn der neue Satz ist keine Frage mehr. Er ist ein Bericht über eine Frage.",
      ),
      b(
        "Fragen mit Fragewort behalten es",
        ["Sie fragt: „Wo wohnst du?“", "Sie fragt, **wo** ich wohne."],
        "Beginnt die Frage mit einem Fragewort wie wo, wann, warum oder wie, behältst du dieses Wort. Es leitet dann den Nebensatz ein, und das Verb rückt ans Ende. Auch hier steht am Schluss ein Punkt und kein Fragezeichen.",
        { tasks: [k("Sie fragt: „Hast du Zeit?“ Indirekt: Sie fragt, ___ ich Zeit habe.", "ob", ["dass"], "Die Frage beginnt mit dem Verb und hat kein Fragewort.", "Beginnt die Frage mit einem Fragewort oder mit dem Verb?")] },
      ),
      b(
        "Aufforderungen bekommen sollen",
        ["Er sagt: „Komm her!“", "Er sagt, ich **solle** herkommen."],
        "Einen Befehl kannst du nicht einfach in den Konjunktiv setzen. Du brauchst das Verb sollen. Aus Komm her wird: ich solle herkommen. Das Ausrufezeichen fällt weg. Bei einer höflichen Bitte kannst du auch mögen nehmen: Er bat, ich möge warten.",
        { tasks: [k("Die Lehrerin sagt: „Seid leise!“ Indirekt: Sie sagt, wir ___ leise sein.", "sollten", ["sind"], "Eine Aufforderung gibt man mit einer Form von sollen wieder.", "Welches Verb drückt aus, dass jemand etwas tun soll?")] },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Doppelpunkt und Anführungszeichen entfernen.", "(2) Die Person anpassen: aus ich wird er oder sie.", "(3) Das Verb in den **Konjunktiv I** setzen.", "(4) Fragen mit **ob** oder Fragewort, Aufforderungen mit **sollen**."],
        "Das sind die vier Schritte auf einen Blick. Wenn du sie der Reihe nach abarbeitest, kann wenig schiefgehen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Jan sagt: „Ich habe Hunger.“ Indirekt: ___", "Jan sagt, er habe Hunger.", ["Jan sagt, ich habe Hunger."], "Aus ich wird er, und das Verb steht im Konjunktiv I.", "Wer hat Hunger? Welches Wort muss deshalb für ich stehen?")] },
      ),
    ),
  ],
  [
    v("direkte Rede", "Die genauen Worte einer Person in Anführungszeichen. Dasselbe wie wörtliche Rede.", "Lena sagt: „Ich bin krank.“"),
    v("indirekte Rede", "Man berichtet, was jemand gesagt hat, ohne Anführungszeichen und mit dem Konjunktiv I.", "Lena sagt, sie sei krank."),
    v("ob", "Leitet eine berichtete Frage ein, die kein Fragewort hat.", "Er fragt, ob ich mitkomme."),
    v("sollen", "Mit diesem Verb gibt man eine Aufforderung wieder.", "Er sagt, ich solle herkommen."),
  ],
  [
    q("Wie heißt die indirekte Rede zu: Anna sagt: „Ich bin müde.“?", "Anna sagt, sie sei müde.", ["Anna sagt, ich bin müde.", "Anna sagt: sie ist müde.", "Anna sagt, sie war müde."], "Die Zeichen fallen weg, aus ich wird sie, und das Verb steht im Konjunktiv I: sei."),
    q("Wie heißt die indirekte Rede zu: Er sagt: „Ich habe keine Zeit.“?", "Er sagt, er habe keine Zeit.", ["Er sagt, ich habe keine Zeit.", "Er sagt, er hat gehabt keine Zeit.", "Er sagt: „Er habe keine Zeit.“"], "Aus ich wird er, und aus habe wird der Konjunktiv I habe. Die Anführungszeichen entfallen."),
    q("Sie fragt: „Kommst du morgen?“ Wie berichtest du das?", "Sie fragt, ob ich morgen komme.", ["Sie fragt, dass ich morgen komme.", "Sie fragt, kommst du morgen.", "Sie fragt, wo ich morgen komme."], "Die Frage hat kein Fragewort. Dann leitet ob den berichteten Teil ein."),
    q("Er fragt: „Wann beginnt der Film?“ Wie berichtest du das?", "Er fragt, wann der Film beginne.", ["Er fragt, ob der Film beginne.", "Er fragt, dass der Film beginnt wann.", "Er fragt: wann beginnt der Film."], "Das Fragewort wann bleibt erhalten, und das Verb rückt ans Ende."),
    q("Die Schüler sagen: „Wir haben das verstanden.“ Welche Form ist richtig?", "Die Schüler sagen, sie hätten das verstanden.", ["Die Schüler sagen, sie haben das verstanden.", "Die Schüler sagen, wir hätten das verstanden.", "Die Schüler sagen, sie habe das verstanden."], "Bei sie in der Mehrzahl klingt der Konjunktiv I wie die normale Form. Deshalb nimmt man den Konjunktiv II."),
    q("Der Trainer sagt: „Lauft schneller!“ Wie berichtest du das?", "Der Trainer sagt, wir sollten schneller laufen.", ["Der Trainer sagt, lauft schneller.", "Der Trainer sagt, dass wir schneller liefen.", "Der Trainer sagt, ob wir schneller laufen."], "Eine Aufforderung gibt man mit einer Form von sollen wieder."),
    q("Was passiert mit dem Doppelpunkt der direkten Rede?", "Er wird zu einem Komma.", ["Er bleibt stehen.", "Er wird zu einem Punkt.", "Er wird zu einem Fragezeichen."], "Der Begleitsatz bleibt, und nach ihm steht in der indirekten Rede ein Komma."),
  ],
);
