import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const setProductFilter = productFilterStore((state) => state.setProductFilter);

  const products = () => {
            router.push({
            pathname: '/products'
        })
  }
  const poi = () => {
            router.push({
            pathname: '/poi'
        })
  }
  const tours = () => {
            router.push({
            pathname: '/tours'
        })
  }
  const events = () => {
            router.push({
            pathname: '/events'
        })
  }
  const foodEstablishment = () => {
            router.push({
            pathname: '/foodEstablishment'
        })
  }
  const rentalAccommodation = () => {
            router.push({
            pathname: '/rentalAccommodation'
        })
  }





  return (
    <SafeAreaProvider>
      <SafeAreaView style={global_styles.container}>
        <Image source={require('../assets/images/onfekoi_logo.png')} style={styles.image } resizeMode="contain" />
        <View style={styles.view_column}>
          <View style={styles.view_row}>
          <TouchableOpacity onPress={products} style={styles.button}><Text style={styles.button_text}>Products</Text></TouchableOpacity>
          <TouchableOpacity onPress={poi} style={styles.button}><Text style={styles.button_text}>On visite?</Text></TouchableOpacity>
          </View>
        <View style={styles.view_row}>
          <TouchableOpacity onPress={events} style={styles.button}><Text style={styles.button_text}>On sort?</Text></TouchableOpacity>
          <TouchableOpacity onPress={tours} style={styles.button}><Text style={styles.button_text}>On bouge?</Text></TouchableOpacity>
          </View>
        <View style={styles.view_row}>
          <TouchableOpacity onPress={foodEstablishment} style={styles.button}><Text style={styles.button_text}>On mange?</Text></TouchableOpacity>
          <TouchableOpacity onPress={rentalAccommodation} style={styles.button}><Text style={styles.button_text}>On dort?</Text></TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  button: {
    marginBottom: 10,
    height: 100,
    width: 150,
    backgroundColor: '#313168',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  button_text: {
    color: 'white',
    fontSize: 25,
    fontFamily: "f-regular",
  },
  image: {
    width: 400, 
    height: 300, 
    marginBottom: 30,
  },
  view_column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 30
  },
  view_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },

})