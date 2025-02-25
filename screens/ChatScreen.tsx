import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ChatMessage } from '../components/ChatMessage';
import { TypingIndicator } from '../components/TypingIndicator';
import { ChatService } from '../services/chatService';
import { SocketService } from '../services/socketService';
import { ImageService } from '../services/imageService';
import { Message, ChatUser } from '../types/chat';
import { AuthService } from '../services/authService';

export const ChatScreen = ({ route, navigation }: any) => {
  const { receiverId, receiverName } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<ChatUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedViewImage, setSelectedViewImage] = useState<string | null>(null);
  
  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const socketService = SocketService.getInstance();

  useEffect(() => {
    initializeChat();
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const initializeChat = async () => {
    try {
      setIsLoading(true);
      const user = await AuthService.getUser();
      if (user) {
        setCurrentUserId(user.id);
        await loadMessages();
        setupSocketListeners();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize chat');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async () => {
    const chatRoomId = getChatRoomId(currentUserId, receiverId);
    const chatMessages = await ChatService.getMessages(chatRoomId);
    setMessages(chatMessages);
    
    // Mark unread messages as read
    chatMessages
      .filter(msg => !msg.read && msg.senderId === receiverId)
      .forEach(msg => markMessageAsRead(msg.id));
  };

  const setupSocketListeners = () => {
    socketService.setEventHandler('onMessageReceived', (message: Message) => {
      if (message.senderId === receiverId) {
        setMessages(prev => [...prev, message]);
        markMessageAsRead(message.id);
        flatListRef.current?.scrollToEnd();
      }
    });

    socketService.setEventHandler('onTypingStart', (data) => {
      if (data.userId === receiverId) {
        setIsTyping(true);
      }
    });

    socketService.setEventHandler('onTypingEnd', (data) => {
      if (data.userId === receiverId) {
        setIsTyping(false);
      }
    });

    socketService.setEventHandler('onMessageRead', (data) => {
      if (data.userId === receiverId) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === data.messageId ? { ...msg, read: true, readAt: new Date() } : msg
          )
        );
      }
    });

    socketService.setEventHandler('onUserOnlineStatus', (data) => {
      if (data.userId === receiverId) {
        setReceiver(prev => prev ? { ...prev, online: data.online } : null);
      }
    });
  };

  const handleTyping = () => {
    const roomId = getChatRoomId(currentUserId, receiverId);
    socketService.sendTypingStart(roomId, currentUserId);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketService.sendTypingEnd(roomId, currentUserId);
    }, 1500);
  };

  const markMessageAsRead = (messageId: string) => {
    socketService.markMessageAsRead(messageId, currentUserId);
  };

  const handleImagePick = async () => {
    try {
      const imageUri = await ImageService.pickImage();
      if (imageUri) {
        // In a real app, upload the image to a server and get the URL
        const message: Message = {
          id: Date.now().toString(),
          senderId: currentUserId,
          receiverId,
          content: '',
          timestamp: new Date(),
          read: false,
          type: 'image',
          imageUrl: imageUri,
        };

        setMessages(prev => [...prev, message]);
        socketService.sendMessage(message);
        flatListRef.current?.scrollToEnd();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId,
      content: newMessage.trim(),
      timestamp: new Date(),
      read: false,
      type: 'text',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    socketService.sendMessage(message);
    flatListRef.current?.scrollToEnd();
  };

  const handleImagePress = (imageUrl: string) => {
    setSelectedViewImage(imageUrl);
    setImageViewerVisible(true);
  };

  const getChatRoomId = (user1Id: string, user2Id: string): string => {
    return [user1Id, user2Id].sort().join('-');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            isOwnMessage={item.senderId === currentUserId}
            onImagePress={handleImagePress}
          />
        )}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {isTyping && (
        <TypingIndicator userName={receiverName} />
      )}

      <View style={styles.inputContainer}>
        <Pressable style={styles.attachButton} onPress={handleImagePick}>
          <MaterialIcons name="attach-file" size={24} color="#666" />
        </Pressable>

        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => {
            setNewMessage(text);
            handleTyping();
          }}
          placeholder="Type a message..."
          multiline
        />

        <Pressable style={styles.sendButton} onPress={handleSend}>
          <MaterialIcons name="send" size={24} color="#007AFF" />
        </Pressable>
      </View>

      <Modal
        visible={imageViewerVisible}
        transparent={true}
        onRequestClose={() => setImageViewerVisible(false)}
      >
        <Pressable
          style={styles.imageViewerContainer}
          onPress={() => setImageViewerVisible(false)}
        >
          {selectedViewImage && (
            <Image
              source={{ uri: selectedViewImage }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesList: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});