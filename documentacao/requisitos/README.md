## Requisitos

### Escopo
O **EcoTravel** é uma solução voltada ao turismo sustentável e consciente, desenvolvida inicialmente como aplicação web responsiva com foco *mobile-first* (projetada para evoluir para aplicativo móvel), reunindo curadoria de destinos ecológicos, calculadora educativa de pegada de carbono, recursos de acessibilidade digital e painel de gestão com indicadores de impacto.

---

### Tabela 1 – Requisitos Funcionais

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

---

### Tabela 2 – Requisitos Não-Funcionais

| ID | Nome | Categoria | Descrição | Prioridade |
| --- | --- | --- | --- | --- |
| RNF01 | Disponibilidade | Confiabilidade | O aplicativo deve garantir disponibilidade mínima de 99% do tempo, assegurando que o sistema se mantenha operacional de forma contínua e sem quedas. | Must Have |
| RNF02 | Proteção e Privacidade de Dados | Segurança | O aplicativo deve assegurar que os dados de perfil e localização coletados sejam tratados de forma sigilosa, garantindo a proteção das informações em conformidade com a LGPD. | Must Have |
| RNF03 | Tempo de Resposta Otimizado | Desempenho | O aplicativo deve processar as consultas de rotas, filtros e respostas do assistente retornando os resultados em até 2 segundos, otimizando o consumo computacional e energético. | Must Have |
| RNF04 | Interface Intuitiva | Usabilidade | O aplicativo deve garantir uma experiência de usuário (UX/UI) agradável e intuitiva, proporcionando navegação fluida com o máximo de satisfação e o mínimo de esforço cognitivo. | Must Have |
| RNF05 | Portabilidade Multiplataforma e Responsividade | Portabilidade | O aplicativo deve se adaptar dinamicamente a navegadores web e dispositivos móveis (Android/iOS), garantindo funcionamento consistente em diferentes tamanhos de tela. | Must Have |
| RNF06 | Acessibilidade Digital | Usabilidade | O aplicativo deve disponibilizar recursos de inclusão (como alto contraste, ampliação de fonte, audiodescrição e suporte em Libras) de fácil ativação pelo usuário. | Should Have |
