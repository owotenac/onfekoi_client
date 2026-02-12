import Creator_component from '@/components/creator_component';
import { BASE_URL_CLIENT } from '@/model/config';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps, Type } from '@/model/products';
import { useFavorites } from '@/services/favorites';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import React from 'react';
import { Image, Pressable, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = (item: ProductProps) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const setProductFilter = productFilterStore((state) => state.setProductFilter);

    const openDetails = () => {
        router.push({
            pathname: '/product-details',
            params: { uuid: item.uuid }
        })
    }

    const clickTag = (type: Type) => {
        setProductFilter([type]);
    }

    const handleShare = async () => {
        try {
            const url = `${BASE_URL_CLIENT}product-details?uuid=${item.uuid}`;
            await Share.share({
                message: `Regarde ce bon plan sur ONFEKOI : \n${item.name}\n${url}`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFavorites = async () => {
        toggleFavorite(item)
    };

    return (
        <Pressable
            onPress={openDetails}>
            <View style={styles.card}>
                <Creator_component name={item.createdBy} />
                <Text style={styles.main_text}>{item.name}</Text>
                <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <View style={styles.interaction_view} >
                    <TouchableOpacity onPress={handleFavorites}>
                        <Ionicons name="heart-outline" size={24} color= {isFavorite(item.uuid) ? 'red' : "white"}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        <Ionicons name="paper-plane-outline" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
                <Text numberOfLines={3} ellipsizeMode='tail' style={styles.description}>{item.shortDescription}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
                    {item.type.map((tag) => (
                        <Pressable style={styles.tags} key={tag.key} onPress={() => clickTag({ key: String(tag.key), label: tag.label })}>
                            <Text style={styles.tags_text}>
                                #{tag.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </Pressable>
    )
}

export default ProductCard

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
        marginTop: 5,
        marginBottom: 13,
        gap: 15,
    },
    like_text: {
        fontSize: 12,
        color: 'white',
        marginRight: 15,
        verticalAlign: 'bottom'
    }
})