import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { orderedDrinksState } from '@/stores/states';
import { getDrinks } from '@/features';

export const useInitializeDrinks = () => {
  const [, setDrinks] = useRecoilState(orderedDrinksState);

  useEffect(() => {
    const initializeDrinks = async () => {
      const drinksFromSQLite = await getDrinks();
      if (drinksFromSQLite) {
        // nullチェックを追加
        setDrinks(drinksFromSQLite);
      } else {
        console.error('Failed to fetch drinks: received null or undefined');
      }
    };

    initializeDrinks();
  }, [setDrinks]);
};
