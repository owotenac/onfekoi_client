import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Hebergements': 'RentalAccommodation',
    'Restaurants': 'FoodEstablishment',
    'Site culturel': 'CulturalSite',
    'Activités sportives': 'SportsAndLeisurePlace',
    'Site naturel': 'NaturalHeritage',
    'Service pratique': "ServiceArea",
    'Producteur' : 'Producer'
}

export default function POI() {
    return (
        <ItemsComponents
        type='poi'
        typeFilter={productFilters} />
    )
}

const styles = StyleSheet.create({

})  