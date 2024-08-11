import { Drink } from '@/domains/types';
import { drinksState } from '@/stores';
import { useRecoilState, useSetRecoilState } from 'recoil';

export function useResetDb() {
  // const setDrinks = useSetRecoilState(drinksState);
  const [drinks, setDrinks] = useRecoilState(drinksState);

  const resetDb = () => {
    console.debug({ drinks });
    console.log('resetDb');
    setDrinks(drinkList);
  };

  return resetDb;
}

const drinkList: Drink[] = [
  {
    id: 1,
    name: 'ビール',
    size: '中',
    amount: 350,
    alcoholDegree: 5,
    memo: '',
  },
  {
    id: 2,
    name: 'ハイボール',
    size: '中',
    amount: 350,
    alcoholDegree: 7,
    memo: '',
  },
  {
    id: 3,
    name: '日本酒',
    size: 'おちょこ',
    amount: 30,
    alcoholDegree: 14,
    memo: '',
  },
  {
    id: 4,
    name: 'レモンサワー',
    size: '中',
    amount: 350,
    alcoholDegree: 5,
    memo: '',
  },
];
