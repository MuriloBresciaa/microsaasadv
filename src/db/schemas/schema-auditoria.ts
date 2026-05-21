import { mysqlTable, int, varchar, json, timestamp } from 'drizzle-orm/mysql-core';
import { usuarios } from './schema-usuario';

export const auditoriasProvas = mysqlTable('auditorias_provas', {
  id: int('id').primaryKey().autoincrement(),
  usuarioId: varchar('usuario_id', { length: 36 }).notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  tituloCaso: varchar('titulo_caso', { length: 255 }).notNull(),
  linhaTempoJson: json('linha_tempo_json').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export type AuditoriaProva = typeof auditoriasProvas.$inferSelect;
export type NovaAuditoriaProva = typeof auditoriasProvas.$inferInsert;
