export type ButtonVariant = 'primary' | 'ghost' | 'tint';

export const BUTTON_BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-display text-label uppercase font-bold transition-transform duration-fast ease-out active:scale-[0.98] motion-reduce:transition-none';

export const BUTTON_SIZES = {
  md: 'h-12 px-6',
  sm: 'h-10 px-5',
} as const;

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:-translate-y-0.5',
  ghost: 'border border-ink text-ink hover:bg-surface-tint',
  tint: 'bg-surface-tint text-ink hover:bg-line',
};
