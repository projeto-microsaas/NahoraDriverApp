import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone do menu

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <Ionicons name="menu" size={30} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Bem-vindo, motorista!</Text>
      {/* Adicione aqui a lista de pedidos existente, se houver */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  menuButton: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: 'center', color: '#333' },
});

export default DashboardScreen;