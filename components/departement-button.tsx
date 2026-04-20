import { useFilterStore } from '@/hooks/useFilterStore';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DepartementButton() {
    const { department } = useFilterStore();

    return (
        <TouchableOpacity style={styles.departement_button} onPress={() => router.push("/profile")}>
            <View style={styles.dot}></View>
            {department.code != '' ? (
                <Text style={styles.small_title}>{department.nom} - {department.code}</Text>
            ) : <Text style={styles.small_title}>Choisir le departement</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    departement_button: {
        backgroundColor: "#e4db7d38",
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#d9ff00",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        alignSelf: "flex-start"
    },
    dot: {
        backgroundColor: "#1bbe28ff",
        borderRadius: 6,
        width: 12,
        height: 12,
    },
    small_title: {
        fontSize: 12,
        color: "#d9ff00",
    },
})