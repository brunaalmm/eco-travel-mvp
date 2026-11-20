import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Bike, Bus, Car, Footprints, Leaf, Mountain, Target } from "lucide-react";
import { useDashboard } from "@/components/DashboardContext";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [
    { title: "Painel do Gestor" },
    { name: "description", content: "Resumo de CO₂ economizado por modal, meta ambiental e transporte mais utilizado." },
    { property: "og:title", content: "Resumo ambiental — Painel do Gestor EcoTravel" },
    { property: "og:description", content: "Gráfico de rosca e indicadores de carbono demonstrativos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Resumo,
});

export const modeIcons = { carro: Car, onibus: Bus, bike: Bike, trilha: Mountain, pe: Footprints };
const chartClasses = ["stroke-dashboard-chart-1", "stroke-dashboard-chart-2", "stroke-dashboard-chart-3", "stroke-dashboard-chart-4", "stroke-dashboard-chart-5"];
const swatchClasses = ["bg-dashboard-chart-1", "bg-dashboard-chart-2", "bg-dashboard-chart-3", "bg-dashboard-chart-4", "bg-dashboard-chart-5"];

function Resumo() {
  const { data, region, period } = useDashboard();
  let offset = 0;
  const MostUsedIcon = data.mostUsed ? modeIcons[data.mostUsed.id] : Car;
  return <section aria-label="Resumo ambiental" className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
    <div className="rounded-2xl bg-forest p-5 text-forest-foreground sm:p-7">
      <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-medium tracking-normal">Impacto ambiental positivo</h2><p className="mt-1 text-xs text-forest-foreground/65">CO₂ economizado por modal · {region}{data.peak ? " · simulação de pico" : ""}</p></div><Leaf className="h-5 w-5 text-dashboard-chart-1" /></div>
      <div className="mt-6 flex flex-col items-center gap-7 xl:flex-row xl:justify-center">
        <div className="relative h-64 w-64 shrink-0" role="img" aria-label={`${data.total.toFixed(1)} toneladas de CO₂ economizadas. ${data.distribution.map((m) => `${m.label}: ${m.percent}%`).join(", ")}`}>
          <svg className="dashboard-chart h-full w-full" viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="98" fill="none" className="stroke-forest-foreground/10" strokeWidth="19" />{data.distribution.map((mode, index) => {
            const start = offset;
            const share = data.total ? (mode.tonnes / data.total) * 100 : 0;
            offset += share;
            return <circle key={mode.id} cx="120" cy="120" r="98" fill="none" strokeWidth="19" pathLength="100" strokeDasharray={`${Math.max(0, share - 1)} ${100 - Math.max(0, share - 1)}`} strokeDashoffset={-start} className={chartClasses[index]} />;
          })}</svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="mb-2 text-xs text-forest-foreground/65">Total acumulado</span><span className="font-display text-4xl font-semibold tracking-normal">{data.total.toFixed(1)} <span className="text-xl font-normal text-dashboard-chart-1">t CO₂</span></span><span className="mt-2 flex items-center gap-1 text-xs text-dashboard-chart-1"><ArrowUpRight className="h-3.5 w-3.5" />economizadas</span></div>
        </div>
        <ul className="w-full space-y-3 xl:max-w-60">{data.distribution.map((mode, index) => { const Icon = modeIcons[mode.id]; return <li key={mode.id} className="flex items-center gap-2.5"><span className={`h-2 w-2 shrink-0 rounded-full ${swatchClasses[index]}`} /><Icon className="h-4 w-4 shrink-0 text-forest-foreground/65" /><div className="min-w-0 flex-1"><p className="text-sm">{mode.label}</p><p className="mt-0.5 text-[10px] leading-4 text-forest-foreground/60">{mode.description}</p></div><div className="shrink-0 text-right"><p className="text-sm font-semibold">{mode.percent}%</p><p className="text-xs text-forest-foreground/60">{mode.tonnes.toFixed(1)} t</p></div></li>; })}</ul>
      </div>
      <p className="mt-6 border-t border-forest-foreground/15 pt-3 text-[10px] leading-4 text-forest-foreground/55">Valores arredondados · Base ilustrativa, sem monitorização real.</p>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <article className="rounded-2xl bg-forest p-6 text-forest-foreground"><div className="flex items-center justify-between"><Target className="h-6 w-6 text-dashboard-chart-1" /><span className="text-xs text-forest-foreground/60">{period}</span></div><h2 className="mt-4 text-base font-medium tracking-normal">Meta Ambiental de Redução</h2><div className="mt-3 flex items-end gap-2"><span className="font-display text-4xl font-semibold tracking-normal">{data.progress}%</span><span className="pb-1 text-sm text-dashboard-chart-1">concluída</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-forest-foreground/15" role="progressbar" aria-label="Meta Ambiental de Redução" aria-valuenow={data.progress} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-dashboard-chart-1" style={{ width: `${Math.min(100, data.progress)}%` }} /></div><p className="mt-3 text-xs text-forest-foreground/60">{data.total.toFixed(1)} de {data.target} t CO₂ · meta demonstrativa</p></article>
      <article className="rounded-2xl bg-forest p-6 text-forest-foreground"><div className="flex items-center justify-between"><MostUsedIcon className="h-6 w-6 text-dashboard-chart-2" /><span className="text-xs text-forest-foreground/60">{data.trips.toLocaleString("pt-BR")} registros</span></div><h2 className="mt-4 text-base font-medium tracking-normal">Transporte Mais Utilizado</h2><p className="mt-3 font-display text-3xl font-semibold tracking-normal">{data.mostUsed?.label}</p><p className="mt-3 text-sm text-dashboard-chart-2">{data.mostUsed?.trips.toLocaleString("pt-BR")} deslocamentos</p></article>
    </div>
  </section>;
}
