import { Departement } from '@/hooks/useDepartementInit';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    departement: Departement;
    onConfirm: () => void;
    onDismiss: () => void;
};

export function DepartementSuggestionBanner({ departement, onConfirm, onDismiss }: Props) {
    const translateY = useRef(new Animated.Value(-80)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Slide-in depuis le haut
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 60,
                friction: 10,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    function handleDismiss() {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -80,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => onDismiss());
    }

    function handleConfirm() {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -80,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => onConfirm());
    }

    return (
        <Animated.View style={[styles.banner, { transform: [{ translateY }], opacity }]}>
            <View style={styles.iconWrap}>
                <Ionicons name="location" size={16} color="#e8b84b" />
            </View>

            <View style={styles.textWrap}>
                <Text style={styles.label}>
                    Vous êtes dans
                    <Text style={styles.deptName}> {departement.nom} </Text>
                    ?
                </Text>
                <Text style={styles.sub}>Changer de département</Text>
            </View>

            <TouchableOpacity style={styles.btnOui} onPress={handleConfirm} activeOpacity={0.8}>
                <Text style={styles.btnOuiText}>Oui</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnNon} onPress={handleDismiss} activeOpacity={0.7}>
                <Ionicons name="close" size={16} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a2535',
        borderBottomWidth: 0.5,
        //borderBottomColor: 'rgba(232,184,75,0.25)',
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 10,
    },
    iconWrap: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(232,184,75,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    textWrap: {
        flex: 1,
    },
    label: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '400',
    },
    deptName: {
        fontWeight: '600',
        color: '#e8b84b',
    },
    sub: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
        marginTop: 1,
    },
    btnOui: {
        backgroundColor: 'rgba(232,184,75,0.15)',
        borderWidth: 0.5,
        borderColor: 'rgba(232,184,75,0.4)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        flexShrink: 0,
    },
    btnOuiText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#e8b84b',
    },
    btnNon: {
        padding: 4,
        flexShrink: 0,
    },
});