import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Star, Leaf, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SplashScreen, TipsModal } from "@/components/Splash";
import { HighlightCarousel } from "@/components/HighlightCarousel";
import { macroRegions, filterDestinations, type MacroRegion } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { DestinationDialog } from "@/components/DestinationDialog";

export const Route = createFileRoute("/descobrir")({
  head: () => ({
    meta: [
      { title: "Descobrir São Paulo — EcoTravel" },
      { name: "description", content: "Sete roteiros sustentáveis pelo Litoral, Grande SP e Interior paulista, com recursos de acessibilidade." },
      { property: "og:title", content: "Descobrir São Paulo — EcoTravel" },
      { property: "og:description", content: "Ecoturismo pelo Litoral, Grande SP e Interior de São Paulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Descobrir,
});

function Descobrir() {
  const [phase, setPhase] = useState<"splash" | "tips" | null>(null);
  const [q, setQ] = useState("");
  const [where, setWhere] = useState<MacroRegion>("Todos");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("eco-splash")) setPhase("splash");
  }, []);
  const toTips = useCallback(() => setPhase("tips"), []);
  const close = () => {
    sessionStorage.setItem("eco-splash", "1");
    setPhase(null);
  };

  const list = useMemo(
    () => filterDestinations(where, q),
    [q, where],
  );

  return (
    <AppShell>
      {phase === "splash" && <SplashScreen onDone={toTips} />}
      {phase === "tips" && <TipsModal onDone={close} />}
      <section className="px-5 pt-6">
        <HighlightCarousel />
        <h1 className="mt-6 max-w-3xl text-lg font-medium leading-snug text-foreground lg:text-2xl">
          Descubra destinos incríveis com responsabilidade ambiental. Viaje por roteiros que valorizam a cultura local, protegem a biodiversidade e geram impacto positivo nas comunidades.
        </h1>
        <label className="mt-5 flex h-13 max-w-xl items-center gap-3 rounded-full bg-card px-5 py-3.5 shadow-soft">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Aonde vamos?"
            aria-label="Buscar roteiros"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Onde ir</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Onde ir">
          {macroRegions.map((region) => (
            <Button
              key={region}
              onClick={() => setWhere(region)}
              aria-pressed={where === region}
              variant="ghost"
              className={`h-auto min-h-10 max-w-full whitespace-normal rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                where === region ? "bg-forest text-forest-foreground hover:bg-forest/90 hover:text-forest-foreground" : "bg-card text-foreground shadow-soft"
              }`}
            >
              {region}
            </Button>
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Roteiros</h2>
          <span className="text-xs text-muted-foreground">{list.length} roteiros</span>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <Button
              key={d.id}
              onClick={() => setSelected(d.id)}
              variant="ghost"
              aria-label={`Ver ${d.circuit.title}`}
              className="group block h-auto w-full overflow-hidden whitespace-normal rounded-3xl bg-card p-0 text-left shadow-soft animate-rise"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} width={1024} height={768} loading={i ? "lazy" : undefined} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1 text-[11px] font-bold tracking-wider">{d.duration}</span>
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-leaf px-3 py-1 text-[11px] font-semibold text-leaf-foreground">
                  <Leaf className="h-3 w-3" /> Selo verde
                </span>
              </div>
              <div className="p-5">
                 <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{d.region}</div>
                <h3 className="mt-1 text-lg font-semibold">{d.circuit.title}</h3>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                   {d.reviews > 0 ? <><b>{d.rating}</b><span className="text-muted-foreground">({d.reviews} avaliações)</span></> : <span className="text-muted-foreground">Roteiro demonstrativo</span>}
                </div>
              </div>
            </Button>
          ))}
          {!list.length && <p className="py-10 text-center text-sm text-muted-foreground">Nenhum roteiro encontrado.</p>}
        </div>
      </section>
      <DestinationDialog id={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
