import { UserProfile } from '../types';

export const MOCK_INTERESTS = [
  'Hiking',
  'Photography',
  'Cooking',
  'Gaming',
  'Reading',
  'Travel',
  'Music',
  'Art',
  'Sports',
  'Movies',
  'Technology',
  'Fitness',
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    age: 32,
    maritalStatus: 'married',
    orientation: 'straight',
    interests: ['Hiking', 'Photography', 'Gaming'],
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    bio: 'Passionate photographer looking for hiking buddies and gaming friends.',
  },
  {
    id: '2',
    name: 'Jordan Lee',
    age: 28,
    maritalStatus: 'single',
    orientation: 'bisexual',
    interests: ['Cooking', 'Travel', 'Music'],
    location: {
      latitude: 40.7135,
      longitude: -74.0070,
    },
    bio: 'Food enthusiast seeking cooking partners and travel companions.',
  },
];