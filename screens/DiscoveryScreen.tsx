import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DiscoveryScreen = () => {
  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      distance: 2.5,
      bio: 'Passionate photographer looking for hiking buddies.',
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 34,
      distance: 4.8,
      bio: 'Tech enthusiast and gamer looking for friends.',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 31,
      distance: 1.2,
      bio: 'Foodie and art lover seeking creative friends.',
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
  },
});

export default DiscoveryScreen;