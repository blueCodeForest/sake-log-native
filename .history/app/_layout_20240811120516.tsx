import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

import TabLayout from './(tabs)/_layout';
import { RecoilRoot } from 'recoil';
import { adaptNavigationTheme, PaperProvider, useTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppTheme } from '@/hooks/useAppTheme';
import { addInitialData, initDatabase } from '@/utils/database';

// const Stack = createStackNavigator();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // SSRProvider警告メッセージを非表示にする
  useEffect(() => {
    const consoleWarn = console.warn;
    console.warn = function filterWarnings(msg) {
      const suppressedWarnings = ['SSRProvider is not necessary'];
      if (!suppressedWarnings.some((entry) => msg.includes(entry))) {
        consoleWarn(msg);
      }
    };
  }, []);

  // DB初期化
  useEffect(() => {
    const initializeDatabase = async () => {
      await initDatabase();
      await addInitialData();
    };

    initializeDatabase();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const theme = useAppTheme();

  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </PaperProvider>
    </RecoilRoot>
  );
}
