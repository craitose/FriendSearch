import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage = ({ message, isOwnMessage }: ChatMessageProps) => {
  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Text style={[
        styles.messageText,
        isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
      ]}>
        {message.content}
      </Text>
      <Text style={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9ECEF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  ownMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});