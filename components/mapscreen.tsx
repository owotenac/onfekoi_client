import MapView, { Marker } from '@/components/mapview';
import { ProductProps } from '@/model/products';
import * as Location from 'expo-location';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface MapScreenProps {
  items: ProductProps[]
  userLocation?: Location.LocationObject
  userAsInitialLocation: boolean
  type: string
  onRefreshRequest: (center: { latitude: number; longitude: number }) => void  // Add this
}

export default function MapScreen(props: MapScreenProps) {
  // No local state needed anymore!

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.userLocation ? props.userLocation?.coords.latitude : props.items[0]?.address.geo.latitude,
          longitude: props.userLocation ? props.userLocation?.coords.longitude : props.items[0]?.address.geo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRefreshRequest={props.onRefreshRequest}  // Use the prop
      >
        {props.items &&
          props.items.map((loc, index) => (
            <Marker 
              key={loc.uuid}  // Better to use uuid instead of index
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