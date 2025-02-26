import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

// Import screens with default imports
import DiscoveryScreen from './screens/DiscoveryScreen';
import ProfileScreen from './screens/ProfileScreen';

// Simple Login Screen Component
const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome Back</Text>
      
      <Pressable 
        style={{ 
          backgroundColor: '#007AFF', 
          paddingVertical: 12, 
          paddingHorizontal: 32, 
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Log In</Text>
      </Pressable>
    </View>
  );
};

// Simple Register Screen Component
const RegisterScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Create Account</Text>
      
      <Pressable 
        style={{ 
          backgroundColor: '#007AFF', 
          paddingVertical: 12, 
          paddingHorizontal: 32, 
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

// Simple Chat Screen Component
const ChatScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chat Screen</Text>
    </View>
  );
};

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tabs navigator with text labels instead of icons
const MainTabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        // Use text instead of icons
        let label = '';
        if (route.name === 'Discover') {
          label = 'D';
        } else if (route.name === 'Chat') {
          label = 'C';
        } else if (route.name === 'Profile') {
          label = 'P';
        }
        return <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</Text>;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Discover" component={DiscoveryScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabsNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}