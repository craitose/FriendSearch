import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

// Import screens
import DiscoveryScreen from './screens/DiscoveryScreen';
import ProfileScreen from './screens/ProfileScreen';

// ... rest of the code remains the same

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

// ... rest of the code remains the same