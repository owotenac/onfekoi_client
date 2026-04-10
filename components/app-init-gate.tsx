// components/AppInitGate.tsx
import DepartementPickerModal from '@/components/departementpicker-modal';
import React, { JSX } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDepartementInit } from '../hooks/useDepartementInit';
// import { DepartementConfirmModal } from './DepartementConfirmModal';
// import { DepartementPicker } from './DepartementPicker';

export function AppInitGate({ children }: { children: React.ReactNode }): JSX.Element {
    const { status, setStatus, detected, confirmDepartement } = useDepartementInit();
    const [modalVisible, setModalVisible] = React.useState(false);

    const onClose = () => {
        setStatus('ready')
        setModalVisible(false)
    }

    React.useEffect(() => {
        if (status === 'confirm' && detected) {
            confirmDepartement(detected);
        }

        if (status === 'picker') {
            setModalVisible(true);
        }
    }, [status, detected]);

    // Gestion de l'affichage
    if (status === 'loading') {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Geolocalisation en cours...</Text>
                <ActivityIndicator size="large" color="#1273bb" />      </View>
        );
    }

    // Si on doit afficher le picker, on rend la modal 
    // par-dessus un écran vide ou un splashscreen
    if (status === 'picker') {
        return (
            <DepartementPickerModal
                isVisible={modalVisible}
                onClose={() => onClose()}
            />
        );
    }

    return <>{children}</>;
}


const styles = StyleSheet.create({
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
    emptyText: { color: '#BDBDBD', marginBottom: 20 },
});