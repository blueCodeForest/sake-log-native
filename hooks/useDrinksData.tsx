import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '@/db/drizzle';
import { Drink } from '@/domains/drink';
import { useEffect } from 'react';
import { drinkingLogsTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { convertToIsoString } from '@/utils';

export function useDrinksData(): Drink[] {
  const { data } = useLiveQuery(
    db.query.drinksTable.findMany({
      where: (drinksTable, { eq }) => eq(drinksTable.isVisible, true),
      with: {
        size: true,
        logs: true,
      },
    })
  );

  // drinkingLogsを再レンダリングするために1ミリ秒更新する
  useEffect(() => {
    if (data) {
      const updateLatestDrinkingLog = async () => {
        const latestLog = (
          await db
            .select()
            .from(drinkingLogsTable)
            .orderBy(desc(drinkingLogsTable.createdAt))
            .limit(1)
        )[0];

        if (latestLog) {
          const newCreatedAt = new Date(
            new Date(convertToIsoString(latestLog.createdAt)).getTime() - 1
          );
          await db
            .update(drinkingLogsTable)
            .set({ createdAt: newCreatedAt.toISOString() })
            .where(eq(drinkingLogsTable.id, latestLog.id));
        }
      };

      updateLatestDrinkingLog();
    }
  }, [data]);

  return data || [];
}
