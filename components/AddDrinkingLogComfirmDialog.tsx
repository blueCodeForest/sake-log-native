import { Drink } from '@/domains/drink';
import { dontShowAddDrinkingLogDialogState, drinkingIdState } from '@/stores/states';
import React from 'react';
import { Portal, Checkbox } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  StyledButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledText,
  StyledView,
} from './styled';
import { addDrinkingLog } from '@/features';

interface AddDrinkingLogConfirmDialogProps {
  drink: Drink;
  visible: boolean;
  onDissmiss: () => void;
}

export function AddDrinkingLogConfirmDialog(props: AddDrinkingLogConfirmDialogProps) {
  const [dontShowAgain, setDontShowAgain] = useRecoilState(dontShowAddDrinkingLogDialogState);
  const setDrinkingId = useSetRecoilState(drinkingIdState);

  const onConfirm = async () => {
    setDrinkingId(props.drink.id);
    await addDrinkingLog(props.drink.id);
    props.onDissmiss();
  };

  const onCancel = () => {
    setDontShowAgain(false);
    props.onDissmiss();
  };

  return (
    <Portal>
      <StyledDialog visible={props.visible} onDismiss={props.onDissmiss}>
        <StyledDialogTitle>確認</StyledDialogTitle>
        <StyledDialogContent>
          <StyledText>
            {props.drink.name}({props.drink.size.name})を飲みますか？
          </StyledText>
          <StyledView className="mb-[-20px]">
            <Checkbox.Item
              label="次回以降表示しない"
              mode="android"
              status={dontShowAgain ? 'checked' : 'unchecked'}
              onPress={() => setDontShowAgain(!dontShowAgain)}
            />
          </StyledView>
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton onPress={async () => await onConfirm()}>はい</StyledButton>
          <StyledButton onPress={onCancel}>いいえ</StyledButton>
        </StyledDialogActions>
      </StyledDialog>
    </Portal>
  );
}
