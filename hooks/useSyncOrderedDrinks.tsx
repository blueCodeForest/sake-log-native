import { orderedDrinksState } from '@/stores/states';
import { useRecoilState } from 'recoil';
import { useDrinksData } from './useDrinksData';
import { useEffect } from 'react';
import { Drink } from '@/domains/drink';

export const useSyncOrderedDrinks = () => {
  const [orderedDrinks, setOrderedDrinks] = useRecoilState(orderedDrinksState);
  const latestDrinks = useDrinksData();

  useEffect(() => {
    setOrderedDrinks((prevDrinks: Drink[]) => {
      const addedDrinks: Drink[] = latestDrinks.filter(
        (drink) => !prevDrinks.some((prevDrink) => prevDrink.id === drink.id)
      );
      // orderedDrinksの順番通りにlatestDrinksを並び替える
      return prevDrinks
        .map((drink) => latestDrinks.find((latestDrink) => latestDrink?.id === drink.id) || null)
        .filter((v): v is Drink => v !== null)
        .concat(addedDrinks);
    });
  }, [latestDrinks, setOrderedDrinks]);
};
