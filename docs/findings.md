# findings.md — Site Factory 3.0

> Repositório de pesquisas, restrições técnicas, descobertas e decisões investigativas.
> Registrar aqui ANTES de implementar uma solução não óbvia.
> Protocolo: V.L.A.E.G — Fase L (Link) alimenta este arquivo.

---

## FORMATO DE REGISTRO

```markdown
### [FINDING-XXX] Título da descoberta
**Data:** YYYY-MM-DD
**Contexto:** Qual problema estava sendo investigado
**Descoberta:** O que foi encontrado
**Impacto:** Como isso afeta a implementação
**Decisão:** O que foi decidido com base nisto
**Referências:** URLs, arquivos, commits relevantes
```

---

## RESTRIÇÕES TÉCNICAS CONHECIDAS

### [FINDING-001] iOS Safari — Clipboard API
**Data:** 2026-04-30
**Contexto:** Botão "Copiar PIX" não funcionava em dispositivos iOS
**Descoberta:** `navigator.clipboard.writeText()` requer gesture do usuário E contexto seguro (HTTPS) no Safari. Elementos hidden (`display:none`) bloqueiam o fallback `execCommand`.
**Impacto:** Qualquer feature de clipboard deve usar fallback com `document.createRange()` + `selection.addRange()`
**Decisão:** Implementar `copyToClipboard()` em `src/lib/utils.ts` com suporte explícito a iOS
**Referências:** `src/lib/utils.ts` (implementação atual)

---

## DEPENDÊNCIAS EXTERNAS MAPEADAS

| Serviço | Propósito | Auth Method | Rate Limit | Status |
|---------|-----------|-------------|-----------|--------|
| Supabase | Database Cloud + Auth | JWT (anon key) | — | ✅ Configurado |
| MySQL (Laragon) | Database Local | root/sem senha | — | ✅ Ativo |
| Netlify | Deploy + Edge Functions | netlify.toml | — | ✅ Configurado |
| GitHub Actions | CI/CD | GITHUB_TOKEN | — | ✅ Configurado |

---

## VARIÁVEIS DE AMBIENTE DOCUMENTADAS

| Variável | Camada | Propósito | Obrigatória |
|----------|--------|-----------|------------|
| `DATABASE_URL` | Servidor | Conexão MySQL/Postgres via Drizzle | ✅ Sim |
| `PUBLIC_SUPABASE_URL` | Cliente | URL pública do Supabase | ✅ Sim |
| `PUBLIC_SUPABASE_ANON_KEY` | Cliente | Chave anon do Supabase | ✅ Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Servidor | Admin Supabase (nunca expor no cliente) | ⚠️ Condicional |

---

## FINDINGS ABERTOS

| ID | Título | Prioridade | Responsável |
|----|--------|-----------|------------|
| — | *(nenhum finding aberto)* | — | — |

---

*Última atualização: 2026-05-04 | Wave 3 — Memory Init*
