import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const NewDeliveryScreen = ({ navigation }) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    // Validação simples
    if (
      !pickupAddress ||
      !deliveryAddress ||
      !recipientName ||
      !recipientPhone ||
      !weight ||
      !value
    ) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Aqui você pode enviar os dados para uma API ou salvá-los localmente
    const deliveryData = {
      pickupAddress,
      deliveryAddress,
      recipient: { name: recipientName, phone: recipientPhone },
      weight: parseFloat(weight),
      value: parseFloat(value),
    };
    console.log('Dados da entrega:', deliveryData);

    // Redirecionar para a próxima tela (ex.: Entregas Ativas)
    // navigation.navigate('ActiveDeliveries', { delivery: deliveryData });
    setError('');
    alert('Entrega criada com sucesso!'); // Placeholder até termos a tela de entregas ativas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Entrega</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Endereço de Coleta</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço de coleta"
        value={pickupAddress}
        onChangeText={setPickupAddress}
      />

      <Text style={styles.label}>Endereço de Entrega</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço de entrega"
        value={deliveryAddress}
        onChangeText={setDeliveryAddress}
      />

      <Text style={styles.label}>Nome do Destinatário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do destinatário"
        value={recipientName}
        onChangeText={setRecipientName}
      />

      <Text style={styles.label}>Telefone do Destinatário</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone do destinatário"
        value={recipientPhone}
        onChangeText={setRecipientPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso da entrega (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor da entrega (R$)"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />

      <Button title="Continuar" onPress={handleContinue} color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#fff' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default NewDeliveryScreen;