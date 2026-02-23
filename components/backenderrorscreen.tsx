import { global_styles } from '@/model/global-css';
import { router } from "expo-router";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BackendErrorProps {
  message?: string
  onRetry: () => void
}

export const BackendErrorScreen = ({ message, onRetry }: BackendErrorProps) => {
  return (
    <View style={global_styles.container}>

      <Text style={styles.icon}>⚠️</Text>

      <Text style={styles.title}>Oups, une erreur est survenue</Text>
      <Text style={styles.subtitle}>Le serveur a rencontré un problème.</Text>

      {message && (
        <View style={styles.errorBox}>
          <Text style={styles.errorLabel}>Détail de l'erreur :</Text>
          <Text style={styles.errorMessage}>{message}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#a1a1a1',
    textAlign: 'center',
    marginBottom: 32,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 16,
    width: '80%',
    marginBottom: 32,
  },
  errorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  errorMessage: {
    fontSize: 13,
    color: '#B91C1C',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})