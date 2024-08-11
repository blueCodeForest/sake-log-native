import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
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

  // const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  // const theme =
  //   colorScheme === 'dark'
  //     ? { ...paperTheme, ...DarkTheme, colors: Colors.dark }
  //     : { ...paperTheme,...LightTheme, colors: Colors.light };

  // const theme = { ...paperTheme, ...LightTheme, colors: Colors.light };
  const theme = { ...LightTheme, colors: Colors.light };

  // return { theme, colorScheme };
  return theme;
}
