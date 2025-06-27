import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'extensions',
    pathMatch: 'full',
  },
  {
    path: 'extensions',
    loadComponent: () =>
      import('./list-extension/list-extension').then((m) => m.ListExtension),
  },
  {
    path: '**',
    redirectTo: 'extensions',
    pathMatch: 'full',
  }
];
