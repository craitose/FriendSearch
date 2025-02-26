const DiscoveryScreen = () => {
  // Hardcoded user data
  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      distance: 2.5,
      bio: 'Passionate photographer looking for hiking buddies.',
      interests: ['Hiking', 'Photography', 'Travel']
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 34,
      distance: 4.8,
      bio: 'Tech enthusiast and gamer looking for friends.',
      interests: ['Gaming', 'Movies', 'Technology']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 31,
      distance: 1.2,
      bio: 'Foodie and art lover seeking creative friends.',
      interests: ['Cooking', 'Art', 'Music']
    }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Discover Friends
        </Text>
        
        {users.map(user => (
          <View 
            key={user.id} 
            style={{ 
              backgroundColor: '#f8f8f8', 
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#eee'
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {user.name}, {user.age}
            </Text>
            
            <Text style={{ color: '#666', marginTop: 4 }}>
              {user.distance} km away
            </Text>
            
            <Text style={{ marginTop: 8, marginBottom: 12 }}>
              {user.bio}
            </Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
              {user.interests.map(interest => (
                <View 
                  key={interest} 
                  style={{ 
                    backgroundColor: '#e0e0e0', 
                    paddingHorizontal: 12, 
                    paddingVertical: 6, 
                    borderRadius: 16, 
                    marginRight: 8,
                    marginBottom: 8
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{interest}</Text>
                </View>
              ))}
            </View>
            
            <Pressable 
              style={{ 
                backgroundColor: '#007AFF', 
                paddingVertical: 10, 
                borderRadius: 8, 
                alignItems: 'center' 
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Connect</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};