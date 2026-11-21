import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, BookOpen, Award, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { rewards } from "@/lib/data";
import { useCredits } from "@/lib/credits";
import botJoy from "@/assets/bot-joy.png";
import botWink from "@/assets/bot-wink.png";
import icon from "@/assets/app-icon.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AccessibleContent } from "@/components/AccessibleContent";

const islandDescription = "A Ilha da Queimada Grande, perto do litoral de Itanhaém e Peruíbe, abriga a jararaca-ilhoa, serpente exclusiva deste lugar. A ilha tem encostas rochosas e vegetação de Mata Atlântica. A espécie está criticamente ameaçada. O desembarque é restrito a pesquisadores autorizados. Preserve a fauna e apoie a pesquisa científica.";

export const Route = createFileRoute("/creditos")({
  head: () => ({
    meta: [
      { title: "Créditos" },
      { name: "description", content: "Acumule créditos verdes e desbloqueie artigos e o certificado de apoio a projetos sustentáveis." },
      { property: "og:title", content: "Créditos verdes — EcoTravel" },
      { property: "og:description", content: "Desbloqueie conteúdos educativos exclusivos sobre o litoral paulista." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Creditos,
});

function Creditos() {
  const { credits } = useCredits();
  const [open, setOpen] = useState<string | null>(null);
  const next = rewards.find((r) => credits < r.goal);
  const max = rewards[rewards.length - 1]?.goal ?? 1;

  return (
    <AppShell title="Créditos">
      <section className="px-5 pt-6 lg:mx-auto lg:max-w-3xl lg:pt-10">
        <div className="relative overflow-hidden rounded-3xl bg-forest p-6 text-forest-foreground shadow-float">
          <img
            src={botJoy}
            alt=""
            width={144}
            height={144}
            loading="eager"
            decoding="async"
            className="absolute -right-3 -bottom-2 h-28 w-auto opacity-95"
          />
          <p className="text-xs uppercase tracking-wider opacity-70">Seus créditos verdes</p>
          <p className="mt-1 font-display text-5xl font-semibold">{credits}</p>
          <p className="mt-2 max-w-[60%] text-sm opacity-80">
            {next ? `Faltam ${next.goal - credits} para desbloquear “${next.title}”.` : "Você desbloqueou tudo! 🎉"}
          </p>
          <div className="mt-4 h-2 max-w-[65%] rounded-full bg-forest-foreground/20">
            <div className="h-full rounded-full bg-leaf" style={{ width: `${Math.min(100, (credits / max) * 100)}%` }} />
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Ganhe créditos usando a calculadora de carbono (transporte limpo vale mais) e conversando com o EcoBot.</p>

        <h2 className="mt-6 text-xl font-semibold">Recompensas</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {rewards.map((r) => {
            const ok = credits >= r.goal;
            const Icon = r.id === "certificado" ? Award : BookOpen;
            return (
              <Button key={r.id} variant="ghost" disabled={!ok} onClick={() => setOpen(r.id)}
                className={`flex h-auto items-center gap-4 whitespace-normal rounded-3xl p-4 text-left shadow-soft ${ok ? "bg-card" : "bg-muted"}`}>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${ok ? "bg-leaf text-leaf-foreground" : "bg-card text-muted-foreground"}`}>
                  {ok ? <Icon className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{r.title}</span>
                  <span className="block text-xs text-muted-foreground">{r.subtitle}</span>
                </span>
                <span className="shrink-0 text-xs font-bold">{ok ? "Abrir" : `${r.goal} pts`}</span>
              </Button>
            );
          })}
        </div>
      </section>

      <Dialog open={!!open} onOpenChange={(value) => { if (!value) setOpen(null); }}>
        {open && <DialogContent
          overlayClassName="bg-black/50 backdrop-blur-sm"
          closeClassName="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200/80 text-foreground opacity-100 hover:bg-stone-200 sm:h-auto sm:w-auto sm:rounded-sm sm:bg-transparent sm:opacity-70 sm:hover:bg-transparent"
          className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-t-3xl rounded-b-none p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:inset-x-auto sm:bottom-auto sm:left-[50%] sm:right-auto sm:top-[50%] sm:m-0 sm:max-h-[90dvh] sm:w-[calc(100%-2rem)] sm:max-w-xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg sm:p-6">
          {open === "cobras" && <AccessibleContent key={open} title="Ilha da Queimada Grande" text={islandDescription} />}
          <DialogTitle className="sr-only">{rewards.find((r) => r.id === open)?.title}</DialogTitle>
          <DialogDescription className="sr-only">Conteúdo exclusivo do EcoTravel</DialogDescription>
          {open === "cobras" ? <Article /> : <Certificate />}
        </DialogContent>}
      </Dialog>
    </AppShell>
  );
}

function Article() {
  return (
    <article>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Conteúdo exclusivo</span>
      <h2 className="mt-1 text-2xl font-semibold">Ilha da Queimada Grande, a Ilha das Cobras</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>A cerca de 33 km da costa de Itanhaém e Peruíbe, a Ilha da Queimada Grande abriga a <b className="text-foreground">jararaca-ilhoa</b> (<i>Bothrops insularis</i>), serpente que só existe ali no mundo.</p>
        <p>Isolada do continente há cerca de 11 mil anos, quando o nível do mar subiu, a espécie se adaptou a caçar aves migratórias — por isso seu veneno é extremamente potente.</p>
        <p>A espécie está <b className="text-foreground">criticamente ameaçada</b>. O desembarque é proibido e só pesquisadores autorizados podem visitar a ilha, que integra a Área de Relevante Interesse Ecológico (ARIE) das Ilhas Queimada Grande e Queimada Pequena.</p>
        <p>Como ajudar: não compre animais silvestres, apoie a pesquisa científica e espalhe informação correta, sem sensacionalismo.</p>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-accent p-3">
        <img
          src={botWink}
          alt="EcoBot"
          width={56}
          height={56}
          loading="eager"
          decoding="async"
          className="h-12 w-auto shrink-0"
        />
        <p className="text-sm">Curiosidade: é um dos lugares com maior densidade de serpentes do planeta!</p>
      </div>
    </article>
  );
}

function Certificate() {
  return (
    <div className="text-center">
      <div className="mx-auto mt-6 rounded-3xl border-2 border-dashed border-primary p-6">
        <img src={icon} alt="" className="mx-auto h-16 w-16 rounded-2xl" />
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">Certificado digital</p>
        <h2 className="mt-2 text-2xl font-semibold">Viajante Consciente</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Certificamos a participação no programa de apoio a projetos sustentáveis do litoral paulista, em parceria com órgãos de proteção ambiental.
        </p>
        <p className="mt-4 font-display text-sm font-semibold">{new Date().toLocaleDateString("pt-BR")}</p>
      </div>
      <Button variant="leaf" onClick={() => window.print()} className="mt-5 w-full">Salvar / imprimir</Button>
    </div>
  );
}
