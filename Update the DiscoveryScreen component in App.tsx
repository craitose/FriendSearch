const DiscoveryScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Discover Friends</Text>
      <Text style={{ marginTop: 20, fontSize: 16 }}>Find people with similar interests</Text>
      
      <View style={{ marginTop: 40, padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10, width: '80%' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sarah Johnson, 28</Text>
        <Text style={{ marginTop: 5 }}>2.5 km away</Text>
        <Text style={{ marginTop: 10 }}>Passionate photographer looking for hiking buddies.</Text>
        <Pressable 
          style={{ 
            marginTop: 15, 
            backgroundColor: '#007AFF', 
            padding: 10, 
            borderRadius: 5,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Connect</Text>
        </Pressable>
      </View>
    </View>
  );
};