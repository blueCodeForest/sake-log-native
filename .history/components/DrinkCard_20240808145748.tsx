import { Drink } from '@/domains/types';
import { StyleSheet, View, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import { DrinkBottomSheet } from './DrinkBottomSheet';
import { ConfirmDialog } from './ComfirmDialog';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useSetRecoilState } from 'recoil';
import { totalAlcoholIntakeState } from '@/stores';
import { useRef, useState } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { Icon, TouchableRipple, Text, Card, Portal } from 'react-native-paper';
import { useAppTheme } from '@/hooks';

type DrinkCardProps = {
  drink: Drink;
  toggleSheet: () => void;
};

export function DrinkCard(props: DrinkCardProps) {
  const theme = useAppTheme();
  const isOpen = useSharedValue(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [drinkCount, setDrinkCount] = useState(0);
  const setTotalAlcoholIntake = useSetRecoilState(totalAlcoholIntakeState);
  const alcoholAmount = props.drink.amount * props.drink.alcoholDegree * 0.01;
  const swipeableRef = useRef<Swipeable>(null);
  const refRBSheet = useRef<typeof RBSheet>(null);

  const onDrink = () => {
    setDrinkCount(drinkCount + 1);
    setTotalAlcoholIntake((prevTotal: number) => prevTotal + alcoholAmount);
  };

  // const onShowBottomSheet = () => {
  //   isOpen.value = true;
  // };

  // const toggleSheet = () => {
  //   isOpen.value = !isOpen.value;
  // };

  // const onHideModal = () => {
  //   setBottomSheetVisible(false);
  // };

  const onShowDialog = () => {
    setDialogVisible(true);
  };
  const onHideDialog = () => {
    setDialogVisible(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  // スワイプアクションをレンダーする関数
  const renderRightActions = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
    return (
      <View
        style={{
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon source="delete" size={20} color={theme.colors.error} />
      </View>
    );
  };

  return (
    <>
      <View>
        <Swipeable
          ref={swipeableRef}
          friction={2}
          rightThreshold={50}
          renderRightActions={renderRightActions}
          onSwipeableOpen={onShowDialog}
          containerStyle={styles.swipeableContainer}
        >
          <TouchableRipple
            // onPress={() => props.onAddAlcohol(alcoholAmount)}
            // onPress={() => refRBSheet.current?.open()}
            onPress={props.toggleSheet}
          >
            <Card style={styles.card}>
              <View>
                <Text>{props.drink.name}</Text>
                <Text>({props.drink.size})</Text>
                <Text>{alcoholAmount}g</Text>
              </View>
              <View>
                <Text>{drinkCount}杯</Text>
                <TouchableRipple onPress={onDrink}>
                  <Icon source="glass-cocktail" size={20} />
                </TouchableRipple>
              </View>
            </Card>
          </TouchableRipple>
        </Swipeable>
      </View>
      <Portal>
        {/* <DrinkBottomSheet drink={props.drink} isOpen={isOpen} toggleSheet={toggleSheet} /> */}
        <ConfirmDialog visible={dialogVisible} onDismiss={onHideDialog} drink={props.drink} />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  swipeableContainer: {
    borderRadius: 8, // CardのborderRadiusと同じ値を設定
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 20,
  },
  plusIcon: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
});
