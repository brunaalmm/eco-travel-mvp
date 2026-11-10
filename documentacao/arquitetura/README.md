# Arquitetura

## Pilha

- React e TypeScript para a interface.
- TanStack Start e TanStack Router para aplicacao e rotas baseadas em arquivos.
- Vite para desenvolvimento e build.
- Vitest para testes automatizados.

## Organizacao

- `src/routes/` contém as rotas e layouts; `src/routeTree.gen.ts` é gerado automaticamente.
- `src/components/` contém componentes compartilhados e provedores de estado.
- `src/lib/` contém dados e regras de domínio seguros para o navegador.
- `public/` contém recursos estáticos.
- `documentacao/` contém requisitos, diagramas, arquitetura e protótipos.

O catálogo compartilhado de destinos alimenta descoberta, detalhes, filtros, calculadora e mapa esquemático. Os registros do painel derivam desse catálogo. O painel usa um layout com páginas filhas e filtros compartilhados por contexto; relatórios PDF usam o mesmo recorte filtrado.

## Limites de integracao

Este remix não possui autenticação, banco de dados ou cliente Supabase ativos. O Drizzle foi removido. Credenciais e dados reais de perfil não devem ser persistidos; preferências anônimas podem ficar no armazenamento local. O estado de privacidade, notificações e rastreamento é demonstrativo, e a exportação offline é apenas textual.

A aparência de acessibilidade é aplicada por um provedor React na raiz. Recomendações são demonstrativas, determinísticas e não devem ser descritas como IA ou resultado de geolocalização verificada.

## Sincronizacao com Lovable

O repositório está conectado ao Lovable. Commits enviados para a branch conectada sincronizam com o editor. Não reescreva histórico publicado com force push, rebase, amend ou squash.