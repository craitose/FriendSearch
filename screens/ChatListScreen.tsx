import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Pressable,
  Image,
} from 'react-native';
import { ChatService } from '../services/chatService';
import { ChatRoom } from '../types/chat';
import { AuthService } from '../services/authService';

export const ChatListScreen = ({ navigation }: any) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      loadChatRooms();
    }
  }, [currentUserId]);

  const loadCurrentUser = async () => {
    const user = await AuthService.getUser();
    if (user) {
      setCurrentUserId(user.id);
    }
  };

  const loadChatRooms = async () => {
    const rooms = await ChatService.getChatRooms(currentUserId);
    setChatRooms(rooms);
  };

  const renderChatRoom = ({ item }: { item: ChatRoom }) => {
    const otherParticipantId = item.participants.find(id => id !== currentUserId);

    return (
      <Pressable
        style={styles.chatRoom}
        onPress={() => navigation.navigate('Chat', {
          receiverId: otherParticipantId,
          receiverName: 'User ' + otherParticipantId, // In a real app, fetch the actual user name
        })}
      >
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
        <View style={styles.chatInfo}>
          <Text style={styles.userName}>User {otherParticipantId}</Text>
          {item.lastMessage && (
            <>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage.content}
              </Text>
              <Text style={styles.timestamp}>
                {new Date(item.lastMessage.timestamp).toLocaleDateString()}
              </Text>
            </>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {chatRooms.length > 0 ? (
        <FlatList
          data={chatRooms}
          keyExtractor={item => item.id}
          renderItem={renderChatRoom}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No conversations yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatRoom: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});