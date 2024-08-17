import { selector } from 'recoil';
import { drinksState } from '../states';
import { Drink } from '@/entities';

export const nextDrinkIdSelector = selector<number>({
  key: 'nextDrinkIdSelector',
  get: ({ get }) => {
    const drinks = get(drinksState);
    return drinks.length > 0 ? Math.max(...drinks.map((drink: Drink) => drink.id)) + 1 : 1;
  },
});
