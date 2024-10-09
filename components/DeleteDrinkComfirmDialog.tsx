import { Button, Portal } from 'react-native-paper';
import { Drink } from '@/domains/drink';
import { softDeleteDrink } from '@/features';
import {
  StyledButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledText,
} from './styled';

type DeleteDrinkComfirmDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  drink: Drink;
};
export function DeleteDrinkComfirmDialog(props: DeleteDrinkComfirmDialogProps) {
  return (
    <Portal>
      <StyledDialog visible={props.visible} onDismiss={props.onDismiss}>
        <StyledDialogTitle>確認</StyledDialogTitle>
        <StyledDialogContent>
          <StyledText>
            {props.drink.name}({props.drink.size.name})を削除してもよろしいですか？
          </StyledText>
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton
            onPress={async () => {
              await softDeleteDrink(props.drink.id);
              props.onDismiss();
            }}
          >
            はい
          </StyledButton>
          <Button onPress={props.onDismiss}>いいえ</Button>
        </StyledDialogActions>
      </StyledDialog>
    </Portal>
  );
}
