import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '@/db/drizzle';
import { DrinkingLog } from '@/domains/drinkingLog';

interface UseDrinkingLogsDataParams {
  start?: string;
  end?: string;
  drinkId?: number;
  refreshKey?: number;
}

export function useDrinkingLogsData({
  start,
  end,
  drinkId,
  refreshKey,
}: UseDrinkingLogsDataParams): DrinkingLog[] {
  const { data } = useLiveQuery(
    db.query.drinkingLogsTable.findMany({
      where: (drinkingLogsTable, { and, gte, lte, eq }) => {
        const conditions = [];
        if (start) {
          conditions.push(gte(drinkingLogsTable.createdAt, start));
        }
        if (end) {
          conditions.push(lte(drinkingLogsTable.createdAt, end));
        }
        if (drinkId) {
          conditions.push(eq(drinkingLogsTable.drinkId, drinkId));
        }
        return and(...conditions);
      },
      with: {
        drink: {
          with: {
            size: true,
          },
        },
      },
      orderBy: (drinkingLogsTable, { desc }) => [desc(drinkingLogsTable.createdAt)],
    }),
    [refreshKey]
  );
  return data || [];
}
