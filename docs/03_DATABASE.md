# 03 — Database (Supabase)

> Convenções de banco de dados para o Site Factory V2.0.

## Provider

- **Supabase** (PostgreSQL gerenciado)
- Client: `@supabase/supabase-js`
- Autenticação: Supabase Auth (RLS obrigatório)

## Variáveis de Ambiente

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> ⚠️ Nunca exponha `service_role_key` no client. Apenas server-side.

## Convenções de Schema

### Normalização
- **Terceira Forma Normal (3FN)** obrigatória
- Sem dados duplicados entre tabelas
- Relações via foreign keys com `ON DELETE CASCADE` ou `RESTRICT`

### Identificadores
- **Primary Keys**: `UUID` (v4) via `gen_random_uuid()`
- **Naming**: `snake_case` para tabelas e colunas
- **Timestamps**: `created_at` e `updated_at` com `timestamptz` e default `now()`

### Row Level Security (RLS)
- **Sempre habilitado** em tabelas com dados de usuário
- Policies nomeadas descritivamente: `users_can_read_own_data`
- Sem `public` access sem policy explícita

## Padrão de Tabelas

```sql
CREATE TABLE public.example (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columns aqui
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.example ENABLE ROW LEVEL SECURITY;
```

## Client Usage (TypeScript)

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('example')
  .select('*')
  .order('created_at', { ascending: false });
```

## Regras

1. Nunca concatenar variáveis em queries (use `.eq()`, `.filter()`, etc.)
2. Sempre verificar `error` antes de usar `data`
3. Tipar responses com generics do Supabase quando possível
4. Indexes em colunas usadas em `WHERE`, `ORDER BY` e `JOIN`
