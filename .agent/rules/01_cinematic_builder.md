# 01 — Cinematic Builder (JurisAI)

> Regra de execução obrigatória para todo agente que produzir ou alterar uma interface pública ou privada neste repositório.
> Última atualização: 2026-05-21

---

## §1. REGRA DAS 4 PERGUNTAS — GATE OBRIGATÓRIO

**ANTES de escrever uma linha de código ou HTML que crie ou altere uma rota pública ou tela da aplicação, o agente DEVE disparar UMA única chamada `AskUserQuestion` contendo as 4 perguntas abaixo.**
Nenhuma suposição é permitida. Se o usuário omitir alguma resposta, use os defaults indicados.

```
PERGUNTA 1 — Marca / Propósito
"Qual é o nome da marca/produto e qual a ação principal que o visitante deve realizar?"
Default: marca = "JurisAI", ação = "Iniciar período de trial gratuito de 7 dias"

PERGUNTA 2 — Estética (Preset)
"Qual preset estético você quer usar?
  A) Monumental Editorial / Warm Concrete (Estética canônica JurisAI)
  B) Midnight Luxe (Preset escuro premium)"
Default: A (Monumental Editorial / Warm Concrete)

PERGUNTA 3 — 3 Propostas de Valor
"Liste as 3 principais propostas de valor (benefícios, não features).
Exemplo: 'Segurança absoluta 3FN / Sem exigência de cartão de crédito / Diagnósticos em segundos'"
Default: "Diagnósticos em segundos / Sem exigência de cartão / Conformidade com a OAB"

PERGUNTA 4 — CTA Principal
"Qual o texto e destino do botão CTA principal?
Exemplo: 'Começar Trial de 7 Dias → /app/auth' ou 'Demonstração Prática'"
Default: "Começar Trial de 7 Dias → /app/auth"
```

**Só avance após receber as respostas (ou expirar o timeout com os defaults).**

---

## §2. PRESET ESTÉTICO CANÔNICO — Monumental Editorial / Warm Concrete

A estética oficial JurisAI é **imparcial, purista e baseada em tipografia editorial premium com materiais físicos**.

```yaml
identity: "Monumental Editorial / Warm Concrete. Inspiração: Apple Hardware, Dell Premium, Hostinger Cinema."
palette:
  background:   "#f5f5f4"   # Warm Concrete
  surface:      "#ffffff"   # Card Surface
  contrast:     "#0f172a"   # Deep Navy (seções escuras, footer)
  primary:      "#1d1d1f"   # True Charcoal
  secondary:    "#86868b"   # Muted Metallic
  accent:       "#b8860b"   # Burnished Gold
  whatsapp:     "#25d366"   # WhatsApp Green (conversão)
  border:       "rgba(29, 29, 31, 0.06)" # Borda translúcida
typography:
  heading:      "SF Pro Display" # Apple Local
  body:         "SF Pro Text"    # Apple Local
  heading_weight: 800
image_mood: >
  Fotografia de estúdio clean, luz suave difusa, texturas de concreto
  claro, alumínio usinado, refração óptica estilo Liquid Glass,
  representações minimalistas de documentos e timelines factuais.
```

---

## §3. DESIGN SYSTEM FIXO — Regras Invioláveis de UI

### 3.1 Noise Global (CSS)
Todo layout DEVE incluir o ruído de textura global com opacidade 0.03.
Inserir IMEDIATAMENTE após o `<body>`:

```css
/* ── Cinematic Noise Overlay ── */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### 3.2 Bordas — rounded-[32px]
- **Cards, Modais, Previews de destaque:** `border-radius: 32px` (2rem) com sombra de oclusão suave
- **Inputs, Chips, Tags:** `border-radius: 12px` (0.75rem)
- **Botões primários:** `border-radius: 9999px` (pill)
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

Markup obrigatório: `<button data-magnetic ...>` ou `<a data-magnetic ...>`

### 3.4 Ciclo de Animação via GSAP — Sequência Padrão
Toda página DEVE implementar a sequência de entrada abaixo:

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

### 3.5 Importação GSAP
GSAP e seus plugins são gerenciados localmente no script client de cada rota ou carregados de forma otimizada via Astro.

---

## §4. ESTRUTURA DE SEÇÕES — Ordem Canônica

```
1. Header Capsule — Navbar flutuante suspensa (top-4) que contrai ao rolar
2. Hero Section   — Grid assimétrico, headline True Charcoal, CTA magnético e Cinema Video Box
3. Manifesto      — Espaçamento py-36 a py-44, Manifesto Tipográfico com scroll sheens
4. Bento Features — Grid 3 colunas assimétricas (Engine 1: 2 col, Engine 2: 1 col, Engine 3: 3 col)
5. Trust Lineup   — Governança de privacidade e ética OAB (estilo Apple Trust Lineup)
6. Pricing Card   — Hardware box com Fresnel island, 7 dias grátis sem cartão
7. Footer Capsule — Links institucionais minimalistas
```

---

## §5. REGRAS DE QUALIDADE FINAL

| Check | Regra |
|-------|-------|
| Mobile-First | Breakpoint base = 375px. Escala e espaçamento ordenados para mobile. |
| Touch Targets | Mín. 44×44px em todos os elementos interativos (Apple HIG). |
| Fontes Locais | Apenas pilhas locais de SF Pro. Zero fontes de CDN. |
| Imagens | WebP obrigatório com loading="lazy" fora da dobra. |
| Semântica | `<header>`, `<main>`, `<section>`, `<footer>`. Um único `<h1>` por página. |
| Contraste | Mínimo 7:1 para legibilidade premium no Warm Concrete. |
| GPU Gates | Aceleração nativa via `will-change: transform` e `translate3d` em animações. |
| Noise Overlay | Sempre `pointer-events: none` e `z-index: 9999`. |

---

> **Este arquivo é a fonte de verdade estética e comportamental do JurisAI.**
> Qualquer agente que violar a estética Monumental Editorial / Warm Concrete será impedido no QA.
