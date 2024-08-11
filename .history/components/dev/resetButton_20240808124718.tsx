import { useResetDb } from '@/features/dev/reset';
import { FAB, Icon } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export function ResetButton() {
  const resetDb = useResetDb();

  return (
    <FAB
      // renderInPortal={false}
      icon="reflesh"
      style={styles.fab}
      onPress={resetDb}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    top: 70,
  },
});
