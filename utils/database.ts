import { DataSource } from 'typeorm';
import * as SQLite from 'expo-sqlite/legacy';
import { Drink, DrinkingLog, DrinkSize } from '@/entities';
import { CustomNamingStrategy } from './CustomNamingStrategy';

export const AppDataSource = new DataSource({
  type: 'expo',
  database: 'sakelogdb',
  logging: ['error'],
  synchronize: false,
  entities: [Drink, DrinkingLog, DrinkSize],
  namingStrategy: new CustomNamingStrategy(),
  driver: SQLite,
});

export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    // Run migrations manually
    await AppDataSource.runMigrations();
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
};
