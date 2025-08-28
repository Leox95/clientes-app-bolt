import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modules/clientes/clientes.routes').then(m => m.CLIENTES_ROUTES),
  },
  { path: '', pathMatch: 'full', redirectTo: 'clientes' },
  { path: '**', redirectTo: 'clientes' },
];

