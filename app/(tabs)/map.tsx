import MapScreen from '@/components/mapscreen';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import { UserLocation } from '@/services/location';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'; // Ajout de useCallback
import { ActivityIndicator } from 'react-native';

export default function Map() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ProductProps[]>([]);
  const [userLocation, setUserLocation] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          // 
          const location = await UserLocation.getUserLocation();
          
          // 
          const mainType = productFilterStore.getState().mainType;

          // 
          const result = await BackEndService.getGeolocationItems(
            mainType,
            location.coords.latitude,
            location.coords.longitude,
          );
          console.log("reload " + mainType)
          setItems(result['data']);
          setUserLocation(location);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la carte", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => {
        console.log("Clear")
        setLoading(false);
      };

      // Pas besoin de cleanup ici, mais on pourrait reset le loading si on voulait
    }, []) // Le tableau de dépendances vide ici signifie "à chaque focus"
  );

  if (loading && items.length === 0) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <MapScreen 
        key={productFilterStore.getState().mainType}
      items={items} 
      userLocation={userLocation} 
      userAsInitialLocation={true}
      // On passe le type pour forcer le MapScreen à savoir qu'il a changé
      type={productFilterStore.getState().mainType}
    />
  );
}