// Guided lesson: main clause, subordinate clause, relative clause.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_01_satz.json",
  {
    id: "P_DE_SATZ",
    subject: "DE",
    title: "Hauptsatz und Nebensatz",
    teaser: "Wie du einen Satz in seine Teile zerlegst, woran du einen Hauptsatz und einen Nebensatz erkennst und was ein Relativsatz ist. Das ist die Grundlage für alle Kommaregeln.",
    hook: "Viele Sätze bestehen aus mehreren Teilen, und zwischen diesen Teilen stehen später die Kommas. Bevor wir aber über Kommas reden, musst du die Teile sehen können. Das ist gar nicht schwer, denn es gibt ein Wort, das dir jeden Teil verrät. Du kennst es schon aus der Lektion über die Wortarten.",
    outro: "Du kannst jetzt einen Satz in Teilsätze zerlegen, indem du die Verben zählst. Du weißt, dass ein Hauptsatz allein stehen kann und dass im Nebensatz das Verb am Ende steht. Und du erkennst einen Relativsatz daran, dass er ein Nomen genauer erklärt. Damit bist du bereit für die Kommas.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2"],
  },
  [
    ch(
      "Ein Verb, ein Teilsatz",
      b(
        "Jeder Satz braucht ein Verb",
        ["Ich **lese**.", "Der Hund **bellt**.", "Ohne Verb gibt es keinen Satz."],
        "Fangen wir mit dem Kleinsten an. Ein Satz kann aus nur zwei Wörtern bestehen, aber eins davon muss ein Verb sein. Das Verb sagt, was geschieht. Wenn du einen Satz untersuchen willst, suchst du deshalb immer zuerst das Verb.",
      ),
      b(
        "Zwei Verben, zwei Teile",
        ["Ich **lese** ein Buch, weil es **regnet**.", "Hier stehen zwei Verben, also hat der Satz zwei Teile.", "Jeder Teil heißt **Teilsatz**."],
        "In diesem Satz passieren zwei Dinge. Ich lese, und es regnet. Zu jedem Verb gehört ein eigener Teil des Satzes. So einen Teil nennt man Teilsatz. Die Regel ist ganz einfach: So viele Verben, so viele Teilsätze.",
        { tasks: [k("Ich gehe raus, wenn die Sonne scheint. Der Satz hat ___ Teilsätze.", "zwei", ["drei"], "Es gibt zwei Verben: gehe und scheint. Zu jedem gehört ein Teilsatz.", "Zähl die Verben im Satz. Wie viele findest du?")] },
      ),
      b(
        "Aufpassen bei zweiteiligen Verben",
        ["Ich **habe** lange **geschlafen**.", "Das sind zwei Wörter, aber nur **ein** Verb: schlafen.", "Der Satz hat einen Teilsatz."],
        "Hier musst du genau hinschauen. Habe und geschlafen gehören zusammen und bilden gemeinsam die Vergangenheit von schlafen. Du zählst sie als ein Verb. Frag dich immer: Wie viele verschiedene Dinge geschehen in diesem Satz? Hier ist es nur eins.",
      ),
      b(
        "Jetzt du: Teilsätze zählen",
        "Tipp bei jedem Satz auf die richtige Zahl.",
        "Such in jedem Satz die Verben. Zähl dabei, wie viele verschiedene Dinge geschehen. Wörter wie habe und ist können zu einem zweiten Wort am Satzende gehören.",
        {
          tasks: [
            k("Tom lacht laut. Der Satz hat ___.", "einen Teilsatz", ["zwei Teilsätze"], "Es gibt nur ein Verb: lacht. Also gibt es nur einen Teilsatz.", "Wie viele Dinge geschehen in diesem kurzen Satz?"),
            k("Sie sagt, dass sie müde ist. Der Satz hat ___.", "zwei Teilsätze", ["einen Teilsatz"], "Es gibt zwei Verben: sagt und ist. Zu jedem gehört ein Teilsatz.", "Zähl die Verben. Denk daran, dass auch sein ein Verb ist."),
            k("Wir sind gestern ins Kino gegangen. Der Satz hat ___.", "einen Teilsatz", ["zwei Teilsätze"], "Sind und gegangen gehören zusammen. Es geschieht nur eine Sache.", "Gehören die beiden Verbteile zusammen, oder geschehen zwei verschiedene Dinge?"),
          ],
        },
      ),
    ),
    ch(
      "Hauptsatz und Nebensatz",
      b(
        "Der Hauptsatz",
        ["*Ich lese ein Buch.*", "Dieser Satz kann **allein** stehen.", "Er heißt **Hauptsatz**."],
        "Lies den Satz und frag dich, ob etwas fehlt. Es fehlt nichts. Der Satz ist fertig und verständlich. So einen Satz nennt man Hauptsatz. Er braucht keinen anderen Satz neben sich.",
      ),
      b(
        "Im Hauptsatz steht das Verb an zweiter Stelle",
        ["Ich | **lese** | ein Buch.", "Heute | **lese** | ich ein Buch.", "Egal, was vorn steht: Das Verb kommt als Zweites."],
        "Das ist das Erkennungszeichen des Hauptsatzes. Du kannst den Satz umstellen, wie du willst. Das Verb bleibt immer an der zweiten Stelle. Vorn kann ich stehen oder heute oder im Garten, aber danach kommt sofort das Verb.",
        { tasks: [k("Im Hauptsatz steht das Verb an ___ Stelle.", "zweiter", ["letzter"], "Vor dem Verb steht genau ein Satzglied, danach kommt der Rest.", "Schau auf die beiden Beispiele. An welcher Stelle steht lese?")] },
      ),
      b(
        "Der Nebensatz",
        ["*… weil es regnet.*", "Sag das einmal ganz allein. Es fehlt etwas.", "Dieser Teil heißt **Nebensatz**."],
        "Probier es aus und sag nur: weil es regnet. Dein Gegenüber wartet darauf, dass du weitersprichst. Ein Nebensatz ist allein nicht vollständig. Er braucht einen Hauptsatz, an den er sich anlehnen kann.",
      ),
      b(
        "Im Nebensatz steht das Verb am Ende",
        ["… weil es **regnet**.", "… dass sie müde **ist**.", "… wenn ich Zeit **habe**."],
        "Das ist das Erkennungszeichen des Nebensatzes. Das Verb wandert ganz ans Ende. Halte den Hauptsatz daneben: Ich habe Zeit. Im Nebensatz heißt es: wenn ich Zeit habe. Wenn du das Verb am Ende eines Teilsatzes findest, ist es ein Nebensatz.",
        { tasks: [k("Welcher Nebensatz ist richtig gebaut? ___", "weil ich müde bin", ["weil ich bin müde"], "Im Nebensatz steht das Verb ganz am Ende.", "An welcher Stelle muss das Verb im Nebensatz stehen?")] },
      ),
      b(
        "Drei Zeichen für einen Nebensatz",
        ["(1) Er beginnt oft mit **weil, dass, wenn, obwohl, als** oder **ob**.", "(2) Das Verb steht am Ende.", "(3) Er kann nicht allein stehen."],
        "Mit diesen drei Zeichen erkennst du jeden Nebensatz. Das erste Wort ist meistens eine Konjunktion. Das Verb steht am Ende. Und wenn du den Teil allein sprichst, klingt er unfertig. Meistens treffen alle drei Zeichen gleichzeitig zu.",
      ),
      b(
        "Der Nebensatz kann vorn stehen",
        ["***Weil es regnet,** lese ich ein Buch.*", "Der Nebensatz steht jetzt am Anfang.", "Der Hauptsatz danach beginnt mit dem Verb."],
        "Nebensätze müssen nicht hinten stehen. Sie können auch ganz vorn stehen. An den drei Zeichen ändert das nichts. Weil es regnet beginnt mit einer Konjunktion, das Verb steht am Ende, und allein ist der Teil unfertig.",
      ),
      b(
        "Jetzt du: Hauptsatz oder Nebensatz?",
        "Tipp bei jedem Teil auf die richtige Lösung.",
        "Prüf bei jedem Teil die drei Zeichen. Wo steht das Verb? Mit welchem Wort beginnt der Teil? Und klingt er fertig, wenn du ihn allein sprichst?",
        {
          tasks: [
            k("obwohl er krank war: Das ist ein ___.", "Nebensatz", ["Hauptsatz"], "Der Teil beginnt mit einer Konjunktion, und das Verb steht am Ende.", "Sprich den Teil allein. Klingt er fertig?"),
            k("Er ging trotzdem zur Schule: Das ist ein ___.", "Hauptsatz", ["Nebensatz"], "Der Satz kann allein stehen, und das Verb steht an zweiter Stelle.", "An welcher Stelle steht das Verb ging?"),
            k("dass du heute kommst: Das ist ein ___.", "Nebensatz", ["Hauptsatz"], "Der Teil beginnt mit dass, und das Verb steht am Ende.", "Mit welchem Wort beginnt der Teil, und wo steht das Verb?"),
          ],
        },
      ),
    ),
    ch(
      "Der Relativsatz",
      b(
        "Ein Nebensatz, der ein Nomen erklärt",
        ["*Das Buch, **das ich lese**, ist spannend.*", "Der fette Teil sagt, welches Buch gemeint ist.", "So ein Nebensatz heißt **Relativsatz**."],
        "Es gibt eine besondere Art von Nebensatz. Er hängt nicht an einem ganzen Satz, sondern an einem einzelnen Nomen. Er erklärt dieses Nomen genauer. Welches Buch ist spannend? Das, das ich gerade lese. Das Verb steht auch hier am Ende.",
      ),
      b(
        "Er beginnt mit der, die oder das",
        [L("Der Mann, **der** dort steht", "Die Frau, **die** lacht", "Das Kind, **das** spielt"), "Diese Wörter heißen hier **Relativpronomen**."],
        "Ein Relativsatz beginnt nicht mit weil oder dass. Er beginnt mit der, die oder das. Das Wort richtet sich nach dem Nomen davor. Der Mann, der. Die Frau, die. Das Kind, das. In dieser Aufgabe heißen diese Wörter Relativpronomen.",
      ),
      b(
        "Artikel oder Relativpronomen?",
        [L("***Das** Buch ist gut.*", "Hier ist das ein Artikel. Es steht vor einem Nomen."), L("*Das Buch, **das** ich lese*", "Hier ist das ein Relativpronomen. Es leitet einen Nebensatz ein.")],
        "Der, die und das sehen als Artikel und als Relativpronomen gleich aus. Du unterscheidest sie an dem, was danach kommt. Nach dem Artikel folgt ein Nomen. Nach dem Relativpronomen folgt ein Nebensatz, in dem das Verb am Ende steht. Nur vor dem Relativpronomen steht ein Komma.",
        { tasks: [k("Das Auto ist neu. Das erste Wort ist hier ___.", "ein Artikel", ["ein Relativpronomen"], "Danach folgt direkt ein Nomen: Auto.", "Was folgt direkt nach dem Wort: ein Nomen oder ein Nebensatz?")] },
      ),
      b(
        "Die Probe mit welcher, welche, welches",
        ["*Das Buch, **welches** ich lese*", "Passt welches, welcher oder welche, dann ist es ein Relativpronomen."],
        "Wenn du unsicher bist, machst du diese Probe. Du ersetzt der, die oder das durch welcher, welche oder welches. Klingt der Satz dann immer noch richtig, hast du ein Relativpronomen vor dir. Beim Artikel funktioniert das nicht: Welches Buch ist gut wäre eine Frage.",
        { tasks: [k("Die Tasche, die dort liegt, gehört mir. Kannst du für das zweite die das Wort welche einsetzen? ___", "Ja", ["Nein"], "Die Tasche, welche dort liegt: Das klingt richtig. Es ist ein Relativpronomen.", "Sprich den Satz mit welche. Klingt er immer noch richtig?")] },
      ),
      b(
        "Jetzt du: Relativsätze finden",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Such in jedem Satz den Teil, der ein Nomen genauer erklärt. Er beginnt mit der, die oder das, und sein Verb steht am Ende.",
        {
          tasks: [
            k("Der Hund, der dort bellt, gehört mir. Der Relativsatz heißt: ___", "der dort bellt", ["gehört mir"], "Dieser Teil erklärt, welcher Hund gemeint ist. Das Verb steht am Ende.", "Welcher Teil sagt, welcher Hund gemeint ist?"),
            k("Ich mag die Lehrerin, die uns Mathe erklärt. Der Relativsatz erklärt das Nomen ___.", "Lehrerin", ["Mathe"], "Der Relativsatz sagt, welche Lehrerin gemeint ist.", "Welches Nomen steht direkt vor dem Komma?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) So viele Verben, so viele **Teilsätze**.", "(2) **Hauptsatz**: Er steht allein, das Verb an zweiter Stelle.", "(3) **Nebensatz**: Er steht nicht allein, das Verb am Ende.", "(4) **Relativsatz**: Er erklärt ein Nomen."],
        "Diese vier Punkte brauchst du für jede Kommaregel. Wenn du einen Satz vor dir hast, such zuerst die Verben. Schau dann, wo sie stehen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Woran erkennst du einen Nebensatz am sichersten? ___", "Das Verb steht am Ende.", ["Er ist kürzer als der Hauptsatz."], "Die Länge sagt nichts aus. Die Stellung des Verbs ist das sichere Zeichen.", "Was unterscheidet weil ich Zeit habe von ich habe Zeit?")] },
      ),
    ),
  ],
  [
    v("Teilsatz", "Ein Teil eines Satzes mit einem eigenen Verb."),
    v("Hauptsatz", "Ein Satz, der allein stehen kann. Das Verb steht an zweiter Stelle.", "Ich lese ein Buch."),
    v("Nebensatz", "Ein Teilsatz, der nicht allein stehen kann. Das Verb steht am Ende.", "weil es regnet"),
    v("Relativsatz", "Ein Nebensatz, der ein Nomen genauer erklärt.", "das Buch, das ich lese"),
    v("Relativpronomen", "Der, die oder das am Anfang eines Relativsatzes. Man kann welcher, welche, welches einsetzen."),
    v("weil, dass, wenn, obwohl, als, ob", "Konjunktionen, mit denen viele Nebensätze beginnen."),
  ],
  [
    q("Wie viele Teilsätze hat der Satz: Ich rufe dich an, sobald ich zu Hause bin?", "zwei", ["einen", "drei", "vier"], "Es gibt zwei Verben: rufe an und bin. Zu jedem Verb gehört ein Teilsatz."),
    q("Wir haben den ganzen Tag gespielt. Wie viele Teilsätze hat der Satz?", "einen", ["zwei", "drei", "keinen"], "Haben und gespielt gehören zusammen und bilden ein Verb. Es geschieht nur eine Sache."),
    q("Woran erkennst du einen Hauptsatz?", "Er kann allein stehen, und das Verb steht an zweiter Stelle.", ["Er ist immer der längere Teil.", "Er beginnt mit weil.", "Das Verb steht am Ende."], "Ein Hauptsatz ist allein vollständig. Sein Verb steht immer an der zweiten Stelle."),
    q("Welcher Teil ist der Nebensatz? Ich bleibe zu Hause, weil ich krank bin.", "weil ich krank bin", ["Ich bleibe zu Hause", "zu Hause", "Ich bleibe"], "Der Teil beginnt mit der Konjunktion weil, und das Verb bin steht am Ende."),
    q("Wo steht das Verb im Nebensatz?", "am Ende", ["an zweiter Stelle", "am Anfang", "in der Mitte"], "Im Nebensatz wandert das Verb ans Ende: weil ich Zeit habe."),
    q("Das Fahrrad, das dort steht, ist neu. Was ist das dort steht?", "ein Relativsatz", ["ein Hauptsatz", "eine Aufzählung", "ein Artikel mit Nomen"], "Der Teil erklärt das Nomen Fahrrad genauer, beginnt mit das und hat das Verb am Ende."),
    q("Wie prüfst du, ob das ein Relativpronomen ist?", "Ich setze welches ein.", ["Ich steigere es.", "Ich zähle die Buchstaben.", "Ich setze der davor."], "Passt welches an die Stelle, ist es ein Relativpronomen: das Buch, welches ich lese."),
  ],
);
