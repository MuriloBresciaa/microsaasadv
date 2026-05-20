# 01 — Tech Stack

> Documento canônico da stack tecnológica do Site Factory V2.0.

## Runtime & Framework

| Camada    | Tecnologia    | Versão  | Papel                                  |
|-----------|---------------|---------|----------------------------------------|
| Framework | Astro         | 6.x     | SSG/SSR, Islands Architecture          |
| UI        | React         | 19.x    | Componentes interativos (Islands)      |
| Styling   | Tailwind CSS  | 4.x     | Utility-first CSS via Vite plugin      |
| Motion    | Framer Motion | 12.x    | Animações declarativas em React        |
| Icons     | Lucide React  | 1.x     | Ícones SVG otimizados                  |

## State & Data

| Camada   | Tecnologia      | Papel                           |
|----------|------------------|---------------------------------|
| State    | Nano Stores      | Estado global reativo (atoms)   |
| Database | Supabase (PG)    | Backend-as-a-Service, Auth, RLS |
| Client   | @supabase/supabase-js | Client-side typed queries  |

## DX & Utilities

| Tool          | Papel                                    |
|---------------|------------------------------------------|
| clsx          | Merge condicional de classes CSS         |
| tailwind-merge| Resolve conflitos de classes Tailwind    |
| cn()          | Wrapper Shadcn (clsx + twMerge)          |
| pnpm          | Package manager (obrigatório)            |
| TypeScript    | Strict mode, path aliases (`@/*`)        |

## Integrações Astro

- `@astrojs/react` — Hydration de componentes React
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
