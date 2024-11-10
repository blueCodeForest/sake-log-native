import { useAppTheme, useFontScale } from '@/hooks';
import { StyledCard, StyledCardContent, StyledIcon, StyledText, StyledView } from './styled';
import { Dispatch, SetStateAction } from 'react';
import { Drink } from '@/domains/drink';
import CustomIcon from '@/assets/icons';

type AddDrinkButtonProps = {
  toggleSheet: () => void;
  onPress: Dispatch<SetStateAction<Drink | null | undefined>>;
};
export function AddDrinkCard(props: AddDrinkButtonProps) {
  const fontScale = useFontScale();

  const onPress = () => {
    props.toggleSheet();
    props.onPress(null);
  };

  return (
    <StyledView>
      <StyledCard className="m-1" mode="outlined" onPress={onPress}>
        <StyledView className="flex-row justify-between p-2">
          <StyledCardContent className="justify-center items-start p-1">
            <StyledText>+ ドリンクを追加する</StyledText>
          </StyledCardContent>
          <StyledCardContent className="p-1 flex-row items-center">
            <StyledCardContent className="p-0 m-2">
              <StyledText style={{ opacity: 0 }}>杯</StyledText>
            </StyledCardContent>
            <StyledCardContent className="p-0 mb-1">
              {/* <StyledIcon source="glass-cocktail" size={20 * fontScale} color="transparent" /> */}
              <CustomIcon name="add" size={26 * fontScale} color="transparent" />
            </StyledCardContent>
          </StyledCardContent>
        </StyledView>
      </StyledCard>
    </StyledView>
  );
}
