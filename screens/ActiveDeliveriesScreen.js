import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const ActiveDeliveriesScreen = ({ navigation, activeDeliveries, markDeliveryAsCompleted }) => {
  const renderDeliveryItem = ({ item }) => (
    <View style={styles.deliveryCard}>
      <Text style={styles.cardTitle}>Entrega #{item.id}</Text>
      <Text style={styles.cardText}>Coleta: {item.pickupAddress}</Text>
      <Text style={styles.cardText}>Entrega: {item.deliveryAddress}</Text>
      <Text style={styles.cardText}>Destinatário: {item.recipient.name}</Text>
      <Text style={styles.cardText}>Telefone: {item.recipient.phone}</Text>
      <Text style={styles.cardText}>Peso: {item.weight} kg</Text>
      <Text style={styles.cardText}>Valor: R$ {item.value.toFixed(2)}</Text>
      <Button
        title="Marcar como Concluída"
        onPress={() => markDeliveryAsCompleted(item.id)}
        color="#28a745"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entregas Ativas</Text>
      {activeDeliveries.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma entrega ativa no momento.</Text>
      ) : (
        <FlatList
          data={activeDeliveries}
          renderItem={renderDeliveryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center', color: '#666', marginTop: 20 },
  list: { paddingBottom: 20 },
  deliveryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cardText: { fontSize: 14, color: '#333', marginBottom: 5 },
});

export default ActiveDeliveriesScreen;