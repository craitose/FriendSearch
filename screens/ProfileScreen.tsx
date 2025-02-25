import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { FormInput } from '../components/FormInput';
import { Select } from '../components/Select';
import { InterestTag } from '../components/InterestTag';
import { MOCK_INTERESTS } from '../utils/mockData';
import { getCurrentLocation } from '../utils/locationService';
import { UserProfile, ValidationError } from '../types';

const MARITAL_STATUS_OPTIONS = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
];

const ORIENTATION_OPTIONS = [
  { label: 'Straight', value: 'straight' },
  { label: 'Gay', value: 'gay' },
  { label: 'Lesbian', value: 'lesbian' },
  { label: 'Bisexual', value: 'bisexual' },
  { label: 'Asexual', value: 'asexual' },
  { label: 'Other', value: 'other' },
];

export const ProfileScreen = () => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: undefined,
    maritalStatus: undefined,
    orientation: undefined,
    interests: [],
    bio: '',
    searchPreferences: {
      maxDistance: 50,
      ageRange: { min: 18, max: 100 },
      maritalStatuses: [],
      orientations: [],
    },
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      setProfile(prev => ({
        ...prev,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      }));
    }
  };

  const validateProfile = (): ValidationError[] => {
    const newErrors: ValidationError[] = [];

    if (!profile.name?.trim()) {
      newErrors.push({ field: 'name', message: 'Name is required' });
    }

    if (!profile.age || profile.age < 18) {
      newErrors.push({ field: 'age', message: 'Must be 18 or older' });
    }

    if (!profile.maritalStatus) {
      newErrors.push({ field: 'maritalStatus', message: 'Marital status is required' });
    }

    if (!profile.orientation) {
      newErrors.push({ field: 'orientation', message: 'Orientation is required' });
    }

    if (!profile.interests || profile.interests.length === 0) {
      newErrors.push({ field: 'interests', message: 'Select at least one interest' });
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateProfile();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Here we would save the profile to the backend
    Alert.alert('Success', 'Profile saved successfully');
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest],
    }));
  };

  const getError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <FormInput
          label="Name"
          value={profile.name || ''}
          onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
          error={getError('name')}
          placeholder="Enter your name"
        />

        <FormInput
          label="Age"
          value={profile.age?.toString() || ''}
          onChangeText={(text) => {
            const age = parseInt(text);
            if (!isNaN(age) || text === '') {
              setProfile(prev => ({ ...prev, age: age || undefined }));
            }
          }}
          error={getError('age')}
          placeholder="Enter your age"
        />

        <Select
          label="Marital Status"
          value={profile.maritalStatus || ''}
          options={MARITAL_STATUS_OPTIONS}
          onChange={(value) => setProfile(prev => ({ ...prev, maritalStatus: value as any }))}
          error={getError('maritalStatus')}
        />

        <Select
          label="Orientation"
          value={profile.orientation || ''}
          options={ORIENTATION_OPTIONS}
          onChange={(value) => setProfile(prev => ({ ...prev, orientation: value as any }))}
          error={getError('orientation')}
        />

        <View style={styles.interestsSection}>
          <FormInput
            label="Bio"
            value={profile.bio || ''}
            onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
            multiline
            placeholder="Tell us about yourself..."
          />
        </View>

        <View style={styles.interestsSection}>
          <Text style={styles.sectionTitle}>Interests</Text>
          {getError('interests') && (
            <Text style={styles.errorText}>{getError('interests')}</Text>
          )}
          <View style={styles.interestsContainer}>
            {MOCK_INTERESTS.map((interest) => (
              <Pressable
                key={interest}
                onPress={() => toggleInterest(interest)}
              >
                <InterestTag
                  interest={interest}
                  selected={profile.interests?.includes(interest)}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  interestsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});