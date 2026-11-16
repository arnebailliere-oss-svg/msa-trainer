// Guided lesson: Simple Present vs Present Progressive. Emits into primers/en_02_zeitformen.json.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_02_zeitformen.json",
  {
    id: "P_EN_ZEITFORMEN",
    subject: "EN",
    title: "Zeiten 1: immer oder gerade jetzt?",
    teaser: "Der Zeitstrahl, das Simple Present für alles, was immer wieder passiert, und das Present Progressive für das, was gerade jetzt passiert. Mit den Wörtern, die dir die richtige Zeit verraten.",
    hook: "Im Deutschen sagst du ich spiele, egal ob du das jeden Samstag tust oder genau in diesem Moment. Englisch macht daraus zwei verschiedene Formen. Das klingt erst einmal umständlich. Es ist aber leicht, sobald du weißt, worauf du achten musst. Wir gehen es in Ruhe durch, eine Tafel nach der anderen.",
    outro: "Du kannst jetzt zwei Zeiten auseinanderhalten: das Simple Present für alles, was immer wieder passiert, und das Present Progressive für das, was gerade jetzt passiert. Und du weißt, dass kleine Wörter wie always oder now dir die Zeit verraten. In der nächsten Lektion geht es in die Vergangenheit.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Wann passiert etwas?",
      b(
        "Das Verb zeigt die Zeit",
        ["Gestern **war** ich müde.", "Jetzt **bin** ich wach.", "Morgen **werde** ich fit sein.", "Am Verb erkennst du, **wann** etwas passiert."],
        "Wir fangen mit etwas an, das du längst kannst. Lies die drei deutschen Sätze. Es geht jedes Mal um dich, aber einmal um gestern, einmal um jetzt und einmal um morgen. Das Verb verändert sich und zeigt dir damit die Zeit.",
      ),
      b(
        "Der Zeitstrahl",
        ["Links ist **früher**, in der Mitte ist **jetzt**, rechts ist **später**.", "Dieses Bild heißt **Zeitstrahl**."],
        "Stell dir die Zeit wie eine lange Linie vor. Du stehst in der Mitte, das ist jetzt. Alles, was schon war, liegt links von dir. Alles, was noch kommt, liegt rechts. Dieses Bild benutzen wir immer wieder. Probier es gleich einmal aus.",
        {
          figure: { type: "timeline" },
          tasks: [k("Yesterday heißt gestern. Auf dem Zeitstrahl liegt das ___.", "links", ["in der Mitte", "rechts"], "Gestern ist schon vorbei. Alles, was vorbei ist, liegt links von jetzt.", "Ist gestern schon gewesen, oder kommt es erst noch? Such die passende Seite.")],
        },
      ),
      b(
        "Englisch fragt genauer nach",
        ["Ich **spiele** Fußball. (jeden Samstag)", "Ich **spiele** Fußball. (in diesem Moment)", "Im Deutschen ist das dieselbe Form. Englisch hat dafür **zwei** Formen."],
        "Schau dir die beiden deutschen Sätze an. Das Verb ist beide Male gleich. Im Englischen musst du dich entscheiden: Passiert etwas immer wieder, oder passiert es genau jetzt? Für jede der beiden Möglichkeiten gibt es eine eigene Form. Um diese beiden Formen geht es in dieser Lektion.",
      ),
      b(
        "Jetzt du: immer wieder oder gerade jetzt?",
        "Hier ist noch alles auf Deutsch. Tipp bei jedem Satz an, was gemeint ist.",
        "Bevor wir Englisch sprechen, üben wir nur das Hinhören. Lies jeden Satz und frag dich: Tut jemand das regelmäßig, oder passiert es in diesem Augenblick? Lass dir Zeit dabei.",
        {
          tasks: [
            k("Ich putze mir jeden Morgen die Zähne. Das passiert ___.", "immer wieder", ["gerade jetzt"], "Jeden Morgen bedeutet: Es wiederholt sich, Tag für Tag.", "Achte auf die Wörter jeden Morgen. Passiert das einmal oder oft?"),
            k("Psst! Das Baby schläft. Das passiert ___.", "gerade jetzt", ["immer wieder"], "Psst sagt man nur, wenn jemand in diesem Moment schläft.", "Warum sagt jemand Psst? Was ist in diesem Augenblick los?"),
            k("Mein Vater arbeitet in einer Bank. Das gilt ___.", "an jedem Arbeitstag", ["nur in diesem Moment"], "Das ist sein Beruf. Es gilt an jedem Arbeitstag, nicht nur heute.", "Ist das sein Beruf, oder macht er das nur in diesem einen Moment?"),
          ],
        },
      ),
    ),
    ch(
      "Simple Present: was immer wieder passiert",
      b(
        "Jeden Samstag",
        ["*I **play** football every Saturday.*", "= Ich spiele jeden Samstag Fußball.", "Das passiert **immer wieder**. Diese Zeitform heißt **Simple Present**."],
        "Every Saturday heißt jeden Samstag. Es geht also nicht um einen bestimmten Tag, sondern um eine Gewohnheit. Für Gewohnheiten nimmt das Englische das Simple Present. Simple bedeutet einfach, und present bedeutet Gegenwart.",
      ),
      b(
        "So baust du das Simple Present",
        ["I / you / we / they **play**.", "He / she / it **plays**.", "Du nimmst die Grundform. Bei he, she, it kommt ein **-s** dazu."],
        "Das kennst du schon aus der Lektion über die Verbformen. Das Simple Present ist einfach die Grundform. Nur bei he, she und it hängt sich ein s an das Verb. Mehr brauchst du für diese Zeit nicht. Probier es unten gleich aus.",
        { tasks: [k("My sister ___ tennis every Monday.", "plays", ["play"], "My sister ist eine Person, also she. Das Verb bekommt sein s.", "Für wen kannst du my sister einsetzen: für they oder für she?")] },
      ),
      b(
        "Kleine Wörter verraten die Zeit",
        ["*I **always** get up at six.*", "*She **never** eats fish.*", "Always heißt immer, never heißt nie. So ein Wort heißt **Signalwort**."],
        "In vielen Sätzen steht ein kleines Wort, das dir die Zeitform verrät. Man nennt es Signalwort, weil es dir ein Signal gibt. Wenn du always oder never liest, weißt du sofort: Hier geht es um etwas, das immer oder nie passiert. Also steht das Simple Present.",
      ),
      b(
        "Die Signalwörter für immer wieder",
        [L("**always** = immer", "**usually** = normalerweise", "**often** = oft", "**sometimes** = manchmal", "**never** = nie", "**every day** = jeden Tag")],
        "Das sind die sechs wichtigsten. Lies sie einmal langsam von oben nach unten. Sie gehen von immer bis nie. Every kannst du mit jedem Zeitwort verbinden: every day, every week, every Saturday. Unten kannst du prüfen, ob eins schon sitzt.",
        { tasks: [k("usually = ___", "normalerweise", ["nie", "gerade jetzt"], "Usually heißt normalerweise. Es beschreibt, was meistens so ist.", "Schau in die zweite Zeile der Tafel. Dort steht das Wort.")] },
      ),
      b(
        "Auch Tatsachen stehen im Simple Present",
        ["*The sun **rises** in the east.*", "= Die Sonne geht im Osten auf.", "*My dad **works** in a bank.*", "Das ist **immer** so. Es ist eine Tatsache."],
        "Manchmal steht gar kein Signalwort im Satz. Dann hilft dir die Bedeutung. Die Sonne geht jeden Tag im Osten auf, das ändert sich nie. Und der Beruf deines Vaters gilt auch morgen noch. Für solche Tatsachen nimmst du ebenfalls das Simple Present.",
      ),
      b(
        "Jetzt du: Simple Present",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Jetzt bist du dran. Schau bei jedem Satz, wer etwas tut. Ist es he, she oder it, dann braucht das Verb sein s. Wenn du danebentippst, ist das nicht schlimm. Du bekommst einen Hinweis und probierst es noch einmal.",
        {
          tasks: [
            k("We ___ pizza every Friday.", "eat", ["eats"], "We sind mehrere. Da bleibt die Grundform ohne s.", "Wer isst hier? Ist das eine einzelne Person oder sind es mehrere?"),
            k("Tom often ___ late.", "comes", ["come"], "Tom ist eine Person, also he. Das Verb bekommt sein s.", "Tom ist ein einzelner Junge. Welches kleine Wort passt für ihn?"),
            k("The bus ___ at eight every morning.", "leaves", ["leave"], "Der Bus ist eine Sache, also it. Auch bei it kommt das s dazu.", "Ein Bus ist eine einzelne Sache. Was passiert bei it mit dem Verb?"),
          ],
        },
      ),
    ),
    ch(
      "Present Progressive: was gerade jetzt passiert",
      b(
        "Schau mal!",
        ["*Look! Tom **is playing** football.*", "= Schau mal! Tom spielt gerade Fußball.", "Das passiert **genau jetzt**. Diese Zeitform heißt **Present Progressive**."],
        "Stell dir vor, du stehst am Fenster und zeigst auf den Sportplatz. Tom spielt in diesem Augenblick. Dafür hat das Englische eine eigene Zeitform, das Present Progressive. Progressive bedeutet, dass etwas gerade im Gang ist. Im Deutschen hilfst du dir oft mit dem Wort gerade.",
      ),
      b(
        "So baust du das Present Progressive",
        ["**am / is / are** + Verb mit **-ing**", L("I **am** play**ing**.", "She **is** play**ing**.", "They **are** play**ing**.")],
        "Diese Zeit besteht immer aus zwei Teilen. Der erste Teil ist am, is oder are. Der zweite Teil ist das Verb mit ing. Auch das kennst du schon aus der Lektion über die Verbformen. Zu I gehört am, zu he, she, it gehört is, und zu allen anderen gehört are.",
        { tasks: [k("They ___ playing.", "are", ["is", "am"], "They sind mehrere. Zu you, we und they gehört are.", "Schau auf die dritte Zeile der Tafel. Welches Wort steht dort bei they?")] },
      ),
      b(
        "Die Signalwörter für gerade jetzt",
        [L("**now** = jetzt", "**right now** = genau jetzt", "**at the moment** = im Moment", "**Look!** = Schau mal!", "**Listen!** = Hör mal!")],
        "Auch diese Zeit hat ihre Signalwörter. Now und at the moment sind leicht zu verstehen. Look und Listen sind etwas versteckter. Überleg einmal: Du kannst nur auf etwas zeigen, das gerade passiert. Deshalb folgt nach Look oder Listen fast immer das Present Progressive.",
      ),
      b(
        "Beide Teile müssen da sein",
        ["Falsch: *She playing tennis.*", "Falsch: *She is play tennis.*", "Richtig: *She **is playing** tennis.*"],
        "Der häufigste Fehler bei dieser Zeit ist, dass ein Teil fehlt. Im ersten Satz fehlt das is. Im zweiten Satz fehlt das ing. Prüf deshalb immer beide Teile: Steht am, is oder are da? Und hat das Verb sein ing?",
        { tasks: [k("Listen! The baby ___.", "is crying", ["crying", "is cry"], "Beide Teile sind da: is und das Verb mit ing.", "Zähl die Teile. Du brauchst zwei: das kleine Wort und das Verb mit ing.")] },
      ),
      b(
        "Jetzt du: Present Progressive",
        "Tipp bei jedem Satz auf die richtige Form.",
        "In allen drei Sätzen passiert etwas genau jetzt. Deine Aufgabe ist es, die Form richtig zusammenzubauen. Schau, wer etwas tut, und such dann das passende kleine Wort dazu aus.",
        {
          tasks: [
            k("Look! It ___.", "is raining", ["rains", "raining"], "Look zeigt auf diesen Moment. Zu it gehört is, und das Verb bekommt ing.", "Look ist ein Signalwort. Welche Zeit folgt darauf, und aus wie vielen Teilen besteht sie?"),
            k("I ___ my homework at the moment.", "am doing", ["do", "is doing"], "At the moment heißt im Moment. Zu I gehört am.", "Achte auf at the moment. Und welches kleine Wort gehört zu I?"),
            k("Be quiet! They ___.", "are sleeping", ["sleep", "is sleeping"], "Sie schlafen in diesem Moment. Zu they gehört are.", "Warum soll jemand leise sein? Und welches kleine Wort gehört zu they?"),
          ],
        },
      ),
      b(
        "Kurz zurückschauen",
        [L("**Simple Present**: immer wieder", "*She plays tennis every week.*"), L("**Present Progressive**: gerade jetzt", "*She is playing tennis now.*")],
        "Bevor wir weitergehen, legen wir beide Zeiten nebeneinander. Im Bild siehst du den Unterschied. Das Simple Present gilt für viele Tage, früher, heute und später. Das Present Progressive gilt nur für diesen einen Moment in der Mitte.",
        {
          figure: { type: "timeline", spans: [{ from: -0.9, to: 0.9, label: "plays (immer wieder)" }], points: [{ at: 0, label: "is playing" }] },
          tasks: [k("She ___ tennis every week.", "plays", ["is playing"], "Every week heißt jede Woche. Es passiert immer wieder, also Simple Present.", "Schau auf every week. Ist das ein einzelner Moment oder eine Gewohnheit?")],
        },
      ),
    ),
    ch(
      "Welche Zeit ist es?",
      b(
        "Zwei Fragen helfen dir",
        ["(1) Steht ein **Signalwort** im Satz?", "(2) Passiert es **immer wieder**, oder passiert es **gerade jetzt**?"],
        "Jetzt mischen wir beide Zeiten. Dafür brauchst du nur zwei Fragen, immer in dieser Reihenfolge. Zuerst suchst du ein Signalwort. Wenn keins da ist, überlegst du, was der Satz bedeutet. Auf den nächsten beiden Tafeln machen wir das gemeinsam.",
      ),
      b(
        "Ein Beispiel mit Signalwort",
        ["*Listen! The baby ___ (cry).*", "Signalwort: **Listen!**", "Also passiert es gerade jetzt.", "*The baby **is crying**.*"],
        "Ich denke einmal laut für dich. Zuerst suche ich ein Signalwort und finde Listen. Listen bedeutet: Es passiert in diesem Moment. Also brauche ich das Present Progressive. The baby ist ein it, dazu gehört is. Und cry bekommt sein ing.",
      ),
      b(
        "Ein Beispiel ohne Signalwort",
        ["*My dad ___ (work) in a bank.*", "Kein Signalwort.", "Aber es ist sein Beruf. Das gilt **immer**.", "*My dad **works** in a bank.*"],
        "Hier finde ich kein Signalwort. Dann stelle ich die zweite Frage: Was bedeutet der Satz? Er beschreibt den Beruf des Vaters, also eine Tatsache. Das ist Simple Present. My dad ist ein he, deshalb bekommt work sein s.",
      ),
      b(
        "Jetzt du: Welche Zeit passt?",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Jetzt entscheidest du selbst. Stell dir bei jedem Satz die beiden Fragen. Gibt es ein Signalwort? Und wenn nicht: Passiert es immer wieder, oder passiert es gerade jetzt?",
        {
          tasks: [
            k("She usually ___ to school by bus.", "goes", ["is going"], "Usually heißt normalerweise. Das ist eine Gewohnheit, also Simple Present.", "Such das Signalwort. Was bedeutet usually auf Deutsch?"),
            k("Look! She ___ to school by bike today.", "is going", ["goes"], "Look zeigt auf diesen Moment. Heute ist es anders als sonst, und es passiert gerade.", "Achte auf das erste Wort im Satz. Worauf kann man zeigen?"),
            k("Water ___ at 100 degrees.", "boils", ["is boiling"], "Wasser kocht immer bei 100 Grad. Das ist eine Tatsache, also Simple Present.", "Gilt das nur in diesem Moment, oder ist das immer so?"),
          ],
        },
      ),
      b(
        "Eine Falle: Verben ohne -ing",
        ["Richtig: *I **like** pizza.*", "Falsch: *I am liking pizza.*", "**like, love, know, want** und **need** stehen fast nie mit -ing."],
        "Einige Verben beschreiben nichts, was man tut. Sie beschreiben, was man mag, weiß oder will. So etwas läuft nicht ab wie ein Fußballspiel. Deshalb stehen diese Verben im Simple Present, auch wenn es um jetzt geht.",
        { tasks: [k("I ___ the answer.", "know", ["am knowing"], "Wissen ist nichts, was gerade abläuft. Deshalb steht es ohne ing.", "Gehört dieses Verb zu der Liste auf der Tafel?")] },
      ),
      b(
        "Das nimmst du mit",
        [L("**Simple Present**: immer wieder, Tatsachen.", "Signalwörter: always, often, never, every day"), L("**Present Progressive**: gerade jetzt.", "Signalwörter: now, at the moment, Look!")],
        "Das war die ganze Lektion. Zwei Zeiten, und für jede ein paar Signalwörter. Wenn du unsicher bist, stell dir wieder die zwei Fragen. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz. Vorher darfst du unten noch einen letzten Satz ausprobieren.",
        { tasks: [k("He ___ football at the moment.", "is playing", ["plays"], "At the moment heißt im Moment. Es passiert gerade, also Present Progressive.", "Such das Signalwort am Ende des Satzes. Was bedeutet es?")] },
      ),
    ),
  ],
  [
    v("Zeitstrahl", "Eine Linie für die Zeit: links früher, in der Mitte jetzt, rechts später."),
    v("Signalwort", "Ein kleines Wort im Satz, das dir die Zeitform verrät.", "always, now, Look!"),
    v("Simple Present", "Die Zeit für alles, was immer wieder passiert, und für Tatsachen. Grundform, bei he, she, it mit s.", "She plays tennis every week."),
    v("Present Progressive", "Die Zeit für das, was genau jetzt passiert. Am, is oder are und das Verb mit ing.", "She is playing tennis now."),
    v("always, usually, often, sometimes, never", "Signalwörter für das Simple Present: immer, normalerweise, oft, manchmal, nie."),
    v("now, at the moment, Look!, Listen!", "Signalwörter für das Present Progressive: jetzt, im Moment, Schau mal!, Hör mal!"),
  ],
  [
    q("She ___ to school every day.", "goes", ["go", "is going", "going"], "Every day heißt jeden Tag. Das ist eine Gewohnheit, also Simple Present. Bei she kommt das s dazu."),
    q("Look! It ___.", "is raining", ["rains", "rain", "raining"], "Look zeigt auf diesen Moment. Dafür brauchst du das Present Progressive mit beiden Teilen: is und raining."),
    q("Was bedeutet das Signalwort usually?", "normalerweise", ["nie", "genau jetzt", "gestern"], "Usually heißt normalerweise. Es steht für etwas, das meistens so ist, und gehört zum Simple Present."),
    q("My friends often ___ computer games.", "play", ["plays", "are play", "playing"], "Often heißt oft, also Simple Present. My friends sind mehrere, deshalb bleibt die Grundform ohne s."),
    q("Be quiet! The baby ___.", "is sleeping", ["sleeps", "sleeping", "are sleeping"], "Das Baby schläft in diesem Moment, deshalb soll man leise sein. The baby ist ein it, dazu gehört is."),
    q("Welcher Satz ist richtig?", "I like this song.", ["I am liking this song.", "I liking this song.", "I am like this song."], "Like beschreibt, was man mag. Solche Verben stehen fast nie mit ing, sondern im Simple Present."),
    q("The train ___ at 7:15 every morning.", "leaves", ["is leaving", "leave", "leaving"], "Every morning heißt jeden Morgen. Fahrpläne stehen im Simple Present, und the train ist ein it."),
    q("I ___ my homework right now.", "am doing", ["do", "is doing", "doing"], "Right now heißt genau jetzt. Zu I gehört am, und das Verb bekommt ing."),
  ],
);
