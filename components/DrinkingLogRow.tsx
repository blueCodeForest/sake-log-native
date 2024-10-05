import { DrinkingLog } from '@/domains/drinkingLog';
import { Swipeable } from 'react-native-gesture-handler';
import { View, StyleSheet, Animated } from 'react-native';
import { DataTable, Icon } from 'react-native-paper';
import { useAppTheme, useFontScale } from '@/hooks';
import { useRef, useState } from 'react';
import { DeleteDrinkingLogComfirmDialog } from './DeleteDrinkingLogComfirmDialog';
import { StyledIcon, StyledView } from './styled';

type DrinkingLogRowProps = {
  key: number;
  log: DrinkingLog;
};

export function DrinkingLogRow(props: DrinkingLogRowProps) {
  const theme = useAppTheme();
  const [dialogVisible, setDialogVisible] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);
  const fontScale = useFontScale();

  const onShowDialog = () => {
    setDialogVisible(true);
  };
  const onHideDialog = () => {
    setDialogVisible(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  const renderRightActions = () => {
    return (
      <StyledView className="items-center justify-center w-20">
        <StyledIcon source="delete" size={20 * fontScale} color={theme.colors.error} />
      </StyledView>
    );
  };

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        rightThreshold={50}
        renderRightActions={renderRightActions}
        onSwipeableOpen={onShowDialog}
      >
        <DataTable.Row style={{ backgroundColor: theme.colors.background }}>
          <DataTable.Cell>
            {props.log.drink.name}({props.log.drink.size.name})
          </DataTable.Cell>
          <DataTable.Cell numeric>{new Date(props.log.createdAt).toLocaleString()}</DataTable.Cell>
        </DataTable.Row>
      </Swipeable>
      <DeleteDrinkingLogComfirmDialog
        visible={dialogVisible}
        onDismiss={onHideDialog}
        log={props.log}
      />
    </>
  );
}
