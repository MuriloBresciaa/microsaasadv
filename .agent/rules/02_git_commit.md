# 02 — Git Commit Protocol (Conventional Commits)

> **ATENÇÃO AGENTE:** Nenhum commit pode ser executado sem seguir este protocolo.
> Commits malformados = rejeição imediata. Fail-Fast ativo.

---

## FORMATO OBRIGATÓRIO

```
<type>(<scope>): <description>

[body opcional — detalhes técnicos]

[footer opcional — breaking changes, refs a issues]
```

**Regras de formatação:**
- Linha do título: máximo **72 caracteres**
- `<description>`: imperativo, minúsculas, sem ponto final
- Body separado do título por **1 linha em branco**
- Footer com `BREAKING CHANGE:` para mudanças que quebram API

---

## TYPES PERMITIDOS

| Type | Quando Usar |
|---|---|
| `feat` | Nova funcionalidade visível ao usuário |
| `fix` | Correção de bug comprovado |
| `style` | Mudança de CSS/design **sem** alterar lógica |
| `refactor` | Refatoração **sem** mudar comportamento externo |
| `docs` | Apenas documentação (md, comentários) |
| `chore` | Build, CI, dependências, config |
| `perf` | Melhoria de performance mensurável |
| `test` | Adição ou correção de testes |

---

## SCOPES CANÔNICOS DO PROJETO

| Scope | Abrange |
|---|---|
| `header` | Componente Header |
| `hero` | Seção Hero |
| `footer` | Componente Footer |
| `layout` | RootLayout e estruturas de página |
| `db` | Schemas Drizzle e configuração de banco |
| `schema` | Arquivos `schema-*.ts` individuais |
| `auth` | Supabase Auth, proteção de rotas |
| `api` | API routes do Astro |
| `styles` | `global.css`, tokens CSS |
| `ci` | `.github/workflows/` |
| `deploy` | `netlify.toml`, configs de deploy |
| `deps` | `package.json`, atualizações de dependências |
| `rules` | Arquivos em `.agent/rules/` |
| `docs` | Arquivos em `docs/` |

---

## EXEMPLOS CORRETOS

```bash
feat(hero): add animated gradient background with framer motion

fix(schema): correct nullable field type in schema-agendamento

style(header): adjust sticky shadow intensity on scroll

refactor(layout): extract SEO meta to dedicated component

chore(deps): upgrade @astrojs/react to v4.1.0

docs(rules): add 02_git_commit.md to Sistema Imune Nível 3
```

---

## PROIBIÇÕES (Fail-Fast)

- ❌ **Commits em português no título** — use inglês no `<description>`
- ❌ **Commits sem type** — "update header", "fix bug", "ajustes" são inválidos
- ❌ **Push direto na `main`** — sempre branch → commit → PR → merge
- ❌ **Commits de "WIP" sem body explicativo** — explique o estado incompleto
- ❌ **Commitar `.env` real** — verificar `.gitignore` ANTES de `git add .`
- ❌ **`git add .` cego** — sempre `git status` antes de adicionar arquivos

---

## FLUXO DE BRANCH OBRIGATÓRIO

```
main (produção — protegida)
 └── feat/nome-da-feature
 └── fix/descricao-do-bug
 └── chore/nome-da-tarefa
```

**Nomenclatura de branch:** `type/kebab-case-description`
- `feat/hero-parallax-animation`
- `fix/ios-clipboard-fallback`
- `chore/upgrade-astro-v6`

---

*Última atualização: 2026-04-30 | Site Factory 2.0 — Sistema Imune Nível 3*
