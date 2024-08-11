import React from 'react';
import { View } from 'react-native';
import { screenDimentions } from '@/constants/dimentions';

export function BottomSheetSpacer() {
  const height = screenDimentions.height * 0.35;
  return <View style={{ height }} />;
}
