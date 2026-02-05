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
    backgroundColor: '#ffffffff',
  },
  headerShown: true,
}