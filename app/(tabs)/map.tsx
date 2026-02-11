import MapScreen from '@/components/mapscreen';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import { UserLocation } from '@/services/location';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Map() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ProductProps[]>([]);
   const [userLocation, setUserLocation] = useState<Location.LocationObject>()

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);

            const location = await UserLocation.getUserLocation()

            const mainType = productFilterStore.getState().mainType;
            // Fetch items based on location
            const result = await BackEndService.getGeolocationItems(
                mainType,
                location.coords.latitude,
                location.coords.longitude,
            );

            setItems(result['data']);
            setUserLocation(location)            
            setLoading(false)
        };

        initialize();
    }, []);

  return (
        loading ? 
        <ActivityIndicator size="large" /> 
        : 
        <MapScreen 
            items={items} 
            userLocation={userLocation} 
            userAsInitialLocation={true}
            type={productFilterStore.getState().mainType}
        />
  );
}