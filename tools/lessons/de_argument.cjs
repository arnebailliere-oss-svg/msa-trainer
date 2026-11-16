// Guided lesson: recognising thesis, argument and example in a text; pro and contra.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_06b_argument.json",
  {
    id: "P_DE_ARGUMENT",
    subject: "DE",
    title: "Argumente erkennen",
    teaser: "Wie ein Text aufgebaut ist, der überzeugen will: These, Argument und Beispiel. Du lernst, die drei auseinanderzuhalten, Argumente der Pro- und der Kontra-Seite zuzuordnen und die Meinung des Autors zu finden.",
    hook: "Viele Texte in der Prüfung wollen dich von etwas überzeugen. Sie behaupten etwas, begründen es und zeigen es an einem Fall. In den Aufgaben sollst du diese Teile wiederfinden und ordnen. Das ist wie bei einem Haus: Wenn du weißt, wo das Fundament, die Wände und das Dach sind, verstehst du den ganzen Bau.",
    outro: "Du kannst jetzt die drei Bausteine eines überzeugenden Textes unterscheiden. Die These ist der Standpunkt. Das Argument sagt, warum er stimmen soll. Das Beispiel zeigt es an einem Fall. Du erkennst außerdem, auf welcher Seite ein Argument steht und wo der Autor seine eigene Meinung sagt.",
    requires: ["P_DE_LESEN"],
  },
  [
    ch(
      "Die drei Bausteine",
      b(
        "Jemand will dich überzeugen",
        ["*Schulkleidung ist eine gute Idee.*", "So beginnt ein Kommentar in einer Schülerzeitung.", "Stimmt das? Das weißt du noch nicht."],
        "Der Satz ist eine Behauptung. Jemand sagt, wie er eine Sache sieht. Ob du ihm glaubst, hängt davon ab, was danach kommt. Ein guter Text lässt eine Behauptung nicht allein stehen. Er begründet sie, und er zeigt sie an einem Fall.",
      ),
      b(
        "Die These",
        ["*Schulkleidung ist eine gute Idee.*", "Eine Behauptung, die man begründen muss, heißt **These**."],
        "Eine These ist ein Standpunkt. Sie ist noch kein Beweis. Man kann ihr zustimmen oder widersprechen. Du erkennst sie daran, dass sie eine Wertung enthält: gut, schlecht, sinnvoll, gefährlich, notwendig. Meistens steht sie am Anfang des Textes.",
      ),
      b(
        "Das Argument",
        ["*Schulkleidung ist eine gute Idee, **weil** niemand mehr mit teurer Kleidung angeben muss.*", "Ein Satz, der sagt, **warum** die These stimmt, heißt **Argument**."],
        "Das Argument liefert den Grund. Es antwortet auf die Frage warum. Du erkennst es oft an kleinen Wörtern wie weil, denn, da und deshalb. Wenn du in einem Text nach Argumenten suchst, such nach diesen Wörtern und nach der Antwort auf warum.",
        { tasks: [k("Welcher Satz ist ein Argument für Schulkleidung? ___", "Familien sparen Geld, denn teure Markenkleidung wird unnötig.", ["Schulkleidung ist eine tolle Sache."], "Der Satz nennt einen Grund. Der andere wiederholt nur die Behauptung.", "Welcher der beiden Sätze antwortet auf die Frage warum?")] },
      ),
      b(
        "Das Beispiel",
        ["*An einer Hamburger Schule fühlten sich danach weniger Kinder ausgegrenzt.*", "Ein **Beispiel** zeigt das Argument an einem bestimmten Fall."],
        "Das Beispiel macht ein Argument anschaulich. Es nennt einen Ort, eine Person, eine Zahl oder eine Untersuchung. Du kannst es dir vorstellen. Typische Signale sind zum Beispiel, etwa, so zeigt eine Studie. Ein Beispiel beweist das Argument, aber es ist nicht das Argument selbst.",
      ),
      b(
        "Die Kette",
        [L("**These**: Schulkleidung ist gut.", "**Argument**: Der Druck durch Markenkleidung fällt weg.", "**Beispiel**: In Hamburg fühlten sich weniger Kinder ausgegrenzt.")],
        "Die drei gehören zusammen wie Glieder einer Kette. Zuerst kommt der Standpunkt. Darauf folgt die Frage warum, und das Argument antwortet. Darauf folgt die Bitte zeig es mir, und das Beispiel antwortet. Merk dir diese Reihenfolge.",
        { tasks: [k("Eine Zahl aus einer Umfrage ist in einem Text meistens ___.", "ein Beispiel", ["eine These"], "Eine Zahl zeigt etwas an einem bestimmten Fall. Sie ist kein Standpunkt.", "Ist eine Zahl ein Standpunkt, oder zeigt sie etwas an einem Fall?")] },
      ),
      b(
        "Jetzt du: These, Argument oder Beispiel?",
        "Das Thema ist: Handys in der Schule. Tipp bei jedem Satz auf den richtigen Baustein.",
        "Frag dich bei jedem Satz: Ist es ein Standpunkt mit einer Wertung? Nennt er einen Grund? Oder zeigt er etwas an einem bestimmten Fall?",
        {
          tasks: [
            k("Handys sollten im Unterricht verboten sein. Das ist ___.", "eine These", ["ein Beispiel"], "Der Satz ist ein Standpunkt, dem man zustimmen oder widersprechen kann.", "Enthält der Satz eine Forderung oder Wertung?"),
            k("Denn sie lenken vom Lernen ab. Das ist ___.", "ein Argument", ["eine These"], "Der Satz nennt den Grund und beginnt mit denn.", "Mit welchem Wort beginnt der Satz? Worauf antwortet er?"),
            k("An einer Schule in Bremen stiegen die Noten nach dem Verbot. Das ist ___.", "ein Beispiel", ["ein Argument"], "Der Satz nennt einen bestimmten Ort und ein bestimmtes Ergebnis.", "Nennt der Satz einen bestimmten Ort oder Fall?"),
          ],
        },
      ),
    ),
    ch(
      "Dafür und dagegen",
      b(
        "Zwei Seiten: Pro und Kontra",
        [L("**Pro**: Argumente, die für die These sprechen.", "**Kontra**: Argumente, die gegen die These sprechen.")],
        "Die meisten Texte in der Prüfung zeigen beide Seiten eines Themas. Pro bedeutet dafür, Kontra bedeutet dagegen. Eine häufige Aufgabe lautet: Ordnen Sie die Argumente der richtigen Seite zu. Dafür musst du bei jedem Argument erkennen, in welche Richtung es zeigt.",
      ),
      b(
        "Wörter, die die Gegenseite ankündigen",
        ["*allerdings, jedoch, andererseits, dagegen spricht, Kritiker meinen*", "Nach diesen Wörtern wechselt der Text die Seite."],
        "Ein Text springt nicht ohne Vorwarnung von Pro zu Kontra. Er kündigt den Wechsel an. Wenn du eines dieser Wörter liest, weißt du: Jetzt kommt die andere Seite. Unterstreiche diese Stellen. Sie teilen den Text in seine beiden Hälften.",
        { tasks: [k("Allerdings kostet Schulkleidung die Eltern Geld. Das ist ein Argument ___ Schulkleidung.", "gegen", ["für"], "Das Wort allerdings kündigt die Gegenseite an, und Kosten sind ein Nachteil.", "Welches Wort steht am Satzanfang? Ist Geld ausgeben ein Vorteil oder ein Nachteil?")] },
      ),
      b(
        "So ordnest du ein Argument zu",
        ["Frag dich: Würde das jemand sagen, der **dafür** ist?", "Oder würde das jemand sagen, der **dagegen** ist?"],
        "Stell dir zwei Menschen vor, die über das Thema streiten. Der eine ist dafür, die andere ist dagegen. Lies das Argument und überleg, wem von beiden du es in den Mund legen würdest. So findest du die richtige Seite, auch wenn keines der ankündigenden Wörter dasteht.",
      ),
      b(
        "Die Meinung des Autors",
        ["*Ich finde …, Meiner Meinung nach …, Deshalb sollte …*", "Sie steht meistens am **Ende** des Textes."],
        "Ein Autor zeigt oft erst beide Seiten und sagt zum Schluss, was er selbst denkt. Du erkennst seine Meinung an Wörtern wie ich finde oder meiner Meinung nach. Pass auf: Nicht jedes Argument im Text ist die Meinung des Autors. Manchmal gibt er nur wieder, was andere sagen.",
        { tasks: [k("Kritiker sagen, Schulkleidung sei teuer. Ist das die Meinung des Autors? ___", "Nein, er gibt nur wieder, was andere sagen.", ["Ja, denn es steht im Text."], "Der Autor berichtet, was Kritiker sagen. Seine eigene Meinung ist das nicht unbedingt.", "Wer sagt das laut dem Satz: der Autor selbst oder jemand anders?")] },
      ),
      b(
        "Jetzt du: Pro oder Kontra?",
        "Die These lautet: Die Schule sollte später beginnen. Tipp bei jedem Argument auf die richtige Seite.",
        "Stell dir bei jedem Satz die beiden Menschen vor, die streiten. Wem würdest du den Satz in den Mund legen?",
        {
          tasks: [
            k("Jugendliche sind morgens noch nicht richtig wach. Das ist ___.", "Pro", ["Kontra"], "Wer morgens müde ist, lernt schlecht. Das spricht für einen späteren Beginn.", "Würde das jemand sagen, der für den späteren Beginn ist?"),
            k("Dann endet der Unterricht erst am späten Nachmittag. Das ist ___.", "Kontra", ["Pro"], "Ein später Schulschluss ist ein Nachteil. Das spricht dagegen.", "Ist ein späterer Schulschluss ein Vorteil oder ein Nachteil?"),
            k("Ausgeschlafene Schüler haben bessere Noten. Das ist ___.", "Pro", ["Kontra"], "Bessere Noten sind ein Vorteil des späteren Beginns.", "Sind bessere Noten ein Vorteil oder ein Nachteil?"),
          ],
        },
      ),
    ),
    ch(
      "Vollständige und unvollständige Argumente",
      b(
        "Eine Behauptung ist noch kein Argument",
        ["*Handys stören einfach.*", "Hier fehlt der Grund, und es fehlt ein Fall.", "Das ist nur eine **Behauptung**."],
        "Viele Sätze klingen wie ein Argument, sind aber keins. Wenn jemand nur sagt, dass etwas stört, hat er noch nichts begründet. Du erkennst das mit der Frage warum. Wenn der Satz darauf keine Antwort gibt, ist er nur eine Behauptung.",
      ),
      b(
        "Ein vollständiges Argument",
        ["*Handys stören den Unterricht, **weil** jede Nachricht die Aufmerksamkeit unterbricht. **So** brauchen Schüler nach einer Nachricht mehrere Minuten, um sich wieder zu konzentrieren.*"],
        "Hier ist alles da. Zuerst kommt die Behauptung. Nach weil folgt der Grund. Und nach so folgt ein Fall, der den Grund anschaulich macht. In der Prüfung wirst du manchmal gefragt, welcher Teil in einem Argument fehlt. Dann gehst du die drei Teile durch.",
        { tasks: [k("Hausaufgaben sind sinnlos. Mehr steht nicht da. Das ist ___.", "nur eine Behauptung", ["ein vollständiges Argument"], "Es fehlt der Grund, und es fehlt ein Beispiel.", "Antwortet der Satz auf die Frage warum?")] },
      ),
      b(
        "Jetzt du: Was fehlt?",
        "Tipp bei jeder Aufgabe auf die richtige Lösung.",
        "Geh bei jedem kleinen Text die drei Teile durch: Behauptung, Grund und Beispiel. Welcher ist da, und welcher fehlt?",
        {
          tasks: [
            k("Sport ist wichtig, weil er gesund hält. Hier fehlt noch ___.", "ein Beispiel", ["der Grund"], "Die Behauptung und der Grund sind da. Ein bestimmter Fall fehlt.", "Welcher der drei Teile kommt nach weil? Was fehlt danach noch?"),
            k("Viele Kinder essen morgens nichts. In einer Umfrage waren es vier von zehn. Der zweite Satz ist ___.", "ein Beispiel", ["eine These"], "Der Satz nennt eine Zahl aus einer Umfrage.", "Nennt der zweite Satz eine Zahl oder einen Standpunkt?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**These**: der Standpunkt", "**Argument**: der Grund. Signale: weil, denn, da", "**Beispiel**: ein bestimmter Fall, eine Zahl, eine Studie"), "Wechsel zur Gegenseite: allerdings, jedoch, andererseits"],
        "Das sind die Bausteine und ihre Erkennungszeichen. Wenn du einen Text liest, der überzeugen will, such zuerst die These. Frag dann warum und danach zeig es mir. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Welches Wort kündigt die Gegenseite an? ___", "allerdings", ["denn"], "Nach diesem Wort wechselt ein Text meistens von Pro zu Kontra.", "Welches der beiden Wörter nennt einen Grund, und welches leitet einen Einwand ein?")] },
      ),
    ),
  ],
  [
    v("These", "Ein Standpunkt, den man begründen muss.", "Schulkleidung ist eine gute Idee."),
    v("Argument", "Der Grund, warum eine These stimmen soll. Oft mit weil, denn oder da.", "… weil niemand mehr mit teurer Kleidung angeben muss."),
    v("Beispiel", "Ein bestimmter Fall, der ein Argument anschaulich macht: ein Ort, eine Zahl, eine Studie."),
    v("Pro und Kontra", "Dafür und dagegen."),
    v("allerdings, jedoch, andererseits", "Wörter, die den Wechsel zur Gegenseite ankündigen."),
    v("Behauptung", "Ein Satz ohne Grund und ohne Beispiel."),
  ],
  [
    q("Was ist eine These?", "ein Standpunkt, den man begründen muss", ["eine Zahl aus einer Umfrage", "ein Zitat", "eine Überschrift"], "Eine These ist eine Behauptung mit einer Wertung. Sie braucht Argumente, damit man ihr glaubt."),
    q("Welcher Satz ist ein Argument?", "Lesen ist wichtig, weil es den Wortschatz erweitert.", ["Lesen ist wichtig.", "In unserer Klasse lesen 12 Kinder täglich.", "Ich lese gern."], "Der Satz nennt einen Grund und antwortet auf die Frage warum."),
    q("Welcher Satz ist ein Beispiel?", "In einer Studie lasen Kinder mit Bücherregal zu Hause doppelt so viel.", ["Lesen bildet.", "Bücher sind besser als Filme.", "Man sollte mehr lesen."], "Der Satz nennt eine Untersuchung und ein bestimmtes Ergebnis. Das ist ein Fall, der etwas zeigt."),
    q("Jedoch fehlt vielen Familien das Geld für Bücher. Auf welcher Seite steht das, wenn die These lautet: Alle Kinder sollten viel lesen?", "Kontra", ["Pro", "auf keiner Seite", "auf beiden Seiten"], "Jedoch kündigt einen Einwand an, und fehlendes Geld ist ein Hindernis."),
    q("Woran erkennst du die Meinung des Autors?", "an Wendungen wie ich finde oder meiner Meinung nach", ["an den Zeilennummern", "an Zahlen", "an Anführungszeichen"], "Der Autor zeigt seine Meinung mit solchen Wendungen, meistens am Ende des Textes."),
    q("Welches Wort leitet meistens ein Argument ein?", "weil", ["allerdings", "zum Beispiel", "jedoch"], "Weil nennt einen Grund. Allerdings und jedoch kündigen die Gegenseite an."),
    q("Schule ist langweilig. Was ist das?", "nur eine Behauptung", ["ein vollständiges Argument", "ein Beispiel", "ein Beleg"], "Der Satz nennt keinen Grund und keinen Fall. Er antwortet nicht auf die Frage warum."),
  ],
);
