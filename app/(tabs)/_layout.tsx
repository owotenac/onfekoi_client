import { TabBarTheme } from '@/model/global-css';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import { router, Tabs } from 'expo-router';
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
          title: '',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} /> ,
          href: null,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // @ts-ignore
            router.push('/(tabs)');
          },
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Entypo name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> 
        }}
      />
      <Tabs.Screen
        name="foodEstablishment"
        options={{
          href: null,
          title: 'On mange?',
          tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> 

        }} 
      />
      <Tabs.Screen
        name="events"
        options={{
          href: null,
          title: 'On visite?',
          //tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> 

        }} 
      />
      <Tabs.Screen
        name="tours"
        options={{
          href: null,
          title: 'On bouge?',
          //tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> 

        }} 
      />
            <Tabs.Screen
        name="rentalAccommodation"
        options={{
          href: null,
          title: 'On dort?',
          //tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> 

        }} 
      />
                  <Tabs.Screen
        name="poi"
        options={{
          href: null,
          title: 'On visite?',
          //tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} /> 

        }} 
      />
    </Tabs>
  );
}
