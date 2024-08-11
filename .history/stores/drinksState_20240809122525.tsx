import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drink } from '@/domains/types';

const { persistAtom } = recoilPersist({
  key: 'drinks',
  storage: AsyncStorage,
});

export const drinksState = atom({
  key: 'drinks',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const nextDrinkIdSelector = selector<number>({
  key: 'nextDrinkIdSelector',
  get: ({ get }) => {
    const drinks = get(drinksState);
    return drinks.length > 0 ? Math.max(...drinks.map((drink: Drink) => drink.id)) + 1 : 1;
  },
});
