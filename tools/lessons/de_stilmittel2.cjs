// Guided lesson: stylistic devices 2 (repetition, exaggeration, sentence structure).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_04b_stilmittel2.json",
  {
    id: "P_DE_STILMITTEL2",
    subject: "DE",
    title: "Stilmittel 2: Klang, Übertreibung und Satzbau",
    teaser: "Zehn weitere Stilmittel in drei Gruppen: Wiederholungen wie Alliteration und Anapher, Kunstgriffe wie Hyperbel, Euphemismus und rhetorische Frage, und Stilmittel, die im Bau des Satzes stecken. Dazu drei Fragen, mit denen du jedes Stilmittel findest.",
    hook: "In der letzten Lektion ging es um Bilder. Sprache kann aber noch auf andere Weise auffallen. Sie kann etwas wiederholen, bis es im Ohr bleibt. Sie kann übertreiben oder verharmlosen. Und sie kann einen Satz ungewöhnlich bauen. Das sind viele Namen auf einmal, deshalb gehen wir in drei kleinen Gruppen vor.",
    outro: "Du kennst jetzt die wichtigsten Stilmittel, die in der Prüfung vorkommen. Mit drei Fragen findest du sie: Wiederholt sich etwas? Ist es ein Bild? Ist es übertrieben, beschönigt, eine Scheinfrage oder ein Gegensatz? Denk daran, dass in einem Satz oft zwei Stilmittel gleichzeitig stecken.",
    requires: ["P_DE_STILMITTEL"],
  },
  [
    ch(
      "Wiederholungen",
      b(
        "Was sich wiederholt, bleibt im Ohr",
        ["*Milch macht müde Männer munter.*", "Sprich den Satz laut. Was fällt dir auf?"],
        "Du hast es bestimmt gehört. Fast jedes Wort beginnt mit demselben Laut. Das klingt wie ein kleiner Trommelschlag, und der Satz geht einem nicht mehr aus dem Kopf. Wiederholung ist der älteste Kunstgriff der Sprache. Es gibt drei Arten davon.",
      ),
      b(
        "Die Alliteration",
        ["***M**ilch **m**acht **m**üde **M**änner **m**unter.*", "Mehrere Wörter hintereinander beginnen mit demselben Laut.", "Dieses Stilmittel heißt **Alliteration**."],
        "Bei der Alliteration wiederholt sich der Anfangslaut. Zwei Wörter reichen schon: Haus und Hof, Kind und Kegel, frisch und fröhlich. Viele Werbesprüche und Zungenbrecher arbeiten damit. Du erkennst sie, indem du auf die ersten Buchstaben schaust.",
        { tasks: [k("Fischers Fritz fischt frische Fische. Das ist ___.", "eine Alliteration", ["eine Metapher"], "Alle Wörter beginnen mit demselben Laut.", "Mit welchem Buchstaben beginnt jedes Wort in diesem Satz?")] },
      ),
      b(
        "Die Anapher",
        ["***Wer** war das? **Wer** hat das getan? **Wer** steckt dahinter?*", "Mehrere Sätze beginnen mit demselben Wort.", "Dieses Stilmittel heißt **Anapher**."],
        "Bei der Anapher wiederholt sich kein Laut, sondern ein ganzes Wort. Es steht jedes Mal am Anfang eines Satzes oder Satzteils. Das wirkt eindringlich, fast wie ein Hammer, der immer wieder auf dieselbe Stelle schlägt. Reden benutzen dieses Mittel sehr gern.",
      ),
      b(
        "Der Parallelismus",
        ["*Der Mensch läuft, der Fisch schwimmt, der Vogel fliegt.*", "Mehrere Sätze sind genau gleich gebaut.", "Dieses Stilmittel heißt **Parallelismus**."],
        "Hier wiederholt sich der Bau des Satzes. Jeder Teil besteht aus denselben Bausteinen in derselben Reihenfolge: ein Lebewesen und das, was es tut. Parallel bedeutet nebeneinander in gleicher Richtung. Die Sätze laufen wie Schienen nebeneinander her.",
        { tasks: [k("Ich will leben. Ich will lachen. Ich will tanzen. Dreimal dasselbe Wort am Satzanfang: Das ist ___.", "eine Anapher", ["eine Alliteration"], "Jeder Satz beginnt mit demselben Wort.", "Was wiederholt sich hier: ein einzelner Laut oder ein ganzes Wort am Anfang?")] },
      ),
      b(
        "Jetzt du: Was wiederholt sich?",
        "Tipp bei jedem Satz auf das richtige Stilmittel.",
        "Frag dich bei jedem Beispiel, was genau sich wiederholt. Ist es der Anfangslaut, ein Wort am Satzanfang oder der Bau des ganzen Satzes?",
        {
          tasks: [
            k("Wind und Wetter. Das ist ___.", "eine Alliteration", ["eine Anapher"], "Beide Wörter beginnen mit demselben Laut.", "Schau auf die ersten Buchstaben der beiden Wörter."),
            k("Heute lernen wir. Heute lachen wir. Heute feiern wir. Das ist ___.", "eine Anapher", ["eine Alliteration"], "Jeder Satz beginnt mit demselben Wort.", "Mit welchem Wort beginnt jeder der drei Sätze?"),
            k("Die Sonne scheint, der Wind weht, der Regen fällt. Das ist ___.", "ein Parallelismus", ["eine Anapher"], "Alle drei Teile sind genau gleich gebaut, aber sie beginnen mit verschiedenen Wörtern.", "Beginnen die Teile mit demselben Wort, oder sind sie nur gleich gebaut?"),
          ],
        },
      ),
    ),
    ch(
      "Übertreiben, beschönigen und fragen",
      b(
        "Die Hyperbel",
        ["*Ich habe dir das **tausendmal** gesagt.*", "*Ich sterbe vor Hunger.*", "Eine starke Übertreibung heißt **Hyperbel**."],
        "Niemand sagt etwas wirklich tausendmal, und niemand stirbt vor dem Abendessen. Solche Übertreibungen benutzt du jeden Tag. Sie machen deutlich, wie stark ein Gefühl ist. Du erkennst eine Hyperbel daran, dass sie wörtlich genommen unmöglich ist.",
      ),
      b(
        "Der Euphemismus",
        [L("*Seniorenresidenz* für Altersheim", "*von uns gegangen* für gestorben"), "Etwas Unangenehmes wird schöner gesagt.", "Dieses Stilmittel heißt **Euphemismus**."],
        "Der Euphemismus ist das Gegenteil der Hyperbel. Er macht etwas kleiner oder freundlicher, als es ist. Man benutzt ihn, um niemanden zu verletzen oder um etwas Unschönes zu verstecken. Auf Deutsch sagt man auch Beschönigung dazu.",
        { tasks: [k("Der Wagen ist nicht mehr ganz neu, sagt der Händler über ein Wrack. Das ist ___.", "ein Euphemismus", ["eine Hyperbel"], "Etwas Unangenehmes wird freundlicher ausgedrückt, als es ist.", "Macht der Händler die Sache größer oder kleiner, als sie ist?")] },
      ),
      b(
        "Die rhetorische Frage",
        ["*Wollen wir das wirklich?*", "*Bin ich etwa dein Diener?*", "Eine Frage, auf die niemand eine Antwort erwartet, heißt **rhetorische Frage**."],
        "Eine rhetorische Frage sieht aus wie eine Frage, ist aber eigentlich eine Aussage. Die Antwort ist von vornherein klar. Wer fragt: Bin ich etwa dein Diener, meint: Ich bin nicht dein Diener. Die Frageform macht die Aussage nur stärker.",
        { tasks: [k("Wer möchte schon gern krank sein? Das ist ___.", "eine rhetorische Frage", ["eine echte Frage"], "Die Antwort ist klar: niemand. Es wird keine Antwort erwartet.", "Erwartet der Sprecher wirklich eine Antwort? Ist sie nicht schon klar?")] },
      ),
      b(
        "Die Ironie",
        ["*Na toll, jetzt regnet es auch noch.*", "Man sagt das Gegenteil von dem, was man meint.", "Dieses Stilmittel heißt **Ironie**."],
        "Niemand findet Regen im falschen Moment toll. Der Sprecher meint das Gegenteil, und jeder versteht das. Bei der Ironie hilft der Zusammenhang. Wenn eine Aussage offensichtlich nicht zur Lage passt, ist sie wahrscheinlich ironisch gemeint.",
      ),
      b(
        "Jetzt du: Welcher Kunstgriff?",
        "Tipp bei jedem Satz auf das richtige Stilmittel.",
        "Frag dich bei jedem Satz: Wird etwas größer gemacht, als es ist? Wird etwas schöner gesagt? Ist es eine Frage ohne Antwort? Oder ist das Gegenteil gemeint?",
        {
          tasks: [
            k("Die Tasche wiegt eine Tonne. Das ist ___.", "eine Hyperbel", ["ein Euphemismus"], "Keine Schultasche wiegt wirklich eine Tonne. Der Satz übertreibt stark.", "Kann eine Tasche wirklich so viel wiegen?"),
            k("Du bist ja heute wieder früh dran, sagt die Lehrerin zu einem Schüler, der zu spät kommt. Das ist ___.", "Ironie", ["eine Hyperbel"], "Gemeint ist das Gegenteil: Der Schüler ist zu spät.", "Passt die Aussage zur Lage, oder meint die Lehrerin das Gegenteil?"),
            k("Wir mussten uns von drei Mitarbeitern trennen, sagt der Chef über Entlassungen. Das ist ___.", "ein Euphemismus", ["Ironie"], "Eine Entlassung wird hier freundlicher ausgedrückt, als sie ist.", "Klingt sich trennen freundlicher oder härter als entlassen?"),
          ],
        },
      ),
    ),
    ch(
      "Der Bau des Satzes",
      b(
        "Die Antithese",
        ["*Jung und Alt, Tag und Nacht, Himmel und Hölle*", "Zwei Gegensätze stehen direkt nebeneinander.", "Dieses Stilmittel heißt **Antithese**."],
        "Gegensätze ziehen Aufmerksamkeit an. Wenn zwei Dinge nebeneinanderstehen, die nicht zusammenpassen, fällt das sofort auf. Anti bedeutet gegen. Bei einer Antithese steht also etwas gegen etwas anderes. Überschriften arbeiten sehr gern damit.",
      ),
      b(
        "Die Klimax",
        ["*Ich kam, ich sah, ich siegte.*", "*Es dauerte Tage, Wochen, Monate.*", "Eine Steigerung in Stufen heißt **Klimax**."],
        "Bei der Klimax wird etwas Schritt für Schritt größer oder stärker. Tage, Wochen, Monate: Jedes Wort ist mehr als das davor. Klimax ist das griechische Wort für Leiter. Du steigst sozusagen Sprosse um Sprosse nach oben.",
        { tasks: [k("Er bat, er bettelte, er flehte. Das ist ___.", "eine Klimax", ["eine Antithese"], "Jedes Wort ist stärker als das davor.", "Werden die drei Wörter von links nach rechts stärker?")] },
      ),
      b(
        "Die Ellipse",
        ["*Erst die Arbeit, dann das Vergnügen.*", "*Ende gut, alles gut.*", "Ein Satz, in dem etwas fehlt, heißt **Ellipse**."],
        "In diesen Sätzen fehlt das Wort, das sagt, was geschieht. Vollständig hieße es: Erst kommt die Arbeit, dann kommt das Vergnügen. Trotzdem versteht jeder den Satz. Durch die Kürze klingt er knapp und einprägsam, fast wie ein Sprichwort.",
        { tasks: [k("Je früher, desto besser. In diesem Satz fehlt ___.", "das Wort, das sagt, was geschieht", ["ein Komma"], "Vollständig hieße es etwa: Je früher es geschieht, desto besser ist es.", "Kannst du in dem Satz ein Wort finden, das sagt, was geschieht?")] },
      ),
      b(
        "Drei Fragen, mit denen du jedes Stilmittel findest",
        ["(1) **Wiederholt** sich etwas? Ein Laut, ein Wort, der Satzbau?", "(2) Ist es ein **Bild**? Mit wie, ohne wie, oder handelt ein Ding?", "(3) Ist es **übertrieben, beschönigt, eine Scheinfrage oder ein Gegensatz**?"],
        "Mit diesen drei Fragen gehst du an jeden Satz heran. Sie führen dich zu den drei Gruppen, die du kennst. Die erste Frage führt zu Alliteration, Anapher und Parallelismus. Die zweite führt zu den Sprachbildern. Die dritte führt zu den Kunstgriffen und zum Satzbau.",
      ),
      b(
        "Zwei Stilmittel in einem Satz",
        ["*Ist der Mensch nur ein nackter Affe?*", L("Eine Frage ohne Antwort: rhetorische Frage.", "Der Mensch wird als Affe bezeichnet: Metapher.")],
        "In der Prüfung heißt es oft: Notieren Sie zwei Stilmittel. Dann stecken tatsächlich zwei in einem Satz. Geh einfach alle drei Fragen durch und hör nicht nach dem ersten Fund auf. Hier findest du eine rhetorische Frage und zugleich eine Metapher.",
        { tasks: [k("Stark wie ein Stier und sanft wie ein Lamm. Hier stecken ein Gegensatz und ___.", "zwei Vergleiche", ["eine Ellipse"], "Zweimal steht das Wort wie. Stark und sanft bilden außerdem einen Gegensatz.", "Welches kleine Wort kommt in dem Satz zweimal vor?")] },
      ),
      b(
        "Jetzt du: alles gemischt",
        "Tipp bei jedem Satz auf das richtige Stilmittel.",
        "Jetzt kommen Stilmittel aus beiden Lektionen vor. Geh die drei Fragen der Reihe nach durch. Lass dir Zeit, es sind viele Namen.",
        {
          tasks: [
            k("Heiß geliebt und kalt getrunken. Das ist ___.", "eine Antithese", ["eine Klimax"], "Heiß und kalt sind Gegensätze, die direkt nebeneinanderstehen.", "Welche beiden Wörter in dem Satz sind Gegensätze?"),
            k("Ohne Fleiß kein Preis. Das ist ___.", "eine Ellipse", ["eine Hyperbel"], "Im Satz fehlt das Wort, das sagt, was geschieht.", "Ist der Satz vollständig, oder fehlt etwas?"),
            k("Der Berg ruft. Das ist ___.", "eine Personifikation", ["eine Alliteration"], "Rufen können nur Lebewesen. Der Berg wird wie eine Person behandelt.", "Kann ein Berg wirklich rufen, so wie ein Mensch es tut?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Wiederholung**: Alliteration, Anapher, Parallelismus", "**Kunstgriffe**: Hyperbel, Euphemismus, rhetorische Frage, Ironie", "**Satzbau**: Antithese, Klimax, Ellipse")],
        "Das sind die zehn Stilmittel dieser Lektion in ihren drei Gruppen. Du musst sie nicht alle heute sicher können. Auf dem Spickzettel findest du jedes mit einem Beispiel wieder. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Eine Steigerung in Stufen heißt ___.", "Klimax", ["Ellipse"], "Das Wort bedeutet Leiter. Es geht Stufe für Stufe nach oben.", "Welches der beiden Wörter bedeutet Leiter?")] },
      ),
    ),
  ],
  [
    v("Alliteration", "Mehrere Wörter hintereinander beginnen mit demselben Laut.", "Milch macht müde Männer munter."),
    v("Anapher", "Mehrere Sätze beginnen mit demselben Wort.", "Wer war das? Wer hat das getan?"),
    v("Parallelismus", "Mehrere Sätze sind gleich gebaut.", "Der Mensch läuft, der Fisch schwimmt."),
    v("Hyperbel", "Eine starke Übertreibung.", "Ich habe dir das tausendmal gesagt."),
    v("Euphemismus", "Eine Beschönigung: Etwas Unangenehmes wird freundlicher gesagt.", "Seniorenresidenz"),
    v("rhetorische Frage", "Eine Frage, auf die keine Antwort erwartet wird.", "Wollen wir das wirklich?"),
    v("Ironie", "Man sagt das Gegenteil von dem, was man meint.", "Na toll, es regnet."),
    v("Antithese", "Zwei Gegensätze stehen nebeneinander.", "Jung und Alt"),
    v("Klimax", "Eine Steigerung in Stufen.", "Tage, Wochen, Monate"),
    v("Ellipse", "Ein Satz, in dem etwas fehlt.", "Erst die Arbeit, dann das Vergnügen."),
  ],
  [
    q("Haus und Hof: Welches Stilmittel ist das?", "eine Alliteration", ["eine Anapher", "eine Antithese", "eine Ellipse"], "Beide Wörter beginnen mit demselben Laut. Das ist das Kennzeichen der Alliteration."),
    q("Ich warte schon eine Ewigkeit. Welches Stilmittel ist das?", "eine Hyperbel", ["ein Euphemismus", "eine Klimax", "eine Anapher"], "Niemand wartet wirklich ewig. Der Satz übertreibt stark."),
    q("Wer will das schon? Welches Stilmittel ist das?", "eine rhetorische Frage", ["eine Ellipse", "eine Alliteration", "ein Parallelismus"], "Die Antwort ist klar: niemand. Die Frage erwartet keine Antwort."),
    q("Er weinte, er schluchzte, er brüllte. Welches Stilmittel ist das?", "eine Klimax", ["eine Antithese", "ein Euphemismus", "eine Ironie"], "Jedes Wort ist stärker als das davor. Das ist eine Steigerung in Stufen."),
    q("Was ist ein Euphemismus?", "Etwas Unangenehmes wird freundlicher gesagt.", ["Etwas wird stark übertrieben.", "Ein Laut wiederholt sich.", "Zwei Gegensätze stehen nebeneinander."], "Ein Euphemismus beschönigt. Die Seniorenresidenz klingt freundlicher als das Altersheim."),
    q("Arm und Reich, Groß und Klein: Welches Stilmittel ist das?", "eine Antithese", ["eine Klimax", "eine Anapher", "eine Hyperbel"], "Arm und reich sind Gegensätze, groß und klein auch. Sie stehen jeweils direkt nebeneinander."),
    q("Was fehlt in einer Ellipse?", "ein Teil des Satzes, meistens das Wort für das Geschehen", ["das Satzzeichen am Ende", "der große Anfangsbuchstabe", "das Wort wie"], "Erst die Arbeit, dann das Vergnügen: Vollständig stünde dort zweimal kommt."),
    q("Du sollst zwei Stilmittel in einem Satz finden. Wie gehst du vor?", "Ich gehe alle drei Fragen durch und höre nach dem ersten Fund nicht auf.", ["Ich nenne dasselbe Stilmittel zweimal.", "Ich rate.", "Ich zähle die Wörter."], "In einem Satz können mehrere Stilmittel gleichzeitig stecken. Die drei Fragen führen dich zu allen."),
  ],
);
