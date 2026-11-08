import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { AccessibilityProvider, useAccessibility } from "@/components/AccessibilityProvider";

const wrapperFor = (pathname: string) => ({ children }: { children: React.ReactNode }) => (
  <AccessibilityProvider pathname={pathname}>{children}</AccessibilityProvider>
);

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark", "high-contrast");
  delete document.documentElement.dataset["fontLevel"];
});

describe("Acessibilidade durante a sessão", () => {
  it("ativa e desativa alto contraste", () => {
    const { result } = renderHook(() => useAccessibility("tourist"), { wrapper: wrapperFor("/perfil") });
    act(() => result.current.setContrast(true));
    expect(document.documentElement.classList.contains("high-contrast")).toBe(true);
    act(() => result.current.setContrast(false));
    expect(document.documentElement.classList.contains("high-contrast")).toBe(false);
  });
  it("alterna entre modo escuro e claro", () => {
    const { result } = renderHook(() => useAccessibility("tourist"), { wrapper: wrapperFor("/perfil") });
    act(() => result.current.setDark(true));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    act(() => result.current.setDark(false));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
  it("oferece três níveis de ampliação e retorna à fonte padrão", () => {
    const { result } = renderHook(() => useAccessibility("tourist"), { wrapper: wrapperFor("/perfil") });
    for (const level of [1, 2, 3, 0]) {
      act(() => result.current.setFontLevel(level));
      expect(document.documentElement.dataset["fontLevel"]).toBe(String(level));
    }
  });

  it("isola opções do gestor e do turista e remove efeitos na entrada", () => {
    const tourist = renderHook(() => useAccessibility("tourist"), { wrapper: wrapperFor("/perfil") });
    act(() => {
      tourist.result.current.setContrast(true);
      tourist.result.current.setDark(false);
      tourist.result.current.setFontLevel(2);
    });

    expect(document.documentElement.classList.contains("high-contrast")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.dataset["fontLevel"]).toBe("2");
    expect(JSON.parse(localStorage.getItem("ecotravel-accessibility-settings") ?? "{}")).toEqual({ contrast: true, dark: false, fontLevel: 2 });
    tourist.unmount();

    const manager = renderHook(() => useAccessibility("manager"), { wrapper: wrapperFor("/dashboard/configuracoes") });
    expect(manager.result.current).toMatchObject({ contrast: false, dark: false, fontLevel: 0 });
    act(() => {
      manager.result.current.setDark(true);
      manager.result.current.setFontLevel(1);
    });
    expect(document.documentElement.classList.contains("high-contrast")).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.dataset["fontLevel"]).toBe("1");
    expect(JSON.parse(localStorage.getItem("ecotravel-manager-accessibility-settings") ?? "{}")).toEqual({ contrast: false, dark: true, fontLevel: 1 });
    manager.unmount();

    const restoredTourist = renderHook(() => useAccessibility("tourist"), { wrapper: wrapperFor("/ecobot") });
    expect(document.documentElement.classList.contains("high-contrast")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.dataset["fontLevel"]).toBe("2");
    restoredTourist.unmount();

    for (const pathname of ["/", "/cadastro"]) {
      const login = renderHook(() => useAccessibility("tourist"), { wrapper: wrapperFor(pathname) });
      expect(document.documentElement.classList.contains("high-contrast")).toBe(false);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
      expect(document.documentElement.dataset["fontLevel"]).toBeUndefined();
      login.unmount();
    }
  });
});