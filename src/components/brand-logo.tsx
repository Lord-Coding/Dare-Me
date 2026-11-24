import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  const theme = useTheme();
  return (
    <View style={[styles.row, compact && styles.compact]}>
      <View style={[styles.mark, compact && styles.markCompact]}>
        <Text style={[styles.markText, compact && styles.markTextCompact]}>D</Text>
      </View>
      <Text style={[styles.wordmark, { color: theme.text }, compact && styles.wordmarkCompact]}>
        Dare<Text style={{ color: theme.brand }}>Me</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  compact: { gap: 7 },
  mark: {
    alignItems: 'center',
    backgroundColor: '#FF4F88',
    borderRadius: 18,
    height: 54,
    justifyContent: 'center',
    transform: [{ rotate: '-5deg' }],
    width: 54,
  },
  markCompact: { borderRadius: 12, height: 38, width: 38 },
  markText: { color: '#FFFFFF', fontSize: 34, fontWeight: '900' },
  markTextCompact: { fontSize: 24 },
  wordmark: { fontSize: 38, fontWeight: '900', letterSpacing: -1.5 },
  wordmarkCompact: { fontSize: 28 },
});
