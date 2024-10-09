import { DrinkCard } from '@/components/DrinkCard';
import { TotalAlcoholIntakeArea } from '@/components/TotalAlcoholIntakeArea';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { DrinkBottomSheet } from '@/components/DrinkBottomSheet';
import { useSharedValue } from 'react-native-reanimated';
import { useState } from 'react';
import { MAX_CONTAINER_WIDTH, screenDimentions } from '@/constants/dimentions';
import { useAppTheme, useInitializeDrinks, useSyncOrderedDrinks } from '@/hooks';
import { Drink } from '@/domains/drink';
import { StyledView } from '@/components/styled';
import { AddDrinkCard } from '@/components/AddDrinkCard';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { orderedDrinksState } from '@/stores/states';
import { useRecoilState } from 'recoil';

export default function TabOneScreen() {
  const theme = useAppTheme();
  useInitializeDrinks();
  useSyncOrderedDrinks();
  const isOpen = useSharedValue(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null | undefined>(undefined);
  const [orderedDrinks, setOrderedDrinks] = useRecoilState(orderedDrinksState);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  const handleDragEnd = ({ data }: { data: Drink[] }) => {
    try {
      setOrderedDrinks(data);
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StyledView style={styles.container}>
        <DraggableFlatList
          data={orderedDrinks}
          onDragEnd={handleDragEnd}
          ListHeaderComponent={() => (
            <>
              <TotalAlcoholIntakeArea />
              <AddDrinkCard toggleSheet={toggleSheet} onPress={setSelectedDrink} />
            </>
          )}
          renderItem={({ item, drag, isActive }) => (
            <DrinkCard
              drink={item}
              toggleSheet={toggleSheet}
              onSelect={setSelectedDrink}
              onLongPress={drag}
              isActive={isActive}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </StyledView>
      {/* <ResetButton /> */}
      {/* <AddDrinkButton toggleSheet={toggleSheet} onPress={setSelectedDrink} /> */}
      {selectedDrink !== undefined && (
        // {selectedDrink && (
        <DrinkBottomSheet drink={selectedDrink} isOpen={isOpen} toggleSheet={toggleSheet} />
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
    // flex: 1,
    // alignItems: 'stretch',
    width: screenDimentions.width * 0.95,
    maxWidth: MAX_CONTAINER_WIDTH,
    marginTop: 10,
  },
  list: {},
});
