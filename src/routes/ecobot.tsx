import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCredits } from "@/lib/credits";
import { answer, suggestions, quiz, quizResult } from "@/lib/ecobot";
import type { TransportId } from "@/lib/data";
import botHappy from "@/assets/bot-happy.png";
import botJoy from "@/assets/bot-joy.png";
import botLoading from "@/assets/bot-loading.png";

export const Route = createFileRoute("/ecobot")({
  head: () => ({
    meta: [
      { title: "EcoBot — Assistente de turismo sustentável | EcoTravel" },
      { name: "description", content: "Tire dúvidas sobre trilhas, fauna, resíduos e sustentabilidade com o EcoBot." },
      { property: "og:title", content: "EcoBot — Assistente de turismo sustentável" },
      { property: "og:description", content: "Converse com o EcoBot sobre boas práticas ambientais em viagem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EcoBotPage,
});

type Msg = { id: number; me: boolean; text: string };

function EcoBotPage() {
  const { add } = useCredits();
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, me: false, text: "Olá! Sou o EcoBot 🌱 Me pergunte qualquer coisa sobre turismo sustentável." },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (q: string) => {
    const query = q.trim();
    if (!query || typing) return;
    setMsgs((m) => [...m, { id: nextId.current++, me: true, text: query }]);
    setText("");
    setTyping(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { id: nextId.current++, me: false, text: answer(query) }]);
      setTyping(false);
      add(5);
    }, 650);
  };

  return (
    <AppShell title="EcoBot">
      <section className="flex flex-col px-5 pt-5 lg:mx-auto lg:w-full lg:max-w-2xl lg:pt-8">
        <div className="flex items-center gap-3 rounded-3xl bg-forest p-4 text-forest-foreground">
          <img src={botJoy} alt="EcoBot" className="h-14 w-14 shrink-0 object-contain animate-float" />
          <div className="min-w-0">
            <h1 className="font-display font-semibold">EcoBot</h1>
            <p className="text-xs opacity-70">Guia educativo · cada pergunta vale +5 créditos</p>
          </div>
        </div>

        <div ref={list} className="mt-4 h-[calc(100vh-24rem)] min-h-64 space-y-3 overflow-y-auto pr-1 lg:h-[calc(100vh-22rem)]">
          {msgs.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 animate-rise ${m.me ? "justify-end" : ""}`}>
              {!m.me && <img src={botHappy} alt="" className="h-8 w-8 shrink-0 object-contain" />}
              <p className={`max-w-[78%] rounded-3xl px-4 py-2.5 text-sm ${m.me ? "rounded-br-md bg-forest text-forest-foreground" : "rounded-bl-md bg-card shadow-soft"}`}>{m.text}</p>
            </div>
          ))}
          {typing && (
            <div className="flex items-end gap-2 animate-rise">
              <img src={botLoading} alt="" className="h-8 w-8 shrink-0 object-contain" />
              <p className="flex gap-1 rounded-3xl rounded-bl-md bg-card px-4 py-3.5 shadow-soft" aria-label="EcoBot digitando">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animation: `typing-dot 1s ${d * 0.15}s infinite` }} />
                ))}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} type="button" disabled={typing} onClick={() => send(s)}
              className="rounded-full border border-primary/40 bg-card px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-accent disabled:opacity-50">
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="mt-3 flex items-center gap-2 rounded-full bg-card p-1.5 pl-5 shadow-soft">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Pergunte ao EcoBot..." className="w-full min-w-0 bg-transparent text-sm outline-none" />
          <button type="submit" disabled={typing} aria-label="Enviar" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-forest-foreground disabled:opacity-50"><Send className="h-4 w-4" /></button>
        </form>
        <Quiz onAnswer={() => add(5)} />
      </section>
    </AppShell>
  );
}

function Quiz({ onAnswer }: { onAnswer: () => void }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<TransportId | null>(null);
  const q = quiz[step] ?? quiz[0]!;
  const result = picked ? quizResult(q.km, picked) : null;
  return (
    <section aria-labelledby="quiz-title" className="mt-8 mb-4 rounded-3xl bg-card p-5 shadow-soft">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Mini-quiz de impacto · {step + 1} de {quiz.length}</p>
      <h2 id="quiz-title" className="mt-1 font-semibold">{q.question}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {q.options.map((o) => (
          <button key={o.t} type="button" aria-pressed={picked === o.t} onClick={() => { if (!picked) onAnswer(); setPicked(o.t); }}
            className={`rounded-full px-4 py-2 text-sm font-medium ${picked === o.t ? "bg-forest text-forest-foreground" : "border border-border bg-background"}`}>{o.label}</button>
        ))}
      </div>
      {result && (
        <div role="status" className="mt-4 rounded-2xl bg-accent p-3 text-sm">
          <b>{result.kg.toLocaleString("pt-BR")} kg CO₂</b> por pessoa.{" "}
          {result.saved > 0 ? `Você evitou ${result.saved.toLocaleString("pt-BR")} kg em relação ao carro. 🌱` : "Essa é a opção mais poluente — compare com as outras."}
        </div>
      )}
      <button type="button" disabled={!picked} onClick={() => { setPicked(null); setStep((step + 1) % quiz.length); }}
        className="mt-4 text-sm font-semibold text-primary disabled:opacity-40">{step === quiz.length - 1 ? "Recomeçar quiz" : "Próximo cenário →"}</button>
    </section>
  );
}
