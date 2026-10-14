import { AfterViewInit, Directive, ElementRef, PLATFORM_ID, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RevealService } from './reveal.service';
import {
  REVEAL_BASE,
  REVEAL_HIDDEN,
  REVEAL_MAX_STAGGER_INDEX,
  REVEAL_SHOWN,
  REVEAL_STAGGER_MS,
  RevealVariant,
} from './reveal.constants';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit {
  readonly appReveal = input<RevealVariant>('up');
  readonly revealDelay = input<number | null>(null);

  /** Índice atribuído pelo directiva de grupo (stagger). */
  staggerIndex: number | null = null;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reveal = inject(RevealService);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.reveal.reducedMotion) return;

    const node = this.el.nativeElement;
    const hidden = REVEAL_HIDDEN[this.appReveal()].split(' ');
    node.classList.add(...REVEAL_BASE.split(' '), ...hidden);
    node.style.transitionDelay = `${this.resolveDelay()}ms`;

    this.reveal.observe(node, () => {
      node.classList.remove(...hidden);
      node.classList.add(...REVEAL_SHOWN.split(' '));
      node.addEventListener(
        'transitionend',
        () => {
          node.style.transitionDelay = '';
        },
        { once: true },
      );
    });
  }

  private resolveDelay(): number {
    const explicit = this.revealDelay();
    if (explicit !== null) return explicit;
    if (this.staggerIndex === null) return 0;
    return Math.min(this.staggerIndex, REVEAL_MAX_STAGGER_INDEX) * REVEAL_STAGGER_MS;
  }
}
