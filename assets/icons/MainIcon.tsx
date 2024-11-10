import React from 'react';
import MainIconSvg from '../images/main_icon.svg';

type MainIconProps = {
  size: number;
  color: string;
};

const MainIcon = ({ size, color }: MainIconProps) => (
  <MainIconSvg width={size} height={size} color={color} />
);

export default MainIcon;
