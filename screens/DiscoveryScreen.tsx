import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

const DiscoveryScreen = () => {
  // Hardcoded user data
  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      distance: 2.5,
      bio: 'Passionate photographer looking for hiking buddies.',
      interests: ['Hiking', 'Photography', 'Travel'],
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 34,
      distance: 4.8,
      bio: 'Tech enthusiast and gamer looking for friends.',
      interests: ['Gaming', 'Movies', 'Technology'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 31,
      distance: 1.2,
      bio: 'Foodie and art lover seeking creative friends.',
      interests: ['Cooking', 'Art', 'Music'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Discover Friends</Text>
      
      {users.map(user => (
        <View key={user.id} style={styles.card}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.distance}>{user.distance} km away</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          
          <View style={styles.interestsContainer}>
            {user.interests.map(interest => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestTagText}>{interest}</Text>
              </View>
            ))}
          </View>
          
          <Pressable style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    color: '#666',
    marginTop: 4,
  },
  bio: {
    marginTop: 8,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  interestTag: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestTagText: {
    fontSize: 14,
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DiscoveryScreen;