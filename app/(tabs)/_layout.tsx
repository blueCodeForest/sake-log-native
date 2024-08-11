import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme, Text, Icon } from 'react-native-paper';
import { Entypo, Foundation } from '@expo/vector-icons';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon source="glass-cocktail" color={color} size={size} />
          ),
          tabBarLabel: ({ focused, color }) => <Text style={{ color }}>ホーム</Text>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Log',
          tabBarIcon: ({ color, size }) => <Icon source="finance" color={color} size={size} />,
          tabBarLabel: ({ focused, color }) => <Text style={{ color }}>ログ</Text>,
        }}
      />
    </Tabs>
  );
}
