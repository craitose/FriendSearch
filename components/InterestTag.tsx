import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InterestTagProps {
  interest: string;
  selected?: boolean;
}

export const InterestTag = ({ interest, selected = false }: InterestTagProps) => {
  return (
    <View style={[styles.tag, selected && styles.selectedTag]}>
      <Text style={[styles.tagText, selected && styles.selectedTagText]}>
        {interest}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTag: {
    backgroundColor: '#007AFF',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTagText: {
    color: '#fff',
  },
});