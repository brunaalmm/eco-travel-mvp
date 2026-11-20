import { createFileRoute } from "@tanstack/react-router";
import { EnvironmentalMetrics } from "@/components/EnvironmentalMetrics";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [
    { title: "Resumo" },
    { name: "description", content: "Emissões de CO₂ por modal, meta ambiental e transporte mais utilizado." },
    { property: "og:title", content: "Resumo ambiental — Painel do Gestor EcoTravel" },
    { property: "og:description", content: "Gráfico de rosca e indicadores de emissões de carbono do INEAVAR 2024." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Resumo,
});

function Resumo() {
  return <EnvironmentalMetrics showSources />;
}
