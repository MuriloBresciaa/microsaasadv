# 05 — Naming Convention Contract

> **ATENÇÃO AGENTE:** Nomenclatura inconsistente quebra autocomplete, torna o código ilegível
> e impede que outros agentes naveguem no código sem ambiguidade.
> Este contrato é não-negociável.

---

## VARIÁVEIS E FUNÇÕES

### camelCase — Padrão Universal

```typescript
// ✅ CORRETO
const userData = await fetchUser(id);
const isLoading = true;
const hasPermission = checkRole(user);
const canSubmit = form.isValid && !isLoading;
const shouldRedirect = !session;

// ❌ PROIBIDO
const UserData = ...       // PascalCase em variável
const is_loading = ...     // snake_case
const ISLOADING = ...      // SCREAMING em variável mutável
```

---

## BOOLEANOS — Prefixos Obrigatórios

| Prefixo | Uso | Exemplo |
|---|---|---|
| `is` | Estado do componente/entidade | `isOpen`, `isLoading`, `isValid` |
| `has` | Posse ou existência de algo | `hasError`, `hasPermission`, `hasSessions` |
| `can` | Capacidade ou permissão de ação | `canEdit`, `canDelete`, `canSubmit` |
| `should` | Decisão condicional de comportamento | `shouldRedirect`, `shouldRefetch` |
| `was` | Estado passado (imutável) | `wasSubmitted`, `wasViewed` |

```typescript
// ✅ CORRETO
const isAuthenticated = !!session;
const hasActiveBooking = bookings.length > 0;
const canCancelBooking = booking.status === 'pending';

// ❌ PROIBIDO
const authenticated = ...    // sem prefixo
const booking = ...          // ambíguo (é bool ou objeto?)
const checkAuth = ...        // parece função, não boolean
```

---

## HANDLERS DE EVENTO

**Prefixo obrigatório: `handle`**

```typescript
// ✅ CORRETO — pattern handle + Substantivo + Verbo/Ação
const handleFormSubmit = (e: React.FormEvent) => { ... }
const handleModalClose = () => { ... }
const handleBookingCancel = (id: string) => { ... }
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// ❌ PROIBIDO
const onSubmit = ...      // use handle*
const submitForm = ...    // parece função de negócio, não handler de evento
const clicked = ...       // não descritivo
```

---

## FUNÇÕES ASSÍNCRONAS (Negócio)

**Prefixos por operação CRUD:**

| Operação | Prefixo | Exemplo |
|---|---|---|
| Buscar um | `fetch` / `get` | `fetchUser(id)`, `getBooking(id)` |
| Buscar lista | `fetch` / `list` | `fetchUsers()`, `listBookings()` |
| Criar | `create` | `createBooking(data)` |
| Atualizar | `update` | `updateProfile(id, data)` |
| Deletar | `delete` / `remove` | `deleteBooking(id)` |
| Validar | `validate` / `check` | `validateEmail(email)` |

```typescript
// ✅ CORRETO
async function fetchBookings(userId: string): Promise<ApiResponse<Booking[]>>
async function createAgendamento(data: NewAgendamento): Promise<ApiResponse<Agendamento>>
async function updateUserProfile(id: string, data: Partial<Profile>): Promise<ApiResponse<Profile>>

// ❌ PROIBIDO
async function booking(...)     // sem verbo
async function doStuff(...)     // genérico
async function bookingHelper(...)  // helper é vago
```

---

## CONSTANTES

**SCREAMING_SNAKE_CASE — apenas para valores verdadeiramente imutáveis**

```typescript
// ✅ CORRETO — em src/lib/constants.ts
export const MAX_BOOKING_PER_DAY = 10;
export const DEFAULT_TIMEOUT_MS = 5000;
export const SUPABASE_TABLES = {
  BOOKINGS: 'bookings',
  PROFILES: 'profiles',
} as const;

// ❌ PROIBIDO — constantes inline em componentes
const maxBookings = 10;  // deveria ser exportada
const MAX_B = 10;        // abreviação ilegível
```

---

## COMPONENTES REACT

```typescript
// ✅ CORRETO — PascalCase, interface nomeada
interface BookingCardProps {
  id: string;
  title: string;
  date: Date;
  onCancel: (id: string) => void;
}

export function BookingCard({ id, title, date, onCancel }: BookingCardProps) { ... }

// ✅ Sub-componentes internos — prefixo do pai
function BookingCardHeader() { ... }  // interno ao arquivo
function BookingCardActions() { ... } // interno ao arquivo

// ❌ PROIBIDO
export default function bookingcard() { ... }  // minúscula
export function Card() { ... }                  // genérico demais
```

---

## STORES (Nano Stores)

```typescript
// ✅ CORRETO — sufixo Store, atom/map prefixo descritivo
// Localização: src/store/[domain]Store.ts

// src/store/bookingStore.ts
export const bookingStore = atom<Booking | null>(null);
export const bookingsListStore = atom<Booking[]>([]);
export const bookingLoadingStore = atom<boolean>(false);

// ❌ PROIBIDO
export const store = ...      // genérico
export const booking = ...    // sem sufixo Store
export const BookingStore = ... // PascalCase em store
```

---

## EVENTOS CUSTOMIZADOS

**Padrão: `domínio:ação` em kebab-case**

```typescript
// ✅ CORRETO
'booking:created'
'booking:cancelled'
'auth:login'
'auth:logout'
'cart:item-added'
'modal:opened'

// ❌ PROIBIDO
'bookingCreated'   // camelCase
'BOOKING_CREATED'  // SCREAMING
'created'          // sem domínio
```

---

## CSS CLASSES CUSTOMIZADAS

**kebab-case obrigatório — consistente com Tailwind**

```css
/* ✅ CORRETO */
.card-editorial { ... }
.text-gradient-gold { ... }
.glass-light { ... }
.btn-gold { ... }

/* ❌ PROIBIDO */
.cardEditorial { ... }   /* camelCase */
.CardEditorial { ... }   /* PascalCase */
.CARD_EDITORIAL { ... }  /* SCREAMING */
```

---

## ARQUIVOS — RESUMO

| Tipo de Arquivo | Padrão | Exemplo |
|---|---|---|
| Componente React | PascalCase.tsx | `BookingCard.tsx` |
| Hook customizado | camelCase.ts (prefixo `use`) | `useBookings.ts` |
| Utilitário | camelCase.ts | `utils.ts`, `formatDate.ts` |
| Store | camelCase + `Store.ts` | `bookingStore.ts` |
| Schema Drizzle | `schema-[entidade].ts` | `schema-agendamento.ts` |
| Constantes | `constants.ts` | `src/lib/constants.ts` |
| Tipos globais | `types.ts` | `src/lib/types.ts` |
| Layout Astro | PascalCase.astro | `RootLayout.astro` |
| Página Astro | kebab-case.astro | `index.astro`, `sobre-nos.astro` |

---

*Última atualização: 2026-04-30 | Site Factory 2.0 — Sistema Imune Nível 3*
