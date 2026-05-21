# 00 — Master Index (Protocolo Fail-Fast)

> **ATENÇÃO AGENTE:** Este arquivo é a primeira leitura obrigatória antes de qualquer execução.
> Falhar em lê-lo configura violação de protocolo e resulta em Fail-Fast imediato.

---

## MISSÃO CRÍTICA ANTES DE QUALQUER AÇÃO

```
ANTES de criar, editar, deletar ou executar qualquer coisa neste projeto:

1. LEIA ARQUITETURA.md       → Estrutura de pastas e stack tecnológica
2. LEIA docs/ESTADO.md       → Estado atual e próximos passos
3. LEIA .clinerules           → Lei de Design e regras comportamentais
```

**Caminho:** `./ARQUITETURA.md`

Este arquivo contém:
- A stack tecnológica com versões mínimas exigidas
- A estrutura de pastas canônica (onde cada coisa deve viver)
- As convenções de nomenclatura obrigatórias
- As Iron Laws de infraestrutura (regras invioláveis)
- O histórico de decisões de arquitetura (ADR)

---

## CHECKLIST PRÉ-EXECUÇÃO (Execute mentalmente)

### Leituras Obrigatórias (nesta ordem)
- [ ] Li `ARQUITETURA.md` — Estrutura de pastas e stack tecnológica
- [ ] Li `docs/ESTADO.md` — Estado atual e próximos passos
- [ ] Li `.clinerules` — Lei de Design e regras comportamentais

### Contexto Técnico
- [ ] Conheço a stack: Astro 6 + React 19 + Tailwind v4 + Drizzle ORM + MySQL 8.x
- [ ] Sei que o runtime é **Node 22 LTS** e o package manager é **PNPM v9 strict**
- [ ] Entendo que toda query ao banco deve usar **Drizzle ORM** (zero SQL raw concatenado)
- [ ] Sei que a estética canônica é **Monumental Editorial / Warm Concrete** (nunca Dark Mode OLED)
- [ ] Conheço as fontes obrigatórias: **SF Pro Display** (headings) e **SF Pro Text** (body/UI)

### Tipo de Tarefa (marcar uma)
- [ ] 🎨 **Frontend/Landing** → Aplicar Gate das 4 Perguntas (`01_cinematic_builder.md §1`)
- [ ] ⚙️ **Backend/API** → Aplicar Protocolo V.L.A.E.G (`06_vlaeg_protocol.md`)
- [ ] 🤖 **Agência Integrada** → Aplicar Protocolo Tríade de Superpoderes (`07_agency_superpowers.md`)
- [ ] 🗄️ **Database** → Schema Drizzle em `src/db/schemas/schema-[entidade].ts`
- [ ] 🐍 **Automação Python** → Usar `tools/_template_tool.py` como base

---

## REGRAS DE COMPORTAMENTO DO AGENTE

### DO (Faça)
- ✅ Seguir a estrutura de pastas canônica do `ARQUITETURA.md`
- ✅ Usar o `cn()` de `src/lib/utils.ts` para merge de classes Tailwind
- ✅ Usar o `copyToClipboard()` de `src/lib/utils.ts` para interações de clipboard
- ✅ Atualizar `docs/ESTADO.md` após cada tarefa concluída
- ✅ Criar schemas Drizzle em `src/db/schemas/schema-[entidade].ts`
- ✅ Prefixar variáveis privadas sem `PUBLIC_` para não expô-las no cliente Astro
- ✅ Consultar `docs/DATA_DICTIONARY.md` para tipagem e constraints do banco
- ✅ Respeitar a paleta Warm Concrete e fontes Apple locais (`.clinerules`)

### DON'T (Não Faça)
- ❌ Nunca concatenar variáveis em SQL raw — sempre use Drizzle ORM
- ❌ Nunca expor API keys, DATABASE_URL ou secrets em arquivos commitados
- ❌ Nunca usar `npm install` — sempre `pnpm install`
- ❌ Nunca criar arquivos fora da estrutura canônica sem justificativa documentada
- ❌ Nunca declarar tarefa concluída sem evidência de verificação
- ❌ Nunca usar Dark Mode OLED, Cyan Neon ou fontes genéricas do browser
- ❌ Nunca usar Framer Motion — animações são via GSAP + ScrollTrigger
- ❌ Nunca truncar código com placeholders ("// resto do código")

---

## MAPA DE UTILITÁRIOS DISPONÍVEIS

| Utilitário          | Localização                   | Propósito                                    |
| ------------------- | ----------------------------- | -------------------------------------------- |
| `cn()`              | `src/lib/utils.ts`            | Merge de classes Tailwind (clsx + twMerge)   |
| `copyToClipboard()` | `src/lib/utils.ts`            | Copy cross-browser com fallback iOS/Safari   |
| Drizzle DB          | `src/db/index.ts`             | Conexão MySQL singleton                      |
| Schemas 3FN         | `src/db/schemas/`             | Um arquivo por entidade Drizzle              |
| Data Dictionary     | `docs/DATA_DICTIONARY.md`     | Tipagem completa, ER diagram, env vars       |
| POPs de módulos     | `architecture/INDEX.md`       | Índice de todas as procedures de operação    |
| Tool template       | `tools/_template_tool.py`     | Base para scripts Python determinísticos     |
| QA Validator        | `tools/qa_validator_tool.py`  | Validação de frontend e semântica            |
| Presets Estéticos   | `.agent/rules/01_cinematic_builder.md` | Motor Cinematográfico (Warm Concrete)     |
| Apple HIG Core      | `.agent/rules/08_apple_hig_core.md` | Diretrizes de geometria e interação Apple |
| Bento Geometry      | `.agent/rules/09_apple_bento_geometry.md` | Regras de layout Bento Grid         |
| Tríade Superpoderes | `.agent/rules/07_agency_superpowers.md` | UI-UX Pro Max, Superpowers & GSD  |

---

## PROTOCOLO FAIL-FAST — Interrupção Geométrica

Se algum parâmetro crítico ou especificação geométrica violar as curvas concêntricas nativas da Apple
(32px → 24px → 16px → 8px), o agente DEVE:
1. Interromper a geração imediatamente
2. Acusar o desvio com evidência visual ou de código
3. Propor correção cirúrgica antes de continuar

Violações que disparam Fail-Fast:
- Uso de `border-radius` circular em contêineres assimétricos (causa recorte oval)
- Aplicação de `.apple-squircle-g2` com clip-path SVG em blocos retangulares
- Quebra da hierarquia de cantos concêntricos (ex: 16px dentro de 16px)
- Uso de fontes não-Apple (Inter, Manrope, system defaults)

---

## PROTOCOLO DE ESCALATION

Se encontrar ambiguidade arquitetural não coberta pelo `ARQUITETURA.md`:
1. Consulte `docs/DATA_DICTIONARY.md` — pode estar documentado com tipagem
2. Consulte `docs/ESTADO.md` — pode estar como "próximos passos"
3. Consulte `.clinerules` — regras comportamentais e Lei de Design
4. Consulte `docs/findings.md` — pode estar documentado como restrição conhecida
5. Só então peça clarificação ao usuário, registrando o finding em `docs/findings.md`

---

*Última atualização: 2026-05-21 | Mantenedor: JurisAI Core Team*
