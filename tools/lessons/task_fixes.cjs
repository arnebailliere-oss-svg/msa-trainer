// Replaces tap tasks that only asked the student to repeat the rule on the board
// ("Für jede Frage schreibst du ___") by tasks that use the rule on a new example.
// Found by reading all 887 tasks (2026-11-16). The fix is made in the lesson sources:
// each entry names a unique piece of the old task text and gives the new task.
// Run with --dry to list what would change. Afterwards the changed sources are re-run.
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const DIR = __dirname;
const DRY = process.argv.includes("--dry");

// [unique piece of the old task text as written in the source, [text, correct, [wrong...], why, hint]]
const FIXES = [
  // ---------------- English ----------------
  ["had left liegt auf dem Zeitstrahl", ["When I arrived, the bus ___. (Der Bus war da schon weg.)", "had left", ["leaves"], "Der Bus fuhr ab, bevor ich ankam. Für das, was noch früher war, steht had mit der 3. Form.", "Was passierte zuerst: die Abfahrt oder meine Ankunft? Such die Zeile für noch früher."]],
  ["Du beantwortest nur zwei der drei Fragen", ["Emma schreibt: When do you get up? What do you eat for breakfast? Wie viele Antworten braucht deine E-Mail? ___", "zwei", ["eine"], "In Emmas Text stehen zwei Fragezeichen. Jede Frage braucht ihre eigene Antwort.", "Zähl einmal die Fragezeichen in Emmas Text."]],
  ["Für jede Frage schreibst du ___", ["Emma stellt in ihrer E-Mail drei Fragen. Dein Hauptteil hat dann ___.", "drei Absätze", ["einen langen Absatz"], "Jede Frage bekommt ihren eigenen Absatz. Bei drei Fragen sind das drei.", "Wie viele Fragen sind es? Jede bekommt ihren eigenen Platz."]],
  ["Womit fängst du an, bevor du schreibst", ["Dein Text ist fertig. Emma hat drei Fragen gestellt, du hast zwei Absätze geschrieben. Was ist passiert? ___", "Eine Frage ist noch nicht beantwortet.", ["Der Text ist zu lang."], "Für jede Frage gibt es einen Absatz. Bei drei Fragen und zwei Absätzen fehlt eine Antwort.", "Vergleich die Zahl der Fragen mit der Zahl der Absätze."]],
  ["Der wichtigste Baustein nach der Meinung", ["I think school uniforms are a good idea. Was fehlt diesem Satz noch? ___", "ein Grund mit because", ["eine Anrede"], "Die Meinung steht schon da. Ohne Begründung bleibt sie eine bloße Behauptung.", "Schau auf Punkt zwei der Checkliste. Was gehört zu jeder Meinung?"]],
  ["Die Aufgabe sagt 30 to 50 words", ["I think they are having a great day. Zu welchem Schritt gehört dieser Satz? ___", "zu Schritt 3", ["zu Schritt 1"], "I think leitet einen Gedanken ein. Das ist der dritte Schritt.", "Sagt der Satz, was zu sehen ist, oder was der Schreiber denkt?"]],
  ["Bei der Mediation gibst du ___ weiter", ["Es regnet in Strömen. Welcher englische Satz gibt den Sinn wieder? ___", "It is raining very hard.", ["It is raining in streams."], "Wort für Wort ergibt das Bild auf Englisch keinen Sinn. Gemeint ist: Es regnet sehr stark.", "Was ist mit dem Bild gemeint? Sag es zuerst in einfachem Deutsch."]],
  ['"Was machst du zuerst? ___"', ["In der Aufgabe steht: Tell your friend when the café is open and what it costs. Wie viele Punkte musst du nennen? ___", "zwei", ["alle aus dem Text"], "Die Aufgabe nennt zwei Dinge: die Öffnungszeiten und den Preis.", "Lies den englischen Satz genau. Nach welchen Dingen fragt er?"]],
  ["Ein Wort im Artikel kennst du nicht. Das ist", ["Frage: When does the shop open? Im Text steht: The shop, a charming old building, opens at nine. Du kennst charming nicht. Findest du die Antwort trotzdem? ___", "Ja, sie steht bei opens at nine.", ["Nein, ohne das Wort geht es nicht."], "Die Frage will eine Uhrzeit. Die steht am Ende des Satzes, und das unbekannte Wort brauchst du dafür nicht.", "Wonach fragt die Frage? Such im Satz nur diese eine Angabe."]],
  ["Was machst du in der Prüfung zuerst", ["Zwei Angebote bleiben übrig. In Angebot A steht: adults only. Die Person ist 15. Du wählst ___.", "das andere Angebot", ["Angebot A"], "Adults only heißt nur für Erwachsene. Mit 15 darf die Person dort nicht teilnehmen.", "Was bedeutet adults only? Passt das zu einem Alter von 15?"]],
  ["Du verstehst ein Wort nicht. Du ___", ["Du hörst: The express train to Leeds leaves at ten. Die Frage lautet: When does the train leave? Musst du express verstehen? ___", "Nein, gefragt ist nur die Uhrzeit.", ["Ja, sonst fehlt die Antwort."], "Die Frage will wissen, wann der Zug fährt. Das sagt at ten, und dafür brauchst du das andere Wort nicht.", "Wonach fragt die Frage? Welche Stelle im Satz antwortet darauf?"]],
  // the board title named only the answer
  ["Mein Vater arbeitet in einer Bank", ["Mein Vater arbeitet in einer Bank. Das gilt ___.", "an jedem Arbeitstag", ["nur in diesem Moment"], "Das ist sein Beruf. Es gilt an jedem Arbeitstag, nicht nur heute.", "Ist das sein Beruf, oder macht er das nur in diesem einen Moment?"]],
  ["She ___ call you tomorrow", ["She ___ you tomorrow.", "will call", ["wills call"], "Will bekommt nie ein s, auch nicht bei she. Dahinter steht die Grundform.", "Verändert sich das erste Wort bei he, she, it? Schau in die erste Zeile der Tafel."]],
  ["Tomorrow is Sunday. You ___ get up early", ["Tomorrow is Sunday. You ___ early.", "don't have to get up", ["must not get up"], "Am Sonntag ist frühes Aufstehen nicht nötig. Verboten ist es aber nicht.", "Ist frühes Aufstehen am Sonntag verboten, oder ist es nur nicht nötig?"]],
  ["You look tired. You ___ go to bed", ["You look tired. You ___ to bed.", "should go", ["must not go"], "Wer müde aussieht, bekommt einen Rat: Geh lieber ins Bett.", "Wird hier etwas verboten, oder gibt jemand einen freundlichen Rat?"]],
  ["If I ___ rich, I would travel", ["If I ___, I would travel.", "were rich", ["am rich"], "Der Satz ist nur vorgestellt. Nach if steht dann were für alle Personen.", "Ist der Sprecher wirklich reich? Welche Form steht dann nach if?"]],
  ["My brother is older ___ me", ["My brother is ___ me.", "older than", ["older then", "older as"], "Nach einem Komparativ steht das Wort für als, geschrieben mit a.", "Welches der Wörter bedeutet als? Achte auf den Buchstaben in der Mitte."]],

  // ---------------- German ----------------
  ["Im Hauptsatz steht das Verb an ___ Stelle", ["Morgen | ___ | wir ins Kino. Welches Wort gehört an die zweite Stelle?", "gehen", ["wir"], "Im Hauptsatz steht das Verb an zweiter Stelle, auch wenn vorn Morgen steht.", "Welches der beiden Wörter sagt, was geschieht?"]],
  ["Woran erkennst du einen Nebensatz am sichersten", ["weil sie den Bus verpasst hat: Das ist ___.", "ein Nebensatz", ["ein Hauptsatz"], "Das Verb hat steht ganz am Ende, und der Teil kann nicht allein stehen.", "Wo steht das Verb hat: an zweiter Stelle oder am Ende?"]],
  ["Ich gehe raus, wenn die Sonne scheint. Der Satz hat", ["Ich gehe raus, wenn die Sonne scheint. Der Satz hat ___.", "zwei Teilsätze", ["drei Teilsätze"], "Der Satz hat zwei Verben, gehe und scheint. Zu jedem Verb gehört ein Teilsatz.", "Zähl die Verben im Satz. Wie viele findest du?"]],
  ["Ein Komma setzt du, ___", ["Meine kleine Schwester und ihr bester Freund aus dem Kindergarten spielen im Garten. Beim Vorlesen holst du nach Kindergarten Luft. Steht dort ein Komma? ___", "Nein", ["Ja"], "Eine Atempause ist kein Grund für ein Komma. Hier verlangt keine Regel eines.", "Gibt es hier eine Regel, die ein Komma verlangt, oder nur eine Pause?"]],
  ["Ein Nebensatz steht mitten im Hauptsatz. Er bekommt", ["Das Buch das ich gerade lese ist spannend. In diesem Satz fehlen ___.", "zwei Kommas", ["ein Komma"], "Der Nebensatz das ich gerade lese steht mitten im Hauptsatz. Er bekommt vorn und hinten ein Komma.", "Wo beginnt der eingeschobene Teil, und wo hört er wieder auf?"]],
  ["Das Wort mit zwei s gehört zu der Wortart", ["Ich hoffe, dass du kommst. Welche Begründung stimmt? ___", "Es ist eine Konjunktion, denn weder dieses noch welches passt.", ["Es ist ein Relativpronomen, denn man kann welches einsetzen."], "Ich hoffe, welches du kommst klingt falsch. Also ist es die Konjunktion mit zwei s.", "Setz probeweise dieses und welches ein. Klingt der Satz dann noch richtig?"]],
  ["Nach einem langen Vokal schreibst du", ["Wald oder Walt? Welche Strategie hilft? ___", "verlängern: die Wälder", ["in Silben sprechen"], "In Wälder hörst du das d deutlich. Am Wortende klingt es wie ein t.", "Welcher Buchstabe ist unsicher, und wo steht er im Wort?"]],
  ["Mit welcher Probe erkennst du ein Adjektiv", ["Der Zug ist schnell. Du kannst sagen: schnell, schneller, am schnellsten. Das Wort schnell ist also ___.", "ein Adjektiv", ["ein Nomen"], "Ein Wort, das du steigern kannst, gehört zu dieser Wortart.", "Welche Wortart kannst du steigern? Schau in die dritte Zeile der Tafel."]],
  ["Vor welchen Konjunktionen steht ein Komma", ["Wir bleiben zu Hause, weil es regnet. Das Wort weil ist ___.", "eine Konjunktion", ["eine Präposition"], "Weil verbindet zwei Sätze miteinander. Eine Präposition stünde vor einem Nomen.", "Verbindet das Wort zwei Sätze, oder steht es vor einem Nomen?"]],
  ["Mit der Frage Wem? findest du den", ["Ich helfe meinem Bruder. Meinem Bruder steht im ___.", "Dativ", ["Akkusativ"], "Du fragst: Wem helfe ich? Die Frage Wem gehört zu diesem Fall.", "Mit welcher Frage findest du meinem Bruder: Wem oder Wen?"]],
  ["Womit fängst du an, wenn du einen Satz zerlegst", ["Gestern hat Tom seiner Schwester ein Eis gekauft. Du suchst zuerst das Prädikat. Es heißt: ___", "hat gekauft", ["Gestern"], "Das Prädikat sagt, was geschieht. Hier besteht es aus zwei Teilen.", "Welche Wörter sagen, was geschieht? Es sind zwei."]],
  ["Ein Stilmittel verändert vor allem", ["Welche Überschrift fällt mehr auf? ___", "Die Stadt schläft nie", ["Die Stadt ist nachts belebt"], "Eine Stadt kann nicht schlafen. Das Bild macht den Satz auffällig, und genau das tut ein Stilmittel.", "In welchem Satz tut ein Ding etwas, das eigentlich nur Menschen tun?"]],
  ["Woran erkennst du einen Vergleich sicher", ["Die Zeit rennt. Das ist ___.", "eine Personifikation", ["ein Vergleich"], "Die Zeit handelt hier wie ein Mensch. Das Wort wie kommt im Satz nicht vor.", "Kann die Zeit wirklich rennen? Wer kann das sonst?"]],
  ["Eine Steigerung in Stufen heißt ___", ["Ich kam, ich sah, ich siegte. Das ist ___.", "eine Klimax", ["eine Ellipse"], "Die drei Teile steigern sich von Stufe zu Stufe bis zum Sieg.", "Wird der Satz von Teil zu Teil stärker, oder fehlt ein Wort?"]],
  ["Eine Bewerbung schreibst du in", ["Ich hab voll Bock auf den Job. Passt dieser Satz in eine Bewerbung? ___", "Nein, er ist Umgangssprache.", ["Ja, er klingt freundlich."], "Hab, voll und Bock sind locker. Eine Bewerbung verlangt Standardsprache.", "Würdest du so mit der Chefin einer Firma sprechen?"]],
  ["Beim Umformen in Standardsprache ändert sich", ["Das Konzert war mega laut. Welche Umformung ist richtig? ___", "Das Konzert war sehr laut.", ["Das Konzert war sehr laut und schlecht."], "Nur das lockere Wort wird ersetzt. Über schlecht sagt der erste Satz nichts.", "In welchem Satz ist etwas dazugekommen, das vorher nicht dastand?"]],
  ["Woran erkennst du ein Füllwort", ["Das ist ja eigentlich ganz einfach. Welches Wort kannst du streichen, ohne dass sich der Sinn ändert? ___", "eigentlich", ["einfach"], "Ohne eigentlich sagt der Satz dasselbe. Ohne einfach fehlt die Aussage.", "Lies den Satz zweimal, jedes Mal ohne eines der beiden Wörter."]],
  ["Wir gehen heute schwimen. Der Fehler", ["Wir gehen heute schwimen. Richtig geschrieben heißt das Wort ___.", "schwimmen", ["schwiemen"], "Das i ist kurz. Deshalb wird das m verdoppelt.", "Sprich das Wort in Silben. Wie oft hörst du das m?"]],
  ["Wir bleiben hier weil es regnet. Der Fehler", ["Wir bleiben hier weil es regnet. Das fehlende Komma gehört vor das Wort ___.", "weil", ["hier"], "Mit diesem Wort beginnt der Nebensatz. An der Grenze steht das Komma.", "Mit welchem Wort beginnt hier der Nebensatz?"]],
  ["Meine Freunde kommt morgen. Der Fehler", ["Meine Freunde kommt morgen. Richtig heißt es: Meine Freunde ___ morgen.", "kommen", ["kamen"], "Freunde sind mehrere. Dazu passt die Verbform für die Mehrzahl.", "Sind die Freunde einer oder mehrere? Welche Form passt dazu?"]],
  ["Der Roman ist mega spannend. Der Fehler", ["Der Roman ist mega spannend. In einem sachlichen Text schreibst du: Der Roman ist ___ spannend.", "sehr", ["voll"], "Mega und voll sind Umgangssprache. In einen sachlichen Text passt das neutrale Wort.", "Welches der beiden Wörter würdest du in einer Bewerbung schreiben?"]],
  ["In welchem Teil sagst du deine eigene Meinung", ["Ein Vorteil ist, dass die Schüler ausgeschlafen sind. Der Satz gehört ___.", "in den Hauptteil", ["in den Schluss"], "Der Satz nennt etwas, das dafür spricht. Solche Sätze stehen im Hauptteil.", "Nennt der Satz einen Grund, oder sagt er die eigene Meinung?"]],
  ["Dein stärkstes Argument steht in der Reihe", ["Drei Argumente für Schulkleidung: (a) Sie sieht ordentlich aus. (b) Niemand wird wegen seiner Kleidung ausgegrenzt. (c) Morgens geht das Anziehen schneller. Welches kommt zuletzt? ___", "(b)", ["(c)"], "Dass niemand ausgegrenzt wird, wiegt am schwersten. Das stärkste Argument steht am Ende.", "Welches der drei Argumente ist für die Schüler das wichtigste?"]],
  ["Womit beginnst du in der Prüfung", ["Im Hauptteil steht: Ich finde, das Handyverbot ist richtig. Was ist hier falsch? ___", "Die eigene Meinung steht zu früh.", ["Der Satz ist zu kurz."], "Die eigene Meinung kommt erst im Schluss. Im Hauptteil stehen nur die Argumente.", "Schau auf Punkt vier der Tafel. Wo hat die Meinung ihren Platz?"]],
  ["Was liest du bei einer Leseaufgabe zuerst", ["Frage: Wie viele Schulen nehmen an dem Projekt teil? Du suchst im Text nach ___.", "einer Zahl", ["einem Grund"], "Wie viele fragt nach einer Anzahl. Also suchst du im Text eine Zahl.", "Welche Art von Antwort verlangen die Wörter wie viele?"]],
  ["Text: Der Versuch dauerte zwei Wochen", ["Text: Der Versuch dauerte zwei Wochen. Aussage: Der Versuch dauerte zwei Monate. Die Aussage ___.", "widerspricht dem Text", ["steht so im Text"], "Der Text nennt Wochen, die Aussage nennt Monate. Sie sagt also etwas anderes als der Text.", "Halte die beiden Zeitangaben nebeneinander. Sind sie gleich?"]],
  ["Du suchst und findest im Text keine Stelle zu einer Aussage. Du kreuzt an", ["Text: Die Schule hat 600 Schüler. Aussage: Die Schule hat 40 Lehrkräfte. Die Aussage ist ___.", "nicht im Text zu finden", ["falsch"], "Über die Lehrkräfte sagt der Text nichts. Falsch wäre die Aussage nur, wenn der Text etwas anderes sagte.", "Sagt der Text überhaupt irgendetwas über die Lehrkräfte?"]],
  ["Eine Zahl aus einer Umfrage ist in einem Text meistens", ["In einer Umfrage sagten 7 von 10 Schülern, sie seien morgens müde. Das ist ___.", "ein Beispiel", ["eine These"], "Eine Zahl aus einer Umfrage ist ein bestimmter Fall. Sie stützt ein Argument.", "Ist das ein Standpunkt oder ein bestimmter Fall mit einer Zahl?"]],
  ["Allerdings kostet Schulkleidung die Eltern Geld", ["Allerdings kostet Schulkleidung die Eltern Geld. Dieser Satz spricht ___.", "dagegen", ["dafür"], "Allerdings kündigt die Gegenseite an, und hohe Kosten sind ein Nachteil.", "Ist es gut oder schlecht, wenn etwas die Eltern Geld kostet?"]],
  ["Welches Wort kündigt die Gegenseite an", ["Schulkleidung spart morgens Zeit. ___ ist sie für viele Familien teuer. Welches Wort passt?", "Allerdings", ["Denn"], "Der zweite Satz spricht dagegen. Dieses Wort kündigt den Wechsel zur Gegenseite an.", "Spricht der zweite Satz dafür oder dagegen? Welches Wort zeigt einen Wechsel?"]],
  ["Welche Zeitform steht in Märchen und Erzählungen", ["Es war einmal ein König, der ___ in einem Schloss.", "lebte", ["hat gelebt"], "Märchen und Erzählungen stehen im Präteritum. Das ist hier die Form mit -te.", "Welche der beiden Formen klingt nach einem Märchen?"]],
  ["Ich hätte gern eine Pizza", ["Ich hätte gern eine Pizza. Der Sprecher ___.", "äußert höflich einen Wunsch", ["gibt einen Befehl"], "Hätte gern ist die höfliche Form für einen Wunsch. Ein Befehl klänge anders.", "Klingt der Satz höflich oder wie ein Kommando?"]],
  ["Woran erkennst du den Konjunktiv II am leichtesten", ["Wenn ich reich wäre, würde ich ein Boot kaufen. Der Sprecher ist ___.", "nicht reich", ["reich"], "Wäre und würde zeigen: Das ist nur vorgestellt. In Wirklichkeit ist es anders.", "Was zeigen die Wörter wäre und würde: Wirklichkeit oder Vorstellung?"]],
  ["Woran erkennst du das Partizip I", ["das lachende Kind: Lacht das Kind in diesem Moment, oder ist es schon fertig? ___", "Es lacht gerade.", ["Es hat aufgehört."], "Lachend ist ein Partizip I. Es zeigt, dass etwas gerade geschieht.", "Schau auf die Endung des Wortes. Was sagt Punkt eins der Tafel dazu?"]],
  ["Woran erkennst du das Passiv? ___", ["Die Fenster wurden geputzt. Wer hat geputzt? ___", "Das sagt der Satz nicht.", ["die Fenster"], "Im Passiv geschieht etwas mit dem Subjekt. Wer es tut, kann fehlen.", "Tun die Fenster selbst etwas, oder geschieht etwas mit ihnen?"]],
  ["In der indirekten Rede stehen", ["Welcher Satz enthält keine direkte Rede? ___", "Lea sagt, sie komme später.", ["Lea sagt: „Ich komme später.“"], "In diesem Satz fehlen Doppelpunkt und Anführungszeichen. Leas Worte werden nur wiedergegeben.", "In welchem Satz stehen Anführungszeichen? Der andere ist gesucht."]],
  ["Welches Zeichen steht in der indirekten Rede nach dem Begleitsatz", ["Jan sagt: „Ich habe Hunger.“ Indirekt: ___", "Jan sagt, er habe Hunger.", ["Jan sagt, ich habe Hunger."], "Aus ich wird er, und das Verb steht im Konjunktiv I.", "Wer hat Hunger? Welches Wort muss deshalb für ich stehen?"]],
  ["Eine Zusammenfassung enthält", ["Welcher Satz fasst zusammen? ___", "Der Text beschreibt, wie eine Klasse ein Schulfest plant.", ["Zuerst kauft Ben Luftballons, dann bläst Mia sie auf."], "Dieser Satz gilt für den ganzen Text. Der andere erzählt nur eine Einzelheit nach.", "Welcher Satz gilt für den ganzen Text und nicht nur für einen Moment?"]],
  ["Was gehört in den ersten Satz einer Zusammenfassung", ["Der Text handelt von Müll im Meer. Was fehlt in diesem ersten Satz? ___", "Textart und Titel", ["die eigene Meinung"], "Der erste Satz nennt Textart, Titel und Kernaussage. Hier steht nur die Kernaussage.", "Halte den Satz neben die erste Zeile der Tafel. Was steht schon da?"]],

  // ---------------- Maths ----------------
  ["Das Gleichheitszeichen sagt: Links und rechts steht", ["$7 + 3 = $ ___ $+ 4$. Welche Zahl gehört in die Lücke?", "6", ["10"], "Links steht 10. Rechts muss auch 10 herauskommen, und 6 plus 4 ergibt 10.", "Rechne die linke Seite aus. Was fehlt rechts bis zu diesem Wert?"]],
  ["Bei Plus und Mal darfst du ___", ["$7 \\cdot 4$ ist dasselbe wie ___.", "$4 \\cdot 7$", ["$7 + 4$"], "Bei Mal darfst du die Reihenfolge tauschen. Beide Male kommt 28 heraus.", "Rechne beide Möglichkeiten aus. Welche ergibt auch 28?"]],
  ["Der Teil vom Ganzen heißt", ["Von 30 Schülern kommen 12 mit dem Bus. Die 12 ist der ___.", "Prozentwert", ["Grundwert"], "Die 12 Schüler sind ein Teil von allen. Der Teil hat diesen Namen.", "Ist die 12 das Ganze oder nur ein Teil davon?"]],
  ["Zwei verschiedene Wege passen zu deinem Ereignis", ["Weg 1 hat $\\frac{2}{10}$, Weg 2 hat $\\frac{3}{10}$. Beide passen zu deinem Ereignis. Zusammen sind das ___.", "$\\frac{5}{10}$", ["$\\frac{6}{100}$"], "Mehrere passende Wege werden zusammengezählt: 2 Zehntel plus 3 Zehntel.", "Wird das Ereignis wahrscheinlicher oder seltener, wenn zwei Wege dazu passen?"]],
  ["Für den Median musst du die Werte zuerst", ["Der Median von 9, 1, 5 ist ___.", "5", ["1"], "Sortiert heißt die Liste 1, 5, 9. In der Mitte steht die 5.", "Sortier die drei Zahlen zuerst der Größe nach."]],
  ["Das Bild einer Funktion im Koordinatensystem heißt", ["Zu $x = 3$ gehört in der Tabelle $y = 7$. Welcher Punkt liegt also auf dem Graphen? ___", "$(3\\,|\\,7)$", ["$(7\\,|\\,3)$"], "Jedes Paar aus der Tabelle ist ein Punkt. Die erste Zahl ist das x, die zweite das y.", "Welche Zahl steht im Punkt vorn: das x oder das y?"]],
  ["steht das $m$ für ___", ["$y = 5x + 2$. Hier ist $m = $ ___", "5", ["2"], "Das m ist die Zahl vor dem x. Hier ist das die 5.", "Welche Zahl steht in der Gleichung direkt vor dem x?"]],
  ["Für die Nullstelle setzt du ___", ["Nullstelle von $y = x - 4$: Aus $x - 4 = 0$ folgt $x = $ ___", "4", ["$-4$"], "Auf beiden Seiten plus 4 ergibt x gleich 4. Dort schneidet die Gerade die x-Achse.", "Welche Rechnung macht aus minus 4 eine Null?"]],
  ["Die Vorsilbe kilo bedeutet", ["$3\\ \\text{km} = $ ___", "3000 m", ["300 m"], "Kilo heißt tausend. 3 mal 1000 ergibt 3000.", "Schau in die erste Zeile der Tafel. Was bedeutet die Vorsilbe?"]],
  ["Die längste Seite liegt ___ vom rechten Winkel", ["Ein Dreieck hat die Seiten 6 cm, 8 cm und 10 cm und einen rechten Winkel. Gegenüber vom rechten Winkel liegt die Seite mit ___.", "10 cm", ["6 cm"], "Gegenüber vom rechten Winkel liegt immer die längste Seite.", "Welche der drei Seiten ist die längste?"]],
  ["Die beiden Seiten am rechten Winkel heißen", ["Ein rechtwinkliges Dreieck hat die Seiten 3 cm, 4 cm und 5 cm. Die Hypotenuse ist ___ lang.", "5 cm", ["3 cm"], "Die Hypotenuse ist immer die längste Seite. Die beiden kürzeren sind die Katheten.", "Welche der drei Seiten ist die längste?"]],
  ["Du kennst die Hypotenuse und suchst eine Kathete", ["$c = 10$ und $a = 6$, gesucht ist $b$. Unter der Wurzel steht ___.", "$100 - 36$", ["$100 + 36$"], "Gesucht ist eine Kathete. Dann wird das Quadrat der bekannten Kathete abgezogen.", "Ist die gesuchte Seite kürzer als die Hypotenuse? Was folgt daraus?"]],
  ["alpha$ ist ___.", ["Die Ankathete ist 3 cm lang, die Hypotenuse 5 cm. Dann ist $\\cos\\alpha = $ ___", "$\\frac{3}{5}$", ["$\\frac{5}{3}$"], "Beim Kosinus steht die Ankathete oben und die Hypotenuse unten.", "Welche der beiden Seiten steht beim Kosinus oben im Bruch?"]],
  ["Aus dem Bruch wieder den Winkel machen", ["$\\sin\\alpha = 0{,}5$. Du tippst $\\sin^{-1}(0{,}5)$ ein. Der Taschenrechner zeigt ___.", "30°", ["0,5°"], "Die Taste macht aus dem Bruch den Winkel. Zum Wert 0,5 gehört beim Sinus der Winkel 30 Grad.", "Schau auf die letzte Zeile der Tafel. Welcher Winkel steht dort?"]],
  ["Im Merkwort steht für tan", ["Die Gegenkathete ist 4 cm lang, die Ankathete 8 cm. Dann ist $\\tan\\alpha = $ ___", "$\\frac{4}{8}$", ["$\\frac{8}{4}$"], "Beim Tangens steht G oben und A unten, also Gegenkathete durch Ankathete.", "Schau ins Merkwort. Welcher Buchstabe steht bei tan zuerst?"]],
  ["Die Oberfläche wird gemessen in", ["Ein Würfel hat 6 gleiche Seiten. Jede ist $4\\ \\text{cm}^2$ groß. Seine Oberfläche ist ___.", "$24\\ \\text{cm}^2$", ["$24\\ \\text{cm}^3$"], "Sechs Flächen mit je 4 Quadratzentimetern ergeben 24. Es bleibt eine Fläche, also Quadratzentimeter.", "Rechne 6 mal 4. Welche kleine Hochzahl gehört zu einer Fläche?"]],
  ["Das abgerollte Etikett einer Dose ist", ["Eine Dose hat den Umfang 20 cm und die Höhe 10 cm. Ihr Mantel ist ___ groß.", "$200\\ \\text{cm}^2$", ["$30\\ \\text{cm}^2$"], "Abgerollt ist der Mantel ein Rechteck. Du rechnest Umfang mal Höhe, also 20 mal 10.", "Das abgerollte Etikett ist ein Rechteck. Wie berechnest du dessen Fläche?"]],
  ["In der Formel für das Volumen der Kugel steht", ["Du suchst das Volumen einer Kugel. Welche Zeile vom Formelblatt nimmst du? ___", "$V = \\frac{4}{3} \\cdot \\pi \\cdot r^3$", ["$O = 4 \\cdot \\pi \\cdot r^2$"], "Das Volumen hat den Buchstaben V, und in seiner Formel steht r hoch 3.", "Mit welchem Buchstaben wird das Volumen abgekürzt?"]],
  ["Mit (II) ist ___ gemeint", ["(I) $x + y = 7$ und (II) $x - y = 1$. In welcher Zeile wird abgezogen? ___", "in (II)", ["in (I)"], "In der zweiten Zeile steht ein Minus zwischen x und y.", "In welcher der beiden Zeilen steht ein Minuszeichen?"]],
  ["Die Lösung im Bild ist", ["Im Bild schneiden sich die beiden Geraden im Punkt $(6\\,|\\,4)$. Die Lösung des Systems ist ___.", "$x = 6$ und $y = 4$", ["$x = 4$ und $y = 6$"], "Der Schnittpunkt ist die Lösung. Die erste Zahl ist das x, die zweite das y.", "Welche Zahl steht im Punkt vorn: das x oder das y?"]],
];

