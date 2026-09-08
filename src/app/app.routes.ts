import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Karaz Dev — Web & Mobile Development',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    title: 'Services — Karaz Dev',
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work').then((m) => m.Work),
    title: 'Work — Karaz Dev',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About — Karaz Dev',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contact — Karaz Dev',
  },
];
