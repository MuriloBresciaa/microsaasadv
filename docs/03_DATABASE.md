# 03 — Database (MySQL / Drizzle ORM)

> Convenções de banco de dados para o JurisAI.
> Última atualização: 2026-05-21

## Provider

- **MySQL 8.x** (Laragon local, porta 3306)
- Driver: `mysql2/promise` (async/await nativo)
- ORM: Drizzle ORM v0.44+ com type-safety completa
- Schemas: Um arquivo por entidade em `src/db/schemas/schema-[entidade].ts`

## Variáveis de Ambiente

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=jurisai
```

> ⚠️ Todas as variáveis de banco são **server-only**. Nunca usar prefixo `PUBLIC_`.
> O arquivo `.env` está protegido pelo `.gitignore`. Nunca commitar valores reais.

## Convenções de Schema

### Normalização
- **Terceira Forma Normal (3FN)** obrigatória
- Sem dados duplicados entre tabelas
- Relações via foreign keys com `ON DELETE CASCADE`

### Identificadores
- **Primary Key da tabela `usuarios`**: UUID `varchar(36)` gerado pela aplicação
- **Primary Keys das demais tabelas**: `INT AUTO_INCREMENT`
- **Naming**: `snake_case` para tabelas e colunas no MySQL
- **Naming (Drizzle)**: `camelCase` para propriedades TypeScript
- **Timestamps**: `timestamp` com `defaultNow()` para `criado_em`

### Schemas Registrados

| Tabela               | Schema File                  | Propósito                           |
| -------------------- | ---------------------------- | ----------------------------------- |
| `usuarios`           | `schema-usuario.ts`          | Cadastro e ciclo trial/ativo        |
| `oauth_contas`       | `schema-oauth.ts`            | Provedores sociais (Google/Apple)   |
| `sessoes`            | `schema-sessao.ts`           | Tokens e expiração de sessões       |
| `analises_contratos` | `schema-contrato.ts`         | Engine 01: Analista de Riscos       |
| `peticoes_geradas`   | `schema-peticao.ts`          | Engine 02: Copiloto de Petições     |
| `auditorias_provas`  | `schema-auditoria.ts`        | Engine 03: Auditor de Provas        |

> Referência completa de tipagem e constraints: `docs/DATA_DICTIONARY.md`

## Client Usage (TypeScript / Drizzle)

```typescript
import { db } from '@/db';
import { usuarios } from '@/db/schemas/schema-usuario';
import { eq } from 'drizzle-orm';

// SELECT com Prepared Statement implícito (type-safe)
const user = await db
  .select()
  .from(usuarios)
  .where(eq(usuarios.email, email));

// INSERT
await db.insert(usuarios).values({
  id: crypto.randomUUID(),
  nome: 'João Silva',
  email: 'joao@escritorio.com.br',
});
```

## Regras

1. Nunca concatenar variáveis em queries — sempre use Drizzle ORM (Prepared Statements)
2. Sempre verificar resultados antes de usar dados retornados
3. Tipar responses com os schemas Drizzle exportados
4. Indexes em colunas usadas em `WHERE`, `ORDER BY` e `JOIN`
5. Foreign keys com `ON DELETE CASCADE` para integridade referencial
6. UUIDs apenas na tabela `usuarios` — demais usam `INT AUTO_INCREMENT`
