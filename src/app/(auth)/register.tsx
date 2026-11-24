import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { AppTextInput } from '@/components/app-text-input';
import { BrandLogo } from '@/components/brand-logo';
import { useTheme } from '@/hooks/use-theme';

export default function RegisterScreen() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <BrandLogo compact />
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Créer ton compte</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Sauvegarde tes défis préférés sur tous tes appareils.</Text>
          </View>
          <View style={styles.form}>
            <AppTextInput label="Pseudo" value={name} onChangeText={setName} placeholder="Ton pseudo" autoCapitalize="words" />
            <AppTextInput label="Adresse e-mail" value={email} onChangeText={setEmail} placeholder="nom@exemple.com" keyboardType="email-address" autoCapitalize="none" />
            <AppTextInput label="Mot de passe" value={password} onChangeText={setPassword} placeholder="8 caractères minimum" secureTextEntry />
            <AppButton label="Créer mon compte" onPress={() => router.replace('/(app)/home')} />
          </View>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>Tu as déjà un compte ?</Text>
            <AppButton label="Se connecter" variant="ghost" onPress={() => router.replace('/(auth)/login')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flexGrow: 1, maxWidth: 800, paddingHorizontal: 24, paddingBottom: 24, width: '100%', alignSelf: 'center' },
  header: { marginTop: 48 },
  title: { fontSize: 40, fontWeight: '900', letterSpacing: -1.3 },
  subtitle: { fontSize: 16, lineHeight: 24, marginTop: 8 },
  form: { gap: 14, marginTop: 32 },
  footer: { alignItems: 'center', marginTop: 24 },
  footerText: { fontSize: 14 },
});
