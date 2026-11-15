// Guided lesson: capitalisation.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_02c_gross_klein.json",
  {
    id: "P_DE_GROSS_KLEIN",
    subject: "DE",
    title: "Groß oder klein?",
    teaser: "Was im Deutschen großgeschrieben wird und was klein bleibt. Du lernst, Nomen an ihren Begleitern und Endungen zu erkennen, und du lernst die Stellen kennen, an denen fast alle Fehler passieren: beim Essen, etwas Neues, am schnellsten, montags.",
    hook: "Deutsch ist eine der wenigen Sprachen, in denen man mitten im Satz große Buchstaben schreibt. Das macht Texte gut lesbar, aber es macht auch Arbeit. Die Grundregel ist einfach und du kennst sie schon. Schwierig sind nur ein paar besondere Stellen. Die nehmen wir uns einzeln vor.",
    outro: "Du weißt jetzt, woran du ein Nomen erkennst: an seinem Begleiter und an seiner Endung. Du weißt, dass aus Verben und Adjektiven Nomen werden können, wenn ein Artikel davorsteht. Und du kennst die Wörter, die klein bleiben: der Superlativ mit am und Zeitangaben wie montags, heute und morgen.",
    requires: ["P_DE_WORTARTEN", "P_DE_WORTARTEN2"],
  },
  [
    ch(
      "Nomen sicher erkennen",
      b(
        "Drei sichere Fälle",
        ["(1) Das erste Wort eines Satzes.", "(2) Alle Nomen.", "(3) Namen von Menschen, Orten und Ländern."],
        "Diese drei Fälle kennst du seit der Grundschule. Am Satzanfang schreibst du groß, egal welches Wort dort steht. Namen wie Lena, Berlin und Italien schreibst du immer groß. Die meiste Arbeit machen die Nomen, denn die musst du erst einmal erkennen.",
      ),
      b(
        "Nomen haben Begleiter",
        [L("**der** Hund, **ein** Haus", "**mein** Buch, **dieses** Lied", "**drei** Äpfel, **viele** Leute")],
        "Ein Nomen steht selten allein. Vor ihm steht fast immer ein Begleiter. Das kann ein Artikel sein, ein Pronomen wie mein oder dieses, oder ein Wort für eine Menge wie drei, viele oder kein. Wenn du so einen Begleiter siehst, folgt ein Nomen.",
        { tasks: [k("Wir hatten viel ___.", "Spaß", ["spaß"], "Davor steht ein Wort für eine Menge. Danach folgt ein Nomen.", "Welches Wort steht direkt vor der Lücke? Ist es ein Begleiter?")] },
      ),
      b(
        "Dazwischen kann ein Adjektiv stehen",
        ["der **kleine** Hund", "mein **neues** Fahrrad", "Groß wird nur das Nomen am Ende der Gruppe."],
        "Zwischen dem Begleiter und dem Nomen steht oft noch ein Adjektiv. Lass dich davon nicht täuschen. Der Begleiter gehört zu dem Nomen am Ende der Gruppe. Das Adjektiv dazwischen bleibt klein. Es heißt der kleine Hund und nicht der Kleine Hund.",
        { tasks: [k("Heute ist schönes ___.", "Wetter", ["wetter"], "Schönes ist das Adjektiv. Das Wort danach ist das Nomen, das es beschreibt.", "Welches der beiden Wörter kannst du mit einem Artikel verbinden?")] },
      ),
      b(
        "Nomen haben typische Endungen",
        ["*die Hoffn**ung**, die Frei**heit**, die Fröhlich**keit***", "*die Freund**schaft**, das Ergeb**nis**, das Eigen**tum***"],
        "Viele Nomen erkennst du auch an ihrem Ende. Wörter auf ung, heit, keit, schaft, nis und tum sind immer Nomen. Das ist besonders nützlich bei Wörtern für Gefühle und Gedanken, die man nicht anfassen kann.",
        { tasks: [k("Unsere ___ ist schon alt.", "Freundschaft", ["freundschaft"], "Das Wort endet auf schaft. Wörter mit dieser Endung sind Nomen.", "Schau auf das Ende des Wortes. Kennst du diese Endung von der Tafel?")] },
      ),
      b(
        "Jetzt du: Nomen erkennen",
        "Tipp bei jedem Satz auf die richtige Schreibung.",
        "Such bei jedem Wort nach einem Begleiter davor oder nach einer typischen Endung. Wenn du eins von beiden findest, ist es ein Nomen und wird großgeschrieben.",
        {
          tasks: [
            k("Ich habe keine ___.", "Zeit", ["zeit"], "Kein ist ein Begleiter. Danach folgt ein Nomen.", "Welches Wort steht direkt vor der Lücke?"),
            k("Das war eine große ___.", "Überraschung", ["überraschung"], "Das Wort endet auf ung und hat den Begleiter eine.", "Schau auf die Endung des Wortes und auf den Begleiter."),
            k("Der Hund ist sehr ___.", "freundlich", ["Freundlich"], "Das Wort sagt, wie der Hund ist. Es ist ein Adjektiv und bleibt klein.", "Steht ein Begleiter direkt davor? Was beschreibt das Wort?"),
          ],
        },
      ),
    ),
    ch(
      "Wenn aus Verben und Adjektiven Nomen werden",
      b(
        "Das Schwimmen",
        [L("Ich **schwimme** gern.", "Hier ist es ein Verb."), L("**Das Schwimmen** macht Spaß.", "Hier ist es ein Nomen.")],
        "Jetzt wird es interessant. Dasselbe Wort kann einmal ein Verb sein und einmal ein Nomen. Im zweiten Satz steht ein Artikel davor, und das Schwimmen ist der Name für eine Tätigkeit. Wenn aus einem Verb oder Adjektiv ein Nomen wird, nennt man das **Nominalisierung**.",
      ),
      b(
        "beim, zum, im und vom",
        ["**beim** Essen, **zum** Lachen, **im** Stehen", "In diesen Wörtern steckt ein Artikel: *beim* ist *bei dem*."],
        "Diese kleinen Wörter sind versteckte Artikel. Beim bedeutet bei dem, zum bedeutet zu dem, und im bedeutet in dem. Wenn danach ein Verb folgt, ist es zu einem Nomen geworden. Du schreibst es groß: beim Essen, zum Lachen.",
        { tasks: [k("Beim ___ höre ich Musik.", "Laufen", ["laufen"], "In dem Wort davor steckt ein Artikel. Aus dem Verb ist ein Nomen geworden.", "Welcher Artikel steckt in dem Wort vor der Lücke?")] },
      ),
      b(
        "Auch Adjektive werden zu Nomen",
        ["das **Gute** daran", "etwas **Neues**, nichts **Besonderes**", "viel **Schönes**, alles **Gute**"],
        "Dasselbe passiert mit Adjektiven. Mit einem Artikel davor wird gut zu das Gute. Auch nach den Wörtern etwas, nichts, viel, wenig und alles wird ein Adjektiv zum Nomen. Diese Wörter wirken wie Begleiter. Es heißt etwas Neues und alles Gute.",
        { tasks: [k("Ich wünsche dir alles ___.", "Gute", ["gute"], "Nach alles wird das Adjektiv zum Nomen und großgeschrieben.", "Welches Wort steht vor der Lücke? Wirkt es wie ein Begleiter?")] },
      ),
      b(
        "Die Probe",
        [L("Wir **lachen**.", "Hier passt kein Artikel davor."), L("Ich höre **das Lachen**.", "Hier steht ein Artikel davor.")],
        "Die Probe ist dieselbe wie bei jedem Nomen. Steht ein Artikel davor, oder steckt einer in dem Wort davor? Dann ist es ein Nomen. Wenn du unsicher bist, versuch, einen Artikel einzufügen. Klingt der Satz danach noch richtig, schreibst du groß.",
      ),
      b(
        "Die Falle mit zu",
        [L("Ich habe keine Lust **zu laufen**.", "Hier bleibt das Verb klein."), L("Ich gehe **zum Laufen**.", "Hier wird es großgeschrieben.")],
        "Pass auf den Unterschied zwischen zu und zum auf. Nach zu allein folgt ein ganz normales Verb, und das bleibt klein. Nur in zum steckt ein Artikel, nämlich zu dem. Erst dann wird das Verb zum Nomen.",
        { tasks: [k("Es ist schwer zu ___.", "verstehen", ["Verstehen"], "Davor steht nur zu, ohne versteckten Artikel. Das Verb bleibt klein.", "Steht vor der Lücke zu oder zum? Steckt ein Artikel darin?")] },
      ),
      b(
        "Jetzt du: Verb oder Nomen?",
        "Tipp bei jedem Satz auf die richtige Schreibung.",
        "Such bei jedem Satz nach einem Artikel, einem versteckten Artikel oder einem Wort wie etwas, nichts und alles. Nur dann wird großgeschrieben.",
        {
          tasks: [
            k("Das ___ der Vögel weckte mich.", "Singen", ["singen"], "Davor steht der Artikel das. Das Verb ist zum Nomen geworden.", "Welches Wort steht direkt vor der Lücke?"),
            k("Heute gibt es nichts ___.", "Neues", ["neues"], "Nach nichts wird das Adjektiv zum Nomen.", "Welches Wort steht vor der Lücke? Wirkt es wie ein Begleiter?"),
            k("Wir ___ jeden Tag zusammen.", "essen", ["Essen"], "Hier tut jemand etwas. Es ist ein Verb, und kein Artikel steht davor.", "Sagt das Wort, was jemand tut? Steht ein Artikel davor?"),
          ],
        },
      ),
    ),
    ch(
      "Was klein bleibt",
      b(
        "Verben und Adjektive",
        ["*Sie **läuft** sehr **schnell**.*", "Verben und Adjektive schreibt man klein, solange kein Artikel davorsteht."],
        "Das ist die Gegenseite der Regel. Ein Verb, das sagt, was jemand tut, bleibt klein. Ein Adjektiv, das sagt, wie etwas ist, bleibt klein. Großgeschrieben werden sie nur in dem besonderen Fall, den du gerade gelernt hast.",
      ),
      b(
        "Die höchste Stufe mit am",
        ["am **schnellsten**, am **besten**, am **schönsten**", "Die höchste Stufe eines Adjektivs mit am bleibt **klein**."],
        "Das ist eine beliebte Falle. Am sieht aus wie ein versteckter Artikel, nämlich an dem. Trotzdem bleibt die höchste Stufe beim Steigern klein. Du kannst es mit der Frage prüfen: Wie läuft sie? Am schnellsten. Wenn du mit wie fragen kannst, schreibst du klein.",
        { tasks: [k("Sie singt am ___.", "schönsten", ["Schönsten"], "Es ist die höchste Stufe beim Steigern. Du kannst mit wie danach fragen.", "Kannst du nach dem Wort mit wie fragen?")] },
      ),
      b(
        "Wochentage und Tageszeiten",
        [L("**der Montag**, **am Abend**", "Das sind Nomen."), L("**montags**, **abends**, **morgens**", "Mit s am Ende bleiben sie klein.")],
        "Wochentage und Tageszeiten sind zunächst Nomen: der Montag, der Abend. Hängst du aber ein s an, bedeutet das Wort jeden Montag oder an jedem Abend. Dann ist es ein Adverb und bleibt klein. Achte also auf das s am Ende.",
        { tasks: [k("Wir trainieren immer ___.", "montags", ["Montags"], "Mit s am Ende bedeutet es jeden Montag. Es ist ein Adverb und bleibt klein.", "Hat das Wort ein s am Ende? Was bedeutet es dann?")] },
      ),
      b(
        "heute, morgen und gestern",
        [L("Bis **morgen**!", "Das ist der Tag nach heute. Es bleibt klein."), L("Am **Morgen** war es kalt.", "Das ist die Tageszeit. Sie wird großgeschrieben."), "Auch: heute **Abend**, gestern **Mittag**"],
        "Heute, morgen und gestern sind Adverbien und bleiben klein. Morgen gibt es aber zweimal. Der Tag nach heute bleibt klein. Die Tageszeit ist ein Nomen und wird großgeschrieben. Steht eine Tageszeit nach heute oder gestern, schreibst du sie ebenfalls groß.",
        { tasks: [k("Wir sehen uns ___ in der Schule.", "morgen", ["Morgen"], "Gemeint ist der Tag nach heute. Das ist ein Adverb.", "Ist der Tag nach heute gemeint oder die Tageszeit am Anfang des Tages?")] },
      ),
      b(
        "Die höfliche Anrede",
        ["*Können **Sie** mir helfen?*", "*Ich danke **Ihnen** für **Ihre** Antwort.*", "In der höflichen Anrede schreibt man Sie, Ihnen und Ihr groß."],
        "Wenn du jemanden siezt, schreibst du Sie, Ihnen und Ihr groß. Das zeigt Respekt, und es verhindert Verwechslungen. Mit kleinem s wären mehrere Leute gemeint, über die man spricht. In einer Bewerbung oder einem Brief an eine Firma ist das besonders wichtig.",
        { tasks: [k("Können ___ mir bitte helfen, Herr Müller?", "Sie", ["sie"], "Herr Müller wird höflich angesprochen. Die Anrede wird großgeschrieben.", "Wird hier jemand höflich angesprochen, oder spricht man über andere Leute?")] },
      ),
      b(
        "Jetzt du: gemischt",
        "Tipp bei jedem Satz auf die richtige Schreibung.",
        "Jetzt kommen alle Fälle aus dieser Lektion vor. Frag dich bei jedem Wort: Ist es ein Nomen mit Begleiter? Ist es eine höchste Stufe mit am? Hat es ein s am Ende wie montags?",
        {
          tasks: [
            k("Er rennt am ___.", "schnellsten", ["Schnellsten"], "Die höchste Stufe mit am bleibt klein.", "Kannst du mit wie nach dem Wort fragen?"),
            k("Zum ___ treffen wir uns im Park.", "Spielen", ["spielen"], "In zum steckt ein Artikel. Aus dem Verb ist ein Nomen geworden.", "Welcher Artikel steckt in dem Wort vor der Lücke?"),
            k("Heute ___ gehen wir ins Kino.", "Abend", ["abend"], "Nach heute steht die Tageszeit als Nomen.", "Ist das Wort eine Tageszeit? Hat es ein s am Ende?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        [L("**Groß**: Nomen mit Begleiter", "**Groß**: Verb oder Adjektiv mit Artikel, auch nach beim, zum, etwas, nichts", "**Groß**: Sie und Ihnen in der Anrede"), L("**Klein**: Verben und Adjektive ohne Artikel", "**Klein**: am schnellsten, montags, heute, morgen")],
        "Das ist die ganze Lektion auf einer Tafel. Die wichtigste Frage bleibt: Steht ein Begleiter davor? Wenn ja, schreibst du groß. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Ich habe etwas ___ gesehen.", "Schönes", ["schönes"], "Nach etwas wird das Adjektiv zum Nomen.", "Welches Wort steht vor der Lücke? Wirkt es wie ein Begleiter?")] },
      ),
    ),
  ],
  [
    v("Begleiter", "Ein Wort, das vor einem Nomen steht: ein Artikel, ein Pronomen oder ein Wort für eine Menge.", "der, mein, drei, viele, kein"),
    v("Nominalisierung", "Aus einem Verb oder Adjektiv wird ein Nomen, weil ein Artikel davorsteht. Dann schreibt man es groß.", "das Schwimmen, etwas Neues"),
    v("beim, zum, im, vom", "Wörter, in denen ein Artikel steckt: bei dem, zu dem, in dem, von dem."),
    v("am schnellsten", "Die höchste Stufe beim Steigern mit am. Sie bleibt klein."),
    v("montags, abends", "Zeitangaben mit s am Ende. Sie bedeuten jeden Montag, jeden Abend und bleiben klein."),
    v("Sie, Ihnen, Ihr", "Die höfliche Anrede. Sie wird großgeschrieben."),
  ],
  [
    q("Welche Schreibung ist richtig?", "beim Essen", ["beim essen", "Beim essen", "bei Essen"], "In beim steckt der Artikel dem. Deshalb ist Essen hier ein Nomen und wird großgeschrieben."),
    q("Welche Schreibung ist richtig?", "etwas Neues", ["etwas neues", "Etwas neues", "etwas Neu"], "Nach etwas, nichts, viel und alles wird ein Adjektiv zum Nomen."),
    q("Welche Schreibung ist richtig?", "am schnellsten", ["am Schnellsten", "Am Schnellsten", "am Schnellste"], "Die höchste Stufe mit am bleibt klein. Du kannst mit wie danach fragen."),
    q("Wir treffen uns ___ im Schwimmbad.", "freitags", ["Freitags", "Freitag's", "freitag"], "Mit s am Ende bedeutet das Wort jeden Freitag. Es ist ein Adverb und bleibt klein."),
    q("Woran erkennst du ein Nomen am sichersten?", "An einem Begleiter davor", ["An seiner Länge", "An der Stelle im Satz", "Am ersten Buchstaben"], "Vor einem Nomen steht ein Artikel, ein Pronomen oder ein Wort für eine Menge."),
    q("Welches Wort ist ein Nomen?", "Sauberkeit", ["sauber", "säubern", "sauberer"], "Die Endung keit zeigt ein Nomen an. Sauber ist ein Adjektiv, säubern ein Verb."),
    q("Ich habe keine Lust zu ___.", "lernen", ["Lernen", "lernens", "Lernung"], "Nach zu allein folgt ein normales Verb. Nur nach zum wird es zum Nomen."),
    q("Sehr geehrte Frau Schmidt, ich danke ___ für die Nachricht.", "Ihnen", ["ihnen", "Sie", "ihr"], "In der höflichen Anrede schreibt man Sie, Ihnen und Ihr groß."),
  ],
);
