import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from '../../core/config/site.config';
import { UiStateService } from '../../core/services/ui-state.service';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Button, Container, Icon],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly navItems = NAV_ITEMS;

  private readonly ui = inject(UiStateService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly menuAberto = this.ui.menuMobileAberto;
  protected readonly scrolled = signal(false);
  protected readonly escondido = signal(false);

  constructor() {
    // Esconde ao descer, mostra ao subir — só no browser (SSR-safe).
    afterNextRender(() => {
      let lastY = window.scrollY;
      let agendado = false;

      const avaliar = () => {
        agendado = false;
        const y = window.scrollY;
        this.scrolled.set(y > 8);
        if (this.ui.menuMobileAberto()) {
          this.escondido.set(false);
          lastY = y;
          return;
        }
        const delta = y - lastY;
        if (y > 120 && delta > 4) this.escondido.set(true);
        else if (delta < -4 || y <= 120) this.escondido.set(false);
        lastY = y;
      };

      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (agendado) return;
          agendado = true;
          requestAnimationFrame(avaliar);
        });
    });
  }

  protected alternarMenu(): void {
    this.ui.alternarMenu();
  }
}
