import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';

const AGE_KEY = 'dareme_age_verified';

export default function IndexScreen() {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadAgeStatus() {
      const value = Platform.OS === 'web'
        ? await AsyncStorage.getItem(AGE_KEY)
        : await SecureStore.getItemAsync(AGE_KEY);
      setVerified(value === 'true');
    }
    loadAgeStatus();
  }, []);

  if (verified === null) return null;
  return <Redirect href={verified ? '/(app)/home' : '/(auth)/welcome'} />;
}
