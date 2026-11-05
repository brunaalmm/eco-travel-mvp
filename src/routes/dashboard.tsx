import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { AlertTriangle, CalendarDays, FileText, LayoutDashboard, ListFilter, LogOut, MapPin, Route as RouteIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardProvider, useDashboard } from "@/components/DashboardContext";
import { regions } from "@/lib/dashboard-data";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Painel do Gestor — EcoTravel" },
    { name: "description", content: "Painel demonstrativo de monitorização regional de carbono em São Paulo, com resumo, roteiros e central de relatórios." },
    { property: "og:title", content: "Painel do Gestor — EcoTravel" },
    { property: "og:description", content: "Indicadores regionais de carbono e capacidade das trilhas em demonstração." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Resumo", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/roteiros", label: "Roteiros", icon: RouteIcon, exact: false },
  { to: "/dashboard/relatorios", label: "Relatórios", icon: FileText, exact: false },
] as const;

function DashboardLayout() {
  return <DashboardProvider><Shell /></DashboardProvider>;
}

function Shell() {
  const { region, setRegion, period, setPeriod, peak, setPeak, data } = useDashboard();
  return <div className="min-h-screen bg-background">
    <header className="bg-forest text-forest-foreground">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <img src={logo} alt="EcoTravel" width={600} height={338} className="h-14 w-auto object-contain" />
        <nav aria-label="Seções do painel" className="hidden gap-1 lg:flex">
          {nav.map(({ to, label, icon: Icon, exact }) => <Link key={to} to={to} activeOptions={{ exact }} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-forest-foreground/70 hover:text-forest-foreground data-[status=active]:bg-forest-foreground/10 data-[status=active]:text-dashboard-chart-1"><Icon className="h-4 w-4" />{label}</Link>)}
        </nav>
        <Button variant="ghostLight" size="icon" asChild><Link to="/" aria-label="Sair para a entrada"><LogOut /></Link></Button>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-32 pt-8 sm:px-8 lg:pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-leaf" />Painel do Gestor · Dados demonstrativos</p><h1 className="font-display text-3xl font-semibold tracking-normal sm:text-4xl">Olá, Gestor(a),</h1><p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">Monitorização regional da pegada de carbono no Estado de São Paulo</p></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />São Paulo, Brasil</div>
      </div>
      <section aria-label="Filtros" className="my-7 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0"><p className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><ListFilter className="h-3.5 w-3.5" />REGIÃO</p><div className="flex flex-wrap gap-1" role="group" aria-label="Região">{regions.map((item) => <Button key={item} size="sm" variant="ghost" aria-pressed={region === item} onClick={() => setRegion(item)} className={region === item ? "bg-forest text-forest-foreground hover:bg-forest/90 hover:text-forest-foreground" : "text-muted-foreground"}>{item}</Button>)}</div></div>
        <div className="shrink-0"><p className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />PERÍODO</p><div className="flex gap-1" role="group" aria-label="Período">{(["Último Mês", "Ano Atual"] as const).map((item) => <Button key={item} size="sm" variant="ghost" aria-pressed={period === item} onClick={() => setPeriod(item)} className={period === item ? "bg-accent text-accent-foreground" : "text-muted-foreground"}>{item}</Button>)}</div></div>
        <Button variant={peak ? "destructive" : "forest"} aria-pressed={peak} onClick={() => setPeak(!peak)} className="h-auto min-h-11 whitespace-normal"><Users />{peak ? "Encerrar simulação de pico" : "Simular Pico de Turistas / Feriado"}</Button>
      </section>
      {peak && <div role="alert" className="mb-7 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold text-destructive"><AlertTriangle className="h-4 w-4" />Alerta inteligente de capacidade de suporte</p>
        {data.overCapacity.length ? <ul className="mt-2 space-y-1">{data.overCapacity.map((r) => <li key={r.route}><b>{r.route}</b>: {r.usage}% da capacidade — recomenda-se limitar entradas, escalonar horários e redirecionar visitantes.</li>)}</ul> : <p className="mt-2">Fluxo elevado, mas dentro da capacidade nesta região.</p>}
      </div>}
      <Outlet />
    </main>
    <nav aria-label="Navegação do Gestor" className="dashboard-bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-forest-foreground/15 bg-forest text-forest-foreground shadow-float lg:hidden"><div className="mx-auto grid max-w-lg grid-cols-4 gap-2 px-4 pt-2">
      {nav.map(({ to, label, icon: Icon, exact }) => <Link key={to} to={to} activeOptions={{ exact }} className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[10px] text-forest-foreground/65 data-[status=active]:bg-forest-foreground/10 data-[status=active]:text-dashboard-chart-1"><Icon className="h-5 w-5" />{label}</Link>)}
      <Link to="/" className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[10px] text-forest-foreground/65"><LogOut className="h-5 w-5" />Sair</Link>
    </div></nav>
  </div>;
}
