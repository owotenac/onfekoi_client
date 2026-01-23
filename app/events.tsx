import ItemsComponents from '@/components/items_components';
import { StyleSheet } from 'react-native';

const eventsFilters = {
    'LLL': 'lll',
    'ADDD': 'ADDD'
}

export default function Events() {
    return (
        <ItemsComponents
        type='events'
        typeFilter={eventsFilters} />
    )
}

const styles = StyleSheet.create({

})  