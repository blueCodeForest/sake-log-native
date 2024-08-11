import { screenDimentions } from '@/constants/dimentions';
import { useAppTheme } from '@/hooks';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { DrinkLogTable } from './DrinkLogTable';

export default function TabTwoScreen() {
  const theme = useAppTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <DrinkLogTable />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    width: screenDimentions.width * 0.9,
    marginTop: 20,
    maxWidth: 600,
  },
  list: {},
});
