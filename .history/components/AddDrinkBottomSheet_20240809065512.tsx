import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
// import RBSheet from 'react-native-raw-bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';

import { Drink } from '@/domains/types';
import { useRecoilState } from 'recoil';
import { drinksState } from '@/stores';
import { screenDimentions } from '@/constants/dimentions';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useAppTheme } from '@/hooks';

type AddDrinkBottomSheetProps = {
  // visible: boolean;
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  onAddDrink: () => (drink: Drink) => void;
  // onHideModal: () => void;
  // ref: React.RefObject<typeof RBSheet>;
};

export function DrinkBottomSheet({
  isOpen,
  duration = 500,
  toggleSheet,
  onAddDrink,
}: AddDrinkBottomSheetProps) {
  const theme = useAppTheme();
  const height = useSharedValue(0);
  const translateY = useSharedValue(height.value);
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));
  const addDrink = onAddDrink();
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [amount, setAmount] = useState('');
  const [alcoholDegree, setAlcoholDegree] = useState('');

  const handleSave = () => {
    const newDrink: Drink = {
      id: Date.now(),
      name,
      size,
      amount: Number(amount),
      alcoholDegree: Number(alcoholDegree),
      memo: '',
    };
    addDrink(newDrink);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setSize('');
    setAmount('');
    setAlcoholDegree('');
  };

  useAnimatedReaction(
    () => isOpen.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        console.log('isOpen:', currentValue, 'height:', height.value);
        if (currentValue) {
          translateY.value = withTiming(0);
        } else {
          translateY.value = withTiming(height.value);
        }
      }
    },
    [height]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = Math.max(ctx.startY + event.translationY, 0);
    },
    onEnd: (event) => {
      if (event.velocityY > 500 || event.translationY > height.value / 2) {
        translateY.value = withTiming(height.value);
        runOnJS(toggleSheet)();
      } else {
        translateY.value = withTiming(0);
      }
    },
  });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));
  return (
    // <Modal isOpen={props.visible} onClose={props.onHideModal} style={styles.modalStyle}>
    // <RBSheet ref={props.ref}>
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={toggleSheet} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={[styles.sheet, sheetStyle]}
        >
          <Text variant="titleMedium">ドリンク編集</Text>
          <TextInput label="ドリンク名" value={name} onChangeText={setName} style={styles.input} />
          <TextInput label="サイズ" value={size} onChangeText={setSize} style={styles.input} />
          <TextInput
            label="量 (ml)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="アルコール度数 (%)"
            value={alcoholDegree}
            onChangeText={setAlcoholDegree}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            保存
          </Button>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  // modalStyle: {
  //   margin: 20, // モーダルの外側のマージン
  //   justifyContent: 'center', // モーダルを中央に配置
  // },
  // contentContainerStyle: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  // },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    paddingRight: 32,
    paddingLeft: 32,
    height: screenDimentions.height * 0.65,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  form: {
    width: '100%',
    gap: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});
