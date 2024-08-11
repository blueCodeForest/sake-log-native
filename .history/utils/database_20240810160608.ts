import { DataSource } from 'typeorm';
import { Drinks, DrinkingLogs, DrinkSizes } from '@/entities';
import { CustomNamingStrategy } from './CustomNamingStrategy';

export const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'sakelogdb',
  location: 'default',
  logging: ['error', 'query'],
  synchronize: true,
  entities: [Drinks, DrinkingLogs, DrinkSizes],
  namingStrategy: new CustomNamingStrategy(),
  driver: [require('react-native-sqlite-storage')],
});

export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
};

export const addInitialData = async () => {
  const drinkSizesRepository = AppDataSource.getRepository(DrinkSizes);
  const drinksRepository = AppDataSource.getRepository(Drinks);
  const drinkingLogsRepository = AppDataSource.getRepository(DrinkingLogs);

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
    await drinkSizesRepository.save(initialDrinkSizes);
    console.log('Initial drink sizes added successfully');
  }

  if (drinksCount === 0) {
    const initialDrinks = [
      { name: 'ビール', alcoholDegree: 5, sizeId: 2, memo: '' },
      { name: 'ハイボール', alcoholDegree: 7, sizeId: 2, memo: '' },
      { name: '日本酒', alcoholDegree: 14, sizeId: 4, memo: '' },
      { name: 'レモンサワー', alcoholDegree: 5, sizeId: 2, memo: '' },
      { name: '赤ワイン', alcoholDegree: 12, sizeId: 7, memo: '' },
      { name: 'ジントニック', alcoholDegree: 10, sizeId: 12, memo: '' },
      { name: 'マティーニ', alcoholDegree: 35, sizeId: 11, memo: '' },
    ];
    await drinksRepository.save(initialDrinks);
    console.log('Initial drinks added successfully');
  }

  if (drinkingLogsCount === 0) {
    const initialDrinkingLogs = [
      { drinkId: 1, createdAt: new Date() },
      { drinkId: 2, createdAt: new Date() },
      { drinkId: 3, createdAt: new Date() },
      { drinkId: 4, createdAt: new Date() },
      { drinkId: 1, createdAt: new Date() },
      { drinkId: 2, createdAt: new Date() },
      { drinkId: 3, createdAt: new Date() },
      { drinkId: 4, createdAt: new Date() },
      { drinkId: 1, createdAt: new Date() },
      { drinkId: 2, createdAt: new Date() },
      { drinkId: 3, createdAt: new Date() },
      { drinkId: 4, createdAt: new Date() },
      { drinkId: 1, createdAt: new Date() },
      { drinkId: 2, createdAt: new Date() },
      { drinkId: 3, createdAt: new Date() },
    ];
    await drinkingLogsRepository.save(initialDrinkingLogs);
    console.log('Initial drinking logs added successfully');
};
