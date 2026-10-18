import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Send, Calculator, MessageCircle, TreePine } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { destinations, transports, carbonKg, treesToOffset, tripKm, type TransportId } from "@/lib/data";
import { useCredits } from "@/lib/credits";
import botHappy from "@/assets/bot-happy.png";
import botRight from "@/assets/bot-right.png";
import botWrong from "@/assets/bot-wrong.png";
import botJoy from "@/assets/bot-joy.png";

export const Route = createFileRoute("/eco")({
  head: () => ({
    meta: [
      { title: "Calculadora de carbono e EcoBot — EcoTravel" },
      { name: "description", content: "Calcule a pegada de carbono da sua viagem e tire dúvidas sobre turismo sustentável com o EcoBot." },
      { property: "og:title", content: "Calculadora de carbono e EcoBot — EcoTravel" },
      { property: "og:description", content: "Calcule o CO₂ da sua viagem e aprenda com o EcoBot." },
    ],
  }),
  component: Eco,
});

function Eco() {
  const [tab, setTab] = useState<"calc" | "chat">("calc");
  return (
    <AppShell title="EcoBot">
      <div className="px-5 pt-5">
        <div className="grid grid-cols-2 rounded-full bg-card p-1 shadow-soft">
          {([["calc", "Calculadora", Calculator], ["chat", "Chat EcoBot", MessageCircle]] as const).map(([k, l, I]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium ${tab === k ? "bg-forest text-forest-foreground" : ""}`}>
              <I className="h-4 w-4" />{l}
            </button>
          ))}
        </div>
      </div>
      {tab === "calc" ? <Calc /> : <Chat />}
    </AppShell>
  );
}

function Calc() {
  const { add } = useCredits();
  const [route, setRoute] = useState("peruibe");
  const [km, setKm] = useState(String(tripKm["peruibe"]));
  const [t, setT] = useState<TransportId>("onibus");
  const [result, setResult] = useState<null | { kg: number; car: number; t: TransportId }>(null);

  const calc = () => {
    const d = Math.max(0, Number(km) || 0);
    const r = { kg: carbonKg(d, t), car: carbonKg(d, "carro"), t };
    setResult(r);
    add(t === "carro" ? 5 : 15);
  };
  const clean = result && result.t !== "carro";

  return (
    <section className="px-5 pt-6">
      <h1 className="text-2xl font-semibold">Pegada de carbono</h1>
      <p className="mt-1 text-sm text-muted-foreground">Selecione um roteiro já realizado e o transporte usado.</p>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roteiro</label>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {destinations.map((d) => (
          <button key={d.id} onClick={() => { setRoute(d.id); setKm(String(tripKm[d.id])); }}
            className={`rounded-2xl py-3 text-sm font-medium ${route === d.id ? "bg-forest text-forest-foreground" : "bg-card shadow-soft"}`}>{d.name}</button>
        ))}
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="km">Distância (ida e volta)</label>
      <div className="mt-2 flex items-center rounded-2xl bg-card px-4 shadow-soft">
        <input id="km" inputMode="decimal" value={km} onChange={(e) => setKm(e.target.value.replace(/[^\d.]/g, ""))} className="h-12 w-full bg-transparent text-lg font-semibold outline-none" />
        <span className="text-sm text-muted-foreground">km</span>
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transporte</label>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {transports.map((x) => (
          <button key={x.id} onClick={() => setT(x.id)}
            className={`rounded-2xl py-3 text-sm font-medium ${t === x.id ? "bg-leaf text-leaf-foreground" : "bg-card shadow-soft"}`}>{x.label}</button>
        ))}
      </div>

      <Button variant="forest" className="mt-6 w-full" onClick={calc}>Calcular CO₂</Button>

      {result && (
        <div className="mt-6 animate-rise rounded-3xl bg-card p-5 shadow-soft">
          <div className="flex items-center gap-4">
            <img src={clean ? botRight : botWrong} alt="EcoBot" className="h-20 w-auto shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Emissão estimada</p>
              <p className="font-display text-4xl font-semibold">{result.kg}<span className="text-lg"> kg CO₂</span></p>
            </div>
          </div>
          <p className={`mt-4 rounded-2xl p-3 text-sm ${clean ? "bg-accent" : "bg-destructive/10 text-destructive"}`}>
            {clean
              ? `Parabéns! Você evitou ${Math.round((result.car - result.kg) * 10) / 10} kg de CO₂ em relação ao carro. +15 créditos verdes 🌱`
              : "Alerta: o carro é o meio mais poluente para essa viagem. Da próxima vez, tente ônibus ou divida a carona. +5 créditos"}
          </p>
          <div className="mt-4 space-y-2">
            <Bar label="Sua viagem" value={result.kg} max={Math.max(result.car, 0.01)} tone="bg-leaf" />
            <Bar label="Se fosse de carro" value={result.car} max={Math.max(result.car, 0.01)} tone="bg-forest" />
          </div>
          {result.kg > 0 && (
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <TreePine className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Para compensar, plante cerca de {treesToOffset(result.kg)} muda(s) nativa(s) da Mata Atlântica ou apoie projetos de restauração locais.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs"><span>{label}</span><b>{value} kg</b></div>
      <div className="mt-1 h-2.5 rounded-full bg-muted"><div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.max(2, (value / max) * 100)}%` }} /></div>
    </div>
  );
}

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

function answer(q: string) {
  const s = q.toLowerCase();
  return faq.find((f) => f.k.some((k) => s.includes(k)))?.a ??
    "Boa pergunta! Ainda estou aprendendo sobre isso. Experimente perguntar sobre trilhas, lixo, fauna, hospedagem, gastronomia ou carbono.";
}

const suggestions = ["Como cuidar do lixo na trilha?", "Posso alimentar animais?", "O que é a Ilha das Cobras?", "Ônibus ou carro?"];

function Chat() {
  const { add } = useCredits();
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: "Olá! Sou o EcoBot 🌱 Me pergunte qualquer coisa sobre turismo sustentável no litoral paulista." },
  ]);
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { me: true, text: q }, { me: false, text: answer(q) }]);
    setText("");
    add(5);
  };

  return (
    <section className="flex flex-col px-5 pt-5">
      <div className="flex items-center gap-3 rounded-3xl bg-forest p-4 text-forest-foreground">
        <img src={botJoy} alt="EcoBot" className="h-14 w-auto shrink-0 animate-float" />
        <div><p className="font-display font-semibold">EcoBot</p><p className="text-xs opacity-70">Guia educativo · cada pergunta vale +5 créditos</p></div>
      </div>
      <div className="mt-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 animate-rise ${m.me ? "justify-end" : ""}`}>
            {!m.me && <img src={botHappy} alt="" className="h-8 w-auto shrink-0" />}
            <p className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm ${m.me ? "rounded-br-md bg-leaf text-leaf-foreground" : "rounded-bl-md bg-card shadow-soft"}`}>{m.text}</p>
          </div>
        ))}
        <div ref={end} />
      </div>
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)} className="shrink-0 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary">{s}</button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="mt-3 flex items-center gap-2 rounded-full bg-card p-1.5 pl-5 shadow-soft">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Pergunte ao EcoBot..." className="w-full bg-transparent text-sm outline-none" />
        <button type="submit" aria-label="Enviar" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-forest-foreground"><Send className="h-4 w-4" /></button>
      </form>
    </section>
  );
}
