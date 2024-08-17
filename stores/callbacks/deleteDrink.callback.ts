import { useRecoilCallback } from 'recoil';
import { drinksState } from '@/stores/states';
import { deleteDrink } from '@/utils/repositories';
import { Drink } from '@/entities';

export const useDeleteDrink = () => {
  return useRecoilCallback(({ set }) => async (drinkId: number) => {
    try {
      await deleteDrink(drinkId);
      set(drinksState, (oldDrinks: Drink[]) => {
        return oldDrinks.filter((d) => d.id !== drinkId);
      });
    } catch (err) {
      console.error('Error deleting drink:', err);
    }
  });
};
