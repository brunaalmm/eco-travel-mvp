import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TreePine } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { destinations, carbonKg, treesToOffset, tripKm, realisticTransports, ACTIVE_MAX_KM, type TransportId } from "@/lib/data";
import { useCredits } from "@/lib/credits";
import botRight from "@/assets/bot-right.png";
import botWrong from "@/assets/bot-wrong.png";

export const Route = createFileRoute("/eco")({
  head: () => ({
    meta: [
      { title: "Calculadora de pegada de carbono — EcoTravel" },
      { name: "description", content: "Calcule a pegada de carbono da sua viagem e tire dúvidas sobre turismo sustentável com o EcoBot." },
      { property: "og:title", content: "Calculadora de pegada de carbono — EcoTravel" },
      { property: "og:description", content: "Calcule o CO₂ da sua viagem e aprenda com o EcoBot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Eco,
});

function Eco() {
  return (
    <AppShell title="Carbono">
      <Calc />
    </AppShell>
  );
}

function Calc() {
  const { add } = useCredits();
  const [route, setRoute] = useState("peruibe");
  const [km, setKm] = useState(String(tripKm["peruibe"]));
  const [t, setT] = useState<TransportId>("onibus");
  const [result, setResult] = useState<null | { kg: number; car: number; t: TransportId; km: number }>(null);

  const dist = Math.max(0, Number(km) || 0);
  const options = realisticTransports(dist);
  const current = options.some((o) => o.id === t) ? t : "onibus";

  const calc = () => {
    const d = Math.max(0, Number(km) || 0);
    const r = { kg: carbonKg(d, current), car: carbonKg(d, "carro"), t: current, km: d };
    setResult(r);
    add(current === "carro" ? 5 : 15);
  };
  const clean = result && result.t !== "carro";

  return (
    <section className="px-5 pt-6 lg:mx-auto lg:max-w-2xl">
      <h1 className="text-2xl font-semibold">Pegada de carbono</h1>
      <p className="mt-1 text-sm text-muted-foreground">Selecione um roteiro já realizado e o transporte usado.</p>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roteiro</label>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {destinations.map((d) => (
          <button key={d.id} onClick={() => { setRoute(d.id); setKm(String(tripKm[d.id])); }}
            className={`rounded-2xl py-3 text-sm font-medium ${route === d.id ? "bg-forest text-forest-foreground" : "bg-card shadow-soft"}`}>{d.name}</button>
        ))}
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="km">Distância (ida e volta)</label>
      <div className="mt-2 flex items-center rounded-2xl bg-card px-4 shadow-soft">
        <input id="km" inputMode="decimal" value={km} onChange={(e) => setKm(e.target.value.replace(/[^\d.]/g, ""))} className="h-12 w-full bg-transparent text-lg font-semibold outline-none" />
        <span className="text-sm text-muted-foreground">km</span>
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transporte</label>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {options.map((x) => (
          <button key={x.id} onClick={() => setT(x.id)}
            className={`rounded-2xl py-3 text-sm font-medium ${current === x.id ? "bg-leaf text-leaf-foreground" : "bg-card shadow-soft"}`}>{x.label}</button>
        ))}
      </div>

      {dist > ACTIVE_MAX_KM && (
        <p className="mt-2 text-xs text-muted-foreground">Para mais de {ACTIVE_MAX_KM} km, mostramos só transportes viáveis. Trilha a pé e bicicleta ficam para os passeios no destino.</p>
      )}

      <Button variant="forest" className="mt-6 w-full" onClick={calc}>Calcular CO₂</Button>

      {result && (
        <div className="mt-6 animate-rise rounded-3xl bg-card p-5 shadow-soft">
          <div className="flex items-center gap-4">
            <img src={clean ? botRight : botWrong} alt="EcoBot" className="h-20 w-auto shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Emissão estimada</p>
              <p className="font-display text-4xl font-semibold">{result.kg}<span className="text-lg"> kg CO₂</span></p>
            </div>
          </div>
          <p className={`mt-4 rounded-2xl p-3 text-sm ${clean ? "bg-accent" : "bg-destructive/10 text-destructive"}`}>
            {clean
              ? `Parabéns! Você evitou ${Math.round((result.car - result.kg) * 10) / 10} kg de CO₂ em relação ao carro. +15 créditos verdes 🌱`
              : "Alerta: o carro é o meio mais poluente para essa viagem. Da próxima vez, tente ônibus ou divida a carona. +5 créditos"}
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Comparativo para {result.km} km</p>
          <div className="mt-2 space-y-2">
            {realisticTransports(result.km).map((x) => (
              <Bar key={x.id} label={`${x.label}${x.id === result.t ? " (sua escolha)" : ""}`} value={carbonKg(result.km, x.id)} max={Math.max(result.car, 0.01)} tone={x.id === result.t ? "bg-leaf" : "bg-forest/70"} />
            ))}
          </div>
          {result.kg > 0 && (
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <TreePine className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Para compensar, plante cerca de {treesToOffset(result.kg)} muda(s) nativa(s) da Mata Atlântica ou apoie projetos de restauração locais.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs"><span>{label}</span><b>{value} kg</b></div>
      <div className="mt-1 h-2.5 rounded-full bg-muted"><div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.max(2, (value / max) * 100)}%` }} /></div>
    </div>
  );
}

