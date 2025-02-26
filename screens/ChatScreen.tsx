import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';

// Mock data for connected users
const CONNECTED_USERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'Hey, are you free for hiking this weekend?',
    timestamp: '10:30 AM',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    unread: 2,
  },
  {
    id: '2',
    name: 'Michael Chen',
    lastMessage: 'I found a great board game cafe we should check out!',
    timestamp: 'Yesterday',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    unread: 0,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    lastMessage: 'Thanks for the restaurant recommendation!',
    timestamp: 'Monday',
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    unread: 0,
  },
];

// Mock conversation data
const MOCK_CONVERSATION = {
  '1': [
    { id: '1', text: 'Hey, how are you?', sent: false, timestamp: '10:00 AM' },
    { id: '2', text: 'I\'m good, thanks! How about you?', sent: true, timestamp: '10:05 AM' },
    { id: '3', text: 'Doing well! Are you free for hiking this weekend?', sent: false, timestamp: '10:30 AM' },
  ],
  '2': [
    { id: '1', text: 'Have you tried the new board game cafe downtown?', sent: false, timestamp: 'Yesterday' },
    { id: '2', text: 'No, I haven\'t. Is it good?', sent: true, timestamp: 'Yesterday' },
    { id: '3', text: 'It\'s amazing! I found a great board game cafe we should check out!', sent: false, timestamp: 'Yesterday' },
  ],
  '3': [
    { id: '1', text: 'Do you know any good Italian restaurants?', sent: true, timestamp: 'Monday' },
    { id: '2', text: 'Yes! Try Bella Pasta on 5th Avenue.', sent: false, timestamp: 'Monday' },
    { id: '3', text: 'Thanks for the restaurant recommendation!', sent: false, timestamp: 'Monday' },
  ],
};

function ChatScreen({ navigation }) {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(MOCK_CONVERSATION);
  const [connectedUsers, setConnectedUsers] = useState(CONNECTED_USERS);
  
  // Custom alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtons, setAlertButtons] = useState([]);

  // Show custom alert
  const showAlert = (title, message, buttons) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertButtons(buttons);
    setAlertVisible(true);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      sent: true,
      timestamp: 'Just now',
    };

    // Update conversations
    setConversations({
      ...conversations,
      [activeChat.id]: [...conversations[activeChat.id], newMessage],
    });

    // Update last message in connected users
    setConnectedUsers(
      connectedUsers.map(user => 
        user.id === activeChat.id 
          ? { ...user, lastMessage: message.trim(), timestamp: 'Just now', unread: 0 }
          : user
      )
    );

    // Clear input
    setMessage('');
  };

  const openChat = (user) => {
    // Mark messages as read
    setConnectedUsers(
      connectedUsers.map(u => 
        u.id === user.id 
          ? { ...u, unread: 0 }
          : u
      )
    );
    
    setActiveChat(user);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  // Render chat list
  if (!activeChat) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        
        {connectedUsers.length > 0 ? (
          <FlatList
            data={connectedUsers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.chatItem}
                onPress={() => openChat(item)}
              >
                <Image 
                  source={{ uri: item.profileImage }}
                  style={styles.avatar}
                />
                <View style={styles.chatInfo}>
                  <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.chatTime}>{item.timestamp}</Text>
                  </View>
                  <Text 
                    style={[
                      styles.chatMessage,
                      item.unread > 0 && styles.unreadMessage
                    ]}
                    numberOfLines={1}
                  >
                    {item.lastMessage}
                  </Text>
                </View>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{item.unread}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>Connect with people to start chatting</Text>
          </View>
        )}
      </View>
    );
  }

  // Render active chat
  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={closeChat}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.chatTitle}>{activeChat.name}</Text>
      </View>
      
      <FlatList
        data={conversations[activeChat.id]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sent ? styles.sentMessage : styles.receivedMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.timestamp}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
        inverted={false}
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
          style={[
            styles.sendButton,
            !message.trim() && styles.disabledSendButton
          ]}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      
      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        buttons={alertButtons}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
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
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#333',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 66,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  messageTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ChatScreen;