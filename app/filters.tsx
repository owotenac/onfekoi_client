import { Checkbox } from '@/components/checkbox';
import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import { Type } from '@/model/products';
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Filters() {

    const { filters } = useLocalSearchParams();
    const currentFilter = productFilterStore((state) => state.currentProductFilter);
    const setProductFilter = productFilterStore((state) => state.setProductFilter);

    const productFilters = useMemo(() => {
        try {
            return filters ? JSON.parse(filters as string) : {};
        } catch (error) {
            console.error('Error parsing filters:', error);
            return {};
        }
    }, [filters]);

    // Initialize with a function to ensure it only runs once
    const [tempFilter, setTempFilter] = useState<Type[]>(() => currentFilter);

    const toggle = (filterType: Type) => {
        setTempFilter((current) => {
            const exists = current.some((filter) => filter.key === filterType.key);

            if (exists) {
                return current.filter((filter) => filter.key !== filterType.key);
            } else {
                return [...current, filterType];
            }
        });
    }

    const search = () => {

        setProductFilter(tempFilter);
        console.log("search with filters:", tempFilter)
        router.back()
    }

    return (
        <SafeAreaProvider style={global_styles.container}>
            <SafeAreaView style= {{width:"95%", margin: 10, gap:10}}>
                <View style={styles.group_checkbox}>
                    {Object.entries(productFilters).map(([label, value]) => {
                        return (
                            <Checkbox
                                key={String(value)}
                                label={label}
                                checked={tempFilter.some((filter) => filter.key === value)}
                                onToggle={() => toggle({ key: String(value), label })}
                            />
                        );
                    })}
                </View>
                <TouchableOpacity onPress={search}>
                    <View style={styles.button}>
                        <Text style={styles.button_text}>Rechercher</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    group_checkbox: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#33334d",
        backgroundColor: "#222232",
        padding: 10,
        fontFamily: "f-regular",
        width: '100%',
    },
    group_text: {
        fontSize: 20,
        fontFamily: "f-regular",
        color: 'white',
        marginBottom: 20
    },
    button: { backgroundColor: '#296597', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 15 },
    button_text: { color: 'white', fontWeight: 'bold', textAlign: 'center' }
})