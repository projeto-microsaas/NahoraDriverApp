import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ handleLogout }) => {
  // Dados fictícios do motorista (substituir por dados reais depois)
  const driverInfo = {
    name: 'João Silva',
    email: 'driver@example.com',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{driverInfo.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{driverInfo.email}</Text>
      </View>
      <Button title="Sair" onPress={handleLogout} color="#ff4444" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  infoContainer: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  info: { fontSize: 16, color: '#666', marginBottom: 15 },
});

export default ProfileScreen;
