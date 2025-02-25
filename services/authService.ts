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

  // In a real app, these would be API calls to your backend
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

  static async register(credentials: AuthCredentials & { name: string }): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: UserProfile = {
      id: '1',
      name: credentials.name,
      age: 30,
      maritalStatus: 'single',
      orientation: 'straight',
      interests: [],
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
      bio: '',
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

  static async logout(): Promise<void> {
    await AsyncStorage.multiRemove([this.TOKEN_KEY, this.USER_KEY]);
  }

  static async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.TOKEN_KEY);
  }

  static async getUser(): Promise<UserProfile | null> {
    const userData = await AsyncStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private static async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  private static async setUser(user: UserProfile): Promise<void> {
    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}