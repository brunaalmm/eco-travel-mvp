import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bus, Car, Clock, Crosshair, Footprints, MapPin, Route as RouteIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DestinationSelect } from "@/components/DestinationSelect";
import { Button } from "@/components/ui/button";
import {
  destinations,
  getDestination,
  circuitTotals,
  formatMin,
  carbonKg,
  type Destination,
  type TransportId,
} from "@/lib/data";

export const Route = createFileRoute("/mapa")({
  validateSearch: (s: Record<string, unknown>) => ({ d: typeof s["d"] === "string" ? (s["d"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "Mapa" },
      { name: "description", content: "Mapa esquemático com pontos de partida e deslocamentos simulados por destinos paulistas." },
      { property: "og:title", content: "Mapa e circuitos — EcoTravel" },
      { property: "og:description", content: "Escolha origem, destino e transporte para comparar estimativas simuladas." },
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
  const [sel, setSel] = useState<string | null>(d ?? "peruibe");
  const [originMode, setOriginMode] = useState<"current" | "choose">("current");
  const [selectedOriginId, setSelectedOriginId] = useState("sao-paulo");
  const [mode, setMode] = useState<TransportId | null>(null);
  const dest = sel ? getDestination(sel) : undefined;
  const origin = getDestination(originMode === "current" ? "sao-paulo" : selectedOriginId);
  const isLocal = !!origin && !!dest && origin.id === dest.id;
  const m = modes.find((x) => x.id === mode);
  const totals = dest ? circuitTotals(dest.circuit.stops) : null;
  const distanceKm =
    origin && dest
      ? isLocal
        ? totals?.km ?? 0
        : simulatedDistanceKm(origin, dest)
      : 0;
  const travelMinutes =
    m && totals
      ? isLocal
        ? Math.round(totals.min * m.speed)
        : Math.round(distanceKm * crossTripMinutesPerKm(m.id))
      : null;
  const availableModes = modes.filter(({ id }) => isLocal || distanceKm <= 30 || id !== "pe");

  return (
    <AppShell title="Mapa">
      <div className="relative h-[340px] w-full overflow-hidden bg-sea md:mt-6 md:h-[460px] md:rounded-3xl">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 0 H100 V8 C88 14 84 22 76 30 C66 38 58 40 52 48 C44 56 34 62 24 70 C16 76 8 86 0 92 Z" className="fill-sand" />
          <path d="M0 0 H100 V3 C86 8 80 18 72 24 C62 32 50 36 44 44 C38 50 26 56 16 64 C10 70 4 76 0 80 Z" className="fill-accent" />
        </svg>
        {destinations.map((x, i) => (
          <Button key={x.id} variant="ghost" aria-label={`Selecionar ${x.name}`} aria-pressed={sel === x.id} onClick={() => { setSel(x.id); setMode(null); }}
            style={{ left: `${x.map.x}%`, top: `${x.map.y}%` }}
            className={`absolute z-10 block h-auto -translate-x-1/2 -translate-y-1/2 p-0 text-center transition-opacity ${sel === x.id ? "opacity-100" : "opacity-55"}`}>
            <span className={`relative mx-auto block h-10 w-10 overflow-hidden rounded-full border-2 shadow-float transition-transform duration-150 lg:h-16 lg:w-16 ${sel === x.id ? "scale-110 border-leaf" : "border-card"}`}>
              <img
                src={x.image}
                alt={x.name}
                width={1024}
                height={768}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </span>
            <span className={`absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${sel === x.id ? "bg-leaf text-leaf-foreground" : "bg-forest text-forest-foreground"}`}>{i + 1}</span>
            <span className="mt-1 block max-w-[5.5rem] truncate rounded-full bg-card px-1.5 py-0.5 text-[9px] font-semibold shadow-soft lg:text-xs">{x.name}</span>
          </Button>
        ))}
        <span className="absolute bottom-8 right-4 left-4 text-right text-[10px] font-semibold uppercase text-forest/60">Mapa esquemático · sem navegação</span>
      </div>

      <div className="relative px-5 pt-6 pb-8 md:mx-auto md:max-w-3xl md:px-0">
        <Step n={1} title="Ponto de partida" done={!!origin} />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            aria-pressed={originMode === "current"}
            onClick={() => {
              setOriginMode("current");
              setMode(null);
            }}
            className={`flex items-center gap-3 rounded-2xl p-3 text-left text-sm transition-colors ${originMode === "current" ? "bg-forest text-forest-foreground" : "bg-card shadow-soft"}`}
          >
            <Crosshair className="h-5 w-5 shrink-0" />
            <span>
              <span className="block font-semibold">Usar localização atual (simulada)</span>
              <span className={`mt-0.5 block text-xs ${originMode === "current" ? "text-forest-foreground/70" : "text-muted-foreground"}`}>São Paulo · sem acesso ao GPS</span>
            </span>
          </button>
          <button
            type="button"
            aria-pressed={originMode === "choose"}
            onClick={() => {
              setOriginMode("choose");
              setMode(null);
            }}
            className={`flex items-center gap-3 rounded-2xl p-3 text-left text-sm transition-colors ${originMode === "choose" ? "bg-forest text-forest-foreground" : "bg-card shadow-soft"}`}
          >
            <MapPin className="h-5 w-5 shrink-0" />
            <span className="font-semibold">Escolher ponto de partida</span>
          </button>
        </div>
        {originMode === "choose" && (
          <div className="mt-3">
            <DestinationSelect
              selectedId={selectedOriginId}
              onSelect={(id) => {
                setSelectedOriginId(id);
                setMode(null);
              }}
              ariaLabel="Selecionar ponto de partida"
            />
          </div>
        )}

        <div className="mt-6"><Step n={2} title="Escolha o destino" done={!!dest} /></div>
        <div className="mt-3">
          <DestinationSelect
            selectedId={sel}
            onSelect={(id) => {
              setSel(id);
              setMode(null);
            }}
            ariaLabel="Selecionar destino"
          />
        </div>

        {dest && (
          <>
            <div className="mt-4">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-forest">
                {isLocal ? "Roteiro Local" : "Circuito entre destinos"}
              </span>
            </div>
            <div className="mt-6"><Step n={3} title="Meio de transporte" done={!!m} /></div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {availableModes.map(({ id, label, icon: Icon }) => (
                <Button variant="ghost" key={id} onClick={() => setMode(id)} aria-pressed={mode === id}
                  className={`flex h-auto min-w-0 flex-col items-center gap-1 whitespace-normal rounded-2xl px-1 py-3 text-center text-xs leading-tight font-medium ${mode === id ? "bg-leaf text-leaf-foreground" : "bg-card shadow-soft"}`}>
                  <Icon className="h-5 w-5" />{label}
                </Button>
              ))}
            </div>
          </>
        )}

        {dest && origin && m && totals && (
          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="break-words text-xl font-semibold">
                {isLocal ? dest.circuit.title : `${origin.name} → ${dest.name}`}
              </h2>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Summary icon={<RouteIcon className="h-4 w-4" />} label={isLocal ? "Distância" : "Distância simulada"} value={`${distanceKm} km`} />
              <Summary icon={<Bus className="h-4 w-4" />} label="Transporte" value={m.label} />
              <Summary icon={<Clock className="h-4 w-4" />} label="Tempo" value={travelMinutes === null ? "—" : formatMin(travelMinutes)} />
              <Summary icon={<span className="text-[10px] font-bold">CO₂</span>} label="Emissão" value={`${carbonKg(distanceKm, m.id)} kg`} />
            </div>
            {isLocal ? (
              <ol className="mt-5 grid gap-3 lg:grid-cols-2">
                {dest.circuit.stops.map((s, i) => (
                  <li key={s.name} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-xs font-bold text-forest-foreground">{i + 1}</span>
                    <img
                      src={dest.image}
                      alt=""
                      width={1024}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 shrink-0 rounded-xl object-cover"
                      style={{ objectPosition: `${(i * 30) % 100}% 50%` }}
                    />
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
            ) : (
              <div className="mt-5 rounded-2xl border border-forest/10 bg-card p-4 text-sm shadow-soft">
                <p className="font-semibold">{origin.name} <span className="font-normal text-muted-foreground">· ponto de partida simulado</span></p>
                <p className="my-2 text-xs text-muted-foreground">↓ {distanceKm} km estimados · sem navegação em tempo real</p>
                <p className="font-semibold">{dest.name} <span className="font-normal text-muted-foreground">· destino escolhido</span></p>
              </div>
            )}
          </section>
        )}
      </div>
    </AppShell>
  );
}

function simulatedDistanceKm(origin: Destination, destination: Destination) {
  if (origin.id === destination.id) return 0;
  return Math.round(Math.hypot(origin.map.x - destination.map.x, origin.map.y - destination.map.y) * 3);
}

function crossTripMinutesPerKm(transport: TransportId) {
  if (transport === "onibus") return 1.5;
  if (transport === "pe") return 20;
  if (transport === "carro") return 1.2;
  return 12;
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
