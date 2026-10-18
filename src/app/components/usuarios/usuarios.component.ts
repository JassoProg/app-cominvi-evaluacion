import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {
  hoy: string = new Date().toISOString().split('T')[0];
  
  usuario = {
    idusuario: 0,
    nombre: '',
    paterno: '',
    materno: '',
    correo: '',
    estatus: 1,
    fecharegistro: this.hoy
  };

  mensajeError = '';
  mensajeExito = '';

  constructor(private api: ApiService) {}

  guardarUsuario(form: any) {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (form.invalid) {
      this.mensajeError = 'Completa correctamente todos los campos.';
      return;
    }

    this.api.crearUsuario(this.usuario).subscribe({
      next: () => {
        this.mensajeExito = 'Usuario registrado con éxito.';
        form.resetForm();
        this.usuario.fecharegistro = this.hoy;
      },
      error: () => this.mensajeError = 'No fue posible guardar el usuario.'
    });
  }
}