import { db } from '@/db/drizzle';
import { drinkSizesTable, drinksTable } from '@/db/schema';
import { Drink, RawDrinkData } from '@/domains/drink';
import { eq } from 'drizzle-orm';
import { getDrink } from './getDrink';

export async function updateDrink(drink: Drink): Promise<Drink | null> {
  let updatedDrink: Drink | null = null;
  try {
    const drinkId = (
      await db
        .update(drinksTable)
        .set({
          name: drink.name,
          sizeId: drink.sizeId,
          alcoholDegree: drink.alcoholDegree,
          memo: drink.memo,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(drinksTable.id, drink.id))
        .returning()
    )[0].id;

    // 挿入されたドリンクを取得
    updatedDrink = await getDrink(drinkId);

    console.log(`
    drink updated →
    ${JSON.stringify(updatedDrink, null, 2)}`);
  } catch (error) {
    console.error(error);
  }
  return updatedDrink || null;
}
