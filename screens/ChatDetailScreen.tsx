import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

function ChatDetailScreen({ route, navigation }) {
  const { userId, name, profileImage } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  // Set up mock messages when the screen loads
  useEffect(() => {
    // Mock messages for demonstration
    const mockMessages = [
      {
        id: '1',
        text: 'Hi there! I saw we both enjoy hiking.',
        sender: userId,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: '2',
        text: 'Yes, I love hiking! Do you have any favorite trails?',
        sender: 'me',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
      },
      {
        id: '3',
        text: 'I really enjoy the mountain trails. There\'s a great one about 30 minutes from here.',
        sender: userId,
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: '4',
        text: 'That sounds amazing! Would you be interested in going this weekend?',
        sender: 'me',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: '5',
        text: 'Are you free for a hike this weekend?',
        sender: userId,
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
    ];
    
    setMessages(mockMessages);
  }, [userId]);

  // Set up navigation header
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Image
          source={{ uri: profileImage }}
          style={styles.headerAvatar}
        />
      ),
    });
  }, [navigation, name, profileImage]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Scroll to the bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';
    
    return (
      <View style={[
        styles.messageContainer,
        isMe ? styles.myMessageContainer : styles.theirMessageContainer
      ]}>
        {!isMe && (
          <Image
            source={{ uri: profileImage }}
            style={styles.messageAvatar}
          />
        )}
        
        <View style={[
          styles.messageBubble,
          isMe ? styles.myMessageBubble : styles.theirMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isMe ? styles.myMessageText : styles.theirMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={styles.messageTime}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  theirMessageBubble: {
    backgroundColor: '#E9E9EB',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ChatDetailScreen;