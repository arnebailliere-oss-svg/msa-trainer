// Guided lesson: Simple Past vs Present Perfect, since and for.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_02b_zeiten_vergangenheit.json",
  {
    id: "P_EN_ZEIT_VORBEI",
    subject: "EN",
    title: "Zeiten 2: vorbei oder noch wichtig?",
    teaser: "Das Simple Past für alles, was vorbei ist, und das Present Perfect für das, was früher passiert ist und jetzt noch zählt. Dazu since und for, die beiden englischen Wörter für seit.",
    hook: "Im Deutschen sagst du fast immer ich habe gespielt, wenn etwas vorbei ist. Im Englischen gibt es dafür zwei Zeiten, und sie bedeuten nicht dasselbe. Das ist die Stelle, an der die meisten stolpern. Deshalb nehmen wir uns hier besonders viel Zeit. Am Ende reicht dir eine einzige Frage, um die richtige Zeit zu finden.",
    outro: "Du kennst jetzt den Unterschied, an dem viele scheitern. Steht da, wann etwas war, nimmst du das Simple Past. Zählt die Folge jetzt, oder dauert etwas noch an, nimmst du das Present Perfect. Und für seit hast du zwei Wörter: since für den Anfang und for für die Dauer.",
    requires: ["P_EN_VERBFORMEN", "P_EN_ZEITFORMEN"],
  },
  [
    ch(
      "Simple Past: vorbei und abgeschlossen",
      b(
        "Gestern",
        ["*I **played** football yesterday.*", "= Ich habe gestern Fußball gespielt.", "Es ist **vorbei**. Diese Zeitform kennst du schon: das **Simple Past**."],
        "Wir fangen mit dem an, was du schon kennst. Gestern hast du Fußball gespielt. Das Spiel ist zu Ende, der Tag ist vorbei. Auf dem Zeitstrahl liegt es links von jetzt, als ein einzelner Punkt. Für so etwas nimmt das Englische das Simple Past.",
        { figure: { type: "timeline", points: [{ at: -0.6, label: "played" }] } },
      ),
      b(
        "So baust du das Simple Past",
        ["Regelmäßig: play wird zu play**ed**.", "Unregelmäßig: go wird zu **went**.", "Die Form ist für alle Personen gleich."],
        "Das ist die zweite Form des Verbs aus der Lektion über die Verbformen. Normale Verben bekommen ed. Unregelmäßige Verben haben eine eigene Form, die du lernen musst. Ein s für he, she, it gibt es in der Vergangenheit nicht.",
        { tasks: [k("She ___ to London last year.", "went", ["goed", "goes"], "Go ist unregelmäßig. Die zweite Form heißt went.", "Last year ist vorbei. Und dieses Verb hält sich nicht an die Regel mit ed.")] },
      ),
      b(
        "Die Signalwörter für vorbei",
        [L("**yesterday** = gestern", "**last week** = letzte Woche", "**two days ago** = vor zwei Tagen", "**in 2019** = im Jahr 2019")],
        "Alle diese Wörter haben etwas gemeinsam. Sie nennen einen Zeitpunkt, der vorbei ist. Wenn du so ein Wort im Satz findest, weißt du: Hier steht das Simple Past. Ago steht immer hinter der Zeitangabe, anders als das deutsche vor.",
        { tasks: [k("two days ago = ___", "vor zwei Tagen", ["in zwei Tagen", "seit zwei Tagen"], "Ago heißt vor, und es blickt zurück in die Vergangenheit.", "Schau in die dritte Zeile der Tafel. Blickt ago nach vorn oder zurück?")] },
      ),
      b(
        "Eine Falle aus dem Deutschen",
        ["Deutsch: Ich **habe** gestern Fußball **gespielt**.", "Englisch: *I **played** football yesterday.*", "Falsch: *I have played football yesterday.*"],
        "Im Deutschen benutzt du für die Vergangenheit meistens haben und ein zweites Wort: ich habe gespielt. Deshalb möchte man im Englischen have played sagen. Mit yesterday ist das aber falsch. Sobald dasteht, wann es war, nimmst du nur das Simple Past.",
      ),
      b(
        "Fragen und Nein-Sätze",
        ["***Did** you **play** yesterday?*", "*I **didn't play** yesterday.*", "Nach did steht das Verb in der Grundform."],
        "Auch das kennst du schon. Für Fragen und für Nein-Sätze brauchst du den Helfer did. Did zeigt bereits die Vergangenheit. Das Verb dahinter geht deshalb zurück in die Grundform. Es heißt did you play und nicht did you played.",
        { tasks: [k("___ you see the film last night?", "Did", ["Do", "Have"], "Last night ist vorbei. Für Fragen in der Vergangenheit brauchst du den Helfer did.", "Last night ist vorbei. Welcher Helfer zeigt die Vergangenheit?")] },
      ),
      b(
        "Jetzt du: Simple Past",
        "Tipp bei jedem Satz auf die richtige Form.",
        "In jedem der drei Sätze steht ein Signalwort für vorbei. Such es zuerst. Überleg dann, ob das Verb regelmäßig ist und ed bekommt, oder ob es eine eigene zweite Form hat.",
        {
          tasks: [
            k("We ___ a film yesterday.", "watched", ["watch", "have watched"], "Yesterday ist vorbei. Watch ist regelmäßig und bekommt ed.", "Welches Signalwort steht am Ende? Und was hängst du an ein normales Verb an?"),
            k("I ___ my grandma last weekend.", "visited", ["visit", "have visited"], "Last weekend ist vorbei. Visit ist regelmäßig und bekommt ed.", "Das Wochenende ist vorbei. Denk an die Falle von eben: mit Zeitangabe kein have."),
            k("He ___ his homework two hours ago.", "did", ["does", "done"], "Ago blickt zurück. Die zweite Form von do heißt did.", "Dieses Verb ist unregelmäßig. Du brauchst seine zweite Form, die allein stehen kann."),
          ],
        },
      ),
    ),
    ch(
      "Present Perfect: passiert, und jetzt noch wichtig",
      b(
        "Der verlorene Schlüssel",
        ["*She **has lost** her key.*", "Sie steht vor der Tür und kommt **nicht hinein**.", "Es ist früher passiert. Die **Folge** spürt sie jetzt."],
        "Stell dir das Bild genau vor. Ein Mädchen steht vor der Haustür und sucht in allen Taschen. Wann sie den Schlüssel verloren hat, weiß niemand. Das ist auch nicht wichtig. Wichtig ist, dass der Schlüssel jetzt weg ist und sie draußen steht.",
      ),
      b(
        "Das ist das Present Perfect",
        ["Etwas ist **früher** passiert.", "Wann genau, ist nicht wichtig.", "Wichtig ist, was **jetzt** daraus folgt.", "Diese Zeitform heißt **Present Perfect**."],
        "Schau auf den Zeitstrahl. Der Punkt liegt in der Vergangenheit, aber ein Band reicht von dort bis zu jetzt. Das Present Perfect ist eine Brücke zwischen früher und jetzt. Im Namen steckt present, also Gegenwart. Es geht immer auch um jetzt.",
        { figure: { type: "timeline", spans: [{ from: -0.55, to: 0, label: "Folge bis jetzt" }], points: [{ at: -0.55, label: "has lost" }] } },
      ),
      b(
        "So baust du das Present Perfect",
        ["**have / has** + **3. Form**", L("I **have** play**ed**.", "She **has** **gone**.")],
        "Auch diese Zeit besteht aus zwei Teilen. Der erste Teil ist have, bei he, she, it ist es has. Der zweite Teil ist die dritte Form des Verbs. Bei normalen Verben endet sie auf ed. Bei unregelmäßigen Verben ist es die dritte Form aus der Liste.",
        { tasks: [k("He ___ finished his homework.", "has", ["have"], "He gehört zu he, she, it. Da wird aus have ein has.", "Wer ist fertig geworden? Gehört diese Person zu he, she, it?")] },
      ),
      b(
        "Woran erkennst du die Folge?",
        [L("*I have broken my leg.*", "Folge: Ich kann jetzt nicht laufen."), L("*We have missed the bus.*", "Folge: Wir stehen noch an der Haltestelle.")],
        "Bei jedem Satz im Present Perfect kannst du fragen: Und was heißt das für jetzt? Das Bein ist gebrochen, also kann ich nicht laufen. Der Bus ist weg, also stehen wir noch hier. Wenn du so eine Folge findest, passt das Present Perfect.",
        { tasks: [k("I have eaten. Was folgt daraus? Ich bin jetzt ___.", "satt", ["hungrig"], "Wer gegessen hat, hat jetzt keinen Hunger mehr. Das ist die Folge.", "Wie fühlst du dich, wenn du gerade gegessen hast?")] },
      ),
      b(
        "Signalwörter: just, already, yet",
        [L("*I have **just** eaten.*", "just = gerade eben"), L("*She has **already** finished.*", "already = schon"), L("*I haven't finished **yet**.*", "not … yet = noch nicht")],
        "Auch das Present Perfect hat Signalwörter. Just bedeutet, dass etwas gerade eben passiert ist. Already bedeutet schon. Yet steht am Ende von Nein-Sätzen und Fragen und bedeutet noch nicht oder schon. Alle drei schauen auf den Stand bis jetzt.",
      ),
      b(
        "Signalwörter: ever und never",
        [L("*Have you **ever** been to London?*", "ever = jemals"), L("*I have **never** been to London.*", "never = noch nie"), "Es geht um dein ganzes Leben **bis jetzt**."],
        "Mit ever fragst du, ob jemand etwas irgendwann in seinem Leben gemacht hat. Mit never sagst du, dass es bis heute nicht passiert ist. Wann genau, spielt keine Rolle. Es zählt nur die Erfahrung, die jemand bis jetzt hat.",
        { tasks: [k("already = ___", "schon", ["noch nie", "gestern"], "Already bedeutet, dass etwas bereits erledigt ist.", "Schau auf die Tafel davor zurück, wenn du unsicher bist. Es steht in der zweiten Zeile.")] },
      ),
      b(
        "Jetzt du: Present Perfect",
        "Tipp bei jedem Satz auf die richtige Form.",
        "In jedem Satz steht ein Signalwort für das Present Perfect. Prüf dann die beiden Teile. Passt have oder has zur Person? Und steht das Verb in der dritten Form?",
        {
          tasks: [
            k("I have just ___ my homework.", "finished", ["finish", "finishing"], "Nach have kommt die dritte Form. Bei finish endet sie auf ed.", "Welche Form des Verbs steht immer nach have?"),
            k("She ___ never seen snow.", "has", ["have"], "She gehört zu he, she, it. Deshalb heißt der Helfer has.", "Schau auf das erste Wort im Satz. Welche Form gehört zu dieser Person?"),
            k("Have you ever ___ sushi?", "eaten", ["ate", "eat"], "Nach have kommt die dritte Form: eat, ate, eaten.", "Sag dir die drei Formen dieses Verbs vor. Du brauchst die letzte."),
          ],
        },
      ),
      b(
        "Kurz zurückschauen",
        [L("**Simple Past**: vorbei, mit Zeitangabe.", "*I lost my key yesterday.*"), L("**Present Perfect**: Die Folge zählt jetzt.", "*I have lost my key.*")],
        "Jetzt liegen beide Zeiten nebeneinander. Im ersten Satz erzählst du, was gestern war. Im zweiten Satz sagst du, was jetzt los ist: Der Schlüssel ist weg. Derselbe Schlüssel, aber zwei verschiedene Blickrichtungen.",
        { tasks: [k("I ___ my key yesterday.", "lost", ["have lost"], "Yesterday sagt, wann es war. Dann steht das Simple Past.", "Steht im Satz, wann es passiert ist? Denk an die Falle aus dem Deutschen.")] },
      ),
    ),
    ch(
      "Simple Past oder Present Perfect?",
      b(
        "Die eine Frage, die entscheidet",
        ["Steht im Satz, **wann** es war?", L("Ja: **Simple Past**.", "*I lost my key **yesterday**.*"), L("Nein, aber die Folge zählt jetzt: **Present Perfect**.", "*I **have lost** my key.*")],
        "Mehr als diese eine Frage brauchst du nicht. Such im Satz nach einer Zeitangabe, die vorbei ist. Findest du eine, ist es das Simple Past. Findest du keine, dann schau, ob es eine Folge für jetzt gibt. Das probieren wir an zwei Beispielen aus.",
      ),
      b(
        "Ein Beispiel mit Zeitangabe",
        ["*We ___ (watch) a film yesterday.*", "Zeitangabe: **yesterday**", "Es steht da, wann es war.", "*We **watched** a film yesterday.*"],
        "Ich denke wieder laut für dich. Ich suche eine Zeitangabe und finde yesterday. Damit ist die Sache entschieden. Es ist das Simple Past. Watch ist ein normales Verb, also hänge ich ed an.",
      ),
      b(
        "Ein Beispiel ohne Zeitangabe",
        ["*I ___ (lose) my keys. I can't get in!*", "Keine Zeitangabe.", "Aber eine Folge: Ich komme nicht hinein.", "*I **have lost** my keys.*"],
        "Hier finde ich keine Zeitangabe. Dafür steht ein zweiter Satz dabei: I can't get in. Das ist die Folge für jetzt. Also nehme ich das Present Perfect. Zu I gehört have, und die dritte Form von lose heißt lost.",
      ),
      b(
        "Jetzt du: Welche Zeit passt?",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Stell dir bei jedem Satz die eine Frage: Steht da, wann es war? Wenn ja, ist es das Simple Past. Wenn nein, such nach der Folge für jetzt.",
        {
          tasks: [
            k("I ___ him last week.", "saw", ["have seen"], "Last week sagt, wann es war. Dann steht das Simple Past.", "Such die Zeitangabe im Satz. Ist diese Zeit schon vorbei?"),
            k("Oh no! I ___ my phone. I can't call you.", "have lost", ["lost"], "Es steht keine Zeitangabe da. Die Folge zählt jetzt: Ich kann nicht anrufen.", "Gibt es eine Zeitangabe? Und was verrät dir der zweite Satz?"),
            k("She ___ in Paris in 2019.", "was", ["has been"], "In 2019 sagt, wann es war. Dann steht das Simple Past.", "Schau auf das Ende des Satzes. Ist dieses Jahr schon vorbei?"),
          ],
        },
      ),
    ),
    ch(
      "since und for: zwei Wörter für seit",
      b(
        "Etwas dauert noch an",
        ["*I **have lived** here for five years.*", "= Ich wohne seit fünf Jahren hier.", "Es hat früher angefangen und **dauert noch an**."],
        "Das Present Perfect hat noch eine zweite Aufgabe. Du brauchst es, wenn etwas früher angefangen hat und immer noch so ist. Schau auf den deutschen Satz: Dort steht wohne, also Gegenwart. Im Englischen steht hier das Present Perfect, weil die Zeit bis jetzt reicht.",
        { figure: { type: "timeline", spans: [{ from: -0.7, to: 0, label: "have lived" }] } },
      ),
      b(
        "since: der Anfang",
        [L("**since** 2019", "**since** Monday", "**since** my birthday"), "Nach since steht der **Zeitpunkt**, an dem es angefangen hat."],
        "Ein Zeitpunkt ist ein Punkt auf dem Zeitstrahl. Du kannst mit dem Finger darauf zeigen: genau hier hat es angefangen. Ein Jahr, ein Wochentag oder ein Geburtstag sind solche Punkte. Vor ihnen steht since.",
        { figure: { type: "timeline", spans: [{ from: -0.6, to: 0, label: "bis jetzt" }], points: [{ at: -0.6, label: "since 2019" }] } },
      ),
      b(
        "for: die Dauer",
        [L("**for** five years", "**for** two hours", "**for** a long time"), "Nach for steht die **Dauer**. Sie sagt, wie lange etwas schon geht."],
        "Eine Dauer ist kein Punkt, sondern eine Strecke auf dem Zeitstrahl. Du kannst sie zählen: fünf Jahre, zwei Stunden, drei Wochen. Davor steht for. Frag dich also immer, ob du einen Anfang nennst oder eine Menge an Zeit.",
        { figure: { type: "timeline", spans: [{ from: -0.6, to: 0, label: "for five years" }] }, tasks: [k("Two hours ist ___.", "eine Dauer", ["ein Zeitpunkt"], "Zwei Stunden kann man zählen. Das ist eine Strecke und kein einzelner Punkt.", "Kannst du auf dem Zeitstrahl darauf zeigen, oder musst du es zählen?")] },
      ),
      b(
        "Die Falle mit seit",
        [L("Deutsch: **seit** 2019", "Englisch: **since** 2019"), L("Deutsch: **seit** fünf Jahren", "Englisch: **for** five years"), "Falsch: *since five years*"],
        "Im Deutschen gibt es nur ein Wort, nämlich seit. Im Englischen musst du wählen. Das ist einer der häufigsten Fehler in Klassenarbeiten. Since five years klingt für deutsche Ohren richtig, ist aber falsch. Fünf Jahre sind eine Dauer.",
      ),
      b(
        "Jetzt du: since oder for?",
        "Tipp bei jedem Satz auf das richtige Wort.",
        "Frag dich bei jedem Satz: Steht hinter der Lücke ein Anfang, auf den ich zeigen kann? Oder steht dort eine Menge an Zeit, die ich zählen kann?",
        {
          tasks: [
            k("I have known her ___ 2020.", "since", ["for"], "2020 ist ein Zeitpunkt. Damals hat es angefangen.", "Ist 2020 ein Punkt auf dem Zeitstrahl oder eine Menge an Zeit?"),
            k("We have waited ___ twenty minutes.", "for", ["since"], "Zwanzig Minuten sind eine Dauer. Man kann sie zählen.", "Kannst du auf zwanzig Minuten zeigen, oder zählst du sie?"),
            k("He has been ill ___ Monday.", "since", ["for"], "Monday ist ein Zeitpunkt. An diesem Tag hat es angefangen.", "Ist ein Wochentag ein Anfang oder eine Menge an Zeit?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("Steht da, wann es war: **Simple Past**.", "Zählt die Folge jetzt: **Present Perfect**."), L("**since** + Anfang", "**for** + Dauer")],
        "Das war die schwierigste Stelle der englischen Zeiten, und du bist durch. Wenn du in einer Aufgabe unsicher bist, stell dir die eine Frage: Steht da, wann es war? Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("I ___ my homework. Here it is!", "have finished", ["finished yesterday"], "Die Folge zählt jetzt: Die Hausaufgabe ist fertig und liegt hier.", "Was will der Sprecher mit dem zweiten Satz zeigen?")] },
      ),
    ),
  ],
  [
    v("Simple Past", "Die Zeit für alles, was vorbei ist. Oft steht dabei, wann es war.", "I lost my key yesterday."),
    v("Present Perfect", "Die Zeit für etwas, das früher passiert ist und jetzt noch zählt, oder das bis jetzt andauert. Have oder has und die 3. Form.", "I have lost my key."),
    v("yesterday, last week, ago", "Signalwörter für das Simple Past. Sie nennen eine Zeit, die vorbei ist."),
    v("just, already, yet, ever, never", "Signalwörter für das Present Perfect: gerade eben, schon, noch nicht, jemals, noch nie."),
    v("since", "Seit einem Zeitpunkt, also seit einem Anfang.", "since 2019, since Monday"),
    v("for", "Seit einer Dauer, also seit einer Menge an Zeit.", "for five years, for two hours"),
  ],
  [
    q("We ___ a film yesterday.", "watched", ["have watched", "watch", "has watched"], "Yesterday sagt, wann es war. Sobald eine abgeschlossene Zeitangabe dasteht, nimmst du das Simple Past."),
    q("I ___ my keys. I can't open the door.", "have lost", ["lost yesterday", "lose", "am losing"], "Es steht keine Zeitangabe da, aber eine Folge für jetzt: Die Tür bleibt zu. Das ist das Present Perfect."),
    q("They have lived here ___ 2010.", "since", ["for", "ago", "last"], "2010 ist ein Zeitpunkt, an dem es angefangen hat. Vor einem Zeitpunkt steht since."),
    q("She has worked there ___ three years.", "for", ["since", "ago", "in"], "Drei Jahre sind eine Dauer, die man zählen kann. Vor einer Dauer steht for."),
    q("Have you ever ___ to London?", "been", ["was", "be", "were"], "Nach have steht die dritte Form. Die drei Formen von be heißen be, was oder were, been."),
    q("Welcher Satz ist richtig?", "I saw him last week.", ["I have seen him last week.", "I seen him last week.", "I have saw him last week."], "Last week ist eine abgeschlossene Zeitangabe. Dazu passt nur das Simple Past, also saw."),
    q("He ___ just finished his homework.", "has", ["have", "is", "did"], "Just ist ein Signalwort für das Present Perfect. Zu he gehört der Helfer has."),
    q("___ you see Tom yesterday?", "Did", ["Have", "Do", "Has"], "Yesterday ist vorbei. Für eine Frage im Simple Past brauchst du den Helfer did."),
  ],
);
