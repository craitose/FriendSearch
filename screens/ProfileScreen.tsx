import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';

// Mock function for image picking (in a real app, you'd use expo-image-picker)
const pickImage = () => {
  // Return a random image from randomuser.me
  const randomId = Math.floor(Math.random() * 100);
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
};

function ProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    age: '32',
    bio: 'Passionate about hiking, photography, and meeting new people with similar interests.',
    maritalStatus: 'Married',
    orientation: 'Straight',
    interests: ['Hiking', 'Photography', 'Travel', 'Reading', 'Cooking'],
    location: 'New York, NY',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    searchPreferences: {
      maxDistance: 50,
      ageRange: { min: 25, max: 45 },
      showMaritalStatus: true,
      showOrientation: true,
    }
  });

  // Custom alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtons, setAlertButtons] = useState([]);

  // Show custom alert
  const showAlert = (title, message, buttons) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertButtons(buttons);
    setAlertVisible(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    showAlert(
      'Profile Updated',
      'Your profile has been successfully updated.',
      [{ text: 'OK', onPress: () => setAlertVisible(false) }]
    );
  };

  const handleLogout = () => {
    showAlert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { 
          text: 'Cancel', 
          onPress: () => setAlertVisible(false),
          style: 'cancel'
        },
        { 
          text: 'Logout', 
          onPress: () => {
            setAlertVisible(false);
            navigation.navigate('Login');
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleChangePhoto = () => {
    // Show options for changing photo
    showAlert(
      'Change Profile Photo',
      'How would you like to update your profile photo?',
      [
        { 
          text: 'Cancel', 
          onPress: () => setAlertVisible(false),
          style: 'cancel'
        },
        { 
          text: 'Choose Photo', 
          onPress: () => {
            setAlertVisible(false);
            // In a real app, you'd use expo-image-picker here
            const newImageUrl = pickImage();
            setProfile({
              ...profile,
              profileImage: newImageUrl
            });
          }
        }
      ]
    );
  };

  const toggleInterest = (interest) => {
    if (profile.interests.includes(interest)) {
      setProfile({
        ...profile,
        interests: profile.interests.filter(i => i !== interest)
      });
    } else {
      setProfile({
        ...profile,
        interests: [...profile.interests, interest]
      });
    }
  };

  const allInterests = [
    'Hiking', 'Photography', 'Travel', 'Reading', 'Cooking', 
    'Gaming', 'Movies', 'Music', 'Art', 'Sports', 'Technology', 
    'Fitness', 'Yoga', 'Dancing', 'Writing'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profile.profileImage }}
            style={styles.profileImage}
          />
          {isEditing && (
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={handleChangePhoto}
            >
              <Text style={styles.editImageButtonText}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rest of the component remains the same */}
      
      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        buttons={alertButtons}
      />
    </ScrollView>
  );
}

// Styles remain the same