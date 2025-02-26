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
            <TouchableOpacity style={styles.editImageButton}>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.name}</Text>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Age</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.age}
              onChangeText={(text) => {
                // Only allow numbers
                if (/^\d*$/.test(text)) {
                  setProfile({ ...profile, age: text });
                }
              }}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.age}</Text>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Marital Status</Text>
          {isEditing ? (
            <View style={styles.optionsContainer}>
              {['Single', 'Married', 'Divorced', 'Widowed'].map(status => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.optionButton,
                    profile.maritalStatus === status && styles.selectedOption
                  ]}
                  onPress={() => setProfile({ ...profile, maritalStatus: status })}
                >
                  <Text style={styles.optionText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.fieldValue}>{profile.maritalStatus}</Text>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Orientation</Text>
          {isEditing ? (
            <View style={styles.optionsContainer}>
              {['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Other'].map(orientation => (
                <TouchableOpacity
                  key={orientation}
                  style={[
                    styles.optionButton,
                    profile.orientation === orientation && styles.selectedOption
                  ]}
                  onPress={() => setProfile({ ...profile, orientation: orientation })}
                >
                  <Text style={styles.optionText}>{orientation}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.fieldValue}>{profile.orientation}</Text>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Bio</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={profile.bio}
              onChangeText={(text) => setProfile({ ...profile, bio: text })}
              multiline
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.bio}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        
        <View style={styles.interestsContainer}>
          {isEditing ? (
            allInterests.map(interest => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestTag,
                  profile.interests.includes(interest) && styles.selectedInterest
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text style={[
                  styles.interestText,
                  profile.interests.includes(interest) && styles.selectedInterestText
                ]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            profile.interests.map(interest => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search Preferences</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Maximum Distance</Text>
          {isEditing ? (
            <View style={styles.optionsContainer}>
              {[5, 10, 25, 50].map(distance => (
                <TouchableOpacity
                  key={distance}
                  style={[
                    styles.optionButton,
                    profile.searchPreferences.maxDistance === distance && styles.selectedOption
                  ]}
                  onPress={() => setProfile({
                    ...profile,
                    searchPreferences: {
                      ...profile.searchPreferences,
                      maxDistance: distance
                    }
                  })}
                >
                  <Text style={styles.optionText}>{distance} km</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.fieldValue}>{profile.searchPreferences.maxDistance} km</Text>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Age Range</Text>
          {isEditing ? (
            <View style={styles.rangeContainer}>
              <TextInput
                style={[styles.input, styles.rangeInput]}
                value={profile.searchPreferences.ageRange.min.toString()}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text)) {
                    setProfile({
                      ...profile,
                      searchPreferences: {
                        ...profile.searchPreferences,
                        ageRange: {
                          ...profile.searchPreferences.ageRange,
                          min: parseInt(text) || 18
                        }
                      }
                    });
                  }
                }}
                keyboardType="numeric"
              />
              <Text style={styles.rangeText}>to</Text>
              <TextInput
                style={[styles.input, styles.rangeInput]}
                value={profile.searchPreferences.ageRange.max.toString()}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text)) {
                    setProfile({
                      ...profile,
                      searchPreferences: {
                        ...profile.searchPreferences,
                        ageRange: {
                          ...profile.searchPreferences.ageRange,
                          max: parseInt(text) || 100
                        }
                      }
                    });
                  }
                }}
                keyboardType="numeric"
              />
            </View>
          ) : (
            <Text style={styles.fieldValue}>
              {profile.searchPreferences.ageRange.min} to {profile.searchPreferences.ageRange.max}
            </Text>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Show Marital Status</Text>
          <Switch
            value={profile.searchPreferences.showMaritalStatus}
            onValueChange={(value) => setProfile({
              ...profile,
              searchPreferences: {
                ...profile.searchPreferences,
                showMaritalStatus: value
              }
            })}
            disabled={!isEditing}
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Show Orientation</Text>
          <Switch
            value={profile.searchPreferences.showOrientation}
            onValueChange={(value) => setProfile({
              ...profile,
              searchPreferences: {
                ...profile.searchPreferences,
                showOrientation: value
              }
            })}
            disabled={!isEditing}
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  editImageButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    flex: 2,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 2,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedInterest: {
    backgroundColor: '#007AFF',
  },
  interestText: {
    fontSize: 14,
    color: '#333',
  },
  selectedInterestText: {
    color: '#fff',
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  rangeInput: {
    flex: 1,
  },
  rangeText: {
    marginHorizontal: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;