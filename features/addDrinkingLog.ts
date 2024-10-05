import { db } from '@/db/drizzle';
import { DrinkingLog, drinkingLogsTable } from '@/domains/drinkingLog';
import { eq } from 'drizzle-orm';

export async function addDrinkingLog(drinkId: number) {
  let insertedDrinkingLog: DrinkingLog | null = null;
  try {
    const insertedDrinkingLogId = (
      await db
        .insert(drinkingLogsTable)
        .values({
          drinkId: drinkId,
          createdAt: new Date().toISOString(),
        })
        .returning({ id: drinkingLogsTable.id })
    )[0].id;

    insertedDrinkingLog =
      (await db.query.drinkingLogsTable.findFirst({
        where: eq(drinkingLogsTable.id, insertedDrinkingLogId),
        with: {
          drink: {
            with: {
              size: true,
            },
          },
        },
      })) || null;

    console.log(`
      drinking log inserted →
      ${JSON.stringify(insertedDrinkingLog, null, 2)}`);
  } catch (error) {
    console.error(error);
  }

  return insertedDrinkingLog;
}
