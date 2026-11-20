import { createContext, useContext, useState, type ReactNode } from "react";
import { getDashboardData, type DashboardData, type Period } from "@/lib/dashboard-data";

type Ctx = { period: Period; setPeriod: (p: Period) => void; data: DashboardData };
const DashboardContext = createContext<Ctx | null>(null);

/** Period preference persists across the manager's separate pages during the session. */
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<Period>("Último Mês");
  const data = getDashboardData("Todas", period, false);
  return <DashboardContext.Provider value={{ period, setPeriod, data }}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}
