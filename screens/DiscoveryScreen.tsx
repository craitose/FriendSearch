import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';

function DiscoveryScreen({ navigation }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterDistance, setFilterDistance] = useState(50);
  const [connectedUsers, setConnectedUsers] = useState([]);
  
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

  // Hardcoded user data
  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      distance: 2.5,
      bio: 'Passionate photographer looking for hiking buddies.',
      interests: ['Hiking', 'Photography', 'Travel'],
      maritalStatus: 'Married',
      orientation: 'Straight',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 34,
      distance: 4.8,
      bio: 'Tech enthusiast and gamer looking for friends.',
      interests: ['Gaming', 'Movies', 'Technology'],
      maritalStatus: 'Single',
      orientation: 'Straight',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 31,
      distance: 1.2,
      bio: 'Foodie and art lover seeking creative friends.',
      interests: ['Cooking', 'Art', 'Music'],
      maritalStatus: 'Married',
      orientation: 'Bisexual',
      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  // Filter users by distance
  const filteredUsers = users.filter(user => user.distance <= filterDistance);

  // Function to handle connecting with a user
  const connectWithUser = (userId) => {
    console.log("Connecting with user:", userId);
    
    if (connectedUsers.includes(userId)) {
      showAlert(
        "Already Connected",
        "You are already connected with this user.",
        [{ text: "OK", onPress: () => setAlertVisible(false) }]
      );
    } else {
      const user = users.find(u => u.id === userId);
      if (user) {
        showAlert(
          "Connect with User",
          `Would you like to connect with ${user.name}?`,
          [
            { 
              text: "Cancel", 
              onPress: () => setAlertVisible(false),
              style: "cancel"
            },
            { 
              text: "Connect", 
              onPress: () => {
                console.log("User confirmed connection");
                setConnectedUsers([...connectedUsers, userId]);
                setAlertVisible(false);
                
                // Show success message
                setTimeout(() => {
                  showAlert(
                    "Success",
                    `Connection request sent to ${user.name}!`,
                    [{ text: "OK", onPress: () => setAlertVisible(false) }]
                  );
                }, 300);
              }
            }
          ]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Friends</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Max Distance:</Text>
          <View style={styles.filterOptions}>
            {[5, 10, 25, 50].map(distance => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.filterOption,
                  filterDistance === distance && styles.filterOptionSelected
                ]}
                onPress={() => setFilterDistance(distance)}
              >
                <Text style={styles.filterOptionText}>{distance}km</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {filteredUsers.map(user => (
          <View key={user.id} style={styles.card}>
            <TouchableOpacity 
              style={styles.cardContent}
              onPress={() => {
                setSelectedUser(user);
                setShowModal(true);
              }}
            >
              <View style={styles.cardHeader}>
                <Image 
                  source={{ uri: user.profileImage }} 
                  style={styles.profileImage} 
                />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{user.name}, {user.age}</Text>
                  <Text style={styles.distance}>{user.distance} km away</Text>
                </View>
              </View>
              
              <Text style={styles.bio}>{user.bio}</Text>
              
              <View style={styles.interestsContainer}>
                {user.interests.map(interest => (
                  <View key={interest} style={styles.interestTag}>
                    <Text style={styles.interestTagText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.standardButton,
                connectedUsers.includes(user.id) ? styles.connectedButton : styles.connectButton
              ]}
              onPress={() => {
                console.log("Connect button pressed for user:", user.id);
                connectWithUser(user.id);
              }}
            >
              <Text style={styles.buttonText}>
                {connectedUsers.includes(user.id) ? "Connected" : "Connect"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* User Details Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedUser && (
              <>
                <Image 
                  source={{ uri: selectedUser.profileImage }} 
                  style={styles.modalImage} 
                />
                <Text style={styles.modalName}>
                  {selectedUser.name}, {selectedUser.age}
                </Text>
                <Text style={styles.modalDistance}>
                  {selectedUser.distance} km away
                </Text>
                <Text style={styles.modalBio}>{selectedUser.bio}</Text>
                
                <Text style={styles.interestsTitle}>Interests</Text>
                <View style={styles.interestsContainer}>
                  {selectedUser.interests.map(interest => (
                    <View key={interest} style={styles.interestTag}>
                      <Text style={styles.interestTagText}>{interest}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.standardButton,
                      connectedUsers.includes(selectedUser.id) ? styles.connectedButton : styles.connectButton
                    ]}
                    onPress={() => {
                      console.log("Modal connect button pressed for user:", selectedUser.id);
                      connectWithUser(selectedUser.id);
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {connectedUsers.includes(selectedUser.id) ? "Connected" : "Connect"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
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
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    marginTop: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#007AFF',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardContent: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    color: '#666',
    marginTop: 2,
  },
  bio: {
    marginBottom: 12,
    color: '#333',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestTagText: {
    fontSize: 14,
    color: '#333',
  },
  standardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButton: {
    backgroundColor: '#007AFF',
  },
  connectedButton: {
    backgroundColor: '#4CD964',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalDistance: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  modalBio: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  interestsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DiscoveryScreen;