import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";

export type AccessibilityScope = "tourist" | "manager";
type SavedSettings = { contrast: boolean; dark: boolean; fontLevel: number };
type Settings = SavedSettings & { setContrast: (value: boolean) => void; setDark: (value: boolean) => void; setFontLevel: (value: number) => void };
type SettingsByScope = Record<AccessibilityScope, Settings>;

const STORAGE_KEYS: Record<AccessibilityScope, string> = {
  tourist: "ecotravel-accessibility-settings",
  manager: "ecotravel-manager-accessibility-settings",
};
const DEFAULT_SETTINGS: SavedSettings = { contrast: false, dark: false, fontLevel: 0 };
const TOURIST_ROUTES = ["/descobrir", "/eco", "/ecobot", "/mapa", "/creditos", "/perfil", "/privacidade", "/sobre", "/termos", "/onboarding"];
const useRouteEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const SettingsContext = createContext<SettingsByScope | null>(null);
function readSettings(scope: AccessibilityScope): SavedSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEYS[scope]) ?? "null") as Partial<SavedSettings> | null;
    return {
      contrast: typeof stored?.contrast === "boolean" ? stored.contrast : DEFAULT_SETTINGS.contrast,
      dark: typeof stored?.dark === "boolean" ? stored.dark : DEFAULT_SETTINGS.dark,
      fontLevel: typeof stored?.fontLevel === "number" && [0, 1, 2, 3].includes(stored.fontLevel) ? stored.fontLevel : DEFAULT_SETTINGS.fontLevel,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function isTouristRoute(pathname: string) {
  return TOURIST_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) || /^\/destino\/[^/]+\/?$/.test(pathname);
}

function isManagerRoute(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

export function AccessibilityProvider({ children, pathname = "/descobrir" }: { children: ReactNode; pathname?: string }) {
  const [touristSettings, setTouristSettings] = useState<SavedSettings>(() => readSettings("tourist"));
  const [managerSettings, setManagerSettings] = useState<SavedSettings>(() => readSettings("manager"));

  useEffect(() => {
    for (const [scope, settings] of [["tourist", touristSettings], ["manager", managerSettings]] as const) {
      try {
        window.localStorage.setItem(STORAGE_KEYS[scope], JSON.stringify(settings));
      } catch {
        // Preferences remain available in memory when browser storage is unavailable.
      }
    }
  }, [touristSettings, managerSettings]);

  useRouteEffect(() => {
    const root = document.documentElement;
    const activeSettings = isTouristRoute(pathname) ? touristSettings : isManagerRoute(pathname) ? managerSettings : null;
    root.classList.toggle("dark", activeSettings?.dark ?? false);
    root.classList.toggle("high-contrast", activeSettings?.contrast ?? false);
    if (activeSettings) root.dataset["fontLevel"] = String(activeSettings.fontLevel);
    else delete root.dataset["fontLevel"];
  }, [managerSettings, pathname, touristSettings]);

  const createScopedSettings = (value: SavedSettings, update: (next: (current: SavedSettings) => SavedSettings) => void): Settings => ({
    ...value,
    setContrast: (contrast) => update((current) => ({ ...current, contrast })),
    setDark: (dark) => update((current) => ({ ...current, dark })),
    setFontLevel: (fontLevel) => update((current) => ({ ...current, fontLevel: [0, 1, 2, 3].includes(fontLevel) ? fontLevel : 0 })),
  });
  const contexts: SettingsByScope = {
    tourist: createScopedSettings(touristSettings, setTouristSettings),
    manager: createScopedSettings(managerSettings, setManagerSettings),
  };

  return <SettingsContext.Provider value={contexts}>{children}</SettingsContext.Provider>;
}
export function useAccessibility(scope: AccessibilityScope) {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error("AccessibilityProvider is required");
  return settings[scope];
}