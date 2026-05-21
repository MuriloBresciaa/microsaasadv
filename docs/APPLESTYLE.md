Um squircle bem implementado + tipografia SF-like + espaço em branco relacional + sombras em camadas te dá exatamente esse “clean & professional” Apple-grade. [pixelation](https://pixelation.org/squircle-the-shape-that-is-so-close-to-a-square-but-actually-isnt-ycx)

***

## 1. Matemática e engenharia do squircle (G2)

### 1.1 Fórmula exata (superelipse / Lamé)

- O “squircle” da Apple é um caso de superelipse (curva de Lamé), descrita por  
  \(\left|\frac{x}{a}\right|^n + \left|\frac{y}{b}\right|^n = 1\), com \(a, b\) semi-eixos e \(n > 2\) controlando o quão “quadrado” é o shape.  [pixelation](https://pixelation.org/squircle-the-shape-that-is-so-close-to-a-square-but-actually-isnt-ycx)  
- Quando \(n = 2\) é um círculo; à medida que \(n\) cresce, a curva aproxima um quadrado com cantos suavizados; em torno de \(n \approx 4\) temos o “squircle clássico”, e estudos recentes indicam que ícones da Apple usam algo próximo de um superelipse quintíca (\(n \approx 5\)). [grida](https://grida.co/docs/math/superellipse)
- Diferente de um rounded-rectangle com `border-radius`, a superelipse tem continuidade de curvatura (G2): a curvatura varia de forma suave da face reta até o canto, ao contrário do “degrau” de curvatura que existe onde a reta encontra um arco circular. [johndcook](https://www.johndcook.com/blog/2018/02/13/squircle-curvature/)

### 1.2 Por que `border-radius` é “matematicamente errado”

- Um retângulo com `border-radius` é composto por quatro retas (curvatura 0) e quatro arcos de círculo (curvatura constante \(1/r\)), com um salto brusco na curvatura exatamente no ponto de tangência. [pixelation](https://pixelation.org/squircle-the-shape-that-is-so-close-to-a-square-but-actually-isnt-ycx)
- O olho percebe esse salto como “quebra de canto”, o que gera reflexos de luz mais ásperos em objetos físicos e um contorno menos orgânico em UI, enquanto superelipses distribuem a curvatura ao longo da borda, o que dá o efeito “carro caro / hardware polido”. [grida](https://grida.co/docs/math/superellipse)

***

## 1.3 Implementando squircle em web moderna

Vou dividir em: futuro nativo CSS, SVG/mascara robusta e libs prontas.

#### a) CSS nativo: `corner-shape: squircle` (Chromium recente)

- Browsers Chromium recentes começaram a implementar `corner-shape: squircle` junto de `border-radius`, permitindo um squircle matemático sem hacks. [azurefx](https://azurefx.pl/post/css-squircle)
- Exemplo básico em CSS puro:

```html
<div class="card-squircle">
  Conteúdo
</div>
```

```css
.card-squircle {
  width: 14rem;
  height: 8rem;
  border-radius: 30%;
  /* Chromium 137+ com flag experimental */
  corner-shape: squircle;
  background: #f5f5f7;
}
```

- `corner-shape: squircle` mantém a “personalidade” do squircle mesmo quando o retângulo não é 1:1, preservando a continuidade de curvatura melhor que um SVG mal parametrizado. [orgpad](https://orgpad.info/blog/squircles)

Tailwind (via `@layer utilities`):

```css
@layer utilities {
  .squircle {
    border-radius: 30%;
    corner-shape: squircle;
  }
}
```

```html
<div class="squircle bg-zinc-100 w-56 h-32"></div>
```

#### b) SVG `clip-path` robusto (cross-browser)

O grande problema do `clipPathUnits="objectBoundingBox"` é que o caminho normalizado 0–1 é escalado de forma diferente em X e Y quando o elemento é retangular, “esticando” o squircle em uma elipse estranha. [stackoverflow](https://stackoverflow.com/questions/76321736/how-to-create-a-squircle-with-a-border)

Solução mais estável:

- Definir o path em `userSpaceOnUse` com um `viewBox` fixo (ex.: 0–100) e deixar o browser escalar proporcionalmente.
- Manter a proporção da máscara quadrada e controlar o aspecto do card com padding/altura, não deformando o mask.

```html
<svg width="0" height="0" style="position:absolute">
  <defs>
    <clipPath id="squircle-100" clipPathUnits="userSpaceOnUse">
      <!-- Superelipse aproximada 100x100 (ex. n≈4–5) -->
      <path d="M50 5
               C78 5 95 22 95 50
               C95 78 78 95 50 95
               C22 95 5 78 5 50
               C5 22 22 5 50 5Z" />
    </clipPath>
  </defs>
</svg>

<div class="card">
  Conteúdo
</div>
```

```css
.card {
  /* Mantém proporção “quase quadrada” dentro do layout */
  inline-size: min(22rem, 100%);
  aspect-ratio: 4 / 3;
  clip-path: url(#squircle-100);
  background: #f5f5f7;
}
```

- Aqui o elemento pode ser 4:3, mas como a máscara é pensada em espaço próprio, a distorção é muito menor e previsível do que com `objectBoundingBox`. [azurefx](https://azurefx.pl/post/css-squircle)

Tailwind (conceito):

```html
<div class="card-squircle bg-zinc-100"></div>
```

```css
@layer utilities {
  .card-squircle {
    inline-size: min(22rem, 100%);
    aspect-ratio: 4 / 3;
    clip-path: url(#squircle-100);
  }
}
```

#### c) `mask-image` para imagens/fundos complexos

- `mask-image` permite usar um SVG de squircle como máscara opaca, útil para fotos e gradientes. [azurefx](https://azurefx.pl/post/css-squircle)

```css
.squircle-mask {
  /* Card flexível, mas máscara permanece “quadrada” */
  inline-size: min(20rem, 100%);
  aspect-ratio: 3 / 2;

  mask-image: url("data:image/svg+xml,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>\
<path d='M50 5 C78 5 95 22 95 50 C95 78 78 95 50 95 C22 95 5 78 5 50 C5 22 22 5 50 5Z' fill='black'/>\
</svg>");
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  background: url(hero.jpg) center/cover no-repeat;
}
```

- Esse padrão evita que o browser distorça o caminho com base no bounding box do elemento; a máscara é encaixada “contida”, preservando o squircle. [azurefx](https://azurefx.pl/post/css-squircle)

Tailwind (utilitário):

```css
@layer utilities {
  .mask-squircle {
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;
    mask-image: url("data:image/svg+xml,<svg ...>...</svg>");
  }
}
```

***

### 1.4 Evitando deformação em retângulos

Táticas de engenharia que funcionam bem em produção:

- Proporção controlada + padding interno  
  - Mantenha o container com `aspect-ratio` suave (ex.: 4/3 para cards, 3/1 para buttons pill) e deixe o conteúdo respirar com padding; o squircle é aplicado no container visual, não em um bloco super achatado. [reddit](https://www.reddit.com/r/tailwindcss/comments/16dzufp/how_to_achieve_this_using_tailwind_they_are_not/)
- Squircle num pseudo-elemento quadrado  
  - Crie um `::before` quadrado com squircle, centralizado, e use o elemento real apenas como layout retangular.

```css
.btn-squircle {
  position: relative;
  padding-inline: 2.5rem;
  padding-block: 0.8rem;
  color: #111827;
  isolation: isolate; /* para não vazar z-index */
}

.btn-squircle::before {
  content: "";
  position: absolute;
  inset: 0;
  margin-inline: auto;
  max-width: 10rem;
  aspect-ratio: 1 / 1;
  clip-path: url(#squircle-100);
  background: #e5e7eb;
  z-index: -1;
  /* Shadow suave (ver seção 4) */
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.08),
    0 6px 16px rgba(15, 23, 42, 0.06);
}
```

- Assim você pode ter um botão bem largo e ainda manter o “núcleo visual” squircle, sem deformar o shape.  

- Libs que já tratam o raio vs smoothing  
  - `figma-squircle` e wrappers como `corner-smoothing` ou `@squircle-js/*` implementam a mesma lógica de “corner smoothing” do Figma, com um parâmetro `cornerSmoothing` de 0 (igual ao `border-radius`) até 1 (superellipse completa, estilo iOS icons). [github](https://github.com/sanalabs/corner-smoothing)
  - `cornerSmoothing ≈ 0.6` é frequentemente citado como “iOS-like”, enquanto valores mais altos (0.8–1.0) criam shapes mais decorativos. [squircle.js](https://squircle.js.org/docs/svelte-corner-smoothing)

***

## 2. Tipografia purista e escala (Deep Typography)

### 2.1 Como a Apple faz SF Pro parecer “premium”

- A Apple usa SF Pro com tamanhos e optical sizes diferentes para texto (SF Pro Text, até 19pt) e títulos (SF Pro Display, a partir de 20pt), garantindo traços ligeiramente ajustados e melhor legibilidade por faixa de tamanho. [gist.github](https://gist.github.com/eonist/b9c180a67980c6e18a5184f19bff68fa)
- A família San Francisco aplica tracking dinâmico: o sistema ajusta o espaçamento entre letras conforme o corpo, mantendo leitura e evitando aparência “apertada” em pequenos tamanhos e “esparsa” em títulos grandes. [developer.apple](https://developer.apple.com/fonts/)
- Guias comunitários que replicam o HIG mostram padrões claros: corpo padrão 17pt, tracking levemente negativo (~−0.43px), leading por volta de 120–130%; display titles de 28–34pt com tracking mais negativo (até ~−1.05px) e leading mais colado (~110–120%). [gist.github](https://gist.github.com/eonist/4eea05ab911336d39f0b3e715a4aa592)

Tradução pragmática para web (Inter/Geist/SF Pro via CSS):

- Corpo primário:  
  - `font-size: 1rem–1.0625rem` (16–17px), `line-height: 1.3`, `letter-spacing: -0.01em`.  
- Subtexto / meta:  
  - 0.875rem, `line-height: 1.4`, `letter-spacing: 0em` ou levemente positivo para micro-legendas.  
- Títulos:  
  - Display hero: 3–4rem, `line-height: 1.05–1.1`, `letter-spacing: -0.04em`.  
  - Title 1 (seção): ~1.75–2rem, `line-height: 1.15`, `letter-spacing: -0.02em`.  

Esses números batem bem com as tabelas de “Large Title 34pt, tracking -1.05px, leading ~41pt” e “Title 1 28pt, tracking -0.8px, leading ~34pt” usadas para mimetizar a tipografia do iOS em Figma. [gist.github](https://gist.github.com/eonist/b9c180a67980c6e18a5184f19bff68fa)

### 2.2 Tokens tipográficos sugeridos (CSS / Tailwind)

CSS simples:

```css
:root {
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
               "SF Pro Display", "Inter", sans-serif;
}

.text-body {
  font-family: var(--font-sans);
  font-size: 1.0625rem;      /* ~17px */
  line-height: 1.32;         /* ~22.5px */
  letter-spacing: -0.01em;
  font-weight: 400;
}

.text-subtle {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.4;
  letter-spacing: 0em;
  color: #6b7280;
}

.text-title {
  font-family: var(--font-sans);
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
}

.text-display {
  font-family: var(--font-sans);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 700;
}
```

Tailwind (config):

```js
// tailwind.config.mjs
export default {
  theme: {
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'SF Pro Text',
        'SF Pro Display',
        'Inter',
        'sans-serif',
      ],
    },
    extend: {
      fontSize: {
        body: ['1.0625rem', { lineHeight: '1.32', letterSpacing: '-0.01em' }],
        sub: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        title: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        display: ['clamp(2.5rem,4vw,3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
      },
    },
  },
}
```

Uso:

```html
<h1 class="text-display font-sans">MacBook Pro</h1>
<p class="text-body mt-3 max-w-prose">
  Potência absurda em um design mínimo.
</p>
<p class="text-sub mt-1">
  Chip M-series • Tela Liquid Retina XDR • Até 22 horas de bateria
</p>
```

***

### 2.3 Relação tracking vs leading em títulos x subtextos

Padrão Apple-like que evita cara de “template de IA”:

- Títulos grandes:  
  - Leading colado (1.05–1.15) + tracking bem negativo (−0.03 a −0.06em) → bloco denso, industrial. [developer.apple](https://developer.apple.com/videos/play/wwdc2020/10175/)
- Subtítulos imediatamente abaixo:  
  - Leading mais solto (1.25–1.35) + tracking menos agressivo (−0.01em ou 0) → texto “respira”, mas continua alinhado com o hero. [gist.github](https://gist.github.com/eonist/4eea05ab911336d39f0b3e715a4aa592)
- Corpo/descrição:  
  - Leading estável (1.3) + tracking leve para legibilidade; não use tracking negativo forte em parágrafo longo. [developer.apple](https://developer.apple.com/videos/play/wwdc2020/10175/)

Resultado: títulos parecem cortados em metal, subtextos parecem interface, não landing de template.

***

## 3. Psicologia do espaço em branco e layout não-linear

### 3.1 Como a Apple usa whitespace

- As HIG enfatizam clareza, deference e depth: a UI deve servir de moldura para o conteúdo, com hierarquia visual clara e muito espaço negativo para evitar competição entre elementos. [developer.apple](https://developer.apple.com/design/human-interface-guidelines)
- Na prática, layouts Apple-like combinam um grid base de 8pt (4pt para micro-ajustes) com espaçamentos maiores entre seções (24–32pt+) e grandes margens laterais em desktop, o que dá a sensação “editorial”. [gist.github](https://gist.github.com/eonist/e79ca41b312362682343c41f63062734)
- Designers que estudam spacing “como a Apple” sugerem:  
  - 8–12px entre label e input,  
  - 16–24px dentro de cards,  
  - 24–32px entre blocos de conteúdo,  
  - tap targets mínimo 44×44px. [linkedin](https://www.linkedin.com/posts/tsavsar_design-uidesign-uxdesign-activity-7341741253027360769-mhSI)

Tailwind (tokens intuitivos):

```js
extend: {
  spacing: {
    'space-1': '0.5rem',   // 8
    'space-2': '1rem',     // 16
    'space-3': '1.5rem',   // 24
    'space-4': '2rem',     // 32
  },
}
```

### 3.2 Grids, “grid breaks” e narrativa

- O grid base é simples (colunas, 8pt baseline), mas a Apple quebra a simetria com: hero full-bleed, cards que “escapam” da coluna, imagens que ultrapassam o container de texto, etc., para criar ritmo editorial. [medium](https://medium.com/@shivaniy0211/apples-human-interface-guidelines-vs-google-s-material-design-guidelines-e28db15028c0)
- A regra cognitiva: elementos com relação forte (título + subtítulo + CTA) ficam mais próximos; relações fracas (seções diferentes) ganham mais espaço, o que reforça agrupamento visual e reduz aparência de “parágrafos blocados”. [linkedin](https://www.linkedin.com/posts/tsavsar_design-uidesign-uxdesign-activity-7341741253027360769-mhSI)

Layout exemplo em Tailwind:

```html
<section class="bg-[#f5f5f7] text-slate-900">
  <div class="mx-auto max-w-6xl px-6 py-20">
    <!-- HERO: texto estreito + imagem grande -->
    <div class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center">
      <div class="space-y-4">
        <p class="text-sub uppercase tracking-[0.18em] text-slate-500">
          MacBook Pro
        </p>
        <h1 class="text-display">
          Potência que desaparece na sua mesa.
        </h1>
        <p class="text-body max-w-md text-slate-600">
          Um notebook tão silencioso e eficiente que você só lembra dele
          quando precisa de mais performance.
        </p>
        <div class="flex gap-4 pt-4">
          <button class="btn-squircle px-6 py-2 text-sm font-semibold">
            Comprar
          </button>
          <button class="text-sub underline-offset-4 hover:underline">
            Saiba mais
          </button>
        </div>
      </div>

      <!-- Imagem “breakando” o grid -->
      <div class="relative">
        <div class="aspect-[16/9] rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-slate-200
                    shadow-[0_18px_48px_rgba(15,23,42,0.18)] translate-x-4 lg:translate-x-10">
          <!-- mock de produto -->
        </div>
      </div>
    </div>

    <!-- espaçamento generoso entre seções -->
    <div class="mt-24 grid gap-12 md:grid-cols-3">
      <!-- cards menores, alinhados na baseline -->
    </div>
  </div>
</section>
```

- Note como o hero quebra o grid com `translate-x` e bordas muito arredondadas, enquanto o copy fica em uma coluna estreita com bastante espaço lateral → vibe “editorial + hardware hero”.  

***

## 4. Volumetria de hardware em interfaces claras

### 4.1 Princípios: Depth, não skeuomorfismo pesado

- As HIG falam de depth como um dos três pilares: camadas, sombras e motion para comunicar hierarquia e relações espaciais, sem cair no skeuomorfismo literal antigo. [medium](https://medium.com/@shivaniy0211/apples-human-interface-guidelines-vs-google-s-material-design-guidelines-e28db15028c0)
- A tendência atual é um “novo skeuomorfismo” suave (soft UI, claymorphism, etc.), com volumes abstratos, sombras difusas e superfícies macias, que se aproxima do que Apple e outros chamam de “liquid glass”. [medium](https://medium.com/@uxuip29/skeuomorphism-flat-design-and-neumorphism-the-evolution-of-ui-design-77870b4f616b)

### 4.2 Sombras com oclusão ambiente (Ambient Occlusion)

- Estudos de CSS shadows modernos quebram a sombra em três camadas:  
  - contato (ambient occlusion),  
  - umbra (mais concentrada),  
  - penumbra (bem difusa). [nineproo](https://nineproo.com/blog/modern-css-shadow-effects)
- Um stack típico “buttery smooth”:

```css
.surface-elevated {
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.06),   /* AO – contato */
    0 4px 8px rgba(15, 23, 42, 0.05),   /* umbra */
    0 12px 30px rgba(15, 23, 42, 0.04); /* penumbra */
}
```

- Isso é consistente com guias que mostram sombras multi-camadas para simular profundidade realista, em vez de `box-shadow: 0 10px 20px rgba(0,0,0,0.3)` plano. [nineproo](https://nineproo.com/blog/modern-css-shadow-effects)

Tailwind (via plugin ou utilitário):

```css
@layer utilities {
  .shadow-soft {
    box-shadow:
      0 1px 2px rgba(15,23,42,0.06),
      0 4px 8px rgba(15,23,42,0.05),
      0 12px 30px rgba(15,23,42,0.04);
  }
}
```

### 4.3 Fundo claro com ruído microscópico

- Fundos branco-alabastro puro (#F9F9FB) podem parecer esterilizados e “clínicos”; designers resolvem isso com overlays de ruído fractal muito sutis, adicionando textura quase imperceptível. [versions](https://versions.com/design/the-evolution-of-skeuomorphism-claymorphism-neumorphism-and-the-return-of-tactile-interfaces/)
- Prática comum: usar um PNG/SVG de noise em escala 2×–4×, `opacity: 0.03–0.06`, para quebrar banding de gradiente e dar sensação de “material físico”. [medium](https://medium.com/@uxuip29/skeuomorphism-flat-design-and-neumorphism-the-evolution-of-ui-design-77870b4f616b)

CSS:

```css
.bg-alabaster {
  background-color: #f9f9fb;
  position: relative;
  overflow: hidden;
}

.bg-alabaster::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url('/textures/noise-80k.png');
  background-size: 220px 220px;
  mix-blend-mode: soft-light;
  opacity: 0.04;
}
```

Tailwind-style:

```html
<section class="relative overflow-hidden bg-[#f9f9fb]">
  <div class="noise-layer pointer-events-none absolute inset-0"></div>
  <!-- conteúdo -->
</section>
```

```css
@layer components {
  .noise-layer {
    background-image: url('/textures/noise-80k.png');
    background-size: 220px 220px;
    mix-blend-mode: soft-light;
    opacity: 0.04;
  }
}
```

### 4.4 Anéis de contorno translúcidos (borders/rings)

- Apple usa bordas sutis, semi-translúcidas, para simular o “anel” de vidro/cantiliver em cards e controles: bordas claras no lado iluminado, um leve darkening no lado oposto, reforçando volume sem parecer neumorphism exagerado. [linkedin](https://www.linkedin.com/posts/robindhanwani_designthinking-digitalaccessibility-interfacedesign-activity-7339273200628920321-5Jxs)
- Em CSS, é comum combinar `border` clarinho + `box-shadow` interno ou um `outline` suave.

Exemplo Apple-like de card em light mode:

```css
.card-glass {
  position: relative;
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.35); /* “anel” frio */
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.9),      /* halo externo leve */
    0 14px 32px rgba(15, 23, 42, 0.18);        /* depth principal */
  backdrop-filter: blur(18px);
}
```

Tailwind:

```html
<div
  class="card-glass relative rounded-[1.75rem] border border-slate-300/60
         bg-white/80 shadow-[0_0_0_0.5px_rgba(255,255,255,0.9),0_14px_32px_rgba(15,23,42,0.18)]
         backdrop-blur-xl">
  <!-- conteúdo -->
</div>
```

- Em torno de botões ou inputs, você pode usar `ring-1 ring-slate-900/5` para criar esse contorno translúcido que lembra a borda do alumínio polido. [gist.github](https://gist.github.com/eonist/4eea05ab911336d39f0b3e715a4aa592)

***

### 4.5 Montando tudo num componente “Apple-grade”

Exemplo de card completo (HTML + Tailwind) que combina squircle, tipografia, depth e ruído:

```html
<section class="relative overflow-hidden bg-[#f9f9fb] text-slate-900">
  <div class="noise-layer pointer-events-none absolute inset-0"></div>

  <div class="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center">
    <div class="space-y-4 max-w-md">
      <p class="text-sub uppercase tracking-[0.18em] text-slate-500">
        MacBook Pro
      </p>
      <h1 class="text-display">
        Performance absurda, silêncio absoluto.
      </h1>
      <p class="text-body text-slate-600">
        Um design tão limpo que todo o ruído visual desaparece e só sobra o hardware.
      </p>
      <div class="flex gap-4 pt-4">
        <button class="btn-squircle px-6 py-2 text-sm font-semibold">
          Comprar
        </button>
        <button class="text-sub underline-offset-4 hover:underline">
          Ver especificações
        </button>
      </div>
    </div>

    <div class="relative flex-1">
      <div
        class="card-glass squircle shadow-soft mx-auto aspect-[16/9] max-w-lg
               bg-gradient-to-br from-slate-50 to-slate-200">
        <!-- mock de produto -->
      </div>
    </div>
  </div>
</section>
```

- Aqui:  
  - squircle via utilitário `.squircle` (CL, seção 1),  
  - tipografia SF-like com tracking/leading calibrados (seção 2),  
  - spacing 8/16/24/32pt-like (seção 3),  
  - depth com sombras multi-camadas, bordas translúcidas e noise suave (seção 4).  

***

## Próximas ações (prioridade alta)

- Normalizar um preset de squircle para o teu design system: escolher 1 implementação principal (ex.: `corner-shape` + fallback de `mask-image`) e embalar em utilitários Tailwind (`.squircle`, `.mask-squircle`). [squircle.js](https://squircle.js.org/docs/svelte-corner-smoothing)
- Criar um scale tipográfico fechado (4–6 tokens) com `font-size/line-height/letter-spacing` explícitos para Display, Title, Body, Sub, aplicados em Inter/Geist/SF Pro. [developer.apple](https://developer.apple.com/fonts/)
- Definir um “spacing contract” baseado em 8pt com regras de relacionamento (ex.: label–input 0.5–0.75rem, bloco–bloco 1.5–2rem, seção–seção 2–3rem) e revisar páginas reais para remover “espaçamentos randômicos”. [gist.github](https://gist.github.com/eonist/e79ca41b312362682343c41f63062734)
- Padronizar superfícies claras: 1 ou 2 presets de sombra (soft e elevada), 1 textura de noise global, 1 estilo de “ring” translúcido para inputs/cards/botões. [linkedin](https://www.linkedin.com/posts/robindhanwani_designthinking-digitalaccessibility-interfacedesign-activity-7339273200628920321-5Jxs)

Se você quiser, na próxima mensagem posso:  
- focar só na camada “Squircle Engine” e te entregar um mini-módulo Tailwind (config + utilities) pronto pra colar no Vapor Club/Shot Diário, ou  
- ir fundo em um “Apple Typography Map” para Inter/Geist com tabela completa de tokens e usos (Hero, Title, Lead, Body, Meta, Label).