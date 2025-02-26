const DiscoveryScreen = () => {
  const [users] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      maritalStatus: 'married',
      orientation: 'straight',
      interests: ['Hiking', 'Photography', 'Travel'],
      bio: 'Passionate photographer looking for hiking buddies and travel companions.',
      distance: 2.5,
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 34,
      maritalStatus: 'single',
      orientation: 'straight',
      interests: ['Gaming', 'Movies', 'Technology'],
      bio: 'Tech enthusiast and gamer looking for friends to join movie nights and gaming sessions.',
      distance: 4.8,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 31,
      maritalStatus: 'married',
      orientation: 'bisexual',
      interests: ['Cooking', 'Art', 'Music'],
      bio: 'Foodie and art lover seeking creative friends for cooking experiments and gallery visits.',
      distance: 1.2,
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Friends</Text>
      </View>
      
      <View style={styles.usersList}>
        {users.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userCardHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}, {user.age}</Text>
                <Text style={styles.userDistance}>{user.distance} km away</Text>
              </View>
            </View>
            
            <Text style={styles.userStatus}>
              {user.maritalStatus.charAt(0).toUpperCase() + user.maritalStatus.slice(1)} • 
              {' ' + user.orientation.charAt(0).toUpperCase() + user.orientation.slice(1)}
            </Text>
            
            <Text style={styles.userBio}>{user.bio}</Text>
            
            <View style={styles.interestsContainer}>
              {user.interests.map(interest => (
                <View key={interest} style={styles.interestTag}>
                  <Text style={styles.interestTagText}>{interest}</Text>
                </View>
              ))}
            </View>
            
            <Pressable style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Add these styles to the StyleSheet
const discoveryStyles = {
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  usersList: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  userCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userDistance: {
    fontSize: 14,
    color: '#666',
  },
  userStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
    marginTop: 8,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
};

// Update the styles object to include the discovery styles
const styles = StyleSheet.create({
  // ... existing styles
  ...discoveryStyles,
});