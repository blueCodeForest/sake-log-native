import { atom } from 'recoil';
import { saveToStorage, loadFromStorage } from '@/utils';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drink } from '@/domains/drink';

// const { persistAtom } = recoilPersist({
//   key: 'orderedDrinks',
//   storage: AsyncStorage,
// });

// export const orderedDrinksState = atom({
//   key: 'orderedDrinks',
//   default: [],
//   effects_UNSTABLE: [persistAtom],
// });

export const orderedDrinksState = atom<Drink[]>({
  key: 'orderedDrinks',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      // 初期値をAsyncStorageから読み込む
      loadFromStorage('orderedDrinks').then((savedValue) => {
        if (savedValue !== null) {
          setSelf(savedValue);
        }
      });

      // 値が変更されたらAsyncStorageに保存
      onSet((newValue, _, isReset) => {
        if (isReset) {
          saveToStorage('orderedDrinks', []);
        } else {
          saveToStorage('orderedDrinks', newValue);
        }
      });
    },
  ],
});
