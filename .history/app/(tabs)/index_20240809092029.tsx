import { DrinkCard } from '@/components/DrinkCard';
import { TotalAlcoholIntakeArea } from '@/components/TotalAlcoholIntakeArea';
import { Drink } from '@/domains/types';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { drinksState } from '@/stores';
import { ResetButton } from '@/components/dev/resetButton';
import { DrinkBottomSheet } from '@/components/DrinkBottomSheet';
import { useSharedValue } from 'react-native-reanimated';
import { useState } from 'react';
import { screenDimentions } from '@/constants/dimentions';
import { Divider, Surface } from 'react-native-paper';
import { useAppTheme } from '@/hooks';
import { AddDrinkButton } from '@/components/AddDrinkButton';

export default function TabOneScreen() {
  const theme = useAppTheme();
  const isOpen = useSharedValue(false);
  const [selectedDrinkId, setSelectedDrinkId] = useState<number | null>(null);

  // const toggleSheet = (drinkId: number) => {
  //   console.log('toggleSheet', drinkId);
  //   setSelectedDrinkId(drinkId);
  //   isOpen.value = !isOpen.value;
  // };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <FlatList
          data={useRecoilValue<Drink[]>(drinksState)}
          ListHeaderComponent={() => <TotalAlcoholIntakeArea />}
          renderItem={({ item }) => (
            // <DrinkCard drink={item} toggleSheet={() => toggleSheet(item.id)} />
            <DrinkCard drink={item} isOpen={isOpen} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
        {/* <TotalAlcoholIntakeArea totalAlcohol={totalAlcohol} />
        <{ DrinkCard }sArea onAddAlcohol={addAlcohol} /> */}
      </View>
      <ResetButton />
      <AddDrinkButton />
      {selectedDrinkId !== null && (
        <DrinkBottomSheet
          drinkId={selectedDrinkId}
          isOpen={isOpen}
          toggleSheet={() => toggleSheet(selectedDrinkId)}
        />
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
