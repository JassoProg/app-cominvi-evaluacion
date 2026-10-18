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

  constructor(private api: ApiService) {}

  guardarUsuario(form: any) {
    if (form.invalid) return;

    this.api.crearUsuario(this.usuario).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        form.resetForm();
        this.usuario.fecharegistro = this.hoy;
      },
      error: () => alert('Error al guardar el usuario')
    });
  }
}