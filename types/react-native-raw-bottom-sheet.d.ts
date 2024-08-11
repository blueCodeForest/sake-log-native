import { ViewStyle } from 'react-native';

declare module 'react-native-raw-bottom-sheet' {
  export type RBSheetProps = {
    animationType?: 'none' | 'fade' | 'slide';
    height?: number;
    minClosingHeight?: number;
    duration?: number;
    closeOnSwipeDown?: boolean;
    closeOnPressMask?: boolean;
    onClose?: () => void;
    customStyles?: {
      wrapper?: ViewStyle;
      container?: ViewStyle;
    };
  };

  declare class RBSheet extends React.Component<RBSheetProps> {
    open(): void;
    close(): void;
  }

  export default RBSheet;
}
