// Guided lesson: word classes 1 (Nomen, Verb, Adjektiv, Artikel, Pronomen).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_03_wortarten.json",
  {
    id: "P_DE_WORTARTEN",
    subject: "DE",
    title: "Wortarten 1: die großen drei und ihre Begleiter",
    teaser: "Was eine Wortart ist und wie du Nomen, Verben und Adjektive sicher erkennst. Dazu die Artikel und die Pronomen. Für jede Wortart gibt es eine einfache Probe.",
    hook: "Diese Fachwörter hast du im Unterricht schon hundertmal gehört. Vielleicht hat dir aber nie jemand in Ruhe gezeigt, was dahintersteckt. Das holen wir jetzt nach. Wir fangen bei einem einzigen kurzen Satz an und schauen uns an, was jedes Wort darin eigentlich tut.",
    outro: "Du kennst jetzt fünf Wortarten und für jede eine Probe. Ein Nomen erkennst du daran, dass der, die oder das davor passt. Ein Verb verändert sich mit der Person und der Zeit. Ein Adjektiv kannst du steigern. In der nächsten Lektion kommen die kleinen Wörter dazu, die Sätze zusammenhalten.",
  },
  [
    ch(
      "Wörter haben Aufgaben",
      b(
        "Ein Satz ist wie eine Mannschaft",
        ["*Der kleine Hund bellt laut.*", "Fünf Wörter, und jedes hat eine andere **Aufgabe**.", "Die Aufgabe eines Wortes nennt man seine **Wortart**."],
        "Stell dir eine Fußballmannschaft vor. Da gibt es einen Torwart, Verteidiger und Stürmer. Jeder hat seine Aufgabe, und an der Aufgabe erkennst du ihn. Bei den Wörtern in einem Satz ist es genauso. Jedes Wort hat eine Aufgabe, und danach bekommt es seinen Namen.",
      ),
      b(
        "Drei Wortarten zuerst",
        ["**Nomen** geben etwas einen Namen.", "**Verben** sagen, was passiert.", "**Adjektive** sagen, wie etwas ist."],
        "Mit diesen drei fangen wir an, weil sie die wichtigsten sind. Im Satz von eben ist Hund das Nomen, denn es benennt ein Tier. Bellt ist das Verb, denn es sagt, was passiert. Und klein ist ein Adjektiv, denn es sagt, wie der Hund ist.",
        { tasks: [k("Der kleine Hund bellt. Welches Wort sagt, was passiert? ___", "bellt", ["Hund", "kleine"], "Das Bellen ist das, was in diesem Satz geschieht.", "Frag dich: Was tut der Hund? Das Wort, das darauf antwortet, suchst du.")] },
      ),
      b(
        "Wozu du das brauchst",
        ["Wer Nomen erkennt, schreibt richtig **groß**.", "Wer Verben findet, setzt die **Kommas** richtig.", "Und die Prüfung fragt direkt danach."],
        "Wortarten sind kein Selbstzweck. Fast jede Regel der deutschen Rechtschreibung hängt an ihnen. Nomen schreibt man groß, also musst du sie erkennen. Kommas stehen zwischen Satzteilen, und die findest du über die Verben. Es lohnt sich deshalb, hier genau zu sein.",
      ),
      b(
        "Jetzt du: ein erstes Sortieren",
        "Tipp bei jedem Satz auf das gesuchte Wort.",
        "Du brauchst noch keine Fachwörter. Frag dich bei jedem Satz nur: Welches Wort gibt etwas einen Namen? Welches sagt, was passiert? Und welches sagt, wie etwas ist?",
        {
          tasks: [
            k("Die Katze schläft. Welches Wort gibt etwas einen Namen? ___", "Katze", ["schläft"], "Katze benennt ein Tier. Schläft sagt, was das Tier tut.", "Welches der beiden Wörter kannst du streicheln?"),
            k("Das Wasser war kalt. Welches Wort sagt, wie etwas war? ___", "kalt", ["Wasser", "war"], "Das Wort beschreibt eine Eigenschaft des Wassers.", "Frag dich: Wie war das Wasser? Welches Wort antwortet darauf?"),
            k("Tom rennt schnell. Welches Wort sagt, was passiert? ___", "rennt", ["Tom", "schnell"], "Das Rennen ist das, was Tom tut.", "Frag dich: Was tut Tom gerade?"),
          ],
        },
      ),
    ),
    ch(
      "Das Nomen",
      b(
        "Nomen geben Namen",
        ["*Hund, Lehrerin, Tisch, Berlin*", "Ein **Nomen** gibt Lebewesen, Dingen und Orten einen Namen."],
        "Alles, was es auf der Welt gibt, hat einen Namen. Dein Hund, deine Lehrerin, der Tisch vor dir und die Stadt, in der du wohnst. Diese Namen sind Nomen. Manche sagen dazu auch Hauptwort oder Namenwort. Gemeint ist immer dasselbe.",
      ),
      b(
        "Auch was man nicht anfassen kann",
        ["*Freude, Angst, Zeit, Idee*", "Auch Gefühle und Gedanken haben Namen.", "Es sind ebenfalls Nomen."],
        "Hier wird es etwas schwieriger. Einen Hund kannst du sehen und anfassen. Freude kannst du nicht anfassen. Trotzdem hat dieses Gefühl einen Namen, und deshalb ist auch Freude ein Nomen. Dasselbe gilt für Angst, Zeit, Glück und Idee.",
        { tasks: [k("Welches Wort ist ein Nomen? ___", "Mut", ["mutig", "wagen"], "Das Wort ist der Name für eine Eigenschaft, die jemand hat.", "Welches der drei Wörter ist ein Name für etwas? Achte auch auf den Anfangsbuchstaben.")] },
      ),
      b(
        "Die Probe: der, die, das",
        ["**der** Hund, **die** Freude, **das** Haus", "Passt der, die oder das davor, ist es ein Nomen.", "Diese kleinen Wörter heißen **Artikel**."],
        "Wenn du unsicher bist, machst du die Probe mit dem Artikel. Du stellst der, die oder das vor das Wort. Der Hund klingt richtig. Die Freude auch. Der schnell klingt dagegen falsch. Also ist schnell kein Nomen. Diese Probe funktioniert fast immer.",
      ),
      b(
        "Nomen schreibt man groß",
        ["der **H**und, die **F**reude, das **H**aus", "Im Deutschen beginnt jedes Nomen mit einem großen Buchstaben."],
        "Das ist eine Besonderheit der deutschen Sprache. In den meisten anderen Sprachen schreibt man nur Namen von Menschen und Orten groß. Im Deutschen schreibt man alle Nomen groß. Deshalb ist es so wichtig, dass du sie erkennst.",
        { tasks: [k("Wir hatten große ___.", "Angst", ["angst"], "Die Probe passt: die Angst. Es ist ein Nomen und wird großgeschrieben.", "Mach die Probe: Passt der, die oder das vor das Wort?")] },
      ),
      b(
        "Einzahl und Mehrzahl",
        ["ein Hund, zwei Hund**e**", "Die Einzahl heißt **Singular**.", "Die Mehrzahl heißt **Plural**."],
        "Von fast jedem Nomen gibt es zwei Formen. Eine für ein einzelnes Ding und eine für mehrere. Der Singular ist die Einzahl, der Plural ist die Mehrzahl. Diese beiden Fachwörter begegnen dir in der Schule ständig, auch im Englischunterricht.",
        { tasks: [k("Der Plural von Haus heißt ___.", "Häuser", ["Hause"], "Aus einem Haus werden mehrere, und das a bekommt zwei Punkte.", "Wie sagst du, wenn es drei davon gibt?")] },
      ),
      b(
        "Jetzt du: Nomen finden",
        "Tipp in jedem Satz auf das Nomen.",
        "In jedem Satz steckt genau ein Nomen. Mach bei jedem Wort die Probe mit dem Artikel, wenn du unsicher bist. Und denk daran, dass auch Gefühle Nomen sein können.",
        {
          tasks: [
            k("Morgen schreiben wir einen Test. ___", "Test", ["Morgen", "schreiben"], "Die Probe passt: der Test. Morgen sagt hier nur, wann es passiert.", "Vor welches der Wörter passt hier der, die oder das?"),
            k("Ihre Hoffnung war groß. ___", "Hoffnung", ["groß", "war"], "Die Probe passt: die Hoffnung. Es ist der Name für ein Gefühl.", "Welches Wort ist der Name für ein Gefühl?"),
            k("Leise fiel der Schnee. ___", "Schnee", ["Leise", "fiel"], "Der Artikel steht sogar schon davor: der Schnee.", "Vor welchem Wort steht schon ein Artikel?"),
          ],
        },
      ),
    ),
    ch(
      "Das Verb",
      b(
        "Verben sagen, was passiert",
        ["*laufen, lachen, schlafen, regnen*", "Ein **Verb** sagt, was jemand tut oder was geschieht."],
        "Das Verb ist das Herz jedes Satzes. Ohne Verb passiert in einem Satz nichts. In der Grundschule hieß es Tuwort oder Tunwort. Es sagt, was jemand tut, zum Beispiel laufen oder lachen. Es sagt auch, was einfach geschieht, zum Beispiel regnen.",
      ),
      b(
        "Auch sein und haben sind Verben",
        ["Ich **bin** müde.", "Sie **hat** Hunger.", "Hier tut niemand etwas. Trotzdem sind es Verben."],
        "Diese beiden werden oft übersehen, weil niemand dabei etwas tut. Sein und haben sind aber Verben, sogar die häufigsten der deutschen Sprache. Sie haben viele Formen: bin, bist, ist, sind, war, hat, hatte. Wenn du nach dem Verb suchst, vergiss sie nicht.",
        { tasks: [k("Der Himmel ist blau. Das Verb heißt: ___", "ist", ["blau", "Himmel"], "Das Wort gehört zu sein. Es verändert sich, wenn du den Satz in die Vergangenheit setzt.", "Setz den Satz in die Vergangenheit. Welches Wort verändert sich dabei?")] },
      ),
      b(
        "Verben verändern sich",
        [L("ich lach**e**", "du lach**st**", "er lach**t**"), "Gestern lach**te** ich.", "Das Verb passt sich an die Person und an die Zeit an."],
        "Daran erkennst du ein Verb am sichersten. Es sieht bei jeder Person anders aus, und es verändert sich mit der Zeit. Kein Nomen und kein Adjektiv macht das. Wenn du also nicht weißt, welches Wort das Verb ist, setz den Satz in die Vergangenheit und schau, was sich ändert.",
      ),
      b(
        "Die Grundform",
        ["*lachen, gehen, sein*", "So steht das Verb im Wörterbuch.", "Diese Form heißt **Infinitiv**. Sie endet fast immer auf -en."],
        "Jedes Verb hat eine Grundform, in der es noch zu keiner Person gehört. Das ist der Infinitiv. Im Wörterbuch findest du ein Verb immer unter dieser Form. Du suchst also nicht läuft, sondern laufen.",
        { tasks: [k("Er lief nach Hause. Der Infinitiv des Verbs heißt ___.", "laufen", ["lief"], "Das ist die Grundform, wie sie im Wörterbuch steht.", "Unter welchem Wort würdest du im Wörterbuch nachschlagen?")] },
      ),
      b(
        "Jetzt du: Verben finden",
        "Tipp in jedem Satz auf das Verb.",
        "Such in jedem Satz das Wort, das sich verändern würde, wenn du den Satz in eine andere Zeit setzt. Denk auch an sein und haben.",
        {
          tasks: [
            k("Meine Schwester singt gern. ___", "singt", ["Schwester", "gern"], "Das Singen ist das, was sie tut. Gestern hieße es sang.", "Was tut die Schwester? Welches Wort würde sich in der Vergangenheit ändern?"),
            k("Wir haben keine Zeit. ___", "haben", ["Zeit", "keine"], "Das Wort gehört zu den häufigsten Verben. Gestern hieße es hatten.", "Setz den Satz in die Vergangenheit. Welches Wort ändert sich?"),
            k("Draußen regnet es. ___", "regnet", ["Draußen", "es"], "Hier tut niemand etwas, aber es geschieht etwas.", "Was geschieht draußen? Welches Wort sagt das?"),
          ],
        },
      ),
    ),
    ch(
      "Das Adjektiv",
      b(
        "Adjektive sagen, wie etwas ist",
        ["*schnell, rot, müde, freundlich*", "Ein **Adjektiv** beschreibt eine Eigenschaft."],
        "Mit einem Adjektiv sagst du genauer, wie jemand oder etwas ist. Das Auto ist schnell, die Jacke ist rot, das Kind ist müde. In der Grundschule hieß das Wiewort, weil es auf die Frage wie antwortet. Wie ist das Auto? Schnell.",
      ),
      b(
        "Zwei Plätze im Satz",
        [L("das **rote** Auto", "Hier steht das Adjektiv vor dem Nomen."), L("Das Auto ist **rot**.", "Hier steht es nach dem Verb sein.")],
        "Ein Adjektiv kann an zwei Stellen stehen. Vor einem Nomen bekommt es eine Endung: das rote Auto, ein roter Ball. Nach sein bleibt es ohne Endung: Das Auto ist rot. In beiden Fällen ist es dasselbe Adjektiv.",
        { tasks: [k("Der Tee war heiß. Das Adjektiv heißt: ___", "heiß", ["Tee", "war"], "Das Wort beschreibt, wie der Tee war.", "Frag dich: Wie war der Tee? Welches Wort antwortet darauf?")] },
      ),
      b(
        "Die Probe: steigern",
        ["*schnell, schneller, am schnellsten*", "Kannst du ein Wort so steigern, ist es ein Adjektiv."],
        "Auch für Adjektive gibt es eine Probe. Du versuchst, das Wort zu steigern. Schnell, schneller, am schnellsten: Das geht. Tisch, tischer, am tischsten: Das geht nicht. Also ist Tisch kein Adjektiv. Diese Probe hilft dir vor allem dann, wenn ein Wort auch ein Verb sein könnte.",
        { tasks: [k("Welches Wort kannst du steigern? ___", "klein", ["Tisch", "laufen"], "Es gibt eine zweite und eine dritte Stufe davon. Das geht nur bei Adjektiven.", "Probier bei jedem Wort, ob es eine Stufe mit -er am Ende gibt.")] },
      ),
      b(
        "Adjektive schreibt man klein",
        [L("Das war ein **s**chöner Tag.", "Schöner ist ein Adjektiv."), L("Die **S**chönheit der Berge.", "Schönheit ist ein Nomen.")],
        "Adjektive beginnen mit einem kleinen Buchstaben. Pass aber auf Wörter auf, die sich ähnlich sehen. Schön ist ein Adjektiv. Die Schönheit ist ein Nomen, denn der Artikel passt davor. Mach im Zweifel immer beide Proben.",
        { tasks: [k("Das war ein ___ Tag.", "schöner", ["Schöner"], "Das Wort beschreibt den Tag. Es ist ein Adjektiv und wird kleingeschrieben.", "Sagt das Wort, wie der Tag war? Und passt ein Artikel davor?")] },
      ),
      b(
        "Jetzt du: alle drei gemischt",
        "Tipp bei jedem Wort auf die richtige Wortart.",
        "Jetzt sind Nomen, Verben und Adjektive gemischt. Du hast für jede Wortart eine Probe: den Artikel, die Vergangenheit und das Steigern. Probier sie der Reihe nach aus.",
        {
          tasks: [
            k("Die Suppe schmeckt salzig. Das Wort salzig ist ___.", "ein Adjektiv", ["ein Nomen", "ein Verb"], "Du kannst es steigern: salzig, salziger, am salzigsten.", "Kannst du das Wort steigern, so wie schnell und schneller?"),
            k("Die Suppe schmeckt salzig. Das Wort schmeckt ist ___.", "ein Verb", ["ein Nomen", "ein Adjektiv"], "In der Vergangenheit hieße es schmeckte. Es verändert sich mit der Zeit.", "Welches Wort ändert sich, wenn die Suppe gestern auf dem Tisch stand?"),
            k("Die Suppe schmeckt salzig. Das Wort Suppe ist ___.", "ein Nomen", ["ein Verb", "ein Adjektiv"], "Der Artikel steht schon davor, und es wird großgeschrieben.", "Vor welchem Wort steht der Artikel die?"),
          ],
        },
      ),
    ),
    ch(
      "Artikel und Pronomen",
      b(
        "Artikel begleiten das Nomen",
        [L("**der, die, das**", "Das sind die bestimmten Artikel."), L("**ein, eine**", "Das sind die unbestimmten Artikel.")],
        "Die Artikel kennst du schon von der Probe für Nomen. Sie stehen vor einem Nomen und begleiten es. Der bestimmte Artikel meint etwas Bestimmtes: der Hund von nebenan. Der unbestimmte Artikel meint irgendeinen: ein Hund.",
      ),
      b(
        "Pronomen stehen für ein Nomen",
        ["*Tom lacht. **Er** lacht.*", "Statt den Namen zu wiederholen, sagst du er.", "So ein Wort heißt **Pronomen**."],
        "Pro bedeutet für. Ein Pronomen steht also für ein Nomen. Ohne Pronomen müsstest du jeden Namen ständig wiederholen. Tom lacht, Tom steht auf, Tom geht. Mit Pronomen klingt es viel besser: Tom lacht, er steht auf, er geht.",
        { tasks: [k("Lena liest ein Buch. ___ liest ein Buch.", "Sie", ["Er"], "Lena ist ein Mädchen. Für ein Mädchen steht dieses Pronomen.", "Welches kleine Wort benutzt du, wenn du über ein Mädchen sprichst?")] },
      ),
      b(
        "Pronomen, die zeigen, wem etwas gehört",
        ["**mein** Hund, **dein** Buch, **ihr** Fahrrad", "Diese Pronomen stehen vor dem Nomen, wie ein Artikel.", "Sie zeigen, wem etwas gehört."],
        "Es gibt verschiedene Arten von Pronomen. Ich, du, er und sie stehen allein. Mein, dein, sein und ihr stehen vor einem Nomen und sagen, wem etwas gehört. Beide Arten heißen Pronomen. In der Prüfung reicht dieser eine Name.",
      ),
      b(
        "Jetzt du: Artikel und Pronomen",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Überleg bei jeder Aufgabe, welche Aufgabe das gesuchte Wort hat. Begleitet es ein Nomen, steht es für ein Nomen, oder zeigt es, wem etwas gehört?",
        {
          tasks: [
            k("Der Hund bellt. ___ bellt.", "Er", ["Es"], "Es heißt der Hund. Dazu passt dieses Pronomen.", "Welcher Artikel steht vor Hund? Welches Pronomen gehört dazu?"),
            k("Welches Wort ist ein Artikel? ___", "eine", ["ich", "schnell"], "Das Wort begleitet ein Nomen, zum Beispiel vor Katze oder Blume.", "Welches der drei Wörter kannst du vor Katze oder Blume setzen?"),
            k("Das Fahrrad gehört mir. Es ist ___ Fahrrad.", "mein", ["ich"], "Dieses Pronomen zeigt, dass etwas dem Sprecher gehört.", "Wie sagst du, wenn dir etwas gehört?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Nomen**: der, die oder das passt davor.", "**Verb**: Es verändert sich mit Person und Zeit.", "**Adjektiv**: Du kannst es steigern.", "**Artikel**: Er begleitet ein Nomen.", "**Pronomen**: Es steht für ein Nomen.")],
        "Das sind die fünf Wortarten dieser Lektion mit ihren Proben. Lies die Liste einmal langsam durch. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz. Danach kennst du schon mehr als die Hälfte aller Wortarten.",
        { tasks: [k("Mit welcher Probe erkennst du ein Adjektiv? ___", "Ich steigere das Wort.", ["Ich setze der, die oder das davor."], "Nur Adjektive haben eine zweite und dritte Stufe.", "Welche Probe gehört zu schnell, schneller, am schnellsten?")] },
      ),
    ),
  ],
  [
    v("Wortart", "Die Aufgabe, die ein Wort im Satz hat. Danach bekommt es seinen Namen."),
    v("Nomen", "Gibt Lebewesen, Dingen, Orten, Gefühlen und Gedanken einen Namen. Wird großgeschrieben.", "der Hund, die Freude"),
    v("Verb", "Sagt, was jemand tut oder was geschieht. Verändert sich mit Person und Zeit.", "lachen, sein, haben"),
    v("Adjektiv", "Sagt, wie jemand oder etwas ist. Lässt sich steigern.", "schnell, schneller, am schnellsten"),
    v("Artikel", "Begleitet ein Nomen.", "der, die, das, ein, eine"),
    v("Pronomen", "Steht für ein Nomen oder zeigt, wem etwas gehört.", "er, sie, mein, dein"),
    v("Infinitiv", "Die Grundform des Verbs, wie sie im Wörterbuch steht.", "laufen"),
    v("Singular / Plural", "Einzahl und Mehrzahl.", "ein Hund, zwei Hunde"),
  ],
  [
    q("Welche Wortart ist das Wort Freude?", "Nomen", ["Verb", "Adjektiv", "Pronomen"], "Die Probe mit dem Artikel passt: die Freude. Auch Gefühle haben einen Namen und sind Nomen."),
    q("Mit welcher Probe erkennst du ein Nomen?", "Ich setze der, die oder das davor.", ["Ich steigere das Wort.", "Ich setze es in die Vergangenheit.", "Ich zähle die Buchstaben."], "Vor ein Nomen passt ein Artikel. Steigern kann man nur Adjektive, und nur Verben haben eine Vergangenheit."),
    q("Wir waren gestern im Kino. Welches Wort ist das Verb?", "waren", ["gestern", "Kino", "im"], "Waren gehört zu sein. Sein und haben sind Verben, auch wenn dabei niemand etwas tut."),
    q("Welche Wortart ist schnell in dem Satz: Ein schnelles Auto fuhr vorbei?", "Adjektiv", ["Nomen", "Verb", "Artikel"], "Das Wort sagt, wie das Auto ist, und du kannst es steigern: schnell, schneller, am schnellsten."),
    q("Er lacht. Welche Wortart ist das Wort er?", "Pronomen", ["Artikel", "Nomen", "Adjektiv"], "Er steht für ein Nomen, zum Beispiel für Tom. Wörter, die für ein Nomen stehen, sind Pronomen."),
    q("Wie heißt die Grundform eines Verbs?", "Infinitiv", ["Plural", "Singular", "Artikel"], "Der Infinitiv ist die Form, unter der du ein Verb im Wörterbuch findest, zum Beispiel laufen."),
    q("Welches Wort musst du großschreiben?", "die Hoffnung", ["hoffen", "hoffnungsvoll", "hoffentlich"], "Hoffnung ist ein Nomen, denn der Artikel passt davor. Nomen schreibt man im Deutschen groß."),
    q("Welches Wort ist ein Artikel?", "das", ["wir", "groß", "Haus"], "Ein Artikel begleitet ein Nomen: das Haus. Wir ist ein Pronomen, groß ein Adjektiv und Haus ein Nomen."),
    q("Mein Bruder schläft. Welche Aufgabe hat das Wort mein?", "Es zeigt, wem etwas gehört.", ["Es sagt, was passiert.", "Es sagt, wie etwas ist.", "Es ist der Name für ein Ding."], "Mein ist ein Pronomen, das vor einem Nomen steht. Es zeigt, zu wem der Bruder gehört."),
  ],
);
