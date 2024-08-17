import { Button, Dialog, Text } from 'react-native-paper';
import { Drink } from '@/entities';
import { onRemoveDrink } from '@/features';
import { useRef } from 'react';
import { useDeleteDrink } from '@/stores/callbacks/deleteDrink.callback';

type ComfirmDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  drink: Drink;
};
export function ConfirmDialog(props: ComfirmDialogProps) {
  // const removeDrink = onRemoveDrink(props.drink.id);
  const deleteDrink = useDeleteDrink();

  const cancelRef = useRef(null);
  return (
    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
      <Dialog.Title>確認</Dialog.Title>
      <Dialog.Content>
        <Text>
          {props.drink.name}({props.drink.size.name})を削除してもよろしいですか？
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={() => {
            // removeDrink();
            deleteDrink(props.drink.id);
            props.onDismiss();
          }}
        >
          はい
        </Button>
        <Button onPress={props.onDismiss}>いいえ</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
