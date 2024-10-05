import { db } from '@/db/drizzle';
import { drinksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function softDeleteDrink(drinkId: number): Promise<void> {
  try {
    await db.update(drinksTable).set({ isVisible: false }).where(eq(drinksTable.id, drinkId));
  } catch (error) {
    console.error(error);
  }
  return;
}
