export type ButtonVariant = 'primary' | 'ghost' | 'ghost-inverse' | 'tint';

export const BUTTON_BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-sm border font-display text-label uppercase font-bold transition-transform duration-fast ease-out active:scale-[0.98] motion-reduce:transition-none';

export const BUTTON_SIZES = {
  md: 'h-12 px-6',
  sm: 'h-11 px-6',
} as const;

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-accent-ink hover:-translate-y-0.5',
  ghost: 'border-ink bg-transparent text-ink hover:bg-surface-tint',
  'ghost-inverse': 'border-white/70 bg-transparent text-white hover:bg-white/10',
  tint: 'border-line bg-surface-tint text-ink hover:bg-line',
};
