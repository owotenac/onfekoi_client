import MapHeaderButton from '@/components/mapheaderbutton';
import { TabBarTheme } from '@/model/global-css';
import * as SplashScreen from 'expo-splash-screen';

import { AppInitGate } from '@/components/app-init-gate';
import mobileAds from '@/lib/mobileAds';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import Head from 'expo-router/head';
import { useEffect } from 'react';
import { Platform } from 'react-native';

// Empêche le splash de se masquer automatiquement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'f-bold': require("@/assets/fonts/Sansation-Bold.ttf"),
    'f-bold-italic': require("@/assets/fonts/Sansation-BoldItalic.ttf"),
    'f-italic': require("@/assets/fonts/Sansation-Italic.ttf"),
    'f-light': require("@/assets/fonts/Sansation-Light.ttf"),
    'f-light-italic': require("@/assets/fonts/Sansation-LightItalic.ttf"),
    'f-regular': require("@/assets/fonts/Sansation-Regular.ttf")
  });

  useEffect(() => {
    if (Platform.OS !== 'web') {
      mobileAds().initialize().then(adapterStatuses => {
        console.log('AdMob initialized:', JSON.stringify(adapterStatuses));
      });
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <>
      <Head>
        <title>ONFEKOI - Quoi faire près de chez toi ?</title>
        <meta name="description" content="Découvrez les meilleures activités, sorties et événements près de chez vous." />
        <meta name="google-site-verification" content="9aO7EU-U11jWgoHXZnZOMDP_U_SDt9k7BhuoD319Va8" />
        <meta name="keywords" content="activités, événements, sorties, restaurants, hébergements, tours, points d'intérêt, ONFEKOI, Hérault, Herault" />

        {/* Open Graph */}
        <meta property="og:title" content="ONFEKOI" />
        <meta property="og:description" content="Découvrez quoi faire près de chez vous" />
        <meta property="og:url" content="https://www.onfekoi.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.onfekoi.app/og-image.png" />

        {/* Twitter/X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ONFEKOI" />
        <meta name="twitter:description" content="Découvrez quoi faire près de chez vous" />
      </Head>
      <AppInitGate>
        <Stack screenOptions={{ ...TabBarTheme, headerShown: true }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="filters" options={{ title: 'Filtres' }} />
          <Stack.Screen name="product-details" options={{ headerShown: false, title: '' }} />
          <Stack.Screen name="foodEstablishment" options={{ title: "On mange", headerRight: () => <MapHeaderButton /> }} />
          <Stack.Screen name="poi" options={{ title: "On visite", headerRight: () => <MapHeaderButton /> }} />

          <Stack.Screen name="events" options={{ title: "On sort", headerRight: () => <MapHeaderButton /> }} />
          <Stack.Screen name="tours" options={{ title: "On bouge", headerRight: () => <MapHeaderButton /> }} />
          <Stack.Screen name="rentalAccommodation" options={{ title: 'On dort', headerRight: () => <MapHeaderButton /> }} />
          <Stack.Screen name="onfekoi" options={{ title: "ONFEKOI" }} />
          <Stack.Screen name="map" options={{ title: "Carte" }} />
          <Stack.Screen name="legalpage" options={{ headerShown: false, title: '' }} />
        </Stack>
      </AppInitGate>
    </>

  );
}