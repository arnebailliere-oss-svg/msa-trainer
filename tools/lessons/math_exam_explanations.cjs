// Maths exam questions 2023–2025: explanations to the standard.
// The structure (steps / mistake / remember / answer) stays. Rewritten are the "steps" parts that were
// a bare formula or an arrow chain: now one step per line with a sentence that says why.
// Numbers and results are unchanged. Repeatable: every change sets a whole part body.
const fs = require("fs");
const path = require("path");
const DIR = path.resolve(__dirname, "../../content_packs/berlin_msa/questions");
const r = String.raw;
const P = (...p) => p.join("\n\n");
const N = (...items) => items.map((x, i) => `${i + 1}. ${x}`).join("\n");
const B = (...items) => items.map((x) => "- " + x).join("\n");
const T = (head, ...rows) => [head, head.map(() => "---"), ...rows].map((row) => "| " + row.join(" | ") + " |").join("\n");

// id -> new body of the "steps" part
const steps = {
  // ---------- 2023 ----------
  MSA2023_1A_FAHRRAD: P(
    "Je mehr Kilometer, desto mehr Zeit. Die Zuordnung ist proportional, also hilft der Dreisatz.",
    T(["Strecke", "Zeit"], ["4 km", "25 min"], ["2 km", "12,5 min"], ["6 km", "37,5 min"]),
    "Von 4 km zu 2 km teilst du beide Werte durch 2. Von 2 km zu 6 km nimmst du beide Werte mal 3.",
  ),
  MSA2023_1C_RECHTECK: P(
    r`Beim Rechteck ist die Fläche Länge mal Breite: $A = a \cdot b$`,
    "Du kennst die Fläche und die Breite. Die Länge bekommst du, wenn du die Fläche durch die Breite teilst:",
    r`$a = 42\,000 : 400 = 105$ mm`,
  ),
  MSA2023_1E_GLEICHUNG: P(
    N(r`Auf beiden Seiten minus 2: $3 \cdot (x - 8) = 0$`, r`Auf beiden Seiten geteilt durch 3: $x - 8 = 0$`, r`Auf beiden Seiten plus 8: $x = 8$`),
    r`Probe: $3 \cdot (8 - 8) + 2 = 0 + 2 = 2$ ✓`,
  ),
  MSA2023_1G_DREIECK_WINKEL: P(
    "Die drei Winkel im Dreieck ergeben zusammen 180°:",
    r`$\gamma = 180° - 70° - 70° = 40°$`,
    r`Weil zwei Winkel gleich groß sind, ist das Dreieck **gleichschenklig**. Deshalb ist auch $|BC| = |AC| = 6$ cm.`,
  ),
  MSA2023_1I_PUNKT_MCQ: P(
    r`Punktprobe: Du setzt den $x$-Wert jedes Punktes in $f(x) = -7x + 3$ ein und vergleichst mit seinem $y$-Wert.`,
    B(
      r`$f(-1) = 7 + 3 = 10$. Das passt zu $(-1 \,|\, 10)$ ✓`,
      r`$f(-4) = 28 + 3 = 31$. Das passt zu $(-4 \,|\, 31)$ ✓`,
      r`$f(3) = -21 + 3 = -18$. Der Punkt hat aber $y = -24$ ✗`,
    ),
  ),
  MSA2023_2B_TRAPEZ_FLAECHE: P(
    "Formel für das Trapez (Formelblatt): Du nimmst den Mittelwert der beiden parallelen Seiten und rechnest ihn mal die Höhe.",
    r`$A = \frac{a + c}{2} \cdot h = \frac{25{,}8 + 15}{2} \cdot 8 = 20{,}4 \cdot 8 = 163{,}2\,\text{m}^2$`,
  ),
  MSA2023_3B_UMZUG_KOSTEN: P(
    "Angebot 2 besteht aus einem festen Teil und einem Teil pro Kilometer:",
    r`$K_2 = 120 + 470 \cdot 0{,}09 = 120 + 42{,}30 = 162{,}30$ €`,
    r`Zum Vergleich Angebot 1 (27 € pro Tag, 350 km frei, danach 0,36 € pro km). Bezahlt werden $470 - 350 = 120$ km:`,
    r`$K_1 = 5 \cdot 27 + 120 \cdot 0{,}36 = 135 + 43{,}20 = 178{,}20$ €`,
    r`Angebot 2 ist also günstiger. Allgemein gilt für $x$ km: $K = 120 + 0{,}09x$`,
  ),
  MSA2023_3B_UMZUG_GLEICHUNG_MCQ: P(
    "Die 120 € fallen immer an, egal wie weit gefahren wird. Das ist der feste Anteil, also der Achsenabschnitt.",
    r`Pro Kilometer kommen 0,09 € dazu. Das ist die Steigung, und sie steht vor dem $x$.`,
    r`$K = 0{,}09x + 120$`,
  ),
  MSA2023_4A_AUSSAGEN_MCQ: B(
    r`Die Steigung von $f$ ist 4. Sie ist also **positiv** und nicht negativ.`,
    r`Die Gerade schneidet die $y$-Achse bei $(0 \,|\, -2)$. Der Punkt $(-2 \,|\, 0)$ läge auf der $x$-Achse.`,
    r`$f(0) = -2$ und nicht 0. Die Gerade geht also nicht durch den Ursprung.`,
    r`Die steigende Gerade schneidet die nach unten geöffnete Parabel zweimal, zum Beispiel in $P(1 \,|\, 2)$: $f(1) = 2$ und $p(1) = -(1+1)^2 + 6 = 2$ ✓`,
  ),
  MSA2023_4B_SCHEITELPUNKTFORM_MCQ: P(
    r`Die Scheitelpunktform lautet $a(x - d)^2 + e$ mit dem Scheitelpunkt $S(d \,|\, e)$. Hier ist $d = -1$ und $e = 6$.`,
    B(r`In der Klammer steht $x - (-1)$, also $x + 1$.`, r`Die Parabel ist nach unten geöffnet. Deshalb ist $a = -1$.`),
    r`$p(x) = -(x + 1)^2 + 6$. Ausmultipliziert ist das $-x^2 - 2x + 5$.`,
  ),
  MSA2023_4C_PARABEL_Y_MINUS10: N(
    r`Für $y$ setzt du $-10$ ein: $-x^2 - 2x + 5 = -10$`,
    r`Auf beiden Seiten plus 10: $-x^2 - 2x + 15 = 0$`,
    r`Alles mal $(-1)$, damit vor $x^2$ kein Minus mehr steht: $x^2 + 2x - 15 = 0$`,
    r`pq-Formel mit $p = 2$ und $q = -15$: $x_{1,2} = -1 \pm \sqrt{1 + 15} = -1 \pm 4$`,
    r`Also $x_1 = 3$ und $x_2 = -5$. Die größere Zahl ist 3.`,
  ),
  MSA2023_5B_DOSE_VOLUMEN_MCQ: N(
    r`Die Grundfläche ist ein Kreis: $A_G = \pi \cdot 4^2 \approx 50{,}3\,\text{cm}^2$`,
    r`Das Volumen ist Grundfläche mal Höhe: $V \approx 50{,}3 \cdot 8 \approx 402\,\text{cm}^3$`,
    r`$1\,\text{cm}^3$ ist 1 ml. Das sind also 402 ml und damit rund 400 ml ✓`,
  ),
  MSA2023_5C_DOSE_ABFALL: N(
    r`Ein Deckel hat den Durchmesser 8 cm. Auf 100 cm passen $100 : 8 = 12{,}5$, also **12** ganze Deckel.`,
    r`Fläche eines Deckels: $\pi \cdot 4^2 \approx 50{,}3\,\text{cm}^2$. Für 12 Deckel sind das etwa $603{,}2\,\text{cm}^2$.`,
    r`Fläche des Streifens: $8 \cdot 100 = 800\,\text{cm}^2$`,
    r`Verlust: $\frac{800 - 603{,}2}{800} \approx 24{,}6\,\%$. Das ist weniger als 25 %, die Vorgabe ist erfüllt.`,
  ),
  MSA2023_5D_DOSE_HOEHE: N(
    r`Ein Liter sind $1000\,\text{cm}^3$.`,
    r`Die Grundfläche ist $A_G = \pi \cdot 4^2 \approx 50{,}3\,\text{cm}^2$.`,
    r`Es gilt $V = A_G \cdot h$. Gesucht ist $h$, also teilst du das Volumen durch die Grundfläche: $h = \frac{1000}{50{,}3} \approx 19{,}9$ cm`,
    "Gerundet auf ganze Zentimeter sind das 20 cm.",
  ),
  MSA2023_6A_JUGENDLICHE: P(
    "Gesucht ist ein Anteil: Teil geteilt durch Ganzes, mal 100. Das Ganze sind alle Menschen (7,8 Milliarden), der Teil sind die Jugendlichen (1,25 Milliarden).",
    r`$p = \frac{1{,}25}{7{,}8} \cdot 100 \approx 16\,\%$`,
  ),
  MSA2023_6B_AUSSAGE_MCQ: P(
    B(
      r`$\frac{3{,}9}{7{,}8} = \frac{1}{2}$: Die Hälfte war im mittleren Alter. „Jeder zweite“ sagt dasselbe und stimmt auch.`,
      r`$\frac{1{,}95}{7{,}8} = \frac{1}{4}$: Ein **Viertel** waren Kinder, nicht ein Drittel.`,
    ),
    "Die Aussage mit dem Drittel ist also falsch.",
  ),
  MSA2023_7B_DREIECK_BF: N(
    r`Beide Katheten sind gleich lang. Nenne sie $x$.`,
    r`Satz des Pythagoras: $x^2 + x^2 = 131{,}5^2$`,
    r`Zusammenfassen: $2x^2 = 17\,292{,}25$`,
    r`Geteilt durch 2: $x^2 \approx 8\,646{,}1$`,
    r`Wurzel ziehen: $x \approx 93{,}0$ cm`,
  ),
  MSA2023_7B_DREIECK_BC: P(
    "Gegeben ist die Ankathete, gesucht ist die Hypotenuse. Dazu passt der Kosinus.",
    N(r`$\cos 65° = \frac{|BF|}{|BC|} = \frac{93}{|BC|}$`, r`Nach $|BC|$ umstellen: $|BC| = \frac{93}{\cos 65°}$`, r`Ausrechnen: $|BC| \approx \frac{93}{0{,}4226} \approx 220{,}1$ cm`),
  ),

  // ---------- 2024 ----------
  MSA2024_1A_STUNDEN_MCQ: P("Eine Stunde hat 60 Minuten. Du rechnest also mal 60:", r`$3{,}25 \cdot 60 = 195$ min`, "Oder in zwei Teilen: 3 h sind 180 min, und 0,25 h sind eine Viertelstunde, also 15 min."),
  MSA2024_1C_UMFANG_MCQ: P("Gleichseitig bedeutet: Alle drei Seiten sind gleich lang. Für den Umfang zählst du alle Seiten zusammen:", r`$u = a + a + a = 3 \cdot a$`),
  MSA2024_1D_GLEICHUNG: P(
    N(r`Auf beiden Seiten geteilt durch 2: $x - 6{,}5 = 0$`, r`Auf beiden Seiten plus 6,5: $x = 6{,}5$`),
    "Schneller geht es so: Ein Produkt ist 0, wenn einer der Faktoren 0 ist. Die 2 ist nicht 0, also muss die Klammer 0 sein.",
  ),
  MSA2024_1E_EINTRITT: P(
    "Um 20 % erhöht bedeutet: Der neue Preis ist 120 % vom alten Preis. Als Faktor ist das 1,2.",
    r`$1{,}2 \cdot 3{,}50 = 4{,}20$ €`,
    "Oder in zwei Schritten: 20 % von 3,50 € sind 0,70 €. Die kommen zum alten Preis dazu.",
  ),
  MSA2024_1H_MEDIAN: N("Sortieren: 11, 17, **18, 20**, 21, 21", "Bei sechs Werten stehen zwei in der Mitte, nämlich 18 und 20.", r`Der Median ist die Mitte zwischen beiden: $\frac{18 + 20}{2} = 19$ °C`),
  MSA2024_1I_YACHSE_MCQ: P(
    r`In $y = mx + n$ ist $n$ der Achsenabschnitt. Hier ist $n = -1$. Auf der $y$-Achse ist $x = 0$, also liegt der Schnittpunkt bei $S(0 \,|\, -1)$.`,
    r`Der Punkt $(2 \,|\, 0)$ ist die Nullstelle, also der Schnitt mit der $x$-Achse.`,
  ),
  MSA2024_2A_SPANNWEITE: P("Die Spannweite ist der größte Wert minus der kleinste Wert:", r`$85{,}1 - 19{,}2 = 65{,}9$ mm`),
  MSA2024_2D_WASSERKOSTEN: P("Jeder Liter kostet 0,14 ct. Für 16 Liter rechnest du mal 16:", r`$16 \cdot 0{,}14 = 2{,}24$ ct`, "Achte auf die Einheit: Der Preis ist in Cent angegeben und nicht in Euro."),
  MSA2024_3B_SCHEITEL_MCQ: P(
    r`$x^2 - 4$ ist die Normalparabel, um 4 nach **unten** verschoben. In der Scheitelpunktform ist das $(x - 0)^2 + (-4)$. Der Scheitelpunkt ist deshalb $S(0 \,|\, -4)$.`,
    r`Die Punkte $(2 \,|\, 0)$ und $(-2 \,|\, 0)$ sind die Nullstellen.`,
  ),
  MSA2024_3C_PUNKTPROBE_MCQ: P(r`Punktprobe: Du setzt $x = -5$ ein.`, r`$p(-5) = (-5)^2 - 4 = 25 - 4 = 21$`, r`Der Punkt $T$ hat aber $y = 20$. Er liegt also **nicht** auf der Parabel.`),
  MSA2024_3D_SCHNITTPUNKTE: P(
    N(
      r`Gleichsetzen: $4x + 1 = x^2 - 4$`,
      r`Alles auf eine Seite bringen (minus $4x$ und minus 1): $0 = x^2 - 4x - 5$`,
      r`pq-Formel mit $p = -4$ und $q = -5$: $x_{1,2} = 2 \pm \sqrt{4 + 5} = 2 \pm 3$`,
      r`Also $x_1 = 5$ und $x_2 = -1$.`,
      r`Die $y$-Werte bekommst du durch Einsetzen in $f$: $f(5) = 21$ und $f(-1) = -3$.`,
    ),
    r`Die Schnittpunkte sind $S_1(-1 \,|\, -3)$ und $S_2(5 \,|\, 21)$.`,
  ),
  MSA2024_4A_KEGEL_GRUNDFLAECHE: P("Die Grundfläche eines Kegels ist ein Kreis. Die Höhe brauchst du dafür nicht.", r`$A = \pi \cdot r^2 = \pi \cdot 30^2 = \pi \cdot 900 \approx 2827{,}43\,\text{cm}^2$`),
  MSA2024_4B_VERPACKUNG_MCQ: P(
    r`Der Kegel ist so breit wie sein **Durchmesser**: $d = 2 \cdot 30 = 60$ cm. Das gilt in beide Richtungen, also für Länge und Breite. Die Höhe muss mindestens 80 cm sein.`,
    "Die Verpackung braucht also mindestens 60 cm mal 60 cm mal 80 cm. Die kleinste passende Auswahl ist 61 cm × 61 cm × 81 cm.",
  ),
  MSA2024_4C_FUELLMATERIAL: P(
    "Das Füllmaterial ist der Platz, der im Zylinder übrig bleibt: Volumen des Zylinders minus Volumen des Kegels.",
    N(
      r`Zylinder: $V_{Zyl} = \pi \cdot 30{,}5^2 \cdot 81 \approx 236\,719{,}8\,\text{cm}^3$`,
      r`Kegel: $V_{Kegel} = \frac{1}{3} \cdot \pi \cdot 30^2 \cdot 80 \approx 75\,398{,}2\,\text{cm}^3$`,
      r`Unterschied: $236\,719{,}8 - 75\,398{,}2 \approx 161\,322\,\text{cm}^3$`,
    ),
  ),
  MSA2024_5A_STAUBSAUGEN: P("Es gibt 5 Zettel, und einer davon ist „Staubsaugen“. Du rechnest günstig durch möglich:", r`$P = \frac{1}{5} = 20\,\%$`),
  MSA2024_6A_SEILBAHN_HOEHE: P(
    r`Seil, Boden und Höhe bilden ein rechtwinkliges Dreieck. Das Seil $BA = 384$ m ist die Hypotenuse. Gesucht ist eine Kathete, also wird unter der Wurzel abgezogen:`,
    r`$|FA| = \sqrt{384^2 - 255^2} = \sqrt{147\,456 - 65\,025} = \sqrt{82\,431} \approx 287{,}11$ m`,
  ),
  MSA2024_6B_SEILBAHN_WINKEL: P(
    r`Vom Winkel $\beta_1$ aus gesehen sind die 255 m die **Ankathete** und die 384 m die **Hypotenuse**. Dazu passt der Kosinus.`,
    N(r`$\cos\beta_1 = \frac{255}{384} \approx 0{,}664$`, r`Die Taste $\cos^{-1}$ macht daraus den Winkel: $\beta_1 = \cos^{-1}\left(\frac{255}{384}\right) \approx 48{,}39°$`),
  ),
  MSA2024_6C_SEILBAHN_DAUER: P("Die Zeit ist die Strecke geteilt durch die Geschwindigkeit:", r`$t = 384 : 3{,}2 = 120$ s`, "Eine Minute hat 60 Sekunden. 120 Sekunden sind also 2 Minuten."),
  MSA2024_7A_BLUMEN_LGS_MCQ: B(
    r`„Eine Rose und eine Tulpe kosten zusammen 3,80 €“ wird zu $x + y = 3{,}80$.`,
    r`„6 Rosen und 5 Tulpen kosten 21,20 €“ wird zu $6x + 5y = 21{,}20$. Du rechnest für jede Sorte Anzahl mal Preis und zählst beides zusammen.`,
  ),
  MSA2024_7B_BLUMEN_LOESEN: P(
    "Gleichung II bedeutet: Rosen und Tulpen sind zusammen **13 Blumen**. Du löst das System mit dem Additionsverfahren.",
    N(
      r`Gleichung II mal $(-2{,}3)$: $-2{,}3r - 2{,}3t = -29{,}9$`,
      r`Zu Gleichung I addieren. Das $r$ fällt weg: $-0{,}6t = -3$`,
      r`Geteilt durch $-0{,}6$: $t = 5$`,
      r`In Gleichung II einsetzen: $r = 13 - 5 = 8$`,
    ),
    r`Probe: $2{,}3 \cdot 8 + 1{,}7 \cdot 5 = 18{,}4 + 8{,}5 = 26{,}9$ ✓`,
  ),

  // ---------- 2025 ----------
  MSA2025_1A_RABATT: P(
    r`Der Rabatt (6 €) ist der **Prozentwert**, 20 % ist der **Prozentsatz**. Gesucht ist der **Grundwert**, also der alte Preis $x$.`,
    N(r`Als Gleichung: $0{,}2 \cdot x = 6$`, r`Auf beiden Seiten geteilt durch 0,2: $x = 30$`),
    "Oder mit dem Dreisatz: 20 % sind 6 €, also sind 100 % fünfmal so viel.",
  ),
  MSA2025_1A_RABATT_T: P(
    "Der Rabatt ist der Prozentwert, {{p}} % ist der Prozentsatz. Gesucht ist der Grundwert, also der alte Preis $x$.",
    N("Als Gleichung: ${{= p/100}} \\cdot x = {{w}}$", "Auf beiden Seiten geteilt durch ${{= p/100}}$: $x = {{= w/(p/100)}}$"),
  ),
  MSA2025_1B_STUNDEN: P("Eine Stunde hat 60 Minuten. Du rechnest also mal 60:", r`$1{,}5 \cdot 60 = 90$ min`),
  MSA2025_1E_KREISSEKTOR: P("Der ganze Kreis hat 360°. Der Anteil ist der Winkel des Sektors geteilt durch 360°:", r`$\frac{145}{360} \approx 0{,}4028 = 40{,}28\,\%$`),
  MSA2025_2A_DRACHEN_AB: N(
    r`$AC$ wird von $BD$ halbiert: $|AF| = 50 : 2 = 25$ cm.`,
    r`Die Diagonalen stehen senkrecht aufeinander. Deshalb ist das Dreieck $AFB$ rechtwinklig bei $F$, und $AB$ ist die Hypotenuse.`,
    r`Pythagoras: $|AB| = \sqrt{25^2 + 55^2} = \sqrt{625 + 3025} = \sqrt{3650} \approx 60{,}42$ cm`,
  ),
  MSA2025_2B_DRACHEN_FLAECHE: P("Du setzt die beiden Diagonalen in die Formel ein:", r`$A = \frac{1}{2} \cdot 50 \cdot 80 = 2000\,\text{cm}^2$`),
  MSA2025_4A_RAMPE_WINKEL: P(
    "Die Höhe 16 cm ist die Gegenkathete, die waagerechte Strecke 170 cm ist die Ankathete. Dazu passt der Tangens.",
    N(r`$\tan\alpha = \frac{16}{170} \approx 0{,}0941$`, r`Die Taste $\tan^{-1}$ macht daraus den Winkel: $\alpha = \tan^{-1}(0{,}0941) \approx 5{,}38°$`),
  ),
  MSA2025_4A_RAMPE_T: P(
    "Die Höhe ist die Gegenkathete, die waagerechte Strecke ist die Ankathete. Dazu passt der Tangens.",
    N("$\\tan\\alpha = \\frac{{{h}}}{{{l}}} \\approx {{= h/l | fixed:4}}$", "Die Taste $\\tan^{-1}$ macht daraus den Winkel: $\\alpha = \\tan^{-1}({{= h/l | fixed:4}}) \\approx {{= atan(h/l) | fixed:2}}°$"),
    "Die Steigung in Prozent ist ${{= h/l*100 | fixed:2}}\\,\\%$.",
  ),
  MSA2025_5A_GERADE_AUSSAGEN: P(
    N(
      r`Steigung: $m = \frac{-1{,}5 - 6}{3 - (-2)} = \frac{-7{,}5}{5} = -1{,}5$. Sie ist negativ, also **fällt** der Graph.`,
      r`$y$-Achsenabschnitt: Du setzt den Punkt $A$ ein: $6 = -1{,}5 \cdot (-2) + n$. Das ist $6 = 3 + n$, also $n = 3$.`,
      r`Der Graph schneidet die $y$-Achse deshalb in $(0 \,|\, 3)$ ✓`,
    ),
    r`Die Gleichung lautet $f(x) = -1{,}5x + 3$.`,
  ),
  MSA2025_5A_GERADE_STEIGUNG: P(
    r`Die Steigung ist der Unterschied der $y$-Werte geteilt durch den Unterschied der $x$-Werte:`,
    r`$m = \frac{y_B - y_A}{x_B - x_A} = \frac{-1{,}5 - 6}{3 - (-2)} = \frac{-7{,}5}{5} = -1{,}5$`,
    r`Die Gleichung der Geraden ist $f(x) = -1{,}5x + 3$.`,
  ),
  MSA2025_5B_SCHEITELPUNKT: P(
    N(
      r`Die $x$-Koordinate des Scheitelpunkts ist $-\frac{p}{2}$. Hier ist $p = -6$, also $x_S = 3$.`,
      r`Die $y$-Koordinate bekommst du durch Einsetzen: $p(3) = 9 - 18 + 7 = -2$. Der Scheitelpunkt ist $S(3 \,|\, -2)$.`,
      r`In die Scheitelpunktform $(x - d)^2 + e$ mit $d = 3$ und $e = -2$ eingesetzt: $p(x) = (x - 3)^2 - 2$`,
    ),
    r`Probe: $(x-3)^2 - 2 = x^2 - 6x + 9 - 2 = x^2 - 6x + 7$ ✓`,
  ),
  MSA2025_6A_KITA_MODALWERT: P(
    "Sortiert: 1, 2, 2, 2, 2, 2, 4, 4, 4, 5",
    B(
      r`Spannweite: $5 - 1 = 4$ ✓`,
      "**Modalwert**: Die 2 kommt fünfmal vor, die 4 nur dreimal. Der Modalwert ist also **2** und nicht 4 ✗",
      "Median: Der 5. und der 6. Wert sind beide 2. Der Median ist 2 ✓",
      "Das jüngste Kind ist 1 Jahr alt ✓",
    ),
  ),
  MSA2025_6B_KITA_ANTEIL: P(
    "Jünger als 50 sind: 33, 44, 31, 30 und 41. Das sind **5 von 11**.",
    r`$\frac{5}{11} \cdot 100 \approx 45{,}45\,\%$`,
    r`Im Kreisdiagramm wäre das ein Winkel von $\frac{5}{11} \cdot 360° \approx 164°$.`,
  ),
};

