import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstallPrompt() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const standaloneDisplay = window.matchMedia("(display-mode: standalone)");
    const updateMobile = () => {
      const isAppleMobile =
        /iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      setIsIos(isAppleMobile);
      setIsMobile(
        mobileViewport.matches ||
          /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
      );
    };
    const updateInstalled = () => {
      const isIosStandalone =
        "standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true;
      setIsInstalled(standaloneDisplay.matches || isIosStandalone);
    };
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      toast.success("EcoTravel instalado com sucesso!");
    };

    updateMobile();
    updateInstalled();
    mobileViewport.addEventListener("change", updateMobile);
    standaloneDisplay.addEventListener("change", updateInstalled);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      mobileViewport.removeEventListener("change", updateMobile);
      standaloneDisplay.removeEventListener("change", updateInstalled);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function installApp() {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Falha ao iniciar a instalação do EcoTravel.", error);
      setDeferredPrompt(null);
    }
  }

  if (!isMobile || isInstalled || dismissed) return null;

  return (
    <aside className="relative mt-3 rounded-2xl border border-[#003f38]/15 bg-[#fff9f3] p-3 text-[#003f38] shadow-sm md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Fechar aviso de instalação"
        onClick={() => setDismissed(true)}
        className="absolute right-1 top-1 h-8 w-8 rounded-full text-[#003f38]/70 hover:bg-[#003f38]/10 hover:text-[#003f38]"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-3 pr-7">
        <div className="flex shrink-0 flex-col items-center">
          <img
            src="/icons/icon-192.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl"
          />
          <span className="mt-1 text-xs font-semibold">EcoTravel</span>
        </div>
        <p className="min-w-0 text-sm leading-relaxed">Mais praticidade no seu dia a dia.</p>
      </div>
      <Button
        type="button"
        variant="leaf"
        onClick={installApp}
        className="mt-3 h-10 w-full rounded-full bg-[#5f9b5f] text-sm text-white hover:bg-[#518851]"
      >
        <Download className="h-4 w-4" />
        Instalar aplicativo
      </Button>
      {isIos && (
        <p className="mt-2 text-xs leading-relaxed text-[#003f38]/75">
          No Safari, toque em Compartilhar e depois em Adicionar à Tela de Início.
        </p>
      )}
    </aside>
  );
}
