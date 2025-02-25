export interface UserProfile {
  id: string;
  name: string;
  age: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  orientation: 'straight' | 'gay' | 'lesbian' | 'bisexual' | 'asexual' | 'other';
  interests: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  bio: string;
  profileImage?: string;
  searchPreferences: {
    maxDistance: number;
    ageRange: {
      min: number;
      max: number;
    };
    maritalStatuses: Array<'single' | 'married' | 'divorced' | 'widowed'>;
    orientations: Array<'straight' | 'gay' | 'lesbian' | 'bisexual' | 'asexual' | 'other'>;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}