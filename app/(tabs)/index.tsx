import CategoryButton from '@/components/category_button';
import { productFilterStore } from '@/model/current-filter';
import { global_styles, globalTheme } from '@/model/global-css';
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const setMainType = productFilterStore((state) => state.setMainType);
  const setProductFilter = productFilterStore((state) => state.setProductFilter);

  const poi = () => {
    setProductFilter([])
    setMainType(globalTheme['poi']['key'])
    router.push({
      pathname: '/poi'
    })
  }
  const tours = () => {
    setProductFilter([])
    setMainType(globalTheme['tours']['key'])
    router.push({
      pathname: '/tours'
    })
  }
  const events = () => {
    setProductFilter([])
    setMainType(globalTheme['events']['key'])
    router.push({
      pathname: '/events'
    })
  }
  const foodEstablishment = () => {
    setProductFilter([])
    setMainType(globalTheme['food']['key'])
    router.push({
      pathname: '/foodEstablishment'
    })
  }
  const rentalAccommodation = () => {
    setProductFilter([])
    setMainType(globalTheme['rental']['key'])
    router.push({
      pathname: '/rentalAccommodation'
    })
  }
  const onfekoi = () => {
    setProductFilter([])
    setMainType(globalTheme['onfekoi']['key'])
    router.push({
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
                accentColor={globalTheme['onfekoi']['color']}
                onPress={onfekoi}
                sizeConstrains={false}
              />

              <View style={styles.view_row}>
                <CategoryButton
                  title="On mange"
                  imageSource={require('@/assets/images/mange.jpg')}
                  accentColor={globalTheme['food']['color']}
                  onPress={foodEstablishment}
                />
                <CategoryButton
                  title="On visite"
                  imageSource={require('@/assets/images/visite.jpg')}
                  accentColor={globalTheme['poi']['color']}
                  onPress={poi}
                />
              </View>
              <View style={styles.view_row}>
                <CategoryButton
                  title="On sort"
                  imageSource={require('@/assets/images/sort.jpg')}
                  accentColor={globalTheme['events']['color']}
                  onPress={events}
                />
                <CategoryButton
                  title="On bouge"
                  imageSource={require('@/assets/images/bouge.jpg')}
                  accentColor={globalTheme['tours']['color']}
                  onPress={tours}
                />
              </View>
              <View style={styles.view_row}>
                <CategoryButton
                  title="On dort"
                  imageSource={require('@/assets/images/dors.jpg')}
                  accentColor={globalTheme['rental']['color']}
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