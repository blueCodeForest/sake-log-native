import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { DrinkSize, drinkSizesTable } from '../drinkSize';
// import { drinkingLogsTable } from '../drinkingLog';

export const drinksTable = sqliteTable('drinks', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  alcoholDegree: integer('alcohol_degree').notNull(),
  sizeId: integer('size_id').notNull(),
  memo: text('memo'),
  isVisible: integer('is_visible', { mode: 'boolean' }).default(true).notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const drinksRelations = relations(drinksTable, ({ one, many }) => {
  const { drinkingLogsTable } = require('../drinkingLog'); // 循環参照を避けるための遅延評価
  return {
    size: one(drinkSizesTable, { fields: [drinksTable.sizeId], references: [drinkSizesTable.id] }),
    logs: many(drinkingLogsTable),
  };
});

export type BaseDrink = typeof drinksTable.$inferSelect;
export type InsertDrink = typeof drinksTable.$inferInsert;

export type RawDrinkData = {
  drinks: BaseDrink;
  drink_sizes: DrinkSize | null;
};

export type Drink = BaseDrink & {
  size: DrinkSize;
};
