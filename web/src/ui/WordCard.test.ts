import { describe, expect, it } from "vitest";
import { mentions, wordsIn } from "./WordCard";

describe("word card: which words stand on a board", () => {
  it("finds a sign inside a formula, but not inside a word", () => {
    expect(mentions("$y = 2x + 1$", "x")).toBe(true);
    expect(mentions("$y = 2x + 1$", "n")).toBe(false);
    expect(mentions("Die Maschine nimmt eine Zahl.", "n")).toBe(false);
    expect(mentions("$y = m \cdot x + n$", "n")).toBe(true);
    expect(mentions("$f(x) = 2x + 1$", "f(x)")).toBe(true);
  });
  it("finds a word also when it is inflected or bold", () => {
    expect(mentions("Alle Punkte liegen auf einer **Geraden**.", "Gerade")).toBe(true);
    expect(mentions("Die **2** ist die **Steigung**.", "Steigung")).toBe(true);
    expect(mentions("Die Maschine verdoppelt.", "Steigung")).toBe(false);
  });
  it("lists own words first and each term once", () => {
    const own = [{ term: "x", plain: "die Zahl, die hineinkommt" }];
    const earlier = [{ term: "x", plain: "eine Kiste" }, { term: "Variable", plain: "ein Buchstabe für eine Zahl" }];
    expect(wordsIn("Die Variable $x$", [own, earlier]).map((v) => v.plain)).toEqual(["die Zahl, die hineinkommt", "ein Buchstabe für eine Zahl"]);
  });
});
