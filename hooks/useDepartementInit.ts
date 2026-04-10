// import { useFilterStore } from "@/hooks/useFilterStore";
// import { Departement } from "@/model/departement";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Location from 'expo-location';
// import { useEffect, useState } from 'react';

// const STORAGE_KEY = '@onfekoi_departement';

// export type InitStatus =
//   | 'loading'
//   | 'ready'           // département connu, on peut afficher le contenu
//   | 'confirm'         // géoloc OK, en attente de confirmation utilisateur
//   | 'picker';         // refus géoloc ou erreur → sélection manuelle

// export function useDepartementInit() {
//   const { setDepartment } = useFilterStore();
//   const [status, setStatus] = useState<InitStatus>('loading');
//   const [detected, setDetected] = useState<Departement | null>(null);

//   useEffect(() => {
//     init();
//   }, []);

//   async function init() {
//     try {
//       // 1. Vérifier AsyncStorage
//       const saved = await AsyncStorage.getItem(STORAGE_KEY);
//       if (saved) {
//         setDepartment(JSON.parse(saved));
//         setStatus('ready');
//         return;
//       }

//       // 2. Demander la géoloc
//       const { status: perm } = await Location.requestForegroundPermissionsAsync();
//       if (perm !== 'granted') {
//         setStatus('picker');
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });

//       // 3. Reverse geocoding via API Geo gouv
//       const { latitude, longitude } = location.coords;
//       const res = await fetch(
//         `https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=departement&format=json`
//       );
//       const data = await res.json();

//       if (data?.[0]?.departement) {
//         const dep: Departement = {
//           code: data[0].departement.code,
//           nom: data[0].departement.nom,
//         };
//         setDetected(dep);
//         setStatus('confirm'); // affiche la modale de confirmation
//       } else {
//         setStatus('picker');
//       }
//     } catch (e) {
//       console.warn('useDepartementInit error:', e);
//       setStatus('picker');
//     }
//   }

//   async function confirmDepartement(dep: Departement) {
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dep));
//     setDepartment(dep);
//     setStatus('ready');
//   }

//   async function resetDepartement() {
//     await AsyncStorage.removeItem(STORAGE_KEY);
//     setStatus('picker');
//   }

//   return { status, setStatus, detected, confirmDepartement, resetDepartement };
// }

import { useFilterStore } from '@/hooks/useFilterStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

export type Departement = {
  code: string;
  nom: string;
};

export type InitStatus =
  | 'ready'    // app utilisable immédiatement
  | 'confirm'  // géoloc a détecté un dept différent → bannière
  | 'picker';  // l'utilisateur veut changer manuellement

const STORAGE_KEY = '@onfekoi_departement';
const FALLBACK: Departement = { code: '34', nom: 'Hérault' };

export function useDepartementInit() {
  const setDepartment = useFilterStore((state) => state.setDepartment);
  const department = useFilterStore((state) => state.department);

  const [status, setStatus] = useState<InitStatus>('ready');
  const [detected, setDetected] = useState<Departement | null>(null);

  // Évite de relancer la géoloc si le hook est remonté
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    init();
  }, []);

  async function init() {
    // ------------------------------------------------------------------
    // Étape 1 — AsyncStorage (quasi instantané)
    // L'app est utilisable dès ici, aucun spinner affiché
    // ------------------------------------------------------------------
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const dep: Departement = JSON.parse(saved);
        setDepartment(dep);
        setStatus('ready');
        return; // département connu → pas besoin de géoloc
      }
    } catch (e) {
      console.warn('[DepartementInit] AsyncStorage read error:', e);
    }

    // ------------------------------------------------------------------
    // Étape 2 — Fallback immédiat
    // L'app s'affiche avec l'Hérault pendant que la géoloc tourne en bg
    // ------------------------------------------------------------------
    confirmDepartement(FALLBACK);

    // ------------------------------------------------------------------
    // Étape 3 — Géoloc en arrière-plan (non bloquante)
    // Si le dept détecté est différent du fallback → bannière de suggestion
    // ------------------------------------------------------------------
    detectDepartementInBackground();
  }

  async function detectDepartementInBackground() {
    try {
      const { status: perm } = await Location.requestForegroundPermissionsAsync();
      if (perm !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const dep = await reverseGeocode(
        location.coords.latitude,
        location.coords.longitude
      );

      if (!dep) return;

      // Si le dept détecté est différent de ce qui est affiché → bannière
      const current = useFilterStore.getState().department;
      if (dep.code !== current?.code) {
        setDetected(dep);
        setStatus('confirm');
      }
    } catch (e) {
      // Silencieux : la géoloc est best-effort, l'app fonctionne sans
      console.warn('[DepartementInit] Geoloc error:', e);
    }
  }

  async function reverseGeocode(lat: number, lon: number): Promise<Departement | null> {
    try {
      const res = await fetch(
        `https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lon}&fields=departement&format=json`
      );
      const data = await res.json();
      if (data?.[0]?.departement) {
        return {
          code: data[0].departement.code,
          nom: data[0].departement.nom,
        };
      }
      return null;
    } catch (e) {
      console.warn('[DepartementInit] Reverse geocode error:', e);
      return null;
    }
  }

  // ------------------------------------------------------------------
  // Actions exposées
  // ------------------------------------------------------------------

  /** Confirme le département détecté (appui sur "Oui" dans la bannière) */
  async function confirmDepartement(dep: Departement) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dep));
    } catch (e) {
      console.warn('[DepartementInit] AsyncStorage write error:', e);
    }
    setDepartment(dep);
    setDetected(null);
    setStatus('ready');
  }

  /** Rejette la suggestion géoloc (appui sur "Non" dans la bannière) */
  function dismissSuggestion() {
    setDetected(null);
    setStatus('ready');
  }

  /** Ouvre le picker de sélection manuelle (depuis le profil par ex.) */
  function openPicker() {
    setStatus('picker');
  }

  /** Ferme le picker sans changer de département */
  function closePicker() {
    setStatus('ready');
  }

  /** Reset complet — utile en dev pour re-tester le flow */
  async function resetDepartement() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('[DepartementInit] AsyncStorage remove error:', e);
    }
    setDepartment(FALLBACK);
    setDetected(null);
    setStatus('ready');
    hasRun.current = false;
  }

  return {
    status,
    detected,
    confirmDepartement,
    dismissSuggestion,
    openPicker,
    closePicker
  };
}