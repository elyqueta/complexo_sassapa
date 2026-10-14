import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NAV_ITEMS, REDES_SOCIAIS, SITE } from '../../core/config/site.config';
import { UiStateService } from '../../core/services/ui-state.service';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { Icon } from '../../shared/ui/icon/icon';
import { TopoPattern } from '../../shared/ui/topo-pattern/topo-pattern';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, Button, Container, TopoPattern],
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
  protected readonly navItems = NAV_ITEMS;
  protected readonly redes = REDES_SOCIAIS;
  protected readonly min = Math.min;

  private readonly ui = inject(UiStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly aberto = this.ui.menuMobileAberto;

  constructor() {
    // Bloqueia o scroll do corpo enquanto o menu está aberto.
    effect(() => {
      const aberto = this.aberto();
      if (!isPlatformBrowser(this.platformId)) return;
      document.body.style.overflow = aberto ? 'hidden' : '';
    });

    // Esc fecha e o foco fica preso ao painel enquanto está aberto.
    afterNextRender(() => {
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          if (!this.ui.menuMobileAberto()) return;
          if (event.key === 'Escape') {
            this.ui.fecharMenu();
            return;
          }
          if (event.key !== 'Tab') return;

          const foco = (
            this.el.nativeElement as HTMLElement
          ).querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
          if (!foco.length) return;
          const primeiro = foco[0];
          const ultimo = foco[foco.length - 1];
          if (event.shiftKey && document.activeElement === primeiro) {
            event.preventDefault();
            ultimo.focus();
          } else if (!event.shiftKey && document.activeElement === ultimo) {
            event.preventDefault();
            primeiro.focus();
          }
        });
    });
  }

  protected fechar(): void {
    this.ui.fecharMenu();
  }
}
