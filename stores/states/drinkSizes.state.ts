import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'drinks',
  storage: AsyncStorage,
});

export const drinkSizesState = atom({
  key: 'drinkSizesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
