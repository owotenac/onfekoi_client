import { productFilterStore } from "@/model/current-filter";
import { ProductProps } from "../model/products";

import axios from 'axios';


export class BackEndService {

  static api = axios.create({
    baseURL: 'http://127.0.0.1:5002',
    timeout: 8000,
    });

    static getProducts = async()  => {
        const filters = productFilterStore.getState().currentProductFilter;
        const params: any = {};
        if (filters.length > 0) {
          params.filters = filters.join(',');
        }
        const { data } = await BackEndService.api.get('/api/products',{
          params: params
        });
        const products = data['data'] as ProductProps[];
        return {
          'data': products,
          'next': data['meta']['next']
        }
    };

    static getNextPage = async(url: string)  => {
        const { data } = await BackEndService.api.get('/api/next_page',{
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
    static getPOI = async()  => {
        const filters = productFilterStore.getState().currentProductFilter;
        const params: any = {};
        if (filters.length > 0) {
          params.filters = filters.join(',');
        }      
        const { data } = await BackEndService.api.get('/api/poi',{
                    params: params
        });
        const products = data['data'] as ProductProps[];

        return {
          'data': products,
          'next': data['meta']['next']
        }
    };
    static getEvents = async()  => {
        const { data } = await BackEndService.api.get('/api/events',{
        });
        const products = data['data'] as ProductProps[];

        return {
          'data': products,
          'next': data['meta']['next']
        }
    };
    static getTours = async()  => {
        const { data } = await BackEndService.api.get('/api/tours',{
        });
        const products = data['data'] as ProductProps[];

        return {
          'data': products,
          'next': data['meta']['next']
        }
    };
    static getDetailledProduct = async(uuid: string)  => {
        const { data } = await BackEndService.api.get('/api/details',{
          params : {
            uuid: uuid
          }
        });
        return data as ProductProps;
    };

    static searchProduct = async(key: string)  => {
        const { data } = await BackEndService.api.get('/api/searchProducts',{
          params : {
            search: key
          }
        });
        const products = data['data'] as ProductProps[];

        console.log(products)
        return {
          'data': products,
          'next': data['meta']['next']
        }
    };
    static searchPOI = async(key: string)  => {
        const { data } = await BackEndService.api.get('/api/searchpoi',{
          params : {
            search: key
          }
        });
        const products = data['data'] as ProductProps[];

        console.log(products)
        return {
          'data': products,
          'next': data['meta']['next']
        }
    };



    
}