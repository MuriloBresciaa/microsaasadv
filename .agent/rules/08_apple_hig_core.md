# 08 — Apple HIG Core Integration Rules

Esse guia consolida as diretrizes oficiais de design da Apple extraídas do repositório `.agent/vendor/apple-design-skill` e serve como a fonte absoluta de verdade para a interface e tipografia da plataforma.

---

## 1. Princípios de Design Apple

*   **Clarity (Clareza):** Todo elemento tem um propósito. O espaço em branco é intencional. A tipografia é legível em todos os tamanhos.
*   **Deference (Deferência):** O conteúdo ocupa o centro do palco. A interface recua para não competir com a experiência.
*   **Depth (Profundidade):** Camadas de materiais, translucidez e movimento transmitem a hierarquia visual.

---

## 2. Tipografia e Fontes

Deve ser usada a pilha de fontes do sistema SF Pro:
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
```

A escala tipográfica deve seguir os padrões do Apple HIG (por exemplo, Large Title: 34pt, Headline Semibold: 17pt, Body Regular: 17pt).

---

## 3. Sistema de Espaçamento para Mobile (MANDATÓRIO)

Para qualquer UI móvel ou tablet, utilize exclusivamente estas variáveis de espaçamento. **Proibido codificar valores diretamente.**

```css
:root {
  --margin-page: 16px;     /* Margem das bordas da página */
  --gap-card: 12px;        /* Espaço padrão entre cards e entre títulos e cards */
  --padding-card: 16px;    /* Espaço interno dos cards */
  --radius-card: 20px;     /* Raio de curva dos cards */
  --radius-sm: 12px;
  --radius-lg: 24px;
}
```

### Regras de Estrutura e Alinhamento
*   **Section Wrapper:** Todas as listas ou grids devem ficar dentro do container `.section` para respeitar a margem.
*   **Margens dos Cards:** Cards dentro de `.section` não devem ter margem lateral (`margin-left` ou `margin-right`), apenas a margem inferior para espaçamento vertical (`margin-bottom: var(--gap-card)`). Isso evita duplicar a margem gerada pelo padding do container.
*   **Containers de Rolagem Horizontal:** Elementos como `.product-scroll`, `.coupon-scroll` ou `.order-status` devem possuir a propriedade `gap: var(--gap-card)` e ficar localizados **dentro** da `.section` correspondente, sem adicionar recuos extras à esquerda.

---

## 4. Dispositivo de Preview (Macho-Mockup)

Ao exibir um protótipo ou aplicação em formato mobile (mockup):

1.  **Apenas Um Dispositivo:** Exiba apenas uma tela de telefone no viewport. Nunca alinhe uma tela clara e uma tela escura lado a lado.
2.  **Borda Retangular Reta:** Use bordas retas normais (`border-radius: 0`) para o mockup. Nunca tente imitar o formato físico do iPhone (como entalhes/notches ou bordas pretas arredondadas gigantes).
3.  **Alternância de Temas no Status Bar:** O tema da aplicação (Claro/Escuro) deve ser alterado através de um **duplo clique (dblclick)** no `.status-bar` do mockup. Não adicione botões flutuantes ou controles na tela para isso.
4.  **Cores de Contraste:** A cor de fundo da página de preview deve ser oposta à cor interna do mockup (por exemplo, mockup claro em página escura `#1C1C1E`, mockup escuro em página clara `#E8E8ED`), garantindo visibilidade clara do dispositivo.

### Script do Status Bar
```javascript
(function () {
  const STORAGE_KEY = 'app-theme';
  const root = document.documentElement;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    root.setAttribute('data-theme', saved);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);

    document.querySelectorAll('.status-bar').forEach(bar => {
      bar.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(0.98)' }, { transform: 'scale(1)' }],
        { duration: 220, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
      );
    });
  }

  document.querySelectorAll('.status-bar').forEach(bar => {
    bar.addEventListener('dblclick', toggleTheme);
  });
})();
```

---

## 5. Regra de Contraste Texto/Fundo

*   **Fundo Escuro:** Deve usar texto claro (`--text-primary` ou `#FFFFFF`). Nunca utilize cores escuras ou de baixo contraste em fundos pretos.
*   **Fundo Claro:** Deve usar texto escuro (`--text-primary` escuro ou `#1A0E08`).

---

## 6. Padrão de Ícones (Remix Icon)

*   **Obrigatório:** Todos os ícones do projeto devem vir estritamente de **Remix Icon** (`https://remixicon.com/`). Proibido usar emojis, símbolos Unicode ou SVGs genéricos gerados manualmente.
*   **Linha vs. Preenchimento:**
    *   Use ícones do tipo **line** (`ri-*-line`) para cabeçalhos, ações gerais, botões de ação (like, share) e grids.
    *   Use ícones do tipo **fill** (`ri-*-fill`) exclusivamente para a barra de navegação inferior (Tab Bar), garantindo peso visual adequado nos alvos de toque.
