import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Compass, Eye, EyeOff, LayoutDashboard, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderIcon } from "@/components/ProviderIcon";
import { usePreferenceStore } from "@/components/PreferencesProvider";
import { demoDestination, type DemoProfile } from "@/lib/demo-entry";
import logo from "@/assets/logo-transparent.png";

export function EntryScreen({ registration = false }: { registration?: boolean }) {
  const navigate = useNavigate();
  const { preferences, ready } = usePreferenceStore();
  const [profile, setProfile] = useState<DemoProfile>("turista");
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [opening, setOpening] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (opening) return;
    if (registration) {
      setNotice("Cadastro não concluído: nesta demonstração, os dados não são salvos e nenhuma conta é criada.");
      return;
    }
    if (profile === "turista" && !ready) return;
    // Tourists answer the preferences onboarding only once, always after login.
    setOpening(true);
    try {
      await navigate({ to: profile === "turista" && !preferences ? "/onboarding" : demoDestination(profile) });
    } catch {
      setOpening(false);
      setNotice("Não foi possível abrir a próxima tela. Confira sua conexão e tente novamente.");
    }
  }
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-forest lg:h-dvh lg:min-h-0 lg:flex-row lg:overflow-hidden lg:bg-login-paper">
      <aside className="relative flex h-[14.5rem] shrink-0 flex-col items-center bg-forest px-6 pt-5 text-center text-forest-foreground sm:h-[15.5rem] lg:h-dvh lg:w-1/2 lg:justify-start lg:px-12 lg:pt-14">
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
          <Link to="/" aria-label="EcoTravel início" className="lg:order-none"><img src={logo} alt="EcoTravel" width={1592} height={857} className="h-20 w-auto max-w-[78vw] object-contain drop-shadow-lg sm:h-24 lg:h-36" /></Link>
          <h2 className="mt-2 max-w-md font-display text-xl font-semibold leading-tight lg:mt-8 lg:text-3xl">Bem-vindo ao EcoTravel</h2>
          <p className="mt-2 hidden max-w-md px-2 font-display text-lg font-semibold leading-relaxed lg:mt-3 lg:block">Um jeito mais consciente de viajar</p>
          <p className="mt-1 hidden max-w-md text-base text-forest-foreground/75 lg:block">Conecte-se com a natureza. Viaje com um propósito.</p>
          <p className="mt-1 max-w-md px-2 text-[11px] leading-relaxed text-forest-foreground/75 sm:text-xs lg:hidden">Conecte-se com a natureza. Viaje com propósito. Escolha uma opção para continuar:</p>
        </div>
      </aside>
      <main className="relative z-10 -mt-4 flex flex-1 flex-col rounded-t-[1.75rem] bg-login-paper px-5 pb-5 pt-4 shadow-float sm:px-7 lg:m-0 lg:h-dvh lg:w-1/2 lg:flex-none lg:items-center lg:justify-center lg:rounded-none lg:px-10 lg:py-6 lg:shadow-none">
        <div className="mx-auto w-full max-w-[440px]">
        {registration && <h1 className="mb-2 text-center text-lg font-semibold leading-tight tracking-normal lg:hidden">Crie sua conta EcoTravel</h1>}
        <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted-foreground lg:text-xs"><LockKeyhole className="h-3 w-3" /> Demonstração · sem autenticação real</p>
        <Tabs value={profile} onValueChange={(value) => { if (value === "turista" || value === "gestor") setProfile(value); }} className="mt-3 lg:mt-4">
          <TabsList aria-label="Escolha seu perfil" className="grid h-9 w-full grid-cols-2 rounded-full bg-muted p-1 lg:h-12">
            <TabsTrigger value="turista" className="h-7 gap-1.5 rounded-full text-xs data-[state=active]:bg-forest data-[state=active]:text-forest-foreground lg:h-10 lg:text-sm"><Compass className="h-3.5 w-3.5" />Sou Turista</TabsTrigger>
            <TabsTrigger value="gestor" className="h-7 gap-1.5 rounded-full text-xs data-[state=active]:bg-forest data-[state=active]:text-forest-foreground lg:h-10 lg:text-sm"><LayoutDashboard className="h-3.5 w-3.5" />Sou Gestor</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-2 grid grid-cols-2 gap-2 lg:mt-5 lg:gap-3">
          {(["google", "microsoft"] as const).map((provider) => (
            <Button key={provider} type="button" variant="outline" className="h-9 w-full rounded-full bg-card px-2 text-[11px] shadow-none lg:h-12 lg:text-sm" onClick={() => setNotice(`A conexão com ${provider === "google" ? "Google" : "Microsoft"} ainda não está ativa. Use Entrar para visualizar o perfil escolhido.`)}>
              <ProviderIcon provider={provider} /><span className="truncate">Continuar com {provider === "google" ? "Google" : "Microsoft"}</span>
            </Button>
          ))}
        </div>
        <div className="my-2 flex items-center gap-2 lg:my-6 lg:gap-3"><span className="h-px flex-1 bg-border" /><span className="text-[11px] text-muted-foreground lg:text-xs">ou use seu e-mail</span><span className="h-px flex-1 bg-border" /></div>
        <form noValidate onSubmit={submit} className="space-y-2 lg:space-y-4">
          {registration && <div><label htmlFor="name" className="mb-0.5 block text-xs font-medium lg:mb-2 lg:text-sm">Nome</label><div className="relative"><UserRound className="pointer-events-none absolute left-4 top-2.5 h-4 w-4 text-muted-foreground lg:top-4" /><Input id="name" autoComplete="off" placeholder="Seu nome" className="h-9 rounded-2xl bg-card pl-11 shadow-none lg:h-12" /></div></div>}
          <div><label htmlFor="email" className="mb-0.5 block text-xs font-medium lg:mb-2 lg:text-sm">E-mail</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-2.5 h-4 w-4 text-muted-foreground lg:top-4" /><Input id="email" type="email" autoComplete="off" placeholder="seuemail@exemplo.com" className="h-9 rounded-2xl bg-card pl-11 shadow-none lg:h-12" /></div></div>
          <div><label htmlFor="password" className="mb-0.5 block text-xs font-medium lg:mb-2 lg:text-sm">Senha</label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-2.5 h-4 w-4 text-muted-foreground lg:top-4" /><Input id="password" type={visible ? "text" : "password"} autoComplete="off" placeholder="Sua senha" className="h-9 rounded-2xl bg-card pl-11 pr-12 shadow-none lg:h-12" /><Button type="button" variant="ghost" size="icon" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} onClick={() => setVisible(!visible)} className="absolute right-2 top-0.5 rounded-full text-muted-foreground lg:top-1.5">{visible ? <EyeOff /> : <Eye />}</Button></div></div>
          {notice && <p role="status" className="rounded-lg bg-accent p-2 text-xs leading-relaxed text-accent-foreground lg:p-3 lg:text-sm">{notice}</p>}
          <Button type="submit" variant="leaf" disabled={opening || (!registration && profile === "turista" && !ready)} className="mt-1 h-9 w-full lg:mt-2 lg:h-12">{opening ? "Abrindo…" : registration ? "Cadastrar nova conta" : "Entrar"}<ArrowRight /></Button>
        </form>
        <div className="mt-1 text-center lg:mt-4"><Button variant="link" asChild className="h-7 text-xs text-foreground lg:h-10 lg:text-sm"><Link to={registration ? "/" : "/cadastro"}>{registration ? "Já tenho conta · Entrar" : "Ainda não tem conta? Criar conta"}</Link></Button></div>
        </div>
      </main>
    </div>
  );
}
