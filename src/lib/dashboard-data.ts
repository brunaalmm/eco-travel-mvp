import { destinations, macroRegions, type MacroRegion } from "./data";

/** Same macro-regions the tourist sees, with "Todas" as the manager's catch-all. */
export const regions = ["Todas", ...macroRegions.filter((r) => r !== "Todos")] as const;
export type Region = (typeof regions)[number];
export type Period = "Último Mês" | "Ano Atual";
export const modes = [
  { id: "carro", label: "Carro", description: "Veículo particular / Base de referência" },
  { id: "onibus", label: "Ônibus", description: "Transporte rodoviário coletivo" },
  { id: "bike", label: "Bicicleta", description: "Mobilidade ativa urbana" },
  { id: "trilha", label: "Trilha", description: "Ecoturismo monitorado" },
  { id: "pe", label: "A pé", description: "Mobilidade ativa de impacto zero" },
] as const;
export type ModeId = (typeof modes)[number]["id"];
export type DashboardRecord = { id: string; route: string; region: Exclude<MacroRegion, "Todos">; mode: ModeId; tonnes: number; trips: number; capacity: number };

const seed: { id: string; mode: ModeId; tonnes: number; trips: number; capacity: number }[] = [
  { id: "peruibe", mode: "trilha", tonnes: 2.0, trips: 130, capacity: 220 },
  { id: "guaruja", mode: "carro", tonnes: 3.0, trips: 200, capacity: 400 },
  { id: "bertioga", mode: "onibus", tonnes: 1.7, trips: 110, capacity: 240 },
  { id: "paranapiacaba", mode: "onibus", tonnes: 2.0, trips: 140, capacity: 260 },
  { id: "sao-paulo", mode: "bike", tonnes: 1.4, trips: 90, capacity: 900 },
  { id: "sao-paulo", mode: "pe", tonnes: 0.8, trips: 50, capacity: 900 },
  { id: "jundiai", mode: "carro", tonnes: 3.6, trips: 240, capacity: 380 },
  { id: "brotas", mode: "trilha", tonnes: 0.3, trips: 40, capacity: 70 },
];

/** Records are derived from the shared tourist catalog, so names and regions always match. */
export const records: DashboardRecord[] = seed.flatMap((row) => {
  const d = destinations.find((x) => x.id === row.id);
  return d ? [{ ...row, route: d.circuit.title, region: d.macroRegion }] : [];
});

export const PEAK_MULTIPLIER = 2.4;

export function getDashboardData(region: Region, period: Period, peak = false) {
  // Fixed demo snapshots, not live travel monitoring. Annual snapshot = ten monthly equivalents.
  const multiplier = period === "Ano Atual" ? 10 : 1;
  const load = peak ? PEAK_MULTIPLIER : 1;
  const filtered = records.filter((row) => region === "Todas" || row.region === region)
    .map((row) => ({ ...row, tonnes: Number((row.tonnes * multiplier * load).toFixed(1)), trips: Math.round(row.trips * multiplier * load), capacity: row.capacity * multiplier }));
  const total = Number(filtered.reduce((sum, row) => sum + row.tonnes, 0).toFixed(1));
  const target = 20 * multiplier;
  const distribution = modes.map((mode) => {
    const tonnes = Number(filtered.filter((row) => row.mode === mode.id).reduce((sum, row) => sum + row.tonnes, 0).toFixed(1));
    const trips = filtered.filter((row) => row.mode === mode.id).reduce((sum, row) => sum + row.trips, 0);
    return { ...mode, tonnes, trips, percent: total ? Math.round((tonnes / total) * 100) : 0 };
  });
  const mostUsed = [...distribution].sort((a, b) => b.trips - a.trips)[0];
  const overCapacity = filtered.filter((row) => row.trips > row.capacity).map((row) => ({ route: row.route, usage: Math.round((row.trips / row.capacity) * 100) }));
  return { records: filtered, total, target, progress: Math.round((total / target) * 100), distribution, mostUsed, trips: filtered.reduce((sum, row) => sum + row.trips, 0), overCapacity, peak };
}
export type DashboardData = ReturnType<typeof getDashboardData>;
