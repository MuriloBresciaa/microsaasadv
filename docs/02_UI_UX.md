# 02 — UI/UX Design System

> Padrões visuais e interativos do Site Factory V2.0.

## Filosofia

```
DARK MODE OLED NATIVO — Sem toggle. Sem light mode.
Estética: Industrial Minimalista + Neon Accents.
```

## Color Tokens (HSL)

### Backgrounds (OLED-safe)
| Token              | Valor     | Uso                   |
|--------------------|-----------|------------------------|
| `--color-bg-void`  | `#000000` | True black (OLED)      |
| `--color-bg-root`  | `#09090b` | Body background        |
| `--color-bg-surface`| `#0f0f12`| Cards, panels          |
| `--color-bg-raised`| `#18181b` | Elevated surfaces      |
| `--color-bg-overlay`| `#1c1c20`| Modals, dropdowns      |

### Primary (Cyan Neon)
- Scale completa de `--color-primary-50` a `--color-primary-900`
- Base: `hsl(192, 100%, 48%)`
- Glow shadows: `--shadow-glow-sm/md/lg`

### Accent (Electric Green)
- `hsl(142, 90%, 55%)` — Status, badges, indicadores

## Typography

| Propriedade | Valor                             |
|-------------|-----------------------------------|
| Font Stack  | `Inter`, `Manrope`, `system-ui`   |
| Carregamento| Google Fonts com `preconnect`      |
| Smoothing   | `-webkit-font-smoothing: antialiased` |
| Weight Range| 300 — 900 (Inter), 300 — 800 (Manrope) |

## Component Pattern: Shadcn/UI

- Componentes em `src/components/ui/`
- Função `cn()` obrigatória para merge de classes
- Variantes via `class-variance-authority` (cva) quando necessário
- Nunca estilos inline. Sempre Tailwind utilities.

## Motion: Framer Motion

- Todas as animações via `framer-motion` (nunca CSS keyframes para interações)
- Duração padrão: `200ms — 400ms`
- Easing: `[0.4, 0, 0.2, 1]` (Material ease-out)
- `AnimatePresence` para enter/exit
- `motion.div` com `client:visible` em componentes Astro

## Utilities Globais

| Classe              | Efeito                                |
|---------------------|---------------------------------------|
| `.glow-sm`          | Box-shadow neon sutil                 |
| `.glow-md`          | Box-shadow neon médio                 |
| `.glow-lg`          | Box-shadow neon forte                 |
| `.text-gradient-primary` | Gradiente cyan no texto          |

## Regras Inegociáveis

1. **Mobile-first** — Todo layout começa pelo menor viewport.
2. **Touch targets** — Mínimo `44×44px` em elementos interativos.
3. **Contrast ratio** — Mínimo `7:1` para texto principal.
4. **Sem cores genéricas** — Proibido `red`, `blue`, `green` raw. Sempre tokens.
5. **Sem defaults** — Proibido fontes do browser. Sempre Google Fonts.
