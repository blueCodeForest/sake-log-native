import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme, Text, Icon } from 'react-native-paper';
import CustomIcon from '@/assets/icons';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: 75,
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: theme.colors.surface, height: 100 },
        headerTintColor: theme.colors.onSurface,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '酒レコ',
          tabBarIcon: ({ color, size }) => (
            // <Icon source="glass-cocktail" color={color} size={size} />
            <CustomIcon name="main" size={size * 1.4} color={color} />
          ),
          // tabBarLabel: ({ focused, color }) => (
          //   <Text style={[{ color }, { fontSize: 12 }]}>ホーム</Text>
          // ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: '履歴',
          tabBarIcon: ({ color, size }) => <Icon source="finance" color={color} size={size} />,
          // tabBarLabel: ({ focused, color }) => (
          //   <Text style={[{ color }, { fontSize: 12 }]}>ログ</Text>
          // ),
        }}
      />
    </Tabs>
  );
}
