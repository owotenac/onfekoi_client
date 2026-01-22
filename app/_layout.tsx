import { TabBarTheme } from '@/model/global-css';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {

  const [loaded] = useFonts({
    'f-bold': require("@/assets/fonts/Sansation-Bold.ttf"),
    'f-bold-italic': require("@/assets/fonts/Sansation-BoldItalic.ttf"),
    'f-italic': require("@/assets/fonts/Sansation-Italic.ttf"),
    'f-light': require("@/assets/fonts/Sansation-Light.ttf"),
    'f-light-italic': require("@/assets/fonts/Sansation-LightItalic.ttf"),
    'f-regular': require("@/assets/fonts/Sansation-Regular.ttf")        
  }
  )

  return (
    <Stack
      screenOptions={TabBarTheme}>
        
      <Stack.Screen name="index" options={{ 
        headerShown: true ,
        title: 'ONFEKOI',
        
        }} />
      <Stack.Screen name="poi" options={{ 
        headerShown: true ,
        title: 'Point of Interest',
        
        }} />
      <Stack.Screen name="products" options={{ 
        headerShown: true ,
        title: 'Produits',
        
        }} />
      <Stack.Screen name="tours" options={{ 
        headerShown: true ,
        title: 'Tours',
        }} />
      <Stack.Screen name="events" options={{ 
        headerShown: true ,
        title: 'Evenements',
        }} />
      <Stack.Screen name="filters" options={{ 
        headerShown: true ,
        title: 'Filtres',
        }} />

      
      </Stack>
  )
}
