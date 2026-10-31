import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Dashboard do Gestor — EcoTravel" },
    { name: "description", content: "Espaço reservado para a futura gestão de turismo sustentável do EcoTravel." },
    { property: "og:title", content: "Dashboard do Gestor — EcoTravel" },
    { property: "og:description", content: "Espaço de gestão do EcoTravel em demonstração." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Dashboard,
});

function Dashboard() {
  return <div className="min-h-screen bg-background"><header className="bg-forest text-forest-foreground"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8"><img src={logo} alt="EcoTravel" width={600} height={338} className="h-14 w-auto object-contain" /><Button variant="ghostLight" size="icon" asChild><Link to="/" aria-label="Voltar à entrada" title="Voltar à entrada"><LogOut /></Link></Button></div></header><main className="mx-auto max-w-6xl px-5 pt-8 sm:px-8"><p className="text-xs font-medium text-muted-foreground">Gestor · Demonstração</p><h1 className="mt-2 text-2xl font-semibold tracking-normal">Dashboard</h1></main></div>;
}