import { ProductProps } from '@/model/products';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Linking, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const QuickActionsBar = (item: ProductProps) => {
  
  const handleCall = () => {
    if (item.contact.telephone) Linking.openURL(`tel:${item.contact.telephone}`);
  };

  const handleMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const url = `${scheme}${item.address.streetAddress + ', ' + item.address.city}`;
    Linking.openURL(url);
  };

  const handleWeb = () => {
    if (item.contact.homepage) Linking.openURL(item.contact.homepage);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Regarde ce bon plan sur ONFEKOI : ${item.name}\n${item.contact.homepage || ''}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton Appeler */}
      <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
        <View style={[styles.iconCircle, { backgroundColor: '#FF5A5F' }]}>
          <AntDesign name="phone" size={20} color="white" />
        </View>
        <Text style={styles.actionText}>Appeler</Text>
      </TouchableOpacity>

      {/* Bouton Itinéraire */}
      <TouchableOpacity style={styles.actionButton} onPress={handleMap}>
        <View style={[styles.iconCircle, { backgroundColor: '#FFD700' }]}>
          <Entypo name="map" size={20} color="black" />
        </View>
        <Text style={styles.actionText}>Y aller</Text>
      </TouchableOpacity>

      {/* Bouton Site Web */}
      <TouchableOpacity style={styles.actionButton} onPress={handleWeb}>
        <View style={[styles.iconCircle, { backgroundColor: '#4ECDC4' }]}>
          <MaterialCommunityIcons name="web" size={20} color="white" />
        </View>
        <Text style={styles.actionText}>Site web</Text>
      </TouchableOpacity>

      {/* Bouton Partager */}
      <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
        <View style={[styles.iconCircle, { backgroundColor: '#A29BFE' }]}>
        <Ionicons name="paper-plane-outline" size={20} color="white" />          
        </View>
        <Text style={styles.actionText}>Partager</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1E1E26', // Fond légèrement gris pour ressortir du noir
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 10,
    width:"100%"
  },
  actionButton: {
    alignItems: 'center',
    width: 70,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // Ombre pour le relief
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '200',
    fontFamily: 'f-light'
  },
});

export default QuickActionsBar;