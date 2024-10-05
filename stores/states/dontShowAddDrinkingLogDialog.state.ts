import { atom } from 'recoil';
import { saveToStorage, loadFromStorage } from '@/utils';

export const dontShowAddDrinkingLogDialogState = atom<boolean>({
  key: 'dontShowAddDrinkingLogDialog',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      // 初期値をAsyncStorageから読み込む
      loadFromStorage('dontShowAddDrinkingLogDialog').then((savedValue) => {
        if (savedValue !== null) {
          setSelf(savedValue);
        }
      });

      // 値が変更されたらAsyncStorageに保存
      onSet((newValue, _, isReset) => {
        if (isReset) {
          saveToStorage('dontShowAddDrinkingLogDialog', false);
        } else {
          saveToStorage('dontShowAddDrinkingLogDialog', newValue);
        }
      });
    },
  ],
});
