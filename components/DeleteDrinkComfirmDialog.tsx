import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { Drink } from '@/domains/drink';
import { softDeleteDrink } from '@/features';
import { StyledButton, StyledText } from './styled';

type DeleteDrinkComfirmDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  drink: Drink;
};
export function DeleteDrinkComfirmDialog(props: DeleteDrinkComfirmDialogProps) {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title>確認</Dialog.Title>
        <Dialog.Content>
          <StyledText>
            {props.drink.name}({props.drink.size.name})を削除してもよろしいですか？
          </StyledText>
        </Dialog.Content>
        <Dialog.Actions>
          <StyledButton
            onPress={async () => {
              await softDeleteDrink(props.drink.id);
              props.onDismiss();
            }}
          >
            はい
          </StyledButton>
          <Button onPress={props.onDismiss}>いいえ</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
