import { Injectable, signal } from '@angular/core';

/** Estado transversal da interface (menu mobile). */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  readonly menuMobileAberto = signal(false);

  alternarMenu(): void {
    this.menuMobileAberto.update((v) => !v);
  }

  fecharMenu(): void {
    this.menuMobileAberto.set(false);
  }
}
