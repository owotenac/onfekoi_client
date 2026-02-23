import { StyleSheet, } from 'react-native';


export const global_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        backgroundColor: "#15151D",
        alignContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
      },
})


export const TabBarTheme = {
  headerStyle: {
    backgroundColor: "#15151D",
  },
  headerTitleStyle: {
    color: "#ffffffff",
    fontSize: 20,
    fontFamily: "f-bold"
  },
  headerShadowVisible: false,
  headerTintColor: '#ffffffff',
  tabBarStyle: {
    backgroundColor: '#15151D',
  },
  headerShown: true,
}

export const globalTheme = {
  ALL : {
    color: '#1c1485',
  },
  FoodEstablishment : {
    color: '#FFA500',
  },
  EntertainmentAndEvent :{
    color: '#8f207c',
  },
  PointOfInterest :{
    color: '#487197',
  },
  Tour :{
    color: '#418a45',
  },
  RentalAccommodation :{
    color: '#a13628',
  } 
}  as const;

// Derive the type from the data — no need to maintain both separately
export type ThemeKey = keyof typeof globalTheme;

export const getTheme = (key: ThemeKey) => ({
  key,
  ...globalTheme[key],
});