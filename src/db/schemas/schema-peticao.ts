import { mysqlTable, int, text, longtext, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { usuarios } from './schema-usuario';

export const peticoesGeradas = mysqlTable('peticoes_geradas', {
  id: int('id').primaryKey().autoincrement(),
  usuarioId: varchar('usuario_id', { length: 36 }).notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  fatosBrutos: text('fatos_brutos').notNull(),
  peticaoTexto: longtext('peticao_texto').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export type PeticaoGerada = typeof peticoesGeradas.$inferSelect;
export type NovaPeticaoGerada = typeof peticoesGeradas.$inferInsert;
