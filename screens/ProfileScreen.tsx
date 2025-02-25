import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Profile: undefined;
};

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // ... rest of the component implementation
};