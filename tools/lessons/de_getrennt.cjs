// Guided lesson: writing words separately or together.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_02d_getrennt.json",
  {
    id: "P_DE_GETRENNT",
    subject: "DE",
    title: "Getrennt oder zusammen?",
    teaser: "Wann zwei Wörter zusammengeschrieben werden und wann nicht. Du lernst die Grundregel, die wichtigsten Verbindungen mit Verben und die Wörter, die besonders oft falsch geschrieben werden.",
    hook: "Rad fahren oder radfahren? Gar nicht oder garnicht? Bei dieser Frage sind sogar viele Erwachsene unsicher. Die gute Nachricht ist, dass es eine klare Grundregel gibt. Und für die häufigsten Fälle musst du dir nur ein paar Gruppen merken.",
    outro: "Du kennst jetzt die Grundregel: Wörter stehen getrennt, außer es entsteht ein neues Wort. Nomen und Verb sowie Verb und Verb schreibst du getrennt. Kleine Wörter wie auf, an und mit verbinden sich mit dem Verb. Und bei Paaren wie wiedersehen hilft dir die Betonung.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2", "P_DE_GROSS_KLEIN"],
  },
  [
    ch(
      "Zwei Wörter oder eins?",
      b(
        "Worum es geht",
        ["*Wir wollen heute **Fußball spielen**.*", "*Das **Fußballspiel** beginnt um drei.*", "Einmal zwei Wörter, einmal ein Wort."],
        "Schau dir die beiden Sätze an. Im ersten Satz stehen Fußball und spielen getrennt. Im zweiten Satz sind sie zu einem einzigen Wort zusammengewachsen. Warum das so ist, lässt sich mit wenigen Regeln erklären.",
      ),
      b(
        "Die Grundregel",
        ["Wörter schreibt man **getrennt**.", "Zusammen schreibt man nur, wenn ein **neues Wort** entsteht."],
        "Das ist der wichtigste Satz der Lektion. Jedes Wort steht erst einmal für sich. Nur wenn zwei Wörter so eng zusammengehören, dass sie eine neue, eigene Sache bezeichnen, schreibt man sie zusammen. Eine Autobahn ist etwas anderes als ein Auto und eine Bahn.",
      ),
      b(
        "Nomen und Nomen: zusammen",
        [L("Auto und Bahn: **Autobahn**", "Haus und Tür: **Haustür**", "Fuß und Ball: **Fußball**")],
        "Wenn zwei Nomen zusammen ein neues Ding benennen, schreibt man sie als ein Wort. Das ist im Deutschen sehr häufig und macht die Wörter manchmal lang. Im Englischen stehen solche Wörter oft getrennt. Lass dich davon nicht verwirren.",
        { tasks: [k("Bitte schließ die ___.", "Haustür", ["Haus Tür"], "Zwei Nomen benennen zusammen ein neues Ding.", "Benennen die beiden Wörter zusammen eine einzige Sache?")] },
      ),
      b(
        "Jetzt du: zusammengesetzte Nomen",
        "Tipp bei jedem Satz auf die richtige Schreibung.",
        "In jedem Satz geht es um zwei Nomen, die zusammen ein neues Ding benennen. Überleg, ob du auf dieses eine Ding zeigen kannst.",
        {
          tasks: [
            k("Wir treffen uns auf dem ___.", "Fußballplatz", ["Fußball Platz"], "Es ist ein einziger Ort. Die Nomen bilden zusammen ein neues Wort.", "Ist ein einziger Ort gemeint, auf den du zeigen kannst?"),
            k("Das ___ ist im zweiten Stock.", "Klassenzimmer", ["Klassen Zimmer"], "Es ist ein einziger Raum. Die Nomen bilden zusammen ein neues Wort.", "Ist ein einziger Raum gemeint, oder sind es zwei verschiedene Dinge?"),
          ],
        },
      ),
    ),
    ch(
      "Verbindungen mit Verben",
      b(
        "Nomen und Verb: getrennt",
        ["**Klavier spielen**, **Rad fahren**, **Fußball spielen**", "Das Nomen bleibt groß, das Verb bleibt klein."],
        "Wenn ein Nomen und ein Verb zusammen etwas beschreiben, bleiben sie zwei Wörter. Das Nomen sagt, womit oder was, und das Verb sagt, was man tut. Du schreibst das Nomen groß und das Verb klein, wie immer.",
        { tasks: [k("Meine Schwester kann ___.", "Klavier spielen", ["klavierspielen"], "Ein Nomen und ein Verb bleiben zwei Wörter.", "Welche beiden Wortarten stehen hier direkt nebeneinander?")] },
      ),
      b(
        "Verb und Verb: getrennt",
        ["**spazieren gehen**, **schwimmen gehen**, **einkaufen gehen**", "Zwei Verben bleiben zwei Wörter."],
        "Auch zwei Verben hintereinander schreibst du getrennt. Das kommt besonders oft mit gehen vor. Wir gehen schwimmen, wir wollen schwimmen gehen. Jedes Verb behält seinen eigenen Platz.",
        { tasks: [k("Am Wochenende wollen wir ___.", "schwimmen gehen", ["schwimmengehen"], "Zwei Verben hintereinander bleiben zwei Wörter.", "Welche Wortart sind die beiden Wörter?")] },
      ),
      b(
        "Adjektiv und Verb: meistens getrennt",
        ["**laut singen**, **schnell laufen**, **fertig lesen**", "Das Adjektiv sagt, wie etwas getan wird."],
        "Ein Adjektiv vor einem Verb beschreibt, wie jemand etwas tut. Wie singt sie? Laut. Beide Wörter behalten ihre eigene Bedeutung und bleiben getrennt. Es gibt Ausnahmen, aber für die Prüfung reicht diese Regel.",
      ),
      b(
        "Kleine Wörter vorn: zusammen",
        ["**auf**stehen, **an**machen, **hin**gehen, **weg**laufen, **mit**kommen", "Ein kurzes Wort vor dem Verb wächst mit ihm zusammen."],
        "Hier ist es umgekehrt. Kurze Wörter wie auf, an, aus, ein, mit, weg und hin verbinden sich mit dem Verb zu einem neuen Wort. Aufstehen ist etwas anderes als stehen. Diese Wörter erkennst du daran, dass sie allein kaum etwas bedeuten.",
        { tasks: [k("Ich muss morgen früh ___.", "aufstehen", ["auf stehen"], "Das kurze Wort wächst mit dem Verb zu einem neuen Wort zusammen.", "Bedeutet das Wort mit dem kurzen Wort davor etwas anderes als das Verb allein?")] },
      ),
      b(
        "Im Satz trennt sich das Verb wieder",
        [L("Ich **stehe** früh **auf**.", "Hier stehen die Teile getrennt."), L("Ich muss früh **aufstehen**.", "Hier stehen sie zusammen.")],
        "Das verwirrt manchmal. In einem einfachen Satz wandert das kurze Wort ans Ende, und das Verb steht an zweiter Stelle. Sobald beide wieder nebeneinanderstehen, schreibst du sie zusammen. Das passiert nach müssen, wollen, können und nach zu.",
      ),
      b(
        "Wenn ein Nomen daraus wird",
        [L("Wir wollen **Rad fahren**.", "Das sind zwei Wörter."), L("**Das Radfahren** macht Spaß.", "Das ist ein Nomen: zusammen und groß.")],
        "Du weißt schon, dass aus einem Verb ein Nomen werden kann, wenn ein Artikel davorsteht. Dann wächst die ganze Verbindung zu einem Wort zusammen. Aus Rad fahren wird das Radfahren. Aus spazieren gehen wird beim Spazierengehen.",
        { tasks: [k("Beim ___ habe ich Tom getroffen.", "Spazierengehen", ["spazieren gehen"], "In beim steckt ein Artikel. Die Verbindung wird zum Nomen und zu einem Wort.", "Welches Wort steht vor der Lücke? Steckt ein Artikel darin?")] },
      ),
      b(
        "Jetzt du: Verbindungen mit Verben",
        "Tipp bei jedem Satz auf die richtige Schreibung.",
        "Schau bei jedem Satz, welche Wortarten zusammenkommen. Nomen und Verb sowie Verb und Verb bleiben getrennt. Ein kurzes Wort vor dem Verb wächst mit ihm zusammen.",
        {
          tasks: [
            k("Kannst du bitte das Licht ___?", "anmachen", ["an machen"], "Das kurze Wort an wächst mit dem Verb zusammen.", "Steht vor dem Verb ein kurzes Wort wie auf, an oder mit?"),
            k("Wir wollen heute ___.", "Rad fahren", ["radfahren"], "Ein Nomen und ein Verb bleiben zwei Wörter.", "Welche beiden Wortarten stehen hier direkt nebeneinander?"),
            k("Nach der Schule müssen wir noch ___.", "einkaufen gehen", ["einkaufengehen"], "Zwei Verben hintereinander schreibt man getrennt.", "Welche Wortart sind die beiden Wörter am Ende?"),
          ],
        },
      ),
    ),
    ch(
      "Die Betonung und Wörter zum Merken",
      b(
        "Die Bedeutung ändert sich",
        [L("Wir werden uns **wiedersehen**.", "Das bedeutet: Wir treffen uns noch einmal."), L("Nach der Operation kann er **wieder sehen**.", "Das bedeutet: Er kann erneut sehen.")],
        "Manchmal gibt es beide Schreibungen, und sie bedeuten etwas Verschiedenes. Zusammen ist es ein eigenes Wort mit einer eigenen Bedeutung. Getrennt behält jedes Wort seine normale Bedeutung. Du musst also wissen, was gemeint ist.",
      ),
      b(
        "Hör auf die Betonung",
        [L("**WIE**dersehen: eine Betonung, ein Wort", "wieder **SE**hen: zwei Betonungen, zwei Wörter")],
        "Sprich beide laut aus. Beim Abschiedsgruß betonst du nur den Anfang. Beim Sehen nach der Operation betonst du beide Wörter. Das ist eine gute Faustregel: Hörst du nur eine Betonung, schreibst du zusammen. Hörst du zwei, schreibst du getrennt.",
        { tasks: [k("Tschüss und auf ___!", "Wiedersehen", ["Wieder sehen"], "Gemeint ist das erneute Treffen. Es ist ein Wort mit einer Betonung.", "Wie viele Betonungen hörst du, wenn du den Gruß sprichst?")] },
      ),
      b(
        "Häufige Wörter zum Merken",
        [L("**Getrennt**: gar nicht, auf einmal, ein bisschen, vor allem, noch einmal", "**Zusammen**: irgendwo, irgendwie, überhaupt, zusammen, vielleicht")],
        "Einige Wörter werden so oft falsch geschrieben, dass du sie am besten einfach lernst. Gar nicht wird gar nicht zusammengeschrieben. Mit diesem Satz merkst du dir das wichtigste davon. Alles, was mit irgend beginnt, schreibst du dagegen zusammen.",
        { tasks: [k("Das ist ___ schlimm.", "gar nicht", ["garnicht"], "Diese beiden Wörter schreibt man immer getrennt.", "Schau in die erste Zeile der Tafel.")] },
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Schreibung.",
        "Jetzt kommt alles aus dieser Lektion vor. Frag dich bei jedem Fall: Welche Wortarten kommen zusammen? Entsteht ein neues Wort? Und wie viele Betonungen höre ich?",
        {
          tasks: [
            k("Hast du ___ meinen Schlüssel gesehen?", "irgendwo", ["irgend wo"], "Alles, was mit irgend beginnt, schreibt man zusammen.", "Womit beginnt das Wort? Was gilt für diese Wörter?"),
            k("Plötzlich wurde es ___ dunkel.", "auf einmal", ["aufeinmal"], "Diese beiden Wörter schreibt man immer getrennt.", "Schau auf die Liste der Wörter zum Merken."),
            k("Der ___ kommt in zehn Minuten.", "Schulbus", ["Schul Bus"], "Zwei Nomen benennen zusammen ein neues Ding.", "Benennen die beiden Wörter zusammen eine einzige Sache?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Zusammen**: Nomen und Nomen, kurzes Wort und Verb", "**Getrennt**: Nomen und Verb, Verb und Verb, Adjektiv und Verb"), "Eine Betonung: ein Wort. Zwei Betonungen: zwei Wörter."],
        "Das sind die Regeln auf einen Blick. Wenn du unsicher bist, sprich die Wörter laut und hör auf die Betonung. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Ich komme ___ etwas später.", "vielleicht", ["viel leicht"], "Das Wort hat nur eine Betonung und ist ein eigenes Wort.", "Wie viele Betonungen hörst du, wenn du es sprichst?")] },
      ),
    ),
  ],
  [
    v("Grundregel", "Wörter schreibt man getrennt. Zusammen schreibt man nur, wenn ein neues Wort entsteht."),
    v("aufstehen, anmachen, mitkommen", "Ein kurzes Wort vor dem Verb wächst mit ihm zusammen."),
    v("Rad fahren, Klavier spielen", "Nomen und Verb bleiben zwei Wörter."),
    v("spazieren gehen, einkaufen gehen", "Zwei Verben hintereinander bleiben zwei Wörter."),
    v("gar nicht", "Wird immer getrennt geschrieben."),
    v("wiedersehen / wieder sehen", "Zusammen: sich erneut treffen. Getrennt: erneut sehen können."),
  ],
  [
    q("Welche Schreibung ist richtig?", "Ich kann Gitarre spielen.", ["Ich kann gitarrespielen.", "Ich kann Gitarrespielen.", "Ich kann gitarre spielen."], "Ein Nomen und ein Verb bleiben zwei Wörter. Das Nomen wird großgeschrieben."),
    q("Welche Schreibung ist richtig?", "Wir müssen jetzt losgehen.", ["Wir müssen jetzt los gehen.", "Wir müssen jetzt Los gehen.", "Wir müssen jetzt Losgehen."], "Das kurze Wort los wächst mit dem Verb zu einem neuen Wort zusammen."),
    q("Welche Schreibung ist richtig?", "Das ist gar nicht wahr.", ["Das ist garnicht wahr.", "Das ist Garnicht wahr.", "Das ist gar-nicht wahr."], "Gar nicht schreibt man immer in zwei Wörtern."),
    q("Welche Schreibung ist richtig?", "die Bushaltestelle", ["die Bus Haltestelle", "die Bus haltestelle", "die bushaltestelle"], "Die Nomen benennen zusammen einen einzigen Ort. Sie bilden ein Wort, und es wird großgeschrieben."),
    q("Welche Schreibung ist richtig?", "Wir wollen spazieren gehen.", ["Wir wollen spazierengehen.", "Wir wollen Spazieren gehen.", "Wir wollen spazieren Gehen."], "Zwei Verben hintereinander bleiben zwei Wörter und werden kleingeschrieben."),
    q("Beim ___ ist er gestürzt.", "Radfahren", ["Rad fahren", "rad fahren", "radfahren"], "In beim steckt ein Artikel. Die Verbindung wird zum Nomen: zusammen und groß."),
    q("Auf ___! Was ist gemeint und wie schreibt man es?", "Wiedersehen: sich erneut treffen", ["Wieder sehen: erneut sehen können", "wieder Sehen: ein Fehler", "wiedersehen: ein Verb"], "Der Gruß meint das erneute Treffen. Es ist ein Wort mit einer Betonung und wird hier als Nomen großgeschrieben."),
  ],
);
