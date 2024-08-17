import { useRecoilCallback } from 'recoil';
import { drinkingLogsState } from '@/stores/states';
import { addDrinkingLog } from '@/utils/repositories';
import { DrinkingLog } from '@/entities';

export const useAddDrinkingLog = () => {
  return useRecoilCallback(({ set }) => async (log: DrinkingLog) => {
    try {
      const newLog = await addDrinkingLog(log);
      set(drinkingLogsState, (oldLogs: DrinkingLog[]) => {
        if (newLog !== undefined) {
          return [...oldLogs, newLog];
        }
        return oldLogs;
      });
    } catch (err) {
      console.error('Error adding drinking log:', err);
    }
  });
};
