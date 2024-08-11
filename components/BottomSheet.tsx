import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useBottomSheet } from '@/hooks';

type BottomSheetProps = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  children: ReactNode;
};

export function BottomSheet(props: BottomSheetProps) {
  const customToggleSheet = () => {
    props.toggleSheet();
    Keyboard.dismiss();
  };
  const { height, sheetStyle, backdropStyle, gestureHandler } = useBottomSheet(
    props.isOpen,
    customToggleSheet
  );

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={customToggleSheet} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={[styles.sheet, sheetStyle]}
        >
          <ScrollView style={styles.scrollView}>{props.children}</ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    paddingRight: 32,
    paddingLeft: 32,
    height: '90%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
});
