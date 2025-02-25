import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormInput } from '../components/FormInput';
import { Select } from '../components/Select';
import { InterestTag } from '../components/InterestTag';
import { MOCK_INTERESTS } from '../utils/mockData';
import { ImageService } from '../services/imageService';
import { AuthService } from '../services/authService';
import { UserProfile } from '../types';

type RootStackParamList = {
  Profile: undefined;
};

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: undefined,
    maritalStatus: undefined,
    orientation: undefined,
    interests: [],
    bio: '',
    profileImage: undefined,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userData = await AuthService.getUser();
      if (userData) {
        setProfile(userData);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      setImageLoading(true);
      const imageUri = await ImageService.pickImage();
      if (imageUri) {
        const resizedUri = await ImageService.resizeImage(imageUri);
        setProfile(prev => ({
          ...prev,
          profileImage: resizedUri,
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setImageLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // In a real app, this would send the updated profile to a backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.profileImageContainer} 
          onPress={handleImagePick}
          disabled={imageLoading}
        >
          {imageLoading ? (
            <View style={styles.profileImagePlaceholder}>
              <ActivityIndicator color="#007AFF" />
            </View>
          ) : profile.profileImage ? (
            <Image
              source={{ uri: profile.profileImage }}
              style={styles.profileImage}
              onError={() => {
                Alert.alert('Error', 'Failed to load image');
                setProfile(prev => ({ ...prev, profileImage: undefined }));
              }}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <MaterialIcons name="person" size={40} color="#666" />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <MaterialIcons 
              name={imageLoading ? "hourglass-empty" : "edit"} 
              size={16} 
              color="#fff" 
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.content}>
        <FormInput
          label="Name"
          value={profile.name}
          onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
          placeholder="Enter your name"
        />

        <FormInput
          label="Age"
          value={profile.age?.toString()}
          onChangeText={(text) => {
            const age = parseInt(text);
            if (!isNaN(age) || text === '') {
              setProfile(prev => ({ ...prev, age: age || undefined }));
            }
          }}
          placeholder="Enter your age"
          keyboardType="numeric"
        />

        <Select
          label="Marital Status"
          value={profile.maritalStatus || ''}
          options={[
            { label: 'Single', value: 'single' },
            { label: 'Married', value: 'married' },
            { label: 'Divorced', value: 'divorced' },
            { label: 'Widowed', value: 'widowed' },
          ]}
          onChange={(value) => setProfile(prev => ({ ...prev, maritalStatus: value as any }))}
        />

        <Select
          label="Orientation"
          value={profile.orientation || ''}
          options={[
            { label: 'Straight', value: 'straight' },
            { label: 'Gay', value: 'gay' },
            { label: 'Lesbian', value: 'lesbian' },
            { label: 'Bisexual', value: 'bisexual' },
            { label: 'Asexual', value: 'asexual' },
            { label: 'Other', value: 'other' },
          ]}
          onChange={(value) => setProfile(prev => ({ ...prev, orientation: value as any }))}
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
                selected={profile.interests?.includes(interest)}
              />
            </Pressable>
          ))}
        </View>

        <FormInput
          label="Bio"
          value={profile.bio}
          onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
          placeholder="Tell us about yourself..."
          multiline
        />

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Profile</Text>
          )}
        </Pressable>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
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
  logoutButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#ff3b30',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});