import { totalAlcoholIntakeState } from '@/stores';
import { Box, Pressable } from 'native-base';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRecoilValue } from 'recoil';

const { height } = Dimensions.get('window');

export function TotalAlcoholIntakeArea() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.card}>
        <Box>
          <Text>アルコール摂取量</Text>
        </Box>
        <Box>
          <Text>{useRecoilValue<number>(totalAlcoholIntakeState)}</Text>
        </Box>
      </Pressable>
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
