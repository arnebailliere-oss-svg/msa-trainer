import { describe, expect, it } from "vitest";
import { sha256Hex } from "./sha256";
import { rngFromBytes, rngFromSeed } from "./rng";
import { sha256 } from "./sha256";

describe("sha256", () => {
  it("matches known vectors", () => {
    expect(sha256Hex("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    expect(sha256Hex("The quick brown fox jumps over the lazy dog")).toBe("d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592");
    // multi-block (>55 bytes) input
    expect(sha256Hex("a".repeat(100))).toBe("2816597888e4a0d3a36b82b83316ab32680eb8f00f8cd3b904d681246d285a0e");
    expect(sha256Hex("Ärger über Größe")).toHaveLength(64);
  });
});

describe("rng", () => {
  it("is deterministic for the same seed and different for others", () => {
    const a = rngFromSeed(1, 2);
    const b = rngFromSeed(1, 2);
    const c = rngFromSeed(1, 3);
    const sa = Array.from({ length: 5 }, () => a.next());
    const sb = Array.from({ length: 5 }, () => b.next());
    const sc = Array.from({ length: 5 }, () => c.next());
    expect(sa).toEqual(sb);
    expect(sa).not.toEqual(sc);
    for (const v of sa) expect(v).toBeGreaterThanOrEqual(0), expect(v).toBeLessThan(1);
  });
  it("between() covers the whole inclusive range", () => {
    const r = rngFromBytes(sha256("seed").slice(0, 8));
    const seen = new Set<number>();
    for (let i = 0; i < 500; i++) seen.add(r.between(1, 6));
    expect([...seen].sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("shuffle is a permutation", () => {
    const r = rngFromSeed(7, 7);
    const out = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
    expect([...out].sort((x, y) => x - y)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
