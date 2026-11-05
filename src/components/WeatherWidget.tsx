import { useState } from "react";
import { CloudRain, Snowflake, Sun, Wind } from "lucide-react";

const scenarios = [
  { id: "sol", emoji: "☀️", label: "Ensolarado", temp: 28, status: "Ideal para Trilhas", icon: Sun, advice: "Trilhas abertas e praias liberadas. Leve água reutilizável e protetor solar." },
  { id: "chuva", emoji: "🌧️", label: "Chuva", temp: 19, status: "Alerta de Rota", icon: CloudRain, advice: "Alerta de precipitação: trilhas escorregadias. Sugestão: centros culturais, como a Vila de Paranapiacaba e museus da Capital." },
  { id: "vento", emoji: "💨", label: "Vento", temp: 22, status: "Alerta Costeiro", icon: Wind, advice: "Travessias e passeios de barco restritos. Sugestão: passeios urbanos sustentáveis, como o Parque Ibirapuera." },
  { id: "frio", emoji: "🌡️", label: "Frio", temp: 11, status: "Serra", icon: Snowflake, advice: "Foco em roteiros de serra ou urbanos: Serra do Japi, Paranapiacaba e parques da Capital." },
] as const;

/** Simulated weather for live demos; not a real forecast. */
export function WeatherWidget() {
  const [id, setId] = useState<(typeof scenarios)[number]["id"]>("sol");
  const s = scenarios.find((x) => x.id === id) ?? scenarios[0];
  const Icon = s.icon;
  return (
    <section aria-label="Clima simulado" className="rounded-[1.75rem] bg-forest p-5 text-forest-foreground shadow-soft">
      <div className="flex items-center gap-4">
        <Icon className="h-12 w-12 shrink-0 text-leaf" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-4xl font-semibold leading-none">{s.temp}°</p>
          <p className="mt-1 text-sm font-medium">{s.label} · {s.status}</p>
        </div>
        <span className="self-start rounded-full bg-forest-foreground/10 px-2.5 py-1 text-[10px] uppercase tracking-wider">Simulação</span>
      </div>
      <p role="status" className="mt-3 rounded-2xl bg-forest-foreground/10 p-3 text-xs leading-relaxed">{s.advice}</p>
      <div className="mt-3 grid grid-cols-4 gap-1.5" role="group" aria-label="Cenário climático">
        {scenarios.map((x) => (
          <button key={x.id} type="button" aria-pressed={id === x.id} onClick={() => setId(x.id)}
            className={`rounded-2xl py-2 text-xs transition-colors ${id === x.id ? "bg-leaf text-leaf-foreground" : "bg-forest-foreground/10 hover:bg-forest-foreground/20"}`}>
            <span className="block text-base" aria-hidden="true">{x.emoji}</span>{x.label}
          </button>
        ))}
      </div>
    </section>
  );
}
