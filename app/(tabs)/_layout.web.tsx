import { AntDesign, Entypo } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';


function WebNavBar() {

  const { width } = useWindowDimensions();
const showText = width >= 480;


  return (
    <View style={styles.navbar}>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.navItem}>
          <AntDesign name="home" size={34} color='white' />
           {showText && <Text style={styles.navText}>Home</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/favorites_screen')} style={styles.navItem}>
          <Entypo name="heart" size={34} color='white' />
          {showText && <Text style={styles.navText}>Favorites</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.navItem}>
          <Entypo name="user" size={34} color='white' />
          {showText && <Text style={styles.navText}>Profile</Text>}
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default function WebTabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <WebNavBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }  // hide the default tab bar
        }}
      >
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="favorites_screen" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </View>
  );
}


const styles = StyleSheet.create({
  navbar: {
    //flex: 0.1,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    padding: 16,
    backgroundColor: "#15151D",
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