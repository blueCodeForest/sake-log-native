import { db } from '@/db/drizzle';
import { drinksTable } from '@/db/schema';
import { Drink, InsertDrink } from '@/domains/drink';
import { getDrink } from './getDrink';

export async function addDrink(drink: InsertDrink): Promise<Drink | null> {
  let insertedDrink: Drink | null = null;
  try {
    // ドリンクを挿入
    const drinkId = (
      await db
        .insert(drinksTable)
        .values({
          ...drink,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning({
          id: drinksTable.id,
        })
    )[0].id;

    // 挿入されたドリンクを取得
    insertedDrink = await getDrink(drinkId);

    console.log(`
      drink inserted →
      ${JSON.stringify(insertedDrink, null, 2)}`);
  } catch (error) {
    console.error(error);
  }
  return insertedDrink || null;
}
