import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { onAddDrink } from '@/features/onAddDrink';
import { Dispatch, SetStateAction } from 'react';
import { nextDrinkIdSelector } from '@/stores/drinksState';
import { useRecoilValue } from 'recoil';
import { SharedValue } from 'react-native-reanimated';

type AddDrinkButtonProps = {
  toggleSheet: () => void;
  onSelect: Dispatch<SetStateAction<number | null>>;
};

export function AddDrinkButton(props: AddDrinkButtonProps) {
  // const addDrink = onAddDrink();
  const nextId = useRecoilValue(nextDrinkIdSelector);
  const onPress = () => {
    props.toggleSheet();
    props.onSelect(nextId);
  };

  return <FAB icon="plus" style={styles.fab} onPress={onPress} />;
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
