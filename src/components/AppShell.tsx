import { Link } from "@tanstack/react-router";
import { Compass, Map, Leaf, Award } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Descobrir", icon: Compass },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/eco", label: "EcoBot", icon: Leaf },
  { to: "/creditos", label: "Créditos", icon: Award },
] as const;

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background shadow-float">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-forest px-5 text-forest-foreground">
        <Link to="/" aria-label="EcoTravel início">
          <img src={logo} alt="EcoTravel" className="h-11 w-auto" width={600} height={338} />
        </Link>
        {title && <span className="font-display text-sm font-medium opacity-80">{title}</span>}
      </header>
      <main className="flex-1 pb-28">{children}</main>
      <nav className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[400px] -translate-x-1/2 rounded-full bg-forest p-1.5 shadow-float">
        <ul className="grid grid-cols-4">
          {nav.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex flex-col items-center gap-0.5 rounded-full py-2 text-[11px] font-medium text-forest-foreground/60 transition-colors data-[status=active]:bg-leaf data-[status=active]:text-leaf-foreground"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
