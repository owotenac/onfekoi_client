import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Site culturel': 'CulturalSite',
    'Activités sportives': 'SportsAndLeisurePlace',
    'Site naturel': 'NaturalHeritage',
    'Service pratique': "ServiceArea"
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