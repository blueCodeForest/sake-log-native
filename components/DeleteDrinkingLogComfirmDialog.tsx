import { Button, Portal, Text } from 'react-native-paper';
import { DrinkingLog } from '@/domains/drinkingLog';
import { useDeleteDrinkingLog } from '@/hooks';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from './styled';

type DeleteDrinkingLogComfirmDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  log: DrinkingLog;
};

export function DeleteDrinkingLogComfirmDialog(props: DeleteDrinkingLogComfirmDialogProps) {
  const { onDeleteDrinkingLog } = useDeleteDrinkingLog();
  return (
    <Portal>
      <StyledDialog visible={props.visible} onDismiss={props.onDismiss}>
        <StyledDialogTitle>確認</StyledDialogTitle>
        <StyledDialogContent>
          <Text>
            {props.log.drink.name}({props.log.drink.size.name}){' '}
            {new Date(props.log.createdAt).toLocaleString()}のログを削除してもよろしいですか？
          </Text>
        </StyledDialogContent>
        <StyledDialogActions>
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
        </StyledDialogActions>
      </StyledDialog>
    </Portal>
  );
}
