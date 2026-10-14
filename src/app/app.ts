import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './layout/site-header/site-header';
import { MobileMenu } from './layout/mobile-menu/mobile-menu';
import { SiteFooter } from './layout/site-footer/site-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeader, MobileMenu, SiteFooter],
  templateUrl: './app.html',
})
export class App {}
