import { drinksState } from '@/stores';
import { useRecoilValue } from 'recoil';

export function useLogDrinks() {
  const drinks = useRecoilValue(drinksState);

  const logDrinks = () => {
    console.log('Current Drinks:', JSON.stringify(drinks, null, 2));
  };

  return logDrinks;
}
