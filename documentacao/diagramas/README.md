## Arquitetura

Atualmente, o **EcoTravel** opera com foco na interface responsiva e *mobile-first* (construída em **React, TypeScript e Tailwind CSS** via Lovable). Para a evolução da plataforma em produto completo e aplicativo, a arquitetura alvo integra persistência de dados, APIs e inteligência artificial generativa:

### Diagrama de Arquitetura Preliminar

```mermaid
flowchart TD
    U["📱💻 Usuários Web & Mobile"] --> FE

    subgraph FE["Front-end: Lovable (React, TypeScript, Tailwind CSS)"]
        FE1["Interface Responsiva Web / Mobile"]
        FE2["Coleta de Preferências (Filtros)"]
        FE3["Exibição de Roteiros e Destinos"]
    end

    FE -- "API Requests (HTTP / JSON)" --> BE

    subgraph BE["Back-end: Servidor de Aplicação (Node.js)"]
        BE1["API Endpoints (Express.js)"]
        BE2["Autenticação & Autorização"]
        BE3["Lógica de Cruzamento de Dados"]
        BE4["Orquestração do Chatbot"]
    end

    BE -- "DB Queries (SQL / ORM)" --> DB
    BE -- "AI API Calls (JSON)" --> AI

    subgraph DB["Banco de Dados: PostgreSQL (Supabase)"]
        DB1["Tabelas Relacionais:<br/>• Usuários & Perfis<br/>• Destinos Sustentáveis<br/>• Hospedagens, Trilhas, Transportes<br/>• Roteiros Gerados"]
    end

    subgraph AI["Componente de IA: Groq API (Llama Models)"]
        AI1["Motor Ultrarrápido LPU (Groq)"]
        AI2["Geração de Roteiros & Linguagem Natural"]
        AI3["Motor de Llama Models (Open-Source)"]
    end
```

### Camadas da Arquitetura Alvo

- **Front-end (MVP Atual & Evolução Mobile):** Interface responsiva em **React, TypeScript e Tailwind CSS** responsável pela coleta de preferências, exibição de roteiros, calculadora ambiental e painéis de gestão.
- **Back-end (Arquitetura Alvo):** Servidor de aplicação em **Node.js com Express.js** para exposição de endpoints REST (HTTP/JSON), autenticação e autorização de usuários, regras de negócio e orquestração das chamadas do assistente.
- **Banco de Dados (Arquitetura Alvo):** **PostgreSQL** (gerenciado via **Supabase**) para armazenamento relacional de usuários e perfis, destinos sustentáveis, hospedagens, trilhas, transportes e roteiros gerados.
- **Componente de IA (Arquitetura Alvo):** Integração via JSON com a **API Groq** utilizando modelos **Llama** para processamento de linguagem natural e recomendação personalizada.
