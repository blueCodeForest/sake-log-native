import { type ExpoSQLiteDatabase, drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';
import { drinkSeeds, drinkSizeSeeds } from './seeds';
import { DrinkSize } from '@/domains/drinkSize';
import * as schema from '@/db/schema';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import migrations from './drizzle/migrations';

const expo = openDatabaseSync('sakerec', { enableChangeListener: true });
// const expo = openDatabaseSync('9', { enableChangeListener: true });
export const db = drizzle(expo, { schema });

export const initialize = async () => {
  try {
    const drinkSizes: DrinkSize[] = await db
      .insert(schema.drinkSizesTable)
      .values(drinkSizeSeeds)
      .returning();
    console.log(drinkSizes);

    const drinks = await db
      .insert(schema.drinksTable)
      .values(
        drinkSeeds.map((drink) => ({
          ...drink,
          sizeId: drinkSizes.find((size) => size.name === drink.size)?.id ?? 0,
        }))
      )
      .returning();
    console.log(drinks);
    console.log('seeds inserted');
  } catch (error) {
    console.error(error);
  }
};

export const useMigrationHelper = () => {
  return useMigrations(db as unknown as ExpoSQLiteDatabase, migrations);
};
