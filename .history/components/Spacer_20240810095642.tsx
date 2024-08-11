import React from 'react';
import { View } from 'react-native';
import { screenDimentions } from '@/constants/dimentions';

type SpacerProps = {
  height?: number;
};

export function Spacer() {
  const height = screenDimentions.height * 0.5;
  return <View style={{ height }} />;
}
