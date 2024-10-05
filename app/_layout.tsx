import 'reflect-metadata';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as Sentry from '@sentry/react-native';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppTheme } from '@/hooks/useAppTheme';
import { db } from '@/db/drizzle';
import { drinkingIdState } from '@/stores/states';
import { initializeDrinkingIdReset } from '@/features';
import { DatabaseProvider } from '@/db/provider';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { SQLiteDatabase } from 'expo-sqlite';
import { isRunningInExpoGo } from 'expo';

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

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: 'https://80ce1387e9ca7db9735c3b320e8aeec2@o4508027859894272.ingest.us.sentry.io/4508027964293120',
  debug: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
    }),
  ],
});

function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  useDrizzleStudio(db as unknown as SQLiteDatabase);

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

  const ref = useNavigationContainerRef();
  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

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

  return (
    <DatabaseProvider>
      <RecoilRoot>
        <RootLayoutNav />
      </RecoilRoot>
    </DatabaseProvider>
  );
}

function RootLayoutNav() {
  const theme = useAppTheme();

  const setDrinkingId = useSetRecoilState(drinkingIdState);

  useEffect(() => {
    initializeDrinkingIdReset(setDrinkingId);
  }, [setDrinkingId]);

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <Stack screenOptions={{ headerStyle: { backgroundColor: theme.colors.background } }}> */}
        <Stack screenOptions={{ headerStyle: { backgroundColor: '#0097a7' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

export default Sentry.wrap(RootLayout);
