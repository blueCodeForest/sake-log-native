import { Drink } from '@/domains/drink';
import { useDrinksData } from './useDrinksData';
import { orderedDrinksState } from '@/stores/states';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

export function useOrderedDrinks() {
  const [orderedDrinks, setOrderedDrinks] = useRecoilState(orderedDrinksState);
  const drinks = useDrinksData();

  useEffect(() => {
    if (orderedDrinks.length === 0) {
      setOrderedDrinks(drinks);
    } else if (orderedDrinks.length !== drinks.length) {
      // 削除されたドリンクを除外
      const validDrinks = orderedDrinks.filter((orderedDrink) =>
        drinks.some((drink) => drink.id === orderedDrink.id)
      );
      // 新しく追加されたドリンクを追加
      const newDrink = drinks.filter((drink) => !orderedDrinks.map((d) => d.id).includes(drink.id));

      setOrderedDrinks([...validDrinks, ...newDrink]);
    } else {
      setOrderedDrinks(
        orderedDrinks
          .map((orderedDrink) => drinks.find((drink) => drink.id === orderedDrink.id))
          .filter((v): v is Drink => v !== undefined)
      );
    }
  }, [drinks]);

  return orderedDrinks;
}
