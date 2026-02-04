import Creator_component from '@/components/creator_component';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps, Type } from '@/model/products';
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const ProductCard = (item: ProductProps) => {
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

    return (
        <Pressable
            onPress={openDetails}>
            <View style={styles.card}>
                <Creator_component name={item.createdBy}/>
                <Text style={styles.main_text}>{item.name}</Text>
                <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <Text style={styles.description}>{item.shortDescription}</Text>
                 <View style={styles.divider} />
                 <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 , marginTop: 10}}>
                    {item.type.map((tag, index) => (
                        <Pressable key={tag.key} onPress={() => clickTag({ key: String(tag.key), label: tag.label })}>
                        <Text style={styles.tags}>
                            {tag.label}
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
        color: "#cccce6",
        fontSize: 14,
        fontFamily: "f-light-italic",
        marginTop:5,
        marginBottom:10
    },
    main_text: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'f-bold'
    },
    description: {
        color: "#ccc",
        fontSize: 15,
        fontFamily:"f-regular"
    },
        divider: {
        height: 1,
        borderColor: '#777',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,
    },
    tags: {
        backgroundColor: "#313168",
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: "white",
        fontSize: 14,
        fontFamily: "f-light-italic",
    },
})