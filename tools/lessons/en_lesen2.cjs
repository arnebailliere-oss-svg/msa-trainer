// Guided lesson: Reading task 2, signs and short notices. Own example texts.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_04b_lesen_schilder.json",
  {
    id: "P_EN_READ_SIGNS",
    subject: "EN",
    title: "Lesen 2: Schilder und kurze Texte",
    teaser: "Die zweite Leseaufgabe der Prüfung: ein Schild oder Zettel und vier Sätze, von denen genau einer dasselbe sagt. Du lernst, was ein Schild will, und wie du die beiden typischen Fallen erkennst.",
    hook: "Schilder liest du jeden Tag, an der Bushaltestelle, im Schwimmbad oder an einer Ladentür. In der Prüfung sind sie auf Englisch, und unter jedem Schild stehen vier Sätze. Nur einer davon sagt dasselbe wie das Schild. Wie du ihn findest, schauen wir uns jetzt Schritt für Schritt an.",
    outro: "Du kannst jetzt ein englisches Schild lesen und fragen, was es will. Du weißt, dass die richtige Antwort meistens andere Wörter benutzt als das Schild. Und du kennst die zwei Fallen: das geklaute Wort und die Antwort, die logisch klingt, aber nicht im Text steht.",
  },
  [
    ch(
      "Was will ein Schild?",
      b(
        "So sieht die Aufgabe aus",
        ["Du bekommst einen kurzen Text: ein **Schild**, einen Zettel oder einen Aushang.", "Darunter stehen vier Sätze.", "**Genau einer** sagt dasselbe wie der Text."],
        "Der Text ist immer sehr kurz, oft nur ein Satz. Das macht die Aufgabe aber nicht automatisch leicht. Die vier Sätze darunter sind so gebaut, dass drei davon beinahe richtig klingen. Deshalb brauchst du eine feste Vorgehensweise.",
      ),
      b(
        "Ein Schild",
        ["*No ball games on the grass.*"],
        "Lies das Schild in Ruhe. Auf Deutsch heißt es: keine Ballspiele auf dem Rasen. So ein Schild steht zum Beispiel in einem Park. Bevor du dir irgendwelche Antworten ansiehst, stellst du dem Schild eine Frage. Welche das ist, zeigt dir die nächste Tafel.",
      ),
      b(
        "Warum hängt das Schild da?",
        ["Jedes Schild hat einen **Grund**. Es will etwas von dir.", "Dieses Schild will, dass du etwas **nicht** tust.", "Es **verbietet** etwas."],
        "Niemand hängt ein Schild ohne Grund auf. Frag deshalb immer zuerst: Was will dieses Schild von mir? Hier ist die Antwort klar. Es will, dass niemand auf dem Rasen Ball spielt. Das Wort no am Anfang zeigt dir das Verbot.",
        { tasks: [k("No ball games on the grass. Das Schild will etwas ___.", "verbieten", ["empfehlen"], "Das Wort no zeigt, dass etwas nicht erlaubt ist.", "Was bedeutet das kleine Wort no am Anfang?")] },
      ),
      b(
        "Vier Gründe für ein Schild",
        [L("**verbieten**: *no, do not, not allowed*", "**warnen**: *danger, beware, caution*", "**informieren**: *open, closed, last entry*", "**eine Bedingung nennen**: *only, unless, must*")],
        "Fast jedes Schild in der Prüfung gehört zu einer dieser vier Gruppen. Beware und caution bedeuten Vorsicht. Last entry ist der letzte Einlass. Unless heißt außer wenn, und must heißt müssen. An diesen kleinen Wörtern erkennst du, was das Schild will.",
      ),
      b(
        "Jetzt du: Was will das Schild?",
        "Tipp bei jedem Schild an, was es will.",
        "Hier kommen drei Schilder. Such in jedem das kleine Wort, das dir den Grund verrät. Die Tafel davor hilft dir dabei. Du kannst jederzeit zurückblättern und nachsehen.",
        {
          tasks: [
            k("Caution! Wet floor. Das Schild will ___.", "warnen", ["verbieten"], "Caution heißt Vorsicht. Der Boden ist nass, und du könntest ausrutschen.", "Was bedeutet das erste Wort auf dem Schild?"),
            k("Open daily from 9 to 5. Das Schild will ___.", "informieren", ["warnen"], "Das Schild nennt nur die Öffnungszeiten. Es sagt dir etwas, das du wissen willst.", "Ist hier etwas gefährlich, oder erfährst du einfach eine Tatsache?"),
            k("Children under 12 must be with an adult. Das Schild ___.", "nennt eine Bedingung", ["warnt vor Gefahr"], "Kinder dürfen hinein, aber nur zusammen mit einem Erwachsenen.", "Dürfen Kinder hinein? Und was müssen sie dafür erfüllen?"),
          ],
        },
      ),
    ),
    ch(
      "Dasselbe in anderen Worten",
      b(
        "Die richtige Antwort klingt anders",
        [L("Schild: *Last entry 4.30 pm.*", "Richtig: *You cannot go in after 4.30 pm.*"), "Fast kein Wort ist gleich. Die **Bedeutung** ist gleich."],
        "Das ist die wichtigste Beobachtung in dieser Lektion. Der richtige Satz wiederholt das Schild fast nie wörtlich. Er sagt dasselbe mit anderen Wörtern. Letzter Einlass um halb fünf bedeutet: Danach kommst du nicht mehr hinein.",
      ),
      b(
        "Wörter und ihre Zwillinge",
        [L("**not allowed** = *forbidden, you must not*", "**free** = *no charge, costs nothing*", "**closed** = *not open, shut*", "**staff** = *people who work here*")],
        "Viele Wörter auf Schildern haben einen Zwilling, der dasselbe bedeutet. Not allowed heißt nicht erlaubt, genauso wie forbidden. Staff sind die Leute, die an einem Ort arbeiten. Wenn du diese Paare kennst, erkennst du den richtigen Satz schneller.",
        { tasks: [k("no charge = ___", "free", ["closed", "forbidden"], "No charge heißt, dass nichts berechnet wird. Es kostet also nichts.", "Schau in die zweite Zeile der Tafel. Dort steht das Paar.")] },
      ),
      b(
        "Die erste Falle: ein geklautes Wort",
        [L("Schild: *Dogs must be kept on a lead.*", "Falsch: *Dogs are not allowed in the park.*"), "Das Wort **dogs** stimmt. Die Aussage stimmt nicht."],
        "A lead ist eine Leine. Das Schild sagt also: Hunde müssen an der Leine bleiben. Sie dürfen aber in den Park. Der falsche Satz nimmt das Wort dogs und baut eine andere Aussage darum. Ein gleiches Wort beweist noch gar nichts.",
      ),
      b(
        "Die zweite Falle: Es klingt nur logisch",
        [L("Schild: *Dogs must be kept on a lead.*", "Falsch: *Dog owners pay a fine of £50.*"), "Das klingt vernünftig. Im Text steht es **nicht**."],
        "A fine ist eine Geldstrafe. Vielleicht gibt es in diesem Park wirklich eine Strafe. Auf dem Schild steht davon aber kein Wort. In dieser Aufgabe zählt nur, was der Text sagt. Was du dir dazudenkst, zählt nicht.",
        { tasks: [k("Eine Antwort klingt logisch, steht aber nicht im Text. Sie ist ___.", "falsch", ["richtig"], "Nur was im Text steht, zählt. Alles andere ist dazugedacht.", "Was zählt in dieser Aufgabe: dein Wissen über die Welt oder der Text?")] },
      ),
      b(
        "Jetzt du: das Schild am Schwimmbad",
        ["*Pool rules: No diving. Children under 8 must be with an adult.*"],
        "Diving bedeutet hier ins Wasser springen. Das Schild hat zwei Teile: ein Verbot und eine Bedingung. Lies die Antworten genau und frag dich bei jeder, ob das wirklich auf dem Schild steht.",
        {
          tasks: [
            k("No diving bedeutet: Springen ist ___.", "verboten", ["erlaubt"], "Das Wort no zeigt wieder ein Verbot an.", "Welches kleine Wort steht vor diving?"),
            k("Welcher Satz sagt dasselbe? ___", "Young children cannot swim alone.", ["Diving costs extra.", "The pool is closed for children."], "Kinder unter acht brauchen einen Erwachsenen. Sie dürfen also nicht allein schwimmen.", "Dürfen kleine Kinder hinein? Und wer muss dabei sein?"),
          ],
        },
      ),
      b(
        "Wenn ein Schild einen Witz macht",
        ["*Probably the worst coffee in town. Come in and try it!*", "Niemand wirbt im Ernst mit schlechtem Kaffee.", "Das ist ein **Witz**. Das Schild will Gäste anlocken."],
        "The worst coffee heißt der schlechteste Kaffee. Das Schild meint das nicht ernst. Es will Leute zum Lächeln bringen und neugierig machen. Solche Schilder kommen in der Prüfung manchmal vor. Frag auch hier: Was will das Schild wirklich?",
        { tasks: [k("Das Schild am Café will ___.", "Werbung machen", ["vor dem Kaffee warnen"], "Der Satz Come in and try it lädt dich ein. Das ist Werbung mit Humor.", "Lies den zweiten Satz auf dem Schild. Schickt er dich weg oder lädt er dich ein?")] },
      ),
    ),
    ch(
      "Deine Reihenfolge in der Prüfung",
      b(
        "Vier Schritte",
        ["(1) Lies das Schild und frag: Was will es?", "(2) Lies die vier Sätze.", "(3) Streich jeden Satz, der etwas erfindet oder etwas anderes sagt.", "(4) Prüf den Satz, der übrig bleibt, am Schild."],
        "Mit dieser Reihenfolge gehst du jedes Schild durch. Der dritte Schritt ist der wichtigste. Du suchst nicht sofort den richtigen Satz, sondern streichst zuerst die falschen. Das ist leichter, weil du jetzt die beiden Fallen kennst.",
      ),
      b(
        "Ein Beispiel, Schritt für Schritt",
        ["*Staff only beyond this point.*", L("a) *Only workers may go further.*", "b) *Visitors must show a ticket here.*")],
        "Ich denke laut für dich. Das Schild nennt eine Bedingung: Ab hier dürfen nur Mitarbeiter weiter. Satz b spricht von einer Eintrittskarte, davon steht nichts auf dem Schild. Satz a sagt dasselbe mit anderen Wörtern, denn workers sind staff. Also ist a richtig.",
      ),
      b(
        "Jetzt du: die Tür",
        ["*Please keep this door closed at all times.*"],
        "Keep heißt hier halten, und closed heißt geschlossen. Überleg zuerst, was das Schild will. Dann suchst du den Satz, der dasselbe mit anderen Wörtern sagt.",
        {
          tasks: [
            k("at all times = ___", "immer", ["manchmal"], "All times sind alle Zeiten, also ohne Ausnahme.", "Was bedeutet das kleine Wort all?"),
            k("Welcher Satz sagt dasselbe? ___", "Do not leave the door open.", ["This door is always locked.", "Do not use this door."], "Die Tür soll zu bleiben. Benutzen darf man sie, und abgeschlossen ist sie nicht.", "Darf man durch die Tür gehen? Und was soll danach mit ihr passieren?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Was will das Schild?", "(2) Der richtige Satz benutzt **andere Wörter**.", "(3) Ein gleiches Wort beweist nichts.", "(4) Was nicht im Text steht, ist falsch."],
        "Diese vier Sätze sind alles, was du für die zweite Leseaufgabe brauchst. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz. Vorher kannst du unten noch ein letztes Schild ausprobieren.",
        { tasks: [k("Beware of the dog. Das Schild will ___.", "warnen", ["informieren, wann geöffnet ist"], "Beware heißt: Nimm dich in Acht. Hier gibt es einen Hund.", "Schau auf die Tafel mit den vier Gründen zurück. In welcher Zeile steht beware?")] },
      ),
    ),
  ],
  [
    v("Schild", "Ein kurzer Text an einem Ort: ein Hinweis, ein Verbot, eine Warnung oder ein Aushang."),
    v("not allowed", "Nicht erlaubt. Dasselbe bedeuten forbidden und you must not."),
    v("caution, beware", "Vorsicht. Diese Wörter stehen auf Schildern, die warnen."),
    v("last entry", "Letzter Einlass. Danach kommt niemand mehr hinein."),
    v("staff", "Die Leute, die an einem Ort arbeiten."),
    v("unless", "Außer wenn.", "No entry unless you have a ticket."),
    v("no charge", "Kostenlos, genauso wie free."),
  ],
  [
    q("Schild: No food or drink beyond this point. Was will das Schild?", "etwas verbieten", ["vor Gefahr warnen", "Werbung machen", "Öffnungszeiten nennen"], "Das Wort no zeigt, dass etwas nicht erlaubt ist. Ab hier darf man weder essen noch trinken."),
    q("Schild: Last entry 4.30 pm. Welcher Satz sagt dasselbe?", "You cannot go in after 4.30 pm.", ["The museum opens at 4.30 pm.", "Tickets cost more after 4.30 pm.", "The museum is closed on Mondays."], "Last entry ist der letzte Einlass. Danach kommt niemand mehr hinein. Die anderen Sätze erfinden etwas, das nicht dasteht."),
    q("Schild: Dogs must be kept on a lead. Welcher Satz ist richtig?", "Dogs can come in, but not run free.", ["Dogs are not allowed.", "Dog owners pay a fine.", "Only small dogs are allowed."], "Hunde dürfen hinein, müssen aber an der Leine bleiben. Von einem Verbot oder einer Strafe steht nichts da."),
    q("Was bedeutet staff only?", "Nur für Leute, die hier arbeiten", ["Nur für Kinder", "Nur mit Eintrittskarte", "Nur am Wochenende"], "Staff sind die Mitarbeiter. Only heißt nur. Alle anderen dürfen nicht weitergehen."),
    q("Eine Antwort enthält ein Wort vom Schild, sagt aber etwas anderes. Was tust du?", "Ich streiche sie.", ["Ich kreuze sie an, das Wort stimmt ja.", "Ich lasse die Aufgabe leer.", "Ich kreuze zwei Antworten an."], "Ein gleiches Wort beweist nichts. Es zählt nur, ob die ganze Aussage dasselbe bedeutet wie das Schild."),
    q("Schild: Free entry for children under 6. Welcher Satz sagt dasselbe?", "Very young children do not pay.", ["Children under 6 cannot come in.", "Entry costs 6 pounds.", "Children must come with an adult."], "Free entry heißt freier Eintritt. Kinder unter sechs Jahren bezahlen also nichts."),
    q("Schild: Caution! Hot surface. Was will das Schild?", "warnen", ["verbieten", "informieren", "werben"], "Caution heißt Vorsicht. Die Oberfläche ist heiß, und du könntest dich verbrennen."),
  ],
);
