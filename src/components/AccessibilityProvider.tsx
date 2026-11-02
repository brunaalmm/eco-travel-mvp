import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Settings = { contrast: boolean; dark: boolean; fontLevel: number; setContrast: (value: boolean) => void; setDark: (value: boolean) => void; setFontLevel: (value: number) => void };
const SettingsContext = createContext<Settings | null>(null);
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [contrast, setContrast] = useState(false);
  const [dark, setDark] = useState(false);
  const [fontLevel, setFontLevel] = useState(0);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.toggle("high-contrast", contrast);
    root.dataset.fontLevel = String(fontLevel);
  }, [contrast, dark, fontLevel]);
  return <SettingsContext.Provider value={{ contrast, dark, fontLevel, setContrast, setDark, setFontLevel }}>{children}</SettingsContext.Provider>;
}
export function useAccessibility() {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error("AccessibilityProvider is required");
  return settings;
}