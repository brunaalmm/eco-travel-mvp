import { Link } from "@tanstack/react-router";
import { Map, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AccessibleContent } from "@/components/AccessibleContent";
import { getDestination, destinationDescription } from "@/lib/data";
import bot from "@/assets/bot-wave.png";

export function DestinationDialog({ id, onClose }: { id: string | null; onClose: () => void }) {
  const d = id ? getDestination(id) : undefined;
  return <Dialog open={!!d} onOpenChange={(open) => { if (!open) onClose(); }}>
    {d && <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg">
      <AccessibleContent key={d.id} title={d.name} text={destinationDescription(d)} route />
      <DialogTitle className="text-2xl leading-tight">{d.circuit.title}</DialogTitle>
      <DialogDescription>{d.region} · {d.macroRegion}</DialogDescription>
      <img src={d.image} alt={`Paisagem ilustrativa de ${d.name}`} width={1024} height={768} className="aspect-[4/3] max-h-64 w-full rounded-lg object-cover" />
      <p className="text-sm leading-relaxed">{d.summary}</p>
      <ul className="space-y-3">{d.attractions.map((p) => <li key={p.name}><h3 className="font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">{p.desc}</p></li>)}</ul>
      <div className="flex gap-3 border-t border-border pt-4"><img src={bot} alt="EcoBot" className="h-14 w-14 object-contain" /><p className="text-xs leading-relaxed text-muted-foreground">Imagem e percurso ilustrativos. Confirme regras de visita e acessibilidade com os responsáveis pelo local.</p></div>
      <div className="flex flex-wrap gap-2"><Button asChild variant="forest"><Link to="/destino/$id" params={{ id: d.id }}><ArrowUpRight />Todos os detalhes</Link></Button><Button asChild variant="outline"><Link to="/mapa" search={{ d: d.id }}><Map />Ver circuito</Link></Button></div>
    </DialogContent>}
  </Dialog>;
}