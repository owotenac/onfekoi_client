import ItemList from '@/components/item_list';
import { global_styles } from '@/model/global-css';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useFocusEffect } from "expo-router";
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const productFilters = {
    'Site culturel': 'CulturalSite',
    'Activités sportives': 'SportsAndLeisurePlace',
    'Site naturel': 'NaturalHeritage'
}

export default function POI() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<ProductProps[]>([]);
    const [nextPage, setNextPage] = useState('')
    const [searchTxt, setSearchTxt] = useState('');

    const fetchPOI = async () => {
        try {
            setLoading(true);

            //get the products from backend
            const result = await BackEndService.getPOI();
            setItems(result['data'])
            setNextPage(result["next"])

            setLoading(false);

        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false); // Don't forget to stop loading on error!
        }
    };

    // Use useFocusEffect to refetch when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchPOI();
        }, [])
    );

    const loadMore = async () => {
        if (loading || !nextPage) return;

        setLoading(true)
        //get the products from backend
        const result = await BackEndService.getNextPage(nextPage);
        setItems((prev) => [...prev, ...result['data']]);
        setNextPage(result["next"])
        setLoading(false)
    }

    const search = async () => {
        console.log("search");
        setLoading(true);
        const result = await BackEndService.searchPOI(searchTxt);
        setItems(result['data']);
        setNextPage(result["next"]);
        setLoading(false);
    }

    const openFilter = () => {
        router.push({
            pathname: '/filters',
            params: {
                filters: JSON.stringify(productFilters)
            }
        });
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>
                <View style={styles.search_view}>
                    <TextInput
                        style={styles.search_bar}
                        onChangeText={setSearchTxt}
                        value={searchTxt}
                        placeholder='Rechercher'
                        placeholderTextColor={'#555'}
                        clearButtonMode='always'
                        autoCorrect={false}
                        onSubmitEditing={search}
                    />

                    <Pressable style={styles.button_menu} onPress={openFilter}>
                        <AntDesign name="menu" size={24} color="white" />
                    </Pressable>
                </View>

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
    search_view: {
        padding: 10,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row'
    },
    search_bar: {
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#33334d",
        backgroundColor: "#222232",
        padding: 10,
        fontFamily: "f-regular",
        flex: 1

    },
    button_menu: {
        margin: 5,
        paddingLeft: 5
    }
})  