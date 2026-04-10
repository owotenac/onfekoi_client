import { useDepartementInit } from '@/hooks/useDepartementInit';
import { useFilterStore } from '@/hooks/useFilterStore';
import { DEPARTEMENTS } from '@/model/departement';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DepartementPicker() {
    const department = useFilterStore((state) => state.department);
    const { confirmDepartement } = useDepartementInit();
    const [query, setQuery] = React.useState('');

    const onSelect = (item: { regionKey: string, region: string, departementNumber: string, departementName: string }) => {
        confirmDepartement({ code: item.departementNumber, nom: item.departementName })
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return DEPARTEMENTS;
        return DEPARTEMENTS.filter(
            (d) =>
                d.departementName.toLowerCase().includes(q) ||
                d.departementNumber.toLowerCase().startsWith(q)
        );
    }, [query]);

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = item.departementNumber === department.code;

        return (
            <TouchableOpacity onPress={() => onSelect(item)} style={[styles.touchable, isSelected && styles.itemSelected]}>
                <Text style={styles.card_departementNumber}>{item.departementNumber}</Text>
                <View style={styles.card_name_region}>
                    <Text style={styles.card_departementName}>{item.departementName}</Text>
                    <Text style={styles.card_region}>{item.region}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.main_text}>Votre département</Text>
                <Text style={styles.small_text}>{department?.nom || 'Aucun département sélectionné'}</Text>
            </View>

            {/* Searchbar */}
            <View style={styles.searchWrap}>
                <Ionicons name="search" size={16} color="rgba(255,255,255,0.4)" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Nom ou numéro de département..."
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    value={query}
                    onChangeText={setQuery}
                    autoCorrect={false}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    returnKeyType="search"
                />
            </View>

            <FlatList
                style={styles.list}
                data={filtered}
                renderItem={renderItem}
                keyExtractor={(item) => item.departementNumber}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center'
    },
    list: {
        flex: 1,
        marginHorizontal: 12,
    },
    listContent: {
        //alignItems: 'center',
        paddingBottom: 20
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'transparent',
    },
    main_text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    small_text: {
        color: "#bebebe",
        fontSize: 25,
        textAlign: 'center'
    },
    card: {
        padding: 7,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 0.5,
        gap: 15,
        borderRadius: 10,
        borderColor: 'transparent'
    },
    itemSelected: {
        backgroundColor: "#1e3535",
        borderColor: "#78789e",
    },
    card_departementNumber: {
        color: "#5c5c5c",
        fontSize: 17,
        width: 32
    },
    card_departementName: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1
    },
    card_region: {
        color: "#9e9e9e",
        fontSize: 10,
        //alignContent: 'flex-end',
    },
    card_name_region: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        flex: 1
    },
    // Search
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#272829",
        borderWidth: 0.5,
        borderColor: "#78789e",
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 44,
        fontSize: 14,
        color: "#fff",
    },
})