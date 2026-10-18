import { useState } from "react";
import icon from "@/assets/app-icon.png";
import botHappy from "@/assets/bot-happy.png";
import botWink from "@/assets/bot-wink.png";
import botWave from "@/assets/bot-wave.png";
import botJoy from "@/assets/bot-joy.png";
import botRight from "@/assets/bot-right.png";
import { ecoTips } from "@/lib/data";
import { Button } from "@/components/ui/button";

const bots = [botWave, botHappy, botWink, botRight, botJoy];

export function Splash({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(-1);
  const tip = ecoTips[step];
  const last = step === ecoTips.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-sand">
      <div className="relative flex w-full max-w-[440px] flex-col items-center bg-forest px-8 pb-10 pt-16 text-forest-foreground">
        {step === -1 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center animate-rise">
            <img src={icon} alt="EcoTravel" className="h-32 w-32 rounded-[2rem] shadow-float animate-float" width={256} height={256} />
            <h1 className="mt-8 text-3xl font-semibold">Olá, eu sou o EcoBot!</h1>
            <p className="mt-3 text-forest-foreground/75">
              Antes de explorar o litoral paulista, que tal 5 dicas rápidas para viajar com leveza?
            </p>
          </div>
        ) : (
          <div key={step} className="flex flex-1 flex-col items-center justify-center text-center animate-rise">
            <img src={bots[step]} alt="EcoBot" className="h-44 w-auto animate-float" />
            <span className="mt-8 rounded-full bg-leaf px-3 py-1 text-xs font-semibold uppercase tracking-wider text-leaf-foreground">
              Dica {step + 1} de {ecoTips.length}
            </span>
            <h2 className="mt-4 text-2xl font-semibold">{tip?.title}</h2>
            <p className="mt-2 text-forest-foreground/75">{tip?.text}</p>
          </div>
        )}
        <div className="mb-6 flex gap-1.5">
          {ecoTips.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? "w-6 bg-leaf" : "w-1.5 bg-forest-foreground/25"}`} />
          ))}
        </div>
        <div className="flex w-full gap-3">
          <Button variant="ghostLight" className="flex-1" onClick={onDone}>Pular</Button>
          <Button variant="leaf" className="flex-[2]" onClick={() => (last ? onDone() : setStep(step + 1))}>
            {step === -1 ? "Começar" : last ? "Explorar o litoral" : "Próxima dica"}
          </Button>
        </div>
      </div>
    </div>
  );
}
