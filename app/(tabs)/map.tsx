import MapScreen from '@/components/mapview-component';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Map() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const mainType = productFilterStore.getState().mainType;
        const result = await BackEndService.getGeolocationItems(mainType);

        setItems(result['data']);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchItems();
  }, []); // Added mainType as dependency

  return (
    loading ? <ActivityIndicator size="large" /> : <MapScreen item={items} />
  );
}