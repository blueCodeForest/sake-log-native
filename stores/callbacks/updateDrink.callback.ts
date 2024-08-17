import { useRecoilCallback } from 'recoil';
import { drinksState } from '@/stores/states';
import { updateDrink } from '@/utils/repositories';
import { Drink } from '@/entities';

export const useUpdateDrink = () => {
  return useRecoilCallback(({ set }) => async (drink: Drink) => {
    try {
      await updateDrink(drink);
      set(drinksState, (oldDrinks: Drink[]) => {
        return oldDrinks.map((d) => (d.id === drink.id ? drink : d));
      });
    } catch (err) {
      console.error('Error updating drink:', err);
    }
  });
};
