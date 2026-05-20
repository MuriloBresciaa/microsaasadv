# 01 — Cinematic Builder (Site Factory 3.0)

> Regra de execução obrigatória para todo agente que produzir uma landing page neste repositório.
> Substitui `01_design_lock.md` a partir de 2026-05-04.

---

## §1. REGRA DAS 4 PERGUNTAS — GATE OBRIGATÓRIO

**ANTES de escrever uma linha de código ou HTML, o agente DEVE disparar UMA única chamada `AskUserQuestion` contendo as 4 perguntas abaixo.**
Nenhuma suposição é permitida. Se o usuário omitir alguma resposta, use os defaults indicados.

```
PERGUNTA 1 — Marca / Propósito
"Qual é o nome da marca/produto e qual a ação principal que o visitante deve realizar?"
Default: marca = "[Projeto]", ação = "entrar em contato"

PERGUNTA 2 — Estética (Preset)
"Qual preset estético você quer usar?
  A) Organic Tech  — natureza + tecnologia, luz suave
  B) Midnight Luxe — premium escuro, dourado, exclusividade
  C) Brutalist Signal — impacto cru, tipografia agressiva, sem ornamento
  D) Vapor Clinic  — neon pastéis, estética vapor/clínica, Y2K clean"
Default: A

PERGUNTA 3 — 3 Propostas de Valor
"Liste as 3 principais propostas de valor (benefícios, não features).
Exemplo: 'Economia de tempo / Sem burocracia / Suporte 24h'"
Default: usar copy genérico alinhado ao propósito informado

PERGUNTA 4 — CTA Principal
"Qual o texto e destino do botão CTA principal?
Exemplo: 'Quero Começar → #formulario' ou 'Agendar Demonstração → https://...'"
Default: "Saiba Mais → #sobre"
```

**Só avance após receber as respostas (ou expirar o timeout com os defaults).**

---

## §2. PRESETS ESTÉTICOS — 4 Identidades Canônicas

### PRESET A — Organic Tech
```yaml
identity: "Natureza encontra tecnologia. Confiança orgânica com precisão digital."
palette:
  background:   "#0D1F16"   # verde-floresta profundo
  surface:      "#152B1E"   # card base
  primary:      "#4ADE80"   # verde neon vibrante (lime-400)
  secondary:    "#86EFAC"   # verde menta suave
  accent:       "#A3E635"   # lima elétrico
  text:         "#F0FDF4"   # off-white esverdeado
  muted:        "#6B7280"   # cinza neutro
typography:
  heading:      "Syne"      # Google Fonts — geométrico/orgânico
  body:         "Inter"
  mono:         "JetBrains Mono"
  heading_weight: 800
image_mood: >
  Macro textures of leaves, moss, circuits on bark, bioluminescent fungi,
  clean lab environments with natural light, earth tones + electric green overlays.
```

---

### PRESET B — Midnight Luxe
```yaml
identity: "Premium escuro. Exclusividade silenciosa. Dourado como assinatura."
palette:
  background:   "#080808"   # OLED black
  surface:      "#111111"   # card base
  primary:      "#D4AF37"   # dourado clássico
  secondary:    "#F5E6A3"   # champagne suave
  accent:       "#C084FC"   # púrpura luxo
  text:         "#F8F8F8"   # branco quase puro
  muted:        "#525252"   # cinza escuro
typography:
  heading:      "Cormorant Garamond"   # elegância editorial
  body:         "DM Sans"
  mono:         "Fira Code"
  heading_weight: 600
image_mood: >
  Dark studio photography, gold bokeh, silk textures, black marble,
  candlelight reflections, deep shadows with single light sources,
  watches/jewelry/architecture shot in chiaroscuro.
```

---

### PRESET C — Brutalist Signal
```yaml
identity: "Sem ornamento. Impacto direto. A mensagem É o design."
palette:
  background:   "#F5F0E8"   # off-white cru
  surface:      "#FFFFFF"
  primary:      "#0A0A0A"   # preto absoluto
  secondary:    "#FF3B30"   # vermelho sinal
  accent:       "#FFD60A"   # amarelo alerta
  text:         "#0A0A0A"
  muted:        "#6E6E6E"
typography:
  heading:      "Anton"            # condensed, agressivo
  body:         "Space Mono"       # monospace cru
  mono:         "Space Mono"
  heading_weight: 900
image_mood: >
  High-contrast B&W photography, grain texture, editorial cutouts,
  newspaper print overlays, raw concrete, industrial grids,
  protest posters aesthetic, CMYK misregistration effects.
```

