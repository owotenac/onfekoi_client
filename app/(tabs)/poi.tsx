import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Site culturel': 'CulturalSite',
    "Musée": "Museum",
    'Activités sportives': 'SportsAndLeisurePlace',
    'Site naturel': 'NaturalHeritage',
    'Service pratique': "ServiceArea",
    "Parcours de Santé": "FitnessPath",
    "Site religieux": "ReligiousSite",
}

export default function POI() {
    return (
        <ItemsComponents
            type='PointOfInterest'
            typeFilter={productFilters} />
    )
}

const styles = StyleSheet.create({

})  