import { Drink } from '@/domains/types';
import { StyleSheet, View, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ConfirmDialog } from './ComfirmDialog';
import { useSetRecoilState } from 'recoil';
import { totalAlcoholIntakeState } from '@/stores';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Icon, TouchableRipple, Text, Card, Portal } from 'react-native-paper';
import { useAppTheme } from '@/hooks';

type DrinkCardProps = {
  drink: Drink;
  toggleSheet: () => void;
  onSelect: Dispatch<SetStateAction<number | null>>;
};

export function DrinkCard(props: DrinkCardProps) {
  const theme = useAppTheme();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [drinkCount, setDrinkCount] = useState(0);
  const setTotalAlcoholIntake = useSetRecoilState(totalAlcoholIntakeState);
  const alcoholAmount = props.drink.amount * props.drink.alcoholDegree * 0.01;
  const swipeableRef = useRef<Swipeable>(null);

  const onDrink = () => {
    setDrinkCount(drinkCount + 1);
    setTotalAlcoholIntake((prevTotal: number) => prevTotal + alcoholAmount);
  };

  const onShowDialog = () => {
    setDialogVisible(true);
  };
  const onHideDialog = () => {
    setDialogVisible(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const onPress = () => {
    props.toggleSheet();
    props.onSelect(props.drink.id);
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
          <TouchableRipple onPress={onPress}>
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
        <ConfirmDialog visible={dialogVisible} onDismiss={onHideDialog} drink={props.drink} />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
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
