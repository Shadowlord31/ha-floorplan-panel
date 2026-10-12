import { describe, expect, it } from "vitest";
import { parseCardsYaml } from "./cards-yaml";

describe("parseCardsYaml", () => {
  it("nimmt eine nackte Liste", () => {
    const r = parseCardsYaml("- type: entities\n  entities:\n    - light.a\n- type: vertical-stack\n  cards:\n    - type: glance\n");
    expect(r.map((c) => c.type)).toEqual(["entities", "vertical-stack"]);
  });
  it("zieht cards aus einer Ansicht", () => {
    const r = parseCardsYaml("title: X\npath: x\nbadges: []\ncards:\n  - type: markdown\n    content: hi\n");
    expect(r).toHaveLength(1);
  });
  it("lehnt Unpassendes ab", () => {
    expect(() => parseCardsYaml("foo: 1")).toThrow(/Kartenliste/);
    expect(() => parseCardsYaml("- name: a")).toThrow(/type/);
  });
});
