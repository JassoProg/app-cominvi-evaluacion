import { Component } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuariosComponent, OrdenesComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app-cominvi-evaluacion';
}