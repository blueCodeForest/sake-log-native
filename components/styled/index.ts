import { Picker } from '@react-native-picker/picker';
import {
  Button,
  Card,
  Dialog,
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
export const StyledDialog = withTheme(Dialog);
export const StyledDialogTitle = withTheme(Dialog.Title);
export const StyledDialogContent = withTheme(Dialog.Content);
export const StyledDialogActions = withTheme(Dialog.Actions);
export const StyledButton = withTheme(Button);
export const StyledHelperText = withTheme(HelperText);
export const StyledTextInput = withTheme(TextInput);
export const StyledPicker = withTheme(Picker);
export const StyledIcon = withTheme(Icon);
export const StyledTouchableRipple = withTheme(TouchableRipple);
export const StyledView = withTheme(View);
