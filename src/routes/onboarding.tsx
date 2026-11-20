import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Leaf, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePreferenceStore } from '@/components/PreferencesProvider';
import { impacts, modes, styles, type Preferences } from '@/lib/preferences-model';
import logo from '@/assets/logo.png';
import botWave from '@/assets/bot-wave.png';
import botHappy from '@/assets/bot-happy.png';
import botWink from '@/assets/bot-wink.png';
import botJoy from '@/assets/bot-joy.png';

export const Route = createFileRoute('/onboarding')({
  head: () => ({ meta: [
    { title: 'Preferências' },
    { name: 'description', content: 'Conte ao EcoTravel seu estilo de ecoturismo, transporte e foco de impacto para personalizar roteiros.' },
    { property: 'og:title', content: 'Suas preferências — EcoTravel' },
    { property: 'og:description', content: 'Personalize seus roteiros sustentáveis em quatro passos.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const { save } = usePreferenceStore();
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState(false);
  const [style, setStyle] = useState<Preferences['style'] | null>(null);
  const [mode, setMode] = useState<Preferences['mode'] | null>(null);
  const [impact, setImpact] = useState<Preferences['impact'] | null>(null);
  const steps = [
    { bot: botWave, title: 'Localização para roteiros próximos', done: true },
    { bot: botHappy, title: 'Qual o seu estilo principal de ecoturismo?', options: styles, value: style, set: setStyle, done: !!style },
    { bot: botWink, title: 'Qual transporte você costuma usar nas suas viagens?', options: modes, value: mode, set: setMode, done: !!mode },
    { bot: botJoy, title: 'Qual o seu foco de impacto ambiental?', options: impacts, value: impact, set: setImpact, done: !!impact },
  ] as const;
  const current = steps[step] ?? steps[0];
  const last = step === steps.length - 1;
  function next() {
    if (!last) return setStep(step + 1);
    if (!style || !mode || !impact) return;
    save({ style, mode, impact, simulatedLocation: location });
    void navigate({ to: '/descobrir' });
  }
  return (
    <div className="flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-forest/95">
      <header className="flex h-12 shrink-0 items-center justify-center"><img src={logo} alt="EcoTravel" width={600} height={338} className="h-10 w-auto object-contain" /></header>
      <main className="flex min-h-0 flex-1 items-center justify-center p-2">
        <div className="w-full max-w-md rounded-[1.5rem] bg-forest p-4 text-forest-foreground shadow-float sm:p-5">
          <div className="mb-3 flex gap-1.5" aria-label={`Passo ${step + 1} de ${steps.length}`}>
            {steps.map((_, i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-150 ${i <= step ? 'bg-leaf' : 'bg-forest-foreground/20'}`} />)}
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={current.bot} alt="EcoBot" className="h-16 w-auto object-contain animate-mascot-float" />
          </div>
          <div>
            <div className="flex flex-col items-center text-center">
              <span className="mt-2 rounded-full bg-leaf px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-leaf-foreground">Passo {step + 1} de {steps.length}</span>
              <h1 className="mt-2 text-lg font-semibold leading-tight">{current.title}</h1>
            </div>
            <div className="mt-3 grid gap-1.5">
              {step === 0 ? <>
                <Button variant={location ? 'leaf' : 'ghostLight'} aria-pressed={location} onClick={() => setLocation(!location)} className="h-auto min-h-10 whitespace-normal border border-forest-foreground/25"><MapPin />{location ? 'Localização simulada ativada' : 'Ativar localização em tempo real'}{location && <Check />}</Button>
                <p className="text-center text-[11px] leading-snug text-forest-foreground/70">Simulação com origem em São Paulo capital. Nenhuma localização real é solicitada ou guardada.</p>
              </> : 'options' in current && current.options.map((option) => {
                const selected = current.value === option;
                return <Button key={option} variant={selected ? 'leaf' : 'ghostLight'} aria-pressed={selected} onClick={() => (current.set as (v: string) => void)(option)} className="h-auto min-h-10 justify-between whitespace-normal border border-forest-foreground/25 px-4 py-2 text-left">{option}{selected && <Check className="shrink-0" />}</Button>;
              })}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="ghostLight" className="flex-1" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft />Voltar</Button>
            <Button variant="leaf" className="flex-[2]" disabled={!current.done} onClick={next}>{last ? <>Salvar preferências<Leaf /></> : <>Próximo<ArrowRight /></>}</Button>
          </div>
          <p className="mt-3 text-center text-[10px] leading-snug text-forest-foreground/60">Recomendações demonstrativas por afinidade, sem IA conectada. Preferências anônimas ficam neste navegador.</p>
        </div>
      </main>
    </div>
  );
}
