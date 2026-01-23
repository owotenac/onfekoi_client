import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Hebergements': 'RentalAccommodation',
    'Activités': 'Practice',
    'Restaurants': 'FoodEstablishment',
}

export default function Products() {
    return (
        <ItemsComponents
        type='catalog'
        typeFilter={productFilters} />
    )
}

const styles = StyleSheet.create({

})  

