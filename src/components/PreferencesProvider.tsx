import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { parsePreferences, preferenceKey, type Preferences } from './preferences-model';

type Store = { preferences: Preferences | null; ready: boolean; save: (p: Preferences) => void };
const PreferencesContext = createContext<Store>({ preferences: null, ready: false, save: () => {} });

/** Anonymous preferences, read after hydration. Never gates the login screen. */
export const usePreferences = () => useContext(PreferencesContext).preferences;
export const usePreferenceStore = () => useContext(PreferencesContext);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setPreferences(parsePreferences(localStorage.getItem(preferenceKey))); } catch { /* Storage may be blocked. */ }
    setReady(true);
  }, []);
  const save = useCallback((p: Preferences) => {
    try { localStorage.setItem(preferenceKey, JSON.stringify(p)); } catch { /* Session-only fallback. */ }
    setPreferences(p);
  }, []);
  return <PreferencesContext.Provider value={{ preferences, ready, save }}>{children}</PreferencesContext.Provider>;
}
