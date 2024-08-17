import { useRecoilCallback } from 'recoil';
import { drinksState } from '@/stores/states';
import { addDrink } from '@/utils/repositories';
import { Drink } from '@/entities';

export const useAddDrink = () => {
  return useRecoilCallback(({ set }) => async (drink: Drink) => {
    try {
      await addDrink(drink);
      set(drinksState, (oldDrinks: Drink[]) => {
        if (drink) {
          return [...oldDrinks, drink];
        }
        return oldDrinks;
      });
    } catch (err) {
      console.error('Error adding new drink:', err);
    }
  });
};
