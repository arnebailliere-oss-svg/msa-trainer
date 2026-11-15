// Guided lesson: Reading task 1, matching people and offers. Own example texts.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_04a_lesen_zuordnen.json",
  {
    id: "P_EN_READ_MATCH",
    subject: "EN",
    title: "Lesen 1: Wer passt zu welchem Angebot?",
    teaser: "Die erste Leseaufgabe der Prüfung: Personen und Angebote zusammenbringen. Du lernst, die Wünsche einer Person zu finden und mit Wörtern aus dem Angebot zu belegen, statt zu raten.",
    hook: "Reading heißt lesen. In der Prüfung musst du dabei nichts übersetzen und keine Regel aufsagen. Du musst nur etwas finden. Das ist eine Technik, und eine Technik kann jeder lernen. Wir fangen mit der ersten Aufgabe an und gehen sie ganz langsam durch.",
    outro: "Du weißt jetzt, wie die erste Leseaufgabe funktioniert. Du suchst die Wünsche einer Person, gehst damit durch die Angebote und zeigst auf die Wörter, die passen. Ein einziger Wunsch, der dagegen spricht, reicht, um ein Angebot zu streichen. So wird aus Raten ein sicheres Vorgehen.",
  },
  [
    ch(
      "Was die Aufgabe von dir will",
      b(
        "So sieht die Aufgabe aus",
        ["Du bekommst **fünf Personen** und **sieben Angebote**.", "Zu jeder Person passt ein Angebot.", "Zwei Angebote bleiben am Ende übrig."],
        "Die Angebote sind zum Beispiel Ausflüge, Kurse oder Apps. Über jede Person stehen zwei oder drei Sätze da. Deine Aufgabe ist es, herauszufinden, welches Angebot zu welcher Person passt. Wir schauen uns zuerst an, was in so einem Text über eine Person steckt.",
      ),
      b(
        "Eine Person",
        ["*Mia loves animals. She has only one hour. She doesn't want to spend much money.*"],
        "Lies die drei Sätze in Ruhe. Auf Deutsch heißt das: Mia liebt Tiere. Sie hat nur eine Stunde Zeit. Und sie möchte nicht viel Geld ausgeben. Mehr erfährst du über Mia nicht. Das ist auch gar nicht nötig.",
      ),
      b(
        "Jeder Satz ist ein Wunsch",
        [L("(1) **animals** = Tiere", "(2) **only one hour** = nur eine Stunde", "(3) **not much money** = wenig Geld"), "Drei Sätze, drei **Wünsche**."],
        "In jedem Satz über eine Person steckt ein Wunsch. Ein Wunsch ist etwas, das die Person will oder nicht will. Bei Mia sind es drei. In der Prüfung unterstreichst du diese Wörter mit dem Stift, damit du keinen Wunsch vergisst.",
        { tasks: [k("She has only one hour. Mia sucht also etwas ___.", "Kurzes", ["Langes"], "Wer nur eine Stunde hat, kann nichts machen, das den halben Tag dauert.", "Wie viel Zeit hat Mia? Passt dazu ein langer Ausflug?")] },
      ),
      b(
        "Ein Angebot",
        ["*A) City Farm: meet goats and rabbits. Open every day. Visits take about 45 minutes. Entry is free.*", "Ein **Angebot** ist ein kleiner Werbetext."],
        "Jetzt ein Angebot. Auf Deutsch: ein Bauernhof in der Stadt mit Ziegen und Kaninchen. Er ist jeden Tag geöffnet. Ein Besuch dauert ungefähr 45 Minuten, und der Eintritt kostet nichts. Lies jedes Angebot mit der Frage: Für wen ist das gemacht?",
      ),
      b(
        "Wunsch trifft Angebot",
        [L("animals: *goats and rabbits*", "one hour: *about 45 minutes*", "not much money: *entry is free*"), "Drei Wünsche, drei Treffer. Mia passt zu **A**."],
        "Schau, was hier passiert ist. Zu jedem Wunsch von Mia gibt es im Angebot ein Wort, das passt. Ziegen und Kaninchen sind Tiere. 45 Minuten sind weniger als eine Stunde. Und free bedeutet, dass es kein Geld kostet.",
        { tasks: [k("Zum Wunsch not much money passt im Angebot das Wort ___.", "free", ["every day", "goats"], "Free heißt kostenlos. Das passt zu jemandem, der wenig Geld ausgeben will.", "Welches der drei Wörter hat etwas mit Geld zu tun?")] },
      ),
    ),
    ch(
      "Belegen statt raten",
      b(
        "Was heißt belegen?",
        ["Du zeigst auf die **Wörter im Text**, die beweisen, dass es passt.", "Das nennt man **belegen**.", "Raten heißt dagegen nur: Es klingt irgendwie richtig."],
        "Das ist der wichtigste Gedanke der ganzen Lektion. Eine Antwort ist erst dann sicher, wenn du mit dem Finger auf die Stelle zeigen kannst. Bei Mia konnten wir das dreimal. Wer nur nach Gefühl ankreuzt, fällt auf die Fallen herein, die gleich kommen.",
      ),
      b(
        "Andere Wörter, gleiche Bedeutung",
        [L("Person: *not much money*", "Angebot: *free, cheap, low prices*"), L("Person: *animals*", "Angebot: *goats, wildlife, zoo*")],
        "Die Angebote benutzen fast nie dasselbe Wort wie die Person. Sie sagen dasselbe mit anderen Wörtern. Bei der Person steht animals, im Angebot steht goats. Du vergleichst also die Bedeutung und nicht die Buchstaben.",
        { tasks: [k("Person: She loves music. Im Angebot suchst du ein Wort wie ___.", "concert", ["museum", "market"], "Ein Konzert hat mit Musik zu tun. Das Wort ist anders, die Bedeutung passt.", "Wo hört man Musik? Such das Wort, das dazu gehört.")] },
      ),
      b(
        "Die Falle: Ein Wunsch passt, ein anderer nicht",
        ["*B) Wildlife Park: see deer and owls on a four-hour guided walk. Tickets £25.*", L("Tiere? Ja.", "Eine Stunde? Nein.", "Wenig Geld? Nein.")],
        "Dieses Angebot klingt zuerst gut für Mia, denn es gibt Rehe und Eulen. Aber lies weiter. Die Führung dauert vier Stunden, und die Karte kostet 25 Pfund. Zwei von Mias Wünschen sprechen dagegen. Also ist B nicht ihr Angebot.",
      ),
      b(
        "Die Regel dazu",
        ["Ein Angebot passt nur, wenn **kein Wunsch dagegen spricht**.", "Ein einziges Nein reicht, und das Angebot fällt weg."],
        "Merk dir diese Regel gut, denn sie rettet dir Punkte. Die Prüfung baut absichtlich Angebote ein, bei denen ein Wort wunderbar passt. Darauf sollst du hereinfallen. Prüf deshalb immer alle Wünsche, bevor du dich entscheidest.",
        { tasks: [k("Mia hat nur eine Stunde. Das Angebot dauert vier Stunden. Das Angebot ___.", "fällt weg", ["passt trotzdem"], "Ein Wunsch spricht dagegen. Das reicht, um das Angebot zu streichen.", "Wie viele Wünsche müssen dagegen sprechen, damit ein Angebot nicht passt?")] },
      ),
      b(
        "Jetzt du: Jonas",
        ["*Jonas is travelling alone. He wants to meet other young people and do something sporty.*", "*C) Beach volleyball: join a team, ages 14 to 20.*", "*D) Castle tour: a quiet walk for families.*"],
        "Jonas reist allein. Er möchte andere junge Leute treffen und etwas Sportliches machen. Darunter stehen zwei Angebote. Such für jeden Wunsch das Wort, das passt, und entscheide dich dann.",
        {
          tasks: [
            k("Zu other young people passt in Angebot C: ___", "ages 14 to 20", ["join a team"], "Dort sind Jugendliche zwischen 14 und 20 Jahren. Das sind andere junge Leute.", "Welche Stelle im Angebot sagt etwas darüber, wie alt die Leute sind?"),
            k("Zu something sporty passt das Wort ___.", "volleyball", ["quiet walk"], "Das ist ein Sport. Ein ruhiger Spaziergang ist nichts Sportliches.", "Bei welchem der beiden Wörter kommt man ins Schwitzen?"),
            k("Jonas passt zu Angebot ___.", "C", ["D"], "Beide Wünsche lassen sich in C belegen. D ist für Familien und ruhig.", "Für welches Angebot hast du gerade zwei passende Wörter gefunden?"),
          ],
        },
      ),
    ),
    ch(
      "Deine Reihenfolge in der Prüfung",
      b(
        "Schritt 1: die Wünsche markieren",
        ["(1) Lies die Sätze über die Person.", "(2) Unterstreiche jeden Wunsch.", "(3) Achte besonders auf **not**, **only** und **without**."],
        "Fang immer bei der Person an und nicht bei den Angeboten. Die Person hat wenige Sätze, das geht schnell. Die kleinen Wörter not, only und without sind wichtig, weil sie sagen, was jemand gerade nicht will. Without bedeutet ohne.",
      ),
      b(
        "Schritt 2: die Angebote absuchen",
        ["Geh mit dem ersten Wunsch durch alle Angebote.", "Streich jedes Angebot, das dagegen spricht.", "Mach dasselbe mit dem nächsten Wunsch."],
        "Du musst die Angebote dafür nicht Wort für Wort lesen. Du suchst nur nach Wörtern, die zu dem Wunsch passen oder dagegen sprechen. Nach jedem Wunsch bleiben weniger Angebote übrig. Am Ende steht meistens nur noch eins da.",
      ),
      b(
        "Schritt 3: noch einmal prüfen",
        ["Bleibt ein Angebot übrig? Prüf jeden Wunsch noch einmal daran.", "Bleiben zwei übrig? Lies beide jetzt ganz genau."],
        "Erst jetzt liest du genau, und nur noch ein oder zwei kurze Texte. Das spart viel Zeit. Wenn du für jeden Wunsch auf ein Wort zeigen kannst, ist die Antwort sicher. Unten kannst du prüfen, ob du die Reihenfolge noch weißt.",
        { tasks: [k("Was machst du in der Prüfung zuerst? ___", "Die Wünsche der Person markieren", ["Alle Angebote genau lesen"], "Die Person hat nur wenige Sätze. Mit ihren Wünschen suchst du danach gezielt.", "Welcher Text ist kürzer: der über die Person oder alle sieben Angebote?")] },
      ),
      b(
        "Wörter, die in Angeboten oft vorkommen",
        [L("**on a budget** = mit wenig Geld", "**outdoors** = draußen", "**suitable for** = geeignet für", "**beginner** = Anfänger", "**book in advance** = vorher buchen")],
        "Diese fünf Ausdrücke stehen in fast jeder Prüfung irgendwo. Lies sie einmal langsam durch. Du musst sie nicht sofort auswendig können. Es hilft schon, wenn du sie wiedererkennst, sobald sie in einem Angebot auftauchen.",
        { tasks: [k("on a budget = ___", "mit wenig Geld", ["draußen", "für Anfänger"], "Ein Budget ist das Geld, das man ausgeben kann. On a budget heißt: Es ist knapp.", "Schau in die erste Zeile der Tafel. Dort steht die Lösung.")] },
      ),
      b(
        "Jetzt du: Aylin",
        ["*Aylin is a beginner. She wants to learn something outdoors.*", "*E) Surf school: first lessons for beginners on the beach.*", "*F) Climbing hall: for experienced climbers only.*"],
        "Aylin ist Anfängerin und möchte draußen etwas lernen. Experienced bedeutet erfahren, also das Gegenteil von Anfänger. Geh wieder Wunsch für Wunsch vor und zeig auf die Wörter.",
        {
          tasks: [
            k("Zu outdoors passt die Stelle ___.", "on the beach", ["climbing hall"], "Ein Strand ist draußen. Eine Halle ist drinnen.", "Welcher der beiden Orte hat kein Dach?"),
            k("In F spricht gegen Aylin die Stelle ___.", "experienced climbers only", ["climbing hall is open"], "Nur für Erfahrene heißt: nichts für Anfänger. Dieser Wunsch spricht dagegen.", "Such in F das kleine Wort, das andere Leute ausschließt."),
            k("Aylin passt zu Angebot ___.", "E", ["F"], "In E lassen sich beide Wünsche belegen: für Anfänger und am Strand.", "Bei welchem Angebot spricht kein Wunsch dagegen?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Wünsche markieren.", "(2) Angebote absuchen und streichen.", "(3) Jeden Wunsch **belegen**."],
        "Drei Schritte, immer in dieser Reihenfolge. Und wenn du am Ende bei einer Person unsicher bist, kreuzt du trotzdem etwas an. Für eine falsche Antwort wird nichts abgezogen. Eine leere Zeile bringt dagegen sicher keinen Punkt.",
        { tasks: [k("Ein Wort passt perfekt, aber ein anderer Wunsch spricht dagegen. Das Angebot ___.", "fällt weg", ["ist richtig"], "Ein einziger Wunsch, der dagegen spricht, reicht aus.", "Denk an Mia und den Wildpark. Wie ging das aus?")] },
      ),
    ),
  ],
  [
    v("Wunsch", "Das, was eine Person will oder nicht will. In jedem Satz über sie steckt einer."),
    v("Angebot", "Ein kleiner Werbetext, zum Beispiel für einen Ausflug oder einen Kurs."),
    v("belegen", "Auf die Wörter im Text zeigen, die beweisen, dass eine Antwort stimmt."),
    v("free", "Kostenlos.", "Entry is free."),
    v("on a budget", "Mit wenig Geld."),
    v("outdoors", "Draußen, im Freien."),
    v("beginner", "Anfänger oder Anfängerin. Das Gegenteil ist experienced, also erfahren."),
  ],
  [
    q("Über eine Person steht da: She is on a budget. Was wünscht sie sich?", "Etwas, das wenig kostet", ["Etwas, das draußen stattfindet", "Etwas für Anfänger", "Etwas mit Tieren"], "On a budget heißt, dass das Geld knapp ist. Sie sucht also ein Angebot, das billig oder kostenlos ist."),
    q("Person: He loves animals. Welches Wort in einem Angebot passt dazu?", "wildlife", ["castle", "concert", "market"], "Wildlife sind wild lebende Tiere. Das Wort ist ein anderes als animals, aber die Bedeutung passt."),
    q("Was bedeutet belegen?", "Auf die Wörter zeigen, die die Antwort beweisen", ["Die Antwort nehmen, die am besten klingt", "Den Text ins Deutsche übersetzen", "Alle Angebote zweimal lesen"], "Belegen heißt, dass du für jede Antwort eine Stelle im Text nennen kannst. Nur dann ist sie sicher."),
    q("Ein Angebot passt zu zwei Wünschen, aber der dritte Wunsch spricht dagegen. Was tust du?", "Ich streiche das Angebot.", ["Ich nehme es, zwei von drei reichen.", "Ich lasse die Aufgabe leer.", "Ich kreuze zwei Angebote an."], "Ein Angebot passt nur, wenn kein Wunsch dagegen spricht. Ein einziges Nein reicht aus."),
    q("Tom is a beginner. Welches Angebot fällt weg?", "For experienced players only", ["First lessons for everyone", "No experience needed", "Suitable for all levels"], "Experienced heißt erfahren, und only heißt nur. Das Angebot schließt Anfänger aus."),
    q("Womit fängst du in der Prüfung an?", "Mit den Wünschen der Person", ["Mit dem längsten Angebot", "Mit dem letzten Angebot", "Mit der Überschrift"], "Die Person hat nur wenige Sätze. Wenn du ihre Wünsche kennst, suchst du in den Angeboten gezielt danach."),
    q("Du bist bei einer Person unsicher. Was machst du?", "Trotzdem ein Angebot ankreuzen", ["Die Zeile leer lassen", "Zwei Angebote ankreuzen", "Die Aufgabe durchstreichen"], "Für falsche Antworten wird nichts abgezogen. Eine leere Zeile bringt aber sicher keinen Punkt."),
  ],
);
