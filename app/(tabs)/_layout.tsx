import { TabBarTheme } from '@/model/global-css';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  //const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={
        TabBarTheme
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
          //href: null,
          //tabBarStyle: { display: 'none' }
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="favorites_screen"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Entypo name="heart" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color} />
        }}
      />
    </Tabs>

  );
}
