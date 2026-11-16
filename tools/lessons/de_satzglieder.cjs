// Guided lesson: sentence parts (Subjekt, Prädikat, Objekt, adverbiale Bestimmung) and the four cases.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_03c_satzglieder.json",
  {
    id: "P_DE_SATZGLIEDER",
    subject: "DE",
    title: "Satzglieder: Wer tut was?",
    teaser: "Was ein Satzglied ist und wie du es mit der Umstellprobe findest. Dann die vier wichtigsten: Subjekt, Prädikat, Objekt und adverbiale Bestimmung, jedes mit seiner Frage. Dazu die vier Fälle.",
    hook: "Bei den Wortarten ging es um einzelne Wörter. Jetzt schauen wir auf Gruppen von Wörtern, die im Satz zusammengehören. Das klingt schwieriger, ist aber eigentlich leichter. Du brauchst dafür nur ein paar Fragen, die du schon als kleines Kind gestellt hast, zum Beispiel wer etwas tut und wo es passiert.",
    outro: "Du kannst jetzt einen Satz in seine Glieder zerlegen. Du findest das Prädikat über das Verb und das Subjekt mit der Frage Wer oder was. Du kennst die Fragen für die Objekte und für die adverbialen Bestimmungen. Und du weißt, dass die Frage entscheidet und nicht die Stelle im Satz.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2"],
  },
  [
    ch(
      "Was ein Satzglied ist",
      b(
        "Wörter in Gruppen",
        ["*Der kleine Hund | jagt | die Katze.*", "Sechs Wörter, aber nur drei Gruppen.", "So eine Gruppe heißt **Satzglied**."],
        "Schau dir an, wo die Striche stehen. Der kleine Hund gehört zusammen, denn alle drei Wörter meinen dasselbe Tier. Die Katze gehört auch zusammen. Ein Satzglied kann also aus einem Wort bestehen oder aus mehreren, die zusammengehören.",
      ),
      b(
        "Die Umstellprobe",
        ["*Heute | fährt | mein Bruder | nach Hamburg.*", "*Mein Bruder | fährt | heute | nach Hamburg.*", "Was zusammen wandert, ist ein Satzglied."],
        "So findest du heraus, was zusammengehört. Du stellst den Satz um und schaust, welche Wörter gemeinsam ihren Platz wechseln. Mein Bruder bleibt immer zusammen. Nach Hamburg auch. Du kannst nicht sagen: Nach fährt mein Bruder Hamburg. Diese Probe heißt Umstellprobe.",
        { tasks: [k("Die Wörter nach Hamburg wandern immer zusammen. Sie sind ___.", "ein Satzglied", ["zwei Satzglieder"], "Was beim Umstellen zusammenbleibt, ist ein einziges Satzglied.", "Kannst du die beiden Wörter beim Umstellen voneinander trennen?")] },
      ),
      b(
        "Wortart oder Satzglied?",
        [L("**Wortart**: Was für ein Wort ist es?", "*Hund* ist ein Nomen."), L("**Satzglied**: Welche Aufgabe hat die Gruppe im Satz?", "*Der kleine Hund* ist die Gruppe, die etwas tut.")],
        "Das sind zwei verschiedene Fragen an denselben Satz. Bei der Wortart schaust du auf ein einzelnes Wort. Beim Satzglied schaust du auf eine ganze Gruppe und fragst, welche Rolle sie im Satz spielt. In der Prüfung musst du beides auseinanderhalten.",
      ),
      b(
        "Jetzt du: Satzglieder zählen",
        "Die Striche zeigen dir die Gruppen. Tipp auf die richtige Antwort.",
        "Zähl die Gruppen zwischen den Strichen, nicht die einzelnen Wörter. Jede Gruppe ist ein Satzglied, auch wenn sie nur aus einem Wort besteht.",
        {
          tasks: [
            k("Morgen | schreiben | wir | einen Test. Der Satz hat ___ Satzglieder.", "vier", ["fünf"], "Es sind vier Gruppen. Einen Test zählt als ein Satzglied.", "Zähl die Gruppen zwischen den Strichen und nicht die Wörter."),
            k("Meine große Schwester | lacht. Der Satz hat ___ Satzglieder.", "zwei", ["vier"], "Meine große Schwester ist eine Gruppe, lacht ist die zweite.", "Wie viele Gruppen trennt der eine Strich voneinander?"),
          ],
        },
      ),
    ),
    ch(
      "Prädikat und Subjekt",
      b(
        "Das Prädikat",
        ["*Der Hund **bellt**.*", "Das Satzglied mit dem Verb heißt **Prädikat**."],
        "Das Prädikat findest du am leichtesten, weil du das Verb schon kennst. Das Verb ist die Wortart. Prädikat ist der Name für seine Aufgabe im Satz. Es sagt, was geschieht. Jeder Satz hat ein Prädikat, und mit ihm fängst du immer an.",
      ),
      b(
        "Das Prädikat kann zwei Teile haben",
        ["*Tom **hat** den Test **bestanden**.*", "*Wir **stehen** um sechs **auf**.*", "Beide Teile zusammen sind das Prädikat."],
        "Oft besteht das Prädikat aus zwei Teilen, die weit auseinanderstehen. Im ersten Satz gehören hat und bestanden zusammen. Im zweiten Satz gehören stehen und auf zusammen, denn das Verb heißt aufstehen. Such deshalb immer bis zum Satzende nach dem zweiten Teil.",
        { tasks: [k("Sie hat gestern lange geschlafen. Das Prädikat heißt: ___", "hat geschlafen", ["hat", "gestern"], "Die beiden Teile gehören zusammen, auch wenn Wörter dazwischenstehen.", "Schau bis zum Satzende. Gehört dort noch ein Teil zum Verb?")] },
      ),
      b(
        "Das Subjekt: Wer oder was?",
        ["***Der Hund** bellt.*", "Wer bellt? Der Hund.", "Das Satzglied, das auf **Wer oder was?** antwortet, heißt **Subjekt**."],
        "Wenn du das Prädikat hast, stellst du die erste Frage: Wer oder was tut das? Hier fragst du, wer bellt, und die Antwort lautet der Hund. Das ist das Subjekt. Das Subjekt ist der, der etwas tut, oder das, worum es im Satz geht.",
      ),
      b(
        "Das Subjekt steht nicht immer vorn",
        ["*Heute bellt **der Hund**.*", "*Im Garten spielen **die Kinder**.*", "Die Frage entscheidet, nicht der Platz im Satz."],
        "Viele denken, das Subjekt steht immer am Anfang. Das stimmt nicht. Im Deutschen kann fast jedes Satzglied vorn stehen. Verlass dich deshalb nie auf die Stelle. Stell immer die Frage: Wer oder was? Die Antwort ist das Subjekt.",
        { tasks: [k("Im Garten spielen die Kinder. Das Subjekt heißt: ___", "die Kinder", ["im Garten"], "Wer spielt? Darauf antwortet diese Gruppe.", "Frag: Wer oder was spielt? Welche Gruppe antwortet darauf?")] },
      ),
      b(
        "Subjekt und Prädikat passen zusammen",
        ["*Der Hund bell**t**.*", "*Die Hunde bell**en**.*", "Ändert sich das Subjekt, ändert sich auch das Verb."],
        "Das ist eine zweite Probe für das Subjekt. Setz das Satzglied in den Plural und schau, ob sich das Verb mitverändert. Aus der Hund bellt wird die Hunde bellen. Das Verb richtet sich immer nach dem Subjekt, nie nach einem anderen Satzglied.",
      ),
      b(
        "Jetzt du: Subjekt und Prädikat",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Such zuerst das Prädikat, also das Verb mit allen seinen Teilen. Frag danach: Wer oder was tut das? Die Antwort ist das Subjekt.",
        {
          tasks: [
            k("Am Montag kommt meine Tante. Das Subjekt heißt: ___", "meine Tante", ["am Montag"], "Wer kommt? Darauf antwortet diese Gruppe.", "Stell die Frage: Wer oder was kommt am Montag?"),
            k("Der Zug ist pünktlich abgefahren. Das Prädikat heißt: ___", "ist abgefahren", ["abgefahren", "pünktlich"], "Beide Teile gehören zum Verb abfahren.", "Welches kleine Wort gehört noch zu dem Verb am Satzende?"),
            k("Den ganzen Tag schien die Sonne. Das Subjekt heißt: ___", "die Sonne", ["den ganzen Tag"], "Was schien? Darauf antwortet diese Gruppe.", "Stell die Frage: Wer oder was schien den ganzen Tag?"),
          ],
        },
      ),
    ),
    ch(
      "Die Objekte und die vier Fälle",
      b(
        "Wen oder was?",
        ["*Der Hund jagt **die Katze**.*", "Wen jagt der Hund? Die Katze.", "Dieses Satzglied heißt **Objekt**."],
        "Das Objekt ist das Satzglied, auf das sich die Handlung richtet. Der Hund jagt, und die Katze ist das Ziel der Jagd. Du findest es mit der Frage Wen oder was. Weil es auf diese Frage antwortet, heißt es genauer Akkusativobjekt.",
      ),
      b(
        "Wem?",
        ["*Ich helfe **meinem Bruder**.*", "Wem helfe ich? Meinem Bruder.", "Auch das ist ein Objekt. Es antwortet auf **Wem?**"],
        "Es gibt ein zweites Objekt, das auf eine andere Frage antwortet. Wem helfe ich? Wem gehört das? Wem schenkst du etwas? Dieses Objekt heißt Dativobjekt. Du erkennst es oft an Endungen wie dem, einem oder meiner.",
        { tasks: [k("Ich schenke meiner Oma Blumen. Auf die Frage Wem? antwortet: ___", "meiner Oma", ["Blumen"], "Wem schenke ich etwas? Darauf antwortet diese Gruppe.", "Stell die Frage laut: Wem schenke ich die Blumen?")] },
      ),
      b(
        "Zwei Objekte in einem Satz",
        ["*Ich schenke **meiner Oma** **Blumen**.*", L("Wem? Meiner Oma.", "Was? Blumen.")],
        "Ein Satz kann beide Objekte haben. Das kommt bei Verben wie schenken, geben, zeigen und erzählen vor. Es gibt immer jemanden, der etwas bekommt, und etwas, das er bekommt. Stell beide Fragen nacheinander, dann findest du beide Objekte.",
      ),
      b(
        "Die vier Fälle",
        [L("**Nominativ**: Wer oder was?", "**Genitiv**: Wessen?", "**Dativ**: Wem?", "**Akkusativ**: Wen oder was?")],
        "Zu jeder dieser Fragen gehört ein Fall. Das Subjekt steht immer im Nominativ. Die Objekte stehen im Dativ oder im Akkusativ. Der Genitiv antwortet auf Wessen, zum Beispiel das Fahrrad meines Bruders. Du musst die vier Namen kennen und die Frage dazu.",
        { tasks: [k("Ich helfe meinem Bruder. Meinem Bruder steht im ___.", "Dativ", ["Akkusativ"], "Du fragst: Wem helfe ich? Die Frage Wem gehört zu diesem Fall.", "Mit welcher Frage findest du meinem Bruder: Wem oder Wen?")] },
      ),
      b(
        "Subjekt oder Objekt?",
        ["*Den Hund beißt der Mann.*", L("Wer beißt? Der Mann. Das ist das Subjekt.", "Wen beißt er? Den Hund. Das ist das Objekt.")],
        "Dieser Satz ist ungewöhnlich, und genau deshalb zeigt er etwas Wichtiges. Der Hund steht vorn, aber er ist nicht das Subjekt. Das kleine Wort den verrät den Akkusativ. Stell immer die Fragen. Die Reihenfolge der Wörter kann dich täuschen.",
        { tasks: [k("Den Ball fängt Lena. Das Subjekt heißt: ___", "Lena", ["den Ball"], "Wer fängt? Darauf antwortet der Name. Den Ball antwortet auf Wen oder was.", "Stell die Frage: Wer fängt hier etwas, und was wird gefangen?")] },
      ),
      b(
        "Jetzt du: Objekte finden",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Such zuerst Prädikat und Subjekt. Was dann übrig bleibt, prüfst du mit den Fragen Wem und Wen oder was.",
        {
          tasks: [
            k("Der Lehrer erklärt die Aufgabe. Auf Wen oder was? antwortet: ___", "die Aufgabe", ["der Lehrer"], "Was erklärt der Lehrer? Darauf antwortet diese Gruppe.", "Frag: Wen oder was erklärt der Lehrer?"),
            k("Das Buch gehört meinem Freund. Meinem Freund steht im ___.", "Dativ", ["Akkusativ"], "Wem gehört das Buch? Die Frage Wem gehört zu diesem Fall.", "Welche Frage stellst du: Wem oder Wen?"),
            k("Ich sehe einen Vogel. Einen Vogel steht im ___.", "Akkusativ", ["Dativ"], "Wen oder was sehe ich? Diese Frage gehört zu diesem Fall.", "Welche Frage stellst du: Wem oder Wen oder was?"),
          ],
        },
      ),
    ),
    ch(
      "Wo, wann, wie und warum",
      b(
        "Die adverbiale Bestimmung",
        ["*Wir fahren **morgen** **nach Berlin**.*", L("Wann? Morgen.", "Wohin? Nach Berlin."), "Solche Satzglieder heißen **adverbiale Bestimmung**."],
        "Der Satz Wir fahren wäre schon vollständig. Die beiden zusätzlichen Satzglieder sagen genauer, wann und wohin. Sie bestimmen die Umstände näher. Daher kommt der lange Name. In der Schule sagt man oft kurz Adverbiale dazu.",
      ),
      b(
        "Vier Fragen, vier Arten",
        [L("**Wo? Wohin?** Das ist der Ort: *im Park*", "**Wann? Wie lange?** Das ist die Zeit: *am Montag*", "**Wie?** Das ist die Art und Weise: *mit Freude*", "**Warum?** Das ist der Grund: *wegen des Regens*")],
        "Es gibt vier Arten von adverbialen Bestimmungen, und jede hat ihre Frage. Ort, Zeit, Art und Weise und Grund. Wenn ein Satzglied auf keine der Fragen nach Subjekt und Objekt antwortet, probierst du diese vier.",
        { tasks: [k("wegen des Regens antwortet auf die Frage ___", "Warum?", ["Wo?"], "Die Gruppe nennt den Grund, aus dem etwas geschieht.", "Nennt die Gruppe einen Ort oder einen Grund?")] },
      ),
      b(
        "Jetzt du: ein ganzer Satz",
        ["*Am Abend liest Mia ihrem Bruder ein Buch vor.*"],
        "Jetzt zerlegst du einen ganzen Satz. Das Prädikat heißt liest vor. Stell nacheinander die Fragen, die du gelernt hast, und tipp auf die richtige Antwort.",
        {
          tasks: [
            k("Wer liest vor? Das Subjekt heißt: ___", "Mia", ["ihrem Bruder", "am Abend"], "Der Name antwortet auf die Frage Wer oder was.", "Welche Gruppe antwortet auf Wer oder was?"),
            k("ein Buch ist ___.", "ein Akkusativobjekt", ["ein Dativobjekt", "das Subjekt"], "Was liest sie vor? Die Frage Wen oder was gehört zum Akkusativ.", "Mit welcher Frage findest du diese Gruppe: Wem oder Wen oder was?"),
            k("Am Abend ist ___.", "eine adverbiale Bestimmung der Zeit", ["ein Objekt"], "Die Gruppe antwortet auf die Frage Wann.", "Auf welche Frage antwortet die Gruppe: Wann oder Wen?"),
          ],
        },
      ),
      b(
        "Die Fragen auf einen Blick",
        [L("**Prädikat**: Was geschieht?", "**Subjekt**: Wer oder was?", "**Dativobjekt**: Wem?", "**Akkusativobjekt**: Wen oder was?", "**Adverbiale Bestimmung**: Wo? Wann? Wie? Warum?")],
        "Mit diesen fünf Zeilen zerlegst du jeden Satz. Fang immer beim Prädikat an und geh dann die Fragen der Reihe nach durch. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Gestern hat Tom seiner Schwester ein Eis gekauft. Du suchst zuerst das Prädikat. Es heißt: ___", "hat gekauft", ["Gestern"], "Das Prädikat sagt, was geschieht. Hier besteht es aus zwei Teilen.", "Welche Wörter sagen, was geschieht? Es sind zwei.")] },
      ),
    ),
  ],
  [
    v("Satzglied", "Eine Gruppe von Wörtern, die im Satz zusammengehört und beim Umstellen zusammenbleibt."),
    v("Umstellprobe", "Den Satz umstellen und schauen, welche Wörter gemeinsam wandern."),
    v("Prädikat", "Das Satzglied mit dem Verb. Es kann aus zwei Teilen bestehen.", "hat bestanden, steht auf"),
    v("Subjekt", "Antwortet auf Wer oder was? Es steht im Nominativ.", "Der Hund bellt."),
    v("Objekt", "Das Satzglied, auf das sich die Handlung richtet. Wem? ist das Dativobjekt, Wen oder was? das Akkusativobjekt."),
    v("Nominativ, Genitiv, Dativ, Akkusativ", "Die vier Fälle mit den Fragen: Wer oder was? Wessen? Wem? Wen oder was?"),
    v("adverbiale Bestimmung", "Sagt genauer, wo, wann, wie oder warum etwas geschieht.", "morgen, im Park, wegen des Regens"),
  ],
  [
    q("Mit welcher Frage findest du das Subjekt?", "Wer oder was?", ["Wen oder was?", "Wem?", "Wo?"], "Das Subjekt antwortet auf Wer oder was. Wen oder was fragt nach dem Akkusativobjekt."),
    q("Morgen besucht uns mein Onkel. Was ist das Subjekt?", "mein Onkel", ["morgen", "uns", "besucht"], "Wer besucht uns? Mein Onkel. Das Subjekt muss nicht am Satzanfang stehen."),
    q("Wir haben den Film gesehen. Was ist das Prädikat?", "haben gesehen", ["haben", "den Film", "gesehen"], "Das Prädikat besteht hier aus zwei Teilen, die zusammengehören: haben und gesehen."),
    q("Ich gebe dem Hund einen Knochen. Was ist dem Hund?", "ein Dativobjekt", ["das Subjekt", "ein Akkusativobjekt", "eine adverbiale Bestimmung"], "Wem gebe ich den Knochen? Dem Hund. Die Frage Wem gehört zum Dativ."),
    q("Ich gebe dem Hund einen Knochen. Was ist einen Knochen?", "ein Akkusativobjekt", ["ein Dativobjekt", "das Subjekt", "das Prädikat"], "Was gebe ich? Einen Knochen. Die Frage Wen oder was gehört zum Akkusativ."),
    q("Wir treffen uns im Park. Was ist im Park?", "eine adverbiale Bestimmung des Ortes", ["ein Objekt", "das Subjekt", "das Prädikat"], "Wo treffen wir uns? Im Park. Die Frage Wo gehört zur adverbialen Bestimmung des Ortes."),
    q("Wie findest du heraus, welche Wörter ein Satzglied bilden?", "Mit der Umstellprobe", ["Mit der Steigerung", "Mit dem Artikel", "Mit dem Zählen der Buchstaben"], "Was beim Umstellen des Satzes zusammen wandert, ist ein Satzglied."),
    q("Welcher Fall antwortet auf die Frage Wessen?", "Genitiv", ["Dativ", "Akkusativ", "Nominativ"], "Wessen Fahrrad ist das? Das Fahrrad meines Bruders. Wessen gehört zum Genitiv."),
  ],
);
