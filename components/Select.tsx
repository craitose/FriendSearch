import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
}

export const Select = ({ label, value, options, onChange, error }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.select, error && styles.selectError]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectedText}>
          {selectedOption?.label || 'Select an option'}
        </Text>
        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#333"
        />
      </Pressable>
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.option}
              onPress={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  select: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectError: {
    borderColor: '#ff3b30',
  },
  selectedText: {
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 1000,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
});