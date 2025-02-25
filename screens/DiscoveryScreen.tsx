import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { UserCard } from '../components/UserCard';
import { MOCK_USERS } from '../utils/mockData';

export const DiscoveryScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {MOCK_USERS.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onPress={() => {
              // Handle user selection
              console.log('Selected user:', user.id);
            }}
            distance={2.5} // This would be calculated based on actual location
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
});