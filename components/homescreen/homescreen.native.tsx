import BottomBanner from '@/components/bottombanner/bottombanner';
import CategoryButton from '@/components/category_button';
import { DepartementSuggestionBanner } from '@/components/departementsuggestionbanner';
import FooterWeb from '@/components/footer';
import { useDepartementInit } from '@/hooks/useDepartementInit';
import { useFilterStore } from '@/hooks/useFilterStore';
import { getTheme, global_styles } from '@/model/global-css';
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DepartementButton from '../departement-button';


interface Category {
  title: string;
  imageSource: any;
  accentColor: string;
  route?: () => void;
  onPress?: () => void;
}

interface Props {
  categories?: Category[];
}

export default function HomeScreen(props: Props) {
  const { department, setMainType, setProductFilter } = useFilterStore();
  const { status, detected, confirmDepartement, dismissSuggestion } = useDepartementInit();

  const poi = () => {
    setProductFilter([])
    setMainType('PointOfInterest')
    router.push({
      pathname: '/poi'
    })
  }
  const tours = () => {
    setProductFilter([])
    setMainType('Tour')
    router.push({
      pathname: '/tours'
    })
  }
  const events = () => {
    setProductFilter([])
    setMainType('EntertainmentAndEvent')
    router.push({
      pathname: '/events'
    })
  }
  const foodEstablishment = () => {
    setProductFilter([])
    setMainType('FoodEstablishment')
    router.push({
      pathname: '/foodEstablishment'
    })
  }
  const rentalAccommodation = () => {
    setProductFilter([])
    setMainType('RentalAccommodation')
    router.push({
      pathname: '/rentalAccommodation'
    })
  }
  const onfekoi = () => {
    setProductFilter([])
    setMainType('ALL')
    router.push({
      pathname: '/onfekoi'
    })
  }

  const gridButtons = [
    { title: "ONFEKOI dans le coin", imageSource: require('@/assets/images/map.jpg'), accentColor: getTheme('ALL').color, onPress: onfekoi },
    { title: "On mange", imageSource: require('@/assets/images/mange.jpg'), accentColor: getTheme('FoodEstablishment').color, onPress: foodEstablishment },
    { title: "On visite", imageSource: require('@/assets/images/visite.jpg'), accentColor: getTheme('PointOfInterest').color, onPress: poi },
    { title: "On sort", imageSource: require('@/assets/images/sort.jpg'), accentColor: getTheme('EntertainmentAndEvent').color, onPress: events },
    { title: "On bouge", imageSource: require('@/assets/images/bouge.jpg'), accentColor: getTheme('Tour').color, onPress: tours },
    { title: "On dort", imageSource: require('@/assets/images/dors.jpg'), accentColor: getTheme('RentalAccommodation').color, onPress: rentalAccommodation },
  ];

  // Regroupe en paires pour les rows
  const numColumns = 1
  const rows = [];
  for (let i = 0; i < gridButtons.length; i += numColumns) {
    rows.push(gridButtons.slice(i, i + numColumns));
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={global_styles.container}>
        {status === 'confirm' && detected && (
          <DepartementSuggestionBanner
            departement={detected}
            onConfirm={() => confirmDepartement(detected)}
            onDismiss={dismissSuggestion}
          />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ width: '100%' }}>
          <View style={[styles.content]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
              <DepartementButton />
            </View>
            <View style={styles.view_column}>
              <View style={styles.header}>
                <Image source={require('../../assets/images/splash-icon.png')} style={styles.image} resizeMode="contain" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.heroH1}>Quoi faire près de chez toi ?</Text>
                  <Text style={styles.heroSub}>Bons plans, activités et sorties</Text>
                </View>
              </View>

              {/* Grille responsive */}
              {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.view_row}>
                  {row.map((btn, colIndex) => (
                    <CategoryButton
                      key={colIndex}
                      title={btn.title}
                      imageSource={btn.imageSource}
                      accentColor={btn.accentColor}
                      onPress={btn.onPress}
                    />
                  ))}
                </View>
              ))}

            </View>
            <BottomBanner />
          </View>
          <FooterWeb />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    //flex: 1,
    //width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20
  },
  heroH1: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 3,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
  },
  image: {
    width: 150,
    height: 80,
    alignItems: 'center'
  },
  view_column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
    //margin: 30
  },
  view_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    alignSelf: 'stretch'
  },

})