import { DrinkCard } from '@/components/DrinkCard';
import { TotalAlcoholIntakeArea } from '@/components/TotalAlcoholIntakeArea';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { drinksState } from '@/stores/states';
import { ResetButton } from '@/components/dev/resetButton';
import { DrinkBottomSheet } from '@/components/DrinkBottomSheet';
import { useSharedValue } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { screenDimentions } from '@/constants/dimentions';
import { useAppTheme } from '@/hooks';
import { AddDrinkButton } from '@/components/AddDrinkButton';
import { retrieveDrinks } from '@/utils/repositories';
import { Drink } from '@/entities';

export default function TabOneScreen() {
  const theme = useAppTheme();
  const isOpen = useSharedValue(false);
  const [drinks, setDrinksState] = useRecoilState<Drink[]>(drinksState);
  const [selectedDrinkId, setSelectedDrinkId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      if (drinks.length === 0) {
        const drinksData = await retrieveDrinks();
        setDrinksState(drinksData || []);
      }
    };
    fetchDrinks();
  }, []);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <FlatList
          data={drinks}
          ListHeaderComponent={() => <TotalAlcoholIntakeArea />}
          renderItem={({ item }) => (
            <DrinkCard drink={item} toggleSheet={toggleSheet} onSelect={setSelectedDrinkId} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </View>
      <ResetButton />
      <AddDrinkButton toggleSheet={toggleSheet} onSelect={setSelectedDrinkId} />
      {selectedDrinkId !== null && (
        <DrinkBottomSheet drinkId={selectedDrinkId} isOpen={isOpen} toggleSheet={toggleSheet} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    width: screenDimentions.width * 0.9,
    marginTop: 20,
    maxWidth: 600,
  },
  list: {},
});
