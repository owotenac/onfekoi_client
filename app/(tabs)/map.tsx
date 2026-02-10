import MapScreen from '@/components/mapview-component';
import { productFilterStore } from '@/model/current-filter';
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
      
      let userLocation: Location.LocationObject;
      
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        try {
          // Get actual user location
          userLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced, // Add accuracy option
          });
        } catch (locationError) {
          console.warn("Failed to get location, using default:", locationError);
          // Fallback to default if getCurrentPosition fails
          userLocation = {
            coords: {
              latitude: 43.619301,
              longitude: 3.872337,
              altitude: null,
              accuracy: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
            timestamp: Date.now(),
          };
        }
      } else {
        // Permission denied - use default location
        console.log("Location permission denied, using default location");
        userLocation = {
          coords: {
            latitude: 43.619301,
            longitude: 3.872337,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        };
        
        // Optional: Show a message to user
        // Alert.alert("Location Access", "Using default location. Enable location for better results.");
      }
      
      // Use location in API call
      const mainType = productFilterStore.getState().mainType;

      const result = await BackEndService.getGeolocationItems(
        mainType,
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
      
      setItems(result['data']);
      setLocation(userLocation);
      
    } catch (error) {
      console.error("Error initializing:", error);
      // Optional: Set some error state or show user-friendly message
      // setError("Failed to load nearby items");
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