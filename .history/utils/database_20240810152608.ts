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
  const itemRepository = AppDataSource.getRepository(Item);
  const count = await itemRepository.count();

  if (count === 0) {
    const initialItems = [
      { name: 'Cupcake', calories: 356, fat: 16 },
      { name: 'Eclair', calories: 262, fat: 16 },
      { name: 'Frozen yogurt', calories: 159, fat: 6 },
      { name: 'Gingerbread', calories: 305, fat: 3.7 },
    ];

    await itemRepository.save(initialItems);
    console.log('Initial data added successfully');
  }
};
