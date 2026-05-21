# 01 — Tech Stack

> Documento canônico da stack tecnológica do JurisAI.
> Última atualização: 2026-05-21

## Runtime & Framework

| Camada         | Tecnologia                     | Versão Mínima | Papel                                  |
| -------------- | ------------------------------ | ------------- | -------------------------------------- |
| Runtime        | Node.js (via Corepack)         | 22 LTS        | Motor de execução server-side          |
| Package Manager| PNPM (strict, frozen-lockfile) | v9.15.4       | Gerenciamento de dependências          |
| Framework      | Astro (Islands Architecture)   | v6+           | SSG/SSR, file-based routing            |
| UI Layer       | React                          | v19+          | Componentes interativos (Islands)      |
| Styling        | Tailwind CSS v4 (Vite Plugin)  | v4+           | Utility-first CSS via `@tailwindcss/vite` |
| Motion         | GSAP + ScrollTrigger           | v3.12+        | Animações imperativas de alta performance |
| Icons          | SVGs inline puros              | -             | Ícones de linha laser encapsulados     |

## Data Layer

| Camada    | Tecnologia        | Papel                                       |
| --------- | ----------------- | ------------------------------------------- |
| ORM       | Drizzle ORM       | Type-safe queries, Prepared Statements      |
| Database  | MySQL 8.x         | Banco relacional local (Laragon, porta 3306)|
| Driver    | mysql2/promise     | Conexão async/await nativa                  |
| State     | Nano Stores       | Estado global reativo (atoms)               |

## DX & Utilities

| Tool           | Papel                                    |
| -------------- | ---------------------------------------- |
| clsx           | Merge condicional de classes CSS         |
| tailwind-merge | Resolve conflitos de classes Tailwind    |
| cn()           | Wrapper Shadcn (clsx + twMerge)          |
| pnpm           | Package manager (obrigatório, v9 strict) |
| TypeScript     | Strict mode, path aliases (`@/*`)        |

## Integrações Astro

- `@astrojs/react` — Hydration de componentes React (Islands)
- `@astrojs/node` — Adapter para endpoints server-side
- `@tailwindcss/vite` — Tailwind v4 via Vite plugin (substitui `@astrojs/tailwind`)

## Path Aliases

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

## Convenções

- **Package Manager**: Sempre `pnpm`. Nunca `npm` ou `yarn`.
- **Imports**: Sempre absolutos via `@/` (ex: `@/lib/utils`).
- **Componentes UI**: Padrão Shadcn em `src/components/ui/`.
- **Componentes de Domínio**: Em `src/components/` (fora de `/ui`).
- **Queries de Banco**: Sempre via Drizzle ORM. Proibido SQL raw concatenado.
