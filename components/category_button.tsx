import React from 'react';
import { ColorValue, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 2; 

export type CategoryButtonProps = {
    title: string;
    imageSource: any;
    accentColor: ColorValue;
    onPress: () => void;
    sizeConstrains?: boolean
};

export default function CategoryButton ({ title, imageSource, accentColor, sizeConstrains = true,  onPress } : CategoryButtonProps) {
  return (
    <TouchableOpacity style={[styles.card, { width: sizeConstrains ? COLUMN_WIDTH : width - 20}]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>

      <View style={[styles.textContainer, { borderLeftColor: accentColor }]}>
        <Text style={styles.title}>{title}</Text>
        {/* <View style={[styles.indicator, { backgroundColor: accentColor }]} /> */}
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    //width: COLUMN_WIDTH,
    height: 160,
    backgroundColor: '#1E1E26', 
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    height: '65%', // L'image prend un peu plus de la moitié
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    height: '35%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderLeftWidth: 4, // Petit rappel de la couleur du thème sur le côté
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  indicator: {
    height: 3,
    width: 20,
    marginTop: 4,
    borderRadius: 2,
  }
});