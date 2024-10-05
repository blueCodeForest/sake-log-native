import { db } from '@/db/drizzle';
import { drinksTable } from '@/db/schema';
import { Drink } from '@/domains/drink';
import { eq } from 'drizzle-orm';

export async function getDrink(drinkId: number): Promise<Drink | null> {
  return (
    (await db.query.drinksTable.findFirst({
      where: eq(drinksTable.id, drinkId),
      with: {
        size: true,
        logs: true,
      },
    })) || null
  );
}
