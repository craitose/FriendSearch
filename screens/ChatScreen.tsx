// Update the messageBubble styles in the component

// Update the messageText style to use conditional color
const styles = StyleSheet.create({
  // ... other styles remain the same
  
  messageText: {
    fontSize: 16,
    // Use conditional color based on message type
    // This will be overridden by the specific message type styles
    color: '#000',
  },
  
  sentMessageText: {
    color: '#fff', // White text for sent messages (blue background)
  },
  
  receivedMessageText: {
    color: '#333', // Dark text for received messages (light background)
  },
  
  messageTime: {
    fontSize: 12,
    // Use conditional color based on message type
    color: 'rgba(0, 0, 0, 0.5)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  
  sentMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white for sent messages
  },
  
  receivedMessageTime: {
    color: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for received messages
  },
  
  // ... other styles remain the same
});