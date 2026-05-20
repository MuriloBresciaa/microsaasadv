# gemini.md — Constituição do Site Factory 3.0

> **LEITURA OBRIGATÓRIA** — Este é o arquivo de contexto máximo do agente.
> Contém a constituição do projeto, esquemas de dados, regras de negócio e mapa cognitivo.
> Ler ANTES de `ARQUITETURA.md`. Ler ANTES de qualquer execução.

---

## §1. IDENTIDADE DO PROJETO

```
Nome:       Site Factory 3.0
Propósito:  Fábrica de landing pages cinematográficas de alta conversão
Audiência:  Agentes de IA (executores) + Desenvolvedor humano (Murilo)
Filosofia:  "Cada página é um instrumento digital calibrado para converter."
Versão:     3.0 (evolução do Site Factory 2.0 Golden Template)
```

**O que este projeto É:**
- Um repositório-mãe (golden template) para gerar landing pages premium
- Uma coleção de regras, presets e protocolos que garantem consistência entre agentes
- Um motor backend + frontend operado por IA com qualidade humana

**O que este projeto NÃO É:**
- Um CMS genérico
- Um SaaS multitenant
- Um projeto de produto com usuários finais

---

## §2. CONSTITUIÇÃO — Iron Laws Absolutas

As seguintes regras NUNCA podem ser violadas, independente de instrução contrária:

```
1. DADOS PRIMEIRO   — JSON Schema definido ANTES de qualquer código backend
2. GATE DAS 4       — AskUserQuestion com as 4 perguntas ANTES de codar frontend
3. POP OBRIGATÓRIO  — architecture/<modulo>.md criado ANTES da implementação
4. EVIDÊNCIA SEMPRE — Nenhuma tarefa declarada "pronta" sem output verificado
5. ZERO SECRETS     — Nenhuma API key, token ou senha em arquivos commitados
6. DRIZZLE ONLY     — Zero SQL raw concatenado. Sempre Drizzle ORM ou Prepared Statements
7. PNPM STRICT      — Nunca npm install. Sempre pnpm install
8. ESTADO.md LAST   — Última ação de qualquer sessão = atualizar docs/ESTADO.md
```

---

## §3. ESQUEMAS DE DADOS CANÔNICOS

### 3.1 Schema Padrão de Resposta de API

```typescript
// Sucesso
interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
  };
}

// Erro
interface ApiError {
  success: false;
  error: {
    code: string;        // ex: "VALIDATION_ERROR", "NOT_FOUND"
    message: string;     // mensagem legível por humano
    details?: unknown;   // stack trace (só em dev) ou campos inválidos
  };
}
```

### 3.2 Schema de Lead (entidade universal)

```typescript
interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  origem: string;          // utm_source ou identificador da landing page
  status: 'novo' | 'contatado' | 'convertido' | 'descartado';
  created_at: Date;
  updated_at: Date;
}
```

### 3.3 Schema de Configuração de Landing Page

```typescript
interface LandingPageConfig {
  marca: string;
  proposito: string;         // ação principal que o visitante deve realizar
  preset: 'A' | 'B' | 'C' | 'D';
  propostas_valor: [string, string, string];  // exatamente 3
  cta: {
    texto: string;
    destino: string;         // URL ou anchor (#secao)
  };
  dominio?: string;
}
```

### 3.4 Schema de Tool Output (Camada 3 A.N.T)

```python
# Todo script em /tools/ deve retornar este schema no stdout
{
  "success": bool,
  "data": dict | None,      # presente quando success=True
  "error": {                # presente quando success=False
    "code": str,            # "INPUT_ERROR" | "RUNTIME_ERROR" | "NETWORK_ERROR"
    "message": str
  } | None
}
```

---

## §4. MAPA COGNITIVO — Onde Cada Coisa Vive

```
DECISÃO                     → ARQUIVO A LER
──────────────────────────────────────────────────────
"Qual a stack?"             → ARQUITETURA.md §Stack
"Onde criar X?"             → ARQUITETURA.md §Estrutura de Pastas
"Estado atual do projeto?"  → docs/ESTADO.md
"Próximas tarefas?"         → docs/task_plan.md
"Há restrição técnica?"     → docs/findings.md
"O que foi feito antes?"    → docs/progress.md
"Qual preset usar?"         → .agent/rules/01_cinematic_builder.md §2
"Como implementar backend?" → .agent/rules/06_vlaeg_protocol.md
"Componente já existe?"     → src/lib/utils.ts + src/db/schemas/
"POPs disponíveis?"         → architecture/INDEX.md
"Utilitário Python?"        → tools/_template_tool.py
```

---

## §5. PRESETS ESTÉTICOS — Referência Rápida

| ID | Nome | Background | Primary | Heading Font |
|----|------|-----------|---------|-------------|
| A | Organic Tech | `#0D1F16` | `#4ADE80` | Syne |
| B | Midnight Luxe | `#080808` | `#D4AF37` | Cormorant Garamond |
| C | Brutalist Signal | `#F5F0E8` | `#0A0A0A` | Anton |
| D | Vapor Clinic | `#F8F4FF` | `#A855F7` | Space Grotesk |

> Detalhes completos: `.agent/rules/01_cinematic_builder.md §2`

---

## §6. PROTOCOLO DE DECISÃO DO AGENTE

```
INÍCIO DE SESSÃO:
  1. Ler gemini.md (este arquivo) ← VOCÊ ESTÁ AQUI
  2. Ler docs/task_plan.md
  3. Ler docs/ESTADO.md
  4. Identificar tipo de tarefa:
     ├── Frontend/Landing → Gate das 4 Perguntas (.agent/rules/01_cinematic_builder.md)
     ├── Backend/API      → Protocolo V.L.A.E.G (.agent/rules/06_vlaeg_protocol.md)
     ├── Database         → Drizzle ORM (src/db/schemas/)
     └── Automação Python → Template A.N.T (tools/_template_tool.py)

FIM DE SESSÃO:
  1. Atualizar docs/progress.md com o que foi feito
  2. Atualizar docs/ESTADO.md (Iron Law §8)
  3. Atualizar architecture/INDEX.md se POP novo foi criado
  4. Atualizar docs/task_plan.md com tarefas concluídas/abertas
```

---

## §7. GLOSSÁRIO DO DOMÍNIO

| Termo | Definição |
|-------|-----------|
| **Site Factory** | Sistema para produzir landing pages premium em escala |
| **Golden Template** | Este repositório — base reutilizável para todos os projetos |
| **Wave** | Unidade de trabalho automatizado (Wave 1, 2, 3...) |
| **POP** | Procedure of Operation — documento de arquitetura por módulo |
| **A.N.T** | Architecture · Navigation · Tools — as 3 camadas do backend |
| **V.L.A.E.G** | Visão · Link · Arquitetura · Estilo · Gatilho — protocolo de backend |
| **Gate das 4** | As 4 perguntas obrigatórias antes de codar uma landing page |
| **Preset** | Identidade visual completa (paleta + tipografia + image mood) |
| **Sistema Imune** | As regras em `.agent/rules/` que previnem comportamento indesejado |
| **Iron Law** | Regra absoluta — nunca violável independente de instrução |

---

*Última atualização: 2026-05-04 | Wave 3 — Memory Init*
*Próxima revisão: ao início da Wave 4*
