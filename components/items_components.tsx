import ItemList from '@/components/item_list';
import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type ItemComponentProps = {
    type: string //type of item
    typeFilter: Record<string, string> //list of filters
}

export default function ItemsComponents({ type, typeFilter }: ItemComponentProps) {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<ProductProps[]>([]);
    const [nextPage, setNextPage] = useState('');
    const [searchTxt, setSearchTxt] = useState('');
    const currentFilter = productFilterStore((state) => state.currentProductFilter);
   const mainType = productFilterStore((state) => state.mainType);
    
   useEffect(() => {
        if (type === mainType) {
            fetchItems();
        }
       
    }, [currentFilter]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            //get the products from backend
            const result = await BackEndService.getItems(type);
            setItems(result['data']);
            setNextPage(result["next"]);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };



    const loadMore = async () => {
        if (loading || !nextPage) return;

        setLoading(true);
        const result = await BackEndService.getNextPage(nextPage);
        setItems((prev) => [...prev, ...result['data']]);
        setNextPage(result["next"]);
        setLoading(false);
    }

    const search = async () => {
        setLoading(true);
        const result = await BackEndService.searchItems(searchTxt, type);
        setItems(result['data']);
        setNextPage(result["next"]);
        setLoading(false);
    }

    const openFilter = () => {
        router.push({
            pathname: '/filters',
            params: {
                filters: JSON.stringify(typeFilter)
            }
        });
    }

    const closeTag = (key: string) => {
        const newFilters = currentFilter.filter((filter) => filter.key !== key);
        productFilterStore.getState().setProductFilter(newFilters);
        // Refetch items with updated filters
        setLoading(true);
        fetchItems();
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
                        <MaterialIcons name="filter-list" size={24} color="white" />
                    </Pressable>
                </View>
                <View style={styles.view_tags}>
                    {currentFilter.map((tag, index) => (
                        <Pressable  style={[styles.tags, {borderColor:"#3FAE7C"}]} key={tag.key} onPress={() => closeTag(tag.key)}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.tags_text}>
                                    {tag.label}
                                </Text>
                                <AntDesign name="close" size={15} color='#3FAE7C' />
                            </View>
                        </Pressable>
                    ))}
                </View>
                { !loading && 
                <ItemList
                    products={items}
                    loadMore={loadMore}
                    loading={loading}
                />
                }
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({

    search_view: {
        padding: 5,
        height: 50,
        //marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
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
    },
    view_tags: {
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 5,
        marginBottom: 10,
        width: '100%'
    },
    tags: {
        borderWidth: 1,
        borderColor: '#3FAE7C',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
    },
    tags_text: {
        fontSize: 14,
        color: '#3FAE7C',
        fontWeight: '500',
        marginRight: 5
    },

})  