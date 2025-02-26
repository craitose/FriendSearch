const MainTabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof MaterialIcons.glyphMap = 'person';
        
        if (route.name === 'Discover') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chat' : 'chat-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Discover" component={DiscoveryScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Profile" component={ProfileScreenWithAuth} />
  </Tab.Navigator>
);