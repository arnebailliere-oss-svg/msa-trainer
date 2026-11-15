// Guided lesson: spelling strategies (short/long vowels, double consonants, ss/ß, lengthening, deriving, syllables, h).
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_02b_strategien.json",
  {
    id: "P_DE_STRATEGIEN",
    subject: "DE",
    title: "Richtig schreiben: die vier Strategien",
    teaser: "Wie du hörst, ob ein Laut kurz oder lang ist, wann du einen Buchstaben verdoppelst und wann du ss oder ß schreibst. Dazu die vier Strategien, nach denen die Prüfung fragt: verlängern, ableiten, in Silben sprechen und das h prüfen.",
    hook: "Niemand kann die Schreibung aller deutschen Wörter auswendig. Das muss auch niemand. Für die meisten Zweifelsfälle gibt es einen kleinen Trick, mit dem du die richtige Schreibung selbst herausfindest. Die Prüfung fragt sogar ausdrücklich nach diesen Tricks. Es sind vier, und wir lernen sie der Reihe nach.",
    outro: "Du hast jetzt vier Werkzeuge für schwierige Wörter. Du hörst, ob ein Laut kurz oder lang ist. Du verlängerst ein Wort, um sein Ende zu hören. Du suchst ein verwandtes Wort, wenn du bei ä oder äu unsicher bist. Und du sprichst in Silben, um doppelte Buchstaben und das h zu finden.",
    requires: ["P_DE_WORTARTEN"],
  },
  [
    ch(
      "Kurz oder lang?",
      b(
        "Zwei Sorten von Buchstaben",
        ["*a, e, i, o, u* und *ä, ö, ü* heißen **Vokale**.", "Alle anderen Buchstaben heißen **Konsonanten**."],
        "Bevor wir anfangen, brauchen wir zwei Wörter. Vokale sind die Laute, die du lange singen kannst: aaa, ooo, iii. In der Grundschule hießen sie Selbstlaute. Konsonanten sind alle anderen, zum Beispiel b, t, m und s. Sie hießen Mitlaute.",
      ),
      b(
        "Ein Vokal kann kurz oder lang sein",
        [L("*Ofen*: Das o ist lang.", "*offen*: Das o ist kurz.")],
        "Sprich beide Wörter laut und langsam. Beim Ofen ziehst du das o in die Länge. Bei offen ist es ganz kurz, und du springst sofort zum f. Diesen Unterschied musst du hören können, denn von ihm hängt die Schreibung ab.",
        { tasks: [k("Im Wort Mitte ist das i ___.", "kurz", ["lang"], "Du springst sofort zum t. Der Vokal wird nicht gedehnt.", "Sprich das Wort laut. Kannst du das i in die Länge ziehen, ohne dass es falsch klingt?")] },
      ),
      b(
        "Nach einem kurzen Vokal: doppelter Konsonant",
        ["*o**ff**en, Mi**tt**e, ke**nn**en, Bu**tt**er*", "Nach einem kurzen Vokal wird der Konsonant **verdoppelt**."],
        "Das ist die erste Regel. Wenn der Vokal kurz ist, schreibst du den Konsonanten danach zweimal. Der doppelte Buchstabe ist wie ein Schild für den Leser. Er sagt: Sprich den Vokal davor kurz. Ohne dieses Schild würde man offen wie Ofen lesen.",
      ),
      b(
        "Nach einem langen Vokal: nur einer",
        [L("*be**t**en*: Das e ist lang.", "*Be**tt**en*: Das e ist kurz.")],
        "Beten und Betten bestehen fast aus denselben Buchstaben. Der einzige Unterschied ist die Länge des Vokals. Beim Beten in der Kirche ist das e lang, also steht nur ein t. Bei den Betten zum Schlafen ist das e kurz, also stehen zwei.",
        { tasks: [k("Welches Wort hat einen kurzen Vokal? ___", "Betten", ["beten"], "Die beiden t zeigen an, dass das e davor kurz gesprochen wird.", "Sprich beide Wörter laut. Bei welchem springst du schnell zum t?")] },
      ),
      b(
        "Jetzt du: verdoppeln oder nicht?",
        "Sprich jedes Wort leise und tipp auf die richtige Schreibung.",
        "Hör bei jedem Wort auf den Vokal vor dem fraglichen Buchstaben. Ist er kurz, wird der Konsonant danach verdoppelt. Ist er lang, steht nur einer.",
        {
          tasks: [
            k("Wir ___ uns schon lange.", "kennen", ["kenen"], "Das e ist kurz. Danach wird der Konsonant verdoppelt.", "Ist das e in dem Wort kurz oder lang?"),
            k("Die ___ scheint.", "Sonne", ["Sone"], "Das o ist kurz. Danach wird der Konsonant verdoppelt.", "Ist das o in dem Wort kurz oder lang?"),
            k("Er hat einen ___ Hut auf.", "roten", ["rotten"], "Das o ist lang. Nach einem langen Vokal steht nur ein Konsonant.", "Kannst du das o in die Länge ziehen?"),
          ],
        },
      ),
    ),
    ch(
      "ss oder ß?",
      b(
        "Dieselbe Frage noch einmal",
        [L("*Kla**ss**e*: Das a ist kurz.", "*Stra**ß**e*: Das a ist lang.")],
        "Bei ss und ß stellst du genau dieselbe Frage wie eben. Ist der Vokal davor kurz oder lang? Sprich Klasse und Straße laut. Bei Klasse ist das a kurz, bei Straße ziehst du es in die Länge. Daran entscheidet sich die Schreibung.",
      ),
      b(
        "Die Regel",
        ["Nach einem **kurzen** Vokal steht **ss**.", "Nach einem **langen** Vokal steht **ß**."],
        "Das ist schon die ganze Regel. Sie passt genau zu dem, was du über doppelte Konsonanten weißt. Das ss ist ein doppelter Konsonant, also steht es nach einem kurzen Vokal. Das ß ist ein einzelner Buchstabe, also steht es nach einem langen.",
        { tasks: [k("Der ___ tut mir weh.", "Fuß", ["Fuss"], "Das u ist lang. Nach einem langen Vokal steht dieser Buchstabe.", "Sprich das Wort laut. Ist das u kurz oder lang?")] },
      ),
      b(
        "Nach ei, au und eu steht auch ß",
        ["*hei**ß**, drau**ß**en, flei**ß**ig*", "Zwei Vokale hintereinander zählen wie ein langer Vokal."],
        "Es gibt Laute, die aus zwei Vokalen bestehen: ei, au, eu und äu. Sie sind immer lang, denn du brauchst Zeit, um von einem zum anderen zu gleiten. Deshalb steht nach ihnen ebenfalls ß und nie ss.",
        { tasks: [k("Heute ist es sehr ___.", "heiß", ["heiss"], "Vor dem fraglichen Laut steht ei. Danach schreibt man diesen Buchstaben.", "Welche zwei Vokale stehen vor dem fraglichen Laut?")] },
      ),
      b(
        "Jetzt du: ss oder ß?",
        "Sprich jedes Wort leise und tipp auf die richtige Schreibung.",
        "Hör wieder auf den Vokal davor. Ist er kurz, schreibst du ss. Ist er lang oder besteht er aus zwei Vokalen, schreibst du ß.",
        {
          tasks: [
            k("Ich ___ es nicht.", "weiß", ["weiss"], "Davor steht ei. Nach zwei Vokalen schreibt man ß.", "Welche zwei Vokale stehen vor dem fraglichen Laut?"),
            k("Der ___ fließt ins Meer.", "Fluss", ["Fluß"], "Das u ist kurz. Nach einem kurzen Vokal steht ss.", "Sprich das Wort laut. Ist das u kurz oder lang?"),
            k("Wir ___ heute Pizza.", "essen", ["eßen"], "Das e ist kurz. Nach einem kurzen Vokal steht ss.", "Ist das erste e in dem Wort kurz oder lang?"),
          ],
        },
      ),
    ),
    ch(
      "Verlängern und ableiten",
      b(
        "Das Problem am Wortende",
        ["*Hun**d*** klingt wie *Hunt*.", "Am Ende eines Wortes hörst du nicht, ob dort d oder t steht.", "Bei b und p, g und k ist es genauso."],
        "Sprich das Wort Hund laut. Am Ende hörst du ein hartes t. Geschrieben wird es aber mit d. Im Deutschen klingen d, b und g am Wortende hart. Dein Ohr hilft dir hier also nicht weiter. Dafür gibt es die erste Strategie.",
      ),
      b(
        "Strategie 1: verlängern",
        [L("Hun**d**: die Hun**d**e", "klu**g**: klü**g**er", "er lie**b**t: lie**b**en")],
        "Du machst das Wort länger. Dann steht der fragliche Buchstabe nicht mehr am Ende, und du hörst ihn deutlich. Aus Hund wird Hunde, und jetzt hörst du das weiche d. Diese Strategie heißt verlängern.",
        { tasks: [k("Berg oder Berk? Die Verlängerung heißt Berge. Richtig ist ___.", "Berg", ["Berk"], "In der längeren Form hörst du das weiche g deutlich.", "Welchen Buchstaben hörst du in der Mitte der längeren Form?")] },
      ),
      b(
        "So verlängerst du",
        [L("**Nomen**: den Plural bilden.", "**Adjektiv**: steigern.", "**Verb**: den Infinitiv bilden.")],
        "Je nach Wortart verlängerst du auf eine andere Weise. Bei einem Nomen nimmst du die Mehrzahl. Bei einem Adjektiv steigerst du. Bei einem Verb suchst du die Grundform. Alle drei Wege führen zu einer längeren Form, in der du den Buchstaben hörst.",
        { tasks: [k("rund oder runt? Gesteigert heißt es runder. Richtig ist ___.", "rund", ["runt"], "In der gesteigerten Form hörst du das weiche d.", "Welchen Buchstaben hörst du in der gesteigerten Form?")] },
      ),
      b(
        "Strategie 2: ableiten",
        [L("H**äu**ser kommt von H**au**s.", "k**ä**lter kommt von k**a**lt.", "s**ü**chtig kommt von S**u**cht.")],
        "Die Laute ä und e klingen oft gleich, ebenso äu und eu. Hier hilft ein verwandtes Wort. Gibt es ein verwandtes Wort mit a, schreibst du ä. Gibt es eins mit au, schreibst du äu. Genauso kommt ö von o und ü von u. Diese Strategie heißt ableiten.",
      ),
      b(
        "Verwandte Wörter",
        ["*fahren, Fahrer, Fahrt, Gefährte*", "Wörter, die zusammengehören, bilden eine **Wortfamilie**."],
        "Wörter haben Verwandte, so wie Menschen. Fahren, Fahrer und Fahrt gehören zu einer Familie und teilen sich einen gemeinsamen Kern. Wenn du bei einem Wort unsicher bist, schaust du bei seinen Verwandten nach. Gefährte schreibt man mit ä, weil es von fahren kommt.",
        { tasks: [k("Bäume oder Beume? Das Wort kommt von Baum. Richtig ist ___.", "Bäume", ["Beume"], "Im verwandten Wort steht au. Daraus wird in der Mehrzahl äu.", "Welche Buchstaben stehen im verwandten Wort an dieser Stelle?")] },
      ),
      b(
        "Jetzt du: verlängern und ableiten",
        "Tipp bei jedem Wort auf die richtige Schreibung.",
        "Überleg bei jedem Wort, welche der beiden Strategien hilft. Geht es um das Wortende, verlängerst du. Geht es um ä oder äu, suchst du ein verwandtes Wort.",
        {
          tasks: [
            k("das ___", "Kind", ["Kint"], "Die Mehrzahl heißt Kinder. Dort hörst du das weiche d.", "Bilde die Mehrzahl. Welchen Buchstaben hörst du?"),
            k("meine ___", "Hände", ["Hende"], "Das verwandte Wort heißt Hand, mit a. Deshalb schreibt man ä.", "Wie heißt die Einzahl? Welcher Vokal steht dort?"),
            k("Sie ___ schnell weg.", "läuft", ["leuft"], "Der Infinitiv heißt laufen, mit au. Daraus wird äu.", "Wie heißt die Grundform des Verbs? Welche Buchstaben stehen dort?"),
          ],
        },
      ),
    ),
    ch(
      "Silben und das h",
      b(
        "Was ist eine Silbe?",
        ["*Was-ser, ken-nen, Bet-ten*", "Eine **Silbe** ist ein Klatscher, wenn du ein Wort klatschst."],
        "Sprich ein Wort langsam und klatsch dabei mit. Jeder Klatscher ist eine Silbe. Wasser hat zwei: Was und ser. An der Stelle, an der du die Hände wieder öffnest, liegt die Grenze zwischen zwei Silben.",
      ),
      b(
        "Strategie 3: in Silben sprechen",
        [L("*Bet-ten*: Du hörst das t zweimal.", "*be-ten*: Du hörst es nur einmal.")],
        "Wenn du ein Wort in Silben sprichst, hörst du doppelte Konsonanten. Bei Bet-ten endet die erste Silbe mit t, und die zweite beginnt wieder mit t. Bei be-ten gehört das t nur zur zweiten Silbe. Diese Strategie nennt man Silbenprobe.",
        { tasks: [k("Sprich in Silben: Him-mel. Das m hörst du ___.", "zweimal", ["einmal"], "Die erste Silbe endet mit m, die zweite beginnt mit m.", "Mit welchem Laut endet die erste Silbe, und mit welchem beginnt die zweite?")] },
      ),
      b(
        "Strategie 4: das h prüfen",
        ["*fa**h**ren, Za**h**l, wo**h**nen, Le**h**rer*", "Vor **l, m, n** und **r** steht nach einem langen Vokal oft ein **h**."],
        "Dieses h hörst du nicht. Es hat nur eine Aufgabe: Es zeigt, dass der Vokal davor lang ist. Man nennt es deshalb Dehnungs-h. Es steht fast nur vor den vier Buchstaben l, m, n und r. Leider steht es nicht bei jedem Wort, deshalb muss man viele davon einfach kennen.",
      ),
      b(
        "Das h zwischen zwei Vokalen",
        ["*se-**h**en, ge-**h**en, Ru-**h**e*", "Sprich in Silben. Dann hörst du das h."],
        "Es gibt noch ein zweites h. Es steht zwischen zwei Vokalen und trennt sie voneinander. Wenn du das Wort in Silben sprichst, hörst du es am Anfang der zweiten Silbe: se-hen, ge-hen. Auch bei verwandten Wörtern bleibt es: Er sieht, weil es von sehen kommt.",
        { tasks: [k("Wir ___ heute ins Kino.", "gehen", ["geen"], "In Silben gesprochen hörst du das h am Anfang der zweiten Silbe.", "Sprich das Wort in zwei Silben. Womit beginnt die zweite?")] },
      ),
      b(
        "Ein Beispiel aus der Prüfung",
        ["Das Wort: *eifersüchtig*", L("**ü oder i?** Das verwandte Wort heißt Eifers**u**cht. Also ü. Das ist ableiten.", "**g oder k?** Gesteigert heißt es eifersüchti**g**er. Also g. Das ist verlängern.")],
        "So sieht eine echte Aufgabe aus. Du bekommst ein Wort mit zwei schwierigen Stellen und sollst sagen, welche Strategie hilft. Für jede Stelle fragst du dich: Geht es um das Wortende, um einen Vokal wie ä oder ü, oder um einen doppelten Buchstaben?",
      ),
      b(
        "Jetzt du: Welche Strategie hilft?",
        "Tipp bei jedem Zweifelsfall auf die passende Strategie.",
        "Hier musst du nicht das Wort schreiben, sondern die Strategie nennen. Schau, an welcher Stelle der Zweifel liegt. Das verrät dir, welches Werkzeug du brauchst.",
        {
          tasks: [
            k("Hund oder Hunt? Es hilft: ___", "verlängern", ["in Silben sprechen"], "Der Zweifel liegt am Wortende. Die Mehrzahl Hunde macht das d hörbar.", "An welcher Stelle im Wort liegt der Zweifel?"),
            k("Häuser oder Heuser? Es hilft: ___", "ableiten", ["verlängern"], "Das verwandte Wort Haus zeigt, dass äu richtig ist.", "Geht es um das Wortende oder um die Laute in der Mitte?"),
            k("Betten oder Beten zum Schlafen? Es hilft: ___", "in Silben sprechen", ["ableiten"], "Bei Bet-ten hörst du das t zweimal.", "Geht es um einen doppelten Buchstaben? Wie machst du ihn hörbar?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Verlängern**: bei d oder t, b oder p, g oder k am Wortende.", "**Ableiten**: bei ä oder e, äu oder eu.", "**In Silben sprechen**: bei doppelten Konsonanten.", "**Das h prüfen**: vor l, m, n, r und zwischen zwei Vokalen.")],
        "Das sind die vier Strategien mit ihren Einsatzorten. Dazu kommt die Grundfrage, ob ein Vokal kurz oder lang ist. Sie entscheidet über doppelte Konsonanten und über ss oder ß. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Nach einem langen Vokal schreibst du ___.", "ß", ["ss"], "Das ss ist ein doppelter Konsonant und steht nur nach einem kurzen Vokal.", "Welches von beiden ist ein doppelter Konsonant? Wo stehen doppelte Konsonanten?")] },
      ),
    ),
  ],
  [
    v("Vokal", "Ein Laut, den man lange singen kann: a, e, i, o, u und ä, ö, ü. Er kann kurz oder lang sein."),
    v("Konsonant", "Jeder Buchstabe, der kein Vokal ist, zum Beispiel b, t, m, s."),
    v("verlängern", "Ein Wort länger machen, um den Buchstaben am Ende zu hören.", "Hund: Hunde"),
    v("ableiten", "Ein verwandtes Wort suchen, um ä oder äu zu erklären.", "Häuser kommt von Haus"),
    v("Wortfamilie", "Wörter, die miteinander verwandt sind und einen gemeinsamen Kern haben.", "fahren, Fahrer, Fahrt"),
    v("Silbe", "Ein Teil eines Wortes, den man einzeln klatschen kann.", "Was-ser"),
    v("ss / ß", "Nach einem kurzen Vokal steht ss, nach einem langen Vokal und nach ei, au, eu steht ß.", "Klasse, Straße, heiß"),
  ],
  [
    q("Welches Wort ist richtig geschrieben?", "Wasser", ["Waser", "Waßer", "Wahser"], "Das a ist kurz. Nach einem kurzen Vokal steht ss."),
    q("Welches Wort ist richtig geschrieben?", "Straße", ["Strasse", "Strase", "Strahse"], "Das a ist lang. Nach einem langen Vokal steht ß."),
    q("Du weißt nicht, ob am Ende d oder t steht. Welche Strategie hilft?", "verlängern", ["ableiten", "das h prüfen", "raten"], "Wenn du das Wort verlängerst, steht der Buchstabe nicht mehr am Ende, und du hörst ihn deutlich."),
    q("Träume oder Treume? Wie findest du es heraus?", "Ich suche das verwandte Wort Traum.", ["Ich spreche in Silben.", "Ich verlängere das Wort.", "Ich prüfe das h."], "Im verwandten Wort steht au. Deshalb schreibt man in der Mehrzahl äu. Das ist ableiten."),
    q("Warum schreibt man kommen mit zwei m?", "Weil das o kurz ist.", ["Weil das o lang ist.", "Weil es ein Verb ist.", "Weil es von Kamm kommt."], "Nach einem kurzen Vokal wird der Konsonant verdoppelt. In Silben gesprochen hörst du es: kom-men."),
    q("Welches Wort ist richtig geschrieben?", "draußen", ["draussen", "drausen", "drauhsen"], "Davor steht au. Nach zwei Vokalen hintereinander schreibt man ß."),
    q("Wie verlängerst du ein Adjektiv?", "Ich steigere es.", ["Ich bilde den Plural.", "Ich bilde den Infinitiv.", "Ich setze einen Artikel davor."], "Ein Adjektiv verlängert man durch Steigern: klug, klüger. Den Plural bildet man bei Nomen."),
    q("Vor welchen Buchstaben steht oft ein h, das man nicht hört?", "vor l, m, n und r", ["vor a, e, i und o", "vor b, d und g", "vor s und ß"], "Das Dehnungs-h steht nach einem langen Vokal vor l, m, n oder r, zum Beispiel in fahren und Zahl."),
  ],
);
