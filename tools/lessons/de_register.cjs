// Guided lesson: standard language and colloquial language.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_04c_register.json",
  {
    id: "P_DE_REGISTER",
    subject: "DE",
    title: "Standardsprache und Umgangssprache",
    teaser: "Warum du mit deinen Freunden anders sprichst als in einer Bewerbung, woran du Umgangssprache erkennst und wie du einen lockeren Satz in drei Handgriffen in Standardsprache umformst.",
    hook: "Du sprichst mehrere Arten von Deutsch, ohne es zu merken. Auf dem Schulhof redest du anders als im Gespräch mit der Schulleiterin, und einer Freundin schreibst du anders als einer Firma. Das ist kein Fehler, das können alle Menschen. In der Prüfung sollst du zeigen, dass du bewusst von der einen Art in die andere wechseln kannst.",
    outro: "Du kannst jetzt Umgangssprache erkennen: an Füllwörtern, an verkürzten Formen und an lockeren Wörtern. Und du kannst sie in Standardsprache umformen, indem du Füllwörter streichst, lockere Wörter ersetzt und verkürzte Formen ausschreibst. Dabei bleibt der Inhalt immer derselbe.",
  },
  [
    ch(
      "Zwei Arten zu sprechen",
      b(
        "Derselbe Gedanke, zweimal gesagt",
        ["„Ey, das Konzert war voll krass!“", "„Das Konzert war sehr beeindruckend.“", "Beide Sätze sagen dasselbe."],
        "Stell dir vor, du erzählst von einem Konzert. Deiner besten Freundin sagst du den ersten Satz. In einem Aufsatz schreibst du den zweiten. Der Inhalt ist gleich: Das Konzert hat dir gut gefallen. Verschieden ist nur die Art, wie du es ausdrückst.",
      ),
      b(
        "Die Umgangssprache",
        ["So sprichst du mit Freunden und in der Familie.", "Sie ist locker, schnell und persönlich.", "Diese Art zu sprechen heißt **Umgangssprache**."],
        "Umgangssprache ist die Sprache des Alltags. Du benutzt sie, wenn du mit Menschen sprichst, die du gut kennst. Sie hat kurze Sätze, lockere Wörter und viele kleine Füllwörter. In Chats und Sprachnachrichten ist sie ganz normal.",
      ),
      b(
        "Die Standardsprache",
        ["So schreibst du in der Schule, in einer Bewerbung und in der Prüfung.", "Sie hat vollständige Sätze und sachliche Wörter.", "Diese Art heißt **Standardsprache**."],
        "Standardsprache ist die Sprache, die überall in Deutschland verstanden wird. Man nennt sie auch Hochdeutsch. Zeitungen sind in ihr geschrieben, und Nachrichten werden in ihr gesprochen. Sie wirkt sachlich und zeigt Respekt gegenüber dem Leser.",
        { tasks: [k("Eine Bewerbung schreibst du in ___.", "Standardsprache", ["Umgangssprache"], "Eine Firma kennst du nicht persönlich. Dort schreibt man sachlich und vollständig.", "Kennst du die Menschen in der Firma persönlich?")] },
      ),
      b(
        "Keine von beiden ist falsch",
        ["Jede Sprache hat ihren Ort.", "Falsch ist nur die falsche Sprache am falschen Ort."],
        "Es wäre seltsam, mit deinen Freunden wie ein Nachrichtensprecher zu reden. Genauso seltsam ist es, eine Bewerbung im Ton eines Chats zu schreiben. Es geht also nicht um gutes oder schlechtes Deutsch. Es geht darum, die passende Sprache für die Situation zu wählen.",
      ),
      b(
        "Jetzt du: Welche Sprache passt?",
        "Tipp bei jeder Situation auf die passende Sprache.",
        "Überleg bei jeder Situation, wer deinen Text liest oder hört. Kennst du die Person gut, oder ist es eine offizielle Lage?",
        {
          tasks: [
            k("Du schreibst deinem besten Freund eine Nachricht. Es passt: ___", "Umgangssprache", ["Standardsprache"], "Mit guten Freunden spricht und schreibt man locker.", "Wie gut kennst du die Person, der du schreibst?"),
            k("Du schreibst in der Prüfung einen Aufsatz. Es passt: ___", "Standardsprache", ["Umgangssprache"], "In der Prüfung wird ein sachlicher Text erwartet.", "Ist eine Prüfung eine persönliche oder eine offizielle Lage?"),
            k("Du schreibst eine E-Mail an die Stadtverwaltung. Es passt: ___", "Standardsprache", ["Umgangssprache"], "Eine Behörde ist eine offizielle Stelle, die du nicht persönlich kennst.", "Ist die Stadtverwaltung ein Freund von dir?"),
          ],
        },
      ),
    ),
    ch(
      "Woran du Umgangssprache erkennst",
      b(
        "Füllwörter",
        ["*halt, eben, irgendwie, sozusagen, also, ähm*", "Das sind Wörter, die nichts zum Inhalt beitragen.", "Man nennt sie Füllwörter."],
        "Füllwörter rutschen beim Sprechen einfach mit heraus. Sie geben dir Zeit zum Nachdenken, aber sie sagen nichts aus. Du erkennst sie mit einer Probe: Streich das Wort. Wenn der Satz danach dasselbe bedeutet, war es ein Füllwort.",
        { tasks: [k("Das ist halt irgendwie schwierig. Der Satz enthält ___ Füllwörter.", "zwei", ["keine"], "Ohne die beiden Wörter bedeutet der Satz dasselbe: Das ist schwierig.", "Welche Wörter kannst du streichen, ohne dass sich der Sinn ändert?")] },
      ),
      b(
        "Verkürzte Formen",
        [L("*hab* für habe", "*is* für ist", "*nix* für nichts", "*'ne* für eine", "*haste* für hast du")],
        "Beim schnellen Sprechen verschluckt man Laute. Aus ich habe wird ich hab, aus hast du wird haste. In der Standardsprache schreibst du jedes Wort vollständig aus. Das ist der leichteste Teil beim Umformen, denn du musst nur die fehlenden Buchstaben ergänzen.",
      ),
      b(
        "Lockere Wörter",
        [L("*voll, mega, total*: sehr", "*krass*: beeindruckend, heftig", "*Bock*: Lust", "*kapieren, checken*: verstehen", "*Klamotten*: Kleidung", "*kaputt machen*: beschädigen, zerstören")],
        "Viele Wörter gehören nur in die Umgangssprache. Für jedes davon gibt es ein sachliches Wort in der Standardsprache. Auf der Tafel siehst du die häufigsten Paare. In der Prüfung musst du für ein lockeres Wort das passende sachliche finden.",
        { tasks: [k("Ich habe keinen Bock. In Standardsprache: Ich habe keine ___.", "Lust", ["Laune dazu, ey"], "Das ist das sachliche Wort für dasselbe Gefühl.", "Schau in die dritte Zeile der Tafel.")] },
      ),
      b(
        "Auch der Satzbau verrät es",
        ["Umgangssprache: *Keine Ahnung. War halt so.*", "Standardsprache: *Das weiß ich nicht. Es ist so gewesen.*"],
        "In der Umgangssprache fehlen oft Teile des Satzes. Keine Ahnung ist kein vollständiger Satz, aber jeder versteht ihn. In der Standardsprache braucht jeder Satz mindestens jemanden, der etwas tut, und ein Wort, das sagt, was geschieht.",
      ),
      b(
        "Jetzt du: Umgangssprache finden",
        "Tipp in jedem Satz auf das Wort, das zur Umgangssprache gehört.",
        "In jedem Satz steckt genau ein Wort, das nicht in einen sachlichen Text gehört. Frag dich: Welches Wort würde ich in einer Bewerbung nicht schreiben?",
        {
          tasks: [
            k("Der Film war echt spannend. ___", "echt", ["spannend"], "Das Wort dient hier nur als Verstärkung und ist ein lockeres Füllwort.", "Welches Wort kannst du streichen, ohne dass der Sinn sich ändert?"),
            k("Ich habe die Aufgabe nicht gecheckt. ___", "gecheckt", ["Aufgabe"], "Das ist ein lockeres Wort für verstanden.", "Welches Wort würdest du in einer Prüfung durch ein sachliches ersetzen?"),
            k("Sie trägt immer coole Klamotten. ___", "Klamotten", ["trägt"], "Das ist ein lockeres Wort für Kleidung.", "Welches der beiden Wörter hat ein sachliches Ersatzwort?"),
          ],
        },
      ),
    ),
    ch(
      "In Standardsprache umformen",
      b(
        "Drei Handgriffe",
        ["(1) **Füllwörter** streichen.", "(2) **Lockere Wörter** durch sachliche ersetzen.", "(3) **Verkürzte Formen** ausschreiben."],
        "Mit diesen drei Handgriffen formst du jeden umgangssprachlichen Satz um. Du gehst sie am besten in dieser Reihenfolge durch. Zuerst fliegt alles Überflüssige hinaus. Dann tauschst du Wörter aus. Zum Schluss ergänzt du, was verschluckt wurde.",
      ),
      b(
        "Ein Beispiel, Schritt für Schritt",
        ["Umgangssprache: *Naturschutz is halt voll wichtig.*", L("(1) *halt* streichen.", "(2) *voll* durch *sehr* ersetzen.", "(3) *is* zu *ist* ausschreiben."), "Standardsprache: *Naturschutz ist sehr wichtig.*"],
        "Ich gehe den Satz für dich durch. Halt ist ein Füllwort, ich streiche es. Voll ist ein lockeres Wort für sehr, ich ersetze es. Is ist eine verkürzte Form, ich schreibe ist. Am Ende steht ein sachlicher Satz mit demselben Inhalt.",
      ),
      b(
        "Der Inhalt bleibt gleich",
        ["Beim Umformen ändert sich **nur die Sprache**.", "Du fügst nichts hinzu und lässt nichts Wichtiges weg."],
        "Das ist ein häufiger Fehler. Manche schreiben beim Umformen einen ganz neuen Satz mit einer anderen Aussage. Das gibt Abzug. Der neue Satz muss genau dasselbe sagen wie der alte, nur in einer anderen Sprache. Prüf am Ende, ob die Aussage noch stimmt.",
        { tasks: [k("Beim Umformen in Standardsprache ändert sich ___.", "nur die Sprache", ["auch der Inhalt"], "Die Aussage des Satzes muss dieselbe bleiben.", "Darf der neue Satz etwas anderes behaupten als der alte?")] },
      ),
      b(
        "Jetzt du: umformen",
        "Tipp bei jedem Satz auf das passende Wort der Standardsprache.",
        "Such in jedem Satz das lockere Wort und überleg, welches sachliche Wort dasselbe bedeutet. Achte darauf, dass der Inhalt gleich bleibt.",
        {
          tasks: [
            k("Der Film war voll langweilig. In Standardsprache: Der Film war ___ langweilig.", "sehr", ["mega"], "Sehr ist das sachliche Wort für eine Verstärkung.", "Welches der beiden Wörter würde in einer Zeitung stehen?"),
            k("Ich hab das nicht kapiert. In Standardsprache: Ich habe das nicht ___.", "verstanden", ["gecheckt"], "Verstanden ist das sachliche Wort für dasselbe.", "Welches der beiden Wörter gehört nicht in die Umgangssprache?"),
            k("Zu viele Autos machen die Luft kaputt. In Standardsprache: Zu viele Autos ___ die Luft.", "verschmutzen", ["ruinieren total"], "Das ist ein sachliches, genaues Wort für das, was mit der Luft geschieht.", "Welches Wort beschreibt genau und sachlich, was mit der Luft geschieht?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) **Umgangssprache** für Freunde, **Standardsprache** für Schule und Prüfung.", "(2) Füllwörter streichen, lockere Wörter ersetzen, verkürzte Formen ausschreiben.", "(3) Der Inhalt bleibt derselbe."],
        "Das ist alles, was du für diese Aufgabe brauchst. Denk auch bei deinen eigenen Texten in der Prüfung daran. Ein einziges voll oder halt in einem Aufsatz gilt als Fehler im Ausdruck. Gleich kommen die Wörter und ein kleines Quiz.",
        { tasks: [k("Woran erkennst du ein Füllwort? ___", "Ich kann es streichen, und der Sinn bleibt gleich.", ["Es steht am Satzanfang."], "Füllwörter tragen nichts zum Inhalt bei.", "Was passiert mit dem Satz, wenn du das Wort weglässt?")] },
      ),
    ),
  ],
  [
    v("Umgangssprache", "Die lockere Sprache des Alltags, für Freunde und Familie.", "Das war voll krass!"),
    v("Standardsprache", "Die sachliche Sprache für Schule, Prüfung und Bewerbung. Auch Hochdeutsch genannt.", "Das war sehr beeindruckend."),
    v("Füllwörter", "Wörter ohne Inhalt, die man streichen kann.", "halt, eben, irgendwie, sozusagen"),
    v("verkürzte Formen", "Wörter, bei denen Laute verschluckt sind.", "hab, is, nix"),
    v("lockere Wörter", "Wörter, die nur in die Umgangssprache gehören.", "voll, krass, Bock, kapieren"),
  ],
  [
    q("Welcher Satz steht in Standardsprache?", "Das Ergebnis hat mich sehr überrascht.", ["Das Ergebnis hat mich voll geflasht.", "Krass, das Ergebnis!", "Das Ergebnis war halt mega."], "Der Satz ist vollständig und benutzt sachliche Wörter. Die anderen enthalten lockere Wörter oder Füllwörter."),
    q("Welches Wort ist ein Füllwort?", "irgendwie", ["wichtig", "Naturschutz", "schützen"], "Du kannst es streichen, ohne dass sich der Sinn des Satzes ändert."),
    q("Wie heißt Ich hab nix verstanden in Standardsprache?", "Ich habe nichts verstanden.", ["Ich hab nichts gecheckt.", "Ich habe nix kapiert.", "Hab nichts verstanden."], "Die verkürzten Formen hab und nix werden ausgeschrieben, und der Satz bleibt vollständig."),
    q("Welches sachliche Wort passt für krass?", "beeindruckend", ["mega", "voll", "geil"], "Beeindruckend gehört zur Standardsprache. Die anderen drei Wörter sind selbst Umgangssprache."),
    q("Wo passt Umgangssprache?", "in einer Nachricht an eine Freundin", ["in einer Bewerbung", "in einem Aufsatz", "in einem Brief an eine Behörde"], "Mit Menschen, die man gut kennt, spricht und schreibt man locker."),
    q("Was darf sich beim Umformen in Standardsprache nicht ändern?", "der Inhalt", ["die Wörter", "die Länge des Satzes", "die Satzzeichen"], "Der neue Satz muss dieselbe Aussage haben wie der alte. Nur die Sprache wird sachlicher."),
    q("Die Party war mega. Wie formst du um?", "Die Party war sehr schön.", ["Die Party war mega schön.", "Mega Party.", "Die Party war halt gut."], "Mega ist ein lockeres Wort. In der Standardsprache sagt man genau, was gemeint ist."),
  ],
);
