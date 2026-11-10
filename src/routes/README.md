# Rotas

O TanStack Start usa roteamento baseado em arquivos. Cada arquivo `.tsx` nesta pasta define uma rota. O layout raiz fica em `src/routes/__root.tsx`; preserve o `<Outlet />` que renderiza a rota ativa.

Não crie estruturas de páginas ou layouts de Next.js/Remix, como `src/pages/`, `src/routes/_app/index.tsx` ou `app/layout.tsx`.

## Convenções

| Arquivo | URL |
| --- | --- |
| `index.tsx` | `/` |
| `destino.$id.tsx` | `/destino/:id` |
| `dashboard.tsx` | layout compartilhado do painel |
| `dashboard.*.tsx` | paginas filhas do painel |
| `__root.tsx` | estrutura raiz da aplicacao |

`routeTree.gen.ts` é gerado automaticamente; não o edite manualmente.
