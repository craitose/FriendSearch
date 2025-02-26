import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet } from 'react-native';

// Import screens
import DiscoveryScreen from './screens/DiscoveryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import LoginScreen from './screens/auth/LoginScreen';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

// Chat Stack Navigator
const ChatStackNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen 
      name="ChatList" 
      component={ChatListScreen} 
      options={{ headerShown: false }}
    />
    <ChatStack.Screen 
      name="ChatDetail" 
      component={ChatDetailScreen}
    />
  </ChatStack.Navigator>
);

// Main tabs navigator
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
    <Tab.Screen 
      name="Chat" 
      component={ChatStackNavigator} 
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}