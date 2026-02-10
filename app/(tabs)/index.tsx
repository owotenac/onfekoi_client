import CategoryButton from '@/components/category_button';
import { productFilterStore } from '@/model/current-filter';
import { global_styles, globalTheme } from '@/model/global-css';
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const setMainType = productFilterStore((state) => state.setMainType);

  const poi = () => {
    setMainType(globalTheme['poi']['key'])
    router.push({
      pathname: '/poi'
    })
  }
  const tours = () => {
    setMainType(globalTheme['tours']['key'])
    router.push({
      pathname: '/tours'
    })
  }
  const events = () => {
    setMainType(globalTheme['events']['key'])
    router.push({
      pathname: '/events'
    })
  }
  const foodEstablishment = () => {
    setMainType(globalTheme['food']['key'])
    router.push({
      pathname: '/foodEstablishment'
    })
  }
  const rentalAccommodation = () => {
    setMainType(globalTheme['rental']['key'])
    router.push({
      pathname: '/rentalAccommodation'
    })
  }
  const onfekoi = () => {
    setMainType(globalTheme['onfekoi']['key'])
    router.push({
      pathname: '/onfekoi'
    })
  }
  //router.n
  //navigation.setOptions({ hearderShow : false })



  return (
    <SafeAreaProvider>
      <SafeAreaView style={global_styles.container}>
        <Image source={require('../../assets/images/onfekoi_logo.png')} style={styles.image} resizeMode="contain" />
        <ScrollView>
        <View style={styles.view_column}>
          {/* <View style={styles.view_row}> */}
            <CategoryButton
              title="ONFEKOI dans le coin"
              imageSource={require('@/assets/images/map.jpg')}
              accentColor= {globalTheme['onfekoi']['color']}
              onPress={onfekoi}
              sizeConstrains = {false}
            />

          {/* </View> */}
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
    padding: 5
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