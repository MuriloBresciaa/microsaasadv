# 00 — Master Index (Protocolo Fail-Fast)

> **ATENÇÃO AGENTE:** Este arquivo é a primeira leitura obrigatória antes de qualquer execução.
> Falhar em lê-lo configura violação de protocolo e resulta em Fail-Fast imediato.

---

## MISSÃO CRÍTICA ANTES DE QUALQUER AÇÃO

```
ANTES de criar, editar, deletar ou executar qualquer coisa neste projeto:

1. LEIA docs/gemini.md       → Constituição, esquemas e mapa cognitivo
2. LEIA docs/task_plan.md    → Fase atual e checklist de execução
3. LEIA ARQUITETURA.md       → Estrutura de pastas e stack
4. LEIA docs/ESTADO.md       → Estado atual e próximos passos
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
- [ ] Li `docs/gemini.md` — Constituição, esquemas de dados e mapa cognitivo
- [ ] Li `docs/task_plan.md` — Fase atual, objetivos e checklist
- [ ] Li `ARQUITETURA.md` — Estrutura de pastas e stack tecnológica
- [ ] Li `docs/ESTADO.md` — Estado atual e próximos passos

### Contexto Técnico
- [ ] Conheço a stack: Astro + React + Tailwind v4 + Drizzle + MySQL/Supabase
- [ ] Sei que o runtime é **Node 22** e o package manager é **PNPM v9**
- [ ] Entendo que toda query ao banco deve usar **Drizzle ORM** (zero SQL raw concatenado)

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

### DON'T (Não Faça)
- ❌ Nunca concatenar variáveis em SQL raw — sempre use Drizzle
- ❌ Nunca expor API keys, DATABASE_URL ou secrets em arquivos commitados
- ❌ Nunca usar `npm install` — sempre `pnpm install`
- ❌ Nunca criar arquivos fora da estrutura canônica sem justificativa documentada
- ❌ Nunca declarar tarefa concluída sem evidência de verificação

---

## MAPA DE UTILITÁRIOS DISPONÍVEIS

| Utilitário          | Localização                   | Propósito                                    |
| ------------------- | ----------------------------- | -------------------------------------------- |
| `cn()`              | `src/lib/utils.ts`            | Merge de classes Tailwind (clsx + twMerge)   |
| `copyToClipboard()` | `src/lib/utils.ts`            | Copy cross-browser com fallback iOS/Safari   |
| Supabase Client     | `src/lib/supabase.ts`         | Acesso ao Supabase (singleton)               |
| Drizzle DB          | `src/db/index.ts`             | Conexão MySQL/Postgres (singleton)           |
| POPs de módulos     | `architecture/INDEX.md`       | Índice de todas as procedures de operação    |
| Tool template       | `tools/_template_tool.py`     | Base para scripts Python determinísticos     |
| Constituição        | `docs/gemini.md`              | Esquemas, mapa cognitivo, glossário          |
| Presets Estéticos   | `.agent/rules/01_cinematic_builder.md` | 4 identidades visuais completas    |
| Tríade Superpoderes | `.agent/rules/07_agency_superpowers.md` | UI-UX Pro Max, Superpowers & GSD  |

---

## PROTOCOLO DE ESCALATION

Se encontrar ambiguidade arquitetural não coberta pelo `ARQUITETURA.md`:
1. Consulte `docs/gemini.md §4` — Mapa Cognitivo (onde cada coisa vive)
2. Consulte `docs/findings.md` — pode estar documentado como restrição conhecida
3. Consulte `docs/ESTADO.md` — pode estar como "próximos passos"
4. Consulte `.clinerules` — regras comportamentais locais do agente
5. Só então peça clarificação ao usuário, registrando o finding em `docs/findings.md`

---

*Última atualização: 2026-05-04 | Mantenedor: Site Factory 3.0 Core Team*
