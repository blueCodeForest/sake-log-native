import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { BaseDrink, Drink, drinksTable } from '../drink';
import { relations, sql } from 'drizzle-orm';
import { DrinkSize } from '../drinkSize';

export const drinkingLogsTable = sqliteTable('drinking_logs', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  drinkId: integer('drink_id').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const drinkingLogsRelations = relations(drinkingLogsTable, ({ one }) => ({
  drink: one(drinksTable, { fields: [drinkingLogsTable.drinkId], references: [drinksTable.id] }),
}));

export type BaseDrinkingLog = typeof drinkingLogsTable.$inferSelect;
export type InsertDrinkingLog = typeof drinkingLogsTable.$inferInsert;

export type RawDrinkingLogData = {
  drinking_logs: BaseDrinkingLog;
  drinks: BaseDrink;
  drink_sizes: DrinkSize | null;
};

export type DrinkingLog = BaseDrinkingLog & {
  drink: Drink;
};
