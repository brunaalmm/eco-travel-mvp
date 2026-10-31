import { createFileRoute } from "@tanstack/react-router";
import { EntryScreen } from "@/components/EntryScreen";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [
    { title: "Cadastro demonstrativo — EcoTravel" },
    { name: "description", content: "Prévia da criação de conta do EcoTravel, sem salvar dados ou criar contas reais." },
    { property: "og:title", content: "Cadastro demonstrativo — EcoTravel" },
    { property: "og:description", content: "Prévia de cadastro para turistas e gestores do EcoTravel." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <EntryScreen registration />,
});