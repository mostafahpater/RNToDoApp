import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const ErrorModal = ({ visible, onClose, message }:{ visible:boolean, onClose:()=>void, message:string|boolean }) => {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Error</Text>
            <Text style={styles.message}>{message}</Text>
            <Button title="Close" onPress={onClose} color="red" />
          </View>
        </View>
      </Modal>
    );
  };

  export default ErrorModal;

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "red" },
    message: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  });