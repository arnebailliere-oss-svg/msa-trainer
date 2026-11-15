// Guided lesson: if-clauses type 1, 2 and a look at type 3.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_05c_if.json",
  {
    id: "P_EN_IF",
    subject: "EN",
    title: "if-Sätze: wenn, dann",
    teaser: "Sätze mit if, Schritt für Schritt: Typ 1 für das, was gut passieren kann, Typ 2 für das, was du dir nur vorstellst, und ein Blick auf Typ 3 für das, was sich nicht mehr ändern lässt.",
    hook: "Wenn es regnet, bleibe ich zu Hause. Wenn ich reich wäre, würde ich um die Welt reisen. Solche Sätze mit wenn sagst du ständig. Im Englischen beginnen sie mit if. Es gibt davon drei Sorten, und jede hat ein festes Muster. Wir bauen sie nacheinander auf.",
    outro: "Du kennst jetzt die drei Sorten von if-Sätzen. Bei Typ 1 kann etwas gut passieren, bei Typ 2 stellst du es dir nur vor, und bei Typ 3 ist es zu spät. Und du weißt, was in allen drei Fällen gilt: Im Teil mit if steht weder will noch would.",
    requires: ["P_EN_VERBFORMEN", "P_EN_ZEITFORMEN"],
  },
  [
    ch(
      "Typ 1: Das kann gut passieren",
      b(
        "Wenn, dann",
        ["Wenn es regnet, bleibe ich zu Hause.", "Der Satz hat **zwei Teile**: eine **Bedingung** und eine **Folge**."],
        "Schau dir den deutschen Satz an. Der erste Teil nennt eine Bedingung: Es muss regnen. Der zweite Teil sagt, was dann passiert: Ich bleibe zu Hause. Ohne die Bedingung gibt es die Folge nicht. Genau so sind die englischen Sätze gebaut.",
      ),
      b(
        "Im Englischen: if",
        ["***If** it rains, I will stay at home.*", "Der Teil mit if ist die Bedingung.", "So ein Satz heißt **if-Satz**."],
        "If bedeutet hier wenn oder falls. Der Teil mit if nennt die Bedingung, der andere Teil nennt die Folge. Schau genau hin, welche Formen in den beiden Teilen stehen. Auf der nächsten Tafel sehen wir uns das Muster an.",
      ),
      b(
        "Das Muster von Typ 1",
        [L("Teil mit if: **Simple Present**", "Anderer Teil: **will** + Grundform"), "*If it **rains**, I **will stay** at home.*"],
        "Diesen ersten Typ benutzt du, wenn etwas gut passieren kann. Vielleicht regnet es morgen wirklich. Im Teil mit if steht das Simple Present, obwohl es um die Zukunft geht. Im anderen Teil steht will und die Grundform.",
        { tasks: [k("If you hurry, you ___ the bus.", "will catch", ["caught"], "Im Teil ohne if steht will und die Grundform.", "Welche Form gehört in den Teil ohne if? Schau auf das Muster.")] },
      ),
      b(
        "Die Falle: kein will nach if",
        ["Falsch: *If it will rain, I will stay at home.*", "Richtig: *If it **rains**, I will stay at home.*", "Im Teil mit if steht **nie** will."],
        "Im Deutschen kannst du sagen: Wenn es regnen wird. Deshalb möchte man im Englischen auch nach if ein will setzen. Das ist aber falsch. Merk dir diesen einen Satz, er gilt für alle if-Sätze: Im Teil mit if steht kein will.",
        { tasks: [k("If she ___, I will be happy.", "comes", ["will come"], "Im Teil mit if steht das Simple Present. Bei she kommt das s dazu.", "In welchem Teil des Satzes steht die Lücke? Darf dort will stehen?")] },
      ),
      b(
        "Jetzt du: Typ 1",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Schau bei jedem Satz zuerst, in welchem Teil die Lücke steht. Ist es der Teil mit if, dann brauchst du das Simple Present. Ist es der andere Teil, dann brauchst du will.",
        {
          tasks: [
            k("If I ___ time, I will help you.", "have", ["will have"], "Die Lücke steht im Teil mit if. Dort steht das Simple Present.", "Steht die Lücke im Teil mit if oder im anderen Teil?"),
            k("If you don't study, you ___ the test.", "will fail", ["failed"], "Die Lücke steht im Teil ohne if. Dort steht will und die Grundform.", "In welchem Teil fehlt etwas? Welche Form gehört dorthin?"),
            k("We will go swimming if the sun ___.", "shines", ["will shine"], "Der Teil mit if steht hier hinten. Auch dort gilt: kein will.", "Wo steht das Wort if in diesem Satz? Gilt die Regel dort auch?"),
          ],
        },
      ),
    ),
    ch(
      "Typ 2: Stell dir vor",
      b(
        "Ein Traum",
        ["*If I **won** the lottery, I **would buy** a house.*", "= Wenn ich im Lotto gewinnen würde, würde ich ein Haus kaufen.", "Das ist **nicht wirklich** so. Man stellt es sich nur vor."],
        "Jetzt kommt die zweite Sorte. Hier geht es um etwas, das nicht wahr ist oder sehr unwahrscheinlich. Du hast nicht im Lotto gewonnen. Du malst dir nur aus, was dann wäre. Im Deutschen erkennst du das an würde und wäre.",
      ),
      b(
        "Das Muster von Typ 2",
        [L("Teil mit if: **Simple Past**", "Anderer Teil: **would** + Grundform"), "*If I **had** more time, I **would learn** Spanish.*"],
        "Beide Teile rücken sozusagen einen Schritt zurück. Aus dem Simple Present wird das Simple Past. Aus will wird would. Would ist das englische Wort für würde. Auch hier steht would nur im Teil ohne if.",
      ),
      b(
        "Vergangenheit, aber nicht gestern",
        ["*If I **had** a dog, I would go for walks.*", "Das Simple Past zeigt hier nicht gestern.", "Es zeigt: Das ist **nur vorgestellt**."],
        "Das verwirrt viele. Had ist die Vergangenheit von have, aber der Satz spricht nicht über früher. Er spricht über jetzt, nur eben über etwas, das nicht stimmt. Im Deutschen ist es ähnlich: Wenn ich einen Hund hätte.",
        { tasks: [k("If I had a dog, I would go for walks. Hat der Sprecher einen Hund? ___", "Nein", ["Ja"], "Der Satz stellt sich nur vor, wie es mit einem Hund wäre.", "Ist das ein Bericht über die Wirklichkeit, oder malt sich jemand etwas aus?")] },
      ),
      b(
        "If I were you",
        ["*If I **were** you, I **would** tell her.*", "= An deiner Stelle würde ich es ihr sagen.", "Nach if sagt man **were**, auch bei I, he, she, it."],
        "Das ist ein Satz, den du in Schreibaufgaben gut gebrauchen kannst, wenn du einen Rat gibst. Normalerweise heißt es I was. In diesen vorgestellten Sätzen sagt man aber were für alle Personen. If I were you ist eine feste Wendung.",
        { tasks: [k("If I ___ rich, I would travel.", "were", ["am"], "Der Satz ist nur vorgestellt. Nach if steht dann diese Form für alle Personen.", "Ist der Sprecher wirklich reich? Welche Form steht dann nach if?")] },
      ),
      b(
        "Kein would nach if",
        ["Falsch: *If I would have time, I would help.*", "Richtig: *If I **had** time, I would help.*"],
        "Hier ist die Falle dieselbe wie bei Typ 1. Im Deutschen sagst du: Wenn ich Zeit haben würde. Im Englischen steht im Teil mit if kein would. Dort steht das Simple Past. Would gehört nur in den anderen Teil.",
      ),
      b(
        "Jetzt du: Typ 2",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Alle drei Sätze sind nur vorgestellt. Schau wieder zuerst, in welchem Teil die Lücke steht. Im Teil mit if brauchst du das Simple Past, im anderen Teil would.",
        {
          tasks: [
            k("If I ___ a car, I would drive to school.", "had", ["would have"], "Die Lücke steht im Teil mit if. Dort steht das Simple Past.", "In welchem Teil steht die Lücke? Darf dort would stehen?"),
            k("If she lived here, we ___ her every day.", "would see", ["will see"], "Im Teil mit if steht das Simple Past. Dazu gehört im anderen Teil would.", "Welche Zeit steht im Teil mit if? Welches Wort gehört dann in den anderen Teil?"),
            k("If I were you, I ___ that.", "wouldn't do", ["don't do"], "If I were you leitet einen Rat ein. Im anderen Teil steht would, hier mit not.", "Mit welcher Wendung beginnt der Satz? Was folgt darauf immer?"),
          ],
        },
      ),
    ),
    ch(
      "Typ 1 oder Typ 2, und ein Blick auf Typ 3",
      b(
        "Kann es passieren, oder stellst du es dir nur vor?",
        [L("**Typ 1**: Es kann gut passieren.", "*If it rains, I will stay in.*"), L("**Typ 2**: Es ist nur vorgestellt.", "*If I were a bird, I would fly.*")],
        "Mit dieser einen Frage unterscheidest du die beiden Typen. Regen kann morgen wirklich kommen. Ein Vogel wirst du dagegen nie sein. Im Deutschen hörst du den Unterschied auch: wenn es regnet gegen wenn ich wäre.",
        { tasks: [k("Wenn ich ein Vogel wäre, würde ich fliegen. Das ist ___.", "nur vorgestellt", ["gut möglich"], "Ein Mensch kann kein Vogel werden. Der Satz malt sich etwas aus.", "Kann das wirklich passieren? Achte auf das Wort wäre.")] },
      ),
      b(
        "Die Paare gehören zusammen",
        [L("Typ 1: **Simple Present** und **will**", "Typ 2: **Simple Past** und **would**")],
        "Wenn du einen Teil des Satzes siehst, kennst du den anderen. Steht im Teil mit if das Simple Present, gehört will dazu. Steht dort das Simple Past, gehört would dazu. Die Paare werden nie gemischt.",
        { tasks: [k("If I had wings, I ___.", "would fly", ["will fly"], "Had ist Simple Past. Dazu gehört would.", "Welche Zeit steht im Teil mit if? Welches Wort ist ihr Partner?")] },
      ),
      b(
        "Typ 3: Es ist zu spät",
        ["*If I **had studied**, I **would have passed**.*", "= Wenn ich gelernt hätte, hätte ich bestanden.", "Es ist **vorbei**. Man kann es nicht mehr ändern."],
        "Die dritte Sorte spricht über die Vergangenheit. Die Prüfung ist geschrieben, und man hat nicht gelernt. Jetzt kann man sich nur noch ausmalen, wie es anders gelaufen wäre. Im Deutschen erkennst du das an hätte und wäre mit einem zweiten Verb.",
      ),
      b(
        "Das Muster von Typ 3",
        [L("Teil mit if: **had** + 3. Form", "Anderer Teil: **would have** + 3. Form")],
        "Auch hier rücken beide Teile wieder einen Schritt zurück. Typ 3 kommt im MSA seltener vor als die anderen beiden. Es reicht, wenn du ihn erkennst. Zwei Zeichen helfen dir dabei: had im Teil mit if und would have im anderen Teil.",
        { tasks: [k("If we had left earlier, we ___ the train.", "would have caught", ["will catch"], "Im Teil mit if steht had und die 3. Form. Dazu gehört would have.", "Was steht im Teil mit if? Welcher Partner gehört zu diesem Muster?")] },
      ),
      b(
        "Der Teil mit if kann auch hinten stehen",
        ["*If it rains, I will stay at home.*", "*I will stay at home if it rains.*", "Steht if vorn, kommt ein Komma. Steht if hinten, kommt keins."],
        "Beide Sätze bedeuten genau dasselbe. Du darfst die zwei Teile tauschen. Nur das Komma ändert sich. Wenn der Satz mit if beginnt, trennst du die beiden Teile durch ein Komma. Steht if in der Mitte, brauchst du keins.",
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Jetzt sind alle Typen gemischt. Schau zuerst auf den Teil, der vollständig ist. Er verrät dir den Typ. Dann weißt du, welcher Partner in die Lücke gehört.",
        {
          tasks: [
            k("If it is sunny tomorrow, we ___ to the beach.", "will go", ["would go"], "Is ist Simple Present. Dazu gehört will.", "Welche Zeit steht im Teil mit if? Welcher Partner gehört dazu?"),
            k("If I ___ you, I would say sorry.", "were", ["am"], "Would im anderen Teil zeigt Typ 2. Und es ist die feste Wendung für einen Rat.", "Welches Wort steht im anderen Teil? Welcher Typ ist das?"),
            k("If he ___ harder, he will pass.", "works", ["worked"], "Will im anderen Teil zeigt Typ 1. Dann steht nach if das Simple Present.", "Welches Wort steht im Teil ohne if? Was ist sein Partner?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("Typ 1: if + Simple Present, will", "Typ 2: if + Simple Past, would", "Typ 3: if + had + 3. Form, would have"), "Im Teil mit if steht **nie** will oder would."],
        "Das sind die drei Muster auf einen Blick. Du findest sie auch auf dem Spickzettel zur Grammatik. Der letzte Satz auf der Tafel ist der wichtigste, denn mit ihm vermeidest du den häufigsten Fehler. Gleich kommen die Wörter und das Quiz.",
        { tasks: [k("If I ___ time tomorrow, I will call you.", "have", ["will have"], "Im Teil mit if steht nie will, auch wenn es um morgen geht.", "In welchem Teil steht die Lücke? Welche Regel gilt dort immer?")] },
      ),
    ),
  ],
  [
    v("if-Satz", "Ein Satz mit if. Er hat zwei Teile: die Bedingung mit if und die Folge.", "If it rains, I will stay at home."),
    v("if", "Wenn oder falls."),
    v("Typ 1", "Etwas kann gut passieren. If und Simple Present, im anderen Teil will.", "If you hurry, you will catch the bus."),
    v("Typ 2", "Etwas ist nur vorgestellt. If und Simple Past, im anderen Teil would.", "If I had a car, I would drive."),
    v("Typ 3", "Etwas ist vorbei und nicht mehr zu ändern. If und had mit 3. Form, im anderen Teil would have.", "If I had studied, I would have passed."),
    v("would", "Würde.", "I would buy a house."),
    v("If I were you", "An deiner Stelle. So beginnt ein Rat.", "If I were you, I would tell her."),
  ],
  [
    q("If it rains, we ___ at home.", "will stay", ["stayed", "would stay", "stays"], "Rains ist Simple Present, also Typ 1. Im anderen Teil steht dann will und die Grundform."),
    q("Welcher Satz ist richtig?", "If she comes, I will be happy.", ["If she will come, I will be happy.", "If she comes, I am be happy.", "If she will comes, I am happy."], "Im Teil mit if steht nie will. Dort steht das Simple Present, und im anderen Teil steht will."),
    q("If I ___ a million euros, I would buy a boat.", "had", ["have", "will have", "would have"], "Would im anderen Teil zeigt Typ 2. Im Teil mit if steht dann das Simple Past."),
    q("If I were you, I ___ more.", "would sleep", ["will sleep", "sleep", "slept"], "If I were you leitet einen Rat ein. Das ist Typ 2, und im anderen Teil steht would."),
    q("If I were a bird, I would fly. Was bedeutet der Satz?", "Der Sprecher stellt es sich nur vor.", ["Der Sprecher ist ein Vogel.", "Es wird morgen so sein.", "Es war gestern so."], "Typ 2 beschreibt etwas, das nicht wirklich so ist. Man malt es sich nur aus."),
    q("If he had studied, he ___ the test.", "would have passed", ["will pass", "passes", "would pass"], "Had studied zeigt Typ 3. Dazu gehört im anderen Teil would have und die 3. Form."),
    q("Wo steht das Komma richtig?", "If you call me, I will come.", ["If you call me I will, come.", "I will come, if, you call me.", "If, you call me I will come."], "Beginnt der Satz mit if, trennt ein Komma die beiden Teile. Steht if in der Mitte, braucht man keins."),
    q("We will miss the train if we ___.", "don't hurry", ["won't hurry", "wouldn't hurry", "didn't hurried"], "Auch wenn der Teil mit if hinten steht, gilt die Regel: kein will nach if, sondern Simple Present."),
  ],
);
