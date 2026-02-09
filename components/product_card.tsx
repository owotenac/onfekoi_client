import Creator_component from '@/components/creator_component';
import { productFilterStore } from '@/model/current-filter';
import { ProductProps, Type } from '@/model/products';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import React from 'react';

function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

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
                <Creator_component name={item.createdBy} />
                <Text style={styles.main_text}>{item.name}</Text>
                <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <View style = {styles.interaction_view} >
                    <Ionicons name="heart-outline" size={24} color="white" />
                    <Text style={styles.like_text}>{getRandomNumber()}</Text>                    
                    <MaterialIcons name="share" size={24} color="white" />
                </View>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
                    {item.type.map((tag, index) => (
                        <Pressable style={styles.tags} key={tag.key} onPress={() => clickTag({ key: String(tag.key), label: tag.label })}>
                            <Text style={styles.tags_text}>
                                #{tag.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                {/* <View style={styles.divider} /> */}
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
        fontFamily: "f-regular"
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
    interaction_view : {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'flex-end', 
        marginTop: 5,
        marginBottom: 10,
        gap: 2,
    }, 
    like_text : {
        fontSize: 10,
        color: 'white',
        marginRight: 15,
        verticalAlign: 'bottom'
    }
})