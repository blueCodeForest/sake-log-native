import { totalAlcoholIntakeState } from '@/stores';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

const { height } = Dimensions.get('window');

export function TotalAlcoholIntakeArea() {
  return (
    <View style={styles.container}>
      <TouchableRipple style={styles.card}>
        <View>
          <View>
            <Text>アルコール摂取量</Text>
          </View>
          <View>
            <Text>{useRecoilValue<number>(totalAlcoholIntakeState)}</Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.2,
    marginBottom: 20,
  },
  card: {
    height: '100%',
  },
});
