# Especificação Técnica do Banco de Dados — Assinaturas

## JSON Schema para Controle de Trial de 7 Dias (Sem Cartão)

Este esquema define a estrutura de dados necessária para o onboarding de advogados com período de teste (trial) de 7 dias sem a necessidade de cadastrar um cartão de crédito inicialmente.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AssinaturaUsuario",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "Identificador único autoincrementável do usuário/advogado"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Endereço de email único do usuário"
    },
    "nome": {
      "type": "string",
      "description": "Nome completo do advogado"
    },
    "trial_ends_at": {
      "type": "string",
      "format": "date-time",
      "description": "Data e hora exata em que o período de 7 dias de trial se encerra"
    },
    "stripe_customer_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "ID do cliente gerado no Stripe quando vinculado ao faturamento"
    },
    "stripe_subscription_status": {
      "type": [
        "string",
        "null"
      ],
      "enum": [
        "trailing",
        "active",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "canceled",
        "unpaid",
        null
      ],
      "description": "Status da assinatura do Stripe (ex: active, trialing, canceled)"
    }
  },
  "required": [
    "id",
    "email",
    "nome",
    "trial_ends_at"
  ]
}
```
