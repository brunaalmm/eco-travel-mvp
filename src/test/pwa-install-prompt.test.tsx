import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";

let standalone = false;
let mobileViewport = true;

describe("PWA install prompt", () => {
  beforeEach(() => {
    standalone = false;
    mobileViewport = true;
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

  it("requests the native installation after the Android install prompt event", async () => {
    render(<PwaInstallPrompt />);
    const prompt = vi.fn().mockResolvedValue(undefined);
    const installEvent = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
      prompt,
      userChoice: Promise.resolve({ outcome: "accepted" as const, platform: "web" }),
    });

    window.dispatchEvent(installEvent);

    const installButton = await screen.findByRole("button", { name: "Instalar app EcoTravel" });
    expect(installEvent.defaultPrevented).toBe(true);
    fireEvent.click(installButton);
    await waitFor(() => expect(prompt).toHaveBeenCalledOnce());
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "Instalar app EcoTravel" })).toBeNull(),
    );
  });

  it("shows closable instructions on iOS", async () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    });
    render(<PwaInstallPrompt />);

    expect(await screen.findByText(/Adicionar à Tela de Início/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Fechar aviso de instalação" }));
    expect(screen.queryByText(/Adicionar à Tela de Início/)).toBeNull();
  });

  it("hides the prompt on desktop and in standalone mode", async () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    const { unmount } = render(<PwaInstallPrompt />);
    expect(screen.queryByRole("button", { name: "Instalar app EcoTravel" })).toBeNull();

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
    window.dispatchEvent(installEvent);
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "Instalar app EcoTravel" })).toBeNull(),
    );
  });
});
