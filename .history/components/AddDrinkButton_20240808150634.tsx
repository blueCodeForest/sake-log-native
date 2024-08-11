import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { onAddDrink } from '@/features/onAddDrink';

export function AddDrinkButton() {
  const addDrink = onAddDrink();

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() =>
        addDrink({
          id: Date.now(),
          name: '新しいドリンク',
          size: '中',
          amount: 350,
          alcoholDegree: 5,
          memo: '',
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
