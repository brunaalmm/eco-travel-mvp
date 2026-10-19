import peruibe from "@/assets/peruibe.jpg";
import guaruja from "@/assets/guaruja.jpg";
import bertioga from "@/assets/bertioga.jpg";

export type Place = { name: string; desc: string; tag?: string };
export type Stop = { name: string; km: number; min: number; kind: string };

export type Destination = {
  id: string;
  name: string;
  region: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  summary: string;
  map: { x: number; y: number };
  attractions: Place[];
  lodging: Place[];
  food: Place[];
  tours: Place[];
  circuit: { title: string; stops: Stop[] };
};

export const destinations: Destination[] = [
  {
    id: "peruibe",
    name: "Peruíbe",
    region: "Litoral Sul · SP",
    image: peruibe,
    duration: "2 DIAS",
    rating: 4.9,
    reviews: 312,
    summary:
      "Porta de entrada da Estação Ecológica Juréia-Itatins, com praias selvagens, cachoeiras e cultura caiçara e indígena preservadas.",
    map: { x: 22, y: 70 },
    attractions: [
      { name: "Estação Ecológica Juréia-Itatins", desc: "Uma das áreas de Mata Atlântica mais preservadas do Brasil.", tag: "Unidade de conservação" },
      { name: "Praia do Guaraú", desc: "Enseada tranquila com rio, mangue e mirante.", tag: "Praia" },
      { name: "Cachoeira do Paraíso", desc: "Poços de água cristalina na trilha do Guaraú.", tag: "Cachoeira" },
      { name: "Lama Negra", desc: "Lama medicinal de origem marinha, tradição local.", tag: "Cultura" },
    ],
    lodging: [
      { name: "Pousadas no Guaraú", desc: "Pequenas pousadas familiares com gestão de resíduos.", tag: "Selo verde" },
      { name: "Camping da Barra do Una", desc: "Estrutura simples, próxima à natureza.", tag: "Baixo impacto" },
    ],
    food: [
      { name: "Cozinha caiçara", desc: "Peixe na folha de bananeira e azul-marinho.", tag: "Local" },
      { name: "Feira do produtor", desc: "Banana, palmito pupunha e artesanato regional.", tag: "Comunidade" },
    ],
    tours: [
      { name: "Trilha do Costão", desc: "Caminhada leve com vista para a Juréia.", tag: "Trilha" },
      { name: "Aldeia Piaçaguera", desc: "Visita guiada por lideranças Tupi-Guarani.", tag: "Base comunitária" },
    ],
    circuit: {
      title: "Circuito Juréia Selvagem",
      stops: [
        { name: "Centro de Visitantes", km: 0, min: 0, kind: "Ponto de partida" },
        { name: "Praia do Guaraú", km: 9.5, min: 20, kind: "Praia" },
        { name: "Cachoeira do Paraíso", km: 3.2, min: 50, kind: "Trilha" },
        { name: "Mirante do Guaraú", km: 2.1, min: 30, kind: "Mirante" },
        { name: "Barra do Una", km: 14.0, min: 35, kind: "Rio e praia" },
      ],
    },
  },
  {
    id: "guaruja",
    name: "Guarujá",
    region: "Baixada Santista · SP",
    image: guaruja,
    duration: "1 DIA",
    rating: 4.7,
    reviews: 528,
    summary:
      "Além das praias famosas, o Guarujá esconde trilhas de costão, fortes históricos e a Serra do Guararu com mata preservada.",
    map: { x: 52, y: 45 },
    attractions: [
      { name: "Praia do Tombo", desc: "Selo Bandeira Azul de qualidade ambiental.", tag: "Bandeira Azul" },
      { name: "Fortaleza da Barra Grande", desc: "Forte do século XVI na entrada do estuário.", tag: "História" },
      { name: "Área de Proteção da Serra do Guararu", desc: "Mata Atlântica e praias isoladas.", tag: "APA" },
    ],
    lodging: [
      { name: "Hospedagens na Praia do Iporanga", desc: "Condomínio integrado à mata, sem carros na praia.", tag: "Selo verde" },
      { name: "Pousadas no Perequê", desc: "Vila de pescadores, hospitalidade simples.", tag: "Comunidade" },
    ],
    food: [
      { name: "Peixaria do Perequê", desc: "Pescado do dia da colônia de pescadores.", tag: "Pesca artesanal" },
      { name: "Mercado de orgânicos", desc: "Produtores da baixada aos sábados.", tag: "Orgânico" },
    ],
    tours: [
      { name: "Trilha do Pico do Urubu", desc: "Vista 360° da ilha de Santo Amaro.", tag: "Trilha" },
      { name: "Trilha das 7 Praias", desc: "Caminhada entre praias selvagens do Guararu.", tag: "Trilha" },
    ],
    circuit: {
      title: "Circuito Costões do Guarujá",
      stops: [
        { name: "Praia do Tombo", km: 0, min: 0, kind: "Praia" },
        { name: "Trilha do Pico do Urubu", km: 3.4, min: 45, kind: "Trilha" },
        { name: "Praia do Guaiúba", km: 2.6, min: 15, kind: "Praia" },
        { name: "Fortaleza da Barra Grande", km: 12.0, min: 30, kind: "História" },
      ],
    },
  },
  {
    id: "bertioga",
    name: "Bertioga",
    region: "Litoral Norte · SP",
    image: bertioga,
    duration: "2 DIAS",
    rating: 4.8,
    reviews: 274,
    summary:
      "Rios de mangue, praias desertas e o Parque Estadual Restinga de Bertioga fazem da cidade um refúgio de ecoturismo.",
    map: { x: 78, y: 28 },
    attractions: [
      { name: "Parque Estadual Restinga de Bertioga", desc: "Restinga e mata de encosta protegidas.", tag: "Parque estadual" },
      { name: "Praia de Itaguaré", desc: "Praia deserta com encontro de rio e mar.", tag: "Praia" },
      { name: "Forte São João", desc: "Um dos fortes mais antigos do Brasil.", tag: "História" },
    ],
    lodging: [
      { name: "Pousadas em Boracéia", desc: "Hospedagens pequenas com energia solar.", tag: "Selo verde" },
      { name: "Eco-chalés no Itaguaré", desc: "Construções de baixo impacto na restinga.", tag: "Baixo impacto" },
    ],
    food: [
      { name: "Cozinha da Aldeia Rio Silveira", desc: "Culinária Guarani em visitas agendadas pela aldeia.", tag: "Indígena" },
      { name: "Restaurantes de frutos do mar", desc: "Priorize quem compra da pesca local.", tag: "Pesca artesanal" },
    ],
    tours: [
      { name: "Remada no Rio Itaguaré", desc: "Caiaque entre manguezais com guia local.", tag: "Caiaque" },
      { name: "Trilha da Cachoeira do Itatinga", desc: "Vila histórica e cachoeira na serra.", tag: "Trilha" },
    ],
    circuit: {
      title: "Circuito Rios e Restinga",
      stops: [
        { name: "Forte São João", km: 0, min: 0, kind: "História" },
        { name: "Parque Restinga de Bertioga", km: 18.0, min: 25, kind: "Parque" },
        { name: "Rio Itaguaré (caiaque)", km: 4.5, min: 90, kind: "Rio" },
        { name: "Praia de Itaguaré", km: 1.2, min: 20, kind: "Praia" },
      ],
    },
  },
];

