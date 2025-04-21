import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CustomAlertProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const CustomAlert = ({ visible, onClose, onConfirm }: { visible: boolean, onClose: () => void, onConfirm: () => void }) => {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>로그아웃</Text>
            <Text style={styles.alertMessage}>정말 로그아웃 하시겠습니까?</Text>
            <View style={styles.alertButtons}>
              <TouchableOpacity style={styles.alertButton} onPress={onClose}>
                <Text style={styles.alertButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.alertButton, styles.confirmButton]} onPress={onConfirm}>
                <Text style={[styles.alertButtonText, styles.confirmButtonText]}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertContainer: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    alertTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    alertMessage: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    alertButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    alertButton: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: '#ddd',
    },
    confirmButton: {
      backgroundColor: '#007BFF',
    },
    alertButtonText: {
      fontSize: 16,
      color: 'black',
    },
    confirmButtonText: {
      color: 'white',
    },
  });
  
  export default CustomAlert;