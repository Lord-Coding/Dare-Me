/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import "@/global.css";

import { Platform, StyleSheet } from 'react-native';

export const Colors = {
  light: {
    text: "#19131F",
    background: "#FFF9FC",
    backgroundElement: "#F4EDF6",
    backgroundSelected: "#EBDEEF",
    textSecondary: "#756A7C",
    brand: "#F43F75",
    brandStrong: "#D92B62",
    accent: "#8B5CF6",
    border: "#E7DDE9",
    success: "#22A76F",
    warning: "#F59E0B",
    danger: "#EF4444",
    onBrand: "#FFFFFF",
  },
  dark: {
    text: "#FFF8FC",
    background: "#130F18",
    backgroundElement: "#211A27",
    backgroundSelected: "#302638",
    textSecondary: "#BFB2C5",
    brand: "#FF4F88",
    brandStrong: "#F43F75",
    accent: "#A78BFA",
    border: "#3A3040",
    success: "#38C98A",
    warning: "#FBBF24",
    danger: "#FB7185",
    onBrand: "#FFFFFF",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export type Theme = (typeof Colors)[keyof typeof Colors];

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const TAB_BAR_HEIGHT = 60;
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const TAB_BAR_WIDTH = "100%";

export const MaxContentWidth = 800;

export const defaultStyles = (theme: Theme) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    text: {
      fontSize: 20,
      color: theme.text,
    },
  }
);

export const utilsStyle = (theme: Theme) =>
  StyleSheet.create({
    contentWithTabBar: {
      paddingBottom: TAB_BAR_HEIGHT + BottomTabInset,
    },
    itemSeparator: {
      borderColor: theme.textSecondary,
      borderWidth: StyleSheet.hairlineWidth,
      opacity: 0.3,
    },
  }
);
