import { Component, computed, input } from '@angular/core';

export type LogoVariant = 'full' | 'mark';
export type LogoTone = 'color' | 'white' | 'mono';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.html',
})
export class Logo {
  readonly variant = input<LogoVariant>('full');
  readonly tone = input<LogoTone>('color');
  readonly decorative = input(false);

  protected readonly src = computed(() => {
    if (this.variant() === 'full') {
      return this.tone() === 'white'
        ? '/assets/brand/logo-full-white.svg'
        : '/assets/brand/logo-full.svg';
    }

    if (this.tone() === 'white') return '/assets/brand/logo-mark-white.svg';
    if (this.tone() === 'mono') return '/assets/brand/logo-mark-mono.svg';
    return '/assets/brand/logo-mark.svg';
  });

  protected readonly alt = computed(() =>
    this.variant() === 'full'
      ? 'Complexo Escolar Privado Sassapa'
      : 'Símbolo do Complexo Escolar Privado Sassapa',
  );
}
