import { onAddDrink } from '@/features/onAddDrink';
import { AntDesign } from '@expo/vector-icons';
import { Fab, Icon } from 'native-base';

export function AddDrinkButton() {
  return (
    <Fab icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} onPress={onAddDrink} />
  );
}
