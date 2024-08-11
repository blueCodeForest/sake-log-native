import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { persistAtom } = recoilPersist({
  key: 'drinks',
  storage: AsyncStorage,
});

export const drinksState = atom({
  key: 'drinks',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
