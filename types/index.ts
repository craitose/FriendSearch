export interface UserProfile {
  id: string;
  name: string;
  age: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  orientation: string;
  interests: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  bio: string;
  profileImage?: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  sharedInterests: string[];
  distance: number; // in kilometers
}