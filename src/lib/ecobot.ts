import { carbonKg, type TransportId } from "./data";

const faq: { k: string[]; a: string }[] = [
  { k: ["carona"], a: "Carona solidária: combine pelo grupo da sua turma ou trabalho, divida combustível e pedágio de forma justa, lote o carro (4 pessoas reduzem a pegada por passageiro em até 75%) e prefira motoristas conhecidos. Sempre use cinto e compartilhe o trajeto com alguém de confiança." },
  { k: ["mochila", "equipamento", "levar", "trilha"], a: "Mochila de trilha essencial: garrafa de água reutilizável, kit leve de primeiros socorros, repelente biodegradável, protetor solar, boné, lanches leves sem embalagens plásticas descartáveis (frutas, castanhas em pote) e um saquinho para trazer seu lixo de volta." },
  { k: ["praia", "ambulante", "areia", "quiosque"], a: "Consumo consciente na praia: leve copo, garrafa e talheres próprios, recuse canudos e sacolas, prefira ambulantes cadastrados e alimentos da estação, e recolha todo o lixo da faixa de areia — inclusive bitucas e tampinhas." },
  { k: ["metrô", "metro", "trem", "ônibus", "onibus", "mobilidade", "chegar", "rodoviária", "rodoviaria"], a: "Mobilidade até polos turísticos: use metrô e trens da CPTM integrados ao Bilhete Único, ônibus rodoviários a partir dos terminais Tietê, Jabaquara e Barra Funda para o litoral e interior, e o Expresso Turístico até Paranapiacaba. Para trechos sem transporte público, peça orientações sobre carona solidária." },
  { k: ["capital", "cidade", "urbana", "ciclovia", "parque", "feira", "água", "energia"], a: "Sustentabilidade urbana em São Paulo: pedale pelas ciclovias e ciclofaixas de lazer, visite parques como Ibirapuera e Horto Florestal, compre em feiras e comércios locais, economize água no hotel e desligue luzes e ar-condicionado ao sair." },
  { k: ["oi", "olá", "ola", "bom dia", "boa tarde"], a: "Oi! Posso ajudar com mochila de trilha, consumo na praia, mobilidade, sustentabilidade urbana e carona solidária. 🌿" },
  { k: ["reserv", "compr", "preço", "preco", "agend"], a: "O EcoTravel é só informativo — não fazemos vendas nem reservas. Contrate diretamente com guias e negócios locais." },
];

export function answer(q: string) {
  const s = ` ${q.toLowerCase().replace(/[?!.,;:]/g, " ")} `;
  const hit = (k: string) => (k.length <= 3 ? s.includes(` ${k} `) : s.includes(k));
  return faq.find((f) => f.k.some(hit))?.a ??
    "Ainda estou aprendendo sobre isso. Pergunte sobre mochila de trilha, consumo na praia, mobilidade, sustentabilidade urbana ou carona solidária.";
}

export const suggestions = [
  "O que levar na mochila de trilha?",
  "Como consumir na praia sem lixo?",
  "Como chegar a polos turísticos de transporte público?",
  "Sustentabilidade urbana na Capital",
  "Orientações sobre carona solidária",
];

/** Mini-quiz: real modal choices with instant, shared-factor carbon results. */
export const quiz: { question: string; km: number; options: { label: string; t: TransportId }[] }[] = [
  { question: "Você vai de São Paulo a Peruíbe (280 km ida e volta). Como viaja?", km: 280, options: [{ label: "Carro sozinho", t: "carro" }, { label: "Ônibus rodoviário", t: "onibus" }] },
  { question: "Do hotel ao Parque Ibirapuera (8 km ida e volta). Qual escolha?", km: 8, options: [{ label: "Carro", t: "carro" }, { label: "Bicicleta", t: "bike" }, { label: "Ônibus", t: "onibus" }] },
  { question: "Passeio até Jundiaí e Serra do Japi (120 km). E agora?", km: 120, options: [{ label: "Carro", t: "carro" }, { label: "Ônibus / trem", t: "onibus" }] },
];

export function quizResult(km: number, t: TransportId) {
  const kg = carbonKg(km, t);
  const car = carbonKg(km, "carro");
  return { kg, saved: Math.round((car - kg) * 100) / 100 };
}
