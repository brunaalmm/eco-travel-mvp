import { describe, expect, it } from "vitest";
import { getDashboardData } from "@/lib/dashboard-data";

describe("Indicadores demonstrativos do Dashboard", () => {
  it("mostra 14.8 t CO2 acumuladas", () => {
    expect(getDashboardData("Todas", "Último Mês").total).toBe(14.8);
  });
  it("mostra a meta ambiental 74% concluída", () => {
    expect(getDashboardData("Todas", "Último Mês").progress).toBe(74);
  });
  it.each([
    ["carro", 45, 6.6], ["onibus", 25, 3.7], ["carona", 15, 2.2], ["trilha", 10, 1.5], ["pe", 5, 0.8],
  ])("preserva os valores solicitados para %s", (id, percent, tonnes) => {
    expect(getDashboardData("Todas", "Último Mês").distribution.find((mode) => mode.id === id)).toMatchObject({ percent, tonnes });
  });
  it("filtra os registros e indicadores para Litoral", () => {
    const data = getDashboardData("Litoral", "Último Mês");
    expect(data.records.length).toBe(3);
    expect(data.records.every((row) => row.region === "Litoral")).toBe(true);
    expect(data.total).toBe(5.3);
  });
  it("altera o conjunto demonstrativo quando o período muda", () => {
    expect(getDashboardData("Todas", "Ano Atual").total).toBe(148);
  });
});