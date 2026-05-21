# 06 — Protocolo V.L.A.E.G + Arquitetura A.N.T (JurisAI)

> Motor de backend e automações. Leitura obrigatória antes de qualquer implementação
> de lógica de servidor, integração de API ou script de processamento de dados.
> Criado em: 2026-05-04 | Atualizado em: 2026-05-21

---

## §1. O PROTOCOLO V.L.A.E.G

O V.L.A.E.G é a sequência de execução obrigatória para toda feature de backend.
**Nenhuma fase pode ser pulada.** Cada fase produz um artefato verificável.

```
V → VISÃO
L → LINK
A → ARQUITETURA
E → ESTILO
G → GATILHO
```

---

### FASE V — VISÃO
**Objetivo:** Definir o problema e o contrato de dados antes de qualquer código.

Artefatos obrigatórios produzidos nesta fase:

1. **Enunciado de Problema** (1-3 frases):
   ```
   "Este módulo resolve [PROBLEMA] para [ATOR],
   entregando [RESULTADO MENSURÁVEL]."
   ```

2. **JSON Data Schema** — REGRA CRÍTICA: O schema de dados DEVE ser definido
   ANTES de qualquer script ser escrito. Sem schema validado = sem código.

   Template obrigatório:
   ```json
   {
     "schema_version": "1.0",
     "module": "<nome-do-modulo>",
     "inputs": {
       "<campo>": { "type": "<string|number|boolean|array|object>", "required": true, "description": "<descrição>" }
     },
     "outputs": {
       "<campo>": { "type": "<tipo>", "description": "<descrição>" }
     },
     "errors": [
       { "code": "<ERRO_CODE>", "message": "<mensagem>", "http_status": 400 }
     ]
   }
   ```

3. **Critérios de Aceitação** (lista com checkbox):
   ```markdown
   - [ ] Dado X entra → resultado Y sai
   - [ ] Erro Z é tratado com status HTTP correto
   - [ ] Tempo de resposta < Nms em condições normais
   ```

---

### FASE L — LINK
**Objetivo:** Mapear todas as dependências externas e internas antes de codificar.

Checklist obrigatório:
```markdown
- [ ] APIs externas identificadas (URL base, auth method, rate limits)
- [ ] Tabelas de banco afetadas listadas (SELECT / INSERT / UPDATE / DELETE)
- [ ] Variáveis de ambiente necessárias documentadas em .env.example
- [ ] Dependências de pacotes validadas (pnpm list | verificar versão)
- [ ] Módulos internos que serão importados identificados
- [ ] Pontos de falha mapeados (timeouts, indisponibilidade de terceiros)
```

**Regra de Secrets:** Toda variável sensível DEVE ser lida de variáveis de ambiente seguras server-only (nunca `PUBLIC_` ou expostas na UI).

---

### FASE A — ARQUITETURA
**Objetivo:** Produzir o POP (Procedure of Operation) antes de implementar.

Todo módulo backend DEVE gerar um POP em Markdown salvo em `/architecture/`:

```markdown
# POP — <Nome do Módulo>
**Versão:** 1.0 | **Data:** YYYY-MM-DD | **Autor:** Agent

## Fluxo Principal
1. Request chega em `<endpoint>`
2. Validação de input via schema (Fase V)
3. [lógica de negócio aqui — passo a passo]
4. Resposta formatada conforme output schema

## Diagrama de Sequência (ASCII)
Client → API Route → Service Layer → DB/External API → Response

## Decisões de Design
- Por que [escolha A] ao invés de [alternativa B]: [razão]

## Rollback
- Como desfazer esta operação em caso de falha
```

Localização: `/architecture/<nome-do-modulo>.md`

---

### FASE E — ESTILO
**Objetivo:** Garantir que o código siga os padrões do repositório.

Regras invioláveis de estilo para scripts backend:

