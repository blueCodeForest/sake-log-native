import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrinkingLog } from '@/domains/drinkingLog';

// const { persistAtom } = recoilPersist({
//   key: 'drinkingLogs',
//   storage: AsyncStorage,
// });

// export const drinkingLogsState = atom<DrinkingLog[]>({
//   key: 'drinkingLogs',
//   default: [],
//   effects_UNSTABLE: [persistAtom],
// });
