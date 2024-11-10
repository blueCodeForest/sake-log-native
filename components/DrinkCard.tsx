import { Drink } from '@/domains/drink';
import { StyleSheet, View, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { DeleteDrinkComfirmDialog } from './DeleteDrinkComfirmDialog';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useAppTheme, useDrinkingLogsData, useFontScale } from '@/hooks';
import { addDrinkingLog } from '@/features';
import { toSystemDayEnd, toSystemDayStart } from '@/utils';
import { dontShowAddDrinkingLogDialogState, drinkingIdState } from '@/stores/states';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  StyledCard,
  StyledCardContent,
  StyledIcon,
  StyledText,
  StyledTouchableRipple,
  StyledView,
} from './styled';
import { AddDrinkingLogConfirmDialog } from './AddDrinkingLogComfirmDialog';
import CustomIcon from '@/assets/icons';

type DrinkCardProps = {
  drink: Drink;
  toggleSheet: () => void;
  onSelect: Dispatch<SetStateAction<Drink | null | undefined>>;
  onLongPress?: () => void;
  isActive?: boolean;
};

export function DrinkCard(props: DrinkCardProps) {
  const theme = useAppTheme();
  const [deleteDrinkDialogVisible, setDeleteDrinkDialogVisible] = useState(false);
  const [addDrinkingLogDialogVisible, setAddDrinkingLogDialogVisible] = useState(false);
  const dontShowAddDrinkingLogDialog = useRecoilValue(dontShowAddDrinkingLogDialogState);
  const [drinkingId, setDrinkingId] = useRecoilState(drinkingIdState);
  const count = useDrinkingLogsData({
    start: toSystemDayStart(new Date()),
    end: toSystemDayEnd(new Date()),
    drinkId: props.drink.id,
  }).length;
  const alcoholAmount = Math.round(props.drink.size.amount! * props.drink.alcoholDegree! * 0.01);
  const swipeableRef = useRef<Swipeable>(null);

  const fontScale = useFontScale();

  const onShowDeleteDrinkDialog = () => {
    setDeleteDrinkDialogVisible(true);
  };
  const onDissmissDeleteDrinkDialog = () => {
    setDeleteDrinkDialogVisible(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const onShowAddDrinkingLogDialog = () => {
    setAddDrinkingLogDialogVisible(true);
  };
  const onDissmissAddDrinkingLogDialog = () => {
    setAddDrinkingLogDialogVisible(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const onAddDrinkingLog = async () => {
    setDrinkingId(props.drink.id);
    await addDrinkingLog(props.drink.id);
  };

  const onPress = () => {
    props.toggleSheet();
    props.onSelect(props.drink);
  };

  // スワイプアクションをレンダーする関数
  const renderRightActions = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
    return (
      <StyledView className="w-20 justify-center items-center">
        <StyledIcon source="delete" size={20 * fontScale} color={theme.colors.error} />
      </StyledView>
    );
  };

  return (
    <>
      <StyledView>
        <Swipeable
          ref={swipeableRef}
          friction={2}
          rightThreshold={50}
          renderRightActions={renderRightActions}
          onSwipeableOpen={onShowDeleteDrinkDialog}
        >
          <StyledCard
            className="m-1"
            onPress={onPress}
            key={drinkingId === props.drink.id ? 'active' : 'inactive'}
            elevation={drinkingId === props.drink.id ? 3 : 1}
            onLongPress={props.onLongPress}
          >
            <StyledView className="flex-row p-2 justify-between">
              <StyledView className="flex-row max-w-[60%] items-center">
                <StyledCardContent className="shrink items-center p-1">
                  <StyledText>{props.drink.name}</StyledText>
                </StyledCardContent>
                <StyledCardContent className="p-0 mr-1">
                  <StyledText>({props.drink.size.name})</StyledText>
                </StyledCardContent>
                <StyledCardContent className="items-center p-1">
                  <StyledText>{alcoholAmount}g</StyledText>
                </StyledCardContent>
              </StyledView>
              <StyledTouchableRipple
                className="p-1"
                onPress={async () => {
                  if (dontShowAddDrinkingLogDialog) {
                    await onAddDrinkingLog();
                  } else {
                    onShowAddDrinkingLogDialog();
                  }
                }}
              >
                <StyledView className="flex-row items-center">
                  <StyledCardContent className="p-0 m-2">
                    <StyledText>{count}杯</StyledText>
                  </StyledCardContent>
                  <StyledCardContent className="p-0 mb-1">
                    {/* <StyledIcon source="glass-cocktail" size={20 * fontScale} /> */}
                    <CustomIcon name="add" size={26 * fontScale} color={theme.colors.primary} />
                  </StyledCardContent>
                </StyledView>
              </StyledTouchableRipple>
            </StyledView>
          </StyledCard>
        </Swipeable>
      </StyledView>
      <DeleteDrinkComfirmDialog
        visible={deleteDrinkDialogVisible}
        onDismiss={onDissmissDeleteDrinkDialog}
        drink={props.drink}
      />
      <AddDrinkingLogConfirmDialog
        visible={addDrinkingLogDialogVisible}
        onDissmiss={onDissmissAddDrinkingLogDialog}
        drink={props.drink}
      />
    </>
  );
}
