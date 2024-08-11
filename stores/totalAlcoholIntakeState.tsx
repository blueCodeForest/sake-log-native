import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'totalAlcoholIntake',
  storage: AsyncStorage,
});

export const totalAlcoholIntakeState = atom({
  key: 'totalAlcoholIntake',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
