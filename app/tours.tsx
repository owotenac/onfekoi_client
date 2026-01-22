import ItemList from '@/components/item_list';
import { global_styles } from '@/model/global-css';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Tours() {
    const [loading, setLoading] = useState(true);
    const [ items, setItems] = useState<ProductProps[]>([]);
    const [nextPage, setNextPage] = useState('')

    useEffect(() => {
        const fetchPOI = async () => {
            try {
                //get the products from backend
                const result  = await BackEndService.getTours();
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
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>
                <ItemList
                    products={items}
                    loadMore={loadMore}
                    loading={loading}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    list: {
        flex: 1,
    }
})  