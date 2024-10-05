import { AppDataSource } from './database';
import { Drink, DrinkingLog, DrinkSize } from '@/domains/entities';

const drinkSizesRepository = AppDataSource.getRepository(DrinkSize);
const drinksRepository = AppDataSource.getRepository(Drink);
const drinkingLogsRepository = AppDataSource.getRepository(DrinkingLog);

export const addInitialData = async () => {
  let drinkSizes: DrinkSize[];
  let drinks: Drink[];
  let drinkingLogs: DrinkingLog[];

  const drinkSizesCount = await drinkSizesRepository.count();
  const drinksCount = await drinksRepository.count();
  const drinkingLogsCount = await drinkingLogsRepository.count();

  if (drinkSizesCount === 0) {
    const initialDrinkSizes = [
      { name: '小', amount: 200 },
      { name: '中', amount: 350 },
      { name: '大', amount: 500 },
      { name: 'おちょこ', amount: 40 },
      { name: '1合', amount: 180 },
      { name: '1/2合', amount: 90 },
      { name: 'グラス', amount: 100 },
      { name: 'ハーフ', amount: 45 },
      { name: 'シングル', amount: 30 },
      { name: 'ダブル', amount: 60 },
      { name: 'ショート', amount: 60 },
      { name: 'ロング', amount: 300 },
    ];
    drinkSizes = initialDrinkSizes.map((row) => {
      const drinkSize = new DrinkSize();
      drinkSize.name = row.name;
      drinkSize.amount = row.amount;
      return drinkSize;
    });
    await drinkSizesRepository.save(drinkSizes);
    console.log('Initial drink sizes added successfully');
  }

  if (drinksCount === 0) {
    const initialDrinks = [
      { name: 'ビール', alcoholDegree: 5, size: '中', memo: '' },
      { name: 'ハイボール', alcoholDegree: 7, size: '中', memo: '' },
      { name: '日本酒', alcoholDegree: 14, size: 'おちょこ', memo: '' },
      { name: 'レモンサワー', alcoholDegree: 5, size: '中', memo: '' },
      { name: '赤ワイン', alcoholDegree: 12, size: 'グラス', memo: '' },
      { name: 'ジントニック', alcoholDegree: 10, size: 'ロング', memo: '' },
      { name: 'マティーニ', alcoholDegree: 35, size: 'ショート', memo: '' },
    ];
    drinks = initialDrinks.map((row) => {
      const drink = new Drink();
      drink.name = row.name;
      drink.alcoholDegree = row.alcoholDegree;
      drink.size = drinkSizes.find((size) => size.name === row.size)!;
      drink.memo = row.memo;
      return drink;
    });
    await drinksRepository.save(drinks);
    console.log('Initial drinks added successfully');
  }

  if (drinkingLogsCount === 0) {
    const initialDrinkingLogs = [
      { drink: 'ビール', createdAt: new Date(2024, 7, 1, 18, 50, 0) },
      { drink: 'ハイボール', createdAt: new Date(2024, 7, 1, 18, 55, 0) },
      { drink: 'マティーニ', createdAt: new Date(2024, 7, 1, 18, 58, 0) },
      { drink: 'レモンサワー', createdAt: new Date(2024, 7, 1, 19, 50, 0) },
      { drink: 'ビール', createdAt: new Date(2024, 7, 3, 18, 50, 0) },
      { drink: '日本酒', createdAt: new Date(2024, 7, 3, 18, 51, 0) },
      { drink: '赤ワイン', createdAt: new Date(2024, 7, 4, 18, 50, 0) },
      { drink: 'レモンサワー', createdAt: new Date(2024, 7, 4, 18, 53, 0) },
      { drink: 'ビール', createdAt: new Date(2024, 7, 4, 18, 54, 0) },
      { drink: 'ハイボール', createdAt: new Date(2024, 7, 4, 18, 54, 0) },
      { drink: '日本酒', createdAt: new Date(2024, 7, 5, 18, 50, 0) },
      { drink: 'ジントニック', createdAt: new Date(2024, 7, 5, 18, 51, 0) },
      { drink: 'ビール', createdAt: new Date(2024, 7, 5, 18, 53, 0) },
      { drink: 'ハイボール', createdAt: new Date(2024, 7, 5, 18, 55, 0) },
      { drink: '日本酒', createdAt: new Date(2024, 7, 5, 18, 58, 0) },
    ];
    drinkingLogs = initialDrinkingLogs.map((row) => {
      const drinkingLog = new DrinkingLog();
      drinkingLog.createdAt = row.createdAt;
      drinkingLog.drink = drinks.find((drink) => drink.name === row.drink)!;
      return drinkingLog;
    });
    await drinkingLogsRepository.save(drinkingLogs);
    console.log('Initial drinking logs added successfully');
  }
};

