import { mysqlTable, serial, varchar, timestamp, int } from 'drizzle-orm/mysql-core';

export const agendamentos = mysqlTable('agendamentos', {
  id: serial('id').primaryKey(),
  clienteNome: varchar('cliente_nome', { length: 255 }).notNull(),
  clienteWhatsapp: varchar('cliente_whatsapp', { length: 20 }).notNull(),
  servicoId: int('servico_id').notNull(),
  dataHora: timestamp('data_hora').notNull(),
  criadoEm: timestamp('criado_em').defaultNow(),
});