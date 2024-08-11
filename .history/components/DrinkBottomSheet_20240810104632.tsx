import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SharedValue } from 'react-native-reanimated';

import { Drink } from '@/domains/types';
import { useRecoilState } from 'recoil';
import { drinksState } from '@/stores';
import { useEffect, useState } from 'react';
import { useAppTheme } from '@/hooks';
import { BottomSheet } from './BottomSheet';
import { BottomSheetSpacer } from './BottomSheetSpacer';

type DrinkBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  drinkId: number;
};

export function DrinkBottomSheet(props: DrinkBottomSheetProps) {
  const theme = useAppTheme();
  const [drinks, setDrinks] = useRecoilState(drinksState);
  // const drink: Drink = props.drinkId
  //   ? drinks.find((drink: Drink) => drink.id === props.drinkId)
  //   : {};
  const [editedDrink, setEditedDrink] = useState<Drink | null>(null);

  useEffect(() => {
    const drink = drinks.find((drink: Drink) => drink.id === props.drinkId);
    if (drink) {
      setEditedDrink({ ...drink });
    } else {
      setEditedDrink({
        id: props.drinkId,
        name: '',
        size: '',
        amount: 0,
        alcoholDegree: 0,
        memo: '',
      });
    }
    // }, [props.drinkId, drinks]);
  }, [props.drinkId]);
  // });

  const handleSave = (drinkId: number) => {
    if (editedDrink && editedDrink.alcoholDegree !== null) {
      if (drinks.find((drink: Drink) => drink.id === drinkId)) {
        setDrinks(drinks.map((drink: Drink) => (drink.id === drinkId ? editedDrink : drink)));
      } else {
        setDrinks([...drinks, editedDrink]);
      }
      props.toggleSheet();
    } else {
      // エラーメッセージを表示するなどの処理
      alert('アルコール度数を入力してください');
    }
  };

  return (
    // <Modal isOpen={props.visible} onClose={props.onHideModal} style={styles.modalStyle}>
    // <RBSheet ref={props.ref}>
    // <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
    <BottomSheet isOpen={props.isOpen} toggleSheet={props.toggleSheet}>
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
            value={editedDrink.amount?.toString() ?? ''}
            onChangeText={(text) => setEditedDrink({ ...editedDrink, amount: parseFloat(text) })}
            keyboardType="numeric"
          />
          <TextInput
            label="アルコール度数 (%)"
            value={editedDrink.alcoholDegree?.toString() ?? ''}
            onChangeText={(text) =>
              setEditedDrink({
                ...editedDrink,
                alcoholDegree: text === '' ? null : parseFloat(text) || 0,
              })
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
            onPress={() => handleSave(editedDrink.id)}
          >
            <Text style={{ color: theme.colors.onPrimary }}>保存</Text>
          </TouchableOpacity>
          <BottomSheetSpacer />
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
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
