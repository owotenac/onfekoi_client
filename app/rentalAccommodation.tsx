import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Hebergements': 'RentalAccommodation',
}

export default function RentalAccommodation() {

    return (
        <ItemsComponents
        type='RentalAccommodation'
        typeFilter={productFilters} />
    )
}

const styles = StyleSheet.create({

})  

