// ... (previous imports remain the same)

// Update the ProfileScreen component in the MainTabs
const MainTabs = ({ onLogout }: { onLogout: () => void }) => (
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
    <Tab.Screen name="Discover" component={DiscoverScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen 
      name="Profile" 
      children={(props) => <ProfileScreen {...props} onLogout={onLogout} />}
    />
  </Tab.Navigator>
);

// Update the App component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen 
                name="Login" 
                component={(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              />
              <Stack.Screen 
                name="Register" 
                component={(props) => <RegisterScreen {...props} onLogin={handleLogin} />}
              />
            </>
          ) : (
            <Stack.Screen 
              name="Main" 
              children={(props) => <MainTabs {...props} onLogout={handleLogout} />}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}