// Finds the end of the call that starts at `open` (the index of "(" after k), honouring strings.
function callEnd(src, open) {
  let depth = 0;
  let quote = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error("unbalanced call");
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".cjs") && !["lib.cjs", "migrate.cjs", "task_fixes.cjs"].includes(f));
const text = Object.fromEntries(files.map((f) => [f, fs.readFileSync(path.join(DIR, f), "utf8")]));
const changed = new Set();
const problems = [];
let done = 0;
let already = 0;

for (const [piece, [t, correct, wrong, why, hint]] of FIXES) {
  const inSource = (s) => s.includes(piece) || s.includes(JSON.stringify(piece).slice(1, -1));
  const hits = files.filter((f) => inSource(text[f]));
  const fresh = `k(${[t, correct, wrong, why, hint].map((x) => JSON.stringify(x)).join(", ")})`;
  if (hits.length === 0) {
    if (files.some((f) => text[f].includes(fresh))) already++;
    else problems.push(`not found: ${piece}`);
    continue;
  }
  if (hits.length > 1) {
    problems.push(`in several files (${hits.join(", ")}): ${piece}`);
    continue;
  }
  const f = hits[0];
  const src = text[f];
  const at = src.includes(piece) ? src.indexOf(piece) : src.indexOf(JSON.stringify(piece).slice(1, -1));
  if (src.indexOf(piece, at + 1) !== -1) {
    problems.push(`twice in ${f}: ${piece}`);
    continue;
  }
  const start = src.lastIndexOf("k(", at);
  if (start === -1 || /[A-Za-z0-9_]/.test(src[start - 1] || "")) {
    problems.push(`no k( call before: ${piece} (${f})`);
    continue;
  }
  const end = callEnd(src, start + 1);
  text[f] = src.slice(0, start) + fresh + src.slice(end);
  changed.add(f);
  done++;
}

