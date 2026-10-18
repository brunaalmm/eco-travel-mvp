import { useCallback, useEffect, useState } from "react";

const KEY = "ecotravel-credits";
const EVT = "ecotravel-credits-change";

export function useCredits() {
  const [credits, setCredits] = useState(0);
  useEffect(() => {
    const read = () => setCredits(Number(localStorage.getItem(KEY) || 0));
    read();
    window.addEventListener(EVT, read);
    return () => window.removeEventListener(EVT, read);
  }, []);
  const add = useCallback((n: number) => {
    const v = Number(localStorage.getItem(KEY) || 0) + n;
    localStorage.setItem(KEY, String(v));
    window.dispatchEvent(new Event(EVT));
  }, []);
  return { credits, add };
}
