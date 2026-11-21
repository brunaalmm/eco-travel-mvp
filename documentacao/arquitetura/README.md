# Arquitetura

## Tecnologias
- **Interface:** React, TypeScript e Tailwind CSS com design responsivo *mobile-first*.
- **Roteamento:** TanStack Start e TanStack Router para aplicação e rotas baseadas em arquivos.
- **Build e Desenvolvimento:** Vite para desenvolvimento e build otimizado.
- **Testes Automatizados:** Vitest para validação de regras de domínio e componentes.

## Organização do Projeto
- `src/routes/` — Contém as rotas e layouts da aplicação (`src/routeTree.gen.ts` é gerado automaticamente pelo roteador).
- `src/components/` — Contém os componentes compartilhados, telas dos fluxos (Turista e Gestor) e provedores de estado/acessibilidade.
- `src/lib/` — Contém a base de destinos, fatores ambientais e regras de domínio executadas no navegador.
- `public/` — Contém os recursos estáticos e ativos visuais.
- `documentacao/` — Contém requisitos, diagramas de arquitetura e protótipos.

## Fluxo de Dados e Acessibilidade
- **Catálogo Compartilhado:** O catálogo centralizado de destinos alimenta as telas de descoberta, detalhes, filtros regionais, calculadora de $\text{CO}_2$ e mapa esquemático.
- **Painel de Gestão e Relatórios:** Os registros do painel derivam do catálogo monitorado, utilizando um layout com páginas filhas e filtros compartilhados por contexto que também abastecem a exportação de relatórios em PDF.
- **Acessibilidade e Preferências:** Os controles de alto contraste, tema claro/escuro e ampliação de fonte são aplicados globalmente por um provedor React na raiz da aplicação, enquanto as preferências de navegação permanecem salvas no armazenamento local do navegador.

## Sincronização com Lovable
- O repositório está conectado ao editor **Lovable**; commits enviados para a branch conectada sincronizam automaticamente com a interface.
- Não reescreva o histórico publicado (`force push`, `rebase`, `amend` ou `squash`) na branch sincronizada.
