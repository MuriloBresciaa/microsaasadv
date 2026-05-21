import { mysqlTable, int, varchar, json, timestamp } from 'drizzle-orm/mysql-core';
import { usuarios } from './schema-usuario';

export const analisesContratos = mysqlTable('analises_contratos', {
  id: int('id').primaryKey().autoincrement(),
  usuarioId: varchar('usuario_id', { length: 36 }).notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  nomeArquivo: varchar('nome_arquivo', { length: 255 }).notNull(),
  resultadoJson: json('resultado_json').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export type AnaliseContrato = typeof analisesContratos.$inferSelect;
export type NovaAnaliseContrato = typeof analisesContratos.$inferInsert;
