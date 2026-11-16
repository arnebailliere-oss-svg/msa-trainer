// Guided lesson: stylistic devices 1 (Vergleich, Metapher, Personifikation, Symbol).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_04_stilmittel.json",
  {
    id: "P_DE_STILMITTEL",
    subject: "DE",
    title: "Stilmittel 1: Sprachbilder",
    teaser: "Was ein Stilmittel ist und warum Werbung, Reden und Gedichte voll davon sind. Dann die vier wichtigsten Sprachbilder: Vergleich, Metapher, Personifikation und Symbol, jedes mit einer einfachen Probe.",
    hook: "Manche Sätze vergisst man sofort, und manche bleiben im Kopf hängen. Der Unterschied liegt oft nicht in dem, was gesagt wird, sondern darin, wie es gesagt wird. Dahinter stecken kleine sprachliche Kunstgriffe, die Menschen seit Jahrtausenden benutzen. In der Prüfung sollst du sie erkennen und benennen. Wir fangen mit den Bildern an.",
    outro: "Du kennst jetzt vier Sprachbilder. Beim Vergleich steht das Wort wie. Bei der Metapher fehlt es. Bei der Personifikation tut ein Ding etwas, das nur Menschen können. Ein Symbol ist ein festes Zeichen, das für etwas anderes steht. In der nächsten Lektion kommen die Stilmittel dazu, die mit Klang und Satzbau arbeiten.",
  },
  [
    ch(
      "Was ein Stilmittel ist",
      b(
        "Zwei Arten, dasselbe zu sagen",
        ["Er ist sehr stark.", "Er ist stark wie ein Bär.", "Der zweite Satz bleibt eher im Kopf."],
        "Beide Sätze bedeuten dasselbe. Trotzdem wirken sie ganz verschieden. Beim ersten Satz erfährst du nur eine Tatsache. Beim zweiten Satz siehst du sofort ein Bild vor dir: einen großen, kräftigen Bären. Genau diese Wirkung ist gewollt.",
      ),
      b(
        "Das nennt man ein Stilmittel",
        ["Ein **Stilmittel** ist eine besondere Art, etwas zu sagen.", "Es macht einen Satz auffälliger, stärker oder schöner."],
        "Ein Stilmittel ändert nicht, was ein Satz sagt. Es ändert, wie er wirkt. Man nennt es auch sprachliches Mittel oder rhetorisches Mittel. Es gibt viele davon, und jedes hat einen Namen. Die wichtigsten lernst du in dieser und der nächsten Lektion.",
      ),
      b(
        "Wo du sie findest",
        ["In der Werbung, in Reden und in Liedtexten.", "In Gedichten und in Überschriften.", "In der Prüfung: *Notieren Sie zwei Stilmittel aus dem Satz.*"],
        "Überall, wo jemand deine Aufmerksamkeit will, findest du Stilmittel. Werbung benutzt sie, damit du dir ein Produkt merkst. Politiker benutzen sie, damit eine Rede überzeugt. In der Prüfung bekommst du einen Satz und sollst sagen, welche Stilmittel darin stecken.",
        { tasks: [k("Ein Stilmittel verändert vor allem ___.", "die Wirkung eines Satzes", ["die Rechtschreibung"], "Der Inhalt bleibt gleich. Der Satz wirkt nur stärker oder auffälliger.", "Was war bei den beiden Sätzen über den starken Mann verschieden?")] },
      ),
      b(
        "Jetzt du: auffällig oder gewöhnlich?",
        "Tipp bei jedem Paar auf den Satz, der ein Stilmittel enthält.",
        "Lies beide Sätze und frag dich, welcher von ihnen ungewöhnlicher klingt. Welcher erzeugt ein Bild in deinem Kopf oder übertreibt? Du musst das Stilmittel noch nicht benennen.",
        {
          tasks: [
            k("Welcher Satz enthält ein Stilmittel? ___", "Die Sonne lacht.", ["Die Sonne scheint."], "Eine Sonne kann nicht wirklich lachen. Der Satz malt ein Bild.", "Welcher Satz sagt etwas, das wörtlich genommen gar nicht geht?"),
            k("Welcher Satz enthält ein Stilmittel? ___", "Ich habe tausendmal angerufen.", ["Ich habe dreimal angerufen."], "Niemand ruft wirklich tausendmal an. Der Satz übertreibt.", "Welche der beiden Zahlen ist glaubwürdig und welche nicht?"),
          ],
        },
      ),
    ),
    ch(
      "Vergleich und Metapher",
      b(
        "Der Vergleich",
        [L("stark **wie** ein Bär", "schnell **wie** der Wind"), "Zwei Dinge werden mit dem Wort wie nebeneinandergestellt.", "Dieses Stilmittel heißt **Vergleich**."],
        "Beim Vergleich sagst du, dass etwas so ist wie etwas anderes. Der Mann ist so stark wie ein Bär. Das Wort wie verbindet die beiden. Manchmal steht statt wie auch als ob. Am Wort wie erkennst du einen Vergleich sofort.",
      ),
      b(
        "Die Metapher",
        [L("Er **ist** ein Bär.", "Das Leben ist eine Reise."), "Hier fehlt das Wort wie.", "Dieses Stilmittel heißt **Metapher**."],
        "Die Metapher geht einen Schritt weiter. Sie sagt nicht, dass etwas wie etwas anderes ist. Sie sagt, es ist das andere. Er ist ein Bär. Natürlich ist er kein Tier. Das Bild wird einfach direkt an die Stelle des Gemeinten gesetzt.",
      ),
      b(
        "Der Unterschied ist ein einziges Wort",
        [L("Mit **wie**: Vergleich", "*Sie ist schlau wie ein Fuchs.*"), L("Ohne **wie**: Metapher", "*Sie ist ein schlauer Fuchs.*")],
        "Das ist die häufigste Frage in der Prüfung zu diesem Thema. Zum Glück ist sie leicht zu beantworten. Such nach dem Wort wie. Steht es da, ist es ein Vergleich. Fehlt es und steht trotzdem ein Bild da, ist es eine Metapher.",
        { tasks: [k("Er kämpfte wie ein Löwe. Das ist ___.", "ein Vergleich", ["eine Metapher"], "Im Satz steht das Wort wie. Zwei Dinge werden nebeneinandergestellt.", "Welches kleine Wort steht zwischen kämpfte und ein Löwe?")] },
      ),
      b(
        "Metaphern stecken überall",
        ["*Tischbein, Flussarm, Warteschlange*", "*Du bist mein Sonnenschein.*", "Viele Metaphern bemerkt man gar nicht mehr."],
        "Ein Tisch hat keine Beine, und vor der Kasse steht keine Schlange. Trotzdem versteht das jeder. Unsere Sprache ist voller Bilder, die so alt sind, dass sie niemandem mehr auffallen. In der Prüfung geht es aber meistens um frische, auffällige Bilder.",
        { tasks: [k("Du bist mein Sonnenschein. Das ist ___.", "eine Metapher", ["ein Vergleich"], "Ein Mensch wird direkt als Sonnenschein bezeichnet. Das Wort wie fehlt.", "Steht im Satz das Wort wie?")] },
      ),
      b(
        "Sag auch, was das Bild bedeutet",
        ["*Er ist ein Bär.*", "Gemeint ist: Er ist sehr stark.", "In der Prüfung nennst du das Stilmittel **und** erklärst es."],
        "Oft reicht es nicht, nur den Namen zu nennen. Du sollst auch sagen, was mit dem Bild gemeint ist oder wie es wirkt. Frag dich dafür: Welche Eigenschaft haben die beiden Dinge gemeinsam? Ein Bär ist stark. Also ist der Mann stark.",
      ),
      b(
        "Jetzt du: Vergleich oder Metapher?",
        "Tipp bei jedem Satz auf das richtige Stilmittel.",
        "Such in jedem Satz zuerst nach dem Wort wie. Wenn du es findest, ist es ein Vergleich. Wenn nicht, schau, ob etwas direkt als etwas anderes bezeichnet wird.",
        {
          tasks: [
            k("Die Stadt war ein Hexenkessel. Das ist ___.", "eine Metapher", ["ein Vergleich"], "Die Stadt wird direkt als Kessel bezeichnet. Das Wort wie fehlt.", "Steht im Satz das Wort wie?"),
            k("Sie sang wie eine Nachtigall. Das ist ___.", "ein Vergleich", ["eine Metapher"], "Im Satz steht das Wort wie.", "Welches kleine Wort steht vor eine Nachtigall?"),
            k("Sein Zimmer ist ein Schlachtfeld. Gemeint ist: Das Zimmer ist ___.", "sehr unordentlich", ["sehr groß"], "Auf einem Schlachtfeld liegt alles durcheinander. Das haben beide gemeinsam.", "Wie sieht es auf einem Schlachtfeld aus? Was hat das mit einem Zimmer zu tun?"),
          ],
        },
      ),
    ),
    ch(
      "Personifikation und Symbol",
      b(
        "Die Personifikation",
        [L("Die Sonne **lacht**.", "Der Wind **flüstert**."), "Ein Ding tut etwas, das nur Menschen können.", "Dieses Stilmittel heißt **Personifikation**."],
        "In dem Wort steckt Person. Bei einer Personifikation wird ein Ding, ein Tier oder ein Gedanke wie eine Person behandelt. Die Sonne bekommt ein Gesicht und lacht. Der Wind bekommt eine Stimme und flüstert. Das macht einen Text lebendig.",
      ),
      b(
        "So erkennst du sie",
        ["Frag dich: **Kann das Ding das wirklich?**", "Kann eine Sonne lachen? Nein.", "Dann ist es eine Personifikation."],
        "Die Probe ist ganz einfach. Du schaust auf das Wort, das sagt, was geschieht, und fragst dich, ob das Ding so etwas überhaupt tun kann. Lachen, flüstern, weinen, schlafen und tanzen können nur Lebewesen. Wenn ein Ding es tut, hast du eine Personifikation gefunden.",
        { tasks: [k("Der Himmel weint. Das ist ___.", "eine Personifikation", ["ein Vergleich"], "Weinen können nur Lebewesen. Der Himmel wird wie eine Person behandelt.", "Kann ein Himmel wirklich weinen, so wie ein Mensch es tut?")] },
      ),
      b(
        "Das Symbol",
        [L("die weiße Taube: Frieden", "das rote Herz: Liebe", "die Waage: Gerechtigkeit"), "Ein Symbol ist ein festes Zeichen, das für etwas anderes steht."],
        "Ein Symbol ist ein Bild, das alle kennen und gleich verstehen. Niemand muss erklären, was ein rotes Herz bedeutet. Der Unterschied zur Metapher ist, dass ein Symbol fest ist. Es bedeutet immer dasselbe, egal in welchem Text es vorkommt.",
        { tasks: [k("Ein rotes Herz steht für ___.", "Liebe", ["Hunger"], "Dieses Zeichen versteht fast jeder Mensch auf dieselbe Weise.", "Wofür malt man ein Herz auf eine Karte?")] },
      ),
      b(
        "Jetzt du: alle vier gemischt",
        "Tipp bei jedem Satz auf das richtige Stilmittel.",
        "Jetzt kommen alle vier Sprachbilder vor. Geh die Proben durch: Steht ein wie da? Tut ein Ding etwas Menschliches? Wird etwas direkt als etwas anderes bezeichnet?",
        {
          tasks: [
            k("Die Blätter tanzen im Wind. Das ist ___.", "eine Personifikation", ["eine Metapher"], "Tanzen können nur Lebewesen. Die Blätter werden wie Personen behandelt.", "Können Blätter wirklich tanzen, so wie Menschen es tun?"),
            k("Der Junge ist flink wie ein Wiesel. Das ist ___.", "ein Vergleich", ["eine Personifikation"], "Im Satz steht das Wort wie.", "Welches kleine Wort verbindet flink und ein Wiesel?"),
            k("Sie ist der Fels in der Brandung. Das ist ___.", "eine Metapher", ["ein Vergleich"], "Ein Mensch wird direkt als Fels bezeichnet. Das Wort wie fehlt.", "Steht im Satz das Wort wie? Wird etwas direkt als etwas anderes bezeichnet?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Vergleich**: mit dem Wort wie", "**Metapher**: ein Bild ohne wie", "**Personifikation**: Ein Ding handelt wie ein Mensch.", "**Symbol**: ein festes Zeichen für etwas anderes")],
        "Das sind die vier Sprachbilder mit ihren Erkennungszeichen. Wenn du in einem Satz ein Bild entdeckst, gehst du diese vier Zeilen durch. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Woran erkennst du einen Vergleich sicher? ___", "am Wort wie", ["am Ausrufezeichen"], "Das Wort stellt zwei Dinge nebeneinander.", "Welches Wort stand in stark wie ein Bär?")] },
      ),
    ),
  ],
  [
    v("Stilmittel", "Eine besondere Art, etwas zu sagen. Sie verändert die Wirkung eines Satzes, nicht seinen Inhalt."),
    v("Vergleich", "Zwei Dinge werden mit dem Wort wie nebeneinandergestellt.", "stark wie ein Bär"),
    v("Metapher", "Ein Sprachbild ohne das Wort wie. Etwas wird direkt als etwas anderes bezeichnet.", "Er ist ein Bär."),
    v("Personifikation", "Ein Ding tut etwas, das nur Menschen können.", "Die Sonne lacht."),
    v("Symbol", "Ein festes Zeichen, das für etwas anderes steht.", "weiße Taube: Frieden"),
  ],
  [
    q("stark wie ein Bär: Welches Stilmittel ist das?", "ein Vergleich", ["eine Metapher", "eine Personifikation", "ein Symbol"], "Das Wort wie stellt zwei Dinge nebeneinander. Daran erkennst du den Vergleich."),
    q("Die Sonne lacht. Welches Stilmittel ist das?", "eine Personifikation", ["ein Vergleich", "eine Metapher", "ein Symbol"], "Lachen können nur Lebewesen. Die Sonne wird wie eine Person behandelt."),
    q("Das Leben ist eine Achterbahn. Welches Stilmittel ist das?", "eine Metapher", ["ein Vergleich", "eine Personifikation", "ein Symbol"], "Das Leben wird direkt als Achterbahn bezeichnet. Das Wort wie fehlt."),
    q("Woran unterscheidest du Vergleich und Metapher?", "Beim Vergleich steht das Wort wie.", ["Die Metapher ist immer länger.", "Der Vergleich steht nur in Gedichten.", "Die Metapher hat ein Ausrufezeichen."], "Mit wie ist es ein Vergleich, ohne wie eine Metapher. Mehr brauchst du dafür nicht."),
    q("Was bedeutet die Metapher: Sein Zimmer ist ein Schlachtfeld?", "Das Zimmer ist sehr unordentlich.", ["Im Zimmer wird gekämpft.", "Das Zimmer ist sehr groß.", "Das Zimmer ist sehr alt."], "Auf einem Schlachtfeld liegt alles durcheinander. Diese Eigenschaft wird auf das Zimmer übertragen."),
    q("Wofür steht die weiße Taube?", "für den Frieden", ["für den Hunger", "für die Schule", "für das Wetter"], "Die weiße Taube ist ein Symbol. Sie bedeutet in jedem Text dasselbe."),
    q("Die Uhr rennt. Wie prüfst du, ob das eine Personifikation ist?", "Ich frage, ob eine Uhr wirklich rennen kann.", ["Ich suche das Wort wie.", "Ich zähle die Wörter.", "Ich suche ein Komma."], "Rennen können nur Lebewesen. Wenn ein Ding etwas Menschliches tut, ist es eine Personifikation."),
  ],
);
