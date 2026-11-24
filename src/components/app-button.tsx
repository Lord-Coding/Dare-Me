import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type AppButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function AppButton({ label, variant = 'primary', style, disabled, ...props }: AppButtonProps) {
  const theme = useTheme();
  const secondary = variant === 'secondary';
  const ghost = variant === 'ghost';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        secondary && { backgroundColor: theme.backgroundElement, borderColor: theme.border, borderWidth: 1 },
        ghost && { backgroundColor: 'transparent' },
        variant === 'primary' && { backgroundColor: theme.brand },
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.82, transform: [{ scale: 0.985 }] },
        typeof style === 'function' ? undefined : style,
      ]}
      {...props}>
      <Text
        style={[
          styles.label,
          { color: variant === 'primary' ? theme.onBrand : theme.text },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 16,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: { fontSize: 16, fontWeight: '800' },
});
