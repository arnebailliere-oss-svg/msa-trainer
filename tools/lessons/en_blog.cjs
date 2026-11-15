// Guided lesson: answering a blog post, giving an opinion, linking words.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_03b_blog.json",
  {
    id: "P_EN_BLOG",
    subject: "EN",
    title: "Deine Meinung schreiben: die Blog-Antwort",
    teaser: "Wie du auf einen Blogbeitrag antwortest: Meinung, Grund, Beispiel und Schluss. Dazu die kleinen Wörter, die Sätze verbinden, und wie du höflich zustimmst oder widersprichst.",
    hook: "In dieser Schreibaufgabe fragt dich jemand nach deiner Meinung. Das klingt schwieriger, als es ist. Eine Meinung auf Englisch besteht aus vier Bausteinen, und für jeden gibt es ein paar feste Wörter. Wenn du diese Bausteine kennst, setzt du sie einfach hintereinander.",
    outro: "Du kannst jetzt auf einen Blogbeitrag antworten. Du sagst deine Meinung, nennst einen Grund mit because, gibst ein Beispiel von dir und schließt freundlich ab. Mit Wörtern wie but, so und however verbindest du deine Sätze, und du weißt, wie man höflich zustimmt oder widerspricht.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Die Aufgabe verstehen",
      b(
        "Was ist ein Blog?",
        ["Ein **Blog** ist eine Seite im Internet, auf der jemand über ein Thema schreibt.", "Am Ende stellt er oft **Fragen** an seine Leser.", "Du schreibst ihm eine **Antwort**."],
        "In der Prüfung bekommst du einen kurzen Beitrag aus so einem Blog. Die Themen sind immer aus deinem Alltag: Handys, Schule, Essen, Freizeit. Deine Aufgabe ist es, dem Schreiber zu antworten, so wie in einem Kommentar unter seinem Beitrag.",
      ),
      b(
        "Ein Beispiel",
        ["*Sam writes: I spend five hours a day on my phone. My parents say that's too much. What do you think? How much time do you spend online?*"],
        "Auf Deutsch schreibt Sam: Ich verbringe fünf Stunden am Tag an meinem Handy. Meine Eltern sagen, das ist zu viel. Was denkst du? Wie viel Zeit verbringst du im Internet? Lies den Beitrag in Ruhe. Was will Sam von dir wissen?",
      ),
      b(
        "Zwei Fragen, zwei Antworten",
        [L("(1) *What do you think?*", "Sam fragt nach deiner **Meinung**."), L("(2) *How much time do you spend online?*", "Sam fragt nach deiner **Erfahrung**.")],
        "Wie bei der E-Mail zählst du zuerst die Fragen. Hier sind es zwei. Die erste fragt, was du über das Thema denkst. Die zweite fragt, wie es bei dir selbst ist. Beide Fragen musst du beantworten, sonst fehlen dir Punkte für den Inhalt.",
        { tasks: [k("What do you think? fragt nach ___.", "deiner Meinung", ["einer Uhrzeit"], "To think heißt denken. Sam will wissen, was du darüber denkst.", "Was bedeutet das Wort think auf Deutsch?")] },
      ),
      b(
        "Wie lang soll die Antwort sein?",
        ["Meistens steht dabei: *Write at least 100 words.*", "Mit **vier Bausteinen** erreichst du diese Länge ohne Mühe."],
        "Hundert Wörter klingen nach viel. Wenn du aber weißt, was du schreiben sollst, sind sie schnell erreicht. Du brauchst eine Meinung, einen Grund, ein Beispiel von dir und einen freundlichen Schluss. Diese vier Bausteine schauen wir uns jetzt einzeln an.",
        { tasks: [k("Verlangt sind at least 100 words. Du schreibst 70. Das gibt ___.", "einen Abzug", ["volle Punkte"], "At least heißt mindestens. Ein zu kurzer Text kostet Punkte.", "Was bedeutet at least? Sind 70 Wörter genug?")] },
      ),
    ),
    ch(
      "Die vier Bausteine",
      b(
        "Baustein 1: die Meinung",
        ["***In my opinion**, five hours is too much.*", "So kannst du auch anfangen: *I think …* oder *I believe …*"],
        "Mit dem ersten Satz sagst du klar, was du denkst. In my opinion bedeutet meiner Meinung nach. I think heißt ich denke, und I believe heißt ich glaube. Such dir eine dieser drei Wendungen aus. Dahinter kommt deine Meinung in einem einfachen Satz.",
      ),
      b(
        "Baustein 2: der Grund",
        ["*… **because** you have no time for friends or sport.*", "because = weil", "Eine Meinung ohne Grund ist nur eine Behauptung."],
        "Jetzt erklärst du, warum du so denkst. Dafür brauchst du das Wort because. Dieser Baustein ist der wichtigste, denn für eine begründete Meinung gibt es die Punkte. Frag dich nach jedem Satz mit I think: Habe ich auch gesagt, warum?",
        { tasks: [k("I think phones are useful ___ you can learn with them.", "because", ["but"], "Der zweite Teil nennt den Grund. Dafür steht das Wort für weil.", "Nennt der zweite Teil einen Grund oder einen Gegensatz?")] },
      ),
      b(
        "Baustein 3: das Beispiel von dir",
        ["***For example**, I use my phone for about two hours a day.*", "for example = zum Beispiel"],
        "Mit dem dritten Baustein beantwortest du Sams zweite Frage. Du erzählst von dir selbst. Das macht deinen Text lebendig und bringt viele Wörter. Es muss nichts Besonderes sein. Ein ehrlicher Satz aus deinem Alltag reicht völlig.",
      ),
      b(
        "Die andere Seite zeigen",
        ["***On the one hand**, phones are useful.*", "***On the other hand**, they can take too much time.*"],
        "Manchmal gibt es gute Gründe für beide Seiten. Dann kannst du beide nennen. On the one hand bedeutet einerseits, on the other hand bedeutet andererseits. Mit diesem Paar zeigst du, dass du über das Thema nachgedacht hast.",
      ),
      b(
        "Wörter, die Sätze verbinden",
        [L("**and** = und", "**but** = aber", "**because** = weil", "**so** = deshalb", "**however** = jedoch", "**also** = auch")],
        "Kurze Sätze hintereinander klingen abgehackt. Mit diesen kleinen Wörtern verbindest du sie. But zeigt einen Gegensatz. So zeigt eine Folge. However bedeutet dasselbe wie but, steht aber am Satzanfang und bekommt ein Komma dahinter.",
        { tasks: [k("It was late, ___ I went home.", "so", ["because"], "Das Heimgehen ist die Folge davon, dass es spät war.", "Was kam zuerst: dass es spät war, oder dass ich ging? Welches Wort zeigt die Folge?")] },
      ),
      b(
        "Baustein 4: der Schluss",
        [L("*What about you?*", "*Thanks for your post!*"), "Ein freundlicher letzter Satz, gern mit einer Frage zurück."],
        "Am Ende schreibst du noch einen freundlichen Satz. What about you bedeutet: Und wie ist es bei dir? Damit gibst du die Frage zurück, wie in einem echten Gespräch. A post ist ein Beitrag in einem Blog.",
      ),
      b(
        "Jetzt du: die Bausteine erkennen",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Hier siehst du Satzanfänge und Verbindungswörter. Überleg bei jedem, welche Aufgabe er im Text hat. Leitet er eine Meinung ein, einen Grund, ein Beispiel oder einen Gegensatz?",
        {
          tasks: [
            k("In my opinion, … leitet ___ ein.", "die Meinung", ["das Beispiel"], "Opinion heißt Meinung. So beginnt Baustein eins.", "Was bedeutet das Wort opinion auf Deutsch?"),
            k("For example, … leitet ___ ein.", "ein Beispiel", ["einen Grund"], "Example heißt Beispiel. So beginnt Baustein drei.", "Welches deutsche Wort steckt in example?"),
            k("I like games, ___ I don't play every day.", "but", ["because"], "Der zweite Teil ist ein Gegensatz zum ersten. Dafür steht das Wort für aber.", "Passt der zweite Teil zum ersten, oder ist er ein Gegensatz?"),
          ],
        },
      ),
    ),
    ch(
      "Zustimmen und widersprechen",
      b(
        "Zustimmen",
        [L("*I agree with you.*", "= Ich stimme dir zu."), L("*You are right.*", "= Du hast recht."), L("*That's a good point.*", "= Das ist ein gutes Argument.")],
        "Oft möchtest du auf das eingehen, was der Schreiber gesagt hat. Wenn du derselben Meinung bist, nimmst du einen dieser Sätze. To agree bedeutet zustimmen. Danach sagst du wieder mit because, warum du zustimmst.",
      ),
      b(
        "Höflich widersprechen",
        [L("*I don't agree.*", "= Ich stimme nicht zu."), L("*I see your point, but …*", "= Ich verstehe, was du meinst, aber …"), L("*I'm not sure about that.*", "= Da bin ich mir nicht sicher.")],
        "Du darfst auch anderer Meinung sein. Das ist sogar interessanter zu lesen. Wichtig ist, dass du höflich bleibst. Mit I see your point, but zeigst du zuerst Verständnis und sagst dann deine eigene Sicht.",
        { tasks: [k("Ich stimme dir zu. = ___", "I agree with you.", ["I am agree with you."], "Agree ist schon das Verb. Ein am davor ist falsch.", "Ist agree ein Verb? Braucht ein Verb noch ein am davor?")] },
      ),
      b(
        "Die Falle: I am agree",
        ["Falsch: *I am agree.*", "Richtig: *I **agree**.*", "Agree ist selbst das Verb."],
        "Dieser Fehler kommt vom Deutschen. Dort sagt man: Ich bin einverstanden. Deshalb möchte man I am agree schreiben. Im Englischen ist agree aber ein Verb wie play oder like. Du sagst ja auch nicht I am play.",
      ),
      b(
        "Jetzt du: ein kleiner Text",
        "Bau den Text zusammen. Tipp bei jeder Lücke auf das passende Wort.",
        "Das Thema ist: Sollte die Schule später anfangen? Die drei Sätze gehören zusammen und bilden eine kleine Antwort. Überleg bei jeder Lücke, welcher Baustein dort gebraucht wird.",
        {
          tasks: [
            k("___, school should start later.", "In my opinion", ["For example"], "Der Satz sagt, was der Schreiber denkt. Das ist die Meinung.", "Was sagt dieser Satz: eine Meinung oder ein Beispiel?"),
            k("Teenagers need more sleep, ___ they are often tired.", "so", ["but"], "Die Müdigkeit ist die Folge davon, dass Schlaf fehlt.", "Ist der zweite Teil eine Folge oder ein Gegensatz?"),
            k("___, I am always tired at eight o'clock.", "For example", ["On the other hand"], "Der Schreiber erzählt von sich. Das ist das Beispiel.", "Erzählt der Schreiber hier von sich selbst, oder nennt er die Gegenseite?"),
          ],
        },
      ),
      b(
        "Deine Checkliste",
        ["(1) Alle Fragen beantwortet?", "(2) Meinung mit **because** begründet?", "(3) Ein Beispiel von dir?", "(4) Ein freundlicher Schluss?", "(5) Wörter gezählt?"],
        "Mit diesen fünf Punkten prüfst du deine Antwort, bevor du sie abgibst. Wenn dir noch Wörter fehlen, schreib einen zweiten Grund oder ein zweites Beispiel dazu. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Der wichtigste Baustein nach der Meinung ist ___.", "der Grund", ["die Anrede"], "Für eine begründete Meinung gibt es die Punkte.", "Was macht aus einer Behauptung eine überzeugende Meinung?")] },
      ),
    ),
  ],
  [
    v("Blog", "Eine Seite im Internet, auf der jemand regelmäßig über ein Thema schreibt."),
    v("In my opinion", "Meiner Meinung nach. So beginnt eine Meinung.", "In my opinion, five hours is too much."),
    v("because", "Weil. So nennst du einen Grund."),
    v("For example", "Zum Beispiel."),
    v("On the one hand / On the other hand", "Einerseits und andererseits."),
    v("but, so, however", "Aber, deshalb, jedoch. Wörter, die Sätze verbinden."),
    v("I agree", "Ich stimme zu. Ohne am davor.", "I agree with you."),
  ],
  [
    q("Sam schreibt: What do you think? Was will er wissen?", "deine Meinung", ["deinen Namen", "die Uhrzeit", "dein Alter"], "To think heißt denken. Sam fragt, was du über das Thema denkst."),
    q("Mit welchen Wörtern kannst du eine Meinung beginnen?", "In my opinion,", ["For example,", "Because", "Yours sincerely,"], "In my opinion bedeutet meiner Meinung nach. For example leitet ein Beispiel ein, because einen Grund."),
    q("I like my phone ___ I can talk to my friends.", "because", ["but", "so", "however"], "Der zweite Teil nennt den Grund, warum der Schreiber sein Handy mag. Dafür steht because."),
    q("I was tired, ___ I went to bed early.", "so", ["because", "but", "for example"], "Früh ins Bett zu gehen ist die Folge der Müdigkeit. Eine Folge zeigt man mit so."),
    q("Welcher Satz ist richtig?", "I agree with you.", ["I am agree with you.", "I agree you.", "I am agreeing you with."], "Agree ist ein Verb und braucht kein am. Nach agree steht with und dann die Person."),
    q("Was bedeutet On the other hand?", "andererseits", ["zum Beispiel", "deshalb", "meiner Meinung nach"], "On the one hand heißt einerseits, on the other hand heißt andererseits. So zeigt man zwei Seiten."),
    q("Welcher Satz passt als Schluss einer Blog-Antwort?", "What about you?", ["Dear Sir or Madam,", "Subject: Phones", "I am writing to ask about prices."], "Am Ende gibt man die Frage freundlich zurück. Die anderen Sätze gehören in eine formelle E-Mail."),
    q("Welcher Baustein fehlt? In my opinion, homework is important. For example, I learn a lot from it.", "der Grund mit because", ["die Meinung", "das Beispiel", "die Anrede"], "Der Text hat eine Meinung und ein Beispiel. Es fehlt der Satz, der mit because erklärt, warum."),
  ],
);
