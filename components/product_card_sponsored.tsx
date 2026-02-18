import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

import { NativeAd, NativeAdView, NativeAsset, NativeAssetType, NativeMediaView, TestIds } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
    ? TestIds.NATIVE
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX'; // ton vrai ID plus tard


const ProductCardSponsored = () => {

    const [nativeAd, setNativeAd] = useState<NativeAd>();

    useEffect(() => {
        NativeAd.createForAdRequest(TestIds.NATIVE)
            .then(setNativeAd)
            .catch(console.error);
    }, []);
    
    useEffect(() => {
        if (!nativeAd) return;
        return () => {
            nativeAd.destroy();
        };
    }, [nativeAd]);

    if (!nativeAd) {
        return null;
    }
    const openDetails = () => {
    }


    return (
        // Wrap all the ad assets in the NativeAdView component, and register the view with the nativeAd prop
        <NativeAdView nativeAd={nativeAd} style={styles.card}>
            {nativeAd.icon && (
                <NativeAsset assetType={NativeAssetType.ICON}>
                    <Image source={{ uri: nativeAd.icon.url }} width={24} height={24} />
                </NativeAsset>
            )}
            <Text style={{ color: 'white' }}>Sponsored</Text>

            <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text style={styles.main_text}>
                    {nativeAd.headline}
                </Text>
            </NativeAsset>
            <NativeMediaView />
        </NativeAdView>

        // <Pressable
        //     onPress={openDetails}>
        //     <View style={styles.card}>
        //         <Creator_component name={item.createdBy} />
        //         <Text style={styles.main_text}>{item.name}</Text>
        //         <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
        //         { item.image &&
        //         <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        //         }
        //         <Text numberOfLines={3} ellipsizeMode='tail' style={styles.description}>{item.shortDescription ? item.shortDescription : item.description}</Text>
        //     </View>
        // </Pressable>
    )
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
        fontFamily: 'f-bold'
    },
    description: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "f-regular",
    },
    divider: {
        height: 1,
        borderColor: '#777',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,
    },
    tags: {
        borderWidth: 1,
        borderColor: '#3FAE7C',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
    },
    tags_text: {
        fontSize: 12,
        color: '#3FAE7C',
        fontWeight: '500',
    },
    interaction_view: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 15,
        gap: 15,
    },
    like_text: {
        fontSize: 12,
        color: 'white',
        marginRight: 15,
        verticalAlign: 'bottom'
    }
})