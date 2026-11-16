// Guided lesson: recognising and naming the four kinds of mistakes.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_04d_fehlerarten.json",
  {
    id: "P_DE_FEHLERARTEN",
    subject: "DE",
    title: "Fehler erkennen und benennen",
    teaser: "Die vier Fehlerarten der Prüfung: Rechtschreibung, Zeichensetzung, Grammatik und Ausdruck. Du lernst, sie mit vier Fragen zu unterscheiden, und kennst danach die Stellen, an denen sie leicht verwechselt werden.",
    hook: "In einer Aufgabe der Prüfung bekommst du einen kurzen Text, in dem Fehler markiert sind. Du sollst sie nicht nur verbessern, sondern auch sagen, um welche Art von Fehler es sich handelt. Es gibt nur vier Arten. Wenn du für jede eine einfache Frage kennst, ordnest du jeden Fehler richtig ein.",
    outro: "Du kennst jetzt die vier Fehlerarten und die vier Fragen dazu. Ist ein Wort falsch geschrieben, ist es ein Rechtschreibfehler. Fehlt ein Zeichen, ist es ein Zeichensetzungsfehler. Ist die Form eines Wortes falsch, ist es ein Grammatikfehler. Und passt ein Wort nicht in einen sachlichen Text, ist es ein Ausdrucksfehler.",
    requires: ["P_DE_WORTARTEN", "P_DE_SATZGLIEDER", "P_DE_SATZ", "P_DE_KOMMA1", "P_DE_KOMMA2", "P_DE_STRATEGIEN", "P_DE_REGISTER"],
  },
  [
    ch(
      "Rechtschreibung und Zeichensetzung",
      b(
        "Die Aufgabe",
        ["Du bekommst einen Text mit markierten Fehlern.", "Du sollst jeden Fehler **verbessern**.", "Und du sollst sagen, **welche Art** von Fehler es ist."],
        "Diese Aufgabe prüft, ob du deine eigenen Texte überarbeiten kannst. Dafür reicht es nicht, einen Fehler zu spüren. Du musst wissen, was genau falsch ist. Erst dann kannst du ihn sicher verbessern und denselben Fehler beim nächsten Mal vermeiden.",
      ),
      b(
        "Die vier Fehlerarten",
        [L("**R**: Rechtschreibfehler", "**Z**: Zeichensetzungsfehler", "**G**: Grammatikfehler", "**A**: Ausdrucksfehler")],
        "Lehrerinnen und Lehrer benutzen diese vier Buchstaben am Rand deiner Arbeiten. Wahrscheinlich hast du sie schon oft gesehen. R steht für die Schreibung der Wörter, Z für die Satzzeichen, G für die Formen der Wörter und A für die Wahl der Wörter.",
      ),
      b(
        "R: der Rechtschreibfehler",
        [L("*warscheinlich* statt wahrscheinlich", "*Strasse* statt Straße", "*beim essen* statt beim Essen"), "Ein Wort ist **falsch geschrieben**."],
        "Ein Rechtschreibfehler betrifft immer ein einzelnes Wort. Ein Buchstabe fehlt, ist zu viel oder ist falsch. Auch die Groß- und Kleinschreibung gehört dazu. Die Frage lautet: Ist dieses Wort so geschrieben, wie es im Wörterbuch steht?",
        { tasks: [k("Wir gehen heute schwimen. Richtig geschrieben heißt das Wort ___.", "schwimmen", ["schwiemen"], "Das i ist kurz. Deshalb wird das m verdoppelt.", "Sprich das Wort in Silben. Wie oft hörst du das m?")] },
      ),
      b(
        "Z: der Zeichensetzungsfehler",
        [L("*Ich glaube dass er kommt.*", "Hier fehlt ein Komma."), L("*Er sagt: Ich komme.*", "Hier fehlen die Anführungszeichen.")],
        "Ein Zeichensetzungsfehler betrifft kein Wort, sondern ein Satzzeichen. Ein Komma fehlt, ein Punkt ist vergessen, oder die Anführungszeichen sind nicht da. Die Wörter selbst sind alle richtig. Die Frage lautet: Fehlt ein Zeichen, oder steht eins zu viel?",
        { tasks: [k("Wir bleiben hier weil es regnet. Das fehlende Komma gehört vor das Wort ___.", "weil", ["hier"], "Mit diesem Wort beginnt der Nebensatz. An der Grenze steht das Komma.", "Mit welchem Wort beginnt hier der Nebensatz?")] },
      ),
      b(
        "Jetzt du: R oder Z?",
        "Tipp bei jedem Satz auf die richtige Fehlerart.",
        "Frag dich bei jedem Satz: Ist ein Wort falsch geschrieben, oder fehlt ein Satzzeichen? Schau dir jedes Wort einzeln an und dann die Stellen zwischen den Wörtern.",
        {
          tasks: [
            k("Morgen fahren wir nach Hamburg, Köln, und Bonn. Der Fehler ist ein ___.", "Zeichensetzungsfehler", ["Rechtschreibfehler"], "Vor und steht in einer Aufzählung kein Komma. Ein Zeichen ist zu viel.", "Sind alle Wörter richtig geschrieben? Schau auf die Stelle vor und."),
            k("Das war ein grosser Erfolg. Der Fehler ist ein ___.", "Rechtschreibfehler", ["Zeichensetzungsfehler"], "Nach einem langen Vokal schreibt man ß. Das Wort ist falsch geschrieben.", "Welches Wort ist anders geschrieben als im Wörterbuch?"),
            k("„Komm her“ rief sie. Der Fehler ist ein ___.", "Zeichensetzungsfehler", ["Rechtschreibfehler"], "Nach dem Anführungszeichen fehlt ein Komma.", "Was steht zwischen der Rede und dem Begleitsatz?"),
          ],
        },
      ),
    ),
    ch(
      "Grammatik und Ausdruck",
      b(
        "G: der Grammatikfehler",
        [L("*Ich sehe ein Film.* Richtig: einen Film", "*Er hat den Ball gefangt.* Richtig: gefangen", "*Die Kinder spielt.* Richtig: spielen")],
        "Bei einem Grammatikfehler ist das Wort an sich richtig geschrieben. Falsch ist seine Form. Ein steht im Wörterbuch, aber an dieser Stelle muss es einen heißen. Die Frage lautet: Hat das Wort die richtige Form für diese Stelle im Satz?",
      ),
      b(
        "Drei häufige Grammatikfehler",
        ["(1) Der **Fall** ist falsch: *wegen dem Regen* statt wegen des Regens.", "(2) Die **Verbform** ist falsch: *gefangt* statt gefangen.", "(3) Subjekt und Verb **passen nicht zusammen**: *Die Kinder spielt.*"],
        "Die meisten Grammatikfehler gehören zu einer dieser drei Gruppen. Beim ersten stimmt der Fall nicht. Beim zweiten ist die Form des Verbs falsch gebildet. Beim dritten steht das Subjekt in der Mehrzahl und das Verb in der Einzahl oder umgekehrt.",
        { tasks: [k("Meine Freunde kommt morgen. Richtig heißt es: Meine Freunde ___ morgen.", "kommen", ["kamen"], "Freunde sind mehrere. Dazu passt die Verbform für die Mehrzahl.", "Sind die Freunde einer oder mehrere? Welche Form passt dazu?")] },
      ),
      b(
        "A: der Ausdrucksfehler",
        [L("*Das Buch ist voll gut.*", "Richtig: Das Buch ist sehr gut."), "Schreibung und Grammatik stimmen. Aber das Wort **passt nicht** in einen sachlichen Text."],
        "Ein Ausdrucksfehler ist am schwersten zu erkennen, weil nichts im engeren Sinn falsch ist. Das Wort ist richtig geschrieben, und der Satz ist richtig gebaut. Trotzdem gehört das Wort nicht hierher. Meistens ist es Umgangssprache oder ein Füllwort.",
        { tasks: [k("Der Roman ist mega spannend. In einem sachlichen Text schreibst du: Der Roman ist ___ spannend.", "sehr", ["voll"], "Mega und voll sind Umgangssprache. In einen sachlichen Text passt das neutrale Wort.", "Welches der beiden Wörter würdest du in einer Bewerbung schreiben?")] },
      ),
      b(
        "Die Falle: das und dass",
        ["*Ich weiß, das er kommt.*", "Richtig: *Ich weiß, **dass** er kommt.*", "Das ist ein **Rechtschreibfehler**, kein Grammatikfehler."],
        "Diese Stelle wird in der Prüfung sehr oft falsch eingeordnet. Viele halten sie für Grammatik, weil es zwei verschiedene Wortarten sind. In der Bewertung zählt sie aber zur Rechtschreibung, denn es geht um die Schreibung mit einem oder zwei s.",
        { tasks: [k("Sie hofft, das alles gut geht. Der Fehler ist ein ___.", "Rechtschreibfehler", ["Grammatikfehler"], "Die Verwechslung von einem und zwei s zählt zur Rechtschreibung.", "Wie wird diese Verwechslung in der Prüfung eingeordnet?")] },
      ),
      b(
        "Die Falle: als und wie",
        ["*Er ist größer wie ich.*", "Richtig: *Er ist größer **als** ich.*", "Das ist ein **Grammatikfehler**."],
        "Nach einer Steigerungsform wie größer, schneller oder besser steht als. Das Wort wie steht nur, wenn zwei Dinge gleich sind: so groß wie ich. Beide Wörter sind richtig geschrieben. Falsch ist, dass an dieser Stelle das falsche von beiden steht.",
      ),
      b(
        "Jetzt du: G oder A?",
        "Tipp bei jedem Satz auf die richtige Fehlerart.",
        "Frag dich bei jedem Satz: Hat ein Wort die falsche Form, oder passt ein Wort nicht in einen sachlichen Text?",
        {
          tasks: [
            k("Ich habe ein neuen Computer. Der Fehler ist ein ___.", "Grammatikfehler", ["Ausdrucksfehler"], "Es muss einen heißen. Die Form des Wortes passt nicht zu seiner Stelle im Satz.", "Wen oder was habe ich? Welche Form muss das Wort dann haben?"),
            k("Die Umwelt ist halt wichtig. Der Fehler ist ein ___.", "Ausdrucksfehler", ["Grammatikfehler"], "Das Wort halt ist ein Füllwort der Umgangssprache.", "Welches Wort kannst du streichen, ohne dass sich der Sinn ändert?"),
            k("Sie hat den Brief geschreibt. Der Fehler ist ein ___.", "Grammatikfehler", ["Rechtschreibfehler"], "Die Form des Verbs ist falsch gebildet. Richtig heißt es geschrieben.", "Ist das Wort nur falsch geschrieben, oder ist die Form des Verbs falsch gebildet?"),
          ],
        },
      ),
    ),
    ch(
      "Alle vier unterscheiden",
      b(
        "Vier Fragen in fester Reihenfolge",
        ["(1) Ist ein Wort **falsch geschrieben**? Dann R.", "(2) **Fehlt** ein Satzzeichen, oder steht eins zu viel? Dann Z.", "(3) Hat ein Wort die **falsche Form**? Dann G.", "(4) **Passt** ein Wort nicht in einen sachlichen Text? Dann A."],
        "Geh bei jedem markierten Fehler diese vier Fragen durch. Die Reihenfolge hilft dir, denn sie geht vom Sichtbaren zum Feinen. Zuerst schaust du auf Buchstaben und Zeichen. Danach auf die Form der Wörter. Erst zum Schluss fragst du, ob ein Wort unpassend ist.",
      ),
      b(
        "Ein Satz mit drei Fehlern",
        ["*Naturreservate sind voll wichtig weil sie die Tiere schützt.*", L("*voll*: Ausdrucksfehler", "kein Komma vor *weil*: Zeichensetzungsfehler", "*schützt* statt schützen: Grammatikfehler")],
        "Ich gehe den Satz für dich durch. Alle Wörter sind richtig geschrieben, es gibt also kein R. Vor weil fehlt ein Komma, das ist Z. Sie meint die Reservate in der Mehrzahl, also muss es schützen heißen, das ist G. Und voll ist Umgangssprache, das ist A.",
      ),
      b(
        "Jetzt du: alle vier gemischt",
        "Tipp bei jedem Satz auf die richtige Fehlerart.",
        "Jetzt kommen alle vier Arten vor. Geh die vier Fragen der Reihe nach durch. In jedem Satz steckt genau ein Fehler.",
        {
          tasks: [
            k("Das Wetter war gestern sehr schön aber kalt. Der Fehler ist ein ___.", "Zeichensetzungsfehler", ["Grammatikfehler"], "Vor aber fehlt ein Komma. Alle Wörter sind richtig.", "Sind alle Wörter richtig geschrieben und richtig geformt? Was fehlt vor aber?"),
            k("Wegen dem Stau kamen wir zu spät. Der Fehler ist ein ___.", "Grammatikfehler", ["Ausdrucksfehler"], "Nach wegen steht der Genitiv: wegen des Staus. Der Fall ist falsch.", "Welcher Fall steht nach dem Wort wegen?"),
            k("Die Lehrerin erklärte uns die aufgabe. Der Fehler ist ein ___.", "Rechtschreibfehler", ["Zeichensetzungsfehler"], "Aufgabe ist ein Nomen und wird großgeschrieben.", "Welches Wort ist ein Nomen und beginnt trotzdem mit einem kleinen Buchstaben?"),
          ],
        },
      ),
      b(
        "Jetzt du: verbessern",
        "Tipp bei jedem Satz auf die richtige Verbesserung.",
        "Jetzt verbesserst du die Fehler. Überleg zuerst, welche Art von Fehler es ist. Dann weißt du auch, was du ändern musst.",
        {
          tasks: [
            k("Ich habe kein Bock auf Mathe. Besser: Ich habe keine ___ auf Mathe.", "Lust", ["Böcke"], "Bock ist Umgangssprache. Das sachliche Wort bedeutet dasselbe.", "Welches sachliche Wort bedeutet dasselbe wie das lockere Wort?"),
            k("Er hat den Zug verpasst weil er verschlafen hat. Das Komma gehört vor ___.", "weil", ["er"], "Mit weil beginnt der Nebensatz. Davor steht ein Komma.", "Mit welchem Wort beginnt der zweite Teil des Satzes?"),
            k("Sie ist schneller wie ihr Bruder. Richtig: Sie ist schneller ___ ihr Bruder.", "als", ["so wie"], "Nach einer Steigerungsform steht dieses Wort.", "Welches Wort steht nach größer, schneller und besser?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**R**: Ein Wort ist falsch geschrieben.", "**Z**: Ein Satzzeichen fehlt oder ist zu viel.", "**G**: Ein Wort hat die falsche Form.", "**A**: Ein Wort passt nicht in einen sachlichen Text.")],
        "Das sind die vier Fehlerarten mit ihren Fragen. Benutze sie auch für deine eigenen Texte. Lies deinen Aufsatz am Ende viermal durch, jedes Mal mit einer der vier Fragen im Kopf. Gleich kommen die Wörter und das Quiz.",
        { tasks: [k("das statt dass zu schreiben ist ein ___.", "Rechtschreibfehler", ["Grammatikfehler"], "Die Verwechslung von einem und zwei s zählt zur Rechtschreibung.", "Wie wurde diese Verwechslung auf der Tafel mit der Falle eingeordnet?")] },
      ),
    ),
  ],
  [
    v("Rechtschreibfehler", "Ein Wort ist falsch geschrieben. Auch groß und klein sowie das und dass gehören dazu.", "warscheinlich, Strasse"),
    v("Zeichensetzungsfehler", "Ein Satzzeichen fehlt oder steht zu viel da.", "Ich glaube dass er kommt."),
    v("Grammatikfehler", "Ein Wort hat die falsche Form: falscher Fall, falsche Verbform, oder Subjekt und Verb passen nicht.", "ein Film, gefangt, die Kinder spielt"),
    v("Ausdrucksfehler", "Ein Wort passt nicht in einen sachlichen Text, zum Beispiel Umgangssprache oder ein Füllwort.", "voll gut, halt"),
  ],
  [
    q("Er hat den Hund gefüttern. Welche Fehlerart ist das?", "Grammatikfehler", ["Rechtschreibfehler", "Zeichensetzungsfehler", "Ausdrucksfehler"], "Die Form des Verbs ist falsch gebildet. Richtig heißt es gefüttert."),
    q("Wir essen Brot Käse und Tomaten. Welche Fehlerart ist das?", "Zeichensetzungsfehler", ["Rechtschreibfehler", "Grammatikfehler", "Ausdrucksfehler"], "Zwischen Brot und Käse fehlt das Komma der Aufzählung. Alle Wörter sind richtig."),
    q("Das Konzert war voll cool. Welche Fehlerart ist das?", "Ausdrucksfehler", ["Rechtschreibfehler", "Grammatikfehler", "Zeichensetzungsfehler"], "Voll und cool gehören zur Umgangssprache. In einem sachlichen Text passen sie nicht."),
    q("Ich glaube, das er recht hat. Welche Fehlerart ist das?", "Rechtschreibfehler", ["Grammatikfehler", "Zeichensetzungsfehler", "Ausdrucksfehler"], "Es muss dass heißen. Die Verwechslung von einem und zwei s zählt zur Rechtschreibung."),
    q("Mein Bruder ist älter wie ich. Welche Fehlerart ist das?", "Grammatikfehler", ["Ausdrucksfehler", "Rechtschreibfehler", "Zeichensetzungsfehler"], "Nach einer Steigerungsform steht als. Beide Wörter sind richtig geschrieben, aber hier steht das falsche."),
    q("Mit welcher Frage findest du einen Ausdrucksfehler?", "Passt das Wort in einen sachlichen Text?", ["Ist das Wort richtig geschrieben?", "Fehlt ein Komma?", "Steht das Verb am Ende?"], "Beim Ausdruck geht es um die Wahl der Wörter. Umgangssprache und Füllwörter passen nicht."),
    q("Die schüler lernen für die Prüfung. Welche Fehlerart ist das?", "Rechtschreibfehler", ["Grammatikfehler", "Ausdrucksfehler", "Zeichensetzungsfehler"], "Schüler ist ein Nomen und muss großgeschrieben werden. Groß und klein gehört zur Rechtschreibung."),
    q("Wegen den Hausaufgaben hatte ich keine Zeit. Welche Fehlerart ist das?", "Grammatikfehler", ["Rechtschreibfehler", "Ausdrucksfehler", "Zeichensetzungsfehler"], "Nach wegen steht der Genitiv: wegen der Hausaufgaben. Der Fall ist falsch."),
  ],
);
