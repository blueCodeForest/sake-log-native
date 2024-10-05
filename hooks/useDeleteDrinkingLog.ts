import { useRecoilState } from 'recoil';
import { drinkingIdState } from '@/stores/states';
import { DrinkingLog } from '@/domains/drinkingLog';
import { deleteDrinkingLog } from '@/features/deleteDrinkingLog';
import { useDrinkingLogsData } from '@/hooks/useDrinkingLogsData';
import { toSystemDayEnd, toSystemDayStart } from '@/utils/systemDateUtils';

export const useDeleteDrinkingLog = () => {
  const [drinkingId, setDrinkingId] = useRecoilState(drinkingIdState);
  const drinkingLogs = useDrinkingLogsData({
    start: toSystemDayStart(new Date()),
    end: toSystemDayEnd(new Date()),
  });

  const onDeleteDrinkingLog = async (log: DrinkingLog) => {
    try {
      // 最新のログかどうかを確認
      const isLatestLog = drinkingLogs.length > 0 && drinkingLogs[0].id === log.id;

      if (isLatestLog && drinkingId === log.drink.id) {
        setDrinkingId(0); // 最新のログが削除され、かつdrinkingIdが一致する場合、drinkingIdをリセット
      }

      await deleteDrinkingLog(log);
    } catch (error) {
      console.error('Error in onDeleteDrinkingLog:', error);
    }
  };

  return { onDeleteDrinkingLog };
};
