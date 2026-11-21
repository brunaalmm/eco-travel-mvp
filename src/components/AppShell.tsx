import { Link, useRouterState } from "@tanstack/react-router";
import { memo, type ReactNode } from "react";
import { Compass, Map, Leaf, Award, Bot, Info, Eye, LogOut, UserRound } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/descobrir", label: "Descobrir", icon: Compass },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/eco", label: "Carbono", icon: Leaf },
  { to: "/ecobot", label: "EcoBot", icon: Bot },
  { to: "/creditos", label: "Créditos", icon: Award },
] as const;
const BottomNavbar = memo(function BottomNavbar() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[400px] -translate-x-1/2 rounded-full bg-forest p-1.5 shadow-float md:hidden">
      <ul className="grid grid-cols-5">
        {nav.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/descobrir" }}
              className="flex flex-col items-center gap-0.5 rounded-full py-2 text-[10px] font-medium text-forest-foreground/60 transition-colors duration-150 data-[status=active]:bg-leaf data-[status=active]:text-leaf-foreground"
            >
              <Icon className="h-5 w-5" strokeWidth={1.8} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const isEcoBot = useRouterState({ select: (state) => state.location.pathname === "/ecobot" });

  return (
    <div
      className={`mx-auto flex w-full flex-col bg-background shadow-float md:shadow-none ${isEcoBot ? "h-[100dvh] overflow-hidden" : "min-h-screen"}`}
    >
      <header className="sticky top-0 z-30 bg-forest text-forest-foreground">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-5 md:h-20 md:max-w-5xl md:px-6 lg:max-w-7xl lg:px-10">
          <Link to="/descobrir" aria-label="EcoTravel início">
            <img
              src={logo}
              alt="EcoTravel"
              className="h-11 w-auto lg:h-14"
              width={600}
              height={338}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </Link>
          <div className="flex items-center gap-1 md:hidden">
            <Link
              to="/perfil"
              aria-label="Perfil e configurações"
              title="Perfil e configurações"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest-foreground/10"
            >
              <UserRound className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              aria-label="Voltar à entrada"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest-foreground/10"
            >
              <LogOut className="h-4 w-4" />
            </Link>
            {title && (
              <span className="hidden font-display text-sm font-medium opacity-80 sm:inline">
                {title}
              </span>
            )}
            <Link
              to="/sobre"
              aria-label="Sobre o EcoTravel"
              className="grid h-9 w-9 place-items-center rounded-full bg-forest-foreground/10 data-[status=active]:bg-leaf"
            >
              <Info className="h-4 w-4" />
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center">
            <ul className="flex gap-0.5">
              {nav.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    activeOptions={{ exact: to === "/descobrir" }}
                    className="flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium text-forest-foreground/70 transition-colors duration-150 hover:text-forest-foreground data-[status=active]:bg-leaf data-[status=active]:text-leaf-foreground"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-1 md:flex">
            <Link
              to="/perfil"
              aria-label="Perfil"
              title="Perfil"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest-foreground/10 data-[status=active]:bg-leaf"
            >
              <UserRound className="h-4 w-4" />
            </Link>
            <Link
              to="/perfil#accessibility"
              aria-label="Acessibilidade"
              title="Acessibilidade"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest-foreground/10"
            >
              <Eye className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              aria-label="Voltar à entrada"
              title="Sair"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest-foreground/10"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
      <main
        className={`mx-auto w-full flex-1 md:max-w-5xl md:px-6 lg:max-w-7xl lg:px-10 ${isEcoBot ? "min-h-0 pb-20 md:pb-0" : "pb-28 md:pb-0"}`}
      >
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
}
