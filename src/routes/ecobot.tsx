import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCredits } from "@/lib/credits";
import { answer, suggestions } from "@/lib/ecobot";
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
  const { add, credits } = useCredits();
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, me: false, text: "Olá! Sou o EcoBot 🌱 Me pergunte qualquer coisa sobre turismo sustentável." },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const replyTimer = useRef<number | null>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: msgs.length > 1 || typing ? "smooth" : "auto" });
  }, [msgs, typing]);

  useEffect(() => () => {
    if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
  }, []);

  const send = (q: string) => {
    const query = q.trim();
    if (!query || typing) return;
    setMsgs((m) => [...m, { id: nextId.current++, me: true, text: query }]);
    setText("");
    setTyping(true);
    replyTimer.current = window.setTimeout(() => {
      setMsgs((m) => [...m, { id: nextId.current++, me: false, text: answer(query) }]);
      setTyping(false);
      replyTimer.current = null;
      add(5);
    }, 650);
  };

  return (
    <AppShell title="EcoBot">
      <section className="-mb-28 flex h-[calc(100dvh-4rem)] min-h-[26rem] flex-col overflow-hidden lg:-mb-16 lg:h-[calc(100dvh-5rem)] lg:min-h-[32rem]">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-5 py-4 lg:px-8">
          <img src={botJoy} alt="" className="h-11 w-11 shrink-0 object-contain" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg font-semibold">EcoBot</h1>
            <p className="text-[11px] leading-4 text-muted-foreground">Guia educativo de turismo sustentável</p>
          </div>
          <div className="shrink-0 text-right text-[10px] leading-4 text-muted-foreground" aria-label={`Você ganha 5 créditos por pergunta. Saldo: ${credits} créditos.`}>
            <p className="flex items-center justify-end gap-1 font-semibold text-primary"><Sparkles className="h-3 w-3" />+5 por pergunta</p>
            <p aria-live="polite">Saldo: {credits} créditos</p>
          </div>
        </div>

        <div
          ref={list}
          role="log"
          aria-label="Conversa com o EcoBot"
          aria-live="polite"
          className="mx-auto min-h-0 w-full max-w-3xl flex-1 space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-5 pb-40 lg:px-8 lg:pb-24"
        >
          {msgs.map((m) => (
            <div key={m.id} className={`animate-chat-message flex items-end gap-2 ${m.me ? "justify-end" : ""}`}>
              {!m.me && <img src={botHappy} alt="" className="h-8 w-8 shrink-0 object-contain" />}
              <p className={`max-w-[88%] whitespace-pre-line break-words rounded-3xl px-4 py-3 text-sm leading-relaxed ${m.me ? "rounded-br-md bg-forest text-forest-foreground" : "rounded-bl-md bg-card shadow-soft"}`}>{m.text}</p>
            </div>
          ))}
          {typing && (
            <div className="animate-chat-message flex items-end gap-2">
              <img src={botLoading} alt="" className="h-8 w-8 shrink-0 object-contain" />
              <p className="flex gap-1 rounded-3xl rounded-bl-md bg-card px-4 py-3.5 shadow-soft" aria-label="EcoBot digitando">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 140}ms` }} />
                ))}
              </p>
            </div>
          )}
          {msgs.length === 1 && !typing && (
            <div className="ml-10 flex max-w-2xl flex-wrap gap-2 pt-1" aria-label="Sugestões para começar">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-full bg-accent px-3.5 py-2 text-left text-xs font-medium text-primary transition-colors hover:bg-leaf/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-1/2 z-30 w-full max-w-[440px] -translate-x-1/2 bg-background/95 px-4 pb-2 pt-2 backdrop-blur lg:bottom-0 lg:max-w-2xl lg:px-0 lg:pb-4">
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-soft">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Pergunte sobre sua viagem..."
              aria-label="Sua pergunta para o EcoBot"
              autoComplete="off"
              enterKeyHint="send"
              className="h-11 w-full min-w-0 bg-transparent text-sm outline-none"
            />
            <button type="submit" disabled={typing || !text.trim()} aria-label="Enviar mensagem" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-forest-foreground transition-opacity disabled:opacity-40">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
