import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Login Screen Component
const LoginScreen = ({ onLogin, navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    onLogin();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome Back</Text>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
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

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>

          <Pressable 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Register Screen Component
const RegisterScreen = ({ onLogin, navigation }: any) => {
  // ... (keep the existing RegisterScreen code)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <Pressable style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
};

// Discover Screen Component
const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Screen</Text>
    </View>
  );
};

// Chat Screen Component
const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
    </View>
  );
};

// Profile Screen Component
const ProfileScreen = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: '30',
    maritalStatus: 'single',
    orientation: 'straight',
    bio: 'Looking for friends with similar interests',
    interests: ['Hiking', 'Photography', 'Gaming'],
  });
  const [editing, setEditing] = useState(false);

  const allInterests = [
    'Hiking', 'Photography', 'Gaming', 'Reading', 'Cooking', 
    'Travel', 'Music', 'Art', 'Sports', 'Movies'
  ];

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
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
            setIsAuthenticated(false);
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <MaterialIcons name="person" size={60} color="#666" />
          </View>
          {editing && (
            <Pressable style={styles.editImageButton}>
              <MaterialIcons name="edit" size={20} color="#fff" />
            </Pressable>
          )}
        </View>
        
        <Pressable 
          style={styles.editButton}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.editButtonText}>
            {editing ? 'Save Profile' : 'Edit Profile'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.profileContent}>
        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Name</Text>
          {editing ? (
            <TextInput
              style={styles.fieldInput}
              value={profile.name}
              onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Age</Text>
          {editing ? (
            <TextInput
              style={styles.fieldInput}
              value={profile.age}
              onChangeText={(text) => setProfile(prev => ({ ...prev, age: text }))}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.age}</Text>
          )}
        </View>
        
        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Marital Status</Text>
          {editing ? (
            <View style={styles.pickerContainer}>
              <Pressable
                style={[
                  styles.pickerOption,
                  profile.maritalStatus === 'single' && styles.pickerOptionSelected
                ]}
                onPress={() => setProfile(prev => ({ ...prev, maritalStatus: 'single' }))}
              >
                <Text style={[
                  styles.pickerOptionText,
                  profile.maritalStatus === 'single' && styles.pickerOptionTextSelected
                ]}>Single</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.pickerOption,
                  profile.maritalStatus === 'married' && styles.pickerOptionSelected
                ]}
                onPress={() => setProfile(prev => ({ ...prev, maritalStatus: 'married' }))}
              >
                <Text style={[
                  styles.pickerOptionText,
                  profile.maritalStatus === 'married' && styles.pickerOptionTextSelected
                ]}>Married</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.pickerOption,
                  profile.maritalStatus === 'divorced' && styles.pickerOptionSelected
                ]}
                onPress={() => setProfile(prev => ({ ...prev, maritalStatus: 'divorced' }))}
              >
                <Text style={[
                  styles.pickerOptionText,
                  profile.maritalStatus === 'divorced' && styles.pickerOptionTextSelected
                ]}>Divorced</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.fieldValue}>
              {profile.maritalStatus.charAt(0).toUpperCase() + profile.maritalStatus.slice(1)}
            </Text>
          )}
        </View>
        
        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Orientation</Text>
          {editing ? (
            <View style={styles.pickerContainer}>
              <Pressable
                style={[
                  styles.pickerOption,
                  profile.orientation === 'straight' && styles.pickerOptionSelected
                ]}
                onPress={() => setProfile(prev => ({ ...prev, orientation: 'straight' }))}
              >
                <Text style={[
                  styles.pickerOptionText,
                  profile.orientation === 'straight' && styles.pickerOptionTextSelected
                ]}>Straight</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.pickerOption,
                  profile.orientation === 'gay' && styles.pickerOptionSelected
                ]}
                onPress={() => setProfile(prev => ({ ...prev, orientation: 'gay' }))}
              >
                <Text style={[
                  styles.pickerOptionText,
                  profile.orientation === 'gay' && styles.pickerOptionTextSelected
                ]}>Gay</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.pickerOption,
                  profile.orientation === 'bisexual' && styles.pickerOptionSelected
                ]}
                onPress={() => setProfile(prev => ({ ...prev, orientation: 'bisexual' }))}
              >
                <Text style={[
                  styles.pickerOptionText,
                  profile.orientation === 'bisexual' && styles.pickerOptionTextSelected
                ]}>Bisexual</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.fieldValue}>
              {profile.orientation.charAt(0).toUpperCase() + profile.orientation.slice(1)}
            </Text>
          )}
        </View>
        
        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Bio</Text>
          {editing ? (
            <TextInput
              style={[styles.fieldInput, styles.bioInput]}
              value={profile.bio}
              onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
              multiline
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.bio}</Text>
          )}
        </View>
        
        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Interests</Text>
          {editing ? (
            <View style={styles.interestsContainer}>
              {allInterests.map(interest => (
                <Pressable
                  key={interest}
                  style={[
                    styles.interestTag,
                    profile.interests.includes(interest) && styles.interestTagSelected
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text 
                    style={[
                      styles.interestTagText,
                      profile.interests.includes(interest) && styles.interestTagTextSelected
                    ]}
                  >
                    {interest}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={styles.interestsContainer}>
              {profile.interests.map(interest => (
                <View key={interest} style={styles.interestTag}>
                  <Text style={styles.interestTagText}>{interest}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
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

  // Main tabs navigator
  const MainTabsNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'person';
          
          if (route.name === 'Discover') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
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

// Complete styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
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
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 16,
    padding: 8,
    alignItems: 'center',
  },
  registerText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
  // Profile screen styles
  profileHeader: {
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  profileContent: {
    padding: 20,
  },
  profileField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerOption: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: '#007AFF',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#333',
  },
  pickerOptionTextSelected: {
    color: '#fff',
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
  interestTagSelected: {
    backgroundColor: '#007AFF',
  },
  interestTagText: {
    fontSize: 14,
    color: '#333',
  },
  interestTagTextSelected: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});