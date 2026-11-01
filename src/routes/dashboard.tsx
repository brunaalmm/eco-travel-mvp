import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Bus, CalendarDays, Car, CheckCircle2, ChevronDown, Footprints, LayoutDashboard, Leaf, ListFilter, LogOut, MapPin, Mountain, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardData, regions, type Region, type Period } from "@/lib/dashboard-data";
import { createDashboardPdf, downloadDashboardPdf } from "@/lib/dashboard-pdf";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Dashboard do Gestor — EcoTravel" },
    { name: "description", content: "Dashboard demonstrativo de monitorização regional de carbono em São Paulo, com indicadores, destinos e relatório EcoTravel." },
    { property: "og:title", content: "Dashboard do Gestor — EcoTravel" },
    { property: "og:description", content: "Indicadores regionais de carbono, metas ambientais e destinos sustentáveis de São Paulo em demonstração." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Dashboard,
});

const modeIcons = { carro: Car, onibus: Bus, carona: Users, trilha: Mountain, pe: Footprints };
const chartClasses = ["stroke-dashboard-chart-1", "stroke-dashboard-chart-2", "stroke-dashboard-chart-3", "stroke-dashboard-chart-4", "stroke-dashboard-chart-5"];
const swatchClasses = ["bg-dashboard-chart-1", "bg-dashboard-chart-2", "bg-dashboard-chart-3", "bg-dashboard-chart-4", "bg-dashboard-chart-5"];

