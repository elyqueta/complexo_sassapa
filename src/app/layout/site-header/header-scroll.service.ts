import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  computed,
  DestroyRef,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { UiStateService } from '../../core/services/ui-state.service';

const HEADER_HEIGHT = 72;
const SCROLL_HYSTERESIS = 6;
const TOP_THRESHOLD = 8;

@Injectable({ providedIn: 'root' })
export class HeaderScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly ui = inject(UiStateService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly home = signal(false);
  private readonly atTop = signal(true);
  private readonly anchorNavigation = signal(false);
  private readonly headerFocused = signal(false);

  readonly isSolid = computed(() => !this.home() || !this.atTop());
  readonly isHidden = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      let lastY = window.scrollY;
      let lastDirection = 0;
      let accumulatedDelta = 0;
      let animationFrame = 0;
      let anchorTimer = 0;

      const updateRouteState = (): void => {
        const path = this.router.url.split(/[?#]/, 1)[0];
        this.home.set(path === '/' || path === '/noticias');
        this.isHidden.set(false);
        this.anchorNavigation.set(false);
        this.atTop.set(true);
        lastY = 0;
        accumulatedDelta = 0;
        window.scrollTo(0, 0);
      };

      const updateScrollState = (): void => {
        animationFrame = 0;
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        this.atTop.set(y <= TOP_THRESHOLD);

        if (y <= TOP_THRESHOLD) {
          this.isHidden.set(false);
          accumulatedDelta = 0;
          return;
        }

        if (
          this.ui.menuMobileAberto() ||
          this.ui.pesquisaAberta() ||
          this.headerFocused() ||
          this.anchorNavigation()
        ) {
          this.isHidden.set(false);
          accumulatedDelta = 0;
          return;
        }

        const direction = Math.sign(delta);
        if (direction && direction !== lastDirection) accumulatedDelta = 0;
        lastDirection = direction || lastDirection;
        accumulatedDelta += Math.abs(delta);

        if (accumulatedDelta <= SCROLL_HYSTERESIS) return;
        if (direction > 0 && y > HEADER_HEIGHT * 1.5) this.isHidden.set(true);
        if (direction < 0) this.isHidden.set(false);
        accumulatedDelta = 0;
      };

      updateRouteState();

      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (animationFrame) return;
          animationFrame = requestAnimationFrame(updateScrollState);
        });

      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(updateRouteState);

      fromEvent<MouseEvent>(document, 'click')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          const target = event.target;
          if (!(target instanceof Element) || !target.closest('a[href*="#"]')) return;

          this.anchorNavigation.set(true);
          this.isHidden.set(false);
          window.clearTimeout(anchorTimer);
          anchorTimer = window.setTimeout(() => this.anchorNavigation.set(false), 1500);
        });

      fromEvent(window, 'scrollend')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.anchorNavigation.set(false);
          window.clearTimeout(anchorTimer);
        });

      fromEvent<FocusEvent>(document, 'focusin')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          const target = event.target;
          const focused = target instanceof Element && Boolean(target.closest('#site-header'));
          this.headerFocused.set(focused);
          if (focused) this.isHidden.set(false);
        });
    });
  }
}
