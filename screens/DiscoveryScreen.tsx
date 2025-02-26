import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert
} from 'react-native';

function DiscoveryScreen() {
  const [count, setCount] = useState(0);

  const handleButtonPress = () => {
    console.log("Button pressed");
    setCount(count + 1);
    Alert.alert("Button Pressed", `Count: ${count + 1}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discovery Screen</Text>
      <Text style={styles.subtitle}>Testing Button Functionality</Text>
      
      <Text style={styles.counter}>Count: {count}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sarah Johnson, 28</Text>
        <Text style={styles.cardSubtitle}>2.5 km away</Text>
        
        <TouchableOpacity 
          style={styles.connectButton}
          onPress={() => {
            console.log("Connect button pressed");
            Alert.alert("Connect", "Would you like to connect with Sarah?", [
              { text: "Cancel", style: "cancel" },
              { text: "Connect", onPress: () => Alert.alert("Success", "Connection request sent!") }
            ]);
          }}
        >
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  counter: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DiscoveryScreen;