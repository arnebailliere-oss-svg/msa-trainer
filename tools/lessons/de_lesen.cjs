// Guided lesson: reading a factual text (question first, main statement, true/false/not in the text, quoting).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_06_lesen.json",
  {
    id: "P_DE_LESEN",
    subject: "DE",
    title: "Einen Sachtext richtig lesen",
    teaser: "Wie du an eine Leseaufgabe herangehst: erst die Frage, dann die Stelle im Text, dann genau vergleichen. Dazu die Kernaussage, die Aufgabe richtig, falsch oder steht nicht im Text, und das richtige Zitieren mit Zeilenangabe.",
    hook: "Die Leseaufgaben sehen nach viel Text aus, und viele fangen an zu lesen und hoffen, dass etwas hängen bleibt. Das ist anstrengend und unsicher. Es geht viel leichter, wenn du weißt, wonach du suchst. Dann liest du nicht mehr alles gleich genau, sondern findest gezielt die Stelle, die du brauchst.",
    outro: "Du hast jetzt eine feste Vorgehensweise für Leseaufgaben. Du liest zuerst die Frage, suchst die Stelle im Text und vergleichst genau. Du kannst die Kernaussage von Einzelheiten unterscheiden. Du weißt, was der Unterschied zwischen falsch und steht nicht im Text ist. Und du kannst eine Textstelle richtig zitieren.",
  },
  [
    ch(
      "Erst die Frage, dann der Text",
      b(
        "Texte über die Wirklichkeit",
        ["Zeitungsartikel, Berichte und Kommentare", "Ein Text, der über etwas Wirkliches informiert, heißt **Sachtext**."],
        "In der Prüfung bekommst du meistens einen Sachtext. Das ist ein Text über ein Thema aus der Wirklichkeit, zum Beispiel über Schule, Umwelt oder Medien. Er erzählt keine erfundene Geschichte. Er will dir etwas erklären oder dich von etwas überzeugen.",
      ),
      b(
        "Drei Schritte für jede Frage",
        ["(1) Die **Frage** lesen.", "(2) Die **Stelle** im Text suchen.", "(3) Genau **vergleichen**."],
        "Diese drei Schritte sind das Wichtigste der ganzen Lektion. Du gehst sie bei jeder einzelnen Frage durch. Du beginnst nie mit dem Text, sondern immer mit der Frage. Sie sagt dir, wonach du suchen sollst.",
      ),
      b(
        "Die Frage genau lesen",
        ["Frage: *Welche Hürde nennen Jugendliche am häufigsten?*", "Wichtige Wörter: **Hürde** und **am häufigsten**"],
        "Unterstreiche in der Frage die Wörter, die wirklich etwas bedeuten. Hier sind es Hürde und am häufigsten. Eine Hürde ist ein Hindernis. Am häufigsten sagt dir, dass nicht irgendein Hindernis gesucht ist, sondern das, das am meisten genannt wird.",
        { tasks: [k("Frage: Wie viele Schulen nehmen an dem Projekt teil? Du suchst im Text nach ___.", "einer Zahl", ["einem Grund"], "Wie viele fragt nach einer Anzahl. Also suchst du im Text eine Zahl.", "Welche Art von Antwort verlangen die Wörter wie viele?")] },
      ),
      b(
        "Die Stelle finden",
        ["Im Text steht: *Es gibt allerdings auch Hürden. Am häufigsten nennen Jugendliche Zeitmangel.*", "Die Wörter aus der Frage stehen fast genauso im Text."],
        "Jetzt lässt du die Augen über den Text wandern und suchst nur die unterstrichenen Wörter. Du musst dabei nicht jeden Satz verstehen. Sobald du die Stelle gefunden hast, liest du sie langsam und genau. Meistens steht die Antwort direkt daneben.",
        { tasks: [k("Die Antwort auf die Frage lautet: ___", "Zeitmangel", ["Geldmangel"], "Dieses Wort steht im Text direkt nach am häufigsten nennen Jugendliche.", "Welches Wort folgt im Text auf am häufigsten nennen Jugendliche?")] },
      ),
      b(
        "Zeilen und Absätze",
        ["Am Rand des Textes stehen **Zeilennummern**.", "Ein Abschnitt zwischen zwei Lücken heißt **Absatz**.", "So kannst du genau sagen, wo etwas steht: *(Z. 12)*"],
        "Prüfungstexte haben am Rand kleine Zahlen. Sie zählen die Zeilen. Mit ihnen kannst du eine Stelle genau angeben, zum Beispiel Zeile zwölf. Die Fragen folgen fast immer der Reihenfolge des Textes. Die Antwort auf die erste Frage steht also meistens weit oben.",
      ),
    ),
    ch(
      "Kernaussage und Absicht",
      b(
        "Kernaussage oder Einzelheit?",
        [L("**Kernaussage**: Jugendliche lernen besser, wenn die Schule später beginnt.", "**Einzelheit**: Eine Schule in Niedersachsen beginnt um 8:50 Uhr.")],
        "Die Kernaussage ist das, was der Text insgesamt sagen will. Sie passt zum ganzen Text. Eine Einzelheit ist eine Zahl, ein Name oder ein Beispiel. Sie passt nur zu einer Stelle. In der Prüfung wird oft nach der Kernaussage gefragt, und unter den Antworten stehen viele Einzelheiten.",
      ),
      b(
        "Die Probe mit dem einen Satz",
        ["Stell dir vor, du dürftest nur **einen Satz** behalten.", "Welcher würde den ganzen Text am besten zusammenfassen?"],
        "Mit dieser Frage findest du die Kernaussage. Geh die Antworten durch und frag dich bei jeder: Fasst dieser Satz den ganzen Text zusammen, oder gilt er nur für einen Absatz? Wenn er nur für eine Stelle gilt, ist er eine Einzelheit und nicht die Kernaussage.",
      ),
      b(
        "Wo die Kernaussage oft steht",
        ["In der **Überschrift**.", "Am **Anfang** oder am **Ende** des Textes.", "Nach Wörtern wie *insgesamt, deshalb, klar ist*."],
        "Die Überschrift verrät oft schon das Thema und manchmal sogar die Meinung. Der Anfang stellt meistens die Frage, das Ende gibt die Antwort. Schau deshalb zuerst an diesen drei Stellen nach, bevor du den ganzen Text absuchst.",
        { tasks: [k("Eine Schule in Niedersachsen beginnt um 8:50 Uhr. Das ist ___.", "eine Einzelheit", ["die Kernaussage"], "Der Satz nennt ein einzelnes Beispiel mit Ort und Uhrzeit.", "Gilt der Satz für den ganzen Text oder nur für ein Beispiel?")] },
      ),
      b(
        "Was der Text will",
        [L("**informieren**: Tatsachen, Zahlen, sachlicher Ton", "**überzeugen**: Meinung, Forderung, direkte Ansprache", "**unterhalten**: Spannung, Humor")],
        "Jeder Text wird mit einer Absicht geschrieben. Ein Bericht will informieren und bleibt neutral. Ein Kommentar will überzeugen und sagt deutlich seine Meinung. Du erkennst die Absicht an der Sprache: Stehen Forderungen und Wertungen im Text, oder nur Tatsachen?",
        { tasks: [k("Ein Text fordert: Die Schule muss endlich später beginnen! Der Text will ___.", "überzeugen", ["unterhalten"], "Eine Forderung mit Ausrufezeichen zeigt eine Meinung, für die der Text wirbt.", "Bleibt der Satz neutral, oder fordert er etwas?")] },
      ),
      b(
        "Jetzt du: Kernaussage und Absicht",
        "Tipp bei jeder Aufgabe auf die richtige Lösung.",
        "Frag dich bei den ersten beiden Aufgaben, ob der Satz für den ganzen Text gelten kann. Bei der dritten achtest du darauf, ob der Text neutral bleibt.",
        {
          tasks: [
            k("Ein Text handelt davon, dass Jugendliche zu wenig schlafen. Seine Kernaussage könnte lauten: ___", "Jugendliche brauchen mehr Schlaf, als sie bekommen.", ["Lisa geht um 23 Uhr ins Bett."], "Der Satz fasst das ganze Thema zusammen. Der andere ist ein einzelnes Beispiel.", "Welcher der beiden Sätze gilt für den ganzen Text?"),
            k("In einem Text steht: 62 Prozent der Befragten stimmten zu. Das ist ___.", "eine Einzelheit", ["die Kernaussage"], "Eine einzelne Zahl ist eine Einzelheit, die etwas belegt.", "Fasst eine einzelne Zahl einen ganzen Text zusammen?"),
            k("Ein Bericht nennt nur Zahlen und Tatsachen und wertet nicht. Er will ___.", "informieren", ["überzeugen"], "Ein neutraler Text ohne Meinung will Wissen weitergeben.", "Steht in dem Text eine Meinung oder eine Forderung?"),
          ],
        },
      ),
    ),
    ch(
      "Richtig, falsch oder steht nicht im Text",
      b(
        "Drei Kästchen",
        ["Zu jeder Aussage kreuzt du eines an:", L("**richtig**", "**falsch**", "**steht nicht im Text**")],
        "Diese Aufgabe kommt sehr oft vor. Du bekommst mehrere Aussagen und sollst jede am Text prüfen. Das dritte Kästchen macht die Aufgabe schwieriger, als sie aussieht. Viele verwechseln falsch und steht nicht im Text. Den Unterschied sehen wir uns jetzt genau an.",
      ),
      b(
        "richtig: Der Text sagt dasselbe",
        ["Text: *62 Prozent finden die Regel gut.*", "Aussage: *Die Mehrheit ist für die Regel.*", "Die Wörter sind anders, die Bedeutung ist gleich."],
        "Eine richtige Aussage wiederholt den Text fast nie wörtlich. Sie sagt dasselbe mit anderen Wörtern. 62 Prozent sind mehr als die Hälfte, also die Mehrheit. Du vergleichst deshalb immer die Bedeutung und nicht die einzelnen Wörter.",
      ),
      b(
        "falsch: Der Text sagt etwas anderes",
        ["Text: *62 Prozent finden die Regel gut.*", "Aussage: *Fast alle finden die Regel gut.*", "62 Prozent sind nicht fast alle. Die Aussage ist **falsch**."],
        "Bei falsch findest du eine Stelle im Text, und sie widerspricht der Aussage. Das kann das genaue Gegenteil sein. Es kann aber auch nur eine Übertreibung sein, wie hier. Fast alle wären neunzig Prozent oder mehr. Der Text nennt eine andere Zahl.",
        { tasks: [k("Text: Der Versuch dauerte zwei Wochen. Aussage: Der Versuch dauerte zwei Monate. Die Aussage ___.", "widerspricht dem Text", ["steht so im Text"], "Der Text nennt Wochen, die Aussage nennt Monate. Sie sagt also etwas anderes als der Text.", "Halte die beiden Zeitangaben nebeneinander. Sind sie gleich?")] },
      ),
      b(
        "steht nicht im Text: Der Text schweigt dazu",
        ["Text: *62 Prozent finden die Regel gut.*", "Aussage: *Die Lehrkräfte finden die Regel schlecht.*", "Über die Lehrkräfte sagt der Text **gar nichts**."],
        "Hier findest du im Text keine Stelle, die zu der Aussage passt. Du kannst sie weder bestätigen noch widerlegen. Vielleicht stimmt sie sogar. Trotzdem darfst du nicht richtig ankreuzen, denn es zählt nur, was im Text steht. Eigene Vermutungen zählen nicht.",
        { tasks: [k("Text: Die Schule hat 600 Schüler. Aussage: Die Schule hat 40 Lehrkräfte. Die Aussage ist ___.", "nicht im Text zu finden", ["falsch"], "Über die Lehrkräfte sagt der Text nichts. Falsch wäre die Aussage nur, wenn der Text etwas anderes sagte.", "Sagt der Text überhaupt irgendetwas über die Lehrkräfte?")] },
      ),
      b(
        "Vorsicht bei immer, nie, alle und nur",
        ["Text: *Viele Schüler sind morgens müde.*", "Aussage: ***Alle** Schüler sind morgens müde.*", "Viele sind nicht alle. Die Aussage ist **falsch**."],
        "Kleine Wörter wie immer, nie, alle, niemand und nur machen eine Aussage sehr streng. Schon eine einzige Ausnahme reicht, und sie stimmt nicht mehr. Die Prüfung tauscht gern ein vorsichtiges Wort aus dem Text gegen ein strenges aus. Achte deshalb genau auf diese Wörter.",
        { tasks: [k("Text: Manche Eltern sind dagegen. Aussage: Die Eltern sind dagegen. Die Aussage ist ___.", "falsch", ["richtig"], "Manche Eltern sind nicht alle Eltern. Die Aussage macht mehr daraus, als der Text sagt.", "Sagt der Text etwas über alle Eltern oder nur über einen Teil?")] },
      ),
      b(
        "Jetzt du: drei Aussagen zu einem Text",
        ["Text: *Die Schule testete den späteren Beginn vier Wochen lang. Danach kamen weniger Schüler zu spät.*"],
        "Lies den kleinen Text langsam. Prüf dann jede Aussage einzeln daran. Frag dich jedes Mal: Sagt der Text dasselbe, sagt er etwas anderes, oder sagt er dazu gar nichts?",
        {
          tasks: [
            k("Der Test dauerte einen Monat. ___", "richtig", ["falsch", "steht nicht im Text"], "Vier Wochen sind ein Monat. Die Wörter sind anders, die Bedeutung ist gleich.", "Wie lange sind vier Wochen, anders ausgedrückt?"),
            k("Nach dem Test kamen mehr Schüler zu spät. ___", "falsch", ["richtig", "steht nicht im Text"], "Im Text steht weniger. Die Aussage sagt das Gegenteil.", "Steht im Text mehr oder weniger?"),
            k("Die Noten wurden nach dem Test besser. ___", "steht nicht im Text", ["richtig", "falsch"], "Über Noten sagt der kleine Text kein Wort.", "Kommt das Wort Noten oder etwas Ähnliches im Text vor?"),
          ],
        },
      ),
    ),
    ch(
      "Belegen und zitieren",
      b(
        "Was ein Beleg ist",
        ["Ein **Beleg** ist die Stelle im Text, die **beweist**, dass deine Antwort stimmt."],
        "Manchmal reicht ein Kreuz nicht. Die Aufgabe verlangt dann, dass du deine Antwort mit dem Text belegst. Das bedeutet: Du zeigst genau, wo es steht. Du schreibst die Stelle ab und gibst an, in welcher Zeile sie zu finden ist.",
      ),
      b(
        "So zitierst du richtig",
        ["(1) Die Stelle **wörtlich** abschreiben.", "(2) In **Anführungszeichen** setzen.", "(3) Die **Zeile** angeben: *(Z. 5)*", "(4) Eine Auslassung mit **(…)** kennzeichnen."],
        "Ein Zitat ist eine wörtlich abgeschriebene Textstelle. Du darfst kein Wort verändern. Wenn du etwas weglässt, weil die Stelle zu lang ist, setzt du drei Punkte in Klammern. Diese vier Dinge gehören zusammen. Fehlt eines davon, gibt es einen Abzug.",
      ),
      b(
        "Ein Beispiel",
        ["Aussage: *Die Mehrheit findet die Regel gut.*", "Beleg: *„62 Prozent finden die Regel gut“ (Z. 5)*"],
        "So sieht ein vollständiger Beleg aus. Die Stelle ist wörtlich abgeschrieben. Sie steht in Anführungszeichen. Dahinter steht in Klammern die Zeile. Mehr brauchst du nicht zu schreiben. Der Leser kann jetzt selbst nachsehen, ob es stimmt.",
        { tasks: [k("62 Prozent finden die Regel gut (Z. 5). Bei diesem Beleg fehlen ___.", "die Anführungszeichen", ["die Zeilenangaben"], "Eine wörtlich übernommene Stelle muss in Anführungszeichen stehen.", "Woran erkennt man, dass etwas wörtlich aus dem Text übernommen ist?")] },
      ),
      b(
        "Der Beleg muss die Aussage stützen",
        ["Aussage: *Die Mehrheit findet die Regel gut.*", "Kein Beleg: *„Die Regel gilt seit August“ (Z. 2)*", "Die Stelle passt zum Thema, beweist aber nichts."],
        "Ein Beleg muss genau das beweisen, was du behauptest. Es reicht nicht, dass in der Stelle dasselbe Thema vorkommt. Frag dich bei jedem Beleg: Würde jemand, der nur diese Stelle liest, meiner Aussage zustimmen müssen?",
        { tasks: [k("Aussage: Der Test war erfolgreich. Welche Stelle belegt das? ___", "„Danach kamen weniger Schüler zu spät“", ["„Der Test dauerte vier Wochen“"], "Diese Stelle zeigt ein gutes Ergebnis. Die andere nennt nur die Dauer.", "Welche der beiden Stellen sagt etwas über das Ergebnis des Tests?")] },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Erst die Frage, dann die Stelle, dann vergleichen.", "(2) Die **Kernaussage** gilt für den ganzen Text.", "(3) **falsch**: Der Text widerspricht. **steht nicht im Text**: Er schweigt.", "(4) Ein **Beleg** braucht Anführungszeichen und Zeile."],
        "Das sind die vier Dinge, die du aus dieser Lektion mitnimmst. Wenn du in der Prüfung unsicher wirst, geh zurück zu den drei Schritten. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Eine Aussage klingt vernünftig, aber im Text steht nichts dazu. Du kreuzt an: ___", "steht nicht im Text", ["richtig"], "Es zählt nur der Text. Was du selbst für wahrscheinlich hältst, zählt nicht.", "Was zählt in dieser Aufgabe: dein Wissen oder der Text?")] },
      ),
    ),
  ],
  [
    v("Sachtext", "Ein Text, der über etwas aus der Wirklichkeit informiert oder davon überzeugen will.", "Zeitungsartikel, Bericht, Kommentar"),
    v("Kernaussage", "Das, was ein Text insgesamt sagen will. Sie gilt für den ganzen Text."),
    v("Einzelheit", "Eine Zahl, ein Name oder ein Beispiel. Sie gilt nur für eine Stelle."),
    v("Absicht", "Was ein Text erreichen will: informieren, überzeugen oder unterhalten."),
    v("steht nicht im Text", "Der Text sagt zu einer Aussage gar nichts. Das ist etwas anderes als falsch."),
    v("Beleg", "Die Stelle im Text, die eine Antwort beweist."),
    v("Zitat", "Eine wörtlich abgeschriebene Textstelle in Anführungszeichen mit Zeilenangabe.", "„62 Prozent finden die Regel gut“ (Z. 5)"),
  ],
  [
    q("Was machst du bei einer Leseaufgabe zuerst?", "Ich lese die Frage und unterstreiche die wichtigen Wörter.", ["Ich lese den Text dreimal.", "Ich kreuze nach Gefühl an.", "Ich zähle die Absätze."], "Die Frage sagt dir, wonach du suchen sollst. Erst danach gehst du in den Text."),
    q("Was ist die Kernaussage eines Textes?", "das, was der Text insgesamt sagen will", ["die erste Zahl im Text", "der längste Satz", "das letzte Wort"], "Die Kernaussage gilt für den ganzen Text. Eine Zahl oder ein Beispiel ist nur eine Einzelheit."),
    q("Text: Etwa die Hälfte der Klasse fährt mit dem Rad. Aussage: Die ganze Klasse fährt mit dem Rad. Was kreuzt du an?", "falsch", ["richtig", "steht nicht im Text", "beides"], "Die Hälfte ist nicht die ganze Klasse. Der Text sagt etwas anderes als die Aussage."),
    q("Text: Etwa die Hälfte der Klasse fährt mit dem Rad. Aussage: Die Räder sind alle neu. Was kreuzt du an?", "steht nicht im Text", ["richtig", "falsch", "beides"], "Über den Zustand der Räder sagt der Text nichts. Er widerspricht nicht, er schweigt."),
    q("Was gehört zu einem richtigen Zitat?", "Anführungszeichen und Zeilenangabe", ["nur eine eigene Zusammenfassung", "ein Ausrufezeichen", "die Überschrift des Textes"], "Ein Zitat ist wörtlich abgeschrieben, steht in Anführungszeichen und nennt die Zeile."),
    q("Woran erkennst du, dass ein Text überzeugen will?", "an Meinungen und Forderungen", ["an vielen Zahlen", "an der Länge", "an den Zeilennummern"], "Wer überzeugen will, wertet und fordert. Ein Text, der nur informiert, bleibt neutral."),
    q("Welches Wort in einer Aussage solltest du besonders genau prüfen?", "alle", ["der", "und", "ist"], "Wörter wie alle, immer, nie und nur machen eine Aussage sehr streng. Eine Ausnahme reicht, und sie ist falsch."),
    q("Wo steht die Kernaussage besonders oft?", "in der Überschrift, am Anfang oder am Ende", ["genau in der Mitte", "nur in Zeile 10", "in den Fußnoten"], "Die Überschrift nennt das Thema, der Anfang stellt die Frage und das Ende gibt oft die Antwort."),
  ],
);