export const getDestination = (id: string) => destinations.find((d) => d.id === id);

export const circuitTotals = (stops: Stop[]) => ({
  km: Math.round(stops.reduce((s, x) => s + x.km, 0) * 10) / 10,
  min: stops.reduce((s, x) => s + x.min, 0),
});

export const formatMin = (m: number) =>
  m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}` : `${m} min`;

/** kg de CO₂ por passageiro-km (valores médios de referência). */
export const transports = [
  { id: "pe", label: "Trilha a pé", factor: 0 },
  { id: "bike", label: "Bicicleta", factor: 0 },
  { id: "onibus", label: "Ônibus", factor: 0.089 },
  { id: "carona", label: "Carona solidária", factor: 0.064 },
  { id: "carro", label: "Carro", factor: 0.192 },
] as const;
export type TransportId = (typeof transports)[number]["id"];

export function carbonKg(km: number, transport: TransportId) {
  const t = transports.find((x) => x.id === transport)!;
  return Math.round(km * t.factor * 100) / 100;
}

/** Acima desta distância (km), a pé e bicicleta deixam de ser comparações realistas. */
export const ACTIVE_MAX_KM = 30;
const ACTIVE: TransportId[] = ["pe", "bike"];

/** Modais viáveis para a distância informada. */
export function realisticTransports(km: number) {
  return transports.filter((t) => km <= ACTIVE_MAX_KM || !ACTIVE.includes(t.id));
}

/** Uma árvore da Mata Atlântica absorve ~ 7 kg de CO₂ por ano no início do crescimento. */
export const treesToOffset = (kg: number) => Math.ceil(kg / 7);

/** Distância de ida e volta a partir de São Paulo capital. */
export const tripKm: Record<string, number> = { peruibe: 280, guaruja: 180, bertioga: 210 };

export const ecoTips = [
  { title: "Leve sua garrafinha", text: "Garrafas reutilizáveis evitam centenas de plásticos por ano." },
  { title: "Sacolas retornáveis", text: "Leve sua ecobag para compras e para recolher resíduos." },
  { title: "Recolha seu lixo", text: "Tudo que entra na trilha volta com você. Inclusive bitucas!" },
  { title: "Respeite fauna e flora", text: "Não alimente animais, não colha plantas, fique na trilha." },
  { title: "Valorize a comunidade", text: "Prefira guias, pousadas e comércio locais." },
];

export const rewards = [
  { id: "cobras", goal: 50, title: "Ilha da Queimada Grande", subtitle: "Artigo exclusivo: a Ilha das Cobras" },
  { id: "certificado", goal: 120, title: "Certificado Verde", subtitle: "Apoio a projetos sustentáveis locais" },
];
