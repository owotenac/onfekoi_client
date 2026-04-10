// components/ItemsLayout.tsx
import { useFilterStore } from '@/hooks/useFilterStore';
import { global_styles } from '@/model/global-css';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import React, { JSX } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BackendErrorScreen } from './backenderrorscreen';

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
    error?: string | null;

}

export default function ItemsLayout<T>({
    items, loading, searchTxt, setSearchTxt,
    onSearch, onLoadMore, typeFilter, renderItem, keyExtractor, error
}: Props<T>) {
    const currentFilter = useFilterStore((state) => state.currentProductFilter);
    const geoLocalizedResults = useFilterStore((state) => state.geolocalizedResults);

    const openFilter = () => {
        router.push({ pathname: '/filters', params: { filters: JSON.stringify(typeFilter) } });
    };

    const closeTag = (key: string) => {
        const newFilters = currentFilter.filter((f) => f.key !== key);
        useFilterStore.getState().setProductFilter(newFilters);
    };

    const allFilters = () => {
        useFilterStore.getState().setGeolocalizedResults(false);
    };
    const nearFilters = () => {
        useFilterStore.getState().setGeolocalizedResults(true);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>

                {error ? (
                    <BackendErrorScreen message={error} onRetry={onSearch} />
                ) : (
                    <>
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
                        </View>
                        <View style={styles.view_tags}>
                            <TouchableOpacity style={[styles.shortcut, !geoLocalizedResults && styles.shortcut_active]} onPress={allFilters}>
                                <Text style={styles.text_shortcut}>Tous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.shortcut, geoLocalizedResults && styles.shortcut_active]} onPress={nearFilters}>
                                <Text style={styles.text_shortcut}>À proximité</Text>
                            </TouchableOpacity>
                        </View>
                        {currentFilter.length > 0 &&
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
                        }

                        <View style={styles.content}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={styles.list}
                                data={items}
                                renderItem={renderItem}
                                onEndReached={onLoadMore}
                                onEndReachedThreshold={0.5}
                                windowSize={4}
                                keyExtractor={keyExtractor}
                                ListFooterComponent={() => (
                                    <View>{loading && <ActivityIndicator size="large" />}</View>
                                )}
                            />
                        </View>
                    </>
                )}

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
        marginLeft: 10,
        padding: 10,
        borderColor: "#33334d",
        backgroundColor: "#222232",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    view_tags: {
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '100%'
    },
    tags: {
        borderWidth: 1,
        borderColor: '#3FAE7C',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
    },
    tags_text: {
        fontSize: 14,
        color: '#3FAE7C',
        fontWeight: '500',
        marginRight: 5,
        fontFamily: "f-regular",
    },
    content: {
        flex: 1,
        margin: 10,
    },
    list: {
        flex: 1,
    },
    shortcut: {
        borderWidth: 1,
        borderColor: '#616161',
        backgroundColor: '#414141',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 1,
    },
    shortcut_active: {
        //borderColor: '#4a9eff',
        backgroundColor: '#b9ae13',
    },
    text_shortcut: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '500',
        fontFamily: "f-regular",
    }
});