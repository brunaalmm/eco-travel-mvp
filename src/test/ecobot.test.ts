import { describe, expect, it } from "vitest";
import { answer, suggestions } from "@/lib/ecobot";

describe("EcoBot sustainable travel guidance", () => {
  it("shows the requested opening suggestions", () => {
    expect(suggestions).toEqual([
      "Como viajar usando transporte público?",
      "O que levar na mochila de trilha?",
      "Quais cuidados ter no litoral sustentável?",
      "Como ganhar e usar créditos verdes?",
    ]);
  });

  it("answers open-ended questions with practical trail guidance", () => {
    expect(answer("Como posso fazer uma trilha com menos impacto?")).toContain(
      "caminho sinalizado",
    );
  });

  it("keeps coastal questions focused on the beach rather than urban parks", () => {
    const response = answer("Quais cuidados ter no litoral e nas praias?");
    expect(response).toContain("restinga");
    expect(response).toContain("mar");
    expect(response).not.toContain("parque urbano");
  });

  it("combines coastal location, trail gear, and waste-reduction advice", () => {
    const response = answer("O que levar na mochila para uma trilha no litoral sem deixar lixo?");
    expect(response).toContain("garrafa reutilizável");
    expect(response).toContain("descartáveis");
    expect(response).toContain("restinga");
  });

  it("tailors public transport guidance to a coastal destination", () => {
    expect(answer("Como chegar de ônibus ao litoral?")).toContain("ônibus intermunicipais");
  });

  it("adds local destination context to transport advice", () => {
    const response = answer("Como chego de ônibus a Peruíbe?");
    expect(response).toContain("transporte coletivo");
    expect(response).toContain("Em Peruíbe:");
  });

  it("uses the shared destination circuit for itinerary questions", () => {
    expect(answer("Sugira um roteiro em Peruíbe")).toContain("Circuito Juréia Selvagem");
  });

  it("responds to unsupported topics with relevant ways to continue", () => {
    const response = answer("Pode me ajudar a planejar uma viagem?");
    expect(response).toContain("transporte público");
    expect(response).toContain("trilhas");
    expect(response).toContain("litoral");
    expect(response).toContain("pegada de carbono");
    expect(response).toContain("acessibilidade");
    expect(response).toContain("créditos verdes");
  });

  it("explains EcoTravel accessibility features despite accents and case", () => {
    const response = answer("ACESSIBILIDADE: como aumentar a FONTE e usar LIBRAS?");
    expect(response).toContain("alto contraste");
    expect(response).toContain("aumentar o tamanho da fonte");
    expect(response).toContain("audiodescrição");
    expect(response).toContain("Libras");
  });

  it("explains carbon estimates without promising certified compensation", () => {
    const response = answer("Como calcular CO2 e compensar emissões com uma ONG?");
    expect(response).toContain("aba Carbono");
    expect(response).toContain("estimativas de CO₂");
    expect(response).toContain("não é uma compensação certificada");
    expect(answer("CO₂")).toContain("aba Carbono");
  });

  it("explains how to earn and use green credits", () => {
    const response = answer("Como ganhar e usar créditos verdes?");
    expect(response).toContain("5 créditos ao conversar com o EcoBot");
    expect(response).toContain("15 créditos");
    expect(response).toContain("aba Créditos");
  });

  it("connects transportation advice to the app's discovery and map tabs", () => {
    const response = answer("Como viajar usando transporte público?");
    expect(response).toContain("Descobrir");
    expect(response).toContain("Mapa");
    expect(response).toContain("aba Carbono");
  });

  it("recognizes extra coastal and waste keywords", () => {
    expect(answer("Posso usar protetor solar na praia?")).toContain("restinga");
    expect(answer("Como descartar uma garrafa de plástico?")).toContain("resíduos");
  });
});
