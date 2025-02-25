import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types';

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserProfile;
  token: string;
}

export class AuthService {
  private static readonly TOKEN_KEY = '@auth_token';
  private static readonly USER_KEY = '@user_data';

  static async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email && credentials.password) {
      const mockUser: UserProfile = {
        id: '1',
        name: 'John Doe',
        age: 30,
        maritalStatus: 'single',
        orientation: 'straight',
        interests: ['Hiking', 'Photography'],
        location: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
        bio: 'Looking for friends with similar interests',
        searchPreferences: {
          maxDistance: 50,
          ageRange: { min: 18, max: 100 },
          maritalStatuses: ['single', 'married'],
          orientations: ['straight', 'bisexual'],
        },
      };

      const mockToken = 'mock_jwt_token';

      await this.setToken(mockToken);
      await this.setUser(mockUser);

      return { user: mockUser, token: mockToken };
    }

    throw new Error('Invalid credentials');
  }

  static async logout(): Promise<void> {
    try {
      // Clear all auth-related data
      await AsyncStorage.multiRemove([
        this.TOKEN_KEY,
        this.USER_KEY,
        // Add any other auth-related keys that need to be cleared
      ]);
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Failed to logout');
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  static async getUser(): Promise<UserProfile | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  private static async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  private static async setUser(user: UserProfile): Promise<void> {
    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}