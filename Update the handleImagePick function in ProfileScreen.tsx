const handleImagePick = async () => {
  try {
    setImageLoading(true);
    const imageUri = await ImageService.pickImage();
    if (imageUri) {
      setProfile(prev => ({
        ...prev,
        profileImage: imageUri,
      }));
    }
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'Failed to pick image');
  } finally {
    setImageLoading(false);
  }
};

// Update the profile image section JSX to show better loading states
<View style={styles.header}>
  <Pressable 
    style={styles.profileImageContainer} 
    onPress={handleImagePick}
    disabled={imageLoading}
  >
    {imageLoading ? (
      <View style={[styles.profileImagePlaceholder, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    ) : profile.profileImage ? (
      <>
        <Image
          source={{ uri: profile.profileImage }}
          style={styles.profileImage}
          onError={() => {
            Alert.alert('Error', 'Failed to load image');
            setProfile(prev => ({ ...prev, profileImage: undefined }));
          }}
        />
        <View style={styles.imageOverlay} />
      </>
    ) : (
      <View style={styles.profileImagePlaceholder}>
        <MaterialIcons name="person" size={40} color="#666" />
      </View>
    )}
    <View style={styles.editIconContainer}>
      <MaterialIcons 
        name={imageLoading ? "hourglass-empty" : "edit"} 
        size={16} 
        color="#fff" 
      />
    </View>
  </Pressable>
</View>

// Add these styles to the StyleSheet
loadingContainer: {
  backgroundColor: '#f0f0f0',
},
imageOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
},