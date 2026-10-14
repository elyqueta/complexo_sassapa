import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.Home),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then((m) => m.ComingSoon),
  },
  {
    path: 'educacao',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then((m) => m.ComingSoon),
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then((m) => m.ComingSoon),
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then((m) => m.ComingSoon),
  },
  {
    path: 'inscricoes',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then((m) => m.ComingSoon),
  },
  {
    path: 'contactos',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then((m) => m.ComingSoon),
  },
  { path: '**', redirectTo: '' },
];
