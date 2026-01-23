import CarouselImage from '@/components/carousel';
import { global_styles } from '@/model/global-css';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar } from '@kolking/react-native-avatar';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetails() {

    const local = useLocalSearchParams();
    const uuid = local.uuid as string;
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<ProductProps | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                //get the products from backend
                const result = await BackEndService.getDetailledProduct(uuid);

                console.log(result)
                setItem(result)

                navigation.setOptions({ title: result.name });

                setLoading(false);

            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false); // Don't forget to stop loading on error!
            }
        };

        if (!item) {
            fetchProducts();
        }
    }, []);

    const openingInfo = () => {

        if (!item)
            return null

        const dateStart = item.openingInfo.validFrom
        const dateEnd = item.openingInfo.validThrough
        const strDate = new Date(dateStart).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long', 
            year: 'numeric'
          })
        const strDateEnd = new Date(dateEnd).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long', 
            year: 'numeric'
          })

        let displayDate = strDate
        // if it's the same date => we display only 1
          if (dateStart != dateEnd)
            displayDate = "Du " + strDate + " au " + strDateEnd

        return (
            <View style={{flex:1}}>
            <Text style={styles.date_text}>{item?.openingInfo.additionalInformation}</Text>
            <View style={{flex:1, flexDirection:'row'}}>
                <MaterialCommunityIcons name="calendar-blank" size={24} color="white" />
                <Text style={styles.date_text}>{displayDate}</Text>
            </View>
            </View>            
        )
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>
                {!item ? (
                    <ActivityIndicator size="large" />
                ) :
                    (
                        <View style={{ flex: 1 }}>
                            {/* <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" /> */}
                            <CarouselImage
                                images={item.hasRepresentation}
                            />
                            <ScrollView style={styles.card}>
                                <View style={styles.view_creator}>
                                    <Avatar
                                        size={30}
                                        name={item.createdBy}
                                        colorize={true} />
                                    <Text style={styles.creator_text}>{item.createdBy}</Text>
                                </View>
                                <Text style={styles.main_text}>{item.name}</Text>
                                <Text style={styles.description}>{item.address.zip} - {item.address.city}</Text>

                                <View style={styles.divider} />
                                <Text style={styles.chapter}>Description</Text>
                                <Text style={styles.description}>{item.description}</Text>

                                <View style={styles.divider} />
                                <Text style={styles.chapter}>Localisation</Text>
                                <Text style={styles.location_text}>{item.address.streetAddress}</Text>
                                <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
                                <View style={styles.divider} />
                                <Text style={styles.chapter}>Contact</Text>
                                {item.contact.name &&
                                    <View style={styles.row_contact}>
                                        <MaterialCommunityIcons name="head-outline" size={24} color="white" />
                                        <Text style={styles.contact_text}>{item.contact.name}</Text>
                                    </View>
                                }

                                {item.contact.homepage &&
                                    <View style={styles.row_contact}>
                                        <MaterialCommunityIcons name="web" size={24} color="white" />
                                        <Text style={styles.contact_text}>{item.contact.homepage}</Text>
                                    </View>
                                }
                                {item.contact.email &&
                                    <View style={styles.row_contact}>
                                        <Entypo name="mail" size={24} color="white" />
                                        <Text style={styles.contact_text}>{item.contact.email}</Text>
                                    </View>
                                }
                                {item.contact.telephone &&
                                    <View style={styles.row_contact}>
                                        <Entypo name="phone" size={24} color="white" />
                                        <Text style={styles.contact_text}>{item.contact.telephone}</Text>
                                    </View>
                                }
                                { item.openingInfo &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.divider} />
                                        <Text style={styles.chapter}>Ouverture</Text>
                                        { openingInfo() }
                                    </View>
                                }
                                {item.features &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.divider} />
                                        <Text style={styles.chapter}>Features</Text>

                                        {item.features.map((feature, index) => (
                                            <Text key={feature.key} style={styles.contact_text}>
                                                {feature.label}
                                            </Text>
                                        ))}
                                    </View>
                                }


                            </ScrollView>
                        </View>
                    )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        padding: 20,
        flex: 1,
        margin: 5,
    },
    image: {
        width: '100%',
        height: 250,
        marginBottom: 10
    },
    view_creator: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
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
    },
    location_text: {
        color: "#8888aa",
        fontSize: 14,
    },
    main_text: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 10
    },
    description: {
        color: "#ccc",
    },
    divider: {
        height: 1,
        borderColor: '#777',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,


    },
    chapter: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'left',
        marginBottom: 10
    },
    row_contact: {
        flexDirection: 'row'
    },
    contact_text: {
        color: "#8888aa",
        fontSize: 14,
        marginLeft: 20,
        margin: 5
    },
    date_text : {
        color: "#8888aa",
        fontSize: 16,
        marginLeft: 20,
    }

})