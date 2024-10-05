// 日本時間午前6時でシステムの日時が切り替わる
export function toSystemDayStart(date: Date): string {
  const systemStart = new Date(date);
  systemStart.setHours(6, 0, 0, 0);

  // もし date がすでにJSTの午前6時以降ならそのまま、それより前なら前日の午前6時
  if (date.getTime() < systemStart.getTime()) {
    systemStart.setDate(systemStart.getDate() - 1); // 前日に変更
  }

  return systemStart.toISOString();
}

export function toSystemDayEnd(date: Date): string {
  const systemEnd = new Date(date);
  systemEnd.setHours(6, 0, 0, 0);

  // もし date が午前6時以降なら次の日の午前6時を返す
  if (date.getTime() >= systemEnd.getTime()) {
    systemEnd.setDate(systemEnd.getDate() + 1); // 翌日の午前6時
  }

  return systemEnd.toISOString();
}

// SQLiteのデフォルトの日付フォーマットをISO文字列に変換する
// 例: 2024-08-23 16:28:48 -> 2024-08-23T16:28:48.000Z
// SQLiteのデフォルトフォーマットだとタイムゾーン情報を含んでないので、toLocaleString()でうまくローカルタイムに変換できないため。
export function convertToIsoString(dateString: string): string {
  function isSQLiteDefaultDateFormat(str: string): boolean {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return dateTimeRegex.test(str);
  }

  if (isSQLiteDefaultDateFormat(dateString)) {
    const isoString = dateString.replace(' ', 'T') + '.000Z';
    return isoString;
  } else {
    return dateString;
  }
}
