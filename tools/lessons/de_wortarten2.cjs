// Guided lesson: word classes 2 (Präposition, Konjunktion, Adverb).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_03b_wortarten2.json",
  {
    id: "P_DE_WORTARTEN2",
    subject: "DE",
    title: "Wortarten 2: die kleinen Wörter",
    teaser: "Präpositionen, Konjunktionen und Adverbien: die kurzen Wörter, die einen Satz zusammenhalten. Du lernst, wie du sie unterscheidest und warum sie für die Kommas so wichtig sind.",
    hook: "In der ersten Lektion ging es um die großen Wörter, die man leicht bemerkt. Jetzt kommen die kleinen dazu: in, auf, weil, und, heute, dort. Sie fallen kaum auf, aber ohne sie hält kein Satz zusammen. Und an einer Gruppe von ihnen erkennst du später, wo ein Komma hingehört.",
    outro: "Jetzt kennst du alle acht Wortarten. Präpositionen zeigen, wie Dinge zueinander stehen. Konjunktionen verbinden Wörter und Sätze. Adverbien sagen, wann, wo und wie etwas geschieht, und sie verändern sich nie. Mit diesem Wissen bist du bereit für die Satzglieder und die Kommas.",
    requires: ["P_DE_WORTARTEN"],
  },
  [
    ch(
      "Präpositionen",
      b(
        "Ein kleines Wort ändert alles",
        ["Die Katze sitzt **auf** dem Tisch.", "Die Katze sitzt **unter** dem Tisch.", "Nur ein Wort ist anders, und die Katze ist woanders."],
        "Lies die beiden Sätze und stell sie dir vor. Im ersten Satz sitzt die Katze oben, im zweiten unten. Alle anderen Wörter sind gleich geblieben. Es sind die kleinen Wörter auf und unter, die den ganzen Unterschied machen.",
      ),
      b(
        "Das ist eine Präposition",
        ["*in, auf, unter, mit, nach, vor, bei*", "Eine **Präposition** zeigt, wie zwei Dinge zueinander stehen."],
        "Solche Wörter heißen Präpositionen. Man sagt auch Verhältniswort dazu, weil sie ein Verhältnis zeigen: wo etwas ist, wann etwas passiert oder womit jemand etwas tut. Die Katze und der Tisch stehen in einem Verhältnis, und die Präposition sagt, in welchem.",
        { tasks: [k("Das Buch liegt ___ dem Bett.", "unter", ["und", "schnell"], "Das Wort zeigt, wo das Buch im Verhältnis zum Bett liegt.", "Welches der drei Wörter sagt, wo etwas liegt?")] },
      ),
      b(
        "Wo, wann und womit",
        [L("**in** der Schule: Das sagt, wo.", "**nach** dem Essen: Das sagt, wann.", "**mit** dem Bus: Das sagt, womit.")],
        "Präpositionen zeigen nicht nur einen Ort. Sie können auch eine Zeit zeigen, wie nach dem Essen oder vor der Schule. Und sie können zeigen, womit oder mit wem etwas geschieht. Es sind immer kurze Wörter, die man leicht überliest.",
      ),
      b(
        "Präpositionen stehen vor einem Nomen",
        [L("**auf** dem Tisch", "**mit** meiner Schwester", "**nach** der Schule"), "Nach der Präposition kommt ein Begleiter und dann ein Nomen."],
        "Daran erkennst du eine Präposition am sichersten. Sie steht fast nie allein. Nach ihr kommt ein Artikel oder ein Pronomen und dann ein Nomen. Auf dem Tisch, mit meiner Schwester, nach der Schule. Die drei Wörter gehören fest zusammen.",
        { tasks: [k("Wir fahren mit dem Zug. Die Präposition heißt: ___", "mit", ["fahren", "Zug"], "Das Wort steht vor dem Artikel und dem Nomen und sagt, womit wir fahren.", "Welches kurze Wort steht direkt vor dem Artikel dem?")] },
      ),
      b(
        "Jetzt du: Präpositionen finden",
        "Tipp in jedem Satz auf die Präposition.",
        "Such in jedem Satz das kurze Wort, das vor einem Artikel und einem Nomen steht. Es sagt dir, wo, wann oder womit etwas geschieht.",
        {
          tasks: [
            k("Der Hund schläft neben dem Sofa. ___", "neben", ["schläft", "Sofa"], "Das Wort sagt, wo der Hund im Verhältnis zum Sofa liegt.", "Welches Wort steht direkt vor dem Artikel dem?"),
            k("Vor dem Frühstück dusche ich. ___", "Vor", ["Frühstück", "dusche"], "Das Wort sagt, wann geduscht wird. Es steht vor Artikel und Nomen.", "Welches Wort sagt, wann etwas passiert, und steht vor einem Artikel?"),
            k("Sie schreibt mit einem Bleistift. ___", "mit", ["schreibt", "Bleistift"], "Das Wort sagt, womit sie schreibt.", "Welches Wort steht direkt vor dem Artikel einem?"),
          ],
        },
      ),
    ),
    ch(
      "Konjunktionen",
      b(
        "Wörter, die verbinden",
        ["Tom **und** Lena lachen.", "Ich komme, **weil** ich Zeit habe.", "Solche Wörter heißen **Konjunktionen**."],
        "Eine Konjunktion verbindet etwas. Man nennt sie deshalb auch Bindewort. Im ersten Satz verbindet und zwei Namen. Im zweiten Satz verbindet weil zwei ganze Sätze: Ich komme, und ich habe Zeit. Ohne Konjunktionen könntest du nur ganz kurze Sätze bilden.",
      ),
      b(
        "Zwei Gruppen",
        [L("**und, oder, aber, denn**", "Sie verbinden gleichwertige Teile."), L("**weil, dass, wenn, obwohl, als**", "Sie hängen einen Satz an einen anderen an.")],
        "Die erste Gruppe stellt zwei Dinge nebeneinander: Tom und Lena, Tee oder Kaffee. Die zweite Gruppe macht mehr. Sie hängt einen Satz an einen anderen, und dieser angehängte Satz kann nicht allein stehen. Weil ich Zeit habe ist für sich allein kein fertiger Satz.",
        { tasks: [k("Ich bleibe zu Hause, ___ ich krank bin.", "weil", ["auf", "schnell"], "Das Wort verbindet zwei Sätze und nennt den Grund.", "Welches der drei Wörter kann zwei Sätze miteinander verbinden?")] },
      ),
      b(
        "Warum das für Kommas wichtig ist",
        ["Ich glaube**,** dass es regnet.", "Wir gehen raus**,** obwohl es kalt ist.", "Vor weil, dass, wenn und obwohl steht ein Komma."],
        "Hier siehst du, wozu du die Konjunktionen brauchst. Die Wörter der zweiten Gruppe sind wie ein Warnschild. Wenn du eins davon siehst, weißt du: Davor gehört ein Komma. Wer diese Wörter erkennt, hat die meisten Kommas schon gefunden.",
      ),
      b(
        "Präposition oder Konjunktion?",
        [L("**nach** dem Essen", "Präposition: Danach kommt ein Nomen."), L("**nachdem** wir gegessen hatten", "Konjunktion: Danach kommt ein Satz mit Verb.")],
        "Manche Wörter sehen sich ähnlich. Der Unterschied liegt in dem, was danach kommt. Nach einer Präposition steht ein Nomen. Nach einer Konjunktion steht ein ganzer Satz mit einem eigenen Verb. Schau also immer, ob danach ein Verb folgt.",
        { tasks: [k("Sie lachte, ___ sie den Witz hörte.", "als", ["auf"], "Danach folgt ein Satz mit eigenem Verb. Dafür braucht man eine Konjunktion.", "Folgt nach der Lücke ein Satz mit Verb oder nur ein Nomen?")] },
      ),
      b(
        "Jetzt du: Welche Wortart?",
        "Tipp bei jedem Satz auf die richtige Wortart des fett gemeinten Wortes.",
        "Überleg bei jedem Wort, was danach kommt. Steht ein Nomen dahinter, ist es eine Präposition. Folgt ein Satz mit Verb oder verbindet das Wort zwei gleiche Teile, ist es eine Konjunktion.",
        {
          tasks: [
            k("Wir warten vor der Schule. Das Wort vor ist ___.", "eine Präposition", ["eine Konjunktion"], "Danach kommt ein Artikel und ein Nomen: der Schule.", "Was folgt nach dem Wort: ein Nomen oder ein Satz mit Verb?"),
            k("Ich esse, wenn ich Hunger habe. Das Wort wenn ist ___.", "eine Konjunktion", ["eine Präposition"], "Danach folgt ein ganzer Satz mit dem Verb habe.", "Was folgt nach dem Wort: ein Nomen oder ein Satz mit Verb?"),
            k("Äpfel oder Birnen? Das Wort oder ist ___.", "eine Konjunktion", ["eine Präposition"], "Es verbindet zwei gleichwertige Teile miteinander.", "Zeigt das Wort einen Ort, oder verbindet es zwei Dinge?"),
          ],
        },
      ),
    ),
    ch(
      "Adverbien",
      b(
        "Wann, wo und wie",
        ["*heute, dort, gern, sehr, oft*", "Ein **Adverb** sagt genauer, wann, wo oder wie etwas geschieht."],
        "Ein Adverb gibt einem Satz mehr Genauigkeit. Ich komme ist ein fertiger Satz. Ich komme heute sagt zusätzlich, wann. Ich komme gern sagt, wie. Das Wort Adverb bedeutet beim Verb, weil es meistens etwas über das Verb aussagt.",
      ),
      b(
        "Adverbien bleiben immer gleich",
        ["heute, heute, heute", "Ein Adverb bekommt nie eine Endung.", "Es hat keinen Plural, und du kannst es nicht steigern."],
        "Das ist das wichtigste Merkmal. Nomen haben einen Plural, Verben verändern sich mit der Person, Adjektive bekommen Endungen. Ein Adverb sieht immer gleich aus. Heute bleibt heute, egal in welchem Satz. Niemand sagt heuter oder am heutesten.",
        { tasks: [k("Welches Wort ist ein Adverb? ___", "gestern", ["schnelles", "laufen"], "Das Wort sagt, wann etwas war, und es verändert sich nie.", "Welches der drei Wörter sieht in jedem Satz gleich aus?")] },
      ),
      b(
        "Adverb oder Adjektiv?",
        [L("Er läuft **schnell**.", "Schnell kannst du steigern: schneller. Es ist ein Adjektiv."), L("Er läuft **dort**.", "Dort kannst du nicht steigern. Es ist ein Adverb.")],
        "Diese beiden werden oft verwechselt, weil sie an derselben Stelle stehen können. Die Probe kennst du schon: das Steigern. Schnell, schneller, am schnellsten funktioniert. Dort, dorter funktioniert nicht. Was du nicht steigern kannst und was sich nie verändert, ist ein Adverb.",
        { tasks: [k("Kannst du das Wort dort steigern? ___", "Nein", ["Ja"], "Es gibt keine zweite Stufe davon. Deshalb ist es ein Adverb.", "Probier es aus: Gibt es eine Form mit -er am Ende?")] },
      ),
      b(
        "Typische Adverbien",
        [L("**Zeit**: heute, gestern, oft, nie, bald", "**Ort**: hier, dort, draußen, oben", "**Art**: gern, leider, sehr, vielleicht")],
        "Diese Wörter solltest du als Adverbien wiedererkennen. Die erste Zeile antwortet auf die Frage wann. Die zweite antwortet auf die Frage wo. Die dritte sagt etwas darüber, wie jemand etwas findet oder wie sicher etwas ist.",
      ),
      b(
        "Jetzt du: die kleinen Wörter gemischt",
        "Tipp bei jedem Satz auf die richtige Wortart.",
        "Jetzt sind alle drei Wortarten dieser Lektion gemischt. Frag dich bei jedem Wort: Steht es vor einem Nomen? Verbindet es etwas? Oder sagt es wann, wo oder wie und bleibt immer gleich?",
        {
          tasks: [
            k("Wir treffen uns morgen. Das Wort morgen ist ___.", "ein Adverb", ["eine Präposition", "eine Konjunktion"], "Es sagt, wann wir uns treffen, und verändert sich nie.", "Auf welche Frage antwortet das Wort: wo, wann oder wie?"),
            k("Der Ball liegt hinter dem Tor. Das Wort hinter ist ___.", "eine Präposition", ["ein Adverb", "eine Konjunktion"], "Danach kommen ein Artikel und ein Nomen: dem Tor.", "Was steht direkt nach dem Wort?"),
            k("Ich lerne, aber ich bin müde. Das Wort aber ist ___.", "eine Konjunktion", ["ein Adverb", "eine Präposition"], "Es verbindet zwei ganze Sätze miteinander.", "Was steht links und rechts von dem Wort?"),
          ],
        },
      ),
      b(
        "Alle acht Wortarten",
        [L("Nomen, Verb, Adjektiv", "Artikel, Pronomen", "**Präposition**: steht vor einem Nomen.", "**Konjunktion**: verbindet Wörter und Sätze.", "**Adverb**: sagt wann, wo, wie und bleibt immer gleich.")],
        "Mit den drei neuen sind es zusammen acht Wortarten. Mehr musst du für die Prüfung nicht kennen. Jedes deutsche Wort gehört zu einer dieser Gruppen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Wir bleiben zu Hause, weil es regnet. Das Wort weil ist ___.", "eine Konjunktion", ["eine Präposition"], "Weil verbindet zwei Sätze miteinander. Eine Präposition stünde vor einem Nomen.", "Verbindet das Wort zwei Sätze, oder steht es vor einem Nomen?")] },
      ),
    ),
  ],
  [
    v("Präposition", "Ein kurzes Wort, das zeigt, wie Dinge zueinander stehen. Es steht vor einem Nomen.", "auf dem Tisch, nach der Schule"),
    v("Konjunktion", "Ein Bindewort. Es verbindet Wörter oder Sätze.", "und, aber, weil, dass"),
    v("Adverb", "Sagt genauer, wann, wo oder wie etwas geschieht. Es verändert sich nie.", "heute, dort, gern"),
    v("weil, dass, wenn, obwohl", "Konjunktionen, die einen Satz an einen anderen anhängen. Vor ihnen steht ein Komma."),
  ],
  [
    q("Die Tasche steht neben der Tür. Welche Wortart ist neben?", "Präposition", ["Konjunktion", "Adverb", "Adjektiv"], "Das Wort steht vor einem Artikel und einem Nomen und sagt, wo die Tasche steht."),
    q("Ich komme, weil ich Zeit habe. Welche Wortart ist weil?", "Konjunktion", ["Präposition", "Adverb", "Pronomen"], "Weil verbindet zwei Sätze. Danach folgt ein Satz mit dem eigenen Verb habe."),
    q("Welches Wort ist ein Adverb?", "oft", ["unter", "weil", "freundlich"], "Oft sagt, wie häufig etwas geschieht, und verändert sich nie. Freundlich kannst du steigern, es ist ein Adjektiv."),
    q("Woran erkennst du ein Adverb?", "Es verändert sich nie.", ["Es steht immer vor einem Nomen.", "Es wird großgeschrieben.", "Es verbindet zwei Sätze."], "Ein Adverb hat keine Endung, keinen Plural und keine Steigerung. Es sieht in jedem Satz gleich aus."),
    q("Vor welchem Wort steht ein Komma?", "obwohl", ["und", "oder", "auf"], "Obwohl hängt einen Satz an einen anderen an. Vor solchen Konjunktionen steht ein Komma."),
    q("Nach dem Training duschen wir. Welche Wortart ist nach?", "Präposition", ["Konjunktion", "Adverb", "Verb"], "Danach kommen ein Artikel und ein Nomen: dem Training. Das ist das Zeichen für eine Präposition."),
    q("Er spricht leise. Welche Probe zeigt, dass leise ein Adjektiv ist?", "Man kann es steigern: leiser.", ["Man kann der davorsetzen.", "Es verändert sich nie.", "Es steht vor einem Nomen."], "Was sich steigern lässt, ist ein Adjektiv, auch wenn es bei einem Verb steht."),
  ],
);
