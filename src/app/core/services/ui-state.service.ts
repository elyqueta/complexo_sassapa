import { Injectable, signal } from '@angular/core';

/** Estado transversal da interface (menu mobile). */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  readonly menuMobileAberto = signal(false);
  readonly pesquisaAberta = signal(false);

  alternarMenu(): void {
    this.menuMobileAberto.update((v) => !v);
    if (this.menuMobileAberto()) this.pesquisaAberta.set(false);
  }

  fecharMenu(): void {
    this.menuMobileAberto.set(false);
  }

  alternarPesquisa(): void {
    this.pesquisaAberta.update((aberta) => !aberta);
    if (this.pesquisaAberta()) this.menuMobileAberto.set(false);
  }

  fecharPesquisa(): void {
    this.pesquisaAberta.set(false);
  }
}
