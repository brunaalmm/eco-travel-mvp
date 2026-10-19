import { useEffect, useState } from "react";
import icon from "@/assets/app-icon.png";
import botHappy from "@/assets/bot-happy.png";
import botWink from "@/assets/bot-wink.png";
import botWave from "@/assets/bot-wave.png";
import botJoy from "@/assets/bot-joy.png";
import botRight from "@/assets/bot-right.png";
import { ecoTips } from "@/lib/data";
import { Button } from "@/components/ui/button";

const bots = [botWave, botHappy, botWink, botRight, botJoy];

/** Tela de abertura animada (~3s). */
export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-forest text-forest-foreground">
      <img src={icon} alt="EcoTravel" width={256} height={256} className="h-36 w-36 rounded-[2.25rem] shadow-float animate-float lg:h-44 lg:w-44" />
      <p className="mt-8 font-display text-2xl font-semibold animate-rise">EcoTravel</p>
      <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-forest-foreground/20">
        <div className="h-full rounded-full bg-leaf" style={{ animation: "splash-bar 3s linear forwards" }} />
      </div>
    </div>
  );
}

/** Modal de dicas do EcoBot, sobre a tela inicial com fundo desfocado. */
export function TipsModal({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const tip = ecoTips[step];
  const last = step === ecoTips.length - 1;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-5 backdrop-blur-md animate-in fade-in" role="dialog" aria-modal="true" aria-label="Dicas do EcoBot">
      <div className="w-full max-w-sm rounded-[2rem] bg-forest p-7 text-forest-foreground shadow-float">
        <div key={step} className="flex flex-col items-center text-center animate-rise">
          <img src={bots[step]} alt="EcoBot" className="h-36 w-auto object-contain animate-float" />
          <span className="mt-6 rounded-full bg-leaf px-3 py-1 text-xs font-semibold uppercase tracking-wider text-leaf-foreground">
            Dica {step + 1} de {ecoTips.length}
          </span>
          <h2 className="mt-4 text-2xl font-semibold">{tip.title}</h2>
          <p className="mt-2 min-h-12 text-forest-foreground/75">{tip.text}</p>
        </div>
        <div className="my-6 flex justify-center gap-1.5">
          {ecoTips.map((_, i) => (
            <button key={i} aria-label={`Dica ${i + 1}`} onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "w-6 bg-leaf" : "w-1.5 bg-forest-foreground/25"}`} />
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="ghostLight" className="flex-1" onClick={onDone}>Pular</Button>
          <Button variant="leaf" className="flex-[2]" onClick={() => (last ? onDone() : setStep(step + 1))}>
            {last ? "Explorar" : "Próxima dica"}
          </Button>
        </div>
      </div>
    </div>
  );
}
