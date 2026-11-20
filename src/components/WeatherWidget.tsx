import { useState } from "react";
import { CloudRain, Snowflake, Sun, Wind } from "lucide-react";

const scenarios = [
  {
    id: "sol",
    emoji: "☀️",
    label: "Ensolarado",
    temp: 28,
    status: "Ideal para Trilhas",
    icon: Sun,
    iconColor: "text-amber-300",
    advice: "Trilhas abertas e praias liberadas. Leve água reutilizável e protetor solar.",
  },
  {
    id: "chuva",
    emoji: "🌧️",
    label: "Chuva",
    temp: 19,
    status: "Alerta de Rota",
    icon: CloudRain,
    iconColor: "text-sky-100",
    advice:
      "Alerta de precipitação: trilhas escorregadias. Sugestão: centros culturais, como a Vila de Paranapiacaba e museus da Capital.",
  },
  {
    id: "vento",
    emoji: "💨",
    label: "Vento",
    temp: 22,
    status: "Alerta Costeiro",
    icon: Wind,
    iconColor: "text-cyan-200",
    advice:
      "Travessias e passeios de barco restritos. Sugestão: passeios urbanos sustentáveis, como o Parque Ibirapuera.",
  },
  {
    id: "frio",
    emoji: "❄️",
    label: "Frio",
    temp: 11,
    status: "Serra",
    icon: Snowflake,
    iconColor: "text-blue-100",
    advice:
      "Foco em roteiros de serra ou urbanos: Serra do Japi, Paranapiacaba e parques da Capital.",
  },
] as const;

/** Simulated weather for live demos; not a real forecast. */
export function WeatherWidget() {
  const [id, setId] = useState<(typeof scenarios)[number]["id"]>("sol");
  const s = scenarios.find((x) => x.id === id) ?? scenarios[0];
  const Icon = s.icon;
  return (
    <section
      aria-label="Clima simulado"
      data-weather={id}
      className="weather-widget relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/20 bg-gradient-to-br from-[#2B6CB0] via-[#3B82F6] to-[#60A5FA] p-5 text-white shadow-soft"
    >
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">
            <Icon className={`weather-icon h-8 w-8 ${s.iconColor}`} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-4xl font-semibold leading-none">{s.temp}°</p>
            <p className="mt-1 text-sm font-medium">
              {s.label} · {s.status}
            </p>
          </div>
          <span className="self-start rounded-full bg-white/15 px-2.5 py-1 text-[10px] uppercase tracking-wider">
            Simulação
          </span>
        </div>
        <p
          role="status"
          className="weather-widget__advice mt-3 rounded-2xl border border-white/20 bg-white/15 p-3 text-xs leading-relaxed"
        >
          {s.advice}
        </p>
        <div className="mt-3 grid grid-cols-4 gap-1.5" role="group" aria-label="Cenário climático">
          {scenarios.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={id === x.id}
              onClick={() => setId(x.id)}
              className={`weather-widget__scenario rounded-2xl border px-0 py-2 text-[10px] whitespace-nowrap ${id === x.id ? "border-white/80 bg-white/30" : "border-white/15 bg-white/15 hover:bg-white/25"}`}
            >
              <span className="mb-1 block text-base" aria-hidden="true">
                {x.emoji}
              </span>
              {x.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
