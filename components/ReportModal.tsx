import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { SafetyService } from '../utils/safetyService';

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  reportedUserId: string;
  currentUserId: string;
}

const REPORT_REASONS = [
  'Inappropriate behavior',
  'Harassment',
  'Fake profile',
  'Spam',
  'Other',
];

export const ReportModal = ({
  visible,
  onClose,
  reportedUserId,
  currentUserId,
}: ReportModalProps) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      Alert.alert('Error', 'Please select a reason for reporting');
      return;
    }

    SafetyService.reportUser(currentUserId, reportedUserId, reason, details);
    Alert.alert(
      'Report Submitted',
      'Thank you for helping keep our community safe.',
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Report User</Text>
          
          <Text style={styles.label}>Reason for reporting:</Text>
          {REPORT_REASONS.map((reportReason) => (
            <Pressable
              key={reportReason}
              style={[
                styles.reasonButton,
                reason === reportReason && styles.selectedReason,
              ]}
              onPress={() => setReason(reportReason)}
            >
              <Text
                style={[
                  styles.reasonText,
                  reason === reportReason && styles.selectedReasonText,
                ]}
              >
                {reportReason}
              </Text>
            </Pressable>
          ))}

          <Text style={styles.label}>Additional details:</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            value={details}
            onChangeText={setDetails}
            placeholder="Please provide any additional details..."
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  reasonButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedReason: {
    backgroundColor: '#007AFF',
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedReasonText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});