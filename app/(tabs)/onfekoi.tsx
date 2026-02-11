import MapScreen from '@/components/mapview-component';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import { UserLocation } from '@/services/location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Onfekoi() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<ProductProps[]>([]);

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);

            const location = await UserLocation.getUserLocation()

            // Fetch items based on location
            const result = await BackEndService.getGeolocationItems(
                "ALL",
                location['lat'],
                location['long']
            );

            setItems(result['data']);
            setLoading(false)

        };

        initialize();
    }, []);

    return (
        loading ? <ActivityIndicator size="large" /> : <MapScreen item={items} />
    );
}