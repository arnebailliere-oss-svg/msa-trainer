// Guided lesson: commas 1 (list, main + subordinate clause, insertion, two main clauses, aber/sondern).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_01b_komma1.json",
  {
    id: "P_DE_KOMMA1",
    subject: "DE",
    title: "Kommas 1: Aufzählung, Hauptsatz und Nebensatz",
    teaser: "Die vier häufigsten Gründe für ein Komma: die Aufzählung, die Grenze zwischen Hauptsatz und Nebensatz, zwei Hauptsätze nebeneinander und die Wörter aber und sondern. Jede Regel einzeln, mit Übungen.",
    hook: "Viele setzen Kommas nach Gefühl, dort, wo man beim Sprechen eine kleine Pause macht. Das geht oft schief. Dabei gibt es nur eine Handvoll Gründe für ein Komma, und jeden davon kann man lernen. In dieser Lektion nehmen wir uns die vier häufigsten vor, einen nach dem anderen.",
    outro: "Du kennst jetzt vier Gründe für ein Komma. Es steht zwischen den Teilen einer Aufzählung, zwischen Hauptsatz und Nebensatz, zwischen zwei Hauptsätzen und vor aber und sondern. Ein eingeschobener Nebensatz bekommt zwei Kommas. In der nächsten Lektion kommen die Gruppen mit zu und die wörtliche Rede dazu.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2", "P_DE_SATZ"],
  },
  [
    ch(
      "Was ein Komma tut",
      b(
        "Ein Komma kann Leben retten",
        ["*Komm, wir essen, Opa!*", "*Komm, wir essen Opa!*", "Ein einziges Komma macht den Unterschied."],
        "Lies die beiden Sätze und stell sie dir vor. Im ersten Satz wird Opa zum Essen gerufen. Im zweiten Satz steht Opa auf dem Speiseplan. Das Komma zeigt dem Leser, welche Wörter zusammengehören. Es ist also nicht nur eine Vorschrift, sondern eine Hilfe beim Verstehen.",
      ),
      b(
        "Ein Komma ist eine Grenze",
        ["Das Komma zeigt, wo ein Teil des Satzes **aufhört** und der nächste **anfängt**.", "Es gibt nur wenige Arten von solchen Grenzen."],
        "Stell dir das Komma wie einen kleinen Zaun vor. Er steht an der Grenze zwischen zwei Teilen eines Satzes. Wenn du die Teile erkennst, weißt du, wo der Zaun hingehört. Deshalb haben wir uns in der letzten Lektion so genau mit Hauptsatz und Nebensatz beschäftigt.",
      ),
      b(
        "Nicht nach Gefühl",
        ["Ein Komma steht **nicht** dort, wo man beim Sprechen Luft holt.", "Es steht dort, wo eine **Regel** es verlangt."],
        "Beim Sprechen machst du an vielen Stellen kleine Pausen. Nicht jede Pause ist ein Komma, und nicht jedes Komma hört man als Pause. Verlass dich deshalb nicht auf dein Ohr. Frag dich bei jedem Komma: Welche Regel steckt dahinter?",
        { tasks: [k("Ein Komma setzt du, ___.", "weil eine Regel es verlangt", ["wo du beim Lesen Luft holst"], "Jedes Komma hat einen Grund, den man benennen kann.", "Kannst du dich beim Kommasetzen auf dein Ohr verlassen?")] },
      ),
      b(
        "Der erste Schritt: die Verben suchen",
        ["*Ich **lese**, während du **kochst**.*", "Zwei Verben, also zwei Teilsätze.", "An der Grenze dazwischen steht das Komma."],
        "Das kennst du aus der letzten Lektion. Du suchst die Verben und weißt dann, wie viele Teilsätze der Satz hat. Zwischen zwei Teilsätzen steht fast immer ein Komma. Mit diesem einen Schritt findest du schon die meisten Kommas.",
        { tasks: [k("Wir warten, bis der Bus kommt. Der Satz hat ___ Teilsätze.", "zwei", ["drei"], "Es gibt zwei Verben: warten und kommt.", "Zähl die Verben im Satz. Wie viele sind es?")] },
      ),
    ),
    ch(
      "Die Aufzählung",
      b(
        "Dinge aufzählen",
        ["*Im Zoo gibt es Affen**,** Elefanten und Zebras.*", "Zwischen den Teilen einer **Aufzählung** steht ein Komma."],
        "Wenn du mehrere gleichartige Dinge hintereinander nennst, ist das eine Aufzählung. Die einzelnen Teile trennst du durch Kommas. Das ist die Regel, die du schon seit der Grundschule kennst. An einer Stelle wird sie aber sehr oft falsch gemacht.",
      ),
      b(
        "Vor und steht kein Komma",
        ["*Äpfel, Birnen **und** Trauben*", "Das Wort und ersetzt das letzte Komma.", "Dasselbe gilt für das Wort oder."],
        "Vor dem letzten Teil einer Aufzählung steht meistens und oder oder. Dieses Wort übernimmt die Aufgabe des Kommas. Du brauchst also nicht beides. Äpfel, Birnen, und Trauben ist falsch. Das ist der häufigste Kommafehler überhaupt.",
        { tasks: [k("Welche Schreibung ist richtig? Wir brauchen Mehl, Eier ___ Zucker.", "und", [", und"], "Das Wort ersetzt das Komma. Beides zusammen ist zu viel.", "Was übernimmt in einer Aufzählung die Aufgabe des letzten Kommas?")] },
      ),
      b(
        "Nicht nur Dinge",
        ["*ein kalter**,** nasser**,** grauer Tag*", "*Sie lacht**,** tanzt und singt.*", "Auch Adjektive und Verben kann man aufzählen."],
        "Eine Aufzählung muss nicht aus Nomen bestehen. Im ersten Beispiel werden drei Adjektive aufgezählt, die alle den Tag beschreiben. Im zweiten Beispiel werden drei Verben aufgezählt. Die Regel bleibt dieselbe: Kommas dazwischen, aber keins vor und.",
      ),
      b(
        "Jetzt du: Aufzählungen",
        "Tipp bei jeder Aufgabe auf die richtige Lösung.",
        "Such in jedem Satz die Teile, die aufgezählt werden. Zwischen ihnen steht ein Komma. Vor und oder oder steht keins.",
        {
          tasks: [
            k("Ich packe Hose Hemd Socken und Schuhe ein. Es fehlen ___ Kommas.", "zwei", ["drei"], "Nach Hose und nach Hemd fehlt je ein Komma. Vor und steht keins.", "Zähl die Lücken zwischen den Teilen. Lass die Stelle vor und aus."),
            k("Welcher Satz ist richtig? ___", "Er kaufte Brot, Käse und Wurst.", ["Er kaufte Brot, Käse, und Wurst."], "Vor und steht in einer Aufzählung kein Komma.", "Schau auf die Stelle vor dem Wort und."),
            k("Es war ein langer schöner Tag. Ein Komma gehört nach dem Wort ___.", "langer", ["war"], "Zwei Adjektive werden aufgezählt: lang und schön.", "Welche beiden Wörter beschreiben den Tag?"),
          ],
        },
      ),
    ),
    ch(
      "Hauptsatz und Nebensatz",
      b(
        "Das Komma an der Grenze",
        ["*Sie bleibt zu Hause**,** weil sie krank ist.*", "Zwischen Hauptsatz und Nebensatz steht **immer** ein Komma."],
        "Das ist die wichtigste Kommaregel. Sie gilt ohne Ausnahme. Sobald ein Satz aus einem Hauptsatz und einem Nebensatz besteht, kommt an die Grenze ein Komma. Hier endet der Hauptsatz nach Hause, und der Nebensatz beginnt mit weil.",
      ),
      b(
        "Auch wenn der Nebensatz vorn steht",
        ["*Weil sie krank ist**,** bleibt sie zu Hause.*", "Die Grenze liegt jetzt hinter dem Nebensatz."],
        "Der Nebensatz kann auch am Anfang stehen. Dann endet er mit seinem Verb, hier mit ist. Direkt danach kommt das Komma, und dann beginnt der Hauptsatz. Du findest die Stelle leicht, weil zwei Verben nebeneinanderstehen: ist und bleibt.",
        { tasks: [k("Wenn es regnet bleiben wir drinnen. Das Komma fehlt nach dem Wort ___.", "regnet", ["bleiben"], "Dort endet der Nebensatz mit seinem Verb. Danach beginnt der Hauptsatz.", "Wo endet der Nebensatz? Such sein Verb am Ende.")] },
      ),
      b(
        "Der Einschub: zwei Kommas",
        ["*Das Haus**,** das alt war**,** wurde verkauft.*", "Ein Nebensatz mitten im Hauptsatz bekommt **vorn und hinten** ein Komma."],
        "Manchmal steht der Nebensatz weder vorn noch hinten, sondern in der Mitte. Er unterbricht den Hauptsatz. Dann hat er zwei Grenzen, eine am Anfang und eine am Ende. Stell dir die beiden Kommas wie eine Klammer vor.",
      ),
      b(
        "Das zweite Komma nicht vergessen",
        ["Falsch: *Der Hund, der bellt gehört mir.*", "Richtig: *Der Hund, der bellt**,** gehört mir.*"],
        "Das erste Komma setzen fast alle. Das zweite wird sehr oft vergessen. Du findest die Stelle wieder über das Verb. Der eingeschobene Nebensatz endet mit seinem Verb, hier mit bellt. Danach kommt das zweite Komma, und der Hauptsatz geht weiter.",
        { tasks: [k("Die Frau, die dort steht ist meine Lehrerin. Das zweite Komma fehlt nach dem Wort ___.", "steht", ["Frau"], "Dort endet der eingeschobene Nebensatz mit seinem Verb.", "Mit welchem Wort endet der eingeschobene Nebensatz?")] },
      ),
      b(
        "Wörter, die ein Komma ankündigen",
        ["*weil, dass, wenn, obwohl, als, ob, während, nachdem, damit*", "Jedes dieser Wörter ist ein **Signalwort**: Hier beginnt ein Nebensatz."],
        "Diese Konjunktionen leiten Nebensätze ein. Wenn du eine von ihnen siehst, weißt du, dass dort ein Nebensatz anfängt. Vor ihr steht dann ein Komma. Bei der, die und das musst du genauer hinschauen: Ein Komma steht nur davor, wenn ein Relativsatz beginnt.",
      ),
      b(
        "Jetzt du: Hauptsatz und Nebensatz",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Such in jedem Satz zuerst die Verben und dann die Grenze zwischen den Teilsätzen. Denk daran, dass ein eingeschobener Nebensatz zwei Kommas braucht.",
        {
          tasks: [
            k("Ich glaube dass er recht hat. Das Komma fehlt vor dem Wort ___.", "dass", ["er"], "Mit diesem Wort beginnt der Nebensatz.", "Mit welchem Wort beginnt der Nebensatz in diesem Satz?"),
            k("Obwohl es spät war gingen wir spazieren. Das Komma fehlt nach dem Wort ___.", "war", ["spät"], "Der Nebensatz endet mit seinem Verb. Danach beginnt der Hauptsatz.", "Wo endet der Nebensatz? Such sein Verb."),
            k("Mein Bruder, der in Köln wohnt kommt morgen. Es fehlt ein Komma nach ___.", "wohnt", ["Bruder"], "Der eingeschobene Relativsatz endet mit seinem Verb und braucht ein zweites Komma.", "Welches Wort ist das Verb des eingeschobenen Teils?"),
          ],
        },
      ),
    ),
    ch(
      "Zwei Hauptsätze, aber und sondern",
      b(
        "Zwei Hauptsätze nebeneinander",
        ["*Tim spielt Fußball**,** Lea liest.*", "Beide Sätze könnten allein stehen.", "Zwischen ihnen steht ein Komma."],
        "Auch zwei Hauptsätze kann man zu einem Satz verbinden. Jeder von ihnen wäre allein vollständig. Wenn sie ohne Bindewort nebeneinanderstehen, trennt sie ein Komma. Du erkennst diesen Fall wieder an den zwei Verben.",
      ),
      b(
        "Mit und darf das Komma fehlen",
        ["*Das Licht geht aus und die Vorstellung beginnt.*", "Verbindet und oder oder zwei Hauptsätze, ist das Komma **freiwillig**."],
        "Hier gibt es eine Erleichterung. Steht zwischen zwei Hauptsätzen ein und oder ein oder, darfst du das Komma weglassen. Du darfst es auch setzen. Beides ist richtig. In der Prüfung wird an dieser Stelle deshalb kein Komma verlangt.",
      ),
      b(
        "aber, sondern und doch",
        ["*Er ist nicht dumm**,** sondern faul.*", "*Sie spielt gern Tennis**,** aber sie hasst Fußball.*", "Vor aber, sondern, doch und jedoch steht ein Komma."],
        "Diese vier Wörter zeigen einen Gegensatz an. Der zweite Teil sagt etwas, das zum ersten nicht passt oder ihn einschränkt. Vor ihnen steht immer ein Komma, auch wenn danach gar kein ganzer Satz folgt, wie im ersten Beispiel.",
        { tasks: [k("Welche Schreibung ist richtig? Das ist nicht mein Hund ___ der Hund meiner Nachbarin.", ", sondern", ["sondern"], "Vor diesem Wort steht immer ein Komma, weil es einen Gegensatz anzeigt.", "Zeigt das Wort einen Gegensatz an? Was gilt dann für das Komma?")] },
      ),
      b(
        "Jetzt du: alles gemischt",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Jetzt kommen alle Regeln dieser Lektion vor. Frag dich bei jedem Satz: Ist es eine Aufzählung, ein Nebensatz oder ein Gegensatz mit aber oder sondern?",
        {
          tasks: [
            k("Ich wollte kommen aber ich hatte keine Zeit. Das Komma fehlt vor ___.", "aber", ["ich"], "Das Wort zeigt einen Gegensatz an. Davor steht ein Komma.", "Welches Wort im Satz zeigt einen Gegensatz an?"),
            k("Sie kaufte Tomaten, Gurken ___ Paprika.", "und", [", und"], "In einer Aufzählung ersetzt das Wort das letzte Komma.", "Ist das eine Aufzählung? Was gilt vor dem letzten Teil?"),
            k("Wir bleiben hier bis der Regen aufhört. Das Komma fehlt vor ___.", "bis", ["der"], "Mit diesem Wort beginnt der Nebensatz. Sein Verb steht am Ende.", "Mit welchem Wort beginnt der Teilsatz, dessen Verb am Ende steht?"),
          ],
        },
      ),
      b(
        "Deine Reihenfolge",
        ["(1) Die Verben suchen.", "(2) Beginnt ein Nebensatz? Dann Komma an die Grenze.", "(3) Ist es eine Aufzählung? Dann Kommas dazwischen, keins vor und.", "(4) Steht aber oder sondern da? Dann Komma davor."],
        "In dieser Reihenfolge gehst du jeden Satz durch. Fang immer bei den Verben an. Wenn du für ein Komma keinen dieser Gründe findest, gehört es wahrscheinlich nicht dorthin. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Ein Nebensatz steht mitten im Hauptsatz. Er bekommt ___.", "zwei Kommas", ["ein Komma"], "Er hat eine Grenze am Anfang und eine am Ende.", "Wie viele Grenzen hat ein Teil, der in der Mitte steht?")] },
      ),
    ),
  ],
  [
    v("Aufzählung", "Mehrere gleichartige Wörter oder Wortgruppen hintereinander. Zwischen ihnen steht ein Komma, aber keins vor und.", "Affen, Elefanten und Zebras"),
    v("Signalwort", "Ein Wort, das einen Nebensatz ankündigt. Davor steht ein Komma.", "weil, dass, wenn, obwohl"),
    v("Einschub", "Ein Nebensatz mitten im Hauptsatz. Er bekommt vorn und hinten ein Komma.", "Das Haus, das alt war, wurde verkauft."),
    v("aber, sondern, doch, jedoch", "Wörter, die einen Gegensatz anzeigen. Vor ihnen steht ein Komma."),
  ],
  [
    q("Welcher Satz ist richtig?", "Wir kauften Äpfel, Birnen und Trauben.", ["Wir kauften Äpfel, Birnen, und Trauben.", "Wir kauften Äpfel Birnen und Trauben.", "Wir kauften, Äpfel, Birnen und Trauben."], "In einer Aufzählung stehen Kommas zwischen den Teilen. Vor und steht kein Komma."),
    q("Ich komme später weil ich noch lernen muss. Wo fehlt das Komma?", "vor weil", ["nach weil", "vor später", "nach lernen"], "Mit weil beginnt der Nebensatz. Das Komma steht an der Grenze, also davor."),
    q("Als wir ankamen war das Haus leer. Wo fehlt das Komma?", "nach ankamen", ["nach Als", "nach war", "vor leer"], "Der Nebensatz steht vorn und endet mit seinem Verb ankamen. Danach beginnt der Hauptsatz."),
    q("Das Buch, das ich lese ist spannend. Was fehlt?", "ein Komma nach lese", ["ein Komma nach ist", "ein Komma nach Das", "nichts"], "Der Relativsatz ist eingeschoben und braucht zwei Kommas: eines vorn und eines nach seinem Verb."),
    q("Er ist nicht krank sondern nur müde. Wo fehlt das Komma?", "vor sondern", ["nach sondern", "nach ist", "nirgends"], "Sondern zeigt einen Gegensatz an. Vor sondern, aber, doch und jedoch steht ein Komma."),
    q("Vor welchem Wort steht in einer Aufzählung kein Komma?", "und", ["weil", "aber", "dass"], "Das Wort und ersetzt in einer Aufzählung das letzte Komma. Dasselbe gilt für oder."),
    q("Woran erkennst du, wie viele Teilsätze ein Satz hat?", "an der Zahl der Verben", ["an der Zahl der Wörter", "an den Pausen beim Sprechen", "an der Zahl der Nomen"], "Zu jedem Verb gehört ein Teilsatz. Zwischen den Teilsätzen stehen die Kommas."),
    q("Das Licht ging aus und der Film begann. Muss hier ein Komma stehen?", "Nein, es ist freiwillig.", ["Ja, immer.", "Ja, zwei Kommas.", "Nein, es wäre ein Fehler."], "Verbindet und zwei Hauptsätze, darf das Komma stehen oder fehlen. Beides ist richtig."),
  ],
);
