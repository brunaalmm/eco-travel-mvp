import { describe, expect, it } from "vitest";
import { getDashboardData, regions } from "@/lib/dashboard-data";
import { dashboardGreeting } from "@/lib/dashboard-greeting";
import { filterDestinations } from "@/lib/data";

describe("Painel do Gestor", () => {
  it("usa as mesmas regiões do turista", () => {
    expect(regions).toEqual(["Todas", "Litoral", "Região Metropolitana / Grande SP", "Interior"]);
  });
  it("mostra 14.8 t CO2 e meta 74%", () => {
    const d = getDashboardData("Todas", "Último Mês");
    expect(d.total).toBe(14.8);
    expect(d.progress).toBe(74);
  });
  it("Litoral lista os mesmos roteiros do turista", () => {
    const names = getDashboardData("Litoral", "Último Mês").records.map((r) => r.route).sort();
    expect(names).toEqual(filterDestinations("Litoral", "").map((d) => d.circuit.title).sort());
  });
  it("não tem carona solidária entre os modais", () => {
    expect(getDashboardData("Todas", "Último Mês").distribution.map((m) => m.id)).not.toContain("carona");
  });
  it("pico de feriado aumenta o fluxo e alerta capacidade", () => {
    const peak = getDashboardData("Todas", "Último Mês", true);
    expect(peak.trips).toBeGreaterThan(getDashboardData("Todas", "Último Mês").trips);
    expect(peak.overCapacity.length).toBeGreaterThan(0);
  });
});

describe("Saudação do gestor", () => {
  it.each([
    [0, "Bom dia, Gestor"],
    [11, "Bom dia, Gestor"],
    [12, "Boa tarde, Gestor"],
    [17, "Boa tarde, Gestor"],
    [18, "Boa noite, Gestor"],
    [23, "Boa noite, Gestor"],
  ])("usa a saudação correta às %i horas", (hour, expected) => {
    expect(dashboardGreeting(hour)).toBe(expected);
  });
});
