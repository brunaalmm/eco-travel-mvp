import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Compass, Eye, EyeOff, LayoutDashboard, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderIcon } from "@/components/ProviderIcon";
import { usePreferenceStore } from "@/components/PreferencesProvider";
import { demoDestination, type DemoProfile } from "@/lib/demo-entry";
import logo from "@/assets/logo-transparent.png";
import icon from "@/assets/app-icon.png";

export function EntryScreen({ registration = false }: { registration?: boolean }) {
  const navigate = useNavigate();
  const { preferences, ready } = usePreferenceStore();
  const [splash, setSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [profile, setProfile] = useState<DemoProfile>("turista");
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setSplashFading(true), 1700);
    const hideTimer = window.setTimeout(() => setSplash(false), 2000);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

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
    <div className="relative flex h-dvh min-h-dvh flex-col overflow-hidden bg-forest md:h-auto md:min-h-screen md:flex-row md:overflow-visible md:bg-login-paper">
      {splash && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-forest transition-opacity duration-300 md:hidden ${splashFading ? "opacity-0" : "opacity-100"}`}>
          <img src={icon} alt="EcoTravel" className="h-32 w-32 animate-float rounded-[2rem] shadow-float" />
          <p className="font-display text-sm tracking-[0.3em] text-primary-foreground/70">ECOTRAVEL</p>
        </div>
      )}
      <aside className="relative flex h-[14.5rem] shrink-0 flex-col items-center justify-center bg-forest px-5 pb-3 pt-5 text-center text-forest-foreground md:h-auto md:min-h-screen md:w-1/2 md:justify-center md:px-12 md:pb-12 md:pt-14">
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
          <Link to="/" aria-label="EcoTravel início" className="md:order-none"><img src={logo} alt="EcoTravel" width={1592} height={857} className="h-20 w-auto max-w-[78vw] object-contain drop-shadow-lg md:h-36" /></Link>
          <h2 className="mt-2 max-w-md text-center font-display text-2xl font-semibold leading-tight md:mt-8 md:text-3xl">Bem-vindo ao EcoTravel</h2>
          <p className="mt-2 hidden max-w-md px-2 text-center font-display text-lg font-semibold leading-relaxed md:mt-3 md:block">Um jeito mais consciente de viajar</p>
          <p className="mt-1 hidden max-w-md text-center text-base text-forest-foreground/75 md:block">Conecte-se com a natureza. Viaje com um propósito.</p>
          <p className="mt-1 max-w-md px-2 text-center text-sm leading-relaxed text-forest-foreground/75 md:hidden">Conecte-se com a natureza. Viaje com propósito. Escolha uma opção para continuar:</p>
        </div>
      </aside>
      <main className="relative z-10 mx-4 mb-4 flex flex-1 flex-col overflow-hidden rounded-3xl bg-login-paper p-5 shadow-float md:m-0 md:min-h-screen md:w-1/2 md:flex md:flex-none md:flex-col md:items-center md:justify-center md:overflow-y-auto md:rounded-none md:px-10 md:py-8 md:shadow-none">
        <div className="mx-auto flex h-full w-full max-w-[440px] flex-col justify-between md:my-auto md:h-auto md:w-full md:max-w-[460px] md:justify-center md:space-y-4">
        {registration && <h1 className="mb-2 text-center text-xl font-semibold leading-tight tracking-normal md:hidden">Crie sua conta EcoTravel</h1>}
        <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground md:mt-0 lg:text-xs"><LockKeyhole className="h-3 w-3" /> Demonstração · sem autenticação real</p>
        <Tabs value={profile} onValueChange={(value) => { if (value === "turista" || value === "gestor") setProfile(value); }} className="mt-3 md:mt-0">
          <TabsList aria-label="Escolha seu perfil" className="grid h-11 w-full grid-cols-2 rounded-full bg-muted p-1 lg:h-12">
            <TabsTrigger value="turista" className="h-9 gap-1.5 rounded-full text-sm data-[state=active]:bg-forest data-[state=active]:text-forest-foreground lg:h-10 lg:text-sm"><Compass className="h-4 w-4" />Sou Turista</TabsTrigger>
            <TabsTrigger value="gestor" className="h-9 gap-1.5 rounded-full text-sm data-[state=active]:bg-forest data-[state=active]:text-forest-foreground lg:h-10 lg:text-sm"><LayoutDashboard className="h-4 w-4" />Sou Gestor</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-2.5 flex w-full flex-col gap-2.5 md:mt-0 lg:grid lg:grid-cols-2 lg:gap-3">
          {(["google", "microsoft"] as const).map((provider) => (
            <Button key={provider} type="button" variant="outline" className="h-10 w-full rounded-full bg-card px-3 text-sm shadow-none lg:h-12 lg:text-sm" onClick={() => setNotice(`A conexão com ${provider === "google" ? "Google" : "Microsoft"} ainda não está ativa. Use Entrar para visualizar o perfil escolhido.`)}>
              <ProviderIcon provider={provider} /><span className="lg:whitespace-nowrap">Continuar com {provider === "google" ? "Google" : "Microsoft"}</span>
            </Button>
          ))}
        </div>
        <div className="my-2.5 flex items-center gap-2 md:my-0"><span className="h-px flex-1 bg-border" /><span className="text-xs text-muted-foreground lg:text-xs">ou use seu e-mail</span><span className="h-px flex-1 bg-border" /></div>
        <form noValidate onSubmit={submit} className="space-y-2.5 lg:space-y-4">
          {registration && <div><label htmlFor="name" className="mb-1 block text-sm font-medium lg:mb-2 lg:text-sm">Nome</label><div className="relative"><UserRound className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-muted-foreground lg:top-4" /><Input id="name" autoComplete="off" placeholder="Seu nome" className="h-10 rounded-2xl bg-card pl-11 text-sm shadow-none lg:h-12" /></div></div>}
          <div><label htmlFor="email" className="mb-1 block text-sm font-medium lg:mb-2 lg:text-sm">E-mail</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-muted-foreground lg:top-4" /><Input id="email" type="email" autoComplete="off" placeholder="seuemail@exemplo.com" className="h-10 rounded-2xl bg-card pl-11 text-sm shadow-none lg:h-12" /></div></div>
          <div><label htmlFor="password" className="mb-1 block text-sm font-medium lg:mb-2 lg:text-sm">Senha</label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-muted-foreground lg:top-4" /><Input id="password" type={visible ? "text" : "password"} autoComplete="off" placeholder="Sua senha" className="h-10 rounded-2xl bg-card pl-11 pr-12 text-sm shadow-none lg:h-12" /><Button type="button" variant="ghost" size="icon" aria-label={visible ? "Ocultar senha" : "Mostrar senha"} onClick={() => setVisible(!visible)} className="absolute right-2 top-1 rounded-full text-muted-foreground lg:top-1.5">{visible ? <EyeOff /> : <Eye />}</Button></div></div>
          {notice && <p role="status" className="rounded-lg bg-accent p-2 text-xs leading-relaxed text-accent-foreground lg:p-3 lg:text-sm">{notice}</p>}
          <Button type="submit" variant="leaf" disabled={opening || (!registration && profile === "turista" && !ready)} className="mt-1 h-10 w-full text-base md:mt-0 lg:h-12 lg:text-sm">{opening ? "Abrindo…" : registration ? "Cadastrar nova conta" : "Entrar"}<ArrowRight /></Button>
        </form>
        <div className="mt-1 text-center md:mt-0"><Button variant="link" asChild className="h-8 text-sm text-foreground lg:h-10 lg:text-sm"><Link to={registration ? "/" : "/cadastro"}>{registration ? "Já tenho conta · Entrar" : "Ainda não tem conta? Criar conta"}</Link></Button></div>
        </div>
      </main>
    </div>
  );
}
