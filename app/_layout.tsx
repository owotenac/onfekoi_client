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
        <title>ONFEKOI - Bons plans, activités et sorties partout en France</title>
        <meta name="description" content="Trouvez les meilleurs bons plans près de chez vous partout en France : restaurants, activités, randonnées, hébergements et sorties en famille. Mis à jour en temps réel." />
        <meta name="google-site-verification" content="9aO7EU-U11jWgoHXZnZOMDP_U_SDt9k7BhuoD319Va8" />
        <meta name="keywords" content="bons plans France, quoi faire près de chez moi, activités France, sorties famille, restaurants près de moi, randonnées France, hébergements France, tourisme France, bons plans week-end" />
        {/* Open Graph */}
        <meta property="og:title" content="OnFéKoi - Bons plans et activités partout en France" />
        <meta property="og:description" content="Restaurants, randonnées, activités, hébergements... Découvrez les meilleurs bons plans près de chez vous partout en France." />
        <meta property="og:url" content="https://www.onfekoi.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.onfekoi.app/og-image.png" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter/X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OnFéKoi - Bons plans et activités partout en France" />
        <meta name="twitter:description" content="Restaurants, randonnées, activités, hébergements... Découvrez les meilleurs bons plans près de chez vous partout en France." />

        <link rel="canonical" href="https://www.onfekoi.app" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ONFEKOI",
          "url": "https://www.onfekoi.app",
          "description": "Bons plans, activités et sorties partout en France",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Android, Web",
          "areaServed": {
            "@type": "Country",
            "name": "France"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          }
        })}</script>

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