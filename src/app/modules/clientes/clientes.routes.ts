import { Routes } from '@angular/router';

import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';
import { ClientesListarComponent } from './pages/clientes-listar/clientes-listar.component';

export const CLIENTES_ROUTES: Routes = [
  { path: '', component: ClientesListarComponent },
  { path: 'novo', component: ClientesFormComponent },
  { path: ':id/:acao', component: ClientesFormComponent },
];
