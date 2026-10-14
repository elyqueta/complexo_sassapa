import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACTOS, NAV_ITEMS, REDES_SOCIAIS, SITE } from '../../core/config/site.config';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { Icon } from '../../shared/ui/icon/icon';
import { TopoPattern } from '../../shared/ui/topo-pattern/topo-pattern';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, Button, Container, Icon, TopoPattern],
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly site = SITE;
  protected readonly contactos = CONTACTOS;
  protected readonly redes = REDES_SOCIAIS;
  protected readonly ano = new Date().getFullYear();

  protected readonly siteAtalhos = NAV_ITEMS.filter((item) => item.rota !== '/');
}
