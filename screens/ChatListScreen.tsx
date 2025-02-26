import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

function ChatListScreen({ navigation }) {
  // Mock data for chat conversations
  const [conversations, setConversations] = useState([
    {
      id: '1',
      user: {
        id: '1',
        name: 'Sarah Johnson',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      lastMessage: {
        text: 'Are you free for a hike this weekend?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        unread: true,
      },
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Michael Chen',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      lastMessage: {
        text: 'I found a great new board game we should try!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        unread: false,
      },
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Emily Rodriguez',
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      lastMessage: {
        text: 'Thanks for the restaurant recommendation!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        unread: false,
      },
    },
  ]);

  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than 24 hours, show time
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // More than 24 hours, show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatDetail', { 
        userId: item.user.id,
        name: item.user.name,
        profileImage: item.user.profileImage,
      })}
    >
      <Image
        source={{ uri: item.user.profileImage }}
        style={styles.avatar}
      />
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{formatTime(item.lastMessage.timestamp)}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.lastMessage,
              item.lastMessage.unread && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.lastMessage.text}
          </Text>
          
          {item.lastMessage.unread && (
            <View style={styles.unreadBadge} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No conversations yet</Text>
          <Text style={styles.emptySubtext}>
            Connect with people to start chatting
          </Text>
        </View>
      )}
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
  listContent: {
    padding: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#333',
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ChatListScreen;