console.log(`${done} tasks replaced, ${already} already in place, ${problems.length} problems`);
for (const p of problems) console.log("  " + p);
if (DRY) process.exit(problems.length ? 1 : 0);
for (const f of changed) fs.writeFileSync(path.join(DIR, f), text[f]);
for (const f of changed) {
  const out = cp.spawnSync(process.execPath, [path.join(DIR, f)], { encoding: "utf8" });
  if (out.status !== 0) console.log(`FAILED ${f}:\n${out.stderr.slice(0, 600)}`);
}
console.log(`re-ran ${changed.size} lesson sources`);

// P_EN_VERBFORMEN has no generator; its JSON is the source. Same fix, made there directly.
{
  const file = path.join(DIR, "..", "..", "content_packs", "berlin_msa", "primers", "en_01_verbformen.json");
  const all = JSON.parse(fs.readFileSync(file, "utf8"));
  const fresh = {
    text: "Welches Wort ist eine Form von go? ___",
    choices: ["went", "want"],
    correct: "went",
    why: "Went ist die Form von go für die Vergangenheit. Want ist ein anderes Verb und bedeutet wollen.",
    hint: "Eines der beiden Wörter steht auf der Tafel. Such es dort.",
  };
  let n = 0;
  for (const p of all)
    for (const s of p.steps)
      (s.tasks || []).forEach((t, i) => {
        if (t.text.startsWith("Ein englisches Verb hat") || t.text === fresh.text) {
          s.tasks[i] = fresh;
          n++;
        }
      });
  if (n !== 1) throw new Error("en_01_verbformen.json: expected one task to replace, found " + n);
  fs.writeFileSync(file, JSON.stringify(all, null, 2) + "\n");
  console.log("en_01_verbformen.json: 1 task replaced");
}
