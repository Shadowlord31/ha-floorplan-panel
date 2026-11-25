import "../src/ef/floorplan-card";
import sample from "../../custom_components/floorplan_panel/sample_plan.json";
import { erzeugeAdapter } from "./adapter";

const q = new URLSearchParams(location.search);
const N = Number(q.get("lights") ?? 0);
const ef = JSON.parse(JSON.stringify((sample as any).ef));
const fl = ef.floors[0];
// Der erfundene Beispielplan hat keine Möbel; für den Spike kommen ein paar dazu (Typen aus ef-furniture/).
fl.furniture = [
  { id: "m1", type: "sofa", x: 200, y: 330, w: 190, h: 70 }, { id: "m2", type: "table", x: 250, y: 200, w: 110, h: 60 },
  { id: "m3", type: "tv", x: 470, y: 225, w: 70, h: 20, angle: 90 }, { id: "m4", type: "rug", x: 180, y: 250, w: 220, h: 120 },
  { id: "m5", type: "fridge", x: 600, y: 80, w: 60, h: 60 }, { id: "m6", type: "stove", x: 680, y: 80, w: 70, h: 60 },
  { id: "m7", type: "bed", x: 200, y: 480, w: 160, h: 190 }, { id: "m8", type: "wardrobe", x: 80, y: 560, w: 50, h: 120 },
  { id: "m9", type: "bathtub", x: 790, y: 560, w: 140, h: 70 }, { id: "m10", type: "toilet", x: 880, y: 330, w: 40, h: 50 },
];
for (const it of fl.items) if (it.kind === "light") it.glow = true;
// ?lights=N: zusätzliche Lampen (je mit Lichtschein) für die Lastmessung
const extra: string[] = [];
for (let i = 0; i < N; i++) {
  const id = `light.test_${i}`; extra.push(id);
  fl.items.push({ id: `t${i}`, entity: id, x: 100 + (i * 83) % 820, y: 90 + (i * 47) % 540, kind: "light", icon: "mdi:lightbulb", glow: true, glowRadius: 90 });
}

const card: any = document.createElement("fp-ef-card");
let hass: any;
const adapter = erzeugeAdapter(extra, () => { hass = { ...hass, states: { ...adapter.states } }; card.hass = hass; });
hass = { ...adapter, states: { ...adapter.states }, callService: adapter.callService, language: "de", locale: { language: "de" } };
card.setConfig(ef);
card.hass = hass;
document.getElementById("plan")!.append(card);
document.getElementById("info")!.textContent = `${Object.keys(adapter.states).length} Entitäten, ${fl.items.filter((i: any) => i.glow).length} Lichtscheine`;

// Messung: Helligkeit aller Lampen ändern (= ein Zustands-Push), Zeit bis zum fertigen Zeichnen
(window as any).messen = async (runden = 20) => {
  const zeiten: number[] = [];
  for (let r = 0; r < runden; r++) {
    const t0 = performance.now();
    for (const s of Object.values(adapter.states)) if (s.entity_id.startsWith("light.")) { s.state = "on"; s.attributes = { ...s.attributes, brightness: 30 + ((r * 41) % 220) }; }
    hass = { ...hass, states: { ...adapter.states } }; card.hass = hass;
    await card.updateComplete; await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    zeiten.push(performance.now() - t0);
  }
  zeiten.sort((a, b) => a - b);
  return { median: zeiten[zeiten.length >> 1], max: zeiten[zeiten.length - 1] };
};
document.getElementById("br")!.addEventListener("input", (e) => {
  const v = Number((e.target as HTMLInputElement).value);
  for (const s of Object.values(adapter.states)) if (s.entity_id.startsWith("light.") && s.state === "on") s.attributes = { ...s.attributes, brightness: v };
  hass = { ...hass, states: { ...adapter.states } }; card.hass = hass;
});
