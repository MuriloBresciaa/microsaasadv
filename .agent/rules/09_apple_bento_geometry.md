# 09 — Apple Bento Geometry Rules

Este guia consolida as diretrizes oficiais de bento grid e geometria do ecossistema Apple extraídas do repositório `.agent/vendor/apple-bento-grid/design-system.md`. Serve como a especificação formal para grids e painéis de dados do JurisAI.

---

## 1. Técnica de Bento Grid com Zero-Gap (Cinco Leis de Ferro)

O alinhamento milimétrico e o preenchimento de espaços são o que torna o bento grid esteticamente alinhado aos padrões da Apple.

1.  **Alongamento dos Cards (`stretch`):** Todos os cards de bento grid devem se esticar para preencher suas células. **Nunca** aplique `align-items: start` ou `align-items: flex-start` no grid. O valor padrão de `stretch` deve ser mantido.
2.  **Formato Travado (Locked Shape):** Layouts horizontais (desktop) devem usar a propriedade `aspect-ratio` no container do grid para evitar colapso de proporção.
3.  **Linhas Proporcionais:** Use `1fr` nas linhas do grid para layouts horizontais (proporcionais) e `auto` para layouts verticais (guiados pelo conteúdo).
4.  **Espaçamento Estrito (Gap de 6px):** O espaçamento entre os cards no grid deve ser de **exatamente 6px** (`gap: 6px`). Não utilize os valores tradicionais de 8px, 12px ou 16px.
5.  **Ocupação Absoluta de Células:** Nenhuma célula do grid deve ficar vazia. Se sobrar espaço, estenda um dos cards para ocupar múltiplas colunas ou linhas (`grid-column: span X` ou `grid-row: span Y`).

---

## 2. Modelos de Layouts (Templates de Referência)

### Template A: 4 Colunas Horizontal (Desktop)
*   **Largura Ideal:** `1200px`
*   **Proporção (Aspect Ratio):** `52 / 25` (~1200x577)
*   **Definição CSS:**
```css
.grid-4col-horizontal {
  display: grid;
  width: 1200px;
  padding: 28px;
  gap: 6px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  aspect-ratio: 52 / 25;
}
```

### Template B: 3 Colunas Horizontal (Focado)
*   **Largura Ideal:** `1100px`
*   **Proporção (Aspect Ratio):** `52 / 22` (~1100x466)
*   **Definição CSS:**
```css
.grid-3col-horizontal {
  display: grid;
  width: 1100px;
  padding: 28px;
  gap: 6px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  aspect-ratio: 52 / 22;
}
```

### Template C: 2 Colunas Vertical (Mobile/Portfólio)
*   **Largura Ideal:** `600px` ou `100%` da largura mobile.
*   **Altura:** Dinâmica, guiada pelo conteúdo (sem `aspect-ratio`).
*   **Definição CSS:**
```css
.grid-2col-vertical {
  display: grid;
  width: 100%;
  padding: 18px;
  gap: 6px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}
```

---

## 3. Tipografia Premium para Bento

*   **SF Pro Display:** Usada para títulos de destaque, números de estatísticas grandes, métricas e valores de gráficos.
*   **SF Pro Text:** Usada para corpo de texto, labels secundários, badges e tags secundárias.

---

## 4. Componentes Canônicos de Cards

### 4.1. Hero Card (Destaque Principal)
*   Contém uma frase de efeito grande de 2 a 3 linhas (`font-size: 36px` em desktop).
*   Geralmente ocupa duas linhas do grid (`grid-row: span 2`).
*   **Barra Superior com Gradiente:** Um detalhe de borda decorativa deve ser adicionado no topo:
```css
.card-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1d1d1f, #86868b, #1d1d1f);
  border-radius: 18px 18px 0 0;
}
```

### 4.2. Stat Card (Métrica Simples)
*   Focado em exibir um único número gigante e uma legenda cinza (`.label`).
*   **Tamanho de Números:**
    *   Métricas Curtas (1-4 dígitos): `44px`
    *   Métricas Médias (5-7 caracteres): `40px`
    *   Métricas Longas (8+ caracteres): `32px`

### 4.3. Category Card (Fases/Agrupamentos)
*   Nome do grupo colorido (`.category-name`) + foco do grupo (`.category-focus`) + conjunto de pills/tags horizontais.

### 4.4. Bar Chart Card (Mini Gráficos de Barra)
*   Gráficos simples integrados nos cards usando barras proporcionais de crescimento.
*   Utilize gradientes graduados (ex: escala de crescimento gold/slate):
    *   Barra 1 (Baixa): `linear-gradient(180deg, #f5f5f4, #e5e5e0)`
    *   Barra 2 (Média): `linear-gradient(180deg, #e5e5e0, #b8860b)`
    *   Barra 3 (Alta): `linear-gradient(180deg, #b8860b, #996515)`

### 4.5. Quote Card (Destaque Escuro)
*   Fundo escuro (`#0f172a`), texto branco e ênfase colorida via elemento `em` (ex: `em { color: #b8860b }` com estilo normal).

### 4.6. Highlight Card (Destaque Colorido Integral)
*   Fundo preenchido inteiramente com gradiente vibrante gold/navy, número centralizado gigante branco (`font-size: 72px`) e legenda clara translúcida (`rgba(255,255,255,0.85)`).
