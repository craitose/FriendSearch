import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { FormInput } from '../../components/FormInput';
import { AuthService } from '../../services/authService';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      // For testing purposes, accept any non-empty email/password
      await AuthService.login({ email, password });
      // Navigation will be handled by the auth state change in App.tsx
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <FormInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <FormInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Pressable
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonText}>
          Don't have an account? Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});