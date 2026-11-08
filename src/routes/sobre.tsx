import { createFileRoute } from "@tanstack/react-router";
import { Compass, Calculator, Bot, Award } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import botWave from "@/assets/bot-wave.png";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o EcoTravel — Turismo sustentável e consciente" },
      { name: "description", content: "Conheça o EcoTravel, solução inteligente para viajar com baixo impacto socioambiental." },
      { property: "og:title", content: "Sobre o EcoTravel" },
      { property: "og:description", content: "Solução inteligente para o turismo sustentável e consciente em todo o país." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sobre,
});

const pillars = [
  { icon: Compass, title: "Planejamento Consciente", text: "Acesso a roteiros detalhados e curados com foco na preservação da biodiversidade, valorização da cultura local e apoio às comunidades." },
  { icon: Calculator, title: "Calculadora de Pegada de Carbono", text: "Ferramenta interativa que estima o impacto do deslocamento, compara modais de transporte em busca de alternativas limpas e sugere formas reais de compensação ecológica." },
  { icon: Bot, title: "EcoBot (Assistente Virtual)", text: "Um guia inteligente baseado em boas práticas ambientais, pronto para tirar dúvidas sobre comportamento em trilhas, conservação e sustentabilidade em tempo real." },
  { icon: Award, title: "Sistema de Créditos Verdes (Gamificação)", text: "Recompensas e desbloqueio de conteúdos educativos exclusivos." },
];

function Sobre() {
  return (
    <AppShell title="Sobre">
      <article className="px-5 pt-6 lg:mx-auto lg:max-w-3xl lg:pt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-3xl bg-forest p-6 text-forest-foreground">
          <h1 className="text-3xl font-semibold lg:text-4xl">Sobre o EcoTravel</h1>
          <img src={botWave} alt="EcoBot" className="h-20 w-20 shrink-0 object-contain lg:h-28 lg:w-28" />
        </div>
        <p className="mt-6 leading-relaxed">
          O EcoTravel é uma solução inteligente de software voltada para o turismo sustentável e consciente. Desenvolvido como parte dos projetos de engenharia e inovação, nosso propósito é transformar a experiência de viajar, conectando o usuário a destinos, roteiros e práticas de baixo impacto socioambiental em todo o país.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Vivemos em um cenário onde o turismo de massa gera sobrecarga nos recursos naturais, superlotação de destinos e pressão nas comunidades locais. Diante disso, o EcoTravel surge como uma assistente pessoal inteligente projetada para orientar o viajante em cada etapa da jornada:
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl bg-card p-5 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-leaf text-leaf-foreground"><Icon className="h-5 w-5" /></span>
              <h2 className="mt-3 font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </article>
    </AppShell>
  );
}
