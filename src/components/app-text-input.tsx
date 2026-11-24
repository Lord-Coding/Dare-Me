import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type AppTextInputProps = TextInputProps & { label: string };

export function AppTextInput({ label, style, ...props }: AppTextInputProps) {
  const theme = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { backgroundColor: theme.backgroundElement, borderColor: theme.border, color: theme.text }, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  label: { fontSize: 13, fontWeight: '700' },
  input: { borderRadius: 14, borderWidth: 1, fontSize: 16, height: 56, paddingHorizontal: 16 },
});
