import DepartementPicker from '@/components/departementpicker';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Profile = ( ) => {
    return (
        <View style={styles.container}>
        <DepartementPicker/>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 15 },
})