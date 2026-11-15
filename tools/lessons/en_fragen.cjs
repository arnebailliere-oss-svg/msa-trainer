// Guided lesson: asking questions with question words.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_05a_fragen.json",
  {
    id: "P_EN_FRAGEN",
    subject: "EN",
    title: "Fragen stellen mit Fragewörtern",
    teaser: "Who, what, where, when, why und how: was die Fragewörter bedeuten, wie du daraus eine richtige englische Frage baust und wie du kurz darauf antwortest.",
    hook: "Fragen mit do, does und did kennst du schon aus der Lektion über die Verbformen. Auf solche Fragen antwortet man mit ja oder nein. Jetzt kommen die Fragen dazu, auf die man mehr antworten muss: wer, was, wo, wann und warum. Dafür brauchst du nur ein Wort mehr am Anfang.",
    outro: "Du kennst jetzt die englischen Fragewörter und weißt, dass who wer bedeutet und where wo. Du kannst eine Frage in der richtigen Reihenfolge bauen: Fragewort, Helfer, Person, Verb. Und du weißt, wann du do brauchst und wann nicht.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Die Fragewörter",
      b(
        "Zwei Arten von Fragen",
        [L("*Do you like pizza?*", "Antwort: Yes. Oder: No."), L("*What do you like?*", "Antwort: Pizza."), "Die zweite Frage beginnt mit einem **Fragewort**."],
        "Schau dir die beiden Fragen an. Auf die erste kannst du nur mit ja oder nein antworten. Auf die zweite musst du etwas nennen. Der einzige Unterschied ist das Wort what am Anfang. So ein Wort heißt Fragewort, im Deutschen genauso wie im Englischen.",
      ),
      b(
        "Die sechs wichtigsten",
        [L("**who** = wer", "**what** = was", "**where** = wo", "**when** = wann", "**why** = warum", "**how** = wie")],
        "Das sind die sechs Fragewörter, die du am häufigsten brauchst. Fünf davon beginnen mit wh, deshalb nennt man sie im Englischen auch wh-questions. Lies sie einmal langsam von oben nach unten. Unten kannst du gleich eins ausprobieren.",
        { tasks: [k("when = ___", "wann", ["wer", "wo"], "When fragt nach einer Zeit, also nach dem Wann.", "Schau in die vierte Zeile der Tafel.")] },
      ),
      b(
        "Die Falle mit who und where",
        [L("**who** = wer", "Es klingt wie das deutsche wo, bedeutet aber wer."), L("**where** = wo", "Es klingt wie das deutsche wer, bedeutet aber wo.")],
        "Diese beiden Wörter verwechseln fast alle, die Deutsch sprechen. Das liegt am Klang. Who klingt wie wo, und where klingt wie wer. Die Bedeutung ist aber genau umgekehrt. Merk dir: Auf who antwortest du mit einem Menschen, auf where mit einem Ort.",
        { tasks: [k("___ is your teacher? – Mrs Brown.", "Who", ["Where"], "Die Antwort ist ein Mensch. Nach einem Menschen fragst du mit diesem Wort.", "Schau auf die Antwort. Ist Mrs Brown ein Ort oder ein Mensch?")] },
      ),
      b(
        "Fragen mit how",
        [L("**how many** = wie viele", "**how much** = wie viel", "**how old** = wie alt", "**how often** = wie oft", "**how long** = wie lange")],
        "Mit how kannst du viele weitere Fragen bauen. Du hängst einfach ein zweites Wort an. How many nimmst du für Dinge, die man zählen kann, zum Beispiel Bücher. How much nimmst du für Dinge, die man nicht zählt, zum Beispiel Geld oder Wasser.",
      ),
      b(
        "Jetzt du: Welches Fragewort passt?",
        "Schau auf die Antwort und tipp auf das passende Fragewort.",
        "Bei jeder Frage steht die Antwort schon dabei. Sie verrät dir, wonach gefragt wird. Ist die Antwort ein Ort, eine Zahl oder ein Grund? Dann weißt du, welches Fragewort du brauchst.",
        {
          tasks: [
            k("___ do you live? – In Berlin.", "Where", ["Who", "When"], "Berlin ist ein Ort. Nach einem Ort fragst du mit diesem Wort.", "Was ist Berlin: ein Mensch, eine Zeit oder ein Ort?"),
            k("___ are you late? – Because I missed the bus.", "Why", ["What"], "Because heißt weil. Die Antwort nennt einen Grund.", "Die Antwort beginnt mit because. Wonach wurde also gefragt?"),
            k("___ brothers do you have? – Two.", "How many", ["How much"], "Brüder kann man zählen. Dafür nimmst du die Frage nach der Anzahl.", "Kann man Brüder zählen? Welche der beiden Fragen passt dann?"),
          ],
        },
      ),
    ),
    ch(
      "So baust du die Frage",
      b(
        "Die Reihenfolge",
        ["**Fragewort** + **Helfer** + **Person** + **Verb**", "***Where** **do** **you** **live**?*"],
        "Eine englische Frage hat eine feste Reihenfolge. Zuerst kommt das Fragewort. Dann kommt der Helfer do, den du schon kennst. Danach kommt die Person und zum Schluss das Verb in der Grundform. Im Deutschen ist das anders, deshalb lohnt es sich, die Reihenfolge einmal laut zu sagen.",
      ),
      b(
        "Der Helfer zeigt Person und Zeit",
        [L("*Where **do** you live?*", "*Where **does** she live?*", "*Where **did** you live?*")],
        "Der Helfer verändert sich genauso wie in den Fragen ohne Fragewort. Bei he, she, it heißt er does. Für die Vergangenheit heißt er did. Das Verb live bleibt in allen drei Fragen gleich, weil der Helfer schon alles zeigt.",
        { tasks: [k("Where ___ he work?", "does", ["do"], "He gehört zu he, she, it. Dann bekommt der Helfer das s.", "Zu welcher Gruppe gehört he? Was passiert dann mit dem Helfer?")] },
      ),
      b(
        "Mit be brauchst du kein do",
        [L("*Where **is** the station?*", "*How old **are** you?*", "*Why **was** he late?*")],
        "Wenn das Verb im Satz eine Form von be ist, brauchst du kein do. Am, is, are, was und were können selbst an die zweite Stelle rücken. Es heißt also where is the station und nicht where does the station be.",
        { tasks: [k("Where ___ my keys?", "are", ["do"], "Keys sind mehrere, also they. Und be braucht keinen Helfer.", "Fehlt hier ein Verb für sein? Und sind die Schlüssel einer oder mehrere?")] },
      ),
      b(
        "Wenn schon ein Helfer da ist",
        [L("*What **are** you doing?*", "*Where **have** you been?*", "*What **will** you do?*", "*When **can** we go?*")],
        "Dasselbe gilt für alle anderen Helfer. Steht im Satz schon are, have, will oder can, dann rückt dieser Helfer hinter das Fragewort. Do ist nur der Ersatzhelfer. Er springt ein, wenn sonst keiner da ist.",
      ),
      b(
        "Wer hat das getan?",
        ["Richtig: ***Who** broke the window?*", "Falsch: *Who did break the window?*", "Fragst du nach dem, der etwas **tut**, brauchst du kein do."],
        "Hier gibt es eine Ausnahme. Wenn who nach der Person fragt, die etwas getan hat, steht das Verb direkt dahinter. Der Satz ist dann gebaut wie eine normale Aussage, nur steht who dort, wo sonst der Name stünde.",
        { tasks: [k("Who ___ here?", "lives", ["does live"], "Gefragt wird nach der Person, die etwas tut. Dann steht das Verb direkt nach who.", "Wird nach der Person gefragt, die etwas tut? Braucht man dann einen Helfer?")] },
      ),
      b(
        "Jetzt du: Fragen bauen",
        "Tipp bei jeder Frage auf die richtige Ergänzung.",
        "Schau bei jeder Frage zuerst, ob schon ein Helfer oder eine Form von be im Satz steht. Wenn nicht, brauchst du do, does oder did. Achte dabei auf die Person und auf die Zeit.",
        {
          tasks: [
            k("___ you go yesterday?", "Where did", ["Where do"], "Yesterday ist vorbei. Für die Vergangenheit heißt der Helfer did.", "Welches Wort am Ende verrät dir die Zeit?"),
            k("What ___ she doing now?", "is", ["does"], "Doing ist die ing-Form. Davor steht eine Form von be, und zu she gehört is.", "Schau auf doing. Welches kleine Wort steht immer vor der ing-Form?"),
            k("How often ___ you play football?", "do", ["are"], "Play ist ein normales Verb ohne Helfer. Dann springt do ein.", "Steht play in der ing-Form? Wenn nicht, welcher Helfer springt ein?"),
          ],
        },
      ),
    ),
    ch(
      "Antworten und typische Fehler",
      b(
        "Kurze Antworten",
        [L("*Do you like tea?*", "*Yes, I **do**.* oder *No, I **don't**.*"), L("*Is she at home?*", "*Yes, she **is**.* oder *No, she **isn't**.*")],
        "Auf eine Frage ohne Fragewort antwortet man im Englischen selten nur mit yes oder no. Das klingt etwas unhöflich. Man hängt die Person und den Helfer aus der Frage an. Der Helfer aus der Frage kommt also in der Antwort wieder.",
      ),
      b(
        "Jetzt du: kurz antworten",
        "Tipp bei jeder Antwort auf den richtigen Helfer.",
        "Such in jeder Frage das erste Wort. Das ist der Helfer. Genau dieser Helfer gehört auch in die Antwort.",
        {
          tasks: [
            k("Can you swim? – Yes, I ___.", "can", ["do"], "Die Frage beginnt mit can. Derselbe Helfer kommt in die Antwort.", "Mit welchem Wort beginnt die Frage?"),
            k("Did he call? – No, he ___.", "didn't", ["doesn't"], "Die Frage beginnt mit did. Im Nein-Satz wird daraus die Kurzform mit not.", "Mit welchem Helfer beginnt die Frage? In welcher Zeit steht er?"),
            k("Are they here? – Yes, they ___.", "are", ["do"], "Die Frage beginnt mit are. Derselbe Helfer kommt in die Antwort.", "Mit welchem Wort beginnt die Frage?"),
          ],
        },
      ),
      b(
        "Höflich fragen",
        [L("*Can I have some water, please?*", "*Could you help me, please?*"), "could ist höflicher als can."],
        "In der Prüfung musst du manchmal eine höfliche Bitte schreiben, zum Beispiel in einer E-Mail. Mit could klingt deine Frage freundlicher als mit can. Und das kleine Wort please am Ende gehört im Englischen fast immer dazu.",
      ),
      b(
        "Zwei typische Fehler",
        [L("Falsch: *Where you live?*", "Richtig: *Where **do** you live?*"), L("Falsch: *What does she likes?*", "Richtig: *What does she **like**?*")],
        "Der erste Fehler ist, den Helfer zu vergessen. Der zweite Fehler ist, dem Verb trotz does noch ein s zu geben. Du weißt schon, warum das falsch ist: Das s gibt es in einem Satz nur einmal, und does hat es bereits.",
        { tasks: [k("Why ___ you cry yesterday?", "did", ["do"], "Yesterday ist vorbei. Der Helfer für die Vergangenheit fehlt hier.", "Welches Wort am Ende zeigt dir die Zeit?")] },
      ),
      b(
        "Das nimmst du mit",
        ["(1) **who** = wer, **where** = wo", "(2) Fragewort + Helfer + Person + Verb", "(3) Mit be oder einem anderen Helfer brauchst du kein do."],
        "Das ist alles, was du für englische Fragen brauchst. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz. Vorher kannst du unten eine letzte Frage bauen.",
        { tasks: [k("___ does the film start? – At eight.", "When", ["Where", "Who"], "At eight ist eine Uhrzeit. Nach einer Zeit fragst du mit diesem Wort.", "Was ist at eight: ein Ort, ein Mensch oder eine Zeit?")] },
      ),
    ),
  ],
  [
    v("Fragewort", "Ein Wort am Anfang einer Frage, das sagt, wonach gefragt wird.", "who, what, where"),
    v("who", "Wer. Die Antwort ist ein Mensch."),
    v("where", "Wo. Die Antwort ist ein Ort."),
    v("why", "Warum. Die Antwort beginnt oft mit because, also weil."),
    v("how many / how much", "Wie viele bei Dingen, die man zählen kann. Wie viel bei Dingen, die man nicht zählt.", "How many books? How much money?"),
    v("could", "Die höfliche Form von can in einer Bitte.", "Could you help me, please?"),
  ],
  [
    q("Was bedeutet who?", "wer", ["wo", "wie", "wann"], "Who klingt wie das deutsche wo, bedeutet aber wer. Die Antwort auf who ist immer ein Mensch."),
    q("___ do you go to school? – By bus.", "How", ["Who", "When", "Where"], "By bus heißt mit dem Bus. Die Antwort sagt, auf welche Weise jemand zur Schule kommt, also wie."),
    q("Welche Frage ist richtig?", "Where does she live?", ["Where she lives?", "Where does she lives?", "Where do she live?"], "Nach dem Fragewort kommt der Helfer does, weil she zu he, she, it gehört. Das Verb steht dann in der Grundform."),
    q("What ___ you do last weekend?", "did", ["do", "does", "are"], "Last weekend ist vorbei. Für Fragen in der Vergangenheit brauchst du den Helfer did."),
    q("Where ___ the station?", "is", ["does", "do", "did"], "Hier ist das Verb eine Form von be. Mit be brauchst du kein do, und the station ist ein it."),
    q("Are you tired? – Yes, I ___.", "am", ["do", "are", "is"], "Der Helfer aus der Frage kommt in der Antwort wieder. Zu I gehört die Form am."),
    q("___ books have you got? – Ten.", "How many", ["How much", "How old", "Who"], "Bücher kann man zählen. Für Dinge, die man zählen kann, fragst du mit how many."),
    q("Welche Bitte klingt am höflichsten?", "Could you open the window, please?", ["Open the window.", "You open the window?", "Can you the window open?"], "Could ist die höfliche Form, und please gehört zu einer freundlichen Bitte dazu."),
  ],
);
