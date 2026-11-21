import { useState } from "react";
import botHappy from "@/assets/bot-happy.png";
import botWink from "@/assets/bot-wink.png";
import botWave from "@/assets/bot-wave.png";
import botJoy from "@/assets/bot-joy.png";
import botRight from "@/assets/bot-right.png";
import { ecoTips } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const bots = [botWave, botHappy, botWink, botRight, botJoy];

/** Dicas do EcoBot: cartão compacto no rodapé, fundo desfocado e mascote encaixado no topo. */
export function TipsModal({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const tip = ecoTips[step] ?? ecoTips[ecoTips.length - 1]!;
  const last = step === ecoTips.length - 1;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest/20 px-3 pt-16 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Dicas do EcoBot"
    >
      <div className="relative w-full max-w-md">
        <div
          className="flex max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1rem)] w-full flex-col overflow-y-auto rounded-[1.75rem] bg-[#F5F2EB] px-5 pb-4 pt-16 text-foreground shadow-float"
        >
          <button
            type="button"
            onClick={onDone}
            aria-label="Fechar dicas"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-foreground/10"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex min-h-28 shrink-0 flex-col justify-center text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider">{`Dica ${step + 1} de ${ecoTips.length}`}</p>
            <h2 className="mt-1 text-lg font-semibold">{tip.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{tip.text}</p>
          </div>
          <div className="my-3 flex shrink-0 justify-center gap-1.5">
            {ecoTips.map((_, i) => (
              <button
                key={i}
                aria-label={`Dica ${i + 1}`}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-colors duration-150 ${i === step ? "w-6 bg-forest" : "w-1.5 bg-accent-foreground/20"}`}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button variant="ghost" className="flex-1" onClick={onDone}>
              Pular
            </Button>
            <Button
              variant="leaf"
              className="flex-[2]"
              onClick={() => (last ? onDone() : setStep(step + 1))}
            >
              {last ? "Começar a explorar" : "Próxima dica"}
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-16 left-1/2 z-10 -translate-x-1/2">
          <img
            src={bots[step]}
            alt="EcoBot"
            className="h-32 w-32 object-contain drop-shadow-md animate-mascot-float"
          />
        </div>
      </div>
    </div>
  );
}
