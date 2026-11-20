import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bus, Car, Footprints, Route as RouteIcon, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { destinations, getDestination, circuitTotals, formatMin, carbonKg, type TransportId } from "@/lib/data";

export const Route = createFileRoute("/mapa")({
  validateSearch: (s: Record<string, unknown>) => ({ d: typeof s["d"] === "string" ? (s["d"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "Mapa e circuitos ecológicos — EcoTravel" },
      { name: "description", content: "Mapa esquemático com sete circuitos ecológicos pelo Litoral, Grande SP e Interior paulista." },
      { property: "og:title", content: "Mapa e circuitos — EcoTravel" },
      { property: "og:description", content: "Escolha um roteiro e o transporte e veja o circuito completo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mapa,
});

const modes: { id: TransportId; label: string; icon: typeof Bus; speed: number }[] = [
  { id: "onibus", label: "Ônibus", icon: Bus, speed: 1.3 },
  { id: "pe", label: "Trilha a pé", icon: Footprints, speed: 3 },
  { id: "carro", label: "Carro", icon: Car, speed: 1 },
];

function Mapa() {
  const { d } = Route.useSearch();
  const [sel, setSel] = useState<string | null>(d ?? null);
  const [mode, setMode] = useState<TransportId | null>(null);
  const dest = sel ? getDestination(sel) : undefined;
  const m = modes.find((x) => x.id === mode);
  const totals = dest ? circuitTotals(dest.circuit.stops) : null;

  return (
    <AppShell title="Mapa">
      <div className="relative h-[340px] overflow-hidden bg-sea lg:mt-6 lg:h-[460px] lg:rounded-3xl">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 0 H100 V8 C88 14 84 22 76 30 C66 38 58 40 52 48 C44 56 34 62 24 70 C16 76 8 86 0 92 Z" className="fill-sand" />
          <path d="M0 0 H100 V3 C86 8 80 18 72 24 C62 32 50 36 44 44 C38 50 26 56 16 64 C10 70 4 76 0 80 Z" className="fill-accent" />
          <path d="M22 70 C36 58 46 50 52 45 C64 36 70 32 78 28" className="fill-none stroke-forest" strokeWidth="0.6" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        {destinations.map((x) => (
          <Button key={x.id} variant="ghost" aria-label={`Selecionar ${x.name}`} onClick={() => { setSel(x.id); setMode(null); }}
            style={{ left: `${x.map.x}%`, top: `${x.map.y}%` }}
            className="absolute block h-auto -translate-x-1/2 -translate-y-1/2 p-0 text-center">
            <span className={`relative mx-auto block h-10 w-10 overflow-hidden rounded-full border-2 shadow-float transition-transform duration-150 lg:h-16 lg:w-16 ${sel === x.id ? "scale-110 border-leaf" : "border-card"}`}>
              <img src={x.image} alt={x.name} className="h-full w-full object-cover" />
            </span>
            <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-forest text-[11px] font-bold text-forest-foreground">{x.circuit.stops.length}</span>
            <span className="mt-1 block max-w-[5.5rem] truncate rounded-full bg-card px-1.5 py-0.5 text-[9px] font-semibold shadow-soft lg:text-xs">{x.name}</span>
          </Button>
        ))}
        <span className="absolute bottom-8 right-4 left-4 text-right text-[10px] font-semibold uppercase text-forest/60">Mapa esquemático · sem navegação</span>
      </div>

      <div className="relative -mt-6 rounded-t-[2rem] bg-background px-5 pt-6 pb-8 lg:mx-auto lg:max-w-3xl lg:px-10">
        <Step n={1} title="Escolha o roteiro" done={!!dest} />
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {destinations.map((x) => (
            <Button key={x.id} variant="ghost" aria-pressed={sel === x.id} onClick={() => { setSel(x.id); setMode(null); }}
              className={`h-auto min-w-0 whitespace-normal break-words rounded-2xl px-2 py-3 text-sm font-medium ${sel === x.id ? "bg-forest text-forest-foreground hover:bg-forest/90 hover:text-forest-foreground" : "bg-card shadow-soft"}`}>{x.name}</Button>
          ))}
        </div>

        {dest && (
          <>
            <div className="mt-6"><Step n={2} title="Meio de transporte" done={!!m} /></div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {modes.map(({ id, label, icon: Icon }) => (
                <Button variant="ghost" key={id} onClick={() => setMode(id)} aria-pressed={mode === id}
                  className={`flex h-auto min-w-0 flex-col items-center gap-1 whitespace-normal rounded-2xl px-1 py-3 text-center text-xs leading-tight font-medium ${mode === id ? "bg-leaf text-leaf-foreground" : "bg-card shadow-soft"}`}>
                  <Icon className="h-5 w-5" />{label}
                </Button>
              ))}
            </div>
          </>
        )}

        {dest && m && totals && (
          <section className="mt-6">
            <h2 className="break-words text-xl font-semibold">{dest.circuit.title}</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Summary icon={<RouteIcon className="h-4 w-4" />} label="Total" value={`${totals.km} km`} />
              <Summary icon={<Clock className="h-4 w-4" />} label="Tempo" value={formatMin(Math.round(totals.min * m.speed))} />
              <Summary icon={<span className="text-[10px] font-bold">CO₂</span>} label="Emissão" value={`${carbonKg(totals.km, m.id)} kg`} />
            </div>
            <ol className="mt-5 grid gap-3 lg:grid-cols-2">
              {dest.circuit.stops.map((s, i) => (
                <li key={s.name} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-xs font-bold text-forest-foreground">{i + 1}</span>
                  <img src={dest.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" style={{ objectPosition: `${(i * 30) % 100}% 50%` }} />
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-semibold">{s.name}</p>
                    <p className="break-words text-xs text-muted-foreground">{s.kind}</p>
                  </div>
                  <div className="shrink-0 text-right text-xs">
                    <p className="font-semibold">{s.km ? `${s.km} km` : "Início"}</p>
                    <p className="text-muted-foreground">{s.min ? formatMin(Math.round(s.min * m.speed)) : "—"}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </AppShell>
  );
}

function Step({ n, title, done }: { n: number; title: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${done ? "bg-leaf text-leaf-foreground" : "bg-muted"}`}>{n}</span>
      <span className="font-display font-semibold">{title}</span>
    </div>
  );
}

function Summary({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl bg-forest p-2.5 text-forest-foreground sm:p-3">
      <div className="flex min-w-0 items-center gap-1 truncate text-[11px] opacity-70">{icon}{label}</div>
      <p className="mt-1 break-words font-display text-sm font-semibold leading-tight sm:text-lg">{value}</p>
    </div>
  );
}
