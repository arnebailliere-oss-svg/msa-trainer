/** Which words and signs of a word list a piece of board text uses. Shared by the word card and the content check. */

import type { PrimerVocab } from "./types";

/** Board text without maths markup, so that "x" is found in "$2x + 1$" and "Gerade" in "**Geraden**". */
const plain = (text: string) =>
  text
    .replace(/\\(text|mathrm)\{([^}]*)\}/g, " $2 ")
    .replace(/\\([a-zA-Z]+)/g, (_, c: string) => ` ${SIGNS[c] ?? ""} `)
    .replace(/[$*{}_^\\]/g, " ");

/** Signs that are written as a command inside a formula. A word list names them by the sign itself. */
const SIGNS: Record<string, string> = { cdot: "·", approx: "≈", neq: "≠", sqrt: "Wurzel", pi: "π", alpha: "α", beta: "β", gamma: "γ", le: "≤", ge: "≥", Delta: "Δ" };

/** Only what stands inside formulas: a colon or a dash in a sentence is punctuation, not a sign. */
const formulas = (text: string) => (text.match(/\$[^$]+\$/g) ?? []).join(" ");

const LETTER = "A-Za-zÄÖÜäöüß";

/** Does the text use this word or sign? Short signs (x, n, f(x)) must stand alone; words may be inflected. */
export function mentions(text: string, term: string): boolean {
  const needle = plain(term).replace(/\s+/g, " ").trim();
  if (!needle) return false;
  const hay = plain(needle === ":" || needle === "-" ? formulas(text) : text);
  if (needle.length <= 3 || /[()]/.test(needle)) {
    const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s*");
    return new RegExp(`(^|[^${LETTER}])${esc}([^${LETTER}]|$)`).test(hay);
  }
  const stem = needle.toLowerCase().slice(0, Math.max(4, needle.length - 2));
  return hay.toLowerCase().includes(stem);
}

/** The entries of the given word lists that the text uses; the first list wins when a term appears twice. */
export function wordsIn(text: string, lists: PrimerVocab[][]): PrimerVocab[] {
  const seen = new Set<string>();
  const out: PrimerVocab[] = [];
  for (const list of lists) {
    for (const v of list) {
      if (seen.has(v.term) || !mentions(text, v.term)) continue;
      seen.add(v.term);
      out.push(v);
    }
  }
  return out;
}
