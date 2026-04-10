import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DepartementPicker from './departementpicker';

interface Props {
    isVisible: boolean;
    onClose?: () => void;
}

export default function DepartementPickerModal({ isVisible, onClose }: Props) {



    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="pageSheet" // Style iOS élégant, ignoré sur Android
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.modalContainer}>

                <DepartementPicker />

{/* disabled={department.code === ''} */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose} > 
                    <Text style={{ color: '#fff' }}>Fermer</Text>
                </TouchableOpacity>
                
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: '#121212', padding: 15 },
    closeButton: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#1e293b'
    }
})