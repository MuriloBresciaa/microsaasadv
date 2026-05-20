# MASTER.md — Design System Canônico
# Estilo: Monumental Editorial / Warm Concrete
# Site Factory 2.0 · Fonte de Verdade Única

> **⚠️ ARQUIVO IMUTÁVEL:** Este documento é o padrão canônico de design para todos os projetos
> derivados do Site Factory 2.0. Qualquer alteração que desvie deste padrão é PROIBIDA
> sem aprovação explícita do arquiteto-chefe. Ver também: `.agents/rules/01_design_lock.md`.

---

## 1. Filosofia Visual

```
MONUMENTAL EDITORIAL — Peso tipográfico como arquitetura.
WARM CONCRETE — Materialidade orgânica, não frieza digital.
Anti-SaaS genérico. Anti-neon gratuito. Anti-cyan.
```

**Princípio-mestre:** Cada tela deve parecer a capa de uma revista de arquitetura de alto padrão —
peso editorial, espaço respirando, tipografia como protagonista.

---

## 2. Paleta de Cores (Tokens Canônicos)

> ⛔ É PROIBIDO usar cores raw como `red-500`, `blue-500`, `green-500`, `cyan-*` ou qualquer
> cor genérica de SaaS. Use EXCLUSIVAMENTE os tokens abaixo.

### 2.1 Backgrounds

| Token CSS                   | Valor HEX   | Uso                              |
|-----------------------------|-------------|----------------------------------|
| `--color-bg-void`           | `#0A0A08`   | True black quente (OLED-safe)    |
| `--color-bg-root`           | `#111110`   | Body background principal        |
| `--color-bg-surface`        | `#1A1A17`   | Cards, painéis, containers       |
| `--color-bg-raised`         | `#232320`   | Surfaces elevadas, hover states  |
| `--color-bg-overlay`        | `#2A2A26`   | Modais, dropdowns, tooltips      |
| `--color-bg-concrete`       | `#F5F0E8`   | Seções em light (warm off-white) |

### 2.2 Paleta Principal — Warm Concrete

| Token CSS                   | Valor HEX   | Nome semântico         | Uso                        |
|-----------------------------|-------------|------------------------|----------------------------|
| `--color-concrete-50`       | `#FDFAF4`   | Alabaster              | Backgrounds claros         |
| `--color-concrete-100`      | `#F5F0E8`   | Warm White             | Superfícies light          |
| `--color-concrete-200`      | `#E8E0D0`   | Linen                  | Borders, dividers          |
| `--color-concrete-300`      | `#D4C8B0`   | Warm Sand              | Ícones secundários         |
| `--color-concrete-400`      | `#B8A88A`   | Driftwood              | Texto secundário light     |
| `--color-concrete-500`      | `#8C7A60`   | Warm Concrete          | **Cor-base da paleta**     |
| `--color-concrete-600`      | `#6B5D47`   | Dark Concrete          | Texto em fundos claros     |
| `--color-concrete-700`      | `#4A4032`   | Charcoal Warm          | Texto principal            |
| `--color-concrete-800`      | `#2D2820`   | Espresso               | Headings em fundos claros  |
| `--color-concrete-900`      | `#1A1610`   | Near Black Warm        | Máximo contraste           |

### 2.3 Accent — Deep Navy

| Token CSS                   | Valor HEX   | Uso                                |
|-----------------------------|-------------|------------------------------------|
| `--color-navy-900`          | `#0B1120`   | Fundos de destaque escuros         |
| `--color-navy-800`          | `#112040`   | Cards de destaque                  |
| `--color-navy-700`          | `#1A3060`   | Hover states navy                  |
| `--color-navy-600`          | `#1E3A7A`   | Primário interativo                |
| `--color-navy-500`          | `#2348A0`   | **Deep Navy — Cor de ação**        |
| `--color-navy-400`          | `#3560C8`   | Hover em elementos navy            |
| `--color-navy-300`          | `#5C84D8`   | Ícones e badges                    |
| `--color-navy-200`          | `#96B0E8`   | Texto navy em fundos escuros       |
| `--color-navy-100`          | `#D0DDF8`   | Backgrounds navy sutis             |

### 2.4 CTA — Champagne Gold

| Token CSS                   | Valor HEX   | Uso                                |
|-----------------------------|-------------|------------------------------------|
| `--color-gold-900`          | `#3D2A00`   | Sombras douradas profundas         |
| `--color-gold-700`          | `#7A5500`   | Bordas e outlines dourados         |
| `--color-gold-600`          | `#A07010`   | Hover state dourado                |
| `--color-gold-500`          | `#C8901A`   | **Champagne Gold — CTA principal** |
| `--color-gold-400`          | `#D4A830`   | Gold brilhante                     |
| `--color-gold-300`          | `#E0C060`   | Highlights tipográficos            |
| `--color-gold-200`          | `#EDD890`   | Gradientes gold sutis              |
| `--color-gold-100`          | `#F8F0C8`   | Backgrounds dourados suaves        |

