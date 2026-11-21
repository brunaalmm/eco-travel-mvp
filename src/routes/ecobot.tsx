import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCredits } from "@/lib/credits";
import { answer, suggestions } from "@/lib/ecobot";
import botHappy from "@/assets/bot-happy.png";

export const Route = createFileRoute("/ecobot")({
  head: () => ({
    meta: [
      { title: "EcoBot" },
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
      <section className="flex h-full min-h-0 flex-col overflow-hidden lg:h-[calc(100dvh-5rem)]">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-5 py-4 lg:px-8">
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
          className="mx-auto min-h-0 w-full max-w-3xl flex-1 touch-pan-y space-y-4 overflow-y-auto overscroll-y-contain px-5 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-8 lg:pb-24"
        >
          {msgs.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.me ? "justify-end" : ""}`}>
              {!m.me && (
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#06402B]">
                  <img
                    src={botHappy}
                    alt=""
                    width={44}
                    height={44}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    className="h-full w-full origin-top scale-[1.15] object-contain"
                  />
                </div>
              )}
              <p
                className={`max-w-[88%] whitespace-pre-line break-words rounded-3xl px-4 py-3 text-sm leading-relaxed ${m.me ? "rounded-br-md bg-[#557A5E] text-white" : "rounded-bl-md bg-card shadow-soft"}`}
              >
                {m.text}
              </p>
            </div>
          ))}
          {typing && (
            <div className="flex items-end gap-2">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#06402B]">
                <img src={botHappy} alt="" width={44} height={44} className="h-full w-full origin-top scale-[1.15] object-contain" />
              </div>
              <p className="flex gap-1 rounded-3xl rounded-bl-md bg-card px-4 py-3.5 shadow-soft" aria-label="EcoBot digitando">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                ))}
              </p>
            </div>
          )}
        </div>

        <div className="relative z-30 mx-auto w-full max-w-[440px] shrink-0 bg-background/95 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:fixed lg:bottom-0 lg:left-1/2 lg:mx-0 lg:-translate-x-1/2 lg:max-w-2xl lg:px-0 lg:pb-4">
          {msgs.length === 1 && !typing && (
            <div
              className="flex scroll-smooth gap-2 overflow-x-auto whitespace-nowrap pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Sugestões para começar"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="shrink-0 rounded-full border border-stone-200/80 bg-[#F5F2EB] px-3.5 py-2 text-left text-xs font-medium text-stone-800 transition-colors duration-150 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 rounded-full border-0 bg-white p-1.5 pl-5 shadow-sm">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Pergunte sobre sua viagem..."
              aria-label="Sua pergunta para o EcoBot"
              autoComplete="off"
              enterKeyHint="send"
              className="h-11 w-full min-w-0 !outline-none !ring-0 !border-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 shadow-none bg-transparent text-sm"
            />
            <button type="submit" disabled={typing || !text.trim()} aria-label="Enviar mensagem" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-forest-foreground transition-opacity duration-150 disabled:opacity-40">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
