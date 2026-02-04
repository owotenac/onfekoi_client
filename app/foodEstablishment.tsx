import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Restaurants': 'FoodEstablishment',
    'Producteurs' : 'Producer'
}

export default function FoodEstablishment() {

    return (
        <ItemsComponents
        type='FoodEstablishment'
        typeFilter={productFilters} />
    )
}

const styles = StyleSheet.create({

})  

