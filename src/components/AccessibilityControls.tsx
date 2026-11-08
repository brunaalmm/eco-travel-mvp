import { Type } from "lucide-react";
import { useAccessibility, type AccessibilityScope } from "@/components/AccessibilityProvider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function AccessibilityControls({ scope }: { scope: AccessibilityScope }) {
  const settings = useAccessibility(scope);
  return (
    <>
      <SettingRow id="contrast" label="Alto Contraste" description="Cores com maior contraste para leitura." checked={settings.contrast} onChange={settings.setContrast} />
      <SettingRow id="font" label="Aumento de Fonte / Leitores de Tela" description="Texto ampliado com controles identificados para leitores de tela." checked={settings.fontLevel > 0} onChange={(value) => settings.setFontLevel(value ? 1 : 0)} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 text-sm"><Type className="h-4 w-4" />Tamanho do texto</span>
        <div role="group" aria-label="Nível de aumento de fonte" className="grid w-full max-w-64 grid-cols-4 gap-2 sm:w-auto">
          {[0, 1, 2, 3].map((level) => <Button key={level} variant={settings.fontLevel === level ? "default" : "outline"} aria-pressed={settings.fontLevel === level} aria-label={level ? `Aumento de fonte nível ${level}` : "Fonte padrão"} onClick={() => settings.setFontLevel(level)} className="min-w-0 px-2">{level === 0 ? "A" : `A+${level}`}</Button>)}
        </div>
      </div>
      <SettingRow id="dark" label="Modo Claro / Escuro" description={settings.dark ? "Modo escuro ativado." : "Modo claro ativado."} checked={settings.dark} onChange={settings.setDark} />
    </>
  );
}

function SettingRow({ id, label, description, checked, onChange }: { id: string; label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
        <span className="block text-sm font-medium">{label}</span>
        <span id={`${id}-description`} className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>
      </label>
      <Switch id={id} aria-label={label} checked={checked} onCheckedChange={onChange} aria-describedby={`${id}-description`} className="shrink-0" />
    </div>
  );
}