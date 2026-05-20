# ESTADO.md — Site Factory V2.0

> Última atualização: 2026-04-30 · Design System travado: Monumental Editorial / Warm Concrete · Sistema Imune: **Nível 3 (Bulletproof)**

## Status Atual

✅ **Site Factory 2.0 — Golden Template | Sistema Imune Nível 3 (Bulletproof)**

> **Definição de Nível 3:** O agente não consegue gerar código de baixa qualidade _mesmo que queira_.
> As 6 camadas de regras ativas tornam o comportamento correto a única saída possível.

## O Que Foi Feito

### Scaffolding Completo
- [x] Astro 6 inicializado (template minimal, strict TS)
- [x] React 19 integrado via `@astrojs/react`
- [x] Tailwind CSS v4 via `@tailwindcss/vite` (Vite plugin)
- [x] Framer Motion instalado
- [x] Nano Stores configurado com atoms globais
- [x] Supabase client tipado em `src/lib/supabase.ts`
- [x] Função `cn()` (Shadcn pattern) em `src/lib/utils.ts`
- [x] Path aliases `@/*` configurados no `tsconfig.json`

### Design System
- [x] `global.css` com tokens Dark Mode OLED (Warm Concrete)
- [x] Escala de cores: `--color-bg-*`, `--color-concrete-*`, `--color-navy-*`, `--color-gold-*`
- [x] Utilities: `.glass`, `.glass-light`, `.text-gradient-gold`, `.text-gradient-navy`, `.card-editorial`
- [x] Fontes: **Anton** (display) + **Geist** (UI) + **Inter** (body) — Sem Manrope, sem Bodoni

### Página Demo
- [x] `RootLayout.astro` com SEO completo (OG, Twitter, canonical)
- [x] `index.astro` com Hero industrial/minimalista
- [x] Grid pattern background + radial glow effect

### Documentação
- [x] `docs/01_TECH_STACK.md` — Stack completa documentada
- [x] `docs/02_UI_UX.md` — Design system documentado
- [x] `docs/03_DATABASE.md` — Convenções Supabase
- [x] `docs/ESTADO.md` — Este arquivo
- [x] `.clinerules` — Regras locais do agente

### 🛡️ Blindagem de Infraestrutura (2026-04-30)
- [x] `.nvmrc` atualizado: Node **22** (era 20)
- [x] `netlify.toml` criado: `corepack enable pnpm && pnpm install && pnpm run build`, publish `dist`
- [x] `.github/workflows/ci.yml` criado: Node 22 + PNPM v9 + `--frozen-lockfile` + cache de store
- [x] `ARQUITETURA.md` criado na raiz: fonte de verdade arquitetural completa (stack, pastas, ADR)
- [x] `.agent/rules/00_master_index.md` criado: protocolo Fail-Fast com checklist pré-execução

### 🧰 Utilitários Cross-Browser (2026-04-30)
- [x] `copyToClipboard(text)` adicionado em `src/lib/utils.ts`
  - Strategy 1: `navigator.clipboard.writeText()` (modern, HTTPS)
  - Strategy 2: `document.createRange()` + `window.getSelection().addRange()` + `execCommand('copy')` (iOS/Safari fallback)

### 🎨 Motor de Design UI/UX Pro Max (2026-04-30)
- [x] `uipro-cli@2.2.3` instalado globalmente via NPM
- [x] `uipro init --ai antigravity` executado — skill instalado em `.agent/skills/ui-ux-pro-max/`
- [x] ~~Design System SaaS Minimalista~~ → **SUBSTITUÍDO pelo padrão canônico**

### 🔒 Design System Travado — Monumental Editorial / Warm Concrete (2026-04-30)
- [x] `design-system/sitefactory2/MASTER.md` **SOBRESCRITO** com estética canônica aprovada pelo arquiteto-chefe
  - **Estilo:** Monumental Editorial / Warm Concrete
  - **Paletas:** Deep Navy (`--color-navy-*`) · Champagne Gold (`--color-gold-*`) · Warm Concrete (`--color-concrete-*`)
  - **Fontes:** Anton (display) · Geist (UI) · Inter (body)
  - **Utilities:** `.glass`, `.glass-light`, `.text-gradient-gold`, `.text-gradient-navy`, `.btn-gold`, `.card-editorial`
  - **Eliminado:** Cyan, Bodoni Moda, Jost, cores genéricas de SaaS
- [x] `.agent/rules/01_design_lock.md` criado: diretiva de bloqueio imutável para todos os clones

### 🛡️ Sistema Imune Nível 3 — 5 Camadas de Regras Ativas (2026-04-30)
- [x] `.agent/rules/02_git_commit.md`: Conventional Commits obrigatórios + scopes canônicos + fluxo de branches
- [x] `.agent/rules/03_typescript.md`: Proibição total de `any` + contratos de Props/Drizzle/Supabase/API
- [x] `.agent/rules/04_error_handling.md`: Padrão `{ data, error }` + status codes semânticos + wrappers para DB/API/Auth/Fetch
- [x] `.agent/rules/05_naming.md`: Nomenclatura completa de variáveis, booleanos, handlers, stores, CSS e arquivos
- [x] `ARQUITETURA.md` atualizado: pasta `.agents/` corrigida para `.agent/`, ADR registrado
- [x] `00_master_index.md` atualizado: todos os paths de `ESTADO.md` apontam para `docs/ESTADO.md`
- [x] `.clinerules` atualizado: protocolo de inicialização agora referencia `ARQUITETURA.md` como primário

## Estrutura de Pastas

```
src/
├── components/
│   └── ui/          # Componentes Shadcn (a criar)
├── layouts/
│   └── RootLayout.astro
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── pages/
│   └── index.astro
├── store/
│   └── globals.ts
└── styles/
    └── global.css
docs/
├── 01_TECH_STACK.md
├── 02_UI_UX.md
├── 03_DATABASE.md
└── ESTADO.md
```

## Próximos Passos

- [ ] Instalar e configurar componentes Shadcn base (Button, Card, Input)
- [ ] Criar componente `<Header />` responsivo
- [ ] Criar componente `<Footer />`
- [ ] Criar `src/lib/errors.ts` com mapa de erros Supabase PT-BR (definido em `04_error_handling.md`)
- [ ] Criar `src/lib/constants.ts` com constantes globais do projeto
- [ ] Criar `src/lib/types.ts` com tipos compartilhados
- [ ] Gerar tipos Supabase via `supabase gen types typescript` e salvar em `src/lib/database.types.ts`
- [ ] Implementar primeiro fluxo de dados com Supabase
- [ ] Adicionar `class-variance-authority` para variantes de componentes
- [ ] Configurar ESLint com regras TypeScript strict para enforcement em CI
