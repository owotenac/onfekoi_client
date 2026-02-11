import MapView, { Marker } from '@/components/mapview';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export interface MapScreenProps {
  items: ProductProps[]
  userLocation?: Location.LocationObject
  userAsInitialLocation: boolean
  type: string
}

export default function MapScreen(props: MapScreenProps) {
  const [items, setItems] = useState<ProductProps[]>(props.items);

  const fetchItems = async (lat: number, lng: number) => {
    try {
      const result = await BackEndService.getGeolocationItems(props.type, lat, lng);
      setItems(result['data']);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleMapRefresh = (center: { latitude: number; longitude: number }) => {
    // Fetch new items for the new center
    fetchItems(center.latitude, center.longitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.userLocation ? props.userLocation?.coords.latitude : items[0].address.geo.latitude,
          longitude: props.userLocation ? props.userLocation?.coords.longitude : items[0].address.geo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRefreshRequest={handleMapRefresh}
      >
        {items &&
          items.map((loc, index) => (
            <Marker key={index}
              coordinate={{
                latitude: loc.address.geo.latitude,
                longitude: loc.address.geo.longitude
              }}
              title={loc.name}
              uuid={loc.uuid}
              mainType={loc.mainType}
            />
          ))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});