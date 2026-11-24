import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
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
  const [error, setError] = useState("");

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
    } catch {
      setError("Não foi possível iniciar a instalação. Tente novamente pelo menu do navegador.");
    }
  }

  if (!isMobile || isInstalled || dismissed || (!isIos && !deferredPrompt)) return null;

  return (
    <aside className="relative mb-3 rounded-2xl border border-forest/15 bg-[#fff9f3] p-3 text-forest shadow-sm">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Fechar aviso de instalação"
        onClick={() => setDismissed(true)}
        className="absolute right-1 top-1 h-8 w-8 rounded-full text-forest/70 hover:bg-forest/10 hover:text-forest"
      >
        <X className="h-4 w-4" />
      </Button>
      {isIos ? (
        <p className="flex items-start gap-2 pr-7 text-sm leading-relaxed">
          <Share className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Instale o EcoTravel: toque em <strong>Compartilhar</strong> e depois em{" "}
            <strong>Adicionar à Tela de Início</strong>.
          </span>
        </p>
      ) : (
        <>
          <p className="mb-2 pr-7 text-sm font-medium">Tenha o EcoTravel sempre à mão</p>
          <Button
            type="button"
            variant="leaf"
            onClick={installApp}
            className="h-10 w-full rounded-full text-sm"
          >
            <Download className="h-4 w-4" />
            Instalar app EcoTravel
          </Button>
          {error && (
            <p role="status" className="mt-2 text-xs leading-relaxed">
              {error}
            </p>
          )}
        </>
      )}
    </aside>
  );
}
