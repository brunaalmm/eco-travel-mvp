import { destinations } from "./data";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const containsAny = (text: string, terms: string[]) => {
  const paddedText = ` ${text} `;
  return terms.some((term) => paddedText.includes(` ${normalize(term)} `));
};

export const suggestions = [
  "Quais cuidados ter no litoral?",
  "O que levar na mochila de trilha?",
  "Como reduzir o lixo na viagem?",
  "Como chegar de transporte público?",
];

function destinationContext(destination: (typeof destinations)[number]) {
  const stops = destination.circuit.stops.slice(0, 4).map((stop) => stop.name).join(", ");
  const tours = destination.tours.slice(0, 2).map((tour) => tour.name).join(" e ");
  const food = destination.food.slice(0, 2).map((item) => item.name).join(" e ");

  return `\n\nEm ${destination.name}: ${destination.summary} Uma ideia é conhecer o circuito ${destination.circuit.title}, que passa por ${stops}. ${tours ? `Entre as experiências locais estão ${tours}. ` : ""}${food ? `Para valorizar a economia local, procure opções como ${food}. ` : ""}Confirme horários, acessos e regras de visitação com os responsáveis locais antes de sair.`;
}

export function answer(question: string) {
  const text = normalize(question);
  const destination = destinations.find((item) => text.includes(normalize(item.name)));
  const coastal = containsAny(text, ["litoral", "praia", "praias", "orla", "beira mar", "costeiro", "costa", "mar", "areia", "caiçara", "mangue", "manguezal", "restinga", "oceano"]);
  const trail = containsAny(text, ["trilha", "trilhas", "cachoeira", "caminhada", "montanha", "trekking", "parque natural", "parque estadual", "parque nacional", "unidade de conservacao", "area protegida"]);
  const gear = containsAny(text, ["mochila", "o que levar", "que levar", "o que preciso levar", "equipamento", "itens essenciais", "kit de trilha"]);
  const waste = containsAny(text, ["lixo", "lixo zero", "residuo", "residuos", "plastico", "descartavel", "descartaveis", "reciclagem", "descarte"]);
  const transport = containsAny(text, ["transporte publico", "onibus", "metro", "trem", "deslocamento", "carona", "bicicleta", "bike", "ciclovia", "balsa"]);
  const localBusiness = containsAny(text, ["comida", "comer", "restaurante", "comprar", "consumo", "comercio", "feira", "artesanato", "produtor local", "economia local"]);
  const fauna = containsAny(text, ["animal", "animais", "fauna", "passaro", "ave", "golfinho", "tartaruga", "coral", "bicho", "bichos"]);
  const itinerary = containsAny(text, ["roteiro", "visitar", "passeio", "o que fazer", "fim de semana", "itinerario", "destino"]);
  const urban = containsAny(text, ["urbano", "urbana", "cidade", "capital", "ciclovia", "ciclofaixa", "parque urbano"]);

  if (/^(oi|ola|bom dia|boa tarde|boa noite)$/.test(text)) {
    return "Olá! Posso ajudar você a planejar uma viagem pelo Brasil com escolhas mais cuidadosas. Quer conversar sobre transporte, trilhas, consumo local ou um roteiro?";
  }

  let response: string;

  if (coastal && gear && waste) {
    response = "Para um passeio no litoral com menos resíduos, leve água em garrafa reutilizável, lanche em potes, sacola para trazer seu lixo e uma bolsa separada para recicláveis. Recuse descartáveis quando possível, não enterre bitucas ou embalagens na areia e descarte os resíduos nos pontos corretos ao voltar. Em trilhas costeiras, caminhe apenas pelos acessos sinalizados para proteger a restinga e confira as regras da área antes de visitar.";
  } else if (coastal && gear) {
    response = "Para passar o dia no litoral, leve água em garrafa reutilizável, proteção solar, chapéu, lanche em pote e uma sacola para trazer de volta todos os resíduos. Se pretende fazer uma trilha costeira, use calçado adequado e confira maré, clima, acesso e necessidade de guia antes de sair.";
  } else if (coastal && waste) {
    response = "Na praia, evite descartáveis, leve uma sacola para trazer seus resíduos e recolha também itens pequenos como bitucas e tampinhas na faixa de areia. Não enterre nem deixe lixo no local: ele pode chegar ao mar e afetar a fauna. Use os pontos de coleta disponíveis e respeite as regras locais.";
  } else if (coastal && transport) {
    response = "Para chegar ao litoral, compare ônibus intermunicipais e transporte coletivo local, conferindo linhas, horários e conexões nos canais oficiais. Já na região, agrupe passeios próximos e caminhe em trechos seguros. Para áreas mais afastadas, procure uma carona confiável ou operador local regularizado e confirme o acesso antes da viagem.";
  } else if (coastal && trail) {
    response = "Em trilhas costeiras, confira a previsão do tempo, a maré, as condições de acesso e se é necessário acompanhamento de guia local. Permaneça no caminho autorizado, não atravesse áreas de restinga ou dunas fora das passagens permitidas e leve água e todos os resíduos de volta. Avise alguém sobre o percurso e respeite limites de visitação.";
  } else if (coastal && fauna) {
    response = "No litoral, observe aves, tartarugas e outros animais à distância. Não toque, alimente ou persiga a fauna; evite flashes e mantenha cães sob controle conforme as regras locais. Recolha seus resíduos e siga orientações de equipes e projetos de conservação da região.";
  } else if (coastal && localBusiness) {
    response = "No litoral, você pode fortalecer a economia caiçara comprando de pequenos comércios, feiras e produtores da região. Pergunte sobre a origem de pescados e alimentos, prefira opções da época e leve seus próprios recipientes para reduzir embalagens. Respeite costumes e espaços de trabalho das comunidades locais.";
  } else if (coastal && itinerary && destination) {
    response = `Para conhecer ${destination.name}, organize as paradas do circuito ${destination.circuit.title}: ${destination.circuit.stops.slice(0, 4).map((stop) => stop.name).join(", ")}. Agrupe locais próximos, confira condições do mar e do acesso e reserve tempo para experiências conduzidas por negócios locais.`;
  } else if (coastal) {
    response = "Para aproveitar o litoral com cuidado, prefira praias e áreas naturais com acesso autorizado, consulte as condições do mar e respeite orientações locais. Evite pisar na vegetação de restinga, não alimente animais, reduza descartáveis e apoie pequenos negócios da região. Se disser a cidade ou praia, posso sugerir um roteiro mais específico.";
  } else if (containsAny(text, ["carona", "carona solidaria", "carona compartilhada"])) {
    response = "Carona solidária pode reduzir o número de carros quando combinada com pessoas de confiança e com o trajeto e os custos acertados antes. Use cinto em todos os assentos, confirme que o veículo e o motorista estão regulares e compartilhe o plano da viagem com alguém. Para destinos atendidos, compare primeiro as opções de ônibus e trem.";
  } else if (urban) {
    response = "Em cidades e capitais, combine metrô, trem e ônibus para reduzir viagens de carro; confira integrações e horários nos canais oficiais. Para percursos curtos, use calçadas e ciclovias seguras, agrupe atrações próximas e visite parques urbanos sem sair das áreas sinalizadas. Feiras e comércios de bairro também ajudam a valorizar a economia local.";
  } else if (gear) {
    response = "Para uma trilha, leve água em garrafa reutilizável, lanche simples em pote, proteção solar, chapéu, repelente biodegradável e um pequeno kit de primeiros socorros. Use calçado adequado ao terreno e uma sacola para trazer todo o lixo de volta. Confira clima, duração, regras de acesso e necessidade de guia; evite itens descartáveis ou peso desnecessário.";
  } else if (transport) {
    response = "Para reduzir o impacto dos deslocamentos, veja primeiro se ônibus, trem ou metrô atendem o trajeto e confira linhas e horários nos canais oficiais. No destino, agrupe passeios próximos, caminhe ou pedale em trechos seguros e acessíveis. Quando o transporte coletivo não chegar até o passeio, combine uma carona confiável ou use um operador local regularizado.";
  } else if (trail) {
    response = "Para curtir uma trilha com cuidado, escolha um percurso autorizado e adequado ao seu preparo, confira clima e condições e veja se precisa de guia local. Avise alguém sobre o plano, permaneça no caminho sinalizado, não retire plantas nem alimente animais e traga todo o lixo de volta. Respeite limites de visitação e orientações da equipe local.";
  } else if (waste) {
    response = "Para reduzir resíduos durante a viagem, leve garrafa, copo e sacola reutilizáveis, recuse descartáveis quando puder e prefira alimentos com menos embalagem. Separe recicláveis conforme a coleta local e carregue o que produzir até encontrar um descarte adequado. Em áreas naturais, não deixe restos de comida ou lixo para trás.";
  } else if (localBusiness) {
    response = "Uma forma prática de apoiar o destino é comprar de pequenos negócios e produtores locais, escolher alimentos da época e perguntar sobre a origem dos produtos. Respeite os costumes da comunidade, reduza embalagens e prefira experiências conduzidas por profissionais locais.";
  } else if (fauna || containsAny(text, ["conservacao", "proteger", "preservar"])) {
    response = "Para observar a natureza sem pressionar a fauna, mantenha distância, não toque nem alimente os animais e evite sons altos, flashes ou chamariz. Prefira áreas autorizadas e condutores locais que sigam regras de conservação. Recolha seus resíduos e não retire plantas ou outros elementos do ambiente.";
  } else if (itinerary) {
    response = destination
      ? `Para conhecer ${destination.name} com mais calma, você pode começar pelo circuito ${destination.circuit.title}: ${destination.circuit.stops.slice(0, 4).map((stop) => stop.name).join(", ")}. Tente agrupar paradas próximas e reserve tempo para aproveitar os negócios e a cultura local, sem ultrapassar os limites das áreas naturais.`
      : `Posso ajudar a montar um roteiro. No catálogo há opções como ${destinations.slice(0, 5).map((item) => item.name).join(", ")} e ${destinations.slice(5).map((item) => item.name).join(", ")}. Diga qual cidade ou região do Brasil você pretende visitar e quantos dias terá para eu sugerir uma sequência mais adequada.`;
  } else if (containsAny(text, ["hospedagem", "hotel", "pousada", "ficar", "alojamento"])) {
    response = "Na hospedagem, priorize negócios locais com informações claras sobre água, energia, resíduos e contratação de moradores. Pergunte sobre transporte até os passeios, evite troca desnecessária de toalhas e lençóis e respeite as regras da comunidade e do lugar. Selos podem ajudar na comparação, mas vale conferir o que cada iniciativa realmente avalia.";
  } else if (containsAny(text, ["reserva", "reservar", "preco", "preço", "ingresso", "horario", "horário", "aberto hoje", "clima", "tempo agora"])) {
    response = "Não tenho acesso a horários, clima, disponibilidade ou preços em tempo real. Consulte os canais oficiais do parque, atração ou operador local antes de sair; para áreas protegidas, confirme também autorização, regras de visitação e necessidade de agendamento.";
  } else if (destination) {
    response = `Posso ajudar a explorar ${destination.name}. Uma boa base é o circuito ${destination.circuit.title}, com paradas como ${destination.circuit.stops.slice(0, 4).map((stop) => stop.name).join(", ")}. Prefira deslocamentos agrupados e confirme as condições de cada local antes da visita.`;
  } else {
    response = "Posso ajudar com ideias práticas de turismo sustentável no Brasil: transporte público e caronas, trilhas e áreas protegidas, consumo local, hospedagem ou roteiros. Conte também a cidade ou região que você tem em mente para receber sugestões mais contextualizadas.";
  }

  return destination && !itinerary
    ? `${response}${destinationContext(destination)}`
    : response;
}