import ProductCard from '@/components/product_card';
import ProductCardSponsored from '@/components/product_card_sponsored';
import { ProductProps } from '@/model/products';
import React, { useEffect, useState, } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { injectAdSlots } from '../services/ads';

type ItemListProps = {
    products: ProductProps[];
    loadMore: () => void;
    loading: boolean;
}
type ListItem =
    | { type: 'item'; data: ProductProps }
    | { type: 'ad'; id: string };

export default function ItemList({ products, loadMore, loading }: ItemListProps) {
    const [items, setItems] = useState<ListItem[]>([]);

    const renderItem = ({ item }: { item: ListItem }) => {
        if (item.type === 'ad') {
            // return <AdCard />;
            return <ProductCardSponsored/>
        }
        return <ProductCard {...item.data} />;
    };

    useEffect(() => {
        const i = injectAdSlots(products)
        setItems(i)

    }, [])

    return (

        <View style={styles.content}>
            <FlatList style={styles.list}
                data={items}
                numColumns={1}
                renderItem={renderItem
                    // ({ item }) => (
                    //     <ProductCard {...item} />
                    // )
                }
                onEndReached={loadMore}
                onEndReachedThreshold={2}
                windowSize={4}
                ListFooterComponent={() => (
                    <View>
                        {loading && <ActivityIndicator size="large" />}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        margin: 10,
    },
    list: {
        flex: 1,
    }
})  