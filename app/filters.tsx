import { Checkbox } from '@/components/checkbox';
import { productFilterStore } from '@/model/current-filter';
import { global_styles } from '@/model/global-css';
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Filters() {

    const { filters } = useLocalSearchParams();
    const productFilters = filters ? JSON.parse(filters as string) : {};

    // Initialize with current filter from store so user sees their previous selections
    //const currentFilter = productFilterStore((state) => state.currentProductFilter);
    //const [tempFilter, setTempFilter] = useState<string[]>(currentFilter);
    const [tempFilter, setTempFilter] = useState<string[]>([]);

    const toggle = (id: string) => {
        setTempFilter((current) => {
            if (current.includes(id)) {
                const newFilter = current.filter((fid) => fid !== id);
                return newFilter;
            } else {
                const newFilter = [...current, id];
                return newFilter;
            }
        });
    }

    const search = () => {
        // Get the function directly when you need it
        productFilterStore.getState().setProductFilter(tempFilter);
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
                                checked={tempFilter.includes(String(value))}
                                onToggle={() => toggle(String(value))}
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