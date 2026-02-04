import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {

    'Activités': 'Practice'
}

export default function Products() {
    return (
        <ItemsComponents
        type=''
        typeFilter={productFilters} />
    )
}

const styles = StyleSheet.create({

})  

