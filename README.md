# EcoTravel

Aplicação demonstrativa para descoberta de turismo sustentável, acessível e inclusivo. O projeto apresenta destinos, estimativas educativas de carbono, recursos de acessibilidade e um painel de gestão com dados de demonstração.

Aplicação publicada: [eco-travel-mvp.lovable.app](https://eco-travel-mvp.lovable.app)

## Funcionalidades

- Descoberta de destinos e visualização de detalhes.
- Mapa esquemático e calculadora educativa de carbono.
- Assistente EcoBot com recomendacoes demonstrativas.
- Recursos de acessibilidade visual, leitura de conteúdo e demonstração de Libras.
- Painel de gestão, filtros e relatórios demonstrativos.

## Rotas principais

| Rota | Conteudo |
| --- | --- |
| `/` | Entrada demonstrativa |
| `/descobrir` | Descoberta de destinos |
| `/destino/:id` | Detalhes de um destino |
| `/mapa` | Mapa esquematico |
| `/eco` | Calculadora de carbono |
| `/ecobot` | Assistente demonstrativo |
| `/dashboard` | Painel publico de gestao |

## Tecnologias

React, TypeScript, TanStack Start/Router, Vite, Tailwind CSS e Vitest.

## Desenvolvimento local

Requisitos: Node.js compatível com a versão do Vite e npm.

```sh
npm install
npm run dev
```

Verificações e build de produção:

```sh
npm test
npm run build
```

## Escopo da demonstracao

O painel, perfis, credenciais e controles são demonstrativos; não há autenticação, banco de dados ou integração Supabase ativos. Preferências anônimas podem ser salvas localmente, mas credenciais e localização real não são persistidas nem enviadas. Uma integração real de contas requer aprovação e implementação específicas.

## Documentacao

A documentacao do projeto esta em [`documentacao/`](documentacao/README.md), organizada por requisitos, diagramas, arquitetura e prototipos.

## Lovable

O repositório sincroniza com o projeto [EcoTravel no Lovable](https://lovable.dev/projects/db46e759-a832-4a15-a7b0-776b655de7c2). Commits enviados para a branch conectada sincronizam com o editor. Não reescreva histórico já publicado com force push, rebase, amend ou squash.
