import { createFileRoute } from "@tanstack/react-router";
import { Bike, Bus, Car, Footprints, Mountain } from "lucide-react";
import { useDashboard } from "@/components/DashboardContext";

export const Route = createFileRoute("/dashboard/roteiros")({
  head: () => ({ meta: [
    { title: "Roteiros" },
    { name: "description", content: "Os mesmos roteiros vistos pelo turista, com impacto de carbono e capacidade das trilhas por região." },
    { property: "og:title", content: "Roteiros monitorados — Painel do Gestor EcoTravel" },
    { property: "og:description", content: "Impacto por rota e capacidade de suporte em demonstração." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Roteiros,
});

const modeIcons = { carro: Car, onibus: Bus, bike: Bike, trilha: Mountain, pe: Footprints };

function Roteiros() {
  const { data } = useDashboard();
  return <section aria-labelledby="records-title">
    <h2 id="records-title" className="text-xl font-semibold tracking-normal">Registos Recentes e Destinos Monitorados</h2>
    <p className="mt-1 text-xs text-muted-foreground">{data.records.length} registros · mesmos roteiros exibidos ao turista</p>
    <div className="mt-4 overflow-x-auto rounded-2xl border border-border"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-forest text-forest-foreground"><tr>{["Destino / Rota", "Região", "Transporte", "Ocupação", "CO₂ economizado"].map((label) => <th key={label} scope="col" className="px-5 py-4 text-xs font-medium last:text-right">{label}</th>)}</tr></thead>
      <tbody>{data.records.map((row) => { const mode = data.distribution.find((m) => m.id === row.mode); const Icon = modeIcons[row.mode]; const usage = Math.round((row.trips / row.capacity) * 100); return <tr key={`${row.id}-${row.mode}`} className="border-b border-border last:border-0 odd:bg-background even:bg-dashboard-row">
        <td className="px-5 py-4 font-medium">{row.route}</td><td className="px-5 py-4 text-muted-foreground">{row.region}</td><td className="px-5 py-4"><span className="flex items-center gap-2"><Icon className="h-4 w-4 text-leaf" />{mode?.label}</span></td>
        <td className="px-5 py-4"><div className="flex items-center gap-2"><div className="h-2 w-20 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${usage > 100 ? "bg-destructive" : "bg-leaf"}`} style={{ width: `${Math.min(100, usage)}%` }} /></div><span className={usage > 100 ? "font-semibold text-destructive" : "text-muted-foreground"}>{usage}%</span></div></td>
        <td className="px-5 py-4 text-right font-semibold">{row.tonnes.toFixed(1)} t</td></tr>; })}</tbody></table></div>
  </section>;
}
