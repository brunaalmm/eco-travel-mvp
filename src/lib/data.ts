import peruibe from "@/assets/peruibe.jpg";
import guaruja from "@/assets/guaruja.jpg";
import bertioga from "@/assets/bertioga.jpg";
import paranapiacaba from "@/assets/paranapiacaba.jpg";
import saoPaulo from "@/assets/sao-paulo.jpg";
import jundiai from "@/assets/jundiai.jpg";
import brotas from "@/assets/brotas.jpg";

export const macroRegions = ["Todos", "Litoral", "Região Metropolitana / Grande SP", "Interior"] as const;
export type MacroRegion = (typeof macroRegions)[number];

export type Place = { name: string; desc: string; tag?: string };
export type Stop = { name: string; km: number; min: number; kind: string };

export type Destination = {
  id: string;
  name: string;
  region: string;
  macroRegion: Exclude<MacroRegion, "Todos">;
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
    macroRegion: "Litoral",
    image: peruibe,
    duration: "2 DIAS",
    rating: 4.9,
    reviews: 312,
    summary:
      "Porta de entrada da Estação Ecológica Juréia-Itatins, com praias selvagens, cachoeiras e cultura caiçara e indígena preservadas.",
    map: { x: 22, y: 70 },
    attractions: [
      { name: "Ruínas do Abarebebê", desc: "Sítio arqueológico com vestígios da antiga Igreja de São João Batista, do século XVI.", tag: "Patrimônio" },
      { name: "Estação Ecológica Jureia-Itatins", desc: "Unidade de conservação com acesso sujeito às regras e autorizações ambientais vigentes.", tag: "Unidade de conservação" },
      { name: "Praia e Rio Guaraú", desc: "Encontro de praia, rio e Mata Atlântica na região do Guaraú.", tag: "Praia e rio" },
      { name: "Parque Turístico da Lama Negra", desc: "Área municipal ligada à tradição local de uso da lama negra; confirme funcionamento antes da visita.", tag: "Parque" },
    ],
    lodging: [
      { name: "Pousada Peruíbe Ametista", desc: "Hospedagem à beira-mar com piscina e café da manhã; consulte disponibilidade e serviços diretamente.", tag: "Hospedagem" },
      { name: "Brisamar Praia Hotel", desc: "Hotel e restaurante na orla de Peruíbe, com diferentes tipos de acomodação.", tag: "Orla" },
    ],
    food: [
      { name: "Restaurante do Brisamar Praia Hotel", desc: "Restaurante junto à orla; confirme cardápio, horários e atendimento antes de ir.", tag: "Restaurante" },
      { name: "Azul-marinho caiçara", desc: "Prato tradicional de peixe preparado com banana verde, encontrado em restaurantes caiçaras da região.", tag: "Prato regional" },
      { name: "Produtos da Feira de Peruíbe", desc: "Frutas, banana e produtos de pequenos produtores locais; dias e horários podem variar.", tag: "Feira local" },
    ],
    tours: [
      { name: "Visita às Ruínas do Abarebebê", desc: "Passeio histórico-cultural no sítio arqueológico; confira horários e condições de visitação.", tag: "Patrimônio" },
      { name: "Passeio pelo Rio Guaraú", desc: "Passeio de barco oferecido por operadores locais, sujeito a clima, maré e reserva.", tag: "Rio" },
      { name: "Trilhas do Guaraú", desc: "Percursos em área natural que exigem checagem prévia de acesso, condições e necessidade de guia.", tag: "Trilha" },
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
    macroRegion: "Litoral",
    image: guaruja,
    duration: "1 DIA",
    rating: 4.7,
    reviews: 528,
    summary:
      "Além das praias famosas, o Guarujá esconde trilhas de costão, fortes históricos e a Serra do Guararu com mata preservada.",
    map: { x: 52, y: 45 },
    attractions: [
      { name: "Praia do Tombo", desc: "Selo Bandeira Azul de qualidade ambiental.", tag: "Bandeira Azul" },
      { name: "Fortaleza de Santo Amaro da Barra Grande", desc: "Fortificação histórica do século XVI na entrada do estuário de Santos; visitação depende de abertura e regras locais.", tag: "História" },
      { name: "Aquário Acqua Mundo", desc: "Aquário localizado na Praia da Enseada; consulte horários e programação.", tag: "Aquário" },
      { name: "Área de Proteção Ambiental Serra do Guararu", desc: "Área protegida que inclui trechos de Mata Atlântica e praias; respeite regras de acesso.", tag: "APA" },
    ],
    lodging: [
      { name: "Casa Grande Hotel Resort & Spa", desc: "Hotel na Praia da Enseada, com hospedagem, lazer e opções gastronômicas no local.", tag: "Enseada" },
      { name: "Hotel Jequitimar Guarujá Resort & Spa", desc: "Resort à beira-mar na Praia de Pernambuco; confirme tarifas, disponibilidade e serviços diretamente.", tag: "Praia de Pernambuco" },
    ],
    food: [
      { name: "Dalmo Bárbaro", desc: "Restaurante de frutos do mar na Avenida Miguel Stéfano, na Enseada; confirme horários e reservas.", tag: "Restaurante" },
      { name: "Mercado de Peixes do Perequê", desc: "Comércio de pescado ligado à comunidade pesqueira; a oferta varia conforme a pesca do dia.", tag: "Pescado local" },
    ],
    tours: [
      { name: "Trilha da Praia Branca", desc: "Acesso a pé a partir da região da balsa; confira condições da trilha e travessia antes de sair.", tag: "Trilha" },
      { name: "Visita à Fortaleza da Barra Grande", desc: "Passeio histórico sujeito a horários e autorização de acesso.", tag: "História" },
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
    macroRegion: "Litoral",
    image: bertioga,
    duration: "2 DIAS",
    rating: 4.8,
    reviews: 274,
    summary:
      "Rios de mangue, praias desertas e o Parque Estadual Restinga de Bertioga fazem da cidade um refúgio de ecoturismo.",
    map: { x: 78, y: 28 },
    attractions: [
      { name: "Forte São João", desc: "Fortificação histórica no centro de Bertioga, junto ao canal.", tag: "História" },
      { name: "Parque Estadual Restinga de Bertioga", desc: "Área protegida de restinga e Mata Atlântica; trilhas e acessos seguem regras do parque.", tag: "Parque estadual" },
      { name: "Praia e Rio Itaguaré", desc: "Trecho de praia e encontro com o rio em área de restinga; leve água e recolha os resíduos.", tag: "Praia e rio" },
      { name: "Aldeia Indígena Rio Silveira", desc: "Território Guarani em Bertioga; visita somente com autorização e agendamento junto à comunidade.", tag: "Cultura" },
    ],
    lodging: [
      { name: "Centro de Férias Sesc Bertioga", desc: "Hospedagem com alimentação e programação de lazer; vagas e acesso seguem regras de reserva do Sesc.", tag: "Centro de férias" },
      { name: "Pousada Morada da Boraceia", desc: "Pousada a poucos minutos da praia em Bertioga; confirme disponibilidade e serviços com a hospedagem.", tag: "Boraceia" },
    ],
    food: [
      { name: "Comedoria do Sesc Bertioga", desc: "Restaurante, lanchonete, café e cafeteria dentro do Centro de Férias; consulte as condições de acesso.", tag: "Restaurante" },
      { name: "Peixes e frutos do mar caiçaras", desc: "Pratos encontrados em restaurantes da cidade; pergunte a origem do pescado e a disponibilidade do dia.", tag: "Culinária caiçara" },
    ],
    tours: [
      { name: "Passeio de escuna pelo Canal de Bertioga", desc: "Passeio náutico oferecido por operadores locais; confirme embarque, duração e condições do tempo.", tag: "Passeio de barco" },
      { name: "Trilha de Guaratuba", desc: "Caminhada em área natural; verifique necessidade de monitor, agendamento e regras de acesso.", tag: "Trilha" },
      { name: "Caminhada no Parque Estadual Restinga de Bertioga", desc: "Visitação em roteiros e horários autorizados pelo parque.", tag: "Natureza" },
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

destinations.push(
  {
    id: "paranapiacaba", name: "Paranapiacaba", region: "Santo André · SP", macroRegion: "Região Metropolitana / Grande SP",
    image: paranapiacaba, duration: "1 DIA", rating: 4.8, reviews: 0,
    summary: "Preservação ferroviária e Mata Atlântica de serra no ABC: arquitetura histórica, memória operária e biodiversidade em Santo André.",
    map: { x: 51, y: 23 },
    attractions: [
      { name: "Museu Tecnológico Ferroviário do Funicular", desc: "Acervo ferroviário instalado nas antigas oficinas do sistema funicular; confirme dias de abertura.", tag: "Museu" },
      { name: "Museu Castelo", desc: "Casa histórica construída para o engenheiro-chefe da São Paulo Railway; consulte visitação.", tag: "Patrimônio" },
      { name: "Parque Natural Municipal Nascentes de Paranapiacaba", desc: "Área de Mata Atlântica com visitação sujeita a agendamento, regras e acompanhamento.", tag: "Parque natural" },
    ],
    lodging: [
      { name: "Pousada Ferreira's", desc: "Hospedagem localizada na Vila de Paranapiacaba; confirme disponibilidade e serviços diretamente.", tag: "Vila histórica" },
      { name: "Hotel Pousada Shamballah", desc: "Pousada em casarão histórico da vila; consulte reservas e condições de acesso.", tag: "Hospedagem" },
    ],
    food: [
      { name: "Confraria do Cambuci", desc: "Restaurante e cachaçaria da Vila de Paranapiacaba com pratos e bebidas que valorizam o cambuci.", tag: "Restaurante" },
      { name: "Sabores de cambuci", desc: "Fruta nativa usada em doces, bebidas e preparos locais, especialmente em eventos da vila.", tag: "Ingrediente regional" },
    ],
    tours: [
      { name: "Visita ao Museu Funicular", desc: "Passeio pela memória ferroviária da antiga São Paulo Railway; confira a operação do museu.", tag: "Ferrovia" },
      { name: "Caminhada pelo patrimônio da vila", desc: "Roteiro a pé por construções ferroviárias e ruas da Parte Alta e da Parte Baixa.", tag: "Caminhada" },
      { name: "Trilhas do Parque Nascentes", desc: "Passeios em área natural somente conforme agendamento e regras do parque.", tag: "Trilha" },
    ],
    circuit: { title: "Vila Histórica de Paranapiacaba", stops: [{ name: "Vila ferroviária", km: 0, min: 0, kind: "Patrimônio" }, { name: "Museu e entorno da estação", km: 1, min: 25, kind: "História" }, { name: "Entorno do parque natural", km: 2, min: 40, kind: "Mata Atlântica" }] },
  },
  {
    id: "sao-paulo", name: "São Paulo", region: "São Paulo · SP", macroRegion: "Região Metropolitana / Grande SP",
    image: saoPaulo, duration: "1 DIA", rating: 4.8, reviews: 0,
    summary: "Mobilidade ativa e áreas verdes urbanas da Capital: duas alternativas de passeio, Parque Ibirapuera e Horto Florestal, para caminhar e contemplar a natureza.",
    map: { x: 32, y: 16 },
    attractions: [
      { name: "Parque Ibirapuera", desc: "Parque urbano com áreas de caminhada, lagos e equipamentos culturais.", tag: "Parque" },
      { name: "Museu Afro Brasil Emanoel Araujo", desc: "Museu dedicado às culturas africanas e afro-brasileiras, no Parque Ibirapuera.", tag: "Museu" },
      { name: "Planetário Ibirapuera", desc: "Equipamento de divulgação científica dentro do parque; sessões e ingressos variam.", tag: "Ciência" },
    ],
    lodging: [
      { name: "Pullman São Paulo Ibirapuera", desc: "Hotel localizado próximo ao Parque Ibirapuera; verifique tarifas, disponibilidade e deslocamento.", tag: "Hospedagem" },
      { name: "Hotel Unique", desc: "Hotel na região dos Jardins, a curta distância de carro do Ibirapuera; confirme acesso e disponibilidade.", tag: "Jardins" },
    ],
    food: [
      { name: "Selvagem Ibirapuera", desc: "Restaurante situado no Parque Ibirapuera com proposta de cozinha brasileira; consulte horários e reserva.", tag: "Restaurante" },
      { name: "Mercado Municipal Paulistano", desc: "Mercado histórico no Centro, conhecido por bancas de alimentos e pelo sanduíche de mortadela.", tag: "Mercado" },
    ],
    tours: [
      { name: "Caminhada cultural no Ibirapuera", desc: "Combine caminhos do parque com o Museu Afro Brasil e o Planetário, observando horários de funcionamento.", tag: "Caminhada" },
      { name: "Visita ao Mercado Municipal", desc: "Passeio gastronômico no Centro Histórico; planeje o deslocamento separadamente do Ibirapuera.", tag: "Gastronomia" },
    ],
    circuit: { title: "Parque Ibirapuera: natureza e cultura", stops: [{ name: "Portões do Parque Ibirapuera", km: 0, min: 0, kind: "Início" }, { name: "Museu Afro Brasil Emanoel Araujo", km: 1, min: 30, kind: "Museu" }, { name: "Planetário Ibirapuera", km: 1.5, min: 35, kind: "Ciência" }] },
  },
  {
    id: "jundiai", name: "Jundiaí", region: "Jundiaí · SP", macroRegion: "Interior",
    image: jundiai, duration: "2 DIAS", rating: 4.9, reviews: 0,
    summary: "Conservação e ecoturismo no Interior, com destaque para a Serra do Japi. O Circuito das Águas é uma proposta regional complementar, não uma trilha contínua.",
    map: { x: 23, y: 36 },
    attractions: [
      { name: "Reserva Biológica da Serra do Japi", desc: "Área de Mata Atlântica protegida; visitas dependem de autorização, agendamento e roteiros permitidos.", tag: "Conservação" },
      { name: "Parque da Cidade de Jundiaí", desc: "Parque municipal com lago, ciclovias e áreas de caminhada.", tag: "Parque" },
      { name: "Jardim Botânico de Jundiaí", desc: "Área municipal com jardins e coleções de plantas; confirme horários de visitação.", tag: "Jardim botânico" },
    ],
    lodging: [
      { name: "Hotel Serra de Jundiaí", desc: "Hotel na entrada da cidade, com acesso às rodovias e ao centro; confirme tarifas e serviços.", tag: "Hospedagem" },
    ],
    food: [
      { name: "Adega Maziero", desc: "Adega familiar na Rota da Uva, com produção de vinhos ligada à tradição da família.", tag: "Adega" },
      { name: "Cantinas da Rota da Uva", desc: "Cantinas e adegas dos bairros rurais Colônia e Caxambu, com cozinha de influência italiana e produtos locais.", tag: "Rota gastronômica" },
    ],
    tours: [
      { name: "Rota da Uva", desc: "Roteiro rural de Jundiaí por adegas, cantinas e produtores; consulte estabelecimentos abertos e transporte.", tag: "Rota turística" },
      { name: "Visita autorizada à Serra do Japi", desc: "Passeio de natureza sujeito às regras de conservação, agendamento e acompanhamento definidos pelos gestores.", tag: "Trilha" },
    ],
    circuit: { title: "Rota da Uva e áreas verdes de Jundiaí", stops: [{ name: "Adega Maziero", km: 0, min: 0, kind: "Rota da Uva" }, { name: "Cantinas do bairro Caxambu", km: 8, min: 25, kind: "Gastronomia" }, { name: "Parque da Cidade", km: 12, min: 30, kind: "Parque" }] },
  },
  {
    id: "brotas", name: "Brotas", region: "Brotas · SP", macroRegion: "Interior",
    image: brotas, duration: "2 DIAS", rating: 4.9, reviews: 0,
    summary: "Turismo de aventura sustentável e preservação de rios no Interior: corredeiras, mata ciliar e educação ambiental na bacia do rio Jacaré-Pepira.",
    map: { x: 76, y: 9 },
    attractions: [
      { name: "Parque dos Saltos", desc: "Parque municipal junto ao rio Jacaré-Pepira, com quedas-d'água e antiga estrutura da usina.", tag: "Parque" },
      { name: "Nascente Areia que Canta", desc: "Nascente de águas cristalinas em propriedade turística; visita mediante ingresso e reserva.", tag: "Nascente" },
      { name: "Cachoeira Cassorova", desc: "Queda-d'água em propriedade de ecoturismo; confirme acesso, ingresso e condições da trilha.", tag: "Cachoeira" },
    ],
    lodging: [
      { name: "Eco Brotas Pousada e Rafting", desc: "Pousada local que também oferece atividades de aventura; consulte pacotes e operação atual.", tag: "Pousada" },
      { name: "Brotas Eco Hotel Fazenda", desc: "Hotel-fazenda com hospedagem e lazer em área verde; confira opções de estadia e alimentação.", tag: "Hotel-fazenda" },
    ],
    food: [
      { name: "Restaurante da Areia que Canta", desc: "Refeições disponíveis no complexo turístico; confirme funcionamento e acesso para visitantes do day use.", tag: "Restaurante" },
      { name: "Cozinha caipira de Brotas", desc: "Pratos de fazenda e ingredientes do interior encontrados em restaurantes e hotéis-fazenda locais.", tag: "Culinária regional" },
    ],
    tours: [
      { name: "Rafting no rio Jacaré-Pepira", desc: "Atividade operada por agências locais com equipe e equipamentos; reserve e siga as condições de segurança.", tag: "Aventura" },
      { name: "Visita à Areia que Canta", desc: "Passeio guiado à nascente dentro do complexo, sujeito a ingresso, reserva e regras ambientais.", tag: "Passeio guiado" },
      { name: "Trilha da Cachoeira Cassorova", desc: "Percurso dentro de propriedade turística; verifique condições da trilha e orientação local.", tag: "Trilha" },
    ],
    circuit: { title: "Brotas: Parque dos Saltos e Jacaré-Pepira", stops: [{ name: "Parque dos Saltos", km: 0, min: 0, kind: "Parque" }, { name: "Centro de Brotas", km: 1, min: 15, kind: "Cidade" }, { name: "Ponto de saída para rafting no Jacaré-Pepira", km: 5, min: 25, kind: "Aventura" }] },
  },
);

export function filterDestinations(region: MacroRegion, query = "") {
  const search = query.trim().toLocaleLowerCase("pt-BR");
  return destinations.filter((d) => (region === "Todos" || d.macroRegion === region) && `${d.name} ${d.region} ${d.summary} ${d.circuit.title}`.toLocaleLowerCase("pt-BR").includes(search));
}

export function destinationDescription(d: Destination) {
  return `${d.circuit.title}, em ${d.region}. ${d.summary} Esta é uma paisagem ilustrativa. ${d.attractions.map((p) => `${p.name}: ${p.desc}`).join(" ")} As condições de acessibilidade física não foram verificadas. Confirme terreno, rampas, sanitários acessíveis e apoio com os responsáveis antes de visitar.`;
}

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
  { id: "carro", label: "Carro", factor: 0.192 },
] as const;
export type TransportId = (typeof transports)[number]["id"];

export function carbonKg(km: number, transport: TransportId) {
  const t = transports.find((x) => x.id === transport);
  return Math.round(km * (t?.factor ?? 0) * 100) / 100;
}

/** Acima desta distância (km), a pé e bicicleta deixam de ser comparações realistas. */
export const ACTIVE_MAX_KM = 30;
const ACTIVE: TransportId[] = ["pe", "bike"];

/** Transportes viáveis para a distância informada. */
export function realisticTransports(km: number) {
  return transports.filter((t) => km <= ACTIVE_MAX_KM || !ACTIVE.includes(t.id));
}

/** Compensação prática: ações acessíveis no dia a dia, sem plantio direto de mudas. */
export function offsetSuggestions(kg: number) {
  return [
    `Apoie financeiramente ou como voluntário(a) uma ONG certificada de restauração, como a SOS Mata Atlântica, proporcional aos ${kg.toLocaleString("pt-BR")} kg CO₂ desta viagem.`,
    "Incentive projetos locais de conservação nas comunidades que você visitar.",
    "Participe de mutirões de limpeza de parques, praias e trilhas.",
    "Adote práticas permanentes de redução de resíduos: garrafa, talheres e sacola reutilizáveis.",
  ];
}

/** Distância de ida e volta a partir de São Paulo capital. */
export const tripKm: Record<string, number> = { peruibe: 280, guaruja: 180, bertioga: 210, paranapiacaba: 120, "sao-paulo": 20, jundiai: 120, brotas: 500 };

export const ecoTips = [
  { title: "Leve sua garrafinha", text: "Garrafas reutilizáveis evitam centenas de plásticos por ano." },
  { title: "Sacolas retornáveis", text: "Leve sua ecobag para compras e para recolher resíduos." },
  { title: "Recolha seu lixo", text: "Tudo que entra na trilha volta com você. Inclusive bitucas!" },
  { title: "Respeite fauna e flora", text: "Não alimente animais, não colha plantas, fique na trilha." },
  { title: "Valorize a comunidade", text: "Prefira guias, pousadas e comércio locais." },
];

export const rewards = [
  { id: "cobras", goal: 50, title: "Ilha da Queimada Grande", subtitle: "Artigo exclusivo: a Ilha das Cobras" },
  { id: "paranapiacaba", goal: 50, title: "Vila de Paranapiacaba: O Berço dos Ingleses", subtitle: "Artigo exclusivo: história e Mata Atlântica" },
  { id: "certificado", goal: 120, title: "Certificado Verde", subtitle: "Apoio a projetos sustentáveis locais" },
];
