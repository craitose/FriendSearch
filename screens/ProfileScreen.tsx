import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Image, // Added this import
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FormInput } from '../components/FormInput';
import { Select } from '../components/Select';
import { InterestTag } from '../components/InterestTag';
import { MOCK_INTERESTS } from '../utils/mockData';
import { ImageService } from '../services/imageService';
import { AuthService } from '../services/authService';
import { UserProfile } from '../types';

// Rest of the ProfileScreen component remains the same...