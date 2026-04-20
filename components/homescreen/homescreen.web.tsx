import CategoryButton from '@/components/category_button';
import { useFilterStore } from '@/hooks/useFilterStore';
import { getTheme } from '@/model/global-css';
import { useRouter } from 'expo-router';
import React from 'react';
import DepartementButton from '../departement-button';
import { HomeScreenProps } from './homescreen.d';

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import FooterWeb from '../footer';

export default function HomeScreen({
    categories,
}: HomeScreenProps) {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const { setMainType, setProductFilter } = useFilterStore();


    const onfekoi = () => {
        setProductFilter([])
        setMainType('ALL')
        router.push({
            pathname: '/onfekoi'
        })
    }


    return (
        <View style={styles.root}>
            {/* Page content */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.page}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
                    <DepartementButton />
                </View>
                <View style={styles.hero}>
                    <Image source={require('../../assets/images/splash-icon.png')} style={styles.image} resizeMode="contain" />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.heroH1}>Quoi faire près de chez toi ?</Text>
                        <Text style={styles.heroSub}>Bons plans, activités et sorties</Text>
                    </View>
                </View>

                {/* Map band */}
                <View style={styles.mapBand}>

                    <CategoryButton
                        title="ONFEKOI dans le coin"
                        imageSource={require('@/assets/images/map.jpg')}
                        accentColor={getTheme('FoodEstablishment').color}
                        onPress={onfekoi}

                    />

                    <View style={styles.mapBtn}>
                        <Text style={styles.mapBtnText}>Voir la carte</Text>
                    </View>
                </View>

                {/* Grid 5 colonnes */}
                <View style={[
                    styles.grid,
                    width >= 500 && { flexDirection: 'row', flexWrap: 'wrap' }
                ]}>
                    {categories?.map((cat) => (
                        <CategoryButton
                            key={cat.title}
                            title={cat.title}
                            imageSource={cat.imageSource}
                            accentColor={cat.accentColor}
                            onPress={cat.route}
                        />
                    ))}
                </View>
                <FooterWeb />
            </ScrollView>
        </View>
    );
}

const BG_CARD = '#141e30';
const BORDER = 'rgba(255,255,255,0.07)';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 2,
        backgroundColor: "#0e1420",
    },
    image: {
        width: 150,
        height: 80,
        marginBottom: 15,
        alignItems: 'center'

    },
    scroll: { flex: 1 },
    page: {
        paddingTop: 24,
        paddingBottom: 40,
    },
    hero: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    heroH1: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 3,
    },
    heroSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.45)',
    },
    mapBand: {
        backgroundColor: BG_CARD,
        borderWidth: 0.5,
        borderColor: BORDER,
        borderRadius: 10,
        height: 252,
        gap: 14,
        padding: 20,
        marginBottom: 20,
        width: '100%',
    },
    mapTitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#fff',
    },
    mapBtn: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.12)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 6,
    },
    mapBtnText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
    },
    grid: {
        gap: 12,
        width: '100%',
        flexDirection: 'column'
    },
    navSpacer: { flex: 1 },
});