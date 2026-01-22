import { ProductProps } from '@/model/products';
import { appStore } from '@/model/state';
import { Avatar } from '@kolking/react-native-avatar';
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const ProductCard = (item: ProductProps) => {

    const { setCurrentProduct } = appStore();

    const openDetails = () => {
        setCurrentProduct(item)
        router.push({
            pathname: '/product-details',
            params: { uuid: item.uuid }
        })
    }

    return (
        <Pressable
            onPress={openDetails}>
            <View style={styles.card}>
                <View style={styles.view_creator}>
                    <Avatar
                        size={30}
                        name={item.createdBy}
                        colorize={true} />
                    <Text style={styles.creator_text}>{item.createdBy}</Text>
                </View>
                <Text style={styles.main_text}>{item.name}</Text>
                <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <Text style={styles.description}>{item.shortDescription}</Text>
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
    view_creator: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,


    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#6666aa',
    },
    creator_text: {
        color: "#fff",
        marginLeft: 10,
        marginTop: 8,
        verticalAlign: 'middle',
        fontSize: 12,
        fontFamily: "f-light"
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
})