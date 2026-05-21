import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const usuarios = mysqlTable('usuarios', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  nome: varchar('nome', { length: 255 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 2048 }),
  trialEndsAt: timestamp('trial_ends_at'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionStatus: varchar('stripe_subscription_status', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Usuario = typeof usuarios.$inferSelect;
export type NovoUsuario = typeof usuarios.$inferInsert;
