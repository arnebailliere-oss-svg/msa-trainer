/**
 * Local, seedable PRNG (sfc32) — never use Math.random for content decisions.
 * Seeded from the first 8 bytes of a SHA-256 digest (big endian), per docs/VARIANTS_AND_SEEDING.md.
 */

export interface Rng {
  /** Uniform float in [0, 1). */
  next(): number;
  /** Integer in [0, n). */
  int(n: number): number;
  /** Integer in [min, max] inclusive. */
  between(min: number, max: number): number;
  choice<T>(items: readonly T[]): T;
  shuffle<T>(items: T[]): T[];
}

function sfc32(a: number, b: number, c: number, d: number): () => number {
  return () => {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

/** Build an RNG from 8 seed bytes (uint64 big endian split into two uint32). */
export function rngFromBytes(bytes: Uint8Array): Rng {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return rngFromSeed(view.getUint32(0), view.getUint32(4));
}

export function rngFromSeed(hi: number, lo: number): Rng {
  // Mix the two words into four state words with a hash step.
  const m = (x: number) => {
    x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
    x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
    return (x ^ (x >>> 16)) >>> 0;
  };
  const next = sfc32(m(hi), m(lo), m(hi ^ 0x9e3779b9), m(lo ^ 0x7f4a7c15));
  for (let i = 0; i < 12; i++) next(); // warm up
  return {
    next,
    int: (n) => Math.floor(next() * n),
    between: (min, max) => min + Math.floor(next() * (max - min + 1)),
    choice: (items) => {
      if (items.length === 0) throw new Error("choice() on empty list");
      return items[Math.floor(next() * items.length)]!;
    },
    shuffle: (items) => {
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const tmp = items[i]!;
        items[i] = items[j]!;
        items[j] = tmp;
      }
      return items;
    },
  };
}

/** RNG for non-deterministic contexts (session order) — still a local instance. */
export function randomRng(): Rng {
  const a = (Math.random() * 4294967296) >>> 0;
  const b = (Math.random() * 4294967296) >>> 0;
  return rngFromSeed(a, b);
}
