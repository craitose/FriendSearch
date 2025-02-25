// ... (previous imports remain the same)

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // ... (previous state and other functions remain the same)

  const handleLogout = async () => {
    try {
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              try {
                setLoading(true);
                await AuthService.logout();
                // The App.tsx useEffect will handle the navigation
                // when it detects the auth state change
              } catch (error) {
                console.error('Error during logout:', error);
                Alert.alert('Error', 'Failed to logout. Please try again.');
              } finally {
                setLoading(false);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Error showing logout confirmation:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  // ... (rest of the component remains the same)
};