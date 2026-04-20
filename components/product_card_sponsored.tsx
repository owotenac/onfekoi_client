import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { NativeAd, NativeAdView, NativeAsset, NativeAssetType, NativeMediaView, TestIds } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-5464098617109994/2829423131';


const ProductCardSponsored = () => {

    const [nativeAd, setNativeAd] = useState<NativeAd>();
    const nativeAdRef = useRef<NativeAd | undefined>(undefined);

    useEffect(() => {
        NativeAd.createForAdRequest(AD_UNIT_ID)
            .then(ad => {
                nativeAdRef.current = ad;
                setNativeAd(ad);
            })
            .catch(err => console.error('Ad error:', err));

        return () => {
            nativeAdRef.current?.destroy();
        };
    }, []);

    if (!nativeAd) {
        return null;
    }
    return (
        <NativeAdView
            nativeAd={nativeAd}
            style={styles.card}
        >

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                {nativeAd.icon ? (
                    <NativeAsset assetType={NativeAssetType.ICON}>
                        <Image source={{ uri: nativeAd.icon.url }} style={{ width: 24, height: 24 }} />
                    </NativeAsset>
                ) : null}
                <Text style={{ fontSize: 12, color: 'white' }}>Annonce</Text>
            </View>

            <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text style={styles.main_text}>{nativeAd.headline}</Text>
            </NativeAsset>

            <NativeAsset assetType={NativeAssetType.IMAGE}>
                <NativeMediaView style={{ height: 150, alignSelf: 'center' }} />
            </NativeAsset>

            <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10, backgroundColor: '#615f54', padding: 10, borderRadius: 5 }}>
                    {nativeAd.callToAction}
                </Text>
            </NativeAsset>

        </NativeAdView>
    );
}

export default ProductCardSponsored

const styles = StyleSheet.create({
    card: {
        borderColor: "#33334d",
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#222232",
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    location_text: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "f-light-italic",
        marginTop: 5,
        marginBottom: 10
    },
    main_text: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        //fontFamily: 'f-bold'
        marginBottom: 10,
        marginTop: 10
    },
    description: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "f-regular",
    }
})