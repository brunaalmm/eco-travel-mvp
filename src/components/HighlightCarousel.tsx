import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import botJump from "@/assets/bot-jump.png";
import botWave from "@/assets/bot-wave.png";
import botJoy from "@/assets/bot-joy.png";

const banners = [
  { tag: "Em destaque", title: "Rotas verdes", text: "Circuitos que conectam praias, trilhas e unidades de conservação com baixo impacto.", to: "/mapa", cta: "Ver no mapa", img: botJump, tone: "bg-forest text-forest-foreground" },
  { tag: "Turismo regenerativo", title: "Deixe o lugar melhor", text: "Apoie guias, pousadas e cozinhas das comunidades caiçaras, indígenas e quilombolas.", to: "/sobre", cta: "Conheça a proposta", img: botWave, tone: "bg-leaf text-leaf-foreground" },
  { tag: "Compromisso climático", title: "Sua pegada de carbono", text: "Compare transportes realistas para a sua viagem e descubra como compensar.", to: "/eco", cta: "Calcular agora", img: botJoy, tone: "bg-card text-foreground" },
] as const;

export function HighlightCarousel() {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  useEffect(() => {
    const t = setInterval(() => { if (!paused.current) setI((v) => (v + 1) % banners.length); }, 5000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((v) => (v + d + banners.length) % banners.length);

  return (
    <div className="relative h-full" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="h-full overflow-hidden rounded-3xl shadow-soft">
        <div className="flex h-full transition-transform duration-150 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {banners.map((b, k) => (
            <div key={b.title} aria-hidden={k !== i} className={`grid h-full min-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-5 pb-14 lg:p-8 lg:pb-16 ${b.tone}`}>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-75">{b.tag}</span>
                <p className="mt-1 font-display text-xl font-semibold lg:text-3xl">{b.title}</p>
                <p className="mt-1 text-sm opacity-80 lg:text-base">{b.text}</p>
                <Link to={b.to} tabIndex={k === i ? 0 : -1} className="mt-3 inline-block rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold text-foreground">{b.cta}</Link>
              </div>
              <img
                src={b.img}
                alt=""
                width={144}
                height={144}
                loading="eager"
                decoding="async"
                fetchPriority={k === 0 ? "high" : "auto"}
                className="h-24 w-24 shrink-0 object-contain lg:h-36 lg:w-36"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-nowrap items-center justify-center gap-3 rounded-full bg-background/90 px-3 py-1.5 shadow-soft">
        <button aria-label="Anterior" onClick={() => go(-1)} className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card shadow-soft"><ChevronLeft className="h-4 w-4" /></button>
        {banners.map((b, k) => (
          <button key={b.title} aria-label={b.title} onClick={() => setI(k)} className={`h-1.5 shrink-0 rounded-full transition-colors duration-150 ${k === i ? "w-6 bg-forest" : "w-1.5 bg-muted-foreground/30"}`} />
        ))}
        <button aria-label="Próximo" onClick={() => go(1)} className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card shadow-soft"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
