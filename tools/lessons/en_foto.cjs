// Guided lesson: describing a photo in a short message.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/en_03c_foto.json",
  {
    id: "P_EN_PHOTO",
    subject: "EN",
    title: "Ein Foto beschreiben",
    teaser: "Die kurze Schreibaufgabe mit dem Foto: sagen, was das Bild zeigt, wo etwas zu sehen ist und was du darüber denkst. Mit den Wörtern für vorn, hinten, links und rechts.",
    hook: "Stell dir vor, du schickst einer Freundin ein Foto aus dem Urlaub und schreibst zwei, drei Sätze dazu. Genau das ist diese Aufgabe. Der Text ist kurz, meistens nur 30 bis 50 Wörter. Du brauchst dafür drei Schritte und ein paar Wörter, die dir sagen, wo auf dem Bild etwas ist.",
    outro: "Du kannst jetzt ein Foto auf Englisch beschreiben. Du sagst zuerst, was es zeigt, dann wo etwas zu sehen ist, und am Ende, was du darüber denkst. Du weißt, dass es in the picture heißt und dass das, was auf dem Foto passiert, im Present Progressive steht.",
    requires: ["P_EN_VERBFORMEN", "P_EN_ZEITFORMEN"],
  },
  [
    ch(
      "Die Aufgabe und der erste Satz",
      b(
        "Die Aufgabe",
        ["*You are on holiday. Send a photo to your friend and write a short message about it. Write 30 to 50 words.*"],
        "Auf Deutsch: Du bist im Urlaub. Schick deinem Freund ein Foto und schreib eine kurze Nachricht dazu. Das Foto ist in der Prüfung abgedruckt. Du tust so, als hättest du es selbst gemacht.",
      ),
      b(
        "Drei Schritte",
        ["(1) Was zeigt das Foto?", "(2) Was ist wo zu sehen?", "(3) Was denkst oder fühlst du dabei?"],
        "Für jeden dieser drei Schritte schreibst du ein bis zwei Sätze. Mehr braucht es nicht. Der Text ist absichtlich kurz. Du musst also nicht jedes Blatt und jeden Stein beschreiben, sondern nur das Wichtigste.",
        { tasks: [k("Die Aufgabe sagt 30 to 50 words. Dein Text ist also ___.", "kurz", ["eine ganze Seite lang"], "Fünfzig Wörter sind ungefähr fünf Sätze.", "Wie viele Sätze sind ungefähr fünfzig Wörter?")] },
      ),
      b(
        "Schritt 1: der Überblick",
        [L("*The photo shows a skate park.*", "= Das Foto zeigt einen Skatepark."), L("*In the picture you can see my cousin.*", "= Auf dem Bild sieht man meine Cousine.")],
        "Mit dem ersten Satz sagst du, was auf dem Foto zu sehen ist. Dafür gibt es zwei Anfänge, die immer passen. The photo shows bedeutet das Foto zeigt. In the picture you can see bedeutet auf dem Bild sieht man.",
      ),
      b(
        "in the picture, nicht on",
        ["Richtig: ***in** the picture*", "Falsch: *on the picture*", "Im Deutschen sagst du **auf** dem Bild. Im Englischen sagt man **in**."],
        "Das ist der häufigste Fehler in dieser Aufgabe. Im Deutschen ist etwas auf dem Bild. Im Englischen ist es in dem Bild, so als würde man hineinschauen. On the picture würde bedeuten, dass etwas oben auf dem Foto liegt, zum Beispiel eine Tasse.",
        { tasks: [k("___ the photo you can see my dog.", "In", ["On"], "Was auf einem Foto abgebildet ist, ist im Englischen in dem Foto.", "Liegt der Hund oben auf dem Papier, oder ist er darin abgebildet?")] },
      ),
    ),
    ch(
      "Wo ist was?",
      b(
        "Vorn und hinten",
        [L("**in the foreground** = im Vordergrund", "Das ist vorn, nah bei dir."), L("**in the background** = im Hintergrund", "Das ist hinten, weit weg.")],
        "Jedes Foto hat einen vorderen und einen hinteren Teil. Was nah an der Kamera ist, ist im Vordergrund. Was weit weg ist, ist im Hintergrund. Mit diesen beiden Ausdrücken bringst du sofort Ordnung in deine Beschreibung.",
      ),
      b(
        "Links, rechts und in der Mitte",
        [L("**on the left** = links", "**on the right** = rechts", "**in the middle** = in der Mitte")],
        "Auch die Seiten kannst du benennen. Achte auf die kleinen Wörter davor. Bei left und right steht on. Bei middle, foreground und background steht in. Das musst du dir einfach so merken.",
        { tasks: [k("im Hintergrund = in the ___", "background", ["foreground"], "Back bedeutet hinten. Der Hintergrund ist das, was weit weg ist.", "In welchem der beiden Wörter steckt das englische Wort für hinten?")] },
      ),
      b(
        "Neben, hinter, vor und zwischen",
        [L("**next to** = neben", "**behind** = hinter", "**in front of** = vor", "**between** = zwischen")],
        "Mit diesen vier Ausdrücken sagst du, wo eine Sache im Verhältnis zu einer anderen ist. The dog is next to the girl heißt: Der Hund ist neben dem Mädchen. In front of besteht aus drei Wörtern, die zusammengehören.",
        { tasks: [k("The dog is ___ the tree. (hinter)", "behind", ["next to"], "Das ist das englische Wort für hinter.", "Schau in die zweite Zeile der Tafel.")] },
      ),
      b(
        "Was passiert gerade?",
        ["*Mia **is riding** her board.*", "*Two boys **are watching**.*", "Was auf dem Foto passiert, steht im **Present Progressive**."],
        "Ein Foto hält einen Moment fest. Alles, was darauf passiert, passiert für dich gerade jetzt. Deshalb benutzt du das Present Progressive, also am, is oder are und das Verb mit ing. Das Simple Present wäre hier falsch.",
        { tasks: [k("In the photo a girl ___.", "is jumping", ["jumps"], "Ein Foto zeigt einen Moment. Dafür steht das Present Progressive.", "Zeigt ein Foto eine Gewohnheit oder einen einzelnen Moment?")] },
      ),
      b(
        "there is und there are",
        [L("***There is** a tree.*", "Das sagst du bei einer Sache."), L("***There are** two dogs.*", "Das sagst du bei mehreren.")],
        "Mit there is und there are sagst du, dass etwas da ist. Im Deutschen heißt das es gibt oder da ist. Bei einer einzelnen Sache nimmst du there is. Bei mehreren nimmst du there are. Schau also immer auf das Wort, das danach kommt.",
        { tasks: [k("There ___ three people in the photo.", "are", ["is"], "Drei Leute sind mehrere. Dann steht die Form für mehrere.", "Wie viele Leute sind es? Ist das einer oder sind es mehrere?")] },
      ),
      b(
        "Jetzt du: das Foto am Strand",
        "Stell dir ein Foto vor: vorn deine Schwester mit einem Eis, hinten das Meer.",
        "Jetzt beschreibst du dieses Foto. Achte auf die kleinen Wörter vor foreground und background. Und denk daran, in welcher Zeit das steht, was auf einem Foto passiert.",
        {
          tasks: [
            k("___ the foreground you can see my sister.", "In", ["On"], "Vor foreground und background steht dieses kleine Wort.", "Welches kleine Wort stand auf der Tafel vor foreground?"),
            k("She ___ an ice cream.", "is eating", ["eat"], "Es passiert gerade auf dem Foto. She bekommt is, das Verb bekommt ing.", "In welcher Zeit steht das, was auf einem Foto passiert?"),
            k("The sea is in the ___.", "background", ["foreground"], "Das Meer ist hinten, weit weg von der Kamera.", "Ist das Meer nah bei der Kamera oder weit weg?"),
          ],
        },
      ),
    ),
    ch(
      "Was du denkst, und der Schluss",
      b(
        "Schritt 3: deine Gedanken",
        [L("*It looks like fun.*", "= Es sieht nach Spaß aus."), L("*I think she is very brave.*", "= Ich finde, sie ist sehr mutig."), L("*Maybe they are friends.*", "= Vielleicht sind sie Freunde.")],
        "Zum Schluss sagst du, was du über das Foto denkst. Das macht aus einer Aufzählung eine persönliche Nachricht. It looks like bedeutet es sieht aus wie. Maybe bedeutet vielleicht. Damit darfst du auch vermuten, was du nicht genau weißt.",
      ),
      b(
        "Ein Gruß zum Schluss",
        [L("*I wish you were here!*", "= Ich wünschte, du wärst hier!"), L("*See you soon!*", "= Bis bald!")],
        "Weil es eine Nachricht an einen Freund ist, endet sie mit einem kurzen Gruß. I wish you were here ist ein Satz, den Engländer oft auf Postkarten schreiben. Du kannst ihn einfach als Ganzes lernen.",
      ),
      b(
        "Ein fertiger Text",
        ["*Hi! This is the skate park in Leeds. In the foreground you can see Mia on her board. She is practising a new trick. I think she is really brave. I wish you were here!*"],
        "Das sind 34 Wörter. Schau, wie die drei Schritte darin stecken. Zuerst der Überblick: ein Skatepark. Dann, was wo zu sehen ist und was Mia gerade tut. Am Ende ein Gedanke und der Gruß.",
        { tasks: [k("Der Satz I think she is really brave ist ___.", "ein Gedanke", ["der Überblick"], "I think leitet ein, was der Schreiber über das Foto denkt.", "Mit welchen zwei Wörtern beginnt der Satz? Was bedeuten sie?")] },
      ),
      b(
        "Jetzt du: die Reihenfolge",
        "Tipp bei jedem Satz an, zu welchem Schritt er gehört.",
        "Hier siehst du drei Sätze aus einer Fotobeschreibung. Überleg bei jedem, welche Aufgabe er hat. Gibt er den Überblick, sagt er, wo etwas ist, oder ist er ein Gedanke?",
        {
          tasks: [
            k("The photo shows a market in Spain. Das ist ___.", "der Überblick", ["ein Gedanke"], "Der Satz sagt, was das Foto als Ganzes zeigt.", "Sagt der Satz, was das ganze Foto zeigt, oder was der Schreiber fühlt?"),
            k("On the left there is a fruit stall. Der Satz sagt, ___.", "wo etwas ist", ["was der Schreiber denkt"], "On the left bedeutet links. Der Satz beschreibt einen Ort im Bild.", "Was bedeutet on the left auf Deutsch? Ist das ein Ort im Bild?"),
            k("It looks like a lovely place. Das ist ___.", "ein Gedanke", ["der Überblick"], "It looks like sagt, wie das Foto auf den Schreiber wirkt.", "Beschreibt der Satz, was zu sehen ist, oder wie es wirkt?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) *The photo shows …*", "(2) *In the foreground … In the background …*", "(3) *I think …* und ein Gruß", "Es heißt **in** the picture, und es steht das **Present Progressive**."],
        "Das ist alles für die Fotobeschreibung. Drei Schritte, ein paar Wörter für den Ort und die richtige Zeit. Gleich kommen die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("___ the picture you can see two children.", "In", ["On"], "Was abgebildet ist, ist im Englischen in dem Bild.", "Welcher Fehler ist in dieser Aufgabe der häufigste?")] },
      ),
    ),
  ],
  [
    v("The photo shows …", "Das Foto zeigt … So beginnt der Überblick."),
    v("in the picture", "Auf dem Bild. Im Englischen mit in, nicht mit on."),
    v("in the foreground / in the background", "Im Vordergrund, also vorn. Im Hintergrund, also hinten."),
    v("on the left / on the right", "Links und rechts."),
    v("next to, behind, in front of, between", "Neben, hinter, vor, zwischen."),
    v("there is / there are", "Es gibt, da ist. There is bei einer Sache, there are bei mehreren."),
    v("It looks like …", "Es sieht aus wie … So sagst du, wie das Foto wirkt."),
  ],
  [
    q("Welcher Satz ist richtig?", "In the picture you can see a dog.", ["On the picture you can see a dog.", "At the picture you can see a dog.", "In the picture you can seeing a dog."], "Im Englischen ist etwas in dem Bild. Nach can steht außerdem die Grundform see."),
    q("Was bedeutet in the foreground?", "im Vordergrund, also vorn", ["im Hintergrund, also hinten", "auf der linken Seite", "in der Mitte"], "Fore bedeutet vorn. Der Vordergrund ist das, was nah an der Kamera ist."),
    q("In the photo two boys ___ football.", "are playing", ["play", "plays", "is playing"], "Was auf einem Foto passiert, steht im Present Progressive. Two boys sind mehrere, also are."),
    q("There ___ a big tree in the background.", "is", ["are", "be", "am"], "A big tree ist eine einzelne Sache. Dann heißt es there is."),
    q("The cat is ___ the sofa. (hinter)", "behind", ["next to", "in front of", "between"], "Behind ist das englische Wort für hinter. Next to heißt neben, in front of heißt vor."),
    q("Mit welchem Satz sagst du, was du über das Foto denkst?", "It looks like fun.", ["The photo shows a beach.", "On the left there is a boat.", "There are two people."], "It looks like sagt, wie das Foto auf dich wirkt. Die anderen Sätze beschreiben nur, was zu sehen ist."),
    q("Was kommt in einer Fotobeschreibung zuerst?", "Der Überblick: was das Foto zeigt", ["Der Gruß", "Deine Gedanken", "Die Wörter zählen"], "Du beginnst mit dem Überblick, beschreibst dann die Einzelheiten und sagst am Ende, was du denkst."),
  ],
);
