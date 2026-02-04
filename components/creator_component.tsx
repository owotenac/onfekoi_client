import { Avatar } from '@kolking/react-native-avatar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Creator_component({name}: {name: string}) {
  return (
                <View style={styles.view_creator}>
                    <Avatar
                        size={30}
                        name={name}
                        colorize={true} />
                    <Text style={styles.creator_text}>{name}</Text>
                </View>
  )
}

const styles = StyleSheet.create({
    view_creator: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,


    },
    creator_text: {
        color: "#fff",
        marginLeft: 10,
        marginTop: 8,
        verticalAlign: 'middle',
        fontSize: 12,
        fontFamily: "f-light"
    },

})