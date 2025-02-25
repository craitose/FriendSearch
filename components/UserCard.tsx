import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { UserProfile } from '../types';
import { InterestTag } from './InterestTag';

interface UserCardProps {
  user: UserProfile;
  onPress: () => void;
  distance?: number;
}

export const UserCard = ({ user, onPress, distance }: UserCardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.name}, {user.age}</Text>
        {distance && <Text style={styles.distance}>{distance.toFixed(1)} km away</Text>}
      </View>
      
      <Text style={styles.status}>
        {user.maritalStatus.charAt(0).toUpperCase() + user.maritalStatus.slice(1)}
      </Text>
      
      <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
      
      <View style={styles.interestsContainer}>
        {user.interests.map((interest) => (
          <InterestTag key={interest} interest={interest} />
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});