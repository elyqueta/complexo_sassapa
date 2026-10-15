import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';
import { CONTACTOS, NAV_ITEMS, REDES_SOCIAIS } from '../../core/config/site.config';
import { UiStateService } from '../../core/services/ui-state.service';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { Icon } from '../../shared/ui/icon/icon';
import { TopoPattern } from '../../shared/ui/topo-pattern/topo-pattern';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, Button, Container, Icon, TopoPattern],
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
  protected readonly navItems = NAV_ITEMS;
  protected readonly redes = REDES_SOCIAIS;
  protected readonly contactos = CONTACTOS;
  protected readonly min = Math.min;

  private readonly ui = inject(UiStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly aberto = this.ui.menuMobileAberto;

  constructor() {
    effect((onCleanup) => {
      const bloqueado = this.aberto() || this.ui.pesquisaAberta();
      if (!isPlatformBrowser(this.platformId)) return;

      const overflowAnterior = document.body.style.overflow;
      if (bloqueado) document.body.style.overflow = 'hidden';
      onCleanup(() => {
        document.body.style.overflow = overflowAnterior;
      });
    });

    effect(() => {
      if (!this.aberto() || !isPlatformBrowser(this.platformId)) return;
      requestAnimationFrame(() => {
        const closeButton = this.el.nativeElement.querySelector('#menu-mobile-close') as
          | HTMLElement
          | null;
        closeButton?.focus();
      });
    });

    afterNextRender(() => {
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          if (!this.ui.menuMobileAberto()) return;
          if (event.key === 'Escape') {
            this.fechar();
            return;
          }
          if (event.key !== 'Tab') return;

          const foco = this.getFocusableElements();
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
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => document.getElementById('header-menu-toggle')?.focus());
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const elements = this.el.nativeElement.querySelectorAll(
      '[role="dialog"] a[href], [role="dialog"] button:not([disabled])',
    ) as NodeListOf<HTMLElement>;
    return Array.from(elements);
  }
}
