import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native'

import { ProductProps } from '@/model/products';
import ProductCard from '@/components/product_card'

type ItemListProps = {
    products: ProductProps[];
    loadMore: () => void;
    loading: boolean;
}

export default function ItemList({ products, loadMore, loading }: ItemListProps) {

    return (

        <View style={styles.content}>
            <FlatList style={styles.list}
                data={products}
                numColumns={1}
                renderItem={
                    ({ item }) => (
                        <ProductCard {...item} />
                    )
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