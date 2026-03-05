import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function MapHeaderButton() {

      const openMap = () => {
        router.push({ pathname: '/map' });
    }

  return (
    <TouchableOpacity 
      onPress={openMap}
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: 'rgba(74,158,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(74,158,255,0.5)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 15
      }}
    >
      <Ionicons name="map-outline" size={24} color="#4a9eff" />
      <Text style={{ color: '#4a9eff', fontWeight: '600', fontSize: 13, marginLeft: 5 }}>
        Carte
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

})