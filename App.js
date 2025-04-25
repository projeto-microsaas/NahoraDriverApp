import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from './config';
import Login from './screens/Login';
import DashboardScreen from './screens/DashboardScreen';
import NewDeliveryScreen from './screens/NewDeliveryScreen';
import ActiveDeliveriesScreen from './screens/ActiveDeliveriesScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsLoggedIn(true);
          // Carregar entregas da API
          const activeResponse = await axios.get(`${API_BASE_URL}/api/deliveries/active`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setActiveDeliveries(activeResponse.data);

          const completedResponse = await axios.get(`${API_BASE_URL}/api/deliveries/completed`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCompletedDeliveries(completedResponse.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const addDelivery = async (delivery) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(`${API_BASE_URL}/api/deliveries`, delivery, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveDeliveries([...activeDeliveries, response.data]);
    } catch (error) {
      console.error('Error adding delivery:', error);
    }
  };

  const markDeliveryAsCompleted = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.patch(`${API_BASE_URL}/api/deliveries/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const deliveryToComplete = activeDeliveries.find((delivery) => delivery.id === id);
      const updatedActiveDeliveries = activeDeliveries.filter((delivery) => delivery.id !== id);
      setActiveDeliveries(updatedActiveDeliveries);

      const updatedCompletedDeliveries = [...completedDeliveries, deliveryToComplete];
      setCompletedDeliveries(updatedCompletedDeliveries);
    } catch (error) {
      console.error('Error marking delivery as completed:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('driverInfo');
    setIsLoggedIn(false);
  };

  const DrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: { backgroundColor: '#f5f5f5' },
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="NewDelivery"
        component={(props) => <NewDeliveryScreen {...props} addDelivery={addDelivery} />}
        options={{
          title: 'Nova Entrega',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ActiveDeliveries"
        component={(props) => (
          <ActiveDeliveriesScreen
            {...props}
            activeDeliveries={activeDeliveries}
            markDeliveryAsCompleted={markDeliveryAsCompleted}
          />
        )}
        options={{
          title: 'Entregas Ativas',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bicycle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={(props) => <HistoryScreen {...props} completedDeliveries={completedDeliveries} />}
        options={{
          title: 'Histórico',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={(props) => <ProfileScreen {...props} handleLogout={handleLogout} />}
        options={{
          title: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;