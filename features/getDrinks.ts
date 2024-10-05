import { db } from '@/db/drizzle';
import { Drink } from '@/domains/drink';

export async function getDrinks(): Promise<Drink[]> {
  return (
    (await db.query.drinksTable.findMany({
      where: (drinksTable, { eq }) => eq(drinksTable.isVisible, true),
      with: {
        size: true,
        logs: true,
      },
    })) || []
  );
}
