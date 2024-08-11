import { View, StyleSheet } from 'react-native';
import { DrinkCard } from './DrinkCard';
import { Drink } from '@/domains/types';

type AlcoholCardsAreaProps = {
  onAddAlcohol: (amount: number) => void;
};

// export function AlcoholCardsArea(props: AlcoholCardsAreaProps) {
//   return (
//     <View style={styles.container}>
//       {alcoholList.map((alcohol: Alcohol) => (
//         <AlcoholCard
//           alcohol={alcohol}
//           onAddAlcohol={props.onAddAlcohol}
//           key={alcohol.id}
//         />
//       ))}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
