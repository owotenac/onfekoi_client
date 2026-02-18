import CarouselImage from '@/components/carousel';
import { global_styles } from '@/model/global-css';
import { ProductProps } from '@/model/products';
import { BackEndService } from '@/services/backend';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import QuickActionsBar from '@/components/toolbar_actions';
import { useFavorites } from '@/services/favorites';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapScreen from '../components/mapscreen';


export default function ProductDetails() {
    const { toggleFavorite, isFavorite } = useFavorites();
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
                setItem(result)

                //navigation.setOptions({ title: result.name });

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
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="calendar-blank" size={24} color="white" />
                    <Text style={styles.date_text}>{displayDate}</Text>
                </View>
                <Text style={styles.date_text}>{item?.openingInfo.additionalInformation}</Text>
            </View>
        )
    }

    const handleBack = () => {
        router.back()
    }
    const handleFavorite = () => {
        if (item) {
            toggleFavorite(item)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>
                {!item ? (
                    <ActivityIndicator size="large" />
                ) :
                    (
                        <View style={{flex: 1}}>

                                {
                                    item.hasRepresentation ?
                                    <CarouselImage
                                        images={item.hasRepresentation}
                                    />
                                    :
                                    <View style={{height:80}}></View>
                                }
                            <View style={styles.floating_toolbar}>
                                <TouchableOpacity onPress={handleBack}>
                                <View style={styles.floating_button}>
                                    <MaterialIcons name="arrow-back" size={30} color="white" />
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleFavorite}>
                                <View style={styles.floating_button}>
                                   <Ionicons name="heart-outline" size={30} color= {isFavorite(item.uuid) ? 'red' : "white"}  />
                                </View>
                                </TouchableOpacity>
                            </View>    

                            <View style={{
                                flex:1,
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>


                            <View style={styles.toolbar} >
                                <View style={styles.top_view}>
                                    <Text style={styles.main_text}>{item.name}</Text>
                                    <Text style={styles.description}>{item.address?.zip} - {item.address?.city}</Text>
                                </View>
                            </View>           
                 
                                <QuickActionsBar 
                                    {...item} />
                                <ScrollView style={styles.card}>

                                    <View style={styles.divider} />
                                    <Text style={styles.chapter}>Description</Text>
                                    <Text style={styles.description}>{item.description}</Text>

                                    {/* <View style={styles.divider} />
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
                                    }*/}
                                    {item.openingInfo &&
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.divider} />
                                            <Text style={styles.chapter}>Ouverture</Text>
                                            {openingInfo()}
                                        </View>
                                    } 
                                    {item.address &&
                                        <>
                                            <View style={styles.divider} />
                                            <Text style={styles.chapter}>Localisation</Text>
                                            <Text style={styles.location_text}>{item.address.streetAddress}</Text>
                                            <Text style={styles.location_text}>{item.address.zip} - {item.address.city}</Text>
                                            <View style={{ height: 200, marginTop: 10 }}>
                                                <MapScreen 
                                                items={[item]}
                                                userAsInitialLocation={false}
                                                type={item.mainType}
                                                onRefreshRequest={() => {} }
                                                />
                                            </View>
                                        </>
                                    }                                    
                                    {item.features &&
                                        <View >
                                            <View style={styles.divider} />
                                            <Text style={styles.chapter}>Equipements</Text>

                                            {item.features.map((feature, index) => (
                                                <Text key={feature.key} style={styles.contact_text}>
                                                    {feature.label}
                                                </Text>
                                            ))}
                                        </View>
                                    }


                                </ScrollView>
                            </View>
                        </View>

                    )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    card: {
        //padding: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },
    location_text: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "f-light-italic",
    },
    main_text: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'f-bold',
    },
    description: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "f-light",
        lineHeight: 22
    },
    divider: {
        height: 1,
        borderColor: '#555',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,
    },
    chapter: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: "f-bold"
    },
    row_contact: {
        flexDirection: 'row'
    },
    contact_text: {
        color: "#fff",
        fontSize: 14,
        marginLeft: 20,
        margin: 5,
        fontFamily: "f-regular"
    },
    date_text: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 20,
    },
    toolbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    top_view: {
        padding: 5,
        gap: 5,
        marginBottom: 10,
        marginLeft: 10,
        flexWrap: 'wrap',
        flex:1
        },
        floating_toolbar: {
            flexDirection: "row",
            flex: 1,
            width: "100%",
            justifyContent: "space-between",
            position: "absolute",
            top : 0,
            left: 0,
            padding: 15
        },
        floating_button: {
            backgroundColor: '#0000005b',
            padding: 10,
            borderRadius: 20
        }

})