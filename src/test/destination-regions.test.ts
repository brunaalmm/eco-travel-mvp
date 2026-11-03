import { describe, expect, it } from "vitest";
import { destinations, filterDestinations, tripKm } from "@/lib/data";

describe("Roteiros por macro-região", () => {
  it("lista exatamente sete roteiros em Todos", () => { expect(filterDestinations("Todos")).toHaveLength(7); });
  it("mantém os três roteiros do Litoral", () => { expect(filterDestinations("Litoral").map((d) => d.id)).toEqual(["peruibe", "guaruja", "bertioga"]); });
  it("inclui Paranapiacaba e São Paulo na Grande SP", () => { expect(filterDestinations("Região Metropolitana / Grande SP").map((d) => d.id)).toEqual(["paranapiacaba", "sao-paulo"]); });
  it("inclui Jundiaí e Brotas no Interior", () => { expect(filterDestinations("Interior").map((d) => d.id)).toEqual(["jundiai", "brotas"]); });
  it("combina busca e região sem retornar roteiros de outra região", () => { expect(filterDestinations("Litoral", "Paranapiacaba")).toHaveLength(0); expect(filterDestinations("Região Metropolitana / Grande SP", "ferroviária").map((d) => d.id)).toEqual(["paranapiacaba"]); });
  it("fornece distância numérica para todos os destinos da calculadora", () => { for (const d of destinations) { expect(Number.isFinite(tripKm[d.id])).toBe(true); expect(tripKm[d.id]).toBeGreaterThan(0); } });
});