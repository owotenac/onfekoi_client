import { useFilterStore } from "@/hooks/useFilterStore";
import { BASE_URL_BACKEND, isFeatureEnabled } from "@/model/config";
import { Platform } from "react-native";
import { ProductProps } from "../model/products";


import axios from 'axios';
import { UserLocation } from "./location";

const getBaseURL = () => {
  if (Platform.OS === 'web') {
    if (isFeatureEnabled('isDeployed'))
      return BASE_URL_BACKEND;
    else
      return 'http://127.0.0.1:5002';
  }
  // mobile platforms
  return BASE_URL_BACKEND;
};

export class BackEndService {

  static api = axios.create({
    baseURL: getBaseURL(),
    timeout: 80000,
  });

  static getItems = async (type: string) => {
    if (type == '') {
      throw new Error('type is empty')
    }


    //type of query: products, events, poi, tours
    const params: { [key: string]: string } = {
      'type': type
    };

    //departements
    const department = useFilterStore.getState().department;
    if (department.code.length > 0) {
      params['departement'] = department.code;
    }

    //filter if any
    const filters = useFilterStore.getState().currentProductFilter;
    if (filters.length > 0) {
      params['filters'] = filters.map((filter) => filter.key).join(',');
    }

    //geolocalized results
    if (useFilterStore.getState().geolocalizedResults) {
      const location = await UserLocation.getUserLocation();
      params['lat'] = location.coords.latitude.toString();
      params['lon'] = location.coords.longitude.toString();
    }
    try {
      const { data } = await BackEndService.api.get('/api/catalog', {
        params: params
      });
      if (data?.error) {
        throw new Error(`Backend error: ${data.error}`)
      }

      const products = data['data'] as ProductProps[];
      return {
        'data': products,
        'next': data['meta']['next']
      }

    } catch (error: any) {
      // ✅ Erreur HTTP (4xx, 5xx) : Axios la loge dans error.response
      if (error.response) {
        const status = error.response.status
        const message = error.response.data?.error || 'Erreur inconnue du serveur'
        throw new Error(`Erreur ${status} : ${message}`)
      }
      throw new Error(`Erreur réseau : ${error.message}`)
    }
  };


  static getNextPage = async (url: string) => {
    const { data } = await BackEndService.api.get('/api/next_page', {
      params: {
        url: url
      }
    });
    const products = data['data'] as ProductProps[];

    return {
      'data': products,
      'next': data['meta']['next']
    }
  };
  static getDetailledProduct = async (uuid: string) => {
    const { data } = await BackEndService.api.get('/api/details', {
      params: {
        uuid: uuid
      }
    });
    return data as ProductProps;
  };

  static searchItems = async (keyword: string, type: string) => {
    //type of query: products, events, poi, tours
    const params: { [key: string]: string } = {
      'type': type
    };

    //departements
    const department = useFilterStore.getState().department;
    if (department.code.length > 0) {
      params['departement'] = department.code;
    }

    //filter if any
    const filters = useFilterStore.getState().currentProductFilter;
    if (filters.length > 0) {
      params['filters'] = filters.map((filter) => filter.key).join(',');
    }
    params['search'] = keyword;

    //geolocalized results
    if (useFilterStore.getState().geolocalizedResults) {
      const location = await UserLocation.getUserLocation();
      params['lat'] = location.coords.latitude.toString();
      params['lon'] = location.coords.longitude.toString();
    }

    const { data } = await BackEndService.api.get('/api/search', {
      params: params
    });
    const products = data['data'] as ProductProps[];

    return {
      'data': products,
      'next': data['meta']['next']
    }
  };

  static getGeolocationItems = async (type: string, lat: number, lon: number) => {
    if (type == '') {
      throw new Error('type is empty')
    }
    //type of query: products, events, poi, tours
    const params: { [key: string]: string } = {
      'type': type
    };

    //add user coordinates to the query
    params['lat'] = lat.toString();
    params['lon'] = lon.toString();

    //filter if any
    const filters = useFilterStore.getState().currentProductFilter;
    if (filters.length > 0) {
      params['filters'] = filters.map((filter) => filter.key).join(',');
    }
    const { data } = await BackEndService.api.get('/api/geolocation', {
      params: params
    });
    const products = data['data'] as ProductProps[];
    return {
      'data': products,
      'next': data['meta']['next']
    }
  };

}