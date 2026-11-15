// Guided lesson: mood (Indikativ, Imperativ, Konjunktiv II, Konjunktiv I).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_07b_modus.json",
  {
    id: "P_DE_MODUS",
    subject: "DE",
    title: "Wirklich, befohlen oder nur vorgestellt: der Modus",
    teaser: "Die vier Aussageweisen des Verbs: Indikativ für die Wirklichkeit, Imperativ für Aufforderungen, Konjunktiv II für das, was man sich nur vorstellt, und Konjunktiv I für das, was jemand anders gesagt hat.",
    hook: "Ein Verb zeigt nicht nur, wann etwas passiert. Es kann auch zeigen, ob etwas wirklich so ist, ob es jemand befiehlt oder ob man es sich nur ausmalt. Wenn du sagst ich wäre gern am Meer, weiß jeder sofort, dass du nicht am Meer bist. Wie das Verb das schafft, sehen wir uns jetzt an.",
    outro: "Du kennst jetzt die vier Aussageweisen des Verbs. Der Indikativ sagt, was wirklich ist. Der Imperativ fordert jemanden auf. Der Konjunktiv II zeigt, dass etwas nur vorgestellt ist, und du erkennst ihn an wäre, hätte und würde. Der Konjunktiv I zeigt, dass du weitergibst, was jemand anders gesagt hat.",
    requires: ["P_DE_WORTARTEN"],
  },
  [
    ch(
      "Wirklichkeit und Aufforderung",
      b(
        "Derselbe Gedanke, drei Bedeutungen",
        [L("Du **kommst** mit.", "**Komm** mit!", "Du **kämest** mit, wenn du Zeit hättest.")],
        "Lies die drei Sätze langsam. Im ersten Satz kommst du wirklich mit. Im zweiten fordert dich jemand dazu auf. Im dritten kommst du gar nicht mit, es ist nur ein Gedanke. Das Verb ist jedes Mal kommen, aber seine Form sagt etwas Verschiedenes.",
      ),
      b(
        "Das nennt man Modus",
        ["Die Form des Verbs zeigt, **wie** etwas gemeint ist.", "Diese Aussageweise heißt Modus. Es gibt vier davon."],
        "Modus ist ein lateinisches Wort und bedeutet Art und Weise. Der Modus sagt also, auf welche Art ein Satz gemeint ist: als Tatsache, als Aufforderung oder als bloße Vorstellung. In der Prüfung sollst du ankreuzen, in welchem Modus ein Satz steht.",
      ),
      b(
        "Indikativ: So ist es",
        ["*Er **geht** jeden Tag zur Schule.*", "Der Satz sagt, was wirklich ist.", "Dieser Modus heißt **Indikativ**."],
        "Der Indikativ ist die ganz normale Form des Verbs. Du benutzt ihn für alles, was wirklich geschieht, geschehen ist oder geschehen wird. Fast alle Sätze, die du sprichst, stehen im Indikativ. Man nennt ihn deshalb auch Wirklichkeitsform.",
      ),
      b(
        "Imperativ: Tu das!",
        [L("**Geh** nach Hause!", "**Kommt** bitte herein!", "**Nehmen Sie** Platz!"), "Dieser Modus heißt **Imperativ**."],
        "Mit dem Imperativ forderst du jemanden auf, etwas zu tun. Das kann ein Befehl sein, eine Bitte oder ein Rat. Du erkennst ihn daran, dass das Verb ganz vorn steht und meistens die Person fehlt. Am Ende steht oft ein Ausrufezeichen.",
        { tasks: [k("___ bitte das Fenster zu!", "Mach", ["Machst"], "In einer Aufforderung steht das Verb vorn, ohne die Endung st.", "Wie sagst du es, wenn du einen Freund direkt aufforderst?")] },
      ),
      b(
        "Jetzt du: Indikativ oder Imperativ?",
        "Tipp bei jedem Satz auf den richtigen Modus.",
        "Frag dich bei jedem Satz: Wird hier etwas festgestellt, oder wird jemand zu etwas aufgefordert? Achte darauf, wo das Verb steht.",
        {
          tasks: [
            k("Sie lacht laut. Das ist ___.", "Indikativ", ["Imperativ"], "Der Satz stellt fest, was wirklich geschieht.", "Wird hier etwas festgestellt oder jemand aufgefordert?"),
            k("Hör mir bitte zu! Das ist ___.", "Imperativ", ["Indikativ"], "Jemand wird aufgefordert, und das Verb steht ganz vorn.", "Wo steht das Verb, und welches Zeichen steht am Ende?"),
            k("Morgen schreiben wir einen Test. Das ist ___.", "Indikativ", ["Imperativ"], "Der Satz sagt, was wirklich geschehen wird.", "Wird hier jemand aufgefordert, oder wird etwas mitgeteilt?"),
          ],
        },
      ),
    ),
    ch(
      "Konjunktiv II: nur vorgestellt",
      b(
        "Wenn ich reich wäre",
        ["*Wenn ich reich **wäre**, **würde** ich um die Welt reisen.*", "Das ist nicht wirklich so. Man stellt es sich nur vor.", "Dieser Modus heißt **Konjunktiv** II."],
        "Der Sprecher ist nicht reich, und er reist nicht um die Welt. Er malt sich nur aus, wie es wäre. Für solche Gedanken gibt es eine eigene Form des Verbs. Sie heißt Konjunktiv II. Man nennt sie auch Möglichkeitsform.",
      ),
      b(
        "Die wichtigsten Formen",
        [L("sein: ich **wäre**", "haben: ich **hätte**", "können: ich **könnte**", "kommen: ich **käme**", "wissen: ich **wüsste**")],
        "Diese fünf Formen brauchst du am häufigsten. Schau genau hin: Fast alle haben zwei Punkte auf einem Buchstaben. Aus war wird wäre, aus hatte wird hätte, aus konnte wird könnte. Daran erkennst du den Konjunktiv II meistens sofort.",
      ),
      b(
        "würde hilft immer",
        ["ich **würde** gehen, ich **würde** lachen, ich **würde** helfen", "Mit würde und dem Infinitiv kannst du jedes Verb in den Konjunktiv II setzen."],
        "Bei vielen Verben klingt die eigentliche Form veraltet. Niemand sagt heute ich hülfe. Deshalb nimmt man meistens würde und hängt das Verb in der Grundform an. Das ist richtig und klingt natürlich. Nur bei sein, haben und können benutzt man die kurze Form.",
        { tasks: [k("Wenn ich mehr Zeit ___, würde ich öfter lesen.", "hätte", ["habe"], "Der Sprecher hat die Zeit nicht. Es ist nur vorgestellt.", "Hat der Sprecher wirklich mehr Zeit? Welche Form zeigt, dass es nur ein Gedanke ist?")] },
      ),
      b(
        "Drei Aufgaben des Konjunktivs II",
        [L("**Unwirkliches**: *Wenn ich fliegen könnte …*", "**Wünsche**: *Ich hätte gern ein Eis.*", "**Höfliche Bitten**: *Könntest du mir helfen?*")],
        "Der Konjunktiv II hat drei Aufgaben. Er zeigt, dass etwas nicht wirklich ist. Er drückt Wünsche aus. Und er macht Bitten höflicher. Kannst du mir helfen klingt direkt. Könntest du mir helfen klingt freundlicher, weil es dem anderen die Wahl lässt.",
        { tasks: [k("___ du mir bitte das Salz geben?", "Könntest", ["Kannst"], "Mit dieser Form klingt die Bitte besonders höflich.", "Welche der beiden Formen hat zwei Punkte auf einem Buchstaben und klingt höflicher?")] },
      ),
      b(
        "Jetzt du: Konjunktiv II",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Frag dich bei jedem Satz, ob etwas wirklich so ist oder ob es nur vorgestellt, gewünscht oder höflich erbeten wird. Achte auf wäre, hätte, könnte und würde.",
        {
          tasks: [
            k("Wenn ich ein Vogel ___, würde ich nach Süden fliegen.", "wäre", ["bin"], "Niemand ist wirklich ein Vogel. Es ist nur vorgestellt.", "Ist der Sprecher wirklich ein Vogel?"),
            k("Ich hätte gern eine Pizza. Das ist ___.", "Konjunktiv II", ["Imperativ"], "Das Wort hätte drückt hier einen Wunsch aus.", "Welches Wort im Satz hat zwei Punkte auf einem Buchstaben?"),
            k("An deiner Stelle ___ ich mehr schlafen.", "würde", ["werde"], "Der Sprecher ist nicht an der Stelle des anderen. Es ist nur vorgestellt.", "Ist der Sprecher wirklich an der Stelle des anderen?"),
          ],
        },
      ),
    ),
    ch(
      "Konjunktiv I: Was jemand gesagt hat",
      b(
        "Etwas weitersagen",
        [L("Tom sagt: „Ich bin müde.“", "Tom sagt, er **sei** müde."), "Im zweiten Satz gibst du nur weiter, was Tom gesagt hat. Das nennt man **indirekte Rede**."],
        "Manchmal erzählst du, was jemand anders gesagt hat. Du benutzt dann nicht seine genauen Worte in Anführungszeichen, sondern gibst sie in eigenen Sätzen wieder. Dafür gibt es eine besondere Form des Verbs, den Konjunktiv I. Aus ich bin wird er sei.",
      ),
      b(
        "Die wichtigsten Formen",
        [L("sein: er **sei**", "haben: er **habe**", "gehen: er **gehe**", "kommen: er **komme**", "können: er **könne**")],
        "Die Form bildest du ganz einfach. Du nimmst den Infinitiv und lässt das n am Ende weg. Aus gehen wird er gehe, aus kommen wird er komme. Nur sein ist unregelmäßig und heißt er sei. Diese Formen stehen fast immer mit er, sie oder es.",
      ),
      b(
        "Wozu das gut ist",
        ["*Der Minister sagt, die Lage **sei** ernst.*", "Der Konjunktiv I zeigt: Das sage nicht ich. Das hat jemand anders gesagt."],
        "Mit dem Konjunktiv I hältst du Abstand. Du zeigst, dass du nur berichtest und nicht selbst behauptest, dass es stimmt. Deshalb findest du ihn in jeder Zeitung. Die Journalistin sagt nicht, dass die Lage ernst ist. Sie sagt nur, dass der Minister das gesagt hat.",
        { tasks: [k("Die Lehrerin sagt, der Test ___ leicht.", "sei", ["war gewesen"], "Hier wird weitergegeben, was die Lehrerin gesagt hat.", "Wessen Meinung ist das? Welche Form zeigt, dass du nur weitergibst?")] },
      ),
      b(
        "Wenn man keinen Unterschied hört",
        [L("*Sie sagen, sie **haben** Zeit.*", "Das klingt wie eine Tatsache."), L("*Sie sagen, sie **hätten** Zeit.*", "Jetzt hört man, dass es weitergegeben wird.")],
        "Bei wir und sie in der Mehrzahl sieht der Konjunktiv I genauso aus wie der Indikativ. Dann merkt niemand, dass du nur berichtest. In diesem Fall nimmst du den Konjunktiv II als Ersatz. Aus haben wird hätten, aus müssen wird müssten.",
        { tasks: [k("Die Kinder sagen, sie ___ keine Lust.", "hätten", ["haben"], "Bei sie in der Mehrzahl nimmt man den Konjunktiv II als Ersatz.", "Bei welcher Form hört man, dass etwas nur weitergegeben wird?")] },
      ),
      b(
        "Jetzt du: Welcher Modus?",
        "Tipp bei jedem Satz auf den richtigen Modus.",
        "Jetzt kommen alle vier Aussageweisen vor. Frag dich: Ist es eine Tatsache, eine Aufforderung, etwas nur Vorgestelltes oder etwas Weitergegebenes?",
        {
          tasks: [
            k("Sei bitte leise! Das ist ___.", "Imperativ", ["Konjunktiv I"], "Jemand wird aufgefordert, und das Verb steht ganz vorn.", "Wird hier etwas weitergegeben, oder wird jemand aufgefordert?"),
            k("Er sagt, er komme später. Das ist ___.", "Konjunktiv I", ["Indikativ"], "Es wird weitergegeben, was er gesagt hat. Die Form endet auf e.", "Wird hier berichtet, was jemand gesagt hat?"),
            k("Ich würde gern verreisen. Das ist ___.", "Konjunktiv II", ["Indikativ"], "Würde zeigt einen Wunsch, der nicht Wirklichkeit ist.", "Welches Wort zeigt, dass es nur ein Wunsch ist?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Indikativ**: So ist es. *Er geht.*", "**Imperativ**: Tu das! *Geh!*", "**Konjunktiv I**: Jemand hat es gesagt. *Er gehe.*", "**Konjunktiv II**: nur vorgestellt. *Er ginge, er würde gehen.*")],
        "Das sind die vier Aussageweisen mit je einem Beispiel. Achte auf die Erkennungszeichen: das Verb ganz vorn beim Imperativ, sei und habe beim Konjunktiv I, wäre, hätte und würde beim Konjunktiv II. Gleich kommen die Wörter und das Quiz.",
        { tasks: [k("Woran erkennst du den Konjunktiv II am leichtesten? ___", "an wäre, hätte und würde", ["am Ausrufezeichen"], "Diese drei Formen zeigen, dass etwas nur vorgestellt ist.", "Welche Wörter stehen in Sätzen über Wünsche und Vorstellungen?")] },
      ),
    ),
  ],
  [
    v("Modus", "Die Aussageweise des Verbs. Sie zeigt, wie ein Satz gemeint ist."),
    v("Indikativ", "Die Wirklichkeitsform. Sie sagt, was ist, war oder sein wird.", "Er geht zur Schule."),
    v("Imperativ", "Die Aufforderungsform. Das Verb steht vorn.", "Geh! Kommt! Nehmen Sie Platz!"),
    v("Konjunktiv II", "Zeigt, dass etwas nur vorgestellt, gewünscht oder höflich erbeten ist.", "wäre, hätte, könnte, würde gehen"),
    v("Konjunktiv I", "Zeigt, dass man weitergibt, was jemand anders gesagt hat.", "er sei, er habe, er gehe"),
    v("indirekte Rede", "Man gibt in eigenen Sätzen wieder, was jemand gesagt hat, ohne Anführungszeichen."),
  ],
  [
    q("In welchem Modus steht: Wir fahren morgen nach Hamburg?", "Indikativ", ["Imperativ", "Konjunktiv I", "Konjunktiv II"], "Der Satz teilt mit, was wirklich geschehen wird. Das ist die normale Form des Verbs."),
    q("In welchem Modus steht: Räum bitte dein Zimmer auf?", "Imperativ", ["Indikativ", "Konjunktiv I", "Konjunktiv II"], "Jemand wird zu etwas aufgefordert, und das Verb steht am Satzanfang."),
    q("In welchem Modus steht: Wenn ich Flügel hätte, würde ich fliegen?", "Konjunktiv II", ["Indikativ", "Imperativ", "Konjunktiv I"], "Hätte und würde zeigen, dass es nur vorgestellt ist. Der Sprecher hat keine Flügel."),
    q("In welchem Modus steht: Sie sagt, sie habe keine Zeit?", "Konjunktiv I", ["Indikativ", "Imperativ", "Konjunktiv II"], "Es wird weitergegeben, was sie gesagt hat. Die Form habe statt hat zeigt das an."),
    q("Wie heißt der Konjunktiv II von sein in der ersten Person?", "ich wäre", ["ich sei", "ich bin", "ich war"], "Aus war wird mit zwei Punkten wäre. Ich sei ist der Konjunktiv I."),
    q("Welcher Satz ist die höflichste Bitte?", "Könnten Sie mir bitte helfen?", ["Helfen Sie mir!", "Sie helfen mir.", "Sie müssen mir helfen."], "Der Konjunktiv II macht eine Bitte höflich, weil er dem anderen die Wahl lässt."),
    q("Wie bildest du den Konjunktiv I von kommen für er?", "er komme", ["er kommt", "er käme", "er kam"], "Du nimmst den Infinitiv und lässt das n weg. Er käme wäre der Konjunktiv II."),
    q("Wozu benutzt eine Zeitung den Konjunktiv I?", "Um zu zeigen, dass sie nur wiedergibt, was jemand gesagt hat", ["Um einen Befehl zu geben", "Um einen Wunsch zu äußern", "Um über die Zukunft zu schreiben"], "Mit dem Konjunktiv I hält man Abstand. Man berichtet, ohne selbst zu behaupten, dass es stimmt."),
  ],
);
