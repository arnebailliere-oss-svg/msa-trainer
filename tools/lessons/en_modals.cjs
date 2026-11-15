// Guided lesson: modal verbs and their substitute forms.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_05b_modals.json",
  {
    id: "P_EN_MODALS",
    subject: "EN",
    title: "can, must, should: die Modalverben",
    teaser: "Was can, must, should und may bedeuten, welche drei Regeln für sie gelten und wo die Falle bei must not liegt. Dazu die Ersatzformen für gestern und morgen.",
    hook: "Ich kann, ich muss, ich darf, ich soll: Solche Sätze sagst du jeden Tag. Im Englischen gibt es dafür eine kleine Gruppe von Verben, die sich etwas anders verhalten als alle anderen. Das ist eine gute Nachricht, denn sie sind einfacher gebaut. Nur an einer Stelle musst du gut aufpassen.",
    outro: "Du kennst jetzt die wichtigsten Modalverben und ihre drei Regeln: kein s, danach die Grundform, Fragen ohne do. Du weißt, dass must not ein Verbot ist und don't have to nur bedeutet, dass etwas nicht nötig ist. Und für gestern und morgen hast du die Ersatzformen.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Was Modalverben sind",
      b(
        "Können, müssen, dürfen",
        [L("Ich **kann** schwimmen.", "Ich **muss** lernen.", "Ich **darf** gehen."), "Diese Wörter sagen nicht, was du tust. Sie sagen, ob du es **kannst, musst oder darfst**."],
        "Schau dir die drei deutschen Sätze an. In jedem stehen zwei Verben. Das zweite sagt, worum es geht: schwimmen, lernen, gehen. Das erste sagt etwas darüber, zum Beispiel ob du es kannst oder musst. Um dieses erste Verb geht es in dieser Lektion.",
      ),
      b(
        "Im Englischen",
        [L("*I **can** swim.*", "*I **must** learn.*", "*I **may** go.*"), "Solche Verben heißen **Modalverben**."],
        "Im Englischen ist der Satz genauso gebaut. Zuerst kommt das Modalverb, dann das zweite Verb. Can heißt können, must heißt müssen, und may heißt dürfen. Ein Modalverb steht nie allein. Es braucht immer ein zweites Verb, dem es hilft.",
      ),
      b(
        "Drei Regeln, die alles leicht machen",
        ["(1) Kein **-s** bei he, she, it: *She **can** swim.*", "(2) Danach steht die **Grundform** ohne to: *She can **swim**.*", "(3) Fragen und Nein-Sätze ohne do: ***Can** she swim?*"],
        "Diese drei Regeln gelten für alle Modalverben. Sie bekommen nie ein s, auch nicht bei she. Das Verb dahinter steht in der Grundform. Und für Fragen brauchst du kein do, weil das Modalverb selbst nach vorn rückt.",
        { tasks: [k("He ___ play the guitar.", "can", ["cans"], "Ein Modalverb bekommt nie ein s, auch nicht bei he.", "Schau auf Regel eins. Was passiert bei he, she, it?")] },
      ),
      b(
        "Die wichtigsten Modalverben",
        [L("**can** = können", "**must** = müssen", "**should** = sollte", "**may** = dürfen, oder: vielleicht", "**could** = könnte, oder: konnte")],
        "Das sind die fünf Modalverben, die im MSA am häufigsten vorkommen. Should benutzt du für einen Rat. May hat zwei Bedeutungen: Es fragt nach einer Erlaubnis, oder es sagt, dass etwas vielleicht passiert. It may rain heißt: Es regnet vielleicht.",
        { tasks: [k("should = ___", "sollte", ["müssen", "können"], "Should gibt einen Rat: Du solltest das tun.", "Schau in die dritte Zeile der Tafel.")] },
      ),
      b(
        "Jetzt du: die drei Regeln",
        "Tipp bei jedem Satz auf die richtige Form.",
        "In jedem Satz geht es um eine der drei Regeln. Kein s, die Grundform ohne to, und Fragen ohne do. Überleg bei jedem Satz, welche Regel hier gebraucht wird.",
        {
          tasks: [
            k("She ___ speak three languages.", "can", ["cans"], "Modalverben bekommen nie ein s, auch nicht bei she.", "Welche der drei Regeln gilt für he, she, it?"),
            k("You should ___ more water.", "drink", ["to drink"], "Nach einem Modalverb steht die Grundform ohne to.", "Steht nach einem Modalverb ein to oder nicht?"),
            k("___ help me?", "Can you", ["Do you can"], "Das Modalverb rückt selbst nach vorn. Ein do brauchst du nicht.", "Brauchen Modalverben für eine Frage den Helfer do?"),
          ],
        },
      ),
    ),
    ch(
      "Die Falle mit must not",
      b(
        "must not ist ein Verbot",
        ["*You **must not** park here.*", "= Du **darfst** hier **nicht** parken.", "Das ist ein **Verbot**."],
        "Jetzt kommt die Stelle, an der du aufpassen musst. Must not sieht aus wie das deutsche musst nicht. Es bedeutet aber etwas ganz anderes, nämlich darfst nicht. Wer must not sagt, verbietet etwas.",
      ),
      b(
        "Nicht müssen heißt don't have to",
        ["*You **don't have to** come.*", "= Du **musst nicht** kommen.", "Du darfst kommen. Es ist nur nicht nötig."],
        "Wenn du sagen willst, dass etwas nicht nötig ist, brauchst du eine andere Form. Sie heißt don't have to. Bei he, she, it heißt sie doesn't have to. Niemand verbietet hier etwas. Man sagt nur, dass man es lassen kann.",
        { tasks: [k("Tomorrow is Sunday. You ___ get up early.", "don't have to", ["must not"], "Am Sonntag ist frühes Aufstehen nicht nötig. Verboten ist es aber nicht.", "Ist frühes Aufstehen am Sonntag verboten, oder ist es nur nicht nötig?")] },
      ),
      b(
        "Beide nebeneinander",
        [L("**must not** = verboten", "*You must not smoke here.*"), L("**don't have to** = nicht nötig", "*You don't have to pay. It's free.*")],
        "Lies beide Beispiele noch einmal in Ruhe. Im ersten Satz ist Rauchen verboten. Im zweiten Satz musst du nichts bezahlen, weil es kostenlos ist. Frag dich bei jeder Aufgabe: Ist es verboten, oder ist es nur nicht nötig?",
        { tasks: [k("You ___ touch that. It's dangerous!", "must not", ["don't have to"], "Dangerous heißt gefährlich. Hier wird etwas verboten.", "Was bedeutet dangerous? Darf man es dann anfassen?")] },
      ),
      b(
        "Um Erlaubnis fragen",
        [L("***Can** I go to the toilet?* (im Alltag)", "***May** I go to the toilet?* (höflich)", "***Could** I go to the toilet?* (höflich)")],
        "Wenn du um Erlaubnis bittest, hast du drei Möglichkeiten. Can ist die normale Form unter Freunden. May und could klingen höflicher. In einer formellen E-Mail oder gegenüber einem Lehrer passen may und could besser.",
      ),
      b(
        "should: ein guter Rat",
        [L("*You **should** see a doctor.*", "= Du solltest zum Arzt gehen."), L("*You **shouldn't** eat so much sugar.*", "= Du solltest nicht so viel Zucker essen.")],
        "Mit should gibst du jemandem einen Rat. Du befiehlst nichts, du empfiehlst nur etwas. Shouldn't ist die Kurzform von should not. In Schreibaufgaben brauchst du should oft, wenn du jemandem einen Tipp gibst.",
        { tasks: [k("You look tired. You ___ go to bed.", "should", ["must not"], "Wer müde aussieht, bekommt einen Rat: Geh lieber ins Bett.", "Wird hier etwas verboten, oder gibt jemand einen freundlichen Rat?")] },
      ),
      b(
        "Vier weitere, die du erkennen solltest",
        [L("**needn't** = nicht müssen, wie don't have to", "**might** = könnte vielleicht", "**Shall I …?** = Soll ich …?", "**Would you …?** = Würdest du …?")],
        "Diese vier kommen in Übungen und Texten vor. Needn't bedeutet dasselbe wie don't have to. Might ist eine vorsichtige Vermutung. Mit Shall I bietest du deine Hilfe an, und mit Would you bittest du höflich um etwas.",
        { tasks: [k("___ I carry your bag? (ein Angebot)", "Shall", ["Must"], "Mit dieser Frage bietet man seine Hilfe an: Soll ich …?", "Welches der Wörter auf der Tafel bedeutet soll ich?")] },
      ),
      b(
        "Jetzt du: Was ist gemeint?",
        "Tipp bei jedem Satz auf das passende Modalverb.",
        "Überleg bei jedem Satz zuerst auf Deutsch, was gemeint ist. Ist es ein Verbot, ein Rat, oder ist etwas einfach nicht nötig? Dann findest du das passende englische Wort.",
        {
          tasks: [
            k("It's a secret. You ___ tell anyone.", "must not", ["don't have to"], "Ein Geheimnis darf man nicht weitersagen. Das ist ein Verbot.", "Darf man ein Geheimnis weitersagen, oder ist das verboten?"),
            k("We have enough food. You ___ bring anything.", "don't have to", ["must not"], "Es ist genug Essen da. Etwas mitzubringen ist nicht nötig.", "Ist Mitbringen verboten, oder braucht man es einfach nicht?"),
            k("Your tooth hurts? You ___ see a dentist.", "should", ["may not"], "Bei Zahnschmerzen rät man: Geh zum Zahnarzt.", "Was sagt man zu jemandem, dem etwas wehtut: ein Verbot oder einen Rat?"),
          ],
        },
      ),
    ),
    ch(
      "Gestern und morgen: die Ersatzformen",
      b(
        "Das Problem",
        ["Modalverben haben **nicht für jede Zeit** eine Form.", "Es gibt kein *will can* und kein *musted*.", "Dafür gibt es **Ersatzformen**."],
        "Ein normales Verb kannst du in jede Zeit setzen. Bei Modalverben geht das nicht. Du kannst nicht I will can sagen. Deshalb hat jedes Modalverb einen Ersatz, der dasselbe bedeutet und sich wie ein normales Verb verhält.",
      ),
      b(
        "Ersatz für can: be able to",
        [L("Gestern: *I **could** swim.*", "Oder: *I **was able to** swim.*"), "Morgen: *I **will be able to** swim.*"],
        "Able bedeutet fähig. To be able to heißt also: fähig sein, etwas zu tun. Für die Vergangenheit kannst du auch einfach could nehmen. Für die Zukunft brauchst du die Ersatzform, denn will can gibt es nicht.",
      ),
      b(
        "Ersatz für must: have to",
        [L("Heute: *I **must** go.* oder *I **have to** go.*", "Gestern: *I **had to** go.*", "Morgen: *I **will have to** go.*")],
        "Have to bedeutet dasselbe wie must. Der Vorteil ist, dass have ein ganz normales Verb ist. Du kannst es in die Vergangenheit setzen, dann heißt es had to. Und mit will davor kommst du in die Zukunft.",
        { tasks: [k("Yesterday I ___ get up at five.", "had to", ["must"], "Yesterday ist vorbei. Must hat keine Vergangenheit, deshalb brauchst du den Ersatz.", "Welches Wort zeigt die Zeit? Hat must eine Form für die Vergangenheit?")] },
      ),
      b(
        "Ersatz für may: be allowed to",
        ["*I **was allowed to** stay up late.*", "= Ich durfte lange aufbleiben.", "*We **are not allowed to** use our phones.*"],
        "Allowed bedeutet erlaubt. To be allowed to heißt: die Erlaubnis haben. Diese Form brauchst du, wenn du über Regeln sprichst, zum Beispiel in der Schule. Das Wort allowed kennst du vielleicht schon von Schildern.",
        { tasks: [k("When I was five, I ___ read.", "couldn't", ["can't"], "When I was five ist vorbei. Die Vergangenheit von can't ist diese Form.", "Geht es um heute oder um die Zeit, als du fünf warst?")] },
      ),
      b(
        "Jetzt du: Ersatzformen",
        "Tipp bei jedem Satz auf die richtige Form.",
        "Such in jedem Satz das Wort, das dir die Zeit verrät. Überleg dann, ob das Modalverb selbst für diese Zeit eine Form hat oder ob du den Ersatz brauchst.",
        {
          tasks: [
            k("Next year I ___ drive a car.", "will be able to", ["will can"], "Next year ist Zukunft. Will can gibt es nicht, deshalb der Ersatz.", "Kann man will und can hintereinander stellen?"),
            k("Last week we ___ write a test.", "had to", ["must to"], "Last week ist vorbei. Der Ersatz für must in der Vergangenheit ist diese Form.", "Welche Zeit ist last week? Wie heißt der Ersatz für must?"),
            k("In my school we ___ wear caps.", "are not allowed to", ["don't have to must"], "Hier geht es um eine Schulregel: Es ist nicht erlaubt.", "Geht es um eine Regel? Welche Form bedeutet nicht erlaubt?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Modalverben: kein -s, danach die Grundform, kein do.", "(2) **must not** = verboten. **don't have to** = nicht nötig.", "(3) Für gestern und morgen: **be able to**, **have to**, **be allowed to**."],
        "Das ist der ganze Stoff zu den Modalverben. Wenn du dir nur eine Sache merkst, dann die Falle mit must not. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("You ___ run in the corridor. It is forbidden.", "must not", ["don't have to"], "Forbidden heißt verboten. Dazu passt nur diese Form.", "Was bedeutet forbidden auf Deutsch? Schau auf den zweiten Satz.")] },
      ),
    ),
  ],
  [
    v("Modalverb", "Ein Verb wie can, must oder should. Es sagt, ob man etwas kann, muss, darf oder soll, und braucht immer ein zweites Verb.", "She can swim."),
    v("must not", "Nicht dürfen. Ein Verbot.", "You must not park here."),
    v("don't have to", "Nicht müssen. Es ist nicht nötig.", "You don't have to come."),
    v("should", "Sollte. So gibt man einen Rat.", "You should see a doctor."),
    v("be able to", "Der Ersatz für can in anderen Zeiten.", "I will be able to swim."),
    v("have to", "Der Ersatz für must in anderen Zeiten.", "I had to go."),
    v("be allowed to", "Der Ersatz für may: etwas dürfen.", "We are not allowed to use our phones."),
  ],
  [
    q("She ___ swim very well.", "can", ["cans", "can to", "is can"], "Modalverben bekommen nie ein s, und danach steht die Grundform ohne to."),
    q("Was bedeutet You must not park here?", "Du darfst hier nicht parken.", ["Du musst hier nicht parken.", "Du kannst hier nicht parken.", "Du solltest hier parken."], "Must not ist ein Verbot. Es bedeutet nicht dürfen, auch wenn es wie musst nicht aussieht."),
    q("It's free. You ___ pay.", "don't have to", ["must not", "can't", "should"], "Wenn etwas kostenlos ist, ist Bezahlen nicht nötig. Verboten ist es nicht. Dafür steht don't have to."),
    q("You have a headache? You ___ drink some water.", "should", ["must not", "don't have to", "may not"], "Bei Kopfschmerzen gibt man einen Rat. Für einen Rat nimmt man should."),
    q("Yesterday I ___ help my mum.", "had to", ["must", "have to", "musted"], "Yesterday ist vorbei. Must hat keine Vergangenheit, deshalb nimmt man had to."),
    q("Next year she ___ vote.", "will be able to", ["will can", "cans", "will could"], "Für die Zukunft von can braucht man die Ersatzform be able to, weil es will can nicht gibt."),
    q("Welche Frage ist richtig?", "Can you help me?", ["Do you can help me?", "Can you to help me?", "Cans you help me?"], "Modalverben bilden Fragen ohne do. Das Modalverb rückt selbst an den Anfang."),
    q("Welche Frage ist am höflichsten?", "May I open the window?", ["I open the window?", "Can I the window open?", "Open I the window?"], "May ist eine höfliche Art, um Erlaubnis zu fragen. Die anderen Sätze sind falsch gebaut."),
  ],
);
