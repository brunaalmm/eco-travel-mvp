import { describe, expect, it } from "vitest";
import { answer } from "@/lib/ecobot";

describe("EcoBot sustainable travel guidance", () => {
  it("answers open-ended questions with practical trail guidance", () => {
    expect(answer("Como posso fazer uma trilha com menos impacto?")).toContain("caminho sinalizado");
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
    expect(answer("Pode me ajudar a planejar uma viagem?")).toContain("cidade ou região");
  });
});