```
✅ TypeScript strict mode em todos os arquivos .ts
✅ Prepared Statements (Drizzle ORM) — PROIBIDO concatenar SQL
✅ Sanitização de input em todo endpoint público
✅ Retorno de erro padronizado: { success: false, error: { code, message } }
✅ Retorno de sucesso padronizado: { success: true, data: {...} }
✅ Logs estruturados: console.error(JSON.stringify({ module, error, context }))
✅ Sem console.log em produção — usar logger estruturado ou remover
✅ Funções puras sempre que possível (sem side effects implícitos)
```

Nomenclatura obrigatória:
```
Endpoints:   /api/[recurso]/[acao]        → /api/analise/processar
Services:    src/lib/services/<nome>.ts   → analiseService.ts
Tools:       tools/<nome>_tool.py         → qa_validator_tool.py
POPs:        architecture/<nome>.md       → analise-contratos.md
```

---

### FASE G — GATILHO
**Objetivo:** Definir como e quando o módulo é acionado + como verificar que funciona.

Documentar obrigatoriamente:

1. **Tipo de Gatilho:**
   ```
   [ ] HTTP Request (endpoint + método + auth)
   [ ] Cron Job (expressão cron + timezone)
   [ ] Event/Webhook (evento + payload esperado)
   [ ] CLI Manual (comando exato para executar)
   [ ] Queue/Message (fila + formato da mensagem)
   ```

2. **Comando de Teste Local:**
   ```bash
   # Exemplo obrigatório no POP
   curl -X POST http://localhost:4321/api/analise/processar \
     -H "Content-Type: application/json" \
     -d '{"usuarioId":"123","nomeArquivo":"minuta.docx"}'
   ```

3. **Critério de Done (Iron Law §4.1):**
   - Rodar o comando de teste e confirmar output esperado
   - Verificar logs estruturados no console
   - Confirmar que o schema de output (Fase V) está sendo respeitado
   - Só declarar "pronto" com evidência de saída verificada

---

## §2. ARQUITETURA A.N.T — 3 Camadas

```
A.N.T = Architecture · Navigation · Tools
```

```
jurisai-microsaas/
├── architecture/    ← CAMADA 1: POPs em Markdown (fonte de verdade)
├── tools/           ← CAMADA 3: Scripts Python determinísticos
└── .tmp/            ← Artefatos temporários (NÃO commitar)
```

---

### CAMADA 1 — architecture/ (POPs)

**Propósito:** Fonte de verdade da arquitetura. Todo módulo backend tem um POP aqui.

Regras:
- Um arquivo `.md` por módulo/feature
- Nomeação: `kebab-case.md` (ex: `analise-contrato.md`, `google-oauth.md`)
- Incluir sempre: fluxo, diagrama ASCII, decisões de design, rollback
- Atualizar o POP ANTES de refatorar o código correspondente
- **NUNCA deletar um POP** — versionar com `_v2`, `_deprecated` se necessário

Índice obrigatório (`architecture/INDEX.md`):
```markdown
# Architecture Index — JurisAI

| Módulo | Arquivo | Status | Última Atualização |
|--------|---------|--------|-------------------|
| -      | -       | -      | -                 |
```

---

### CAMADA 2 — Navegação / Raciocínio (Agent Layer)

**Propósito:** Camada de inteligência do agente — leitura e decisão, sem produção direta de artefatos.

Responsabilidades desta camada:
- Ler POPs em `architecture/` antes de implementar qualquer coisa
- Consultar `docs/ESTADO.md` para contexto de onde o projeto está
- Cruzar `docs/DATA_DICTIONARY.md` para decisões de banco
- Navegar schemas em `src/db/schemas/` antes de qualquer query
- **Nunca escrever código sem ter passado pelas Fases V e L do protocolo**

