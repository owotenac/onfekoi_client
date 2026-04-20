import { router, Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';


function WebNavBar() {

  return (
    <View style={styles.navbar}>
      <Text style={styles.navLogo}>ONFEKOI</Text>
      <Pressable onPress={() => router.replace('/(tabs)')} style={({ pressed }) => [styles.navLink, styles.navLinkActive, pressed && styles.pressed]}>
        <Text style={styles.navLinkActiveText}>Accueil</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/favorites_screen')} style={({ pressed }) => [styles.navLink, pressed && styles.pressed]}>
        <Text style={styles.navLinkText}>Favoris</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/profile')} style={({ pressed }) => [styles.navLink, pressed && styles.pressed]}>
        <Text style={styles.navLinkText}>Profil</Text>
      </Pressable>
    </View>
  );
}

export default function WebTabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0e1420" }}>
      <WebNavBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }  // hide the default tab bar
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="favorites_screen" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </View>
  );
}

const BG_PAGE = '#0e1420';
const BG_NAV = '#0b1018';
const ACCENT = '#eab308';
const styles = StyleSheet.create({
  navbar: {
    height: 52,
    backgroundColor: BG_NAV,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.07)',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  navLogo: {
    fontSize: 25,
    fontWeight: '500',
    color: ACCENT,
    letterSpacing: -0.3,
  },
  navLink: {
    paddingVertical: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  navLinkActive: {
    borderBottomColor: ACCENT,
  },
  navLinkText: {
    fontSize: 23,
    color: 'rgba(255,255,255,0.5)',
  },
  navLinkActiveText: {
    fontSize: 23,
    color: '#fff',
  },
  navSpacer: { flex: 1 },
  pressed: {
    opacity: 0.75,
  },
});