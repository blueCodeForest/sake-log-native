let isTimerSet = false;

type ScheduledTask = () => void;

export const scheduleAt6AM = (task: ScheduledTask) => {
  if (isTimerSet) return;
  isTimerSet = true;

  const scheduleTask = () => {
    const now = new Date();
    let millisTill6AM =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0).getTime() -
      now.getTime();
    if (millisTill6AM < 0) {
      millisTill6AM += 86400000; // 翌日の午前6時までのミリ秒数
    }

    setTimeout(() => {
      task(); // 初回実行

      setInterval(() => {
        task(); // 24時間ごとに実行
      }, 86400000);
    }, millisTill6AM);
  };

  scheduleTask();
};
