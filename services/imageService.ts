import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

export class ImageService {
  static async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Please grant access to your photo library to upload images.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Settings', onPress: () => ImagePicker.openSettings() }
            ]
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  static async pickImage(): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(
        'Error',
        'Failed to pick image. Please try again.',
        [{ text: 'OK' }]
      );
      return null;
    }
  }

  static async takePhoto(): Promise<string | null> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant access to your camera to take photos.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => ImagePicker.openSettings() }
          ]
        );
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        'Error',
        'Failed to take photo. Please try again.',
        [{ text: 'OK' }]
      );
      return null;
    }
  }

  static async resizeImage(uri: string, maxWidth: number = 1200): Promise<string> {
    try {
      const manipulateResult = await ImagePicker.manipulateAsync(
        uri,
        [{ resize: { width: maxWidth } }],
        { compress: 0.8, format: ImagePicker.SaveFormat.JPEG }
      );
      return manipulateResult.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      return uri; // Return original URI if resize fails
    }
  }
}