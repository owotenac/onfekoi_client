import { DEPARTEMENTS, REGION_LOGOS } from '@/model/departement';
import { global_styles } from '@/model/global-css';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function UserProfile() {
    const listRef = React.useRef<FlatList>(null);

        // useEffect(() => {
        //     if (listRef.current) {

        //      listRef.current.scrollToIndex({ index: DEPARTEMENTS.findIndex(d => d.departementNumber === '34'), animated: true });
        //     }
        // }, [])


        
    const renderItem = ({ item }: { item: { regionKey: string, region: string, departementNumber: string, departementName: string } }) => {
        const isSelected= item.departementNumber == '34'


        
        return (
            <View style={[styles.card, {borderColor: isSelected ? "#bb5e12" : "#1273bb"}]}>
                <Image
                    source={REGION_LOGOS[item.regionKey as keyof typeof REGION_LOGOS]}
                    style={{ width: 100, height: 100, marginTop: 5, marginBottom: 10 }}
                    resizeMode="contain"
                />
                <Text style={styles.card_departementNumber}>{item.departementNumber}</Text>
                <Text style={styles.card_departementName}>{item.departementName}</Text>
            </View>
        )
    }

    return (
        <View style={global_styles.container}>
            <Text style={styles.main_text}>Les bons plans dans l'Herault (34)</Text>
            <Text style={styles.small_text}>Le contenu arrive bientôt dans les autres département...</Text>
            <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                <FlatList
                ref={listRef}
                    style={styles.list}
                    data={DEPARTEMENTS}
                    renderItem={renderItem}
                    horizontal={true}
                //onEndReached={onLoadMore}
                //onEndReachedThreshold={2}
                //windowSize={4}
                //keyExtractor={index}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    main_text: {
        color: "#fff",
        fontSize: 20,
        fontFamily: 'f-regular',
        marginBottom: 10,
    },
    small_text: {
        color: "#fff",
        fontSize: 12,
        fontFamily: 'f-regular',
    },
    list: {
        flex: 1
    },
    card: {
        width: 120,
        height: 280,
        backgroundColor: "#1273bb",
        borderRadius: 15,
        padding: 5,
        margin: 30,
        alignItems: 'center',
        verticalAlign: 'bottom',
        borderWidth:3,
        borderColor: "#1273bb",
    },
    card_departementNumber: {
        color: "#fff",
        fontSize: 75,
        fontWeight: 800
        //fontFamily: 'f-bold',
    },
    card_departementName: {
        color: "#fff",
        fontSize: 15,
        textAlign: 'center',
    }
})