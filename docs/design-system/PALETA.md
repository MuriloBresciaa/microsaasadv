# Paleta de Cores Oficial

Este documento registra a especificação de cores oficial e imutável para a governança de marca da plataforma JurisAI, otimizada para o mercado jurídico de luxo com base na teoria de cores e no design system Apple HIG.

## Diretrizes Cromáticas

| Nome Técnico | Código Hex | Função e Aplicação no Projeto |
| :--- | :--- | :--- |
| **Fundo Base** (Warm Concrete) | `#f5f5f4` | Cor de fundo primária de páginas e seções claras (alabastro/warm tone). |
| **Fundo Contraste** (Deep Navy) | `#0f172a` | Cor de fundo para seções de alto contraste e realce escuro. |
| **Títulos Primários** (True Charcoal) | `#1d1d1f` | Tom fosco de alta legibilidade para títulos e subtítulos importantes. |
| **Gradiente Metálico Claro** | `#2d2d30` para `#1d1d1f` | Gradiente sutil para títulos principais em superfícies claras. |
| **Gradiente Metálico Escuro** | `#ffffff` para `#a1a1aa` | Gradiente de prata acetinado (titânio) para títulos em superfícies escuras. |
| **Accent de Valor** (Burnished Gold) | `#b8860b` | Destaques de refinamento estético, badges e pílulas de destaque. |
| **Conversão** (WhatsApp Green) | `#25d366` | Ações de alto impacto, contatos rápidos e gatilhos de conversão primários. |

## Leis Cromáticas de Implementação

1. **Erradicação do Preto Puro (#000000)**:
   - Nenhum título, texto de parágrafo ou contêiner de borda deve utilizar o preto absoluto `#000000`. Em vez disso, deve ser utilizado o **True Charcoal (#1d1d1f)** sobre fundos claros para garantir uma legibilidade suave e premium.
2. **Harmonia dos Gradientes**:
   - Os títulos principais `<h1 class="apple-text-sheen">` e `<h2>` utilizam os gradientes metálicos mapeados acima para produzir o efeito de luz natural (sheen) através de rolagem com GSAP ScrollTrigger.
3. **Alto Contraste Estrito (≥ 7:1)**:
   - Todas as combinações de cores de texto e fundo devem cumprir o contraste mínimo de acessibilidade de acordo com as Iron Laws e diretrizes do Apple HIG.
