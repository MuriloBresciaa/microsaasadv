# ARQUITETURA — Site Factory 3.0 Golden Template

> **Leitura obrigatória para qualquer agente antes de executar qualquer tarefa.**
> Violação deste protocolo = Fail-Fast imediato.

---

## Stack Tecnológica

| Camada         | Tecnologia                        | Versão Mínima |
| -------------- | --------------------------------- | ------------- |
| Runtime        | Node.js                           | 22 LTS        |
| Package Manager| PNPM (via Corepack)               | v9            |
| Framework      | Astro (Islands Architecture)      | v6+           |
| UI Layer       | React                             | v19+          |
| Styling        | Tailwind CSS v4 (Vite Plugin)     | v4+           |
| ORM            | Drizzle ORM                       | v0.40+        |
| Database Local | MySQL (Laragon)                   | 8.x           |
| Database Cloud | Supabase (Postgres)               | latest        |
| Auth           | Supabase Auth / Clerk (opcional)  | -             |
| Deploy         | Netlify (via netlify.toml)        | -             |
| CI/CD          | GitHub Actions (.github/workflows)| -             |

---

## Estrutura de Pastas Canônica

```
site-factory-master2/
├── .agent/
│   ├── rules/                      # Sistema Imune — Nível 3 (Bulletproof)
│   │   ├── 00_master_index.md      # Protocolo Fail-Fast + checklist pré-execução
│   │   ├── 01_cinematic_builder.md # Motor Cinematográfico: 4 presets + Gate das 4 Perguntas
│   │   ├── 02_git_commit.md        # Conventional Commits obrigatórios
│   │   ├── 03_typescript.md        # Proibição de any + contratos de tipagem
│   │   ├── 04_error_handling.md    # Padrão try/catch + status codes
│   │   ├── 05_naming.md            # Nomenclatura de variáveis, funções e eventos
│   │   └── 06_vlaeg_protocol.md    # Protocolo V.L.A.E.G + Arquitetura A.N.T
│   └── skills/                     # Motor de design UI/UX Pro Max
├── .github/
│   └── workflows/
│       └── ci.yml                  # CI: Node 22 + PNPM v9 + frozen lockfile
├── .nvmrc                          # Node 22 (fonte de verdade local)
├── netlify.toml                    # Build config para Netlify
├── astro.config.mjs                # Config do Astro (Vite + Tailwind)
├── drizzle.config.ts               # Config do Drizzle ORM
├── tsconfig.json                   # TypeScript config
├── package.json                    # engines: { node: >=22.12.0 }
├── pnpm-lock.yaml                  # Lockfile PNPM (NUNCA alterar manualmente)
├── ARQUITETURA.md                  # Este arquivo — fonte de verdade arquitetural
├── ESTADO.md                       # Memory Bank do projeto
├── public/                         # Assets estáticos (imagens, fonts)
│   └── favicon.svg
├── src/
│   ├── db/                         # Camada de dados
│   │   ├── index.ts                # Singleton da conexão Drizzle
│   │   └── schemas/                # Schemas Drizzle (um arquivo por entidade)
│   │       └── schema-*.ts
│   ├── layouts/                    # Layouts Astro (RootLayout, etc.)
│   │   └── RootLayout.astro
│   ├── lib/                        # Utilitários compartilhados
│   │   ├── utils.ts                # cn() + copyToClipboard() cross-browser
│   │   └── supabase.ts             # Cliente Supabase
│   ├── pages/                      # Rotas Astro (file-based routing)
│   │   └── index.astro
│   ├── store/                      # Estado global (nanostores)
│   └── styles/                     # CSS global
│       └── global.css
├── docs/                           # Documentação e memória do projeto
│   ├── ESTADO.md                   # Memory Bank (estado atual, próximos passos)
│   ├── gemini.md                   # Constituição: esquemas, mapa cognitivo, glossário
│   ├── task_plan.md                # Fases, objetivos e checklists
│   ├── findings.md                 # Pesquisas, restrições e descobertas
│   ├── progress.md                 # Log cronológico de progresso e erros
│   ├── 01_TECH_STACK.md            # Stack detalhada
│   ├── 02_UI_UX.md                 # Referências de design
│   └── 03_DATABASE.md              # Schemas e decisões de banco
├── architecture/                   # [A.N.T Camada 1] POPs em Markdown por módulo
│   └── INDEX.md                    # Índice central de todos os POPs
├── tools/                          # [A.N.T Camada 3] Scripts Python determinísticos
│   ├── _template_tool.py           # Template base para novos scripts
│   └── requirements.txt            # Dependências Python
└── .tmp/                           # Artefatos temporários (NÃO commitar — ver .gitignore)
    └── .gitkeep
```

---

## Convenções de Nomenclatura

| Artefato              | Padrão                         | Exemplo                    |
| --------------------- | ------------------------------ | -------------------------- |
| Schema Drizzle        | `schema-[entidade].ts`         | `schema-agendamento.ts`    |
| Componentes React     | PascalCase                     | `BookingCard.tsx`          |
| Layouts Astro         | PascalCase + `.astro`          | `RootLayout.astro`         |
| Stores (nanostores)   | camelCase + `Store`            | `bookingStore.ts`          |
| Utilitários           | camelCase                      | `utils.ts`, `supabase.ts`  |
| Estilos por componente| colocalizado ou em `styles/`   | -                          |

---

## Regras de Infraestrutura (Iron Laws)

1. **Node Version Lock:** Sempre Node 22. `.nvmrc` e `netlify.toml` são a fonte de verdade.
2. **PNPM Strict:** `pnpm install --frozen-lockfile` em CI. Nunca `npm install`.
3. **Prepared Statements:** Toda query ao banco via Drizzle ORM. Proibido SQL raw sem escape.
4. **Env Vars:** Nunca expor no cliente. Variáveis de servidor prefixadas sem `PUBLIC_`.
5. **TypeScript Strict:** Ativado. Sem `any` explícito sem justificativa documentada.

---

## Decisões de Arquitetura Registradas

| Data       | Decisão                                          | Motivo                              |
| ---------- | ------------------------------------------------ | ----------------------------------- |
| 2026-04-30 | Tailwind v4 via @tailwindcss/vite (sem config)   | Elimina tailwind.config.js friction |
| 2026-04-30 | Drizzle ORM sobre Prisma                         | Performance, type-safety nativa     |
| 2026-04-30 | PNPM v9 via Corepack                             | Reproducibilidade entre ambientes   |
| 2026-04-30 | Node 22 LTS lock                                 | Post-mortem: compatibilidade CI/CD  |
| 2026-04-30 | Sistema Imune Nível 3 (5 camadas de regras)      | Elimina comportamento ambíguo do agente |
| 2026-05-04 | Motor Cinematográfico (4 presets A/B/C/D)        | Substituiu Design Lock — mais flexível e expressivo |
| 2026-05-04 | Protocolo V.L.A.E.G + Arquitetura A.N.T          | Gate obrigatório: JSON Schema antes de código backend |
| 2026-05-04 | Memória modular em docs/ (gemini.md, task_plan, findings, progress) | Contexto persistente entre sessões de agente |