Regra de raciocínio:
```
SE (tarefa é nova feature de backend):
  1. Ler architecture/INDEX.md
  2. Verificar se POP existe → se não, criar (Fase A)
  3. Executar V → L → A → E → G em ordem
  4. Atualizar INDEX.md após concluir
  5. Atualizar docs/ESTADO.md
FIM
```

---

### CAMADA 3 — tools/ (Scripts Python Determinísticos)

**Propósito:** Scripts de automação, scraping, processamento de dados e integrações que
rodam fora do servidor web principal. Python preferido por ecossistema de libs.

Regras:
- **Determinísticos:** Mesma entrada → mesma saída. Sem randomness não documentada.
- **CLI First:** Todo script deve aceitar argumentos via `argparse` ou `sys.argv`
- **Exit codes:** 0 = sucesso, 1 = erro de input, 2 = erro de runtime, 3 = erro de rede
- **Saída estruturada:** JSON no stdout, logs no stderr
- **Sem secrets no código:** Usar `.env` no ambiente local
- **Requirements:** Documentar dependências em `tools/requirements.txt`

Template base obrigatório (`tools/_template_tool.py`):
```python
#!/usr/bin/env python3
"""
<Nome do Script> — JurisAI Tools Layer
Propósito: <descrição em uma linha>
Uso: python tools/<nome>_tool.py --input <valor>
"""

import argparse
import json
import sys
from dotenv import load_dotenv

load_dotenv()


def main(args: argparse.Namespace) -> dict:
    """Lógica principal. Retorna dict com { success, data } ou { success, error }."""
    try:
        # --- IMPLEMENTAÇÃO AQUI ---
        result = {}
        return {"success": True, "data": result}
    except Exception as e:
        return {"success": False, "error": {"code": "RUNTIME_ERROR", "message": str(e)}}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    # parser.add_argument("--input", required=True, help="Descrição do input")
    args = parser.parse_args()

    output = main(args)
    print(json.dumps(output, ensure_ascii=False, indent=2))
    sys.exit(0 if output["success"] else 2)
```

---

## §3. REGRA DE DADOS PRIMEIRO — Enforcement

**Esta é a regra mais importante deste protocolo.**

```
╔══════════════════════════════════════════════════════════╗
║  ZERO CÓDIGO SEM JSON SCHEMA VALIDADO                   ║
║                                                          ║
║  A ordem é SEMPRE:                                       ║
║  1. Definir JSON Schema (inputs + outputs + errors)      ║
║  2. Criar POP em architecture/                           ║
║  3. Escrever testes que validam o schema                 ║
║  4. Implementar o código                                 ║
║  5. Verificar com evidência (Fase G)                     ║
╚══════════════════════════════════════════════════════════╝
```

Violação desta regra = blocking issue a ser documentado em `docs/ESTADO.md`.

---

## §4. INTEGRAÇÃO COM OUTRAS REGRAS

| Regra | Relação com V.L.A.E.G |
|-------|----------------------|
| `00_master_index.md` | Consultar antes da Fase L para mapear os schemas do Drizzle |
| `.clinerules` | Aplica a estética canônica e a regra de não truncamento de código |
| `docs/DATA_DICTIONARY.md` | Fonte absoluta de verdade das tabelas e tipos |

---

## §5. PASTA /.tmp — REGRAS DE USO

- **Propósito exclusivo:** artefatos temporários de processamento (CSVs brutos, respostas
  de API cacheadas, outputs intermediários de scripts)
- **Nunca commitar:** Garantir que `.tmp/` está no `.gitignore`
- **TTL implícito:** Arquivos com mais de 24h devem ser deletados manualmente ou por script
- **Naming:** `<timestamp>_<descricao>.json` (ex: `20260521_analise_exemplo.json`)

---

> **Este protocolo é obrigatório para todo desenvolvimento backend no JurisAI.**
> Agentes que pularem fases do V.L.A.E.G devem registrar o desvio em `docs/ESTADO.md`
> com a justificativa técnica. Sem justificativa = violação de Iron Law §4.2.
