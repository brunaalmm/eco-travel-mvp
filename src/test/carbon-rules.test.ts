import { describe, expect, it } from "vitest";
import { realisticTransports } from "@/lib/data";
import { answer } from "@/lib/ecobot";

describe("comparativo realista de transporte", () => {
  it("não sugere a pé nem bicicleta para centenas de km", () => {
    const ids = realisticTransports(280).map((t) => t.id);
    expect(ids).not.toContain("pe");
    expect(ids).not.toContain("bike");
    expect(ids).toEqual(expect.arrayContaining(["onibus", "carro", "carona"]));
  });
  it("mantém a pé e bicicleta em distâncias curtas", () => {
    expect(realisticTransports(10).map((t) => t.id)).toContain("bike");
  });
});

describe("perguntas rápidas do EcoBot", () => {
  it("responde cada sugestão com o tema certo", () => {
    expect(answer("Posso alimentar animais?")).toMatch(/alimente animais/);
    expect(answer("O que é a Ilha das Cobras?")).toMatch(/Queimada Grande/);
    expect(answer("Ônibus ou carro?")).toMatch(/Ônibus emite/);
  });
});
