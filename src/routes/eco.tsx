import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, HeartHandshake, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { destinations, transports, carbonKg, offsetSuggestions, tripKm, realisticTransports, ACTIVE_MAX_KM, type TransportId } from "@/lib/data";
import { useCredits } from "@/lib/credits";
import footprintBanner from "@/assets/carbon-footprint-banner.png";
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
      <section className="mx-auto mt-8 max-w-2xl px-5">
        <details className="group rounded-2xl border border-border bg-card p-4 shadow-soft">
          <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold [&::-webkit-details-marker]:hidden">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-primary"><Info className="h-5 w-5" /></span>
            <span className="flex-1">Como calculamos a sua pegada</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-150 group-open:rotate-180" />
          </summary>
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-sm leading-relaxed text-muted-foreground">Esta é uma estimativa para ajudar você a comparar opções de transporte e planejar passeios com mais consciência. Multiplicamos a distância de ida e volta pelo fator médio de emissão de cada transporte.</p>
            <p className="mt-4 rounded-xl bg-accent p-4 text-sm font-semibold">Emissão estimada (kg CO₂) = distância (km) × fator de emissão do transporte</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Os fatores abaixo são referências médias por passageiro-quilômetro, não medições da sua viagem. Por isso, o resultado é educativo e pode variar conforme o veículo, a ocupação e as condições do trajeto.</p>
            <dl className="mt-4 divide-y divide-border">{transports.map(t => <div key={t.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><dt>{t.label}</dt><dd className="font-semibold">{t.factor.toLocaleString('pt-BR', { maximumFractionDigits: 3 })} kg CO₂/passageiro-km</dd></div>)}</dl>
            <p className="mt-4 text-sm leading-relaxed">Por exemplo: em 100 km de ônibus, usamos o fator de {transports.find(t => t.id === 'onibus')?.factor.toLocaleString('pt-BR')} para estimar {carbonKg(100, 'onibus').toLocaleString('pt-BR')} kg de CO₂.</p>
            <h3 className="mt-5 font-semibold">Pequenas escolhas também contam</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Caminhar e pedalar não geram emissões operacionais neste cálculo, mas isso não significa impacto total zero. Para distâncias acima de {ACTIVE_MAX_KM} km, mostramos apenas opções de transporte mais viáveis; caminhada e bicicleta fazem mais sentido nos passeios pelo destino.</p>
            <h3 className="mt-5 font-semibold">Ideias para cuidar do destino</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Você pode apoiar projetos locais de conservação e restauração, participar de mutirões de limpeza ou reduzir resíduos no dia a dia. São atitudes positivas, mas não representam uma compensação certificada nem neutralizam automaticamente as emissões da viagem.</p>
          </div>
        </details>
      </section>
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
      <div className="mb-5 h-40 overflow-hidden rounded-3xl bg-accent sm:h-48">
        <img
          src={footprintBanner}
          alt="Pegada ecológica em meio a uma floresta vista de cima"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h1 className="text-2xl font-semibold">Pegada de carbono</h1>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Vamos estimar as emissões do seu passeio? Escolha o roteiro e como você chegou até lá para comparar alternativas.</p>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roteiro</label>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {destinations.map((d) => (
          <Button key={d.id} variant="ghost" aria-pressed={route === d.id} onClick={() => { setRoute(d.id); setKm(String(tripKm[d.id] ?? 0)); }}
            className={`h-auto whitespace-normal rounded-2xl py-3 text-sm font-medium ${route === d.id ? "bg-forest text-forest-foreground" : "bg-card shadow-soft"}`}>{d.name}</Button>
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
        <div className="mt-6 rounded-3xl bg-card p-5 shadow-soft">
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
              : "Alerta: o carro é o meio mais poluente para essa viagem. Da próxima vez, tente ônibus, trem ou bicicleta nos trechos curtos. +5 créditos"}
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Comparativo para {result.km} km</p>
          <div className="mt-2 space-y-2">
            {realisticTransports(result.km).map((x) => (
              <Bar key={x.id} label={`${x.label}${x.id === result.t ? " (sua escolha)" : ""}`} value={carbonKg(result.km, x.id)} max={Math.max(result.car, 0.01)} tone={x.id === result.t ? "bg-leaf" : "bg-forest/70"} />
            ))}
          </div>
          {result.kg > 0 && (
            <div className="mt-5 rounded-2xl bg-accent p-4">
              <p className="flex items-center gap-2 text-sm font-semibold"><HeartHandshake className="h-4 w-4 text-primary" />Como compensar no dia a dia</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">{offsetSuggestions(result.kg).map((tip) => <li key={tip}>{tip}</li>)}</ul>
            </div>
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

