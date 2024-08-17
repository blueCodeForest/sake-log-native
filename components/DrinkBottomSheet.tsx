import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';
import { SharedValue } from 'react-native-reanimated';

import { Drink } from '@/entities';
import { useRecoilState } from 'recoil';
import { drinksState } from '@/stores/states';
import { useEffect, useState } from 'react';
import { useAppTheme } from '@/hooks';
import { BottomSheet } from './BottomSheet';
import { BottomSheetSpacer } from './BottomSheetSpacer';
import { useAddDrink, useUpdateDrink } from '@/stores/callbacks';

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
  const [errors, setErrors] = useState({ name: false, alcoholDegree: false });
  const addDrink = useAddDrink();
  const updateDrink = useUpdateDrink();

  const validateField = (field: 'name' | 'alcoholDegree') => {
    if (editedDrink) {
      if (field === 'name' && !editedDrink.name) {
        setErrors((prev) => ({ ...prev, name: true }));
      } else if (field === 'alcoholDegree' && editedDrink.alcoholDegree === null) {
        setErrors((prev) => ({ ...prev, alcoholDegree: true }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: false }));
      }
    }
  };

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

  const handleSave = async (drinkId: number) => {
    if (editedDrink && editedDrink.alcoholDegree && editedDrink.name) {
      if (drinks.find((drink: Drink) => drink.id === drinkId)) {
        // setDrinks(drinks.map((drink: Drink) => (drink.id === drinkId ? editedDrink : drink)));
        await updateDrink(editedDrink);
      } else {
        await addDrink(editedDrink);
        // setDrinks([...drinks, editedDrink]);
      }
      props.toggleSheet();
    } else {
      validateField('name');
      validateField('alcoholDegree');
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
            onBlur={() => validateField('name')}
            error={errors.name}
          />
          <HelperText type="error" visible={errors.name}>
            ドリンク名を入力してください
          </HelperText>
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
            onBlur={() => validateField('alcoholDegree')}
            error={errors.alcoholDegree}
            keyboardType="numeric"
          />
          <HelperText type="error" visible={errors.alcoholDegree}>
            アルコール度数を入力してください
          </HelperText>
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