function Dashboard() {
  const [region, setRegion] = useState<Region>("Todas");
  const [period, setPeriod] = useState<Period>("Último Mês");
  const [section, setSection] = useState("resumo");
  const [pdf, setPdf] = useState<{ blob?: Blob; error?: string }>({});
  const data = getDashboardData(region, period);
  useEffect(() => {
    let active = true;
    setPdf({});
    createDashboardPdf(getDashboardData(region, period), region, period)
      .then((blob) => { if (active) setPdf({ blob }); })
      .catch(() => { if (active) setPdf({ error: "Não foi possível gerar o relatório. Tente outro filtro." }); });
    return () => { active = false; };
  }, [region, period]);

  function download() {
    if (!pdf.blob) return;
    downloadDashboardPdf(pdf.blob);
    window.alert("Relatório PDF gerado com sucesso! O download foi iniciado.");
  }
  function scrollTo(id: string) {
    setSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }
  let offset = 0;
  const MostUsedIcon = data.mostUsed ? modeIcons[data.mostUsed.id] : Car;

  return <div className="min-h-screen bg-background">
    <header className="bg-forest text-forest-foreground">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <img src={logo} alt="EcoTravel" width={600} height={338} className="h-14 w-auto object-contain" />
        <div className="flex items-center gap-3"><span className="hidden text-sm text-forest-foreground/70 sm:inline">Área do Gestor</span><Button variant="ghostLight" size="icon" asChild><Link to="/" aria-label="Voltar à entrada" title="Voltar à entrada"><LogOut /></Link></Button></div>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-32 pt-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-leaf" />Dashboard · Dados demonstrativos</p><h1 className="font-display text-3xl font-semibold tracking-normal sm:text-4xl">Olá, Gestor(a),</h1><p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">Monitorização regional da pegada de carbono no Estado de São Paulo</p></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />São Paulo, Brasil</div>
      </div>

      <section aria-label="Filtros regionais" className="my-7 flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0"><p className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><ListFilter className="h-3.5 w-3.5" />REGIÃO</p><div className="flex flex-wrap gap-1" role="group" aria-label="Região">{regions.map((item) => <Button key={item} variant={region === item ? "default" : "ghost"} size="sm" aria-pressed={region === item} onClick={() => setRegion(item)} className={region === item ? "bg-forest text-forest-foreground hover:bg-forest/90" : "text-muted-foreground"}>{item}</Button>)}</div></div>
        <div className="shrink-0"><p className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />PERÍODO</p><div className="flex gap-1" role="group" aria-label="Período">{(["Último Mês", "Ano Atual"] as const).map((item) => <Button key={item} size="sm" variant={period === item ? "secondary" : "ghost"} aria-pressed={period === item} onClick={() => setPeriod(item)} className={period === item ? "bg-accent text-accent-foreground shadow-none" : "text-muted-foreground"}>{item}</Button>)}</div></div>
      </section>

      <section id="resumo" className="scroll-mt-6" aria-label="Resumo ambiental">
        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-lg bg-forest p-5 text-forest-foreground sm:p-7">
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-medium tracking-normal">Impacto ambiental positivo</h2><p className="mt-1 text-xs text-forest-foreground/65">CO₂ economizado por modal · {region}</p></div><Leaf className="h-5 w-5 text-dashboard-chart-1" /></div>
            <div className="mt-6 flex flex-col items-center gap-7 xl:flex-row xl:justify-center">
              <div className="relative h-64 w-64 shrink-0" role="img" aria-label={`${data.total.toFixed(1)} toneladas de CO₂ economizadas. ${data.distribution.map((mode) => `${mode.label}: ${mode.percent}%`).join(", ")}`}>
                <svg className="dashboard-chart h-full w-full" viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="98" fill="none" className="stroke-forest-foreground/10" strokeWidth="19" />{data.distribution.map((mode, index) => {
                  const start = offset;
                  const share = data.total ? mode.tonnes / data.total * 100 : 0;
                  offset += share;
                  return <circle key={mode.id} cx="120" cy="120" r="98" fill="none" strokeWidth="19" pathLength="100" strokeDasharray={`${Math.max(0, share - 1)} ${100 - Math.max(0, share - 1)}`} strokeDashoffset={-start} className={chartClasses[index]} />;
                })}</svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="mb-2 text-xs text-forest-foreground/65">Total acumulado</span><span className="font-display text-4xl font-semibold tracking-normal">{data.total.toFixed(1)} <span className="text-xl font-normal text-dashboard-chart-1">t CO₂</span></span><span className="mt-2 flex items-center gap-1 text-xs text-dashboard-chart-1"><ArrowUpRight className="h-3.5 w-3.5" />economizadas</span></div>
              </div>
              <ul className="w-full space-y-3 xl:max-w-60">{data.distribution.map((mode, index) => { const Icon = modeIcons[mode.id]; return <li key={mode.id} className="flex items-center gap-2.5"><span className={`h-2 w-2 shrink-0 rounded-full ${swatchClasses[index]}`} /><Icon className="h-4 w-4 shrink-0 text-forest-foreground/65" /><div className="min-w-0 flex-1"><p className="text-sm">{mode.label}</p><p className="mt-0.5 text-[10px] leading-4 text-forest-foreground/60">{mode.description}</p></div><div className="shrink-0 text-right"><p className="text-sm font-semibold">{mode.percent}%</p><p className="text-xs text-forest-foreground/60">{mode.tonnes.toFixed(1)} t</p></div></li>; })}</ul>
            </div>
            <p className="mt-6 border-t border-forest-foreground/15 pt-3 text-[10px] leading-4 text-forest-foreground/55">Valores e percentuais arredondados · Base ilustrativa, sem monitorização real.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <article className="rounded-lg bg-forest p-6 text-forest-foreground"><div className="flex items-center justify-between"><Target className="h-6 w-6 text-dashboard-chart-1" /><span className="text-xs text-forest-foreground/60">{period}</span></div><h2 className="mt-4 text-base font-medium tracking-normal">Meta Ambiental de Redução</h2><div className="mt-3 flex items-end gap-2"><span className="font-display text-4xl font-semibold tracking-normal">{data.progress}%</span><span className="pb-1 text-sm text-dashboard-chart-1">concluída</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-forest-foreground/15" role="progressbar" aria-label="Meta Ambiental de Redução" aria-valuenow={data.progress} aria-valuemin={0} aria-valuemax={100}><svg width="100%" height="8" aria-hidden="true"><rect width={`${Math.min(100, data.progress)}%`} height="8" rx="4" className="fill-dashboard-chart-1" /></svg></div><p className="mt-3 text-xs text-forest-foreground/60">{data.total.toFixed(1)} de {data.target} t CO₂ · meta demonstrativa</p></article>
            <article className="rounded-lg bg-forest p-6 text-forest-foreground"><div className="flex items-center justify-between"><MostUsedIcon className="h-6 w-6 text-dashboard-chart-2" /><span className="text-xs text-forest-foreground/60">{data.trips.toLocaleString("pt-BR")} registros</span></div><h2 className="mt-4 text-base font-medium tracking-normal">Transporte Mais Utilizado</h2><p className="mt-3 font-display text-3xl font-semibold tracking-normal">{data.mostUsed?.label}</p><p className="mt-3 text-sm text-dashboard-chart-2">{data.mostUsed?.trips.toLocaleString("pt-BR")} deslocamentos</p><p className="mt-2 text-xs text-forest-foreground/60">Maior frequência na base demonstrativa</p></article>
          </div>
        </div>
      </section>

      <section id="registros" className="mt-9 scroll-mt-6" aria-labelledby="records-title"><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><div><h2 id="records-title" className="text-xl font-semibold tracking-normal">Registos Recentes e Destinos Monitorados</h2><p className="mt-1 text-xs text-muted-foreground">Impacto detalhado por rotas nas regiões de São Paulo</p></div><span className="flex items-center gap-1 text-xs text-muted-foreground">{data.records.length} destinos<ChevronDown className="h-3 w-3" /></span></div>
        <div className="overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-forest text-forest-foreground"><tr>{["Destino / Rota", "Região", "Modal", "CO₂ economizado"].map((label) => <th key={label} scope="col" className="px-5 py-4 text-xs font-medium last:text-right">{label}</th>)}</tr></thead><tbody>{data.records.map((row) => { const mode = data.distribution.find((m) => m.id === row.mode); const Icon = modeIcons[row.mode]; return <tr key={row.route} className="border-b border-border last:border-0 even:bg-dashboard-row odd:bg-background"><td className="px-5 py-4 font-medium">{row.route}</td><td className="px-5 py-4 text-muted-foreground">{row.region}</td><td className="px-5 py-4"><span className="flex items-center gap-2"><Icon className="h-4 w-4 text-leaf" />{mode?.label}</span></td><td className="px-5 py-4 text-right font-semibold">{row.tonnes.toFixed(1)} t</td></tr>; })}</tbody></table></div>
      </section>
      <section id="relatorio" className="mt-6 flex scroll-mt-6 flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><p className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-leaf" />Relatório demonstrativo · {region} · {period}</p><Button onClick={download} disabled={!pdf.blob} className="h-11 bg-forest px-5 text-forest-foreground hover:bg-forest/90"><ArrowDownToLine />{pdf.blob ? "Baixar Relatório (PDF)" : "Preparando relatório…"}</Button>{pdf.error && <p role="alert" className="w-full text-sm text-destructive">{pdf.error}</p>}</section>
    </main>
    <nav aria-label="Navegação do Gestor" className="dashboard-bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-forest-foreground/15 bg-forest text-forest-foreground shadow-float"><div className="mx-auto grid max-w-lg grid-cols-4 gap-2 px-4 pt-2">{[{ id: "resumo", label: "Resumo", icon: LayoutDashboard }, { id: "registros", label: "Registos", icon: ListFilter }, { id: "relatorio", label: "Relatório", icon: ArrowDownToLine }].map(({ id, label, icon: Icon }) => <Button key={id} variant="ghostLight" aria-pressed={section === id} onClick={() => scrollTo(id)} className={`h-14 flex-col gap-1 rounded-lg px-1 text-[10px] ${section === id ? "bg-forest-foreground/10 text-dashboard-chart-1" : "text-forest-foreground/65"}`}><Icon className="h-5 w-5" />{label}</Button>)}<Button variant="ghostLight" asChild className="h-14 flex-col gap-1 rounded-lg px-1 text-[10px]"><Link to="/" aria-label="Sair para a entrada"><LogOut className="h-5 w-5" />Sair</Link></Button></div></nav>
  </div>;
}