// Guided lesson: rephrasing words and sentences (synonyms, loan words, idioms, restriction, assumption, comparison).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_08a_umformulieren.json",
  {
    id: "P_DE_UMFORMULIEREN",
    subject: "DE",
    title: "Wörter und Sätze umformulieren",
    teaser: "Dasselbe mit anderen Worten sagen: ein Wort durch ein gleichbedeutendes ersetzen, ein Fremdwort auf Deutsch ausdrücken, eine Redewendung auflösen und einen Satz gezielt verändern, zum Beispiel aus einer Vermutung eine Tatsache machen.",
    hook: "In der Prüfung gibt es eine Reihe kleiner Aufgaben, die alle dasselbe verlangen: Sag es anders. Mal sollst du ein Wort ersetzen, mal eine Redewendung erklären, mal einen Satz ein kleines Stück verändern. Das wirkt wie ein bunter Haufen. Dahinter steckt aber immer dieselbe Frage: Was ist hier eigentlich gemeint?",
    outro: "Du kannst jetzt auf mehrere Arten umformulieren. Für ein Wort findest du ein gleichbedeutendes, das in den Satz passt. Eine Redewendung löst du auf, indem du sagst, was gemeint ist. Und einen Satz veränderst du gezielt, indem du genau das eine Wort streichst oder ersetzt, das die Einschränkung oder die Vermutung trägt.",
    requires: ["P_DE_WORTARTEN"],
  },
  [
    ch(
      "Ein Wort ersetzen",
      b(
        "Wörter mit gleicher Bedeutung",
        [L("beginnen und anfangen", "schnell und rasch", "Fehler und Irrtum"), "Ein Wort mit gleicher oder fast gleicher Bedeutung heißt **Synonym**."],
        "Für die meisten Wörter gibt es ein zweites, das dasselbe bedeutet. Solche Wortpaare nennt man Synonyme. In der Prüfung sollst du für ein unterstrichenes Wort ein Synonym finden. Das ist leichter, als es klingt, wenn du den ganzen Satz im Blick behältst.",
      ),
      b(
        "Der Satz entscheidet",
        [L("*Er bewahrt einen **kühlen** Kopf.*", "Gemeint ist: einen ruhigen Kopf."), L("*Bei der **kühlen** Witterung kann er nicht bauen.*", "Gemeint ist: bei der kalten Witterung.")],
        "Dasselbe Wort kann in zwei Sätzen etwas Verschiedenes bedeuten. Ein kühler Kopf ist kein kalter Kopf, sondern ein ruhiger. Lies deshalb immer den ganzen Satz, bevor du ein Ersatzwort wählst. Es muss zu dem passen, was der Satz sagen will.",
        { tasks: [k("Das war ein scharfer Ton. Ein passendes Synonym für scharf ist hier ___.", "unfreundlich", ["spitz geschliffen"], "Ein Ton kann nicht geschliffen sein. Gemeint ist die Art, wie jemand spricht.", "Geht es um ein Messer oder um die Art, wie jemand spricht?")] },
      ),
      b(
        "Die Probe: einsetzen",
        ["Setz dein Wort in den Satz ein.", "Klingt der Satz richtig, und bedeutet er noch dasselbe?"],
        "So prüfst du jedes Ersatzwort. Du liest den Satz mit dem neuen Wort leise vor. Wenn er sich richtig anhört und dieselbe Aussage hat, ist dein Wort gut. Wenn er seltsam klingt oder etwas anderes bedeutet, suchst du weiter.",
      ),
      b(
        "Fremdwörter auf Deutsch sagen",
        [L("Konsum: Verbrauch", "Projekt: Vorhaben", "Kooperation: Zusammenarbeit", "Resonanz: Rückmeldung")],
        "Ein Fremdwort ist ein Wort, das aus einer anderen Sprache ins Deutsche gekommen ist. Für die meisten gibt es ein deutsches Wort mit derselben Bedeutung. In der Prüfung ordnest du beide einander zu. Viele Fremdwörter kennst du aus dem Alltag, ohne darüber nachzudenken.",
        { tasks: [k("Kooperation bedeutet auf Deutsch ___.", "Zusammenarbeit", ["Aufstand"], "Wer kooperiert, arbeitet mit anderen zusammen.", "Was tun zwei Firmen, wenn sie kooperieren?")] },
      ),
      b(
        "Jetzt du: das passende Wort",
        "Tipp bei jedem Satz auf das Wort, das dasselbe bedeutet.",
        "Lies jeden Satz ganz. Setz dann beide Möglichkeiten nacheinander ein und hör, welche dieselbe Aussage ergibt.",
        {
          tasks: [
            k("Das Smartphone übertrifft alles. Dasselbe bedeutet: Es ___ alles.", "schlägt", ["stoppt"], "Wer etwas übertrifft, ist besser als das andere.", "Welches der beiden Wörter bedeutet besser sein als?"),
            k("Sie betrachtet ihn verstohlen. Dasselbe bedeutet: Sie betrachtet ihn ___.", "heimlich", ["bewundernd"], "Verstohlen bedeutet, dass niemand es bemerken soll.", "Soll der andere merken, dass er betrachtet wird?"),
            k("Flexibilität bedeutet auf Deutsch ___.", "Beweglichkeit", ["Verbrauch"], "Wer flexibel ist, kann sich leicht umstellen und bewegen.", "Was kann ein flexibler Mensch besonders gut?"),
          ],
        },
      ),
    ),
    ch(
      "Redewendungen auflösen",
      b(
        "Was eine Redewendung ist",
        ["*die Hand ins Feuer legen*", "Niemand legt wirklich seine Hand ins Feuer.", "Ein festes Sprachbild, das alle kennen, heißt **Redewendung**."],
        "Redewendungen sind feste Bilder, die man als Ganzes lernt. Man kann sie nicht Wort für Wort verstehen. Wer sagt, er lege für jemanden die Hand ins Feuer, meint: Ich bin mir ganz sicher, dass er ehrlich ist. Er garantiert für ihn.",
      ),
      b(
        "Die Frage: Was ist gemeint?",
        [L("*Er hat einen Vogel.*", "Gemeint ist: Er ist verrückt."), L("*Sie hat alle Hände voll zu tun.*", "Gemeint ist: Sie hat sehr viel Arbeit.")],
        "In der Prüfung sollst du einen Satz so umschreiben, dass er keine Redewendung mehr enthält. Dafür stellst du dir eine einzige Frage: Was ist eigentlich gemeint? Die Antwort schreibst du in einfachen, sachlichen Worten hin. Das Bild verschwindet, der Sinn bleibt.",
        { tasks: [k("Er lässt den Kopf hängen. Ohne Redewendung: Er ist ___.", "mutlos", ["sehr groß"], "Wer den Kopf hängen lässt, hat die Hoffnung verloren.", "Wie fühlt sich jemand, der mit gesenktem Kopf dasitzt?")] },
      ),
      b(
        "Nicht am Bild kleben bleiben",
        ["*Ein Handwerker kann seine Hand dafür nicht ins Feuer legen.*", "Falsch: *Ein Handwerker verbrennt sich nicht die Hand.*", "Richtig: *Ein Handwerker kann dafür nicht garantieren.*"],
        "Die falschen Antworten in der Prüfung nehmen das Bild wörtlich. Sie sprechen von Feuer und von Händen. Lass dich davon nicht verleiten. In der richtigen Antwort kommt das Bild überhaupt nicht mehr vor. Dort steht nur noch, was gemeint ist.",
      ),
      b(
        "Jetzt du: Was ist gemeint?",
        "Tipp bei jeder Redewendung auf ihre Bedeutung.",
        "Stell dir bei jeder Redewendung die Frage: Was will die Person damit sagen? Die richtige Antwort enthält das Bild nicht mehr.",
        {
          tasks: [
            k("Das ist nicht mein Bier. Gemeint ist: ___", "Das geht mich nichts an.", ["Ich trinke kein Bier."], "Die Redewendung hat mit einem Getränk nichts zu tun.", "In welcher Antwort kommt das Bild nicht mehr vor?"),
            k("Sie fällt mit der Tür ins Haus. Gemeint ist: ___", "Sie kommt ohne Umschweife zur Sache.", ["Sie stolpert an der Haustür."], "Gemeint ist, dass jemand sofort sagt, was er will.", "Geht es wirklich um eine Tür, oder um die Art, wie jemand spricht?"),
            k("Er steht auf dem Schlauch. Gemeint ist: ___", "Er versteht gerade nichts.", ["Er steht im Garten."], "Wie bei einem geknickten Schlauch fließt nichts: Er begreift es nicht.", "In welcher Antwort kommt der Schlauch nicht mehr vor?"),
          ],
        },
      ),
    ),
    ch(
      "Einen Satz gezielt verändern",
      b(
        "Eine Einschränkung streichen",
        ["*Eigentlich habe ich immer gute Rückmeldungen bekommen.*", "Ohne Einschränkung: *Ich habe immer gute Rückmeldungen bekommen.*", "Das Wort **eigentlich** schränkt ein."],
        "Manche kleinen Wörter machen eine Aussage vorsichtiger: eigentlich, fast, meistens, ziemlich, im Grunde. Sie schränken ein. Wenn die Aufgabe einen Satz ohne Einschränkung verlangt, streichst du genau dieses eine Wort. Den Rest des Satzes lässt du unverändert.",
      ),
      b(
        "Aus einer Vermutung eine Tatsache machen",
        ["Vermutung: *Sie **scheinen** Filmfans **zu sein**.*", "Tatsache: *Sie **sind** Filmfans.*"],
        "Eine Vermutung ist etwas, das man nur annimmt. Du erkennst sie an Wörtern wie scheinen, vielleicht, wohl, vermutlich und könnte. Eine Tatsache steht einfach fest. Um aus der Vermutung eine Tatsache zu machen, entfernst du das Wort der Unsicherheit und setzt das Verb in die normale Form.",
        { tasks: [k("Er ist vermutlich krank. Als Tatsache: ___", "Er ist krank.", ["Er könnte krank sein."], "Das Wort der Unsicherheit ist gestrichen. Der Satz stellt jetzt fest.", "In welchem der beiden Sätze steckt noch eine Unsicherheit?")] },
      ),
      b(
        "Aus gleich wird ungleich",
        ["Gleichheit: *Er ist **so** groß **wie** ich.*", "Ungleichheit: *Er ist größ**er als** ich.*"],
        "Wenn zwei Dinge gleich sind, sagst du so und wie. Wenn sie ungleich sind, steigerst du das Adjektiv und sagst als. Aus so groß wie wird größer als. Pass auf das letzte Wort auf: Nach der Steigerung steht immer als und nie wie.",
        { tasks: [k("Sie ist so schnell wie ihr Bruder. Als Ungleichheit: Sie ist schneller ___ ihr Bruder.", "als", ["wie"], "Nach einer gesteigerten Form steht dieses Wort.", "Welches Wort stand auf der Tafel nach größer?")] },
      ),
      b(
        "Nur das Nötige ändern",
        ["Ändere **genau das**, was die Aufgabe verlangt.", "Alles andere bleibt, wie es ist."],
        "Bei diesen Aufgaben ist weniger mehr. Wenn du eine Einschränkung streichen sollst, streichst du ein Wort. Du schreibst keinen neuen Satz. Jede zusätzliche Änderung ist eine Gelegenheit für einen Fehler. Halte am Ende deinen Satz neben den ursprünglichen.",
      ),
      b(
        "Jetzt du: gezielt verändern",
        "Tipp bei jeder Aufgabe auf den richtig veränderten Satz.",
        "Such in jedem Satz zuerst das eine Wort, das die Einschränkung oder die Vermutung trägt. Genau dieses Wort muss verschwinden oder ersetzt werden.",
        {
          tasks: [
            k("Das Spiel war fast ausverkauft. Ohne Einschränkung: ___", "Das Spiel war ausverkauft.", ["Das Spiel war beinahe ausverkauft."], "Das Wort fast schränkt ein. Es wird gestrichen.", "In welchem der beiden Sätze steckt noch eine Einschränkung?"),
            k("Vielleicht kommt sie morgen. Als Tatsache: ___", "Sie kommt morgen.", ["Sie könnte morgen kommen."], "Das Wort vielleicht drückt Unsicherheit aus. Ohne es steht die Sache fest.", "In welchem der beiden Sätze ist die Sache sicher?"),
            k("Mein Rad ist so alt wie deins. Als Ungleichheit: ___", "Mein Rad ist älter als deins.", ["Mein Rad ist älter wie deins."], "Das Adjektiv wird gesteigert, und danach steht als.", "Welches Wort folgt auf eine gesteigerte Form: als oder wie?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Ein **Synonym** muss in den Satz passen.", "(2) Bei einer **Redewendung** fragst du: Was ist gemeint?", "(3) Du änderst nur das eine Wort, das die Aufgabe verlangt."],
        "Das sind die drei Dinge, die du für alle Aufgaben zum Umformulieren brauchst. Die wichtigste Frage bleibt immer dieselbe: Was ist hier eigentlich gemeint? Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Im Grunde war der Test leicht. Welches Wort schränkt ein? ___", "Im Grunde", ["leicht"], "Ohne diese beiden Wörter gilt die Aussage ohne Vorbehalt.", "Welche Wörter kannst du streichen, damit der Satz ohne Vorbehalt gilt?")] },
      ),
    ),
  ],
  [
    v("Synonym", "Ein Wort mit gleicher oder fast gleicher Bedeutung.", "beginnen und anfangen"),
    v("Fremdwort", "Ein Wort aus einer anderen Sprache, für das es meist ein deutsches gibt.", "Kooperation: Zusammenarbeit"),
    v("Redewendung", "Ein festes Sprachbild, das man nicht wörtlich verstehen darf.", "die Hand ins Feuer legen: garantieren"),
    v("Einschränkung", "Ein Wort, das eine Aussage vorsichtiger macht.", "eigentlich, fast, meistens"),
    v("Vermutung", "Etwas, das man nur annimmt. Erkennbar an scheinen, vielleicht, wohl, könnte."),
  ],
  [
    q("Was ist ein Synonym?", "ein Wort mit gleicher oder fast gleicher Bedeutung", ["ein Wort mit gegenteiliger Bedeutung", "ein Fremdwort", "ein sehr langes Wort"], "Synonyme bedeuten dasselbe, zum Beispiel beginnen und anfangen."),
    q("Sie hat ein gutes Händchen für Pflanzen. Was ist gemeint?", "Sie kann gut mit Pflanzen umgehen.", ["Sie hat kleine Hände.", "Sie trägt Handschuhe.", "Sie verkauft Pflanzen."], "Die Redewendung bedeutet, dass jemand für etwas Geschick hat. Mit der Größe der Hand hat sie nichts zu tun."),
    q("Projekt bedeutet auf Deutsch", "Vorhaben", ["Verbrauch", "Aufstand", "Nachwort"], "Ein Projekt ist etwas, das man sich vornimmt und plant."),
    q("Ich habe eigentlich keine Zeit. Wie lautet der Satz ohne Einschränkung?", "Ich habe keine Zeit.", ["Ich habe fast keine Zeit.", "Ich habe eigentlich nie Zeit.", "Ich hätte keine Zeit."], "Das Wort eigentlich schränkt ein. Es wird gestrichen, und der Rest bleibt gleich."),
    q("Das scheint ein Fehler zu sein. Wie lautet der Satz als Tatsache?", "Das ist ein Fehler.", ["Das könnte ein Fehler sein.", "Das ist vielleicht ein Fehler.", "Das wäre ein Fehler."], "Scheint drückt eine Vermutung aus. Als Tatsache steht das Verb in der normalen Form."),
    q("Sie ist so alt wie ich. Wie drückst du Ungleichheit aus?", "Sie ist älter als ich.", ["Sie ist älter wie ich.", "Sie ist so alt als ich.", "Sie ist genauso alt wie ich."], "Das Adjektiv wird gesteigert, und nach der Steigerung steht als."),
    q("Wie prüfst du, ob ein Ersatzwort passt?", "Ich setze es in den Satz ein und lese ihn.", ["Ich zähle seine Buchstaben.", "Ich schaue, ob es großgeschrieben wird.", "Ich nehme das längste Wort."], "Der Satz muss mit dem neuen Wort richtig klingen und dasselbe bedeuten."),
  ],
);
