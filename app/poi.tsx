import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import ProductCard from '@/components/product_card'
import ItemList from '@/components/item_list'

export default function POI() {
    const [loading, setLoading] = useState(true);
    const [ items, setItems] = useState<ProductProps[]>([]);
    const [nextPage, setNextPage] = useState('')

    useEffect(() => {
        const fetchPOI = async () => {
            try {
                //get the products from backend
                const result  = await BackEndService.getPOI();
                setItems(result['data'])
                setNextPage(result["next"])

                setLoading(false);

            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false); // Don't forget to stop loading on error!
            }
        };

        if (items.length === 0) {
            fetchPOI();
        }
    }, []);

    const loadMore = async () => {
        if (loading)
            return
        setLoading(true)
        //get the products from backend
        const result = await BackEndService.getNextPage(nextPage);
        setItems((prev) => [...prev, ...result['data']]);
        setNextPage(result["next"])
        setLoading(false)
    }

    return (
        <ItemList
        products = {items}
        loadMore={loadMore}
        loading={loading}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#15151D",
        gap: 10
    },
    content: {
        flex: 1,
        margin: 10,
    },

    list: {
        flex: 1,
    }
})  