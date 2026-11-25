// Fake-Adapter: ersetzt Home Assistant durch feste Zustände. Genau diese Form liest der Renderer.
export interface Zustand { entity_id: string; state: string; attributes: Record<string, unknown> }
export interface Adapter {
  states: Record<string, Zustand>;
  formatEntityState(s: Zustand): string;
  callService(domain: string, service: string, data: { entity_id?: string | string[] }): Promise<void>;
}

const FARBEN: Record<string, [number, number, number]> = {
  "light.wohnzimmer_decke": [255, 190, 110], "light.wohnzimmer_stehlampe": [255, 150, 60],
  "light.kueche": [255, 240, 220], "light.flur": [255, 220, 170], "light.bad": [200, 225, 255],
  "light.schlafzimmer": [255, 120, 160],
};

export function erzeugeAdapter(extra: string[], aenderung: () => void): Adapter {
  const states: Record<string, Zustand> = {};
  const z = (id: string, state: string, attributes: Record<string, unknown> = {}) =>
    (states[id] = { entity_id: id, state, attributes: { friendly_name: id, ...attributes } });
  let i = 0;
  for (const [id, rgb] of Object.entries(FARBEN))
    z(id, i++ % 4 === 3 ? "off" : "on", { brightness: [255, 200, 90, 40][i % 4], rgb_color: rgb, supported_color_modes: ["rgb"] });
  z("media_player.wohnzimmer_tv", "playing");
  z("sensor.wohnzimmer_temperatur", "21.4", { unit_of_measurement: "°C" });
  z("switch.kaffeemaschine", "off");
  z("lock.wohnungstuer", "locked");
  z("fan.bad_luefter", "off");
  z("climate.schlafzimmer", "heat", { temperature: 19 });
  for (const id of extra) z(id, "on", { brightness: 120 + (id.length * 37) % 130, rgb_color: [255, 200 - (id.length * 11) % 80, 120] });
  return {
    states,
    formatEntityState: (s) => `${s.state}${s.attributes.unit_of_measurement ? " " + s.attributes.unit_of_measurement : ""}`,
    async callService(domain, service, data) {
      const ids = ([] as string[]).concat(data.entity_id ?? []);
      for (const id of ids) {
        const s = states[id];
        if (!s || (domain !== "light" && domain !== "switch")) continue;
        s.state = service === "turn_on" ? "on" : service === "turn_off" ? "off" : s.state === "on" ? "off" : "on";
      }
      aenderung();
    },
  };
}
