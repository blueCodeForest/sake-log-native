import { Drink } from '@/domains/types';
import { drinksState } from '@/stores';
import { useSetRecoilState } from 'recoil';

export function onAddDrink() {
  const setDrinks = useSetRecoilState(drinksState);

  const addDrink = (drink: Drink) => {
    setDrinks((prev: Drink[]) => [...prev, drink]);
  };

  return addDrink;
}
