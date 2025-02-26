import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Image,
  Modal,
  Alert,
  TouchableOpacity
} from 'react-native';

function DiscoveryScreen({ navigation }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterDistance, setFilterDistance] = useState(50); // Default max distance: 50km
  const [connectedUsers, setConnectedUsers] = useState([]);

  // Hardcoded user data with more details
  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      distance: 2.5,
      bio: 'Passionate photographer looking for hiking buddies and travel companions. I love exploring new trails and capturing beautiful landscapes.',
      interests: ['Hiking', 'Photography', 'Travel', 'Nature'],
      maritalStatus: 'Married',
      orientation: 'Straight',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 34,
      distance: 4.8,
      bio: 'Tech enthusiast and gamer looking for friends to join movie nights and gaming sessions. Always up for trying new board games too!',
      interests: ['Gaming', 'Movies', 'Technology', 'Board Games'],
      maritalStatus: 'Single',
      orientation: 'Straight',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 31,
      distance: 1.2,
      bio: 'Foodie and art lover seeking creative friends for cooking experiments and gallery visits. I also enjoy live music and theater.',
      interests: ['Cooking', 'Art', 'Music', 'Theater'],
      maritalStatus: 'Married',
      orientation: 'Bisexual',
      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: '4',
      name: 'David Kim',
      age: 29,
      distance: 3.7,
      bio: 'Fitness enthusiast and bookworm looking for workout partners and book club members. I run 5k three times a week and love sci-fi novels.',
      interests: ['Fitness', 'Reading', 'Running', 'Science Fiction'],
      maritalStatus: 'Divorced',
      orientation: 'Gay',
      profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      id: '5',
      name: 'Olivia Martinez',
      age: 27,
      distance: 5.3,
      bio: 'Yoga instructor and plant enthusiast. Looking for friends to join meditation retreats and gardening projects.',
      interests: ['Yoga', 'Gardening', 'Meditation', 'Sustainability'],
      maritalStatus: 'Single',
      orientation: 'Straight',
      profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
    },
  ];

  // Filter users by distance
  const filteredUsers = users.filter(user => user.distance <= filterDistance);

  const handleConnect = (user) => {
    // Stop event propagation
    if (connectedUsers.includes(user.id)) {
      Alert.alert(
        "Already Connected",
        `You are already connected with ${user.name}.`
      );
      return;
    }
    
    Alert.alert(
      "Connection Request",
      `Would you like to connect with ${user.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Connect", 
          onPress: () => {
            // Add user to connected users
            setConnectedUsers([...connectedUsers, user.id]);
            Alert.alert("Success", `Connection request sent to ${user.name}!`);
          }
        }
      ]
    );
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const renderUserCard = (user) => {
    const isConnected = connectedUsers.includes(user.id);
    
    return (
      <View key={user.id} style={styles.card}>
        <TouchableOpacity 
          style={styles.cardContent}
          onPress={() => openUserDetails(user)}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <Image 
              source={{ uri: user.profileImage }} 
              style={styles.profileImage} 
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
              <Text style={styles.distance}>{user.distance} km away</Text>
              <Text style={styles.statusInfo}>
                {user.maritalStatus} • {user.orientation}
              </Text>
            </View>
          </View>
          
          <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
          
          <View style={styles.interestsContainer}>
            {user.interests.slice(0, 3).map(interest => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestTagText}>{interest}</Text>
              </View>
            ))}
            {user.interests.length > 3 && (
              <View style={styles.interestTag}>
                <Text style={styles.interestTagText}>+{user.interests.length - 3}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.connectButton,
            isConnected && styles.connectedButton
          ]}
          onPress={() => handleConnect(user)}
        >
          <Text style={styles.connectButtonText}>
            {isConnected ? 'Connected' : 'Connect'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Friends</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Max Distance:</Text>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterDistance === 5 && styles.filterOptionSelected
              ]}
              onPress={() => setFilterDistance(5)}
            >
              <Text style={[
                styles.filterOptionText,
                filterDistance === 5 && styles.filterOptionTextSelected
              ]}>5km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterDistance === 10 && styles.filterOptionSelected
              ]}
              onPress={() => setFilterDistance(10)}
            >
              <Text style={[
                styles.filterOptionText,
                filterDistance === 10 && styles.filterOptionTextSelected
              ]}>10km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterDistance === 25 && styles.filterOptionSelected
              ]}
              onPress={() => setFilterDistance(25)}
            >
              <Text style={[
                styles.filterOptionText,
                filterDistance === 25 && styles.filterOptionTextSelected
              ]}>25km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                filterDistance === 50 && styles.filterOptionSelected
              ]}
              onPress={() => setFilterDistance(50)}
            >
              <Text style={[
                styles.filterOptionText,
                filterDistance === 50 && styles.filterOptionTextSelected
              ]}>50km</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(renderUserCard)
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No matches found</Text>
            <Text style={styles.noResultsSubtext}>Try increasing your distance filter</Text>
          </View>
        )}
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
                <Text style={styles.modalStatus}>
                  {selectedUser.maritalStatus} • {selectedUser.orientation}
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
                      styles.modalConnectButton,
                      connectedUsers.includes(selectedUser.id) && styles.connectedButton
                    ]}
                    onPress={() => {
                      setShowModal(false);
                      handleConnect(selectedUser);
                    }}
                  >
                    <Text style={styles.connectButtonText}>
                      {connectedUsers.includes(selectedUser.id) ? 'Connected' : 'Connect'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  filterOptionTextSelected: {
    color: '#fff',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  statusInfo: {
    color: '#666',
    marginTop: 2,
    fontSize: 12,
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
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectedButton: {
    backgroundColor: '#4CD964',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
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
  },
  modalStatus: {
    fontSize: 14,
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
  modalConnectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
});

export default DiscoveryScreen;