export const resetDatabase = async () => {
  await AppDataSource.query('DROP TABLE IF EXISTS drink_sizes');
  await AppDataSource.query('DROP TABLE IF EXISTS drinks');
  await AppDataSource.query('DROP TABLE IF EXISTS drinking_logs');

  await drinkingLogsRepository.clear();
  await drinksRepository.clear();
  await drinkSizesRepository.clear();

  console.log('Database has been reset!');

  await addInitialData();
};

export const showDatabase = async () => {
  const drinkSizes = await drinkSizesRepository.find();
  const drinks = await drinksRepository.find();
  const drinkingLogs = await drinkingLogsRepository.find();

  console.log('Drink Sizes:', drinkSizes);
  console.log('Drinks:', drinks);
  console.log('Drinking Logs:', drinkingLogs);
};

export const addDrink = async (drink: Drink) => {
  try {
    const newDrink = drinksRepository.create(drink);
    await drinksRepository.save(newDrink);
    console.log('New drink added successfully:', newDrink);
  } catch (err) {
    console.error('Error adding new drink:', err);
  }
};

export const retrieveDrinks = async () => {
  try {
    const drinks = await drinksRepository.find({
      relations: ['drinkingLogs', 'size'],
    });
    return drinks;
  } catch (err) {
    console.error('Error retrieving drinks:', err);
  }
};

export const deleteDrink = async (drinkId: number) => {
  try {
    await drinksRepository.delete(drinkId);
    console.log('Drink deleted successfully:', drinkId);
  } catch (err) {
    console.error('Error deleting drink:', err);
  }
};

export const updateDrink = async (drink: Partial<Drink>) => {
  try {
    if (drink.id !== undefined) {
      await drinksRepository.update(drink.id, drink);
      console.log('Drink updated successfully:', drink.id);
    } else {
      throw new Error('Drink ID is undefined');
    }
  } catch (err) {
    console.error('Error updating drink:', err);
  }
};

export const addDrinkingLog = async (drinkingLog: DrinkingLog) => {
  try {
    const newDrinkingLog = drinkingLogsRepository.create(drinkingLog);
    await drinkingLogsRepository.save(newDrinkingLog);
    console.log('New drinking log added successfully:', newDrinkingLog);
  } catch (err) {
    console.error('Error adding new drinking log:', err);
  }
};

export const retrieveDrinkingLogs = async () => {
  try {
    const drinkingLogs = await drinkingLogsRepository.find({
      relations: ['drink.size'],
    });
    console.log('Retrieved drinking logs:', drinkingLogs);
    return drinkingLogs;
  } catch (err) {
    console.error('Error retrieving drinking logs:', err);
  }
};

export const deleteDrinkingLog = async (drinkingLogId: number) => {
  try {
    await drinkingLogsRepository.delete(drinkingLogId);
    console.log('Drinking log deleted successfully:', drinkingLogId);
  } catch (err) {
    console.error('Error deleting drinking log:', err);
  }
};

export const retrieveDrinkSizes = async () => {
  try {
    const drinkSizes = await drinkSizesRepository.find();
    return drinkSizes;
  } catch (err) {
    console.error('Error retrieving drink sizes:', err);
  }
};
