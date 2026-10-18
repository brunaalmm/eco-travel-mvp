import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Star, Map, Mountain, BedDouble, UtensilsCrossed, Footprints } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getDestination, type Place } from "@/lib/data";
import botWave from "@/assets/bot-wave.png";

export const Route = createFileRoute("/destino/$id")({
  loader: ({ params }) => {
    const d = getDestination(params.id);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} sustentável — EcoTravel` : "Destino — EcoTravel" },
      { name: "description", content: loaderData?.summary ?? "Destino de ecoturismo." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — EcoTravel` : "EcoTravel" },
      { property: "og:description", content: loaderData?.summary ?? "Destino de ecoturismo." },
    ],
  }),
  component: Destino,
});

const tabs = [
  { key: "attractions", label: "Atrativos", icon: Mountain },
  { key: "lodging", label: "Hospedagem", icon: BedDouble },
  { key: "food", label: "Gastronomia", icon: UtensilsCrossed },
  { key: "tours", label: "Passeios", icon: Footprints },
] as const;

function Destino() {
  const d = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("attractions");
  const items: Place[] = d[tab];

  return (
    <AppShell title={d.name}>
      <div className="relative">
        <img src={d.image} alt={d.name} width={1024} height={768} className="aspect-[5/4] w-full object-cover lg:mt-6 lg:aspect-[21/8] lg:rounded-3xl" />
        <Link to="/" className="absolute left-4 top-4 lg:top-10 grid h-10 w-10 place-items-center rounded-full bg-card/95 shadow-soft" aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>
      <div className="relative -mt-8 rounded-t-[2rem] bg-background px-5 pt-6 lg:mx-auto lg:max-w-3xl lg:px-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{d.region}</span>
          <span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-warning text-warning" /><b>{d.rating}</b></span>
        </div>
        <h1 className="mt-1 text-3xl font-semibold">{d.name}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.summary}</p>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-[11px] font-medium transition-colors ${tab === key ? "bg-forest text-forest-foreground" : "bg-card shadow-soft"}`}>
              <Icon className="h-5 w-5" strokeWidth={1.8} />{label}
            </button>
          ))}
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {items.map((p) => (
            <li key={p.name} className="rounded-2xl bg-card p-4 shadow-soft animate-rise">
              {p.tag && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">{p.tag}</span>}
              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 rounded-3xl bg-accent p-4">
          <img src={botWave} alt="EcoBot" className="h-16 w-auto shrink-0" />
          <p className="text-sm">Lembre-se: aqui só recomendamos. Contrate direto com guias e negócios locais! 🌿</p>
        </div>

        <Link to="/mapa" search={{ d: d.id }} className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-leaf font-semibold text-leaf-foreground shadow-soft">
          <Map className="h-5 w-5" /> Ver circuito no mapa
        </Link>
      </div>
    </AppShell>
  );
}
