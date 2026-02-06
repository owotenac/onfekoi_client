import { AntDesign, Entypo } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function WebNavBar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>OnFekoi</Text>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)' })} style={styles.navItem}>
          <AntDesign name="home" size={34} color='white' />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/favorites')} style={styles.navItem}>
          <Entypo name="heart" size={34} color='white' />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/map')} style={styles.navItem}>
          <Entypo name="map" size={34} color='white' />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function WebTabLayout() {
  return (
    <>
      <WebNavBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="map" />
        <Stack.Screen name="foodEstablishment" />
        <Stack.Screen name="poi" />
        <Stack.Screen name="events" />
        <Stack.Screen name="tours" />
        <Stack.Screen name="rentalAccommodation" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#15151D",
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  navText: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'f-regular'
  },
});