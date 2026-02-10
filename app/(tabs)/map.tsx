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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const mainType = productFilterStore.getState().mainType;
        let userLocation =  {coords: {latitude: 43.619301, longitude: 3.872337}} as Location.LocationObject;        
        const result = await BackEndService.getGeolocationItems(
          mainType,
          userLocation.coords.latitude, 
          userLocation.coords.longitude
        );

        setItems(result['data']);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchItems();
  }, []); // Added mainType as dependency

  return (
    loading ? <ActivityIndicator size="large" /> : <MapScreen item={items} />
  );
}