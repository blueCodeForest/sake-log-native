import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import TabOneScreen from '.';
import TabTwoScreen from './two';
import { Box, Center, HStack, Icon, Pressable, Text } from 'native-base';
import { Entypo, Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  // name: React.ComponentProps<typeof FontAwesome>['name'];
  name: string;
  color: string;
  as: React.ComponentProps<typeof Icon>['as'];
}) {
  return <Icon {...props} />;
  // return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'primary.600',
        tabBarInactiveTintColor: 'gray.500',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="drink" color={color} as={Entypo} />,
          tabBarLabel: ({ focused, color }) => <Text color={color}>ホーム</Text>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="graph-bar" color={color} as={Foundation} />,
          tabBarLabel: ({ focused, color }) => <Text color={color}>ログ</Text>,
        }}
      />
    </Tabs>
  );
}