---

### PRESET D — Vapor Clinic
```yaml
identity: "Estética clínica com alma vaporwave. Clean mas com personalidade Y2K."
palette:
  background:   "#F8F4FF"   # lavanda muito claro
  surface:      "#FFFFFF"
  primary:      "#A855F7"   # roxo vaporwave
  secondary:    "#22D3EE"   # cyan neon claro
  accent:       "#F472B6"   # pink pastel neon
  text:         "#1A0533"   # roxo escuro
  muted:        "#9CA3AF"
typography:
  heading:      "Space Grotesk"    # clean + caráter
  body:         "Outfit"
  mono:         "JetBrains Mono"
  heading_weight: 700
image_mood: >
  Pastel gradients, holographic foil textures, vaporwave sunsets,
  clean medical/lab aesthetics, translucent UI overlays,
  Y2K chrome effects, soft neon glows on white backgrounds,
  abstract 3D blobs in lavender/cyan/pink.
```

---

## §3. DESIGN SYSTEM FIXO — Regras Invioláveis de UI

### 3.1 Noise Global (CSS)
Todo layout DEVE incluir o ruído de textura global com opacidade 0.05.
Inserir IMEDIATAMENTE após o `<body>`:

```css
/* ── Cinematic Noise Overlay ── */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### 3.2 Bordas — rounded-[2rem]
- **Cards, Modais, Imagens de destaque:** `border-radius: 2rem` (32px)
- **Inputs, Chips, Tags:** `border-radius: 0.75rem` (12px)
- **Botões primários:** `border-radius: 9999px` (pill) — exceto Preset C (0px, brutalist)
- **Proibido:** border-radius < 8px em qualquer componente de card.

### 3.3 Botões Magnéticos
Todos os CTAs primários DEVEM implementar o efeito magnético com GSAP:

```javascript
// Magnetic Button — obrigatório em todos os CTAs primários
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});
```

Markup obrigatório: `<button data-magnetic ...>`

### 3.4 Ciclo de Animação via GSAP — Sequência Padrão
Toda landing page DEVE implementar a sequência de entrada abaixo:

```javascript
// Fase 1 — Hero entrance (executar no DOMContentLoaded)
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.from('[data-anim="hero-tag"]',    { opacity: 0, y: 20, duration: 0.6 })
  .from('[data-anim="hero-title"]',  { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
  .from('[data-anim="hero-sub"]',    { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
  .from('[data-anim="hero-cta"]',    { opacity: 0, scale: 0.9, duration: 0.5 }, '-=0.3');

// Fase 2 — Scroll-triggered sections (ScrollTrigger)
gsap.utils.toArray('[data-anim="fade-up"]').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});
```

Atributos `data-anim` obrigatórios em todos os elementos de destaque.

### 3.5 Importação GSAP — CDN Obrigatório
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script>gsap.registerPlugin(ScrollTrigger);</script>
```

---

## §4. ESTRUTURA DE SEÇÕES — Ordem Canônica

```
1. Hero          — Fullscreen (100svh), headline + sub + CTA magnético
2. Social Proof  — Logos ou depoimentos com foto (mín. 3)
3. Features      — Grid 3 colunas, benefit-focused, ícones + hover lift
4. Como Funciona — Steps numerados (3-4), linear, sem clutter
5. CTA Section   — Fundo com gradient do preset, CTA isolado, urgência opcional
6. Footer        — Minimal: logo + links legais + copyright
```

---

## §5. REGRAS DE QUALIDADE FINAL

| Check | Regra |
|-------|-------|
| Mobile-First | Breakpoint base = 375px. Nada é desktop-only. |
| Touch Targets | Mín. 44×44px em todos os elementos interativos. |
| Fonte Externa | Google Fonts via `<link rel="preconnect">` + `display=swap`. |
| Imagens | WebP obrigatório. `loading="lazy"` fora do hero. |
| Semântica | `<header>`, `<main>`, `<section>`, `<footer>`. Um único `<h1>`. |
| Contraste | Mínimo 7:1 para texto principal (WCAG AAA). |
| Performance | Lighthouse Mobile ≥ 85 esperado antes do deploy. |
| Noise Overlay | Sempre `pointer-events: none` e `z-index: 9999`. |

---

> **Este arquivo é a fonte de verdade estética e comportamental do Site Factory 3.0.**
> Nenhum agente pode ignorar o Gate das 4 Perguntas (§1) ou os Presets (§2).
> Violações devem ser documentadas em `ESTADO.md` como blocking issue.
