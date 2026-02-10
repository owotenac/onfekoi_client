import MapScreen from '@/components/mapview-component';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Map() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ProductProps[]>([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    
   useEffect(() => {
    const initialize = async () => {
        try {
            setLoading(true);
            
            //default location 
            let userLocation =  {coords: {latitude: 43.619301, longitude: 3.872337}} as Location.LocationObject;
            setLocation(userLocation)
            // Get location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status == 'granted') {
                userLocation = await Location.getCurrentPositionAsync({});
                setLocation(userLocation);
            }
            
            // Use location in API call
            const result = await BackEndService.getGeolocationItems(
                "ALL", 
                userLocation.coords.latitude, 
                userLocation.coords.longitude
            );
            setItems(result['data']);
            
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    initialize();
}, []);

  return (
    loading ? <ActivityIndicator size="large" /> : <MapScreen item={items} />
  );
}