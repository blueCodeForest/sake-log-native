import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { DrinkingLog } from '@/domains/drinkingLog';
import { useDeleteDrinkingLog } from '@/hooks';

type DeleteDrinkingLogComfirmDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  log: DrinkingLog;
};

export function DeleteDrinkingLogComfirmDialog(props: DeleteDrinkingLogComfirmDialogProps) {
  const { onDeleteDrinkingLog } = useDeleteDrinkingLog();
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title>確認</Dialog.Title>
        <Dialog.Content>
          <Text>
            {props.log.drink.name}({props.log.drink.size.name}){' '}
            {new Date(props.log.createdAt).toLocaleString()}のログを削除してもよろしいですか？
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              console.log('onPress1');
              await onDeleteDrinkingLog(props.log);
              console.log('onPress2');
              props.onDismiss();
            }}
          >
            はい
          </Button>
          <Button onPress={props.onDismiss}>いいえ</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
