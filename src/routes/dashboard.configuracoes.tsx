import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { AccessibilityControls } from "@/components/AccessibilityControls";

export const Route = createFileRoute("/dashboard/configuracoes")({
  head: () => ({ meta: [
    { title: "Painel do Gestor" },
    { name: "description", content: "Configurações de acessibilidade do painel EcoTravel." },
    { property: "og:title", content: "Painel do Gestor" },
    { property: "og:description", content: "Configurações de acessibilidade do painel EcoTravel." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Configuracoes,
});

function Configuracoes() {
  return (
    <section aria-labelledby="settings-title" className="max-w-3xl">
      <div className="flex items-center gap-3">
        <Eye className="h-5 w-5 text-primary" />
        <h2 id="settings-title" className="text-xl font-semibold">Acessibilidade</h2>
      </div>
      <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card px-4 [&>*]:py-4">
        <AccessibilityControls scope="manager" />
      </div>
    </section>
  );
}