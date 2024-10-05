import React from 'react';
import { styled } from 'nativewind';
import { useAppTheme } from '@/hooks';

const withTheme = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const theme = useAppTheme();
    return <Component {...props} theme={theme} />;
  };
};

export default (Component: React.ComponentType<any>) => styled(withTheme(Component));
