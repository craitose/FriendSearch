import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export class NotificationService {
  static async initialize(): Promise<void> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted!');
      }

      // Configure notification behavior
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  static async scheduleLocalNotification(
    title: string,
    body: string,
    seconds: number = 0
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: seconds > 0 ? { seconds } : null,
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  static async sendPushNotification(
    expoPushToken: string,
    title: string,
    body: string
  ): Promise<void> {
    // In a real app, this would be handled by your backend
    const message = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}