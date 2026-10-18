import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';

export const routes: Routes = [
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '', redirectTo: '/ordenes', pathMatch: 'full' },
  { path: '**', redirectTo: '/ordenes' }
];