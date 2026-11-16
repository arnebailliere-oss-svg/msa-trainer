// Guided lesson: German tenses.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_07a_zeitformen.json",
  {
    id: "P_DE_ZEITFORMEN",
    subject: "DE",
    title: "Die Zeitformen des Verbs",
    teaser: "Präsens, Präteritum, Perfekt, Plusquamperfekt und Futur: was jede Zeitform bedeutet, wie sie gebaut ist und woran du sie in einem Satz erkennst.",
    hook: "Du benutzt die deutschen Zeitformen jeden Tag richtig, ohne darüber nachzudenken. Niemand muss dir beibringen, dass es gestern ging ich heißt. Was dir vielleicht fehlt, sind die Namen und ein klarer Blick dafür, wie die Formen gebaut sind. Genau das schauen wir uns jetzt an.",
    outro: "Du kennst jetzt die fünf Zeitformen, die in der Prüfung vorkommen. Präsens und Präteritum bestehen aus einem Verbteil. Perfekt, Plusquamperfekt und Futur bestehen aus zwei Teilen, und der erste Teil verrät dir die Zeitform. Mehr brauchst du nicht, um jede Form sicher zu benennen.",
    requires: ["P_DE_WORTARTEN"],
  },
  [
    ch(
      "Jetzt und früher",
      b(
        "Das Verb zeigt die Zeit",
        [L("ich **gehe**", "ich **ging**", "ich **werde gehen**"), "Diese Formen nennt man Zeitformen. Das Fachwort heißt **Tempus**."],
        "Dreimal dasselbe Verb, und jedes Mal ist eine andere Zeit gemeint. Im ersten Satz ist es jetzt, im zweiten war es früher, im dritten kommt es noch. Das Verb ist die einzige Wortart, die so etwas kann. Tempus ist das lateinische Wort für Zeit.",
      ),
      b(
        "Präsens: die Gegenwart",
        ["ich **gehe**, du **lachst**, sie **schläft**", "Diese Zeitform heißt **Präsens**."],
        "Das Präsens benutzt du für alles, was jetzt gerade passiert. Du benutzt es auch für Dinge, die immer gelten: Die Erde dreht sich um die Sonne. Es ist die einfachste Form des Verbs, und sie besteht aus einem einzigen Wort.",
      ),
      b(
        "Präteritum: die erzählte Vergangenheit",
        ["ich **ging**, du **lachtest**, sie **schlief**", "Diese Zeitform heißt **Präteritum**."],
        "Das Präteritum ist eine Vergangenheit, die aus einem einzigen Wort besteht. Du findest sie vor allem in Büchern, Märchen und Berichten. Es war einmal ein König ist Präteritum. Beim Sprechen benutzt man sie seltener, außer bei war und hatte.",
        { tasks: [k("Gestern ___ es den ganzen Tag.", "regnete", ["regnet"], "Gestern ist vorbei. Die Vergangenheit in einem Wort ist das Präteritum.", "Ist gestern jetzt oder früher? Welche Form passt zu früher?")] },
      ),
      b(
        "Schwache und starke Verben",
        [L("lachen: ich lach**te**", "Hier kommt nur -te dazu."), L("gehen: ich **ging**", "Hier ändert sich der **Vokal**, also der Laut in der Mitte.")],
        "Es gibt zwei Sorten von Verben. Die einen bilden das Präteritum ganz regelmäßig mit te. Man nennt sie schwache Verben. Die anderen ändern ihren Vokal: gehen, ging. Singen, sang. Man nennt sie starke Verben. Die starken musst du kennen, aber die meisten kennst du schon.",
        { tasks: [k("Das Präteritum von singen heißt: ich ___.", "sang", ["singte"], "Singen ist ein starkes Verb. Der Vokal ändert sich.", "Wie würdest du in einem Märchen schreiben, was der Vogel gestern tat?")] },
      ),
      b(
        "Perfekt: die gesprochene Vergangenheit",
        ["ich **habe** gelacht", "ich **bin** gegangen", "Diese Zeitform heißt **Perfekt**."],
        "Das Perfekt ist die Vergangenheit, die du beim Sprechen benutzt. Es besteht aus zwei Teilen. Der erste Teil ist eine Form von haben oder sein. Der zweite Teil ist eine besondere Form des Verbs, die meistens mit ge beginnt. Sie heißt **Partizip**.",
      ),
      b(
        "haben oder sein?",
        [L("ich **bin** gegangen, gefahren, aufgewacht", "Bei Bewegung und Veränderung steht sein."), L("ich **habe** gelacht, gegessen, gelesen", "Bei fast allen anderen Verben steht haben.")],
        "Die meisten Verben bilden das Perfekt mit haben. Sein steht nur bei zwei Gruppen. Die erste sind Verben, bei denen man sich von einem Ort zum anderen bewegt: gehen, fahren, laufen. Die zweite sind Verben, bei denen sich ein Zustand ändert: aufwachen, einschlafen, wachsen.",
        { tasks: [k("Wir ___ nach Hause gelaufen.", "sind", ["haben"], "Laufen ist eine Bewegung von einem Ort zum anderen.", "Bewegt man sich bei diesem Verb von einem Ort zum anderen?")] },
      ),
      b(
        "Jetzt du: Präsens, Präteritum oder Perfekt?",
        "Tipp bei jedem Satz auf die richtige Zeitform.",
        "Schau bei jedem Satz zuerst, aus wie vielen Teilen das Verb besteht. Ein Teil bedeutet Präsens oder Präteritum. Zwei Teile mit haben oder sein bedeuten Perfekt.",
        {
          tasks: [
            k("Ich habe den Film gesehen. Das ist ___.", "Perfekt", ["Präteritum"], "Das Verb besteht aus zwei Teilen: habe und gesehen.", "Aus wie vielen Teilen besteht das Verb in diesem Satz?"),
            k("Der König lebte in einem Schloss. Das ist ___.", "Präteritum", ["Perfekt"], "Das Verb besteht aus einem Wort und erzählt von früher.", "Aus wie vielen Teilen besteht das Verb? Geht es um jetzt oder um früher?"),
            k("Meine Schwester liest ein Buch. Das ist ___.", "Präsens", ["Präteritum"], "Das geschieht jetzt, und das Verb besteht aus einem Wort.", "Geschieht das jetzt oder ist es schon vorbei?"),
          ],
        },
      ),
    ),
    ch(
      "Noch früher und später",
      b(
        "Plusquamperfekt: die Vorvergangenheit",
        ["*Als ich ankam, **war** der Zug schon **abgefahren**.*", "Diese Zeitform heißt **Plusquamperfekt**."],
        "Manchmal erzählst du von zwei Dingen in der Vergangenheit, und eins davon war noch früher. Erst fuhr der Zug ab, dann kam ich an. Für das, was zuerst geschah, gibt es eine eigene Zeitform. Sie besteht aus hatte oder war und dem Partizip.",
      ),
      b(
        "Zwei Zeiten in einem Satz",
        ["*Nachdem ich **gegessen hatte**, **ging** ich hinaus.*", L("Zuerst: das Essen. Das ist Plusquamperfekt.", "Danach: das Hinausgehen. Das ist Präteritum.")],
        "Das Plusquamperfekt steht fast nie allein. Es braucht eine zweite Handlung, die später geschah. Besonders oft findest du es nach den Wörtern nachdem und als. Das Frühere bekommt hatte oder war, das Spätere steht im Präteritum.",
        { tasks: [k("Nachdem er die Hausaufgaben ___, spielte er Fußball.", "gemacht hatte", ["gemacht hat"], "Die Hausaufgaben waren zuerst. Für das Frühere steht hatte.", "Was geschah zuerst? In welcher Zeit steht das Spätere?")] },
      ),
      b(
        "Futur: die Zukunft",
        ["ich **werde** gehen, es **wird** regnen", "Diese Zeitform heißt **Futur**."],
        "Für das, was noch kommt, gibt es das Futur. Es besteht aus einer Form von werden und dem Verb im Infinitiv. Ich werde gehen, du wirst gehen, er wird gehen. Den Infinitiv kennst du schon als die Grundform des Verbs.",
        { tasks: [k("Morgen ___ es regnen.", "wird", ["wurde"], "Morgen kommt noch. Für die Zukunft steht eine Form von werden im Präsens.", "Liegt morgen in der Zukunft oder in der Vergangenheit?")] },
      ),
      b(
        "Zukunft ohne Futur",
        ["*Morgen **fahre** ich nach Köln.*", "Hier steht das Präsens, obwohl es um morgen geht."],
        "Im Alltag benutzt man für die Zukunft meistens das Präsens. Das Wort morgen zeigt schon, dass es noch nicht geschehen ist. In der Prüfung benennst du trotzdem die Form, die du siehst. Fahre ist Präsens, auch wenn die Fahrt erst morgen stattfindet.",
      ),
      b(
        "Jetzt du: Welche Zeitform?",
        "Tipp bei jedem Satz auf die richtige Zeitform.",
        "Achte bei zwei Verbteilen auf den ersten Teil. Hatte oder war zeigen das Plusquamperfekt. Werde, wirst oder wird zeigen das Futur.",
        {
          tasks: [
            k("Wir werden pünktlich ankommen. Das ist ___.", "Futur", ["Perfekt"], "Der erste Verbteil ist eine Form von werden, danach steht der Infinitiv.", "Welches Wort ist der erste Teil des Verbs?"),
            k("Sie hatte den Schlüssel vergessen. Das ist ___.", "Plusquamperfekt", ["Perfekt"], "Der erste Verbteil heißt hatte. Das zeigt die Vorvergangenheit.", "Heißt der erste Verbteil hat oder hatte?"),
            k("Morgen schreiben wir einen Test. Das ist ___.", "Präsens", ["Futur"], "Das Verb besteht aus einem Wort in der Gegenwartsform. Nur das Wort morgen zeigt auf die Zukunft.", "Steht im Satz eine Form von werden?"),
          ],
        },
      ),
    ),
    ch(
      "Alle Zeitformen auf einen Blick",
      b(
        "Der Zeitstrahl",
        ["Von links nach rechts: Plusquamperfekt, Präteritum und Perfekt, Präsens, Futur."],
        "Hier siehst du alle Zeitformen mit dem Verb gehen auf einer Linie. Ganz links steht das, was am weitesten zurückliegt. In der Mitte steht jetzt. Rechts steht, was noch kommt. Präteritum und Perfekt liegen an derselben Stelle, denn beide meinen einfach früher.",
        { figure: { type: "timeline", points: [{ at: -0.85, label: "war gegangen" }, { at: -0.4, label: "ging" }, { at: 0, label: "gehe" }, { at: 0.6, label: "werde gehen" }] } },
      ),
      b(
        "So erkennst du die Zeitform",
        [L("**Ein Verbteil**: Präsens oder Präteritum", "**habe** oder **bin** und Partizip: Perfekt", "**hatte** oder **war** und Partizip: Plusquamperfekt", "**werde** und Infinitiv: Futur")],
        "Mit dieser kleinen Liste benennst du jede Form. Zähl zuerst die Verbteile. Bei zwei Teilen schaust du nur auf den ersten. Er verrät dir alles. Habe und bin gehören zum Perfekt, hatte und war zum Plusquamperfekt, und werde gehört zum Futur.",
        { tasks: [k("Der erste Verbteil heißt war, der zweite ist ein Partizip. Das ist ___.", "Plusquamperfekt", ["Perfekt"], "War und hatte zeigen die Vorvergangenheit an.", "Schau in die dritte Zeile der Tafel.")] },
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Jetzt kommen alle fünf Zeitformen vor. Geh jedes Mal gleich vor: Verbteile zählen, bei zwei Teilen auf den ersten schauen.",
        {
          tasks: [
            k("Er ist gestern angekommen. Das ist ___.", "Perfekt", ["Plusquamperfekt"], "Der erste Verbteil heißt ist. Das gehört zum Perfekt.", "Heißt der erste Verbteil ist oder war?"),
            k("Das Kind schlief tief. Das ist ___.", "Präteritum", ["Präsens"], "Das Verb besteht aus einem Wort und erzählt von früher. Im Präsens hieße es schläft.", "Wie hieße das Verb, wenn es jetzt geschähe?"),
            k("Setz ins Perfekt: Ich lese ein Buch. Ich ___ ein Buch gelesen.", "habe", ["bin"], "Lesen ist keine Bewegung von Ort zu Ort. Deshalb steht haben.", "Ist Lesen eine Bewegung von einem Ort zum anderen?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Präsens**: ich gehe", "**Präteritum**: ich ging", "**Perfekt**: ich bin gegangen", "**Plusquamperfekt**: ich war gegangen", "**Futur**: ich werde gehen")],
        "Das sind die fünf Zeitformen mit je einem Beispiel. Wenn du dir diese fünf Zeilen merkst, kannst du jede andere Form daran messen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Es war einmal ein König, der ___ in einem Schloss.", "lebte", ["hat gelebt"], "Märchen und Erzählungen stehen im Präteritum. Das ist hier die Form mit -te.", "Welche der beiden Formen klingt nach einem Märchen?")] },
      ),
    ),
  ],
  [
    v("Tempus", "Das Fachwort für Zeitform."),
    v("Präsens", "Die Gegenwart. Ein Verbteil.", "ich gehe"),
    v("Präteritum", "Die erzählte Vergangenheit. Ein Verbteil.", "ich ging"),
    v("Perfekt", "Die gesprochene Vergangenheit. Haben oder sein und das Partizip.", "ich bin gegangen"),
    v("Plusquamperfekt", "Die Vorvergangenheit. Hatte oder war und das Partizip.", "ich war gegangen"),
    v("Futur", "Die Zukunft. Werden und der Infinitiv.", "ich werde gehen"),
    v("Partizip", "Die Form des Verbs, die im Perfekt steht. Sie beginnt meistens mit ge.", "gelacht, gegangen"),
    v("schwache und starke Verben", "Schwache Verben bilden das Präteritum mit te. Starke Verben ändern ihren Vokal.", "lachte; ging"),
  ],
  [
    q("In welcher Zeitform steht: Wir sind ans Meer gefahren?", "Perfekt", ["Präteritum", "Plusquamperfekt", "Futur"], "Das Verb besteht aus zwei Teilen: sind und gefahren. Der erste Teil ist eine Form von sein im Präsens."),
    q("In welcher Zeitform steht: Der Hund bellte laut?", "Präteritum", ["Perfekt", "Präsens", "Futur"], "Das Verb besteht aus einem Wort und erzählt von früher. Die Endung te zeigt ein schwaches Verb im Präteritum."),
    q("In welcher Zeitform steht: Sie hatte schon gegessen?", "Plusquamperfekt", ["Perfekt", "Präteritum", "Präsens"], "Der erste Verbteil heißt hatte. Hatte oder war mit dem Partizip ist das Plusquamperfekt."),
    q("In welcher Zeitform steht: Ich werde dich anrufen?", "Futur", ["Präsens", "Perfekt", "Präteritum"], "Werde und der Infinitiv anrufen bilden zusammen das Futur."),
    q("Welche Form ist das Präteritum von kommen?", "ich kam", ["ich kommte", "ich bin gekommen", "ich komme"], "Kommen ist ein starkes Verb. Im Präteritum ändert sich der Vokal: kam."),
    q("Ich ___ gestern früh aufgewacht.", "bin", ["habe", "werde", "hatte"], "Aufwachen ist eine Veränderung des Zustands. Solche Verben bilden das Perfekt mit sein."),
    q("Nachdem es ___, kam die Sonne heraus.", "geregnet hatte", ["geregnet hat", "regnet", "regnen wird"], "Der Regen war zuerst. Das Frühere steht im Plusquamperfekt, das Spätere im Präteritum."),
    q("Was bedeutet das Wort Tempus?", "Zeitform", ["Wortart", "Satzglied", "Fall"], "Tempus ist das lateinische Wort für Zeit. In der Grammatik meint es die Zeitform des Verbs."),
  ],
);
