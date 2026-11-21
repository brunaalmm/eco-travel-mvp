# 🌱 EcoTravel

### Turismo sustentável, acessível e inclusivo na palma da mão.

**Aplicação publicada:** [eco-travel-projeto.lovable.app](https://eco-travel-projeto.lovable.app)

O **EcoTravel** é uma aplicação web responsiva voltada ao turismo sustentável e consciente, com fluxos para turistas e gestores. Como projeto de engenharia e inovação, reúne roteiros, informações educativas sobre impacto ambiental e recursos demonstrativos de acessibilidade e gestão.

A proposta é apoiar escolhas de viagem mais conscientes e inclusivas por meio de ferramentas de descoberta, estimativas ambientais e indicadores demonstrativos.

## O problema

Vivemos em um cenário onde a sustentabilidade no turismo ainda não é uma regra geral, e o modelo tradicional de turismo de massa pode sobrecarregar recursos naturais, concentrar visitantes e pressionar comunidades locais. Viajar de forma consciente e inclusiva ainda esbarra em barreiras práticas:

- **Falta de transparência ambiental:** é difícil identificar práticas ecológicas verificáveis ou comparar estimativas de emissões entre meios de transporte.
- **Sobrecarga ambiental e impacto nas comunidades:** a superlotação e a falta de planejamento podem contribuir para o acúmulo de resíduos, a pressão sobre recursos naturais e o aumento do custo de vida local.
- **Barreiras de acessibilidade digital:** recursos como contraste, ampliação de texto e conteúdo acessível nem sempre estão disponíveis nas plataformas de turismo.
- **Falta de ferramentas educativas práticas:** informações ambientais podem ser difíceis de interpretar e transformar em ações cotidianas.
- **Dificuldade de gestão sustentável:** gestores precisam de formas claras de consultar indicadores demonstrativos sobre roteiros, emissões e capacidade.

## A solução

O **EcoTravel** reúne, em uma única interface, ferramentas para o turista e para o gestor:

1. **Descubra roteiros sustentáveis** com busca, filtros regionais e compatibilidade demonstrativa com suas preferências.
2. **Explore um mapa esquemático** com destinos, paradas de circuitos e estimativas de distância, tempo e emissões — sem navegação em tempo real.
3. **Estime sua pegada de carbono** comparando transportes disponíveis e receba sugestões de ações ambientais, sem cálculo de compensação certificada.
4. **Converse com o EcoBot**, um assistente demonstrativo que oferece respostas e dicas por regras predefinidas; não possui quiz nem IA conectada.
5. **Use recursos de acessibilidade**, como alto contraste, ajuste de fonte, audiodescrição com voz sintetizada em conteúdos compatíveis e uma demonstração de saudação em Libras.
6. **Consulte o Painel do Gestor**, com indicadores, dados demonstrativos de ocupação dos roteiros, aprovações simuladas e exportação de relatórios em PDF.

O catálogo demonstrativo inclui sete destinos: **Peruíbe, Guarujá, Bertioga, Paranapiacaba, São Paulo, Jundiaí e Brotas**. Em cada página de destino, o visitante encontra resumo, região, atrativos, hospedagem, gastronomia e passeios, além do acesso ao circuito no mapa esquemático.

## Funcionalidades — requisitos funcionais

| ID | Nome | Descrição | Prioridade | Envolve IA? |
| --- | --- | --- | --- | --- |
| RF01 | Acesso e cadastro demonstrativos | Permite escolher o perfil Turista ou Gestor. Na entrada, o botão Entrar abre o fluxo demonstrativo correspondente; o formulário de cadastro apenas informa que nenhuma conta será criada. Não há validação de credenciais nem autenticação real. As opções Google e Microsoft avisam que a integração não está ativa. | Must Have | Não |
| RF02 | Onboarding de preferências | Apresenta quatro passos: localização simulada com origem em São Paulo, estilo de ecoturismo, transporte preferido e foco de impacto ambiental. As preferências anônimas ficam no navegador e influenciam a ordenação dos roteiros. Não solicita localização real nem configura nível de acessibilidade. | Must Have | Não — afinidade por regras determinísticas |
| RF03 | Recomendação de roteiros | Exibe roteiros do catálogo e uma compatibilidade demonstrativa calculada com base nas preferências. O selo verde exibido nos cartões é ilustrativo, não uma certificação ambiental verificada. | Must Have | Não — cálculo determinístico |
| RF04 | Busca e filtros de destinos | Permite buscar por destino, região, resumo ou nome do circuito e filtrar por Litoral, Região Metropolitana / Grande SP e Interior. Não há filtro por categoria. | Must Have | Não |
| RF05 | Mapa esquemático | Permite selecionar um destino e um transporte e consultar as paradas do circuito, distância, tempo estimado e emissão calculada. O desenho é esquemático e não oferece navegação ou localização em tempo real. | Must Have | Não |
| RF06 | Calculadora de pegada de carbono | Estima e compara emissões de CO₂ por distância e transporte. As opções incluem carro, ônibus, bicicleta e trilha a pé, conforme a distância. Apresenta sugestões de apoio a projetos e práticas ambientais, sem certificar ou efetuar compensações. | Must Have | Não |
| RF07 | Assistente EcoBot | Oferece sugestões de perguntas e respostas demonstrativas sobre transporte, roteiros e práticas sustentáveis, usando regras locais e conteúdo do catálogo. Não usa IA conectada nem inclui quiz de impacto. | Must Have | Não |
| RF08 | Créditos verdes | Concede créditos demonstrativos por interações com o EcoBot e pela calculadora de carbono. O saldo fica no navegador e pode liberar um artigo educativo e um certificado demonstrativo para impressão; não registra doações ou certificações reais. | Should Have | Não |
| RF09 | Cenários de clima | Exibe no Descobrir um widget com quatro cenários selecionáveis — ensolarado, chuva, vento e frio — e recomendações predefinidas. Não consulta previsão meteorológica real. | Should Have | Não |
| RF10 | Recursos de acessibilidade | Oferece alto contraste, modo claro/escuro e ampliação de fonte. Em conteúdos compatíveis, disponibiliza audiodescrição por voz sintetizada e transcrição; inclui um vídeo demonstrativo de saudação em Libras, não uma tradução integral. | Must Have | Não |
| RF11 | Painel e indicadores do Gestor | Apresenta indicadores demonstrativos de emissões, metas, transporte mais utilizado e ocupação dos roteiros em relação à capacidade. Os dados de ocupação são fixos; a interface não oferece filtros regionais nem controle interativo de simulação de fluxo. | Must Have | Não |
| RF12 | Aprovação de roteiros e validação de selo | Permite marcar roteiros e parceiros como aprovados ou rejeitados na tela do Gestor. As alterações existem apenas na sessão de demonstração: não publicam roteiros nem certificam selos. | Should Have | Não |
| RF13 | Relatório executivo em PDF | Apresenta uma prévia e permite baixar um PDF com indicadores demonstrativos, distribuição por transporte e dados dos roteiros monitorados. | Should Have | Não |
| RF14 | Detalhes dos destinos e roteiros | Exibe informações de atrativos, hospedagem, gastronomia e passeios, além do resumo do destino e acesso ao circuito no mapa. A avaliação enviada é demonstrativa e não é salva nem publicada. | Must Have | Não |
| RF15 | Perfil, preferências e guia textual | Reúne dados temporários de perfil, controles de acessibilidade e opções demonstrativas de notificações e localização. Permite baixar um guia textual de roteiros; não oferece mapas ou navegação offline. | Should Have | Não |
| RF16 | Conteúdo institucional e informativo | Apresenta a página Sobre, os Termos de Uso e a Política de Privacidade. Esses conteúdos descrevem a proposta e os limites da demonstração; não documentam práticas de engenharia de software sustentável. | Should Have | Não |

## Por que o EcoTravel é diferente

- **Acessibilidade como princípio:** oferece alto contraste, ajuste de fonte e, nos conteúdos compatíveis, audiodescrição em voz sintetizada e transcrição. A saudação em Libras é uma demonstração, não uma tradução integral.
- **Educação ambiental prática:** transforma estimativas de emissões de CO₂ em comparações simples entre transportes e sugestões de ações.
- **Visão dupla — Turista e Gestor:** reúne ferramentas de descoberta e planejamento para turistas e indicadores demonstrativos para gestores.
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

O catálogo e as regras da demonstração ficam no código da aplicação. Preferências anônimas e créditos demonstrativos podem ser armazenados no navegador. Embora o projeto use TanStack Start, não há autenticação real, banco de dados ou integração ativa com serviços de IA, geolocalização ou previsão do tempo.

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
