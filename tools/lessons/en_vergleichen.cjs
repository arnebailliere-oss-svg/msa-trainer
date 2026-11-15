// Guided lesson: comparison of adjectives.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_05d_vergleichen.json",
  {
    id: "P_EN_COMPARISON",
    subject: "EN",
    title: "Vergleichen: big, bigger, the biggest",
    teaser: "Wie du im Englischen Dinge und Menschen vergleichst: kurze Wörter mit -er und -est, lange Wörter mit more und most, die drei unregelmäßigen Wörter und der Vergleich mit as … as.",
    hook: "Mein Bruder ist größer als ich. Das war der beste Film des Jahres. Vergleichen gehört zu den Dingen, die man in jeder Schreibaufgabe braucht. Im Englischen geht es fast genauso wie im Deutschen. Es gibt nur eine einzige Entscheidung, die du treffen musst, und die hängt von der Länge des Wortes ab.",
    outro: "Du kannst jetzt auf Englisch vergleichen. Kurze Wörter bekommen -er und -est, lange Wörter bekommen more und most. Good, bad und many haben eigene Formen. Und wenn zwei Dinge gleich sind, benutzt du as … as.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Kurze Wörter: -er und -est",
      b(
        "Vergleichen auf Deutsch",
        [L("Tom ist **groß**.", "Ben ist **größer**.", "Ali ist **am größten**."), "Wörter wie groß sagen, **wie** jemand oder etwas ist. Sie heißen **Adjektive**."],
        "Wir fangen wieder auf Deutsch an. Groß, klein, schnell und teuer sind Adjektive. Man nennt sie auch Wie-Wörter, weil sie sagen, wie etwas ist. Wenn du vergleichst, verändert sich das Adjektiv. Aus groß wird größer und am größten.",
      ),
      b(
        "Dasselbe auf Englisch",
        [L("tall", "tall**er**", "the tall**est**"), "Wie im Deutschen: groß, größ**er**, am größ**ten**."],
        "Im Englischen passiert genau dasselbe. An das Adjektiv kommt er, wenn du zwei vergleichst. Es kommt est, wenn einer ganz vorn liegt. Vor der Form mit est steht fast immer the. Tall bedeutet groß, wenn man von Menschen spricht.",
      ),
      b(
        "Die Namen der Formen",
        [L("tall**er**: der **Komparativ**", "Zwei werden verglichen."), L("the tall**est**: der **Superlativ**", "Einer liegt ganz vorn.")],
        "Diese beiden Wörter hörst du im Unterricht oft. Der Komparativ ist die Form für den Vergleich zwischen zweien. Der Superlativ ist die Form für den, der alle anderen übertrifft. Du musst die Namen nicht lieben, aber du solltest sie wiedererkennen.",
      ),
      b(
        "than heißt als",
        ["*Ben is taller **than** Tom.*", "= Ben ist größer als Tom.", "Nicht verwechseln: **then** heißt dann."],
        "Nach dem Komparativ kommt than. Das ist das englische Wort für als. Pass auf die Schreibweise auf. Than mit a ist das Wort für den Vergleich. Then mit e bedeutet dann und hat mit Vergleichen nichts zu tun.",
        { tasks: [k("My brother is older ___ me.", "than", ["then", "as"], "Nach einem Komparativ steht das Wort für als, geschrieben mit a.", "Welches der Wörter bedeutet als? Achte auf den Buchstaben in der Mitte.")] },
      ),
      b(
        "Drei kleine Schreibregeln",
        ["big wird zu bi**gg**er: Der letzte Buchstabe wird verdoppelt.", "nice wird zu nice**r**: Das e ist schon da.", "happy wird zu happ**ier**: Aus y wird i."],
        "Diese Regeln kennst du in ähnlicher Form schon von den Verben. Bei kurzen Wörtern wie big oder hot wird der letzte Buchstabe verdoppelt. Endet das Wort schon auf e, hängst du nur ein r an. Und aus einem y am Ende wird ein i.",
        { tasks: [k("Today is ___ than yesterday. (hot)", "hotter", ["hoter"], "Hot ist ein kurzes Wort. Der letzte Buchstabe wird verdoppelt.", "Schau auf die erste Regel der Tafel. Ist hot ein kurzes Wort wie big?")] },
      ),
      b(
        "Jetzt du: -er oder -est?",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Überleg bei jedem Satz: Werden zwei verglichen, oder liegt einer ganz vorn? Das Wort than zeigt dir einen Vergleich zwischen zweien. Das Wort the vor der Lücke zeigt dir den Superlativ.",
        {
          tasks: [
            k("A car is ___ than a bike.", "faster", ["fastest"], "Than zeigt: Zwei werden verglichen. Dann steht der Komparativ.", "Welches kleine Wort steht hinter der Lücke? Was zeigt es an?"),
            k("Mount Everest is the ___ mountain in the world.", "highest", ["higher"], "The vor der Lücke und in the world zeigen: Einer liegt ganz vorn.", "Wird der Berg mit einem anderen verglichen oder mit allen auf der Welt?"),
            k("My bag is ___ than yours. (heavy)", "heavier", ["heavyer"], "Heavy endet auf y. Aus dem y wird ein i.", "Womit endet heavy? Welche der drei Schreibregeln gilt dann?"),
          ],
        },
      ),
    ),
    ch(
      "Lange Wörter: more und most",
      b(
        "Was ist eine Silbe?",
        [L("tall: 1 **Silbe**", "hap-py: 2 Silben", "ex-pen-sive: 3 Silben"), "Eine Silbe ist ein Klatscher, wenn du ein Wort klatschst."],
        "Um zu entscheiden, wie du ein Adjektiv veränderst, musst du seine Länge kennen. Man misst sie in Silben. Sprich das Wort langsam und klatsch dabei mit. Jeder Klatscher ist eine Silbe. Probier es unten gleich aus.",
        { tasks: [k("Das Wort beautiful hat ___ Silben.", "drei", ["zwei"], "Beau-ti-ful: Das sind drei Klatscher, also drei Silben.", "Sprich das Wort langsam und klatsch bei jedem Teil mit.")] },
      ),
      b(
        "Lange Wörter bleiben, wie sie sind",
        [L("expensive", "**more** expensive", "the **most** expensive"), "Falsch wäre: *expensiver*."],
        "Lange Adjektive bekommen kein er und kein est. Das würde man kaum aussprechen können. Stattdessen stellst du more oder most davor. More heißt mehr, most heißt am meisten. Das Adjektiv selbst verändert sich dabei überhaupt nicht.",
      ),
      b(
        "Die Faustregel",
        ["1 Silbe: **-er, -est**. Beispiel: *tall*", "2 Silben mit y am Ende: **-ier, -iest**. Beispiel: *happy*", "Alle anderen ab 2 Silben: **more, most**. Beispiel: *boring, expensive*"],
        "Mit diesen drei Zeilen kommst du fast überall durch. Ein kurzes Wort mit einer Silbe bekommt die Endung. Ein Wort mit zwei Silben und einem y am Ende bekommt sie auch. Alles, was länger ist, bekommt more und most.",
        { tasks: [k("This book is ___ than that one.", "more interesting", ["interestinger"], "Interesting hat vier Silben. Lange Wörter bekommen more.", "Wie viele Silben hat interesting? Was gilt für lange Wörter?")] },
      ),
      b(
        "Nie beides zusammen",
        ["Falsch: *more taller*", "Falsch: *more better*", "Entweder die Endung **oder** more. Nie beides."],
        "Das ist ein Fehler, der sehr oft vorkommt. Man will es besonders deutlich sagen und nimmt beides. Im Englischen ist das falsch. Taller ist bereits der Komparativ. Ein zusätzliches more davor hat keinen Platz.",
        { tasks: [k("She is ___ than her sister.", "taller", ["more taller"], "Tall hat eine Silbe und bekommt die Endung. Ein more davor ist zu viel.", "Hat das Wort schon eine Endung? Darf dann noch more davor stehen?")] },
      ),
      b(
        "Jetzt du: Endung oder more?",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Zähl bei jedem Adjektiv zuerst die Silben. Schau dann, ob es auf y endet. Danach weißt du, ob es die Endung bekommt oder more und most.",
        {
          tasks: [
            k("This is the ___ film I know.", "most boring", ["boringest"], "Boring hat zwei Silben und endet nicht auf y. Dann steht most davor.", "Wie viele Silben hat boring? Endet es auf y?"),
            k("Maths is ___ than art.", "more difficult", ["difficulter"], "Difficult hat drei Silben. Lange Wörter bekommen more.", "Klatsch das Wort difficult. Wie viele Silben zählst du?"),
            k("She is the ___ girl in our class.", "funniest", ["most funny"], "Funny hat zwei Silben und endet auf y. Dann wird aus y ein i, und est kommt dazu.", "Womit endet funny? Welche Zeile der Faustregel passt?"),
          ],
        },
      ),
    ),
    ch(
      "Unregelmäßige Wörter und as … as",
      b(
        "Drei Wörter machen nicht mit",
        [L("good, **better**, the **best**", "bad, **worse**, the **worst**", "much / many, **more**, the **most**")],
        "Drei sehr häufige Wörter halten sich an keine Regel. Im Deutschen ist das genauso: gut, besser, am besten. Niemand sagt guter. Lies die drei Zeilen ein paarmal laut. Good, better, best kennst du vielleicht schon aus Liedern.",
      ),
      b(
        "Jetzt du: unregelmäßig",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Alle drei Sätze brauchen eins der unregelmäßigen Wörter. Blättere ruhig eine Tafel zurück, wenn du nachsehen möchtest. Das ist kein Schummeln, das ist Lernen.",
        {
          tasks: [
            k("This pizza is ___ than the last one.", "better", ["gooder"], "Good ist unregelmäßig. Der Komparativ hat eine eigene Form.", "Wie heißt es auf Deutsch: guter oder besser? Im Englischen ist es ähnlich."),
            k("It was the ___ day of my life.", "worst", ["baddest"], "Bad ist unregelmäßig. Der Superlativ hat eine eigene Form.", "Schau in die zweite Zeile der Tafel davor. Welche Form steht hinter the?"),
            k("I have ___ books than you.", "more", ["manyer"], "Der Komparativ von many heißt so. Bücher kann man zählen.", "Schau in die dritte Zeile der Tafel davor."),
          ],
        },
      ),
      b(
        "Genauso wie: as … as",
        ["*Tom is **as tall as** Ben.*", "= Tom ist so groß wie Ben.", "Zwischen as und as steht das Adjektiv **ohne Endung**."],
        "Manchmal sind zwei Dinge gleich. Dann brauchst du keinen Komparativ. Du stellst das Adjektiv einfach zwischen zwei as. Wichtig ist, dass das Adjektiv dabei unverändert bleibt. Es heißt as tall as und nicht as taller as.",
        { tasks: [k("She is as ___ as her mother.", "tall", ["taller"], "Zwischen as und as steht das Adjektiv ohne Endung.", "Sind die beiden gleich groß? Welche Form steht dann zwischen as und as?")] },
      ),
      b(
        "Nicht so … wie",
        ["*A bike is **not as fast as** a car.*", "= Ein Fahrrad ist nicht so schnell wie ein Auto."],
        "Mit einem not davor sagst du, dass etwas weniger ist. Das ist eine praktische zweite Möglichkeit zu vergleichen. A car is faster than a bike und a bike is not as fast as a car bedeuten dasselbe. In einer Schreibaufgabe kannst du so abwechseln.",
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Jetzt kommt alles zusammen: Endung, more, unregelmäßige Wörter und as … as. Schau bei jedem Satz zuerst auf die kleinen Wörter um die Lücke herum.",
        {
          tasks: [
            k("London is ___ than Berlin.", "bigger", ["more big"], "Big hat eine Silbe. Es bekommt die Endung, und das g wird verdoppelt.", "Wie viele Silben hat big? Bekommt es dann more oder die Endung?"),
            k("My phone is as ___ as yours.", "good", ["better"], "Zwischen as und as steht das Adjektiv ohne Veränderung.", "Welche Wörter stehen vor und hinter der Lücke?"),
            k("This is the ___ restaurant in town.", "most expensive", ["expensivest"], "Expensive hat drei Silben. Mit the davor steht der Superlativ mit most.", "Zähl die Silben. Und welches kleine Wort steht vor der Lücke?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Kurze Wörter: **-er**, **-est**", "(2) Lange Wörter: **more**, **most**", "(3) good, better, best und bad, worse, worst", "(4) Gleich: **as … as**"],
        "Das sind die vier Dinge, die du zum Vergleichen brauchst. Wenn du unsicher bist, klatsch das Wort und zähl die Silben. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Ben is taller ___ Tom.", "than", ["then"], "Nach dem Komparativ steht das Wort für als, geschrieben mit a.", "Welches Wort bedeutet als und welches dann?")] },
      ),
    ),
  ],
  [
    v("Adjektiv", "Ein Wie-Wort. Es sagt, wie jemand oder etwas ist.", "tall, happy, expensive"),
    v("Komparativ", "Die Form für den Vergleich zwischen zweien.", "taller, more expensive"),
    v("Superlativ", "Die Form für den, der ganz vorn liegt.", "the tallest, the most expensive"),
    v("Silbe", "Ein Teil eines Wortes, den man einzeln klatschen kann.", "hap-py hat zwei Silben"),
    v("than", "Als, nach einem Komparativ. Nicht verwechseln mit then, das dann bedeutet.", "taller than Tom"),
    v("as … as", "So … wie, wenn zwei Dinge gleich sind.", "as tall as Ben"),
    v("better / worse", "Besser und schlechter. Die unregelmäßigen Komparative von good und bad."),
  ],
  [
    q("My sister is ___ than me.", "older", ["oldest", "more old", "old"], "Than zeigt, dass zwei verglichen werden. Old hat eine Silbe und bekommt deshalb die Endung er."),
    q("This is the ___ book I have ever read.", "most interesting", ["interestingest", "more interesting", "interestinger"], "The vor der Lücke zeigt den Superlativ. Interesting ist ein langes Wort und bekommt deshalb most."),
    q("Welche Form ist richtig?", "happier", ["more happy", "happyer", "more happier"], "Happy hat zwei Silben und endet auf y. Aus dem y wird ein i, und die Endung er kommt dazu."),
    q("Today the weather is ___ than yesterday.", "worse", ["badder", "worst", "more bad"], "Bad ist unregelmäßig. Der Komparativ heißt worse, der Superlativ heißt worst."),
    q("He is as ___ as his father.", "tall", ["taller", "tallest", "more tall"], "Zwischen as und as steht das Adjektiv ohne Endung. Der Satz sagt, dass beide gleich groß sind."),
    q("Welcher Satz ist richtig?", "She is taller than me.", ["She is more taller than me.", "She is taller then me.", "She is tallest than me."], "Tall bekommt die Endung er, ohne more davor. Und das Wort für als schreibt man than."),
    q("Wie viele Silben hat das Wort expensive?", "drei", ["zwei", "vier", "eine"], "Ex-pen-sive: Das sind drei Klatscher. Deshalb bekommt das Wort more und most."),
    q("This is the ___ pizza in town.", "best", ["goodest", "better", "most good"], "Good ist unregelmäßig. Mit the davor brauchst du den Superlativ, und der heißt best."),
  ],
);
