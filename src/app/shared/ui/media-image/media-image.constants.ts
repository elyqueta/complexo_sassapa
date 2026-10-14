export type MediaAspect = 'auto' | 'square' | 'portrait' | 'landscape' | 'wide';

export const MEDIA_ASPECTS: Record<MediaAspect, string> = {
  auto: '',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[3/2]',
  wide: 'aspect-[16/9]',
};

export const MEDIA_SIZES = {
  square: '(max-width: 1023px) 80vw, 25vw',
  portrait: '(max-width: 1023px) 100vw, 45vw',
  landscape: '(max-width: 1023px) 80vw, 30vw',
  wide: '100vw',
  auto: '100vw',
} as const;
