let isTimerSet = false;
export const initializeDrinkingIdReset = (setDrinkingId: (value: number) => void) => {
  if (isTimerSet) return; // 既にタイマーが設定されている場合は何もしない
  isTimerSet = true;

  const resetDrinkingIdAt6AM = () => {
    const now = new Date();
    let millisTill6AM =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0).getTime() -
      now.getTime();
    if (millisTill6AM < 0) {
      millisTill6AM += 86400000; // 翌日の午前6時までのミリ秒数
    }

    setTimeout(() => {
      setDrinkingId(0);
      setInterval(() => {
        setDrinkingId(0);
      }, 86400000); // 24時間ごとにリセット
    }, millisTill6AM);
  };

  resetDrinkingIdAt6AM();
};
