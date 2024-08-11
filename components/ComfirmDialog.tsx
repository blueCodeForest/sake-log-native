import { Button, Dialog, Text } from 'react-native-paper';
import { Drink } from '@/domains/types';
import { onRemoveDrink } from '@/features';
import React from 'react';

type ComfirmDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  drink: Drink;
};
export function ConfirmDialog(props: ComfirmDialogProps) {
  const removeDrink = onRemoveDrink(props.drink.id);

  const cancelRef = React.useRef(null);
  return (
    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
      <Dialog.Title>確認</Dialog.Title>
      <Dialog.Content>
        <Text>
          {props.drink.name}({props.drink.size})を削除してもよろしいですか？
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={() => {
            removeDrink();
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
