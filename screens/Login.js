import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation, setIsValidToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem('driverToken', token);
      setIsValidToken(true);
      setSuccess('Login bem-sucedido! Redirecionando...');
      setTimeout(() => {
        navigation.replace('Dashboard');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <View style={styles.loginPage}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1580130775562-0de3a72d52cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.loginImageSection}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Entregas rápidas e seguras para os seus clientes</Text>
          <Text style={styles.overlaySubtitle}>Faça entregas com eficiência e segurança</Text>
        </View>
      </ImageBackground>
      <View style={styles.loginFormSection}>
        <View style={styles.loginFormContainer}>
          <Text style={styles.title}>Entrar como Entregador</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Digite seu email"
              placeholderTextColor="#A0AEC0"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Digite sua senha"
              placeholderTextColor="#A0AEC0"
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    flexDirection: 'column',
  },
  loginImageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(26, 60, 90, 0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  overlaySubtitle: {
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
  },
  loginFormSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginFormContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#1A3C5A',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    fontSize: 16,
    color: '#4A5568',
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: '#E53E3E',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  success: {
    color: '#38A169',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#F6A623',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Login;
