import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { FormInput } from '../../components/FormInput';
import { Select } from '../../components/Select';
import { AuthService } from '../../services/authService';
import { MOCK_INTERESTS } from '../../utils/mockData';
import { InterestTag } from '../../components/InterestTag';

export const RegisterScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    maritalStatus: '',
    orientation: '',
    interests: [] as string[],
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert('Error', 'Password is required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!formData.age || parseInt(formData.age) < 18) {
      Alert.alert('Error', 'You must be 18 or older to register');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await AuthService.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: parseInt(formData.age),
        maritalStatus: formData.maritalStatus,
        orientation: formData.orientation,
        interests: formData.interests,
        bio: formData.bio,
      });
      // Navigation will be handled by the auth state change in App.tsx
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <FormInput
        label="Name"
        value={formData.name}
        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
        placeholder="Enter your name"
      />

      <FormInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        placeholder="Enter your email"
      />

      <FormInput
        label="Password"
        value={formData.password}
        onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
        placeholder="Enter your password"
        secureTextEntry
      />

      <FormInput
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
        placeholder="Confirm your password"
        secureTextEntry
      />

      <FormInput
        label="Age"
        value={formData.age}
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, '');
          setFormData(prev => ({ ...prev, age: numericValue }));
        }}
        placeholder="Enter your age"
      />

      <Select
        label="Marital Status"
        value={formData.maritalStatus}
        options={[
          { label: 'Single', value: 'single' },
          { label: 'Married', value: 'married' },
          { label: 'Divorced', value: 'divorced' },
          { label: 'Widowed', value: 'widowed' },
        ]}
        onChange={(value) => setFormData(prev => ({ ...prev, maritalStatus: value }))}
      />

      <Select
        label="Orientation"
        value={formData.orientation}
        options={[
          { label: 'Straight', value: 'straight' },
          { label: 'Gay', value: 'gay' },
          { label: 'Lesbian', value: 'lesbian' },
          { label: 'Bisexual', value: 'bisexual' },
          { label: 'Asexual', value: 'asexual' },
          { label: 'Other', value: 'other' },
        ]}
        onChange={(value) => setFormData(prev => ({ ...prev, orientation: value }))}
      />

      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interestsContainer}>
        {MOCK_INTERESTS.map((interest) => (
          <Pressable
            key={interest}
            onPress={() => toggleInterest(interest)}
          >
            <InterestTag
              interest={interest}
              selected={formData.interests.includes(interest)}
            />
          </Pressable>
        ))}
      </View>

      <FormInput
        label="Bio"
        value={formData.bio}
        onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
        placeholder="Tell us about yourself..."
        multiline
      />

      <Pressable
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Create Account</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>
          Already have an account? Log In
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});