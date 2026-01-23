import { Checkbox } from '@/components/checkbox';
import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import { Type } from '@/model/products';
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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
        // Get the function directly when you need it
        setProductFilter(tempFilter);
        console.log("search with filters:", tempFilter)
        router.back()
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>
                <View style={styles.group_checkbox}>
                    <Text style={styles.group_text}>Produits</Text>

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
                <Button title='Search' onPress={search} />
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
    },
    group_text: {
        fontSize: 20,
        fontFamily: "f-regular",
        color: 'white',
        marginBottom: 20
    }
})