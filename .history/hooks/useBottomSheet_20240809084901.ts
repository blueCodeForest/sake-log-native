import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedReaction,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  withDelay,
  SharedValue,
} from 'react-native-reanimated';

export function useBottomSheet(isOpen: SharedValue<boolean>, toggleSheet: () => void) {
  const height = useSharedValue(0);
  const translateY = useSharedValue(height.value);
  const duration = 500;

  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));

  useAnimatedReaction(
    () => isOpen.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        if (currentValue) {
          translateY.value = withTiming(0);
        } else {
          translateY.value = withTiming(height.value);
        }
      }
    },
    [height]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = Math.max(ctx.startY + event.translationY, 0);
    },
    onEnd: (event) => {
      if (event.velocityY > 500 || event.translationY > height.value / 2) {
        translateY.value = withTiming(height.value);
        runOnJS(toggleSheet)();
      } else {
        translateY.value = withTiming(0);
      }
    },
  });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return { height, sheetStyle, backdropStyle, gestureHandler };
}
