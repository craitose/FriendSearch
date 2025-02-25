import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  onImagePress?: (imageUrl: string) => void;
}

export const ChatMessage = ({
  message,
  isOwnMessage,
  onImagePress,
}: ChatMessageProps) => {
  const renderMessageContent = () => {
    if (message.type === 'image') {
      return (
        <Pressable onPress={() => onImagePress?.(message.imageUrl!)}>
          <Image
            source={{ uri: message.imageUrl }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        </Pressable>
      );
    }
    return (
      <Text
        style={[
          styles.messageText,
          isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
        ]}
      >
        {message.content}
      </Text>
    );
  };

  const renderReadReceipt = () => {
    if (!isOwnMessage) return null;

    return (
      <View style={styles.readReceipt}>
        <MaterialIcons
          name={message.read ? 'done-all' : 'done'}
          size={16}
          color={message.read ? '#4CAF50' : '#999'}
        />
        {message.read && (
          <Text style={styles.readTime}>
            {new Date(message.readAt!).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      {renderMessageContent()}
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        {renderReadReceipt()}
      </View>
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
  messageImage: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 8,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  readReceipt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});