### 2.5 Sistema de Texto

| Token CSS                   | Valor HEX   | Uso                        |
|-----------------------------|-------------|----------------------------|
| `--color-text-primary`      | `#F5F0E8`   | Texto principal (dark mode)|
| `--color-text-secondary`    | `#C8B89A`   | Texto secundário           |
| `--color-text-muted`        | `#7A6C58`   | Placeholders, labels       |
| `--color-text-inverse`      | `#1A1610`   | Texto em fundos claros     |
| `--color-text-gold`         | `#C8901A`   | Texto accent dourado       |
| `--color-text-navy`         | `#3560C8`   | Links e destaques navy     |

### 2.6 Borders & Separators

| Token CSS                   | Valor HEX   | Uso                       |
|-----------------------------|-------------|---------------------------|
| `--color-border-subtle`     | `#2A2620`   | Bordas sutis (dark)       |
| `--color-border-default`    | `#3A3428`   | Bordas padrão             |
| `--color-border-strong`     | `#5A4E3A`   | Bordas de destaque        |
| `--color-border-gold`       | `rgba(200, 144, 26, 0.4)` | Bordas douradas |

---

## 3. Tipografia (Canônica e Imutável)

> ⛔ É PROIBIDO usar Bodoni, Cyan/neon fonts, ou qualquer fonte do browser.
> As três famílias abaixo são as ÚNICAS fontes autorizadas.

### 3.1 Stack Tipográfica

| Papel              | Família        | Pesos         | Uso                                |
|--------------------|----------------|---------------|------------------------------------|
| **Display**        | `Anton`        | 400 (regular) | H1 hero, banners, números grandes  |
| **Interface**      | `Geist`        | 300–700       | UI, labels, botões, navegação      |
| **Body / Leitura** | `Inter`        | 300–600       | Parágrafos, copy, textos longos    |

### 3.2 Google Fonts — Import Canônico

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

> `Geist` é carregada via `npm install geist` (Vercel) ou CDN próprio.

### 3.3 Escala Tipográfica

| Token              | Tamanho      | Família  | Peso | Line Height | Uso                    |
|--------------------|--------------|----------|------|-------------|------------------------|
| `.text-display-2xl`| `clamp(3.5rem, 8vw, 7rem)` | Anton | 400 | 0.9 | Heroes monumentais |
| `.text-display-xl` | `clamp(2.5rem, 6vw, 5rem)` | Anton | 400 | 0.95 | H1 de seção |
| `.text-display-lg` | `clamp(2rem, 4vw, 3.5rem)` | Anton | 400 | 1.0 | H2 de destaque |
| `.text-heading-xl` | `2rem`       | Geist    | 700  | 1.2         | H2 de interface        |
| `.text-heading-lg` | `1.5rem`     | Geist    | 600  | 1.3         | H3                     |
| `.text-heading-md` | `1.25rem`    | Geist    | 600  | 1.4         | H4, subtítulos         |
| `.text-body-lg`    | `1.125rem`   | Inter    | 400  | 1.7         | Corpo principal        |
| `.text-body-md`    | `1rem`       | Inter    | 400  | 1.6         | Corpo padrão           |
| `.text-body-sm`    | `0.875rem`   | Inter    | 400  | 1.5         | Notas, captions        |
| `.text-label`      | `0.75rem`    | Geist    | 500  | 1.4         | Labels, badges, tags   |
| `.text-mono`       | `0.875rem`   | `monospace` | 400 | 1.6      | Código inline          |

---

## 4. Utilities Globais (CSS Classes)

### 4.1 Glassmorphism — `.glass`

```css
.glass {
  background: rgba(26, 22, 16, 0.7);
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  border: 1px solid var(--color-border-gold);
  border-radius: 8px;
}

.glass-light {
  background: rgba(245, 240, 232, 0.8);
  backdrop-filter: blur(16px) saturate(1.8);
  -webkit-backdrop-filter: blur(16px) saturate(1.8);
  border: 1px solid rgba(200, 144, 26, 0.2);
  border-radius: 8px;
}
```

### 4.2 Gradientes de Texto — `.text-gradient-gold`

```css
.text-gradient-gold {
  background: linear-gradient(135deg, #C8901A 0%, #E0C060 50%, #C8901A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-navy {
  background: linear-gradient(135deg, #3560C8 0%, #96B0E8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-concrete {
  background: linear-gradient(180deg, #F5F0E8 0%, #8C7A60 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 4.3 Shadows & Elevation

```css
/* Sombras neutras quentes */
--shadow-sm:   0 1px 3px rgba(10, 10, 8, 0.4);
--shadow-md:   0 4px 16px rgba(10, 10, 8, 0.5);
--shadow-lg:   0 12px 40px rgba(10, 10, 8, 0.6);
--shadow-xl:   0 24px 80px rgba(10, 10, 8, 0.7);

