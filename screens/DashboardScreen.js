import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Bem-vindo, motorista!</Text>
      <Button
        title="Nova Entrega"
        onPress={() => navigation.navigate('NewDelivery')}
        color="#007AFF"
      />
      {/* Adicione aqui a Sidebar e a lista de pedidos existente, se houver */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: 'center', color: '#333' },
});

export default DashboardScreen;