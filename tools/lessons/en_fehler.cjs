// Guided lesson: typical mistakes German speakers make, with prepositions of time.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_03e_fehler.json",
  {
    id: "P_EN_FEHLER",
    subject: "EN",
    title: "Typische Fehler aus dem Deutschen",
    teaser: "Die Fehler, die fast alle machen, die Deutsch sprechen: I have 15 years, at Monday, interested for. Du lernst, warum sie passieren, und übst die richtigen Formen, bis sie sich normal anfühlen.",
    hook: "Viele Fehler im Englischen haben denselben Grund. Man denkt einen deutschen Satz und setzt für jedes Wort ein englisches ein. Meistens klappt das sogar. An ein paar Stellen geht es aber immer schief, und zwar bei allen an denselben. Die gute Nachricht ist: Es sind nicht viele, und du kannst sie dir einzeln anschauen.",
    outro: "Du kennst jetzt die Stellen, an denen das Deutsche dich im Englischen in die Irre führt. Du weißt, dass man sein Alter mit am sagt, dass Tage on bekommen und Uhrzeiten at, und dass become nicht bekommen heißt. Lies vor dem Abgeben jeden Text einmal nur auf diese Fehler durch.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Wort für Wort geht schief",
      b(
        "Warum diese Fehler passieren",
        ["Deutsch: Ich **habe** Hunger.", "Wort für Wort: *I have hunger.*", "Richtig: *I **am** hungry.*"],
        "Schau dir an, was hier passiert ist. Jedes deutsche Wort wurde durch ein englisches ersetzt. Das Ergebnis versteht ein Engländer zwar, aber es ist falsch. Englisch baut manche Sätze einfach anders. Diese Stellen muss man kennen, raten hilft nicht.",
      ),
      b(
        "Das Alter: I am 15",
        ["Falsch: *I have 15 years.*", "Richtig: *I **am** 15.*", "Auch richtig: *I am 15 years old.*"],
        "Im Deutschen bist du fünfzehn Jahre alt. Im Englischen auch: I am fifteen. In anderen Sprachen sagt man ich habe fünfzehn Jahre, deshalb taucht dieser Fehler so oft auf. Im Englischen ist das Alter etwas, das man ist, und nichts, das man hat.",
        { tasks: [k("My sister ___ 12 years old.", "is", ["has"], "Das Alter sagt man mit einer Form von be. Zu my sister gehört is.", "Ist das Alter etwas, das man hat, oder etwas, das man ist?")] },
      ),
      b(
        "interested in",
        ["Falsch: *I am interested for music.*", "Richtig: *I am interested **in** music.*", "Deutsch: Ich interessiere mich **für** Musik."],
        "Kleine Wörter wie für, an und auf lassen sich fast nie eins zu eins übertragen. Im Deutschen interessierst du dich für etwas. Im Englischen bist du interested in. Solche Paare lernt man am besten als Ganzes, wie ein einziges langes Wort.",
      ),
      b(
        "good at",
        ["Falsch: *She is good in maths.*", "Richtig: *She is good **at** maths.*", "Deutsch: Sie ist gut **in** Mathe."],
        "Hier ist es dasselbe. Im Deutschen bist du gut in einem Fach. Im Englischen bist du good at. Das gilt für Schulfächer genauso wie für Sport und Hobbys. Das Gegenteil heißt bad at.",
        { tasks: [k("He is good ___ football.", "at", ["in"], "Nach good steht im Englischen dieses kleine Wort.", "Schau auf die zweite Zeile der Tafel.")] },
      ),
      b(
        "Jetzt du: die ersten drei",
        "Tipp bei jedem Satz auf das richtige Wort.",
        "In diesen drei Sätzen stecken die Fehler von eben. Sprich den Satz mit beiden Möglichkeiten leise aus. Mit der Zeit hörst du, welche richtig klingt.",
        {
          tasks: [
            k("I ___ 14 years old.", "am", ["have"], "Das Alter sagt man mit be. Zu I gehört am.", "Hat man im Englischen sein Alter, oder ist man es?"),
            k("She is interested ___ animals.", "in", ["for"], "Nach interested steht im Englischen dieses kleine Wort.", "Welches kleine Wort stand auf der Tafel nach interested?"),
            k("I am not very good ___ singing.", "at", ["in"], "Gut in etwas sein heißt im Englischen good at.", "Welches kleine Wort gehört zu good?"),
          ],
        },
      ),
    ),
    ch(
      "Zeit und Ort: on, in, at, to",
      b(
        "Tage bekommen on",
        [L("***on** Monday*", "***on** 5th May*", "***on** my birthday*"), "Falsch: *at Monday*"],
        "Im Deutschen sagst du am Montag. Deshalb möchte man im Englischen at Monday sagen. Richtig ist on. Das gilt für alle Tage: Wochentage, ein bestimmtes Datum und auch deinen Geburtstag. Merk dir: Ein Tag bekommt on.",
      ),
      b(
        "Monate, Jahre und Tageszeiten bekommen in",
        [L("***in** July*", "***in** 2024*", "***in** the morning*", "***in** summer*")],
        "Für längere Zeiträume nimmst du in. Das sind Monate, Jahre und Jahreszeiten. Auch die Tageszeiten gehören dazu: in the morning, in the afternoon, in the evening. Eine Ausnahme ist at night, die kommt auf der nächsten Tafel.",
        { tasks: [k("___ Friday we have a test.", "On", ["In"], "Friday ist ein Tag. Tage bekommen dieses Wort.", "Ist Friday ein Tag oder ein Monat?")] },
      ),
      b(
        "Uhrzeiten bekommen at",
        [L("***at** six o'clock*", "***at** half past seven*", "***at** night*", "***at** the weekend*")],
        "Für einen genauen Zeitpunkt nimmst du at. Das sind vor allem Uhrzeiten. Dazu kommen zwei feste Ausdrücke, die du einfach lernst: at night für nachts und at the weekend für am Wochenende.",
        { tasks: [k("The film starts ___ eight o'clock.", "at", ["on"], "Eight o'clock ist eine Uhrzeit. Uhrzeiten bekommen dieses Wort.", "Ist eight o'clock ein Tag oder eine Uhrzeit?")] },
      ),
      b(
        "Die drei auf einen Blick",
        [L("**on** + Tag: *on Monday*", "**in** + Monat, Jahr, Tageszeit: *in July*", "**at** + Uhrzeit: *at six o'clock*")],
        "Hier siehst du die drei kleinen Wörter nebeneinander. Je genauer der Zeitpunkt, desto kleiner das Wort. In ist für die großen Zeiträume. On ist für einen Tag. At ist für den genauen Moment auf der Uhr.",
      ),
      b(
        "to oder at?",
        [L("*I go **to** school.*", "Das sagst du, wenn du **hingehst**."), L("*I am **at** school.*", "Das sagst du, wenn du **dort bist**.")],
        "Bei Orten gibt es einen ähnlichen Unterschied. Wenn du dich irgendwohin bewegst, nimmst du to. Wenn du schon dort bist, nimmst du at oder in. Frag dich also: wohin oder wo? Auf wohin antwortet to.",
        { tasks: [k("Last summer we went ___ London.", "to", ["in"], "Went zeigt eine Bewegung an einen Ort. Dafür steht dieses Wort.", "Fragt der Satz wohin oder wo?")] },
      ),
      b(
        "Jetzt du: on, in oder at?",
        "Tipp bei jedem Satz auf das richtige Wort.",
        "Überleg bei jeder Zeitangabe: Ist es ein Tag, ein längerer Zeitraum oder eine Uhrzeit? Die Tafel mit den dreien auf einen Blick hilft dir.",
        {
          tasks: [
            k("My birthday is ___ March.", "in", ["on"], "March ist ein Monat. Monate bekommen dieses Wort.", "Ist March ein Tag oder ein Monat?"),
            k("We play football ___ Saturday.", "on", ["at"], "Saturday ist ein Tag. Tage bekommen dieses Wort.", "Ist Saturday ein Tag oder eine Uhrzeit?"),
            k("I get up ___ half past six.", "at", ["in"], "Half past six ist eine Uhrzeit. Uhrzeiten bekommen dieses Wort.", "Ist half past six ein Monat oder ein Zeitpunkt auf der Uhr?"),
          ],
        },
      ),
    ),
    ch(
      "Falsche Freunde und feste Paare",
      b(
        "Falsche Freunde",
        [L("**become** = werden (nicht: bekommen)", "**also** = auch (nicht: also)", "**chef** = Koch (nicht: Chef)", "**mobile** oder **phone** = Handy")],
        "Manche englischen Wörter sehen aus wie deutsche, bedeuten aber etwas anderes. Man nennt sie falsche Freunde. Der bekannteste ist become. Wer im Restaurant sagt I become a steak, sagt: Ich werde ein Steak. Bekommen heißt get.",
        { tasks: [k("Ich bekomme ein Geschenk. = I ___ a present.", "get", ["become"], "Become heißt werden. Für bekommen braucht man das andere Wort.", "Was bedeutet become wirklich? Schau in die erste Zeile der Tafel.")] },
      ),
      b(
        "make oder do?",
        [L("**make** a mistake", "**make** friends"), L("**do** homework", "**do** sport")],
        "Im Deutschen heißt beides machen. Im Englischen gibt es zwei Wörter. Make nimmst du, wenn etwas entsteht, zum Beispiel ein Fehler oder eine Freundschaft. Do nimmst du für Tätigkeiten und Aufgaben. Die vier Beispiele auf der Tafel sind die wichtigsten.",
        { tasks: [k("I always ___ my homework after dinner.", "do", ["make"], "Hausaufgaben sind eine Aufgabe, die man erledigt. Dafür steht dieses Wort.", "Schau in die dritte Zeile der Tafel.")] },
      ),
      b(
        "say oder tell?",
        [L("***say** something*", "*She **said** hello.*"), L("***tell** somebody something*", "*She **told me** the answer.*")],
        "Auch für sagen gibt es zwei Wörter. Nach tell steht immer die Person, der man etwas sagt: tell me, tell him, tell my mum. Nach say steht direkt das, was gesagt wird. She said me ist also falsch.",
        { tasks: [k("He ___ me a funny story.", "told", ["said"], "Nach der Lücke steht me, also eine Person. Dann braucht man dieses Wort.", "Steht nach der Lücke eine Person? Welches der beiden Wörter verlangt das?")] },
      ),
      b(
        "bored oder boring?",
        [L("*I am **bored**.*", "= Mir ist langweilig."), L("*The film is **boring**.*", "= Der Film ist langweilig.")],
        "Diese beiden Wörter werden oft vertauscht. Die Form mit ed beschreibt, wie sich ein Mensch fühlt. Die Form mit ing beschreibt die Sache, die dieses Gefühl auslöst. Wer I am boring sagt, sagt über sich selbst: Ich bin ein Langweiler.",
        { tasks: [k("I am ___ in music.", "interested", ["interesting"], "Es geht um das Gefühl eines Menschen. Dafür steht die Form mit ed.", "Beschreibt der Satz einen Menschen oder eine Sache?")] },
      ),
      b(
        "Jetzt du: Welcher Satz stimmt?",
        "Tipp bei jeder Aufgabe auf den richtigen Satz.",
        "Jetzt kommen Fehler aus der ganzen Lektion. Lies beide Sätze genau und such den, der richtig ist. Wenn du unsicher bist, blättere ruhig zurück.",
        {
          tasks: [
            k("Welcher Satz stimmt? ___", "I made a mistake.", ["I did a mistake."], "Einen Fehler macht man im Englischen mit make.", "Entsteht bei einem Fehler etwas? Welches der beiden Wörter passt dann?"),
            k("Welcher Satz stimmt? ___", "The lesson was boring.", ["The lesson was bored."], "Eine Unterrichtsstunde ist eine Sache. Sachen bekommen die Form mit ing.", "Kann eine Unterrichtsstunde ein Gefühl haben?"),
            k("Welcher Satz stimmt? ___", "See you on Monday.", ["See you at Monday."], "Monday ist ein Tag, und Tage bekommen on.", "Ist Monday ein Tag oder eine Uhrzeit?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) *I **am** 15.*", "(2) **on** Monday, **in** July, **at** six o'clock", "(3) interested **in**, good **at**", "(4) **become** heißt werden."],
        "Diese vier Zeilen fassen die häufigsten Fehler zusammen. Lies in der Prüfung deinen fertigen Text noch einmal durch und such gezielt nach diesen Stellen. Das dauert eine Minute. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("My brother wants to ___ a doctor.", "become", ["get"], "Er möchte Arzt werden. Für werden steht dieses Wort.", "Will er einen Arzt bekommen, oder will er selbst einer werden?")] },
      ),
    ),
  ],
  [
    v("I am 15", "So sagt man sein Alter: mit am, nicht mit have."),
    v("interested in", "Interessiert an, sich interessieren für.", "I am interested in music."),
    v("good at", "Gut in etwas.", "She is good at maths."),
    v("on / in / at", "On für Tage, in für Monate, Jahre und Tageszeiten, at für Uhrzeiten.", "on Monday, in July, at six o'clock"),
    v("become", "Werden. Bekommen heißt get.", "She wants to become a teacher."),
    v("make / do", "Beides heißt machen. Make, wenn etwas entsteht. Do für Tätigkeiten und Aufgaben.", "make a mistake, do homework"),
    v("say / tell", "Beides heißt sagen. Nach tell steht die Person.", "She told me the answer."),
    v("bored / boring", "Bored: Ein Mensch langweilt sich. Boring: Eine Sache ist langweilig."),
  ],
  [
    q("Welcher Satz ist richtig?", "I am 15 years old.", ["I have 15 years.", "I have 15 years old.", "I am 15 years."], "Das Alter sagt man im Englischen mit am. Dazu passt entweder nur die Zahl oder die Zahl mit years old."),
    q("We have English ___ Tuesday.", "on", ["at", "in", "by"], "Tuesday ist ein Tag. Tage bekommen im Englischen on."),
    q("The shop opens ___ nine o'clock.", "at", ["on", "in", "to"], "Nine o'clock ist eine Uhrzeit. Uhrzeiten bekommen at."),
    q("She was born ___ 2010.", "in", ["on", "at", "to"], "2010 ist ein Jahr. Jahre, Monate und Jahreszeiten bekommen in."),
    q("Was bedeutet I want to become a pilot?", "Ich möchte Pilot werden.", ["Ich möchte einen Piloten bekommen.", "Ich komme mit einem Piloten.", "Ich war Pilot."], "Become ist ein falscher Freund. Es bedeutet werden und nicht bekommen."),
    q("Welcher Satz ist richtig?", "She told me the truth.", ["She said me the truth.", "She told the truth me.", "She said to me the truth."], "Nach tell steht direkt die Person. Nach say kann keine Person ohne to stehen."),
    q("The film was so ___ that I fell asleep.", "boring", ["bored", "bore", "boringed"], "Ein Film ist eine Sache. Die Sache, die langweilt, bekommt die Form mit ing."),
    q("I am interested ___ history.", "in", ["for", "at", "on"], "Interested und in gehören fest zusammen, auch wenn es im Deutschen für heißt."),
  ],
);
