import { createContext, useContext, useState, type ReactNode } from "react";
import { getDashboardData, type DashboardData, type Period, type Region } from "@/lib/dashboard-data";

type Ctx = { region: Region; setRegion: (r: Region) => void; period: Period; setPeriod: (p: Period) => void; peak: boolean; setPeak: (p: boolean) => void; data: DashboardData };
const DashboardContext = createContext<Ctx | null>(null);

/** Filters persist across the manager's separate pages during the session. */
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("Todas");
  const [period, setPeriod] = useState<Period>("Último Mês");
  const [peak, setPeak] = useState(false);
  const data = getDashboardData(region, period, peak);
  return <DashboardContext.Provider value={{ region, setRegion, period, setPeriod, peak, setPeak, data }}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}
