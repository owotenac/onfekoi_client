// This is a fallback that should never actually be used
// since we have .web.tsx and .android.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function MapView() {
  return (
    <View style={styles.container}>
      <Text>Map not supported on this platform</Text>
    </View>
  );
}

export function Marker() {
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
