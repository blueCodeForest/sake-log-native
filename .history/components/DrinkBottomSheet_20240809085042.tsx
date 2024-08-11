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
import { BottomSheet } from './BottomSheet';

type DrinkBottomSheetProps = {
  // visible: boolean;
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  // onHideModal: () => void;
  // ref: React.RefObject<typeof RBSheet>;
  drinkId: number;
};

export function DrinkBottomSheet({
  isOpen,
  duration = 500,
  drinkId,
  toggleSheet,
}: DrinkBottomSheetProps) {
  const theme = useAppTheme();
  const height = useSharedValue(0);
  const translateY = useSharedValue(height.value);
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));
  const [drinks, setDrinks] = useRecoilState(drinksState);
  const drink = drinks.find((drink: Drink) => drink.id === drinkId);
  const [editedDrink, setEditedDrink] = useState<Drink | null>(null);

  useEffect(() => {
    const drink = drinks.find((drink: Drink) => drink.id === drinkId);
    if (drink) {
      setEditedDrink({ ...drink });
    }
  }, [drinkId, drinks]);

  const handleSave = () => {
    if (editedDrink) {
      setDrinks(drinks.map((drink: Drink) => (drink.id === editedDrink.id ? editedDrink : drink)));
      toggleSheet();
    }
  };

  return (
    // <Modal isOpen={props.visible} onClose={props.onHideModal} style={styles.modalStyle}>
    // <RBSheet ref={props.ref}>
    <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
      <Text variant="titleMedium">ドリンク編集</Text>
      {editedDrink && (
        <View style={styles.form}>
          <TextInput
            label="名前"
            value={editedDrink.name}
            onChangeText={(text) => setEditedDrink({ ...editedDrink, name: text })}
          />
          <TextInput
            label="サイズ"
            value={editedDrink.size}
            onChangeText={(text) => setEditedDrink({ ...editedDrink, size: text })}
          />
          <TextInput
            label="量 (ml)"
            value={editedDrink.amount.toString()}
            onChangeText={(text) =>
              setEditedDrink({ ...editedDrink, amount: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
          />
          <TextInput
            label="アルコール度数 (%)"
            value={editedDrink.alcoholDegree.toString()}
            onChangeText={(text) =>
              setEditedDrink({ ...editedDrink, alcoholDegree: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
          />
          <TextInput
            label="メモ"
            value={editedDrink.memo}
            onChangeText={(text) => setEditedDrink({ ...editedDrink, memo: text })}
            multiline
          />
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSave}
          >
            <Text style={{ color: theme.colors.onPrimary }}>保存</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <Text variant="titleMedium">ドリンク</Text>
          <View>
            <Text>名前 : {drink.name}</Text>
            <Text>
              サイズ : {drink.size}({drink.amount}ml)
            </Text>
            <Text>アルコール度数 : {drink.alcoholDegree}%</Text>
            <Text>純アルコール量 : {drink.amount * drink.alcoholDegree * 0.01}g</Text>
            <Text>メモ</Text>
            <Text>{drink.memo}</Text>
          </View> */}
    </BottomSheet>
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
