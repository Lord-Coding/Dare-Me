import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/brand-logo';
import ScreenContainer from '@/components/ScreenContainer';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScreenContainer includeBottomSafeArea>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BrandLogo compact />
          <Pressable accessibilityRole="button" accessibilityLabel="Ouvrir le profil" style={[styles.avatar, { backgroundColor: theme.backgroundElement }]}>
            <Text style={[styles.avatarText, { color: theme.brand }]}>D</Text>
          </Pressable>
        </View>

        <View style={styles.greeting}>
          <Text style={[styles.eyebrow, { color: theme.brand }]}>PRÊT À JOUER ?</Text>
          <Text style={[styles.title, { color: theme.text }]}>Que voulez-vous{'\n'}affronter ?</Text>
        </View>

        <View style={styles.cards}>
          <Pressable
            accessibilityRole="button"
            style={[styles.card, styles.primaryCard, { backgroundColor: theme.brand }]}
            onPress={() => router.push('/(app)/home')}>
            <View style={styles.cardIcon}><Text style={styles.cardIconText}>↗</Text></View>
            <Text style={styles.cardTitle}>Nouvelle partie</Text>
            <Text style={styles.cardDescription}>Configure les joueurs, les limites et le niveau.</Text>
          </Pressable>

          <Pressable accessibilityRole="button" style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <View style={[styles.cardIcon, { backgroundColor: theme.backgroundSelected }]}>
              <Text style={[styles.cardIconText, { color: theme.accent }]}>♡</Text>
            </View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Favoris</Text>
            <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>Retrouvez vos défis préférés.</Text>
          </Pressable>
        </View>

        <View style={[styles.notice, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.noticeTitle, { color: theme.text }]}>Règle d’or</Text>
          <Text style={[styles.noticeText, { color: theme.textSecondary }]}>Consentement, respect et droit de passer. Aucun joueur ne doit subir de pression.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, maxWidth: 800, paddingBottom: 32, width: '100%', alignSelf: 'center' },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8 },
  avatar: { alignItems: 'center', borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  avatarText: { fontSize: 18, fontWeight: '900' },
  greeting: { marginTop: 36 },
  eyebrow: { fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  title: { fontSize: 40, fontWeight: '900', letterSpacing: -1.5, lineHeight: 46, marginTop: 8 },
  cards: { gap: 14, marginTop: 28 },
  card: { borderRadius: 22, borderWidth: 1, minHeight: 180, padding: 20 },
  primaryCard: { borderWidth: 0 },
  cardIcon: { alignItems: 'center', alignSelf: 'flex-end', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  cardIconText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  cardTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', marginTop: 28 },
  cardDescription: { color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 20, marginTop: 6 },
  notice: { borderRadius: 16, borderWidth: 1, marginTop: 16, padding: 16 },
  noticeTitle: { fontSize: 14, fontWeight: '800' },
  noticeText: { fontSize: 13, lineHeight: 20, marginTop: 4 },
});
