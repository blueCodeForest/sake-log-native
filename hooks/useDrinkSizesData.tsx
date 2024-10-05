import { db } from '@/db/drizzle';
import { DrinkSize } from '@/domains/drinkSize';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

export function useDrinkSizesData(): DrinkSize[] {
  const { data } = useLiveQuery(
    db.query.drinkSizesTable.findMany({
      with: {
        drinks: true,
      },
    })
  );
  return data || [];
}
