# 07 — Unified Agency Protocol (Superpowers Wave 1.42.3)

> **ATENÇÃO AGENTE:** Este é o protocolo de elite de engenharia de contexto e execução unificada.
> A tríade de superpoderes globais (UI-UX Pro Max v2.0, Superpowers, e Get Shit Done v1.42.3) está totalmente assimilada e instalada no sistema.

---

## 1. Mapeamento da Tríade de Superpoderes

A partir da Wave 1.42.3, toda e qualquer execução do agente é regulada pela combinação integrada de três forças motoras:

```
+--------------------------------------------------------------------------+
|                       UNIFIED AGENCY PROTOCOL                            |
+--------------------------------------------------------------------------+
|  1. UI-UX Pro Max v2.0        | 2. Superpowers         | 3. Get Shit Done |
|  AI Design Reasoning Engine   | Dev Methodology (TDD)  | Context Eng. 1.42|
+-------------------------------+------------------------+------------------+
|  Apple White Grade UI         | Drizzle Prepared SQL   | Phase-Based Loop |
|  High Contrast, OLED, Fluid   | Red-Green-Refactor     | Manifests & Rot  |
+--------------------------------------------------------------------------+
```

---

## 2. UI-UX Pro Max v2.0 — Design Reasoning Engine

Para qualquer alteração ou criação de interface de usuário (UI/UX), o comando `/ui-ux-pro-max` (mental ou executado via CLI) orienta o desenvolvimento sob as premissas estéticas de luxo **Apple White Grade**:

### Diretrizes Estéticas Críticas:
* **Paleta de Cores Alabastro (Apple Premium):**
  * Background: `#F9F9FB` (Alabastro/Alabaster White) ou `#FFFFFF` (Surface).
  * Textos: `#1D1D1F` (Carbon Black) para títulos com peso `font-extrabold` ou `font-extralight` e tracking colado; `#86868B` para textos secundários.
  * Bordas: `rgba(29, 29, 31, 0.06)` (contornos ultra-finos e elegantes).
  * Semipoluição de cores eliminada. Erradicação de azuis/verdes genéricos.
* **Efeitos Avançados:**
  * **Liquid Glass (`.apple-glass-card`):** Fundo `rgba(255,255,255,0.78)` com `backdrop-blur(20px)` e contornos translúcidos (`rgba(29,29,31,0.06)`).
  * **Metallic Sheen (`.apple-text-sheen`):** Brilho reflexivo furtivo médio em `#48484A` animado via GSAP ScrollTrigger na rolagem.
  * **Squircle Curvature (G2):** Uso sistemático de curvatura contínua matemática de cantos com `rounded-[32px]` e oclusão de sombras sutis.
  * **Magnetismo Táctil (`data-magnetic`):** Botões HIG touch targets ($\ge 44 \times 44\text{px}$) com atração física e interpolação fluida pelo GSAP.
  * **Cinema Video Box:** Vídeo local oficial autêntico (`/div.mp4`) acelerado por hardware e com máscara de iluminação radial interativa (`#hero-backlight`).

---

## 3. Superpowers — Métodos e Blindagem Backend

O desenvolvimento de backend e acesso a dados para o banco MySQL (Laragon) via **Drizzle ORM** deve respeitar de forma implacável os fluxos de blindagem e engenharia segura:

### TDD Rígido (Mantra Red-Green-Refactor):
1. **Red Phase:** Escreva um teste de integração/unitário direcionado para a rota ou funcionalidade no arquivo de testes adequado. Rode a suíte de testes e veja falhar com o código correto.
2. **Green Phase:** Implemente a lógica necessária no schema (`src/db/schemas/`) ou controller. Faça a barra ficar verde com o menor código possível.
3. **Refactor Phase:** Otimize o código. Limpe redundâncias, mantenha imutabilidade e garanta segurança máxima.
4. *Aviso de Sanidade:* Qualquer código produtivo escrito antes de um teste falhar deve ser imediatamente apagado.

### Blindagem de Banco (Drizzle Prepared Statements):
* **Proibição Absoluta de SQL Raw Concatenado:** Variáveis inseridas pelo usuário NUNCA devem ser concatenadas em strings SQL.
* **Prepared Statements Compilados:** Use a API `.prepare()` do Drizzle para consultas dinâmicas de alta frequência, melhorando performance e blindando contra injeções SQL.
* **Exemplo de Prepared Statement Seguro:**
  ```typescript
  import { sql } from 'drizzle-orm';
  import { db } from '../db';
  import { usuarios } from './schema-usuario';

  export const buscarUsuarioPorEmail = db
    .select()
    .from(usuarios)
    .where(sql`${usuarios.email} = ${sql.placeholder('email')}`)
    .prepare('buscarUsuarioPorEmail');
  
  // Executando com segurança em tempo de execução:
  // await buscarUsuarioPorEmail.execute({ email: 'advogado@empresa.com' });
  ```

---

## 4. Get Shit Done (GSD) v1.42.3 — Engenharia de Contexto

O gerenciamento de rotas e roadmap de entrega do projeto roda sob o ciclo fechado de três fases distintas `/gsd`:

### O Ciclo GSD:
```
  [ /gsd-discuss-phase ]  ======>  [ /gsd-plan-phase ]  ======>  [ /gsd-execute-phase ]
  Alinhamento Arquitetural         Geração de Planos Atômicos     Red-Green-Refactor + Build
```

1. **`/gsd-discuss-phase`:** Fase dedicada ao alinhamento técnico e conceitual. Nenhuma alteração produtiva de arquivos é feita. É o refinamento socrático em ação.
2. **`/gsd-plan-phase`:** Planejamento determinístico e estruturado de tarefas atômicas (2-5 min) usando o arquivo `task.md` e `implementation_plan.md` com `request_feedback = true`. O agente pára e aguarda aprovação explícita do usuário.
3. **`/gsd-execute-phase`:** Execução focada na implementação blindada por testes (TDD) e build de homologação.
   * **Fresh Context Subagents:** Para manter o token bloat do canal principal abaixo de 40%, tarefas robustas de backend ou refatoração complexa são delegadas a subagents isolados (limite de 200k tokens), que são destruídos ao final da tarefa após merge e auditoria do diff.
   * **Verificação Conclusiva:** Antes de dar uma tarefa por encerrada, compile o build do Astro para garantir estabilidade:
     ```bash
     npm run build
     ```
   * **Atualização do Memory Bank:** Conclua o ciclo atualizando imediatamente o arquivo `docs/ESTADO.md`.

---

## 5. Checklist de Immune System (Rígido)

- [ ] Executei a leitura e atualização de `docs/ESTADO.md`?
- [ ] Todas as queries dinâmicas usam Prepared Statements via Drizzle?
- [ ] O build compilou perfeitamente via `npm run build`?
- [ ] O design segue fielmente o Alabastro Apple White Grade com cantos Squircle G2 (`rounded-[32px]`)?
