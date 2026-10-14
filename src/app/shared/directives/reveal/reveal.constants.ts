export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

export const REVEAL_STAGGER_MS = 80;
export const REVEAL_MAX_STAGGER_INDEX = 8;
export const REVEAL_DURATION_MS = 700;

export const REVEAL_BASE = 'transition duration-[700ms] ease-out motion-reduce:transition-none';

export const REVEAL_HIDDEN: Record<RevealVariant, string> = {
  up: 'opacity-0 translate-y-6 max-sm:translate-y-4',
  down: 'opacity-0 -translate-y-6 max-sm:-translate-y-4',
  left: 'opacity-0 -translate-x-6 max-sm:-translate-x-4',
  right: 'opacity-0 translate-x-6 max-sm:translate-x-4',
  fade: 'opacity-0',
  scale: 'opacity-0 scale-95',
};

export const REVEAL_SHOWN = 'opacity-100 translate-x-0 translate-y-0 scale-100';
