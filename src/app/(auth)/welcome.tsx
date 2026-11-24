import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { BrandLogo } from '@/components/brand-logo';
import { useTheme } from '@/hooks/use-theme';

export default function WelcomeScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <BrandLogo />
        </View>
        <View style={styles.hero}>
          <View style={[styles.badge, { backgroundColor: theme.backgroundElement }]}>
            <Text style={[styles.badgeText, { color: theme.brand }]}>18+ PARTY GAME</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Des défis qui font{'\n'}<Text style={{ color: theme.brand }}>battre le cœur.</Text></Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Action ou vérité, entre amis ou en couple. Choisis tes limites et amuse-toi en toute sécurité.
          </Text>
        </View>
        <View style={styles.actions}>
          <AppButton label="Commencer" onPress={() => router.push('/(auth)/age-verification')} />
          <AppButton label="J’ai déjà un compte" variant="secondary" onPress={() => router.push('/(auth)/login')} />
        </View>
        <Text style={[styles.consent, { color: theme.textSecondary }]}>
          Tout le monde joue volontairement. Tu peux passer ou arrêter à tout moment.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flexGrow: 1, maxWidth: 800, paddingHorizontal: 24, width: '100%', alignSelf: 'center' },
  top: { paddingTop: 12 },
  hero: { flex: 1, justifyContent: 'center', paddingVertical: 32 },
  badge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  badgeText: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 46, fontWeight: '900', letterSpacing: -2, lineHeight: 52, marginTop: 18 },
  subtitle: { fontSize: 17, lineHeight: 26, marginTop: 18, maxWidth: 520 },
  actions: { gap: 12 },
  consent: { fontSize: 12, lineHeight: 18, textAlign: 'center', marginVertical: 18 },
});
