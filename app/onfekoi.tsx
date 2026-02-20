import MapScreen from '@/components/mapscreen';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import { UserLocation } from '@/services/location';
//import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Onfekoi() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ProductProps[]>([]);
  const [userLocation, setUserLocation] = useState<any>();
  const mainType = productFilterStore((state) => state.mainType);

  const fetchItems = async (lat?: number, lng?: number) => {
    setLoading(true);
    try {
      const location = lat && lng 
        ? { coords: { latitude: lat, longitude: lng } }
        : await UserLocation.getUserLocation();
      
      const result = await BackEndService.getGeolocationItems(
        'ALL',
        location.coords.latitude,
        location.coords.longitude,
      );
      
      setItems(result['data']);
      if (!lat && !lng) setUserLocation(location);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la carte", error);
    } finally {
      setLoading(false);
    }
  };

     useEffect(() => {
            fetchItems();
    }, [mainType]);

  // useFocusEffect(
  //   useCallback(() => {
  //         console.log("map refresh")
  //     fetchItems();
  //   }, [mainType])
  // );

  const handleMapRefresh = (center: { latitude: number; longitude: number }) => {
    fetchItems(center.latitude, center.longitude);
  };

  if (loading && items.length === 0) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <MapScreen 
      items={items} 
      userLocation={userLocation} 
      userAsInitialLocation={true}
      type='ALL'
      onRefreshRequest={handleMapRefresh} 
    />
  );
}