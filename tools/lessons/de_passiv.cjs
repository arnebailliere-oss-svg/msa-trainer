// Guided lesson: active and passive voice.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_07d_passiv.json",
  {
    id: "P_DE_PASSIV",
    subject: "DE",
    title: "Aktiv und Passiv",
    teaser: "Zwei Blickrichtungen auf dasselbe Geschehen: Im Aktiv steht der im Mittelpunkt, der etwas tut. Im Passiv steht das im Mittelpunkt, womit etwas geschieht. Du lernst, beide zu erkennen und einen Satz in die andere Form zu bringen.",
    hook: "Der Hund jagt die Katze. Die Katze wird vom Hund gejagt. Beide Sätze erzählen genau dasselbe, aber sie schauen aus verschiedenen Richtungen darauf. Für diese beiden Richtungen gibt es zwei Fachwörter, die du gleich kennenlernst. In der Prüfung sollst du einen Satz von der einen Richtung in die andere bringen. Das geht in drei festen Schritten.",
    outro: "Du kannst jetzt Aktiv und Passiv unterscheiden. Im Aktiv tut das Subjekt etwas. Im Passiv geschieht etwas mit dem Subjekt, und du erkennst es an werden und dem Partizip II. Beim Umformen tauschen Subjekt und Objekt die Plätze, und die Zeitform bleibt dieselbe.",
    requires: ["P_DE_WORTARTEN", "P_DE_SATZGLIEDER", "P_DE_ZEITFORMEN", "P_DE_PARTIZIP"],
  },
  [
    ch(
      "Wer tut etwas?",
      b(
        "Zwei Blickrichtungen",
        ["*Der Hund **jagt** die Katze.*", "*Die Katze **wird** vom Hund **gejagt**.*", "Beide Sätze beschreiben dasselbe Geschehen."],
        "Stell dir die Szene wie ein Foto vor. Im ersten Satz schaust du auf den Hund und siehst, was er tut. Im zweiten Satz schaust du auf die Katze und siehst, was mit ihr passiert. Das Foto ist dasselbe. Nur dein Blick ist ein anderer.",
      ),
      b(
        "Aktiv: Das Subjekt handelt",
        ["***Der Hund** jagt die Katze.*", "Das Subjekt tut selbst etwas.", "Diese Form heißt **Aktiv**."],
        "Im Aktiv ist das Subjekt der Handelnde. Auf die Frage, wer jagt, lautet die Antwort der Hund. Er ist aktiv, er tut etwas. Die meisten Sätze, die du sprichst und schreibst, stehen im Aktiv. Es ist die normale, direkte Art zu erzählen.",
      ),
      b(
        "Passiv: Mit dem Subjekt geschieht etwas",
        ["***Die Katze** wird gejagt.*", "Das Subjekt tut selbst nichts. Etwas geschieht mit ihm.", "Diese Form heißt **Passiv**."],
        "Im Passiv ist das Subjekt nicht der Handelnde. Die Katze jagt niemanden. Sie wird gejagt. Passiv bedeutet untätig. Das Subjekt erleidet etwas oder es wird etwas mit ihm gemacht. Deshalb nannte man das Passiv früher auch Leideform.",
        { tasks: [k("Das Fenster wird geöffnet. Tut das Fenster selbst etwas? ___", "Nein", ["Ja"], "Jemand öffnet das Fenster. Das Fenster selbst tut nichts.", "Kann ein Fenster sich selbst öffnen, oder macht das jemand?")] },
      ),
      b(
        "So erkennst du das Passiv",
        ["**werden** und **Partizip II**", L("wird gejagt", "wird geöffnet", "werden gebaut")],
        "Das Passiv hat ein sicheres Erkennungszeichen. Es besteht aus einer Form von werden und dem Partizip II. Wird, werden, wurde, wurden und dahinter ein Wort wie gejagt oder gebaut. Wenn du diese Kombination siehst, ist es Passiv.",
        { tasks: [k("Das Haus ___ gerade gebaut.", "wird", ["hat"], "Das Haus baut sich nicht selbst. Dafür braucht man eine Form von werden.", "Schau auf die Beispiele der Tafel. Welches kleine Wort steht jedes Mal vorn?")] },
      ),
      b(
        "Jetzt du: Aktiv oder Passiv?",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Frag dich bei jedem Satz: Tut das Subjekt selbst etwas, oder geschieht etwas mit ihm? Such außerdem nach werden und einem Partizip II.",
        {
          tasks: [
            k("Die Lehrerin erklärt die Aufgabe. Das ist ___.", "Aktiv", ["Passiv"], "Die Lehrerin tut selbst etwas: Sie erklärt.", "Wer ist das Subjekt, und tut es selbst etwas?"),
            k("Die Aufgabe wird erklärt. Das ist ___.", "Passiv", ["Aktiv"], "Mit der Aufgabe geschieht etwas. Im Satz stehen wird und ein Partizip II.", "Erklärt die Aufgabe selbst etwas? Welche zwei Verbteile siehst du?"),
            k("Der Brief wurde gestern abgeschickt. Das ist ___.", "Passiv", ["Aktiv"], "Der Brief schickt sich nicht selbst ab. Im Satz stehen wurde und ein Partizip II.", "Tut der Brief selbst etwas? Welche Form von werden steht im Satz?"),
          ],
        },
      ),
    ),
    ch(
      "Einen Satz umformen",
      b(
        "Vom Aktiv ins Passiv",
        ["Aktiv: *Der Hund jagt **die Katze**.*", "Passiv: ***Die Katze** wird vom Hund gejagt.*", "Das Objekt wird zum Subjekt."],
        "Schau, was mit der Katze passiert. Im Aktiv ist sie das Objekt: Wen jagt der Hund? Im Passiv rückt sie nach vorn und wird zum Subjekt. Das ist der erste Schritt beim Umformen. Du nimmst das Objekt und stellst es an den Anfang.",
      ),
      b(
        "Die drei Schritte",
        ["(1) Das Objekt wird zum Subjekt.", "(2) Das Verb wird zu **werden** und Partizip II.", "(3) Der Handelnde kommt mit **von** dazu oder fällt weg."],
        "Mit diesen drei Schritten formst du jeden Satz um. Aus die Katze wird das neue Subjekt. Aus jagt wird wird gejagt. Und der Hund, der vorher Subjekt war, kommt mit von dazu: vom Hund. Vom ist die Kurzform von von dem.",
      ),
      b(
        "Die Zeitform bleibt gleich",
        [L("jagt: **wird** gejagt", "Beides ist Präsens."), L("jagte: **wurde** gejagt", "Beides ist Präteritum.")],
        "Das ist der Punkt, an dem die meisten Fehler passieren. Beim Umformen darfst du die Zeit nicht ändern. Steht der Aktivsatz im Präsens, steht auch werden im Präsens. Steht er im Präteritum, heißt es wurde. Schau deshalb zuerst, in welcher Zeit der Satz steht.",
        { tasks: [k("Der Dieb stahl das Fahrrad. Im Passiv: Das Fahrrad ___ gestohlen.", "wurde", ["wird"], "Stahl ist Präteritum. Also steht auch werden im Präteritum.", "In welcher Zeitform steht das Verb im Aktivsatz?")] },
      ),
      b(
        "Vom Passiv zurück ins Aktiv",
        ["Passiv: *Die Katze wird **vom Hund** gejagt.*", "Aktiv: ***Der Hund** jagt die Katze.*", "Der Handelnde nach von wird wieder zum Subjekt."],
        "Zurück geht es genauso, nur umgekehrt. Du suchst den Handelnden. Er steht hinter dem Wort von. Ihn machst du zum Subjekt. Das alte Subjekt wird wieder zum Objekt, und aus wird gejagt wird jagt.",
      ),
      b(
        "Wenn der Handelnde fehlt",
        ["Passiv: *Das Auto wurde gestohlen.*", "Aktiv: ***Jemand** stahl das Auto.*", "Fehlt der Handelnde, nimmst du **jemand** oder **man**."],
        "Oft steht im Passivsatz gar nicht, wer es getan hat. Dann fehlt dir für den Aktivsatz ein Subjekt. In diesem Fall setzt du jemand oder man ein. Beides ist richtig. Vergiss dabei nicht, die Zeitform beizubehalten.",
        { tasks: [k("Der Schlüssel wurde gefunden. Im Aktiv: ___ fand den Schlüssel.", "Jemand", ["Der Schlüssel"], "Der Handelnde wird im Passivsatz nicht genannt. Dafür steht dieses Wort.", "Wird im Passivsatz gesagt, wer es getan hat?")] },
      ),
      b(
        "Jetzt du: umformen",
        "Tipp bei jedem Satz auf die richtige Umformung.",
        "Geh bei jedem Satz die drei Schritte durch. Achte besonders auf die Zeitform. Sie muss im neuen Satz dieselbe sein wie im alten.",
        {
          tasks: [
            k("Die Mutter weckt das Kind. Im Passiv: Das Kind ___ von der Mutter geweckt.", "wird", ["wurde"], "Weckt ist Präsens. Also steht auch werden im Präsens.", "In welcher Zeitform steht das Verb im Aktivsatz?"),
            k("Die Schüler schrieben einen Test. Im Passiv: Ein Test ___ von den Schülern geschrieben.", "wurde", ["wird"], "Schrieben ist Präteritum. Also steht auch werden im Präteritum.", "In welcher Zeitform steht das Verb im Aktivsatz?"),
            k("Das Tor wird vom Hausmeister geöffnet. Im Aktiv: ___ öffnet das Tor.", "Der Hausmeister", ["Das Tor"], "Der Handelnde steht hinter von. Er wird zum Subjekt.", "Wer steht im Passivsatz hinter dem Wort von?"),
          ],
        },
      ),
    ),
    ch(
      "Wozu das Passiv gut ist",
      b(
        "Wenn der Handelnde unwichtig ist",
        ["*Die Straße wird gesperrt.*", "*Der Müll wird montags abgeholt.*", "Wer es tut, ist hier nicht wichtig."],
        "Das Passiv benutzt man, wenn es nicht darauf ankommt, wer etwas tut. Bei der gesperrten Straße interessiert dich nur, dass sie gesperrt ist. Deshalb findest du das Passiv oft in Nachrichten, Gebrauchsanweisungen und Regeln.",
      ),
      b(
        "Aufpassen: werden hat mehrere Aufgaben",
        [L("*Es **wird** regnen.*", "werden und Infinitiv: Das ist Futur."), L("*Das Haus **wird** gebaut.*", "werden und Partizip II: Das ist Passiv.")],
        "Das Verb werden kann dich täuschen, denn es steht auch im Futur. Du unterscheidest die beiden an dem Wort, das dazugehört. Folgt ein Infinitiv wie regnen, ist es Futur. Folgt ein Partizip II wie gebaut, ist es Passiv.",
        { tasks: [k("Es wird bald schneien. Das ist ___.", "Futur", ["Passiv"], "Nach werden steht ein Infinitiv. Es geht um die Zukunft.", "Welche Form folgt auf werden: ein Infinitiv oder ein Partizip II?")] },
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Jetzt kommt alles aus dieser Lektion vor. Schau zuerst, ob werden im Satz steht und welche Form darauf folgt.",
        {
          tasks: [
            k("Die Brücke wurde 1990 gebaut. Das ist ___.", "Passiv", ["Futur"], "Auf wurde folgt ein Partizip II. Die Brücke baute sich nicht selbst.", "Welche Form folgt auf wurde: ein Infinitiv oder ein Partizip II?"),
            k("Wir werden morgen kommen. Das ist ___.", "Futur", ["Passiv"], "Auf werden folgt ein Infinitiv. Wir tun selbst etwas.", "Tut das Subjekt selbst etwas? Welche Form folgt auf werden?"),
            k("Man baut eine neue Schule. Im Passiv: Eine neue Schule ___ gebaut.", "wird", ["wurde"], "Baut ist Präsens. Das Wort man fällt im Passiv einfach weg.", "In welcher Zeitform steht das Verb im Aktivsatz?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) **Aktiv**: Das Subjekt tut etwas.", "(2) **Passiv**: werden und Partizip II. Mit dem Subjekt geschieht etwas.", "(3) Beim Umformen bleibt die **Zeitform** gleich.", "(4) Fehlt der Handelnde, nimmst du jemand oder man."],
        "Das sind die vier Punkte, die du für die Prüfung brauchst. Wenn du einen Satz umformen sollst, schau immer zuerst auf die Zeitform. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Die Fenster wurden geputzt. Wer hat geputzt? ___", "Das sagt der Satz nicht.", ["die Fenster"], "Im Passiv geschieht etwas mit dem Subjekt. Wer es tut, kann fehlen.", "Tun die Fenster selbst etwas, oder geschieht etwas mit ihnen?")] },
      ),
    ),
  ],
  [
    v("Aktiv", "Das Subjekt tut selbst etwas.", "Der Hund jagt die Katze."),
    v("Passiv", "Mit dem Subjekt geschieht etwas. Werden und Partizip II.", "Die Katze wird gejagt."),
    v("von", "Mit diesem Wort wird im Passiv der Handelnde genannt.", "vom Hund gejagt"),
    v("jemand, man", "Das Subjekt im Aktivsatz, wenn der Passivsatz den Handelnden nicht nennt.", "Jemand stahl das Auto."),
  ],
  [
    q("Welcher Satz steht im Passiv?", "Das Zimmer wird aufgeräumt.", ["Ich räume das Zimmer auf.", "Ich werde das Zimmer aufräumen.", "Das Zimmer ist groß."], "Im Satz stehen wird und das Partizip II aufgeräumt. Mit dem Zimmer geschieht etwas."),
    q("Wie heißt das Passiv von: Der Koch brät das Fleisch?", "Das Fleisch wird vom Koch gebraten.", ["Das Fleisch wurde vom Koch gebraten.", "Der Koch wird das Fleisch braten.", "Das Fleisch brät den Koch."], "Brät ist Präsens, also steht wird. Das Objekt wird zum Subjekt, und der Handelnde kommt mit von dazu."),
    q("Wie heißt das Passiv von: Die Polizei fasste den Dieb?", "Der Dieb wurde von der Polizei gefasst.", ["Der Dieb wird von der Polizei gefasst.", "Die Polizei wurde vom Dieb gefasst.", "Der Dieb fasste die Polizei."], "Fasste ist Präteritum, also steht wurde. Die Zeitform bleibt beim Umformen gleich."),
    q("Wie heißt das Aktiv von: Der Ball wurde gefunden?", "Jemand fand den Ball.", ["Der Ball fand jemanden.", "Der Ball wird gefunden.", "Jemand findet den Ball."], "Der Handelnde fehlt, also steht jemand. Wurde ist Präteritum, deshalb heißt es fand."),
    q("Es wird regnen. Was ist das?", "Futur", ["Passiv", "Perfekt", "Imperativ"], "Auf wird folgt der Infinitiv regnen. Werden und Infinitiv bilden das Futur."),
    q("Was wird beim Umformen ins Passiv zum Subjekt?", "das Objekt des Aktivsatzes", ["das Verb", "der Handelnde", "die Zeitangabe"], "Das Satzglied, das im Aktiv auf Wen oder was antwortet, rückt im Passiv nach vorn."),
    q("Warum benutzt man das Passiv?", "Weil unwichtig oder unbekannt ist, wer etwas tut", ["Weil es kürzer ist", "Weil es höflicher ist", "Weil es die Zukunft zeigt"], "Im Passiv steht das Geschehen im Mittelpunkt. Der Handelnde kann wegfallen."),
  ],
);
