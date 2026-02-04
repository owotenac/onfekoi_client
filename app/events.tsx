import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const eventsFilters = {
    'Evenement Culturel': 'CulturalEvent',
    'Pièce de Théatre': 'TheaterEvent',
    'Evenement Sport': 'SportsEvent',
    'Activités': 'Practice'
}

export default function Events() {
    return (
        <ItemsComponents
        type='EntertainmentAndEvent'
        typeFilter={eventsFilters} />
    )
}

const styles = StyleSheet.create({

})  