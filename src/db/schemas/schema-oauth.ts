import { mysqlTable, int, varchar, timestamp, uniqueIndex } from 'drizzle-orm/mysql-core';
import { usuarios } from './schema-usuario';

export const oauthContas = mysqlTable('oauth_contas', {
  id: int('id').primaryKey().autoincrement(),
  usuarioId: varchar('usuario_id', { length: 36 }).notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  provedor: varchar('provedor', { length: 50 }).notNull(), // 'google' | 'apple'
  provedorAccountId: varchar('provedor_account_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  provedorAccountIdx: uniqueIndex('provedor_account_idx').on(table.provedor, table.provedorAccountId),
}));

export type OauthConta = typeof oauthContas.$inferSelect;
export type NovaOauthConta = typeof oauthContas.$inferInsert;
