import { RawDrinkData, Drink } from '@/domains/drink';

export function convertRawDrinkData(rawData: RawDrinkData | RawDrinkData[]): Drink[] {
  const dataArray = Array.isArray(rawData) ? rawData : [rawData];
  return dataArray.map(({ drinks, drink_sizes }) => ({
    ...drinks,
    size: drink_sizes
      ? drink_sizes
      : {
          id: 0,
          name: 'Unknown',
          amount: 0,
        },
  }));
}
