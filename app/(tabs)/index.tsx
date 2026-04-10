import BottomBanner from '@/components/bottombanner/bottombanner';
import CategoryButton from '@/components/category_button';
import { DepartementSuggestionBanner } from '@/components/departementsuggestionbanner';
import FooterWeb from '@/components/footer';
import { useDepartementInit } from '@/hooks/useDepartementInit';
import { useFilterStore } from '@/hooks/useFilterStore';
import { getTheme, global_styles } from '@/model/global-css';
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const MAX_CONTENT_WIDTH = 900;
const BREAKPOINT_DESKTOP = 600; // en dessous = mobile, au dessus = desktop


export default function Index() {
  const { width } = useWindowDimensions();
  const { department, setMainType, setProductFilter } = useFilterStore();
  const { status, detected, confirmDepartement, dismissSuggestion } = useDepartementInit();

  const contentWidth = Math.min(width || 375, MAX_CONTENT_WIDTH);
  const numColumns = contentWidth >= BREAKPOINT_DESKTOP ? 2 : 1;
  const GUTTER = 20;
  const PADDING = 40;
  const buttonWidth = (contentWidth - PADDING - GUTTER * (numColumns - 1)) / numColumns;
  //console.log('contentWidth:', contentWidth, 'numColumns:', numColumns, 'buttonWidth:', buttonWidth);

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

  // Boutons à afficher en grille (pas le premier ni le dernier)
  const gridButtons = [
    { title: "On mange", imageSource: require('@/assets/images/mange.jpg'), accentColor: getTheme('ALL').color, onPress: foodEstablishment },
    { title: "On visite", imageSource: require('@/assets/images/visite.jpg'), accentColor: getTheme('PointOfInterest').color, onPress: poi },
    { title: "On sort", imageSource: require('@/assets/images/sort.jpg'), accentColor: getTheme('EntertainmentAndEvent').color, onPress: events },
    { title: "On bouge", imageSource: require('@/assets/images/bouge.jpg'), accentColor: getTheme('Tour').color, onPress: tours },
  ];

  // Regroupe en paires pour les rows
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
          <View style={[styles.content, { width: contentWidth }]}>
            <View style={styles.view_column}>
              <View style={styles.header}>
                <Image source={require('../../assets/images/splash-icon.png')} style={styles.image} resizeMode="contain" />
                <View style={{ gap: 20, flex: 1 }}>
                  <Text style={styles.main_title}>Quoi faire près de chez toi ?</Text>
                  <TouchableOpacity style={styles.departement_button} onPress={() => router.push("/profile")}>
                    <View style={styles.dot}></View>
                    {department.code != '' ? (
                      <Text style={styles.small_title}>{department.nom} - {department.code}</Text>
                    ) : <Text style={styles.small_title}>Choisir le departement</Text>}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bouton pleine largeur */}
              <CategoryButton
                title="ONFEKOI dans le coin"
                imageSource={require('@/assets/images/map.jpg')}
                accentColor={getTheme('FoodEstablishment').color}
                onPress={onfekoi}
                buttonWidth={buttonWidth} // ← on passe la largeur calculée

              />

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
                      buttonWidth={buttonWidth} // ← on passe la largeur calculée
                    />
                  ))}
                </View>
              ))}

              {/* Bouton pleine largeur */}
              <CategoryButton
                title="On dort"
                imageSource={require('@/assets/images/dors.jpg')}
                accentColor={getTheme('RentalAccommodation').color}
                onPress={rentalAccommodation}
                buttonWidth={buttonWidth} // ← on passe la largeur calculée
              />
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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  departement_button: {
    backgroundColor: "#e4db7d38",
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#d9ff00",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    alignSelf: "flex-start"
  },
  dot: {
    backgroundColor: "#1bbe28ff",
    borderRadius: 6,
    width: 12,
    height: 12,
  },
  main_title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 600,
    flexWrap: "wrap",
    flex: 1
  },
  small_title: {
    fontSize: 12,
    color: "#d9ff00",
  },
  image: {
    width: 150,
    height: 100,
    marginBottom: 15,
    alignItems: 'center'

  },
  view_column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20
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