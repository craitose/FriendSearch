const DiscoveryScreen = () => {
  const [users, setUsers] = useState([
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
    {
      id: '4',
      name: 'David Kim',
      age: 29,
      maritalStatus: 'divorced',
      orientation: 'gay',
      interests: ['Sports', 'Fitness', 'Reading'],
      bio: 'Fitness enthusiast and bookworm looking for workout partners and book club members.',
      distance: 3.7,
    },
  ]);
  
  const [filters, setFilters] = useState({
    maxDistance: 10,
    interests: [] as string[],
    showFilters: false,
  });

  const allInterests = [
    'Hiking', 'Photography', 'Gaming', 'Reading', 'Cooking', 
    'Travel', 'Music', 'Art', 'Sports', 'Movies', 'Technology', 'Fitness'
  ];

  const toggleInterestFilter = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const filteredUsers = users.filter(user => {
    // Filter by distance
    if (user.distance > filters.maxDistance) {
      return false;
    }
    
    // Filter by interests (if any selected)
    if (filters.interests.length > 0) {
      const hasMatchingInterest = user.interests.some(interest => 
        filters.interests.includes(interest)
      );
      if (!hasMatchingInterest) {
        return false;
      }
    }
    
    return true;
  });

  const renderUserCard = (user: any) => (
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
      
      <Text style={styles.userBio} numberOfLines={2}>{user.bio}</Text>
      
      <View style={styles.interestsContainer}>
        {user.interests.map((interest: string) => (
          <View 
            key={interest} 
            style={[
              styles.interestTag,
              filters.interests.includes(interest) && styles.interestTagHighlighted
            ]}
          >
            <Text 
              style={[
                styles.interestTagText,
                filters.interests.includes(interest) && styles.interestTagTextHighlighted
              ]}
            >
              {interest}
            </Text>
          </View>
        ))}
      </View>
      
      <Pressable style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Friends</Text>
        <Pressable 
          style={styles.filterButton}
          onPress={() => setFilters(prev => ({ ...prev, showFilters: !prev.showFilters }))}
        >
          <MaterialIcons name="filter-list" size={24} color="#007AFF" />
        </Pressable>
      </View>
      
      {filters.showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Maximum Distance</Text>
          <View style={styles.distanceFilter}>
            <Pressable
              style={[
                styles.distanceOption,
                filters.maxDistance === 5 && styles.distanceOptionSelected
              ]}
              onPress={() => setFilters(prev => ({ ...prev, maxDistance: 5 }))}
            >
              <Text style={styles.distanceOptionText}>5 km</Text>
            </Pressable>
            <Pressable
              style={[
                styles.distanceOption,
                filters.maxDistance === 10 && styles.distanceOptionSelected
              ]}
              onPress={() => setFilters(prev => ({ ...prev, maxDistance: 10 }))}
            >
              <Text style={styles.distanceOptionText}>10 km</Text>
            </Pressable>
            <Pressable
              style={[
                styles.distanceOption,
                filters.maxDistance === 25 && styles.distanceOptionSelected
              ]}
              onPress={() => setFilters(prev => ({ ...prev, maxDistance: 25 }))}
            >
              <Text style={styles.distanceOptionText}>25 km</Text>
            </Pressable>
            <Pressable
              style={[
                styles.distanceOption,
                filters.maxDistance === 50 && styles.distanceOptionSelected
              ]}
              onPress={() => setFilters(prev => ({ ...prev, maxDistance: 50 }))}
            >
              <Text style={styles.distanceOptionText}>50 km</Text>
            </Pressable>
          </View>
          
          <Text style={styles.filterTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {allInterests.map(interest => (
              <Pressable
                key={interest}
                style={[
                  styles.interestTag,
                  filters.interests.includes(interest) && styles.interestTagSelected
                ]}
                onPress={() => toggleInterestFilter(interest)}
              >
                <Text 
                  style={[
                    styles.interestTagText,
                    filters.interests.includes(interest) && styles.interestTagTextSelected
                  ]}
                >
                  {interest}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
      
      <View style={styles.usersList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(renderUserCard)
        ) : (
          <View style={styles.noResultsContainer}>
            <MaterialIcons name="search-off" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>No matches found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your filters</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Add these styles to the StyleSheet
const discoveryStyles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  distanceFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  distanceOption: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  distanceOptionSelected: {
    backgroundColor: '#007AFF',
  },
  distanceOptionText: {
    fontSize: 14,
    color: '#333',
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
  interestTagHighlighted: {
    backgroundColor: '#e6f2ff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  interestTagTextHighlighted: {
    color: '#007AFF',
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
};

// Update the styles object to include the discovery styles
const styles = StyleSheet.create({
  // ... existing styles
  ...discoveryStyles,
});