# 04 — Error Handling Contract

> **ATENÇÃO AGENTE:** Error handling inconsistente é a principal causa de bugs em produção.
> Este contrato define o padrão único para todo o projeto. Sem exceções.

---

## REGRA UNIVERSAL

```
NUNCA deixe um erro passar silenciosamente.
NUNCA exponha stack traces ou mensagens de sistema ao usuário.
SEMPRE retorne feedback estruturado e tipado.
```

---

## 1. DATABASE ERRORS (Drizzle ORM)

```typescript
// ✅ PADRÃO OBRIGATÓRIO para queries Drizzle
import { db } from '@/db';
import { agendamentos } from '@/db/schemas/schema-agendamento';

export async function getAgendamento(id: number) {
  try {
    const result = await db
      .select()
      .from(agendamentos)
      .where(eq(agendamentos.id, id));
    
    return { data: result[0] ?? null, error: null };
  } catch (e: unknown) {
    // Log server-side com contexto
    console.error('[DB][agendamentos][getAgendamento]', e);
    // Retorno seguro — sem vazar detalhes internos
    return { data: null, error: 'Erro ao consultar agendamento' };
  }
}
```

**Regras:**
- Log sempre com prefixo: `[DB][schema][função]`
- Retorno sempre: `{ data: T | null, error: string | null }`
- Nunca relançar (rethrow) erros de banco para o cliente
- Nunca incluir `e.message` no retorno ao cliente em produção

---

## 2. API ROUTES (Astro)

### HTTP Status Codes — Mapeamento Canônico

| Código | Quando Usar |
|---|---|
| `200 OK` | Sucesso com body |
| `201 Created` | Recurso criado (POST) |
| `204 No Content` | Sucesso sem body (DELETE) |
| `400 Bad Request` | Input inválido (Zod validation fail) |
| `401 Unauthorized` | Não autenticado |
| `403 Forbidden` | Autenticado mas sem permissão |
| `404 Not Found` | Recurso não existe |
| `409 Conflict` | Conflito de estado (ex: email duplicado) |
| `422 Unprocessable` | Dados sintaticamente válidos mas semanticamente inválidos |
| `500 Internal Server Error` | Erro inesperado do servidor |

**❌ PROIBIDO:** Retornar `200` com `{ success: false }` — use status codes semânticos.

```typescript
// ✅ PADRÃO de API Route
export const POST: APIRoute = async ({ request }) => {
  // 1. Parse e validação
  const body = await request.json().catch(() => null);
  if (!body) {
    return new Response(
      JSON.stringify({ data: null, error: 'Body inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ data: null, error: parsed.error.flatten() }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Lógica de negócio
  const { data, error } = await createBooking(parsed.data);
  if (error) {
    return new Response(
      JSON.stringify({ data: null, error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ data, error: null }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
};
```

---

## 3. SUPABASE AUTH ERRORS

```typescript
// ✅ Mapa de erros Supabase → mensagens PT-BR amigáveis
// Localização: src/lib/errors.ts

export const SUPABASE_AUTH_ERRORS: Record<string, string> = {
  'Invalid login credentials': 'Email ou senha incorretos.',
  'Email not confirmed': 'Confirme seu email antes de entrar.',
  'User already registered': 'Este email já está cadastrado.',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
  'Rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos.',
};

export function getAuthErrorMessage(error: AuthError): string {
  return SUPABASE_AUTH_ERRORS[error.message] ?? 'Erro de autenticação. Tente novamente.';
}
```

---

## 4. REACT COMPONENTS (Client-side)

```typescript
// ✅ Estado de erro tipado em componentes
interface ComponentState {
  data: BookingData | null;
  error: string | null;
  isLoading: boolean;
}

// ✅ Error Boundary para Islands críticos
// Localização: src/components/ui/ErrorBoundary.tsx
// Uso obrigatório em: modais de pagamento, formulários de booking

// ✅ UI para estados de erro — sempre explícita
if (state.error) {
  return (
    <div role="alert" className="card-editorial border-red-900/20 bg-red-950/10">
      <p className="text-sm text-red-400">{state.error}</p>
      <button onClick={retry}>Tentar novamente</button>
    </div>
  );
}
```

**Regras:**
- Todo `fetch` client-side deve ter estado de `error` e `isLoading`
- Nunca renderizar `undefined` — sempre ter fallback visual
- `role="alert"` em mensagens de erro para acessibilidade

---

## 5. FETCH / EXTERNAL APIs

```typescript
// ✅ Wrapper padrão para fetch externo
async function safeFetch<T>(url: string, options?: RequestInit): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(url, options);
    
    if (!res.ok) {
      return { data: null, error: `HTTP ${res.status}: ${res.statusText}` };
    }
    
    const data: T = await res.json();
    return { data, error: null };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Erro de rede desconhecido';
    console.error('[fetch]', url, message);
    return { data: null, error: 'Falha na conexão. Verifique sua internet.' };
  }
}
```

---

*Última atualização: 2026-04-30 | Site Factory 2.0 — Sistema Imune Nível 3*
