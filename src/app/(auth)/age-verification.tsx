import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { BrandLogo } from '@/components/brand-logo';
import ScreenContainer from '@/components/ScreenContainer';
import { useTheme } from '@/hooks/use-theme';
import { setAgeVerified } from '@/services/age-storage';

export default function AgeVerificationScreen() {
  const theme = useTheme();
  const [denied, setDenied] = useState(false);

  async function confirmAdult() {
    await setAgeVerified(true);
    router.replace('/(app)/home');
  }

  async function denyAdult() {
    await setAgeVerified(false);
    setDenied(true);
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <BrandLogo compact />
        {denied ? (
          <View style={styles.hero}>
            <View style={[styles.icon, { backgroundColor: theme.danger }]}>
              <Text style={styles.iconText}>18</Text>
            </View>
            <Text style={[styles.title, { color: theme.text }]}>Accès réservé aux adultes</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Tu dois avoir au moins 18 ans pour accéder au contenu DareMe.
            </Text>
            <AppButton label="Retour" variant="secondary" onPress={() => router.replace('/(auth)/welcome')} />
          </View>
        ) : (
          <>
            <View style={styles.hero}>
              <View style={[styles.icon, { backgroundColor: theme.brand }]}>
                <Text style={styles.iconText}>18</Text>
              </View>
              <Text style={[styles.title, { color: theme.text }]}>Avant de commencer</Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                DareMe contient des défis destinés aux adultes. Confirme que tu as au moins 18 ans.
              </Text>
              <View style={[styles.notice, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                <Text style={[styles.noticeTitle, { color: theme.text }]}>Tes limites comptent</Text>
                <Text style={[styles.noticeText, { color: theme.textSecondary }]}>
                  Respecte le consentement de chacun, accepte les refus et n’incite jamais à un acte dangereux ou illégal.
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <AppButton label="J’ai 18 ans ou plus" onPress={confirmAdult} />
              <AppButton label="Je n’ai pas 18 ans" variant="ghost" onPress={denyAdult} />
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, maxWidth: 800, paddingBottom: 24, width: '100%', alignSelf: 'center' },
  hero: { flex: 1, justifyContent: 'center', paddingVertical: 24 },
  icon: { alignItems: 'center', borderRadius: 22, height: 88, justifyContent: 'center', width: 88 },
  iconText: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' },
  title: { fontSize: 38, fontWeight: '900', letterSpacing: -1.2, marginTop: 24 },
  subtitle: { fontSize: 17, lineHeight: 26, marginTop: 12 },
  notice: { borderRadius: 16, borderWidth: 1, marginTop: 24, padding: 16 },
  noticeTitle: { fontSize: 15, fontWeight: '800' },
  noticeText: { fontSize: 14, lineHeight: 21, marginTop: 6 },
  actions: { gap: 8 },
});
