import { ProductProps } from '@/model/products';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from './mapview';

export default function MapScreen(item: ProductProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.address.geo.latitude,
          longitude: item.address.geo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: item.address.geo.latitude,
            longitude: item.address.geo.longitude,
          }}
          title= {item.name}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});