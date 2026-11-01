export const regions = ["Todas", "Litoral", "Grande São Paulo", "ABC Paulista", "Interior", "Região Metropolitana"] as const;
export type Region = (typeof regions)[number];
export type Period = "Último Mês" | "Ano Atual";
export const modes = [
  { id: "carro", label: "Carro", description: "Veículo particular / Base de referência", percent: 45, tonnes: 6.6, color: "var(--dashboard-chart-1)" },
  { id: "onibus", label: "Ônibus", description: "Transporte rodoviário coletivo", percent: 25, tonnes: 3.7, color: "var(--dashboard-chart-2)" },
  { id: "carona", label: "Carona Solidária", description: "Deslocamento compartilhado", percent: 15, tonnes: 2.2, color: "var(--dashboard-chart-3)" },
  { id: "trilha", label: "Trilha", description: "Ecoturismo monitorado", percent: 10, tonnes: 1.5, color: "var(--dashboard-chart-4)" },
  { id: "pe", label: "A pé", description: "Mobilidade ativa de impacto zero", percent: 5, tonnes: 0.8, color: "var(--dashboard-chart-5)" },
] as const;
type ModeId = (typeof modes)[number]["id"];
export type DashboardRecord = { route: string; region: Exclude<Region, "Todas">; mode: ModeId; tonnes: number; trips: number };
export const records: DashboardRecord[] = [
  { route: "Circuito Juréia Selvagem", region: "Litoral", mode: "trilha", tonnes: 1.5, trips: 100 },
  { route: "Rota Ecológica", region: "ABC Paulista", mode: "onibus", tonnes: 1.8, trips: 120 },
  { route: "Circuito Rios e Restinga", region: "Litoral", mode: "carona", tonnes: 1.2, trips: 80 },
  { route: "Circuito Costões do Guarujá", region: "Litoral", mode: "carro", tonnes: 2.6, trips: 180 },
  { route: "Rota dos Parques Urbanos", region: "Grande São Paulo", mode: "pe", tonnes: 0.8, trips: 50 },
  { route: "Caminhos da Serra", region: "Região Metropolitana", mode: "onibus", tonnes: 1.9, trips: 130 },
  { route: "Circuito das Águas", region: "Interior", mode: "carro", tonnes: 4, trips: 270 },
  { route: "Rota da Mata Atlântica", region: "ABC Paulista", mode: "carona", tonnes: 1, trips: 70 },
];

export function getDashboardData(region: Region, period: Period) {
  // Fixed demo snapshots, not live travel monitoring. Annual snapshot = ten monthly equivalents.
  const multiplier = period === "Ano Atual" ? 10 : 1;
  const filtered = records.filter((row) => region === "Todas" || row.region === region)
    .map((row) => ({ ...row, tonnes: Number((row.tonnes * multiplier).toFixed(1)), trips: row.trips * multiplier }));
  const total = Number(filtered.reduce((sum, row) => sum + row.tonnes, 0).toFixed(1));
  const target = 20 * multiplier;
  const distribution = modes.map((mode) => {
    const tonnes = Number(filtered.filter((row) => row.mode === mode.id).reduce((sum, row) => sum + row.tonnes, 0).toFixed(1));
    const trips = filtered.filter((row) => row.mode === mode.id).reduce((sum, row) => sum + row.trips, 0);
    return { ...mode, tonnes, trips, percent: region === "Todas" ? mode.percent : total ? Math.round(tonnes / total * 100) : 0 };
  });
  const mostUsed = [...distribution].sort((a, b) => b.trips - a.trips)[0];
  return { records: filtered, total, target, progress: Math.round(total / target * 100), distribution, mostUsed, trips: filtered.reduce((sum, row) => sum + row.trips, 0) };
}
export type DashboardData = ReturnType<typeof getDashboardData>;