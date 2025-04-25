import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
        role: 'driver', // Identifica como motorista
      });

      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('driverInfo', JSON.stringify(response.data.user));
        navigation.replace('Main');
      } else {
        setError('Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#fff' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default Login;