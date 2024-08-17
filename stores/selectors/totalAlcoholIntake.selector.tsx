import { selector } from 'recoil';
import { drinkingLogsState } from '../states';

export const totalAlcoholIntakeSelector = selector({
  key: 'totalAlcoholIntakeSelector',
  get: ({ get }) => {
    const drinkingLogs = get(drinkingLogsState);
    const totalAlcoholIntake = drinkingLogs.reduce((total, log) => {
      return total + (log.drink.alcoholDegree * log.drink.size.amount) / 100;
    }, 0);
    return totalAlcoholIntake;
  },
});
