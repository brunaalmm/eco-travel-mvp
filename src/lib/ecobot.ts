const faq: { k: string[]; a: string }[] = [
  { k: ["lixo", "resíduo", "residuo", "plástico", "plastico"], a: "Leve um saquinho para o seu lixo e traga tudo de volta. Bitucas e restos de comida também poluem — até casca de fruta pode atrair animais e alterar a dieta deles." },
  { k: ["trilha", "caminhada"], a: "Na trilha: fique no caminho marcado, vá com guia local quando possível, leve água em garrafa reutilizável e evite ruídos altos para não assustar a fauna." },
  { k: ["animal", "fauna", "bicho", "macaco"], a: "Nunca alimente animais silvestres. Observe à distância, sem flash, e não tente tocar. Isso protege eles e você!" },
  { k: ["cobra", "queimada", "ilha"], a: "A Ilha da Queimada Grande é lar da jararaca-ilhoa, espécie endêmica e criticamente ameaçada. A visita é proibida para turistas. Desbloqueie o artigo completo em Créditos Verdes!" },
  { k: ["carbono", "co2", "emissão", "emissao", "transporte", "carro", "ônibus", "onibus"], a: "Ônibus emite menos da metade do CO₂ por pessoa que um carro. A pé ou de bicicleta, zero! Use a calculadora para comparar." },
  { k: ["hospedagem", "pousada", "hotel"], a: "Procure hospedagens com gestão de resíduos, energia solar, reuso de água e que empreguem gente da comunidade. Pequenas pousadas costumam ter menos impacto." },
  { k: ["comida", "gastronomia", "restaurante", "comer"], a: "Prefira pescado da pesca artesanal e da estação, e produtos de feiras locais. Evite espécies em defeso, como camarão em época de reprodução." },
  { k: ["reserv", "compr", "preço", "preco", "agend"], a: "O EcoTravel é só informativo — não fazemos vendas nem reservas. Contrate diretamente com guias e negócios locais." },
  { k: ["oi", "olá", "ola", "bom dia", "boa tarde"], a: "Oi! Pergunte sobre trilhas, lixo, fauna, hospedagem, comida local ou carbono. 🌿" },
];

export function answer(q: string) {
  const s = ` ${q.toLowerCase().replace(/[?!.,;:]/g, " ")} `;
  const hit = (k: string) => (k.length <= 3 ? s.includes(` ${k} `) : s.includes(k));
  return faq.find((f) => f.k.some(hit))?.a ??
    "Boa pergunta! Ainda estou aprendendo sobre isso. Experimente perguntar sobre trilhas, lixo, fauna, hospedagem, gastronomia ou carbono.";
}

export const suggestions = ["Como cuidar do lixo na trilha?", "Posso alimentar animais?", "O que é a Ilha das Cobras?", "Ônibus ou carro?"];

