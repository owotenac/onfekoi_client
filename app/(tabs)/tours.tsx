import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const tourFilters = {
    'Itinéraire cyclable': 'CyclingTour',
    'Itinéraire pédestre': 'WalkingTour',
    'Itinéraire routier' : 'RoadTour'
}

export default function Tours() {
    return (
        <ItemsComponents
        type='Tour'
        typeFilter={tourFilters} />
    )
}

const styles = StyleSheet.create({

})  