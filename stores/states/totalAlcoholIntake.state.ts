import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { persistAtom } = recoilPersist({
  key: 'totalAlcoholIntake',
  storage: AsyncStorage,
});

export const totalAlcoholIntakeState = atom<number>({
  key: 'totalAlcoholIntake',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
