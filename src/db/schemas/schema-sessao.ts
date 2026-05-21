import { mysqlTable, int, varchar, timestamp, uniqueIndex } from 'drizzle-orm/mysql-core';
import { usuarios } from './schema-usuario';

export const sessoes = mysqlTable('sessoes', {
  id: int('id').primaryKey().autoincrement(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  usuarioId: varchar('usuario_id', { length: 36 }).notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  expiraEm: timestamp('expira_em').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Sessao = typeof sessoes.$inferSelect;
export type NovaSessao = typeof sessoes.$inferInsert;
