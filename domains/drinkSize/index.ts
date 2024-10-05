import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { drinksTable } from '../drink';

export const drinkSizesTable = sqliteTable('drink_sizes', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
});

export const drinkSizesRelations = relations(drinkSizesTable, ({ many }) => ({
  drinks: many(drinksTable),
}));

export type DrinkSize = typeof drinkSizesTable.$inferSelect;
export type InsertDrinkSize = typeof drinkSizesTable.$inferInsert;
