// Guided lesson: writing an e-mail, informal and formal.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_03_email.json",
  {
    id: "P_EN_EMAIL",
    subject: "EN",
    title: "Eine E-Mail auf Englisch schreiben",
    teaser: "Vom leeren Blatt zur fertigen E-Mail: die Aufgabe lesen, die Fragen zählen, die sechs Teile einer E-Mail nacheinander schreiben. Dazu der Unterschied zwischen einer Mail an eine Freundin und einer höflichen Mail an einen Fremden.",
    hook: "Vor einem leeren Blatt zu sitzen ist kein schönes Gefühl. Bei einer E-Mail muss das aber nicht sein, denn sie hat immer dieselben sechs Teile. Wenn du die kennst, füllst du sie einfach von oben nach unten aus. Wir bauen jetzt gemeinsam eine E-Mail, Teil für Teil.",
    outro: "Du weißt jetzt, wie du an eine E-Mail herangehst. Du zählst zuerst die Fragen, schreibst dann die sechs Teile von oben nach unten und zählst am Ende deine Wörter. Du kennst den lockeren Ton für Freunde und den höflichen Ton für Fremde, und du weißt, welche Anrede zu welchem Schluss gehört.",
    requires: ["P_EN_VERBFORMEN"],
  },
  [
    ch(
      "Die Aufgabe verstehen",
      b(
        "Die Aufgabe",
        ["*Your English friend Emma wants to visit you in July. She asks: What can we do? Where can I stay? What is the weather like? Write an e-mail. Write at least 80 words.*"],
        "So sieht eine typische Aufgabe aus. Auf Deutsch: Deine englische Freundin Emma möchte dich im Juli besuchen. Sie fragt, was ihr unternehmen könnt, wo sie schlafen kann und wie das Wetter ist. Du sollst ihr eine E-Mail schreiben.",
      ),
      b(
        "Zuerst zählen: Wie viele Fragen?",
        [L("(1) *What can we do?*", "(2) *Where can I stay?*", "(3) *What is the weather like?*"), "**Drei Fragen.** Jede braucht eine Antwort."],
        "Bevor du auch nur ein Wort schreibst, zählst du die Fragen. Das ist der wichtigste Schritt. Für jede beantwortete Frage bekommst du Punkte für den Inhalt. Wer eine Frage vergisst, verschenkt diese Punkte, egal wie schön der Rest geschrieben ist.",
        { tasks: [k("Du beantwortest nur zwei der drei Fragen. Dann fehlen dir ___.", "Punkte für den Inhalt", ["gar keine Punkte"], "Jede Frage ist ein Punkt, den die Aufgabe verlangt.", "Wofür bekommst du Punkte, wenn du eine Frage beantwortest?")] },
      ),
      b(
        "at least 80 words",
        ["**at least** = mindestens", "Du darfst mehr schreiben, aber nicht weniger."],
        "In jeder Schreibaufgabe steht, wie viele Wörter du mindestens schreiben sollst. At least bedeutet mindestens. Wenn dein Text kürzer ist, gibt es einen Abzug. Deshalb zählst du am Ende nach. Das dauert eine Minute und kann Punkte retten.",
        { tasks: [k("at least 80 words = ___ 80 Wörter", "mindestens", ["höchstens"], "At least ist die untere Grenze. Weniger darf es nicht sein.", "Darfst du mehr als 80 Wörter schreiben, oder ist das die obere Grenze?")] },
      ),
      b(
        "An wen schreibst du?",
        ["Emma ist eine **Freundin**. Der Ton ist locker.", "An einen Fremden oder eine Firma schreibst du **höflich**."],
        "Die letzte Frage vor dem Schreiben lautet: Wer bekommt die E-Mail? An eine Freundin schreibst du so, wie du mit ihr sprichst. An jemanden, den du nicht kennst, schreibst du höflicher. Das verändert die Anrede und den Schluss.",
        { tasks: [k("Du schreibst an den Leiter einer Jugendherberge. Der Ton ist ___.", "höflich", ["locker"], "Den Leiter kennst du nicht. An Fremde schreibt man höflich.", "Kennst du diese Person, oder ist sie fremd für dich?")] },
      ),
    ),
    ch(
      "Die sechs Teile einer E-Mail",
      b(
        "Sechs Teile, von oben nach unten",
        [L("(1) Betreff", "(2) Anrede", "(3) Erster Satz", "(4) Hauptteil", "(5) Schlussformel", "(6) Name")],
        "Jede E-Mail hat diese sechs Teile, immer in dieser Reihenfolge. Noch ist alles leer. Auf den nächsten Tafeln füllen wir einen Teil nach dem anderen. Wenn du die sechs Teile auswendig kennst, weißt du in der Prüfung immer, was als Nächstes kommt.",
      ),
      b(
        "Teil 1: der Betreff",
        ["**Subject: Your visit in July**", "Kurz. Kein ganzer Satz. Er sagt, worum es geht."],
        "Subject ist das englische Wort für Betreff. Der Betreff steht ganz oben und besteht nur aus wenigen Wörtern. Er nennt das Thema der E-Mail. Hier ist es Emmas Besuch im Juli. Mehr gehört dort nicht hin.",
        { tasks: [k("Welcher Betreff ist gut? ___", "Your visit in July", ["Hi Emma, I want to tell you something"], "Ein Betreff ist kurz und nennt nur das Thema.", "Welcher der beiden ist kurz und kein ganzer Satz?")] },
      ),
      b(
        "Teil 2: die Anrede",
        ["**Hi Emma,**", "Nach der Anrede steht ein Komma.", "Die nächste Zeile beginnt trotzdem mit einem großen Buchstaben."],
        "An eine Freundin schreibst du Hi oder Hello und den Vornamen. Dahinter kommt ein Komma. Im Deutschen würde es nach dem Komma klein weitergehen. Im Englischen beginnt die nächste Zeile groß. Das ist eine Kleinigkeit, die oft falsch gemacht wird.",
      ),
      b(
        "Teil 3: der erste Satz",
        ["**Thanks for your e-mail! It's great that you want to come.**", "Der erste Satz bedankt sich oder freut sich."],
        "Mit dem ersten Satz zeigst du, dass du Emmas Nachricht gelesen hast. Du bedankst dich oder sagst, dass du dich freust. Das klingt freundlich und bringt dir schon die ersten Wörter. Erst danach kommen die Antworten.",
      ),
      b(
        "Teil 4: eine Frage, ein Absatz",
        [L("Emma: *What can we do?*", "**We could go to the zoo and have a picnic in the park.**"), L("Emma: *Where can I stay?*", "**You can stay at my place. My brother's room is free.**")],
        "Jetzt beantwortest du die Fragen, eine nach der anderen. Für jede Frage beginnst du einen neuen Absatz. So sieht die Lehrerin sofort, dass du nichts vergessen hast. At my place bedeutet bei mir zu Hause.",
        { tasks: [k("Für jede Frage schreibst du ___.", "einen eigenen Absatz", ["alles in einen Satz"], "So bleibt der Text übersichtlich, und keine Antwort geht unter.", "Wie erkennt man am schnellsten, dass alle Fragen beantwortet sind?")] },
      ),
      b(
        "Die dritte Frage",
        [L("Emma: *What is the weather like?*", "**In July it is usually warm, but bring a rain jacket.**"), "Jetzt sind alle drei Fragen beantwortet."],
        "Hier kommt die dritte Antwort. Geh an dieser Stelle im Kopf noch einmal die Liste durch. Die Frage nach den Ausflügen ist beantwortet. Die Frage nach dem Schlafplatz ist beantwortet. Und das Wetter ist jetzt auch dabei. Erst wenn alle Fragen abgehakt sind, gehst du zum Schluss.",
      ),
      b(
        "Teil 5 und 6: Schluss und Name",
        [L("**Write back soon!**", "**Best wishes,**", "**Lena**"), "Der Name steht in einer eigenen Zeile, ohne Punkt."],
        "Am Ende steht eine Schlussformel. Best wishes bedeutet viele Grüße. An Freunde passen auch Take care oder See you soon. Danach kommt ein Komma, und in der nächsten Zeile steht nur dein Vorname.",
        { tasks: [k("Welcher Schluss passt an eine Freundin? ___", "Best wishes,", ["Yours faithfully,"], "Das ist ein lockerer, freundlicher Gruß.", "Welcher der beiden Grüße klingt nach einem Brief an eine Firma?")] },
      ),
      b(
        "Am Ende: nachzählen",
        ["Zähl am Ende deine Wörter.", "Ist der Text zu kurz, schreib zu jeder Antwort **einen Satz mehr**."],
        "Die Aufgabe verlangt mindestens 80 Wörter. Wenn dir noch welche fehlen, musst du nichts Neues erfinden. Schreib zu jeder Antwort einen zweiten Satz dazu, zum Beispiel einen Grund oder ein Beispiel. So wächst der Text, ohne dass er durcheinandergerät.",
        { tasks: [k("Dein Text hat 65 Wörter, verlangt sind 80. Du ___.", "schreibst zu den Antworten noch etwas dazu", ["gibst ihn so ab"], "Mit einem Satz mehr pro Antwort erreichst du die verlangte Länge.", "Was passiert, wenn ein Text kürzer ist als verlangt?")] },
      ),
    ),
    ch(
      "Höflich schreiben",
      b(
        "Eine andere Aufgabe",
        ["*Write an e-mail to Mr Brown, the manager of a youth hostel. Ask about prices and breakfast.*", "An Fremde schreibst du **formell**, an Freunde **informell**."],
        "Jetzt schreibst du an Mr Brown, den Leiter einer Jugendherberge. Du kennst ihn nicht. Solche höflichen E-Mails nennt man formell. Die lockeren Mails an Freunde nennt man informell. Die sechs Teile bleiben gleich, nur die Wörter ändern sich.",
      ),
      b(
        "Anrede und Schluss gehören zusammen",
        [L("*Dear Mr Brown,* und *Yours sincerely,*", "*Dear Sir or Madam,* und *Yours faithfully,*", "*Hi Emma,* und *Best wishes,*")],
        "Im Englischen gibt es feste Paare. Kennst du den Namen, schreibst du Dear Mr Brown und am Ende Yours sincerely. Kennst du den Namen nicht, schreibst du Dear Sir or Madam und am Ende Yours faithfully. Das bedeutet beides: mit freundlichen Grüßen.",
        { tasks: [k("Die Mail beginnt mit Dear Sir or Madam. Sie endet mit ___", "Yours faithfully,", ["Love,"], "Zu dieser Anrede ohne Namen gehört dieser Schluss.", "Schau in die zweite Zeile der Tafel. Welches Paar steht dort?")] },
      ),
      b(
        "Höfliche Sätze",
        [L("*I am writing to ask about …*", "*Could you please tell me …?*", "*I would be grateful if …*", "*I look forward to hearing from you.*")],
        "Diese vier Sätze passen in fast jede formelle E-Mail. Der erste heißt: Ich schreibe, um nach etwas zu fragen. Der zweite: Könnten Sie mir bitte sagen. Der dritte: Ich wäre dankbar, wenn. Der vierte: Ich freue mich auf Ihre Antwort.",
      ),
      b(
        "Keine Kurzformen, keine Chat-Sprache",
        ["Formell: *I am*, nicht *I'm*.", "Nie, auch nicht an Freunde: *u, thx, wanna, gonna*."],
        "In einer formellen E-Mail schreibst du alle Wörter aus. An Freunde darfst du Kurzformen wie I'm oder don't benutzen. Chat-Sprache ist aber in beiden Fällen falsch. In der Prüfung zählt sie als Fehler, auch wenn du sie jeden Tag im Handy tippst.",
        { tasks: [k("In einer formellen E-Mail schreibst du ___.", "I am interested", ["I'm interested"], "In formellen Texten schreibt man alle Wörter aus.", "Welche der beiden Formen ist eine Kurzform mit Apostroph?")] },
      ),
      b(
        "Jetzt du: Welcher Ton passt?",
        "Tipp bei jedem Satz auf die passende Lösung.",
        "Überleg bei jeder Aufgabe zuerst, an wen die E-Mail geht. Ist es jemand Fremdes, dann brauchst du den höflichen Ton. Ist es eine Freundin, dann den lockeren.",
        {
          tasks: [
            k("Anrede an den Leiter der Jugendherberge: ___", "Dear Mr Brown,", ["Hi Brown,"], "An einen Fremden mit bekanntem Namen schreibt man Dear und den Nachnamen.", "Ist das ein Freund oder ein Fremder? Welche Anrede ist höflich?"),
            k("Could you ___ send me the prices?", "please", ["now"], "Zu einer höflichen Bitte gehört im Englischen dieses kleine Wort.", "Welches Wort macht aus einer Aufforderung eine Bitte?"),
            k("Erster Satz an Emma: ___", "Thanks for your e-mail!", ["I am writing to complain."], "An eine Freundin beginnt man freundlich und bedankt sich.", "Welcher Satz klingt nach einer Freundin und welcher nach einer Beschwerde?"),
          ],
        },
      ),
      b(
        "Deine Checkliste",
        ["(1) Alle Fragen gezählt und beantwortet?", "(2) Alle sechs Teile da?", "(3) Ein Absatz pro Frage?", "(4) Passt der Ton zum Empfänger?", "(5) Wörter gezählt?"],
        "Diese fünf Fragen gehst du durch, bevor du abgibst. Sie kosten dich zwei Minuten. Die meisten Punkte gehen nicht durch schwierige Grammatik verloren, sondern durch eine vergessene Frage oder einen zu kurzen Text.",
        { tasks: [k("Womit fängst du an, bevor du schreibst? ___", "Ich zähle die Fragen in der Aufgabe.", ["Ich schreibe sofort die Anrede."], "Nur wer die Fragen kennt, kann alle beantworten.", "Was musst du wissen, bevor du den Hauptteil planen kannst?")] },
      ),
    ),
  ],
  [
    v("Subject", "Der Betreff: wenige Wörter, die das Thema der E-Mail nennen.", "Subject: Your visit in July"),
    v("at least", "Mindestens.", "Write at least 80 words."),
    v("formell", "Höflich, an Fremde oder an eine Firma. Ohne Kurzformen.", "Dear Mr Brown, … Yours sincerely,"),
    v("informell", "Locker, an Freunde und Familie.", "Hi Emma, … Best wishes,"),
    v("Yours sincerely / Yours faithfully", "Mit freundlichen Grüßen. Sincerely, wenn du den Namen kennst. Faithfully nach Dear Sir or Madam."),
    v("Could you please", "Könnten Sie bitte. So beginnt eine höfliche Bitte.", "Could you please tell me the price?"),
    v("I look forward to hearing from you.", "Ich freue mich auf Ihre Antwort. Ein höflicher letzter Satz."),
  ],
  [
    q("Was machst du zuerst, wenn du eine E-Mail-Aufgabe bekommst?", "Die Fragen in der Aufgabe zählen", ["Die Anrede schreiben", "Die Wörter zählen", "Den Namen schreiben"], "Jede Frage ist ein Punkt für den Inhalt. Nur wer sie vorher zählt, vergisst keine."),
    q("Was bedeutet at least 80 words?", "mindestens 80 Wörter", ["höchstens 80 Wörter", "genau 80 Wörter", "ungefähr 8 Sätze"], "At least nennt die untere Grenze. Der Text darf länger sein, aber nicht kürzer."),
    q("Welcher Betreff ist richtig?", "Subject: Your visit in July", ["Subject: Hi Emma, how are you today?", "Subject: I want to write you an e-mail.", "Subject: Best wishes, Lena"], "Ein Betreff ist kurz, kein ganzer Satz, und nennt nur das Thema."),
    q("Du schreibst an eine Firma und kennst keinen Namen. Welche Anrede passt?", "Dear Sir or Madam,", ["Hi there,", "Hello Firma,", "Dear Friend,"], "Ohne Namen schreibt man Dear Sir or Madam. Dazu gehört am Ende Yours faithfully."),
    q("Die E-Mail beginnt mit Dear Mr Brown. Welcher Schluss gehört dazu?", "Yours sincerely,", ["Love,", "See you,", "Yours faithfully,"], "Kennt man den Namen, endet die formelle E-Mail mit Yours sincerely."),
    q("Welcher Satz passt in eine formelle E-Mail?", "Could you please send me the prices?", ["Send me the prices!", "Can u send me the prices?", "I wanna know the prices."], "Could you please ist eine höfliche Bitte. Chat-Sprache und Befehle passen nicht."),
    q("Emma stellt drei Fragen. Wie viele Absätze hat dein Hauptteil am besten?", "drei", ["einen", "sechs", "keinen"], "Für jede Frage schreibst du einen eigenen Absatz. So geht keine Antwort unter."),
    q("Was ist auch in einer Mail an Freunde falsch?", "thx 4 ur mail", ["Thanks for your e-mail!", "I'm happy you can come.", "See you soon!"], "Chat-Sprache zählt in der Prüfung immer als Fehler. Kurzformen wie I'm sind an Freunde dagegen erlaubt."),
  ],
);
