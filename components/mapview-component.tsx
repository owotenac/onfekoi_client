import MapView, { Marker } from '@/components/mapview';
import { ProductProps } from '@/model/products';
import { StyleSheet, View } from 'react-native';

export default function MapScreen({ item }: { item: ProductProps[] }) {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item[0].address.geo.latitude,
          longitude: item[0].address.geo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {item &&
          item.map((loc, index) => (
            <Marker key={index}
              coordinate={{
                latitude: loc.address.geo.latitude,
                longitude: loc.address.geo.longitude
              }}
              title={loc.name}
              uuid = {loc.uuid}
              mainType = {loc.mainType}
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