import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, CalendarDays, FileText, LayoutDashboard, LogOut, MapPin, Route as RouteIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardProvider, useDashboard } from "@/components/DashboardContext";
import { dashboardGreeting } from "@/lib/dashboard-greeting";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Painel do Gestor" },
    { name: "description", content: "Painel demonstrativo de monitorização de carbono em São Paulo, com resumo, roteiros e central de relatórios." },
    { property: "og:title", content: "Painel do Gestor — EcoTravel" },
    { property: "og:description", content: "Indicadores de carbono e capacidade das trilhas em demonstração." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Resumo", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/roteiros", label: "Roteiros", icon: RouteIcon, exact: false },
  { to: "/dashboard/aprovacoes", label: "Aprovação de Roteiros", icon: BadgeCheck, exact: false },
  { to: "/dashboard/relatorios", label: "Relatórios", icon: FileText, exact: false },
  { to: "/dashboard/configuracoes", label: "Configurações", icon: Settings, exact: false },
] as const;

function DashboardLayout() {
  return <DashboardProvider><Shell /></DashboardProvider>;
}

function Shell() {
  const { period, setPeriod } = useDashboard();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isSettingsPage = pathname === "/dashboard/configuracoes";
  const [greeting, setGreeting] = useState(() => dashboardGreeting());

  useEffect(() => {
    const timer = window.setInterval(() => setGreeting(dashboardGreeting()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

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
      {!isSettingsPage && <>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="font-display text-3xl font-semibold tracking-normal sm:text-4xl">{greeting}</h1><p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">Monitorização da pegada de carbono no Estado de São Paulo</p></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />São Paulo, Brasil</div>
        </div>
      </>}
      <Outlet />
    </main>
    <nav aria-label="Navegação do Gestor" className="dashboard-bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-forest-foreground/15 bg-forest text-forest-foreground shadow-float lg:hidden"><div className="mx-auto grid max-w-lg grid-cols-5 gap-1 px-2 pt-2">
      {nav.map(({ to, label, icon: Icon, exact }) => <Link key={to} to={to} aria-label={label} activeOptions={{ exact }} className="flex h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-lg text-center text-[8px] leading-3 text-forest-foreground/65 data-[status=active]:bg-forest-foreground/10 data-[status=active]:text-dashboard-chart-1"><Icon className="h-5 w-5 shrink-0" /><span>{label === "Aprovação de Roteiros" ? "Aprovação" : label}</span></Link>)}
    </div></nav>
  </div>;
}
