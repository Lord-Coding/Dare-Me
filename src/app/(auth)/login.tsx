import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { AppTextInput } from '@/components/app-text-input';
import { BrandLogo } from '@/components/brand-logo';
import ScreenContainer from '@/components/ScreenContainer';
import { useTheme } from '@/hooks/use-theme';

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <BrandLogo compact />
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Bon retour</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Connecte-toi pour retrouver tes favoris.</Text>
          </View>
          <View style={styles.form}>
            <AppTextInput label="Adresse e-mail" value={email} onChangeText={setEmail} placeholder="nom@exemple.com" keyboardType="email-address" autoCapitalize="none" />
            <AppTextInput label="Mot de passe" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
            <AppButton label="Se connecter" onPress={() => router.replace('/(app)/home')} />
          </View>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>Pas encore de compte ?</Text>
            <AppButton label="Créer un compte" variant="ghost" onPress={() => router.replace('/(auth)/register')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  container: { flexGrow: 1, maxWidth: 800, paddingBottom: 24, width: '100%', alignSelf: 'center' },
  header: { marginTop: 48 },
  title: { fontSize: 40, fontWeight: '900', letterSpacing: -1.3 },
  subtitle: { fontSize: 16, lineHeight: 24, marginTop: 8 },
  form: { gap: 14, marginTop: 32 },
  footer: { alignItems: 'center', marginTop: 24 },
  footerText: { fontSize: 14 },
});
