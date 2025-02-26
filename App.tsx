import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// Import screens
import DiscoveryScreen from './screens/DiscoveryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';

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

// Main App Component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Create a wrapper component for ProfileScreen to pass props
  const ProfileScreenWithAuth = () => (
    <ProfileScreen setIsAuthenticated={setIsAuthenticated} />
  );

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
      <Tab.Screen name="Profile" component={ProfileScreenWithAuth} />
    </Tab.Navigator>
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen 
                name="Login" 
                component={(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              />
              <Stack.Screen 
                name="Register" 
                component={(props) => <RegisterScreen {...props} onLogin={handleLogin} />}
              />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainTabsNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}