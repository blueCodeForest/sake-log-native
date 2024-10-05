import { Picker } from '@react-native-picker/picker';
import {
  Button,
  Card,
  Dialog,
  FAB,
  HelperText,
  Icon,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import withTheme from './withTheme';
import { View } from 'react-native';

export const StyledCard = withTheme(Card);
export const StyledCardContent = withTheme(Card.Content);
export const StyledText = withTheme(Text);
export const StyledFAB = withTheme(FAB);
export const StyledDialog = withTheme(Dialog);
export const StyledButton = withTheme(Button);
export const StyledHelperText = withTheme(HelperText);
export const StyledTextInput = withTheme(TextInput);
export const StyledPicker = withTheme(Picker);
export const StyledIcon = withTheme(Icon);
export const StyledTouchableRipple = withTheme(TouchableRipple);
export const StyledView = withTheme(View);
