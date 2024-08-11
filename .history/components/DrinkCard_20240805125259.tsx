import { Drink } from '@/domains/types';
import { Box, Button, Icon, Text, Pressable, Flex } from 'native-base';
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

type DrinkCardProps = {
  drink: Drink;
  toggleSheet: () => void;
};

export function DrinkCard(props: DrinkCardProps) {
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
        <Icon color="danger.500" as={AntDesign} name="delete" size="sm" />
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
        >
          <Pressable
            // onPress={() => props.onAddAlcohol(alcoholAmount)}
            // onPress={() => refRBSheet.current?.open()}
            onPress={props.toggleSheet}
          >
            <Flex direction="row" justify="space-between" align="center" minH={20} bg="gray.100">
              <Flex direction="row" align="center">
                <Text>{props.drink.name}</Text>
                <Text>({props.drink.size})</Text>
                <Text>{alcoholAmount}g</Text>
              </Flex>
              <Flex direction="row" align="center">
                <Text>{drinkCount}杯</Text>
                <Pressable m="5" onPress={onDrink}>
                  <Icon as={Entypo} name="drink" size="sm" />
                </Pressable>
              </Flex>
            </Flex>
          </Pressable>
        </Swipeable>
      </View>
      {/* <DrinkBottomSheet drink={props.drink} isOpen={isOpen} toggleSheet={toggleSheet} /> */}
      <ConfirmDialog visible={dialogVisible} onDismiss={onHideDialog} drink={props.drink} />
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
});
