// Guided lesson: Reading task 3, the long article, plus the true / false / not in the text format.
// Example sentences come from the own article "The village that switched off the night".
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_04_reading_listening.json",
  {
    id: "P_EN_READING",
    subject: "EN",
    title: "Lesen 3: der lange Artikel",
    teaser: "Die dritte Leseaufgabe der Prüfung: ein langer Artikel mit Fragen zum Ankreuzen. Du lernst, mit einem Schlüsselwort die richtige Stelle zu finden und Antwort und Text genau zu vergleichen. Dazu die Aufgabe richtig, falsch oder steht nicht im Text.",
    hook: "Ein englischer Artikel über eine ganze Seite sieht erst einmal nach sehr viel aus. Viele fangen oben an zu lesen und sind nach dem dritten Absatz müde. Das musst du nicht. Für diese Aufgabe liest du nicht den ganzen Artikel. Du suchst darin, so wie du in einem Schrank nach einer bestimmten Jacke suchst.",
    outro: "Du weißt jetzt, wie du mit einem langen Artikel umgehst. Du liest zuerst die Frage, suchst mit einem Schlüsselwort die passende Stelle und vergleichst dann genau. Du achtest auf kleine Wörter wie not, all und only. Und du kennst den Unterschied zwischen falsch und steht nicht im Text.",
    source: "Beispielsätze aus dem eigenen Artikel „The village that switched off the night“",
  },
  [
    ch(
      "Du musst nicht alles verstehen",
      b(
        "So sieht die Aufgabe aus",
        ["Du bekommst einen **langen Artikel**, oft eine ganze Seite.", "Die Absätze sind nummeriert.", "Dazu kommen Fragen mit mehreren Antworten zum Ankreuzen."],
        "Ein Absatz ist ein Stück Text, vor und nach dem eine kleine Lücke ist. Die Nummern an den Absätzen sind eine Hilfe für dich. Die Fragen kommen fast immer in derselben Reihenfolge wie der Artikel. Die Antwort auf die erste Frage steht also weit oben.",
      ),
      b(
        "Die gute Nachricht",
        ["Du musst den Artikel **nicht ganz verstehen**.", "Du musst nur die **Stelle finden**, an der die Antwort steht."],
        "In jedem Artikel stehen Wörter, die du nicht kennst. Das ist so gewollt und ganz normal. Für die Fragen brauchst du meistens nur einen oder zwei Sätze aus dem ganzen Text. Alles andere darfst du überfliegen, ohne ein schlechtes Gewissen zu haben.",
        { tasks: [k("Frage: When does the shop open? Im Text steht: The shop, a charming old building, opens at nine. Du kennst charming nicht. Findest du die Antwort trotzdem? ___", "Ja, sie steht bei opens at nine.", ["Nein, ohne das Wort geht es nicht."], "Die Frage will eine Uhrzeit. Die steht am Ende des Satzes, und das unbekannte Wort brauchst du dafür nicht.", "Wonach fragt die Frage? Such im Satz nur diese eine Angabe.")] },
      ),
      b(
        "Zuerst die Frage, dann der Text",
        ["Frage: *Why did the council think about switching off the street lights?*", "Lies die Frage **vor** dem Artikel. Dann weißt du, wonach du suchst."],
        "Auf Deutsch heißt die Frage: Warum dachte der Gemeinderat darüber nach, die Straßenlaternen auszuschalten? The council ist der Gemeinderat, und street lights sind Straßenlaternen. Wer zuerst die Frage liest, liest den Artikel mit einem Ziel.",
      ),
      b(
        "Was ist ein Schlüsselwort?",
        ["Ein **Schlüsselwort** ist ein Wort aus der Frage, das wahrscheinlich auch im Artikel steht.", L("Gut: Namen und Dinge wie *council, street lights*.", "Schlecht: *the, is, of*. Die stehen überall.")],
        "Mit einem Schlüssel öffnest du eine Tür. Mit einem Schlüsselwort öffnest du die richtige Stelle im Text. Gute Schlüsselwörter sind Namen, Zahlen und Dinge. Kleine Wörter wie the oder is helfen dir nicht, weil sie in jedem Satz vorkommen.",
      ),
      b(
        "Jetzt du: Schlüsselwörter finden",
        "Tipp bei jeder Frage auf das Wort, das dir beim Suchen hilft.",
        "Hier siehst du nur Fragen, noch keinen Artikel. Überleg bei jeder Frage, welches Wort du im Text suchen würdest. Denk daran: Namen und Dinge sind gut, kleine Wörter helfen nicht.",
        {
          tasks: [
            k("How many students slept better? Ein gutes Schlüsselwort ist ___.", "students", ["how", "the"], "Students ist ein Ding, nach dem du im Text suchen kannst.", "Welches der drei Wörter kommt nicht in jedem beliebigen Satz vor?"),
            k("What did the police say about break-ins? Ein gutes Schlüsselwort ist ___.", "police", ["what", "about"], "Police steht nur an wenigen Stellen im Artikel. Dort suchst du.", "Welches Wort nennt jemanden, der im Artikel etwas sagt?"),
            k("Das Fragewort why sagt dir: Gesucht ist ___.", "ein Grund", ["eine Zahl", "ein Ort"], "Why heißt warum. Auf warum antwortet man mit einem Grund.", "Was bedeutet why auf Deutsch? Womit antwortet man darauf?"),
          ],
        },
      ),
    ),
    ch(
      "Die Stelle finden und vergleichen",
      b(
        "Suchen statt lesen",
        ["Lass die Augen über den Artikel laufen.", "Such **nur** das Schlüsselwort.", "Das nennt man **Scanning**."],
        "Scanning funktioniert so, wie wenn du deinen Namen auf einer langen Liste suchst. Du liest nicht jede Zeile. Deine Augen springen über das Papier, bis sie an dem einen Wort hängen bleiben. Genau so suchst du jetzt das Wort council.",
      ),
      b(
        "Gefunden",
        ["Absatz 2: *The idea came from the village **council's** accountant. Lighting the empty streets was costing more than the library.*", "Erst jetzt liest du **genau**."],
        "Da ist das Schlüsselwort. Jetzt liest du diese zwei Sätze langsam, Wort für Wort. An accountant ist ein Buchhalter, also jemand, der auf das Geld achtet. Der zweite Satz sagt: Die leeren Straßen zu beleuchten kostete mehr als die Bücherei.",
      ),
      b(
        "Antwort und Text vergleichen",
        [L("Antwort a: *to spend less money*", "Text: *was costing more than the library*"), "Es war zu teuer. Also wollte man Geld sparen. **a passt.**"],
        "Jetzt nimmst du jede Antwort einzeln und hältst sie neben die Stelle im Text. Antwort a heißt: um weniger Geld auszugeben. Im Text steht, dass die Laternen sehr viel kosteten. Die Wörter sind andere, aber die Bedeutung ist dieselbe.",
      ),
      b(
        "Eine Antwort, die das Gegenteil sagt",
        [L("Antwort b: *to make the stars visible again*", "Text: *The idea did **not** come from star lovers.*"), "Der Text sagt das **Gegenteil**. b ist falsch."],
        "Antwort b klingt schön: damit man die Sterne wieder sehen kann. Im Artikel steht aber ausdrücklich, dass die Idee nicht von Sternfreunden kam. Achte auf das kleine Wort not. Es dreht die ganze Aussage um.",
        { tasks: [k("Im Text steht not. Die Antwort sagt dasselbe ohne not. Die Antwort ist ___.", "falsch", ["richtig"], "Das Wort not dreht den Satz um. Ohne not bedeutet er das Gegenteil.", "Was macht das kleine Wort not mit einem Satz?")] },
      ),
      b(
        "Eine Antwort, die nicht im Text steht",
        ["Antwort c: *because villagers had complained*", "Von Beschwerden steht in dem Absatz **nichts**.", "c ist falsch, auch wenn es logisch klingt."],
        "Antwort c heißt: weil sich Dorfbewohner beschwert hatten. Das könnte gut sein, so etwas passiert ja. Im Absatz steht davon aber kein Wort. Wie bei den Schildern gilt: Es zählt nur, was der Text sagt.",
      ),
      b(
        "Kleine Wörter, große Wirkung",
        [L("**all** = alle", "**some** = einige", "**only** = nur", "**never** = nie", "**more** = mehr", "**fewer** = weniger")],
        "An diesen kleinen Wörtern unterscheiden sich richtige und falsche Antworten oft. Im Text steht einige, in der Antwort steht alle. Das ist dann nicht mehr dasselbe. Lies deshalb bei jeder Antwort genau, ob diese Wörter zum Text passen.",
        { tasks: [k("Text: Some shops closed. Antwort: All shops closed. Die Antwort ist ___.", "falsch", ["richtig"], "Einige Läden sind nicht alle Läden. Die Antwort übertreibt.", "Vergleich die beiden ersten Wörter. Bedeuten sie dasselbe?")] },
      ),
      b(
        "Jetzt du: Was sagt die Polizei?",
        ["Absatz 4: *The number of break-ins did not rise. It stayed exactly the same, at three.*"],
        "Break-ins sind Einbrüche. To rise bedeutet steigen. Lies die beiden Sätze langsam und überleg, was mit der Zahl der Einbrüche passiert ist. Dann suchst du die Antwort, die genau das sagt.",
        {
          tasks: [
            k("It stayed exactly the same heißt: Die Zahl ist ___.", "gleich geblieben", ["gesunken"], "The same bedeutet dasselbe. Es waren vorher drei und nachher drei.", "Was bedeutet the same? Hat sich die Zahl verändert?"),
            k("Welche Antwort passt? ___", "The darkness did not lead to more crime.", ["There were fewer break-ins than before.", "Burglars prefer to work at night."], "Nicht gestiegen heißt: nicht mehr Einbrüche. Weniger waren es aber auch nicht.", "Achte auf more und fewer. Welches der beiden Wörter passt zu gleich geblieben?"),
          ],
        },
      ),
    ),
    ch(
      "Richtig, falsch oder steht nicht im Text",
      b(
        "Eine andere Art von Aufgabe",
        ["Manchmal bekommst du Aussagen mit drei Kästchen:", L("**true** = richtig", "**false** = falsch", "**not in the text** = steht nicht im Text")],
        "Diese Aufgabe sieht anders aus, aber du gehst genauso vor. Du suchst mit einem Schlüsselwort die Stelle im Artikel und vergleichst. Neu ist nur das dritte Kästchen. Es ist für Aussagen gedacht, zu denen der Artikel einfach schweigt.",
      ),
      b(
        "Falsch oder steht nicht da?",
        [L("**false**: Der Text sagt etwas **anderes**.", "**not in the text**: Der Text sagt dazu **gar nichts**.")],
        "Das ist der Unterschied, den du dir merken musst. Bei false findest du eine Stelle, und sie widerspricht der Aussage. Bei not in the text suchst du und findest keine Stelle. Du kannst weder beweisen, dass es stimmt, noch dass es nicht stimmt.",
      ),
      b(
        "Ein Beispiel",
        ["Text: *It stayed exactly the same, at three.*", L("*There were three break-ins.* Das ist **true**.", "*There were five break-ins.* Das ist **false**.", "*The burglars were caught.* Das ist **not in the text**.")],
        "Schau dir die drei Aussagen der Reihe nach an. Drei Einbrüche stehen so im Text. Fünf Einbrüche widersprechen dem Text, denn dort steht drei. Und ob die Einbrecher gefasst wurden, erfährst du nirgends. Darüber sagt der Satz nichts.",
      ),
      b(
        "Jetzt du: die Laternen",
        ["Text: *The lights go off at midnight and come on again at five.*"],
        "Midnight ist Mitternacht, also zwölf Uhr nachts. Go off heißt ausgehen, come on heißt angehen. Prüf jede Aussage am Text. Frag dich: Steht es so da, steht es anders da, oder steht dazu gar nichts da?",
        {
          tasks: [
            k("The lights are off for five hours. ___", "true", ["false", "not in the text"], "Von Mitternacht bis fünf Uhr sind es genau fünf Stunden.", "Rechne nach: Wie viele Stunden liegen zwischen Mitternacht und fünf Uhr?"),
            k("The lights go off at ten. ___", "false", ["true", "not in the text"], "Im Text steht midnight, also zwölf Uhr und nicht zehn.", "Such im Text die Uhrzeit, zu der die Laternen ausgehen."),
            k("People in the village like the dark. ___", "not in the text", ["true", "false"], "Der Satz sagt nichts darüber, was die Leute mögen oder nicht mögen.", "Steht im Satz irgendetwas über die Meinung der Leute?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Frage lesen und ein **Schlüsselwort** markieren.", "(2) Die Stelle im Artikel suchen.", "(3) Antwort und Text genau vergleichen.", "(4) Auf **not, all, some** und **only** achten."],
        "Mit diesen vier Schritten löst du jede Frage zu einem langen Artikel. Du brauchst dafür keine Angst vor unbekannten Wörtern zu haben. Und wenn du unsicher bist, kreuzt du trotzdem etwas an, denn für falsche Antworten wird nichts abgezogen.",
        { tasks: [k("Du findest im Artikel keine Stelle zu einer Aussage. Du kreuzt an: ___", "not in the text", ["false"], "Wenn der Artikel dazu schweigt, kannst du die Aussage weder beweisen noch widerlegen.", "Widerspricht der Artikel der Aussage, oder sagt er gar nichts dazu?")] },
      ),
    ),
  ],
  [
    v("Schlüsselwort", "Ein Wort aus der Frage, das wahrscheinlich auch im Artikel steht. Am besten ein Name, eine Zahl oder ein Ding."),
    v("Scanning", "Den Text mit den Augen nach einem bestimmten Wort absuchen, ohne alles zu lesen."),
    v("true / false", "Richtig oder falsch. Bei false sagt der Text etwas anderes."),
    v("not in the text", "Steht nicht im Text. Der Artikel sagt zu dieser Aussage gar nichts."),
    v("all / some / only", "Alle, einige, nur. An diesen Wörtern unterscheiden sich richtige und falsche Antworten oft."),
    v("more / fewer", "Mehr und weniger.", "fewer break-ins = weniger Einbrüche"),
  ],
  [
    q("Was machst du zuerst, wenn du einen langen Artikel mit Fragen bekommst?", "Die Fragen lesen", ["Den ganzen Artikel zweimal lesen", "Alle unbekannten Wörter unterstreichen", "Sofort die erste Antwort ankreuzen"], "Wer zuerst die Fragen liest, weiß, wonach er im Artikel suchen muss, und liest mit einem Ziel."),
    q("Frage: How many students slept better? Welche Wörter suchst du im Text?", "students, slept better", ["how, many", "the, did", "better, the"], "Dinge und wichtige Tätigkeiten sind gute Schlüsselwörter. How many verrät dir nur, dass eine Zahl gesucht wird."),
    q("Was bedeutet Scanning?", "Mit den Augen ein bestimmtes Wort suchen", ["Jeden Satz übersetzen", "Den Text laut vorlesen", "Die Absätze zählen"], "Beim Scanning liest du nicht. Du suchst ein Wort, so wie du deinen Namen auf einer Liste suchst."),
    q("Text: The number did not rise. Welche Aussage passt?", "The number was not higher than before.", ["The number was lower than before.", "The number was much higher.", "Nobody counted."], "Nicht gestiegen heißt nur, dass es nicht mehr wurden. Ob es weniger wurden, sagt der Satz nicht."),
    q("Text: Some villagers were angry. Aussage: All villagers were angry. Die Aussage ist", "false", ["true", "not in the text", "fast richtig, also true"], "Some heißt einige, all heißt alle. Der Text sagt etwas anderes als die Aussage, also ist sie false."),
    q("Du suchst und findest im Artikel nichts zu einer Aussage. Was kreuzt du an?", "not in the text", ["false", "true", "nichts"], "False bedeutet, dass der Text widerspricht. Wenn er dazu schweigt, ist es not in the text."),
    q("Eine Antwort klingt logisch, steht aber nicht im Absatz. Sie ist", "falsch", ["richtig", "wahrscheinlich richtig", "die beste Wahl"], "Es zählt nur, was im Text steht. Was du dir selbst dazudenkst, ist kein Beleg."),
  ],
);
