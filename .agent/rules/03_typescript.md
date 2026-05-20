# 03 — TypeScript Contract (Strict Mode)

> **ATENÇÃO AGENTE:** TypeScript strict está ATIVO neste projeto.
> Qualquer uso de `any` sem justificativa documentada = violação de protocolo.

---

## PROIBIÇÕES ABSOLUTAS

```typescript
// ❌ PROIBIDO — nunca, em nenhuma circunstância
const data: any = fetchUser()
const result = value as any
// @ts-ignore
// @ts-expect-error (apenas com comentário explicativo obrigatório)
```

---

## ALTERNATIVAS CORRETAS

### Substituições para `any`

| Situação | Errado | Correto |
|---|---|---|
| Tipo desconhecido de API | `any` | `unknown` + type guard |
| Dados JSON externos | `any` | `z.infer<typeof schema>` (Zod) |
| Evento de DOM genérico | `any` | `React.ChangeEvent<HTMLInputElement>` |
| Ref de componente | `any` | `React.RefObject<HTMLDivElement>` |
| Erro em catch | `catch (e: any)` | `catch (e: unknown)` |

### Type Guard Padrão para Erros

```typescript
// ✅ PADRÃO OBRIGATÓRIO para todos os catch blocks
function isError(e: unknown): e is Error {
  return e instanceof Error;
}

try {
  await fetchData();
} catch (e: unknown) {
  if (isError(e)) {
    console.error('[Component]', e.message);
  }
}
```

---

## CONTRATOS DE COMPONENTES REACT

```typescript
// ✅ CORRETO — interface nomeada, sempre
interface BookingCardProps {
  title: string;
  date: Date;
  price: number;
  onBook?: () => void;
}

export function BookingCard({ title, date, price, onBook }: BookingCardProps) {
  // ...
}

// ❌ PROIBIDO — type inline no componente
export function BookingCard({ title }: { title: string }) { ... }
```

**Regras de nomeação:**
- Interface de props: `[ComponentName]Props`
- Interface de store: `[StoreName]State`
- Interface de API response: `[Entity]Response`

---

## CONTRATOS DE SCHEMAS DRIZZLE

```typescript
// ✅ OBRIGATÓRIO — exportar o tipo inferido
export const agendamentos = mysqlTable('agendamentos', {
  id: int('id').primaryKey().autoincrement(),
  nome: varchar('nome', { length: 255 }).notNull(),
});

// Exportar tipos inferidos — SEMPRE
export type Agendamento = typeof agendamentos.$inferSelect;
export type NewAgendamento = typeof agendamentos.$inferInsert;
```

---

## CONTRATOS DE API ROUTES (Astro)

```typescript
// ✅ PADRÃO para todos os retornos de API
type ApiSuccess<T> = { data: T; error: null };
type ApiError = { data: null; error: string };
type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ✅ Uso no handler
export async function POST({ request }: APIContext): Promise<Response> {
  // Sempre tipar o body via Zod
  const body = await request.json();
  const parsed = BookingSchema.safeParse(body);
  
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ data: null, error: parsed.error.message }),
      { status: 400 }
    );
  }
  // ...
}
```

---

## CONTRATOS DE SUPABASE

```typescript
// ✅ Usar tipos gerados pelo Supabase CLI
import type { Database } from '@/lib/database.types'; // gerado via supabase gen types

type Profile = Database['public']['Tables']['profiles']['Row'];

// ✅ Tipar o client com generics
const supabase = createClient<Database>(url, key);
```

---

## REGRAS DE IMPORTS

```typescript
// ✅ OBRIGATÓRIO — sempre imports absolutos via @/*
import { cn } from '@/lib/utils';
import type { Agendamento } from '@/db/schemas/schema-agendamento';

// ❌ PROIBIDO — imports relativos atravessando pastas
import { cn } from '../../lib/utils';
```

---

## @ts-expect-error — Uso Excepcional

Se absolutamente necessário, o padrão obrigatório é:

```typescript
// JUSTIFICATIVA: [motivo técnico específico]
// TICKET: [link para issue ou ADR se disponível]
// @ts-expect-error — [descrição do comportamento esperado]
legacyFunction(param);
```

---

*Última atualização: 2026-04-30 | Site Factory 2.0 — Sistema Imune Nível 3*
