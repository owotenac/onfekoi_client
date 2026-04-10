import { useFilterStore } from "@/hooks/useFilterStore";
import { Departement } from "@/model/departement";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@onfekoi_departement';

export type InitStatus =
  | 'loading'
  | 'ready'           // département connu, on peut afficher le contenu
  | 'confirm'         // géoloc OK, en attente de confirmation utilisateur
  | 'picker';         // refus géoloc ou erreur → sélection manuelle

export function useDepartementInit() {
  const { setDepartment } = useFilterStore();
  const [status, setStatus] = useState<InitStatus>('loading');
  const [detected, setDetected] = useState<Departement | null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      // 1. Vérifier AsyncStorage
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDepartment(JSON.parse(saved));
        setStatus('ready');
        return;
      }

      // 2. Demander la géoloc
      const { status: perm } = await Location.requestForegroundPermissionsAsync();
      if (perm !== 'granted') {
        setStatus('picker');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // 3. Reverse geocoding via API Geo gouv
      const { latitude, longitude } = location.coords;
      const res = await fetch(
        `https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=departement&format=json`
      );
      const data = await res.json();

      if (data?.[0]?.departement) {
        const dep: Departement = {
          code: data[0].departement.code,
          nom: data[0].departement.nom,
        };
        setDetected(dep);
        setStatus('confirm'); // affiche la modale de confirmation
      } else {
        setStatus('picker');
      }
    } catch (e) {
      console.warn('useDepartementInit error:', e);
      setStatus('picker');
    }
  }

  async function confirmDepartement(dep: Departement) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dep));
    setDepartment(dep);
    setStatus('ready');
  }

  async function resetDepartement() {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setStatus('picker');
  }

  return { status, setStatus, detected, confirmDepartement, resetDepartement };
}