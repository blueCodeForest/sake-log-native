import { Drink } from '@/entities';
import { drinksState } from '@/stores/states';
import { useSetRecoilState } from 'recoil';

export function onAddDrink() {
  const setDrinks = useSetRecoilState(drinksState);

  const addDrink = (drink: Drink) => {
    setDrinks((prev: Drink[]) => [...prev, drink]);
  };

  return addDrink;
}
