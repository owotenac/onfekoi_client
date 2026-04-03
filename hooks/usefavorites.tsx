import { ProductProps } from '@/model/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@onfekoi_favorites';

export interface Favorite {
  uuid: string;
  name: string;
  city: string;
  image: string;
  category: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Charger les favoris au démarrage
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (e) {
      console.error("Erreur lors du chargement des favoris", e);
    }
  };

  const toggleFavorite = async (item : ProductProps) => {
    try {
      let newFavorites = [...favorites];
      const isFav = newFavorites.find(f => f.uuid === item.uuid);

      if (isFav) {
        // On le retire
        newFavorites = newFavorites.filter(f => f.uuid !== item.uuid);
      } else {
        // On l'ajoute (on ne stocke que le strict nécessaire)
        newFavorites.push({
          uuid: item.uuid,
          name: item.name,
          city: `${item.address.zip} - ${item.address.city}`,
          image: item.image,
          category: item.mainType
        });
      }

      setFavorites(newFavorites);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Erreur lors de la sauvegarde", e);
    }
  };

    const removeFavorite = async (uuid : string) => {
    try {
      let newFavorites = [...favorites];
      const isFav = newFavorites.find(f => f.uuid === uuid);
        if (!isFav)
            return

        newFavorites = newFavorites.filter(f => f.uuid !== uuid);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Erreur lors de la sauvegarde", e);
    }
  };

  const isFavorite = (uuid:string) => favorites.some(f => f.uuid === uuid);

  return { favorites, toggleFavorite, isFavorite, removeFavorite ,loadFavorites};
};