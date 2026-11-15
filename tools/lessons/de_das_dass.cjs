// Guided lesson: das or dass, with the substitution test.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

const PROBE = "Mach die Probe mit dieses oder welches. Klingt der Satz dann richtig oder falsch?";

primer(
  "primers/de_02_das_dass.json",
  {
    id: "P_DE_DAS_DASS",
    subject: "DE",
    title: "das oder dass?",
    teaser: "Warum die beiden Wörter gleich klingen und trotzdem verschieden geschrieben werden, welche Aufgabe jedes von ihnen im Satz hat und wie du mit der Ersatzprobe in zwei Sekunden das richtige findest.",
    hook: "Diese Frage steht seit Jahren in jeder Prüfung, und sie kostet viele Schülerinnen und Schüler Punkte. Dabei gehört sie zu den wenigen Rechtschreibfragen, für die es eine Probe gibt, die immer funktioniert. Wir schauen uns zuerst die beiden Wörter einzeln an. Danach lernst du die Probe.",
    outro: "Du weißt jetzt, dass es drei Aufgaben für das mit einem s gibt und eine Aufgabe für dass mit zwei s. Mit der Ersatzprobe entscheidest du jeden Fall: Passt dieses oder welches, schreibst du ein s. Passt keins von beiden, schreibst du zwei. Und vor dass steht immer ein Komma.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2", "P_DE_SATZ"],
  },
  [
    ch(
      "Das Wort mit einem s",
      b(
        "Zwei Wörter, ein Klang",
        ["**das** und **dass**", "Beim Sprechen hörst du keinen Unterschied.", "Beim Schreiben musst du dich entscheiden."],
        "Sprich beide Wörter laut aus. Sie klingen vollkommen gleich. Deshalb kannst du dich hier nicht auf dein Ohr verlassen. Du musst wissen, welche Aufgabe das Wort im Satz hat. Wir fangen mit dem Wort an, das nur ein s hat.",
      ),
      b(
        "Erste Aufgabe: Artikel",
        ["**das** Haus, **das** Kind, **das** Auto", "Hier steht es direkt vor einem Nomen."],
        "Diese Aufgabe kennst du am besten. Das ist einer der drei Artikel, zusammen mit der und die. Er steht vor einem Nomen und begleitet es. In dieser Aufgabe hat das Wort immer nur ein s. Darüber musst du kaum nachdenken.",
        { tasks: [k("___ Auto ist rot.", "Das", ["Dass"], "Es steht vor dem Nomen Auto und ist ein Artikel.", "Welches Wort steht direkt nach der Lücke? Was begleitet ein Nomen?")] },
      ),
      b(
        "Zweite Aufgabe: auf etwas zeigen",
        ["***Das** gefällt mir.*", "Du kannst **dieses** dafür sagen:", "*Dieses gefällt mir.*"],
        "Manchmal steht das Wort allein und zeigt auf eine Sache. Du zeigst auf ein Bild und sagst: Das gefällt mir. An dieser Stelle kannst du auch dieses sagen, und der Satz bleibt richtig. In dieser Aufgabe ist das Wort ein Pronomen.",
      ),
      b(
        "Dritte Aufgabe: einen Relativsatz einleiten",
        ["*Das Buch, **das** ich lese, ist spannend.*", "Du kannst **welches** dafür sagen:", "*Das Buch, welches ich lese …*"],
        "Die dritte Aufgabe kennst du aus der Lektion über die Nebensätze. Das Wort leitet einen Relativsatz ein, der ein Nomen genauer erklärt. Hier steht ein Komma davor. Trotzdem hat es nur ein s. Du erkennst diese Aufgabe daran, dass welches an die Stelle passt.",
        { tasks: [k("Das Kind, ___ dort spielt, lacht.", "das", ["dass"], "Du kannst welches einsetzen. Es ist ein Relativpronomen und erklärt das Kind.", PROBE)] },
      ),
      b(
        "Dreimal mit einem s",
        ["(1) Artikel: *das Haus*", "(2) Es zeigt auf etwas: Hier passt **dieses**.", "(3) Relativpronomen: Hier passt **welches**."],
        "Das sind die drei Aufgaben des Wortes mit einem s. Schau genau hin: In zwei von drei Fällen gibt es ein Ersatzwort, das genauso gut passt. Dieses oder welches. Genau das machen wir uns gleich zunutze.",
        { tasks: [k("Das Pferd, das ich mag. Für das zweite Wort passt als Ersatz ___.", "welches", ["weil"], "Der Satz bleibt richtig: das Pferd, welches ich mag.", "Schau in die dritte Zeile der Tafel.")] },
      ),
    ),
    ch(
      "Das Wort mit zwei s",
      b(
        "dass verbindet zwei Sätze",
        ["*Ich glaube, **dass** es klappt.*", "Das Wort ist eine Konjunktion.", "Es leitet einen Nebensatz ein."],
        "Das Wort mit zwei s hat nur eine einzige Aufgabe. Es verbindet einen Hauptsatz mit einem Nebensatz. Es ist also ein Bindewort, wie weil oder wenn. Du erkennst den Nebensatz daran, dass sein Verb am Ende steht.",
      ),
      b(
        "Es bedeutet selbst nichts",
        [L("Ich glaube etwas.", "Es klappt."), "Zusammen: *Ich glaube, **dass** es klappt.*"],
        "Schau, wie der Satz entsteht. Zuerst gibt es zwei einzelne Sätze. Das Bindewort klebt sie zusammen. Es zeigt auf nichts und begleitet kein Nomen. Es hat keine eigene Bedeutung. Deshalb kannst du auch kein anderes Wort dafür einsetzen.",
      ),
      b(
        "Nach diesen Verben kommt es oft",
        ["*sagen, glauben, hoffen, wissen, denken, finden*", L("Ich hoffe, **dass** …", "Ich weiß, **dass** …", "Sie sagt, **dass** …")],
        "Es gibt Verben, nach denen dieses Bindewort besonders häufig folgt. Es sind Verben des Sagens, Denkens und Fühlens. Wenn du eines davon siehst und danach ein Nebensatz kommt, ist es fast immer das Wort mit zwei s.",
        { tasks: [k("Ich hoffe, ___ du kommst.", "dass", ["das"], "Weder dieses noch welches passt hier. Es ist das Bindewort.", PROBE)] },
      ),
      b(
        "Davor steht immer ein Komma",
        ["*Ich weiß**,** dass du recht hast.*", "Hauptsatz und Nebensatz werden durch ein Komma getrennt."],
        "Das folgt aus der Kommaregel, die du schon kennst. Das Bindewort leitet einen Nebensatz ein, und zwischen Hauptsatz und Nebensatz steht immer ein Komma. Wenn du also zwei s schreibst, weißt du gleichzeitig, dass davor ein Komma gehört.",
        { tasks: [k("Sie sagt dass sie müde ist. Das Komma fehlt nach dem Wort ___.", "sagt", ["sie"], "Dort endet der Hauptsatz. Danach beginnt der Nebensatz mit dem Bindewort.", "Wo endet der Hauptsatz, und wo beginnt der Nebensatz?")] },
      ),
    ),
    ch(
      "Die Ersatzprobe",
      b(
        "Die Probe",
        ["Ersetze das Wort durch **dieses** oder **welches**.", L("Klingt der Satz richtig: ein s.", "Klingt der Satz falsch: zwei s.")],
        "Das ist die ganze Probe. Sie heißt Ersatzprobe, weil du ein Wort durch ein anderes ersetzt. Du brauchst dafür keine Fachwörter. Du musst nur hören, ob der Satz mit dem Ersatzwort noch richtig klingt. Auf den nächsten beiden Tafeln probieren wir es aus.",
      ),
      b(
        "Ein Beispiel mit einem s",
        ["*Das Buch, ___ ich lese, ist spannend.*", "Probe: *Das Buch, **welches** ich lese …*", "Das klingt richtig. Also: **das**."],
        "Ich denke einmal laut für dich. Ich setze welches in die Lücke und spreche den Satz. Das Buch, welches ich lese. Das klingt etwas steif, aber es ist richtiges Deutsch. Also schreibe ich das Wort mit einem s.",
      ),
      b(
        "Ein Beispiel mit zwei s",
        ["*Ich glaube, ___ es klappt.*", "Probe: *Ich glaube, **welches** es klappt.*", "Das klingt falsch. Also: **dass**."],
        "Jetzt dieselbe Probe an einem anderen Satz. Ich glaube, welches es klappt. Das ist kein Deutsch. Auch dieses passt nicht. Wenn keins der beiden Ersatzwörter funktioniert, ist es das Bindewort mit zwei s.",
      ),
      b(
        "Jetzt du: die Probe",
        "Mach bei jedem Satz die Ersatzprobe und tipp auf das richtige Wort.",
        "Setz bei jedem Satz in Gedanken dieses oder welches in die Lücke. Sprich den Satz leise aus. Wenn er richtig klingt, nimmst du ein s. Wenn er falsch klingt, nimmst du zwei.",
        {
          tasks: [
            k("Ich finde, ___ du gut singst.", "dass", ["das"], "Weder dieses noch welches passt. Es ist das Bindewort.", PROBE),
            k("Das Haus, ___ dort steht, ist alt.", "das", ["dass"], "Welches passt an die Stelle. Es ist ein Relativpronomen.", PROBE),
            k("___ habe ich nicht gewusst.", "Das", ["Dass"], "Dieses passt an die Stelle. Das Wort zeigt auf etwas.", PROBE),
          ],
        },
      ),
      b(
        "Ein Satz mit beiden",
        ["***Das** ist toll, **dass** du gewonnen hast.*", L("Erstes Wort: *Dieses ist toll.* Es passt.", "Zweites Wort: *… toll, welches du gewonnen hast.* Es passt nicht.")],
        "In der Prüfung stehen gern beide Wörter in einem Satz. Du machst die Probe einfach zweimal. Beim ersten Wort passt dieses, also ein s. Beim zweiten Wort passt weder dieses noch welches, also zwei s. Davor steht außerdem das Komma.",
      ),
      b(
        "So begründest du in der Prüfung",
        ["Nenne die **Wortart** und zeige die **Probe**.", "*Es ist ein Relativpronomen, denn man kann welches einsetzen.*", "*Es ist eine Konjunktion, denn weder dieses noch welches passt.*"],
        "Manchmal sollst du deine Entscheidung begründen. Dafür reichen zwei Dinge: der Name der Wortart und die Probe. Die beiden Sätze auf der Tafel kannst du fast wörtlich übernehmen. Mehr wird nicht verlangt.",
        { tasks: [k("Das Wort mit zwei s gehört zu der Wortart ___.", "Konjunktion", ["Artikel"], "Es verbindet zwei Sätze. Wörter, die verbinden, sind Konjunktionen.", "Welche Aufgabe hat das Wort: begleiten oder verbinden?")] },
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf das richtige Wort.",
        "Jetzt kommen noch einmal drei Sätze. Lass dir Zeit und mach bei jedem die Probe. Mit jedem Satz wird sie dir leichter fallen.",
        {
          tasks: [
            k("Er weiß, ___ er zu spät ist.", "dass", ["das"], "Kein Ersatzwort passt. Nach wissen folgt hier ein Nebensatz mit dem Bindewort.", PROBE),
            k("Das Fahrrad, ___ ich mir wünsche, ist teuer.", "das", ["dass"], "Welches passt. Der Relativsatz erklärt das Fahrrad.", PROBE),
            k("Schön, ___ du da bist!", "dass", ["das"], "Kein Ersatzwort passt. Das Verb bist steht am Ende des Nebensatzes.", PROBE),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Passt **dieses** oder **welches**: ein s.", "(2) Passt keins von beiden: zwei s.", "(3) Vor dem Wort mit zwei s steht immer ein **Komma**."],
        "Mit diesen drei Sätzen löst du jede Aufgabe zu diesem Thema. Die Probe dauert zwei Sekunden und funktioniert immer. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Ich glaube, dieses es regnet. Die Probe klingt falsch. Also schreibst du ___.", "zwei s", ["ein s"], "Wenn kein Ersatzwort passt, ist es das Bindewort.", "Was gilt, wenn weder dieses noch welches in den Satz passt?")] },
      ),
    ),
  ],
  [
    v("das", "Mit einem s: als Artikel, als Wort, das auf etwas zeigt, oder als Relativpronomen.", "das Haus; Das gefällt mir; das Buch, das ich lese"),
    v("dass", "Mit zwei s: ein Bindewort, das einen Nebensatz einleitet. Davor steht ein Komma.", "Ich glaube, dass es klappt."),
    v("Ersatzprobe", "Das Wort durch dieses oder welches ersetzen. Passt es, schreibt man ein s. Passt es nicht, schreibt man zwei."),
    v("sagen, glauben, hoffen, wissen", "Verben, nach denen oft ein Nebensatz mit dem Bindewort folgt."),
  ],
  [
    q("Ich hoffe, ___ du kommst.", "dass", ["das", "daß", "des"], "Weder dieses noch welches passt in die Lücke. Es ist das Bindewort mit zwei s, das einen Nebensatz einleitet."),
    q("Das Auto, ___ dort steht, ist rot.", "das", ["dass", "daß", "den"], "Du kannst welches einsetzen: das Auto, welches dort steht. Es ist ein Relativpronomen mit einem s."),
    q("Womit prüfst du, welches der beiden Wörter richtig ist?", "Ich ersetze es durch dieses oder welches.", ["Ich spreche es laut.", "Ich zähle die Wörter im Satz.", "Ich schaue auf den Satzanfang."], "Die Ersatzprobe funktioniert immer. Hören hilft nicht, weil beide Wörter gleich klingen."),
    q("Welche Wortart ist das Wort mit zwei s?", "Konjunktion", ["Artikel", "Pronomen", "Adjektiv"], "Es verbindet einen Hauptsatz mit einem Nebensatz. Wörter, die verbinden, sind Konjunktionen."),
    q("___ gefällt mir sehr gut.", "Das", ["Dass", "Daß", "Des"], "Du kannst dieses einsetzen: Dieses gefällt mir sehr gut. Das Wort zeigt auf etwas und hat ein s."),
    q("Wann steht vor dem Wort ein Komma?", "Immer, wenn es zwei s hat.", ["Nie.", "Nur am Satzanfang.", "Nur, wenn es ein Artikel ist."], "Das Bindewort leitet einen Nebensatz ein, und vor einem Nebensatz steht ein Komma."),
    q("Sie sagt, ___ ___ Wetter schön wird. Welche Reihenfolge ist richtig?", "dass das", ["das dass", "das das", "dass dass"], "Zuerst kommt das Bindewort mit zwei s. Danach steht der Artikel vor dem Nomen Wetter."),
  ],
);
