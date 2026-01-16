import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import ProductCard from '@/components/product_card'

type ItemListProps = {
    products: ProductProps[];
    loadMore: () => void;
    loading: boolean;
}

export default function ItemList({ products, loadMore, loading }: ItemListProps) {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
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

            </SafeAreaView>
        </SafeAreaProvider>
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