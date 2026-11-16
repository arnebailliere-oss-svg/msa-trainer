// Guided lesson: summarising a text in two sentences.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_08b_zusammenfassen.json",
  {
    id: "P_DE_ZUSAMMENFASSEN",
    subject: "DE",
    title: "Einen Text zusammenfassen",
    teaser: "Wie du einen Text in zwei Sätzen wiedergibst: ein Einleitungssatz mit Textart, Titel und Kernaussage, und ein zweiter Satz mit den wichtigsten Punkten. Dazu die vier Regeln, an denen die meisten Zusammenfassungen scheitern.",
    hook: "Jemand fragt dich nach einem Film, und du erzählst ihm in zwei Sätzen, worum es geht. Du erzählst nicht jede Szene nach. Genau das ist eine Zusammenfassung. In der Prüfung machst du dasselbe mit einem Text. Es gibt dafür ein festes Muster, das du nur ausfüllen musst.",
    outro: "Du kannst jetzt einen Text in zwei Sätzen zusammenfassen. Der erste Satz nennt Textart, Titel und Kernaussage. Der zweite nennt die wichtigsten Punkte. Du schreibst in der Gegenwart, in eigenen Worten und ohne deine Meinung. Einzelheiten wie Zahlen und Namen lässt du weg.",
    requires: ["P_DE_LESEN", "P_DE_ARGUMENT", "P_DE_ZEITFORMEN"],
  },
  [
    ch(
      "Was eine Zusammenfassung ist",
      b(
        "Kurz sagen, worum es geht",
        ["Ein Text hat 400 Wörter.", "Deine Zusammenfassung hat **zwei Sätze**.", "Sie enthält nur das Wichtigste."],
        "Eine Zusammenfassung ist eine sehr kurze Fassung eines Textes. Sie hilft jemandem, der den Text nicht gelesen hat. Nach deinen zwei Sätzen soll er wissen, worum es geht und was der Text sagen will. Mehr braucht er nicht.",
      ),
      b(
        "Zusammenfassen ist nicht nacherzählen",
        [L("**Nacherzählen**: alles der Reihe nach, mit vielen Einzelheiten.", "**Zusammenfassen**: nur das, was für den ganzen Text gilt.")],
        "Das ist der häufigste Irrtum. Viele schreiben ab, was im ersten Absatz steht, dann was im zweiten steht, und so weiter. Das ist eine Nacherzählung. Bei einer Zusammenfassung trittst du einen Schritt zurück und fragst: Was sagt der Text als Ganzes?",
        { tasks: [k("Eine Zusammenfassung enthält ___.", "nur das Wichtigste", ["jede Einzelheit"], "Sie soll kurz sein und für den ganzen Text gelten.", "Ist eine Zusammenfassung länger oder kürzer als der Text selbst?")] },
      ),
      b(
        "Das Muster aus zwei Sätzen",
        ["**Satz 1**: Was für ein Text ist es, und was sagt er?", "**Satz 2**: Welches sind die wichtigsten Punkte?"],
        "Mit diesem Muster kannst du fast jeden Text zusammenfassen. Der erste Satz stellt den Text vor. Der zweite Satz liefert die wichtigsten Gründe oder Informationen nach. Auf den nächsten Tafeln bauen wir beide Sätze Schritt für Schritt.",
      ),
      b(
        "Jetzt du: Zusammenfassung oder Nacherzählung?",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Frag dich bei jedem Satz, ob er für den ganzen Text gilt oder nur eine einzelne Stelle wiedergibt.",
        {
          tasks: [
            k("Der Text zeigt, warum Jugendliche mehr Schlaf brauchen. Das klingt nach ___.", "einer Zusammenfassung", ["einer Nacherzählung"], "Der Satz gilt für den ganzen Text.", "Gilt der Satz für den ganzen Text oder nur für eine Stelle?"),
            k("Zuerst steht Lisa um sechs auf, dann frühstückt sie, dann geht sie los. Das klingt nach ___.", "einer Nacherzählung", ["einer Zusammenfassung"], "Der Satz zählt Einzelheiten der Reihe nach auf.", "Zählt der Satz einzelne Schritte der Reihe nach auf?"),
          ],
        },
      ),
    ),
    ch(
      "Der Einleitungssatz",
      b(
        "Was in den ersten Satz gehört",
        ["(1) Die **Textart**: Kommentar, Bericht, Interview", "(2) Der **Titel** in Anführungszeichen", "(3) Die **Kernaussage**"],
        "Der erste Satz hat drei Aufgaben. Er sagt, was für ein Text es ist. Er nennt den Titel. Und er sagt in wenigen Worten, was der Text insgesamt aussagt. Wenn der Name des Autors bekannt ist, kannst du ihn ebenfalls nennen.",
      ),
      b(
        "Ein Beispiel",
        ["*Der Kommentar „Ein Pullover für alle?“ spricht sich für Schulkleidung aus.*", L("Textart: Kommentar", "Titel: „Ein Pullover für alle?“", "Kernaussage: Er ist für Schulkleidung.")],
        "So sieht ein vollständiger Einleitungssatz aus. Er ist kurz, und trotzdem steckt alles darin. Schau, wie die drei Teile nacheinander kommen. Wer nur diesen einen Satz liest, weiß schon, was für ein Text es ist und welche Meinung er vertritt.",
      ),
      b(
        "Die Textart erkennen",
        [L("**Bericht**: informiert sachlich.", "**Kommentar**: sagt eine Meinung.", "**Interview**: Fragen und Antworten.")],
        "Die Textart steht oft schon in der Aufgabe. Wenn nicht, erkennst du sie an der Absicht des Textes. Ein Bericht bleibt neutral. Ein Kommentar will überzeugen und wertet. Ein Interview besteht aus Fragen und Antworten. Diese drei kommen in der Prüfung am häufigsten vor.",
        { tasks: [k("Ein Text sagt deutlich seine Meinung und fordert etwas. Es ist ___.", "ein Kommentar", ["ein Bericht"], "Ein Bericht bliebe neutral. Hier wird gewertet und gefordert.", "Bleibt der Text neutral, oder wertet er?")] },
      ),
      b(
        "Verben für den ersten Satz",
        [L("Der Text **zeigt**, dass …", "Der Bericht **informiert** über …", "Der Kommentar **spricht sich für** … **aus**.", "Die Autorin **fordert**, dass …")],
        "Mit diesen Verben kannst du den ersten Satz leicht bilden. Wähl das Verb passend zur Textart. Ein Bericht informiert. Ein Kommentar fordert, kritisiert oder spricht sich für etwas aus. Vermeide das blasse es geht um. Es sagt nicht, was der Text will.",
      ),
      b(
        "Jetzt du: der Einleitungssatz",
        "Tipp bei jeder Aufgabe auf die richtige Lösung.",
        "Prüf bei jedem Satz, ob Textart, Titel und Kernaussage da sind. Fehlt eines davon, ist der Einleitungssatz unvollständig.",
        {
          tasks: [
            k("Welcher Einleitungssatz ist vollständig? ___", "Der Bericht „Helfen macht Schule“ informiert über Jugendliche, die sich freiwillig engagieren.", ["In dem Text geht es um Jugendliche."], "Der Satz nennt Textart, Titel und Kernaussage.", "In welchem der beiden Sätze stehen Textart und Titel?"),
            k("Der Kommentar spricht sich für Schulkleidung aus. Was fehlt in diesem Satz? ___", "der Titel", ["die Textart"], "Textart und Kernaussage sind da. Der Titel in Anführungszeichen fehlt.", "Welcher der drei Teile steht nicht im Satz?"),
          ],
        },
      ),
    ),
    ch(
      "Der zweite Satz und die vier Regeln",
      b(
        "Der zweite Satz",
        ["*Als Gründe nennt die Autorin den Druck durch Markenkleidung, das Gemeinschaftsgefühl und die Zeitersparnis am Morgen.*", "Er nennt die **wichtigsten Punkte**, ohne sie auszuführen."],
        "Im zweiten Satz zählst du die wichtigsten Argumente oder Informationen auf. Du nennst sie nur mit einem Stichwort. Du erklärst sie nicht und bringst keine Beispiele. Meistens sind es zwei oder drei Punkte, die du mit Kommas und einem und verbindest.",
      ),
      b(
        "Regel 1: in der Gegenwart",
        ["Richtig: *Der Text **zeigt** …*", "Falsch: *Der Text zeigte …*"],
        "Eine Zusammenfassung steht immer im Präsens. Der Text liegt ja jetzt vor dir, und er sagt jetzt etwas aus. Das gilt auch dann, wenn der Text selbst von etwas Vergangenem berichtet. Du schreibst also: Der Bericht informiert, die Autorin fordert.",
        { tasks: [k("Der Kommentar ___ sich gegen Hausaufgaben aus.", "spricht", ["sprach"], "Eine Zusammenfassung steht in der Gegenwart.", "In welcher Zeitform schreibst du über einen Text, der vor dir liegt?")] },
      ),
      b(
        "Regel 2: ohne eigene Meinung",
        ["Falsch: *Ich finde, die Autorin hat recht.*", "Die Zusammenfassung zeigt den **Text**, nicht dich."],
        "Deine Meinung ist hier nicht gefragt. Eine Zusammenfassung ist wie ein Spiegel. Sie zeigt, was im Text steht, und sonst nichts. Sätze mit ich finde oder meiner Meinung nach gehören nicht hinein. Auch Wertungen wie leider oder zum Glück lässt du weg.",
      ),
      b(
        "Regel 3: in eigenen Worten",
        ["Falsch: *Im Text steht: „Das ist keine Faulheit, sondern Biologie.“*", "Richtig: *Der Text erklärt die Müdigkeit mit der körperlichen Entwicklung.*"],
        "In einer Zusammenfassung stehen keine wörtlichen Zitate. Du gibst den Inhalt mit deinen eigenen Worten wieder. Das zeigt, dass du den Text verstanden hast. Wer nur Sätze abschreibt, hat nicht zusammengefasst, sondern kopiert.",
        { tasks: [k("Welcher Satz passt in eine Zusammenfassung? ___", "Der Text erklärt, warum Jugendliche abends später müde werden.", ["Im Text steht: „Jugendliche werden später müde.“"], "Der Satz gibt den Inhalt in eigenen Worten wieder, ohne Anführungszeichen.", "In welchem der beiden Sätze steht ein wörtliches Zitat?")] },
      ),
      b(
        "Regel 4: ohne Einzelheiten",
        ["Falsch: *Eine Schule in Niedersachsen beginnt um 8:50 Uhr.*", "Zahlen, Namen und Beispiele lässt du weg."],
        "Einzelheiten machen einen Text anschaulich, aber sie gehören nicht in die Zusammenfassung. Eine einzelne Schule, eine Uhrzeit oder ein Prozentwert gelten nur für eine Stelle. Du nennst stattdessen den Gedanken, für den dieses Beispiel steht.",
        { tasks: [k("62 Prozent der Befragten waren dafür. Gehört dieser Satz in eine Zusammenfassung? ___", "Nein, es ist eine Einzelheit.", ["Ja, Zahlen sind wichtig."], "Eine einzelne Zahl gilt nur für eine Stelle im Text.", "Gilt eine einzelne Zahl für den ganzen Text?")] },
      ),
      b(
        "Jetzt du: Welcher Satz gehört nicht hinein?",
        "Tipp bei jeder Aufgabe auf die richtige Lösung.",
        "Prüf jeden Satz an den vier Regeln: Gegenwart, keine Meinung, eigene Worte, keine Einzelheiten.",
        {
          tasks: [
            k("Welcher Satz gehört nicht in eine Zusammenfassung? ___", "Ich finde das Thema sehr spannend.", ["Der Bericht stellt ein Schulprojekt vor."], "Der Satz enthält eine eigene Meinung.", "In welchem Satz spricht der Schreiber über sich selbst?"),
            k("Welcher Satz gehört nicht in eine Zusammenfassung? ___", "Tom, 15, hilft jeden Dienstag von 16 bis 18 Uhr.", ["Viele Jugendliche helfen in ihrer Freizeit."], "Der Satz nennt Einzelheiten: einen Namen, ein Alter und Uhrzeiten.", "Welcher Satz nennt einen Namen und genaue Uhrzeiten?"),
            k("Welcher Satz ist richtig für eine Zusammenfassung? ___", "Die Autorin fordert einen späteren Schulbeginn.", ["Die Autorin forderte einen späteren Schulbeginn."], "Der Satz steht in der Gegenwart.", "In welcher Zeitform steht jeder der beiden Sätze?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["**Satz 1**: Textart, Titel, Kernaussage", "**Satz 2**: die wichtigsten Punkte", L("Gegenwart.", "Keine eigene Meinung.", "Eigene Worte.", "Keine Einzelheiten.")],
        "Das ist das ganze Muster. Zwei Sätze und vier Regeln. Wenn du deine Zusammenfassung fertig hast, geh die vier Regeln einmal durch. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Was gehört in den ersten Satz einer Zusammenfassung? ___", "Textart, Titel und Kernaussage", ["alle Zahlen aus dem Text"], "Der erste Satz stellt den Text vor und sagt, was er aussagt.", "Was muss jemand wissen, der den Text nicht kennt?")] },
      ),
    ),
  ],
  [
    v("Zusammenfassung", "Eine sehr kurze Fassung eines Textes, die nur das Wichtigste enthält."),
    v("Nacherzählung", "Alles der Reihe nach, mit Einzelheiten. Das ist keine Zusammenfassung."),
    v("Einleitungssatz", "Der erste Satz: Textart, Titel und Kernaussage.", "Der Kommentar „Ein Pullover für alle?“ spricht sich für Schulkleidung aus."),
    v("Textart", "Was für ein Text es ist: Bericht, Kommentar, Interview."),
    v("zeigt, informiert, fordert, spricht sich aus", "Verben, mit denen du sagst, was ein Text tut."),
  ],
  [
    q("Was gehört in den Einleitungssatz einer Zusammenfassung?", "Textart, Titel und Kernaussage", ["deine Meinung", "alle Beispiele", "ein wörtliches Zitat"], "Der erste Satz stellt den Text vor und sagt in wenigen Worten, was er insgesamt aussagt."),
    q("In welcher Zeitform steht eine Zusammenfassung?", "im Präsens", ["im Präteritum", "im Perfekt", "im Futur"], "Der Text liegt vor dir und sagt jetzt etwas aus. Deshalb schreibst du in der Gegenwart."),
    q("Welcher Satz gehört nicht in eine Zusammenfassung?", "Ich finde, die Autorin hat recht.", ["Der Kommentar spricht sich für Schulkleidung aus.", "Die Autorin nennt drei Gründe.", "Der Text richtet sich an Eltern und Lehrkräfte."], "Die eigene Meinung hat in einer Zusammenfassung keinen Platz. Sie zeigt nur den Text."),
    q("Was ist der Unterschied zwischen zusammenfassen und nacherzählen?", "Eine Zusammenfassung nennt nur das Wichtigste.", ["Eine Zusammenfassung ist länger.", "Eine Nacherzählung hat keine Sätze.", "Es gibt keinen Unterschied."], "Beim Nacherzählen gibt man alles der Reihe nach wieder. Beim Zusammenfassen nur das, was für den ganzen Text gilt."),
    q("Darf in einer Zusammenfassung ein wörtliches Zitat stehen?", "Nein, man schreibt in eigenen Worten.", ["Ja, möglichst viele.", "Ja, aber ohne Anführungszeichen.", "Nur am Anfang."], "Eigene Worte zeigen, dass du den Text verstanden hast."),
    q("Welcher Einleitungssatz ist am besten?", "Der Kommentar „Später aufstehen!“ fordert einen späteren Schulbeginn.", ["Es geht um Schule.", "Ich habe einen Text gelesen.", "Der Text ist interessant."], "Der Satz nennt Textart, Titel und Kernaussage. Die anderen sagen fast nichts über den Text."),
    q("Was gehört in den zweiten Satz?", "die wichtigsten Punkte in Stichworten", ["ein langes Beispiel", "der Lebenslauf der Autorin", "die Zeilennummern"], "Der zweite Satz zählt die zwei oder drei wichtigsten Gründe oder Informationen auf, ohne sie auszuführen."),
  ],
);
