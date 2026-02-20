import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const productFilters = {
    'Restaurants': 'FoodEstablishment',
    'Producteurs' : 'Producer',
    'Glacier' : 'IceCreamShop' ,
    'Restauration Rapide' : 'FastFoodRestaurant',
    'Bistrot - Bar à vin' : 'BistroOrWineBar',
    'Café ou salon de thé' : 'CafeOrTeahouse',
    "Brasserie ou taverne" : "BrasserieOrTavern",
    "Restaurant gastronomique" : "GourmetRestaurant"
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

