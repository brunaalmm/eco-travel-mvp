import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Check, Clock3, MapPin, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/components/DashboardContext";
import { destinations } from "@/lib/data";

export const Route = createFileRoute("/dashboard/aprovacoes")({
  head: () => ({ meta: [
    { title: "Painel do Gestor" },
    { name: "description", content: "Análise demonstrativa de roteiros ecológicos e parceiros do Selo Verde." },
    { property: "og:title", content: "Painel do Gestor" },
    { property: "og:description", content: "Análise demonstrativa de roteiros ecológicos e parceiros do Selo Verde." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Aprovacoes,
});

type Decision = "Pendente" | "Aprovado" | "Rejeitado";

const requests = destinations.slice(0, 3).map((destination) => ({
  id: destination.id,
  route: destination.tours[0]?.name ?? destination.circuit.title,
  destination: destination.name,
  summary: destination.summary,
  partner: `Parceiro local · ${destination.name}`,
  region: destination.macroRegion,
}));

function Aprovacoes() {
  const { region } = useDashboard();
  const [routeDecisions, setRouteDecisions] = useState<Record<string, Decision>>({});
  const [partnerDecisions, setPartnerDecisions] = useState<Record<string, Decision>>({});
  const [notice, setNotice] = useState("");
  const visibleRequests = requests.filter((request) => region === "Todas" || request.region === region);

  const decide = (kind: "roteiro" | "parceiro", id: string, decision: Decision) => {
    const update = kind === "roteiro" ? setRouteDecisions : setPartnerDecisions;
    update((current) => ({ ...current, [id]: decision }));
    setNotice(`${kind === "roteiro" ? "Roteiro" : "Parceiro"} marcado como ${decision.toLowerCase()}. Alteração demonstrativa, não publicada.`);
  };

  return (
    <div className="space-y-10">
      <section aria-labelledby="route-approvals-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="route-approvals-title" className="text-xl font-semibold">Aprovação de Roteiros</h2>
            <p className="mt-1 text-sm text-muted-foreground">Revise propostas de experiências ecológicas vinculadas aos destinos do catálogo · {visibleRequests.length} solicitações demonstrativas</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="h-4 w-4" />Prévia demonstrativa</span>
        </div>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {visibleRequests.map((request) => {
            const decision = routeDecisions[request.id] ?? "Pendente";
            return (
              <article key={request.id} className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{request.route}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{request.destination} · {request.partner}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{request.summary}</p>
                  <DecisionLabel decision={decision} />
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button variant="forest" size="sm" onClick={() => decide("roteiro", request.id, "Aprovado")}><Check />Aprovar</Button>
                  <Button variant="outline" size="sm" onClick={() => decide("roteiro", request.id, "Rejeitado")}><X />Rejeitar</Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="green-seal-title">
        <div>
          <h2 id="green-seal-title" className="text-xl font-semibold">Validação do Selo Verde</h2>
          <p className="mt-1 text-sm text-muted-foreground">Confira as informações dos parceiros antes de marcar a validação demonstrativa.</p>
        </div>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {visibleRequests.map((request) => {
            const decision = partnerDecisions[request.id] ?? "Pendente";
            return (
              <article key={request.id} className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-semibold"><BadgeCheck className="h-4 w-4 text-primary" />{request.partner}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Destino: {request.destination} · Verifique práticas ambientais, vínculo local e critérios de visitação.</p>
                  <DecisionLabel decision={decision} />
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button variant="forest" size="sm" onClick={() => decide("parceiro", request.id, "Aprovado")}><BadgeCheck />Validar Selo Verde</Button>
                  <Button variant="outline" size="sm" onClick={() => decide("parceiro", request.id, "Rejeitado")}><X />Rejeitar</Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      {notice && <p role="status" className="rounded-lg bg-accent p-3 text-sm">{notice}</p>}
      <p className="text-xs text-muted-foreground">As decisões ficam apenas nesta sessão de demonstração. Nenhum roteiro é publicado e nenhum selo é certificado.</p>
    </div>
  );
}

function DecisionLabel({ decision }: { decision: Decision }) {
  return <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">Status: <span className={decision === "Aprovado" ? "font-semibold text-primary" : decision === "Rejeitado" ? "font-semibold text-destructive" : "font-medium"}>{decision}</span></p>;
}