import { createFileRoute } from "@tanstack/react-router";
import { EntryScreen } from "@/components/EntryScreen";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Entrar — EcoTravel" },
    { name: "description", content: "Bem-vindo ao EcoTravel. Escolha o perfil Turista ou Gestor na entrada demonstrativa." },
    { property: "og:title", content: "Entrar — EcoTravel" },
    { property: "og:description", content: "Turismo sustentável inteligente para turistas e gestores." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <EntryScreen />,
});