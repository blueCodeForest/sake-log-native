import { RawDrinkData, Drink } from '@/domains/drink';
import { DrinkingLog, RawDrinkingLogData } from '@/domains/drinkingLog';

export function convertRawDrinkingLogData(rawData: RawDrinkingLogData[]): DrinkingLog[] {
  return rawData.map(({ drinking_logs, drinks, drink_sizes }) => ({
    ...drinking_logs,
    drink: {
      ...drinks,
      size: drink_sizes
        ? drink_sizes
        : {
            id: 0,
            name: 'Unknown',
            amount: 0,
          },
    },
  }));
}
