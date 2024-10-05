import { Drink } from '@/domains/drink';
import { dontShowAddDrinkingLogDialogState, drinkingIdState } from '@/stores/states';
import React, { useEffect } from 'react';
import { Dialog, Portal, Checkbox } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { StyledButton, StyledText, StyledView } from './styled';
import { addDrinkingLog } from '@/features';
import { useAppTheme } from '@/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Dialog visible={props.visible} onDismiss={props.onDissmiss}>
        <Dialog.Title>確認</Dialog.Title>
        <Dialog.Content>
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
        </Dialog.Content>
        <Dialog.Actions>
          <StyledButton onPress={async () => await onConfirm()}>はい</StyledButton>
          <StyledButton onPress={onCancel}>いいえ</StyledButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
