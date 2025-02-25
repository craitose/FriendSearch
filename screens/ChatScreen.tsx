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
    const user = await AuthService.getUser();
    if (user) {
      setCurrentUserId(user.id);
      await loadMessages();
      setupSocketListeners();
    }
  };

  const setupSocketListeners = () => {
    socketService.setEventHandler('onMessageReceived', (message: Message) => {
      if (message.senderId === receiverId) {
        setMessages(prev => [...prev, message]);
        markMessageAsRead(message.id);
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
    const imageUri = await ImageService.pickImage();
    if (imageUri) {
      // In a real app, upload the image to a server and get the URL
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        receiverId,
        content: '',
        timestamp: new Date(),
        rea