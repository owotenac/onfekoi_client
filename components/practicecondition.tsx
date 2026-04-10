import { PracticeCondition } from '@/model/products';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DIFFICULTY_LABELS: Record<string, string> = {
    EasyDifficultyTour: 'Facile',
    MediumDifficultyTour: 'Moyenne',
    HardDifficultyTour: 'Difficile',
    VeryHardDifficultyTour: 'Très difficile',
};

const LOCOMOTION_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
    WalkingMode: 'user',
    CyclingMode: 'trending-up',
    Horseback: 'wind',
    OffRoad: 'truck',
};

type Props = {
    practiceCondition: PracticeCondition;
};

export default function PracticeConditionView({ practiceCondition }: Props) {
    const { difficultyLevel, durationDays, locomotionMode, hasRepresentation } = practiceCondition;

    const filesUrl = hasRepresentation.map(rep => rep.locator)

    const difficultyLabel = DIFFICULTY_LABELS[difficultyLevel?.key] ?? difficultyLevel?.label;
    const locomotionIcon = LOCOMOTION_ICONS[locomotionMode?.key] ?? 'compass';

    const getTextWithExtention = (url: string) => {
        const extention = url.split('.').pop()
        return `Télécharger ${extention?.toUpperCase()}`
    }

    const formatDuration = (durationDays: string) => {
        const d = parseFloat(durationDays);
        if (d < 1) return 'Demi-journée';
        if (d === 1) return '1 jour';
        return `${d} jours`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Conditions de pratique</Text>
            <View style={styles.row}>
                {!!difficultyLevel && (
                    <View style={styles.badge}>
                        <View style={[styles.iconCircle, { backgroundColor: '#EEEDFE' }]}>
                            <Feather name="star" size={18} color="#534AB7" />
                        </View>
                        <View>
                            <Text style={styles.label}>Difficulté</Text>
                            <Text style={styles.value}>{difficultyLabel}</Text>
                        </View>
                    </View>
                )}

                {!!durationDays && (
                    <View style={styles.badge}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E1F5EE' }]}>
                            <Feather name="clock" size={18} color="#0F6E56" />
                        </View>
                        <View>
                            <Text style={styles.label}>Durée</Text>
                            <Text style={styles.value}>{formatDuration(durationDays)}</Text>
                        </View>
                    </View>
                )}

                {!!locomotionMode && (
                    <View style={styles.badge}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FAEEDA' }]}>
                            <Feather name={locomotionIcon} size={18} color="#854F0B" />
                        </View>
                        <View>
                            <Text style={styles.label}>Mode</Text>
                            <Text style={styles.value}>{locomotionMode.label}</Text>
                        </View>
                    </View>
                )}

                {!!filesUrl && filesUrl.map((url, index) => (
                    <TouchableOpacity key={index} style={styles.badgeButton} onPress={() => Linking.openURL(url)}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E6F1FB' }]}>
                            <Feather name="download" size={18} color="#185FA5" />
                        </View>
                        <View>
                            <Text style={styles.label}>Trace</Text>
                            <Text style={[styles.value, { color: '#185FA5' }]}>{getTextWithExtention(url)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        //alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 12,
        textAlign: 'left'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
        flex: 1
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.12)',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    badgeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1.5,
        borderColor: 'rgb(33, 110, 173)',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 11,
        color: '#888',
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
});