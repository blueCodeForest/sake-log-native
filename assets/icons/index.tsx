import React from 'react';
import AddIcon from './AddIcon';
import MainIcon from './MainIcon';
const customIcons = {
  add: AddIcon,
  main: MainIcon,
};

type CustomIconProps = {
  name: keyof typeof customIcons;
  size: number;
  color: string;
};

const CustomIcon = ({ name, size, color }: CustomIconProps) => {
  const Component = customIcons[name];
  return Component ? <Component size={size} color={color} /> : null;
};

export default CustomIcon;