// id -> { kind: new body } for other parts that still had an arrow
const other = {
  MSA2023_5C_DOSE_ABFALL: { answer: "≈ 24,6 %. Das ist weniger als 25 %, die Vorgabe ist erfüllt." },
  MSA2024_6C_SEILBAHN_DAUER: { formula: r`$v = \frac{s}{t}$ (Formelblatt). Nach der Zeit umgestellt: $t = \frac{s}{v}$` },
  MSA2025_4C_RAMPE_SINUSSATZ: { remember: "Ohne rechten Winkel nimmst du den **Sinussatz** (Formelblatt). Bestimme zuerst den fehlenden Winkel über die Winkelsumme." },
};

const ARROW = /→|⇒|\\Rightarrow|\\to\b/;
const used = new Set();
let rewritten = 0;
let total = 0;
for (const file of ["exam_2023.json", "exam_2024.json", "exam_2025.json"]) {
  const full = path.join(DIR, file);
  const all = JSON.parse(fs.readFileSync(full, "utf8"));
  for (const q of all) {
    if (q.subject !== "MATH") continue;
    total++;
    const set = (kind, body) => {
      const part = q.explanation.find((x) => x.kind === kind);
      if (!part) throw new Error(q.id + ": no part " + kind);
      part.body = body;
    };
    if (steps[q.id]) {
      set("steps", steps[q.id]);
      used.add(q.id);
      rewritten++;
    }
    for (const [kind, body] of Object.entries(other[q.id] || {})) set(kind, body);
    if (other[q.id]) used.add(q.id);
    for (const part of q.explanation) if (ARROW.test(part.body)) throw new Error(`${q.id} (${part.kind}): arrow left: ${part.body.slice(0, 80)}`);
  }
  fs.writeFileSync(full, JSON.stringify(all, null, 2) + "\n");
}
const unknown = [...Object.keys(steps), ...Object.keys(other)].filter((id) => !used.has(id));
if (unknown.length) throw new Error("ids not found: " + unknown.join(", "));
console.log(`${rewritten} of ${total} maths exam explanations rewritten; no arrows left in any of them`);
