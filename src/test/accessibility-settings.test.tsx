import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AccessibilityProvider, useAccessibility } from "@/components/AccessibilityProvider";

describe("Acessibilidade durante a sessão", () => {
  it("ativa e desativa alto contraste", () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper: AccessibilityProvider });
    act(() => result.current.setContrast(true));
    expect(document.documentElement.classList.contains("high-contrast")).toBe(true);
    act(() => result.current.setContrast(false));
    expect(document.documentElement.classList.contains("high-contrast")).toBe(false);
  });
  it("alterna entre modo escuro e claro", () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper: AccessibilityProvider });
    act(() => result.current.setDark(true));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    act(() => result.current.setDark(false));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
  it("oferece três níveis de ampliação e retorna à fonte padrão", () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper: AccessibilityProvider });
    for (const level of [1, 2, 3, 0]) {
      act(() => result.current.setFontLevel(level));
      expect(document.documentElement.dataset["fontLevel"]).toBe(String(level));
    }
  });
});