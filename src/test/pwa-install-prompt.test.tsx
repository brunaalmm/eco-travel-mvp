import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

let standalone = false;
let mobileViewport = true;

describe("PWA install prompt", () => {
  beforeEach(() => {
    standalone = false;
    mobileViewport = true;
    vi.mocked(toast.success).mockClear();
    window.matchMedia = (query: string) =>
      ({
        matches:
          (query.includes("max-width") && mobileViewport) ||
          (query.includes("standalone") && standalone),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as MediaQueryList;
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (Android 13; Mobile)",
    });
    Object.defineProperty(navigator, "platform", { configurable: true, value: "Linux armv8l" });
    Object.defineProperty(navigator, "maxTouchPoints", { configurable: true, value: 0 });
  });

  it("opens the native Android prompt without showing installation status text", async () => {
    render(<PwaInstallPrompt />);
    const prompt = vi.fn().mockResolvedValue(undefined);
    const installEvent = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
      prompt,
      userChoice: Promise.resolve({ outcome: "accepted" as const, platform: "web" }),
    });

    act(() => {
      window.dispatchEvent(installEvent);
    });

    const installButton = await screen.findByRole("button", { name: "Instalar aplicativo" });
    expect(installEvent.defaultPrevented).toBe(true);
    fireEvent.click(installButton);
    await waitFor(() => expect(prompt).toHaveBeenCalledOnce());
    expect(screen.getByRole("button", { name: "Instalar aplicativo" })).toBeInTheDocument();
    expect(screen.queryByText(/Instalando|Atalho adicionado/)).toBeNull();
  });

  it("shows closable iOS instructions and remains idle without an automatic prompt", async () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    });
    render(<PwaInstallPrompt />);

    expect(await screen.findByText(/Mais praticidade no seu dia a dia/)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar à Tela de Início/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Instalar aplicativo" }));
    expect(screen.getByRole("button", { name: "Instalar aplicativo" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Fechar aviso de instalação" }));
    expect(screen.queryByText(/Mais praticidade no seu dia a dia/)).toBeNull();
  });

  it("hides the prompt on desktop and in standalone mode", async () => {
    mobileViewport = false;
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    const { unmount } = render(<PwaInstallPrompt />);
    expect(screen.queryByRole("button", { name: "Instalar aplicativo" })).toBeNull();

    unmount();
    mobileViewport = true;
    standalone = true;
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (Android 13; Mobile)",
    });
    render(<PwaInstallPrompt />);
    const installEvent = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
      prompt: vi.fn(),
      userChoice: Promise.resolve({ outcome: "accepted" as const, platform: "web" }),
    });
    act(() => {
      window.dispatchEvent(installEvent);
    });
    expect(screen.queryByRole("button", { name: "Instalar aplicativo" })).toBeNull();
  });

  it("returns to the initial install button without an error when the prompt is cancelled", async () => {
    render(<PwaInstallPrompt />);
    const installEvent = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: "dismissed" as const, platform: "web" }),
    });
    act(() => {
      window.dispatchEvent(installEvent);
    });

    fireEvent.click(await screen.findByRole("button", { name: "Instalar aplicativo" }));

    expect(await screen.findByRole("button", { name: "Instalar aplicativo" })).toBeEnabled();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows only a system toast after the appinstalled event", async () => {
    render(<PwaInstallPrompt />);

    act(() => {
      window.dispatchEvent(new Event("appinstalled"));
    });

    expect(toast.success).toHaveBeenCalledWith("EcoTravel instalado com sucesso!");
    expect(screen.queryByRole("button", { name: "Instalar aplicativo" })).toBeNull();
  });
});
