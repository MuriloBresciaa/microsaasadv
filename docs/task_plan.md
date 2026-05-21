# task_plan.md — Site Factory 3.0

> Arquivo de planejamento e rastreamento de tarefas do agente.
> Atualizar no início e no fim de cada sessão de trabalho.
> Protocolo: V.L.A.E.G — Fase A (Arquitetura) deve preceder qualquer execução.

---

## MISSÃO ATUAL

```
Missão: [Descrever a missão corrente em 1-2 frases]
Sprint: [identificador]
Iniciado em: YYYY-MM-DD
Estimativa: [horas/dias]
```

---

## FASES DO PROJETO

### Fase 0 — Foundation (✅ Concluída)
- [x] Inicialização do repositório golden template
- [x] Stack: Astro + React + Tailwind v4 + Drizzle + MySQL/Supabase
- [x] CI/CD: GitHub Actions + Netlify
- [x] Sistema Imune Nível 3 (5 regras base)

### Fase 1 — Cinematic Engine (✅ Wave 1)
- [x] `01_cinematic_builder.md` — Motor Cinematográfico com 4 presets estéticos
- [x] Gate das 4 Perguntas (AskUserQuestion antes de codar)
- [x] Design System Fixo: Noise CSS, rounded-2rem, botões magnéticos, GSAP

### Fase 2 — V.L.A.E.G Backend (✅ Wave 2)
- [x] `06_vlaeg_protocol.md` — Protocolo V.L.A.E.G completo
- [x] Arquitetura A.N.T: `/architecture`, `/tools`, `/.tmp`
- [x] `architecture/INDEX.md` — Índice central de POPs
- [x] `tools/_template_tool.py` — Template base determinístico
- [x] `tools/requirements.txt` — Dependências Python base

### Fase 3 — Memory Init (🔄 Wave 3 — Atual)
- [x] `docs/task_plan.md` — Este arquivo
- [x] `docs/findings.md` — Pesquisas e restrições
- [x] `docs/progress.md` — Progresso e erros
- [x] `docs/gemini.md` — Constituição e esquemas de dados
- [x] `ARQUITETURA.md` — Atualizado para v3.0
- [x] `00_master_index.md` — Checklist atualizado

### Fase 4 — Visual Foundation (✅ Concluída)
- [x] Atualizada a folha de estilo global em `src/styles/global.css` com o Preset Apple Clean e Cinematic Noise.
- [x] Criado o `src/layouts/RootLayout.astro` com suporte a GSAP e ScrollTrigger.
- [x] Criada a landing page inicial da plataforma baseada no Preset Apple Clean em `src/pages/index.astro`.
- [x] Redesenhada a landing page para uma narrativa não-linear de luxo clean (Premium White) com Geist, Inter e GSAP.
- [x] Aplicado o Reset Estético: remoção de clip-path SVG deformáveis e adoção de curvatura CSS nativa Apple calibrada (`rounded-[32px]`) com sombras sutis em camadas.
- [x] Executadas as validações através do `tools/qa_validator_tool.py` com sucesso.
- [x] Ativado o servidor de desenvolvimento local na porta padrão 4321.

### Fase 5 — UI & Domain Modules (⏳ Pendente)
- [ ] Implementar o Dashboard de controle de Trial, Análise de Contratos, Geração de Petições e Auditoria de Provas.
- [ ] Integrar os schemas Drizzle e rotas de API para salvar as interações dos advogados.

---

## CHECKLIST DE EXECUÇÃO POR TAREFA

Para cada nova tarefa, executar mentalmente:

```
[ ] Li docs/gemini.md (Constituição + schemas)
[ ] Li ARQUITETURA.md (estrutura de pastas)
[ ] Li docs/ESTADO.md (estado atual)
[ ] Protocolo V.L.A.E.G aplicado (se backend)
[ ] Gate das 4 Perguntas feito (se frontend/landing)
[ ] POP criado em architecture/ (se módulo novo)
[ ] Evidência de verificação coletada antes de declarar "pronto"
```

---

## BACKLOG

| Prioridade | Tarefa | Fase | Status |
|-----------|--------|------|--------|
| — | *(vazio — aguardando missão)* | — | — |

---

*Última atualização: 2026-05-04 | Wave 3 — Memory Init*
