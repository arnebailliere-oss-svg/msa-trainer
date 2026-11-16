// Guided lesson: Past Progressive, Past Perfect, will-future, going to-future, Present Perfect Progressive.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_02c_zeiten_weiter.json",
  {
    id: "P_EN_ZEIT_WEITER",
    subject: "EN",
    title: "Zeiten 3: mittendrin, noch früher und später",
    teaser: "Die restlichen Zeiten, eine nach der anderen: das Past Progressive für das, was gerade lief, das Past Perfect für das, was noch früher war, und will und going to für die Zukunft. Am Ende liegen alle Zeiten auf einem Zeitstrahl.",
    hook: "Du kennst schon vier englische Zeiten. In dieser Lektion kommen die übrigen dazu. Das klingt nach viel, aber jede von ihnen hat nur eine einzige Aufgabe. Und sie sind alle aus Teilen gebaut, die du längst kennst. Wir nehmen uns wieder eine nach der anderen vor.",
    outro: "Jetzt kennst du alle Zeiten, die im MSA vorkommen. Jede hat ihren Platz auf dem Zeitstrahl und ihre eigene Aufgabe. Wenn du in einer Aufgabe nicht weiterweißt, helfen dir die drei Fragen: Gibt es ein Signalwort? Wann passiert es? Und läuft es gerade, oder ist es fertig?",
    requires: ["P_EN_VERBFORMEN", "P_EN_ZEITFORMEN", "P_EN_ZEIT_VORBEI"],
  },
  [
    ch(
      "Past Progressive: mittendrin, als etwas passierte",
      b(
        "Ein Film im Kopf",
        ["*I **was playing** football when it started to rain.*", "= Ich spielte gerade Fußball, als es anfing zu regnen.", "Etwas **lief gerade**, und dann passierte etwas anderes."],
        "Stell dir die Szene wie einen Film vor. Du spielst und spielst und spielst. Mitten hinein fallen plötzlich die ersten Tropfen. Es gibt also eine lange Handlung, die schon lief, und eine kurze, die dazwischenkommt. Beides ist gestern passiert.",
      ),
      b(
        "Das ist das Past Progressive",
        ["Die Handlung, die gerade lief, bekommt **was / were** und das Verb mit **-ing**.", "Diese Zeitform heißt **Past Progressive**."],
        "Schau auf den Zeitstrahl. Das lange Band ist das Fußballspiel. Der Punkt mitten darauf ist der Moment, in dem der Regen anfängt. Du kennst das Present Progressive für gerade jetzt. Das Past Progressive ist dasselbe, nur in der Vergangenheit.",
        { figure: { type: "timeline", spans: [{ from: -0.85, to: -0.3, label: "was playing" }], points: [{ at: -0.55, label: "started to rain" }] } },
      ),
      b(
        "was oder were?",
        ["I / he / she / it **was** playing.", "You / we / they **were** playing."],
        "Auch hier brauchst du zwei Teile. Der erste Teil ist was oder were, also die Vergangenheit von be. Zu I, he, she und it gehört was. Zu you, we und they gehört were. Der zweite Teil ist das Verb mit ing, wie immer.",
        { tasks: [k("They ___ watching TV.", "were", ["was"], "They sind mehrere. Zu you, we und they gehört in der Vergangenheit diese Form.", "Schau in die zweite Zeile der Tafel. In welcher Gruppe steht they?")] },
      ),
      b(
        "Die lange und die kurze Handlung",
        [L("Die **lange** Handlung, die schon lief:", "*was playing* (Past Progressive)"), L("Die **kurze** Handlung, die dazwischenkommt:", "*started* (Simple Past)")],
        "In solchen Sätzen stehen zwei Zeiten nebeneinander. Die lange Handlung im Hintergrund bekommt das Past Progressive. Die kurze Handlung, die plötzlich passiert, bekommt das Simple Past. Frag dich also immer: Was lief schon, und was kam dazwischen?",
        { tasks: [k("She was reading when the phone ___.", "rang", ["was ringing"], "Das Klingeln ist die kurze Handlung, die dazwischenkommt. Sie steht im Simple Past.", "Was dauert länger: das Lesen oder das Klingeln? Die kurze Handlung bekommt die einfache Form.")] },
      ),
      b(
        "Die Signalwörter while und when",
        ["***While** I was cooking, the phone rang.*", "*I was cooking **when** the phone rang.*", "while = während, when = als"],
        "Zwei kleine Wörter helfen dir bei dieser Zeit. Nach while steht meistens die lange Handlung, also das Past Progressive. Nach when steht meistens die kurze Handlung, also das Simple Past. Beide Sätze auf der Tafel bedeuten dasselbe.",
      ),
      b(
        "Jetzt du: Past Progressive",
        "Tipp bei jedem Satz auf die richtige Form.",
        "In jedem Satz gibt es eine lange und eine kurze Handlung. Überleg zuerst, welche von beiden in der Lücke fehlt. Achte dann darauf, wer etwas tut.",
        {
          tasks: [
            k("We ___ dinner when Tom arrived.", "were having", ["was having", "are having"], "Das Essen lief schon, als Tom kam. Und zu we gehört were.", "Lief das Essen schon, als Tom kam? Und welche Form von be gehört in der Vergangenheit zu we?"),
            k("While I ___, the lights went out.", "was reading", ["were reading", "am reading"], "Nach while steht die lange Handlung. Zu I gehört was.", "Welche Handlung steht nach while: die lange oder die kurze? Und was gehört zu I?"),
            k("He was running when he ___.", "fell", ["was falling"], "Das Hinfallen passiert plötzlich. Die kurze Handlung steht im Simple Past.", "Dauert das Hinfallen lange, oder passiert es in einem Augenblick?"),
          ],
        },
      ),
    ),
    ch(
      "Past Perfect: noch weiter zurück",
      b(
        "Zwei Dinge in der Vergangenheit",
        ["*When I arrived, the bus **had left**.*", "= Als ich ankam, war der Bus schon abgefahren.", "Beides ist vorbei. Aber der Bus fuhr **zuerst** ab."],
        "Manchmal erzählst du von zwei Dingen, die beide vorbei sind. Dann möchtest du zeigen, welches von beiden zuerst war. Hier ist erst der Bus abgefahren, und danach bist du angekommen. Im Deutschen sagst du dafür war abgefahren.",
      ),
      b(
        "Das ist das Past Perfect",
        ["Das, was **noch früher** war, bekommt **had** und die **3. Form**.", "Diese Zeitform heißt **Past Perfect**."],
        "Auf dem Zeitstrahl liegen jetzt zwei Punkte links von jetzt. Der Punkt ganz links ist der Bus, der abfährt. Der Punkt weiter rechts bist du, wie du ankommst. Das Past Perfect ist die Zeit für den Punkt, der am weitesten zurückliegt.",
        { figure: { type: "timeline", points: [{ at: -0.8, label: "had left" }, { at: -0.35, label: "arrived" }] } },
      ),
      b(
        "had ist für alle gleich",
        [L("I **had** seen it.", "She **had** seen it.", "They **had** seen it."), "Es gibt kein has und kein s."],
        "Diese Zeit ist leicht zu bauen. Du nimmst immer had, egal für welche Person. Dahinter kommt die dritte Form des Verbs, die du schon vom Present Perfect kennst. Mehr gibt es dazu nicht zu lernen.",
        { tasks: [k("She ___ already eaten when we came.", "had", ["has"], "Beides ist vorbei, und das Essen war zuerst. Dafür steht diese Form, für alle Personen gleich.", "Sind beide Handlungen vorbei? Welche Form gilt dann für jede Person?")] },
      ),
      b(
        "Die Signalwörter",
        [L("**before** = bevor", "**after** = nachdem", "**already** = schon"), "*After she **had finished** her homework, she went out.*"],
        "Diese drei Wörter zeigen dir eine Reihenfolge an. Im Beispiel macht sie zuerst die Hausaufgaben fertig und geht danach hinaus. Das Frühere bekommt had finished, das Spätere bekommt das Simple Past.",
        { tasks: [k("After he ___ the film, he went to bed.", "had watched", ["has watched"], "Erst der Film, dann das Bett. Das Frühere steht im Past Perfect.", "Was passierte zuerst? Und beides ist schon vorbei.")] },
      ),
      b(
        "Jetzt du: Was war zuerst?",
        "Tipp bei jedem Satz auf die richtige Antwort.",
        "Frag dich bei jedem Satz, welche der beiden Handlungen zuerst passiert ist. Genau diese Handlung bekommt had und die dritte Form.",
        {
          tasks: [
            k("When we got to the cinema, the film ___.", "had started", ["starts"], "Der Film fing an, bevor wir da waren. Das Frühere steht im Past Perfect.", "Was passierte zuerst: Der Film fing an, oder wir kamen an?"),
            k("I was hungry because I ___ breakfast.", "hadn't eaten", ["don't eat"], "Das fehlende Frühstück liegt noch vor dem Hunger. Hadn't ist die Kurzform von had not.", "Was kam zuerst: der Hunger oder das Frühstück, das ausfiel?"),
            k("The bus had left when I arrived. Zuerst passierte: ___", "Der Bus fuhr ab.", ["Ich kam an."], "Had left zeigt, dass diese Handlung noch früher war.", "Welche der beiden Handlungen trägt das Wort had?"),
          ],
        },
      ),
    ),
    ch(
      "Die Zukunft: will und going to",
      b(
        "Später",
        ["*It **will rain** tomorrow.*", "= Morgen wird es regnen.", "Für das, was **noch kommt**, hat das Englische zwei Formen."],
        "Jetzt schauen wir auf die rechte Seite des Zeitstrahls. Dort liegt alles, was noch nicht passiert ist. Im Deutschen sagst du es wird regnen oder einfach morgen regnet es. Im Englischen gibt es zwei Möglichkeiten, und sie bedeuten nicht ganz dasselbe.",
        { figure: { type: "timeline", points: [{ at: 0.6, label: "will rain" }] } },
      ),
      b(
        "will: vermuten und versprechen",
        ["**will** + Grundform", L("*I think it **will** rain.* (eine Vermutung)", "*I **will** help you.* (ein Versprechen)"), "Diese Form heißt **will-future**."],
        "Will benutzt du, wenn du etwas vermutest oder versprichst. Du benutzt es auch, wenn du dich gerade erst in diesem Moment entscheidest. Jemand lässt seine Tasche fallen, und du sagst: I will help you. Vorsicht, will heißt hier werden und nicht wollen.",
      ),
      b(
        "will ist für alle gleich",
        [L("I **will** go. She **will** go. They **will** go.", "Kurzform: I**'ll** go. She**'ll** go.", "Nein-Satz: I **won't** go. (will not)")],
        "Auch diese Form ist leicht. Will bleibt für jede Person gleich und bekommt nie ein s. Dahinter steht das Verb in der Grundform. Beim Sprechen hörst du fast immer die Kurzform mit dem Apostroph. Won't ist die Kurzform von will not.",
        { tasks: [k("She ___ you tomorrow.", "will call", ["wills call"], "Will bekommt nie ein s, auch nicht bei she. Dahinter steht die Grundform.", "Verändert sich das erste Wort bei he, she, it? Schau in die erste Zeile der Tafel.")] },
      ),
      b(
        "going to: ein fester Plan",
        ["*I **am going to** visit my aunt on Sunday.*", "Der Plan steht schon fest.", "**am / is / are going to** + Grundform", "Diese Form heißt **going to-future**."],
        "Going to benutzt du, wenn etwas schon geplant ist. Der Besuch bei der Tante ist ausgemacht, vielleicht steht er sogar im Kalender. Die Form beginnt mit am, is oder are, je nach Person. Danach kommt going to und das Verb in der Grundform.",
      ),
      b(
        "going to: Man sieht es kommen",
        ["*Look at those clouds! It **is going to** rain.*", "Die Wolken sind schon da.", "Man **sieht**, was gleich passiert."],
        "Es gibt noch einen zweiten Fall für going to. Du benutzt es, wenn du mit eigenen Augen siehst, dass etwas gleich passieren wird. Der Himmel ist dunkel, also regnet es gleich. Ein Glas steht ganz am Tischrand, also fällt es gleich herunter.",
      ),
      b(
        "will oder going to?",
        [L("Gerade erst entschieden, vermutet oder versprochen:", "**will**"), L("Schon geplant oder schon zu sehen:", "**going to**")],
        "So kannst du die beiden auseinanderhalten. Frag dich: Stand das schon vorher fest, oder kann man es schon sehen? Dann ist es going to. Ist es nur eine Vermutung, ein Versprechen oder eine spontane Idee? Dann ist es will.",
        { tasks: [k("Die Karten sind gekauft, der Koffer ist gepackt. Das ist ___.", "ein fester Plan", ["eine spontane Idee"], "Wer schon Karten gekauft hat, hat sich längst entschieden.", "Wurde das gerade erst entschieden, oder ist schon etwas vorbereitet?")] },
      ),
      b(
        "Jetzt du: Zukunft",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Stell dir bei jedem Satz die Frage von eben. Ist es ein Versprechen oder eine Vermutung? Oder steht der Plan schon fest, oder sieht man es schon kommen?",
        {
          tasks: [
            k("I promise I ___ you tonight.", "will call", ["am going to call"], "Promise heißt versprechen. Für ein Versprechen nimmst du will.", "Was bedeutet promise? Zu welcher der beiden Formen gehört das?"),
            k("We have bought the tickets. We ___ to Rome in July.", "are going to fly", ["will fly"], "Die Karten sind gekauft. Das ist ein fester Plan, also going to.", "Was verrät dir der erste Satz? Ist schon etwas vorbereitet?"),
            k("Look! That glass ___.", "is going to fall", ["will fall"], "Du siehst das Glas am Rand stehen. Man sieht kommen, was gleich passiert.", "Look bedeutet: Du siehst es mit eigenen Augen. Welche Form passt dazu?"),
          ],
        },
      ),
    ),
    ch(
      "Alle Zeiten auf einem Zeitstrahl",
      b(
        "Schon die ganze Zeit",
        ["*She **has been waiting** for two hours.*", "= Sie wartet schon seit zwei Stunden.", "**have / has been** und das Verb mit **-ing**", "Diese Zeitform heißt **Present Perfect Progressive**."],
        "Eine letzte Zeit fehlt noch, und ihr Name ist der längste. Du benutzt sie, wenn etwas früher angefangen hat, immer noch läuft und die Dauer wichtig ist. Sie wartet und wartet. Du erkennst diese Zeit an been und an dem ing dahinter.",
      ),
      b(
        "Der ganze Zeitstrahl",
        [L("noch früher: *had left*", "früher: *left, was leaving*", "bis jetzt: *has left*", "jetzt: *leaves, is leaving*", "später: *will leave, is going to leave*")],
        "Hier siehst du alle Zeiten mit demselben Verb, von links nach rechts. Ganz links steht das Past Perfect. Dann kommen die beiden Zeiten für früher. Das Present Perfect reicht bis jetzt. In der Mitte stehen die beiden Zeiten für jetzt, und rechts die Zukunft.",
        { tasks: [k("When I arrived, the bus ___. (Der Bus war da schon weg.)", "had left", ["leaves"], "Der Bus fuhr ab, bevor ich ankam. Für das, was noch früher war, steht had mit der 3. Form.", "Was passierte zuerst: die Abfahrt oder meine Ankunft? Such die Zeile für noch früher.")] },
      ),
      b(
        "Drei Fragen für jede Aufgabe",
        ["(1) Steht ein **Signalwort** im Satz?", "(2) Wann passiert es: früher, jetzt oder später?", "(3) Läuft es gerade, oder ist es fertig?"],
        "Diese drei Fragen passen auf jede Aufgabe zu den Zeiten. Du gehst sie immer in dieser Reihenfolge durch. Meistens reicht schon die erste Frage, weil ein Signalwort im Satz steht. Wenn nicht, helfen dir die zweite und die dritte.",
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Jetzt kommen Sätze aus allen drei Lektionen zu den Zeiten. Such zuerst das Signalwort. Wenn du unsicher bist, geh die drei Fragen von der letzten Tafel durch.",
        {
          tasks: [
            k("Listen! Someone ___ at the door.", "is knocking", ["knocked"], "Listen zeigt auf diesen Moment. Es passiert gerade, also Present Progressive.", "Was verrät dir das erste Wort im Satz?"),
            k("I ___ my arm last year.", "broke", ["have broken"], "Last year sagt, wann es war. Dann steht das Simple Past.", "Steht im Satz, wann es passiert ist? Ist diese Zeit vorbei?"),
            k("I think Germany ___ the match.", "will win", ["wins"], "I think zeigt eine Vermutung über die Zukunft. Dafür nimmst du will.", "I think heißt ich glaube. Ist das sicher, oder vermutest du es nur?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Past Progressive**: Es lief gerade, als etwas passierte.", "**Past Perfect**: Es war noch früher."), L("**will**: Vermutung, Versprechen, spontane Entscheidung.", "**going to**: fester Plan, oder man sieht es kommen.")],
        "Das waren die letzten Zeiten. Du musst sie nicht alle heute sicher können. Auf dem Spickzettel zu den Zeiten findest du jede noch einmal mit Bau, Beispiel und Signalwörtern. Jetzt kommen die Wörter und ein kleines Quiz.",
        { tasks: [k("I was sleeping when the phone ___.", "rang", ["was ringing"], "Das Klingeln ist die kurze Handlung, die dazwischenkommt.", "Welche der beiden Handlungen ist die kurze?")] },
      ),
    ),
  ],
  [
    v("Past Progressive", "Die Zeit für etwas, das in der Vergangenheit gerade lief. Was oder were und das Verb mit ing.", "I was playing when it started to rain."),
    v("Past Perfect", "Die Zeit für das, was noch früher war als etwas anderes in der Vergangenheit. Had und die 3. Form.", "The bus had left when I arrived."),
    v("will-future", "Zukunft für Vermutungen, Versprechen und spontane Entscheidungen. Will und die Grundform.", "I think it will rain."),
    v("going to-future", "Zukunft für feste Pläne und für das, was man schon kommen sieht.", "I am going to visit my aunt."),
    v("Present Perfect Progressive", "Etwas hat früher angefangen und läuft noch, und die Dauer ist wichtig. Have oder has been und das Verb mit ing.", "She has been waiting for two hours."),
    v("while / when", "Während und als. Nach while steht meist die lange Handlung, nach when die kurze."),
    v("won't", "Die Kurzform von will not.", "I won't be late."),
  ],
  [
    q("I ___ TV when the phone rang.", "was watching", ["watched", "am watching", "were watching"], "Das Fernsehen lief schon, als das Telefon klingelte. Die lange Handlung steht im Past Progressive, und zu I gehört was."),
    q("When I got home, my sister ___ all the pizza.", "had eaten", ["eats", "has eaten", "was eat"], "Erst hat die Schwester die Pizza gegessen, dann kam ich nach Hause. Das Frühere steht im Past Perfect."),
    q("Look at those clouds! It ___.", "is going to rain", ["will rain", "rained", "rains"], "Die Wolken sind schon zu sehen. Wenn man etwas kommen sieht, nimmt man going to."),
    q("Don't worry, I ___ you with your homework.", "will help", ["am going to help", "helped", "was helping"], "Das ist ein Versprechen, das gerade in diesem Moment gegeben wird. Dafür nimmt man will."),
    q("They ___ football when it started to rain.", "were playing", ["was playing", "play", "have played"], "Das Spiel lief schon, als der Regen anfing. They sind mehrere, deshalb heißt es were."),
    q("Welcher Satz ist richtig?", "She will come tomorrow.", ["She wills come tomorrow.", "She will comes tomorrow.", "She will to come tomorrow."], "Will bekommt nie ein s, und danach steht das Verb in der Grundform ohne to."),
    q("We have booked a hotel. We ___ a week in Spain.", "are going to spend", ["will spend maybe", "spent", "had spent"], "Das Hotel ist gebucht. Ein fester Plan steht mit going to."),
    q("She ___ for the bus for twenty minutes.", "has been waiting", ["is wait", "had wait", "waits since"], "Sie wartet immer noch, und die Dauer ist wichtig. Dafür steht has been und das Verb mit ing."),
  ],
);
