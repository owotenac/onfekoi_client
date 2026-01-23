import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const tourFilters = {
    'Hebergements': 'RentalAccommodation',
    'Activités': 'Practice'
}

export default function Tours() {
    return (
        <ItemsComponents
        type='tours'
        typeFilter={tourFilters} />
    )
}

const styles = StyleSheet.create({

})  