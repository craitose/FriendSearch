import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  TextInput,
  Alert,
} from 'react-native';

// Simple App with direct state management
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Discover');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            setIsLoggedIn(false);
            setActiveTab('Discover');
          }
        },
      ]
    );
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Main App with Tabs
  return (
    <View style={styles.mainContainer}>
      {/* Content Area */}
      <View style={styles.content}>
        {activeTab === 'Discover' && (
          <View style={styles.tabContent}>
            <Text style={styles.title}>Discover</Text>
            <Text>Find friends nearby with similar interests</Text>
          </View>
        )}
        
        {activeTab === 'Chat' && (
          <View style={styles.tabContent}>
            <Text style={styles.title}>Chat</Text>
            <Text>Your conversations will appear here</Text>
          </View>
        )}
        
        {activeTab === 'Profile' && (
          <View style={styles.tabContent}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Welcome, User</Text>
            
            <Pressable 
              style={styles.logoutButton} 
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <Pressable 
          style={[styles.tab, activeTab === 'Discover' && styles.activeTab]} 
          onPress={() => setActiveTab('Discover')}
        >
          <Text style={styles.tabText}>Discover</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.tab, activeTab === 'Chat' && styles.activeTab]} 
          onPress={() => setActiveTab('Chat')}
        >
          <Text style={styles.tabText}>Chat</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.tab, activeTab === 'Profile' && styles.activeTab]} 
          onPress={() => setActiveTab('Profile')}
        >
          <Text style={styles.tabText}>Profile</Text>
        </Pressable>
      </View>
    </View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  tabText: {
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
    width: 200,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});