import { productFilterStore } from "@/model/current-filter";
// import { Platform } from "react-native";
import { ProductProps } from "../model/products";

import axios from 'axios';

const getBaseURL = () => {
  // if (Platform.OS === 'android') {
  //   return 'https://onfekoi-server.vercel.app/';
  // }
  // if (Platform.OS === 'web') {
  //   return 'http://127.0.0.1:5002';
  // }
  // // iOS or other platforms
  // return 'http://127.0.0.1:5002';
  return 'https://onfekoi-server.vercel.app/';
};

export class BackEndService {

  static api = axios.create({
    baseURL: getBaseURL(),
    timeout: 80000,
  });

  static getItems = async (type: string) => {
    if (type =='') {
      throw new Error('type is empty')
    }
    //type of query: products, events, poi, tours
    const params: { [key: string]: string } = {
      'type': type
    };

    //filter if any
    const filters = productFilterStore.getState().currentProductFilter;
    if (filters.length > 0) {
      params['filters'] = filters.map((filter) => filter.key).join(',');
    }
    const { data } = await BackEndService.api.get('/api/catalog', {
      params: params
    });
    const products = data['data'] as ProductProps[];
    return {
      'data': products,
      'next': data['meta']['next']
    }
  };
  static getNextPage = async (url: string) => {
    const { data } = await BackEndService.api.get('/api/next_page', {
      params: {
        url: url
      }
    });
    //console.log(data)
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

    //filter if any
    const filters = productFilterStore.getState().currentProductFilter;
    if (filters.length > 0) {
      params['filters'] = filters.map((filter) => filter.key).join(',');
    }
    params['search'] = keyword;
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
    if (type =='') {
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
    const filters = productFilterStore.getState().currentProductFilter;
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