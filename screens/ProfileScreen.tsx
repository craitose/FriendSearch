import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { InterestTag } from '../components/InterestTag';
import { MOCK_INTERESTS } from '../utils/mockData';

export const ProfileScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About You</Text>
        {/* These would be proper input fields in the full implementation */}
        <View style={styles.inputPlaceholder}>
          <Text>Name Input</Text>
        </View>
        <View style={styles.inputPlaceholder}>
          <Text>Age Input</Text>
        </View>
        <View style={styles.inputPlaceholder}>
          <Text>Marital Status Selection</Text>
        </View>
        <View style={styles.inputPlaceholder}>
          <Text>Orientation Selection</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Interests</Text>
        <View style={styles.interestsContainer}>
          {MOCK_INTERESTS.map((interest) => (
            <Pressable key={interest} onPress={() => toggleInterest(interest)}>
              <InterestTag
                interest={interest}
                selected={selectedInterests.includes(interest)}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <View style={styles.inputPlaceholder}>
          <Text>Bio Input</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputPlaceholder: {
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});