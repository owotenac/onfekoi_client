import { StyleSheet, } from 'react-native'


export const global_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        backgroundColor: "#15151D",
        alignContent: 'center',
        alignItems: 'center',
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
  onfekoi : {
    key: 'ALL',
    color: '#1c1485',
  },
  food : {
    key : 'FoodEstablishment',
    color: '#FFA500',
  },
  events :{
    key : 'EntertainmentAndEvent',
    color: '#8f207c',
  },
  poi :{
    key : 'PointOfInterest',
    color: '#487197',
  },
  tours :{
    key : 'Tour',
    color: '#418a45',
  },
  rental :{
    key : 'RentalAccommodation',
    color: '#a13628',
  },


}