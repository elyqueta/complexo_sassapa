import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private readonly callbacks = new WeakMap<Element, () => void>();

  readonly reducedMotion =
    isPlatformBrowser(this.platformId) &&
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  observe(el: Element, onIn: () => void): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.callbacks.get(entry.target)?.();
          this.observer?.unobserve(entry.target); // revela uma única vez
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    this.callbacks.set(el, onIn);
    this.observer.observe(el);
  }
}
