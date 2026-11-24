import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const AGE_KEY = 'dareme_age_verified';

export async function getAgeVerified() {
  if (Platform.OS === 'web') {
    return (await AsyncStorage.getItem(AGE_KEY)) === 'true';
  }
  return (await SecureStore.getItemAsync(AGE_KEY)) === 'true';
}

export async function setAgeVerified(verified: boolean) {
  const value = verified ? 'true' : 'false';
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(AGE_KEY, value);
    return;
  }
  await SecureStore.setItemAsync(AGE_KEY, value);
}
