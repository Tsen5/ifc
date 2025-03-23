import * as radixColors from '@radix-ui/colors';
import { ThemeProps } from '@radix-ui/themes';

export type PlainColorVariants = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
export type TransparentColorVariants = `a${PlainColorVariants}`;
export type ColorVariants = PlainColorVariants | TransparentColorVariants;

export default {
  ...radixColors,
  background: 'var(--color-background)',
  getColor: (color: ThemeProps['accentColor'], variant: ColorVariants) => `var(--${color}-${variant})`,
  getAccentColor: (variant: ColorVariants) => `var(--accent-${variant})`,
};
