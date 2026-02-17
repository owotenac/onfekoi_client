import CategoryButton from '@/components/category_button';
import { productFilterStore } from '@/model/current-filter';
import { getTheme, global_styles } from '@/model/global-css';
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const setMainType = productFilterStore((state) => state.setMainType);
  const setProductFilter = productFilterStore((state) => state.setProductFilter);

  const poi = () => {
    setProductFilter([])
    setMainType('PointOfInterest')
    router.replace({
      pathname: '/poi'
    })
  }
  const tours = () => {
    setProductFilter([])
    setMainType('Tour')
    router.replace({
      pathname: '/tours'
    })
  }
  const events = () => {
    setProductFilter([])
    setMainType('EntertainmentAndEvent')
    router.replace({
      pathname: '/events'
    })
  }
  const foodEstablishment = () => {
    setProductFilter([])
    setMainType('FoodEstablishment')
    router.replace({
      pathname: '/foodEstablishment'
    })
  }
  const rentalAccommodation = () => {
    setProductFilter([])
    setMainType('RentalAccommodation')
    router.replace({
      pathname: '/rentalAccommodation'
    })
  }
  const onfekoi = () => {
    setProductFilter([])
    setMainType('ALL')
    router.replace({
      pathname: '/onfekoi'
    })
  }
  //router.n
  //navigation.setOptions({ hearderShow : false })



  return (
    <SafeAreaProvider style={global_styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%", alignItems: 'center' }}>
        <Image source={require('../../assets/images/onfekoi_logo.png')} style={styles.image} resizeMode="contain" />
        <ScrollView style={{  width: "100%" }}>
            <View style={styles.view_column}>
              {/* <View style={styles.view_row}> */}
              <CategoryButton
                title="ONFEKOI dans le coin"
                imageSource={require('@/assets/images/map.jpg')}
                accentColor={getTheme('FoodEstablishment').color}
                onPress={onfekoi}
                sizeConstrains={false}
              />

              <View style={styles.view_row}>
                <CategoryButton
                  title="On mange"
                  imageSource={require('@/assets/images/mange.jpg')}
                  accentColor={getTheme('ALL').color}
                  onPress={foodEstablishment}
                />
                <CategoryButton
                  title="On visite"
                  imageSource={require('@/assets/images/visite.jpg')}
                  accentColor={getTheme('PointOfInterest').color}
                  onPress={poi}
                />
              </View>
              <View style={styles.view_row}>
                <CategoryButton
                  title="On sort"
                  imageSource={require('@/assets/images/sort.jpg')}
                  accentColor={getTheme('EntertainmentAndEvent').color}
                  onPress={events}
                />
                <CategoryButton
                  title="On bouge"
                  imageSource={require('@/assets/images/bouge.jpg')}
                  accentColor={getTheme('Tour').color}
                  onPress={tours}
                />
              </View>
              <View style={styles.view_row}>
                <CategoryButton
                  title="On dort"
                  imageSource={require('@/assets/images/dors.jpg')}
                  accentColor={getTheme('RentalAccommodation').color}
                  onPress={rentalAccommodation}
                />
              </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  image: {
    width: 300,
    height: 200,
    marginBottom: 15,

  },
  view_column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding:20
    //margin: 30
  },
  view_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },

})