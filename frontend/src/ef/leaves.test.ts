import { describe, expect, it } from "vitest";
import { openingClearFraction, openingLeafCount, renderOpening } from "./render";
import type { Opening } from "./types";

const win = (extra: Partial<Opening> = {}): Opening =>
  ({ id: "w", type: "window", x1: 0, y1: 0, x2: 120, y2: 0, ...extra }) as Opening;

const text = (t: unknown): string => {
  if (Array.isArray(t)) return t.map(text).join("");
  if (t && typeof t === "object" && "strings" in t) {
    const r = t as { strings: readonly string[]; values: unknown[] };
    return r.strings.reduce((s, p, i) => s + p + (i < r.values.length ? text(r.values[i]) : ""), "");
  }
  return t == null || typeof t === "object" ? "" : String(t);
};

describe("openingLeafCount", () => {
  it("counts leaves of hinged openings", () => {
    expect(openingLeafCount(win())).toBe(2);
    expect(openingLeafCount(win({ sash: "single" }))).toBe(1);
    expect(openingLeafCount(win({ sash: "triple" }))).toBe(3);
    expect(openingLeafCount(win({ sash: "quad" }))).toBe(4);
    expect(openingLeafCount({ ...win({ sash: "quad" }), type: "door" } as Opening)).toBe(4);
  });
  it("reports 1 for non-swing motions", () => {
    expect(openingLeafCount(win({ sash: "quad", motion: "slide" }))).toBe(1);
  });
});

describe("openingClearFraction with several leaves", () => {
  it("averages all leaves", () => {
    const o = win({ sash: "quad" });
    const full = openingClearFraction(o, 1, 1, [1, 1]);
    const none = openingClearFraction(o, 0, 0, [0, 0]);
    const half = openingClearFraction(o, 1, 1, [0, 0]);
    expect(none).toBe(0);
    expect(half).toBeCloseTo(full / 2, 5);
  });
  it("unset extra leaves follow leaf 1", () => {
    const o = win({ sash: "triple" });
    expect(openingClearFraction(o, 1, 1, undefined)).toBeCloseTo(openingClearFraction(o, 1, 1, [1]), 5);
  });
});

describe("renderOpening leaves", () => {
  const leaves = (o: Opening, more?: { amount: number; active: boolean }[]) =>
    (text(renderOpening(o, { color: "#888", more } as never)).match(/fp-door-leaf/g) ?? []).length;
  it("draws one leaf element per leaf", () => {
    expect(leaves(win({ sash: "single" }))).toBeGreaterThanOrEqual(1);
    const two = leaves(win());
    expect(leaves(win({ sash: "triple" }))).toBeGreaterThan(two);
    expect(leaves(win({ sash: "quad" }))).toBeGreaterThan(leaves(win({ sash: "triple" })));
  });
});
