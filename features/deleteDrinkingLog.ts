import { db } from '@/db/drizzle';
import { drinkingLogsTable } from '@/db/schema';
import { DrinkingLog } from '@/domains/drinkingLog';
import { eq } from 'drizzle-orm';

export async function deleteDrinkingLog(log: DrinkingLog): Promise<void> {
  console.log('deleteDrinkingLog');
  try {
    await db.delete(drinkingLogsTable).where(eq(drinkingLogsTable.id, log.id));
    console.log(`
      Drinking log
      ${log.id}: ${log.drink.name}(${log.drink.size.name}) ${new Date(
      log.createdAt
    ).toLocaleString()} deleted`);
  } catch (error) {
    console.error(error);
  }
  return;
}
