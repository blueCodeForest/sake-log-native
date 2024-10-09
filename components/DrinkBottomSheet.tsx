import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SharedValue } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

import { Drink, InsertDrink } from '@/domains/drink';
import { useEffect, useState } from 'react';
import { useAppTheme, useDrinkSizesData } from '@/hooks';
import { BottomSheet } from './BottomSheet';
import { BottomSheetSpacer } from './BottomSheetSpacer';
import { addDrink, updateDrink } from '@/features';
import { StyledHelperText, StyledPicker, StyledText, StyledTextInput } from './styled';

type DrinkBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  drink: Drink | null;
};

export function DrinkBottomSheet(props: DrinkBottomSheetProps) {
  const theme = useAppTheme();
  const drinkSizes = useDrinkSizesData();
  const [editedDrink, setEditedDrink] = useState<Drink | InsertDrink | null>(null);
  const [tempAlcoholDegree, setTempAlcoholDegree] = useState<string>('');
  const [errors, setErrors] = useState({ name: false, alcoholDegree: false });

  const validateField = (field: 'name' | 'alcoholDegree') => {
    if (editedDrink) {
      if (field === 'name' && !editedDrink.name) {
        setErrors((prev) => ({ ...prev, name: true }));
      } else if (field === 'alcoholDegree' && tempAlcoholDegree === '') {
        setErrors((prev) => ({ ...prev, alcoholDegree: true }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: false }));
      }
    }
  };

  useEffect(() => {
    if (props.drink) {
      setEditedDrink({ ...props.drink });
      setTempAlcoholDegree(props.drink.alcoholDegree?.toString() ?? '');
    } else {
      setEditedDrink({
        name: '',
        sizeId: 2,
        alcoholDegree: 0,
        memo: '',
      });
      setTempAlcoholDegree('');
    }
    setErrors({ name: false, alcoholDegree: false });
  }, [props.drink]);

  const handleSave = async () => {
    if (editedDrink && tempAlcoholDegree && editedDrink.name) {
      const updatedDrink = {
        ...editedDrink,
        alcoholDegree: parseInt(tempAlcoholDegree),
      };
      if (props.drink) {
        await updateDrink(updatedDrink as Drink);
      } else {
        await addDrink(updatedDrink as InsertDrink);
      }
      props.toggleSheet();
      // 入力内容をリセット
      setEditedDrink({
        name: '',
        sizeId: 2,
        alcoholDegree: 0,
        memo: '',
      });
      setTempAlcoholDegree('');
    } else {
      validateField('name');
      validateField('alcoholDegree');
    }
  };

  return (
    <BottomSheet isOpen={props.isOpen} toggleSheet={props.toggleSheet}>
      <StyledText variant="titleMedium" className="mb-4">
        ドリンク編集
      </StyledText>
      {editedDrink && (
        <View style={styles.form}>
          <StyledTextInput
            label="ドリンク名"
            value={editedDrink.name}
            onChangeText={(text: string) => setEditedDrink({ ...editedDrink, name: text })}
            onBlur={() => validateField('name')}
            error={errors.name}
          />
          <StyledHelperText type="error" visible={errors.name}>
            ドリンク名を入力してください
          </StyledHelperText>
          <StyledTextInput
            label="アルコール度数 (%)"
            value={tempAlcoholDegree}
            onChangeText={(text: string) => setTempAlcoholDegree(text)}
            onBlur={() => validateField('alcoholDegree')}
            error={errors.alcoholDegree}
            keyboardType="numeric"
          />
          <StyledHelperText type="error" visible={errors.alcoholDegree}>
            アルコール度数を入力してください
          </StyledHelperText>
          <StyledPicker
            selectedValue={editedDrink.sizeId}
            onValueChange={(itemValue: number) =>
              setEditedDrink({ ...editedDrink, sizeId: itemValue })
            }
            // style={{ backgroundColor: 'gray', marginBottom: 30 }}
            style={{ marginBottom: 25 }}
            itemStyle={{ color: theme.colors.onSurface }}
          >
            {drinkSizes.map((size) => (
              <Picker.Item
                key={size.id}
                label={`${size.name} : ${size.amount}ml`}
                value={size.id}
              />
            ))}
          </StyledPicker>
          <StyledTextInput
            label="メモ"
            value={editedDrink.memo ?? ''}
            onChangeText={(text: string) => setEditedDrink({ ...editedDrink, memo: text })}
            multiline
            style={{ marginBottom: 20 }}
          />
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleSave()}
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
