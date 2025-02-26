import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Import screens
import DiscoveryScreen from './screens/DiscoveryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';

// Simple Login Screen Component
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});