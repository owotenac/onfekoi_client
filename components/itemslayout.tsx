// components/ItemsLayout.tsx
import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import React, { JSX } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Props<T> = {
    items: T[];
    loading: boolean;
    searchTxt: string;
    setSearchTxt: (t: string) => void;
    onSearch: () => void;
    onLoadMore: () => void;
    typeFilter: Record<string, string>;
    renderItem: ({ item }: { item: T }) => JSX.Element | null;
    keyExtractor: (item: T, index: number) => string;
}

export default function ItemsLayout<T>({
    items, loading, searchTxt, setSearchTxt,
    onSearch, onLoadMore, typeFilter, renderItem, keyExtractor
}: Props<T>) {
    const currentFilter = productFilterStore((state) => state.currentProductFilter);

    const openFilter = () => {
        router.push({ pathname: '/filters', params: { filters: JSON.stringify(typeFilter) } });
    };

    const openMap = () => {
        router.push({ pathname: '/map' });
    }

    const closeTag = (key: string) => {
        const newFilters = currentFilter.filter((f) => f.key !== key);
        productFilterStore.getState().setProductFilter(newFilters);
    };

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
                        onSubmitEditing={onSearch}
                    />
                    <Pressable style={styles.button_menu} onPress={openFilter}>
                        <MaterialIcons name="filter-list" size={24} color="white" />
                    </Pressable>

                    <Pressable style={styles.button_menu} onPress={openMap}>
                        <Entypo name="map" size={24} color="white" />
                    </Pressable>

                </View>
                <View style={styles.view_tags}>
                    {currentFilter.map((tag) => (
                        <Pressable style={styles.tags} key={tag.key} onPress={() => closeTag(tag.key)}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.tags_text}>{tag.label}</Text>
                                <AntDesign name="close" size={15} color='#3FAE7C' />
                            </View>
                        </Pressable>
                    ))}
                </View>
                <View style={styles.content}>
                    <FlatList
                        style={styles.list}
                        data={items}
                        renderItem={renderItem}
                        onEndReached={onLoadMore}
                        onEndReachedThreshold={2}
                        windowSize={4}
                        keyExtractor={keyExtractor}
                        ListFooterComponent={() => (
                            <View>{loading && <ActivityIndicator size="large" />}</View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
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
    content: {
        flex: 1,
        margin: 10,
    },
    list: {
        flex: 1,
    }
});