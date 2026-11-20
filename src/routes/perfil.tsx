import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bell, Bot, Camera, ChevronRight, Download, Eye, MapPin, Shield, Trash2, WifiOff } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AccessibilityControls } from "@/components/AccessibilityControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { destinations } from "@/lib/data";
import { clearDemoBrowserData } from "@/lib/demo-entry";
import avatar from "@/assets/bot-happy.png";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [
    { title: "Perfil" }, { name: "description", content: "Perfil demonstrativo, acessibilidade e preferências do EcoTravel." },
    { property: "og:title", content: "Perfil — EcoTravel" }, { property: "og:description", content: "Perfil demonstrativo e preferências de acessibilidade do EcoTravel." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: Perfil,
});

function Perfil() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [photo, setPhoto] = useState("");
  const [reminders, setReminders] = useState(false);
  const [location, setLocation] = useState(false);
  const [offline, setOffline] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [notice, setNotice] = useState("");
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);
  function downloadGuide() {
    const content = `EcoTravel — guia textual para consulta offline\nSem mapas de navegação. Percursos e imagens ilustrativos; confirme condições de acesso.\n\n${destinations.map((d) => `${d.circuit.title}\n${d.region}\n${d.summary}\n${d.attractions.map((a) => `${a.name}: ${a.desc}`).join("\n")}\n`).join("\n")}`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "ecotravel-roteiros-offline.txt"; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Download do guia textual iniciado. Mapas e navegação offline ainda não estão disponíveis.");
  }
  return <AppShell title="Perfil">
    <section className="mx-auto max-w-3xl px-5 pt-7 lg:pt-10">
      <p className="text-xs font-medium uppercase text-primary">Seu EcoTravel</p><h1 className="mt-1 text-3xl font-semibold">Perfil</h1>
      <div className="mt-7 flex flex-col items-center"><div className="relative"><img src={photo || avatar} alt="Foto do perfil" className="h-24 w-24 rounded-full border-2 border-leaf bg-accent object-contain" /><Button variant="forest" size="icon" className="absolute -bottom-1 -right-1 h-9 w-9" onClick={() => file.current?.click()} aria-label="Alterar foto de perfil"><Camera /></Button></div><p className="mt-3 font-semibold">{nickname || "Turista consciente"}</p><p className="mt-1 text-xs text-muted-foreground">Perfil demonstrativo · dados não são salvos nem enviados</p></div>
      <input ref={file} type="file" accept="image/*" className="hidden" aria-label="Escolher foto de perfil" onChange={(event) => { const image = event.target.files?.[0]; if (!image) return; if (!image.type.startsWith("image/") || image.size > 5 * 1024 * 1024) { setNotice("Escolha uma imagem de até 5 MB."); return; } setPhoto(URL.createObjectURL(image)); }} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium" htmlFor="full-name"><span>Nome Completo</span><Input id="full-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" placeholder="Seu nome" /></label><label className="space-y-2 text-sm font-medium" htmlFor="nickname"><span>Apelido</span><Input id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} autoComplete="off" placeholder="Como prefere ser chamado(a)?" /></label></div>
      <SettingsSection title="Acessibilidade" icon={<Eye />}>
        <AccessibilityControls scope="tourist" />
      </SettingsSection>
      <SettingsSection title="Notificações e alertas" icon={<Bell />}><SettingRow id="reminders" label="Lembretes de Viagens" description="Demonstração: não agenda viagens nem envia notificações." checked={reminders} onChange={setReminders} /></SettingsSection>
      <SettingsSection title="Privacidade e localização" icon={<Shield />}>
        <SettingRow id="location" label="Rastreamento automático de rotas" description="Simulação apenas. Nenhuma localização é solicitada, rastreada ou armazenada." checked={location} onChange={setLocation} />
        <p className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-4 w-4" />Histórico de geolocalização: vazio</p>
        <div><Button variant="outline" className="h-auto whitespace-normal text-destructive" onClick={() => { setConfirmation(""); setConfirm(true); }}><Trash2 />Apagar dados salvos</Button></div>
      </SettingsSection>
      <SettingsSection title="Utilitários e mapas offline" icon={<WifiOff />}>
        <SettingRow id="offline" label="Modo Offline para Trilhas" description="Demonstração do modo offline. Baixe o guia textual; mapas offline não estão disponíveis." checked={offline} onChange={setOffline} />
        <div><Button variant="outline" className="h-auto whitespace-normal" disabled={!offline} onClick={downloadGuide}><Download />Baixar roteiros para consulta offline</Button></div>
      </SettingsSection>
      <SettingsSection title="Suporte e central de ajuda" icon={<Bot />}>
        <Button asChild variant="ghost" className="h-auto w-full justify-between rounded-none px-0 hover:bg-transparent"><Link to="/ecobot">Conversar com o EcoBot<ChevronRight /></Link></Button>
        <Button asChild variant="ghost" className="h-auto w-full justify-between rounded-none px-0 hover:bg-transparent"><Link to="/termos">Termos de Uso<ChevronRight /></Link></Button>
        <Button asChild variant="ghost" className="h-auto w-full justify-between rounded-none px-0 hover:bg-transparent"><Link to="/privacidade">Política de Privacidade<ChevronRight /></Link></Button>
      </SettingsSection>
      {notice && <p role="status" className="mt-5 rounded-lg bg-accent p-4 text-sm">{notice}</p>}
    </section>
    <Dialog open={confirm} onOpenChange={setConfirm}><DialogContent className="w-[calc(100%-2rem)] rounded-lg"><DialogTitle>Apagar dados salvos e voltar ao login?</DialogTitle><DialogDescription>Ao confirmar, o EcoTravel remove deste navegador as preferências de acessibilidade e onboarding, as dicas já exibidas, os créditos demonstrativos e o estado de navegação. Isso não apaga o histórico geral do navegador nem dados de outros sites; esta demonstração não possui conta real.</DialogDescription><label htmlFor="delete-confirm" className="text-sm">Digite EXCLUIR para confirmar</label><Input id="delete-confirm" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" /><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setConfirm(false)}>Cancelar</Button><Button variant="destructive" disabled={confirmation !== "EXCLUIR"} onClick={() => { clearDemoBrowserData(); window.location.replace("/"); }}>Apagar dados e ir ao login</Button></div></DialogContent></Dialog>
  </AppShell>;
}
function SettingsSection({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="mt-8"><h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">{icon}{title}</h2><div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card px-4 [&>*]:py-4">{children}</div></section>;
}
function SettingRow({ id, label, description, checked, onChange }: { id: string; label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4"><label htmlFor={id} className="min-w-0 flex-1 cursor-pointer"><span className="block text-sm font-medium">{label}</span><span id={`${id}-description`} className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span></label><Switch id={id} aria-label={label} checked={checked} onCheckedChange={onChange} aria-describedby={`${id}-description`} className="shrink-0" /></div>;
}