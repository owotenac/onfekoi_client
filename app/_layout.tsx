import { TabBarTheme } from '@/model/global-css';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'f-bold': require("@/assets/fonts/Sansation-Bold.ttf"),
    'f-bold-italic': require("@/assets/fonts/Sansation-BoldItalic.ttf"),
    'f-italic': require("@/assets/fonts/Sansation-Italic.ttf"),
    'f-light': require("@/assets/fonts/Sansation-Light.ttf"),
    'f-light-italic': require("@/assets/fonts/Sansation-LightItalic.ttf"),
    'f-regular': require("@/assets/fonts/Sansation-Regular.ttf")        
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ ...TabBarTheme, headerShown: true }}>
      <Stack.Screen name="index" options={{ title: '' }} />
      <Stack.Screen name="poi" options={{ title: 'On visite?' }} />
      <Stack.Screen name="products" options={{ title: 'Produits' }} />
      <Stack.Screen name="tours" options={{ title: 'On bouge?' }} />
      <Stack.Screen name="events" options={{ title: 'On sort?' }} />
      <Stack.Screen name="foodEstablishment" options={{ title: 'On mange?' }} />
      <Stack.Screen name="rentalAccommodation" options={{ title: 'On dort?' }} />
      <Stack.Screen name="filters" options={{ title: 'Filtres' }} />
      <Stack.Screen name="product-details" options={{ title: '' }} />
    </Stack>
  );
}