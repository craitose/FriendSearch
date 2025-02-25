import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ChatMessage } from '../components/ChatMessage';
import { ChatService } from '../services/chatService';
import { Message } from '../types/chat';
import { AuthService } from '../services/authService';

export const ChatScreen = ({ route }: any) => {
  const { receiverId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null