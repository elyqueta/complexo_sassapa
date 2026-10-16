import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from '../../core/config/site.config';
import { UiStateService } from '../../core/services/ui-state.service';
import { Logo } from '../../shared/ui/logo/logo';
import { SearchPanel } from '../search-panel/search-panel';
import { HeaderScrollService } from './header-scroll.service';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Logo, SearchPanel],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly navItems = NAV_ITEMS.filter(
    (item) => item.rota !== '/' && item.rota !== '/contactos',
  );

  private readonly ui = inject(UiStateService);
  private readonly headerScroll = inject(HeaderScrollService);

  protected readonly menuAberto = this.ui.menuMobileAberto;
  protected readonly pesquisaAberta = this.ui.pesquisaAberta;
  protected readonly isSolid = this.headerScroll.isSolid;
  protected readonly isHidden = this.headerScroll.isHidden;
  protected readonly logoTone = computed(() => (this.isSolid() ? 'color' : 'white'));

  protected alternarMenu(): void {
    this.ui.alternarMenu();
  }

  protected alternarPesquisa(): void {
    this.ui.alternarPesquisa();
  }
}
