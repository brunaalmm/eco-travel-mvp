import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { MapPin, Check, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import bot from '@/assets/bot-wave.png';
import { impacts, modes, styles, parsePreferences, preferenceKey, type Preferences } from './preferences-model';

const PreferencesContext = createContext<Preferences | null>(null);
export const usePreferences = () => useContext(PreferencesContext);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<Preferences | null>(null);
  const [style, setStyle] = useState<Preferences['style'] | null>(null);
  const [mode, setMode] = useState<Preferences['mode'] | null>(null);
  const [impact, setImpact] = useState<Preferences['impact'] | null>(null);
  const [location, setLocation] = useState(false);
  const [warning, setWarning] = useState('');
  useEffect(() => {
    try { setSaved(parsePreferences(localStorage.getItem(preferenceKey))); } catch { /* Storage may be blocked. */ }
    setReady(true);
  }, []);
  function save() {
    if (!style || !mode || !impact) return;
    const p = { style, mode, impact, simulatedLocation: location };
    try { localStorage.setItem(preferenceKey, JSON.stringify(p)); } catch { setWarning('Preferências disponíveis apenas nesta sessão: armazenamento do navegador indisponível.'); }
    setSaved(p);
  }
  if (saved) return <PreferencesContext.Provider value={saved}>{warning && <p role="status" className="bg-accent px-5 py-2 text-sm text-accent-foreground">{warning}</p>}{children}</PreferencesContext.Provider>;
  return <div className="min-h-screen bg-background text-foreground">
    <header className="bg-forest px-6 py-4"><img src={logo} alt="EcoTravel" className="mx-auto h-16 w-auto" /></header>
    <main className="mx-auto max-w-3xl px-5 py-8">
      {!ready ? <p role="status" className="text-center">Preparando suas preferências…</p> : <>
        <div className="flex items-center gap-4"><img src={bot} alt="EcoBot" className="h-24 w-24 object-contain" /><div><h1 className="text-2xl font-semibold">Seu jeito de explorar</h1><p className="mt-2 text-sm text-muted-foreground">Preferências de ecoturismo</p></div></div>
        <Button variant="outline" onClick={() => setLocation(!location)} aria-pressed={location} className="mt-6 h-auto min-h-12 w-full whitespace-normal"><MapPin />{location ? 'Localização simulada ativada' : 'Ativar localização em tempo real'}{location && <Check />}</Button>
        <p className="mt-2 text-xs text-muted-foreground">Simulação com origem em São Paulo capital. Nenhuma localização real é solicitada ou guardada.</p>
        <Choice title="Qual o seu estilo principal de ecoturismo?" options={styles} value={style} onChange={setStyle} />
        <Choice title="Qual o modal de transporte preferido?" options={modes} value={mode} onChange={setMode} />
        <Choice title="Qual o seu foco de impacto ambiental?" options={impacts} value={impact} onChange={setImpact} />
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Recomendações demonstrativas por afinidade, sem IA conectada. Preferências anônimas ficam neste navegador.</p>
        <Button variant="forest" disabled={!style || !mode || !impact} onClick={save} className="mt-4 h-auto min-h-12 w-full whitespace-normal py-3"><Leaf />Salvar Preferências e Gerar Roteiros com IA</Button>
      </>}
    </main>
  </div>;
}

function Choice<T extends string>({ title, options, value, onChange }: { title: string; options: readonly T[]; value: T | null; onChange: (value: T) => void }) {
  return <fieldset className="mt-7 border-t border-border pt-5"><legend className="text-base font-semibold">{title}</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{options.map(option => <Button key={option} variant={value === option ? 'forest' : 'outline'} aria-pressed={value === option} onClick={() => onChange(option)} className="h-auto min-h-12 whitespace-normal px-3 py-3">{option}{value === option && <Check className="shrink-0" />}</Button>)}</div></fieldset>;
}