import { Favorite, useFavorites } from '@/services/favorites';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import { Trash2, MapPin } from 'lucide-react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback } from 'react';

export default function FavoritesScreen() {
  const { favorites, removeFavorite , loadFavorites} = useFavorites();

  useFocusEffect(
  useCallback(() => {
    loadFavorites(); // On force la relecture du stockage
  }, [])
);

  const renderFavorite = ( { item }: { item: Favorite } ) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() =>router.push({
            pathname: '/product-details',
            params: { uuid: item.uuid }
        })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.city}>{item.city}</Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => removeFavorite(item.uuid)} 
        style={styles.deleteButton}
      >
        <FontAwesome name="trash-o" size={24} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun favori pour l'instant...</Text>
        <TouchableOpacity style={styles.exploreBtn} onPress= {() => router.push({ pathname: '/(tabs)' })}>
          <Text style={styles.exploreBtnText}>Découvrir l'Hérault</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mes Coups de Cœur</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={item => item.uuid}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 15 },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E26',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    alignItems: 'center',
    paddingRight: 10
  },
  image: { width: 80, height: 80 },
  content: { flex: 1, paddingHorizontal: 15 },
  title: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  city: { color: '#BDBDBD', fontSize: 13, marginLeft: 4 },
  deleteButton: { padding: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  emptyText: { color: '#BDBDBD', marginBottom: 20 },
  exploreBtn: { backgroundColor: '#FF5A5F', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
  exploreBtnText: { color: 'white', fontWeight: 'bold' }
});