import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import { UserCard } from '../components/UserCard';
import { Select } from '../components/Select';
import { MOCK_USERS } from '../utils/mockData';
import { getCurrentLocation } from '../utils/locationService';
import { findMatches } from '../utils/matchingService';
import { UserProfile } from '../types';

export const DiscoveryScreen = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [filters, setFilters] = useState({
    maxDistance: 50,
    interests: [] as string[],
    maritalStatus: [] as string[],
  });

  useEffect(() => {
    initializeDiscovery();
  }, []);

  const initializeDiscovery = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      if (location) {
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        
        // In a real app, we would fetch the current user's profile
        // For now, we'll use a mock current user
        const mockCurrentUser: UserProfile = {
          id: 'current-user',
          name: 'Current User',
          age: 30,
          maritalStatus: 'single',
          orientation: 'straight',
          interests: ['Hiking', 'Photography'],
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          bio: 'Looking for friends with similar interests',
          searchPreferences: {
            maxDistance: filters.maxDistance,
            ageRange: { min: 18, max: 100 },
            maritalStatuses: ['single', 'married'],
            orientations: ['straight', 'bisexual'],
          },
        };

        const matchedUsers = findMatches(mockCurrentUser, MOCK_USERS);
        setMatches(matchedUsers);
      }
    } catch (error) {
      console.error('Error initializing discovery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
    // Re-run matching algorithm with new filters
    initializeDiscovery();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <Select
          label="Max Distance"
          value={filters.maxDistance.toString()}
          options={[
            { label: '5 km', value: '5' },
            { label: '10 km', value: '10' },
            { label: '25 km', value: '25' },
            { label: '50 km', value: '50' },
          ]}
          onChange={(value) => handleFilterChange('maxDistance', parseInt(value))}
        />
      </View>

      <ScrollView style={styles.matchesContainer}>
        {matches.length > 0 ? (
          matches.map((match) => (
            <UserCard
              key={match.id}
              user={match}
              onPress={() => {
                // Handle user selection
                console.log('Selected user:', match.id);
              }}
              distance={
                currentLocation
                  ? calculateDistance(
                      currentLocation.latitude,
                      currentLocation.longitude,
                      match.location.latitude,
                      match.location.longitude
                    )
                  : undefined
              }
            />
          ))
        ) : (
          <View style={styles.noMatchesContainer}>
            <Text style={styles.noMatchesText}>
              No matches found. Try adjusting your filters or expanding your search area.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  matchesContainer: {
    flex: 1,
    padding: 16,
  },
  noMatchesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noMatchesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});