# 🌱 EcoTravel

### Um jeito mais consciente de viajar. Conecte-se com a natureza. Viaje com um propósito.

**Experimente agora:** [eco-travel-projeto.lovable.app](https://eco-travel-projeto.lovable.app)

O **EcoTravel** é uma solução inteligente voltada ao turismo sustentável, uma aplicação web responsiva com fluxos para turistas e gestores. A ideia principal é evoluir o projeto para um **aplicativo**, a experiência do usuário foi construída priorizando o **design e a navegação de aplicativo móvel** (*mobile-first*).

Parte de um projeto de engenharia de software, a proposta transforma o planejamento de viagens em um ecossistema educativo e inclusivo, gerando impacto positivo nos três pilares **ESG**:

- **Ambiental (Environmental):** Foco na redução da pegada de carbono e proteção do meio ambiente por meio do comparativo entre meios de transporte e escolha de roteiros de baixo impacto.
- **Social (Social):** Foco no aumento da conscientização e do engajamento da população e das empresas, promovendo o ecoturismo.
- **Governança (Governance):** Foco na superação da dificuldade de mensurar o impacto real e no estímulo a serviços turísticos verdes.

## O problema

A sustentabilidade no turismo ainda não é um padrão, e o modelo tradicional de turismo de massa acaba sobrecarregando a natureza, gerando superlotação e prejudicando os moradores locais. Hoje, quem quer viajar ou gerir destinos de forma consciente enfrenta cinco barreiras principais:

- **Falta de transparência:** é difícil saber quais roteiros realmente preservam o meio ambiente e comparar o quanto cada transporte polui.
- **Impacto na natureza e na comunidade:** o excesso de turistas sem planejamento gera muito lixo, falta de água e encarece o custo de vida de quem mora na região.
- **Falta de acessibilidade digital:** a maioria dos sites e apps de viagem não oferece leitura adaptada, alto contraste, Libras ou audiodescrição.
- **Falta de ferramentas educativas:** faltam ferramentas simples que mostrem ao turista comum como reduzir seu impacto no dia a dia.
- **Dificuldade de gestão:** gestores locais não têm painéis visuais simples para acompanhar a lotação dos roteiros, emissões de carbono e selos ecológicos.

## A solução

O **EcoTravel** reúne, em uma única interface, ferramentas para o turista e para o gestor:

1. **Descubra roteiros sustentáveis** com busca, filtros regionais e compatibilidade demonstrativa com suas preferências.
2. **Explore um mapa esquemático** com destinos, paradas de circuitos e estimativas de distância, tempo e emissões — sem navegação em tempo real.
3. **Estime sua pegada de carbono** comparando transportes disponíveis e receba sugestões de ações ambientais, sem cálculo de compensação certificada.
4. **Converse com o EcoBot**, um assistente demonstrativo que oferece respostas e dicas por regras predefinidas.
5. **Use recursos de acessibilidade**, como alto contraste, ajuste de fonte, audiodescrição com voz sintetizada em conteúdos compatíveis e uma demonstração em Libras.
6. **Consulte o Painel do Gestor**, com indicadores reais, dados demonstrativos de ocupação dos roteiros, aprovações simuladas e exportação de relatórios em PDF.

O catálogo demonstrativo inclui sete destinos. Em cada página de destino, o visitante encontra resumo, região, atrativos, hospedagem, gastronomia e passeios, além do acesso ao circuito no mapa esquemático.

## Funcionalidades — Requisitos Funcionais

| ID | Nome | Descrição | Prioridade | Envolve IA? |
| --- | --- | --- | --- | --- |
| RF01 | Cadastro e Login de Usuários | Tela de acesso com seleção de perfil (**Turista** ou **Gestor**), formulário de entrada/cadastro por e-mail e opções de login social para liberar os fluxos do sistema. | Must Have | Não |
| RF02 | Personalização de Preferências | Fluxo de onboarding em quatro passos (origem, estilo de ecoturismo, transporte preferido e foco ambiental) para adaptar a exibição e ordenação dos roteiros. | Must Have | Sim |
| RF03 | Recomendação de Destinos Sustentáveis | Sugestão de roteiros ecológicos com base no perfil do viajante e indicadores de afinidade ambiental para incentivar escolhas de baixo impacto. | Must Have | Sim |
| RF04 | Mecanismo de Busca e Filtros | Barra de pesquisa e filtros por região (**Litoral**, **Região Metropolitana / Grande SP** e **Interior**) para localizar destinos, cidades e circuitos. | Must Have | Não |
| RF05 | Visualização em Mapa | Mapa esquemático integrado aos roteiros, exibindo pontos turísticos ecológicos, paradas do circuito, distância, tempo estimado e emissão calculada. | Must Have | Não |
| RF06 | Calculadora de Pegada de Carbono | Ferramenta interativa para estimar e comparar emissões de $\text{CO}_2$ por distância e meio de transporte (carro, ônibus, bicicleta e trilha a pé), com sugestões de compensação ambiental. | Must Have | Não |
| RF07 | Assistente Virtual (EcoBot) | Chatbot interativo para tirar dúvidas sobre sustentabilidade, boas práticas locais e escolha de transportes e roteiros conscientes. | Must Have | Sim |
| RF08 | Sistema de Créditos Verdes | Sistema de progresso e engajamento em que o usuário acumula créditos verdes ao utilizar as ferramentas ambientais e pode trocá-los por conteúdos educativos e certificado digital. | Should Have | Não |
| RF09 | Simulação de Clima | Widget na tela Descobrir com cenários climáticos (ensolarado, chuva, vento e frio) que exibe recomendações práticas para o planejamento do passeio. | Should Have | Não |
| RF10 | Recursos de Acessibilidade Digital | Controles de alto contraste, modo claro/escuro, ajuste de tamanho de fonte, audiodescrição por voz com transcrição e vídeo de saudação em Libras. | Must Have | Não |
| RF11 | Painel de Gestão e Indicadores | Dashboard para gestores com métricas de emissões de $\text{CO}_2$ por transporte, metas ambientais e acompanhamento da ocupação e capacidade de suporte dos roteiros. | Must Have | Não |
| RF12 | Aprovação de Roteiros e Selos | Fluxo de gestão que permite avaliar, aprovar ou rejeitar roteiros e parceiros ecológicos na plataforma. | Should Have | Não |
| RF13 | Relatório Executivo em PDF | Visualização prévia e exportação em PDF dos indicadores consolidados de emissões, metas ambientais e status dos roteiros monitorados. | Should Have | Não |
| RF14 | Detalhes do Destino e Guia Offline | Página completa de cada roteiro (atrativos, hospedagem, gastronomia e avaliações) e opção de baixar um guia textual para consulta sem internet. | Must Have | Não |

## Por que o EcoTravel é diferente

- **Acessibilidade como princípio:** oferece alto contraste, modo claro/escuro, ajuste de fonte, audiodescrição com transcrição e suporte visual em Libras.
- **Educação ambiental prática:** transforma estimativas de emissões de CO₂ em comparações simples entre meios de transporte e sugestões de ações no dia a dia.
- **Gamificação com propósito:** incentiva hábitos conscientes por meio de créditos verdes que desbloqueiam conteúdos educativos e certificado digital de impacto.
- **Visão dupla — Turista e Gestor:** une descoberta e planejamento de roteiros para viajantes com painel de indicadores, metas ambientais e relatórios em PDF para gestores.
- **Indicadores baseados em dados reais:** utiliza referências do Inventário Nacional de Emissões Atmosféricas por Veículos Automotores Rodoviários (INEAVAR 2024) para contextualizar o impacto dos transportes.
- **Experiência responsiva:** a interface se adapta a dispositivos móveis e desktops e usa React, TypeScript, TanStack Start/Router, Vite e Tailwind CSS.

## Como o EcoTravel funciona por dentro

```text
┌───────────────────┐       ┌────────────────────────────────┐
│ Você (navegador)  │ ────▶ │ Aplicação web EcoTravel        │
└───────────────────┘       │ React • TypeScript • Vite      │
                            │ TanStack Start e Router        │
                            └───────────────┬────────────────┘
                                            │
                      ┌─────────────────────┴────────────────────┐
                      ▼                                          ▼
             ┌─────────────────────┐                 ┌─────────────────────┐
             │ Dados e regras locais│                 │ Preferências e      │
             │ src/lib/             │                 │ créditos no navegador│
             └─────────────────────┘                 └─────────────────────┘

             ┌──────────────────────┐     sincronização     ┌─────────────────┐
             │ Repositório GitHub   │ ◀──────────────────▶ │ Projeto Lovable │
             └──────────────────────┘                      └─────────────────┘
```

O catálogo e as regras da demonstração ficam no código da aplicação. Preferências anônimas e créditos demonstrativos podem ser armazenados no navegador. Embora o projeto use TanStack Start, não há autenticação real, banco de dados ou integração ativa com serviços de IA, geolocalização ou previsão do tempo sincronizada.

O repositório está conectado ao Lovable: commits enviados para a branch conectada sincronizam com o editor. Para preservar a sincronização, não reescreva o histórico já publicado com *force push*, *rebase*, *amend* ou *squash*.

## Estrutura do repositório

```text
eco-travel-mvp/
├── .lovable/            # Configurações do projeto Lovable
├── documentacao/        # Requisitos, arquitetura, diagramas e protótipos
├── public/              # Arquivos públicos, como favicon e robots.txt
├── src/
│   ├── assets/          # Imagens e outros recursos
│   ├── components/      # Componentes compartilhados e de interface
│   ├── lib/             # Dados, regras e utilitários
│   ├── routes/          # Páginas e rotas da aplicação
│   ├── test/            # Testes automatizados
│   ├── routeTree.gen.ts # Árvore de rotas gerada
│   ├── router.tsx       # Configuração do roteador
│   ├── server.ts        # Entrada do servidor da aplicação
│   ├── start.ts         # Configuração do TanStack Start
│   └── styles.css       # Estilos globais
├── .env                 # Variáveis de ambiente locais
├── .gitignore           # Arquivos ignorados pelo Git
├── .prettierignore      # Arquivos ignorados pelo Prettier
├── .prettierrc          # Configuração do Prettier
├── README.md            # Documentação principal
├── bun.lock             # Lockfile do Bun
├── bunfig.toml          # Configuração do Bun
├── components.json      # Configuração de componentes de UI
├── eslint.config.js     # Configuração do ESLint
├── package-lock.json    # Lockfile do npm
├── package.json         # Scripts e dependências
├── tsconfig.json        # Configuração do TypeScript
├── vite.config.ts       # Configuração do Vite e TanStack Start
└── vitest.config.ts     # Configuração do Vitest
```

## Documentação

Consulte o [README da documentação](documentacao/README.md), que reúne os materiais do projeto.

## Rodando o projeto localmente

### Requisitos

- Node.js em versão compatível com o Vite utilizado pelo projeto
- npm

Confira as versões instaladas:

```bash
node --version
npm --version
```

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/brunaalmm/eco-travel-mvp.git
cd eco-travel-mvp

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O Vite informará no terminal o endereço local da aplicação. Para executar os testes, gerar o build de produção e verificar o lint:

```bash
npm test
npm run build
npm run lint
```

## Equipe

| Integrante | RA |
| --- | --- |
| Bruna dos Santos Almeida | 12526214370 |
| Kely Petruz Ribeiro | 12526158562 |
| Raissa Nicole Fabio de Castro Santos | 12526144248 |

## Links rápidos

- [Aplicação publicada](https://eco-travel-projeto.lovable.app)
- [Repositório GitHub](https://github.com/brunaalmm/eco-travel-mvp)
- [Documentação](documentacao/README.md)
