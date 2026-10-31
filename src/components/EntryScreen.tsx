import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Compass, Eye, EyeOff, LayoutDashboard, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderIcon } from "@/components/ProviderIcon";
import { demoDestination, type DemoProfile } from "@/lib/demo-entry";
import logo from "@/assets/logo.png";
import bot from "@/assets/bot-wave.png";

export function EntryScreen({ registration = false }: { registration?: boolean }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<DemoProfile>("turista");
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (registration) {
      setNotice("Cadastro não concluído: nesta demonstração, os dados não são salvos e nenhuma conta é criada.");
      return;
    }
    void navigate({ to: demoDestination(profile) });
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-24 items-center justify-center bg-forest sm:h-28">
        <Link to="/" aria-label="EcoTravel início"><img src={logo} alt="EcoTravel" width={600} height={338} className="h-20 w-auto object-contain" /></Link>
      </header>
      <main className="mx-auto w-full max-w-[440px] px-6 pb-8 pt-5 sm:max-w-[480px] sm:pt-7">
        <div className="text-center">
          <img src={bot} alt="EcoBot dando boas-vindas" width={640} height={640} className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28" />
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-normal">{registration ? "Crie sua conta EcoTravel" : "Bem-vindo ao turismo sustentável inteligente!"}</h1>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5" /> Demonstração · sem autenticação real</span>
        </div>
        <Tabs value={profile} onValueChange={(value) => { if (value === "turista" || value === "gestor") setProfile(value); }} className="mt-6">
          <TabsList aria-label="Escolha seu perfil" className="grid h-12 w-full grid-cols-2 rounded-full bg-muted p-1">
            <TabsTrigger value="turista" className="h-10 gap-2 rounded-full data-[state=active]:bg-forest data-[state=active]:text-forest-foreground"><Compass className="h-4 w-4" />Sou Turista</TabsTrigger>
            <TabsTrigger value="gestor" className="h-10 gap-2 rounded-full data-[state=active]:bg-forest data-[state=active]:text-forest-foreground"><LayoutDashboard className="h-4 w-4" />Sou Gestor</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-5 grid gap-3">
          {(["google", "microsoft"] as const).map((provider) => (
            <Button key={provider} type="button" variant="outline" className="h-12 w-full rounded-full bg-card shadow-none" onClick={() => setNotice(`A conexão com ${provider === "google" ? "Google" : "Microsoft"} ainda não está ativa. Use Entrar para visualizar o perfil escolhido.`)}>
              <ProviderIcon provider={provider} />Continuar com {provider === "google" ? "Google" : "Microsoft"}
            </Button>
          ))}
        </div>
        <div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="text-xs text-muted-foreground">ou use seu e-mail</span><span className="h-px flex-1 bg-border" /></div>
        <form onSubmit={submit} className="space-y-4">
          {registration && <div><label htmlFor="name" className="mb-2 block text-sm font-medium">Nome</label><div className="relative"><UserRound className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-foreground" /><Input id="name" autoComplete="off" placeholder="Seu nome" className="h-12 rounded-2xl bg-card pl-11 shadow-none" /></div></div>}
          <div><label htmlFor="email" className="mb-2 block text-sm font-medium">E-mail</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-foreground" /><Input id="email" type="email" autoComplete="off" placeholder="seuemail@exemplo.com" className="h-12 rounded-2xl bg-card pl-11 shadow-none" /></div></div>
          <div><label htmlFor="password" className="mb-2 block text-sm font-medium">Senha</label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-foreground" /><Input id="password" type={visible ? "text" : "password"} autoComplete="off" placeholder="Sua senha" className="h-12 rounded-2xl bg-card pl-11 pr-12 shadow-none" /><Button type="button" variant="ghost" size="icon" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} title={visible ? "Ocultar senha" : "Mostrar senha"} onClick={() => setVisible(!visible)} className="absolute right-2 top-1.5 rounded-full text-muted-foreground">{visible ? <EyeOff /> : <Eye />}</Button></div></div>
          {notice && <p role="status" className="rounded-lg bg-accent p-3 text-sm leading-relaxed text-accent-foreground">{notice}</p>}
          <Button type="submit" variant="leaf" className="mt-1 w-full">{registration ? "Cadastrar nova conta" : "Entrar"}<ArrowRight /></Button>
        </form>
        <div className="mt-4 text-center"><Button variant="link" asChild className="text-foreground"><Link to={registration ? "/" : "/cadastro"}>{registration ? "Voltar para entrar" : "Cadastrar nova conta"}</Link></Button></div>
      </main>
    </div>
  );
}