import { describe, expect, it } from "vitest";
import { realisticTransports, transports } from "@/lib/data";
import { answer } from "@/lib/ecobot";

describe("comparativo realista de transporte", () => {
  it("não sugere a pé nem bicicleta para centenas de km", () => {
    const ids = realisticTransports(280).map((t) => t.id);
    expect(ids).not.toContain("pe");
    expect(ids).not.toContain("bike");
    expect(ids).toEqual(expect.arrayContaining(["onibus", "carro"]));
  });
  it("mantém a pé e bicicleta em distâncias curtas", () => {
    expect(realisticTransports(10).map((t) => t.id)).toContain("bike");
  });
});

describe("perguntas rápidas do EcoBot", () => {
  it("responde cada atalho com o tema certo", () => {
    expect(answer("O que levar na mochila de trilha?")).toMatch(/repelente biodegradável/);
    expect(answer("Como consumir na praia sem lixo?")).toMatch(/faixa de areia/);
    expect(answer("Como chegar a polos turísticos de transporte público?")).toMatch(/metrô/);
    expect(answer("Sustentabilidade urbana na Capital")).toMatch(/ciclovias/);
    expect(answer("Orientações sobre carona solidária")).toMatch(/Carona solidária/);
  });
  it("carona solidária não é modal de transporte", () => {
    expect(transports.map((t) => t.id)).not.toContain("carona");
    expect(transports.map((t) => t.id)).toContain("bike");
  });
});
