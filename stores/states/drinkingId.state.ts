import { atom } from 'recoil';
import { saveToStorage, loadFromStorage } from '@/utils';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const { persistAtom } = recoilPersist({
//   key: 'drinkingId',
//   storage: AsyncStorage,
// });

// export const drinkingIdState = atom<number>({
//   key: 'drinkingId',
//   default: 0,
//   effects_UNSTABLE: [persistAtom],
// });

export const drinkingIdState = atom<number>({
  key: 'drinkingId',
  default: 0,
  effects: [
    ({ setSelf, onSet }) => {
      // 初期値をAsyncStorageから読み込む
      loadFromStorage('drinkingId').then((savedValue) => {
        if (savedValue !== null) {
          setSelf(savedValue);
        }
      });

      // 値が変更されたらAsyncStorageに保存
      onSet((newValue, _, isReset) => {
        if (isReset) {
          saveToStorage('drinkingId', 0);
        } else {
          saveToStorage('drinkingId', newValue);
        }
      });
    },
  ],
});
