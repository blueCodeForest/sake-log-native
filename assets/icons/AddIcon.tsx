import React from 'react';
import AddIconSvg from '../images/add_icon.svg';

type AddIconProps = {
  size: number;
  color: string;
};

const AddIcon = ({ size, color }: AddIconProps) => (
  <AddIconSvg width={size} height={size} color={color} />
);

export default AddIcon;
