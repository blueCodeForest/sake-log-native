import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'limitAlcoholIntake',
  storage: AsyncStorage,
});

// アルコール摂取量の制限を管理する状態
export const limitAlcoholIntakeState = atom<number>({
  key: 'limitAlcoholIntake',
  default: 50,
  effects_UNSTABLE: [persistAtom],
});
