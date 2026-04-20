import { DepartementSuggestionBanner } from '@/components/departementsuggestionbanner';
import HomeScreen from '@/components/homescreen/homescreen';
import { useDepartementInit } from '@/hooks/useDepartementInit';
import { useFilterStore } from '@/hooks/useFilterStore';
import { getTheme, global_styles } from '@/model/global-css';
import { useRouter } from 'expo-router';
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const MAX_CONTENT_WIDTH = 900;
const BREAKPOINT_DESKTOP = 600; // en dessous = mobile, au dessus = desktop


export default function Index() {
  const { status, detected, confirmDepartement, dismissSuggestion } = useDepartementInit();
  const { setMainType, setProductFilter } = useFilterStore();
  const router = useRouter();

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
    //{ title: "ONFEKOI", imageSource: require('@/assets/images/map.jpg'), accentColor: getTheme('ALL').color, route: onfekoi },
    { title: "On mange", imageSource: require('@/assets/images/mange.jpg'), accentColor: getTheme('ALL').color, route: foodEstablishment },
    { title: "On visite", imageSource: require('@/assets/images/visite.jpg'), accentColor: getTheme('PointOfInterest').color, route: poi },
    { title: "On sort", imageSource: require('@/assets/images/sort.jpg'), accentColor: getTheme('EntertainmentAndEvent').color, route: events },
    { title: "On bouge", imageSource: require('@/assets/images/bouge.jpg'), accentColor: getTheme('Tour').color, route: tours },
    { title: "On dort", imageSource: require('@/assets/images/dors.jpg'), accentColor: getTheme('RentalAccommodation').color, route: rentalAccommodation },
  ];


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

        <HomeScreen categories={gridButtons} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
})