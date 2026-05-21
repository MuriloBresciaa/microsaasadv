# 02 — UI/UX Design System

> Padrões visuais e interativos do JurisAI — Estética Canônica Monumental Editorial / Warm Concrete.
> Última atualização: 2026-05-21

## Filosofia

```
ESTÉTICA MONUMENTAL EDITORIAL / WARM CONCRETE.
Inspiração: Apple Hardware, Dell Premium, Hostinger Cinema.
Identidade: Purista, tipográfica, editorial. Zero neon. Zero OLED.
```

## Color Tokens (Paleta Oficial)

### Backgrounds

| Token                     | Valor                          | Uso                                |
| ------------------------- | ------------------------------ | ---------------------------------- |
| `--color-bg-warm`         | `#f5f5f4` (Warm Concrete)     | Fundo base global                  |
| `--color-bg-contrast`     | `#0f172a` (Deep Navy)         | Seções escuras, footer             |
| `--color-bg-surface`      | `#ffffff`                      | Cards elevados sobre Warm Concrete |

### Text

| Token                     | Valor                          | Uso                                |
| ------------------------- | ------------------------------ | ---------------------------------- |
| `--color-text-primary`    | `#1d1d1f` (True Charcoal)     | Títulos, headings, texto principal |
| `--color-text-secondary`  | `#86868b` (Muted Metallic)    | Labels, microcopy, texto de apoio  |

### Accents

| Token                     | Valor                          | Uso                                |
| ------------------------- | ------------------------------ | ---------------------------------- |
| `--color-accent-gold`     | `#b8860b` (Burnished Gold)    | Destaques editoriais, badges       |
| `--color-accent-whatsapp` | `#25d366` (WhatsApp Green)    | CTA de conversão, status online    |

### Borders & Dividers

| Token                     | Valor                          | Uso                                |
| ------------------------- | ------------------------------ | ---------------------------------- |
| `--color-border`          | `rgba(29, 29, 31, 0.06)`      | Bordas de cards e divisores        |
| `--color-border-strong`   | `rgba(29, 29, 31, 0.08)`      | Bordas com mais contraste          |

### Proibições Cromáticas

- ❌ `#000000` (True Black OLED) como fundo de página
- ❌ Cyan Neon, Electric Green, glow shadows
- ❌ Cores genéricas (`red`, `blue`, `green`) sem tokenização

## Typography

| Propriedade    | Valor                                              |
| -------------- | -------------------------------------------------- |
| Headings       | `SF Pro Display`, fallback: `Anton, system-ui`     |
| Body/UI        | `SF Pro Text`, fallback: `Geist, system-ui`        |
| Carregamento   | `@font-face` local em `src/styles/global.css`      |
| Smoothing      | `-webkit-font-smoothing: antialiased`              |
| Text Wrap      | `text-wrap: balance` (headings), `text-wrap: pretty` (body) |
| Selection      | `rgba(184, 134, 11, 0.16)` (Burnished Gold diluído) |

### Proibições Tipográficas

- ❌ Inter, Manrope, Google Fonts CDN
- ❌ Fontes padrão do browser (Segoe UI, Consolas)

## Curvatura & Geometria (Apple G2 Squircle)

| Classe                     | Raio     | Uso                                    |
| -------------------------- | -------- | -------------------------------------- |
| `.apple-glass-card`        | `32px`   | Cards principais com refração de vidro |
| `.apple-hardware-card`     | `32px`   | Cards sólidos com sombra de oclusão    |
| `.apple-pill`              | `9999px` | Badges e pílulas de navegação          |
| `.apple-mockup-card`       | `24px`   | Mockups e previews internos            |
| `.apple-mockup-card-small` | `16px`   | Sub-elementos aninhados               |

Regra de cantos concêntricos: `32px → 24px → 16px → 8px` (externo → interno).
Propriedade de hardware: `corner-shape: squircle` para continuidade matemática G2.

## Component Pattern: Shadcn/UI

- Componentes em `src/components/ui/`
- Função `cn()` obrigatória para merge de classes
- Variantes via `class-variance-authority` (cva) quando necessário
- Nunca estilos inline. Sempre Tailwind utilities

## Motion: GSAP + ScrollTrigger

- Todas as animações via GSAP (imperativo, vanilla JS)
- ScrollTrigger para efeitos de revelação por rolagem
- Duração padrão: `200ms — 600ms`
- Easing premium: `power2.out`, `power3.out`, `elastic.out(1.1, 0.6)`, `back.out(1.7)`
- Proibido: Framer Motion, CSS keyframes para interações complexas

### Efeitos Canônicos Ativos

| Efeito                   | Classe/ID                  | Descrição                                     |
| ------------------------ | -------------------------- | --------------------------------------------- |
| Metallic Text Sheen      | `.apple-text-sheen`        | Reflexo luminoso metálico por rolagem         |
| Liquid Glass             | `.apple-glass-card`        | Refração óptica com `backdrop-blur(20px)`     |
| Magnetic Buttons         | `[data-magnetic-element]`  | Atração elástica com raio de influência 30%   |
| Cinema Video Reveal      | ScrollTrigger              | Escala progressiva `0.96 → 1.02` por scroll  |
| Capsule Navbar Shift     | ScrollTrigger              | Contração geométrica do header a 40px scroll  |
| Proximity Text Focus     | `.apple-proximity-text`    | Opacidade progressiva `0.35 → 1.0` no viewport|
| Laser Icon Parallax      | `.laser-icon-wrapper`      | Micro-deslocamento assíncrono `yPercent: -25` |

## Regras Inegociáveis

1. **Mobile-first** — Todo layout começa pelo menor viewport (375px)
2. **Touch targets** — Mínimo `44×44px` em elementos interativos (Apple HIG)
3. **Contrast ratio** — Mínimo `7:1` para texto principal
4. **Sem cores genéricas** — Proibido `red`, `blue`, `green` raw. Sempre tokens
5. **Sem defaults** — Proibido fontes do browser. Sempre fontes Apple locais
6. **GPU Gates** — `will-change: transform`, `backface-visibility: hidden` em elementos animados
