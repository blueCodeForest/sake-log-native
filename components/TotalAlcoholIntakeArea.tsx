import { useDrinkingLogsData } from '@/hooks';
import { drinkingIdState } from '@/stores/states';
import { scheduleAt6AM, toSystemDayEnd, toSystemDayStart } from '@/utils';
import { useRecoilValue } from 'recoil';
import { StyledCard, StyledCardContent, StyledText, StyledView } from './styled';
import { useEffect, useState } from 'react';
import { DrinkingLog } from '@/domains/drinkingLog';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export function TotalAlcoholIntakeArea() {
  const [refreshKey, setRefreshKey] = useState(0);
  const drinkingLogs = useDrinkingLogsData({
    start: toSystemDayStart(new Date()),
    end: toSystemDayEnd(new Date()),
    refreshKey,
  });
  const drinkingId = useRecoilValue(drinkingIdState);

  const [nowDrinkingLog, setNowDrinkingLog] = useState<DrinkingLog | null>(null);
  const [timeAgo, setTimeAgo] = useState<string>('');

  const refreshDrinkingLogs = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    scheduleAt6AM(() => {
      refreshDrinkingLogs();
    });
  }, []);

  useEffect(() => {
    setNowDrinkingLog(
      drinkingLogs.length > 0 && drinkingLogs[0].drink.id === drinkingId ? drinkingLogs[0] : null
    );
  }, [drinkingLogs, drinkingId]);

  useEffect(() => {
    if (nowDrinkingLog) {
      setTimeAgo(
        formatDistanceToNow(new Date(nowDrinkingLog.createdAt), { addSuffix: true, locale: ja })
      );
    }
  }, [nowDrinkingLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nowDrinkingLog) {
        setTimeAgo(
          formatDistanceToNow(new Date(nowDrinkingLog.createdAt), { addSuffix: true, locale: ja })
        );
      }
    }, 60000); // 1分ごとに更新

    return () => clearInterval(interval);
  }, [nowDrinkingLog]);

  return (
    <StyledView className="m-1">
      <StyledCard>
        <StyledView className="p-2">
          <StyledView className="p-2">
            <StyledCardContent className="items-center">
              <StyledText variant="titleSmall">アルコール摂取量</StyledText>
            </StyledCardContent>
          </StyledView>
          <StyledView className="p-10">
            <StyledCardContent className="items-center">
              <StyledText variant="headlineLarge">
                {drinkingLogs.reduce(
                  (acc, log) =>
                    acc + Math.round(log.drink.size.amount * log.drink.alcoholDegree * 0.01),
                  0
                )}
                g
              </StyledText>
            </StyledCardContent>
          </StyledView>
          <StyledView className="flex-row justify-between p-2">
            <StyledCardContent className="p-0 max-w-[70%]">
              <StyledText>
                {nowDrinkingLog &&
                  `${
                    nowDrinkingLog.drink.name.length > 6
                      ? nowDrinkingLog.drink.name.slice(0, 6) + '...'
                      : nowDrinkingLog.drink.name
                  }(${nowDrinkingLog.drink.size.name}) : ${timeAgo === '約1分前' ? '今' : timeAgo}`}
              </StyledText>
            </StyledCardContent>
            <StyledCardContent className="p-0">
              <StyledText>{drinkingLogs.length}杯目</StyledText>
            </StyledCardContent>
          </StyledView>
        </StyledView>
      </StyledCard>
    </StyledView>
  );
}
