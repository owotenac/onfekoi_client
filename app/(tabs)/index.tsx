import CategoryButton from '@/components/category_button';
import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import { router, useNavigation } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const navigation = useNavigation();
    const setMainType = productFilterStore((state) => state.setMainType);

  const poi = () => {
    setMainType('PointOfInterest')
    router.push({
      pathname: '/poi'
    })
  }
  const tours = () => {
    setMainType('Tour')
    router.push({
      pathname: '/tours'
    })
  }
  const events = () => {
    setMainType('EntertainmentAndEvent')
    router.push({
      pathname: '/events'
    })
  }
  const foodEstablishment = () => {
    setMainType('FoodEstablishment')    
    router.push({
      pathname: '/foodEstablishment'
    })
  }
  const rentalAccommodation = () => {
    setMainType('RentalAccommodation')    
    router.push({
      pathname: '/rentalAccommodation'
    })
  }

  //router.n
  //navigation.setOptions({ hearderShow : false })



  return (
    <SafeAreaProvider>
      <SafeAreaView style={global_styles.container}>
        <Image source={require('../../assets/images/onfekoi_logo.png')} style={styles.image} resizeMode="contain" />
        <View style={styles.view_column}>
          <View style={styles.view_row}>
            <CategoryButton
              title="On mange"
              imageSource={require('@/assets/images/mange.jpg')}
              accentColor='#FFA500'
              onPress={foodEstablishment}
            />
            <CategoryButton
              title="On visite"
              imageSource={require('@/assets/images/visite.jpg')}
              accentColor='#487197'
              onPress={poi}
            />
          </View>
          <View style={styles.view_row}>
            <CategoryButton
              title="On sort"
              imageSource={require('@/assets/images/sort.jpg')}
              accentColor='#8f207c'
              onPress={events}
            />
            <CategoryButton
              title="On bouge"
              imageSource={require('@/assets/images/bouge.jpg')}
              accentColor='#418a45'
              onPress={tours}
            />
          </View>
          <View style={styles.view_row}>
            <CategoryButton
              title="On dort"
              imageSource={require('@/assets/images/dors.jpg')}
              accentColor='#a13628'
              onPress={rentalAccommodation}
            />            
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  button: {
    //marginBottom: 10,
    //height: 100,
    //width: 150,
    //backgroundColor: '#9982ec',//'#313168',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  button_text: {
    color: 'white',
    fontSize: 25,
    fontFamily: "f-regular",
    backgroundColor: "#00000033",
    width: "100%",
    textAlign: 'center',
    padding:5
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 30,
    
  },
  image_button: {
    width: 200,
    height: 200,
    marginBottom: 30,
        borderRadius: 30,
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