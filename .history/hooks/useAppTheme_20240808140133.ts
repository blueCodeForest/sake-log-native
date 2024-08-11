import { useColorScheme } from 'react-native';
import { adaptNavigationTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Colors from '@/constants/Colors';

export function useAppTheme() {
  const colorScheme = useColorScheme();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  // const theme =
  //   colorScheme === 'dark'
  //     ? { ...DarkTheme, colors: Colors.dark }
  //     : { ...LightTheme, colors: Colors.light };

  const theme = { ...LightTheme, colors: Colors.light };

  return theme;
}
