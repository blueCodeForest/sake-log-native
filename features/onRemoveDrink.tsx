import { Drink } from '@/entities';
import { drinksState } from '@/stores/states';
import { useRecoilState } from 'recoil';

export function onRemoveDrink(drinkId: number): () => void {
  const [drinks, setDrinks] = useRecoilState(drinksState);

  const removeDrink = () => {
    console.log('removeDrink', drinkId);
    setDrinks(drinks.filter((drink: Drink) => drink.id !== drinkId));
  };

  return removeDrink;
}