/* Sombras douradas (CTA/hover) */
--shadow-gold-sm: 0 2px 8px rgba(200, 144, 26, 0.3);
--shadow-gold-md: 0 4px 20px rgba(200, 144, 26, 0.4);
--shadow-gold-lg: 0 8px 40px rgba(200, 144, 26, 0.5);

/* Sombras navy (elementos de ação) */
--shadow-navy-md: 0 4px 20px rgba(35, 72, 160, 0.4);
```

### 4.4 Spacing Scale

```css
--spacing-px:   1px;
--spacing-1:    0.25rem;   /* 4px  */
--spacing-2:    0.5rem;    /* 8px  */
--spacing-3:    0.75rem;   /* 12px */
--spacing-4:    1rem;      /* 16px */
--spacing-6:    1.5rem;    /* 24px */
--spacing-8:    2rem;      /* 32px */
--spacing-10:   2.5rem;    /* 40px */
--spacing-12:   3rem;      /* 48px */
--spacing-16:   4rem;      /* 64px */
--spacing-20:   5rem;      /* 80px */
--spacing-24:   6rem;      /* 96px */
--spacing-32:   8rem;      /* 128px */
--spacing-section: clamp(4rem, 10vw, 8rem); /* Ritmo entre seções */
```

### 4.5 Border Radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-full: 9999px;   /* Pills, avatars */
```

---

## 5. Componentes Padrão

### 5.1 Botão CTA (Champagne Gold)

```html
<button class="btn-gold">Agendar Agora</button>
```

```css
.btn-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  min-height: 48px;         /* Touch target ≥ 44px */
  font-family: 'Geist', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #0A0A08;
  background: linear-gradient(135deg, #C8901A 0%, #E0C060 100%);
  border: none;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-gold-md);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold-lg);
  filter: brightness(1.08);
}
.btn-gold:active {
  transform: translateY(0);
  box-shadow: var(--shadow-gold-sm);
}
```

### 5.2 Botão Secundário (Ghost Navy)

```css
.btn-navy-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  min-height: 48px;
  font-family: 'Geist', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--color-navy-300);
  background: transparent;
  border: 1px solid rgba(53, 96, 200, 0.4);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-navy-ghost:hover {
  background: rgba(35, 72, 160, 0.15);
  border-color: var(--color-navy-400);
  color: var(--color-navy-200);
}
```

### 5.3 Card Padrão

```css
.card-editorial {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.card-editorial:hover {
  border-color: var(--color-border-gold);
  box-shadow: var(--shadow-gold-sm);
}
```

---

## 6. Motion & Animação

| Parâmetro        | Valor                          | Regra                               |
|------------------|--------------------------------|-------------------------------------|
| Duração padrão   | `200ms — 400ms`                | Nunca abaixo de 150ms               |
| Duração longa    | `600ms — 1000ms`               | Só para page transitions            |
| Easing padrão    | `cubic-bezier(0.4, 0, 0.2, 1)`| Material ease-out                   |
| Easing spring    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-bounce em CTAs          |
| Library          | Framer Motion                  | NUNCA CSS keyframes para interações |

---

## 7. Grid & Layout

```css
/* Container principal */
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 4rem);
}

/* Grid editorial 12 colunas */
.grid-editorial {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(1rem, 2vw, 2rem);
}

/* Seções com ritmo vertical */
.section {
  padding-block: var(--spacing-section);
}
```

---

## 8. Regras Inegociáveis (Iron Laws)

1. **Fontes:** SOMENTE `Anton`, `Geist` e `Inter`. Nenhuma outra.
2. **Cores:** SOMENTE os tokens definidos neste documento. Proibido `cyan`, `blue-500`, `red-500`, etc.
3. **Mobile-first:** Todo layout começa no menor viewport. `min-width` breakpoints.
4. **Touch targets:** Mínimo `44×44px` (idealmente `48×48px`) em todos elementos interativos.
5. **Contrast ratio:** Mínimo `7:1` para texto principal. Mínimo `4.5:1` para texto secundário.
6. **Sem inline styles:** 100% via CSS tokens e classes utilitárias.
7. **Sem cores genéricas:** `.text-gradient-gold`, `.glass`, `.btn-gold` — sempre classes semânticas.
8. **Dark mode nativo:** Sem toggle. O tema padrão é escuro (Warm Concrete dark).

---

*Documento criado em: 2026-04-30*
*Última atualização: 2026-04-30*
*Autor: Antigravity — Site Factory 2.0 Architecture Team*
*Status: CANÔNICO E IMUTÁVEL — Ver `.agents/rules/01_design_lock.md`*
